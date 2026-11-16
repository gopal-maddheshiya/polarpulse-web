const fs = require('fs')
const path = require('path')

const DOMAIN = 'https://polaris-sih2026.vercel.app'
const DIST_DIR = path.resolve(__dirname, '../dist')
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html')

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('[Pre-render] dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8')

// Helper to extract entities from TS data files without ts-node
function parseTsData(filePath) {
  try {
    const fullPath = path.resolve(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return []
    const content = fs.readFileSync(fullPath, 'utf8')

    // Extract blocks like { id: '...', title: '...', description: '...', overview: '...', excerpt: '...', abstract: '...' }
    const items = []
    const blockRegex = /{\s*id:\s*['"]([^'"]+)['"][\s\S]*?}/g
    let match
    while ((match = blockRegex.exec(content)) !== null) {
      const block = match[0]
      const id = match[1]
      const titleMatch = block.match(/title:\s*['"`]([^'"`]+)['"`]/)
      const descMatch =
        block.match(/description:\s*['"`]([^'"`]+)['"`]/) ||
        block.match(/overview:\s*['"`]([^'"`]+)['"`]/) ||
        block.match(/excerpt:\s*['"`]([^'"`]+)['"`]/) ||
        block.match(/abstract:\s*['"`]([^'"`]+)['"`]/)
      const imageMatch = block.match(/image:\s*['"`]([^'"`]+)['"`]/)

      items.push({
        id,
        title: titleMatch ? titleMatch[1] : id,
        description: descMatch ? descMatch[1] : '',
        image: imageMatch ? imageMatch[1] : null,
      })
    }
    return items
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err)
    return []
  }
}

const expeditions = parseTsData('src/data/expeditions.ts')
const datasets = parseTsData('src/data/datasets.ts')
const publications = parseTsData('src/data/publications.ts')
const knowledge = parseTsData('src/data/knowledge.ts')

const routes = [
  {
    path: '/',
    title: "POLARIS · India's Polar Knowledge & Outreach Platform",
    description: "India's sovereign polar archive connecting 44 years of Antarctic, Arctic, and Southern Ocean expeditions, open cryospheric data, and AI-assisted scientific dissemination.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/explore',
    title: "Interactive 3D Polar Map & Station Navigator · POLARIS",
    description: "Explore India's sovereign research bases (Bharati, Maitri, Himadri), real-time station telemetry, dual-pole cartography, and open polar science architecture.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/expeditions',
    title: "44 Indian Polar Expeditions Archive (1981–2025) · POLARIS",
    description: "The sovereign operational record of 44 Indian Scientific Expeditions to Antarctica (ISEA), Arctic campaigns at Ny-Ålesund, Southern Ocean cruises, and Himalayan expeditions.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/datasets',
    title: "Open Polar Datasets Repository (CSV & NetCDF) · POLARIS",
    description: "Download verified in-situ datasets, automated weather station feeds, CTD ocean transects, and cryosphere time-series collected across India’s polar campaigns under NPDC / NCPOR.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/publications',
    title: "Peer-Reviewed Polar Publications & Papers · POLARIS",
    description: "Index of peer-reviewed journal papers, expedition monographs, and technical reports authored by Indian polar scientists across NCPOR, IITs, IMD, and partner institutes.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/knowledge',
    title: "Polar Knowledge Hub & Cryosphere Archive · POLARIS",
    description: "The consolidated digital archive of polar research papers, expedition reports, educational curriculums, data catalogs, and field science dispatches under NCPOR.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/education',
    title: "Polar Science Education & Virtual Certification Lab · POLARIS",
    description: "Interactive Polar Science Laboratory: Explore Antarctic ecology, Arctic amplification, Himalayan cryosphere, complete quizzes, and earn your verified Polar Science Scholar Certificate.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/media',
    title: "Photographic & Field Media Gallery · POLARIS",
    description: "A visual documentary of Indian polar science: expedition ice-sheet operations, atmospheric instrumentation at Maitri, oceanic hydrography, and High Arctic fjord dynamics.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/communicator',
    title: "AI Polar Science Communicator & Outreach Engine · POLARIS",
    description: "Transform complex Antarctic and Arctic research findings into student lessons, press releases, video scripts, and social outreach narratives.",
    image: `${DOMAIN}/og-image.jpg`,
  },
  {
    path: '/about',
    title: "About POLARIS · MoES, NCPOR & SIH 2026 Mission · POLARIS",
    description: "POLARIS is India’s integrated digital gateway to polar expeditions, open scientific datasets, peer publications, media archives, and educational outreach.",
    image: `${DOMAIN}/og-image.jpg`,
  },
]

// Add dynamic routes
expeditions.forEach(e => {
  routes.push({
    path: `/expeditions/${e.id}`,
    title: `${e.title} · Indian Polar Expeditions · POLARIS`,
    description: e.description || `44th IAE operational polar mission under NCPOR / Ministry of Earth Sciences.`,
    image: e.image && e.image.startsWith('http') ? e.image : `${DOMAIN}/og-image.jpg`,
  })
})

datasets.forEach(d => {
  routes.push({
    path: `/datasets/${d.id}`,
    title: `${d.title} · Open Polar Datasets · POLARIS`,
    description: d.description || `Open access polar dataset distributed under National Polar Data Centre (NPDC) protocols.`,
    image: `${DOMAIN}/og-image.jpg`,
  })
})

publications.forEach(p => {
  routes.push({
    path: `/publications/${p.id}`,
    title: `${p.title} · Polar Research Publications · POLARIS`,
    description: p.description || `Peer-reviewed scientific polar publication indexed in Scopus and NCPOR repository.`,
    image: `${DOMAIN}/og-image.jpg`,
  })
})

knowledge.forEach(k => {
  routes.push({
    path: `/knowledge/${k.id}`,
    title: `${k.title} · Polar Knowledge · POLARIS`,
    description: k.description || `Polar knowledge and cryospheric research monograph.`,
    image: `${DOMAIN}/og-image.jpg`,
  })
})

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

let generatedCount = 0

routes.forEach(route => {
  const canonicalUrl = `${DOMAIN}${route.path}`
  const escapedTitle = escapeHtml(route.title)
  const escapedDesc = escapeHtml(route.description)
  const image = route.image || `${DOMAIN}/og-image.jpg`

  let html = baseHtml

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapedTitle}</title>`)

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${escapedDesc}" />`
  )

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  )

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapedDesc}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)
  html = html.replace(/<meta property="og:image:secure_url" content=".*?" \/>/, `<meta property="og:image:secure_url" content="${image}" />`)

  // Replace Twitter Tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapedDesc}" />`)
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`)

  // Inject hreflang alternate tags right before </head>
  const hreflangTags = `
    <link rel="alternate" hreflang="en" href="${canonicalUrl}?lang=en" />
    <link rel="alternate" hreflang="hi" href="${canonicalUrl}?lang=hi" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
  </head>`
  html = html.replace('</head>', hreflangTags)

  if (route.path === '/') {
    // Update root index.html
    fs.writeFileSync(INDEX_HTML_PATH, html, 'utf8')
    generatedCount++
  } else {
    // Create nested directory dist{route.path}/index.html
    const targetDir = path.join(DIST_DIR, route.path)
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8')
    generatedCount++
  }
})

console.log(`[Pre-render] Successfully generated ${generatedCount} pre-rendered static HTML routes in dist/`)
