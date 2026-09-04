-- ==============================================================================
-- POLARIS - India's Polar Knowledge & Outreach Platform
-- Smart India Hackathon 2026 | Problem ID: 26063
-- Ministry of Earth Sciences (MoES) | NCPOR
-- Repeatable Seed SQL for 4 Core Tables
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SEED EXPEDITIONS (6 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.expeditions (
  id, title, short_title, region, year, season, vessel, lead, image_url, overview,
  timeline, scientists, research_areas, objectives, reports, highlights, status
)
VALUES
(
  'isro-44',
  '44th Indian Scientific Expedition to Antarctica',
  '44th ISEA',
  'Antarctic',
  2025,
  'Summer',
  'MV Vasiliy Golovnin',
  'NCPOR · Ministry of Earth Sciences',
  'https://upload.wikimedia.org/wikipedia/commons/5/5c/Polarstern_MOSAiC.jpg',
  'A flagship annual expedition conducting year-round atmospheric, oceanographic and cryospheric observations in the Southern Ocean and East Antarctic region, supporting climate and geoscience research.',
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
  '[
    {"title": "Black Carbon Transect", "description": "Aerosol sampling along the Southern Ocean cruise track."},
    {"title": "Larsemann Ice Cores", "description": "Recovery of shallow firn cores for climate proxies."}
  ]'::jsonb,
  'Completed'
),
(
  'isro-43',
  '43rd Indian Scientific Expedition to Antarctica',
  '43rd ISEA',
  'Antarctic',
  2024,
  'Summer',
  'MV Vasiliy Golovnin',
  'NCPOR · Ministry of Earth Sciences',
  'https://upload.wikimedia.org/wikipedia/commons/f/f8/Scientist_examines_an_ice_core.jpg',
  'Summer expedition focused on geological mapping, microbial biodiversity and atmospheric chemistry around the Larsemann Hills and Schirmacher Oasis.',
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
  '[{"title": "43rd ISEA Annual Report (Demo)", "year": 2024, "type": "PDF"}]'::jsonb,
  '[{"title": "Broknes Mapping", "description": "Updated geological maps of the Broknes Peninsula."}]'::jsonb,
  'Completed'
),
(
  'arctic-2024',
  'Indian Arctic Expedition — Svalbard & Ny-Ålesund',
  'Arctic 2024',
  'Arctic',
  2024,
  'Summer',
  NULL,
  'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1600&q=80',
  'A summer campaign in the Svalbard archipelago supporting atmospheric, glaciological and fjord observatories operated under the Himadri research framework.',
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
  '[{"title": "Indian Arctic Campaign Report (Demo)", "year": 2024, "type": "PDF"}]'::jsonb,
  '[{"title": "Kongsfjorden Hydrography", "description": "Seasonal CTD profiles of the fjord system."}]'::jsonb,
  'Completed'
),
(
  'so-cruise-2023',
  'Southern Ocean Hydrographic Cruise 2023',
  'SO Cruise 2023',
  'Southern Ocean',
  2023,
  'Summer',
  'ORV Sagar Nidhi',
  'NCPOR · Ministry of Earth Sciences',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'A meridional cruise covering the Indian Ocean sector of the Southern Ocean, contributing to global hydrographic and biogeochemical reference datasets.',
  '[
    {"date": "Jan 2023", "event": "Mobilisation in Port Louis"},
    {"date": "Feb 2023", "event": "CTD and underway sampling"},
    {"date": "Mar 2023", "event": "Return and data archival"}
  ]'::jsonb,
  '[{"name": "Dr. P. Vidya", "role": "Chief Scientist", "affiliation": "NCPOR"}]'::jsonb,
  ARRAY['Oceanography', 'Climate'],
  ARRAY['Meridional overturning circulation tracers', 'CO₂ flux and carbonate chemistry', 'Microbial community structure'],
  '[{"title": "SO Cruise 2023 Report (Demo)", "year": 2023, "type": "PDF"}]'::jsonb,
  '[{"title": "CO₂ Flux", "description": "Underway pCO₂ along the meridional transect."}]'::jsonb,
  'Completed'
),
(
  'himalaya-glacier-2022',
  'Himalayan Glacier Mass Balance Programme 2022',
  'Himalaya 2022',
  'Himalaya',
  2022,
  'Summer',
  NULL,
  'NCPOR collaborative programme',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/Kongsfjorden_Colletth%C3%B6gda_IMG_6424.JPG',
  'Long-term monitoring of benchmark glaciers in the western Himalaya, complementing polar cryospheric studies.',
  '[
    {"date": "Apr 2022", "event": "Field team deployment"},
    {"date": "May–Sep 2022", "event": "Mass-balance and AWS observations"},
    {"date": "Oct 2022", "event": "Data archival"}
  ]'::jsonb,
  '[{"name": "Dr. A. Kulkarni", "role": "Lead Investigator", "affiliation": "IISc"}]'::jsonb,
  ARRAY['Glaciology', 'Climate'],
  ARRAY['Seasonal mass balance', 'AWS meteorology'],
  '[{"title": "Chhota Shigri 2022 Report (Demo)", "year": 2022, "type": "PDF"}]'::jsonb,
  '[{"title": "Chhota Shigri", "description": "Long-term benchmark glacier mass-balance site."}]'::jsonb,
  'Completed'
),
(
  'isro-42',
  '42nd Indian Scientific Expedition to Antarctica',
  '42nd ISEA',
  'Antarctic',
  2023,
  'Summer',
  'MV Vasiliy Golovnin',
  'NCPOR · Ministry of Earth Sciences',
  'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
  'Pre-Antarctic Treaty Consultative Meeting support expedition — focused on long-term observatories and summer field campaigns.',
  '[
    {"date": "Dec 2022", "event": "Departure from Cape Town"},
    {"date": "Feb 2023", "event": "Field campaigns in Dronning Maud Land"},
    {"date": "Mar 2023", "event": "Return"}
  ]'::jsonb,
  '[{"name": "Dr. S. Roy", "role": "Chief Scientist", "affiliation": "NCPOR"}]'::jsonb,
  ARRAY['Geology', 'Glaciology', 'Atmospheric Sciences'],
  ARRAY['Dronning Maud Land geological mapping', 'Ice core recovery'],
  '[{"title": "42nd ISEA Report (Demo)", "year": 2023, "type": "PDF"}]'::jsonb,
  '[{"title": "DML Field Camp", "description": "Summer geological camp in Dronning Maud Land."}]'::jsonb,
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
  timeline = EXCLUDED.timeline,
  scientists = EXCLUDED.scientists,
  research_areas = EXCLUDED.research_areas,
  objectives = EXCLUDED.objectives,
  reports = EXCLUDED.reports,
  highlights = EXCLUDED.highlights,
  status = EXCLUDED.status;

