/**
 * POLARIS - Supabase Data Migration & Seed Runner
 *
 * Runs programmatic seeding into your Supabase database for the 4 core tables:
 * 1. expeditions (6 records)
 * 2. datasets (10 records)
 * 3. publications (8 records)
 * 4. knowledge (12 records)
 *
 * Usage:
 *   node --env-file=.env scripts/seed-supabase.js
 */

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!url || !key) {
  console.log('------------------------------------------------------------')
  console.log('ℹ️  No Supabase credentials detected in .env file.')
  console.log('   To seed your Supabase PostgreSQL project:')
  console.log('   1. Add your project credentials to .env:')
  console.log('      VITE_SUPABASE_URL=https://your-project.supabase.co')
  console.log('      VITE_SUPABASE_ANON_KEY=your_anon_key')
  console.log('   2. Paste supabase/schema.sql and supabase/seed.sql')
  console.log('      directly into your Supabase SQL Editor.')
  console.log('   3. Run: node --env-file=.env scripts/seed-supabase.js')
  console.log('------------------------------------------------------------')
  process.exit(0)
}

const supabase = createClient(url, key)

const expeditionsData = [
  {
    id: 'isro-44',
    title: '44th Indian Scientific Expedition to Antarctica',
    short_title: '44th ISEA',
    region: 'Antarctic',
    year: 2025,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    lead: 'NCPOR · Ministry of Earth Sciences',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Polarstern_MOSAiC.jpg',
    overview: 'A flagship annual expedition conducting year-round atmospheric, oceanographic and cryospheric observations in the Southern Ocean and East Antarctic region, supporting climate and geoscience research.',
    timeline: [
      { date: 'Nov 2024', event: 'Pre-expedition logistics and equipment mobilisation from Cape Town' },
      { date: 'Jan 2025', event: 'Departure from Goa, sail across the Southern Ocean' },
      { date: 'Feb 2025', event: 'Resupply and crew rotation at Bharati and Maitri' },
      { date: 'Mar 2025', event: 'Sea-ice and atmospheric observation campaign' },
      { date: 'Apr 2025', event: 'Return sail and post-cruise sample processing' }
    ],
    scientists: [
      { name: 'Dr. A. Bhattacharya', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. R. Mohan', role: 'Glaciology Lead', affiliation: 'NCPOR' },
      { name: 'Dr. S. Tiwari', role: 'Atmospheric Chemistry', affiliation: 'IITM' },
      { name: 'Dr. P. Verma', role: 'Oceanographer', affiliation: 'NIO' }
    ],
    research_areas: ['Atmospheric Sciences', 'Oceanography', 'Glaciology'],
    objectives: [
      'Atmospheric black carbon and aerosol chemistry over the Southern Ocean',
      'CTD profiling along the Meridional transect',
      'Ice core sampling at Larsemann Hills',
      'Continuous meteorological observations at Maitri'
    ],
    reports: [
      { title: '44th ISEA Preliminary Report (Demo)', year: 2025, type: 'PDF' },
      { title: 'Maitri AWS Annual Summary (Demo)', year: 2024, type: 'PDF' }
    ],
    highlights: [
      { title: 'Black Carbon Transect', description: 'Aerosol sampling along the Southern Ocean cruise track.' },
      { title: 'Larsemann Ice Cores', description: 'Recovery of shallow firn cores for climate proxies.' }
    ],
    status: 'Completed'
  },
  {
    id: 'isro-43',
    title: '43rd Indian Scientific Expedition to Antarctica',
    short_title: '43rd ISEA',
    region: 'Antarctic',
    year: 2024,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    lead: 'NCPOR · Ministry of Earth Sciences',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Scientist_examines_an_ice_core.jpg',
    overview: 'Summer expedition focused on geological mapping, microbial biodiversity and atmospheric chemistry around the Larsemann Hills and Schirmacher Oasis.',
    timeline: [
      { date: 'Dec 2023', event: 'Logistics planning and equipment preparation' },
      { date: 'Jan 2024', event: 'Departure from Cape Town' },
      { date: 'Feb 2024', event: 'Field campaigns at Larsemann Hills' },
      { date: 'Mar 2024', event: 'Return and sample analysis' }
    ],
    scientists: [
      { name: 'Dr. M. Sharma', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. K. Singh', role: 'Microbiology Lead', affiliation: 'NCPOR' }
    ],
    research_areas: ['Geology', 'Biology', 'Atmospheric Sciences'],
    objectives: [
      'Geomapping of the Broknes Peninsula',
      'Cultivable diversity in Antarctic soils',
      'DMSP flux measurements in surface ocean'
    ],
    reports: [{ title: '43rd ISEA Annual Report (Demo)', year: 2024, type: 'PDF' }],
    highlights: [{ title: 'Broknes Mapping', description: 'Updated geological maps of the Broknes Peninsula.' }],
    status: 'Completed'
  },
  {
    id: 'arctic-2024',
    title: 'Indian Arctic Expedition — Svalbard & Ny-Ålesund',
    short_title: 'Arctic 2024',
    region: 'Arctic',
    year: 2024,
    season: 'Summer',
    vessel: null,
    lead: 'NCPOR · Ministry of Earth Sciences',
    image_url: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1600&q=80',
    overview: 'A summer campaign in the Svalbard archipelago supporting atmospheric, glaciological and fjord observatories operated under the Himadri research framework.',
    timeline: [
      { date: 'May 2024', event: 'Pre-cruise preparation at NCPOR' },
      { date: 'Jun 2024', event: 'Deployment of field teams to Svalbard' },
      { date: 'Jul 2024', event: 'Glacier mass-balance and sea-ice observations' },
      { date: 'Aug 2024', event: 'Return and sample shipment' }
    ],
    scientists: [
      { name: 'Dr. N. Krishnan', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. A. Kulkarni', role: 'Glaciologist', affiliation: 'IISc' }
    ],
    research_areas: ['Atmospheric Sciences', 'Glaciology', 'Oceanography'],
    objectives: [
      'Seasonal snow chemistry and stable water isotopes',
      'Austre Lovén glacier mass-balance',
      'Fjord hydrography in Kongsfjorden'
    ],
    reports: [{ title: 'Indian Arctic Campaign Report (Demo)', year: 2024, type: 'PDF' }],
    highlights: [{ title: 'Kongsfjorden Hydrography', description: 'Seasonal CTD profiles of the fjord system.' }],
    status: 'Completed'
  },
  {
    id: 'so-cruise-2023',
    title: 'Southern Ocean Hydrographic Cruise 2023',
    short_title: 'SO Cruise 2023',
    region: 'Southern Ocean',
    year: 2023,
    season: 'Summer',
    vessel: 'ORV Sagar Nidhi',
    lead: 'NCPOR · Ministry of Earth Sciences',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    overview: 'A meridional cruise covering the Indian Ocean sector of the Southern Ocean, contributing to global hydrographic and biogeochemical reference datasets.',
    timeline: [
      { date: 'Jan 2023', event: 'Mobilisation in Port Louis' },
      { date: 'Feb 2023', event: 'CTD and underway sampling' },
      { date: 'Mar 2023', event: 'Return and data archival' }
    ],
    scientists: [{ name: 'Dr. P. Vidya', role: 'Chief Scientist', affiliation: 'NCPOR' }],
    research_areas: ['Oceanography', 'Climate'],
    objectives: [
      'Meridional overturning circulation tracers',
      'CO₂ flux and carbonate chemistry',
      'Microbial community structure'
    ],
    reports: [{ title: 'SO Cruise 2023 Report (Demo)', year: 2023, type: 'PDF' }],
    highlights: [{ title: 'CO₂ Flux', description: 'Underway pCO₂ along the meridional transect.' }],
    status: 'Completed'
  },
  {
    id: 'himalaya-glacier-2022',
    title: 'Himalayan Glacier Mass Balance Programme 2022',
    short_title: 'Himalaya 2022',
    region: 'Himalaya',
    year: 2022,
    season: 'Summer',
    vessel: null,
    lead: 'NCPOR collaborative programme',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Kongsfjorden_Colletth%C3%B6gda_IMG_6424.JPG',
    overview: 'Long-term monitoring of benchmark glaciers in the western Himalaya, complementing polar cryospheric studies.',
    timeline: [
      { date: 'Apr 2022', event: 'Field team deployment' },
      { date: 'May–Sep 2022', event: 'Mass-balance and AWS observations' },
      { date: 'Oct 2022', event: 'Data archival' }
    ],
    scientists: [{ name: 'Dr. A. Kulkarni', role: 'Lead Investigator', affiliation: 'IISc' }],
    research_areas: ['Glaciology', 'Climate'],
    objectives: ['Seasonal mass balance', 'AWS meteorology'],
    reports: [{ title: 'Chhota Shigri 2022 Report (Demo)', year: 2022, type: 'PDF' }],
    highlights: [{ title: 'Chhota Shigri', description: 'Long-term benchmark glacier mass-balance site.' }],
    status: 'Completed'
  },
  {
    id: 'isro-42',
    title: '42nd Indian Scientific Expedition to Antarctica',
    short_title: '42nd ISEA',
    region: 'Antarctic',
    year: 2023,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    lead: 'NCPOR · Ministry of Earth Sciences',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
    overview: 'Pre-Antarctic Treaty Consultative Meeting support expedition — focused on long-term observatories and summer field campaigns.',
    timeline: [
      { date: 'Dec 2022', event: 'Departure from Cape Town' },
      { date: 'Feb 2023', event: 'Field campaigns in Dronning Maud Land' },
      { date: 'Mar 2023', event: 'Return' }
    ],
    scientists: [{ name: 'Dr. S. Roy', role: 'Chief Scientist', affiliation: 'NCPOR' }],
    research_areas: ['Geology', 'Glaciology', 'Atmospheric Sciences'],
    objectives: ['Dronning Maud Land geological mapping', 'Ice core recovery'],
    reports: [{ title: '42nd ISEA Report (Demo)', year: 2023, type: 'PDF' }],
    highlights: [{ title: 'DML Field Camp', description: 'Summer geological camp in Dronning Maud Land.' }],
    status: 'Completed'
  }
]

const datasetsData = [
  {
    id: 'ds-atm-001',
    title: 'Maitri Atmospheric Black Carbon (Demo)',
    description: 'Continuous measurements of equivalent black carbon mass concentration at the Maitri station, with supporting meteorological variables. (Demo dataset)',
    area: 'Atmospheric Sciences',
    region: 'Antarctic · Maitri',
    year: 2024,
    format: 'CSV / NetCDF',
    size: '12.4 MB',
    coverage: '2020–2024, hourly',
    related_expedition: 'isro-44',
    related_publication: 'pub-2024-03',
    preview_rows: [
      { name: 'Timestamp', value: '2024-02-12T03:00:00Z' },
      { name: 'EBC (ng/m³)', value: '32.4' },
      { name: 'Wind Speed (m/s)', value: '4.1' },
      { name: 'Temperature (°C)', value: '-11.2' },
      { name: 'Pressure (hPa)', value: '982.3' }
    ]
  },
  {
    id: 'ds-oce-002',
    title: 'Southern Ocean CTD Transect (Demo)',
    description: 'Downcast CTD profiles along the meridional transect from Cape Town to Antarctica, with derived salinity, temperature and oxygen. (Demo dataset)',
    area: 'Oceanography',
    region: 'Southern Ocean',
    year: 2024,
    format: 'NetCDF',
    size: '84.1 MB',
    coverage: '2024 cruise · 64 stations',
    related_expedition: 'isro-44',
    related_publication: 'pub-2025-01',
    preview_rows: [
      { name: 'Station', value: 'SO-12' },
      { name: 'Latitude', value: '-52.40°S' },
      { name: 'Longitude', value: '14.10°E' },
      { name: 'Depth (m)', value: '4200' },
      { name: 'Bottom Temp (°C)', value: '0.42' }
    ]
  },
  {
    id: 'ds-gla-003',
    title: 'Larsemann Hills Shallow Firn Cores (Demo)',
    description: 'Stable water isotope and major ion profiles from shallow firn cores recovered during the 44th ISEA. (Demo dataset)',
    area: 'Glaciology',
    region: 'Antarctic · Larsemann Hills',
    year: 2025,
    format: 'CSV',
    size: '3.2 MB',
    coverage: '3 cores · 0–12 m',
    related_expedition: 'isro-44',
    related_publication: null,
    preview_rows: [
      { name: 'Core ID', value: 'LH-03' },
      { name: 'Depth (m)', value: '4.2' },
      { name: 'δ¹⁸O (‰)', value: '-28.1' },
      { name: 'δD (‰)', value: '-216.4' }
    ]
  },
  {
    id: 'ds-bio-004',
    title: 'Antarctic Soil Microbial Diversity (Demo)',
    description: '16S rRNA amplicon sequencing of soil samples from the Larsemann Hills. (Demo dataset)',
    area: 'Biodiversity',
    region: 'Antarctic',
    year: 2024,
    format: 'FASTQ / CSV',
    size: '212 MB',
    coverage: '48 samples',
    related_expedition: 'isro-43',
    related_publication: null,
    preview_rows: [
      { name: 'Sample', value: 'LH-S-12' },
      { name: 'Latitude', value: '-69.40°S' },
      { name: 'Reads', value: '84,210' }
    ]
  },
  {
    id: 'ds-geo-005',
    title: 'Broknes Peninsula Geological Map (Demo)',
    description: 'Vector geological map of the Broknes Peninsula derived from field campaigns. (Demo dataset)',
    area: 'Geology',
    region: 'Antarctic · Broknes',
    year: 2024,
    format: 'GeoJSON',
    size: '8.7 MB',
    coverage: '1:25,000',
    related_expedition: 'isro-43',
    related_publication: null,
    preview_rows: [{ name: 'Feature', value: 'Orthogneiss unit' }]
  },
  {
    id: 'ds-gla-006',
    title: 'Austre Lovén Glacier Mass Balance (Demo)',
    description: 'Seasonal surface mass-balance measurements on the Austre Lovén glacier, Svalbard. (Demo dataset)',
    area: 'Glaciology',
    region: 'Arctic · Svalbard',
    year: 2024,
    format: 'CSV',
    size: '1.8 MB',
    coverage: '2015–2024, monthly',
    related_expedition: 'arctic-2024',
    related_publication: null,
    preview_rows: [
      { name: 'Stake', value: 'AL-04' },
      { name: 'Net mass (mm w.e.)', value: '-628' }
    ]
  },
  {
    id: 'ds-oce-007',
    title: 'Kongsfjorden Hydrography (Demo)',
    description: 'CTD profiles of the Kongsfjorden fjord system. (Demo dataset)',
    area: 'Oceanography',
    region: 'Arctic · Svalbard',
    year: 2024,
    format: 'NetCDF',
    size: '22.0 MB',
    coverage: '12 stations',
    related_expedition: 'arctic-2024',
    related_publication: null,
    preview_rows: [{ name: 'Station', value: 'KF-06' }]
  },
  {
    id: 'ds-oce-008',
    title: 'Southern Ocean CO₂ Underway (Demo)',
    description: 'Underway pCO₂ and sea surface temperature along the Southern Ocean transect. (Demo dataset)',
    area: 'Climate',
    region: 'Southern Ocean',
    year: 2023,
    format: 'CSV',
    size: '5.1 MB',
    coverage: '2023 cruise',
    related_expedition: 'so-cruise-2023',
    related_publication: null,
    preview_rows: [{ name: 'pCO₂ (µatm)', value: '398.4' }]
  },
  {
    id: 'ds-gla-009',
    title: 'Chhota Shigri Annual Mass Balance (Demo)',
    description: 'Long-term annual and seasonal mass-balance of Chhota Shigri glacier. (Demo dataset)',
    area: 'Glaciology',
    region: 'Himalaya',
    year: 2022,
    format: 'CSV',
    size: '0.6 MB',
    coverage: '1987–2022',
    related_expedition: 'himalaya-glacier-2022',
    related_publication: null,
    preview_rows: [{ name: 'Net mass (m w.e.)', value: '-0.42' }]
  },
  {
    id: 'ds-gla-010',
    title: 'Dronning Maud Land Snow Pit (Demo)',
    description: 'Snow pit chemistry and stable isotope profiles from DML. (Demo dataset)',
    area: 'Glaciology',
    region: 'Antarctic · DML',
    year: 2023,
    format: 'CSV',
    size: '1.1 MB',
    coverage: '5 pits',
    related_expedition: 'isro-42',
    related_publication: null,
    preview_rows: [{ name: 'Pit ID', value: 'DML-P2' }]
  }
]

const publicationsData = [
  {
    id: 'pub-2024-03',
    title: 'Equivalent black carbon over the Southern Ocean: Seasonal observations from Maitri',
    authors: ['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.'],
    year: 2024,
    journal: 'Polar Science (Demo)',
    doi: '10.0000/polaris.2024.0003',
    abstract: 'We present a seasonal analysis of equivalent black carbon mass concentration observed at the Maitri station, supported by back-trajectory and fire emission inventories. The data demonstrate clean marine conditions and episodic long-range transport from southern Africa and South America. (Demo abstract)',
    area: 'Atmospheric Sciences',
    expedition: 'isro-44',
    dataset: 'ds-atm-001',
    type: 'Journal'
  },
  {
    id: 'pub-2025-01',
    title: 'Meridional variability of the Southern Ocean overturning circulation (2024 transect)',
    authors: ['Verma, P.', 'Vidya, P.'],
    year: 2025,
    journal: 'Journal of Southern Ocean Studies (Demo)',
    doi: '10.0000/polaris.2025.0001',
    abstract: 'CTD and tracer observations along a 2024 meridional transect reveal significant interannual variability in the upper overturning cell, with implications for heat and carbon uptake. (Demo abstract)',
    area: 'Oceanography',
    expedition: 'isro-44',
    dataset: 'ds-oce-002',
    type: 'Journal'
  },
  {
    id: 'pub-2024-01',
    title: 'Cultivable microbial diversity in Larsemann Hills soils',
    authors: ['Singh, K.', 'Sharma, M.'],
    year: 2024,
    journal: 'Antarctic Microbiology Letters (Demo)',
    doi: '10.0000/polaris.2024.0001',
    abstract: 'A culture-dependent survey of Larsemann Hills soils reveals psychrotolerant isolates with biotechnological potential, including cold-active enzymes and antifreeze proteins. (Demo abstract)',
    area: 'Biodiversity',
    expedition: 'isro-43',
    dataset: 'ds-bio-004',
    type: 'Journal'
  },
  {
    id: 'pub-2024-02',
    title: 'Updated geological map of the Broknes Peninsula: Implications for Rodinia reconstructions',
    authors: ['Sharma, M.', 'Roy, S.'],
    year: 2024,
    journal: 'Precambrian Research (Demo)',
    doi: '10.0000/polaris.2024.0002',
    abstract: 'A revised 1:25,000 geological map of the Broknes Peninsula integrates structural, petrological and geochronological data, supporting regional correlations with Indo-Antarctic cratonic blocks. (Demo abstract)',
    area: 'Geology',
    expedition: 'isro-43',
    dataset: 'ds-geo-005',
    type: 'Journal'
  },
  {
    id: 'pub-2024-05',
    title: 'Snow chemistry and stable water isotopes on Austre Lovén glacier',
    authors: ['Krishnan, N.', 'Kulkarni, A.'],
    year: 2024,
    journal: 'Arctic, Antarctic and Alpine Research (Demo)',
    doi: '10.0000/polaris.2024.0005',
    abstract: 'A multi-year record of snow chemistry and isotope ratios from a Svalbard benchmark glacier shows strong seasonality and episodic Arctic moisture transport. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'arctic-2024',
    dataset: 'ds-gla-006',
    type: 'Journal'
  },
  {
    id: 'pub-2023-02',
    title: 'Underway pCO₂ along the 2023 Southern Ocean meridional transect',
    authors: ['Vidya, P.'],
    year: 2023,
    journal: 'Geophysical Research Letters (Demo)',
    doi: '10.0000/polaris.2023.0002',
    abstract: 'Underway pCO₂ observations along the 2023 meridional transect document the seasonal sink in the Subantarctic Zone and localised outgassing south of the Polar Front. (Demo abstract)',
    area: 'Climate',
    expedition: 'so-cruise-2023',
    dataset: 'ds-oce-008',
    type: 'Journal'
  },
  {
    id: 'pub-2023-01',
    title: 'Snow-pit chemistry across Dronning Maud Land',
    authors: ['Roy, S.'],
    year: 2023,
    journal: 'Polar Science (Demo)',
    doi: '10.0000/polaris.2023.0001',
    abstract: 'A network of shallow snow pits in Dronning Maud Land captures the spatial variability of major ions and stable water isotopes, supporting the design of deep ice-coring programmes. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'isro-42',
    dataset: 'ds-gla-010',
    type: 'Journal'
  },
  {
    id: 'pub-2022-01',
    title: 'Long-term mass balance of Chhota Shigri glacier, western Himalaya',
    authors: ['Kulkarni, A.'],
    year: 2022,
    journal: 'Journal of Glaciology (Demo)',
    doi: '10.0000/polaris.2022.0001',
    abstract: 'A 35-year mass-balance record of Chhota Shigri glacier reveals strong interannual variability tied to regional climate modes, with an overall negative trend. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'himalaya-glacier-2022',
    dataset: 'ds-gla-009',
    type: 'Journal'
  }
]

const knowledgeData = [
  {
    id: 'kb-1',
    type: 'Field Story',
    title: 'First Light at Bharati',
    excerpt: 'A field assistant describes a clear morning at the Larsemann Hills, and what the team gets done before the katabatic winds pick up.',
    body: 'By 06:30 the Sun is already lifting above the Broknes ridge. The wind is calm, the ice reflects a low gold, and the team splits into pairs: glaciology to the firn pits, biology to the soil transects. By noon the katabatic will set in, and we will all be back at the heated containers, processing samples. The rhythm of an Antarctic day is unusual at first, then utterly ordinary. You begin to measure your work in shifts and your meals in calories. The cold, which felt so foreign on day one, becomes a constant — an environment, almost a colleague, that you negotiate with each day.',
    tags: ['Bharati', 'Larsemann Hills', 'Field Diary'],
    category: 'Field Stories',
    year: 2024,
    author: 'Field Team · 43rd ISEA (Demo)',
    related_expedition: 'isro-43',
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-2',
    type: 'Report',
    title: '44th ISEA Preliminary Report',
    excerpt: 'A summary of operations, science campaigns and station logistics for the 44th Indian Scientific Expedition to Antarctica.',
    body: 'The 44th ISEA supported year-round atmospheric, oceanographic and glaciological programmes at Bharati and Maitri. Major deliverables included the recovery of shallow firn cores, summer aerosol and BC measurements, and the continuation of long-term AWS records. Logistics involved the MV Vasiliy Golovnin, intra-continental traverses and helicopter support from DROMLAN.',
    tags: ['ISEA', 'Annual Report', 'Antarctic'],
    category: 'Reports',
    year: 2025,
    author: 'NCPOR (Demo)',
    related_expedition: 'isro-44',
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-3',
    type: 'Article',
    title: 'Why the Poles Matter to India',
    excerpt: 'A short essay on why the Indian polar programme is part of the country’s climate, ocean and strategic interests.',
    body: 'India sits in the tropics, but its climate, monsoon and oceans are tightly coupled to the polar regions. A warmer Antarctic and a melting Greenland alter the thermohaline circulation and the sea-level budget. The Himalayan cryosphere — itself a polar analogue — supplies the perennial rivers of the Indo-Gangetic plain. Polar science is therefore not a luxury: it is a foundational investment in India’s environmental and economic future.',
    tags: ['Climate', 'Policy', 'India'],
    category: 'Articles',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-4',
    type: 'News',
    title: 'Polar Outreach Workshop Concludes in Goa',
    excerpt: 'A summary of the annual polar outreach workshop, which brings together scientists, teachers and students.',
    body: 'The annual Polar Outreach Workshop brought together researchers, science educators and students for a week of lectures, lab tours and field demonstrations. Highlights included a sea-ice tank experiment, a polar climate role-play, and a poster session featuring class projects from schools across India.',
    tags: ['Outreach', 'Education'],
    category: 'News',
    year: 2024,
    author: 'POLARIS (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-5',
    type: 'Educational',
    title: 'How to Read a CTD Profile',
    excerpt: 'A step-by-step guide to interpreting conductivity, temperature and depth measurements from polar oceans.',
    body: 'A CTD cast gives you three primary variables — temperature, salinity (from conductivity) and pressure (depth) — as the instrument is lowered through the water column. From these you derive density, buoyancy frequency and a number of derived quantities. Reading a profile is partly art: look for the mixed layer, the thermocline, intermediate water masses and the deep western boundary current signal.',
    tags: ['Oceanography', 'Methods', 'Tutorial'],
    category: 'Educational',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-6',
    type: 'Publication',
    title: 'Equivalent black carbon over the Southern Ocean',
    excerpt: 'A journal article on seasonal black carbon observations at Maitri.',
    body: 'We present a seasonal analysis of equivalent black carbon mass concentration at Maitri, supported by back-trajectory analysis. The dataset is openly available through POLARIS.',
    tags: ['Atmospheric Sciences', 'Black Carbon'],
    category: 'Publications',
    year: 2024,
    author: 'Tiwari et al. (Demo)',
    related_expedition: 'isro-44',
    related_dataset: 'ds-atm-001',
    related_publication: 'pub-2024-03'
  },
  {
    id: 'kb-7',
    type: 'Dataset',
    title: 'Southern Ocean CTD Transect (Demo)',
    excerpt: 'A 64-station CTD transect along the Southern Ocean, supporting overturning circulation studies.',
    body: 'Downcast CTD profiles with derived salinity, temperature and oxygen along a meridional transect. Quality-controlled, distributed as NetCDF.',
    tags: ['Oceanography', 'CTD'],
    category: 'Datasets',
    year: 2024,
    author: 'NCPOR (Demo)',
    related_expedition: 'isro-44',
    related_dataset: 'ds-oce-002',
    related_publication: 'pub-2025-01'
  },
  {
    id: 'kb-8',
    type: 'Field Story',
    title: 'Svalbard in Polar Day',
    excerpt: 'A summer field diary from Kongsfjorden — sampling in 24-hour daylight.',
    body: 'In June, the Sun never sets. Workdays are organised by tides and weather, not by the clock. Sampling a glacier outflow at midnight is a strange, almost cinematic experience: the air is warm, the water is cold, the sky is soft pink. Everything is geology and water and patience.',
    tags: ['Arctic', 'Svalbard', 'Field Diary'],
    category: 'Field Stories',
    year: 2024,
    author: 'Field Team · Arctic 2024 (Demo)',
    related_expedition: 'arctic-2024',
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-9',
    type: 'Report',
    title: 'Maitri Annual AWS Summary',
    excerpt: 'A station-level annual summary of meteorological observations.',
    body: 'Automatic weather station (AWS) observations at Maitri for the previous calendar year, including temperature, wind, pressure, radiation and snow depth. Quality flags follow WMO guidelines.',
    tags: ['AWS', 'Maitri', 'Meteorology'],
    category: 'Reports',
    year: 2024,
    author: 'NCPOR (Demo)',
    related_expedition: 'isro-44',
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-10',
    type: 'Article',
    title: 'A Beginner’s Guide to Sea Ice',
    excerpt: 'How sea ice forms, why it matters, and what its decline means.',
    body: 'Sea ice is one of the most visible indicators of a changing climate. It forms when the upper ocean cools below its freezing point; brine is rejected, leaving a porous solid that thickens through the winter. In summer, melt ponds dot its surface. Its high albedo — the fraction of sunlight it reflects — helps regulate Earth’s energy balance. When sea ice shrinks, the darker ocean absorbs more heat, accelerating warming: a feedback loop at the heart of polar climate.',
    tags: ['Sea Ice', 'Climate', 'Beginner'],
    category: 'Articles',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-11',
    type: 'Educational',
    title: 'Glossary of Polar Terms',
    excerpt: 'A living glossary of polar science vocabulary for students and educators.',
    body: 'From ablation to zooplankton — a curated glossary used across the POLARIS education modules.',
    tags: ['Glossary', 'Reference'],
    category: 'Educational',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  },
  {
    id: 'kb-12',
    type: 'News',
    title: 'International Polar Day Celebrated in Schools',
    excerpt: 'A roundup of school events marking International Polar Day.',
    body: 'Schools across India hosted quizzes, poster-making sessions and guest lectures to mark International Polar Day, coordinated through POLARIS partner institutions.',
    tags: ['Education', 'Outreach'],
    category: 'News',
    year: 2024,
    author: 'POLARIS (Demo)',
    related_expedition: null,
    related_dataset: null,
    related_publication: null
  }
]

async function seedData() {
  console.log(`Connecting to Supabase at: ${url}`)

  console.log('Seeding expeditions (6 records)...')
  const { error: expErr } = await supabase.from('expeditions').upsert(expeditionsData, { onConflict: 'id' })
  if (expErr) console.warn('Expeditions upsert warning:', expErr.message)
  else console.log('✅ Expeditions seeded.')

  console.log('Seeding datasets (10 records)...')
  const { error: dsErr } = await supabase.from('datasets').upsert(datasetsData, { onConflict: 'id' })
  if (dsErr) console.warn('Datasets upsert warning:', dsErr.message)
  else console.log('✅ Datasets seeded.')

  console.log('Seeding publications (8 records)...')
  const { error: pubErr } = await supabase.from('publications').upsert(publicationsData, { onConflict: 'id' })
  if (pubErr) console.warn('Publications upsert warning:', pubErr.message)
  else console.log('✅ Publications seeded.')

  console.log('Seeding knowledge (12 records)...')
  const { error: kbErr } = await supabase.from('knowledge').upsert(knowledgeData, { onConflict: 'id' })
  if (kbErr) console.warn('Knowledge upsert warning:', kbErr.message)
  else console.log('✅ Knowledge seeded.')

  console.log('\n--- VERIFYING TABLE RECORD COUNTS ---')
  const tables = ['expeditions', 'datasets', 'publications', 'knowledge']
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true })
    if (error) {
      console.log(`❌ Table "${t}": Error (${error.message})`)
    } else {
      console.log(`✅ Table "${t}": ${count} records`)
    }
  }
}

seedData().catch(console.error)
