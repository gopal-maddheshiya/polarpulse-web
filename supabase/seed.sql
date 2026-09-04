-- ==============================================================================
-- POLARIS - India's Polar Knowledge & Outreach Platform
-- Complete Seed SQL for Supabase PostgreSQL
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SEED STATIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.stations (id, slug, name, country, region, location, x, y, established, blurb, description, research_focus, status, related_expeditions)
VALUES
('maitri', 'maitri', 'Maitri', 'India', 'Antarctic', 'Schirmacher Oasis, East Antarctica', 31, 78, 1989, 'India’s second permanent Antarctic research base, located in the Schirmacher Oasis.', 'Operational since 1989 in the ice-free rocky Schirmacher Oasis. Supports meteorology, upper atmospheric physics, and geomagnetism near Lake Priyadarshini.', ARRAY['Atmospheric Sciences', 'Meteorology', 'Geomagnetism', 'Seismology'], 'Operational', ARRAY['isro-44', 'isro-43', 'isro-42']),
('bharati', 'bharati', 'Bharati', 'India', 'Antarctic', 'Larsemann Hills, East Antarctica', 56, 80, 2012, 'India’s third Antarctic research base, in the Larsemann Hills.', 'State-of-the-art energy-efficient station constructed on stilts from 134 prefabricated shipping containers. Commissioned during the 31st Indian Antarctic Expedition.', ARRAY['Oceanography', 'Glaciology', 'Earth Sciences', 'Satellite Data Reception'], 'Operational', ARRAY['isro-44', 'isro-43']),
('vostok', 'vostok', 'Vostok', 'Russia', 'Antarctic', 'East Antarctic Ice Sheet', 48, 84, 1957, 'One of the coldest places on Earth, site of the deepest ice core.', 'Inland Russian station famous for recovering 420,000-year paleoclimate ice cores above subglacial Lake Vostok.', ARRAY['Paleoclimatology', 'Ice Core Drilling', 'Magnetometry'], 'Operational', ARRAY[]::text[]),
('mcmurdo', 'mcmurdo', 'McMurdo', 'USA', 'Antarctic', 'Ross Island', 18, 86, 1956, 'The largest research and logistics hub in Antarctica.', 'The primary logistics hub of the United States Antarctic Program capable of hosting up to 1,200 personnel.', ARRAY['Marine Biology', 'Geophysics', 'Logistics Hub'], 'Operational', ARRAY[]::text[]),
('rothera', 'rothera', 'Rothera', 'UK', 'Antarctic', 'Adelaide Island, Antarctic Peninsula', 12, 82, 1975, 'A hub for marine and atmospheric science on the Antarctic Peninsula.', 'The principal British Antarctic Survey facility featuring a crushed-rock runway and marine laboratories.', ARRAY['Marine Biology', 'Glaciology', 'Aviation Logistics'], 'Operational', ARRAY[]::text[]),
('syowa', 'syowa', 'Syowa', 'Japan', 'Antarctic', 'East Ongul Island, Queen Maud Land', 38, 80, 1957, 'Japan’s main Antarctic research station in East Antarctica.', 'Permanent Japanese scientific outpost conducting cosmic ray physics, meteorology, and environmental studies.', ARRAY['Upper Atmospheric Physics', 'Cosmic Rays', 'Geology'], 'Operational', ARRAY[]::text[]),
('amundsen', 'amundsen-scott', 'Amundsen–Scott', 'USA', 'Antarctic', 'Geographic South Pole', 50, 90, 1957, 'Research station at the geographic South Pole.', 'Located at 2,835 m elevation at the South Pole, operating deep-space submillimeter astrophysics telescopes.', ARRAY['Astrophysics', 'Cosmology', 'Atmospheric Physics'], 'Operational', ARRAY[]::text[]),
('troll', 'troll', 'Troll', 'Norway', 'Antarctic', 'Jutulsessen, Queen Maud Land', 24, 76, 1990, 'Norway’s all-season Antarctic research station.', 'Located on nunataks 235 km from the coast, supporting continuous satellite tracking and climate science.', ARRAY['Satellite Ground Station', 'Meteorology', 'Air Chemistry'], 'Operational', ARRAY[]::text[]),
('himadri', 'himadri', 'Himadri', 'India', 'Arctic', 'Ny-Ålesund, Spitsbergen, Svalbard', 60, 16, 2008, 'India’s Arctic research station at Ny-Ålesund, Svalbard.', 'Dedicated Indian research station in the high-latitude international research village in Svalbard. Dedicated to atmospheric aerosols, marine biology, and glacier monitoring.', ARRAY['Atmospheric Aerosols', 'Glacier Mass Balance', 'Fjord Oceanography'], 'Operational', ARRAY['arctic-2024']),
('nyalesund', 'ny-alesund', 'Ny-Ålesund', 'Norway', 'Arctic', 'Kongsfjorden, Svalbard', 60, 14, 1968, 'A unique international Arctic research village in Svalbard.', 'The world’s northernmost permanent civilian research settlement hosting stations from 10+ countries.', ARRAY['Atmospheric Monitoring', 'Arctic Biology', 'Geodesy'], 'Operational', ARRAY[]::text[]),
('alert', 'alert', 'Alert', 'Canada', 'Arctic', 'Ellesmere Island, Nunavut', 30, 12, 1950, 'The northernmost permanently inhabited place in the world.', 'Canadian high-Arctic military and meteorological outpost located 817 km south of the North Pole.', ARRAY['Greenhouse Gases', 'Global Atmosphere Watch'], 'Operational', ARRAY[]::text[]),
('summit', 'summit', 'Summit', 'Denmark', 'Arctic', 'Greenland Ice Sheet Apex', 38, 13, 1989, 'A high-elevation, inland Greenland research camp.', 'Year-round high-altitude station (3,216 m) situated at the apex of the Greenland ice sheet.', ARRAY['Ice Core Chemistry', 'Boundary Layer Meteorology'], 'Operational', ARRAY[]::text[]),
('barneo', 'barneo', 'Barneo', 'Russia', 'Arctic', 'Drifting Arctic Ice Pack (Seasonal)', 64, 11, 2002, 'A temporary seasonal ice camp near the North Pole.', 'Annual temporary Russian ice-drift base established each spring around 89°N for polar expeditions and scientific work.', ARRAY['Ice Physics', 'Drift Dynamics'], 'Seasonal', ARRAY[]::text[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  location = EXCLUDED.location,
  blurb = EXCLUDED.blurb,
  description = EXCLUDED.description,
  research_focus = EXCLUDED.research_focus,
  related_expeditions = EXCLUDED.related_expeditions;

-- ------------------------------------------------------------------------------
-- 2. SEED EXPEDITIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.expeditions (
  id, slug, title, short_title, region, year, season, vessel, lead, image_url, overview, description,
  timeline, scientists, research_areas, objectives, reports, datasets, publications, highlights, status
)
VALUES
(
  'isro-44', 'isro-44', '44th Indian Scientific Expedition to Antarctica', '44th ISEA', 'Antarctic', 2025, 'Summer',
  'MV Vasiliy Golovnin', 'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=85',
  'A flagship annual expedition conducting year-round atmospheric, oceanographic and cryospheric observations in the Southern Ocean and East Antarctic region, supporting climate and geoscience research.',
  'Comprehensive 2025 scientific campaign deploying multidisciplinary teams to Bharati and Maitri bases.',
  '[
    {"date": "Nov 2024", "event": "Pre-expedition logistics and equipment mobilisation from Cape Town"},
    {"date": "Jan 2025", "event": "Departure from Goa, sail across the Southern Ocean"},
    {"date": "Feb 2025", "event": "Resupply and crew rotation at Bharati and Maitri"},
    {"date": "Mar 2025", "event": "Sea-ice and atmospheric observation campaign"},
    {"date": "Apr 2025", "event": "Return sail and post-cruise sample processing"}
  ]'::jsonb,
  '[
    {"name": "Dr. A. Bhattacharya", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. R. Mohan", "role": "Glaciology Lead", "affiliation": "NCPOR"},
    {"name": "Dr. S. Tiwari", "role": "Atmospheric Chemistry", "affiliation": "IITM"},
    {"name": "Dr. P. Verma", "role": "Oceanographer", "affiliation": "NIO"}
  ]'::jsonb,
  ARRAY['Atmospheric Sciences', 'Oceanography', 'Glaciology'],
  ARRAY['Atmospheric black carbon and aerosol chemistry over the Southern Ocean', 'CTD profiling along the Meridional transect', 'Ice core sampling at Larsemann Hills', 'Continuous meteorological observations at Maitri'],
  '[
    {"title": "44th ISEA Preliminary Report (Demo)", "year": 2025, "type": "PDF"},
    {"title": "Maitri AWS Annual Summary (Demo)", "year": 2024, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-atm-001', 'ds-oce-002', 'ds-gla-003'],
  ARRAY['pub-2024-03', 'pub-2025-01'],
  '[
    {"title": "Black Carbon Transect", "description": "Aerosol sampling along the Southern Ocean cruise track."},
    {"title": "Larsemann Ice Cores", "description": "Recovery of shallow firn cores for climate proxies."}
  ]'::jsonb,
  'Completed'
),
(
  'isro-43', 'isro-43', '43rd Indian Scientific Expedition to Antarctica', '43rd ISEA', 'Antarctic', 2024, 'Summer',
  'MV Vasiliy Golovnin', 'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
  'Summer expedition focused on geological mapping, microbial biodiversity and atmospheric chemistry around the Larsemann Hills and Schirmacher Oasis.',
  'The 43rd expedition advanced understanding of Gondwana break-up through precision Broknes peninsula lithology.',
  '[
    {"date": "Dec 2023", "event": "Logistics planning and equipment preparation"},
    {"date": "Jan 2024", "event": "Departure from Cape Town"},
    {"date": "Feb 2024", "event": "Field campaigns at Larsemann Hills"},
    {"date": "Mar 2024", "event": "Return and sample analysis"}
  ]'::jsonb,
  '[
    {"name": "Dr. M. Sharma", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. K. Singh", "role": "Microbiology Lead", "affiliation": "NCPOR"}
  ]'::jsonb,
  ARRAY['Geology', 'Biology', 'Atmospheric Sciences'],
  ARRAY['Geomapping of the Broknes Peninsula', 'Cultivable diversity in Antarctic soils', 'DMSP flux measurements in surface ocean'],
  '[
    {"title": "43rd ISEA Annual Report (Demo)", "year": 2024, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-bio-004', 'ds-geo-005'],
  ARRAY['pub-2024-01', 'pub-2024-02'],
  '[
    {"title": "Broknes Mapping", "description": "Updated geological maps of the Broknes Peninsula."}
  ]'::jsonb,
  'Completed'
),
(
  'arctic-2024', 'arctic-2024', 'Indian Arctic Expedition — Svalbard & Ny-Ålesund', 'Arctic 2024', 'Arctic', 2024, 'Summer',
  NULL, 'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=85',
  'A summer campaign in the Svalbard archipelago supporting atmospheric, glaciological and fjord observatories operated under the Himadri research framework.',
  'Targeted investigations into Kongsfjorden fjord dynamics, glacier mass balance, and atmospheric aerosols.',
  '[
    {"date": "May 2024", "event": "Pre-cruise preparation at NCPOR"},
    {"date": "Jun 2024", "event": "Deployment of field teams to Svalbard"},
    {"date": "Jul 2024", "event": "Glacier mass-balance and sea-ice observations"},
    {"date": "Aug 2024", "event": "Return and sample shipment"}
  ]'::jsonb,
  '[
    {"name": "Dr. N. Krishnan", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. A. Kulkarni", "role": "Glaciologist", "affiliation": "IISc"}
  ]'::jsonb,
  ARRAY['Atmospheric Sciences', 'Glaciology', 'Oceanography'],
  ARRAY['Seasonal snow chemistry and stable water isotopes', 'Austre Lovén glacier mass-balance', 'Fjord hydrography in Kongsfjorden'],
  '[
    {"title": "Indian Arctic Campaign Report (Demo)", "year": 2024, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-gla-006', 'ds-oce-007'],
  ARRAY['pub-2024-05'],
  '[
    {"title": "Kongsfjorden Hydrography", "description": "Seasonal CTD profiles of the fjord system."}
  ]'::jsonb,
  'Completed'
),
(
  'so-cruise-2023', 'so-cruise-2023', 'Southern Ocean Hydrographic Cruise 2023', 'SO Cruise 2023', 'Southern Ocean', 2023, 'Summer',
  'ORV Sagar Nidhi', 'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
  'A meridional cruise covering the Indian Ocean sector of the Southern Ocean, contributing to global hydrographic and biogeochemical reference datasets.',
  'Quantified ocean carbon sequestration and thermodynamic air-sea flux across the subtropical convergence.',
  '[
    {"date": "Jan 2023", "event": "Mobilisation in Port Louis"},
    {"date": "Feb 2023", "event": "CTD and underway sampling"},
    {"date": "Mar 2023", "event": "Return and data archival"}
  ]'::jsonb,
  '[
    {"name": "Dr. P. Vidya", "role": "Chief Scientist", "affiliation": "NCPOR"}
  ]'::jsonb,
  ARRAY['Oceanography', 'Climate'],
  ARRAY['Meridional overturning circulation tracers', 'CO₂ flux and carbonate chemistry', 'Microbial community structure'],
  '[
    {"title": "SO Cruise 2023 Report (Demo)", "year": 2023, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-oce-008'],
  ARRAY['pub-2023-02'],
  '[
    {"title": "CO₂ Flux", "description": "Underway pCO₂ along the meridional transect."}
  ]'::jsonb,
  'Completed'
),
(
  'himalaya-glacier-2022', 'himalaya-glacier-2022', 'Himalayan Glacier Mass Balance Programme 2022', 'Himalaya 2022', 'Himalaya', 2022, 'Summer',
  NULL, 'NCPOR collaborative programme',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
  'Long-term monitoring of benchmark glaciers in the western Himalaya, complementing polar cryospheric studies.',
  'Conducted in-situ ablation stake monitoring on Chhota Shigri glacier in Himachal Pradesh.',
  '[
    {"date": "Apr 2022", "event": "Field team deployment"},
    {"date": "May–Sep 2022", "event": "Mass-balance and AWS observations"},
    {"date": "Oct 2022", "event": "Data archival"}
  ]'::jsonb,
  '[
    {"name": "Dr. A. Kulkarni", "role": "Lead Investigator", "affiliation": "IISc"}
  ]'::jsonb,
  ARRAY['Glaciology', 'Climate'],
  ARRAY['Seasonal mass balance', 'AWS meteorology'],
  '[
    {"title": "Chhota Shigri 2022 Report (Demo)", "year": 2022, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-gla-009'],
  ARRAY['pub-2022-01'],
  '[
    {"title": "Chhota Shigri", "description": "Long-term benchmark glacier mass-balance site."}
  ]'::jsonb,
  'Completed'
),
(
  'isro-42', 'isro-42', '42nd Indian Scientific Expedition to Antarctica', '42nd ISEA', 'Antarctic', 2023, 'Summer',
  'MV Vasiliy Golovnin', 'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85',
  'Pre-Antarctic Treaty Consultative Meeting support expedition — focused on long-term observatories and summer field campaigns.',
  'Dedicated campaign completing deep firn profiling and environmental remediation monitoring.',
  '[
    {"date": "Dec 2022", "event": "Departure from Cape Town"},
    {"date": "Feb 2023", "event": "Field campaigns in Dronning Maud Land"},
    {"date": "Mar 2023", "event": "Return"}
  ]'::jsonb,
  '[
    {"name": "Dr. S. Roy", "role": "Chief Scientist", "affiliation": "NCPOR"}
  ]'::jsonb,
  ARRAY['Geology', 'Glaciology', 'Atmospheric Sciences'],
  ARRAY['Dronning Maud Land geological mapping', 'Ice core recovery'],
  '[
    {"title": "42nd ISEA Report (Demo)", "year": 2023, "type": "PDF"}
  ]'::jsonb,
  ARRAY['ds-gla-010'],
  ARRAY['pub-2023-01'],
  '[
    {"title": "DML Field Camp", "description": "Summer geological camp in Dronning Maud Land."}
  ]'::jsonb,
  'Completed'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  region = EXCLUDED.region,
  year = EXCLUDED.year,
  season = EXCLUDED.season,
  vessel = EXCLUDED.vessel,
  lead = EXCLUDED.lead,
  image_url = EXCLUDED.image_url,
  overview = EXCLUDED.overview,
  description = EXCLUDED.description,
  timeline = EXCLUDED.timeline,
  scientists = EXCLUDED.scientists,
  research_areas = EXCLUDED.research_areas,
  objectives = EXCLUDED.objectives,
  reports = EXCLUDED.reports,
  datasets = EXCLUDED.datasets,
  publications = EXCLUDED.publications,
  highlights = EXCLUDED.highlights;

