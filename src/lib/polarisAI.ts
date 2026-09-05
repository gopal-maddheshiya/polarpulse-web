import { expeditions } from '../data/expeditions'
import { datasets } from '../data/datasets'
import { topics } from '../data/education'
import { publications } from '../data/publications'
import { stations } from '../data/stations'
import { getEntityContextForAI, getExpeditionById, getDatasetById, getPublicationById, getKnowledgeById, getStationById } from '../services/polarisService'

export type Audience = 'Student' | 'General Public' | 'Teacher' | 'Researcher'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  source?: string
  sourceUrl?: string
  officialSourceUrl?: string
  officialSourceLabel?: string
  timestamp: number
}

export interface PageContext {
  page: string
  title: string
  type: string
  context: string
  sourceName: string
  sourceUrl?: string
  officialSourceUrl?: string
  officialSourceLabel?: string
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
        sourceUrl: `/expeditions/${id}`,
        officialSourceUrl: exp.sourceUrl || 'https://ncpor.res.in/antarcticas',
        officialSourceLabel: exp.sourceLabel || 'NCPOR Expedition Portal',
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
      sourceUrl: '/expeditions',
      officialSourceUrl: 'https://ncpor.res.in/antarcticas',
      officialSourceLabel: 'NCPOR Antarctic Programme',
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
        sourceName: `POLARIS Dataset · ${ds.id}`,
        sourceUrl: `/datasets/${id}`,
        officialSourceUrl: ds.sourceUrl || 'https://data.ncpor.res.in',
        officialSourceLabel: ds.sourceLabel || 'National Polar Data Centre (NPDC)',
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
      sourceUrl: '/datasets',
      officialSourceUrl: 'https://data.ncpor.res.in',
      officialSourceLabel: 'National Polar Data Centre (NPDC)',
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
      sourceUrl: '/education',
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
        sourceName: `POLARIS Publication · ${pub.id}`,
        sourceUrl: `/publications/${id}`,
        context: `Paper: ${pub.title} (${pub.year}). Authors: ${pub.authors.join(', ')}. Journal: ${pub.journal}. Discipline: ${pub.area}. DOI: ${pub.doi}. Abstract: ${pub.abstract}`,
      }
    }
    return {
      page: 'publications',
      title: 'Peer-Reviewed Research Library',
      type: 'Scholarly Archive',
      sourceName: 'POLARIS · Scholarly Publications',
      sourceUrl: '/publications',
      context: `Catalog of Scopus and Web of Science indexed journal papers authored by Indian scientists from NCPOR, NIO, IITM, and universities covering cryosphere thermodynamics, ozone depletion, and monsoon teleconnections.`,
    }
  }

  // 7. Knowledge Repository: /knowledge
  if (pathname.startsWith('/knowledge')) {
    return {
      page: 'knowledge',
      title: 'Polar Knowledge Hub',
      type: 'Knowledge Repository',
      sourceName: 'POLARIS Knowledge Repository',
      sourceUrl: '/knowledge',
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
      sourceUrl: '/communicator',
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
      sourceUrl: '/about',
      context: `Operated by NCPOR under the Ministry of Earth Sciences (MoES), Government of India. Anchors sovereign Antarctic bases (Maitri Est. 1989, Bharati Est. 2012, historic Dakshin Gangotri Est. 1983) and Arctic station (Himadri Est. 2008 in Ny-Ålesund, Svalbard).`,
    }
  }

  // 10. Default / Homepage: /
  return {
    page: 'home',
    title: "India's Polar Knowledge & Outreach Platform",
    type: 'National Portal',
    sourceName: 'POLARIS · National Polar Portal',
    sourceUrl: '/',
    context: `POLARIS integrates 44 years of Indian polar science. India maintains 3 permanent sovereign research stations: Maitri (Schirmacher Oasis, Antarctica), Bharati (Larsemann Hills, Antarctica), and Himadri (Ny-Ålesund, Svalbard, Arctic). Key discovery: variations in Antarctic sea ice modulate the Mascarene High and cross-equatorial moisture flux of the Indian Southwest Monsoon.`,
  }
}

/**
 * Dynamically resolves live Supabase context for queries, linking database entities
 * to prompt context and clickable sources without vector DB overhead.
 */
