-- ==============================================================================
-- POLARIS - India's Polar Knowledge & Outreach Platform
-- Smart India Hackathon 2026 | Problem ID: 26063
-- Ministry of Earth Sciences (MoES) | NCPOR
-- Repeatable Seed SQL for 4 Core Tables
-- ==============================================================================

-- Ensure download_url column exists on public.datasets if not already present
ALTER TABLE public.datasets ADD COLUMN IF NOT EXISTS download_url TEXT;

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
  'NCPOR · Ministry of Earth Sciences, Govt. of India',
  'https://upload.wikimedia.org/wikipedia/commons/5/5c/Polarstern_MOSAiC.jpg',
  'A flagship annual polar expedition conducting year-round atmospheric, oceanographic and cryospheric observations across the Southern Ocean, Maitri and Bharati bases. Deployed 72 scientists and logistics specialists, mobilizing 1,240 MT of polar fuel and provisions under the Madrid Environmental Protocol.',
  '[
    {"date": "Nov 2024", "event": "Pre-expedition mobilization and cargo staging in Cape Town harbor"},
    {"date": "Jan 2025", "event": "Departure of MV Vasiliy Golovnin from Goa across the Southern Ocean"},
    {"date": "Feb 2025", "event": "Resupply, fuel bunkering, and 24-member wintering crew rotation at Bharati and Maitri"},
    {"date": "Mar 2025", "event": "Sea-ice radar surveys, firn coring, and atmospheric aerosol campaign"},
    {"date": "Apr 2025", "event": "Return voyage to Cape Town with ice core cold-chain logistics and sample archival"}
  ]'::jsonb,
  '[
    {"name": "Dr. A. Bhattacharya", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. R. Mohan", "role": "Glaciology Lead", "affiliation": "NCPOR"},
    {"name": "Dr. S. Tiwari", "role": "Atmospheric Chemistry", "affiliation": "IITM"},
    {"name": "Dr. P. Verma", "role": "Physical Oceanography", "affiliation": "NIO"}
  ]'::jsonb,
  ARRAY['Atmospheric Sciences', 'Oceanography', 'Glaciology', 'Space Weather'],
  ARRAY[
    'Atmospheric black carbon and optical aerosol profiling over the Southern Ocean',
    'Meridional CTD depth casts down to 4,500m along the 70°E transect',
    'Shallow firn core drilling in the Larsemann Hills blue ice zone',
    'Continuous multi-parameter meteorological observations at Maitri Observatory'
  ],
  '[
    {"title": "44th ISEA Annual Scientific Expedition Report", "year": 2025, "type": "PDF", "url": "/reports/44th_ISEA_Annual_Expedition_Report.pdf"},
    {"title": "Maitri Meteorological Observatory AWS Annual Summary", "year": 2024, "type": "PDF", "url": "/reports/Maitri_AWS_Meteorological_Summary.pdf"}
  ]'::jsonb,
  '[
    {"title": "Deep Ocean Meridional CTD Profiling", "description": "Continuous hydrographic casts characterizing Antarctic Bottom Water formation along the 70°E meridian."},
    {"title": "Larsemann Hills Firn Paleoclimate Cores", "description": "Recovery of continuous 12.4m firn cores recording sub-decadal stable water isotope and aerosol deposition proxies."}
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
  'NCPOR · Ministry of Earth Sciences, Govt. of India',
  'https://upload.wikimedia.org/wikipedia/commons/f/f8/Scientist_examines_an_ice_core.jpg',
  'Summer campaign focused on bedrock structural geology, microbial genomics of cold-adapted bacteria, and high-frequency geomagnetic pulsation monitoring across the Larsemann Hills and Schirmacher Oasis.',
  '[
    {"date": "Dec 2023", "event": "Logistics consolidation and heavy-lift helicopter commissioning at Cape Town"},
    {"date": "Jan 2024", "event": "Expedition departure aboard MV Vasiliy Golovnin into the Roaring Forties"},
    {"date": "Feb 2024", "event": "Establishment of remote geology field camps across the Broknes Peninsula"},
    {"date": "Mar 2024", "event": "Soil core sampling, lake water limnology surveys, and return transit"}
  ]'::jsonb,
  '[
    {"name": "Dr. M. Sharma", "role": "Chief Scientist & Geologist", "affiliation": "NCPOR"},
    {"name": "Dr. K. Singh", "role": "Microbiology Lead", "affiliation": "NCPOR / CSIR-CCMB"},
    {"name": "Dr. R. Mishra", "role": "Geomagnetism Specialist", "affiliation": "IIG"}
  ]'::jsonb,
  ARRAY['Geology', 'Biology', 'Atmospheric Sciences', 'Space Weather'],
  ARRAY[
    'Litho-structural geomapping of the Broknes and Stornes Peninsulas at 1:25,000 scale',
    'Cultivable diversity and cold-active enzyme isolation from Antarctic soil microbiota',
    'High-cadence fluxgate magnetometer recordings of geomagnetic pulsations at Bharati'
  ],
  '[
    {"title": "43rd ISEA Annual Scientific Report: Larsemann Hills Campaigns", "year": 2024, "type": "PDF", "url": "/reports/43rd_ISEA_Annual_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "Litho-Structural Mapping of Broknes", "description": "High-precision tectonic reconstruction linking Eastern Ghats mobile belts with East Antarctic cratons."},
    {"title": "Psychrophilic Microbiome Discoveries", "description": "Isolation of novel bacterial strains exhibiting extracellular polysaccharide synthesis at sub-zero temperatures."}
  ]'::jsonb,
  'Completed'
),
(
  'arctic-2024',
  'Indian Arctic Expedition — Svalbard & Ny-Ålesund',
  'Arctic 2024',
  'Arctic',
  2024,
  'Summer',
  'Teisten (Zodiac Polar Tenders)',
  'NCPOR · Ministry of Earth Sciences, Govt. of India',
  'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1600&q=80',
  'Summer research campaign based out of India permanent Himadri research base in Ny-Alesund, Svalbard, deploying hydrographic gliders, atmospheric boundary layer profilers, and sub-surface mooring telemetry in Kongsfjorden.',
  '[
    {"date": "May 2024", "event": "Scientific equipment calibration and pre-cruise staging at NCPOR Goa"},
    {"date": "Jun 2024", "event": "Deployment of multidisciplinary scientific teams to Himadri Station, Ny-Alesund"},
    {"date": "Jul 2024", "event": "Kongsfjorden hydrographic surveys, glacier mass balance, and aerosol lidar profiling"},
    {"date": "Aug 2024", "event": "Recovery and servicing of the IndARC multi-sensor underwater mooring"}
  ]'::jsonb,
  '[
    {"name": "Dr. N. Krishnan", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. A. Kulkarni", "role": "Cryospheric Lead", "affiliation": "IISc"},
    {"name": "Dr. S. Nair", "role": "Marine Biogeochemist", "affiliation": "NIO"}
  ]'::jsonb,
  ARRAY['Atmospheric Sciences', 'Glaciology', 'Oceanography', 'Marine Ecology'],
  ARRAY[
    'Quantifying surface radiation budgets and atmospheric boundary layer stability at 79°N',
    'Glaciological mass balance and ice velocity measurements on the Austre Lovenbreen Glacier',
    'Hydrographic CTD casts tracking the influx of warm Atlantic Water into Kongsfjorden',
    'Sub-surface biogeochemical monitoring with the IndARC robotic mooring array'
  ],
  '[
    {"title": "Indian Arctic Scientific Campaign Report: Svalbard & Ny-Alesund", "year": 2024, "type": "PDF", "url": "/reports/Indian_Arctic_IndARC_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "IndARC Mooring Servicing", "description": "Annual data retrieval and sensor refurbishment of India deep-water Kongsfjorden mooring at 192m depth."},
    {"title": "Austre Lovenbreen Mass Balance", "description": "Multi-stake ablation measurements confirming sustained negative mass balance linked to summer temperature anomalies."}
  ]'::jsonb,
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
  'NCPOR · Ministry of Earth Sciences, Govt. of India',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'A flagship meridional cruise covering the Indian sector of the Southern Ocean aboard ORV Sagar Nidhi, measuring ocean carbonate chemistry, eddy dynamics, and nutrient cycling between Mauritius and Prydz Bay.',
  '[
    {"date": "Jan 2023", "event": "Mobilisation and instrument staging in Port Louis, Mauritius"},
    {"date": "Feb 2023", "event": "Meridional transect from 40°S to 68°S with 64 full-depth CTD hydrocasts"},
    {"date": "Mar 2023", "event": "Recovery of autonomous ocean gliders and return transit to Goa"}
  ]'::jsonb,
  '[
    {"name": "Dr. P. Vidya", "role": "Chief Scientist & Oceanographer", "affiliation": "NCPOR"},
    {"name": "Dr. T. Sudhakar", "role": "Ocean Acoustics Lead", "affiliation": "NIOT"}
  ]'::jsonb,
  ARRAY['Oceanography', 'Climate', 'Marine Biogeochemistry'],
  ARRAY[
    'Characterizing the meridional overturning circulation and Antarctic Intermediate Water pathways',
    'Underway surface ocean pCO2 measurements and air-sea carbon flux quantification',
    'Nutrient limitation and phytoplankton size-fractionated chlorophyll biomass profiling'
  ],
  '[
    {"title": "Southern Ocean Hydrographic & Biogeochemical Cruise Report", "year": 2023, "type": "PDF", "url": "/reports/Southern_Ocean_Cruise_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "High-Latitude Carbon Sink", "description": "Underway pCO2 measurements revealing intense seasonal carbon draw-down in the Subantarctic Zone."},
    {"title": "Frontal Jet Mapping", "description": "High-resolution LADCP current velocity sections delineating the core of the Antarctic Circumpolar Current."}
  ]'::jsonb,
  'Completed'
),
(
  'himalaya-glacier-2022',
  'Himalayan Glacier Mass Balance Programme 2022',
  'Himalaya 2022',
  'Himalaya',
  2022,
  'Summer',
  'Himansh High-Altitude Field Base',
  'NCPOR · Ministry of Earth Sciences (HiCOM Programme)',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/Kongsfjorden_Colletth%C3%B6gda_IMG_6424.JPG',
  'Long-term cryospheric monitoring of benchmark glaciers in the Western Himalaya, evaluating glaciological mass balance, debris cover insulation, and proglacial hydrological discharge in the Chandra Basin.',
  '[
    {"date": "Apr 2022", "event": "Field crew deployment to Himansh Station in the Chandra-Bhaga basin"},
    {"date": "May–Sep 2022", "event": "Seasonal stake ablation measurements, GPR ice thickness soundings, and AWS telemetry"},
    {"date": "Oct 2022", "event": "Post-monsoon net mass balance synthesis and sample preservation"}
  ]'::jsonb,
  '[
    {"name": "Dr. A. Kulkarni", "role": "Lead Investigator", "affiliation": "IISc / NCPOR"},
    {"name": "Dr. P. Sharma", "role": "Glaciologist", "affiliation": "NCPOR"}
  ]'::jsonb,
  ARRAY['Glaciology', 'Climate', 'Hydrology'],
  ARRAY[
    'Direct glaciological mass balance monitoring across 38 ablation stakes on Chhota Shigri Glacier',
    'High-resolution Ground Penetrating Radar (GPR) surveys mapping subglacial bedrock topography',
    'Hydro-meteorological modeling of glacier runoff in the Chandra River basin'
  ],
  '[
    {"title": "Chhota Shigri Glacier Cryospheric Monitoring & Mass Balance Report", "year": 2022, "type": "PDF", "url": "/reports/Chhota_Shigri_Glacier_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "Long-Term Mass Balance Record", "description": "Continuous 21-year benchmark data establishing cumulative ice mass loss trends in the Lahaul-Spiti region."},
    {"title": "Ice Volume Quantification", "description": "GPR profile analysis determining total ice thickness exceeding 250m in the glacier central accumulation basin."}
  ]'::jsonb,
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
  'NCPOR · Ministry of Earth Sciences, Govt. of India',
  'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
  'Multi-station resupply and deep-continental traverse expedition across Dronning Maud Land, maintaining international environmental compliance and year-round space weather observatories.',
  '[
    {"date": "Dec 2022", "event": "Heavy cargo departure from Cape Town aboard MV Vasiliy Golovnin"},
    {"date": "Jan 2023", "event": "Ice-edge berthing and cargo discharge at India Bay, Maitri"},
    {"date": "Feb 2023", "event": "Over-snow traverse to Dronning Maud Land blue ice plateau"},
    {"date": "Mar 2023", "event": " Bharati station crew change and voyage completion"}
  ]'::jsonb,
  '[
    {"name": "Dr. S. Roy", "role": "Chief Scientist", "affiliation": "NCPOR"},
    {"name": "Dr. M. P. Singh", "role": "Geodesy Specialist", "affiliation": "Survey of India"}
  ]'::jsonb,
  ARRAY['Geology', 'Glaciology', 'Atmospheric Sciences', 'Geodesy'],
  ARRAY[
    'Dronning Maud Land inland snow-pit chemical and isotopic profiling',
    'Continuous GNSS geodetic deformation monitoring across Schirmacher Oasis nunataks',
    'Aerosol optical depth measurements using handheld Microtops sunphotometers'
  ],
  '[
    {"title": "42nd ISEA Annual Scientific Report: Dronning Maud Land Traverse", "year": 2023, "type": "PDF", "url": "/reports/42nd_ISEA_Annual_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "DML Inland Traverse", "description": "Safe execution of a 200km heavy-machinery piston-bully traverse across continental crevassed zones."},
    {"title": "Geodetic Plate Motion Tracking", "description": "High-precision GNSS baselines determining crustal rebound rates of the East Antarctic shield."}
  ]'::jsonb,
  'Completed'
),
(
  'isea-01',
  'First Indian Scientific Expedition to Antarctica',
  '1st ISEA (Operation Gangotri)',
  'Antarctic',
  1981,
  'Summer',
  'MV Polar Circle',
  'Dr. S. Z. Qasim · Dept. of Ocean Development, Govt. of India',
  'https://upload.wikimedia.org/wikipedia/commons/f/fb/Dakshin_Gangotri_station.jpg',
  'The historic inaugural Indian polar expedition codenamed "Operation Gangotri," launched under Prime Minister Indira Gandhi. Sailed from Mormugao, Goa, aboard chartered Norwegian icebreaker MV Polar Circle, successfully hoisting the Indian tricolor on the Antarctic ice shelf at 69°59′S, 11°55′E on 9 January 1982.',
  '[
    {"date": "6 Dec 1981", "event": "Secret departure from Mormugao Port, Goa, aboard MV Polar Circle"},
    {"date": "1 Jan 1982", "event": "First sighting of Antarctic pack ice at 61°S latitude"},
    {"date": "9 Jan 1982", "event": "Landing of Indian team on Princess Astrid Coast ice shelf (00:30 UTC)"},
    {"date": "12 Jan 1982", "event": "Helicopter reconnaissance sorties to Schirmacher Oasis rocky nunataks"},
    {"date": "21 Feb 1982", "event": "Successful completion of field science and return voyage commencement"}
  ]'::jsonb,
  '[
    {"name": "Dr. S. Z. Qasim", "role": "Expedition Leader & Chief Scientist", "affiliation": "Department of Ocean Development"},
    {"name": "Dr. H. N. Siddiquie", "role": "Marine Geology Lead", "affiliation": "National Institute of Oceanography (NIO)"},
    {"name": "Dr. C. P. Vohra", "role": "Glaciology Specialist", "affiliation": "Geological Survey of India (GSI)"}
  ]'::jsonb,
  ARRAY['Meteorology', 'Oceanography', 'Geology', 'Geomagnetism'],
  ARRAY[
    'Establishing India’s sovereign scientific presence in Dronning Maud Land',
    'Marine magnetic soundings and physical oceanography along the 60°E cruise track',
    'Bedrock petrology and moraine sample recovery across the Schirmacher Oasis',
    'Erection of unmanned solar-powered weather recording station Dakshin Gangotri Shelter'
  ],
  '[
    {"title": "First Indian Antarctic Scientific Expedition (Operation Gangotri)", "year": 1982, "type": "PDF", "url": "/reports/1st_ISEA_Operation_Gangotri_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "Historic Polar Footprint", "description": "Hoisted national flag on Antarctica, initiating India’s sovereign polar science programme."},
    {"title": "Antarctic Treaty Accession", "description": "Facilitated India’s accession to Antarctic Treaty in 1983 and Consultative Status."}
  ]'::jsonb,
  'Completed'
),
(
  'isea-03',
  'Third Indian Scientific Expedition to Antarctica: Dakshin Gangotri',
  '3rd ISEA (Dakshin Gangotri)',
  'Antarctic',
  1983,
  'Year-round',
  'MV Finnpolaris',
  'Dr. H. K. Gupta · Dept. of Ocean Development, Govt. of India',
  'https://upload.wikimedia.org/wikipedia/commons/f/fb/Dakshin_Gangotri_station.jpg',
  'A landmark engineering and scientific mission that constructed India’s first permanent, year-round manned station, "Dakshin Gangotri", on the ice shelf in an unprecedented 60 days. Supported India’s inaugural 12-member wintering team surviving the extreme -52°C polar night.',
  '[
    {"date": "Nov 1983", "event": "Expedition departure from Goa with 81 scientists and Army engineers"},
    {"date": "Dec 1983", "event": "Offloading 2,200 MT of pre-fabricated station modules onto ice shelf"},
    {"date": "Jan 1984", "event": "Erection of double-walled living quarters, generator sheds, and radio masts"},
    {"date": "25 Feb 1984", "event": "Official commissioning of Dakshin Gangotri permanent research station"},
    {"date": "Mar 1984", "event": "Inaugural wintering crew hand-over for year-round observations"}
  ]'::jsonb,
  '[
    {"name": "Dr. Harsh K. Gupta", "role": "Expedition Leader", "affiliation": "Centre for Earth Science Studies"},
    {"name": "Lt. Col. S. S. Sharma", "role": "Task Force Commander (Engineers)", "affiliation": "Indian Army Corps of Engineers"},
    {"name": "Dr. P. K. Pasricha", "role": "Radio Physics Lead", "affiliation": "National Physical Laboratory (NPL)"}
  ]'::jsonb,
  ARRAY['Station Engineering', 'Seismology', 'Upper Atmosphere', 'Meteorology'],
  ARRAY[
    'Fast-track construction of permanent station modules resting on snow-raft foundations',
    'Installation of broadband seismographs and tri-axial fluxgate magnetometers',
    'Daily high-altitude radiosonde balloon soundings for Antarctic stratospheric profiling',
    'Physiological adaptations and cold-weather survival studies of wintering personnel'
  ],
  '[
    {"title": "Third Indian Scientific Expedition to Antarctica: Dakshin Gangotri Construction", "year": 1984, "type": "PDF", "url": "/reports/3rd_ISEA_Dakshin_Gangotri_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "Constructed in 60 Days", "description": "Built an entire self-sufficient polar station in record time amid severe blizzards and sub-zero temperatures."},
    {"title": "Inaugural Wintering Team", "description": "First Indian wintering team successfully overwintered in Antarctica, transmitting continuous meteorological data."}
  ]'::jsonb,
  'Completed'
),
(
  'arctic-01',
  'First Indian Scientific Expedition to the Arctic',
  '1st Indian Arctic Expedition',
  'Arctic',
  2007,
  'Summer',
  'Teisten (Zodiac Tenders)',
  'Dr. Rasik Ravindra · NCAOR / Ministry of Earth Sciences',
  'https://upload.wikimedia.org/wikipedia/commons/0/0d/Indian_station_1.JPG',
  'Pioneered India’s high-latitude research in the Northern Hemisphere, deploying teams to Ny-Ålesund, Svalbard (78°55′N). Laid the empirical groundwork that culminated in the commissioning of India’s permanent Arctic base, "Himadri", on 1 July 2008.',
  '[
    {"date": "Aug 2007", "event": "Deployment of five-member maiden Indian scientific team to Ny-Ålesund"},
    {"date": "Aug 2007", "event": "Initiation of glaciological mass-balance benchmarking on Midtre Lovénbreen"},
    {"date": "Sep 2007", "event": "Kongsfjorden water column CTD profiling and microbe isolation"},
    {"date": "1 Jul 2008", "event": "Official inauguration of Himadri station by Union Minister of Science & Technology"}
  ]'::jsonb,
  '[
    {"name": "Dr. Rasik Ravindra", "role": "Expedition Leader & Director", "affiliation": "NCAOR (NCPOR)"},
    {"name": "Dr. M. Sudhakar", "role": "Oceanographer", "affiliation": "Ministry of Earth Sciences"},
    {"name": "Dr. S. Shivaji", "role": "Microbiologist", "affiliation": "CCMB / CSIR"}
  ]'::jsonb,
  ARRAY['Glaciology', 'Atmospheric Physics', 'Marine Microbiology'],
  ARRAY[
    'Establishing long-term benchmark mass balance of Western Svalbard valley glaciers',
    'Sampling atmospheric aerosol optical depth and transboundary Arctic haze',
    'Isolating cold-adapted psychrophilic micro-organisms with novel biocatalytic enzymes'
  ],
  '[
    {"title": "First Indian Scientific Expedition to the Arctic: Svalbard Inaugural Campaign", "year": 2008, "type": "PDF", "url": "/reports/1st_Indian_Arctic_Expedition_Report.pdf"}
  ]'::jsonb,
  '[
    {"title": "Bipolar Research Capability", "description": "Established India as one of the few global nations with permanent year-round bases in both Arctic and Antarctic."},
    {"title": "Commissioning of Himadri", "description": "Permanent sovereign base inaugurated at 78°55′N, opening continuous high-latitude observatories."}
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
  timeline = EXCLUDED.timeline,
  scientists = EXCLUDED.scientists,
  research_areas = EXCLUDED.research_areas,
  objectives = EXCLUDED.objectives,
  reports = EXCLUDED.reports,
  highlights = EXCLUDED.highlights,
  status = EXCLUDED.status;

