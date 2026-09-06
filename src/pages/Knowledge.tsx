import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getKnowledge, type KnowledgeItem } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import { Search, Tag, X, ArrowRight, BookOpenCheck, FileText, Database, BookOpen, GraduationCap, Newspaper, Compass, Layers, ShieldCheck } from 'lucide-react'
import { Reveal } from '../lib/reveal'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'

const TYPES = ['All', 'Report', 'Article', 'Dataset', 'Publication', 'Educational', 'News', 'Field Story'] as const
const CATEGORIES = ['All', 'Reports', 'Articles', 'Datasets', 'Publications', 'Educational', 'News', 'Field Stories'] as const

const ICONS: Record<string, any> = {
  Report: FileText,
  Article: BookOpenCheck,
  Dataset: Database,
  Publication: BookOpen,
  Educational: GraduationCap,
  News: Newspaper,
  'Field Story': Compass,
}

export default function Knowledge() {
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const [type, setType] = useState<typeof TYPES[number]>('All')
  const [cat, setCat] = useState<typeof CATEGORIES[number]>('All')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    getKnowledge()
      .then(data => {
        if (mounted) {
          setKnowledgeList(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Unable to load this content. Please try again.')
          setLoading(false)
        }
      })
    return () => { mounted = false }
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    knowledgeList.forEach(k => k.tags.forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [knowledgeList])

  const filtered = useMemo(() => {
    return knowledgeList.filter(k => {
      if (type !== 'All' && k.type !== type) return false
      if (cat !== 'All' && k.category !== cat) return false
      if (activeTag && !k.tags.includes(activeTag)) return false
      if (q.trim()) {
        const t = q.toLowerCase()
        return k.title.toLowerCase().includes(t) || k.excerpt.toLowerCase().includes(t) || k.body.toLowerCase().includes(t) || k.tags.join(' ').toLowerCase().includes(t)
      }
      return true
    })
  }, [knowledgeList, q, type, cat, activeTag])

  const { isHindi, trans } = useLanguage()
  const hasFilters = q.trim() !== '' || type !== 'All' || cat !== 'All' || activeTag !== null

  const TYPE_LABELS: Record<string, string> = {
    All: trans('All Resource Types', 'सभी संसाधन प्रकार'),
    Report: trans('Technical Report', 'तकनीकी रिपोर्ट'),
    Article: trans('Research Article', 'शोध लेख'),
    Dataset: trans('Scientific Dataset', 'वैज्ञानिक डेटासेट'),
    Publication: trans('Peer Publication', 'सहकर्मी प्रकाशन'),
    Educational: trans('Educational Module', 'शैक्षणिक मॉड्यूल'),
    News: trans('News & Dispatch', 'समाचार एवं विज्ञप्ति'),
    'Field Story': trans('Field Story', 'फ़ील्ड डायरी'),
  }

  const CAT_LABELS: Record<string, string> = {
    All: trans('All Categories', 'सभी श्रेणियां'),
    Reports: trans('Reports', 'रिपोर्ट्स'),
    Articles: trans('Articles', 'शोध लेख'),
    Datasets: trans('Datasets', 'डेटासेट्स'),
    Publications: trans('Publications', 'प्रकाशन'),
    Educational: trans('Educational', 'शैक्षणिक'),
    News: trans('News', 'समाचार'),
    'Field Stories': trans('Field Stories', 'फ़ील्ड कहानियां'),
  }

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <PageHeader
        eyebrow={trans('Open Knowledge Repository', 'खुला ध्रुवीय ज्ञान भंडार')}
        title={trans('Polar Knowledge Hub', 'ध्रुवीय ज्ञान एवं अनुसंधान केंद्र')}
        sub={trans(
          'The consolidated digital archive of polar research papers, expedition reports, educational curriculums, data catalogs, and field science dispatches.',
          'ध्रुवीय अनुसंधान पत्रों, अभियान रिपोर्टों, शैक्षणिक पाठ्यक्रमों, डेटा कैटलॉग और क्षेत्रीय विज्ञान अभियानों का एकीकृत राष्ट्रीय डिजिटल संग्रह।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50/90 border-sky-300 text-sky-900 font-semibold px-3 py-1.5 rounded-full shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" /> {trans('MULTI-DISCIPLINARY REPOSITORY', 'बहुविषयक ज्ञान भंडार')}
          </span>
          <span className="editorial-badge-light bg-white/80 border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-700 inline mr-1" /> {trans('NCPOR CURATED & VERIFIED', 'एनसीपीओआर द्वारा सत्यापित एवं क्यूरेटेड')}
          </span>
        </div>
      </PageHeader>

      <Section className="pb-20">
        <Container>
          <Reveal>
            {/* Search and Filters Bar */}
            <div className="p-6 mb-8 bg-white/95 border border-sky-200/90 rounded-2xl shadow-soft space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="flex-1 flex items-center gap-2 rounded-xl border border-sky-200/80 bg-sky-50/30 px-3.5 py-2.5 min-w-[240px] focus-within:border-sky-400 transition-colors">
                  <Search className="w-4 h-4 text-sky-600" />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder={trans('Search articles, reports, field stories, tutorials…', 'शोध लेख, तकनीकी रिपोर्ट, फील्ड कहानियां, ट्यूटोरियल खोजें...')}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 font-sans text-slate-800"
                  />
                  {q && (
                    <button onClick={() => setQ('')} className="text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-2">
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="rounded-xl border border-sky-200/80 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    {TYPES.map(t => (
                      <option key={t} value={t}>
                        {TYPE_LABELS[t] || t}
                      </option>
                    ))}
                  </select>

                  <select
                    value={cat}
                    onChange={e => setCat(e.target.value as any)}
                    className="rounded-xl border border-sky-200/80 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {CAT_LABELS[c] || c}
                      </option>
                    ))}
                  </select>
                </div>

                {hasFilters && (
                  <button
                    onClick={() => { setQ(''); setType('All'); setCat('All'); setActiveTag(null) }}
                    className="btn-ghost !py-2 !px-3 text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> {trans('Reset', 'रीसेट')}
                  </button>
                )}
              </div>

              {/* Tags Horizontal Scroll */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-sky-100">
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-900 font-bold mr-2">{trans('Topics:', 'प्रमुख विषय:')}</span>
                {allTags.slice(0, 10).map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(activeTag === t ? null : t)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-lg transition-all font-semibold',
                      activeTag === t
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-sky-50/60 text-slate-700 hover:bg-sky-100/80'
                    )}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय ज्ञान भंडार लोड हो रहा है...')}</p>
            </div>
          ) : error ? (
            <EmptyState
              title={trans('Unable to load knowledge repository', 'ज्ञान भंडार लोड करने में असमर्थ')}
              message={error}
              action={<button onClick={() => window.location.reload()} className="btn-outline">{trans('Retry', 'पुनः प्रयास करें')}</button>}
            />
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-5">
                <span>{trans(`Displaying ${filtered.length} curated polar resource${filtered.length === 1 ? '' : 's'}`, `${filtered.length} सत्यापित ध्रुवीय संसाधन प्रदर्शित`)}</span>
                <span className="text-sky-800 font-semibold">{trans('POLARIS KNOWLEDGE INDEX', 'पोलारिस ज्ञान सूचकांक')}</span>
              </div>

              {/* Cards Grid */}
              {filtered.length === 0 ? (
                <EmptyState
                  title={trans('No resources found', 'कोई संसाधन नहीं मिला')}
                  message={trans(
                    'No knowledge hub items match your current filter selection. Try clearing your search or filters.',
                    'वर्तमान फ़िल्टर या खोज के अनुसार कोई ज्ञान संसाधन उपलब्ध नहीं है। कृपया नए शब्द खोजें।'
                  )}
                  action={
                    <button
                      onClick={() => { setQ(''); setType('All'); setCat('All'); setActiveTag(null) }}
                      className="btn-outline"
                    >
                      {trans('Reset filters', 'फ़िल्टर रीसेट करें')}
                    </button>
                  }
                />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((item, idx) => {
                    const Icon = ICONS[item.type] || BookOpen
                    return (
                      <Reveal key={item.id} delay={idx * 30}>
                        <Link
                          to={`/knowledge/${item.id}`}
                          className="group flex flex-col justify-between h-full bg-white/95 rounded-2xl border border-sky-200/90 shadow-soft hover:shadow-lg hover:border-sky-300 transition-all duration-300 p-6 hover:-translate-y-0.5"
                        >
                          <div className="space-y-3">
                            {/* Card Top */}
                            <div className="flex items-center justify-between">
                              <span className="editorial-badge-light bg-sky-50 border-sky-200 text-sky-900 font-semibold !text-[10px] inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full">
                                <Icon className="w-3 h-3 text-sky-600" />
                                <span>{TYPE_LABELS[item.type] || item.type}</span>
                              </span>
                              <span className="text-[11px] font-mono text-slate-500 font-medium">
                                {item.year}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-sky-950 transition-colors leading-snug">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-sans">
                              {item.excerpt}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="pt-4 mt-4 border-t border-sky-100 space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-50/70 text-slate-600 border border-sky-100">
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1">
                              <span className="text-slate-500 text-[11px] truncate max-w-[160px] font-medium">
                                {item.author}
                              </span>
                              <span className="font-semibold text-sky-800 group-hover:text-sky-950 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                                {trans('Read Article', 'लेख पढ़ें')} <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </div>
  )
}
