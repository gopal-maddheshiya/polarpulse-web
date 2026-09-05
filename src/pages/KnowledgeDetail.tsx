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
    <div>
      <div className="bg-gradient-to-b from-polar-50/80 to-white border-b border-polar-100">
        <Container className="py-12 sm:py-16">
          <Reveal>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-polar-500 hover:text-polar-900 mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> {trans('Back', 'वापस')}
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-accent/90">
              <Icon className="w-3.5 h-3.5" />
              <span>{k.type} · {k.category} · {k.year}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-polar-950 mt-3 max-w-4xl leading-[1.1]">{k.title}</h1>
            <p className="mt-4 text-polar-600 text-base sm:text-lg max-w-3xl leading-relaxed">{k.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-polar-500">
              <div className="flex items-center gap-1.5"><User2 className="w-3.5 h-3.5 text-polar-400" /><span>{k.author}</span></div>
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-polar-400" /><span>{k.year}</span></div>
            </div>
            {k.sourceUrl && (
              <div className="mt-6">
                <a
                  href={k.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs font-mono text-polar-700 hover:text-polar-950"
                >
                  <span>{trans('Verify Official Source', 'आधिकारिक स्रोत सत्यापित करें')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
                </a>
              </div>
            )}
          </Reveal>
        </Container>
      </div>

      <Section className="py-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Article body */}
              <Reveal>
                <div className="prose prose-polar max-w-none text-polar-800 leading-relaxed space-y-4 text-base">
                  <p className="text-lg text-polar-700 leading-relaxed font-serif italic border-l-2 border-cyan-accent pl-4 py-1">
                    "{k.excerpt}"
                  </p>
                  <p>{k.body}</p>
                </div>
              </Reveal>

              {/* Tags */}
              <Reveal>
                <div className="pt-6 border-t border-polar-100 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-polar-400 mr-2">{trans('Filed under:', 'विषय वर्गीकरण:')}</span>
                  {k.tags.map(t => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-polar-50 text-polar-700 border border-polar-100">
                      #{t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sidebar related resources */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-polar-100 p-5 bg-white space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-polar-400">{trans('Resource Information', 'संसाधन सूचना')}</div>
                <div className="text-xs space-y-2 text-polar-600">
                  <div className="flex justify-between"><span className="text-polar-400">{trans('Type', 'प्रकार')}</span><span className="font-medium text-polar-900">{k.type}</span></div>
                  <div className="flex justify-between"><span className="text-polar-400">{trans('Category', 'श्रेणी')}</span><span className="font-medium text-polar-900">{k.category}</span></div>
                  <div className="flex justify-between"><span className="text-polar-400">{trans('Year', 'वर्ष')}</span><span className="font-medium text-polar-900">{k.year}</span></div>
                  <div className="flex justify-between"><span className="text-polar-400">{trans('Author', 'लेखक / वैज्ञानिक')}</span><span className="font-medium text-polar-900">{k.author}</span></div>
                </div>
                {k.sourceUrl && (
                  <div className="pt-3 border-t border-polar-100">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-polar-400 mb-1">
                      {trans('Official Reference Source', 'आधिकारिक संदर्भ स्रोत')}
                    </div>
                    <a
                      href={k.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent hover:text-cyan-700 underline underline-offset-4 decoration-cyan-accent/40"
                    >
                      <span className="line-clamp-1">{k.sourceLabel || "National Centre for Polar and Ocean Research (NCPOR)"}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {/* Linked expedition */}
              {exp && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Linked Expedition', 'संबद्ध वैज्ञानिक अभियान')}</div>
                  <Link to={`/expeditions/${exp.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{exp.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{exp.region} · {exp.year}</div>
                  </Link>
                </div>
              )}

              {/* Linked dataset */}
              {ds && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Linked Dataset', 'संबद्ध डेटासेट')}</div>
                  <Link to={`/datasets/${ds.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{ds.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{ds.area} · {ds.format}</div>
                  </Link>
                </div>
              )}

              {/* Linked publication */}
              {pub && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Linked Publication', 'संबद्ध शोध पत्र')}</div>
                  <Link to={`/publications/${pub.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{pub.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{pub.journal} ({pub.year})</div>
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
