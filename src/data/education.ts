export interface Topic {
  id: string
  title: string
  emoji: string
  simple: string
  scientific: string
  glossary: { term: string; definition: string }[]
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
}

export const topics: Topic[] = [
  {
    id: 'antarctica',
    title: 'Antarctica',
    emoji: '🧊',
    simple:
      'Antarctica is the icy continent around the South Pole. It is the coldest, windiest and driest place on Earth, and almost no plants grow there. Scientists from many countries visit to study the ice, weather and animals.',
    scientific:
      'Antarctica is a polar continent covering ~14 million km², with an ice sheet averaging ~1.9 km in thickness that contains ~60% of the planet\u2019s fresh water. It is governed by the Antarctic Treaty (1959) and hosts research stations from over 30 countries operating under the Protocol on Environmental Protection.',
    glossary: [
      { term: 'Ice sheet', definition: 'A large, persistent body of land-based ice covering more than 50,000 km².' },
      { term: 'Polar desert', definition: 'A region near the poles with very low precipitation and minimal life.' },
    ],
    quiz: [
      { q: 'What is the average thickness of the Antarctic ice sheet?', options: ['~200 m', '~1.9 km', '~10 km', '~50 m'], answer: 1 },
      { q: 'Which agreement governs activities in Antarctica?', options: ['Kyoto Protocol', 'Antarctic Treaty', 'Paris Agreement', 'Montreal Protocol'], answer: 1 },
    ],
  },
  {
    id: 'arctic',
    title: 'Arctic',
    emoji: '🌨️',
    simple:
      'The Arctic is the icy region around the North Pole. It is mostly frozen ocean surrounded by land. People, animals and plants live there, including polar bears and reindeer.',
    scientific:
      'The Arctic is a partially ice-covered ocean surrounded by permafrost-dominated landmasses. Sea-ice extent varies seasonally and has declined ~13% per decade since the satellite era, with significant implications for ocean circulation, ecosystems and indigenous communities.',
    glossary: [
      { term: 'Permafrost', definition: 'Ground that remains frozen for at least two consecutive years.' },
      { term: 'Sea ice', definition: 'Frozen ocean water that forms, grows and melts seasonally.' },
    ],
    quiz: [
      { q: 'The Arctic is mostly…', options: ['Land', 'Ocean', 'Desert', 'Rainforest'], answer: 1 },
      { q: 'What is permafrost?', options: ['A polar bear', 'Frozen ground', 'Sea ice', 'A glacier'], answer: 1 },
    ],
  },
  {
    id: 'sea-ice',
    title: 'Sea Ice',
    emoji: '❄️',
    simple:
      'Sea ice is frozen ocean water. It grows in winter and melts in summer. It gives polar animals a place to live and travel, and it reflects sunlight back into space.',
    scientific:
      'Sea ice forms when seawater cools below its freezing point (~-1.8 °C). First-year and multi-year ice have different physical properties and ecological roles. Sea-ice albedo feedbacks strongly influence polar climate, and its long-term decline is a key indicator of climate change.',
    glossary: [
      { term: 'Albedo', definition: 'The fraction of incoming sunlight reflected by a surface.' },
      { term: 'Multi-year ice', definition: 'Sea ice that has survived at least one summer melt season.' },
    ],
    quiz: [
      { q: 'Sea ice is frozen…', options: ['Rainwater', 'Ocean water', 'Glacier water', 'Lake water'], answer: 1 },
      { q: 'What is the term for the fraction of incoming sunlight reflected by ice?', options: ['Albedo', 'Ablation', 'Salinity', 'Density'], answer: 0 },
    ],
  },
  {
    id: 'glaciers',
    title: 'Glaciers',
    emoji: '🏔️',
    simple:
      'A glacier is a big, slow-moving river of ice. Glaciers store fresh water and shape the land. When they melt faster than they grow, they shrink.',
    scientific:
      'Glaciers form where annual snow accumulation exceeds ablation over many years, compacting into ice that flows under its own weight. Mass balance — the difference between accumulation and ablation — is a key indicator of climate, and glacier retreat contributes to sea-level rise.',
    glossary: [
      { term: 'Mass balance', definition: 'The net gain or loss of ice over a year.' },
      { term: 'Ablation', definition: 'All processes that remove ice or snow (melting, sublimation, calving).' },
    ],
    quiz: [
      { q: 'Glaciers form when…', options: ['Snowfall > melting', 'It always rains', 'Temperature rises', 'Volcanoes erupt'], answer: 0 },
    ],
  },
  {
    id: 'polar-climate',
    title: 'Polar Climate',
    emoji: '🌡️',
    simple:
      'Polar climates are extremely cold with big differences between summer and winter. The poles are warming faster than the rest of the Earth.',
    scientific:
      'Polar amplification refers to the observed phenomenon where high latitudes warm at roughly 2–4 times the global average. Mechanisms include albedo–temperature feedbacks, reduced sea-ice extent, changes in atmospheric and oceanic heat transport, and permafrost carbon feedbacks.',
    glossary: [
      { term: 'Polar amplification', definition: 'The stronger warming of polar regions relative to the global average.' },
    ],
    quiz: [
      { q: 'What is polar amplification?', options: ['Ice growing', 'Stronger polar warming', 'More polar bears', 'Less snow'], answer: 1 },
    ],
  },
  {
    id: 'oceanography',
    title: 'Oceanography',
    emoji: '🌊',
    simple:
      'Polar oceanography studies cold oceans near the poles. These cold, dense waters sink and help move heat around the planet.',
    scientific:
      'Polar oceans drive the global thermohaline circulation through the formation of dense, cold, salty water masses — Antarctic Bottom Water and North Atlantic Deep Water — that ventilate the abyss and store heat and carbon on centennial to millennial timescales.',
    glossary: [
      { term: 'Thermohaline circulation', definition: 'Global ocean circulation driven by temperature and salinity differences.' },
      { term: 'Antarctic Bottom Water', definition: 'A dense water mass formed around Antarctica that spreads along the seafloor.' },
    ],
    quiz: [
      { q: 'Cold, salty polar water…', options: ['Floats', 'Sinks', 'Evaporates', 'Disappears'], answer: 1 },
    ],
  },
  {
    id: 'indian-polar',
    title: 'Indian Polar Research',
    emoji: '🇮🇳',
    simple:
      'India has been sending scientists to Antarctica for over 40 years. India also has a research base in the Arctic called Himadri. The National Centre for Polar and Ocean Research (NCPOR) leads this work.',
    scientific:
      'India\u2019s polar research programme is coordinated by the National Centre for Polar and Ocean Research (NCPOR) under the Ministry of Earth Sciences. The country operates Maitri (1989) and Bharati (2012) in Antarctica, the Himadri station in Svalbard for Arctic studies, and contributes to the ITGC and major cryosphere networks.',
    glossary: [
      { term: 'NCPOR', definition: 'National Centre for Polar and Ocean Research, the nodal Indian polar research agency.' },
      { term: 'ITGC', definition: 'International Thwaites Glacier Collaboration.' },
    ],
    quiz: [
      { q: 'Which Indian agency leads polar research?', options: ['ISRO', 'NCPOR', 'IITM', 'CPRI'], answer: 1 },
      { q: 'Bharati station is located in…', options: ['Arctic', 'Antarctica', 'Himalaya', 'Sahara'], answer: 1 },
    ],
  },
]

// Fix the sea-ice quiz that I had a stray item in
topics.find(t => t.id === 'sea-ice')!.quiz = [
  { q: 'Sea ice is frozen…', options: ['Rainwater', 'Ocean water', 'Glacier water', 'Lake water'], answer: 1 },
  { q: 'What does ice albedo do?', options: ['Absorbs heat', 'Reflects sunlight', 'Melts faster', 'Cools the sun'], answer: 1 },
]
