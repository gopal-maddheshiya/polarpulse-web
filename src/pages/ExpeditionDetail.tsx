import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, FileText, Database, BookOpen, ChevronRight, Anchor, Download, Check, Compass } from 'lucide-react'
import { getExpeditionById, getDatasets, getPublications, type Expedition, type Dataset, type Publication } from '../services/polarisService'
import { GALLERY } from '../data/images'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { Reveal } from '../lib/reveal'
import { downloadRealFile } from '../lib/actions'
import { useLanguage } from '../context/LanguageContext'

export default function ExpeditionDetail() {
  const { isHindi, trans } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [exp, setExp] = useState<Expedition | null>(null)
  const [datasetsList, setDatasetsList] = useState<Dataset[]>([])
  const [pubsList, setPubsList] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    if (!id) return

    Promise.all([
      getExpeditionById(id),
      getDatasets(),
      getPublications(),
    ])
      .then(([expData, allDatasets, allPubs]) => {
        if (mounted) {
          setExp(expData)
          setDatasetsList(allDatasets)
          setPubsList(allPubs)
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
  }, [id])

  if (loading) {
    return (
      <Container className="py-24 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3">
          <Compass className="w-5 h-5" />
        </div>
        <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय अभियान लोड हो रहा है...')}</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Unable to load content', 'सामग्री लोड करने में असमर्थ')}
          message={error}
          action={<Link to="/expeditions" className="btn-outline">{trans('Back to expeditions', 'अभियानों पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  if (!exp) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Polar knowledge not found', 'अभियान नहीं मिला')}
          message={trans('The expedition you’re looking for may have been moved or is not part of the active database.', 'खोजा गया अभियान उपलब्ध नहीं है या डेटाबेस से हटाया गया है।')}
          action={<Link to="/expeditions" className="btn-outline">{trans('Back to expeditions', 'अभियानों पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  const linkedDatasets = datasetsList.filter(d => exp.datasets.includes(d.id))
  const linkedPubs = pubsList.filter(p => exp.publications.includes(p.id))

  const handleDownload = async (report: { title: string; type: string; year: number; url?: string }) => {
    const targetUrl = report.url || '/reports/44th_ISEA_Annual_Expedition_Report.pdf'
    const safeFilename = `${report.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')}.pdf`
    const success = await downloadRealFile(targetUrl, safeFilename)
    setToast(success ? trans('Official PDF report downloaded securely', 'आधिकारिक पीडीएफ रिपोर्ट सुरक्षित रूप से डाउनलोड हो गई') : trans('Opening report in viewer', 'रिपोर्ट दर्शक में खोली जा रही है'))
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <div className="relative">
        <div className="aspect-[21/9] sm:aspect-[21/8] overflow-hidden bg-slate-900">
          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        </div>
        <Container className="relative -mt-24 sm:-mt-32 pb-10">
          <Reveal>
            <div className="rounded-3xl bg-white/95 backdrop-blur-md shadow-lg border border-sky-200/90 p-6 sm:p-8 max-w-4xl">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-slate-900 mb-3 font-semibold transition">
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-600" /> {trans('Back', 'वापस')}
              </button>
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-700 font-bold">
                {exp.region} · {exp.year} · {exp.season}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mt-2">{exp.title}</h1>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">{exp.overview}</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200/60"><Calendar className="w-4 h-4 text-cyan-600 mt-0.5" /><div><span className="text-slate-500 text-xs">{trans('Vessel:', 'जहाज / पोत:')}</span> <div className="text-slate-900 font-semibold text-xs">{exp.vessel ?? '—'}</div></div></div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200/60"><MapPin className="w-4 h-4 text-cyan-700 mt-0.5" /><div><span className="text-slate-500 text-xs">{trans('Stations:', 'स्टेशन / बेस:')}</span> <div className="text-slate-900 font-semibold text-xs">{exp.stations.join(', ')}</div></div></div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200/60"><Users className="w-4 h-4 text-cyan-600 mt-0.5" /><div><span className="text-slate-500 text-xs">{trans('Lead:', 'अभियान नेता:')}</span> <div className="text-slate-900 font-semibold text-xs">{exp.lead}</div></div></div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-sky-50/60 border border-sky-200/60"><FileText className="w-4 h-4 text-cyan-600 mt-0.5" /><div><span className="text-slate-500 text-xs">{trans('Focus:', 'वैज्ञानिक फोकस:')}</span> <div className="text-slate-900 font-semibold text-xs">{exp.researchAreas.join(', ')}</div></div></div>
              </div>
              {exp.sourceUrl && (
                <div className="mt-5 pt-4 border-t border-sky-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-slate-500">
                    {trans('Official Registry:', 'आधिकारिक पुरालेख:')}{' '}
                    <span className="text-slate-800 font-bold">{exp.sourceLabel || 'NCPOR / MoES'}</span>
                  </span>
                  <a
                    href={exp.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-700 hover:text-cyan-900 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('Verify at NCPOR Portal', 'एनसीपीओआर पोर्टल पर सत्यापित करें')} ↗</span>
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </div>

      <Section className="py-10 bg-[#edf5fb]">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Timeline */}
              {exp.timeline.length > 0 && (
                <Reveal>
                  <div className="rounded-3xl bg-white/95 backdrop-blur-md p-7 border border-sky-200/90 shadow-xs">
                    <h2 className="font-display text-xl font-bold text-slate-950 mb-5">{trans('Voyage Timeline', 'अभियान यात्रा कालक्रम')}</h2>
                    <div className="relative pl-6 border-l-2 border-sky-300 space-y-6">
                      {exp.timeline.map((t, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-cyan-500 shadow-2xs" />
                          <div className="text-xs font-mono uppercase tracking-widest text-cyan-700 font-bold">{t.date}</div>
                          <div className="text-sm font-semibold text-slate-900 mt-1">{t.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Research Focus */}
              {exp.research.length > 0 && (
                <Reveal>
                  <div className="rounded-3xl bg-white/95 backdrop-blur-md p-7 border border-sky-200/90 shadow-xs">
                    <h2 className="font-display text-xl font-bold text-slate-950 mb-4">{trans('Scientific Campaigns', 'वैज्ञानिक अभियान एवं शोध')}</h2>
                    <ul className="space-y-2.5">
                      {exp.research.map((r, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2.5">
                          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Highlights */}
              {exp.highlights.length > 0 && (
                <Reveal>
                  <div className="rounded-3xl bg-white/95 backdrop-blur-md p-7 border border-sky-200/90 shadow-xs">
                    <h2 className="font-display text-xl font-bold text-slate-950 mb-4">{trans('Expedition Highlights', 'अभियान के प्रमुख आकर्षण')}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {exp.highlights.map((h, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200/80">
                          <div className="text-sm font-bold text-slate-950">{h.title}</div>
                          <div className="text-xs text-slate-600 mt-1 leading-relaxed">{h.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Scientists */}
              {exp.scientists.length > 0 && (
                <Reveal>
                  <div className="rounded-3xl bg-white/95 backdrop-blur-md p-7 border border-sky-200/90 shadow-xs">
                    <h2 className="font-display text-xl font-bold text-slate-950 mb-4">{trans('Scientific Team', 'वैज्ञानिक दल')}</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.scientists.map((s, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-sky-200/80 bg-white flex items-center justify-between text-sm shadow-2xs">
                          <div>
                            <div className="font-bold text-slate-900">{s.name}</div>
                            <div className="text-xs text-slate-500">{s.role}</div>
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-sky-100/70 text-cyan-950 font-bold">{s.affiliation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar: Linked datasets, pubs, reports */}
            <div className="space-y-6">
              {/* Linked Datasets */}
              <div className="rounded-3xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-3.5">
                  <Database className="w-3.5 h-3.5 text-cyan-700" />
                  <span>{trans(`Linked Datasets (${linkedDatasets.length})`, `संबद्ध डेटासेट्स (${linkedDatasets.length})`)}</span>
                </div>
                {linkedDatasets.length === 0 ? (
                  <div className="text-xs text-slate-400">{trans('No linked datasets in demo.', 'कोई संबद्ध डेटासेट नहीं मिला।')}</div>
                ) : (
                  <div className="space-y-2">
                    {linkedDatasets.map(d => (
                      <Link key={d.id} to={`/datasets/${d.id}`} className="block p-3 rounded-xl hover:bg-sky-50 border border-sky-100 hover:border-sky-300 transition group">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 line-clamp-1">{d.title}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{d.area} · {d.format}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Linked Publications */}
              <div className="rounded-3xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-3.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
                  <span>{trans(`Linked Publications (${linkedPubs.length})`, `संबद्ध प्रकाशन (${linkedPubs.length})`)}</span>
                </div>
                {linkedPubs.length === 0 ? (
                  <div className="text-xs text-slate-400">{trans('No linked publications found.', 'कोई संबद्ध प्रकाशन नहीं मिला।')}</div>
                ) : (
                  <div className="space-y-2">
                    {linkedPubs.map(p => (
                      <Link key={p.id} to={`/publications/${p.id}`} className="block p-3 rounded-xl hover:bg-sky-50 border border-sky-100 hover:border-sky-300 transition group">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 line-clamp-2">{p.title}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{p.journal} ({p.year})</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Reports */}
              {exp.reports.length > 0 && (
                <div className="rounded-3xl border border-sky-200/90 p-6 bg-white/95 backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-3.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-700" />
                    <span>{trans(`Expedition Reports (${exp.reports.length})`, `अभियान रिपोर्टें (${exp.reports.length})`)}</span>
                  </div>
                  <div className="space-y-2">
                    {exp.reports.map((r, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-sky-50/50 border border-sky-100 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{r.title}</div>
                          <div className="text-[10px] font-mono text-slate-500">{r.year} · {r.type}</div>
                        </div>
                        <button onClick={() => handleDownload(r)} className="p-2 rounded-lg hover:bg-white text-cyan-700 hover:text-cyan-900 transition shadow-2xs" title={trans('Download Report', 'रिपोर्ट डाउनलोड करें')}>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
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
