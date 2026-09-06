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
    title: 'Equivalent Black Carbon and Aerosol Optical Properties over the Southern Ocean: Observational Insights from Maitri Station',
    authors: ['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.', 'Gautam, A. S.'],
    year: 2024,
    journal: 'Polar Science · Elsevier',
    doi: '10.1016/j.polar.2024.100982',
    abstract:
      'Continuous multi-wavelength measurements of equivalent black carbon (EBC) mass concentration and aerosol optical depth were conducted at Maitri Station (70°45′57″S, 11°44′09″E), East Antarctica, using a 7-channel Aethalometer and multi-spectral sunphotometer. The mean summer marine boundary layer EBC concentration was recorded at 32.4 ± 8.2 ng/m³, reflecting a remarkably clean southern background atmosphere. Episodic enhancements (>110 ng/m³) were analyzed using five-day kinematic backward air trajectories calculated with the NOAA HYSPLIT model, tracing long-range transport events originating from biomass burning plumes in southern Africa and South America. Absorption Ångström exponent (AAE) values averaged 1.12, indicating fossil fuel emissions during station transit operations and wood-smoke signatures during long-range transport.',
    area: 'Atmospheric Sciences',
    expedition: 'isro-44',
    dataset: 'ds-atm-001',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/386-science-in-antarctica',
    sourceLabel: 'NCPOR Antarctic Atmospheric Repository',
  },
  {
    id: 'pub-2025-01',
    title: 'Meridional Variability of the Southern Ocean Overturning Circulation: Full-Depth Hydrography along the 57°30′E Transect',
    authors: ['Verma, P.', 'Vidya, P.', 'Anilkumar, N.', 'Ravichandran, M.'],
    year: 2025,
    journal: 'Journal of Physical Oceanography · AMS',
    doi: '10.1175/JPO-D-24-0118.1',
    abstract:
      'Hydrographic observations from 64 full-depth (surface to 4,500m) CTD casts occupied during the 2024 Southern Ocean expedition were synthesized to examine interannual variability in thermohaline circulation across the Subantarctic Front (SAF), Polar Front (PF), and Southern Antarctic Circumpolar Current Front (SACCF). Downward penetration of modified Circumpolar Deep Water (CDW) revealed a statistically significant warming anomaly (+0.08 °C/decade below 2,000m depth) compared with historical WOCE baselines. Dissolved oxygen transects delineate active ventilation of Antarctic Intermediate Water (AAIW) and indicate shoaling of the upper overturning cell, with direct implications for ocean heat uptake and regional carbon drawdown.',
    area: 'Oceanography',
    expedition: 'isro-44',
    dataset: 'ds-oce-002',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR Southern Ocean Hydrography',
  },
  {
    id: 'pub-2024-01',
    title: 'Cultivable Psychrotolerant Microbial Diversity and Cold-Active Protease Production from Larsemann Hills Soils',
    authors: ['Singh, K.', 'Sharma, M.', 'Shivaji, S.'],
    year: 2024,
    journal: 'Polar Biology · Springer Nature',
    doi: '10.1007/s00300-024-03248-x',
    abstract:
      'A culture-dependent polyphasic taxonomic survey was performed on permafrost soil samples collected from 18 ice-free knolls across the Larsemann Hills, East Antarctica, during the 43rd ISEA. 16S rRNA gene sequencing and phenotypic profiling identified 42 psychrotolerant bacterial strains belonging to the phyla Actinomycetota, Pseudomonadota, and Bacteroidota, with dominant genera including Arthrobacter, Psychrobacter, and Pseudomonas. Seven isolates demonstrated robust extracellular protease production at temperatures as low as 4 °C, retaining over 65% catalytic activity at 10 °C. These findings highlight the metabolic plasticity of Antarctic extremophiles and their biotechnology potential for low-temperature industrial biocatalysis.',
    area: 'Biodiversity',
    expedition: 'isro-43',
    dataset: 'ds-gla-003',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/372-biological-sciences',
    sourceLabel: 'NCPOR Polar Biological Sciences Archive',
  },
  {
    id: 'pub-2024-02',
    title: 'Structural Architecture and U-Pb Zircon Geochronology of the Broknes Peninsula: Gondwana Amalgamation Constraints',
    authors: ['Sharma, M.', 'Roy, S.', 'Pant, N. C.'],
    year: 2024,
    journal: 'Precambrian Research · Elsevier',
    doi: '10.1016/j.precamres.2024.107382',
    abstract:
      'Detailed 1:25,000 structural mapping, petrographic sectioning, and laser-ablation ICP-MS U-Pb zircon geochronology were conducted on granulite-facies paragneisses and orthogneisses of the Broknes Peninsula, Larsemann Hills. Polyphase ductile deformation (D1 to D4) records progressive crustal shortening during high-grade regional metamorphism peaking at ~800 °C and 6.5 kbar. Zircon concordia ages date peak granulite-facies crystallisation at 530 ± 6 Ma (Kuunga/Pan-African orogeny), substantiating tectonic stitching and continuous lithological correlation between East Antarctica and the Eastern Ghats Belt of peninsular India.',
    area: 'Geology',
    expedition: 'isro-43',
    dataset: 'ds-geo-006',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/370-geoscience',
    sourceLabel: 'NCPOR Antarctic Geosciences',
  },
  {
    id: 'pub-2024-05',
    title: 'Seasonal Albedo Dynamics and Surface Energy Budget on High Arctic Glaciers: Observations from Himadri, Svalbard',
    authors: ['Krishnan, N.', 'Kulkarni, A.', 'Thamban, M.'],
    year: 2024,
    journal: 'Arctic, Antarctic, and Alpine Research · Taylor & Francis',
    doi: '10.1080/15230430.2024.2341908',
    abstract:
      'Continuous surface radiation and turbulent heat flux measurements collected at the Himadri Atmospheric Laboratory (Ny-Ålesund, 78°55′N, 11°56′E) and Austre Lovénbreen glacier over the 2021–2024 period were analyzed to quantify Arctic amplification feedbacks. Snow-albedo decay during the spring-summer transition averaged -0.012 day⁻¹, accelerated by light-absorbing particulate deposition (mineral dust and soot). Net radiation accounted for 78% of the seasonal ice melt energy, while sensible heat flux provided the primary nocturnal energy source during overcast maritime cyclonic conditions. The seasonal equilibrium line altitude rose by 42 meters compared with the 2008–2018 decadal baseline.',
    area: 'Glaciology',
    expedition: 'arctic-2024',
    dataset: 'ds-met-004',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/arctics/display/390-publications',
    sourceLabel: 'NCPOR Arctic Publications Repository',
  },
  {
    id: 'pub-2023-02',
    title: 'Seasonal Air-Sea CO₂ Exchange and Carbonate Chemistry Gradients across the Southern Ocean Frontal Systems',
    authors: ['Vidya, P.', 'Anilkumar, N.', 'Mohan, R.'],
    year: 2023,
    journal: 'Geophysical Research Letters · AGU',
    doi: '10.1029/2023GL104821',
    abstract:
      'High-resolution underway partial pressure of carbon dioxide (pCO₂) and total alkalinity were measured continuously along a meridional transect (40°S to 67°S) aboard ORV Sagar Nidhi. The Subantarctic Zone acted as a potent carbon sink, with surface water pCO₂ undersaturated by up to -48 µatm relative to atmospheric concentrations, driven by intense summertime diatom blooms supported by dissolved iron inputs. In contrast, upwelling of carbon-rich Upper Circumpolar Deep Water south of the Polar Front generated localized CO₂ outgassing (+14 µatm). The net air-sea carbon flux across the entire Indian sector was estimated at -1.42 mol C m⁻² yr⁻¹.',
    area: 'Climate',
    expedition: 'so-cruise-2023',
    dataset: 'ds-oce-002',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/270-southern-ocean',
    sourceLabel: 'NCPOR Southern Ocean Research Group',
  },
  {
    id: 'pub-2023-01',
    title: 'Spatial Variability of Stable Water Isotopes and Major Ions in Dronning Maud Land Snow Pits',
    authors: ['Roy, S.', 'Bhattacharya, A.', 'Thamban, M.'],
    year: 2023,
    journal: 'Journal of Earth System Science · Springer Nature',
    doi: '10.1007/s12040-023-02184-1',
    abstract:
      'A series of five 2-meter snow pits excavated along a 180-kilometer inland traverse from Maitri Station to the Polar Ice Sheet plateau were sampled at 5-cm resolution for oxygen-18 (δ18O), deuterium (δD), and soluble ionic constituents. Spatial isotopic depletion with altitude followed an apparent lapse rate of -0.84 ‰ per 100 meters elevation. Sea-salt ion ratios (Cl⁻/Na⁺ and SO₄²⁻/Na⁺) exhibited progressive fractionation inland due to the preferential deposition of coarse sea-spray aerosols near coastal margins, providing an empirical baseline for interpreting deep ice-core records in Princess Astrid Coast.',
    area: 'Glaciology',
    expedition: 'isro-42',
    dataset: 'ds-atm-001',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/antarcticas/display/371-cryosphere-sciences',
    sourceLabel: 'NCPOR Cryosphere Sciences Repository',
  },
  {
    id: 'pub-2022-01',
    title: 'Decadal Glaciological Mass Balance and Runoff Sensitivity of Chhota Shigri Glacier, Western Himalaya',
    authors: ['Sharma, P.', 'Kulkarni, A.', 'Ramanathan, A. L.', 'Azam, M. F.'],
    year: 2022,
    journal: 'Journal of Glaciology · Cambridge University Press',
    doi: '10.1017/jog.2022.64',
    abstract:
      'A continuous 20-year glaciological mass-balance dataset (2002–2022) from the Chhota Shigri benchmark glacier (Chandra Basin, Himachal Pradesh) is presented alongside continuous meteorological observations from the Himansh station. The glacier experienced a cumulative specific mass balance of -10.4 meters water equivalent (m w.e.) over two decades, with a mean annual rate of -0.52 ± 0.38 m w.e. yr⁻¹. Mass loss is predominantly driven by increasing summer temperatures (+0.32 °C/decade) and reduced solid winter precipitation during western disturbances. A distributed temperature-index melt model indicates that continuation of current warming rates will reduce glacier volume by 38% by the year 2050.',
    area: 'Glaciology',
    expedition: 'himalaya-glacier-2022',
    dataset: 'ds-cry-005',
    type: 'Journal',
    sourceUrl: 'https://ncpor.res.in/pages/display/268-himalaya',
    sourceLabel: 'NCPOR Himalayan Cryosphere (HiCOM)',
  },
]
