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
    title: 'Antarctica & Polar Ice Sheets',
    emoji: '🧊',
    simple:
      'Antarctica is the enormous frozen continent surrounding the South Pole. It is colder, windier, and drier than any other continent on Earth, covered by an ice sheet so massive that it locks up nearly 70% of the world’s fresh water. Because there are no native human populations or commercial cities, international scientists work together at peaceful research stations like Maitri and Bharati to study cosmic rays, ancient air trapped in ice cores, and climate patterns that affect the entire globe.',
    scientific:
      'Antarctica is a polar continent spanning ~14.2 million km², blanketed by an ice sheet averaging 2,160 meters in thickness with a total volume of 27 million km³ (~58 meters of global sea-level equivalent). Governed under the Antarctic Treaty System (1959) and the Madrid Protocol on Environmental Protection (1991), Antarctica is legally preserved as a scientific sanctuary free of military activity and mineral exploitation. East Antarctica rests on a thick Precambrian craton, whereas West Antarctica comprises marine-based rifted crust vulnerable to marine ice sheet instability (MISI).',
    glossary: [
      { term: 'Ice Sheet', definition: 'A continental-scale mass of glacial ice spanning more than 50,000 km², flowing outward under its own weight toward marine margins.' },
      { term: 'Polar Desert', definition: 'High-latitude terrestrial zones characterized by extreme low humidity and annual precipitation under 200 mm, occurring primarily as crystallized snowfall.' },
      { term: 'Katabatic Wind', definition: 'Gravity-driven downslope wind produced when cold, dense air over the high-elevation Antarctic ice dome accelerates rapidly toward the coast.' },
      { term: 'Madrid Protocol', definition: 'The Protocol on Environmental Protection to the Antarctic Treaty, prohibiting mining and mandating strict environmental impact assessments.' },
    ],
    quiz: [
      { q: 'What percentage of Earth’s surface freshwater is locked within the Antarctic ice sheet?', options: ['~20%', '~45%', '~70%', '~95%'], answer: 2 },
      { q: 'Which international treaty establishes Antarctica as a natural reserve devoted to peace and science?', options: ['Kyoto Protocol', 'Antarctic Treaty', 'Paris Agreement', 'Geneva Convention'], answer: 1 },
      { q: 'What causes the ferocious katabatic winds of East Antarctica?', options: ['Ocean waves hitting glaciers', 'Dense cold air flowing downslope from the polar plateau', 'Geothermal vents heating valleys', 'Equatorial hurricanes migrating south'], answer: 1 },
    ],
  },
  {
    id: 'arctic',
    title: 'The Arctic & High-Latitude Warming',
    emoji: '🌨️',
    simple:
      'Unlike Antarctica, which is a continent surrounded by ocean, the Arctic is a deep, partially frozen ocean surrounded by continents like North America, Europe, and Asia. It is home to indigenous communities, polar bears, Arctic foxes, and migratory marine life. In the summer, the Sun never sets for months, while in the winter, darkness reigns. The Arctic is currently warming nearly four times faster than the rest of the planet, causing sea ice and permafrost to thaw rapidly.',
    scientific:
      'The Arctic region encompasses the ice-covered Arctic Ocean and permafrost-dominated landmasses poleward of the Arctic Circle (66°33′N). Arctic amplification describes the accelerated surface warming observed in the high northern latitudes (~3.8× the global mean), driven by positive surface-albedo feedbacks, diminished sea-ice cover, increased poleward atmospheric heat transport, and cloud-radiation interactions. This thermodynamic shift modulates the circumpolar polar jet stream, generating persistent planetary Rossby waves that trigger mid-latitude extreme weather.',
    glossary: [
      { term: 'Permafrost', definition: 'Subsurface soil, rock, or organic sediment that remains continuously frozen at or below 0°C for at least two consecutive years.' },
      { term: 'Arctic Amplification', definition: 'The phenomenon wherein northern high-latitude surface temperatures rise significantly faster than the global terrestrial average.' },
      { term: 'Rossby Waves', definition: 'Planetary-scale meanders in the upper-tropospheric jet stream that govern temperate weather patterns and extreme blocking events.' },
      { term: 'Melt Ponds', definition: 'Pools of open water that form atop Arctic sea ice during summer, dramatically lowering surface albedo from 0.85 to 0.15.' },
    ],
    quiz: [
      { q: 'The Arctic is fundamentally…', options: ['A rocky land continent surrounded by sea', 'A frozen ocean surrounded by continents', 'A volcanic plateau with mountain peaks', 'A tropical sea covered by seasonal drift'], answer: 1 },
      { q: 'What is ground called that remains frozen for at least two consecutive years?', options: ['Firn', 'Permafrost', 'Moraine', 'Caliche'], answer: 1 },
      { q: 'How fast is the Arctic warming compared to the global planetary average?', options: ['At the same rate', 'Roughly 2× slower', 'Nearly 4× faster', 'It is actually cooling'], answer: 2 },
    ],
  },
  {
    id: 'sea-ice',
    title: 'Sea-Ice Thermodynamics & Albedo',
    emoji: '❄️',
    simple:
      'Sea ice is frozen ocean water that forms when polar ocean temperatures drop below the freezing point of salty water (-1.8°C). It acts like Earth’s giant solar mirror: its bright white surface reflects up to 85% of the Sun’s incoming heat back into outer space. As sea ice melts, it reveals darker open ocean water beneath, which absorbs 90% of solar heat and causes further warming. Sea ice also provides an essential hunting and nursing platform for seals, walruses, and polar bears.',
    scientific:
      'Sea ice develops through distinct rheological stages: frazil crystals coagulate into grease ice, pancake ice, nilas, and consolidated congelation sheets. As saline water freezes, salt ions are expelled via brine rejection, increasing the density of the underlying upper ocean and driving deep thermohaline convection. Sea-ice albedo feedback is a critical non-linear climate driver: pristine snow-covered sea ice maintains an albedo ($\alpha \approx 0.85$), whereas open water exhibits $\alpha \approx 0.07$, amplifying net shortwave radiative absorption.',
    glossary: [
      { term: 'Albedo', definition: 'The dimensionless ratio of reflected electromagnetic radiation to incident solar radiation upon a surface.' },
      { term: 'Brine Rejection', definition: 'The exclusion of salt ions from the crystal lattice of ice as seawater freezes, producing dense hypersaline water plumes.' },
      { term: 'Multi-Year Ice', definition: 'Sea ice that has survived at least one summer melt season, possessing reduced salinity (<2 PSU) and greater thickness (>2.5m).' },
      { term: 'Polynya', definition: 'A persistent non-linear area of open water surrounded by sea ice, maintained by wind divergence (latent heat) or ocean upwelling (sensible heat).' },
    ],
    quiz: [
      { q: 'What is the freezing point of typical open-ocean seawater (35 PSU salinity)?', options: ['0.0 °C', '-1.86 °C', '-4.5 °C', '-10.0 °C'], answer: 1 },
      { q: 'What is the approximate solar albedo of fresh snow-covered sea ice?', options: ['~0.10 (10%)', '~0.35 (35%)', '~0.85 (85%)', '~1.00 (100%)'], answer: 2 },
      { q: 'What process expels dense saline brine into the ocean as sea ice crystallizes?', options: ['Sublimation', 'Brine rejection', 'Thermal ablation', 'Diapycnal diffusion'], answer: 1 },
    ],
  },
  {
    id: 'glaciers',
    title: 'Glacial Dynamics & Mass Balance',
    emoji: '🏔️',
    simple:
      'A glacier is a massive, slow-moving river of dense ice formed over hundreds or thousands of years from fallen snow that was compacted by its own weight. Glaciers carve deep U-shaped valleys, transport boulder moraines, and store colossal reserves of freshwater. Scientists measure a glacier’s "mass balance" to see if it is growing or shrinking: if winter snowfall exceeds summer melting, the glacier gains mass; if summer melting outpaces winter snow, the glacier retreats.',
    scientific:
      'Glacial formation occurs through the progressive metamorphism of atmospheric snowfall: fresh dendritic flakes ($50–100\text{ kg/m}^3$) sinter under overburden pressure into granular firn ($400–830\text{ kg/m}^3$), ultimately closing air pores to form impermeable glacial ice ($917\text{ kg/m}^3$). Glacial flow proceeds via internal plastic deformation (governed by Glen’s Flow Law) and basal sliding lubricated by subglacial meltwater. The specific mass balance ($b_n = c - a$) quantifies the net difference between accumulation and ablation across the elevation gradient.',
    glossary: [
      { term: 'Mass Balance', definition: 'The net annual change in glacier mass, computed as total winter accumulation minus total summer ablation (measured in meters of water equivalent, m w.e.).' },
      { term: 'Equilibrium Line Altitude (ELA)', definition: 'The elevation boundary on a glacier where annual accumulation equals annual ablation ($b_n = 0$).' },
      { term: 'Firn', definition: 'Compacted, multi-year granular snow intermediate between fresh snow and dense glacier ice.' },
      { term: 'Calving', definition: 'The mechanical rupture and detachment of icebergs from a marine or lacustrine tidewater glacier terminus.' },
    ],
    quiz: [
      { q: 'What is the equilibrium boundary on a glacier where annual mass gain equals mass loss?', options: ['Terminal moraine', 'Equilibrium Line Altitude (ELA)', 'Bergschrund', 'Ice shelf margin'], answer: 1 },
      { q: 'What is the density of fully consolidated, bubble-closed glacial ice?', options: ['~450 kg/m³', '~700 kg/m³', '~917 kg/m³', '~1,000 kg/m³'], answer: 2 },
      { q: 'If summer melting exceeds winter snow accumulation across a glacier, its mass balance is…', options: ['Positive', 'Zero / Neutral', 'Negative', 'Undefined'], answer: 2 },
    ],
  },
  {
    id: 'oceanography',
    title: 'Global Thermohaline Circulation',
    emoji: '🌊',
    simple:
      'The oceans are connected by a planetary-scale conveyor belt of currents known as the thermohaline circulation. Near the frigid poles, surface seawater becomes extremely cold and salty (due to freezing ice expelling salt). This heavy, dense water sinks thousands of meters to the dark ocean floor and creeps toward the equator, carrying life-giving oxygen to deep ocean creatures and absorbing vast amounts of excess atmospheric heat and carbon dioxide.',
    scientific:
      'The global thermohaline circulation (Meridional Overturning Circulation, MOC) is the buoyancy-forced circulation driven by vertical density gradients established through surface heat and freshwater fluxes. In the Southern Ocean and North Atlantic, deep convective sinking forms Antarctic Bottom Water (AABW) and North Atlantic Deep Water (NADW). Together, these polar water masses ventilate over 70% of the world ocean interior, sequestering anthropogenic heat and buffering atmospheric carbon on millennial timescales.',
    glossary: [
      { term: 'Antarctic Bottom Water (AABW)', definition: 'The densest water mass in the global ocean, formed along the Antarctic continental shelf by intense brine rejection and cooling.' },
      { term: 'Thermohaline Conveyor', definition: 'The interconnected planetary ocean circulation propelled by heat (thermo) and salinity (haline) density differences.' },
      { term: 'Pycnocline', definition: 'The layer in an ocean water column where water density increases rapidly with depth, separating surface and deep waters.' },
      { term: 'Antarctic Circumpolar Current (ACC)', definition: 'The world’s strongest ocean current, flowing clockwise unimpeded eastward around Antarctica with transports exceeding 130 Sv.' },
    ],
    quiz: [
      { q: 'What is the primary driving mechanism behind polar thermohaline circulation?', options: ['Coastal tidal surges', 'Density differences governed by temperature and salinity', 'Underwater seismic vents', 'Trade winds along the equator'], answer: 1 },
      { q: 'Which polar water mass represents the densest water in the global ocean?', options: ['Subtropical Surface Water', 'Antarctic Bottom Water (AABW)', 'Mediterranean Outflow', 'Gulf Stream Core'], answer: 1 },
      { q: 'What is the unit of volumetric ocean current transport (1 Sverdrup, Sv)?', options: ['1,000 m³/s', '10,000 m³/s', '1,000,000 m³/s', '1,000,000,000 m³/s'], answer: 2 },
    ],
  },
  {
    id: 'indian-polar',
    title: 'India’s Sovereign Polar Programme',
    emoji: '🇮🇳',
    simple:
      'India’s polar journey began in 1981 under Prime Minister Indira Gandhi with "Operation Gangotri," leading to the establishment of India’s first Antarctic base, Dakshin Gangotri, in 1983. Since then, India has operated two permanent, year-round Antarctic research stations: Maitri (1989) in the Schirmacher Oasis and the futuristic Bharati (2012) in the Larsemann Hills. In 2008, India launched its Arctic base, Himadri, in Svalbard, followed by the high-altitude Himalayan observatory Himansh in 2016. All expeditions are managed by the National Centre for Polar and Ocean Research (NCPOR) under the Ministry of Earth Sciences (MoES).',
    scientific:
      'The Indian Scientific Expedition to Antarctica (ISEA) was initiated under the Department of Ocean Development in December 1981, securing India’s Consultative Status under the Antarctic Treaty System in 1983. Managed by the National Centre for Polar and Ocean Research (NCPOR) in Goa, India maintains continuous three-pole scientific operations: Maitri (WMO 89514) and Bharati in East Antarctica; Himadri and the IndARC underwater observatory in Ny-Ålesund, Svalbard; and Himansh at 4,050m in the Western Himalaya.',
    glossary: [
      { term: 'NCPOR', definition: 'National Centre for Polar and Ocean Research, the premier autonomous R&D institution under the Ministry of Earth Sciences headquartered in Goa.' },
      { term: 'Maitri Base', definition: 'India’s second permanent Antarctic station, constructed in 1989 on ice-free bedrock in the Schirmacher Oasis (70°46′S, 11°44′E).' },
      { term: 'Bharati Base', definition: 'India’s third Antarctic station, commissioned in 2012 in the Larsemann Hills, featuring modular aerodynamics and ISRO telemetry.' },
      { term: 'Himadri Station', definition: 'India’s permanent Arctic research station inaugurated on 1 July 2008 at Ny-Ålesund, Svalbard (78°55′N).' },
    ],
    quiz: [
      { q: 'In which year did the First Indian Scientific Expedition to Antarctica land on the ice shelf?', options: ['1975', '1982', '1991', '2001'], answer: 1 },
      { q: 'Which nodal national agency coordinates all Indian Arctic, Antarctic, and Himalayan expeditions?', options: ['ISRO', 'NCPOR (MoES)', 'DRDO', 'Survey of India'], answer: 1 },
      { q: 'Where is India’s modern modular station Bharati situated?', options: ['Ross Island', 'Schirmacher Oasis', 'Larsemann Hills', 'Svalbard'], answer: 2 },
    ],
  },
  {
    id: 'himalayan-cryosphere',
    title: 'The Third Pole & Himalayan Cryosphere',
    emoji: '🏔️',
    simple:
      'The Hindu Kush Himalaya is often called the "Third Pole" because it holds the largest volume of snow and ice outside the Arctic and Antarctic. These glaciers feed major river systems—including the Indus, Ganga, and Brahmaputra—which supply drinking water, agriculture, and hydropower to over 1.5 billion people across South Asia. Indian glaciologists at the Himansh research station track how benchmark glaciers like Chhota Shigri are responding to rising temperatures and monitor glacial lakes to prevent catastrophic flash floods (GLOFs).',
    scientific:
      'The Third Pole represents the world’s most populated cryospheric water tower, with over 54,000 glaciers covering ~60,000 km² across the Hindu Kush Himalaya and Tibetan Plateau. High-altitude atmospheric warming accelerates mass balance deficits, driving snout retreat, supraglacial debris thickening, and rapid expansion of moraine-dammed proglacial lakes. NCPOR’s Himalayan Cryosphere Programme (HiCOM) operates benchmark mass-balance, kinematic DGPS traverses, and deep GPR soundings across Western Himalayan basins.',
    glossary: [
      { term: 'Third Pole', definition: 'The geographic and scientific designation for the Hindu Kush Himalaya-Tibetan Plateau region containing Earth’s third largest ice reserve.' },
      { term: 'GLOF', definition: 'Glacial Lake Outburst Flood: catastrophic release of water when a moraine or ice dam holding a proglacial lake suddenly collapses.' },
      { term: 'Himansh Station', definition: 'India’s high-altitude research station established by NCPOR at 4,050 meters a.s.l. in the Chandra Basin, Lahaul-Spiti.' },
      { term: 'Chhota Shigri', definition: 'A benchmark valley glacier in Himachal Pradesh monitored continuously since 2002 for glaciological mass balance.' },
    ],
    quiz: [
      { q: 'Why is the Hindu Kush Himalayan region referred to as the "Third Pole"?', options: ['It contains magnetic South Pole', 'It possesses the largest ice volume outside the polar sheets', 'It is located at 90° longitude', 'It was discovered by polar explorers'], answer: 1 },
      { q: 'What is a dangerous flood caused by the sudden failure of a glacial moraine dam called?', options: ['Tsunami', 'GLOF (Glacial Lake Outburst Flood)', 'Monsoon surge', 'Seiche'], answer: 1 },
      { q: 'What is the name of India’s high-altitude cryospheric base in the Western Himalaya?', options: ['Maitri', 'Bharati', 'Himansh', 'IndARC'], answer: 2 },
    ],
  },
  {
    id: 'indarc-observatory',
    title: 'IndARC & Subsurface Ocean Mooring',
    emoji: '⚓',
    simple:
      'In 2014, Indian scientists deployed IndARC—India’s first multi-sensor robotic underwater observatory—anchored at a depth of 192 meters on the seafloor of Kongsfjorden in the Arctic. Even during the freezing Arctic winter when the fjord is blocked by sea ice and temperatures plunge below -30°C, IndARC works continuously underwater, measuring ocean temperatures, currents, and salinity every hour to discover how warm Atlantic waters flow into the Arctic and influence the Indian monsoon.',
    scientific:
      'IndARC is an anchored multi-depth subsurface oceanographic mooring array deployed at 78°59′N, 11°57′E in Kongsfjorden, Svalbard. Positioned at 192m depth, the mooring integrates Sea-Bird CTDs, an Acoustic Doppler Current Profiler (ADCP), optical transmissometers, and dissolved oxygen sensors. The primary scientific objective is quantifying seasonal pulses of warm, saline transformed Atlantic Water (TAW) intruding via the West Spitsbergen Current, modulating Arctic sea-ice extent and modulating circumpolar planetary wave teleconnections.',
    glossary: [
      { term: 'IndARC', definition: 'India’s first underwater moored observatory in the Arctic, deployed in Kongsfjorden by NCPOR in July 2014.' },
      { term: 'ADCP', definition: 'Acoustic Doppler Current Profiler: an instrument using sound waves to measure the speed and direction of ocean water currents across depth columns.' },
      { term: 'Transformed Atlantic Water', definition: 'Warm, saline ocean water transported poleward from the North Atlantic that drives basal melting in Arctic fjords.' },
      { term: 'Ocean Mooring', definition: 'A collection of scientific instruments tethered to an anchor on the seabed and held upright by subsurface flotation buoys.' },
    ],
    quiz: [
      { q: 'Where is India’s robotic underwater mooring IndARC deployed?', options: ['Indian Ocean', 'Prydz Bay, Antarctica', 'Kongsfjorden Fjord, Svalbard (Arctic)', 'Bay of Bengal'], answer: 2 },
      { q: 'At approximately what depth is the primary anchor of the IndARC mooring situated?', options: ['12 meters', '50 meters', '192 meters', '3,500 meters'], answer: 2 },
      { q: 'What primary phenomenon does IndARC monitor throughout the dark Arctic winter?', options: ['Whale vocalization rates', 'Warm Atlantic water intrusions into the Arctic fjord', 'Undersea volcanic lava flows', 'Coral reef growth'], answer: 1 },
    ],
  },
  {
    id: 'space-weather-geomagnetism',
    title: 'Space Weather & Polar Magnetometry',
    emoji: '🌌',
    simple:
      'The Earth is surrounded by an invisible magnetic field that protects our planet from dangerous radiation and high-speed solar winds blasted out by the Sun. Because Earth’s magnetic field lines funnel directly down into the polar regions, the poles act as giant scientific windows into outer space! In the sky, solar particles create the breathtaking Northern and Southern Lights (Aurora). At stations like Bharati and Maitri, magnetometers record invisible geomagnetic storms that could disrupt satellites, communication lines, and power grids on Earth.',
    scientific:
      'The polar upper atmosphere provides an open-funnel window into the magnetosphere via high-latitude magnetic cusps. Indian Institute of Geomagnetism (IIG) and NCPOR operate tri-axial fluxgate magnetometers and induction coil arrays at Bharati and Maitri. These instruments log Ultra-Low Frequency (ULF) geomagnetic pulsations (Pc1–Pc5 bands, 0.2 mHz to 5 Hz), auroral electrojet currents, and magnetospheric shock front compressions generated during Coronal Mass Ejections (CMEs).',
    glossary: [
      { term: 'Auroral Electrojet', definition: 'An intense electric current that flows in the polar ionosphere at ~100 km altitude, producing auroral displays and magnetic substorms.' },
      { term: 'Fluxgate Magnetometer', definition: 'A high-precision sensor that measures the magnitude and direction of Earth’s geomagnetic vector components ($B_x, B_y, B_z$).' },
      { term: 'Pc Pulsations', definition: 'Continuous geomagnetic pulsations classified from Pc1 to Pc5 based on frequency and magnetohydrodynamic resonance modes.' },
      { term: 'K-Index', definition: 'A quasi-logarithmic 0–9 scale quantifying irregular geomagnetic activity and space weather storm severity.' },
    ],
    quiz: [
      { q: 'Why are the polar regions ideal for space weather and magnetospheric research?', options: ['They have the highest mountains', 'Earth’s magnetic field lines funnel directly toward the poles', 'They are closest to the Sun', 'There is no gravity at the poles'], answer: 1 },
      { q: 'What natural light phenomenon occurs when solar wind particles collide with gases in the polar upper atmosphere?', options: ['Sun dogs', 'Aurora (Borealis / Australis)', 'Mirages', 'Noctilucent clouds'], answer: 1 },
      { q: 'What scale is used internationally to measure geomagnetic storm disturbances from 0 to 9?', options: ['Richter scale', 'Beaufort scale', 'K-index', 'Kelvin scale'], answer: 2 },
    ],
  },
  {
    id: 'polar-climate',
    title: 'Polar Teleconnections & Monsoon Impact',
    emoji: '🌡️',
    simple:
      'Although India is thousands of miles away from the icy poles, what happens at the poles directly dictates India’s weather and monsoon rains! When Antarctic sea ice shifts, it alters the atmospheric pressure across the Southern Ocean, which in turn influences the winds that carry the monsoon clouds toward India. In the north, melting Arctic ice alters the planetary jet stream, causing sudden heatwaves, cloudbursts, and unseasonal storms. Studying the poles is essential for predicting Indian agriculture and water security.',
    scientific:
      'Atmospheric teleconnections link high-latitude cryospheric anomalies with tropical convective systems. Modulations in the Southern Annular Mode (SAM) and Antarctic sea-ice extent perturb the cross-equatorial pressure gradient, modulating the strength of the Mascarene High and the Findlater (Somali) Low-Level Jet, which controls moisture flux convergence over the Indian subcontinent. Simultaneously, Arctic amplification destabilizes mid-latitude circumpolar westerlies, driving quasi-stationary wave resonance that triggers extreme precipitation over South Asia.',
    glossary: [
      { term: 'Teleconnection', definition: 'A significant linkage between recurring climate anomalies across geographically separated regions separated by thousands of kilometers.' },
      { term: 'Southern Annular Mode (SAM)', definition: 'The dominant mode of climate variability in the Southern Hemisphere, characterized by north-south shifts in circumpolar westerly winds.' },
      { term: 'Findlater Jet', definition: 'A low-level cross-equatorial atmospheric wind jet carrying moisture from the Southern Indian Ocean into the Indian monsoon system.' },
      { term: 'Mascarene High', definition: 'A semi-permanent high-pressure system over the southern Indian Ocean that serves as the engine room for the Southwest Monsoon.' },
    ],
    quiz: [
      { q: 'How does the Southern Ocean influence the Indian Summer Monsoon?', options: ['It has no influence whatsoever', 'Antarctic pressure modes alter the cross-equatorial wind jet carrying moisture to India', 'Antarctic icebergs float up to the Bay of Bengal', 'Penguin migrations change wind direction'], answer: 1 },
      { q: 'What is the semi-permanent southern ocean high-pressure cell that drives the southwest monsoon called?', options: ['Bermuda High', 'Mascarene High', 'Azores High', 'Siberian High'], answer: 1 },
      { q: 'What term describes climate connections between geographically separated global regions?', options: ['Thermohaline', 'Teleconnection', 'Albedo effect', 'Precession'], answer: 1 },
    ],
  },
]