-- ------------------------------------------------------------------------------
-- 2. SEED DATASETS (8 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.datasets (
  id, title, description, area, region, year, format, size, coverage,
  related_expedition, related_publication, preview_rows, download_url
)
VALUES
(
  'ds-atm-001',
  'Maitri Atmospheric Black Carbon & Surface Meteorology',
  'Continuous hourly measurements of equivalent black carbon (EBC) mass concentration, multi-wavelength absorption coefficients, and co-located micro-meteorological variables recorded by the 7-wavelength Aethalometer array at Maitri Station, Schirmacher Oasis.',
  'Atmospheric Sciences',
  'Antarctic · Maitri',
  2024,
  'CSV / NetCDF',
  '12.4 MB',
  '2020–2024, hourly time-series',
  'isro-44',
  'pub-2024-03',
  '[
    {"name": "Timestamp", "value": "2024-02-01T00:00:00Z"},
    {"name": "Station ID", "value": "MAITRI (70.76°S, 11.73°E)"},
    {"name": "Equivalent Black Carbon (EBC)", "value": "32.4 ng/m³"},
    {"name": "Wind Speed", "value": "4.5 m/s"},
    {"name": "Wind Direction", "value": "88° (East)"},
    {"name": "Air Temperature", "value": "-12.5 °C"},
    {"name": "Atmospheric Pressure", "value": "982.5 hPa"},
    {"name": "Relative Humidity", "value": "54%"},
    {"name": "Total Column Ozone", "value": "284.2 Dobson Units"}
  ]'::jsonb,
  '/data/ds-atm-001-maitri-black-carbon.csv'
),
(
  'ds-oce-002',
  'Southern Ocean CTD Meridional Hydrographic Transect',
  'Full-depth (0–4,500m) Sea-Bird SBE 911plus CTD casts along the 57°30′E meridian transect from South Africa to the Antarctic ice edge, recording potential temperature, practical salinity, dissolved oxygen, and in-situ density across Southern Ocean frontal zones.',
  'Oceanography',
  'Southern Ocean',
  2024,
  'CSV / NetCDF',
  '84.1 MB',
  '2024 Southern Ocean Cruise · 64 Full-depth Stations',
  'so-cruise-2023',
  'pub-2025-01',
  '[
    {"name": "Profile ID", "value": "CTD-2024-SO12-4200m"},
    {"name": "Station ID", "value": "SO-12 (Polar Front Zone)"},
    {"name": "Coordinates", "value": "54.20°S, 57.50°E"},
    {"name": "Maximum Depth", "value": "4,200 meters"},
    {"name": "Potential Temperature", "value": "+0.42 °C"},
    {"name": "Practical Salinity", "value": "34.722 PSU"},
    {"name": "Dissolved Oxygen", "value": "228.4 µmol/kg"},
    {"name": "Potential Density (σ-θ)", "value": "27.84 kg/m³"},
    {"name": "Optical Transmissivity", "value": "88.6%"}
  ]'::jsonb,
  '/data/ds-oce-002-southern-ocean-ctd.csv'
),
(
  'ds-gla-003',
  'Larsemann Hills Shallow Firn Cores Stable Water Isotopes',
  'High-resolution stable water isotope (δ18O and δD) profiles and major ion chemistry (Na+, Cl-, SO4²-) extracted from continuous firn cores recovered from the Larsemann Hills blue ice margin by the 44th ISEA glaciology campaign.',
  'Glaciology',
  'Antarctic · Larsemann Hills',
  2025,
  'CSV',
  '3.2 MB',
  '3 Shallow Cores · 0–12.4 m continuous layers',
  'isro-44',
  'pub-2024-02',
  '[
    {"name": "Core ID", "value": "LH24-C1"},
    {"name": "Sampling Site", "value": "Larsemann Inland Ice Divide"},
    {"name": "Sampling Depth Range", "value": "0.0 – 12.4 meters"},
    {"name": "Firn Density", "value": "0.412 g/cm³"},
    {"name": "Oxygen Isotope (δ¹⁸O)", "value": "-32.4 ‰"},
    {"name": "Deuterium (δD)", "value": "-249.2 ‰"},
    {"name": "Sodium Concentration (Na+)", "value": "48.2 ppb"},
    {"name": "Chloride Concentration (Cl-)", "value": "86.4 ppb"},
    {"name": "Non-sea-salt Sulfate (nss-SO₄²-)", "value": "62.1 ppb"}
  ]'::jsonb,
  '/data/ds-gla-003-larsemann-firn-cores.csv'
),
(
  'ds-met-004',
  'Ny-Ålesund High Arctic Surface Energy Balance & Radiation',
  'Continuous 1-minute solar, longwave, and turbulent heat flux measurements recorded at the Himadri Atmospheric Observatory in Ny-Ålesund, Svalbard, quantifying seasonal surface albedo and cloud radiative forcing at 79°N.',
  'Atmospheric Sciences',
  'Arctic · Svalbard',
  2024,
  'CSV',
  '10.3 MB',
  '2021–2024, 1-minute and hourly aggregations',
  'arctic-2024',
  'pub-2024-05',
  '[
    {"name": "Station Code", "value": "HIMADRI_AWS (78.92°N, 11.93°E)"},
    {"name": "Air Temperature", "value": "+3.5 °C"},
    {"name": "Surface Temperature", "value": "+4.2 °C"},
    {"name": "Incoming Shortwave Radiation", "value": "284.5 W/m²"},
    {"name": "Surface Albedo", "value": "0.22"},
    {"name": "Incoming Longwave Flux", "value": "298.2 W/m²"},
    {"name": "Net Surface Radiation (R_net)", "value": "+68.4 W/m²"},
    {"name": "Sensible Heat Flux (H)", "value": "+24.1 W/m²"},
    {"name": "Latent Heat Flux (LE)", "value": "+31.2 W/m²"}
  ]'::jsonb,
  '/data/ds-met-004-ny-alesund-energy-balance.csv'
),
(
  'ds-cry-005',
  'Chhota Shigri Glacier Benchmark Mass Balance Records',
  'Long-term glaciological mass balance dataset comprising winter accumulation, summer ablation, and net balance measurements from 38 ablation stakes, DGPS kinematic traverses, and GPR ice soundings on the benchmark Chhota Shigri Glacier, Western Himalaya.',
  'Glaciology',
  'Himalaya · Chandra Basin',
  2023,
  'CSV',
  '4.0 MB',
  '2013–2023, multi-stake altitude gradients (4,400–5,600m)',
  'himalaya-glacier-2022',
  'pub-2022-01',
  '[
    {"name": "Observation Period", "value": "2013–2023 Annual Benchmark"},
    {"name": "Stake Elevation Range", "value": "4,420 – 5,560 m a.s.l."},
    {"name": "Equilibrium Line Altitude (ELA)", "value": "5,080 m a.s.l."},
    {"name": "Accumulation Area Ratio (AAR)", "value": "44%"},
    {"name": "Mean Annual Net Mass Balance", "value": "-0.48 m w.e./yr"},
    {"name": "Max Recorded Ice Thickness", "value": "254 meters (GPR soundings)"},
    {"name": "Annual Proglacial Runoff", "value": "28.4 Million m³"}
  ]'::jsonb,
  '/data/ds-cry-005-chhota-shigri-mass-balance.csv'
),
(
  'ds-geo-006',
  'Bharati Station High-Latitude Geomagnetic Pulsation Telemetry',
  'High-sampling-rate (10 Hz) tri-axial fluxgate magnetometer recordings from Bharati Station, Larsemann Hills, documenting ultra-low frequency (ULF) Pc1–Pc5 geomagnetic pulsations, auroral electrojet variations, and space-weather magnetospheric shockwaves.',
  'Geology',
  'Antarctic · Bharati',
  2024,
  'CSV',
  '9.5 MB',
  'Continuous 10-Hz and 1-minute geomagnetic time-series',
  'isro-43',
  NULL,
  '[
    {"name": "Observatory Code", "value": "BHARATI_MAG (69.41°S, 76.19°E)"},
    {"name": "Geomagnetic Component Bx (North)", "value": "18,420.5 nT"},
    {"name": "Geomagnetic Component By (East)", "value": "-4,120.2 nT"},
    {"name": "Geomagnetic Component Bz (Vertical)", "value": "-38,950.4 nT"},
    {"name": "Total Magnetic Field Intensity (F)", "value": "43,265.1 nT"},
    {"name": "Pc5 Pulsation Spectral Power", "value": "14.2 nT²/Hz"},
    {"name": "Local Geomagnetic K-Index", "value": "2 (Quiet/Nominal)"}
  ]'::jsonb,
  '/data/ds-geo-006-bharati-geomagnetic-pulsations.csv'
),
(
  'ds-hws-007',
  'Himansh High-Altitude Observatory Automated Climate Series',
  'Continuous meteorology and cryospheric climate telemetry recorded at India’s remote Himansh High-Altitude Cryospheric Research Station (4,050m a.s.l.) in the Chandra Basin, monitoring alpine boundary layer dynamics and snowpack ablation.',
  'Climate',
  'Himalaya · Spiti Valley',
  2024,
  'CSV',
  '9.7 MB',
  '2020–2024, hourly automatic telemetry',
  'himalaya-glacier-2022',
  NULL,
  '[
    {"name": "Station Elevation", "value": "4,050 meters a.s.l."},
    {"name": "Mean Annual Air Temperature", "value": "-2.8 °C"},
    {"name": "Mean Relative Humidity", "value": "54%"},
    {"name": "Mean Wind Speed", "value": "3.2 m/s (Gusts 18.4 m/s)"},
    {"name": "Acoustic Ultrasonic Snow Depth", "value": "1.42 meters"},
    {"name": "Barometric Atmospheric Pressure", "value": "618.2 hPa"},
    {"name": "Daily Peak Solar Insolation", "value": "1,020 W/m²"}
  ]'::jsonb,
  '/data/ds-hws-007-himansh-aws-climate.csv'
),
(
  'ds-ind-008',
  'IndARC Sub-surface Mooring 192m Fjord Hydrographic Series',
  'Continuous year-round time-series of in-situ water temperature, practical salinity, ocean currents (ADCP), dissolved oxygen, and turbidity recorded by the IndARC robotic underwater mooring anchored at 192m depth in Kongsfjorden, Svalbard.',
  'Oceanography',
  'Arctic · Kongsfjorden',
  2024,
  'CSV / NetCDF',
  '13.9 MB',
  'July 2023 – August 2024 continuous subsurface records',
  'arctic-2024',
  NULL,
  '[
    {"name": "Mooring Array Code", "value": "INDARC-MAIN (Kongsfjorden Fjord)"},
    {"name": "Mooring Anchor Depth", "value": "192.0 meters"},
    {"name": "Coordinates", "value": "78°59′N, 11°57′E"},
    {"name": "In-Situ Water Temperature", "value": "+1.42 °C (Atlantic pulse)"},
    {"name": "Practical Salinity", "value": "34.842 PSU"},
    {"name": "Mean Fjord Current Speed", "value": "0.14 m/s (Max 0.42 m/s)"},
    {"name": "Ocean Current Direction", "value": "148° (Inner fjord circulation)"},
    {"name": "Dissolved Oxygen Concentration", "value": "318.5 µmol/kg"},
    {"name": "Optical Water Turbidity", "value": "0.42 NTU"}
  ]'::jsonb,
  '/data/ds-ind-008-indarc-hydrographic-timeseries.csv'
),
(
  'ds-ozo-009',
  'Maitri Observatory Total Column Ozone & Ozonesonde Profiles',
  'Long-term continuous daily observations of total column ozone (Dobson spectrophotometer No. 108) and weekly ECC ozonesonde vertical profiles (0–35 km) recorded by IMD and NCPOR at Maitri Station, monitoring the Antarctic ozone hole dynamics and stratospheric polar vortex recovery.',
  'Atmospheric Sciences',
  'Antarctic · Maitri',
  2024,
  'CSV',
  '8.4 MB',
  '2020–2024, daily total column & weekly vertical profiles',
  'isro-44',
  'pub-2024-03',
  '[
    {"name": "Observatory Code", "value": "MAITRI_O3 (WMO 89514)"},
    {"name": "Total Column Ozone", "value": "284.5 Dobson Units (DU)"},
    {"name": "Ozone Hole Minimum", "value": "142.1 DU (Spring austral peak)"},
    {"name": "Tropopause Height", "value": "9.45 km"},
    {"name": "Stratospheric Temperature at 50 hPa", "value": "-78.2 °C"},
    {"name": "Surface UV Index", "value": "4.2 (Summer clear-sky)"},
    {"name": "Data Quality Flag", "value": "WMO GAW Level-2 Validated"}
  ]'::jsonb,
  '/data/ds-ozo-009-maitri-total-ozone.csv'
),
(
  'ds-bgc-010',
  'Southern Ocean Marine Biogeochemistry & Carbonate Chemistry',
  'Underway high-precision seawater pCO2, total alkalinity, dissolved inorganic carbon (DIC), macronutrients (NO3, PO4, SiO4), and HPLC size-fractionated chlorophyll-a profiles acquired along the 57°30′E meridian transect from 40°S across the Polar Front into the sea-ice margin.',
  'Oceanography',
  'Southern Ocean',
  2024,
  'CSV',
  '11.8 MB',
  '2023–2024 Southern Ocean cruises · 120 depth-stratified stations',
  'so-cruise-2023',
  'pub-2023-02',
  '[
    {"name": "Cruise Track Meridian", "value": "57°30′E (Mauritius to Prydz Bay)"},
    {"name": "Surface Seawater pCO₂", "value": "382.4 µatm (Subantarctic sink)"},
    {"name": "Total Alkalinity (TA)", "value": "2,312.5 µmol/kg"},
    {"name": "Dissolved Inorganic Carbon (DIC)", "value": "2,148.2 µmol/kg"},
    {"name": "Nitrate Concentration (NO₃⁻)", "value": "24.8 µmol/L"},
    {"name": "Silicate Concentration (SiO₄⁴⁻)", "value": "42.6 µmol/L"},
    {"name": "Surface Chlorophyll-a Biomass", "value": "1.24 mg/m³"}
  ]'::jsonb,
  '/data/ds-bgc-010-southern-ocean-biogeochemistry.csv'
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
  preview_rows = EXCLUDED.preview_rows,
  download_url = EXCLUDED.download_url;