export async function resolveDynamicContext(query: string, pathname: string): Promise<PageContext> {
  const baseCtx = extractPageContext(pathname)
  const q = query.toLowerCase().trim()

  // 1. If user is asking about current page context ("this", "isko", "ye", "here", etc.)
  const isAboutCurrentPage = 
    !q || 
    /\b(this|here|current|isko|yeh|ye|iska|iski|yahan)\b/i.test(q) ||
    q.includes('what is this') || 
    q.includes('explain this') ||
    q.includes('yeh kya hai') ||
    q.includes('isko samjhao')

  if (isAboutCurrentPage && baseCtx.page.endsWith('-detail')) {
    // If on an expedition page, fetch live Supabase record
    if (pathname.startsWith('/expeditions/')) {
      const id = pathname.replace('/expeditions/', '').trim()
      const liveCtx = await getEntityContextForAI('expedition', id)
      if (liveCtx) return { ...baseCtx, context: liveCtx }
    }
    // If on a dataset page, fetch live Supabase record
    if (pathname.startsWith('/datasets/')) {
      const id = pathname.replace('/datasets/', '').trim()
      const liveCtx = await getEntityContextForAI('dataset', id)
      if (liveCtx) return { ...baseCtx, context: liveCtx }
    }
    // If on a publication page, fetch live Supabase record
    if (pathname.startsWith('/publications/')) {
      const id = pathname.replace('/publications/', '').trim()
      const liveCtx = await getEntityContextForAI('publication', id)
      if (liveCtx) return { ...baseCtx, context: liveCtx }
    }
    return baseCtx
  }

  // 2. Query mentions 44th Expedition (live Supabase record)
  if (q.includes('44th') || q.includes('44 th') || q.includes('vasiliy') || (q.includes('44') && q.includes('expedition'))) {
    const live = await getEntityContextForAI('expedition', '44th-isea')
    return {
      page: 'expedition-detail',
      title: '44th Indian Scientific Expedition to Antarctica (44th ISEA)',
      type: 'Expedition Mission Dossier',
      sourceName: 'POLARIS Expedition · 44th ISEA',
      sourceUrl: '/expeditions/44th-isea',
      context: live || baseCtx.context,
    }
  }

  // 3. Query mentions IndARC / Arctic Expedition
  if (q.includes('indarc') || q.includes('kongsfjorden')) {
    const live = await getEntityContextForAI('expedition', 'indarc-2024')
    return {
      page: 'expedition-detail',
      title: 'IndARC High-Arctic Observational Campaign 2024',
      type: 'Arctic Expedition Mission',
      sourceName: 'POLARIS Expedition · IndARC 2024',
      sourceUrl: '/expeditions/indarc-2024',
      context: live || baseCtx.context,
    }
  }

  // 4. Query mentions 43rd Expedition
  if (q.includes('43rd') || q.includes('43 rd')) {
    const live = await getEntityContextForAI('expedition', '43rd-isea')
    return {
      page: 'expedition-detail',
      title: '43rd Indian Scientific Expedition to Antarctica',
      type: 'Expedition Mission Dossier',
      sourceName: 'POLARIS Expedition · 43rd ISEA',
      sourceUrl: '/expeditions/43rd-isea',
      context: live || baseCtx.context,
    }
  }

  // 5. Query mentions Black Carbon (dataset ds-atm-001 from Supabase)
  if (q.includes('black carbon') || q.includes('aethalometer') || (q.includes('carbon') && (q.includes('maitri') || q.includes('air')))) {
    const live = await getEntityContextForAI('dataset', 'ds-atm-001')
    return {
      page: 'dataset-detail',
      title: 'Atmospheric Black Carbon Mass Concentration at Maitri',
      type: 'Open Scientific Dataset',
      sourceName: 'POLARIS Dataset · ds-atm-001',
      sourceUrl: '/datasets/ds-atm-001',
      context: live || baseCtx.context,
    }
  }

  // 6. Query mentions Sea Ice dataset (ds-cry-003 from Supabase)
  if (q.includes('sea ice') || q.includes('sea-ice')) {
    const live = await getEntityContextForAI('dataset', 'ds-cry-003')
    return {
      page: 'dataset-detail',
      title: 'Antarctic Sea-Ice Concentration & Extent Time-Series',
      type: 'Open Scientific Dataset',
      sourceName: 'POLARIS Dataset · ds-cry-003',
      sourceUrl: '/datasets/ds-cry-003',
      context: live || baseCtx.context,
    }
  }

  // 7. Query mentions Firn / Ice core dataset (ds-cry-004 from Supabase)
  if (q.includes('firn') || q.includes('ice core') || q.includes('snow pit')) {
    const live = await getEntityContextForAI('dataset', 'ds-cry-004')
    return {
      page: 'dataset-detail',
      title: 'Larsemann Hills Shallow Firn Core Stable Water Isotopes',
      type: 'Open Scientific Dataset',
      sourceName: 'POLARIS Dataset · ds-cry-004',
      sourceUrl: '/datasets/ds-cry-004',
      context: live || baseCtx.context,
    }
  }

  // 8. Research stations: Maitri, Bharati, Himadri, Dakshin Gangotri
  if (q.includes('maitri')) {
    const liveStation = await getEntityContextForAI('station', 'maitri')
    const liveDataset = await getEntityContextForAI('dataset', 'ds-atm-001')
    return {
      page: 'station-detail',
      title: 'Maitri Research Base (East Antarctica)',
      type: 'Sovereign Research Station',
      sourceName: 'POLARIS Station · Maitri Base',
      sourceUrl: '/about',
      officialSourceUrl: 'https://ncpor.res.in/antarcticas/display/376-maitri-',
      officialSourceLabel: 'Official NCPOR Maitri Station',
      context: `${liveStation}. Active research at Maitri: Atmospheric black carbon aerosol measurements (ds-atm-001), total column ozone monitoring, geological mapping of Schirmacher Oasis. ${liveDataset}`,
    }
  }

  if (q.includes('bharati')) {
    const live = await getEntityContextForAI('station', 'bharati')
    return {
      page: 'station-detail',
      title: 'Bharati Polar Station (East Antarctica)',
      type: 'Sovereign Research Station',
      sourceName: 'POLARIS Station · Bharati Base',
      sourceUrl: '/about',
      officialSourceUrl: 'https://ncpor.res.in/antarcticas/display/377-bharati',
      officialSourceLabel: 'Official NCPOR Bharati Station',
      context: live || baseCtx.context,
    }
  }

  if (q.includes('himadri')) {
    const live = await getEntityContextForAI('station', 'himadri')
    return {
      page: 'station-detail',
      title: 'Himadri Arctic Station (Ny-Ålesund, Svalbard)',
      type: 'Sovereign Research Station',
      sourceName: 'POLARIS Station · Himadri Station',
      sourceUrl: '/about',
      officialSourceUrl: 'https://ncpor.res.in/arctics/display/394-himadri',
      officialSourceLabel: 'Official NCPOR Himadri Station',
      context: live || baseCtx.context,
    }
  }

  if (q.includes('dakshin gangotri')) {
    const live = await getEntityContextForAI('station', 'dakshin-gangotri')
    return {
      page: 'station-detail',
      title: 'Dakshin Gangotri (First Indian Antarctic Base)',
      type: 'Historical Research Station',
      sourceName: 'POLARIS Station · Dakshin Gangotri',
      sourceUrl: '/about',
      officialSourceUrl: 'https://ncpor.res.in/antarcticas/display/166-india-in-antarctica',
      officialSourceLabel: 'Official NCPOR Indian Antarctic History',
      context: live || baseCtx.context,
    }
  }

  // 9. Monsoon / Teleconnections
  if (q.includes('monsoon') || q.includes('teleconnection') || q.includes('mascarene') || q.includes('rainfall')) {
    const live = await getEntityContextForAI('knowledge', 'kb-01')
    return {
      page: 'knowledge-detail',
      title: 'Antarctic Sea-Ice and Indian Monsoon Teleconnections',
      type: 'Knowledge Repository Document',
      sourceName: 'POLARIS Knowledge Repository · kb-01',
      sourceUrl: '/knowledge',
      context: live || baseCtx.context,
    }
  }

  // 10. Platform Overview, Navigation, and General Exploration queries
  const isPlatformOverview = 
    /\b(yaha|yahan|kya kya|dekh|dekhne|portal|website|platform|polaris|feature|features|explore|help|madad|overview|sakte|sakate|mil|milega|available|about|namaste|hello|hi)\b/i.test(q) ||
    q.includes('kya kya') || q.includes('what can i') || q.includes('what is here') || q.includes('kya dekh') || (q.includes('kya hai') && (q.includes('polaris') || q.includes('yaha') || q.includes('ye')))

  if (isPlatformOverview) {
    return {
      page: 'home',
      title: "POLARIS · India's National Polar Knowledge Platform",
      type: 'National Scientific Portal',
      sourceName: 'POLARIS Repository · Platform Guide',
      sourceUrl: '/',
      context: `POLARIS (Polar Knowledge & Outreach Platform) is India's sovereign digital repository developed under MoES (Ministry of Earth Sciences) and NCPOR (National Centre for Polar and Ocean Research).
Key sections & features visitors can explore here:
1. Polar Expeditions (/expeditions): Logs and data of 44 Indian Scientific Expeditions to Antarctica (ISEA), Arctic IndARC campaigns, and Southern Ocean missions from 1981 to 2025.
2. Permanent Research Stations (/explore & /about): Interactive 3D Polar Map covering Maitri (1989) & Bharati (2012) in Antarctica; historic Dakshin Gangotri (1983); Himadri station & IndARC mooring in Arctic (Svalbard); and Himansh in the Himalayas.
3. Scientific Datasets (/datasets): Open research data including atmospheric black carbon time-series, marine CTD depth profiles, ice-core glaciology, and sea-ice concentration arrays.
4. Research Publications (/publications): Peer-reviewed papers by Indian polar scientists with DOI links and verified citation tools.
5. Dual-Lens Smart Education (/education): Interactive polar learning modules, visual experiments, and quizzes for students and teachers.
6. AI Science Communicator (/communicator): Tool that translates complex scientific research papers into simple summaries, news articles, and classroom scripts.`,
    }
  }

  // 11. If current page is already an entity detail page, preserve it
  if (baseCtx.page.endsWith('-detail')) {
    return baseCtx
  }

  // 12. Truly off-topic query check (e.g. baking, recipes, sports, cinema)
  const isOffTopic = /\b(recipe|cake|cook|baking|cricket|ipl|football|movie|film|cinema|song|lyrics|joke|shayari|game|bollywood|politics)\b/i.test(q)
  if (isOffTopic) {
    return {
      ...baseCtx,
      sourceName: 'General Information (Non-POLARIS)',
      sourceUrl: undefined,
      context: `[Note for POLARIS AI: The user's query "${query}" is unrelated to polar science or POLARIS. Politely say you specialize in polar science and couldn't find this in POLARIS, then guide them to ask about polar expeditions, stations, datasets, etc.]`,
    }
  }

  return baseCtx
}

