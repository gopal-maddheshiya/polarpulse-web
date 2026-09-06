export interface DatasetVizPoint {
  label: string
  value: number
}

export interface DatasetVizConfig {
  titleEn: string
  titleHi: string
  subtitleEn: string
  subtitleHi: string
  unit: string
  yLabel?: string
  badgeEn: string
  badgeHi: string
  accent: string
  data: DatasetVizPoint[]
  baseline?: DatasetVizPoint[]
  baselineLabel?: string
}

export const DATASET_VISUALIZATIONS: Record<string, DatasetVizConfig> = {
  'ds-ozo-009': {
    titleEn: 'Total Column Ozone Seasonal Variation (Dobson No. 108)',
    titleHi: 'कुल कॉलम ओजोन मौसमी भिन्नता (डॉबसन स्पेक्ट्रोफोटोमीटर 108)',
    subtitleEn: 'Austral spring polar vortex depletion and summer photochemical recovery at Maitri (70°46′S)',
    subtitleHi: 'मैत्री स्टेशन पर वसंत ऋतु में ओजोन छिद्र का अवमूल्यन एवं ग्रीष्मकालीन सुधार',
    unit: 'DU',
    yLabel: 'Ozone (DU)',
    badgeEn: 'WMO GAW Level-2 Validated',
    badgeHi: 'WMO GAW स्तर-2 सत्यापित',
    accent: '#0284c7',
    data: [
      { label: 'Jan', value: 298 },
      { label: 'Feb', value: 285 },
      { label: 'Mar', value: 272 },
      { label: 'Apr', value: 260 },
      { label: 'May', value: 252 },
      { label: 'Jun', value: 240 },
      { label: 'Jul', value: 228 },
      { label: 'Aug', value: 195 },
      { label: 'Sep', value: 148 },
      { label: 'Oct', value: 138 },
      { label: 'Nov', value: 220 },
      { label: 'Dec', value: 290 },
    ],
    baseline: [
      { label: 'Jan', value: 310 },
      { label: 'Feb', value: 305 },
      { label: 'Mar', value: 302 },
      { label: 'Apr', value: 300 },
      { label: 'May', value: 298 },
      { label: 'Jun', value: 295 },
      { label: 'Jul', value: 294 },
      { label: 'Aug', value: 296 },
      { label: 'Sep', value: 300 },
      { label: 'Oct', value: 305 },
      { label: 'Nov', value: 308 },
      { label: 'Dec', value: 312 },
    ],
    baselineLabel: 'Pre-1980 Pre-Depletion Baseline (~305 DU)',
  },

  'ds-atm-001': {
    titleEn: 'Monthly Mean Equivalent Black Carbon (EBC) Concentration',
    titleHi: 'मासिक औसत समतुल्य ब्लैक कार्बन (EBC) सांद्रता',
    subtitleEn: '7-Wavelength Aethalometer continuous aerosol mass loading at Maitri Station',
    subtitleHi: 'मैत्री स्टेशन पर 7-तरंग दैर्ध्य एथैलोमीटर एरोसोल द्रव्यमान सांद्रता',
    unit: 'ng/m³',
    yLabel: 'EBC (ng/m³)',
    badgeEn: 'NPDC In-Situ Telemetry',
    badgeHi: 'NPDC इन-सिटू टेलीमेट्री',
    accent: '#0ea5e9',
    data: [
      { label: 'Jan', value: 34.2 },
      { label: 'Feb', value: 28.5 },
      { label: 'Mar', value: 18.2 },
      { label: 'Apr', value: 12.1 },
      { label: 'May', value: 9.4 },
      { label: 'Jun', value: 8.2 },
      { label: 'Jul', value: 11.5 },
      { label: 'Aug', value: 14.8 },
      { label: 'Sep', value: 22.4 },
      { label: 'Oct', value: 31.0 },
      { label: 'Nov', value: 38.6 },
      { label: 'Dec', value: 42.1 },
    ],
  },

  'ds-cry-005': {
    titleEn: 'Chhota Shigri Glacier Benchmark Annual Mass Balance',
    titleHi: 'छोटा शिगरी हिमनद मानक वार्षिक द्रव्यमान संतुलन',
    subtitleEn: 'Direct multi-stake glaciological measurements (4,400–5,600m a.s.l.) by NCPOR HiCOM',
    subtitleHi: 'एनसीपीओआर हाईकॉम द्वारा प्रत्यक्ष मल्टी-स्टेक हिमनद विज्ञान रिकॉर्ड',
    unit: 'm w.e.',
    yLabel: 'Net Balance (m w.e.)',
    badgeEn: 'WGMS Benchmark Series',
    badgeHi: 'WGMS मानक शृंखला',
    accent: '#06b6d4',
    data: [
      { label: '2014', value: -0.32 },
      { label: '2015', value: -0.58 },
      { label: '2016', value: -0.42 },
      { label: '2017', value: -0.28 },
      { label: '2018', value: -0.65 },
      { label: '2019', value: -0.38 },
      { label: '2020', value: -0.44 },
      { label: '2021', value: -0.52 },
      { label: '2022', value: -0.71 },
      { label: '2023', value: -0.48 },
    ],
  },

  'ds-oce-002': {
    titleEn: 'Southern Ocean CTD Meridional Potential Temperature Profile',
    titleHi: 'दक्षिणी महासागर सीटीडी संभावित तापमान प्रोफ़ाइल',
    subtitleEn: 'Full-depth Sea-Bird SBE 911plus cast along the 57°30′E transect',
    subtitleHi: '57°30′E मेरीडियन के साथ पूर्ण-गहराई समुद्री तापमान अवतरण',
    unit: '°C',
    yLabel: 'Temp (°C)',
    badgeEn: 'WOCE/GO-SHIP Validated',
    badgeHi: 'WOCE/GO-SHIP सत्यापित',
    accent: '#2563eb',
    data: [
      { label: '0m', value: 4.2 },
      { label: '50m', value: 2.1 },
      { label: '100m', value: -0.8 },
      { label: '200m', value: 1.4 },
      { label: '500m', value: 1.9 },
      { label: '1000m', value: 2.2 },
      { label: '2000m', value: 1.1 },
      { label: '4000m', value: 0.4 },
    ],
  },

  'ds-bgc-010': {
    titleEn: 'Vertical Macronutrient Depth Profile: Nitrate (NO₃⁻)',
    titleHi: 'ऊर्ध्वाधर पोषक तत्व गहराई प्रोफ़ाइल: नाइट्रेट (NO₃⁻)',
    subtitleEn: 'High-Nutrient Low-Chlorophyll (HNLC) oceanographic transect at 57°30′E',
    subtitleHi: 'ध्रुवीय अग्रभाग पर उच्च-पोषक तत्व निम्न-क्लोरोफिल जलस्तंभ',
    unit: 'µmol/L',
    yLabel: 'NO₃⁻ (µmol/L)',
    badgeEn: 'NPDC In-Situ Ingestion',
    badgeHi: 'NPDC इन-सिटू अंतर्ग्रहण',
    accent: '#0d9488',
    data: [
      { label: '0m', value: 22.4 },
      { label: '25m', value: 23.8 },
      { label: '50m', value: 26.5 },
      { label: '100m', value: 31.2 },
      { label: '200m', value: 33.4 },
      { label: '500m', value: 34.8 },
      { label: '1000m', value: 35.2 },
    ],
  },

  'ds-met-004': {
    titleEn: 'High Arctic Net Surface Radiation Climatology (R_net)',
    titleHi: 'उच्च आर्कटिक शुद्ध सतही विकिरण जलवायुविज्ञान',
    subtitleEn: 'Continuous 4-component radiometer measurements at Himadri Observatory (78°55′N)',
    subtitleHi: 'हिमाद्री वेधशाला, स्वालबार्ड पर 4-घटक विकिरणमापी मापन',
    unit: 'W/m²',
    yLabel: 'R_net (W/m²)',
    badgeEn: 'BSRN Standards Compliant',
    badgeHi: 'BSRN मानकों के अनुरूप',
    accent: '#0284c7',
    data: [
      { label: 'Jan', value: -38 },
      { label: 'Feb', value: -35 },
      { label: 'Mar', value: -22 },
      { label: 'Apr', value: 18 },
      { label: 'May', value: 62 },
      { label: 'Jun', value: 94 },
      { label: 'Jul', value: 88 },
      { label: 'Aug', value: 54 },
      { label: 'Sep', value: 12 },
      { label: 'Oct', value: -26 },
      { label: 'Nov', value: -36 },
      { label: 'Dec', value: -41 },
    ],
  },

  'ds-hws-007': {
    titleEn: 'Himansh High-Altitude Observatory Monthly Mean Temperature',
    titleHi: 'हिमांश उच्च-तुंगता वेधशाला मासिक औसत तापमान',
    subtitleEn: 'Third Pole alpine climate series recorded at 4,050m a.s.l. in Spiti Valley',
    subtitleHi: 'स्पीति घाटी में 4,050 मीटर ऊंचाई पर दर्ज थर्ड पोल अल्पाइन जलवायु रिकॉर्ड',
    unit: '°C',
    yLabel: 'Air Temp (°C)',
    badgeEn: 'HiCOM Third Pole Telemetry',
    badgeHi: 'हाईकॉम थर्ड पोल टेलीमेट्री',
    accent: '#3b82f6',
    data: [
      { label: 'Jan', value: -16.2 },
      { label: 'Feb', value: -14.1 },
      { label: 'Mar', value: -9.5 },
      { label: 'Apr', value: -3.2 },
      { label: 'May', value: 2.8 },
      { label: 'Jun', value: 7.4 },
      { label: 'Jul', value: 10.2 },
      { label: 'Aug', value: 9.8 },
      { label: 'Sep', value: 5.4 },
      { label: 'Oct', value: -0.8 },
      { label: 'Nov', value: -7.2 },
      { label: 'Dec', value: -12.5 },
    ],
  },

  'ds-ind-008': {
    titleEn: 'IndARC Sub-surface Mooring Water Temperature (192m Depth)',
    titleHi: 'इंडआर्क सब-सरफेस मूरिंग जल तापमान (192 मीटर गहराई)',
    subtitleEn: 'Year-round Kongsfjorden Atlantic Water pulse monitoring by India’s robotic mooring',
    subtitleHi: 'कोंग्सफ्योर्डन में अटलांटिक महासागरीय जल प्रवाह की स्वचालित निगरानी',
    unit: '°C',
    yLabel: 'Temp (°C)',
    badgeEn: 'Autonomous Oceanic Telemetry',
    badgeHi: 'स्वायत्त महासागरीय टेलीमेट्री',
    accent: '#0284c7',
    data: [
      { label: 'Jul', value: 1.2 },
      { label: 'Aug', value: 2.8 },
      { label: 'Sep', value: 3.4 },
      { label: 'Oct', value: 2.6 },
      { label: 'Nov', value: 1.8 },
      { label: 'Dec', value: 0.9 },
      { label: 'Jan', value: 0.4 },
      { label: 'Feb', value: 0.1 },
      { label: 'Mar', value: -0.3 },
      { label: 'Apr', value: 0.2 },
      { label: 'May', value: 0.8 },
      { label: 'Jun', value: 1.4 },
    ],
  },

  'ds-geo-006': {
    titleEn: 'Bharati Magnetometer Diurnal Total Field Intensity (F)',
    titleHi: 'भारती मैग्नेटोमीटर दैनिक कुल चुंबकीय क्षेत्र तीव्रता',
    subtitleEn: 'Quiet-day geomagnetic fluxgate recording at Larsemann Hills (69°24′S)',
    subtitleHi: 'लार्समैन हिल्स पर शांत-दिन भू-चुंबकीय फ्लक्सगेट रिकॉर्डिंग',
    unit: 'nT',
    yLabel: 'Intensity (nT)',
    badgeEn: 'INTERMAGNET Standards Validated',
    badgeHi: 'इंटरमैग्नेट मानक सत्यापित',
    accent: '#6366f1',
    data: [
      { label: '00h', value: 43240 },
      { label: '03h', value: 43255 },
      { label: '06h', value: 43272 },
      { label: '09h', value: 43290 },
      { label: '12h', value: 43285 },
      { label: '15h', value: 43268 },
      { label: '18h', value: 43250 },
      { label: '21h', value: 43242 },
    ],
  },

  'ds-gla-003': {
    titleEn: 'Larsemann Inland Firn Core Stable Oxygen Isotope (δ¹⁸O) Profile',
    titleHi: 'लार्समैन फ़र्न कोर स्थिर ऑक्सीजन आइसोटोप (δ¹⁸O) प्रोफ़ाइल',
    subtitleEn: 'Downcore high-resolution paleo-temperature proxy from shallow firn cores (0–12m)',
    subtitleHi: '0–12 मीटर उथले फ़र्न कोर से उच्च-रिज़ॉल्यूशन पुरा-तापमान प्रॉक्सी',
    unit: '‰',
    yLabel: 'δ¹⁸O (‰)',
    badgeEn: 'NCPOR Ice-Core Lab Verified',
    badgeHi: 'NCPOR आइस-कोर लैब प्रमाणित',
    accent: '#06b6d4',
    data: [
      { label: '1m', value: -31.2 },
      { label: '2m', value: -32.8 },
      { label: '3m', value: -30.4 },
      { label: '4m', value: -33.1 },
      { label: '5m', value: -34.2 },
      { label: '6m', value: -31.8 },
      { label: '7m', value: -32.5 },
      { label: '8m', value: -33.9 },
      { label: '9m', value: -35.1 },
      { label: '10m', value: -32.4 },
      { label: '11m', value: -33.0 },
      { label: '12m', value: -34.5 },
    ],
  },
}

export function getDatasetVisualization(id: string): DatasetVizConfig {
  if (DATASET_VISUALIZATIONS[id]) {
    return DATASET_VISUALIZATIONS[id]
  }

  // Fallback default
  return {
    titleEn: 'In-Situ Oceanographic & Atmospheric Cast Telemetry',
    titleHi: 'इन-सिटू महासागरीय एवं वायुमंडलीय प्रेक्षण टेलीमेट्री',
    subtitleEn: 'Calibrated baseline observational readings recorded by national polar observatories',
    subtitleHi: 'राष्ट्रीय ध्रुवीय वेधशालाओं द्वारा दर्ज कैलिब्रेटेड प्रेक्षण',
    unit: 'Units',
    yLabel: 'Value',
    badgeEn: 'NPDC In-Situ Telemetry',
    badgeHi: 'NPDC इन-सिटू टेलीमेट्री',
    accent: '#0284c7',
    data: [
      { label: '01', value: 18.2 },
      { label: '02', value: 24.5 },
      { label: '03', value: 32.1 },
      { label: '04', value: 28.4 },
      { label: '05', value: 35.8 },
      { label: '06', value: 41.2 },
      { label: '07', value: 38.6 },
      { label: '08', value: 30.5 },
    ],
  }
}
