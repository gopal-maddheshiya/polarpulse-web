import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPublicationById, getExpeditionById, getDatasetById, type Publication, type Expedition, type Dataset } from '../services/polarisService'
import { ArrowLeft, BookOpen, FileText, Database, Check, ExternalLink, Copy, Compass } from 'lucide-react'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { copyToClipboard, openDoi, buildApaCitation } from '../lib/actions'
import { Reveal } from '../lib/reveal'
import { useLanguage } from '../context/LanguageContext'

export default function PublicationDetail() {
  const { isHindi, trans } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [p, setPublication] = useState<Publication | null>(null)
  const [exp, setExp] = useState<Expedition | null>(null)
  const [ds, setDataset] = useState<Dataset | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    if (!id) return

    getPublicationById(id)
      .then(async pubData => {
        if (!mounted) return
        setPublication(pubData)
        if (pubData) {
          const [expData, dsData] = await Promise.all([
            pubData.expedition ? getExpeditionById(pubData.expedition) : Promise.resolve(null),
            pubData.dataset ? getDatasetById(pubData.dataset) : Promise.resolve(null),
          ])
          if (mounted) {
            setExp(expData)
            setDataset(dsData)
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
        <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय शोध पत्र लोड हो रहा है...')}</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Unable to load publication', 'शोध पत्र लोड करने में असमर्थ')}
          message={error}
          action={<Link to="/publications" className="btn-outline">{trans('Back to publications', 'प्रकाशनों पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  if (!p) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Polar knowledge not found', 'शोध पत्र नहीं मिला')}
          message={trans('This publication may have been moved or is not part of the active database.', 'खोजा गया प्रकाशन उपलब्ध नहीं है या डेटाबेस से हटाया गया है।')}
          action={<Link to="/publications" className="btn-outline">{trans('Back to publications', 'प्रकाशनों पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  const handleDoi = () => {
    if (!p.doi) return
    openDoi(p.doi)
  }

  const handleCite = async () => {
    const text = buildApaCitation(p)
    const ok = await copyToClipboard(text)
    setToast(ok ? trans('Citation copied', 'उद्धरण क्लिपबोर्ड पर कॉपी हुआ') : trans('Copy failed', 'कॉपी विफल रहा'))
    setTimeout(() => setToast(null), 1800)
  }

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
              <ArrowLeft className="w-3.5 h-3.5" /> {trans('Back to Publications', 'प्रकाशनों पर वापस जाएं')}
            </button>
            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-800 font-bold bg-sky-50/80 border border-sky-200/80 inline-block px-3 py-1 rounded-full">{p.area} · {p.journal} · {p.year}</div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mt-4 max-w-4xl leading-[1.18]">{p.title}</h1>
            <p className="mt-4 font-mono text-sm text-slate-600 font-medium">{p.authors.join(', ')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={handleCite} className="btn-primary rounded-xl shadow-xs">
                <Copy className="w-4 h-4" /> {trans('Copy APA Citation', 'APA साइटेशन कॉपी करें')}
              </button>
              {p.doi && (
                <button onClick={handleDoi} className="btn-outline rounded-xl bg-white/90 shadow-xs">
                  <ExternalLink className="w-4 h-4" /> {trans(`View via DOI (${p.doi})`, `DOI के माध्यम से देखें (${p.doi})`)}
                </button>
              )}
              {p.sourceUrl && (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs font-mono text-sky-900 hover:text-sky-950 rounded-xl bg-white/90 shadow-xs font-semibold"
                >
                  <span>{trans('Official NCPOR Archive', 'आधिकारिक NCPOR संग्रह')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                </a>
              )}
            </div>
          </Reveal>
        </Container>
      </div>

      <Section className="py-12 pb-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-soft space-y-4">
                  <h2 className="font-display text-xl font-bold text-slate-950 border-b border-sky-100 pb-3">{trans('Abstract', 'शोध सार (Abstract)')}</h2>
                  <p className="text-slate-800 leading-relaxed text-base font-normal font-sans">{p.abstract}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-soft space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold">{trans('Bibliographic Citation', 'ग्रंथ सूची उद्धरण (Bibliographic Citation)')}</div>
                  <div className="text-sm font-mono text-slate-800 bg-sky-50/50 p-4 rounded-xl border border-sky-100 break-words leading-relaxed">
                    {buildApaCitation(p)}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar metadata */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft space-y-4 text-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold border-b border-sky-100 pb-2">{trans('Publication Details', 'प्रकाशन विवरण')}</div>
                <div className="space-y-2.5">
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Year', 'वर्ष')}</span><span className="text-slate-900 font-mono text-xs font-bold">{p.year}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Journal', 'जर्नल / पत्रिका')}</span><span className="text-slate-900 font-semibold">{p.journal}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Discipline', 'वैज्ञानिक विषय')}</span><span className="text-slate-900 font-semibold">{p.area}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-medium">{trans('Peer Reviewed', 'सहकर्मी समीक्षित')}</span><span className="text-emerald-700 font-semibold text-xs">{trans('Yes', 'हाँ (प्रमाणित)')}</span></div>
                </div>
              </div>

              {/* Official Repository Verification */}
              <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft space-y-3 text-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold border-b border-sky-100 pb-2">
                  {trans('Institutional Repository', 'संस्थागत अनुसंधान संग्रह')}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {trans('National Centre for Polar and Ocean Research (NCPOR) · MoES Science Repository', 'राष्ट्रीय ध्रुवीय एवं समुद्री अनुसंधान केंद्र (NCPOR) · पृथ्वी विज्ञान मंत्रालय')}
                </p>
                <a
                  href={p.sourceUrl || "https://ncpor.res.in/pages/display/230-library-and-publication"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-800 hover:text-sky-950 font-bold underline underline-offset-4 decoration-sky-300"
                >
                  <span>{p.sourceLabel || "NCPOR Scientific Repository"}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {/* Linked Expedition */}
              {exp && (
                <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold mb-2 border-b border-sky-100 pb-2">{trans('Stemming From Expedition', 'संबद्ध वैज्ञानिक अभियान')}</div>
                  <Link to={`/expeditions/${exp.id}`} className="block p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition group">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-900 line-clamp-2 font-display">{exp.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{exp.region} · {exp.year}</div>
                  </Link>
                </div>
              )}

              {/* Linked Dataset */}
              {ds && (
                <div className="rounded-2xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-soft">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-900 font-bold mb-2 border-b border-sky-100 pb-2">{trans('Underlying Open Dataset', 'आधारभूत ओपन डेटासेट')}</div>
                  <Link to={`/datasets/${ds.id}`} className="block p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-200 transition group">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-900 line-clamp-2 font-display">{ds.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{ds.area} · {ds.format}</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 animate-fade-up">
          <Check className="w-3.5 h-3.5 text-sky-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
