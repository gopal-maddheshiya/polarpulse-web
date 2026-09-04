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

function mapStation(row: any): ResearchStation {
  return {
    id: row.id || row.slug,
    name: row.name,
    country: row.country || 'India',
    region: row.region || 'Antarctic',
    x: Number(row.x ?? 50),
    y: Number(row.y ?? 50),
    established: Number(row.established ?? 1989),
    blurb: row.blurb || row.description || '',
    relatedExpeditions: Array.isArray(row.related_expeditions) ? row.related_expeditions : (row.relatedExpeditions || []),
  }
}

function mapExpedition(row: any): Expedition {
  return {
    id: row.id || row.slug,
    title: row.title,
    shortTitle: row.short_title || row.shortTitle || row.title,
    region: row.region || 'Antarctic',
    year: Number(row.year ?? 2024),
    season: row.season || 'Summer',
    vessel: row.vessel || undefined,
    stations: Array.isArray(row.stations) ? row.stations : [],
    researchAreas: Array.isArray(row.research_areas) ? row.research_areas : (row.researchAreas || []),
    lead: row.lead || 'NCPOR · Ministry of Earth Sciences',
    image: row.image_url || row.image || '',
    overview: row.overview || row.description || '',
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    scientists: Array.isArray(row.scientists) ? row.scientists : [],
    research: Array.isArray(row.research) ? row.research : (row.objectives || []),
    reports: Array.isArray(row.reports) ? row.reports : [],
    datasets: Array.isArray(row.datasets) ? row.datasets : [],
    publications: Array.isArray(row.publications) ? row.publications : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
  }
}

function mapDataset(row: any): Dataset {
  return {
    id: row.id || row.slug,
    title: row.title,
    description: row.description,
    area: row.area || row.category || 'General',
    region: row.region || 'Antarctic',
    year: Number(row.year ?? 2024),
    format: row.format || 'CSV',
    size: row.size || '1.0 MB',
    coverage: row.coverage || row.date_range || 'Current',
    relatedExpedition: row.related_expedition || row.relatedExpedition || '',
    relatedPublication: row.related_publication || row.relatedPublication || undefined,
    previewRows: Array.isArray(row.preview_rows) ? row.preview_rows : (row.previewRows || []),
  }
}

function mapPublication(row: any): Publication {
  return {
    id: row.id || row.slug,
    title: row.title,
    authors: Array.isArray(row.authors) ? row.authors : (typeof row.authors === 'string' ? [row.authors] : []),
    year: Number(row.year ?? 2024),
    journal: row.journal || 'Polar Research',
    doi: row.doi || '',
    abstract: row.abstract || row.description || '',
    area: row.area || row.category || 'Atmospheric Sciences',
    expedition: row.expedition || '',
    dataset: row.dataset || undefined,
    type: (row.type as any) || 'Journal',
  }
}

function mapKnowledge(row: any): KnowledgeItem {
  return {
    id: row.id || row.slug,
    type: row.type || 'Article',
    title: row.title,
    excerpt: row.excerpt || row.description || '',
    body: row.body || row.content || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    category: row.category || 'General',
    year: Number(row.year ?? 2024),
    author: row.author || 'POLARIS',
    source: row.source || undefined,
    relatedExpedition: row.related_expedition || row.relatedExpedition || undefined,
    relatedDataset: row.related_dataset || row.relatedDataset || undefined,
    relatedPublication: row.related_publication || row.relatedPublication || undefined,
  }
}

function mapTopic(row: any): Topic {
  return {
    id: row.id || row.slug,
    title: row.title,
    emoji: row.emoji || '🧊',
    simple: row.simple || row.description || '',
    scientific: row.scientific || row.content || '',
    glossary: Array.isArray(row.glossary) ? row.glossary : [],
    quiz: Array.isArray(row.quiz) ? row.quiz : [],
  }
}

function mapMedia(row: any): MediaItem {
  return {
    id: row.id || row.slug,
    type: row.type || 'photo',
    title: row.title,
    caption: row.caption || row.description || '',
    src: row.src || row.image_url || '',
    poster: row.poster || undefined,
    credit: row.credit || 'POLARIS / NCPOR',
    region: row.region || undefined,
    expedition: row.expedition || undefined,
  }
}

