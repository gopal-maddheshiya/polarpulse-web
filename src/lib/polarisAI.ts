import { expeditions } from '../data/expeditions'
import { datasets } from '../data/datasets'
import { topics } from '../data/education'
import { publications } from '../data/publications'
import { stations } from '../data/stations'

export type Audience = 'Student' | 'General Public' | 'Teacher' | 'Researcher'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  source?: string
  timestamp: number
}

export interface PageContext {
  page: string
  title: string
  type: string
  context: string
  sourceName: string
}

/**
 * Extracts lightweight, factual POLARIS context based on current route.
 */
export function extractPageContext(pathname: string): PageContext {
  // 1. Expedition Detail: /expeditions/:id
  if (pathname.startsWith('/expeditions/')) {
    const id = pathname.replace('/expeditions/', '').trim()
    const exp = expeditions.find(e => e.id === id)
    if (exp) {
      return {
        page: 'expedition-detail',
        title: exp.title,
        type: 'Expedition Mission Dossier',
        sourceName: `POLARIS · ${exp.shortTitle} (${exp.year})`,
        context: `Mission: ${exp.title} (${exp.year}, ${exp.season}). Vessel: ${exp.vessel || 'N/A'}. Lead: ${exp.lead}. Stations: ${exp.stations.join(', ')}. Overview: ${exp.overview}. Key Objectives: ${exp.highlights.map(h => `${h.title}: ${h.description}`).join('; ')}. Research Areas: ${exp.researchAreas.join(', ')}.`,
      }
    }
  }

  // 2. Expeditions Registry: /expeditions
  if (pathname === '/expeditions') {
    return {
      page: 'expeditions',
      title: 'National Polar Expeditions Registry',
      type: 'Registry Overview',
      sourceName: 'POLARIS · Expedition Registry',
      context: `India has completed 44 annual scientific expeditions to Antarctica (1981–2025), alongside regular Arctic campaigns from Ny-Ålesund and Southern Ocean cruises. Flagship current mission: 44th ISEA on MV Vasiliy Golovnin resupplying Maitri and Bharati bases.`,
    }
  }

  // 3. Dataset Detail: /datasets/:id
  if (pathname.startsWith('/datasets/')) {
    const id = pathname.replace('/datasets/', '').trim()
    const ds = datasets.find(d => d.id === id)
    if (ds) {
      return {
        page: 'dataset-detail',
        title: ds.title,
        type: 'Open Scientific Dataset',
        sourceName: `POLARIS · ${ds.title}`,
        context: `Dataset: ${ds.title}. Discipline: ${ds.area}. Region: ${ds.region}. Temporal Coverage: ${ds.coverage}. File Format: ${ds.format} (${ds.size}). Summary: ${ds.description}. Parameters collected include in-situ cryospheric, atmospheric, and oceanographic measurements verified by NCPOR.`,
      }
    }
  }

  // 4. Datasets Index: /datasets
  if (pathname === '/datasets') {
    return {
      page: 'datasets',
      title: 'Polar Dataset Registry',
      type: 'Open Data Repository',
      sourceName: 'POLARIS · Polar Datasets Registry',
      context: `India's open repository of polar data. Contains in-situ atmospheric black carbon time series from Maitri, Kongsfjorden fjord CTD profiles from IndARC, Southern Ocean sea-ice concentration arrays, and Larsemann Hills shallow firn core isotope stratigraphy. Standard NetCDF-4 and CSV formats.`,
    }
  }

  // 5. Smart Education: /education
  if (pathname === '/education') {
    return {
      page: 'education',
      title: 'Smart Education Laboratory',
      type: 'Learning Platform',
      sourceName: 'POLARIS · Dual-Lens Education',
      context: `Interactive polar learning platform featuring Dual-Lens science concepts: Solar zenith angles and planetary albedo feedback, Southern Ocean sea-ice dynamics, ice-core paleoclimatology, and Kongsfjorden High Arctic oceanography. Linked to real Indian stations and verified quizzes.`,
    }
  }

  // 6. Publications: /publications
  if (pathname.startsWith('/publications')) {
    const id = pathname.replace('/publications/', '').trim()
    const pub = publications.find(p => p.id === id)
    if (pub) {
      return {
        page: 'publication-detail',
        title: pub.title,
        type: 'Peer-Reviewed Publication',
        sourceName: `POLARIS · ${pub.journal} (${pub.year})`,
        context: `Paper: ${pub.title} (${pub.year}). Authors: ${pub.authors.join(', ')}. Journal: ${pub.journal}. Discipline: ${pub.area}. DOI: ${pub.doi}. Abstract: ${pub.abstract}`,
      }
    }
    return {
      page: 'publications',
      title: 'Peer-Reviewed Research Library',
      type: 'Scholarly Archive',
      sourceName: 'POLARIS · Scholarly Publications',
      context: `Catalog of Scopus and Web of Science indexed journal papers authored by Indian scientists from NCPOR, NIO, IITM, and universities covering cryosphere thermodynamics, ozone depletion, and monsoon teleconnections.`,
    }
  }

  // 7. Knowledge Repository: /knowledge
  if (pathname.startsWith('/knowledge')) {
    return {
      page: 'knowledge',
      title: 'Polar Knowledge Hub',
      type: 'Knowledge Repository',
      sourceName: 'POLARIS · Polar Knowledge Hub',
      context: `Consolidated public archive of technical reports, monographs, field stories, and policy briefs documenting 44 years of India's sovereign presence in Antarctica and the Arctic under MoES.`,
    }
  }

  // 8. AI Science Communicator: /communicator
  if (pathname === '/communicator') {
    return {
      page: 'communicator',
      title: 'AI Science Dissemination Engine',
      type: 'Communicator Workflow',
      sourceName: 'POLARIS · AI Disseminator',
      context: `Translates dense expedition papers and CTD telemetry into audience-calibrated lesson plans, news articles, social posts, and 60-second video scripts with fact-checked domain rules.`,
    }
  }

  // 9. About & Governance: /about
  if (pathname === '/about') {
    return {
      page: 'about',
      title: 'National Polar Mission & Governance',
      type: 'Institutional Profile',
      sourceName: 'POLARIS · NCPOR / MoES Mission',
      context: `Operated by NCPOR under the Ministry of Earth Sciences (MoES), Government of India. Anchors sovereign Antarctic bases (Maitri Est. 1989, Bharati Est. 2012, historic Dakshin Gangotri Est. 1983) and Arctic station (Himadri Est. 2008 in Ny-Ålesund, Svalbard).`,
    }
  }

  // 10. Default / Homepage: /
  return {
    page: 'home',
    title: "India's Polar Knowledge & Outreach Platform",
    type: 'National Portal',
    sourceName: 'POLARIS · National Polar Portal',
    context: `POLARIS integrates 44 years of Indian polar science. India maintains 3 permanent sovereign research stations: Maitri (Schirmacher Oasis, Antarctica), Bharati (Larsemann Hills, Antarctica), and Himadri (Ny-Ålesund, Svalbard, Arctic). Key discovery: variations in Antarctic sea ice modulate the Mascarene High and cross-equatorial moisture flux of the Indian Southwest Monsoon.`,
  }
}

