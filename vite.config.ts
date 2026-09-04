import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      port: 5173,
    },
    plugins: [
      {
        name: 'polaris-ai-backend',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', chunk => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const { messages, pageContext, audience = 'General Public' } = JSON.parse(body || '{}')
                const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY

                if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ fallback: true, reason: 'no_api_key' }))
                  return
                }

                // Construct Grounded POLARIS System Instruction
                const systemPrompt = `You are POLARIS AI, the dedicated knowledge assistant for POLARIS — India's Polar Knowledge & Outreach Platform (Smart India Hackathon 2026, Problem ID: 26063, Ministry of Earth Sciences / National Centre for Polar and Ocean Research - NCPOR).

YOUR PURPOSE:
Help citizens, students, teachers, and researchers understand India's polar science, expeditions, sovereign research stations (Maitri, Bharati, Himadri, Dakshin Gangotri), observational datasets, peer-reviewed publications, and the teleconnection between polar cryosphere changes and the Indian Monsoon.

GROUNDING & TRUTH RULES:
1. Always ground your answers in factual scientific data from the POLARIS repository and established polar science records.
2. NEVER invent or hallucinate dates, coordinates, temperatures, ice-sheet thicknesses, expedition vessels, or scientific results.
3. If the provided POLARIS context or your verified scientific knowledge does not have enough information, clearly state that the information is not in the POLARIS knowledge base. Never guess or fabricate facts.
4. Never claim to be an official government spokesperson or representative.
5. Never fabricate scientific citations or DOIs.

AUDIENCE LENS: ${audience.toUpperCase()}
- Student: Explain with high clarity and relatable everyday analogies. Keep reading level accessible (8th–10th grade). Define any technical terms immediately.
- General Public: Explain clearly, warm storytelling tone, highlight why this science matters to India and everyday life without unnecessary jargon.
- Teacher: Structure with pedagogical clarity, bullet points, key classroom discussion topics, and inquiry questions.
- Researcher: Use precise scientific terminology, thermodynamic and oceanographic formulations, reference in-situ observational metrics and methodology.

LANGUAGE RULES:
- If the user speaks in English, answer in English.
- If the user speaks in Hindi (Devanagari), answer in natural, polite Hindi.
- If the user speaks in Hinglish (Roman Hindi, e.g., "Bharati station kya hai?"), answer in natural conversational Hinglish/Hindi.
- Understand bilingual queries seamlessly.`

                // Context formulation
                let contextNote = ''
                if (pageContext) {
                  contextNote = `\n[CURRENT POLARIS PAGE CONTEXT: User is viewing "${pageContext.title || pageContext.page}" (${pageContext.type || 'Platform Page'})]\nContext details: ${pageContext.context || 'General portal exploration'}\n`
                }

                // Format contents for Gemini API (using gemini-flash-latest)
                const formattedContents = (messages || []).map((m: any, idx: number) => {
                  const role = m.role === 'user' ? 'user' : 'model'
                  let text = m.content
                  // Prepend context to the most recent user message
                  if (idx === (messages || []).length - 1 && role === 'user' && contextNote) {
                    text = `${contextNote}\nUser question: ${text}`
                  }
                  return {
                    role,
                    parts: [{ text }],
                  }
                })

                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=${apiKey}`

                let geminiResponse = await fetch(geminiUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    systemInstruction: {
                      parts: [{ text: systemPrompt }],
                    },
                    contents: formattedContents,
                    generationConfig: {
                      temperature: 0.3,
                      topP: 0.85,
                      maxOutputTokens: 1200,
                    },
                  }),
                })

                // If temporary overload (503/429), retry once after a short 600ms backoff
                if (!geminiResponse.ok && (geminiResponse.status === 503 || geminiResponse.status === 429)) {
                  await new Promise((resolve) => setTimeout(resolve, 600))
                  geminiResponse = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      systemInstruction: {
                        parts: [{ text: systemPrompt }],
                      },
                      contents: formattedContents,
                      generationConfig: {
                        temperature: 0.3,
                        topP: 0.85,
                        maxOutputTokens: 1200,
                      },
                    }),
                  })
                }

                if (!geminiResponse.ok) {
                  const errorText = await geminiResponse.text()
                  console.error('Gemini API Error:', geminiResponse.status, errorText)
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ fallback: true, error: 'gemini_api_error', status: geminiResponse.status }))
                  return
                }

                // Stream Server-Sent Events to Client
                res.writeHead(200, {
                  'Content-Type': 'text/event-stream',
                  'Cache-Control': 'no-cache, no-transform',
                  'Connection': 'keep-alive',
                })

                const reader = geminiResponse.body?.getReader()
                if (!reader) {
                  res.end('data: [DONE]\n\n')
                  return
                }

                const decoder = new TextDecoder()
                let buffer = ''

                while (true) {
                  const { done, value } = await reader.read()
                  if (done) break

                  buffer += decoder.decode(value, { stream: true })
                  const lines = buffer.split('\n')
                  buffer = lines.pop() || ''

                  for (const line of lines) {
                    if (line.startsWith('data: ')) {
                      const jsonStr = line.replace(/^data: /, '').trim()
                      if (jsonStr === '[DONE]') {
                        res.write('data: [DONE]\n\n')
                        continue
                      }
                      try {
                        const parsed = JSON.parse(jsonStr)
                        const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text
                        if (textChunk) {
                          res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`)
                        }
                      } catch {
                        // ignore heartbeat or partial json
                      }
                    }
                  }
                }

                res.write('data: [DONE]\n\n')
                res.end()
              } catch (err: any) {
                console.error('Proxy Exception:', err)
                if (!res.headersSent) {
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ fallback: true, error: err.message }))
                } else {
                  res.end()
                }
              }
            })
          })
        },
      },
    ],
  }
})
