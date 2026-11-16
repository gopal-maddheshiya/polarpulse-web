const fs = require('fs')
const path = require('path')

const DOMAIN = 'https://polaris-sih2026.vercel.app'
const BUILD_DATE = new Date().toUTCString()

const feedItems = [
  {
    title: '44th Indian Scientific Expedition to Antarctica (44th IAE) Resupply and Deployment',
    link: `${DOMAIN}/expeditions/isro-44`,
    description: 'Flagship summer voyage deploying 72 scientists aboard MV Vasiliy Golovnin to Maitri and Bharati stations, conducting firn coring, aerosol optical depth profiling, and atmospheric black carbon surveys.',
    pubDate: new Date('2025-01-15T08:00:00Z').toUTCString(),
    category: 'Expedition',
    guid: `${DOMAIN}/expeditions/isro-44`,
  },
  {
    title: 'New Open Dataset: Maitri Atmospheric Black Carbon & Surface Meteorology',
    link: `${DOMAIN}/datasets/ds-atm-001`,
    description: 'Continuous hourly time-series (CSV / NetCDF) of equivalent black carbon (EBC) mass concentration, multi-wavelength absorption coefficients, and surface micro-meteorology from Maitri Station.',
    pubDate: new Date('2025-01-10T10:00:00Z').toUTCString(),
    category: 'Open Data',
    guid: `${DOMAIN}/datasets/ds-atm-001`,
  },
  {
    title: 'Southern Ocean CTD Meridional Hydrographic Transect Released',
    link: `${DOMAIN}/datasets/ds-oce-002`,
    description: 'Full-depth (0–4,500m) Sea-Bird CTD casts across the 57°30′E meridian transect recording potential temperature, practical salinity, and dissolved oxygen.',
    pubDate: new Date('2024-12-28T09:00:00Z').toUTCString(),
    category: 'Open Data',
    guid: `${DOMAIN}/datasets/ds-oce-002`,
  },
  {
    title: 'Indian Arctic Winter Campaign at Ny-Ålesund, Svalbard',
    link: `${DOMAIN}/expeditions/arctic-2024`,
    description: 'Year-round atmospheric observation of Arctic amplification, aerosol-cloud interactions, and Kongsfjorden fjord dynamics from Himadri station.',
    pubDate: new Date('2024-11-20T12:00:00Z').toUTCString(),
    category: 'Expedition',
    guid: `${DOMAIN}/expeditions/arctic-2024`,
  },
  {
    title: 'Publication: Decadal Variations in Antarctic Firn Density and Surface Mass Balance',
    link: `${DOMAIN}/publications/pub-2025-01`,
    description: 'Peer-reviewed study analyzing firn core records from Princess Elizabeth Land, documenting accelerated coastal accumulation and Southern Annular Mode teleconnections.',
    pubDate: new Date('2025-01-05T14:30:00Z').toUTCString(),
    category: 'Publication',
    guid: `${DOMAIN}/publications/pub-2025-01`,
  },
  {
    title: 'Himalayan Chhota Shigri Glacier Mass Balance Time-Series Updated',
    link: `${DOMAIN}/datasets/ds-gla-003`,
    description: 'Glaciological specific mass balance, equilibrium line altitude (ELA), and accumulation area ratio (AAR) observations in the Chandra Basin.',
    pubDate: new Date('2024-10-15T08:00:00Z').toUTCString(),
    category: 'Open Data',
    guid: `${DOMAIN}/datasets/ds-gla-003`,
  },
  {
    title: 'Smart Education Lab: Polar Science Scholar Certification Launched',
    link: `${DOMAIN}/education`,
    description: 'Interactive curriculum calibrating Antarctic, Arctic, and Himalayan polar science modules with cryptographically verifiable scholar certificates for students.',
    pubDate: new Date('2024-09-01T08:00:00Z').toUTCString(),
    category: 'Education',
    guid: `${DOMAIN}/education`,
  },
]

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>POLARIS · India's Polar Knowledge &amp; Mission Updates</title>
    <link>${DOMAIN}</link>
    <description>Official scientific dispatches from Indian Antarctic, Arctic, and Southern Ocean expeditions, open cryosphere datasets, and peer-reviewed polar publications under MoES / NCPOR.</description>
    <language>en-in</language>
    <lastBuildDate>${BUILD_DATE}</lastBuildDate>
    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${DOMAIN}/favicon.svg</url>
      <title>POLARIS</title>
      <link>${DOMAIN}</link>
    </image>
${feedItems
  .map(
    item => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`

const outputPath = path.resolve(__dirname, '../public/rss.xml')
fs.writeFileSync(outputPath, rssXml, 'utf8')
console.log(`[RSS] Generated ${feedItems.length} items in ${outputPath}`)
