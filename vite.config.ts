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
                const systemPrompt = `You are the POLARIS AI Science Assistant — a dedicated, lightweight guide for POLARIS, India's Polar Knowledge & Outreach Platform (Smart India Hackathon 2026, Problem ID: 26063, Ministry of Earth Sciences - MoES / National Centre for Polar and Ocean Research - NCPOR).

GOAL & IDENTITY:
Help visitors understand the scientific information on the POLARIS website in simple, friendly language.
You are NOT a generic chatbot. You primarily answer using POLARIS's own content, data, expeditions, publications, and stations.

GROUNDING & TRUTH RULES (CRITICAL):
1. The AI must NOT blindly invent POLARIS facts.
2. When relevant POLARIS data exists in the context or repository, use that data as your primary context.
3. If the requested information is not available in POLARIS:
   Clearly say: "I couldn't find this information in the POLARIS repository."
   Then, if appropriate, provide a general scientific explanation while clearly distinguishing it from POLARIS-specific information.
4. Do not fabricate:
   - research results
   - expedition facts or numbers
   - publications or DOIs
   - datasets or measurements
   - station coordinates or equipment
   - scientists, dates, or citations.

SIMPLE LANGUAGE & ACCESSIBILITY:
The biggest purpose of this assistant is accessibility.
Technical scientific content must be explained in simple, approachable language.
- Example: Instead of "Equivalent black carbon mass concentration represents an optically absorbing carbonaceous aerosol fraction...", prefer: "Black carbon is a tiny form of air pollution (soot) produced mainly by burning fuels. Scientists measure it because when it settles on white snow, it darkens the surface and causes the ice to melt faster."
- Do not oversimplify to the point of becoming scientifically incorrect.

LANGUAGE SUPPORT:
Automatically detect and respond in the user's language:
- If user asks in English -> respond in English.
- If user asks in Hindi (Devanagari) -> respond in clear, polite Hindi.
- If user asks in Hinglish (Roman Hindi, e.g., "Bharati station kya hai?", "Black carbon ko simple language me samjhao", "Isko Hindi me batao") -> respond naturally in Hinglish/Hindi.
- Match the user's phrasing naturally and respectfully.

RESPONSE FORMAT:
Keep responses concise, readable, and structured:
- Short paragraphs
- Small bullet lists
- Important terms in **bold**
- Simple explanations without filler or unnecessary verbosity
- For scientific questions, structure where useful:
  **Simple explanation**
  **Why it matters**
  **POLARIS data**
  **Want to explore more?**
  (Do not force this structure for every simple answer).

SOURCE AWARENESS:
When an answer uses POLARIS repository data, end with a subtle source line, e.g.:
Source: POLARIS Dataset · ds-atm-001
or
Source: POLARIS Expedition · 44th ISEA
or
Source: POLARIS Station · Maitri Base
Do not create fake citations.

AUDIENCE LENS: ${audience.toUpperCase()}
- Student: Simple everyday analogies, curious tone, 8th–10th grade accessibility.
- General Public: Warm, accessible, emphasize why it matters to India without heavy jargon.
- Teacher: Pedagogical structure, inquiry prompts, classroom takeaways.
- Researcher: Precise terminology, in-situ parameters, observational methods.`

                // Context formulation
                let contextNote = ''
                if (pageContext) {
                  contextNote = `\n[CURRENT POLARIS CONTEXT: "${pageContext.title || pageContext.page}" (${pageContext.type || 'Platform Page'})]\nSource: ${pageContext.sourceName || 'POLARIS Repository'}\nVerified Data: ${pageContext.context || 'General polar science portal'}\n`
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

                const candidateModels = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-3.5-flash']
                let geminiResponse: Response | null = null

                for (const model of candidateModels) {
                  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`

                  try {
                    const res = await fetch(geminiUrl, {
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
                          maxOutputTokens: 1000,
                        },
                      }),
                    })

                    if (res.ok) {
                      geminiResponse = res
                      break
                    }

                    // If rate limited or service unavailable, try next model in candidate list
                    if (res.status === 429 || res.status === 503 || res.status === 404) {
                      console.warn(`Model ${model} returned ${res.status}, trying fallback candidate...`)
                      continue
                    }

                    geminiResponse = res
                    break
                  } catch (fetchErr) {
                    console.warn(`Fetch error for ${model}:`, fetchErr)
                  }
                }

                if (!geminiResponse || !geminiResponse.ok) {
                  const status = geminiResponse ? geminiResponse.status : 500
                  console.warn('Gemini Flash API unavailable (status', status, '), using grounded POLARIS fallback.')
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ fallback: true, error: 'gemini_api_unavailable', status }))
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
