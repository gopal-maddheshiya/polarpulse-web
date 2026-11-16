const fs = require('fs')
const path = require('path')

const DOMAIN = 'https://polaris-sih2026.vercel.app'
const TODAY = new Date().toISOString().split('T')[0]

// Extract IDs from TypeScript data files via regex so no compilation step is needed
function extractIds(filePath) {
  try {
    const fullPath = path.resolve(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) return []
    const content = fs.readFileSync(fullPath, 'utf8')
    const matches = content.matchAll(/^\s*id:\s*['"]([^'"]+)['"]/gm)
    return Array.from(matches, m => m[1])
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err)
    return []
  }
}

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/explore', priority: '0.9', changefreq: 'weekly' },
  { url: '/expeditions', priority: '0.9', changefreq: 'weekly' },
  { url: '/datasets', priority: '0.9', changefreq: 'daily' },
  { url: '/publications', priority: '0.8', changefreq: 'weekly' },
  { url: '/knowledge', priority: '0.8', changefreq: 'weekly' },
  { url: '/education', priority: '0.8', changefreq: 'monthly' },
  { url: '/media', priority: '0.7', changefreq: 'monthly' },
  { url: '/communicator', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
]

const expeditionIds = extractIds('src/data/expeditions.ts')
const datasetIds = extractIds('src/data/datasets.ts')
const publicationIds = extractIds('src/data/publications.ts')
const knowledgeIds = extractIds('src/data/knowledge.ts')

const allRoutes = [
  ...staticRoutes,
  ...expeditionIds.map(id => ({ url: `/expeditions/${id}`, priority: '0.85', changefreq: 'weekly' })),
  ...datasetIds.map(id => ({ url: `/datasets/${id}`, priority: '0.85', changefreq: 'weekly' })),
  ...publicationIds.map(id => ({ url: `/publications/${id}`, priority: '0.75', changefreq: 'monthly' })),
  ...knowledgeIds.map(id => ({ url: `/knowledge/${id}`, priority: '0.75', changefreq: 'monthly' })),
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allRoutes
  .map(
    r => `  <url>
    <loc>${DOMAIN}${r.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outputPath, sitemapXml, 'utf8')
console.log(`[Sitemap] Generated ${allRoutes.length} URLs in ${outputPath}`)
