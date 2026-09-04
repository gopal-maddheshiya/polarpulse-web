export interface KnowledgeItem {
  id: string
  type: 'Report' | 'Article' | 'Dataset' | 'Publication' | 'Educational' | 'News' | 'Field Story'
  title: string
  excerpt: string
  body: string
  tags: string[]
  category: string
  year: number
  author: string
  source?: string
  relatedExpedition?: string
  relatedDataset?: string
  relatedPublication?: string
}

export const knowledgeItems: KnowledgeItem[] = [
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
  },
  {
    id: 'kb-3',
    type: 'Article',
    title: 'Why the Poles Matter to India',
    excerpt: 'A short essay on why the Indian polar programme is part of the country\u2019s climate, ocean and strategic interests.',
    body: 'India sits in the tropics, but its climate, monsoon and oceans are tightly coupled to the polar regions. A warmer Antarctic and a melting Greenland alter the thermohaline circulation and the sea-level budget. The Himalayan cryosphere — itself a polar analogue — supplies the perennial rivers of the Indo-Gangetic plain. Polar science is therefore not a luxury: it is a foundational investment in India\u2019s environmental and economic future.',
    tags: ['Climate', 'Policy', 'India'],
    category: 'Articles',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
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
    relatedPublication: 'pub-2024-03',
    relatedDataset: 'ds-atm-001',
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
    relatedDataset: 'ds-oce-002',
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
  },
  {
    id: 'kb-10',
    type: 'Article',
    title: 'A Beginner\u2019s Guide to Sea Ice',
    excerpt: 'How sea ice forms, why it matters, and what its decline means.',
    body: 'Sea ice is one of the most visible indicators of a changing climate. It forms when the upper ocean cools below its freezing point; brine is rejected, leaving a porous solid that thickens through the winter. In summer, melt ponds dot its surface. Its high albedo — the fraction of sunlight it reflects — helps regulate Earth\u2019s energy balance. When sea ice shrinks, the darker ocean absorbs more heat, accelerating warming: a feedback loop at the heart of polar climate.',
    tags: ['Sea Ice', 'Climate', 'Beginner'],
    category: 'Articles',
    year: 2024,
    author: 'POLARIS Editorial (Demo)',
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
  },
]
