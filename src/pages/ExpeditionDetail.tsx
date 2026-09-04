import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, FileText, Database, BookOpen, ChevronRight, Anchor, Download, Check, Compass } from 'lucide-react'
import { getExpeditionById, getDatasets, getPublications, type Expedition, type Dataset, type Publication } from '../services/polarisService'
import { GALLERY } from '../data/images'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { Reveal } from '../lib/reveal'
import { downloadTextFile } from '../lib/actions'
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

  const handleDownload = (report: { title: string; type: string; year: number }) => {
    const text = `POLARIS · DEMO REPORT\n\nTitle: ${report.title}\nYear: ${report.year}\nType: ${report.type}\nExpedition: ${exp.title}\n\n---\n\nThis is a placeholder text. In a real deployment this would be the full PDF report. The current prototype demonstrates the download flow only.\n`
    downloadTextFile(`${report.title.replace(/\s+/g, '_')}.txt`, text)
    setToast(trans('Report downloaded', 'रिपोर्ट डाउनलोड हो गई'))
    setTimeout(() => setToast(null), 1800)
  }

  return (
    <div>
      <div className="relative">
        <div className="aspect-[21/9] sm:aspect-[21/8] overflow-hidden bg-polar-100">
          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-polar-950/80 via-polar-950/20 to-transparent" />
        </div>
        <Container className="relative -mt-24 sm:-mt-32 pb-10">
          <Reveal>
            <div className="rounded-2xl bg-white shadow-soft border border-polar-100 p-6 sm:p-8 max-w-4xl">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-polar-500 hover:text-polar-900 mb-3">
                <ArrowLeft className="w-3.5 h-3.5" /> {trans('Back', 'वापस')}
              </button>
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-accent/90">
                {exp.region} · {exp.year} · {exp.season}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-polar-950 mt-2">{exp.title}</h1>
              <p className="mt-4 text-polar-600 leading-relaxed">{exp.overview}</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2"><Calendar className="w-4 h-4 text-polar-400 mt-0.5" /><div><span className="text-polar-500">{trans('Vessel:', 'जहाज / पोत:')}</span> <span className="text-polar-900">{exp.vessel ?? '—'}</span></div></div>
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-polar-400 mt-0.5" /><div><span className="text-polar-500">{trans('Stations:', 'स्टेशन / बेस:')}</span> <span className="text-polar-900">{exp.stations.join(', ')}</span></div></div>
                <div className="flex items-start gap-2"><Users className="w-4 h-4 text-polar-400 mt-0.5" /><div><span className="text-polar-500">{trans('Lead:', 'अभियान नेता:')}</span> <span className="text-polar-900">{exp.lead}</span></div></div>
                <div className="flex items-start gap-2"><FileText className="w-4 h-4 text-polar-400 mt-0.5" /><div><span className="text-polar-500">{trans('Focus:', 'वैज्ञानिक फोकस:')}</span> <span className="text-polar-900">{exp.researchAreas.join(', ')}</span></div></div>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      <Section className="py-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Timeline */}
              {exp.timeline.length > 0 && (
                <Reveal>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-polar-950 mb-4">{trans('Voyage Timeline', 'अभियान यात्रा कालक्रम')}</h2>
                    <div className="relative pl-6 border-l-2 border-polar-200 space-y-6">
                      {exp.timeline.map((t, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-cyan-accent" />
                          <div className="text-xs font-mono uppercase tracking-widest text-polar-400">{t.date}</div>
                          <div className="text-sm font-medium text-polar-900 mt-1">{t.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Research Focus */}
              {exp.research.length > 0 && (
                <Reveal>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-polar-950 mb-4">{trans('Scientific Campaigns', 'वैज्ञानिक अभियान एवं शोध')}</h2>
                    <ul className="space-y-2">
                      {exp.research.map((r, idx) => (
                        <li key={idx} className="text-sm text-polar-700 flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" />
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
                  <div>
                    <h2 className="font-display text-xl font-semibold text-polar-950 mb-4">{trans('Expedition Highlights', 'अभियान के प्रमुख आकर्षण')}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {exp.highlights.map((h, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-polar-50/60 border border-polar-100">
                          <div className="text-sm font-semibold text-polar-900">{h.title}</div>
                          <div className="text-xs text-polar-600 mt-1">{h.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Scientists */}
              {exp.scientists.length > 0 && (
                <Reveal>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-polar-950 mb-4">{trans('Scientific Team', 'वैज्ञानिक दल')}</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.scientists.map((s, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-polar-100 flex items-center justify-between text-sm">
                          <div>
                            <div className="font-medium text-polar-900">{s.name}</div>
                            <div className="text-xs text-polar-500">{s.role}</div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-polar-100 text-polar-700">{s.affiliation}</span>
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
              <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-polar-500 mb-3">
                  <Database className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>{trans(`Linked Datasets (${linkedDatasets.length})`, `संबद्ध डेटासेट्स (${linkedDatasets.length})`)}</span>
                </div>
                {linkedDatasets.length === 0 ? (
                  <div className="text-xs text-polar-400">{trans('No linked datasets in demo.', 'कोई संबद्ध डेटासेट नहीं मिला।')}</div>
                ) : (
                  <div className="space-y-2">
                    {linkedDatasets.map(d => (
                      <Link key={d.id} to={`/datasets/${d.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                        <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-1">{d.title}</div>
                        <div className="text-[10px] font-mono text-polar-400 mt-0.5">{d.area} · {d.format}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Linked Publications */}
              <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-polar-500 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>{trans(`Linked Publications (${linkedPubs.length})`, `संबद्ध प्रकाशन (${linkedPubs.length})`)}</span>
                </div>
                {linkedPubs.length === 0 ? (
                  <div className="text-xs text-polar-400">{trans('No linked publications in demo.', 'कोई संबद्ध प्रकाशन नहीं मिला।')}</div>
                ) : (
                  <div className="space-y-2">
                    {linkedPubs.map(p => (
                      <Link key={p.id} to={`/publications/${p.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                        <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{p.title}</div>
                        <div className="text-[10px] font-mono text-polar-400 mt-0.5">{p.journal} ({p.year})</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Reports */}
              {exp.reports.length > 0 && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-polar-500 mb-3">
                    <FileText className="w-3.5 h-3.5 text-cyan-accent" />
                    <span>{trans(`Expedition Reports (${exp.reports.length})`, `अभियान रिपोर्टें (${exp.reports.length})`)}</span>
                  </div>
                  <div className="space-y-2">
                    {exp.reports.map((r, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-polar-50/60 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-medium text-polar-900">{r.title}</div>
                          <div className="text-[10px] text-polar-400">{r.year} · {r.type}</div>
                        </div>
                        <button onClick={() => handleDownload(r)} className="p-1.5 rounded-md hover:bg-white text-polar-600 hover:text-polar-900 transition" title={trans('Download Report', 'रिपोर्ट डाउनलोड करें')}>
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
