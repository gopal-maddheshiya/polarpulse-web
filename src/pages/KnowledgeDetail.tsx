import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getKnowledgeById, getExpeditionById, getDatasetById, getPublicationById, type KnowledgeItem, type Expedition, type Dataset, type Publication } from '../services/polarisService'
import { ArrowLeft, Tag, FileText, Database, BookOpen, Compass, Calendar, User2, GraduationCap, Newspaper, BookOpenCheck, ExternalLink } from 'lucide-react'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { Reveal } from '../lib/reveal'
import { useLanguage } from '../context/LanguageContext'

const ICONS: Record<string, any> = {
  Report: FileText,
  Article: BookOpenCheck,
  Dataset: Database,
  Publication: BookOpen,
  Educational: GraduationCap,
  News: Newspaper,
  'Field Story': Compass,
}

export default function KnowledgeDetail() {
  const { isHindi, trans } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [k, setKnowledge] = useState<KnowledgeItem | null>(null)
  const [exp, setExp] = useState<Expedition | null>(null)
  const [ds, setDataset] = useState<Dataset | null>(null)
  const [pub, setPublication] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    if (!id) return

    getKnowledgeById(id)
      .then(async item => {
        if (!mounted) return
        setKnowledge(item)
        if (item) {
          const [expData, dsData, pubData] = await Promise.all([
            item.relatedExpedition ? getExpeditionById(item.relatedExpedition) : Promise.resolve(null),
            item.relatedDataset ? getDatasetById(item.relatedDataset) : Promise.resolve(null),
            item.relatedPublication ? getPublicationById(item.relatedPublication) : Promise.resolve(null),
          ])
          if (mounted) {
            setExp(expData)
            setDataset(dsData)
            setPublication(pubData)
          }
        }
        setLoading(false)
      })
      .catch(() => {
        if (mounted) {
          setError('Unable to load this content. Please try again.')
          setLoading(false)
        }
      })

    return () => { mounted = false }
  }, [id])

  if (loading) {
    return (
      <Container className="py-24 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3">
          <Compass className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय संसाधन लोड हो रहा है...')}</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Unable to load resource', 'संसाधन लोड करने में असमर्थ')}
          message={error}
          action={<Link to="/knowledge" className="btn-outline">{trans('Back to Knowledge Hub', 'ज्ञान केंद्र पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  if (!k) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Polar knowledge not found', 'संसाधन नहीं मिला')}
          message={trans('This resource may have been moved or is not part of the active database.', 'खोजा गया संसाधन उपलब्ध नहीं है या डेटाबेस से हटाया गया है।')}
          action={<Link to="/knowledge" className="btn-outline">{trans('Back to Knowledge Hub', 'ज्ञान केंद्र पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  const Icon = ICONS[k.type] || BookOpen

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      {/* Luxury Hero Banner */}
      <div className="bg-gradient-to-b from-sky-100/80 via-sky-50/50 to-[#edf5fb] border-b border-sky-200/90 relative overflow-hidden">
        {/* Slow-rotating celestial orbit watermark */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-sky-300/40 pointer-events-none animate-[spin_60s_linear_infinite]" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-dashed border-sky-400/30 pointer-events-none animate-[spin_90s_linear_infinite_reverse]" />

        <Container className="py-12 sm:py-16 relative z-10">
          <Reveal>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-sky-800 hover:text-sky-950 mb-4 font-semibold transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> {trans('Back to Knowledge Hub', 'ज्ञान केंद्र पर वापस जाएं')}
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-sky-800 font-bold bg-sky-50/80 border border-sky-200/80 inline-block px-3 py-1 rounded-full">
              <Icon className="w-3.5 h-3.5 inline mr-1 text-sky-600" />
              <span>{k.type} · {k.category} · {k.year}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mt-4 max-w-4xl leading-[1.15]">{k.title}</h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">{k.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5"><User2 className="w-3.5 h-3.5 text-sky-600" /><span className="font-medium text-slate-700">{k.author}</span></div>
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-600" /><span className="font-medium text-slate-700">{k.year}</span></div>
            </div>
            {k.sourceUrl && (
              <div className="mt-6">
                <a
                  href={k.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs font-mono text-sky-900 hover:text-sky-950 rounded-xl bg-white/90 shadow-xs font-semibold"
                >
                  <span>{trans('Verify Official Source', 'आधिकारिक स्रोत सत्यापित करें')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                </a>
              </div>
            )}
          </Reveal>
        </Container>
      </div>

      <Section className="py-12 pb-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Article body */}
              <Reveal>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-soft space-y-5 text-base">
                  <p className="text-lg text-slate-700 leading-relaxed font-serif italic border-l-3 border-sky-500 bg-sky-50/50 p-4 rounded-r-xl">
                    "{k.excerpt}"
                  </p>
                  <div className="text-slate-800 leading-relaxed font-sans font-normal space-y-4 whitespace-pre-line">
                    {k.body}
                  </div>
                </div>
              </Reveal>

              {/* Tags */}
              <Reveal>
                <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-soft flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-sky-900 font-bold mr-2">{trans('Filed under:', 'विषय वर्गीकरण:')}</span>
                  {k.tags.map(t => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200/80 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sidebar related resources */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold border-b border-sky-100 pb-2">{trans('Resource Information', 'संसाधन सूचना')}</div>
                <div className="text-xs space-y-2.5 text-slate-600 font-sans">
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Type', 'प्रकार')}</span><span className="font-semibold text-slate-900">{k.type}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Category', 'श्रेणी')}</span><span className="font-semibold text-slate-900">{k.category}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Year', 'वर्ष')}</span><span className="font-mono text-slate-900 font-bold">{k.year}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Author', 'लेखक / वैज्ञानिक')}</span><span className="font-semibold text-slate-900">{k.author}</span></div>
                </div>
                {k.sourceUrl && (
                  <div className="pt-3 border-t border-sky-100">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-900 font-bold mb-1">
                      {trans('Official Reference Source', 'आधिकारिक संदर्भ स्रोत')}
                    </div>
                    <a
                      href={k.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-800 hover:text-sky-950 font-bold underline underline-offset-4 decoration-sky-300"
                    >
                      <span className="line-clamp-1">{k.sourceLabel || "National Centre for Polar and Ocean Research (NCPOR)"}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Linked expedition */}
              {exp && (
                <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold mb-2 border-b border-sky-100 pb-2">{trans('Linked Expedition', 'संबद्ध वैज्ञानिक अभियान')}</div>
                  <Link to={`/expeditions/${exp.id}`} className="block p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition group">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-900 line-clamp-2 font-display">{exp.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{exp.region} · {exp.year}</div>
                  </Link>
                </div>
              )}

              {/* Linked dataset */}
              {ds && (
                <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold mb-2 border-b border-sky-100 pb-2">{trans('Linked Dataset', 'संबद्ध डेटासेट')}</div>
                  <Link to={`/datasets/${ds.id}`} className="block p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition group">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-900 line-clamp-2 font-display">{ds.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{ds.area} · {ds.format}</div>
                  </Link>
                </div>
              )}

              {/* Linked publication */}
              {pub && (
                <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold mb-2 border-b border-sky-100 pb-2">{trans('Linked Publication', 'संबद्ध शोध पत्र')}</div>
                  <Link to={`/publications/${pub.id}`} className="block p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition group">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-900 line-clamp-2 font-display">{pub.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{pub.journal} ({pub.year})</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