-- ------------------------------------------------------------------------------
-- 3. SEED DATASETS
-- ------------------------------------------------------------------------------
INSERT INTO public.datasets (
  id, slug, title, description, area, region, year, format, size, coverage,
  related_expedition, related_publication, preview_rows
)
VALUES
(
  'ds-atm-001', 'ds-atm-001', 'Maitri Atmospheric Black Carbon (Demo)',
  'Continuous measurements of equivalent black carbon mass concentration at the Maitri station, with supporting meteorological variables. (Demo dataset)',
  'Atmospheric Sciences', 'Antarctic · Maitri', 2024, 'CSV / NetCDF', '12.4 MB', '2020–2024, hourly',
  'isro-44', 'pub-2024-03',
  '[
    {"name": "Timestamp", "value": "2024-02-12T03:00:00Z"},
    {"name": "EBC (ng/m³)", "value": "32.4"},
    {"name": "Wind Speed (m/s)", "value": "4.1"},
    {"name": "Temperature (°C)", "value": "-11.2"},
    {"name": "Pressure (hPa)", "value": "982.3"}
  ]'::jsonb
),
(
  'ds-oce-002', 'ds-oce-002', 'Southern Ocean CTD Transect (Demo)',
  'Downcast CTD profiles along the meridional transect from Cape Town to Antarctica, with derived salinity, temperature and oxygen. (Demo dataset)',
  'Oceanography', 'Southern Ocean', 2024, 'NetCDF', '84.1 MB', '2024 cruise · 64 stations',
  'isro-44', 'pub-2025-01',
  '[
    {"name": "Station", "value": "SO-12"},
    {"name": "Latitude", "value": "-52.40°S"},
    {"name": "Longitude", "value": "14.10°E"},
    {"name": "Depth (m)", "value": "4200"},
    {"name": "Bottom Temp (°C)", "value": "0.42"}
  ]'::jsonb
),
(
  'ds-gla-003', 'ds-gla-003', 'Larsemann Hills Shallow Firn Cores (Demo)',
  'Stable water isotope and major ion profiles from shallow firn cores recovered during the 44th ISEA. (Demo dataset)',
  'Glaciology', 'Antarctic · Larsemann Hills', 2025, 'CSV', '3.2 MB', '3 cores · 0–12 m',
  'isro-44', NULL,
  '[
    {"name": "Core ID", "value": "LH-03"},
    {"name": "Depth (m)", "value": "4.2"},
    {"name": "δ¹⁸O (‰)", "value": "-28.1"},
    {"name": "δD (‰)", "value": "-216.4"}
  ]'::jsonb
),
(
  'ds-bio-004', 'ds-bio-004', 'Antarctic Soil Microbial Diversity (Demo)',
  '16S rRNA amplicon sequencing of soil samples from the Larsemann Hills. (Demo dataset)',
  'Biodiversity', 'Antarctic', 2024, 'FASTQ / CSV', '212 MB', '48 samples',
  'isro-43', 'pub-2024-01',
  '[
    {"name": "Sample", "value": "LH-S-12"},
    {"name": "Latitude", "value": "-69.40°S"},
    {"name": "Reads", "value": "84,210"}
  ]'::jsonb
),
(
  'ds-geo-005', 'ds-geo-005', 'Broknes Peninsula Geological Map (Demo)',
  'Vector geological map of the Broknes Peninsula derived from field campaigns. (Demo dataset)',
  'Geology', 'Antarctic · Broknes', 2024, 'GeoJSON', '8.7 MB', '1:25,000',
  'isro-43', 'pub-2024-02',
  '[
    {"name": "Feature", "value": "Orthogneiss unit"}
  ]'::jsonb
),
(
  'ds-gla-006', 'ds-gla-006', 'Austre Lovén Glacier Mass Balance (Demo)',
  'Seasonal surface mass-balance measurements on the Austre Lovén glacier, Svalbard. (Demo dataset)',
  'Glaciology', 'Arctic · Svalbard', 2024, 'CSV', '1.8 MB', '2015–2024, monthly',
  'arctic-2024', 'pub-2024-05',
  '[
    {"name": "Stake", "value": "AL-04"},
    {"name": "Net mass (mm w.e.)", "value": "-628"}
  ]'::jsonb
),
(
  'ds-oce-007', 'ds-oce-007', 'Kongsfjorden Hydrography (Demo)',
  'CTD profiles of the Kongsfjorden fjord system. (Demo dataset)',
  'Oceanography', 'Arctic · Svalbard', 2024, 'NetCDF', '22.0 MB', '12 stations',
  'arctic-2024', NULL,
  '[
    {"name": "Station", "value": "KF-06"}
  ]'::jsonb
),
(
  'ds-oce-008', 'ds-oce-008', 'Southern Ocean CO₂ Underway (Demo)',
  'Underway pCO₂ and sea surface temperature along the Southern Ocean transect. (Demo dataset)',
  'Climate', 'Southern Ocean', 2023, 'CSV', '5.1 MB', '2023 cruise',
  'so-cruise-2023', 'pub-2023-02',
  '[
    {"name": "pCO₂ (µatm)", "value": "398.4"}
  ]'::jsonb
),
(
  'ds-gla-009', 'ds-gla-009', 'Chhota Shigri Annual Mass Balance (Demo)',
  'Long-term annual and seasonal mass-balance of Chhota Shigri glacier. (Demo dataset)',
  'Glaciology', 'Himalaya', 2022, 'CSV', '0.6 MB', '1987–2022',
  'himalaya-glacier-2022', 'pub-2022-01',
  '[
    {"name": "Net mass (m w.e.)", "value": "-0.42"}
  ]'::jsonb
),
(
  'ds-gla-010', 'ds-gla-010', 'Dronning Maud Land Snow Pit (Demo)',
  'Snow pit chemistry and stable isotope profiles from DML. (Demo dataset)',
  'Glaciology', 'Antarctic · DML', 2023, 'CSV', '1.1 MB', '5 pits',
  'isro-42', 'pub-2023-01',
  '[
    {"name": "Pit ID", "value": "DML-P2"}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  region = EXCLUDED.region,
  year = EXCLUDED.year,
  format = EXCLUDED.format,
  size = EXCLUDED.size,
  coverage = EXCLUDED.coverage,
  related_expedition = EXCLUDED.related_expedition,
  related_publication = EXCLUDED.related_publication,
  preview_rows = EXCLUDED.preview_rows;

-- ------------------------------------------------------------------------------
-- 4. SEED PUBLICATIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.publications (
  id, slug, title, authors, year, journal, doi, abstract, description, area, expedition, dataset, type
)
VALUES
(
  'pub-2024-03', 'pub-2024-03',
  'Equivalent black carbon over the Southern Ocean: Seasonal observations from Maitri',
  ARRAY['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.'], 2024, 'Polar Science (Demo)', '10.0000/polaris.2024.0003',
  'We present a seasonal analysis of equivalent black carbon mass concentration observed at the Maitri station, supported by back-trajectory and fire emission inventories. The data demonstrate clean marine conditions and episodic long-range transport from southern Africa and South America. (Demo abstract)',
  'Seasonal analysis of equivalent black carbon observed from India’s Maitri base.',
  'Atmospheric Sciences', 'isro-44', 'ds-atm-001', 'Journal'
),
(
  'pub-2025-01', 'pub-2025-01',
  'Meridional variability of the Southern Ocean overturning circulation (2024 transect)',
  ARRAY['Verma, P.', 'Vidya, P.'], 2025, 'Journal of Southern Ocean Studies (Demo)', '10.0000/polaris.2025.0001',
  'CTD and tracer observations along a 2024 meridional transect reveal significant interannual variability in the upper overturning cell, with implications for heat and carbon uptake. (Demo abstract)',
  'CTD transect observations across the Southern Ocean overturning circulation.',
  'Oceanography', 'isro-44', 'ds-oce-002', 'Journal'
),
(
  'pub-2024-01', 'pub-2024-01',
  'Cultivable microbial diversity in Larsemann Hills soils',
  ARRAY['Singh, K.', 'Sharma, M.'], 2024, 'Antarctic Microbiology Letters (Demo)', '10.0000/polaris.2024.0001',
  'A culture-dependent survey of Larsemann Hills soils reveals psychrotolerant isolates with biotechnological potential, including cold-active enzymes and antifreeze proteins. (Demo abstract)',
  'Microbial characterization of cold-active enzymes in Antarctic soils.',
  'Biodiversity', 'isro-43', 'ds-bio-004', 'Journal'
),
(
  'pub-2024-02', 'pub-2024-02',
  'Updated geological map of the Broknes Peninsula: Implications for Rodinia reconstructions',
  ARRAY['Sharma, M.', 'Roy, S.'], 2024, 'Precambrian Research (Demo)', '10.0000/polaris.2024.0002',
  'A revised 1:25,000 geological map of the Broknes Peninsula integrates structural, petrological and geochronological data, supporting regional correlations with Indo-Antarctic cratonic blocks. (Demo abstract)',
  'High-resolution geological cartography of the Broknes Peninsula.',
  'Geology', 'isro-43', 'ds-geo-005', 'Journal'
),
(
  'pub-2024-05', 'pub-2024-05',
  'Snow chemistry and stable water isotopes on Austre Lovén glacier',
  ARRAY['Krishnan, N.', 'Kulkarni, A.'], 2024, 'Arctic, Antarctic and Alpine Research (Demo)', '10.0000/polaris.2024.0005',
  'A multi-year record of snow chemistry and isotope ratios from a Svalbard benchmark glacier shows strong seasonality and episodic Arctic moisture transport. (Demo abstract)',
  'Isotopic analysis of high-latitude Arctic precipitation.',
  'Glaciology', 'arctic-2024', 'ds-gla-006', 'Journal'
),
(
  'pub-2023-02', 'pub-2023-02',
  'Underway pCO₂ along the 2023 Southern Ocean meridional transect',
  ARRAY['Vidya, P.'], 2023, 'Geophysical Research Letters (Demo)', '10.0000/polaris.2023.0002',
  'Underway pCO₂ observations along the 2023 meridional transect document the seasonal sink in the Subantarctic Zone and localised outgassing south of the Polar Front. (Demo abstract)',
  'Carbon dioxide sea-air exchange in the Indian sector of the Southern Ocean.',
  'Climate', 'so-cruise-2023', 'ds-oce-008', 'Journal'
),
(
  'pub-2023-01', 'pub-2023-01',
  'Snow-pit chemistry across Dronning Maud Land',
  ARRAY['Roy, S.'], 2023, 'Polar Science (Demo)', '10.0000/polaris.2023.0001',
  'A network of shallow snow pits in Dronning Maud Land captures the spatial variability of major ions and stable water isotopes, supporting the design of deep ice-coring programmes. (Demo abstract)',
  'Glaciological shallow firn chemistry in Queen Maud Land.',
  'Glaciology', 'isro-42', 'ds-gla-010', 'Journal'
),
(
  'pub-2022-01', 'pub-2022-01',
  'Long-term mass balance of Chhota Shigri glacier, western Himalaya',
  ARRAY['Kulkarni, A.'], 2022, 'Journal of Glaciology (Demo)', '10.0000/polaris.2022.0001',
  'A 35-year mass-balance record of Chhota Shigri glacier reveals strong interannual variability tied to regional climate modes, with an overall negative trend. (Demo abstract)',
  'Multi-decadal glaciological mass balance monitoring.',
  'Glaciology', 'himalaya-glacier-2022', 'ds-gla-009', 'Journal'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  authors = EXCLUDED.authors,
  year = EXCLUDED.year,
  journal = EXCLUDED.journal,
  doi = EXCLUDED.doi,
  abstract = EXCLUDED.abstract,
  description = EXCLUDED.description,
  area = EXCLUDED.area,
  expedition = EXCLUDED.expedition,
  dataset = EXCLUDED.dataset,
  type = EXCLUDED.type;

-- ------------------------------------------------------------------------------
-- 5. SEED KNOWLEDGE
-- ------------------------------------------------------------------------------
INSERT INTO public.knowledge (
  id, slug, type, title, excerpt, description, body, content, tags, category, year, author,
  related_expedition, related_dataset, related_publication
)
VALUES
(
  'kb-1', 'kb-1', 'Field Story', 'First Light at Bharati',
  'A field assistant describes a clear morning at the Larsemann Hills, and what the team gets done before the katabatic winds pick up.',
  'Field dispatch from the Larsemann Hills',
  'By 06:30 the Sun is already lifting above the Broknes ridge. The wind is calm, the ice reflects a low gold, and the team splits into pairs: glaciology to the firn pits, biology to the soil transects. By noon the katabatic will set in, and we will all be back at the heated containers, processing samples. The rhythm of an Antarctic day is unusual at first, then utterly ordinary. You begin to measure your work in shifts and your meals in calories. The cold, which felt so foreign on day one, becomes a constant — an environment, almost a colleague, that you negotiate with each day.',
  'By 06:30 the Sun is already lifting above the Broknes ridge...',
  ARRAY['Bharati', 'Larsemann Hills', 'Field Diary'], 'Field Stories', 2024, 'Field Team · 43rd ISEA (Demo)',
  'isro-43', NULL, NULL
),
(
  'kb-2', 'kb-2', 'Report', '44th ISEA Preliminary Report',
  'A summary of operations, science campaigns and station logistics for the 44th Indian Scientific Expedition to Antarctica.',
  'Preliminary overview of the 44th national expedition',
  'The 44th ISEA supported year-round atmospheric, oceanographic and glaciological programmes at Bharati and Maitri. Major deliverables included the recovery of shallow firn cores, summer aerosol and BC measurements, and the continuation of long-term AWS records. Logistics involved the MV Vasiliy Golovnin, intra-continental traverses and helicopter support from DROMLAN.',
  'The 44th ISEA supported year-round atmospheric, oceanographic and glaciological programmes...',
  ARRAY['ISEA', 'Annual Report', 'Antarctic'], 'Reports', 2025, 'NCPOR (Demo)',
  'isro-44', NULL, NULL
),
(
  'kb-3', 'kb-3', 'Article', 'Why the Poles Matter to India',
  'A short essay on why the Indian polar programme is part of the country’s climate, ocean and strategic interests.',
  'Connecting high-latitude cryosphere physics to Indian monsoon patterns',
  'India sits in the tropics, but its climate, monsoon and oceans are tightly coupled to the polar regions. A warmer Antarctic and a melting Greenland alter the thermohaline circulation and the sea-level budget. The Himalayan cryosphere — itself a polar analogue — supplies the perennial rivers of the Indo-Gangetic plain. Polar science is therefore not a luxury: it is a foundational investment in India’s environmental and economic future.',
  'India sits in the tropics, but its climate, monsoon and oceans are tightly coupled to the polar regions...',
  ARRAY['Climate', 'Policy', 'India'], 'Articles', 2024, 'POLARIS Editorial (Demo)',
  NULL, NULL, NULL
),
(
  'kb-4', 'kb-4', 'News', 'Polar Outreach Workshop Concludes in Goa',
  'A summary of the annual polar outreach workshop, which brings together scientists, teachers and students.',
  'NCPOR education initiative',
  'The annual Polar Outreach Workshop brought together researchers, science educators and students for a week of lectures, lab tours and field demonstrations. Highlights included a sea-ice tank experiment, a polar climate role-play, and a poster session featuring class projects from schools across India.',
  'The annual Polar Outreach Workshop brought together researchers...',
  ARRAY['Outreach', 'Education'], 'News', 2024, 'POLARIS (Demo)',
  NULL, NULL, NULL
),
(
  'kb-5', 'kb-5', 'Educational', 'How to Read a CTD Profile',
  'A step-by-step guide to interpreting conductivity, temperature and depth measurements from polar oceans.',
  'Oceanographic tutorial for undergraduate science students',
  'A CTD cast gives you three primary variables — temperature, salinity (from conductivity) and pressure (depth) — as the instrument is lowered through the water column. From these you derive density, buoyancy frequency and a number of derived quantities. Reading a profile is partly art: look for the mixed layer, the thermocline, intermediate water masses and the deep western boundary current signal.',
  'A CTD cast gives you three primary variables...',
  ARRAY['Oceanography', 'Methods', 'Tutorial'], 'Educational', 2024, 'POLARIS Editorial (Demo)',
  NULL, 'ds-oce-002', NULL
),
(
  'kb-6', 'kb-6', 'Publication', 'Equivalent black carbon over the Southern Ocean',
  'A journal article on seasonal black carbon observations at Maitri.',
  'Peer-reviewed paper highlight',
  'We present a seasonal analysis of equivalent black carbon mass concentration at Maitri, supported by back-trajectory analysis. The dataset is openly available through POLARIS.',
  'We present a seasonal analysis of equivalent black carbon...',
  ARRAY['Atmospheric Sciences', 'Black Carbon'], 'Publications', 2024, 'Tiwari et al. (Demo)',
  'isro-44', 'ds-atm-001', 'pub-2024-03'
),
(
  'kb-7', 'kb-7', 'Dataset', 'Southern Ocean CTD Transect (Demo)',
  'A 64-station CTD transect along the Southern Ocean, supporting overturning circulation studies.',
  'Open oceanographic dataset note',
  'Downcast CTD profiles with derived salinity, temperature and oxygen along a meridional transect. Quality-controlled, distributed as NetCDF.',
  'Downcast CTD profiles with derived salinity...',
  ARRAY['Oceanography', 'CTD'], 'Datasets', 2024, 'NCPOR (Demo)',
  'isro-44', 'ds-oce-002', NULL
),
(
  'kb-8', 'kb-8', 'Field Story', 'Svalbard in Polar Day',
  'A summer field diary from Kongsfjorden — sampling in 24-hour daylight.',
  'High Arctic field story',
  'In June, the Sun never sets. Workdays are organised by tides and weather, not by the clock. Sampling a glacier outflow at midnight is a strange, almost cinematic experience: the air is warm, the water is cold, the sky is soft pink. Everything is geology and water and patience.',
  'In June, the Sun never sets...',
  ARRAY['Arctic', 'Svalbard', 'Field Diary'], 'Field Stories', 2024, 'Field Team · Arctic 2024 (Demo)',
  'arctic-2024', NULL, NULL
),
(
  'kb-9', 'kb-9', 'Report', 'Maitri Annual AWS Summary',
  'A station-level annual summary of meteorological observations.',
  'Automated weather station review',
  'Automatic weather station (AWS) observations at Maitri for the previous calendar year, including temperature, wind, pressure, radiation and snow depth. Quality flags follow WMO guidelines.',
  'Automatic weather station (AWS) observations at Maitri...',
  ARRAY['AWS', 'Maitri', 'Meteorology'], 'Reports', 2024, 'NCPOR (Demo)',
  'isro-44', NULL, NULL
),
(
  'kb-10', 'kb-10', 'Article', 'A Beginner’s Guide to Sea Ice',
  'How sea ice forms, why it matters, and what its decline means.',
  'Fundamentals of polar cryosphere physics',
  'Sea ice is one of the most visible indicators of a changing climate. It forms when the upper ocean cools below its freezing point; brine is rejected, leaving a porous solid that thickens through the winter. In summer, melt ponds dot its surface. Its high albedo — the fraction of sunlight it reflects — helps regulate Earth’s energy balance. When sea ice shrinks, the darker ocean absorbs more heat, accelerating warming: a feedback loop at the heart of polar climate.',
  'Sea ice is one of the most visible indicators of a changing climate...',
  ARRAY['Sea Ice', 'Climate', 'Beginner'], 'Articles', 2024, 'POLARIS Editorial (Demo)',
  NULL, NULL, NULL
),
(
  'kb-11', 'kb-11', 'Educational', 'Glossary of Polar Terms',
  'A living glossary of polar science vocabulary for students and educators.',
  'Curated reference dictionary',
  'From ablation to zooplankton — a curated glossary used across the POLARIS education modules.',
  'From ablation to zooplankton...',
  ARRAY['Glossary', 'Reference'], 'Educational', 2024, 'POLARIS Editorial (Demo)',
  NULL, NULL, NULL
),
(
  'kb-12', 'kb-12', 'News', 'International Polar Day Celebrated in Schools',
  'A roundup of school events marking International Polar Day.',
  'Nationwide science festival summary',
  'Schools across India hosted quizzes, poster-making sessions and guest lectures to mark International Polar Day, coordinated through POLARIS partner institutions.',
  'Schools across India hosted quizzes...',
  ARRAY['Education', 'Outreach'], 'News', 2024, 'POLARIS (Demo)',
  NULL, NULL, NULL
)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  description = EXCLUDED.description,
  body = EXCLUDED.body,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  author = EXCLUDED.author,
  related_expedition = EXCLUDED.related_expedition,
  related_dataset = EXCLUDED.related_dataset,
  related_publication = EXCLUDED.related_publication;

-- ------------------------------------------------------------------------------
-- 6. SEED EDUCATION
-- ------------------------------------------------------------------------------
INSERT INTO public.education (
  id, slug, title, emoji, simple, scientific, description, content, difficulty, topic, glossary, quiz
)
VALUES
(
  'antarctica', 'antarctica', 'Antarctica', '🧊',
  'Antarctica is the icy continent around the South Pole. It is the coldest, windiest and driest place on Earth, and almost no plants grow there. Scientists from many countries visit to study the ice, weather and animals.',
  'Antarctica is a polar continent covering ~14 million km², with an ice sheet averaging ~1.9 km in thickness that contains ~60% of the planet’s fresh water. It is governed by the Antarctic Treaty (1959) and hosts research stations from over 30 countries operating under the Protocol on Environmental Protection.',
  'Antarctica is the icy continent around the South Pole...',
  'Antarctica is a polar continent covering ~14 million km²...',
  'Intermediate', 'Antarctica',
  '[
    {"term": "Ice sheet", "definition": "A large, persistent body of land-based ice covering more than 50,000 km²."},
    {"term": "Polar desert", "definition": "A region near the poles with very low precipitation and minimal life."}
  ]'::jsonb,
  '[
    {"q": "What is the average thickness of the Antarctic ice sheet?", "options": ["~200 m", "~1.9 km", "~10 km", "~50 m"], "answer": 1},
    {"q": "Which agreement governs activities in Antarctica?", "options": ["Kyoto Protocol", "Antarctic Treaty", "Paris Agreement", "Montreal Protocol"], "answer": 1}
  ]'::jsonb
),
(
  'arctic', 'arctic', 'Arctic', '🌨️',
  'The Arctic is the icy region around the North Pole. It is mostly frozen ocean surrounded by land. People, animals and plants live there, including polar bears and reindeer.',
  'The Arctic is a partially ice-covered ocean surrounded by permafrost-dominated landmasses. Sea-ice extent varies seasonally and has declined ~13% per decade since the satellite era, with significant implications for ocean circulation, ecosystems and indigenous communities.',
  'The Arctic is the icy region around the North Pole...',
  'The Arctic is a partially ice-covered ocean...',
  'Intermediate', 'Arctic',
  '[
    {"term": "Permafrost", "definition": "Ground that remains frozen for at least two consecutive years."},
    {"term": "Sea ice", "definition": "Frozen ocean water that forms, grows and melts seasonally."}
  ]'::jsonb,
  '[
    {"q": "The Arctic is mostly…", "options": ["Land", "Ocean", "Desert", "Rainforest"], "answer": 1},
    {"q": "What is permafrost?", "options": ["A polar bear", "Frozen ground", "Sea ice", "A glacier"], "answer": 1}
  ]'::jsonb
),
(
  'sea-ice', 'sea-ice', 'Sea Ice', '❄️',
  'Sea ice is frozen ocean water. It grows in winter and melts in summer. It gives polar animals a place to live and travel, and it reflects sunlight back into space.',
  'Sea ice forms when seawater cools below its freezing point (~-1.8 °C). First-year and multi-year ice have different physical properties and ecological roles. Sea-ice albedo feedbacks strongly influence polar climate, and its long-term decline is a key indicator of climate change.',
  'Sea ice is frozen ocean water...',
  'Sea ice forms when seawater cools below its freezing point...',
  'Intermediate', 'Sea Ice',
  '[
    {"term": "Albedo", "definition": "The fraction of incoming sunlight reflected by a surface."},
    {"term": "Multi-year ice", "definition": "Sea ice that has survived at least one summer melt season."}
  ]'::jsonb,
  '[
    {"q": "Sea ice is frozen…", "options": ["Rainwater", "Ocean water", "Glacier water", "Lake water"], "answer": 1},
    {"q": "What does ice albedo do?", "options": ["Absorbs heat", "Reflects sunlight", "Melts faster", "Cools the sun"], "answer": 1}
  ]'::jsonb
),
(
  'glaciers', 'glaciers', 'Glaciers', '🏔️',
  'A glacier is a big, slow-moving river of ice. Glaciers store fresh water and shape the land. When they melt faster than they grow, they shrink.',
  'Glaciers form where annual snow accumulation exceeds ablation over many years, compacting into ice that flows under its own weight. Mass balance — the difference between accumulation and ablation — is a key indicator of climate, and glacier retreat contributes to sea-level rise.',
  'A glacier is a big, slow-moving river of ice...',
  'Glaciers form where annual snow accumulation exceeds ablation...',
  'Intermediate', 'Glaciers',
  '[
    {"term": "Mass balance", "definition": "The net gain or loss of ice over a year."},
    {"term": "Ablation", "definition": "All processes that remove ice or snow (melting, sublimation, calving)."}
  ]'::jsonb,
  '[
    {"q": "Glaciers form when…", "options": ["Snowfall > melting", "It always rains", "Temperature rises", "Volcanoes erupt"], "answer": 0}
  ]'::jsonb
),
(
  'polar-climate', 'polar-climate', 'Polar Climate', '🌡️',
  'Polar climates are extremely cold with big differences between summer and winter. The poles are warming faster than the rest of the Earth.',
  'Polar amplification refers to the observed phenomenon where high latitudes warm at roughly 2–4 times the global average. Mechanisms include albedo–temperature feedbacks, reduced sea-ice extent, changes in atmospheric and oceanic heat transport, and permafrost carbon feedbacks.',
  'Polar climates are extremely cold...',
  'Polar amplification refers to the observed phenomenon...',
  'Intermediate', 'Polar Climate',
  '[
    {"term": "Polar amplification", "definition": "The stronger warming of polar regions relative to the global average."}
  ]'::jsonb,
  '[
    {"q": "What is polar amplification?", "options": ["Ice growing", "Stronger polar warming", "More polar bears", "Less snow"], "answer": 1}
  ]'::jsonb
),
(
  'oceanography', 'oceanography', 'Oceanography', '🌊',
  'Polar oceanography studies cold oceans near the poles. These cold, dense waters sink and help move heat around the planet.',
  'Polar oceans drive the global thermohaline circulation through the formation of dense, cold, salty water masses — Antarctic Bottom Water and North Atlantic Deep Water — that ventilate the abyss and store heat and carbon on centennial to millennial timescales.',
  'Polar oceanography studies cold oceans near the poles...',
  'Polar oceans drive the global thermohaline circulation...',
  'Intermediate', 'Oceanography',
  '[
    {"term": "Thermohaline circulation", "definition": "Global ocean circulation driven by temperature and salinity differences."},
    {"term": "Antarctic Bottom Water", "definition": "A dense water mass formed around Antarctica that spreads along the seafloor."}
  ]'::jsonb,
  '[
    {"q": "Cold, salty polar water…", "options": ["Floats", "Sinks", "Evaporates", "Disappears"], "answer": 1}
  ]'::jsonb
),
(
  'indian-polar', 'indian-polar', 'Indian Polar Research', '🇮🇳',
  'India has been sending scientists to Antarctica for over 40 years. India also has a research base in the Arctic called Himadri. The National Centre for Polar and Ocean Research (NCPOR) leads this work.',
  'India’s polar research programme is coordinated by the National Centre for Polar and Ocean Research (NCPOR) under the Ministry of Earth Sciences. The country operates Maitri (1989) and Bharati (2012) in Antarctica, the Himadri station in Svalbard for Arctic studies, and contributes to the ITGC and major cryosphere networks.',
  'India has been sending scientists to Antarctica for over 40 years...',
  'India’s polar research programme is coordinated by NCPOR...',
  'Intermediate', 'Indian Polar Research',
  '[
    {"term": "NCPOR", "definition": "National Centre for Polar and Ocean Research, the nodal Indian polar research agency."},
    {"term": "ITGC", "definition": "International Thwaites Glacier Collaboration."}
  ]'::jsonb,
  '[
    {"q": "Which Indian agency leads polar research?", "options": ["ISRO", "NCPOR", "IITM", "CPRI"], "answer": 1},
    {"q": "Bharati station is located in…", "options": ["Arctic", "Antarctica", "Himalaya", "Sahara"], "answer": 1}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  emoji = EXCLUDED.emoji,
  simple = EXCLUDED.simple,
  scientific = EXCLUDED.scientific,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  difficulty = EXCLUDED.difficulty,
  topic = EXCLUDED.topic,
  glossary = EXCLUDED.glossary,
  quiz = EXCLUDED.quiz;

