import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublications, getExpeditions, type Publication, type Expedition } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import { BookOpen, Search, X, ArrowRight, Copy, Check, ExternalLink, Filter, FileText, CheckCircle2, Compass } from 'lucide-react'
import { Reveal } from '../lib/reveal'
import { buildApaCitation, copyToClipboard, openDoi } from '../lib/actions'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'

const AREAS = ['All', 'Atmospheric Sciences', 'Oceanography', 'Glaciology', 'Biodiversity', 'Geology', 'Climate']

export default function Publications() {
  const { isHindi, trans } = useLanguage()
  const [pubsList, setPubsList] = useState<Publication[]>([])
  const [expeditionsList, setExpeditionsList] = useState<Expedition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const [year, setYear] = useState('All')
  const [area, setArea] = useState('All')
  const [expedition, setExpedition] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    Promise.all([
      getPublications(),
      getExpeditions(),
    ])
      .then(([pubs, exps]) => {
        if (mounted) {
          setPubsList(pubs)
          setExpeditionsList(exps)
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

  const years = useMemo(() => ['All', ...Array.from(new Set(pubsList.map(p => p.year))).sort((a, b) => b - a).map(String)], [pubsList])

  const filtered = useMemo(() => pubsList.filter(p => {
    if (year !== 'All' && String(p.year) !== year) return false
    if (area !== 'All' && p.area !== area) return false
    if (expedition !== 'All' && p.expedition !== expedition) return false
    if (q.trim()) {
      const t = q.toLowerCase()
      return p.title.toLowerCase().includes(t) || p.abstract.toLowerCase().includes(t) || p.authors.join(' ').toLowerCase().includes(t) || p.journal.toLowerCase().includes(t)
    }
    return true
  }), [pubsList, q, year, area, expedition])

  const hasFilters = q.trim() !== '' || year !== 'All' || area !== 'All' || expedition !== 'All'

  const handleCopyCitation = async (p: Publication, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const cit = buildApaCitation(p)
    const ok = await copyToClipboard(cit)
    if (ok) {
      setCopiedId(p.id)
      setTimeout(() => setCopiedId(null), 1800)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow={trans('Scholarly Research Library', 'विद्वत्तापूर्ण शोध पुस्तकालय')}
        title={trans('Peer-Reviewed Publications', 'सहकर्मी-समीक्षित शोध प्रकाशन')}
        sub={trans(
          'Index of peer-reviewed journal papers, expedition monographs, and technical reports authored by Indian polar scientists across NCPOR, NIO, IITM, and partner universities.',
          'एनसीपीओआर, एनआईओ, आईआईटीएम और सहयोगी विश्वविद्यालयों के भारतीय ध्रुवीय वैज्ञानिकों द्वारा रचित शोध पत्रों, मोनोग्राफ और तकनीकी रिपोर्टों की अनुक्रमणिका।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50 border-sky-300 text-sky-900 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" /> {trans('SCOPUS & WEB OF SCIENCE INDEXED', 'स्कोपास एवं वेब ऑफ साइंस अनुक्रमित')}
          </span>
          <span className="editorial-badge-light">
            {trans('OPEN ACCESS DOI REPOSITORY', 'मुक्त पहुँच डीओआई रिपॉजिटरी')}
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Reveal>
            {/* Search and Filters Bar */}
            <div className="editorial-frame p-5 mb-8 bg-white space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="flex-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder={trans('Search by title, author, keyword, or journal…', 'शीर्षक, लेखक, कीवर्ड या जर्नल द्वारा खोजें…')}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 font-sans"
                  />
                  {q && (
                    <button onClick={() => setQ('')} className="text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filters Dropdowns */}
                <div className="flex items-center gap-2">
                  <select
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  >
                    {AREAS.map(a => (
                      <option key={a} value={a}>
                        {a === 'All' ? trans('All Disciplines', 'सभी विषय') : (a === 'Atmospheric Sciences' ? trans('Atmospheric Sciences', 'वायुमंडलीय विज्ञान') : a === 'Oceanography' ? trans('Oceanography', 'समुद्र विज्ञान') : a === 'Glaciology' ? trans('Glaciology', 'हिमनद विज्ञान') : a === 'Geology' ? trans('Geology', 'भूविज्ञान') : a === 'Biodiversity' ? trans('Biodiversity', 'जैव विविधता') : a === 'Climate' ? trans('Climate', 'जलवायु') : a)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>
                        {y === 'All' ? trans('All Years', 'सभी वर्ष') : (isHindi ? `वर्ष: ${y}` : `Year: ${y}`)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={expedition}
                    onChange={e => setExpedition(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 max-w-[160px]"
                  >
                    <option value="All">All Expeditions</option>
                    {expeditionsList.map(exp => (
                      <option key={exp.id} value={exp.id}>
                        {exp.shortTitle}
                      </option>
                    ))}
                  </select>
                </div>

                {hasFilters && (
                  <button
                    onClick={() => { setQ(''); setYear('All'); setArea('All'); setExpedition('All') }}
                    className="btn-ghost !py-2 !px-3 text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reset
                  </button>
                )}
              </div>

              {/* Discipline Quick Filters */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-2">Discipline:</span>
                {AREAS.map(a => (
                  <button
                    key={a}
                    onClick={() => setArea(a)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-lg transition font-medium',
                      area === a 
                        ? 'bg-polar-950 text-white font-semibold' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-700">Loading polar knowledge...</p>
            </div>
          ) : error ? (
            <EmptyState
              title="Unable to load publications"
              message={error}
              action={<button onClick={() => window.location.reload()} className="btn-outline">Retry</button>}
            />
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-5">
                <span>Displaying {filtered.length} indexed scientific publication{filtered.length === 1 ? '' : 's'}</span>
                <span>NCPOR REPOSITORY · PEER REVIEWED</span>
              </div>

              {/* Publications List */}
              {filtered.length === 0 ? (
                <EmptyState
                  title="No publications match your criteria"
                  message="Try adjusting your keyword query or resetting the discipline and year filters."
                  action={
                    <button
                      onClick={() => { setQ(''); setYear('All'); setArea('All'); setExpedition('All') }}
                      className="btn-outline"
                    >
                      Reset filters
                    </button>
                  }
                />
              ) : (
                <div className="space-y-4">
                  {filtered.map((pub, idx) => (
                    <Reveal key={pub.id} delay={idx * 35}>
                      <div className="group bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="space-y-2 flex-1">
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="editorial-badge-light bg-sky-50 border-sky-200 text-sky-900 font-semibold !text-[10px]">
                              {pub.area}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {pub.journal} ({pub.year})
                            </span>
                            {pub.doi && (
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                DOI: {pub.doi}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <Link to={`/publications/${pub.id}`}>
                            <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition leading-snug">
                              {pub.title}
                            </h3>
                          </Link>

                          {/* Authors */}
                          <p className="text-xs text-slate-500 font-mono">
                            {pub.authors.join(' · ')}
                          </p>

                          {/* Abstract preview */}
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {pub.abstract}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 md:flex-col md:items-end">
                          <button
                            onClick={(e) => handleCopyCitation(pub, e)}
                            className="btn-outline !py-2 !px-3 text-xs inline-flex items-center gap-1.5"
                            title="Copy APA Citation"
                          >
                            {copiedId === pub.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-medium">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>Cite</span>
                              </>
                            )}
                          </button>

                          <Link
                            to={`/publications/${pub.id}`}
                            className="btn-primary !py-2 !px-3.5 text-xs inline-flex items-center gap-1"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </div>
  )
}