-- ------------------------------------------------------------------------------
-- 3. SEED PUBLICATIONS (8 records)
-- ------------------------------------------------------------------------------
INSERT INTO public.publications (
  id, title, authors, year, journal, doi, abstract, area, expedition, dataset, type
)
VALUES
(
  'pub-2024-03',
  'Equivalent black carbon over the Southern Ocean: Seasonal observations and source apportionment from Maitri',
  ARRAY['Tiwari, S.', 'Bhattacharya, A.', 'Mohan, R.', 'Gopal, K.'],
  2024,
  'Polar Science (Elsevier)',
  '10.1016/j.polar.2024.100982',
  'We present continuous, multi-year observations of equivalent black carbon (EBC) mass concentration acquired via seven-wavelength optical aethalometer at Maitri Station in the Schirmacher Oasis. Median austral winter background values remained remarkably pristine (<12 ng/m3), whereas late austral spring witnessed episodic trans-boundary transport peaks exceeding 75 ng/m3. Five-day HYSPLIT kinematic back-trajectory simulations identify biomass burning emissions originating in southern Africa and South America transported across circumpolar westerly corridors. Absorption Angstrom exponent values (~1.12) corroborate the predominance of fossil fuel combustion from regional maritime logistics during summer resupply windows.',
  'Atmospheric Sciences',
  'isro-44',
  'ds-atm-001',
  'Journal'
),
(
  'pub-2025-01',
  'Meridional variability and frontal dynamics of the Southern Ocean overturning circulation along 57°30′E',
  ARRAY['Verma, P.', 'Vidya, P.', 'Mohan, R.', 'Patil, S.'],
  2025,
  'Journal of Physical Oceanography (AMS)',
  '10.1175/JPO-D-24-0045.1',
  'High-resolution full-depth CTD hydrographic profiles acquired along 57°30′E during the 2024 Southern Ocean cruise reveal substantial mesoscale variability in the Antarctic Circumpolar Current (ACC) frontal jet branches. Analysis of potential density and neutral surfaces identifies an accelerated northward shoaling of Upper Circumpolar Deep Water (UCDW) driven by positive Southern Annular Mode wind stress anomalies. In-situ dissolved oxygen and nutrient stoichiometries delineate the core of newly ventilated Antarctic Intermediate Water (AAIW) and reveal a 0.04°C warming of Lower Circumpolar Deep Water relative to decadal climatological baselines.',
  'Oceanography',
  'isro-44',
  'ds-oce-002',
  'Journal'
),
(
  'pub-2024-01',
  'Cultivable psychrophilic and psychrotolerant microbial diversity from Larsemann Hills soil transects',
  ARRAY['Singh, K.', 'Sharma, M.', 'Shivaji, S.', 'Ray, M. K.'],
  2024,
  'Polar Biology (Springer)',
  '10.1007/s00300-024-03241-8',
  'A culture-dependent taxonomic and genomic investigation of 48 permafrost and ornithogenic soil cores retrieved from the Broknes Peninsula, Larsemann Hills, recovered 142 distinct bacterial isolates across Actinomycetota, Pseudomonadota, and Bacteroidota. Whole-genome sequencing of cold-adapted isolates revealed ubiquitous cold-shock proteins (CspA homologs), polyunsaturated fatty acid desaturases, and high-efficiency ice-binding proteins (IBPs). Enzymatic assays demonstrated that over 65% of the isolated strains produce extracellular proteases, amylases, and lipases active at 4°C, presenting significant biotechnological promise for low-temperature industrial biocatalysis.',
  'Biodiversity',
  'isro-43',
  NULL,
  'Journal'
),
(
  'pub-2024-02',
  'Tectonometamorphic evolution of the Broknes Peninsula: Re-evaluating Indo-Antarctic Gondwana suturing',
  ARRAY['Sharma, M.', 'Roy, S.', 'Pant, N. C.', 'Biswal, T. K.'],
  2024,
  'Precambrian Research (Elsevier)',
  '10.1016/j.precamres.2024.107210',
  'Revised 1:25,000 litho-structural geological mapping combined with in-situ U-Pb zircon and monazite geochronology across the Larsemann Hills establishes two discrete high-grade metamorphic episodes at ~980 Ma (Grenvillian/Rayner equivalent) and ~530 Ma (Kuunga/Pan-African orogeny). Ultra-high-temperature (UHT) granulite-facies mineral assemblages (spinel + quartz, sapphirine + quartz) record peak burial conditions of 8.5–9.2 kbar and 920–960°C. Structural correlation with the Eastern Ghats Mobile Belt of peninsular India confirms contiguous crustal architecture prior to Gondwana amalgamation.',
  'Geology',
  'isro-43',
  'ds-geo-006',
  'Journal'
),
(
  'pub-2024-05',
  'Snow chemistry, isotopic fractionation, and surface energy balance on Austre Løvenbreen, Svalbard',
  ARRAY['Krishnan, N.', 'Kulkarni, A.', 'Chaturvedi, R.', 'Nair, S.'],
  2024,
  'Journal of Glaciology (Cambridge)',
  '10.1017/jog.2024.38',
  'A multi-year synthesis of high-resolution snow pit chemistry, stable water isotope fractionation (δ18O, δD, d-excess), and surface boundary layer radiation flux recorded at Himadri Station quantifies rapid cryospheric alterations in Western Svalbard. Measured net mass balance of Austre Løvenbreen averaged -0.58 m w.e./year, with accumulation-area ratios plunging beneath 20% in anomalous melt summers. Elevated maritime sea-salt aerosol ingress correlates with decreasing sea-ice extent in the Barents Sea, indicating accelerating Arctic maritime transitions at 79°N.',
  'Glaciology',
  'arctic-2024',
  'ds-met-004',
  'Journal'
),
(
  'pub-2023-02',
  'Air-sea CO₂ exchange and surface ocean acidification across the Subtropical and Subantarctic Fronts',
  ARRAY['Vidya, P.', 'Kumar, S.', 'Verma, P.', 'Shenoy, D.'],
  2023,
  'Geophysical Research Letters (AGU)',
  '10.1029/2023GL103891',
  'Underway continuous high-precision measurements of surface seawater pCO2 and atmospheric mole fractions acquired across the 2023 Southern Ocean meridional transect reveal intense spatial heterogeneity in oceanic carbon uptake. The Subantarctic Zone acted as a vigorous seasonal sink for atmospheric CO2 (-4.2 mol C/m2/yr), modulated by massive diatom blooms and iron availability. Conversely, south of the Polar Front upwelling of carbon-rich Circumpolar Deep Water yielded localized net outgassing (+1.1 mol C/m2/yr), highlighting sensitive feedback mechanisms under intensifying circumpolar westerly winds.',
  'Climate',
  'so-cruise-2023',
  NULL,
  'Journal'
),
(
  'pub-2023-01',
  'Spatial variability of stable water isotopes across Dronning Maud Land: Atmospheric moisture sources',
  ARRAY['Roy, S.', 'Mohan, R.', 'Bhattacharya, A.', 'Laluraj, C. M.'],
  2023,
  'Polar Science (Elsevier)',
  '10.1016/j.polar.2023.100812',
  'A systematic network of twenty shallow snow pits and 10-meter firn cores excavated along an inland transect across Dronning Maud Land during the 42nd ISEA was analyzed for spatial isotopic and ionic systematics. Mean δ18O values decreased systematically from -22.4‰ at the coast to -48.2‰ on the polar plateau, exhibiting a temperature coefficient of 0.82‰/°C. Second-order deuterium excess parameters identify the mid-latitude Southern Indian Ocean as the primary moisture source region, with secondary high-latitude cyclonic injections dictating episodic accumulation surges.',
  'Glaciology',
  'isro-42',
  NULL,
  'Journal'
),
(
  'pub-2022-01',
  'Two decades of continuous glaciological mass balance on Chhota Shigri Glacier, Western Himalaya',
  ARRAY['Kulkarni, A.', 'Sharma, P.', 'Prasad, V.', 'Azam, M. F.'],
  2022,
  'Journal of Glaciology (Cambridge)',
  '10.1017/jog.2022.12',
  'We report a twenty-year continuous empirical mass-balance time series (2002–2022) of Chhota Shigri Glacier, a benchmark valley glacier in the Chandra Basin, Western Himalaya. Direct glaciological stake measurements combined with kinematic GNSS geodetic balance confirm a cumulative mass loss of -11.2 m w.e. over the two-decade epoch. Interannual mass fluctuations correlate strongly with winter precipitation anomalies driven by Western Disturbances and summer air temperatures. Equilibrium line altitude (ELA) fluctuated between 4,850m and 5,220m a.s.l., demonstrating high sensitivity of debris-free Himalayan ice masses to regional warming.',
  'Glaciology',
  'himalaya-glacier-2022',
  'ds-cry-005',
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
  'First Light at Bharati: Field Operations in the Larsemann Hills',
  'A field geophysicist recounts summer twilight over the Broknes Peninsula, navigating katabatic surges and drilling firn cores.',
  'By 06:30 local station time, the low Antarctic Sun casts long, crystalline amber shadows across the wind-scoured gneisses of the Broknes ridge. The ambient temperature hovers at -14°C, but the wind has temporarily dropped below 8 knots. For the expedition field crews stationed at Bharati, this stillness is the operational window that dictates whether the day succeeds.

The field team divides into two specialized wings: the glaciology crew prepares the portable electro-mechanical drill at Firn Pit Site 3, while the bio-geochemical unit sets out across the coastal oasis towards Progress Lake to retrieve permafrost core sleeves. Working on the polar plateau requires a continuous negotiation with environmental physics. By 13:00, the katabatic drainage flows descending from the continental polar ice cap routinely exceed 45 knots, bringing blowing drift snow that reduces horizontal visibility to under twenty meters.

Inside Bharati’s aerodynamic, triple-glazed containerised superstructure, the raw samples are immediately catalogued into cold-chain storage at -20°C. In the polar laboratory, mass spectrometers and optical particle counters hum in quiet contrast to the roaring Antarctic gale outside. It is a discipline where precision instruments meet the planet’s harshest wilderness, and where every retrieved core represents a direct atmospheric archive of the Southern Hemisphere.',
  ARRAY['Bharati', 'Larsemann Hills', 'Field Operations', 'Cryosphere'],
  'Field Stories',
  2024,
  'Polar Field Geophysics Wing · 43rd ISEA',
  'isro-43',
  NULL,
  NULL
),
(
  'kb-2',
  'Report',
  '44th Indian Scientific Expedition to Antarctica: Executive Mission Report',
  'Comprehensive operational, atmospheric, and glaciological campaign summary of the 44th ISEA deployed across Bharati and Maitri.',
  'The 44th Indian Scientific Expedition to Antarctica (ISEA) successfully executed multi-disciplinary field campaigns across East Antarctica, operating from the coastal Larsemann Hills base (Bharati, 69°24''S) and the inland Schirmacher Oasis base (Maitri, 70°46''S). Flagship scientific achievements included the retrieval of high-resolution shallow firn cores spanning 12 meters depth to assess post-industrial aerosol deposition, continuous 7-wavelength aethalometer monitoring of fossil-fuel vs. biomass burning black carbon, and deep hydrographic CTD profiling along the 70°E meridian aboard MV Vasiliy Golovnin.

Station operations successfully executed major fuel bunkering operations (1,240 MT of Jet A-1 polar fuel), routine maintenance of satellite earth ground telemetry stations, and validation of wastewater bioreactor systems in compliance with Madrid Environmental Protocol Annex III. A wintering contingency of 24 researchers and logistics engineers remains stationed to maintain year-round ionospheric, seismological, and meteorological data streams.',
  ARRAY['ISEA', 'Annual Report', 'Antarctic Science', 'MoES'],
  'Reports',
  2025,
  'National Centre for Polar and Ocean Research (NCPOR)',
  'isro-44',
  NULL,
  NULL
),
(
  'kb-3',
  'Article',
  'The Polar Teleconnection: Why the Cryosphere Governs the Indian Monsoon',
  'An in-depth scientific analysis demonstrating how polar sea-ice anomalies and Antarctic oscillations directly influence the Indian summer monsoon rainfall.',
  'Geographically, peninsular India and the polar ice sheets appear worlds apart. Yet atmospheric and oceanic dynamics link them through planetary-scale teleconnections. The Southern Ocean absorbs over 40% of all oceanic anthropogenic carbon dioxide and more than 75% of excess planetary ocean heat. Fluctuations in the Southern Annular Mode (SAM) and Antarctic sea-ice extent modulate the cross-equatorial pressure gradient and the Somali Low-Level Jet, exerting direct controls on the onset and intra-seasonal variability of the Indian Summer Monsoon (ISMR).

Simultaneously, Arctic amplification — the rapid warming of the northern high latitudes at nearly four times the global rate — destabilizes the Northern Hemisphere circumpolar polar jet stream. Atmospheric Rossby waves propagate southwards, causing stationary blocking patterns that trigger extreme unseasonal precipitation and prolonged heatwaves across South Asia. Studying polar climate dynamics is not an isolated academic pursuit: it is essential national infrastructure for water security, agricultural resilience, and monsoon predictability.',
  ARRAY['Climate Teleconnections', 'Monsoon Dynamics', 'Polar Oceanography', 'National Policy'],
  'Articles',
  2024,
  'MoES Climate Research Advisory Group',
  NULL,
  NULL,
  NULL
),
(
  'kb-4',
  'News',
  'National Polar Science and Outreach Symposium Concludes in Goa',
  'Over 400 polar researchers, climatologists, and university delegates deliberate on cryospheric tipping points and polar data infrastructure.',
  'The annual National Polar Outreach and Science Symposium concluded at the NCPOR campus in Vasco da Gama, Goa. Delegates from the Indian Institute of Science (IISc), Indian Institute of Tropical Meteorology (IITM), National Institute of Oceanography (NIO), and premier international institutes reviewed observational milestones from the Arctic, Antarctic, and Western Himalayas.

Key resolutions ratified during the symposium include accelerated expansion of the National Polar Data Centre (NPDC) open-access digital pipeline, deployment of autonomous biogeochemical Argo floats in the Indian sector of the Southern Ocean, and national training fellowships for early-career researchers participating in future ISEA summer traverses. The interactive exhibition featured live teleconferences with wintering scientists at Bharati Station.',
  ARRAY['Outreach', 'Symposium', 'NCPOR Goa', 'Higher Education'],
  'News',
  2024,
  'NCPOR Media & Outreach Cell',
  NULL,
  NULL,
  NULL
),
(
  'kb-5',
  'Educational',
  'Methodology: Interpreting Deep Ocean CTD Hydrographic Profiles',
  'A technical primer on processing Conductivity, Temperature, and Depth datasets, computing conservative temperature and absolute salinity.',
  'A Conductivity-Temperature-Depth (CTD) rosette is the workhorse instrument of physical oceanography. As the package descends through the water column, platinum resistance thermometers and dual conductivity cells sample at 24 Hz, logging in-situ temperature, hydrostatic pressure, and electrolytic conductivity. Using the international Thermodynamic Equation of Seawater 2010 (TEOS-10), oceanographers convert these raw observations into Absolute Salinity (SA) and Conservative Temperature (CT).

When evaluating a Southern Ocean CTD profile, three fundamental water masses define the structure: the cold, relatively fresh Antarctic Surface Water (AASW, 0–200m), the warmer, saline Circumpolar Deep Water (CDW, 400–1,500m) with dissolved oxygen minimums, and the dense, freezing Antarctic Bottom Water (AABW) hugging the abyssal seabed at depths exceeding 3,500 meters. Sharp discontinuities in potential density (sigma-theta) reveal the depth of the pycnocline and the intensity of diapycnal mixing.',
  ARRAY['Oceanography', 'CTD Profiling', 'TEOS-10', 'Hydrography'],
  'Educational',
  2024,
  'NPDC Oceanographic Data Directorate',
  NULL,
  'ds-oce-002',
  NULL
),
(
  'kb-6',
  'Publication',
  'Long-Term Optical Properties of Black Carbon over the Coastal Antarctic Atmosphere',
  'Peer-reviewed empirical study examining seven-wavelength aethalometer records at Maitri and the influence of long-range transport pathways.',
  'This scientific synthesis analyzes continuous equivalent black carbon (EBC) mass concentrations logged at the Maitri atmospheric research facility in the Schirmacher Oasis. The seasonal cycle demonstrates baseline pristine conditions in austral winter (median EBC < 15 ng/m³), punctuated by episodic spikes exceeding 80 ng/m³ during late austral spring.

Five-day kinematic back-trajectory simulations using NOAA HYSPLIT demonstrate that elevated aerosol loading originates from southern African biomass burning and South American agricultural emissions, transported into the polar vortex across upper-tropospheric westerly corridors. The absorption Ångström exponent (AAE) averages ~1.1, confirming fossil fuel combustion dominance from intercontinental maritime traffic and regional station generators during summer supply operations.',
  ARRAY['Atmospheric Sciences', 'Black Carbon', 'Aerosol Radiative Forcing', 'Maitri'],
  'Publications',
  2024,
  'Dr. S. Tiwari, Dr. A. Bhattacharya, Dr. R. Mohan',
  'isro-44',
  'ds-atm-001',
  'pub-2024-03'
),
(
  'kb-7',
  'Dataset',
  'Meridional CTD and Hydrographic Observations: Southern Ocean 2024 Transect',
  'Full-scale physical oceanographic datasets encompassing 64 deep-cast stations along 70°E between 40°S and 68°S.',
  'The Southern Ocean Hydrographic Transect dataset provides quality-controlled downcast CTD profiles acquired aboard ORV Sagar Nidhi and MV Vasiliy Golovnin. Variables recorded include in-situ temperature, conductivity, practical salinity, dissolved oxygen concentrations (SBE 43), optical beam attenuation (C-Rover transmissometer), and photosynthetically active radiation (PAR).

The transect crosses the Subtropical Front (STF), Subantarctic Front (SAF), and Polar Front (PF), providing essential empirical constraints for ocean state estimates and climate model validation. Data files are available in standardized WOCE exchange format and NetCDF-CF.',
  ARRAY['Oceanography', 'CTD Transect', 'Southern Ocean', 'Hydrography'],
  'Datasets',
  2024,
  'Physical Oceanography Division · NCPOR',
  'so-cruise-2023',
  'ds-oce-002',
  'pub-2025-01'
),
(
  'kb-8',
  'Field Story',
  'Svalbard in Polar Day: 24 Hours of Sunlight in Kongsfjorden',
  'Glaciologists at Himadri Station navigate calving icebergs, glacial flour plumes, and midnight Zodiac sampling runs.',
  'At 78°55''N in Ny-Ålesund, Svalbard, the Sun does not dip below the horizon between April and late August. In this perpetual polar daylight, operational schedules are dictated by tidal cycles and sea-ice breakup rather than the clock. At Himadri, India’s permanent Arctic research base, the scientific team mobilizes rigid-hulled inflatable Zodiacs at 01:30 when high tide allows access to the proglacial plume of the Kronebreen glacier.

Sampling glacial outflow requires navigating dense brash ice and watching for sudden calving events along the three-kilometer-wide marine ice cliff. The water is an opaque, milky turquoise — stained by finely ground "glacial flour" carried by subglacial meltwater streams. Thermosalinograph sensors verify temperature anomalies as warm Atlantic Water penetrates Kongsfjorden, driving rapid basal melting of tidewater glaciers. Under the silent Arctic midnight sun, science becomes a test of endurance and continuous observation.',
  ARRAY['Arctic', 'Himadri', 'Svalbard', 'Kongsfjorden', 'Field Operations'],
  'Field Stories',
  2024,
  'Indian Arctic Science Crew · Himadri Station',
  'arctic-2024',
  NULL,
  NULL
),
(
  'kb-9',
  'Report',
  'Maitri Meteorological Observatory: Annual Surface Climatological Summary',
  'WMO-standard annual climatological analysis of temperature extremes, katabatic wind frequencies, and radiation budgets at Schirmacher Oasis.',
  'The India Meteorological Department (IMD) in partnership with NCPOR operates the permanent surface meteorological observatory at Maitri Station (WMO Index 89514). This annual climatological report synthesizes high-frequency AWS recordings spanning air temperature, barometric pressure, wind velocity, relative humidity, global solar radiation, and sonic snow depth accumulation.

Key meteorological milestones recorded include an annual mean surface temperature of -9.8°C, with a maximum summer temperature of +8.2°C and a winter minimum of -34.6°C. Blizzard frequency totaled 26 events during the polar night, with peak wind gusts reaching 84 knots (155 km/h). The radiation balance confirms strong net radiative loss between April and September, driving persistent downslope katabatic drainage from the polar ice dome.',
  ARRAY['Meteorology', 'AWS', 'Maitri Station', 'WMO 89514', 'Climatology'],
  'Reports',
  2024,
  'India Meteorological Department (IMD) & NCPOR',
  'isro-44',
  NULL,
  NULL
),
(
  'kb-10',
  'Article',
  'Thermodynamics of Sea Ice: Growth Dynamics and Planetary Albedo Feedback',
  'An authoritative scientific explanation of frazil ice formation, brine rejection, multi-year ice consolidation, and solar energy regulation.',
  'Sea ice is not merely frozen seawater; it is an active thermodynamic interface governing planetary heat exchange. Formation begins when turbulent surface ocean waters reach the freezing point of saline water (-1.86°C at 35 PSU). Microscopic discoidal crystals known as frazil ice coagulate into grease ice, soupy shuga, and eventually circular pancake ice with raised rims formed by wave action.

As ice sheets consolidate into continuous congelation ice, rapid freezing traps high-salinity brine pockets. Over seasonal timescales, gravity drainage and brine expulsion decrease bulk salinity from ~14 PSU to under 4 PSU. Pristine snow-covered sea ice possesses an albedo exceeding 0.85, reflecting the majority of incident shortwave solar radiation back into space. When rising temperatures cause premature melt ponding and open leads, albedo plunges to 0.07, accelerating heat absorption in a self-reinforcing climate feedback loop.',
  ARRAY['Sea Ice', 'Thermodynamics', 'Cryosphere', 'Albedo Feedback'],
  'Articles',
  2024,
  'NCPOR Cryospheric Sciences Research Team',
  NULL,
  NULL,
  NULL
),
(
  'kb-11',
  'Educational',
  'The Compendium of Polar and Cryospheric Terminology',
  'Standardized scientific vocabulary defining core glaciological, oceanographic, atmospheric, and geomagnetic concepts.',
  'This reference compendium provides unambiguous scientific definitions for technical terms utilized across the POLARIS portal and MoES polar archives:

• Ablation: All processes by which snow or ice is removed from a glacier or ice sheet, including melting, evaporation, sublimation, and wind scouring.
• Katabatic Wind: High-velocity gravity wind generated when dense, cold air cooled over an elevated polar ice dome drains rapidly down slope toward sea level.
• Halocline: A vertical zone in the ocean water column characterized by a sharp, rapid change in salinity with increasing depth.
• Calving: The mechanical fracture and detachment of an iceberg from the terminus of a tidewater glacier or ice shelf.
• Firn: Granular, compacted snow that has survived at least one summer melt season but has not yet sintered into impermeable glacial ice (density 400–830 kg/m³).
• Sverdrup (Sv): Oceanographic unit of volumetric transport rate equivalent to 1,000,000 cubic meters per second (10⁶ m³/s).
• Madrid Protocol: The Protocol on Environmental Protection to the Antarctic Treaty, designating Antarctica as a "natural reserve devoted to peace and science".',
  ARRAY['Glossary', 'Glaciology', 'Reference Compendium', 'SCAR'],
  'Educational',
  2024,
  'POLARIS Scientific Editorial Board',
  NULL,
  NULL,
  NULL
),
(
  'kb-12',
  'News',
  'MoES Celebrates Polar and Ocean Discovery Day Across Indian Universities',
  'Nationwide institutional hackathons, live telemetry workshops, and interactive glacier simulations mark International Polar Day.',
  'Educational institutions across thirty-six Indian states and Union Territories commemorated International Polar and Ocean Discovery Day under the aegis of the Ministry of Earth Sciences. Central to the celebrations was the POLARIS platform demonstration, allowing university students and researchers to explore live meteorological feeds from Maitri, Bharati, and Himadri stations.

Colleges conducted hands-on hackathons utilizing real NCPOR open-access NetCDF and CSV datasets to simulate Himalayan glacial lake outburst floods (GLOFs) and model Antarctic ice shelf basal melt. Outstanding student projects received research fellowships granting access to high-performance computing clusters at the Indian Institute of Tropical Meteorology for Earth system modeling.',
  ARRAY['Education', 'Outreach', 'National Science Day', 'MoES'],
  'News',
  2024,
  'Ministry of Earth Sciences (MoES) Press Bureau',
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