/* -------------------------------------------------------------------------- */
/*                               SERVICE METHODS                              */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all research stations from Supabase (falls back to static dataset)
 */
export async function getStations(): Promise<ResearchStation[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('stations').select('*').order('established', { ascending: true })
      if (!error && data && data.length > 0) {
        return data.map(mapStation)
      }
    } catch (err) {
      console.warn('Supabase getStations fallback:', err)
    }
  }
  return staticStations
}

/**
 * Fetch a single research station by ID or slug
 */
export async function getStationById(idOrSlug: string): Promise<ResearchStation | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('stations')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapStation(data)
      }
    } catch (err) {
      console.warn('Supabase getStationById fallback:', err)
    }
  }
  return staticStations.find(s => s.id === idOrSlug) || null
}

/**
 * Fetch all polar expeditions from Supabase (falls back to static dataset)
 */
export async function getExpeditions(): Promise<Expedition[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('expeditions').select('*').order('year', { ascending: false })
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
 * Fetch a single expedition by ID or slug
 */
export async function getExpeditionById(idOrSlug: string): Promise<Expedition | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('expeditions')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapExpedition(data)
      }
    } catch (err) {
      console.warn('Supabase getExpeditionById fallback:', err)
    }
  }
  return staticExpeditions.find(e => e.id === idOrSlug) || null
}

/**
 * Fetch all open datasets from Supabase (falls back to static dataset)
 */
export async function getDatasets(): Promise<Dataset[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('datasets').select('*').order('year', { ascending: false })
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
 * Fetch a single dataset by ID or slug
 */
export async function getDatasetById(idOrSlug: string): Promise<Dataset | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapDataset(data)
      }
    } catch (err) {
      console.warn('Supabase getDatasetById fallback:', err)
    }
  }
  return staticDatasets.find(d => d.id === idOrSlug) || null
}

/**
 * Fetch all publications from Supabase (falls back to static dataset)
 */
export async function getPublications(): Promise<Publication[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('publications').select('*').order('year', { ascending: false })
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
 * Fetch a single publication by ID or slug
 */
export async function getPublicationById(idOrSlug: string): Promise<Publication | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapPublication(data)
      }
    } catch (err) {
      console.warn('Supabase getPublicationById fallback:', err)
    }
  }
  return staticPublications.find(p => p.id === idOrSlug) || null
}

/**
 * Fetch all knowledge hub items from Supabase (falls back to static dataset)
 */
export async function getKnowledge(): Promise<KnowledgeItem[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('knowledge').select('*').order('year', { ascending: false })
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
 * Fetch a single knowledge item by ID or slug
 */
export async function getKnowledgeById(idOrSlug: string): Promise<KnowledgeItem | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('knowledge')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapKnowledge(data)
      }
    } catch (err) {
      console.warn('Supabase getKnowledgeById fallback:', err)
    }
  }
  return staticKnowledge.find(k => k.id === idOrSlug) || null
}

/**
 * Fetch all educational topics from Supabase (falls back to static dataset)
 */
export async function getEducation(): Promise<Topic[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('education').select('*')
      if (!error && data && data.length > 0) {
        return data.map(mapTopic)
      }
    } catch (err) {
      console.warn('Supabase getEducation fallback:', err)
    }
  }
  return staticTopics
}

/**
 * Fetch a single education topic by ID or slug
 */
export async function getEducationById(idOrSlug: string): Promise<Topic | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .maybeSingle()

      if (!error && data) {
        return mapTopic(data)
      }
    } catch (err) {
      console.warn('Supabase getEducationById fallback:', err)
    }
  }
  return staticTopics.find(t => t.id === idOrSlug) || null
}

/**
 * Fetch all multimedia items from Supabase (falls back to static dataset)
 */
export async function getMedia(): Promise<MediaItem[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('media').select('*')
      if (!error && data && data.length > 0) {
        return data.map(mapMedia)
      }
    } catch (err) {
      console.warn('Supabase getMedia fallback:', err)
    }
  }
  return staticMedia
}

/* -------------------------------------------------------------------------- */
/*                               AI PREPARATION                               */
/* -------------------------------------------------------------------------- */

/**
 * Structured context helper for AI conversational layers (Gemini / POLARIS AI)
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
