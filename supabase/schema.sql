-- ==============================================================================
-- POLARIS - India's Polar Knowledge & Outreach Platform
-- Smart India Hackathon 2026 | Problem ID: 26063
-- Ministry of Earth Sciences (MoES) | NCPOR
-- PostgreSQL Database Schema & Seed Script for Supabase
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. STATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stations (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  location TEXT,
  region TEXT NOT NULL CHECK (region IN ('Antarctic', 'Arctic')),
  latitude NUMERIC,
  longitude NUMERIC,
  elevation TEXT,
  description TEXT,
  blurb TEXT,
  image_url TEXT,
  x NUMERIC NOT NULL DEFAULT 50,
  y NUMERIC NOT NULL DEFAULT 50,
  established INT,
  research_focus TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Operational',
  related_expeditions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. EXPEDITIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.expeditions (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  region TEXT NOT NULL,
  year INT NOT NULL,
  season TEXT NOT NULL,
  vessel TEXT,
  lead TEXT,
  image_url TEXT,
  overview TEXT,
  description TEXT,
  objectives TEXT[] DEFAULT '{}',
  stations TEXT[] DEFAULT '{}',
  research_areas TEXT[] DEFAULT '{}',
  timeline JSONB DEFAULT '[]'::jsonb,
  scientists JSONB DEFAULT '[]'::jsonb,
  reports JSONB DEFAULT '[]'::jsonb,
  datasets TEXT[] DEFAULT '{}',
  publications TEXT[] DEFAULT '{}',
  highlights JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Completed',
  start_date TEXT,
  end_date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. DATASETS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.datasets (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT NOT NULL,
  region TEXT NOT NULL,
  source TEXT DEFAULT 'NCPOR',
  unit TEXT,
  year INT NOT NULL,
  format TEXT NOT NULL,
  size TEXT NOT NULL,
  coverage TEXT NOT NULL,
  date_range TEXT,
  related_expedition TEXT,
  related_publication TEXT,
  preview_rows JSONB DEFAULT '[]'::jsonb,
  data JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. PUBLICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL DEFAULT '{}',
  year INT NOT NULL,
  journal TEXT NOT NULL,
  doi TEXT,
  url TEXT,
  abstract TEXT NOT NULL,
  description TEXT,
  area TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Journal',
  expedition TEXT,
  dataset TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. KNOWLEDGE TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.knowledge (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  description TEXT,
  body TEXT NOT NULL,
  content TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  year INT NOT NULL,
  author TEXT NOT NULL,
  source TEXT,
  image_url TEXT,
  related_expedition TEXT,
  related_dataset TEXT,
  related_publication TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. EDUCATION TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🧊',
  simple TEXT NOT NULL,
  scientific TEXT NOT NULL,
  description TEXT,
  content TEXT,
  difficulty TEXT DEFAULT 'Intermediate',
  topic TEXT,
  glossary JSONB NOT NULL DEFAULT '[]'::jsonb,
  quiz JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 7. MEDIA TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'infographic')),
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  description TEXT,
  src TEXT NOT NULL,
  image_url TEXT,
  poster TEXT,
  credit TEXT NOT NULL,
  region TEXT,
  expedition TEXT,
  date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- INDEXES FOR OPTIMIZED RETRIEVAL
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_stations_slug ON public.stations(slug);
CREATE INDEX IF NOT EXISTS idx_stations_region ON public.stations(region);

CREATE INDEX IF NOT EXISTS idx_expeditions_slug ON public.expeditions(slug);
CREATE INDEX IF NOT EXISTS idx_expeditions_year ON public.expeditions(year);
CREATE INDEX IF NOT EXISTS idx_expeditions_region ON public.expeditions(region);

CREATE INDEX IF NOT EXISTS idx_datasets_slug ON public.datasets(slug);
CREATE INDEX IF NOT EXISTS idx_datasets_area ON public.datasets(area);
CREATE INDEX IF NOT EXISTS idx_datasets_year ON public.datasets(year);

CREATE INDEX IF NOT EXISTS idx_publications_slug ON public.publications(slug);
CREATE INDEX IF NOT EXISTS idx_publications_area ON public.publications(area);
CREATE INDEX IF NOT EXISTS idx_publications_year ON public.publications(year);

CREATE INDEX IF NOT EXISTS idx_knowledge_slug ON public.knowledge(slug);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON public.knowledge(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_type ON public.knowledge(type);

CREATE INDEX IF NOT EXISTS idx_education_slug ON public.education(slug);
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media(type);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public can READ (SELECT) all polar records.
-- Write operations (INSERT, UPDATE, DELETE) are restricted (require service_role).
-- ------------------------------------------------------------------------------
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Stations policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stations' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.stations FOR SELECT USING (true);
  END IF;

  -- Expeditions policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'expeditions' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.expeditions FOR SELECT USING (true);
  END IF;

  -- Datasets policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'datasets' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.datasets FOR SELECT USING (true);
  END IF;

  -- Publications policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'publications' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.publications FOR SELECT USING (true);
  END IF;

  -- Knowledge policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'knowledge' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.knowledge FOR SELECT USING (true);
  END IF;

  -- Education policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'education' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.education FOR SELECT USING (true);
  END IF;

  -- Media policy
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'Allow public read access') THEN
    CREATE POLICY "Allow public read access" ON public.media FOR SELECT USING (true);
  END IF;
END $$;
