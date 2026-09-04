import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getDatasetById, getExpeditionById, getPublicationById, type Dataset, type Expedition, type Publication } from '../services/polarisService'
import { ArrowLeft, Database, Download, Eye, FileText, BookOpen, Check, ExternalLink, Compass } from 'lucide-react'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { downloadCsv, copyToClipboard, openDoi } from '../lib/actions'
import { Reveal } from '../lib/reveal'
import { LineChart } from '../components/ui/Chart'
import { useLanguage } from '../context/LanguageContext'

export default function DatasetDetail() {
  const { isHindi, trans } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [d, setDataset] = useState<Dataset | null>(null)
  const [exp, setExp] = useState<Expedition | null>(null)
  const [pub, setPub] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    if (!id) return

    getDatasetById(id)
      .then(async datasetData => {
        if (!mounted) return
        setDataset(datasetData)
        if (datasetData) {
          const [expData, pubData] = await Promise.all([
            datasetData.relatedExpedition ? getExpeditionById(datasetData.relatedExpedition) : Promise.resolve(null),
            datasetData.relatedPublication ? getPublicationById(datasetData.relatedPublication) : Promise.resolve(null),
          ])
          if (mounted) {
            setExp(expData)
            setPub(pubData)
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
        <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय डेटासेट लोड हो रहा है...')}</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Unable to load dataset', 'डेटासेट लोड करने में असमर्थ')}
          message={error}
          action={<Link to="/datasets" className="btn-outline">{trans('Back to datasets', 'डेटासेट्स पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  if (!d) {
    return (
      <Container className="py-20">
        <EmptyState
          title={trans('Polar knowledge not found', 'डेटासेट नहीं मिला')}
          message={trans('This dataset may have been moved or is not part of the active database.', 'खोजा गया डेटासेट उपलब्ध नहीं है या हटाया गया है।')}
          action={<Link to="/datasets" className="btn-outline">{trans('Back to datasets', 'डेटासेट्स पर वापस जाएं')}</Link>}
        />
      </Container>
    )
  }

  const handleDownload = () => {
    downloadCsv(`${d.id}.csv`, d.previewRows)
    setToast(trans('CSV downloaded', 'सीएसवी फ़ाइल डाउनलोड हो गई'))
    setTimeout(() => setToast(null), 1800)
  }

  const handlePreview = async () => {
    const ok = await copyToClipboard(JSON.stringify(d.previewRows, null, 2))
    setToast(ok ? trans('Preview copied to clipboard', 'पूर्वावलोकन क्लिपबोर्ड पर कॉपी हुआ') : trans('Preview unavailable', 'पूर्वावलोकन अनुपलब्ध'))
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
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-accent/90">{d.area} · {d.region} · {d.year}</div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-polar-950 mt-3 max-w-4xl leading-[1.1]">{d.title}</h1>
            <p className="mt-4 text-polar-600 max-w-3xl leading-relaxed text-base sm:text-lg">{d.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={handleDownload} className="btn-primary">
                <Download className="w-4 h-4" /> {trans(`Download (${d.format})`, `डाउनलोड करें (${d.format})`)}
              </button>
              <button onClick={handlePreview} className="btn-outline">
                <Eye className="w-4 h-4" /> {trans('Copy Preview JSON', 'प्रिव्यू JSON कॉपी करें')}
              </button>
            </div>
          </Reveal>
        </Container>
      </div>

      <Section className="py-10">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Sample visualisation */}
              <Reveal>
                <div className="p-6 rounded-2xl border border-polar-100 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-polar-400">{trans('Preview Visualisation', 'पूर्वावलोकन विज़ुअलाइज़ेशन')}</div>
                      <div className="font-display text-lg font-semibold text-polar-950">{trans('Downcast Profile Sample', 'डाउनकास्ट प्रोफाइल नमूना')}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-polar-50 text-polar-600">{trans('Simulated', 'सिम्युलेटेड')}</span>
                  </div>
                  <LineChart
                    title={trans('Downcast Profile Sample', 'डाउनकास्ट प्रोफाइल नमूना')}
                    subtitle={trans('Simulated depth vs salinity/temperature profile', 'गहराई बनाम लवणता/तापमान प्रोफ़ाइल')}
                    data={[
                      { label: '0m', value: 12 },
                      { label: '50m', value: 24 },
                      { label: '100m', value: 48 },
                      { label: '200m', value: 35 },
                      { label: '500m', value: 18 },
                      { label: '1000m', value: 8 },
                    ]}
                    accent="#00a3c4"
                    height={200}
                  />
                </div>
              </Reveal>

              {/* Data Preview Table */}
              <Reveal>
                <div>
                  <h2 className="font-display text-xl font-semibold text-polar-950 mb-4">{trans('Observation Record Preview', 'प्रेक्षण रिकॉर्ड पूर्वावलोकन')}</h2>
                  <div className="overflow-x-auto rounded-xl border border-polar-100 bg-white">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[11px] font-mono uppercase tracking-wider text-polar-500 bg-polar-50/60 border-b border-polar-100">
                        <tr>
                          <th className="py-3 px-4">{trans('Parameter / Variable', 'मापदंड / चर (Parameter)')}</th>
                          <th className="py-3 px-4">{trans('Sample Reading', 'नमूना पाठ्यांक (Reading)')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-polar-50 text-polar-700">
                        {d.previewRows.map((r, idx) => (
                          <tr key={idx} className="hover:bg-polar-50/40 transition">
                            <td className="py-3 px-4 font-mono text-xs text-polar-900">{r.name}</td>
                            <td className="py-3 px-4 font-mono text-xs text-cyan-accent font-medium">{r.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar metadata */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-polar-100 p-5 bg-white space-y-4 text-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-polar-400">{trans('Dataset Metadata', 'डेटासेट मेटाडेटा')}</div>
                <div className="space-y-2.5">
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Coverage', 'भौगोलिक कवरेज')}</span><span className="text-polar-900 font-mono text-xs">{d.coverage}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('File Size', 'फ़ाइल आकार')}</span><span className="text-polar-900 font-mono text-xs">{d.size}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Format', 'प्रारूप (Format)')}</span><span className="text-polar-900 font-mono text-xs">{d.format}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Discipline', 'वैज्ञानिक विषय')}</span><span className="text-polar-900">{d.area}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Region', 'ध्रुवीय क्षेत्र')}</span><span className="text-polar-900">{d.region}</span></div>
                  <div className="flex justify-between"><span className="text-polar-500">{trans('Access', 'पहुंच स्तर')}</span><span className="text-emerald-600 font-medium text-xs">{trans('Open / Public Domain', 'खुला / सार्वजनिक अधिकार')}</span></div>
                </div>
              </div>

              {/* Linked Expedition */}
              {exp && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Collected During', 'इस अभियान के दौरान एकत्रित')}</div>
                  <Link to={`/expeditions/${exp.id}`} className="block p-2.5 rounded-lg hover:bg-polar-50 border border-transparent hover:border-polar-100 transition group">
                    <div className="text-xs font-medium text-polar-900 group-hover:text-cyan-accent line-clamp-2">{exp.title}</div>
                    <div className="text-[10px] font-mono text-polar-400 mt-0.5">{exp.region} · {exp.year}</div>
                  </Link>
                </div>
              )}

              {/* Linked Publication */}
              {pub && (
                <div className="rounded-2xl border border-polar-100 p-5 bg-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-polar-400 mb-2">{trans('Cited in Publication', 'शोध पत्र में उद्धृत')}</div>
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
