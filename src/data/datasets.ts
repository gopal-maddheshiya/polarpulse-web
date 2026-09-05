export interface Dataset {
  id: string
  title: string
  description: string
  area: string
  region: string
  year: number
  format: string
  size: string
  coverage: string
  relatedExpedition: string
  relatedPublication?: string
  previewRows: { name: string; value: string }[]
  sourceUrl?: string
  sourceLabel?: string
}

export const datasets: Dataset[] = [
  {
    id: 'ds-atm-001',
    title: 'Maitri Atmospheric Black Carbon (Demo)',
    description:
      'Continuous measurements of equivalent black carbon mass concentration at the Maitri station, with supporting meteorological variables. (Demo dataset)',
    area: 'Atmospheric Sciences',
    region: 'Antarctic · Maitri',
    year: 2024,
    format: 'CSV / NetCDF',
    size: '12.4 MB',
    coverage: '2020–2024, hourly',
    relatedExpedition: 'isro-44',
    relatedPublication: 'pub-2024-03',
    sourceUrl: 'https://data.ncpor.res.in',
    sourceLabel: 'National Polar Data Centre (NCPOR)',
    previewRows: [
      { name: 'Timestamp', value: '2024-02-12T03:00:00Z' },
      { name: 'EBC (ng/m³)', value: '32.4' },
      { name: 'Wind Speed (m/s)', value: '4.1' },
      { name: 'Temperature (°C)', value: '-11.2' },
      { name: 'Pressure (hPa)', value: '982.3' },
    ],
  },
  {
    id: 'ds-oce-002',
    title: 'Southern Ocean CTD Transect (Demo)',
    description:
      'Downcast CTD profiles along the meridional transect from Cape Town to Antarctica, with derived salinity, temperature and oxygen. (Demo dataset)',
    area: 'Oceanography',
    region: 'Southern Ocean',
    year: 2024,
    format: 'NetCDF',
    size: '84.1 MB',
    coverage: '2024 cruise · 64 stations',
    relatedExpedition: 'isro-44',
    relatedPublication: 'pub-2025-01',
    sourceUrl: 'https://data.ncpor.res.in/search/',
    sourceLabel: 'NCPOR Physical Oceanography Portal',
    previewRows: [
      { name: 'Station', value: 'SO-12' },
      { name: 'Latitude', value: '-52.40°S' },
      { name: 'Longitude', value: '14.10°E' },
      { name: 'Depth (m)', value: '4200' },
      { name: 'Bottom Temp (°C)', value: '0.42' },
    ],
  },
  {
    id: 'ds-gla-003',
    title: 'Larsemann Hills Shallow Firn Cores (Demo)',
    description:
      'Stable water isotope and major ion profiles from shallow firn cores recovered during the 44th ISEA. (Demo dataset)',
    area: 'Glaciology',
    region: 'Antarctic · Larsemann Hills',
    year: 2025,
    format: 'CSV',
    size: '3.2 MB',
    coverage: '3 cores · 0–12 m',
    relatedExpedition: 'isro-44',
    sourceUrl: 'https://data.ncpor.res.in',
    sourceLabel: 'National Polar Data Centre (NCPOR)',
    previewRows: [
      { name: 'Core ID', value: 'LH-03' },
      { name: 'Depth (m)', value: '4.2' },
      { name: 'δ¹⁸O (‰)', value: '-28.1' },
      { name: 'δD (‰)', value: '-216.4' },
    ],
  },
  {
    id: 'ds-bio-004',
    title: 'Antarctic Soil Microbial Diversity (Demo)',
    description:
      '16S rRNA amplicon sequencing of soil samples from the Larsemann Hills. (Demo dataset)',
    area: 'Biodiversity',
    region: 'Antarctic',
    year: 2024,
    format: 'FASTQ / CSV',
    size: '212 MB',
    coverage: '48 samples',
    relatedExpedition: 'isro-43',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/372-biological-sciences',
    sourceLabel: 'NCPOR Polar Biology Repository',
    previewRows: [
      { name: 'Sample', value: 'LH-S-12' },
      { name: 'Latitude', value: '-69.40°S' },
      { name: 'Reads', value: '84,210' },
    ],
  },
  {
    id: 'ds-geo-005',
    title: 'Broknes Peninsula Geological Map (Demo)',
    description:
      'Vector geological map of the Broknes Peninsula derived from field campaigns. (Demo dataset)',
    area: 'Geology',
    region: 'Antarctic · Broknes',
    year: 2024,
    format: 'GeoJSON',
    size: '8.7 MB',
    coverage: '1:25,000',
    relatedExpedition: 'isro-43',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/370-geoscience',
    sourceLabel: 'NCPOR Geoscience Repository',
    previewRows: [{ name: 'Feature', value: 'Orthogneiss unit' }],
  },
  {
    id: 'ds-gla-006',
    title: 'Austre Lovén Glacier Mass Balance (Demo)',
    description:
      'Seasonal surface mass-balance measurements on the Austre Lovén glacier, Svalbard. (Demo dataset)',
    area: 'Glaciology',
    region: 'Arctic · Svalbard',
    year: 2024,
    format: 'CSV',
    size: '1.8 MB',
    coverage: '2015–2024, monthly',
    relatedExpedition: 'arctic-2024',
    sourceUrl: 'https://ncpor.res.in/arctics/display/399-cryosphere',
    sourceLabel: 'NCPOR Arctic Cryosphere Observatory',
    previewRows: [
      { name: 'Stake', value: 'AL-04' },
      { name: 'Net mass (mm w.e.)', value: '-628' },
    ],
  },
  {
    id: 'ds-oce-007',
    title: 'Kongsfjorden Hydrography (Demo)',
    description:
      'CTD profiles of the Kongsfjorden fjord system. (Demo dataset)',
    area: 'Oceanography',
    region: 'Arctic · Svalbard',
    year: 2024,
    format: 'NetCDF',
    size: '22.0 MB',
    coverage: '12 stations',
    relatedExpedition: 'arctic-2024',
    sourceUrl: 'https://ncpor.res.in/arctics/display/398-indarc',
    sourceLabel: 'NCPOR IndARC Observatory',
    previewRows: [{ name: 'Station', value: 'KF-06' }],
  },
  {
    id: 'ds-oce-008',
    title: 'Southern Ocean CO₂ Underway (Demo)',
    description:
      'Underway pCO₂ and sea surface temperature along the Southern Ocean transect. (Demo dataset)',
    area: 'Climate',
    region: 'Southern Ocean',
    year: 2023,
    format: 'CSV',
    size: '5.1 MB',
    coverage: '2023 cruise',
    relatedExpedition: 'so-cruise-2023',
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR Southern Ocean Programme',
    previewRows: [{ name: 'pCO₂ (µatm)', value: '398.4' }],
  },
  {
    id: 'ds-gla-009',
    title: 'Chhota Shigri Annual Mass Balance (Demo)',
    description:
      'Long-term annual and seasonal mass-balance of Chhota Shigri glacier. (Demo dataset)',
    area: 'Glaciology',
    region: 'Himalaya',
    year: 2022,
    format: 'CSV',
    size: '0.6 MB',
    coverage: '1987–2022',
    relatedExpedition: 'himalaya-glacier-2022',
    sourceUrl: 'https://ncpor.res.in/pages/display/268-himalaya',
    sourceLabel: 'NCPOR Himalayan Cryosphere (HiCOM)',
    previewRows: [{ name: 'Net mass (m w.e.)', value: '-0.42' }],
  },
  {
    id: 'ds-gla-010',
    title: 'Dronning Maud Land Snow Pit (Demo)',
    description:
      'Snow pit chemistry and stable isotope profiles from DML. (Demo dataset)',
    area: 'Glaciology',
    region: 'Antarctic · DML',
    year: 2023,
    format: 'CSV',
    size: '1.1 MB',
    coverage: '5 pits',
    relatedExpedition: 'isro-42',
    sourceUrl: 'https://data.ncpor.res.in',
    sourceLabel: 'National Polar Data Centre (NCPOR)',
    previewRows: [{ name: 'Pit ID', value: 'DML-P2' }],
  },
]
