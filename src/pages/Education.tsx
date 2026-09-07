import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getEducation, type Topic } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import {
  ArrowRight, Check, X as XIcon, GraduationCap, Sparkles, BookOpenCheck,
  Award, RefreshCw, Compass, Database, FileText, CheckCircle2, ChevronRight,
  HelpCircle, Lightbulb, ExternalLink, Download
} from 'lucide-react'
import { cn } from '../lib/utils'
import { Reveal } from '../lib/reveal'
import { useLanguage } from '../context/LanguageContext'

type Mode = 'simple' | 'scientific'

interface TopicEvidence {
  base: string
  expedition: string
  datasetId: string
  datasetTitle: string
  summary: string
  sourceUrl?: string
  sourceLabel?: string
}

const TOPIC_EVIDENCE: Record<string, TopicEvidence> = {
  antarctica: {
    base: 'Bharati & Maitri Bases',
    expedition: '44th Indian Antarctic Expedition',
    datasetId: 'ds-atm-001',
    datasetTitle: 'Maitri Atmospheric Black Carbon',
    summary: 'Observations of boundary layer physics and continental plateau weather.',
    sourceUrl: 'https://ncpor.res.in/antarcticas',
    sourceLabel: 'NCPOR Antarctic Research Portal',
  },
  arctic: {
    base: 'Himadri Station, Ny-Ålesund',
    expedition: '17th Indian Arctic Expedition (2024)',
    datasetId: 'ds-gla-003',
    datasetTitle: 'Kongsfjorden Fjord Dynamics',
    summary: 'Monitoring Atlantic water intrusion into High Arctic fjords via the IndARC mooring.',
    sourceUrl: 'https://ncpor.res.in/arctics',
    sourceLabel: 'NCPOR Arctic Research Programme',
  },
  'sea-ice': {
    base: 'MV Vasiliy Golovnin Cruise Track',
    expedition: '44th ISEA Southern Ocean Voyage',
    datasetId: 'ds-oce-002',
    datasetTitle: 'Southern Ocean CTD Transect',
    summary: 'In-situ sea-ice thickness profiling across the marginal ice zone.',
    sourceUrl: 'https://nsidc.org/data/seaice_index',
    sourceLabel: 'NSIDC Sea Ice Climatology Index',
  },
  glaciers: {
    base: 'Larsemann Hills & Schirmacher Oasis',
    expedition: '43rd & 44th ISEA',
    datasetId: 'ds-gla-003',
    datasetTitle: 'Larsemann Shallow Firn Cores',
    summary: 'Firn core isotope profiling to reconstruct past accumulation and glacier mass balance.',
    sourceUrl: 'https://ncpor.res.in/pages/display/268-himalaya',
    sourceLabel: 'NCPOR Cryosphere & Himalayan Studies',
  },
  'polar-climate': {
    base: 'Maitri Automatic Weather Station',
    expedition: 'Continuous Polar Observations',
    datasetId: 'ds-atm-001',
    datasetTitle: 'Continuous AWS Meteorology',
    summary: 'Longest continuous meteorological time-series in East Antarctica since 1989.',
    sourceUrl: 'https://data.ncpor.res.in',
    sourceLabel: 'National Polar Data Centre (NPDC)',
  },
}

