export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  try {
    const { messages, pageContext, audience = 'General Public' } = req.body || {}
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ fallback: true, reason: 'no_api_key' }))
      return
    }

    const systemPrompt = `You are the POLARIS AI Science Assistant — a dedicated, lightweight guide for POLARIS, India's Polar Knowledge & Outreach Platform (Smart India Hackathon 2026, Problem ID: 26063, Ministry of Earth Sciences - MoES / National Centre for Polar and Ocean Research - NCPOR).

GOAL & IDENTITY:
Help visitors understand the scientific information on the POLARIS website in simple, friendly language.
You are NOT a generic chatbot. You primarily answer using POLARIS's own content, data, expeditions, publications, and stations.

GROUNDING & TRUTH RULES (CRITICAL):
1. The AI must NOT blindly invent POLARIS facts.
2. When relevant POLARIS data exists in the context or repository, use that data as your primary context.
3. FOR PLATFORM OR OVERVIEW QUESTIONS (e.g. "what is here?", "yaha ham kya kya dekh sakte hai?", "what can I explore?", "help me use this website"):
   - Warmly guide the visitor through POLARIS's core pillars: Polar Expeditions (44th Indian Antarctic Expedition, IndARC), Sovereign Stations & 3D Polar Map (Maitri, Bharati, Dakshin Gangotri, Himadri), Open Datasets (Black Carbon, ocean CTD, sea ice), Publications, and Smart Education.
   - NEVER say "I couldn't find this information in the POLARIS repository" for questions about the POLARIS platform or what is available here!
   - Only say "I couldn't find this information in the POLARIS repository" if the user asks a completely unrelated off-topic question (e.g. cooking, cricket, movies, gossip).
4. Do not fabricate research results, expedition facts, or DOIs.

SIMPLE LANGUAGE & ACCESSIBILITY:
The biggest purpose of this assistant is accessibility.
Technical scientific content must be explained in simple, approachable language.
- Example: Instead of "Equivalent black carbon mass concentration represents an optically absorbing carbonaceous aerosol fraction...", prefer: "Black carbon is a tiny form of air pollution (soot) produced mainly by burning fuels. Scientists measure it because when it settles on white snow, it darkens the surface and causes the ice to melt faster."

LANGUAGE SUPPORT (MANDATORY):
Automatically detect and respond in the user's language:
- If user asks in English -> respond in English.
- If user asks in Hindi (Devanagari) -> respond in clear, polite Hindi.
- If user asks in Hinglish (Roman Hindi, e.g., "yaha ham ky ky dekh skte hai?", "Bharati station kya hai?", "Black carbon ko simple language me samjhao") -> Respond naturally in friendly Hinglish (Roman Hindi) with clear Hindi terms! NEVER answer a Hindi/Hinglish question in pure English!

RESPONSE FORMAT:
Keep responses concise, readable, and structured:
- Short paragraphs & small bullet lists
- Important terms in **bold**
- Immediate answers without unnecessary delay or preamble

SOURCE AWARENESS:
When an answer uses POLARIS repository data, end with a subtle source line, e.g.:
Source: POLARIS Dataset · ds-atm-001
or
Source: POLARIS Expedition · 44th ISEA
or
Source: POLARIS Station · Maitri Base

AUDIENCE LENS: ${audience.toUpperCase()}`

    let contextNote = ''
    if (pageContext) {
      contextNote = `\n[CURRENT POLARIS CONTEXT: "${pageContext.title || pageContext.page}" (${pageContext.type || 'Platform Page'})]\nSource: ${pageContext.sourceName || 'POLARIS Repository'}\nVerified Data: ${pageContext.context || 'General polar science portal'}\n`
    }

    const formattedContents = (messages || []).map((m, idx) => {
      const role = m.role === 'user' ? 'user' : 'model'
      let text = m.content
      if (idx === (messages || []).length - 1 && role === 'user' && contextNote) {
        text = `${contextNote}\nUser question: ${text}`
      }
      return {
        role,
        parts: [{ text }],
      }
    })

    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-lite-latest']
    let geminiResponse = null

    for (const model of candidateModels) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)

        const res = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: formattedContents,
            generationConfig: {
              temperature: 0.2,
              topP: 0.85,
              maxOutputTokens: 600,
            },
          }),
        })
        clearTimeout(timeoutId)

        if (res.ok) {
          geminiResponse = res
          break
        }

        if (res.status === 429 || res.status === 503 || res.status === 404) {
          continue
        }

        geminiResponse = res
        break
      } catch (fetchErr) {
        // try next model
      }
    }

    if (!geminiResponse || !geminiResponse.ok) {
      const status = geminiResponse ? geminiResponse.status : 500
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ fallback: true, error: 'gemini_api_unavailable', status }))
      return
    }

    // Stream SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    })
    res.flushHeaders?.()

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
            // ignore partial chunks
          }
        }
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    if (!res.headersSent) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ fallback: true, error: err.message }))
    } else {
      res.end()
    }
  }
}