-- ------------------------------------------------------------------------------
-- 2. SEED DATASETS (10 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.datasets (
  id, title, description, area, region, year, format, size, coverage,
  related_expedition, related_publication, preview_rows
)
VALUES
(
  'ds-atm-001',
  'Maitri Atmospheric Black Carbon (Demo)',
  'Continuous measurements of equivalent black carbon mass concentration at the Maitri station, with supporting meteorological variables. (Demo dataset)',
  'Atmospheric Sciences',
  'Antarctic · Maitri',
  2024,
  'CSV / NetCDF',
  '12.4 MB',
  '2020–2024, hourly',
  'isro-44',
  'pub-2024-03',
  '[
    {"name": "Timestamp", "value": "2024-02-12T03:00:00Z"},
    {"name": "EBC (ng/m³)", "value": "32.4"},
    {"name": "Wind Speed (m/s)", "value": "4.1"},
    {"name": "Temperature (°C)", "value": "-11.2"},
    {"name": "Pressure (hPa)", "value": "982.3"}
  ]'::jsonb
),
(
  'ds-oce-002',
  'Southern Ocean CTD Transect (Demo)',
  'Downcast CTD profiles along the meridional transect from Cape Town to Antarctica, with derived salinity, temperature and oxygen. (Demo dataset)',
  'Oceanography',
  'Southern Ocean',
  2024,
  'NetCDF',
  '84.1 MB',
  '2024 cruise · 64 stations',
  'isro-44',
  'pub-2025-01',
  '[
    {"name": "Station", "value": "SO-12"},
    {"name": "Latitude", "value": "-52.40°S"},
    {"name": "Longitude", "value": "14.10°E"},
    {"name": "Depth (m)", "value": "4200"},
    {"name": "Bottom Temp (°C)", "value": "0.42"}
  ]'::jsonb
),
(
  'ds-gla-003',
  'Larsemann Hills Shallow Firn Cores (Demo)',
  'Stable water isotope and major ion profiles from shallow firn cores recovered during the 44th ISEA. (Demo dataset)',
  'Glaciology',
  'Antarctic · Larsemann Hills',
  2025,
  'CSV',
  '3.2 MB',
  '3 cores · 0–12 m',
  'isro-44',
  NULL,
  '[
    {"name": "Core ID", "value": "LH-03"},
    {"name": "Depth (m)", "value": "4.2"},
    {"name": "δ¹⁸O (‰)", "value": "-28.1"},
    {"name": "δD (‰)", "value": "-216.4"}
  ]'::jsonb
),
(
  'ds-bio-004',
  'Antarctic Soil Microbial Diversity (Demo)',
  '16S rRNA amplicon sequencing of soil samples from the Larsemann Hills. (Demo dataset)',
  'Biodiversity',
  'Antarctic',
  2024,
  'FASTQ / CSV',
  '212 MB',
  '48 samples',
  'isro-43',
  NULL,
  '[
    {"name": "Sample", "value": "LH-S-12"},
    {"name": "Latitude", "value": "-69.40°S"},
    {"name": "Reads", "value": "84,210"}
  ]'::jsonb
),
(
  'ds-geo-005',
  'Broknes Peninsula Geological Map (Demo)',
  'Vector geological map of the Broknes Peninsula derived from field campaigns. (Demo dataset)',
  'Geology',
  'Antarctic · Broknes',
  2024,
  'GeoJSON',
  '8.7 MB',
  '1:25,000',
  'isro-43',
  NULL,
  '[{"name": "Feature", "value": "Orthogneiss unit"}]'::jsonb
),
(
  'ds-gla-006',
  'Austre Lovén Glacier Mass Balance (Demo)',
  'Seasonal surface mass-balance measurements on the Austre Lovén glacier, Svalbard. (Demo dataset)',
  'Glaciology',
  'Arctic · Svalbard',
  2024,
  'CSV',
  '1.8 MB',
  '2015–2024, monthly',
  'arctic-2024',
  NULL,
  '[
    {"name": "Stake", "value": "AL-04"},
    {"name": "Net mass (mm w.e.)", "value": "-628"}
  ]'::jsonb
),
(
  'ds-oce-007',
  'Kongsfjorden Hydrography (Demo)',
  'CTD profiles of the Kongsfjorden fjord system. (Demo dataset)',
  'Oceanography',
  'Arctic · Svalbard',
  2024,
  'NetCDF',
  '22.0 MB',
  '12 stations',
  'arctic-2024',
  NULL,
  '[{"name": "Station", "value": "KF-06"}]'::jsonb
),
(
  'ds-oce-008',
  'Southern Ocean CO₂ Underway (Demo)',
  'Underway pCO₂ and sea surface temperature along the Southern Ocean transect. (Demo dataset)',
  'Climate',
  'Southern Ocean',
  2023,
  'CSV',
  '5.1 MB',
  '2023 cruise',
  'so-cruise-2023',
  NULL,
  '[{"name": "pCO₂ (µatm)", "value": "398.4"}]'::jsonb
),
(
  'ds-gla-009',
  'Chhota Shigri Annual Mass Balance (Demo)',
  'Long-term annual and seasonal mass-balance of Chhota Shigri glacier. (Demo dataset)',
  'Glaciology',
  'Himalaya',
  2022,
  'CSV',
  '0.6 MB',
  '1987–2022',
  'himalaya-glacier-2022',
  NULL,
  '[{"name": "Net mass (m w.e.)", "value": "-0.42"}]'::jsonb
),
(
  'ds-gla-010',
  'Dronning Maud Land Snow Pit (Demo)',
  'Snow pit chemistry and stable isotope profiles from DML. (Demo dataset)',
  'Glaciology',
  'Antarctic · DML',
  2023,
  'CSV',
  '1.1 MB',
  '5 pits',
  'isro-42',
  NULL,
  '[{"name": "Pit ID", "value": "DML-P2"}]'::jsonb
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
-- 3. SEED PUBLICATIONS (8 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.publications (
  id, title, authors, year, journal, doi, abstract, area, expedition, dataset, type
)
VALUES
(
  'pub-2024-03',
  'Equivalent black carbon over the Southern Ocean: Seasonal observations from Maitri',
  ARRAY['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.'],
  2024,
  'Polar Science (Demo)',
  '10.0000/polaris.2024.0003',
  'We present a seasonal analysis of equivalent black carbon mass concentration observed at the Maitri station, supported by back-trajectory and fire emission inventories. The data demonstrate clean marine conditions and episodic long-range transport from southern Africa and South America. (Demo abstract)',
  'Atmospheric Sciences',
  'isro-44',
  'ds-atm-001',
  'Journal'
),
(
  'pub-2025-01',
  'Meridional variability of the Southern Ocean overturning circulation (2024 transect)',
  ARRAY['Verma, P.', 'Vidya, P.'],
  2025,
  'Journal of Southern Ocean Studies (Demo)',
  '10.0000/polaris.2025.0001',
  'CTD and tracer observations along a 2024 meridional transect reveal significant interannual variability in the upper overturning cell, with implications for heat and carbon uptake. (Demo abstract)',
  'Oceanography',
  'isro-44',
  'ds-oce-002',
  'Journal'
),
(
  'pub-2024-01',
  'Cultivable microbial diversity in Larsemann Hills soils',
  ARRAY['Singh, K.', 'Sharma, M.'],
  2024,
  'Antarctic Microbiology Letters (Demo)',
  '10.0000/polaris.2024.0001',
  'A culture-dependent survey of Larsemann Hills soils reveals psychrotolerant isolates with biotechnological potential, including cold-active enzymes and antifreeze proteins. (Demo abstract)',
  'Biodiversity',
  'isro-43',
  'ds-bio-004',
  'Journal'
),
(
  'pub-2024-02',
  'Updated geological map of the Broknes Peninsula: Implications for Rodinia reconstructions',
  ARRAY['Sharma, M.', 'Roy, S.'],
  2024,
  'Precambrian Research (Demo)',
  '10.0000/polaris.2024.0002',
  'A revised 1:25,000 geological map of the Broknes Peninsula integrates structural, petrological and geochronological data, supporting regional correlations with Indo-Antarctic cratonic blocks. (Demo abstract)',
  'Geology',
  'isro-43',
  'ds-geo-005',
  'Journal'
),
(
  'pub-2024-05',
  'Snow chemistry and stable water isotopes on Austre Lovén glacier',
  ARRAY['Krishnan, N.', 'Kulkarni, A.'],
  2024,
  'Arctic, Antarctic and Alpine Research (Demo)',
  '10.0000/polaris.2024.0005',
  'A multi-year record of snow chemistry and isotope ratios from a Svalbard benchmark glacier shows strong seasonality and episodic Arctic moisture transport. (Demo abstract)',
  'Glaciology',
  'arctic-2024',
  'ds-gla-006',
  'Journal'
),
(
  'pub-2023-02',
  'Underway pCO₂ along the 2023 Southern Ocean meridional transect',
  ARRAY['Vidya, P.'],
  2023,
  'Geophysical Research Letters (Demo)',
  '10.0000/polaris.2023.0002',
  'Underway pCO₂ observations along the 2023 meridional transect document the seasonal sink in the Subantarctic Zone and localised outgassing south of the Polar Front. (Demo abstract)',
  'Climate',
  'so-cruise-2023',
  'ds-oce-008',
  'Journal'
),
(
  'pub-2023-01',
  'Snow-pit chemistry across Dronning Maud Land',
  ARRAY['Roy, S.'],
  2023,
  'Polar Science (Demo)',
  '10.0000/polaris.2023.0001',
  'A network of shallow snow pits in Dronning Maud Land captures the spatial variability of major ions and stable water isotopes, supporting the design of deep ice-coring programmes. (Demo abstract)',
  'Glaciology',
  'isro-42',
  'ds-gla-010',
  'Journal'
),
(
  'pub-2022-01',
  'Long-term mass balance of Chhota Shigri glacier, western Himalaya',
  ARRAY['Kulkarni, A.'],
  2022,
  'Journal of Glaciology (Demo)',
  '10.0000/polaris.2022.0001',
  'A 35-year mass-balance record of Chhota Shigri glacier reveals strong interannual variability tied to regional climate modes, with an overall negative trend. (Demo abstract)',
  'Glaciology',
  'himalaya-glacier-2022',
  'ds-gla-009',
  'Journal'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  authors = EXCLUDED.authors,
  year = EXCLUDED.year,
  journal = EXCLUDED.journal,
  doi = EXCLUDED.doi,
  abstract = EXCLUDED.abstract,
  area = EXCLUDED.area,
  expedition = EXCLUDED.expedition,
  dataset = EXCLUDED.dataset,
  type = EXCLUDED.type;

-- ------------------------------------------------------------------------------
-- 4. SEED KNOWLEDGE (12 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.knowledge (
  id, type, title, excerpt, body, tags, category, year, author,
  related_expedition, related_dataset, related_publication
)
VALUES
(
  'kb-1',
  'Field Story',
  'First Light at Bharati',
  'A field assistant describes a clear morning at the Larsemann Hills, and what the team gets done before the katabatic winds pick up.',
  'By 06:30 the Sun is already lifting above the Broknes ridge. The wind is calm, the ice reflects a low gold, and the team splits into pairs: glaciology to the firn pits, biology to the soil transects. By noon the katabatic will set in, and we will all be back at the heated containers, processing samples. The rhythm of an Antarctic day is unusual at first, then utterly ordinary. You begin to measure your work in shifts and your meals in calories. The cold, which felt so foreign on day one, becomes a constant — an environment, almost a colleague, that you negotiate with each day.',
  ARRAY['Bharati', 'Larsemann Hills', 'Field Diary'],
  'Field Stories',
  2024,
  'Field Team · 43rd ISEA (Demo)',
  'isro-43',
  NULL,
  NULL
),
(
  'kb-2',
  'Report',
  '44th ISEA Preliminary Report',
  'A summary of operations, science campaigns and station logistics for the 44th Indian Scientific Expedition to Antarctica.',
  'The 44th ISEA supported year-round atmospheric, oceanographic and glaciological programmes at Bharati and Maitri. Major deliverables included the recovery of shallow firn cores, summer aerosol and BC measurements, and the continuation of long-term AWS records. Logistics involved the MV Vasiliy Golovnin, intra-continental traverses and helicopter support from DROMLAN.',
  ARRAY['ISEA', 'Annual Report', 'Antarctic'],
  'Reports',
  2025,
  'NCPOR (Demo)',
  'isro-44',
  NULL,
  NULL
),
(
  'kb-3',
  'Article',
  'Why the Poles Matter to India',
  'A short essay on why the Indian polar programme is part of the country’s climate, ocean and strategic interests.',
  'India sits in the tropics, but its climate, monsoon and oceans are tightly coupled to the polar regions. A warmer Antarctic and a melting Greenland alter the thermohaline circulation and the sea-level budget. The Himalayan cryosphere — itself a polar analogue — supplies the perennial rivers of the Indo-Gangetic plain. Polar science is therefore not a luxury: it is a foundational investment in India’s environmental and economic future.',
  ARRAY['Climate', 'Policy', 'India'],
  'Articles',
  2024,
  'POLARIS Editorial (Demo)',
  NULL,
  NULL,
  NULL
),
(
  'kb-4',
  'News',
  'Polar Outreach Workshop Concludes in Goa',
  'A summary of the annual polar outreach workshop, which brings together scientists, teachers and students.',
  'The annual Polar Outreach Workshop brought together researchers, science educators and students for a week of lectures, lab tours and field demonstrations. Highlights included a sea-ice tank experiment, a polar climate role-play, and a poster session featuring class projects from schools across India.',
  ARRAY['Outreach', 'Education'],
  'News',
  2024,
  'POLARIS (Demo)',
  NULL,
  NULL,
  NULL
),
(
  'kb-5',
  'Educational',
  'How to Read a CTD Profile',
  'A step-by-step guide to interpreting conductivity, temperature and depth measurements from polar oceans.',
  'A CTD cast gives you three primary variables — temperature, salinity (from conductivity) and pressure (depth) — as the instrument is lowered through the water column. From these you derive density, buoyancy frequency and a number of derived quantities. Reading a profile is partly art: look for the mixed layer, the thermocline, intermediate water masses and the deep western boundary current signal.',
  ARRAY['Oceanography', 'Methods', 'Tutorial'],
  'Educational',
  2024,
  'POLARIS Editorial (Demo)',
  NULL,
  NULL,
  NULL
),
(
  'kb-6',
  'Publication',
  'Equivalent black carbon over the Southern Ocean',
  'A journal article on seasonal black carbon observations at Maitri.',
  'We present a seasonal analysis of equivalent black carbon mass concentration at Maitri, supported by back-trajectory analysis. The dataset is openly available through POLARIS.',
  ARRAY['Atmospheric Sciences', 'Black Carbon'],
  'Publications',
  2024,
  'Tiwari et al. (Demo)',
  'isro-44',
  'ds-atm-001',
  'pub-2024-03'
),
(
  'kb-7',
  'Dataset',
  'Southern Ocean CTD Transect (Demo)',
  'A 64-station CTD transect along the Southern Ocean, supporting overturning circulation studies.',
  'Downcast CTD profiles with derived salinity, temperature and oxygen along a meridional transect. Quality-controlled, distributed as NetCDF.',
  ARRAY['Oceanography', 'CTD'],
  'Datasets',
  2024,
  'NCPOR (Demo)',
  'isro-44',
  'ds-oce-002',
  'pub-2025-01'
),
(
  'kb-8',
  'Field Story',
  'Svalbard in Polar Day',
  'A summer field diary from Kongsfjorden — sampling in 24-hour daylight.',
  'In June, the Sun never sets. Workdays are organised by tides and weather, not by the clock. Sampling a glacier outflow at midnight is a strange, almost cinematic experience: the air is warm, the water is cold, the sky is soft pink. Everything is geology and water and patience.',
  ARRAY['Arctic', 'Svalbard', 'Field Diary'],
  'Field Stories',
  2024,
  'Field Team · Arctic 2024 (Demo)',
  'arctic-2024',
  NULL,
  NULL
),
(
  'kb-9',
  'Report',
  'Maitri Annual AWS Summary',
  'A station-level annual summary of meteorological observations.',
  'Automatic weather station (AWS) observations at Maitri for the previous calendar year, including temperature, wind, pressure, radiation and snow depth. Quality flags follow WMO guidelines.',
  ARRAY['AWS', 'Maitri', 'Meteorology'],
  'Reports',
  2024,
  'NCPOR (Demo)',
  'isro-44',
  NULL,
  NULL
),
(
  'kb-10',
  'Article',
  'A Beginner’s Guide to Sea Ice',
  'How sea ice forms, why it matters, and what its decline means.',
  'Sea ice is one of the most visible indicators of a changing climate. It forms when the upper ocean cools below its freezing point; brine is rejected, leaving a porous solid that thickens through the winter. In summer, melt ponds dot its surface. Its high albedo — the fraction of sunlight it reflects — helps regulate Earth’s energy balance. When sea ice shrinks, the darker ocean absorbs more heat, accelerating warming: a feedback loop at the heart of polar climate.',
  ARRAY['Sea Ice', 'Climate', 'Beginner'],
  'Articles',
  2024,
  'POLARIS Editorial (Demo)',
  NULL,
  NULL,
  NULL
),
(
  'kb-11',
  'Educational',
  'Glossary of Polar Terms',
  'A living glossary of polar science vocabulary for students and educators.',
  'From ablation to zooplankton — a curated glossary used across the POLARIS education modules.',
  ARRAY['Glossary', 'Reference'],
  'Educational',
  2024,
  'POLARIS Editorial (Demo)',
  NULL,
  NULL,
  NULL
),
(
  'kb-12',
  'News',
  'International Polar Day Celebrated in Schools',
  'A roundup of school events marking International Polar Day.',
  'Schools across India hosted quizzes, poster-making sessions and guest lectures to mark International Polar Day, coordinated through POLARIS partner institutions.',
  ARRAY['Education', 'Outreach'],
  'News',
  2024,
  'POLARIS (Demo)',
  NULL,
  NULL,
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  tags = EXCLUDED.tags,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  author = EXCLUDED.author,
  related_expedition = EXCLUDED.related_expedition,
  related_dataset = EXCLUDED.related_dataset,
  related_publication = EXCLUDED.related_publication;
