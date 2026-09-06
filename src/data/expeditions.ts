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
  reports: { title: string; year: number; type: string; url?: string }[]
  datasets: string[]
  publications: string[]
  highlights: { title: string; description: string }[]
  sourceUrl?: string
  sourceLabel?: string
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
    researchAreas: ['Atmospheric Sciences', 'Oceanography', 'Glaciology', 'Space Weather'],
    lead: 'NCPOR · Ministry of Earth Sciences, Govt. of India',
    image: IMG.ship,
    sourceUrl: 'https://ncpor.res.in/antarcticas',
    sourceLabel: 'NCPOR · Indian Scientific Expedition to Antarctica',
    overview:
      'A flagship annual polar expedition conducting year-round atmospheric, oceanographic and cryospheric observations across the Southern Ocean, Maitri and Bharati bases. Deployed 72 scientists and logistics specialists, mobilizing 1,240 MT of polar fuel and provisions under the Madrid Environmental Protocol.',
    timeline: [
      { date: 'Nov 2024', event: 'Pre-expedition mobilization and cargo staging in Cape Town harbor' },
      { date: 'Jan 2025', event: 'Departure of MV Vasiliy Golovnin from Goa across the Southern Ocean' },
      { date: 'Feb 2025', event: 'Resupply, fuel bunkering, and 24-member wintering crew rotation at Bharati and Maitri' },
      { date: 'Mar 2025', event: 'Sea-ice radar surveys, firn coring, and atmospheric aerosol campaign' },
      { date: 'Apr 2025', event: 'Return voyage to Cape Town with ice core cold-chain logistics and sample archival' },
    ],
    scientists: [
      { name: 'Dr. A. Bhattacharya', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. R. Mohan', role: 'Glaciology Lead', affiliation: 'NCPOR' },
      { name: 'Dr. S. Tiwari', role: 'Atmospheric Chemistry', affiliation: 'IITM' },
      { name: 'Dr. P. Verma', role: 'Physical Oceanography', affiliation: 'NIO' },
    ],
    research: [
      'Atmospheric black carbon and optical aerosol profiling over the Southern Ocean',
      'Meridional CTD depth casts down to 4,500m along the 70°E transect',
      'Shallow firn core drilling in the Larsemann Hills blue ice zone',
      'Continuous Global Atmosphere Watch (GAW) meteorological observations at Maitri',
    ],
    reports: [
      {
        title: '44th ISEA Annual Expedition Report',
        year: 2025,
        type: 'PDF',
        url: '/reports/44th_ISEA_Annual_Expedition_Report.pdf',
      },
      {
        title: 'Maitri AWS Meteorological Summary',
        year: 2024,
        type: 'PDF',
        url: '/reports/Maitri_AWS_Meteorological_Summary.pdf',
      },
    ],
    datasets: ['ds-atm-001', 'ds-oce-002', 'ds-gla-003'],
    publications: ['pub-2024-03', 'pub-2025-01'],
    highlights: [
      { title: 'Sub-Micron Black Carbon Baseline', description: 'Quantified 32.4 ng/m³ pristine marine atmospheric background across 60°S latitude.' },
      { title: 'Larsemann Firn Core Extraction', description: 'Recovered 12.4m continuous firn cores resolving decadal δ18O and δD paleoclimate proxies.' },
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
    researchAreas: ['Geology', 'Biology', 'Atmospheric Sciences', 'Space Weather'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.research,
    sourceUrl: 'https://ncpor.res.in/antarcticas',
    sourceLabel: 'NCPOR · Indian Scientific Expedition to Antarctica',
    overview:
      'Summer expedition focused on high-latitude geological mapping, psychrotolerant soil biodiversity, and magnetic pulsation observations across the Larsemann Hills and Schirmacher Oasis.',
    timeline: [
      { date: 'Dec 2023', event: 'Logistics mobilization and heavy container staging at Cape Town docks' },
      { date: 'Jan 2024', event: 'Voyage departure and maritime passage across the Roaring Forties' },
      { date: 'Feb 2024', event: 'Field campaigns at Larsemann Hills and over-ice traverse to Maitri' },
      { date: 'Mar 2024', event: 'Completion of 34 science projects and station boiler winterization' },
      { date: 'Apr 2024', event: 'Return to Cape Town and sample distribution to national laboratories' },
    ],
    scientists: [
      { name: 'Dr. M. Sharma', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. K. Singh', role: 'Microbiology Lead', affiliation: 'NCPOR' },
      { name: 'Dr. B. S. Rawat', role: 'Geophysicist', affiliation: 'GSI' },
    ],
    research: [
      'Structural and metamorphic mapping of the Broknes Peninsula bedrock',
      'Cultivable psychrophilic microbial diversity in Antarctic permafrost soils',
      'Geomagnetic Pc1–Pc5 pulsation telemetry at Bharati observatory',
    ],
    reports: [
      {
        title: '43rd ISEA Annual Report',
        year: 2024,
        type: 'PDF',
        url: '/reports/43rd_ISEA_Annual_Report.pdf',
      },
    ],
    datasets: ['ds-geo-006', 'ds-gla-003'],
    publications: ['pub-2024-01', 'pub-2024-02'],
    highlights: [
      { title: 'Broknes Metamorphic Dossier', description: 'Updated structural geology cartography of the eastern Larsemann Hills.' },
      { title: 'Cold-Active Enzyme Isolates', description: 'Characterized 18 cold-adapted microbial strains producing novel industrial proteases.' },
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
    sourceUrl: 'https://ncpor.res.in/arctics',
    sourceLabel: 'NCPOR · Indian Arctic Programme (Ny-Ålesund)',
    overview:
      'High-latitude Arctic campaign operating from Himadri station (79°N), conducting year-round sub-surface marine hydrography via the IndARC mooring in Kongsfjorden fjord and glacier mass-balance surveys in Svalbard.',
    timeline: [
      { date: 'May 2024', event: 'Pre-deployment instrument calibration and safety certifications at NCPOR' },
      { date: 'Jun 2024', event: 'Field team arrival at Ny-Ålesund research station, Svalbard' },
      { date: 'Jul 2024', event: 'Retrieval, data offload, and re-deployment of 192m IndARC mooring array' },
      { date: 'Aug 2024', event: 'Austre Lovénbreen mass-balance surveys and atmospheric radiation profiling' },
    ],
    scientists: [
      { name: 'Dr. K. P. Krishnan', role: 'Chief Scientist & Marine Lead', affiliation: 'NCPOR' },
      { name: 'Dr. A. Kulkarni', role: 'Glaciologist', affiliation: 'IISc' },
    ],
    research: [
      'Seasonal fjord hydrography and Atlantic Water intrusion in Kongsfjorden',
      'Surface energy balance and aerosol optical depth at Himadri laboratory',
      'Austre Lovénbreen and Midtre Lovénbreen seasonal mass balance',
    ],
    reports: [
      {
        title: 'Indian Arctic IndARC Campaign Report',
        year: 2024,
        type: 'PDF',
        url: '/reports/Indian_Arctic_IndARC_Report.pdf',
      },
    ],
    datasets: ['ds-met-004', 'ds-ind-008'],
    publications: ['pub-2024-05'],
    highlights: [
      { title: 'IndARC 192m Fjord Mooring', description: 'Documented pulsed winter intrusion of warm Atlantic water into the inner fjord.' },
      { title: 'Surface Energy Balance', description: 'High-precision solar and longwave radiation budget at 79°N latitude.' },
    ],
  },
  {
    id: 'so-cruise-2023',
    shortTitle: 'SO Cruise 2023',
    title: 'Southern Ocean Hydrographic & Biogeochemistry Cruise',
    region: 'Southern Ocean',
    year: 2023,
    season: 'Summer',
    vessel: 'ORV Sagar Nidhi',
    stations: ['Southern Ocean Meridional Transect'],
    researchAreas: ['Oceanography', 'Climate', 'Marine Geochemistry'],
    lead: 'NCPOR · Ministry of Earth Sciences',
    image: IMG.ocean,
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR · Southern Ocean Research Programme',
    overview:
      'Meridional oceanographic cruise across the Indian sector of the Southern Ocean (40°S to 67°S), mapping water-mass boundaries, primary productivity, air-sea CO₂ exchange, and trace metal limitation.',
    timeline: [
      { date: 'Jan 2023', event: 'Mobilisation and trace-metal rosette testing in Port Louis, Mauritius' },
      { date: 'Feb 2023', event: '64 deep CTD casts down to 5,000m across the Subtropical and Polar fronts' },
      { date: 'Mar 2023', event: 'Multi-coring at the sea-ice edge (67°S) and underway pCO₂ tracking' },
      { date: 'Apr 2023', event: 'Port call in Goa, sample preservation and high-precision nutrient analysis' },
    ],
    scientists: [
      { name: 'Dr. N. Anilkumar', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. P. Vidya', role: 'Physical Oceanography', affiliation: 'NCPOR' },
    ],
    research: [
      'Southern Ocean overturning circulation and water-mass structure',
      'Air-sea CO₂ flux and carbonate chemistry in the high-latitude sink',
      'Trace metal distribution (Fe, Zn) controlling phytoplankton blooms',
    ],
    reports: [
      {
        title: 'Southern Ocean Cruise Report',
        year: 2023,
        type: 'PDF',
        url: '/reports/Southern_Ocean_Cruise_Report.pdf',
      },
    ],
    datasets: ['ds-oce-002'],
    publications: ['pub-2023-02'],
    highlights: [
      { title: 'Air-Sea CO₂ Drawdown', description: 'Measured -38 µatm pCO₂ delta across the Polar Front confirming powerful carbon sink.' },
      { title: 'Deep CTD Transect', description: 'Executed 64 full-depth casts resolving Circumpolar Deep Water upwelling.' },
    ],
  },
  {
    id: 'himalaya-glacier-2022',
    shortTitle: 'Himalaya 2022',
    title: 'Himalayan Glacier Mass Balance Programme — Chhota Shigri',
    region: 'Himalaya',
    year: 2022,
    season: 'Summer',
    stations: ['Chhota Shigri Glacier', 'Himansh Base Station (4,050m)'],
    researchAreas: ['Glaciology', 'Climate', 'Alpine Hydrology'],
    lead: 'NCPOR · Himalayan Cryosphere Programme (HiCOM)',
    image: IMG.glacier,
    sourceUrl: 'https://ncpor.res.in/pages/display/268-himalaya',
    sourceLabel: 'NCPOR · Himalayan Cryosphere Programme (HiCOM)',
    overview:
      'Decadal cryospheric monitoring of Chhota Shigri benchmark glacier in the Western Himalaya, measuring mass balance, ice velocity, runoff discharge, and climate teleconnections with the Third Pole.',
    timeline: [
      { date: 'May 2022', event: 'Ascent to Himansh base station (4,050m) and AWS telemetry verification' },
      { date: 'Jun–Aug 2022', event: 'Survey of 38 ablation stakes, DGPS kinematic traverses, and GPR soundings' },
      { date: 'Sep 2022', event: 'End-of-ablation hydrological discharge gauging and snow pit sampling' },
      { date: 'Oct 2022', event: 'Annual mass-balance calculation and data submission to WGMS Zurich' },
    ],
    scientists: [
      { name: 'Dr. Parmanand Sharma', role: 'Lead Investigator', affiliation: 'NCPOR' },
      { name: 'Dr. A. Kulkarni', role: 'Senior Consultant', affiliation: 'IISc' },
    ],
    research: [
      'Glaciological mass balance and Equilibrium Line Altitude (ELA) dynamics',
      'Subglacial bedrock topography via 25MHz ground-penetrating radar',
      'Proglacial meltwater runoff modeling under changing climate regimes',
    ],
    reports: [
      {
        title: 'Chhota Shigri Glacier Report',
        year: 2022,
        type: 'PDF',
        url: '/reports/Chhota_Shigri_Glacier_Report.pdf',
      },
    ],
    datasets: ['ds-cry-005', 'ds-hws-007'],
    publications: ['pub-2022-01'],
    highlights: [
      { title: 'Benchmark Mass Balance', description: 'Recorded -0.48 m w.e. net mass loss with Equilibrium Line Altitude at 5,080 m a.s.l.' },
      { title: 'Ice Thickness Sounding', description: 'GPR confirmed maximum ice thickness of 254m in the central glacier trunk.' },
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
    sourceUrl: 'https://ncpor.res.in/antarcticas',
    sourceLabel: 'NCPOR · Indian Scientific Expedition to Antarctica',
    overview:
      'Major infrastructure renewal and research expedition focused on heavy vehicle traverses in Dronning Maud Land, drone photogrammetry of coastal ice cliffs, and long-term station environmental compliance.',
    timeline: [
      { date: 'Dec 2022', event: 'Vessel departure from Cape Town with 1,180 MT of polar supplies' },
      { date: 'Jan 2023', event: 'Arrival at Bharati station fast ice; fuel transfer and container offload' },
      { date: 'Feb 2023', event: 'Inter-continental snow-cat traverse and drone ice margin mapping' },
      { date: 'Mar 2023', event: 'Environmental baseline sampling and station hand-over to winter crew' },
      { date: 'Apr 2023', event: 'Safe return of summer team to Goa' },
    ],
    scientists: [
      { name: 'Dr. R. K. Singh', role: 'Chief Scientist', affiliation: 'NCPOR' },
      { name: 'Dr. S. Roy', role: 'Geologist', affiliation: 'GSI' },
    ],
    research: [
      'High-resolution drone photogrammetry of ice retreat in Princess Elizabeth Land',
      'Aerosol optical properties along the cruise track using sunphotometry',
      'Palaeoproterozoic basement crustal evolution of Queen Maud Land',
    ],
    reports: [
      {
        title: '42nd ISEA Annual Report',
        year: 2023,
        type: 'PDF',
        url: '/reports/42nd_ISEA_Annual_Report.pdf',
      },
    ],
    datasets: ['ds-atm-001', 'ds-geo-006'],
    publications: ['pub-2023-01'],
    highlights: [
      { title: 'Drone Ice Cartography', description: 'Mapped 45 km² of ice shelf front at 10cm ground resolution.' },
      { title: '840 km Polar Traverse', description: 'Executed deep inland snow-cat traverse without mechanical breakdown.' },
    ],
  },
  {
    id: 'isea-01',
    shortTitle: '1st ISEA (Operation Gangotri)',
    title: 'First Indian Scientific Expedition to Antarctica',
    region: 'Antarctic',
    year: 1981,
    season: 'Summer',
    vessel: 'MV Polar Circle',
    stations: ['Dakshin Gangotri Shelter'],
    researchAreas: ['Meteorology', 'Oceanography', 'Geology', 'Geomagnetism'],
    lead: 'Dr. S. Z. Qasim · Dept. of Ocean Development, Govt. of India',
    image: IMG.dakshinGangotri,
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/166-india-in-antarctica',
    sourceLabel: 'NCPOR Historical Polar Archive · Operation Gangotri',
    overview:
      'The historic inaugural Indian polar expedition codenamed "Operation Gangotri," launched under Prime Minister Indira Gandhi. Sailed from Mormugao, Goa, aboard chartered Norwegian icebreaker MV Polar Circle, successfully hoisting the Indian tricolor on the Antarctic ice shelf at 69°59′S, 11°55′E on 9 January 1982.',
    timeline: [
      { date: '6 Dec 1981', event: 'Secret departure from Mormugao Port, Goa, aboard MV Polar Circle' },
      { date: '1 Jan 1982', event: 'First sighting of Antarctic pack ice at 61°S latitude' },
      { date: '9 Jan 1982', event: 'Landing of Indian team on Princess Astrid Coast ice shelf (00:30 UTC)' },
      { date: '12 Jan 1982', event: 'Helicopter reconnaissance sorties to Schirmacher Oasis rocky nunataks' },
      { date: '21 Feb 1982', event: 'Successful completion of field science and return voyage commencement' },
    ],
    scientists: [
      { name: 'Dr. S. Z. Qasim', role: 'Expedition Leader & Chief Scientist', affiliation: 'Department of Ocean Development' },
      { name: 'Dr. H. N. Siddiquie', role: 'Marine Geology Lead', affiliation: 'National Institute of Oceanography (NIO)' },
      { name: 'Dr. C. P. Vohra', role: 'Glaciology Specialist', affiliation: 'Geological Survey of India (GSI)' },
    ],
    research: [
      'Establishing India’s sovereign scientific presence in Dronning Maud Land',
      'Marine magnetic soundings and physical oceanography along the 60°E cruise track',
      'Bedrock petrology and moraine sample recovery across the Schirmacher Oasis',
      'Erection of unmanned solar-powered weather recording station Dakshin Gangotri Shelter',
    ],
    reports: [
      {
        title: 'First Indian Antarctic Scientific Expedition (Operation Gangotri)',
        year: 1982,
        type: 'PDF',
        url: '/reports/1st_ISEA_Operation_Gangotri_Report.pdf',
      },
    ],
    datasets: ['ds-atm-001', 'ds-oce-002'],
    publications: ['pub-2023-01'],
    highlights: [
      { title: 'Historic Polar Footprint', description: 'Hoisted the national flag on Antarctica, initiating India’s four-decade sovereign polar science programme.' },
      { title: 'Antarctic Treaty Accession', description: 'Directly facilitated India’s accession to the Antarctic Treaty in August 1983 and Consultative Status in September 1983.' },
    ],
  },
  {
    id: 'isea-03',
    shortTitle: '3rd ISEA (Dakshin Gangotri)',
    title: 'Third Indian Scientific Expedition to Antarctica: Dakshin Gangotri',
    region: 'Antarctic',
    year: 1983,
    season: 'Year-round',
    vessel: 'MV Finnpolaris',
    stations: ['Dakshin Gangotri'],
    researchAreas: ['Station Engineering', 'Seismology', 'Upper Atmosphere', 'Meteorology'],
    lead: 'Dr. H. K. Gupta · Dept. of Ocean Development, Govt. of India',
    image: IMG.dakshinGangotri,
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/166-india-in-antarctica',
    sourceLabel: 'NCPOR Historical Polar Archive · Dakshin Gangotri',
    overview:
      'A landmark engineering and scientific mission that constructed India’s first permanent, year-round manned station, "Dakshin Gangotri", on the ice shelf in an unprecedented 60 days. Supported India’s inaugural 12-member wintering team surviving the extreme -52°C polar night.',
    timeline: [
      { date: 'Nov 1983', event: 'Expedition departure from Goa with 81 scientists and Army engineers' },
      { date: 'Dec 1983', event: 'Offloading 2,200 MT of pre-fabricated station modules onto ice shelf' },
      { date: 'Jan 1984', event: 'Erection of double-walled living quarters, generator sheds, and radio masts' },
      { date: '25 Feb 1984', event: 'Official commissioning of Dakshin Gangotri permanent research station' },
      { date: 'Mar 1984', event: 'Inaugural wintering crew hand-over for year-round observations' },
    ],
    scientists: [
      { name: 'Dr. Harsh K. Gupta', role: 'Expedition Leader', affiliation: 'Centre for Earth Science Studies' },
      { name: 'Lt. Col. S. S. Sharma', role: 'Task Force Commander (Engineers)', affiliation: 'Indian Army Corps of Engineers' },
      { name: 'Dr. P. K. Pasricha', role: 'Radio Physics Lead', affiliation: 'National Physical Laboratory (NPL)' },
    ],
    research: [
      'Fast-track construction of permanent station modules resting on snow-raft foundations',
      'Installation of broadband seismographs and tri-axial fluxgate magnetometers',
      'Daily high-altitude radiosonde balloon soundings for Antarctic stratospheric profiling',
      'Physiological adaptations and cold-weather survival studies of wintering personnel',
    ],
    reports: [
      {
        title: 'Third Indian Scientific Expedition to Antarctica: Dakshin Gangotri Construction',
        year: 1984,
        type: 'PDF',
        url: '/reports/3rd_ISEA_Dakshin_Gangotri_Report.pdf',
      },
    ],
    datasets: ['ds-atm-001', 'ds-geo-006'],
    publications: ['pub-2024-02'],
    highlights: [
      { title: 'Constructed in 60 Days', description: 'Built an entire self-sufficient polar station in record time amid severe blizzards and sub-zero temperatures.' },
      { title: 'Inaugural Wintering Team', description: 'First Indian wintering team successfully overwintered in Antarctica, transmitting continuous meteorological data to New Delhi.' },
    ],
  },
  {
    id: 'arctic-01',
    shortTitle: '1st Indian Arctic Expedition',
    title: 'First Indian Scientific Expedition to the Arctic',
    region: 'Arctic',
    year: 2007,
    season: 'Summer',
    vessel: 'Teisten (Zodiac Tenders)',
    stations: ['Himadri'],
    researchAreas: ['Glaciology', 'Atmospheric Physics', 'Marine Microbiology'],
    lead: 'Dr. Rasik Ravindra · NCAOR / Ministry of Earth Sciences',
    image: IMG.himadri,
    sourceUrl: 'https://ncpor.res.in/arctics/display/394-himadri',
    sourceLabel: 'NCPOR Arctic Research Programme',
    overview:
      'Pioneered India’s high-latitude research in the Northern Hemisphere, deploying teams to Ny-Ålesund, Svalbard (78°55′N). Laid the empirical groundwork that culminated in the commissioning of India’s permanent Arctic base, "Himadri", on 1 July 2008.',
    timeline: [
      { date: 'Aug 2007', event: 'Deployment of five-member maiden Indian scientific team to Ny-Ålesund' },
      { date: 'Aug 2007', event: 'Initiation of glaciological mass-balance benchmarking on Midtre Lovénbreen' },
      { date: 'Sep 2007', event: 'Kongsfjorden water column CTD profiling and microbe isolation' },
      { date: '1 Jul 2008', event: 'Official inauguration of Himadri station by Union Minister of Science & Technology' },
    ],
    scientists: [
      { name: 'Dr. Rasik Ravindra', role: 'Expedition Leader & Director', affiliation: 'NCAOR (NCPOR)' },
      { name: 'Dr. M. Sudhakar', role: 'Oceanographer', affiliation: 'Ministry of Earth Sciences' },
      { name: 'Dr. S. Shivaji', role: 'Microbiologist', affiliation: 'CCMB / CSIR' },
    ],
    research: [
      'Establishing long-term benchmark mass balance of Western Svalbard valley glaciers',
      'Sampling atmospheric aerosol optical depth and transboundary Arctic haze',
      'Isolating cold-adapted psychrophilic micro-organisms with novel biocatalytic enzymes',
    ],
    reports: [
      {
        title: 'First Indian Scientific Expedition to the Arctic: Svalbard Inaugural Campaign',
        year: 2008,
        type: 'PDF',
        url: '/reports/1st_Indian_Arctic_Expedition_Report.pdf',
      },
    ],
    datasets: ['ds-met-004', 'ds-ind-008'],
    publications: ['pub-2024-05'],
    highlights: [
      { title: 'Bipolar Research Capability', description: 'Established India as one of the few global nations with permanent year-round bases in both the Arctic and Antarctic.' },
      { title: 'Commissioning of Himadri', description: 'Permanent sovereign base inaugurated at 78°55′N, opening continuous high-latitude atmospheric and fjord observatories.' },
    ],
  },
]
