import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { stations as staticStations, type ResearchStation } from '../data/stations'
import { expeditions as staticExpeditions, type Expedition } from '../data/expeditions'
import { datasets as staticDatasets, type Dataset } from '../data/datasets'
import { publications as staticPublications, type Publication } from '../data/publications'
import { knowledgeItems as staticKnowledge, type KnowledgeItem } from '../data/knowledge'
import { topics as staticTopics, type Topic } from '../data/education'
import { media as staticMedia, type MediaItem } from '../data/media'

// Re-export types for convenient consumer imports
export type { ResearchStation, Expedition, Dataset, Publication, KnowledgeItem, Topic, MediaItem }

/* -------------------------------------------------------------------------- */
/*                                DATA MAPPERS                                */
/* -------------------------------------------------------------------------- */

function mapExpedition(row: any): Expedition {
  return {
    id: row.id,
    title: row.title,
    shortTitle: row.short_title || row.title,
    region: row.region || 'Antarctic',
    year: Number(row.year ?? 2024),
    season: row.season || 'Summer',
    vessel: row.vessel || undefined,
    stations: Array.isArray(row.stations) ? row.stations : [],
    researchAreas: Array.isArray(row.research_areas) ? row.research_areas : [],
    lead: row.lead || 'NCPOR · Ministry of Earth Sciences',
    image: row.image_url || '',
    overview: row.overview || '',
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    scientists: Array.isArray(row.scientists) ? row.scientists : [],
    research: Array.isArray(row.objectives) ? row.objectives : [],
    reports: Array.isArray(row.reports) ? row.reports : [],
    datasets: Array.isArray(row.datasets) ? row.datasets : [],
    publications: Array.isArray(row.publications) ? row.publications : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
  }
}

function mapDataset(row: any): Dataset {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    area: row.area || 'General',
    region: row.region || 'Antarctic',
    year: Number(row.year ?? 2024),
    format: row.format || 'CSV',
    size: row.size || '1.0 MB',
    coverage: row.coverage || 'Current',
    relatedExpedition: row.related_expedition || '',
    relatedPublication: row.related_publication || undefined,
    previewRows: Array.isArray(row.preview_rows) ? row.preview_rows : [],
  }
}

function mapPublication(row: any): Publication {
  return {
    id: row.id,
    title: row.title,
    authors: Array.isArray(row.authors) ? row.authors : (typeof row.authors === 'string' ? [row.authors] : []),
    year: Number(row.year ?? 2024),
    journal: row.journal || 'Polar Research',
    doi: row.doi || '',
    abstract: row.abstract || '',
    area: row.area || 'Atmospheric Sciences',
    expedition: row.expedition || '',
    dataset: row.dataset || undefined,
    type: (row.type as any) || 'Journal',
  }
}

function mapKnowledge(row: any): KnowledgeItem {
  return {
    id: row.id,
    type: row.type || 'Article',
    title: row.title,
    excerpt: row.excerpt || '',
    body: row.body || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    category: row.category || 'General',
    year: Number(row.year ?? 2024),
    author: row.author || 'POLARIS',
    source: row.source || undefined,
    relatedExpedition: row.related_expedition || undefined,
    relatedDataset: row.related_dataset || undefined,
    relatedPublication: row.related_publication || undefined,
  }
}

/* -------------------------------------------------------------------------- */
/*                               SERVICE METHODS                              */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all research stations (Static Scope for SIH phase)
 */
export async function getStations(): Promise<ResearchStation[]> {
  return staticStations
}

/**
 * Fetch a single research station by ID (Static Scope for SIH phase)
 */
export async function getStationById(id: string): Promise<ResearchStation | null> {
  return staticStations.find(s => s.id === id) || null
}

/**
 * Fetch all polar expeditions from Supabase (falls back to static dataset)
 */
export async function getExpeditions(): Promise<Expedition[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .order('year', { ascending: false })

      if (!error && data && data.length > 0) {
        return data.map(mapExpedition)
      }
    } catch (err) {
      console.warn('Supabase getExpeditions fallback:', err)
    }
  }
  return staticExpeditions
}

/**
 * Fetch a single expedition by ID
 */
export async function getExpeditionById(id: string): Promise<Expedition | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!error && data) {
        return mapExpedition(data)
      }
    } catch (err) {
      console.warn('Supabase getExpeditionById fallback:', err)
    }
  }
  return staticExpeditions.find(e => e.id === id) || null
}

/**
 * Fetch all open datasets from Supabase (falls back to static dataset)
 */