/**
 * Generates page-specific suggested questions.
 */
export function getPageSuggestions(ctx: PageContext): string[] {
  switch (ctx.page) {
    case 'expedition-detail':
      return [
        'What was the primary scientific objective?',
        'Which research stations were involved?',
        'Explain this expedition in simple terms.',
        'Why does this expedition matter to India?',
      ]
    case 'expeditions':
      return [
        'What is the 44th Indian Antarctic Expedition?',
        'How does India travel to Antarctica from Goa?',
        'What is the difference between Maitri and Bharati?',
        'When did India start Arctic research?',
      ]
    case 'dataset-detail':
      return [
        'What does this dataset show?',
        'Explain these scientific parameters simply.',
        'How was this data collected in the field?',
        'How does this connect to climate change?',
      ]
    case 'datasets':
      return [
        'Explain the sea-ice extent data simply.',
        'What is black carbon in Antarctica?',
        'How does polar melting modulate the Indian Monsoon?',
        'What open data formats does POLARIS provide?',
      ]
    case 'education':
      return [
        'Why are the poles so cold?',
        'What is planetary albedo feedback?',
        'What is the difference between Arctic and Antarctic ice?',
        'Explain the IndARC underwater mooring.',
      ]
    case 'publications':
    case 'publication-detail':
      return [
        'What is the key conclusion of this paper?',
        'How do polar winds affect Indian weather?',
        'What institutions collaborate with NCPOR?',
        'Cite this research in APA format.',
      ]
    case 'about':
      return [
        'What is NCPOR and its mandate?',
        'Tell me about India’s three polar bases.',
        'What happened to Dakshin Gangotri?',
        'Why does India invest in polar exploration?',
      ]
    default:
      return [
        'What is POLARIS?',
        'Tell me about India’s research stations.',
        'How does polar ice affect India’s monsoon?',
        'Explain Bharati station like I am a student.',
      ]
  }
}

