export interface Activity {
  id: string
  date: string
  title: string
  type: 'News' | 'Publication' | 'Dataset' | 'Education' | 'Expedition' | 'Field Story'
  description: string
  link?: { label: string; to: string }
}

export const activities: Activity[] = [
  { id: 'a-1', date: '2025-02-12', title: '44th ISEA Southern Ocean transit begins', type: 'Expedition', description: 'The 44th Indian Scientific Expedition to Antarctica commenced underway atmospheric and bio-optical sampling aboard MV Vasiliy Golovnin.' },
  { id: 'a-2', date: '2025-01-30', title: 'New dataset released: Larsemann firn cores', type: 'Dataset', description: 'High-resolution stable water isotope (δ18O, δD) depth profiles from the Larsemann Hills blue ice zone are now available in the Data Explorer.' },
  { id: 'a-3', date: '2024-12-08', title: 'Article: Why the poles matter to India', type: 'News', description: 'Scientific review exploring the teleconnections between polar ice sheet dynamics and the Indian Summer Monsoon system.' },
  { id: 'a-4', date: '2024-11-14', title: 'New publication: black carbon at Maitri', type: 'Publication', description: 'Long-term continuous optical multi-wavelength aethalometer observations published in Polar Science.' },
  { id: 'a-5', date: '2024-10-02', title: 'Polar Outreach Workshop concludes', type: 'Education', description: 'MoES and NCPOR concluded the national polar outreach symposium in Vasco da Gama, engaging over 400 university delegates.' },
  { id: 'a-6', date: '2024-08-19', title: 'Field Story: Svalbard in polar day', type: 'Field Story', description: 'Atmospheric and glaciological field diary from the Kongsfjorden Ny-Ålesund summer research campaign.' },
  { id: 'a-7', date: '2024-07-04', title: 'New education module: Sea Ice', type: 'Education', description: 'Interactive sea-ice thermodynamic explainer with multi-tiered pedagogical modes and empirical validation datasets.' },
  { id: 'a-8', date: '2024-05-22', title: 'Broknes geological map updated', type: 'Dataset', description: 'A revised 1:25,000 litho-structural geological map of the Broknes Peninsula published by the Geological Survey of India and NCPOR.' },
]