/**
 * Standard suggested questions as requested by POLARIS specification.
 */
export function getPageSuggestions(ctx: PageContext, isHindi = false): string[] {
  if (isHindi) {
    return [
      'यह क्या है?',
      'इसे सरल भाषा में समझाएं',
      'यह भारत के लिए क्यों महत्वपूर्ण है?',
      ctx.page.includes('expedition')
        ? 'इस अभियान के बारे में और बताएं'
        : ctx.page.includes('dataset')
        ? 'इस डेटासेट के बारे में और बताएं'
        : 'इस विषय के बारे में और बताएं',
      'इसके पीछे के विज्ञान को समझाएं',
    ]
  }

  return [
    'What is this?',
    'Explain this simply',
    'Why does it matter to India?',
    ctx.page.includes('expedition')
      ? 'Tell me more about this expedition'
      : ctx.page.includes('dataset')
      ? 'Tell me more about this dataset'
      : 'Tell me more about this research',
    'Explain the science behind this',
  ]
}

/**
 * Deterministic, grounded offline response generator for fallback or no-key scenarios.
 */
function generateGroundedFallback(query: string, ctx: PageContext, audience: Audience): { text: string; source: string; sourceUrl?: string } {
  const q = query.toLowerCase().trim()
  const isHindi = /[\u0900-\u097F]/.test(query) || /\b(kya|hai|kaise|kyun|batao|kripya|kahan|samjhao|antar|kis|ka|ke|ki|yeh|ye|isko)\b/i.test(query)

  // 0. Platform Overview / Exploration ("yaha ham kya kya dekh sakte hai", "POLARIS kya hai", etc.)
  if (
    /\b(yaha|yahan|kya kya|dekh|dekhne|portal|website|platform|polaris|feature|features|explore|help|madad|overview|sakte|sakate|mil|milega|available|about|namaste|hello|hi)\b/i.test(q) ||
    q.includes('kya kya') || q.includes('what can i') || q.includes('what is here') || q.includes('kya dekh') || (q.includes('kya hai') && (q.includes('polaris') || q.includes('yaha') || q.includes('ye')))
  ) {
    if (isHindi) {
      return {
        text: `**पोलारिस (POLARIS) पोर्टल पर आप क्या-क्या देख और एक्सप्लोर कर सकते हैं:**

1. **ध्रुवीय वैज्ञानिक अभियान (Polar Expeditions)**: भारत के अंटार्कटिका (44th ISEA), आर्कटिक (IndARC) और दक्षिणी महासागर अभियानों (1981–2025) का पूरा इतिहास और वैज्ञानिक लॉग्स।
2. **अनुसंधान केंद्र एवं 3D Polar Map**: अंटार्कटिका में स्थित **मैत्री (Maitri)**, **भारती (Bharati)**, ऐतिहासिक **दक्षिण गंगोत्री**, और आर्कटिक स्थित **हिमाद्री (Himadri)** का इंटरएक्टिव 3D मैप और सुविधाएं।
3. **ओपन साइंटिफिक डेटासेट्स (Open Datasets)**: वायुमंडलीय ब्लैक कार्बन (Black Carbon), समुद्र की गहराई का सीटीडी (CTD) डेटा, और बर्फ के ग्लेशियर संबंधी डेटासेट्स (CSV/NetCDF में डाउनलोड योग्य)।
4. **शोध पत्र (Publications)**: भारतीय वैज्ञानिकों के 44+ वर्षों के पीयर-रिव्यूड रिसर्च पेपर्स व DOI लिंक्स।
5. **स्मार्ट एजुकेशन (Smart Education)**: पोलर साइंस से जुड़े इंटरएक्टिव मॉडल्स और क्विज़।
6. **AI साइंस कम्युनिकेटर (AI Communicator)**: रिसर्च पेपर्स को आम भाषा, समाचार और स्कूल प्रोजेक्ट्स में समझाने वाला टूल।

आप मुझसे किसी भी स्टेशन, डेटासेट या 44वें अंटार्कटिक अभियान के बारे में बेझिझक पूछ सकते हैं!`,
        source: 'POLARIS Repository · Platform Guide',
        sourceUrl: '/',
      }
    }

    return {
      text: `**What you can explore on the POLARIS Platform:**

1. **Polar Expeditions**: Archives of 44 Indian Scientific Expeditions to Antarctica (ISEA), Arctic IndARC campaigns, and Southern Ocean expeditions (1981–2025).
2. **Sovereign Polar Stations**: Interactive 3D Polar Map covering **Maitri Base** (1989), **Bharati Station** (2012), historic **Dakshin Gangotri**, and Arctic base **Himadri** (Svalbard).
3. **Open Research Datasets**: Direct access to atmospheric aerosol/black carbon time-series, marine CTD depth profiles, ice-core glaciology, and sea-ice concentration arrays.
4. **Peer-Reviewed Publications**: Research papers authored by Indian scientists from NCPOR, NIO, and IITM with DOI links and verified citation tools.
5. **Dual-Lens Smart Education**: Interactive modules, visual science experiments, and quizzes for students and educators.
6. **AI Science Communicator**: Translates dense research into accessible summaries and classroom talking points.

Ask me about any station, expedition, or scientific topic to explore further!`,
      source: 'POLARIS Repository · Platform Guide',
      sourceUrl: '/',
    }
  }

  // 1. Black Carbon queries
  if (q.includes('black carbon') || q.includes('carbon') || q.includes('aethalometer') || q.includes('soot')) {
    if (isHindi) {
      return {
        text: `**सरल व्याख्या (Simple Explanation)**
ब्लैक कार्बन (Black Carbon) हवा में मौजूद बहुत सूक्ष्म कालिख के कण होते हैं, जो मुख्य रूप से जीवाश्म ईंधन या बायोमास के जलने से बनते हैं। जब तेज हवाएं इन कणों को अंटार्कटिका की सफेद बर्फ पर ले जाती हैं, तो ये सतह को काला कर देते हैं।

**यह भारत और पृथ्वी के लिए क्यों महत्वपूर्ण है?**
सफेद बर्फ सूरज की 85% से अधिक किरणों को अंतरिक्ष में परावर्तित कर देती है (उच्च एल्बेडो)। जब काली कालिख बर्फ पर बैठती है, तो बर्फ सूरज की गर्मी सोखने लगती है और तेजी से पिघलने लगती है।

**पोलारिस डेटा (POLARIS Data)**
भारत के मैत्री (Maitri) स्टेशन पर वैज्ञानिक 24x7 मल्टी-वेवलेंथ ऐथलोमीटर (Aethalometer) द्वारा हवा में ब्लैक कार्बन के स्तर का मापन करते हैं।

**और जानना चाहते हैं?**
आप पोलारिस डेटासेट \`ds-atm-001\` में इसका पूरा वैज्ञानिक विवरण देख सकते हैं।`,
        source: 'POLARIS Dataset · ds-atm-001',
        sourceUrl: '/datasets/ds-atm-001',
      }
    }

    return {
      text: `**Simple explanation**
Black carbon is a tiny form of air pollution (soot) produced mainly by burning fuels. Scientists measure it in polar regions because even microscopic amounts of dark soot resting on pristine white snow dramatically alter the climate.

**Why it matters**
Pure snow reflects about 85% of incoming solar heat back into space (high albedo). When dark black carbon settles on Antarctic snow, the surface begins absorbing heat instead of reflecting it, accelerating ice melt.

**POLARIS data**
At India's Maitri Base in Antarctica, NCPOR scientists continuously monitor Equivalent Black Carbon (EBC) mass concentrations using multi-wavelength Aethalometers (Dataset: \`ds-atm-001\`).

**Want to explore more?**
You can inspect the verified atmospheric time-series in the POLARIS Datasets section.`,
      source: 'POLARIS Dataset · ds-atm-001',
      sourceUrl: '/datasets/ds-atm-001',
    }
  }

  // 2. Stations queries: Maitri, Bharati, Himadri
  if (q.includes('bharati') || q.includes('maitri') || q.includes('himadri') || q.includes('station') || q.includes('base') || q.includes('dakshin gangotri')) {
    if (isHindi) {
      if (audience === 'Student') {
        return {
          text: `**सरल व्याख्या**
भारत के पास ध्रुवों पर 3 मुख्य वैज्ञानिक अनुसंधान केंद्र हैं:

1. **मैत्री (Maitri Base)** — अंटार्कटिका के शिर्माकर ओएसिस में 1989 से स्थित है। यह बर्फीली जमीन पर नहीं, बल्कि सूखी चट्टान पर बना है। यहाँ वायुमंडल, मौसम और ओजोन परत का निरंतर अध्ययन होता है।
2. **भारती (Bharati Station)** — लार्समैन हिल्स, अंटार्कटिका में 2012 में खुला एक बहुत ही आधुनिक स्टेशन है। यह खंभों (stilts) पर 134 कंटेनरों से बना है ताकि 200 किमी/घंटा की बर्फीली हवाएं इसके नीचे से निकल जाएं!
3. **हिमाद्री (Himadri Station)** — 2008 से नॉर्वे के स्वालबार्ड (आर्कटिक) में स्थित भारत का उत्तरी ध्रुव अनुसंधान केंद्र है।

**रोचक तथ्य:**
भारत का पहला ऐतिहासिक बेस **दक्षिण गंगोत्री** 1983 में बना था, जो अब बर्फ की परतों के नीचे संरक्षित है।`,
          source: 'POLARIS Sovereign Stations Dossier',
          sourceUrl: '/about',
        }
      }
      return {
        text: `**सरल व्याख्या**
भारत तीन सक्रिय वैज्ञानिक अनुसंधान केंद्रों का संचालन करता है:

• **मैत्री (Maitri)**: 1989 में अंटार्कटिका के शिर्माकर ओएसिस में स्थापित। 36+ वर्षों से निरंतर मौसम विज्ञान, ओजोन परत और वायुमंडलीय एरोसोल का अध्ययन कर रहा है।
• **भारती (Bharati)**: 2012 में लार्समैन हिल्स में कमीशन। 134 प्रीफैब्रिकेटेड कंटेनरों से निर्मित, शून्य-अपशिष्ट डिस्चार्ज प्रणाली और इसरो/एनआरएससी उपग्रह ग्राउंड स्टेशन से सुसज्जित।
• **हिमाद्री (Himadri)**: 2008 में स्वालबार्ड के न्य-ऑलेसुंड (78°55′N) में स्थापित। यह आर्कटिक गर्म होने और भारतीय मानसून के आपसी संबंधों (teleconnections) का अध्ययन करता है।

**यह भारत के लिए क्यों महत्वपूर्ण है?**
ये स्टेशन भारत की संप्रभु वैज्ञानिक उपस्थिति को दर्शाते हैं और भारतीय मौसम पूर्वानुमान मॉडल को सटीक इन-सीटू डेटा प्रदान करते हैं।`,
        source: 'POLARIS Sovereign Stations Dossier',
        sourceUrl: '/about',
      }
    }

    return {
      text: `**Simple explanation**
India maintains three sovereign, permanent scientific research stations across the polar regions:

1. **Maitri Research Base (East Antarctica)**: Commissioned in 1989 on the ice-free rocky Schirmacher Oasis. A year-round facility monitoring total column ozone, atmospheric aerosols (like black carbon), and geology.
2. **Bharati Polar Station (East Antarctica)**: Commissioned in 2012 in the Larsemann Hills. A modern base elevated on stilts using 134 prefabricated shipping containers, with an integrated ISRO satellite data receiving terminal.
3. **Himadri Arctic Station (Svalbard, High Arctic)**: Established in 2008 at 79°N in Ny-Ålesund, Norway. It studies Arctic amplification and marine microbiology.

**Historical context**
India's very first station, **Dakshin Gangotri** (built in 1983), was decommissioned in 1990 and is preserved beneath continental snow.`,
      source: 'POLARIS Sovereign Stations Dossier',
      sourceUrl: '/about',
    }
  }

  // 3. Monsoon Teleconnection queries
  if (q.includes('monsoon') || q.includes('teleconnection') || q.includes('affect india') || q.includes('matter to india') || q.includes('kyun zaroori')) {
    if (isHindi) {
      return {
        text: `**सरल व्याख्या**
ध्रुवों की बर्फ पिघलने का सीधा असर भारत के मानसून पर पड़ता है:

1. **मैस्करेन हाई (Mascarene High)**: दक्षिणी महासागर में बर्फ और समुद्र के तापमान में बदलाव हिंद महासागर के उच्च वायुदाब क्षेत्र (Mascarene High) को बदल देते हैं। यही सिस्टम मानसूनी हवाओं को भारत की ओर धकेलता है।
2. **अंतर-गोलार्धीय संबंध (Teleconnection)**: यदि अंटार्कटिका में समुद्री बर्फ कम होती है, तो वायुमंडलीय तरंगें भारत में बारिश के चक्र और सूखे की आवृत्ति को प्रभावित करती हैं।
3. **आर्कटिक जेट स्ट्रीम**: उत्तरी ध्रुव पर बर्फ पिघलने से जेट स्ट्रीम कमजोर हो जाती है, जिससे भारत में पश्चिमी विक्षोभ और बेमौसम बारिश बढ़ती है।

**निष्कर्ष**
भारतीय वैज्ञानिकों का ध्रुवीय शोध सीधे तौर पर हमारे किसानों, खाद्य सुरक्षा और जल प्रबंधन की रक्षा करता है।`,
        source: 'POLARIS Knowledge Repository · kb-01',
        sourceUrl: '/knowledge',
      }
    }

    return {
      text: `**Simple explanation**
Polar climate is connected to India like a global conveyor belt of wind and water:

• **The Mascarene High Driver**: Variations in Antarctic sea-ice extent alter ocean-atmosphere thermal gradients. This modulates the Mascarene High — the massive high-pressure engine that drives cross-equatorial monsoon winds across the Arabian Sea into India.
• **Atmospheric Wave Guides**: Reduced sea ice triggers planetary atmospheric waves (Rossby waves) that modulate the onset, intensity, and active/break spells of the Indian Summer Monsoon.
• **High-Arctic Teleconnections**: Rapid warming at the North Pole destabilizes the subtropical jet stream, creating erratic winter Western Disturbances and heavy precipitation in North India.

**Why it matters to India**
Tracking polar changes allows Indian meteorologists to provide more accurate seasonal monsoon forecasts, protecting agriculture and water supplies.`,
      source: 'POLARIS Knowledge Repository · kb-01',
      sourceUrl: '/knowledge',
    }
  }

  // 4. 44th Expedition queries
  if (q.includes('44th') || q.includes('44') || q.includes('expedition') || q.includes('vasiliy') || q.includes('isea')) {
    if (isHindi) {
      return {
        text: `**सरल व्याख्या**
**44वां भारतीय अंटार्कटिक वैज्ञानिक अभियान (44th ISEA)** भारत का वर्तमान प्रमुख ध्रुवीय मिशन (2024–2025) है।

• **पोत (Vessel)**: अनुसंधान आइसब्रेकर एमवी वासिली गोलोवनिन (MV Vasiliy Golovnin)
• **यात्रा मार्ग**: गोवा (NCPOR) से केप टाउन होते हुए अंटार्कटिका
• **मुख्य कार्य**: मैत्री और भारती स्टेशनों को रसद व नए वैज्ञानिक दल की आपूर्ति करना।
• **वैज्ञानिक लक्ष्य**: दक्षिणी महासागर में एरोसोल मापन, समुद्री बर्फ की मोटाई का सर्वेक्षण, और जलवायु इतिहास जानने के लिए लार्समैन हिल्स में बर्फ के कोर (firn cores) का नमूना संग्रह।`,
        source: 'POLARIS Expedition · 44th ISEA',
        sourceUrl: '/expeditions/44th-isea',
      }
    }

    return {
      text: `**Simple explanation**
The **44th Indian Scientific Expedition to Antarctica (44th ISEA)** is India's active flagship Antarctic campaign (2024–2025):

• **Vessel**: Research vessel *MV Vasiliy Golovnin*
• **Route**: Departs from NCPOR Headquarters in Vasco da Gama, Goa, transiting via Cape Town, South Africa, into East Antarctica.
• **Key Stations**: Resupplies and rotates winter-over scientist teams at **Bharati Station** (Larsemann Hills) and **Maitri Base** (Schirmacher Oasis).
• **Scientific Objectives**:
  1. Measure atmospheric black carbon and greenhouse gases at Maitri.
  2. Extract shallow firn cores in Larsemann Hills to reconstruct past climate variations.
  3. Conduct Southern Ocean CTD oceanographic casts across the Polar Front.`,
      source: 'POLARIS Expedition · 44th ISEA',
      sourceUrl: '/expeditions/44th-isea',
    }
  }

  // 5. Unrelated queries
  const isPolar = /\b(polar|antarctica|antarctic|arctic|ncpor|moes|ice|snow|glacier|climate|station|expedition|monsoon|sea|ocean|firn)\b/i.test(q)
  if (!isPolar) {
    if (isHindi) {
      return {
        text: `I couldn't find this information in the POLARIS repository.
(मुझे पोलारिस रिपॉजिटरी में यह जानकारी नहीं मिली।)

पोलारिस मुख्य रूप से भारत के ध्रुवीय वैज्ञानिक अभियानों, अंटार्कटिक व आर्कटिक अनुसंधान केंद्रों (मैत्री, भारती, हिमाद्री) और खुले पर्यावरणीय डेटासेट्स के लिए समर्पित है। 

ध्रुवीय विज्ञान, 44वें अंटार्कटिक अभियान, या मानसून पर इसके प्रभाव के बारे में बेझिझक पूछें!`,
        source: 'General Information (Non-POLARIS)',
      }
    }

    return {
      text: `I couldn't find this information in the POLARIS repository.

POLARIS is specifically dedicated to India's polar science, Antarctic and Arctic expeditions (such as the 44th ISEA), sovereign research bases (Maitri, Bharati, Himadri), and verified in-situ environmental datasets.

Feel free to ask about India's polar stations, expeditions, open datasets, or how polar changes modulate the Indian monsoon!`,
      source: 'General Information (Non-POLARIS)',
    }
  }

  // 6. Default context-grounded response
  if (isHindi) {
    return {
      text: `**वर्तमान संदर्भ: ${ctx.title}**
${ctx.context}

आप मुझसे भारतीय ध्रुवीय स्टेशनों (मैत्री, भारती, हिमाद्री), 44वें अंटार्कटिक अभियान, खुले डेटासेट्स (जैसे ब्लैक कार्बन, सी-आइस) या भारतीय मानसून पर इसके प्रभाव के बारे में कुछ भी पूछ सकते हैं!`,
      source: ctx.sourceName,
      sourceUrl: ctx.sourceUrl,
    }
  }

  return {
    text: `**Current Context: ${ctx.title}**
${ctx.context}

You can ask me to explain any dataset, expedition dossier, research base (Maitri, Bharati, Himadri), or how polar melting connects to India's monsoon rainfall. How can I assist your discovery today?`,
    source: ctx.sourceName,
    sourceUrl: ctx.sourceUrl,
  }
}

