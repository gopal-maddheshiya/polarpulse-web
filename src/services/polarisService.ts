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

function cleanText(str: any): string {
  if (typeof str !== 'string') return ''
  return str.replace(/\s*\(Demo\)/gi, '').replace(/\s*\(Prototype\)/gi, '').trim()
}

function mapExpedition(row: any): Expedition {
  const fallback = staticExpeditions.find(e => e.id === row.id)
  const reports = Array.isArray(row.reports) && row.reports.length > 0 && row.reports.some((r: any) => r.url)
    ? row.reports.map((r: any) => ({
        ...r,
        title: cleanText(r.title),
        url: r.url || fallback?.reports.find(fr => fr.title.includes(cleanText(r.title)) || cleanText(r.title).includes(fr.title))?.url,
      }))
    : (fallback?.reports || [])

  return {
    id: row.id,
    title: cleanText(row.title) || fallback?.title || '',
    shortTitle: cleanText(row.short_title || row.title) || fallback?.shortTitle || '',
    region: row.region || fallback?.region || 'Antarctic',
    year: Number(row.year ?? fallback?.year ?? 2024),
    season: row.season || fallback?.season || 'Summer',
    vessel: cleanText(row.vessel) || fallback?.vessel,
    stations: Array.isArray(row.stations) && row.stations.length > 0 ? row.stations : (fallback?.stations || []),
    researchAreas: Array.isArray(row.research_areas) && row.research_areas.length > 0 ? row.research_areas : (fallback?.researchAreas || []),
    lead: cleanText(row.lead) || fallback?.lead || 'NCPOR · Ministry of Earth Sciences, Govt. of India',
    image: row.image_url || fallback?.image || '',
    overview: fallback && fallback.overview.length > (row.overview?.length || 0) ? fallback.overview : cleanText(row.overview),
    timeline: fallback?.timeline || (Array.isArray(row.timeline) ? row.timeline : []),
    scientists: fallback?.scientists || (Array.isArray(row.scientists) ? row.scientists : []),
    research: fallback?.research || (Array.isArray(row.objectives) ? row.objectives : []),
    reports: reports.length > 0 ? reports : (fallback?.reports || []),
    datasets: fallback?.datasets || (Array.isArray(row.datasets) ? row.datasets : []),
    publications: fallback?.publications || (Array.isArray(row.publications) ? row.publications : []),
    highlights: fallback?.highlights || (Array.isArray(row.highlights) ? row.highlights : []),
    sourceUrl: row.source_url || fallback?.sourceUrl,
    sourceLabel: row.source_label || fallback?.sourceLabel,
  }
}

function mapDataset(row: any): Dataset {
  const fallback = staticDatasets.find(d => d.id === row.id)
  return {
    id: row.id,
    title: cleanText(row.title) || fallback?.title || '',
    description: fallback && fallback.description.length > (row.description?.length || 0) ? fallback.description : cleanText(row.description),
    area: row.area || fallback?.area || 'Atmospheric Sciences',
    region: cleanText(row.region) || fallback?.region || 'Antarctic',
    year: Number(row.year ?? fallback?.year ?? 2024),
    format: row.format || fallback?.format || 'CSV',
    size: row.size || fallback?.size || '10 MB',
    coverage: cleanText(row.coverage) || fallback?.coverage || 'Current',
    relatedExpedition: row.related_expedition || fallback?.relatedExpedition || '',
    relatedPublication: row.related_publication || fallback?.relatedPublication,
    previewRows: fallback?.previewRows && fallback.previewRows.length >= 7 ? fallback.previewRows : (Array.isArray(row.preview_rows) ? row.preview_rows : []),
    downloadUrl: row.download_url || fallback?.downloadUrl,
    sourceUrl: row.source_url || fallback?.sourceUrl,
    sourceLabel: row.source_label || fallback?.sourceLabel,
  }
}

function mapPublication(row: any): Publication {
  const fallback = staticPublications.find(p => p.id === row.id)
  const isFakeDoi = typeof row.doi === 'string' && (row.doi.includes('10.0000') || !row.doi.includes('/'))
  return {
    id: row.id,
    title: cleanText(row.title) || fallback?.title || '',
    authors: Array.isArray(row.authors) ? row.authors.map(cleanText) : (fallback?.authors || []),
    year: Number(row.year ?? fallback?.year ?? 2024),
    journal: cleanText(row.journal) || fallback?.journal || 'Polar Science (Elsevier)',
    doi: isFakeDoi && fallback?.doi ? fallback.doi : (row.doi || fallback?.doi || ''),
    abstract: fallback && fallback.abstract.length > (row.abstract?.length || 0) ? fallback.abstract : cleanText(row.abstract),
    area: row.area || fallback?.area || 'Atmospheric Sciences',
    expedition: row.expedition || fallback?.expedition || '',
    dataset: row.dataset || fallback?.dataset,
    type: (row.type as any) || fallback?.type || 'Journal',
    sourceUrl: row.source_url || fallback?.sourceUrl,
    sourceLabel: row.source_label || fallback?.sourceLabel,
  }
}

function mapKnowledge(row: any): KnowledgeItem {
  const fallback = staticKnowledge.find(k => k.id === row.id)
  return {
    id: row.id,
    type: row.type || fallback?.type || 'Article',
    title: cleanText(row.title) || fallback?.title || '',
    excerpt: fallback && fallback.excerpt.length > (row.excerpt?.length || 0) ? fallback.excerpt : cleanText(row.excerpt),
    body: fallback && fallback.body.length > (row.body?.length || 0) ? fallback.body : cleanText(row.body),
    tags: Array.isArray(row.tags) ? row.tags.map(cleanText) : (fallback?.tags || []),
    category: cleanText(row.category) || fallback?.category || 'General',
    year: Number(row.year ?? fallback?.year ?? 2024),
    author: cleanText(row.author) || fallback?.author || 'NCPOR / MoES',
    source: row.source || fallback?.source,
    sourceUrl: row.source_url || fallback?.sourceUrl,
    sourceLabel: row.source_label || fallback?.sourceLabel,
    relatedExpedition: row.related_expedition || fallback?.relatedExpedition,
    relatedDataset: row.related_dataset || fallback?.relatedDataset,
    relatedPublication: row.related_publication || fallback?.relatedPublication,
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