-- ------------------------------------------------------------------------------
-- 7. SEED MEDIA
-- ------------------------------------------------------------------------------
INSERT INTO public.media (
  id, slug, type, title, caption, description, src, image_url, poster, credit, region, expedition
)
VALUES
(
  'm-1', 'm-1', 'photo', 'Polar Research Vessel in Pack Ice',
  'Expedition vessel navigating sea-ice channels in the Southern Ocean.',
  'Expedition vessel navigating sea-ice channels in the Southern Ocean.',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Scientific Expedition Archive', 'Southern Ocean', 'isro-44'
),
(
  'm-2', 'm-2', 'photo', 'Bharati Polar Station',
  'India’s third permanent Antarctic station on elevated stilts in Larsemann Hills.',
  'India’s third permanent Antarctic station on elevated stilts in Larsemann Hills.',
  'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
  NULL, 'NCPOR / MoES', 'Antarctic', 'isro-44'
),
(
  'm-3', 'm-3', 'photo', 'Maitri Research Base',
  'Aerial perspective of Maitri station located in the rocky Schirmacher Oasis.',
  'Aerial perspective of Maitri station located in the rocky Schirmacher Oasis.',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  NULL, 'NCPOR / MoES', 'Antarctic', 'isro-43'
),
(
  'm-4', 'm-4', 'photo', 'Ice Core Stratigraphy Examination',
  'Glaciologist inspecting firn core layers for paleoclimate gas analysis.',
  'Glaciologist inspecting firn core layers for paleoclimate gas analysis.',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Polar Glaciology Laboratory', 'Antarctic', 'isro-44'
),
(
  'm-5', 'm-5', 'photo', 'Himadri Arctic Station',
  'India’s permanent Arctic research base in Ny-Ålesund, Spitsbergen, Svalbard.',
  'India’s permanent Arctic research base in Ny-Ålesund, Spitsbergen, Svalbard.',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80',
  NULL, 'NCPOR / MoES', 'Arctic', 'arctic-2024'
),
(
  'm-6', 'm-6', 'photo', 'Kongsfjorden Glacier Terminus',
  'Glacial terminus and sea-ice calving front in high-latitude Svalbard.',
  'Glacial terminus and sea-ice calving front in high-latitude Svalbard.',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Arctic Glaciology Survey', 'Arctic', 'arctic-2024'
),
(
  'm-7', 'm-7', 'photo', 'Dakshin Gangotri Historical Archive',
  'India’s first permanent Antarctic base constructed on the ice shelf in 1983.',
  'India’s first permanent Antarctic base constructed on the ice shelf in 1983.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  NULL, 'NCPOR Historical Archive', 'Antarctic', NULL
),
(
  'm-8', 'm-8', 'photo', 'Tabular Iceberg in Southern Ocean',
  'Calved tabular iceberg drifting northward past the polar front.',
  'Calved tabular iceberg drifting northward past the polar front.',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Southern Ocean Observation', 'Southern Ocean', NULL
),
(
  'm-9', 'm-9', 'photo', 'Sea-Ice Physics Fieldwork',
  'Researchers measuring sea-ice thickness and thermal conductivity.',
  'Researchers measuring sea-ice thickness and thermal conductivity.',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Polar Field Operations', 'Antarctic', 'isro-44'
),
(
  'm-10', 'm-10', 'photo', 'Adélie Penguin Rookery',
  'Coastal wildlife monitoring near the Larsemann Hills protected zones.',
  'Coastal wildlife monitoring near the Larsemann Hills protected zones.',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Polar Ecology Survey', 'Antarctic', NULL
),
(
  'm-11', 'm-11', 'photo', 'Auroral Electrojet Activity',
  'Geomagnetic disturbance and aurora observed over the polar ice sheet.',
  'Geomagnetic disturbance and aurora observed over the polar ice sheet.',
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Upper Atmospheric Physics', 'Antarctic', NULL
),
(
  'm-12', 'm-12', 'photo', 'Antarctic Continental Ice Sheet',
  'Vast polar plateau regulating global thermohaline circulation.',
  'Vast polar plateau regulating global thermohaline circulation.',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  NULL, 'Cryospheric Science Survey', 'Antarctic', NULL
),
(
  'm-v1', 'm-v1', 'video', 'A Virtual Tour of Bharati Station',
  'Walk-through of India’s modern modular Antarctic research base.',
  'Walk-through of India’s modern modular Antarctic research base.',
  'https://cdn.coverr.co/videos/coverr-an-aerial-view-of-an-arctic-landscape-1582/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-an-aerial-view-of-an-arctic-landscape-1582/1080p.mp4',
  'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
  'NCPOR / MoES', 'Antarctic', 'isro-44'
),
(
  'm-v2', 'm-v2', 'video', 'Sea Ice and Monsoon Climate Dynamics',
  'How changing polar sea ice modulates global ocean circulation and monsoons.',
  'How changing polar sea ice modulates global ocean circulation and monsoons.',
  'https://cdn.coverr.co/videos/coverr-icebergs-in-greenland-3296/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-icebergs-in-greenland-3296/1080p.mp4',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'Climate Research Lab', 'Southern Ocean', NULL
),
(
  'm-i1', 'm-i1', 'infographic', 'Indian Polar Research Programme (1981–2025)',
  'A 44-year chronological overview of Indian expeditions across the poles.',
  'A 44-year chronological overview of Indian expeditions across the poles.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  NULL, 'POLARIS / NCPOR', 'Antarctic', NULL
),
(
  'm-i2', 'm-i2', 'infographic', 'Cryospheric Mass Balance & Sea Level Rise',
  'Glacial flow dynamics and ice loss mechanisms explained simply.',
  'Glacial flow dynamics and ice loss mechanisms explained simply.',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  NULL, 'POLARIS / NCPOR', 'Arctic', NULL
)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  caption = EXCLUDED.caption,
  description = EXCLUDED.description,
  src = EXCLUDED.src,
  image_url = EXCLUDED.image_url,
  poster = EXCLUDED.poster,
  credit = EXCLUDED.credit,
  region = EXCLUDED.region,
  expedition = EXCLUDED.expedition;