/**
 * Main function to communicate with POLARIS AI.
 * First resolves live Supabase context dynamically via resolveDynamicContext,
 * then streams live from Gemini Flash via /api/chat.
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
  onDone: (fullText: string, source: string, sourceUrl?: string, officialSourceUrl?: string, officialSourceLabel?: string) => void
  onError: (err: string) => void
}): Promise<void> {
  const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || ''

  // Dynamically resolve live Supabase context for the user's specific query
  let activeContext = pageContext
  try {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : pageContext.sourceUrl || '/'
    activeContext = await resolveDynamicContext(lastUserMsg, currentPath)
  } catch (err) {
    console.warn('Context resolution fallback:', err)
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.slice(-6).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        })),
        pageContext: activeContext,
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
        onDone(accumulated, activeContext.sourceName, activeContext.sourceUrl, activeContext.officialSourceUrl, activeContext.officialSourceLabel)
        return
      }
    }

    // Check if server returned fallback signal
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json()
      if (data.fallback) {
        // Fall back to grounded engine with progressive typing
        await streamGroundedFallback(lastUserMsg, activeContext, audience, onChunk, onDone)
        return
      }
    }

    // If server failed or non-stream, use grounded fallback
    await streamGroundedFallback(lastUserMsg, activeContext, audience, onChunk, onDone)
  } catch (err: any) {
    console.warn('Live API unavailable, falling back to grounded POLARIS engine:', err.message)
    await streamGroundedFallback(lastUserMsg, activeContext, audience, onChunk, onDone)
  }
}

/**
 * Streams grounded polar fallback response word-by-word with ~20ms delay
 * to achieve live typewriter effect without delay or abrupt dumping.
 */
async function streamGroundedFallback(
  query: string,
  pageContext: PageContext,
  audience: Audience,
  onChunk: (delta: string, accumulated: string) => void,
  onDone: (fullText: string, source: string, sourceUrl?: string, officialSourceUrl?: string, officialSourceLabel?: string) => void
): Promise<void> {
  const result = generateGroundedFallback(query, pageContext, audience)
  const words = result.text.split(/(\s+)/)
  let accumulated = ''

  for (const word of words) {
    accumulated += word
    onChunk(word, accumulated)
    // Small delay between tokens to create smooth fluid typing
    await new Promise(r => setTimeout(r, 16))
  }

  onDone(accumulated, result.source, result.sourceUrl, pageContext.officialSourceUrl, pageContext.officialSourceLabel)
}