export async function getDatasets(): Promise<Dataset[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .order('year', { ascending: false })

      if (!error && data && data.length > 0) {
        return data.map(mapDataset)
      }
    } catch (err) {
      console.warn('Supabase getDatasets fallback:', err)
    }
  }
  return staticDatasets
}

/**
 * Fetch a single dataset by ID
 */
export async function getDatasetById(id: string): Promise<Dataset | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!error && data) {
        return mapDataset(data)
      }
    } catch (err) {
      console.warn('Supabase getDatasetById fallback:', err)
    }
  }
  return staticDatasets.find(d => d.id === id) || null
}

/**
 * Fetch all publications from Supabase (falls back to static dataset)
 */
export async function getPublications(): Promise<Publication[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false })

      if (!error && data && data.length > 0) {
        return data.map(mapPublication)
      }
    } catch (err) {
      console.warn('Supabase getPublications fallback:', err)
    }
  }
  return staticPublications
}

/**
 * Fetch a single publication by ID
 */
export async function getPublicationById(id: string): Promise<Publication | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!error && data) {
        return mapPublication(data)
      }
    } catch (err) {
      console.warn('Supabase getPublicationById fallback:', err)
    }
  }
  return staticPublications.find(p => p.id === id) || null
}

/**
 * Fetch all knowledge hub items from Supabase (falls back to static dataset)
 */
export async function getKnowledge(): Promise<KnowledgeItem[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('knowledge')
        .select('*')
        .order('year', { ascending: false })

      if (!error && data && data.length > 0) {
        return data.map(mapKnowledge)
      }
    } catch (err) {
      console.warn('Supabase getKnowledge fallback:', err)
    }
  }
  return staticKnowledge
}

/**
 * Fetch a single knowledge item by ID
 */
export async function getKnowledgeById(id: string): Promise<KnowledgeItem | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('knowledge')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (!error && data) {
        return mapKnowledge(data)
      }
    } catch (err) {
      console.warn('Supabase getKnowledgeById fallback:', err)
    }
  }
  return staticKnowledge.find(k => k.id === id) || null
}

/**
 * Fetch all educational topics (Static Scope for SIH phase)
 */
export async function getEducation(): Promise<Topic[]> {
  return staticTopics
}

/**
 * Fetch a single education topic by ID (Static Scope for SIH phase)
 */
export async function getEducationById(id: string): Promise<Topic | null> {
  return staticTopics.find(t => t.id === id) || null
}

/**
 * Fetch all multimedia items (Static Scope for SIH phase)
 */
export async function getMedia(): Promise<MediaItem[]> {
  return staticMedia
}

/* -------------------------------------------------------------------------- */
/*                               AI PREPARATION                               */
/* -------------------------------------------------------------------------- */

/**
 * Structured context helper for AI conversational layers (Gemini / POLARIS AI)
 * Readily fetches the live or fallback record from Supabase for prompt grounding.
 */
export async function getEntityContextForAI(type: string, id: string): Promise<string> {
  switch (type.toLowerCase()) {
    case 'expedition': {
      const exp = await getExpeditionById(id)
      if (!exp) return ''
      return `Expedition: ${exp.title} (${exp.year}, ${exp.region}). Vessel: ${exp.vessel || 'N/A'}. Lead: ${exp.lead}. Stations: ${exp.stations.join(', ')}. Overview: ${exp.overview}`
    }
    case 'dataset': {
      const ds = await getDatasetById(id)
      if (!ds) return ''
      return `Dataset: ${ds.title} (${ds.area}, ${ds.region}, ${ds.year}). Format: ${ds.format}, Coverage: ${ds.coverage}. Description: ${ds.description}`
    }
    case 'station': {
      const st = await getStationById(id)
      if (!st) return ''
      return `Station: ${st.name} (${st.country}, ${st.region}). Established: ${st.established}. Details: ${st.blurb}`
    }
    case 'publication': {
      const pub = await getPublicationById(id)
      if (!pub) return ''
      return `Publication: ${pub.title} (${pub.year}, ${pub.journal}). Authors: ${pub.authors.join(', ')}. Abstract: ${pub.abstract}`
    }
    case 'knowledge': {
      const kb = await getKnowledgeById(id)
      if (!kb) return ''
      return `Knowledge Item [${kb.type}]: ${kb.title} (${kb.year}, Author: ${kb.author}). Summary: ${kb.excerpt}. Content: ${kb.body}`
    }
    case 'topic':
    case 'education': {
      const top = await getEducationById(id)
      if (!top) return ''
      return `Educational Topic: ${top.title}. Scientific definition: ${top.scientific}`
    }
    default:
      return ''
  }
}
