import { IMG } from './images'

export interface Expedition {
  id: string
  title: string
  shortTitle: string
  region: 'Antarctic' | 'Arctic' | 'Southern Ocean' | 'Himalaya'
  year: number
  season: 'Summer' | 'Winter' | 'Year-round'
  vessel?: string
  stations: string[]
  researchAreas: string[]
  lead: string
  image: string
  overview: string
  timeline: { date: string; event: string }[]
  scientists: { name: string; role: string; affiliation: string }[]
  research: string[]
  reports: { title: string; year: number; type: string }[]
  datasets: string[]
  publications: string[]
  highlights: { title: string; description: string }[]
}

export const expeditions: Expedition[] = [
  {
    id: 'isro-44',
    shortTitle: '44th ISEA',
    title: '44th Indian Scientific Expedition to Antarctica',
    region: 'Antarctic',
    year: 2025,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    stations: ['Bharati', 'Maitri'],
    researchAreas: ['Atmospheric Sciences', 'Oceanography', 'Glaciology'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.ship,
    overview:
      'A flagship annual expedition conducting year-round atmospheric, oceanographic and cryospheric observations in the Southern Ocean and East Antarctic region, supporting climate and geoscience research.',
    timeline: [
      { date: 'Nov 2024', event: 'Pre-expedition logistics and equipment mobilisation from Cape Town' },
      { date: 'Jan 2025', event: 'Departure from Goa, sail across the Southern Ocean' },
      { date: 'Feb 2025', event: 'Resupply and crew rotation at Bharati and Maitri' },
      { date: 'Mar 2025', event: 'Sea-ice and atmospheric observation campaign' },
      { date: 'Apr 2025', event: 'Return sail and post-cruise sample processing' },
    ],
    scientists: [
      { name: 'Dr. A. Bhattacharya', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. R. Mohan', role: 'Glaciology Lead', affiliation: 'NCPOR' },
      { name: 'Dr. S. Tiwari', role: 'Atmospheric Chemistry', affiliation: 'IITM' },
      { name: 'Dr. P. Verma', role: 'Oceanographer', affiliation: 'NIO' },
    ],
    research: [
      'Atmospheric black carbon and aerosol chemistry over the Southern Ocean',
      'CTD profiling along the Meridional transect',
      'Ice core sampling at Larsemann Hills',
      'Continuous meteorological observations at Maitri',
    ],
    reports: [
      { title: '44th ISEA Preliminary Report (Demo)', year: 2025, type: 'PDF' },
      { title: 'Maitri AWS Annual Summary (Demo)', year: 2024, type: 'PDF' },
    ],
    datasets: ['ds-atm-001', 'ds-oce-002', 'ds-gla-003'],
    publications: ['pub-2024-03', 'pub-2025-01'],
    highlights: [
      { title: 'Black Carbon Transect', description: 'Aerosol sampling along the Southern Ocean cruise track.' },
      { title: 'Larsemann Ice Cores', description: 'Recovery of shallow firn cores for climate proxies.' },
    ],
  },
  {
    id: 'isro-43',
    shortTitle: '43rd ISEA',
    title: '43rd Indian Scientific Expedition to Antarctica',
    region: 'Antarctic',
    year: 2024,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    stations: ['Bharati', 'Maitri'],
    researchAreas: ['Geology', 'Biology', 'Atmospheric Sciences'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.research,
    overview:
      'Summer expedition focused on geological mapping, microbial biodiversity and atmospheric chemistry around the Larsemann Hills and Schirmacher Oasis.',
    timeline: [
      { date: 'Dec 2023', event: 'Logistics planning and equipment preparation' },
      { date: 'Jan 2024', event: 'Departure from Cape Town' },
      { date: 'Feb 2024', event: 'Field campaigns at Larsemann Hills' },
      { date: 'Mar 2024', event: 'Return and sample analysis' },
    ],
    scientists: [
      { name: 'Dr. M. Sharma', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. K. Singh', role: 'Microbiology Lead', affiliation: 'NCPOR' },
    ],
    research: [
      'Geomapping of the Broknes Peninsula',
      'Cultivable diversity in Antarctic soils',
      'DMSP flux measurements in surface ocean',
    ],
    reports: [{ title: '43rd ISEA Annual Report (Demo)', year: 2024, type: 'PDF' }],
    datasets: ['ds-bio-004', 'ds-geo-005'],
    publications: ['pub-2024-01', 'pub-2024-02'],
    highlights: [
      { title: 'Broknes Mapping', description: 'Updated geological maps of the Broknes Peninsula.' },
    ],
  },
  {
    id: 'arctic-2024',
    shortTitle: 'Arctic 2024',
    title: 'Indian Arctic Expedition — Svalbard & Ny-Ålesund',
    region: 'Arctic',
    year: 2024,
    season: 'Summer',
    stations: ['Himadri Research Station', 'Ny-Ålesund'],
    researchAreas: ['Atmospheric Sciences', 'Glaciology', 'Oceanography'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.arctic,
    overview:
      'A summer campaign in the Svalbard archipelago supporting atmospheric, glaciological and fjord observatories operated under the Himadri research framework.',
    timeline: [
      { date: 'May 2024', event: 'Pre-cruise preparation at NCPOR' },
      { date: 'Jun 2024', event: 'Deployment of field teams to Svalbard' },
      { date: 'Jul 2024', event: 'Glacier mass-balance and sea-ice observations' },
      { date: 'Aug 2024', event: 'Return and sample shipment' },
    ],
    scientists: [
      { name: 'Dr. N. Krishnan', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. A. Kulkarni', role: 'Glaciologist', affiliation: 'IISc' },
    ],
    research: [
      'Seasonal snow chemistry and stable water isotopes',
      'Austre Lovén glacier mass-balance',
      'Fjord hydrography in Kongsfjorden',
    ],
    reports: [{ title: 'Indian Arctic Campaign Report (Demo)', year: 2024, type: 'PDF' }],
    datasets: ['ds-gla-006', 'ds-oce-007'],
    publications: ['pub-2024-05'],
    highlights: [
      { title: 'Kongsfjorden Hydrography', description: 'Seasonal CTD profiles of the fjord system.' },
    ],
  },
  {
    id: 'so-cruise-2023',
    shortTitle: 'SO Cruise 2023',
    title: 'Southern Ocean Hydrographic Cruise 2023',
    region: 'Southern Ocean',
    year: 2023,
    season: 'Summer',
    vessel: 'ORV Sagar Nidhi',
    stations: ['Southern Ocean Transect'],
    researchAreas: ['Oceanography', 'Climate'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.ocean,
    overview:
      'A meridional cruise covering the Indian Ocean sector of the Southern Ocean, contributing to global hydrographic and biogeochemical reference datasets.',
    timeline: [
      { date: 'Jan 2023', event: 'Mobilisation in Port Louis' },
      { date: 'Feb 2023', event: 'CTD and underway sampling' },
      { date: 'Mar 2023', event: 'Return and data archival' },
    ],
    scientists: [
      { name: 'Dr. P. Vidya', role: 'Chief Scientist', affiliation: 'NCPOR' },
    ],
    research: [
      'Meridional overturning circulation tracers',
      'CO₂ flux and carbonate chemistry',
      'Microbial community structure',
    ],
    reports: [{ title: 'SO Cruise 2023 Report (Demo)', year: 2023, type: 'PDF' }],
    datasets: ['ds-oce-008'],
    publications: ['pub-2023-02'],
    highlights: [
      { title: 'CO₂ Flux', description: 'Underway pCO₂ along the meridional transect.' },
    ],
  },
  {
    id: 'himalaya-glacier-2022',
    shortTitle: 'Himalaya 2022',
    title: 'Himalayan Glacier Mass Balance Programme 2022',
    region: 'Himalaya',
    year: 2022,
    season: 'Summer',
    stations: ['Chhota Shigri', 'Samudra Tapu'],
    researchAreas: ['Glaciology', 'Climate'],
    lead: 'NCPOR collaborative programme',
    image: IMG.glacier,
    overview:
      'Long-term monitoring of benchmark glaciers in the western Himalaya, complementing polar cryospheric studies.',
    timeline: [
      { date: 'Apr 2022', event: 'Field team deployment' },
      { date: 'May–Sep 2022', event: 'Mass-balance and AWS observations' },
      { date: 'Oct 2022', event: 'Data archival' },
    ],
    scientists: [
      { name: 'Dr. A. Kulkarni', role: 'Lead Investigator', affiliation: 'IISc' },
    ],
    research: ['Seasonal mass balance', 'AWS meteorology'],
    reports: [{ title: 'Chhota Shigri 2022 Report (Demo)', year: 2022, type: 'PDF' }],
    datasets: ['ds-gla-009'],
    publications: ['pub-2022-01'],
    highlights: [
      { title: 'Chhota Shigri', description: 'Long-term benchmark glacier mass-balance site.' },
    ],
  },
  {
    id: 'isro-42',
    shortTitle: '42nd ISEA',
    title: '42nd Indian Scientific Expedition to Antarctica',
    region: 'Antarctic',
    year: 2023,
    season: 'Summer',
    vessel: 'MV Vasiliy Golovnin',
    stations: ['Bharati', 'Maitri'],
    researchAreas: ['Geology', 'Glaciology', 'Atmospheric Sciences'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.station,
    overview:
      'Pre-Antarctic Treaty Consultative Meeting support expedition — focused on long-term observatories and summer field campaigns.',
    timeline: [
      { date: 'Dec 2022', event: 'Departure from Cape Town' },
      { date: 'Feb 2023', event: 'Field campaigns in Dronning Maud Land' },
      { date: 'Mar 2023', event: 'Return' },
    ],
    scientists: [{ name: 'Dr. S. Roy', role: 'Chief Scientist', affiliation: 'NCPOR' }],
    research: ['Dronning Maud Land geological mapping', 'Ice core recovery'],
    reports: [{ title: '42nd ISEA Report (Demo)', year: 2023, type: 'PDF' }],
    datasets: ['ds-gla-010'],
    publications: ['pub-2023-01'],
    highlights: [
      { title: 'DML Field Camp', description: 'Summer geological camp in Dronning Maud Land.' },
    ],
  },
]
