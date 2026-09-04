import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, FileText, Database, BookOpen, Image as ImageIcon, GraduationCap } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import { useLanguage } from '../context/LanguageContext'
import {
  getExpeditions,
  getDatasets,
  getPublications,
  getMedia,
  getEducation,
  type Expedition,
  type Dataset,
  type Publication,
  type MediaItem,
  type Topic,
} from '../services/polarisService'
import { expeditions as defaultExpeditions } from '../data/expeditions'
import { datasets as defaultDatasets } from '../data/datasets'
import { publications as defaultPublications } from '../data/publications'
import { media as defaultMedia } from '../data/media'
import { topics as defaultTopics } from '../data/education'

type Result = { id: string; title: string; subtitle: string; to: string; kind: string; icon: any }

const ICON: Record<string, any> = {
  Expedition: FileText,
  Dataset: Database,
  Publication: BookOpen,
  Media: ImageIcon,
  Education: GraduationCap,
}

export default function SearchModal() {
  const { isOpen, closeSearch, query, setQuery } = useSearch()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const [expeditionsList, setExpeditionsList] = useState<Expedition[]>(defaultExpeditions)
  const [datasetsList, setDatasetsList] = useState<Dataset[]>(defaultDatasets)
  const [pubsList, setPubsList] = useState<Publication[]>(defaultPublications)
  const [mediaList, setMediaList] = useState<MediaItem[]>(defaultMedia)
  const [topicsList, setTopicsList] = useState<Topic[]>(defaultTopics)

  useEffect(() => {
    let mounted = true
    Promise.all([
      getExpeditions(),
      getDatasets(),
      getPublications(),
      getMedia(),
      getEducation(),
    ])
      .then(([exps, ds, pubs, med, top]) => {
        if (mounted) {
          setExpeditionsList(exps)
          setDatasetsList(ds)
          setPubsList(pubs)
          setMediaList(med)
          setTopicsList(top)
        }
      })
      .catch(console.warn)

    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setQ(query)
    } else {
      setQ('')
    }
  }, [isOpen, query])

  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [isOpen])

  const results = useMemo<Result[]>(() => {
    if (!q.trim()) return []
    const term = q.toLowerCase()
    const out: Result[] = []
    expeditionsList.forEach(e => {
      if (e.title.toLowerCase().includes(term) || e.overview.toLowerCase().includes(term) || e.researchAreas.join(' ').toLowerCase().includes(term)) {
        out.push({ id: e.id, title: e.title, subtitle: `${e.region} · ${e.year}`, to: `/expeditions/${e.id}`, kind: 'Expedition', icon: ICON.Expedition })
      }
    })
    datasetsList.forEach(d => {
      if (d.title.toLowerCase().includes(term) || d.description.toLowerCase().includes(term) || d.area.toLowerCase().includes(term)) {
        out.push({ id: d.id, title: d.title, subtitle: `${d.area} · ${d.year}`, to: `/datasets/${d.id}`, kind: 'Dataset', icon: ICON.Dataset })
      }
    })
    pubsList.forEach(p => {
      if (p.title.toLowerCase().includes(term) || p.abstract.toLowerCase().includes(term) || p.authors.join(' ').toLowerCase().includes(term)) {
        out.push({ id: p.id, title: p.title, subtitle: `${p.journal} · ${p.year}`, to: `/publications/${p.id}`, kind: 'Publication', icon: ICON.Publication })
      }
    })
    mediaList.forEach(m => {
      if (m.title.toLowerCase().includes(term) || m.caption.toLowerCase().includes(term)) {
        out.push({ id: m.id, title: m.title, subtitle: `${m.type} · ${m.region ?? ''}`, to: `/media?item=${m.id}`, kind: 'Media', icon: ICON.Media })
      }
    })
    topicsList.forEach(t => {
      if (t.title.toLowerCase().includes(term) || t.simple.toLowerCase().includes(term)) {
        out.push({ id: t.id, title: t.title, subtitle: 'Education topic', to: `/education?topic=${t.id}`, kind: 'Education', icon: ICON.Education })
      }
    })
    return out
  }, [q, expeditionsList, datasetsList, pubsList, mediaList, topicsList])

  const grouped = useMemo(() => {
    const groups: Record<string, Result[]> = {}
    results.forEach(r => {
      groups[r.kind] = groups[r.kind] || []
      groups[r.kind].push(r)
    })
    return groups
  }, [results])

  const { isHindi, trans } = useLanguage()

  if (!isOpen) return null

  const suggestedChips = isHindi
    ? ['समुद्री बर्फ', 'मैत्री स्टेशन', 'ब्लैक कार्बन', 'कोंग्सफ्योर्डन', 'भारती स्टेशन', 'ग्लेशियर मास बैलेंस']
    : ['Sea ice', 'Maitri', 'Black carbon', 'Kongsfjorden', 'Bharati', 'Glacier mass balance']

  const kindLabels: Record<string, string> = {
    Expedition: isHindi ? 'वैज्ञानिक अभियान' : 'Expedition',
    Dataset: isHindi ? 'शोध डेटासेट' : 'Dataset',
    Publication: isHindi ? 'शोध प्रकाशन' : 'Publication',
    Media: isHindi ? 'मीडिया गैलरी' : 'Media',
    Education: isHindi ? 'शिक्षा मॉड्यूल' : 'Education',
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-polar-950/40 backdrop-blur-sm" onClick={closeSearch} />
      <div className="relative mx-auto mt-16 sm:mt-24 w-[min(720px,calc(100vw-32px))] rounded-2xl bg-white shadow-2xl border border-polar-100 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-polar-100">
          <Search className="w-5 h-5 text-polar-500" />
          <input
            autoFocus
            value={q}
            onChange={e => { setQ(e.target.value); setQuery(e.target.value) }}
            placeholder={trans(
              'Search expeditions, datasets, publications, media, education…',
              'अभियान, डेटासेट, शोध पत्र, मीडिया, शिक्षा मॉड्यूल खोजें…'
            )}
            className="flex-1 bg-transparent outline-none text-base placeholder:text-polar-400"
          />
          <button onClick={closeSearch} aria-label="Close" className="p-1 text-polar-500 hover:text-polar-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q.trim() && (
            <div className="p-6 text-sm text-polar-500">
              <div className="font-mono text-[10px] uppercase tracking-widest text-polar-400 mb-3">
                {trans('Suggested', 'सुझाए गए खोज शब्द')}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedChips.map(s => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="chip hover:bg-polar-100 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.trim() && results.length === 0 && (
            <div className="p-8 text-center text-sm text-polar-500">
              {trans(
                `No results for “${q}”. Try a broader term, a research area, or a station name.`,
                `“${q}” के लिए कोई परिणाम नहीं मिला। कोई अन्य शब्द, अनुसंधान क्षेत्र या स्टेशन का नाम खोजें।`
              )}
            </div>
          )}

          {Object.entries(grouped).map(([kind, items]) => {
            const Icon = ICON[kind] || FileText
            return (
              <div key={kind} className="border-t border-polar-100 first:border-t-0">
                <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-polar-400 bg-polar-50/60">
                  {kindLabels[kind] || kind}
                </div>
                <ul>
                  {items.slice(0, 5).map(r => (
                    <li key={r.id}>
                      <button
                        onClick={() => { navigate(r.to); closeSearch() }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-polar-50/70 transition"
                      >
                        <Icon className="w-4 h-4 text-polar-500" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-polar-900 truncate">{r.title}</div>
                          <div className="text-xs text-polar-500 truncate">{r.subtitle}</div>
                        </div>
                        <Link to={r.to} onClick={closeSearch} className="text-xs text-polar-500 hover:text-polar-900">
                          {trans('Open', 'खोलें')}
                        </Link>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="border-t border-polar-100 bg-polar-50/60 px-4 py-2 flex items-center justify-between text-[11px] text-polar-500 font-mono">
          <span>{trans('↵ open · esc close', '↵ खोलें · esc बंद करें')}</span>
          <span>{trans('POLARIS search', 'पोलारिस खोज')}</span>
        </div>
      </div>
    </div>
  )
}