/**
 * Deterministic, grounded offline response generator for fallback or no-key scenarios.
 */
function generateGroundedFallback(query: string, ctx: PageContext, audience: Audience): { text: string; source: string } {
  const q = query.toLowerCase()
  const isHindi = /[\u0900-\u097F]/.test(query) || /\b(kya|hai|kaise|kyun|batao|kripya|kahan|samjhao|antar|kis|ka|ke|ki)\b/i.test(query)

  // 1. Stations comparison / queries
  if (q.includes('bharati') || q.includes('maitri') || q.includes('himadri') || q.includes('station') || q.includes('base')) {
    if (isHindi) {
      if (audience === 'Student') {
        return {
          text: `भारत के पास ध्रुवों पर 3 मुख्य वैज्ञानिक अनुसंधान केंद्र हैं:

1. **मैत्री (Maitri)** — अंटार्कटिका के शिर्माकर ओएसिस में 1989 से स्थित है। यह बर्फीली जमीन पर नहीं, बल्कि सूखी चट्टान पर बना है। यहाँ वायुमंडल और ओजोन की जाँच होती है।
2. **भारती (Bharati)** — लार्समैन हिल्स, अंटार्कटिका में 2012 में खुला एक बहुत ही आधुनिक स्टेशन है, जो खंभों (stilts) पर 134 कंटेनरों से बना है। यहाँ सीधे भारतीय उपग्रहों से डेटा लिया जाता है।
3. **हिमाद्री (Himadri)** — 2008 से नॉर्वे के स्वालबार्ड (आर्कटिक, उत्तरी ध्रुव) में स्थित भारत का केंद्र है।

सरल शब्दों में: मैत्री हमारा पुराना मजबूत किला है, भारती हमारा अत्याधुनिक उपग्रह प्रयोगशाला है, और हिमाद्री उत्तर ध्रुव की खिड़की है!`,
          source: 'POLARIS · Sovereign Stations Dossier',
        }
      }
      return {
        text: `भारत तीन सक्रिय वैज्ञानिक अनुसंधान केंद्रों का संचालन करता है:

• **मैत्री (Maitri Base)**: 1989 में अंटार्कटिका के शिर्माकर ओएसिस (70°45′S, 11°44′E) में स्थापित। 36+ वर्षों से निरंतर मौसम विज्ञान, ओजोन परत और वायुमंडलीय एरोसोल का अध्ययन कर रहा है।
• **भारती (Bharati Polar Station)**: 2012 में लार्समैन हिल्स (69°24′S, 76°11′E) में कमीशन। 134 प्रीफैब्रिकेटेड कंटेनरों से निर्मित, शून्य-अपशिष्ट डिस्चार्ज प्रणाली और इसरो/एनआरएससी उपग्रह ग्राउंड स्टेशन से सुसज्जित।
• **हिमाद्री (Himadri Arctic Station)**: 2008 में स्वालबार्ड के न्य-ऑलेसुंड (78°55′N, 11°56′E) में स्थापित। यह आर्कटिक गर्म होने और भारतीय मानसून के आपसी संबंधों (teleconnections) का अध्ययन करता है।`,
        source: 'POLARIS · National Centre for Polar and Ocean Research',
      }
    }

    if (audience === 'Student') {
      return {
        text: `India operates three permanent scientific research bases in the polar regions:

1. **Maitri Base (Antarctica)**: Built in 1989 on a rocky ice-free area called the Schirmacher Oasis. Think of it like a weather laboratory where scientists study ozone and polar blizzards.
2. **Bharati Station (Antarctica)**: Opened in 2012, this is India's most modern base. It is built on elevated stilts using 134 shipping containers to let 200 km/h blizzard winds flow right beneath it! It also downloads real-time data from Indian satellites.
3. **Himadri Station (Arctic)**: Established in 2008 at 79° North in Svalbard, Norway. It gives Indian scientists a laboratory near the North Pole.

Fun fact: India's very first Antarctic base was called **Dakshin Gangotri** (built in 1983), but it is now submerged under 10 meters of ice!`,
        source: 'POLARIS · Sovereign Stations Dossier',
      }
    }

    if (audience === 'Researcher') {
      return {
        text: `India maintains a tri-station operational network spanning East Antarctica and the High Arctic:

• **Maitri (70°45′57″S, 11°44′09″E; Elev. 130 m a.s.l.)**: Commissioned in 1989 during the 8th ISEA in the ice-free Schirmacher Oasis. Anchors WMO-GAW contributing total column ozone monitoring, aethalometer equivalent black carbon (EBC) time series, 3-component fluxgate magnetometry, and Lake Priyadarshini limnology.
• **Bharati (69°24′28″S, 76°11′14″E; Elev. 35 m a.s.l.)**: Commissioned 2012 in the Larsemann Hills. Zero-liquid discharge modular architecture hosting NRSC/ISRO remote sensing terminals, Southern Ocean biogeochemistry labs, and coastal shallow firn core paleoclimatology.
• **Himadri (78°55′00″N, 11°56′00″E; Elev. 20 m a.s.l.)**: Commissioned 2008 in Ny-Ålesund, Spitsbergen. Coordinates Kongsfjorden fjord dynamics with the moored IndARC multi-sensor underwater observatory array and inter-hemispheric teleconnections to the Indian Summer Monsoon.`,
        source: 'POLARIS · NCPOR Sovereign Research Infrastructure',
      }
    }

    return {
      text: `India operates three sovereign polar scientific research bases under the Ministry of Earth Sciences:

1. **Maitri Research Base (East Antarctica)**: Commissioned in 1989 in the Schirmacher Oasis. It is a year-round laboratory supporting 25 researchers studying atmospheric chemistry, geomagnetic fields, and long-range aerosol transport.
2. **Bharati Polar Station (East Antarctica)**: Commissioned in 2012 in the Larsemann Hills. A modern modular facility on elevated stilts that directly downlinks Earth observation satellite telemetry and supports deep oceanographic cruises.
3. **Himadri Arctic Station (Svalbard, High Arctic)**: Commissioned in 2008 at 79°N latitude. Anchors India's studies of Arctic amplification and how High-Arctic warming alters India's monsoon winds.

India's historical first station, **Dakshin Gangotri**, was built in 1983 on the ice shelf and has since been decommissioned and preserved under the continental snowpack.`,
      source: 'POLARIS · Sovereign Research Stations',
    }
  }

  // 2. Monsoon Teleconnection queries
  if (q.includes('monsoon') || q.includes('teleconnection') || q.includes('affect india') || q.includes('matter to india') || q.includes('kyun zaroori')) {
    if (isHindi) {
      return {
        text: `ध्रुवों का पिघलना और अंटार्कटिक समुद्री बर्फ भारत के मानसून को सीधे कैसे प्रभावित करते हैं:

1. **मैस्करेन हाई (Mascarene High)**: दक्षिणी महासागर में बर्फ और समुद्र के तापमान में परिवर्तन हिंद महासागर के उच्च वायुदाब क्षेत्र (Mascarene High) को बदल देते हैं। यही सिस्टम अरब सागर के ऊपर से मानसूनी हवाओं को भारत की ओर धकेलता है।
2. **अंतर-गोलार्धीय संबंध (Teleconnection)**: यदि अंटार्कटिका में समुद्री बर्फ कम होती है, तो वायुमंडलीय तरंगें (atmospheric Rossby waves) भूमध्य रेखा को पार करके भारत में बारिश के चक्र और सूखे की आवृत्ति को प्रभावित करती हैं।
3. **आर्कटिक जेट स्ट्रीम**: उत्तरी ध्रुव पर बर्फ पिघलने से जेट स्ट्रीम कमजोर हो जाती है, जिससे भारत में पश्चिमी विक्षोभ (Western Disturbances) और बेमौसम बारिश की घटनाएं बढ़ती हैं।

इसीलिए भारत जैसे कृषि प्रधान देश के लिए ध्रुवीय विज्ञान जीवन और आजीविका की सुरक्षा का विषय है।`,
        source: 'POLARIS · Observational Climatology Research',
      }
    }

    if (audience === 'Student') {
      return {
        text: `Think of Earth's climate like a giant global water pipe and air conditioner!

1. The icy poles are the planet's refrigerators. They send cold ocean currents and winds around the world.
2. When sea ice melts in Antarctica, it changes the temperature of the Southern Indian Ocean.
3. This shifts a huge high-pressure wind pump called the **Mascarene High**. This wind pump is what pushes monsoon clouds straight toward Mumbai, Kerala, and Delhi!
4. If polar ice melts too fast, India's monsoon rains can become erratic, causing unexpected floods or sudden droughts.

So when Indian scientists study ice in Antarctica, they are actually protecting Indian farmers and cities!`,
        source: 'POLARIS · Dual-Lens Smart Education',
      }
    }

    return {
      text: `Polar research is critical to India because changes at the poles directly modulate the **Indian Southwest Monsoon**:

• **The Mascarene High Driver**: Variations in Southern Ocean sea-ice extent alter the thermal gradient between polar and tropical latitudes. This shifts the position and intensity of the Mascarene High—the semi-permanent high-pressure cell that pumps cross-equatorial moisture into the Indian subcontinent.
• **Atmospheric Wave Guides**: Diminishing sea-ice induces Rossby wave trains that propagate northward across the equator, altering the timing and spatial distribution of monsoon rainfall bursts.
• **High Arctic Teleconnections**: Rapid Arctic warming reduces the temperature gradient with mid-latitudes, destabilizing the subtropical jet stream and modulating winter Western Disturbances over northern India.

Understanding these inter-hemispheric teleconnections is vital for India's food security, disaster preparedness, and water resource planning.`,
      source: 'POLARIS · NCPOR Polar Climate Dynamics Group',
    }
  }

  // 3. 44th Expedition queries
  if (q.includes('44th') || q.includes('44') || q.includes('expedition') || q.includes('vasiliy') || q.includes('mission')) {
    if (isHindi) {
      return {
        text: `44वां भारतीय अंटार्कटिक वैज्ञानिक अभियान (44th ISEA):

• **पोत (Vessel)**: एमवी वासिली गोलोवनिन (MV Vasiliy Golovnin)
• **यात्रा मार्ग**: गोवा (NCPOR) से केप टाउन होते हुए अंटार्कटिका
• **मुख्य लक्ष्य**: मैत्री और भारती स्टेशनों को रसद व वैज्ञानिक टीमों की आपूर्ति, दक्षिणी महासागर में एरोसोल व सी-आइस का मापन, और लार्समैन हिल्स में उथले बर्फ के कोर (firn cores) का नमूना संग्रह।
• **अग्रणी संस्थान**: राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR), पृथ्वी विज्ञान मंत्रालय।`,
        source: 'POLARIS · 44th ISEA Expedition Archive',
      }
    }

    return {
      text: `The **44th Indian Scientific Expedition to Antarctica (44th ISEA)** is India's active flagship mission (2024–2025):

• **Vessel**: Research icebreaker *MV Vasiliy Golovnin*
• **Route**: Departs from NCPOR Headquarters in Vasco da Gama, Goa, with logistics consolidation in Cape Town, South Africa, sailing south across the Roaring Forties into East Antarctica.
• **Key Stations**: Resupply and winter-over personnel rotation at **Bharati Station** (Larsemann Hills) and **Maitri Base** (Schirmacher Oasis).
• **Core Research**:
  1. Southern Ocean CTD oceanographic transects across the Polar Front.
  2. Long-range atmospheric black carbon (EBC) aerosol tracing at Maitri.
  3. Coastal firn-core paleoclimate extractions to reconstruct precipitation trends.
  4. Real-time satellite data calibration for ISRO/NRSC.`,
      source: 'POLARIS · 44th Indian Antarctic Expedition Dossier',
    }
  }

  // 4. Default context-grounded response
  if (isHindi) {
    return {
      text: `नमस्ते! मैं पोलारिस एआई (POLARIS AI) हूँ — भारत के ध्रुवीय विज्ञान और अभियानों का डिजिटल मार्गदर्शक।

वर्तमान पृष्ठ: **${ctx.title}** (${ctx.type})
${ctx.context}

आप मुझसे भारतीय ध्रुवीय स्टेशनों (मैत्री, भारती, हिमाद्री), 44वें अंटार्कटिक अभियान, खुले डेटासेट्स या मानसून से जुड़े प्रभावों के बारे में कुछ भी पूछ सकते हैं!`,
      source: ctx.sourceName,
    }
  }

  return {
    text: `Hello! I am **POLARIS AI**, your guide to India's Polar Knowledge & Outreach Platform.

You are currently viewing: **${ctx.title}** (${ctx.type})
${ctx.context}

You can ask me to explain any dataset, expedition logbook, research base (Maitri, Bharati, Himadri), or how polar ice melting modulates India's monsoon rainfall. How can I assist your discovery today?`,
    source: ctx.sourceName,
  }
}