export default function Education() {
  const { isHindi, trans } = useLanguage()
  const [params, setParams] = useSearchParams()
  const [topicsList, setTopicsList] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [active, setActive] = useState<string>('antarctica')
  const [mode, setMode] = useState<Mode>('simple')
  const [quizIdx, setQuizIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [showCert, setShowCert] = useState(false)
  const [cadetName, setCadetName] = useState('Polar Science Cadet')

  // Listen for automated demo tour events to demonstrate dual-mode simple vs scientific switching
  useEffect(() => {
    const handleTourStep = (e: any) => {
      if (e.detail?.stepId === 'smart-education') {
        setMode('simple')
        setTimeout(() => setMode('scientific'), 2400)
      }
    }
    window.addEventListener('polaris:tour-step', handleTourStep as EventListener)
    return () => window.removeEventListener('polaris:tour-step', handleTourStep as EventListener)
  }, [])

  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 850
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Background Parchment & Ocean Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 850)
    bgGrad.addColorStop(0, '#f8fafc')
    bgGrad.addColorStop(1, '#f0f9ff')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, 1200, 850)

    // Outer Border
    ctx.strokeStyle = '#0284c7'
    ctx.lineWidth = 12
    ctx.strokeRect(24, 24, 1152, 802)

    // Inner Delicate Border
    ctx.strokeStyle = '#0369a1'
    ctx.lineWidth = 2
    ctx.strokeRect(36, 36, 1128, 778)

    // Corner Decorative Accents
    ctx.fillStyle = '#0284c7'
    ctx.fillRect(32, 32, 20, 20)
    ctx.fillRect(1148, 32, 20, 20)
    ctx.fillRect(32, 798, 20, 20)
    ctx.fillRect(1148, 798, 20, 20)

    // Header Badge
    ctx.textAlign = 'center'
    ctx.fillStyle = '#0369a1'
    ctx.font = 'bold 15px sans-serif'
    ctx.fillText('GOVERNMENT OF INDIA · MINISTRY OF EARTH SCIENCES', 600, 95)
    ctx.fillText('NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH (NCPOR)', 600, 120)

    // Subtitle Divider Line
    ctx.strokeStyle = '#bae6fd'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(320, 142)
    ctx.lineTo(880, 142)
    ctx.stroke()

    // Certificate Title
    ctx.fillStyle = '#0f172a'
    ctx.font = 'bold 36px Georgia, serif'
    ctx.fillText('POLARIS CADET CERTIFICATE', 600, 210)

    ctx.fillStyle = '#64748b'
    ctx.font = 'italic 16px sans-serif'
    ctx.fillText('National Polar Science & Cryospheric Outreach Certification', 600, 255)

    // Candidate Name
    ctx.fillStyle = '#0284c7'
    ctx.font = 'bold 42px Georgia, serif'
    ctx.fillText(cadetName || 'Polar Science Cadet', 600, 340)

    // Underline candidate name
    ctx.strokeStyle = '#0284c7'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(380, 362)
    ctx.lineTo(820, 362)
    ctx.stroke()

    // Description text
    ctx.fillStyle = '#334155'
    ctx.font = '16px sans-serif'
    ctx.fillText('has successfully demonstrated proficiency across National Polar Science modules encompassing', 600, 420)
    ctx.fillText('Antarctic Cryosphere dynamics, High Arctic oceanography, and Himalayan benchmark glacier monitoring.', 600, 448)

    // Score Verified Box
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#bae6fd'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(400, 490, 400, 85, 12)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#0369a1'
    ctx.font = 'bold 13px monospace'
    ctx.fillText('VERIFIED ASSESSMENT PERFORMANCE', 600, 520)
    ctx.fillStyle = '#0f172a'
    ctx.font = 'bold 22px sans-serif'
    ctx.fillText(`${correctCount} / ${answeredCount || 1} Questions Verified (${Math.round((correctCount / Math.max(answeredCount, 1)) * 100)}%)`, 600, 552)

    // Verification Hash ID & Date
    const certCode = `POL-2026-${Math.abs(((cadetName || '') + correctCount).split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(6, '0')}`
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    ctx.textAlign = 'left'
    ctx.fillStyle = '#64748b'
    ctx.font = '12px monospace'
    ctx.fillText(`VERIFICATION CODE: ${certCode}`, 80, 715)
    ctx.fillText(`DATE OF ISSUANCE: ${today}`, 80, 740)
    ctx.fillText('SMART INDIA HACKATHON 2026 · SMART EDUCATION', 80, 765)

    // Signatures
    ctx.textAlign = 'center'
    ctx.fillStyle = '#0f172a'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText('Director, NCPOR', 980, 720)
    ctx.fillStyle = '#64748b'
    ctx.font = '12px sans-serif'
    ctx.fillText('Ministry of Earth Sciences, Govt. of India', 980, 742)

    // Trigger download
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `POLARIS_Cadet_Certificate_${(cadetName || 'Cadet').replace(/\s+/g, '_')}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  useEffect(() => {
    let mounted = true
    getEducation()
      .then(data => {
        if (mounted) {
          setTopicsList(data)
          const topicParam = params.get('topic')
          if (topicParam && data.find(x => x.id === topicParam)) {
            setActive(topicParam)
            setParams({}, { replace: true })
          } else if (data.length > 0) {
            setActive(data[0].id)
          }
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
  }, [params, setParams])

  const topic = topicsList.find(t => t.id === active) || topicsList[0]
  const question = topic?.quiz ? topic.quiz[quizIdx] : undefined
  const evidence = topic ? (TOPIC_EVIDENCE[topic.id] || TOPIC_EVIDENCE.antarctica) : TOPIC_EVIDENCE.antarctica

  useEffect(() => {
    setQuizIdx(0)
    setPicked(null)
  }, [active])

  const totalQuestions = useMemo(() => {
    return topicsList.reduce((acc, t) => acc + (t.quiz?.length || 0), 0)
  }, [topicsList])

  const answeredCount = useMemo(() => {
    return Object.values(answers).reduce((acc, arr) => acc + arr.length, 0)
  }, [answers])

  const correctCount = useMemo(() => {
    let count = 0
    topicsList.forEach(t => {
      const p = answers[t.id] || []
      p.forEach((pickedOpt, qIndex) => {
        if (t.quiz && t.quiz[qIndex] && pickedOpt === t.quiz[qIndex].answer) {
          count++
        }
      })
    })
    return count
  }, [topicsList, answers])

  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

  const handleSelectOption = (index: number) => {
    if (picked !== null || !topic) return
    setPicked(index)
    setAnswers(prev => {
      const cur = prev[topic.id] ? [...prev[topic.id]] : []
      cur[quizIdx] = index
      return { ...prev, [topic.id]: cur }
    })
  }

  const handleNextQuestion = () => {
    setPicked(null)
    setQuizIdx(prev => prev + 1)
  }

  const handleResetQuiz = () => {
    if (!topic) return
    setPicked(null)
    setQuizIdx(0)
    setAnswers(prev => ({ ...prev, [topic.id]: [] }))
  }

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <PageHeader
        eyebrow={trans('Smart Education Platform', 'स्मार्ट शिक्षा मंच')}
        title={trans('Interactive Polar Science Laboratory', 'इंटरएक्टिव ध्रुवीय विज्ञान प्रयोगशाला')}
        sub={trans(
          'Calibrated for schools, colleges and university researchers. Switch between foundational concepts and scientific rigor, inspect direct expedition evidence, and test your knowledge.',
          'विद्यालयों, महाविद्यालयों और शोधकर्ताओं के लिए विशेष रूप से संरचित। बुनियादी अवधारणाओं और वैज्ञानिक गहराई के बीच स्विच करें, वास्तविक अभियान साक्ष्य देखें और ज्ञान परखें।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50/90 border-sky-300 text-sky-900 font-semibold px-3 py-1.5 rounded-full shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" /> {trans('SIH 2026 THEME · SMART EDUCATION', 'एसआईएच 2026 थीम · स्मार्ट एजुकेशन')}
          </span>
          <span className="editorial-badge-light bg-white/80 border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full">
            {trans('PROBLEM ID: 26063 · MINISTRY OF EARTH SCIENCES', 'समस्या आईडी: 26063 · पृथ्वी विज्ञान मंत्रालय')}
          </span>
        </div>
      </PageHeader>

      <Section className="pb-20">
        <Container>
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय ज्ञान लोड हो रहा है...')}</p>
            </div>
          ) : error ? (
            <EmptyState
              title={trans('Unable to load curriculum modules', 'पाठ्यक्रम मॉड्यूल लोड करने में असमर्थ')}
              message={error}
              action={<button onClick={() => window.location.reload()} className="btn-outline">{trans('Retry', 'पुनः प्रयास करें')}</button>}
            />
          ) : !topic ? (
            <EmptyState
              title={trans('Polar knowledge not found', 'ध्रुवीय ज्ञान मॉड्यूल नहीं मिला')}
              message={trans('No educational topics found in the database.', 'डेटाबेस में कोई शैक्षणिक विषय उपलब्ध नहीं हैं।')}
            />
          ) : (
            <div className="grid lg:grid-cols-[290px_1fr] gap-8 items-start">
              {/* Sidebar Topic Navigator */}
              <Reveal>
                <aside className="space-y-4 sticky top-24">
                  <div className="p-4 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl shadow-soft">
                    <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-sky-900 font-bold border-b border-sky-100 flex items-center justify-between">
                      <span>{trans('Curriculum Modules', 'पाठ्यक्रम मॉड्यूल')}</span>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">{topicsList.length}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {topicsList.map(t => {
                        const isSelected = active === t.id
                        const topicAnswers = answers[t.id] || []
                        const isCompleted = topicAnswers.length === t.quiz.length && t.quiz.length > 0
                        return (
                          <li key={t.id}>
                            <button
                              onClick={() => setActive(t.id)}
                              className={cn(
                                'w-full flex items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all duration-200',
                                isSelected 
                                   ? 'bg-slate-950 text-white shadow-md' 
                                   : 'text-slate-700 hover:bg-sky-50/80 hover:text-sky-950'
                              )}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="text-base">{t.emoji}</span>
                                <span className="truncate">{t.title}</span>
                              </span>
                              {isCompleted && (
                                <CheckCircle2 className={cn('w-4 h-4 shrink-0', isSelected ? 'text-sky-300' : 'text-emerald-600')} />
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Knowledge Progress Meter */}
                    <div className="mt-5 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-700">
                        <span className="uppercase tracking-wider font-semibold">{trans('Scholar Progress', 'अध्येता प्रगति')}</span>
                        <span className="font-bold text-sky-950">{progressPercent}%</span>
                      </div>
                      <div className="mt-2 w-full h-2 rounded-full bg-sky-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                        <span>{answeredCount}/{totalQuestions} {trans('questions', 'प्रश्न')}</span>
                        <span className="font-semibold text-sky-800">{correctCount} {trans('correct', 'सही')}</span>
                      </div>

                      {progressPercent > 50 && (
                        <button
                          onClick={() => setShowCert(true)}
                          className="btn-outline w-full !py-1.5 text-xs font-semibold mt-3 text-sky-950 border-sky-300 bg-white/90 hover:bg-white shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5 text-sky-600" /> {trans('View Polar Scholar Badge', 'ध्रुवीय अध्येता प्रमाणपत्र देखें')}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-sky-200/80 bg-white/80 backdrop-blur-xs text-xs text-slate-600 leading-relaxed shadow-xs">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5 font-display">
                      <Lightbulb className="w-4 h-4 text-amber-500" /> {trans('Educator Guide', 'शिक्षक मार्गदर्शिका')}
                    </div>
                    {trans(
                      'Teachers can integrate these modules into secondary & undergraduate geography, physics, and earth systems classes.',
                      'शिक्षक इन मॉड्यूल्स को माध्यमिक और स्नातक भूगोल, भौतिकी और पृथ्वी प्रणाली विज्ञान की कक्षाओं में एकीकृत कर सकते हैं।'
                    )}
                  </div>
                </aside>
              </Reveal>

              {/* Main Interactive Module View */}
              <div className="space-y-6">
                {/* Topic Header & Mode Switcher */}
                <Reveal>
                  <div data-tour="education-curriculum" className="p-6 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl p-3 rounded-2xl bg-sky-50 border border-sky-200/80 shadow-xs">{topic.emoji}</span>
                      <div>
                        <span className="editorial-badge-light bg-sky-50 text-sky-800 border-sky-200 text-[10px] font-bold tracking-wider">{trans('CURRICULUM TOPIC', 'पाठ्यक्रम विषय')}</span>
                        <h2 className="font-display text-2xl font-bold text-slate-950 mt-1">{topic.title}</h2>
                      </div>
                    </div>

                    {/* Dual Mode Lens Switcher */}
                    <div className="inline-flex p-1 bg-sky-50/80 rounded-xl border border-sky-200/80 self-start sm:self-auto shadow-xs">
                      <button
                        onClick={() => setMode('simple')}
                        data-tour="education-mode-simple"
                        className={cn(
                          'px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                          mode === 'simple' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-950'
                        )}
                      >
                        {trans('Foundational (Student)', 'बुनियादी (छात्र)')}
                      </button>
                      <button
                        onClick={() => setMode('scientific')}
                        data-tour="education-mode-scientific"
                        className={cn(
                          'px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                          mode === 'scientific' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:text-slate-950'
                        )}
                      >
                        {trans('Academic (Researcher)', 'वैज्ञानिक (शोधकर्ता)')}
                      </button>
                    </div>
                  </div>
                </Reveal>

                {/* Core Content Presentation */}
                <Reveal>
                  <div className="p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl shadow-soft space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-sky-800 font-bold border-b border-sky-100 pb-3">
                      <BookOpenCheck className="w-4 h-4 text-sky-600" />
                      <span>
                        {mode === 'simple' 
                          ? trans('FOUNDATIONAL EXPLANATION · MIDDLE & HIGH SCHOOL CURRICULUM', 'बुनियादी व्याख्या · माध्यमिक एवं उच्चतर माध्यमिक स्तर')
                          : trans('ACADEMIC SCIENTIFIC DESCRIPTION · PEER REVIEW GROUNDING', 'अकादमिक वैज्ञानिक व्याख्या · सहकर्मी-समीक्षित वैज्ञानिक आधार')}
                      </span>
                    </div>

                    <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                      {mode === 'simple' ? topic.simple : topic.scientific}
                    </p>

                    <div className="mt-4 pt-4 border-t border-sky-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-slate-600">{trans('Verified by NCPOR Polar Education Wing', 'एनसीपीओआर ध्रुवीय शिक्षा प्रभाग द्वारा सत्यापित')}</span>
                      <span className="text-sky-800 font-semibold">{trans('Switch modes anytime for side-by-side comparison', 'तुलना के लिए कभी भी मोड बदलें')}</span>
                    </div>
                  </div>
                </Reveal>

                {/* Direct Scientific Ground Truth Evidence */}
                <Reveal>
                  <div className="p-6 bg-gradient-to-r from-sky-50/90 via-white to-sky-50/60 border border-sky-200/90 rounded-2xl shadow-soft">
                    <div className="flex items-center gap-2 text-sky-900 font-mono text-xs uppercase tracking-wider font-bold mb-4">
                      <Compass className="w-4 h-4 text-sky-600" />
                      <span>{trans('Real In-Situ Scientific Evidence Backing This Lesson', 'इस पाठ का वास्तविक इन-सिटू वैज्ञानिक साक्ष्य')}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/80 border border-sky-100">
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{trans('OBSERVATORY BASE', 'वेधशाला आधार')}</div>
                        <div className="font-display font-bold text-slate-900 text-sm mt-0.5">{evidence.base}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-relaxed">{evidence.summary}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/80 border border-sky-100 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{trans('LINKED DATASET & EXPEDITION', 'संबद्ध डेटासेट एवं अभियान')}</div>
                          <Link to="/datasets" className="font-display font-bold text-sky-800 hover:text-sky-950 text-sm mt-0.5 inline-flex items-center gap-1 group">
                            <span>{evidence.datasetTitle}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <div className="text-xs text-slate-600 mt-1">{trans('Mission:', 'अभियान:')} {evidence.expedition}</div>
                        </div>
                        {evidence.sourceUrl && (
                          <div className="mt-3 pt-2.5 border-t border-sky-100">
                            <a
                              href={evidence.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-800 hover:text-sky-950 font-semibold"
                            >
                              <span>{evidence.sourceLabel || trans('Verify Official Source', 'आधिकारिक स्रोत पर सत्यापित करें')}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Two Column: Terminology Glossary & Interactive Quiz */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Glossary */}
                  <Reveal>
                    <div className="p-6 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl shadow-soft h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-900 font-bold mb-4 border-b border-sky-100 pb-2.5">
                          <FileText className="w-3.5 h-3.5 text-sky-600" /> {trans('Key Polar Terminology', 'प्रमुख ध्रुवीय शब्दावली')}
                        </div>
                        <dl className="space-y-3">
                          {topic.glossary.map(g => (
                            <div key={g.term} className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                              <dt className="font-display font-bold text-slate-950 text-sm">{g.term}</dt>
                              <dd className="text-xs text-slate-600 mt-1 leading-relaxed font-sans">{g.definition}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      <div className="mt-5 pt-3 border-t border-sky-100 text-[11px] font-mono text-slate-500">
                        {trans('Standard scientific taxonomy (IASC / SCAR)', 'मानक वैज्ञानिक शब्दावली (IASC / SCAR)')}
                      </div>
                    </div>
                  </Reveal>

                  {/* Interactive Quiz */}
                  <Reveal>
                    <div className="p-6 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-2xl shadow-soft h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-sky-900 font-bold mb-4 border-b border-sky-100 pb-2.5">
                          <span className="flex items-center gap-1.5 text-sky-800">
                            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> {trans('Comprehension Check', 'समझ मूल्यांकन')}
                          </span>
                          <span className="text-slate-500">{trans(`Question ${quizIdx + 1} of ${topic.quiz.length}`, `प्रश्न ${quizIdx + 1} / ${topic.quiz.length}`)}</span>
                        </div>

                        {question ? (
                          <div>
                            <div className="text-sm font-display font-bold text-slate-900 leading-relaxed mb-4">
                              {question.q}
                            </div>

                            <div className="space-y-2.5">
                              {question.options.map((opt, i) => {
                                const isAnswer = i === question.answer
                                const isPicked = picked === i
                                return (
                                  <button
                                    key={opt}
                                    onClick={() => handleSelectOption(i)}
                                    disabled={picked !== null}
                                    className={cn(
                                      'w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-medium transition-all',
                                      picked === null && 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50',
                                      picked !== null && isAnswer && 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold',
                                      picked !== null && isPicked && !isAnswer && 'border-rose-400 bg-rose-50 text-rose-950',
                                      picked !== null && !isPicked && !isAnswer && 'border-slate-100 opacity-50 bg-slate-50/50'
                                    )}
                                  >
                                    <span>{opt}</span>
                                    {picked !== null && isAnswer && (
                                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                    )}
                                    {picked !== null && isPicked && !isAnswer && (
                                      <XIcon className="w-4 h-4 text-rose-500 shrink-0" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>

                            {picked !== null && (
                              <div className="mt-4 p-3 rounded-xl bg-sky-50/70 border border-sky-200/80 text-xs">
                                <span className={picked === question.answer ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                                  {picked === question.answer 
                                    ? trans('Correct! Verified scientific answer.', 'सही उत्तर! वैज्ञानिक रूप से प्रमाणित तथ्य।') 
                                    : trans('Incorrect. The highlighted answer is scientifically correct.', 'गलत उत्तर। हरा चिन्हित विकल्प सही है।')}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500">{trans('Quiz complete for this topic.', 'इस विषय का क्विज़ पूर्ण हुआ।')}</div>
                        )}
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-sky-100 flex items-center justify-between">
                        <button
                          onClick={handleResetQuiz}
                          className="text-slate-500 hover:text-slate-900 text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" /> {trans('Reset Module', 'मॉड्यूल रीसेट करें')}
                        </button>

                        {picked !== null && quizIdx < topic.quiz.length - 1 ? (
                          <button
                            onClick={handleNextQuestion}
                            className="btn-primary !py-1.5 !px-3.5 text-xs font-semibold"
                          >
                            {trans('Next Question', 'अगला प्रश्न')} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : picked !== null ? (
                          <span className="text-xs font-mono text-emerald-700 font-bold">
                            {trans('Topic Finished!', 'विषय संपन्न!')}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Polar Scholar Certificate Modal */}
      {showCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up">
          <div className="max-w-lg w-full bg-white/98 backdrop-blur-md border border-sky-200 rounded-3xl p-8 text-center relative shadow-2xl">
            <button
              onClick={() => setShowCert(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 grid place-items-center mx-auto mb-4 shadow-xs">
              <Award className="w-8 h-8 text-sky-600" />
            </div>

            <span className="editorial-badge-light bg-sky-50 text-sky-900 border-sky-300 font-semibold px-3 py-1 rounded-full text-[10px]">
              {trans('SMART INDIA HACKATHON 2026 · SMART EDUCATION', 'स्मार्ट इंडिया हैकाथॉन 2026 · स्मार्ट एजुकेशन')}
            </span>

            <h3 className="font-display text-2xl font-bold text-slate-950 mt-3">
              {trans('Polaris Scholar Certification', 'पोलारिस अध्येता प्रमाणन')}
            </h3>

            <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
              {trans(
                'This digital badge confirms completion of polar cryospheric and atmospheric learning modules under India’s Polar Knowledge & Outreach Platform.',
                'यह डिजिटल बैज भारत के ध्रुवीय ज्ञान एवं आउटरीच प्लेटफॉर्म के तहत क्रायोस्फेरिक और वायुमंडलीय मॉड्यूल को सफलतापूर्वक पूर्ण करने की पुष्टि करता है।'
              )}
            </p>

            <div className="mt-4 mb-3 text-left">
              <label className="block text-[11px] font-mono uppercase text-slate-500 font-bold mb-1">
                {trans('Candidate Name for Certificate', 'प्रमाणपत्र हेतु अभ्यर्थी का नाम')}:
              </label>
              <input
                type="text"
                value={cadetName}
                onChange={e => setCadetName(e.target.value)}
                placeholder={trans('Enter your full name...', 'अपना पूरा नाम दर्ज करें...')}
                className="w-full px-3.5 py-2 text-xs bg-sky-50/80 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900"
              />
            </div>

            <div className="my-4 p-4 rounded-xl bg-sky-50/60 border border-sky-200/80 font-mono text-xs text-slate-700 space-y-1.5 text-left">
              <div className="flex justify-between"><span>{trans('Score Verified:', 'प्रमाणित स्कोर:')}</span> <strong className="text-slate-900">{correctCount} / {answeredCount || 1} {trans('Questions', 'प्रश्न')}</strong></div>
              <div className="flex justify-between"><span>{trans('Curriculum Level:', 'पाठ्यक्रम स्तर:')}</span> <strong className="text-slate-900">{trans('National Polar Sciences (Secondary/UG)', 'राष्ट्रीय ध्रुवीय विज्ञान (माध्यमिक/स्नातक)')}</strong></div>
              <div className="flex justify-between"><span>{trans('Issuer:', 'जारीकर्ता:')}</span> <strong className="text-slate-900">{trans('NCPOR · Ministry of Earth Sciences', 'एनसीपीओआर · पृथ्वी विज्ञान मंत्रालय')}</strong></div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleDownloadCertificate}
                className="btn-primary w-full text-xs !py-3 font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                {trans('Download Official Certificate (PNG)', 'आधिकारिक प्रमाणपत्र डाउनलोड करें (PNG)')}
              </button>
              <button
                type="button"
                onClick={() => setShowCert(false)}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
              >
                {trans('Close & Continue Learning', 'बंद करें और अध्ययन जारी रखें')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
