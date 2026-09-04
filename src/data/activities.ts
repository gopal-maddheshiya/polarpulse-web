export interface Activity {
  id: string
  date: string
  title: string
  type: 'News' | 'Publication' | 'Dataset' | 'Education' | 'Expedition' | 'Field Story'
  description: string
  link?: { label: string; to: string }
}

export const activities: Activity[] = [
  { id: 'a-1', date: '2025-02-12', title: '44th ISEA Southern Ocean transit begins', type: 'Expedition', description: 'The 44th Indian Scientific Expedition to Antarctica departed on its Southern Ocean transit (Demo).' },
  { id: 'a-2', date: '2025-01-30', title: 'New dataset released: Larsemann firn cores', type: 'Dataset', description: 'A new demo dataset of shallow firn core isotope profiles is now available in the Data Explorer.' },
  { id: 'a-3', date: '2024-12-08', title: 'Article: Why the poles matter to India', type: 'News', description: 'A short essay on the relevance of polar science to Indian climate and oceans.' },
  { id: 'a-4', date: '2024-11-14', title: 'New publication: black carbon at Maitri', type: 'Publication', description: 'A seasonal analysis of equivalent black carbon at the Maitri station (Demo).' },
  { id: 'a-5', date: '2024-10-02', title: 'Polar Outreach Workshop concludes', type: 'Education', description: 'The annual polar outreach workshop brought together scientists, teachers and students.' },
  { id: 'a-6', date: '2024-08-19', title: 'Field Story: Svalbard in polar day', type: 'Field Story', description: 'A field diary from the Kongsfjorden summer campaign.' },
  { id: 'a-7', date: '2024-07-04', title: 'New education module: Sea Ice', type: 'Education', description: 'A new sea-ice explainer with simple/scientific modes and a quiz.' },
  { id: 'a-8', date: '2024-05-22', title: 'Broknes geological map updated', type: 'Dataset', description: 'A revised 1:25,000 geological map of the Broknes Peninsula is available (Demo).' },
]
