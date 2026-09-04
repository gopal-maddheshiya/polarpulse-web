-- ==============================================================================
-- POLARIS - India's Polar Knowledge & Outreach Platform
-- Smart India Hackathon 2026 | Problem ID: 26063
-- Ministry of Earth Sciences (MoES) | NCPOR
-- PostgreSQL Database Schema for Supabase
--
-- APPROVED SCOPE: 4 Core Tables
-- 1. expeditions
-- 2. datasets
-- 3. publications
-- 4. knowledge
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXPEDITIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.expeditions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  region TEXT NOT NULL,
  year INT NOT NULL,
  season TEXT NOT NULL,
  vessel TEXT,
  lead TEXT,
  image_url TEXT,
  overview TEXT,
  objectives TEXT[] DEFAULT '{}',
  stations TEXT[] DEFAULT '{}',
  research_areas TEXT[] DEFAULT '{}',
  timeline JSONB DEFAULT '[]'::jsonb,
  scientists JSONB DEFAULT '[]'::jsonb,
  reports JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. DATASETS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.datasets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  area TEXT NOT NULL,
  region TEXT NOT NULL,
  year INT NOT NULL,
  format TEXT NOT NULL,
  size TEXT NOT NULL,
  coverage TEXT NOT NULL,
  related_expedition TEXT REFERENCES public.expeditions(id) ON DELETE SET NULL,
  related_publication TEXT,
  preview_rows JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. PUBLICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL DEFAULT '{}',
  year INT NOT NULL,
  journal TEXT NOT NULL,
  doi TEXT,
  abstract TEXT NOT NULL,
  area TEXT NOT NULL,
  expedition TEXT REFERENCES public.expeditions(id) ON DELETE SET NULL,
  dataset TEXT REFERENCES public.datasets(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'Journal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add reciprocal foreign key from datasets to publications safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_datasets_related_publication'
  ) THEN
    ALTER TABLE public.datasets
      ADD CONSTRAINT fk_datasets_related_publication
      FOREIGN KEY (related_publication)
      REFERENCES public.publications(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 4. KNOWLEDGE TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.knowledge (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  year INT NOT NULL,
  author TEXT NOT NULL,
  related_expedition TEXT REFERENCES public.expeditions(id) ON DELETE SET NULL,
  related_dataset TEXT REFERENCES public.datasets(id) ON DELETE SET NULL,
  related_publication TEXT REFERENCES public.publications(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_expeditions_year ON public.expeditions(year);
CREATE INDEX IF NOT EXISTS idx_expeditions_region ON public.expeditions(region);

CREATE INDEX IF NOT EXISTS idx_datasets_area ON public.datasets(area);
CREATE INDEX IF NOT EXISTS idx_datasets_year ON public.datasets(year);
CREATE INDEX IF NOT EXISTS idx_datasets_expedition ON public.datasets(related_expedition);

CREATE INDEX IF NOT EXISTS idx_publications_area ON public.publications(area);
CREATE INDEX IF NOT EXISTS idx_publications_year ON public.publications(year);
CREATE INDEX IF NOT EXISTS idx_publications_expedition ON public.publications(expedition);
CREATE INDEX IF NOT EXISTS idx_publications_dataset ON public.publications(dataset);

CREATE INDEX IF NOT EXISTS idx_knowledge_category ON public.knowledge(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_type ON public.knowledge(type);
CREATE INDEX IF NOT EXISTS idx_knowledge_expedition ON public.knowledge(related_expedition);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all 4 tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Expeditions') THEN
    CREATE POLICY "Public Read Expeditions" ON public.expeditions FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Datasets') THEN
    CREATE POLICY "Public Read Datasets" ON public.datasets FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Publications') THEN
    CREATE POLICY "Public Read Publications" ON public.publications FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Knowledge') THEN
    CREATE POLICY "Public Read Knowledge" ON public.knowledge FOR SELECT USING (true);
  END IF;
END $$;