/**
 * Main function to communicate with POLARIS AI.
 * First attempts to stream live from Gemini Flash via /api/chat.
 * If API key is not configured or offline, smoothly falls back to the grounded polar knowledge engine
 * with progressive streaming so the user sees text appear smoothly in real-time.
 */
export async function askPolarisAI({
  messages,
  pageContext,
  audience = 'General Public',
  onChunk,
  onDone,
  onError,
}: {
  messages: ChatMessage[]
  pageContext: PageContext
  audience: Audience
  onChunk: (delta: string, accumulated: string) => void
  onDone: (fullText: string, source: string) => void
  onError: (err: string) => void
}): Promise<void> {
  const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || ''

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.slice(-6).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        })),
        pageContext,
        audience,
      }),
    })

    // Check if server returned SSE stream
    const contentType = response.headers.get('content-type') || ''

    if (response.ok && contentType.includes('text/event-stream') && response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
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
            if (jsonStr === '[DONE]') continue
            try {
              const data = JSON.parse(jsonStr)
              if (data.text) {
                accumulated += data.text
                onChunk(data.text, accumulated)
              }
            } catch {
              // ignore parse errors on partial chunks
            }
          }
        }
      }

      if (accumulated.trim().length > 0) {
        onDone(accumulated, pageContext.sourceName)
        return
      }
    }

    // Check if server returned fallback signal
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json()
      if (data.fallback) {
        // Fall back to grounded engine with progressive typing
        await streamGroundedFallback(lastUserMsg, pageContext, audience, onChunk, onDone)
        return
      }
    }

    // If server failed or non-stream, use grounded fallback
    await streamGroundedFallback(lastUserMsg, pageContext, audience, onChunk, onDone)
  } catch (err: any) {
    console.warn('Live API unavailable, falling back to grounded POLARIS engine:', err.message)
    await streamGroundedFallback(lastUserMsg, pageContext, audience, onChunk, onDone)
  }
}

/**
 * Streams grounded polar fallback response word-by-word with ~25ms delay
 * to achieve live typewriter effect without delay or abrupt dumping.
 */
async function streamGroundedFallback(
  query: string,
  pageContext: PageContext,
  audience: Audience,
  onChunk: (delta: string, accumulated: string) => void,
  onDone: (fullText: string, source: string) => void
): Promise<void> {
  const result = generateGroundedFallback(query, pageContext, audience)
  const words = result.text.split(/(\s+)/)
  let accumulated = ''

  for (const word of words) {
    accumulated += word
    onChunk(word, accumulated)
    // Small delay between tokens to create smooth fluid typing
    await new Promise(r => setTimeout(r, 18))
  }

  onDone(accumulated, result.source)
}
