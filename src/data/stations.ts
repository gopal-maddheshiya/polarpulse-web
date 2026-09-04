export interface ResearchStation {
  id: string
  name: string
  country: string
  region: 'Arctic' | 'Antarctic'
  x: number // percent 0-100 in svg
  y: number
  established: number
  blurb: string
  relatedExpeditions: string[]
}

export const stations: ResearchStation[] = [
  // Antarctic
  { id: 'maitri', name: 'Maitri', country: 'India', region: 'Antarctic', x: 31, y: 78, established: 1989, blurb: 'India\u2019s second permanent Antarctic research base, located in the Schirmacher Oasis.', relatedExpeditions: ['isro-44', 'isro-43', 'isro-42'] },
  { id: 'bharati', name: 'Bharati', country: 'India', region: 'Antarctic', x: 56, y: 80, established: 2012, blurb: 'India\u2019s third Antarctic research base, in the Larsemann Hills.', relatedExpeditions: ['isro-44', 'isro-43'] },
  { id: 'vostok', name: 'Vostok', country: 'Russia', region: 'Antarctic', x: 48, y: 84, established: 1957, blurb: 'One of the coldest places on Earth, site of the deepest ice core.', relatedExpeditions: [] },
  { id: 'mcmurdo', name: 'McMurdo', country: 'USA', region: 'Antarctic', x: 18, y: 86, established: 1956, blurb: 'The largest research and logistics hub in Antarctica.', relatedExpeditions: [] },
  { id: 'rothera', name: 'Rothera', country: 'UK', region: 'Antarctic', x: 12, y: 82, established: 1975, blurb: 'A hub for marine and atmospheric science on the Antarctic Peninsula.', relatedExpeditions: [] },
  { id: 'syowa', name: 'Syowa', country: 'Japan', region: 'Antarctic', x: 38, y: 80, established: 1957, blurb: 'Japan\u2019s main Antarctic research station in East Antarctica.', relatedExpeditions: [] },
  { id: 'amundsen', name: 'Amundsen–Scott', country: 'USA', region: 'Antarctic', x: 50, y: 90, established: 1957, blurb: 'Research station at the geographic South Pole.', relatedExpeditions: [] },
  { id: 'troll', name: 'Troll', country: 'Norway', region: 'Antarctic', x: 24, y: 76, established: 1990, blurb: 'Norway\u2019s all-season Antarctic research station.', relatedExpeditions: [] },
  // Arctic
  { id: 'himadri', name: 'Himadri', country: 'India', region: 'Arctic', x: 60, y: 16, established: 2008, blurb: 'India\u2019s Arctic research station at Ny-Ålesund, Svalbard.', relatedExpeditions: ['arctic-2024'] },
  { id: 'nyalesund', name: 'Ny-Ålesund', country: 'Norway', region: 'Arctic', x: 60, y: 14, established: 1968, blurb: 'A unique international Arctic research village in Svalbard.', relatedExpeditions: [] },
  { id: 'alert', name: 'Alert', country: 'Canada', region: 'Arctic', x: 30, y: 12, established: 1950, blurb: 'The northernmost permanently inhabited place in the world.', relatedExpeditions: [] },
  { id: 'summit', name: 'Summit', country: 'Denmark', region: 'Arctic', x: 38, y: 13, established: 1989, blurb: 'A high-elevation, inland Greenland research camp.', relatedExpeditions: [] },
  { id: 'barneo', name: 'Barneo', country: 'Russia', region: 'Arctic', x: 64, y: 11, established: 2002, blurb: 'A temporary seasonal ice camp near the North Pole.', relatedExpeditions: [] },
]
