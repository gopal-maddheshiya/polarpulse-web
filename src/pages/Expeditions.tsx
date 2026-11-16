import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExpeditions, type Expedition } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import { ArrowRight, Compass, Filter, X, Calendar, MapPin, Anchor, Users, ShieldCheck } from 'lucide-react'
import { Reveal } from '../lib/reveal'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'
import SEO from '../components/SEO'

const REGIONS = ['All', 'Antarctic', 'Arctic', 'Southern Ocean', 'Himalaya'] as const
const AREAS = ['All', 'Atmospheric Sciences', 'Oceanography', 'Glaciology', 'Geology', 'Biodiversity', 'Climate'] as const

export default function Expeditions() {
  const { isHindi, trans } = useLanguage()
  const [expeditions, setExpeditions] = useState<Expedition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [year, setYear] = useState<string>('All')
  const [region, setRegion] = useState<typeof REGIONS[number]>('All')
  const [area, setArea] = useState<typeof AREAS[number]>('All')

  useEffect(() => {
    let mounted = true
    getExpeditions()
      .then(data => {
        if (mounted) {
          setExpeditions(data)
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

  const years = useMemo(() => {
    const set = new Set(expeditions.map(e => e.year))
    return ['All', ...Array.from(set).sort((a, b) => b - a).map(String)]
  }, [expeditions])

  const filtered = useMemo(() => {
    return expeditions.filter(e => {
      if (year !== 'All' && String(e.year) !== year) return false
      if (region !== 'All' && e.region !== region) return false
      if (area !== 'All' && !e.researchAreas.includes(area)) return false
      return true
    })
  }, [expeditions, year, region, area])

  const filtersActive = year !== 'All' || region !== 'All' || area !== 'All'

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <SEO
        title={trans("44 Indian Polar Expeditions Archive (1981–2025)", "44 भारतीय ध्रुवीय अभियानों का पुरालेख (1981–2025)")}
        description="The sovereign operational record of 44 Indian Scientific Expeditions to Antarctica (ISEA), Arctic campaigns at Ny-Ålesund, Southern Ocean cruises, and Himalayan expeditions."
        canonical="/expeditions"
        keywords={['Indian Antarctic Expedition', 'ISEA', '44th IAE', 'Ny-Alesund', 'Southern Ocean Cruise', 'NCPOR', 'MoES', 'Bharati', 'Maitri']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Expeditions', url: '/expeditions' }
        ]}
      />
      <PageHeader
        eyebrow={trans('National Polar Expeditions', 'राष्ट्रीय ध्रुवीय अभियान')}
        title={trans("India's Polar Expedition Registry", 'भारत का ध्रुवीय अभियान रजिस्टर')}
        sub={trans(
          'The complete sovereign operational record of Indian Scientific Expeditions to Antarctica, the Arctic, the Southern Ocean, and the High Altitude Himalayas since 1981.',
          '1981 से अंटार्कटिका, आर्कटिक, दक्षिणी महासागर और उच्च तुंगता हिमालय में भारतीय वैज्ञानिक अभियानों का पूर्ण संप्रभु परिचालन रिकॉर्ड।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-white/90 border-sky-300 text-sky-950 font-bold shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-cyan-600 animate-spin-slow" /> {trans('44 CONSECUTIVE ANTARCTIC CAMPAIGNS', '44 निरंतर अंटार्कटिक अभियान')}
          </span>
          <span className="editorial-badge-light bg-white/90 border-sky-200 text-slate-700 font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {trans('NCPOR LOGISTICS ARCHIVE', 'एनसीपीओआर लॉजिस्टिक्स पुरालेख')}
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Reveal>
            {/* Filter controls */}
            <div className="rounded-3xl border border-sky-200/90 bg-white/95 p-6 mb-8 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  <Filter className="w-4 h-4 text-cyan-700" />
                  <span>{trans('Filter Expedition Logs', 'अभियान लॉग फ़िल्टर करें')}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div>
                    <select
                      value={year}
                      onChange={e => setYear(e.target.value)}
                      className="rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                    >
                      {years.map(y => (
                        <option key={y} value={y}>
                          {y === 'All' ? trans('All Voyage Years', 'सभी यात्रा वर्ष') : (isHindi ? `वर्ष: ${y}` : `Year: ${y}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={region}
                      onChange={e => setRegion(e.target.value as any)}
                      className="rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                    >
                      {REGIONS.map(r => (
                        <option key={r} value={r}>
                          {r === 'All' ? trans('All Polar Regions', 'सभी ध्रुवीय क्षेत्र') : (r === 'Antarctic' ? trans('Antarctic', 'अंटार्कटिक') : r === 'Arctic' ? trans('Arctic', 'आर्कटिक') : r === 'Southern Ocean' ? trans('Southern Ocean', 'दक्षिणी महासागर') : r === 'Himalaya' ? trans('Himalaya', 'हिमालय') : r)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={area}
                      onChange={e => setArea(e.target.value as any)}
                      className="rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                    >
                      {AREAS.map(a => (
                        <option key={a} value={a}>
                          {a === 'All' ? trans('All Science Disciplines', 'सभी वैज्ञानिक विषय') : (a === 'Atmospheric Sciences' ? trans('Atmospheric Sciences', 'वायुमंडलीय विज्ञान') : a === 'Oceanography' ? trans('Oceanography', 'समुद्र विज्ञान') : a === 'Glaciology' ? trans('Glaciology', 'हिमनद विज्ञान') : a === 'Geology' ? trans('Geology', 'भूविज्ञान') : a === 'Biodiversity' ? trans('Biodiversity', 'जैव विविधता') : a === 'Climate' ? trans('Climate', 'जलवायु') : a)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {filtersActive && (
                    <button
                      onClick={() => { setYear('All'); setRegion('All'); setArea('All') }}
                      className="btn-ghost !py-2 !px-3 text-xs text-slate-600 hover:text-slate-950 font-semibold inline-flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> {trans('Clear', 'साफ़ करें')}
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Region Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-sky-100">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 font-semibold">{trans('Region:', 'क्षेत्र:')}</span>
                {REGIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-xl transition font-semibold',
                      region === r
                        ? 'bg-slate-950 text-white shadow-xs font-bold'
                        : 'bg-sky-50 text-slate-700 hover:bg-sky-100/80 border border-sky-200/80'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-sky-200 text-cyan-600 animate-spin-slow mb-3 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Loading polar knowledge archive...</p>
            </div>
          ) : error ? (
            <EmptyState
              title="Unable to load expeditions"
              message={error}
              action={
                <button onClick={() => window.location.reload()} className="btn-outline">
                  Retry
                </button>
              }
            />
          ) : (
            <>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-5">
                <span>Displaying {filtered.length} documented expedition mission{filtered.length === 1 ? '' : 's'}</span>
                <span className="text-cyan-800 font-bold">NCPOR SOVEREIGN POLAR REGISTRY</span>
              </div>

              {filtered.length === 0 ? (
                <EmptyState
                  title="No expeditions found"
                  message="No expedition logs match your current filter selection. Try adjusting the region or discipline."
                  action={
                    <button
                      onClick={() => { setYear('All'); setRegion('All'); setArea('All') }}
                      className="btn-outline"
                    >
                      Reset filters
                    </button>
                  }
                />
              ) : (
                <div data-tour="expeditions-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((exp, idx) => (
                    <Reveal key={exp.id} delay={idx * 50}>
                      <Link
                        to={`/expeditions/${exp.id}`}
                        data-tour={idx === 0 ? "expedition-card-featured" : undefined}
                        className="group flex flex-col h-full bg-white/95 rounded-3xl border border-sky-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] card-hover hover:border-cyan-400 overflow-hidden"
                      >
                        {/* Image banner */}
                        <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                            <span className="editorial-badge !text-[10px] !bg-slate-950/80 !border-white/20 !text-cyan-300 backdrop-blur-md font-mono font-bold">
                              {exp.region}
                            </span>
                            <span className="editorial-badge !text-[10px] !bg-white/90 !text-slate-900 backdrop-blur-md font-mono font-bold">
                              {exp.year} · {exp.season}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-bold block">
                              {exp.shortTitle}
                            </span>
                            <h3 className="font-display text-base font-bold leading-tight line-clamp-1 group-hover:text-cyan-300 transition">
                              {exp.title}
                            </h3>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {exp.overview}
                          </p>

                          {/* Key stats */}
                          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                            {exp.vessel && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Anchor className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                                <span className="font-mono text-[11px] truncate">{exp.vessel}</span>
                              </div>
                            )}
                            {exp.stations.length > 0 && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                                <span className="text-[11px] truncate font-medium">{exp.stations.join(', ')}</span>
                              </div>
                            )}
                            {exp.scientists.length > 0 && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="text-[11px]">
                                  {exp.scientists[0].name} ({exp.scientists[0].role})
                                  {exp.scientists.length > 1 ? (isHindi ? ` +${exp.scientists.length - 1} वैज्ञानिक` : ` +${exp.scientists.length - 1} scientists`) : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Disciplines & link */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {exp.researchAreas.slice(0, 2).map(a => (
                                <span key={a} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-50 text-cyan-900 border border-sky-200/80 font-semibold">
                                  {a}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-cyan-700 group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                              {trans('Log', 'लॉग')} <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
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
