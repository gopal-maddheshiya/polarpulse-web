export interface Publication {
  id: string
  title: string
  authors: string[]
  year: number
  journal: string
  doi: string
  abstract: string
  area: string
  expedition: string
  dataset?: string
  type: 'Journal' | 'Conference' | 'Report'
  sourceUrl?: string
  sourceLabel?: string
}

export const publications: Publication[] = [
  {
    id: 'pub-2024-03',
    title: 'Equivalent black carbon over the Southern Ocean: Seasonal observations from Maitri',
    authors: ['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.'],
    year: 2024,
    journal: 'Polar Science (Demo)',
    doi: '10.0000/polaris.2024.0003',
    abstract:
      'We present a seasonal analysis of equivalent black carbon mass concentration observed at the Maitri station, supported by back-trajectory and fire emission inventories. The data demonstrate clean marine conditions and episodic long-range transport from southern Africa and South America. (Demo abstract)',
    area: 'Atmospheric Sciences',
    expedition: 'isro-44',
    dataset: 'ds-atm-001',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/386-science-in-antarctica',
    sourceLabel: 'NCPOR Antarctic Science Archive',
  },
  {
    id: 'pub-2025-01',
    title: 'Meridional variability of the Southern Ocean overturning circulation (2024 transect)',
    authors: ['Verma, P.', 'Vidya, P.'],
    year: 2025,
    journal: 'Journal of Southern Ocean Studies (Demo)',
    doi: '10.0000/polaris.2025.0001',
    abstract:
      'CTD and tracer observations along a 2024 meridional transect reveal significant interannual variability in the upper overturning cell, with implications for heat and carbon uptake. (Demo abstract)',
    area: 'Oceanography',
    expedition: 'isro-44',
    dataset: 'ds-oce-002',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR Southern Ocean Research',
  },
  {
    id: 'pub-2024-01',
    title: 'Cultivable microbial diversity in Larsemann Hills soils',
    authors: ['Singh, K.', 'Sharma, M.'],
    year: 2024,
    journal: 'Antarctic Microbiology Letters (Demo)',
    doi: '10.0000/polaris.2024.0001',
    abstract:
      'A culture-dependent survey of Larsemann Hills soils reveals psychrotolerant isolates with biotechnological potential, including cold-active enzymes and antifreeze proteins. (Demo abstract)',
    area: 'Biodiversity',
    expedition: 'isro-43',
    dataset: 'ds-bio-004',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/372-biological-sciences',
    sourceLabel: 'NCPOR Biological Sciences',
  },
  {
    id: 'pub-2024-02',
    title: 'Updated geological map of the Broknes Peninsula: Implications for Rodinia reconstructions',
    authors: ['Sharma, M.', 'Roy, S.'],
    year: 2024,
    journal: 'Precambrian Research (Demo)',
    doi: '10.0000/polaris.2024.0002',
    abstract:
      'A revised 1:25,000 geological map of the Broknes Peninsula integrates structural, petrological and geochronological data, supporting regional correlations with Indo-Antarctic cratonic blocks. (Demo abstract)',
    area: 'Geology',
    expedition: 'isro-43',
    dataset: 'ds-geo-005',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/370-geoscience',
    sourceLabel: 'NCPOR Antarctic Geosciences',
  },
  {
    id: 'pub-2024-05',
    title: 'Snow chemistry and stable water isotopes on Austre Lovén glacier',
    authors: ['Krishnan, N.', 'Kulkarni, A.'],
    year: 2024,
    journal: 'Arctic, Antarctic and Alpine Research (Demo)',
    doi: '10.0000/polaris.2024.0005',
    abstract:
      'A multi-year record of snow chemistry and isotope ratios from a Svalbard benchmark glacier shows strong seasonality and episodic Arctic moisture transport. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'arctic-2024',
    dataset: 'ds-gla-006',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/arctics/display/390-publications',
    sourceLabel: 'NCPOR Arctic Publications Repository',
  },
  {
    id: 'pub-2023-02',
    title: 'Underway pCO₂ along the 2023 Southern Ocean meridional transect',
    authors: ['Vidya, P.'],
    year: 2023,
    journal: 'Geophysical Research Letters (Demo)',
    doi: '10.0000/polaris.2023.0002',
    abstract:
      'Underway pCO₂ observations along the 2023 meridional transect document the seasonal sink in the Subantarctic Zone and localised outgassing south of the Polar Front. (Demo abstract)',
    area: 'Climate',
    expedition: 'so-cruise-2023',
    dataset: 'ds-oce-008',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR Southern Ocean Research',
  },
  {
    id: 'pub-2023-01',
    title: 'Snow-pit chemistry across Dronning Maud Land',
    authors: ['Roy, S.'],
    year: 2023,
    journal: 'Polar Science (Demo)',
    doi: '10.0000/polaris.2023.0001',
    abstract:
      'A network of shallow snow pits in Dronning Maud Land captures the spatial variability of major ions and stable water isotopes, supporting the design of deep ice-coring programmes. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'isro-42',
    dataset: 'ds-gla-010',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/371-cryosphere-sciences',
    sourceLabel: 'NCPOR Cryosphere Sciences',
  },
  {
    id: 'pub-2022-01',
    title: 'Long-term mass balance of Chhota Shigri glacier, western Himalaya',
    authors: ['Kulkarni, A.'],
    year: 2022,
    journal: 'Journal of Glaciology (Demo)',
    doi: '10.0000/polaris.2022.0001',
    abstract:
      'A 35-year mass-balance record of Chhota Shigri glacier reveals strong interannual variability tied to regional climate modes, with an overall negative trend. (Demo abstract)',
    area: 'Glaciology',
    expedition: 'himalaya-glacier-2022',
    dataset: 'ds-gla-009',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/268-himalaya',
    sourceLabel: 'NCPOR Himalayan Cryosphere (HiCOM)',
  },
]
