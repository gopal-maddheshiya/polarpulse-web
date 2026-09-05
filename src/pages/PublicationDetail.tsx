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
    <div>
      <div className="bg-gradient-to-b from-polar-50/80 to-white border-b border-polar-100">
        <Container className="py-12 sm:py-16">
          <Reveal>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-polar-500 hover:text-polar-900 mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> {trans('Back', 'वापस')}
            </button>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-accent/90">{p.area} · {p.journal} · {p.year}</div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-polar-950 mt-3 max-w-4xl leading-[1.15]">{p.title}</h1>
            <p className="mt-4 font-mono text-sm text-polar-600">{p.authors.join(', ')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={handleCite} className="btn-primary">
                <Copy className="w-4 h-4" /> {trans('Copy APA Citation', 'APA साइटेशन कॉपी करें')}
              </button>
              {p.doi && (
                <button onClick={handleDoi} className="btn-outline">
                  <ExternalLink className="w-4 h-4" /> {trans(`View via DOI (${p.doi})`, `DOI के माध्यम से देखें (${p.doi})`)}
                </button>
              )}
              {p.sourceUrl && (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 text-xs font-mono text-polar-700 hover:text-polar-950"
                >
                  <span>{trans('Official NCPOR Archive', 'आधिकारिक NCPOR संग्रह')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
                </a>
              )}
            </div>
          </Reveal>
        </Container>
      </div>

      <Section className="py-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <Reveal>
                <div>
                  <h2 className="font-display text-xl font-semibold text-polar-950 mb-3">{trans('Abstract', 'शोध सार (Abstract)')}</h2>
                  <p className="text-polar-700 leading-relaxed text-base">{p.abstract}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="p-6 rounded-2xl bg-polar-50/60 border border-polar-100 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400">{trans('Bibliographic Citation', 'ग्रंथ सूची उद्धरण (Bibliographic Citation)')}</div>
                  <div className="text-sm font-mono text-polar-800 bg-white p-4 rounded-xl border border-polar-100 break-words">
                    {buildApaCitation(p)}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar metadata */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-polar-100 p-5 bg-white space-y-3 text-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-polar-400">{trans('Publication Details', 'प्रकाशन विवरण')}</div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Year', 'वर्ष')}</span><span className="text-polar-900 font-mono text-xs">{p.year}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Journal', 'जर्नल / पत्रिका')}</span><span className="text-polar-900">{p.journal}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Discipline', 'वैज्ञानिक विषय')}</span><span className="text-polar-900">{p.area}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Peer Reviewed', 'सहकर्मी समीक्षित')}</span><span className="text-emerald-600 font-medium text-xs">{trans('Yes', 'हाँ (प्रमाणित)')}</span></div>
                </div>
              </div>

              {/* Official Repository Verification */}
              <div className="rounded-2xl border border-polar-100 p-5 bg-white space-y-3 text-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-polar-400">
                  {trans('Institutional Repository', 'संस्थागत अनुसंधान संग्रह')}
                </div>
                <p className="text-xs text-polar-600 leading-relaxed">
                  {trans('National Centre for Polar and Ocean Research (NCPOR) · MoES Science Repository', 'राष्ट्रीय ध्रुवीय एवं समुद्री अनुसंधान केंद्र (NCPOR) · पृथ्वी विज्ञान मंत्रालय')}
                </p>
                <a
                  href={p.sourceUrl || "https://ncpor.res.in/pages/display/230-library-and-publication"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-accent hover:text-cyan-700 underline underline-offset-4 decoration-cyan-accent/40"
                >
                  <span>{p.sourceLabel || "NCPOR Scientific Repository"}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {/* Linked Expedition */}
              {exp && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Stemming From Expedition', 'संबद्ध वैज्ञानिक अभियान')}</div>
                  <Link to={`/expeditions/${exp.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{exp.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{exp.region} · {exp.year}</div>
                  </Link>
                </div>
              )}

              {/* Linked Dataset */}
              {ds && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Underlying Open Dataset', 'आधारभूत ओपन डेटासेट')}</div>
                  <Link to={`/datasets/${ds.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{ds.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{ds.area} · {ds.format}</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-polar-950 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-polar-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5 text-cyan-accent" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
