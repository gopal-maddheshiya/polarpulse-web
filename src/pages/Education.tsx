import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getEducation, type Topic } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import {
  ArrowRight, Check, X as XIcon, GraduationCap, Sparkles, BookOpenCheck,
  Award, RefreshCw, Compass, Database, FileText, CheckCircle2, ChevronRight,
  HelpCircle, Lightbulb
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
}

const TOPIC_EVIDENCE: Record<string, TopicEvidence> = {
  antarctica: {
    base: 'Bharati & Maitri Bases',
    expedition: '44th Indian Antarctic Expedition',
    datasetId: 'ds-atm-001',
    datasetTitle: 'Maitri Atmospheric Black Carbon',
    summary: 'Observations of boundary layer physics and continental plateau weather.',
  },
  arctic: {
    base: 'Himadri Station, Ny-Ålesund',
    expedition: '17th Indian Arctic Expedition (2024)',
    datasetId: 'ds-gla-003',
    datasetTitle: 'Kongsfjorden Fjord Dynamics',
    summary: 'Monitoring Atlantic water intrusion into High Arctic fjords via the IndARC mooring.',
  },
  'sea-ice': {
    base: 'MV Vasiliy Golovnin Cruise Track',
    expedition: '44th ISEA Southern Ocean Voyage',
    datasetId: 'ds-oce-002',
    datasetTitle: 'Southern Ocean CTD Transect',
    summary: 'In-situ sea-ice thickness profiling across the marginal ice zone.',
  },
  glaciers: {
    base: 'Larsemann Hills & Schirmacher Oasis',
    expedition: '43rd & 44th ISEA',
    datasetId: 'ds-gla-003',
    datasetTitle: 'Larsemann Shallow Firn Cores',
    summary: 'Firn core isotope profiling to reconstruct past accumulation and glacier mass balance.',
  },
  'polar-climate': {
    base: 'Maitri Automatic Weather Station',
    expedition: 'Continuous Polar Observations',
    datasetId: 'ds-atm-001',
    datasetTitle: 'Continuous AWS Meteorology',
    summary: 'Longest continuous meteorological time-series in East Antarctica since 1989.',
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
    <div>
      <PageHeader
        eyebrow={trans('Smart Education Platform', 'स्मार्ट शिक्षा मंच')}
        title={trans('Interactive Polar Science Laboratory', 'इंटरएक्टिव ध्रुवीय विज्ञान प्रयोगशाला')}
        sub={trans(
          'Calibrated for schools, colleges and university researchers. Switch between foundational concepts and scientific rigor, inspect direct expedition evidence, and test your knowledge.',
          'विद्यालयों, महाविद्यालयों और शोधकर्ताओं के लिए विशेष रूप से संरचित। बुनियादी अवधारणाओं और वैज्ञानिक गहराई के बीच स्विच करें, वास्तविक अभियान साक्ष्य देखें और ज्ञान परखें।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50 border-sky-300 text-sky-900 font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" /> {trans('SIH 2026 THEME · SMART EDUCATION', 'एसआईएच 2026 थीम · स्मार्ट एजुकेशन')}
          </span>
          <span className="editorial-badge-light">
            {trans('PROBLEM ID: 26063 · MINISTRY OF EARTH SCIENCES', 'समस्या आईडी: 26063 · पृथ्वी विज्ञान मंत्रालय')}
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3">
                <Compass className="w-5 h-5" />
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
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
              {/* Sidebar Topic Navigator */}
              <Reveal>
                <aside className="space-y-4 sticky top-24">
                  <div className="editorial-frame p-3 bg-white">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold border-b border-slate-100">
                      {trans('Curriculum Modules', 'पाठ्यक्रम मॉड्यूल')}
                    </div>
                    <ul className="mt-2 space-y-1">
                      {topicsList.map(t => {
                        const isSelected = active === t.id
                        const topicAnswers = answers[t.id] || []
                        const isCompleted = topicAnswers.length === t.quiz.length && t.quiz.length > 0
                        return (
                          <li key={t.id}>
                            <button
                              onClick={() => setActive(t.id)}
                              className={cn(
                                'w-full flex items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                                isSelected 
                                   ? 'bg-polar-950 text-white font-semibold shadow-xs' 
                                   : 'text-slate-700 hover:bg-slate-100'
                              )}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="text-base">{t.emoji}</span>
                                <span>{t.title}</span>
                              </span>
                              {isCompleted && (
                                <CheckCircle2 className={cn('w-4 h-4', isSelected ? 'text-cyan-300' : 'text-emerald-600')} />
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Knowledge Progress Meter */}
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                        <span className="uppercase tracking-wider font-semibold">{trans('Scholar Progress', 'अध्येता प्रगति')}</span>
                        <span className="font-bold text-cyan-800">{progressPercent}%</span>
                      </div>
                      <div className="mt-2 w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>{answeredCount}/{totalQuestions} {trans('questions', 'प्रश्न')}</span>
                        <span>{correctCount} {trans('correct', 'सही')}</span>
                      </div>

                      {progressPercent > 50 && (
                        <button
                          onClick={() => setShowCert(true)}
                          className="btn-outline w-full !py-1.5 text-xs font-semibold mt-3 text-cyan-900 border-cyan-300 bg-cyan-50 hover:bg-cyan-100"
                        >
                          <Award className="w-3.5 h-3.5 text-cyan-700" /> {trans('View Polar Scholar Badge', 'ध्रुवीय अध्येता प्रमाणपत्र देखें')}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 leading-relaxed">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
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
                  <div className="editorial-frame p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span className="text-4xl p-2.5 rounded-2xl bg-slate-50 border border-slate-200">{topic.emoji}</span>
                      <div>
                        <span className="editorial-badge-light">{trans('CURRICULUM TOPIC', 'पाठ्यक्रम विषय')}</span>
                        <h2 className="font-display text-2xl font-bold text-slate-950 mt-1">{topic.title}</h2>
                      </div>
                    </div>

                    {/* Dual Mode Lens Switcher */}
                    <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
                      <button
                        onClick={() => setMode('simple')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-xs font-semibold transition',
                          mode === 'simple' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        )}
                      >
                        {trans('Foundational (Student)', 'बुनियादी (छात्र)')}
                      </button>
                      <button
                        onClick={() => setMode('scientific')}
                        className={cn(
                          'px-4 py-2 rounded-lg text-xs font-semibold transition',
                          mode === 'scientific' ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        )}
                      >
                        {trans('Academic (Researcher)', 'वैज्ञानिक (शोधकर्ता)')}
                      </button>
                    </div>
                  </div>
                </Reveal>

                {/* Core Content Presentation */}
                <Reveal>
                  <div className="editorial-frame p-6 sm:p-8 bg-white space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-sky-800 font-semibold border-b border-slate-100 pb-3">
                      <BookOpenCheck className="w-3.5 h-3.5 text-sky-600" />
                      <span>
                        {mode === 'simple' 
                          ? trans('FOUNDATIONAL EXPLANATION · MIDDLE & HIGH SCHOOL CURRICULUM', 'बुनियादी व्याख्या · माध्यमिक एवं उच्चतर माध्यमिक स्तर')
                          : trans('ACADEMIC SCIENTIFIC DESCRIPTION · PEER REVIEW GROUNDING', 'अकादमिक वैज्ञानिक व्याख्या · सहकर्मी-समीक्षित वैज्ञानिक आधार')}
                      </span>
                    </div>

                    <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                      {mode === 'simple' ? topic.simple : topic.scientific}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono">{trans('Verified by NCPOR Polar Education Wing', 'एनसीपीओआर ध्रुवीय शिक्षा प्रभाग द्वारा सत्यापित')}</span>
                      <span className="text-sky-800 font-medium">{trans('Switch modes anytime for side-by-side comparison', 'तुलना के लिए कभी भी मोड बदलें')}</span>
                    </div>
                  </div>
                </Reveal>

                {/* Direct Scientific Ground Truth Evidence */}
                <Reveal>
                  <div className="editorial-frame p-6 bg-gradient-to-r from-sky-50/50 via-white to-slate-50 border-sky-200/80">
                    <div className="flex items-center gap-2 text-sky-900 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
                      <Compass className="w-4 h-4 text-sky-700" />
                      <span>{trans('Real In-Situ Scientific Evidence Backing This Lesson', 'इस पाठ का वास्तविक इन-सिटू वैज्ञानिक साक्ष्य')}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 font-mono">{trans('OBSERVATORY BASE', 'वेधशाला आधार')}</div>
                        <div className="font-display font-bold text-slate-900 text-sm mt-0.5">{evidence.base}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-relaxed">{evidence.summary}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-mono">{trans('LINKED DATASET & EXPEDITION', 'संबद्ध डेटासेट एवं अभियान')}</div>
                        <Link to="/datasets" className="font-display font-bold text-sky-800 hover:underline text-sm mt-0.5 block">
                          {evidence.datasetTitle} →
                        </Link>
                        <div className="text-xs text-slate-600 mt-1">{trans('Mission:', 'अभियान:')} {evidence.expedition}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Two Column: Terminology Glossary & Interactive Quiz */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Glossary */}
                  <Reveal>
                    <div className="editorial-frame p-6 bg-white h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4 border-b border-slate-100 pb-2">
                          <FileText className="w-3.5 h-3.5 text-sky-600" /> {trans('Key Polar Terminology', 'प्रमुख ध्रुवीय शब्दावली')}
                        </div>
                        <dl className="space-y-4">
                          {topic.glossary.map(g => (
                            <div key={g.term} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                              <dt className="font-display font-bold text-slate-950 text-sm">{g.term}</dt>
                              <dd className="text-xs text-slate-600 mt-1 leading-relaxed">{g.definition}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                        {trans('Standard scientific taxonomy (IASC / SCAR)', 'मानक वैज्ञानिक शब्दावली (IASC / SCAR)')}
                      </div>
                    </div>
                  </Reveal>

                  {/* Interactive Quiz */}
                  <Reveal>
                    <div className="editorial-frame p-6 bg-white h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4 border-b border-slate-100 pb-2">
                          <span className="flex items-center gap-1.5 text-cyan-800">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> {trans('Comprehension Check', 'समझ मूल्यांकन')}
                          </span>
                          <span>{trans(`Question ${quizIdx + 1} of ${topic.quiz.length}`, `प्रश्न ${quizIdx + 1} / ${topic.quiz.length}`)}</span>
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
                                      'w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-medium transition-all',
                                      picked === null && 'border-slate-200 hover:border-slate-400 hover:bg-slate-50',
                                      picked !== null && isAnswer && 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold',
                                      picked !== null && isPicked && !isAnswer && 'border-rose-400 bg-rose-50 text-rose-950',
                                      picked !== null && !isPicked && !isAnswer && 'border-slate-100 opacity-50'
                                    )}
                                  >
                                    <span>{opt}</span>
                                    {picked !== null && isAnswer && (
                                      <Check className="w-4 h-4 text-emerald-600" />
                                    )}
                                    {picked !== null && isPicked && !isAnswer && (
                                      <XIcon className="w-4 h-4 text-rose-500" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>

                            {picked !== null && (
                              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
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

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={handleResetQuiz}
                          className="text-slate-500 hover:text-slate-900 text-xs font-mono inline-flex items-center gap-1"
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
                          <span className="text-xs font-mono text-emerald-700 font-semibold">
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up">
          <div className="scientific-frame max-w-lg w-full bg-white p-8 text-center relative shadow-2xl">
            <button
              onClick={() => setShowCert(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-lg"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 grid place-items-center mx-auto mb-4">
              <Award className="w-8 h-8 text-cyan-600" />
            </div>

            <span className="telemetry-badge bg-cyan-50 text-cyan-900 border-cyan-300">
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

            <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
              <div>{trans('Score Verified:', 'प्रमाणित स्कोर:')} <strong className="text-slate-900">{correctCount} / {answeredCount} {trans('Questions', 'प्रश्न')}</strong></div>
              <div>{trans('Curriculum Level:', 'पाठ्यक्रम स्तर:')} <strong className="text-slate-900">{trans('National Polar Sciences (Secondary/UG)', 'राष्ट्रीय ध्रुवीय विज्ञान (माध्यमिक/स्नातक)')}</strong></div>
              <div>{trans('Issuer:', 'जारीकर्ता:')} <strong className="text-slate-900">{trans('NCPOR · Ministry of Earth Sciences', 'एनसीपीओआर · पृथ्वी विज्ञान मंत्रालय')}</strong></div>
            </div>

            <button
              onClick={() => setShowCert(false)}
              className="btn-primary w-full text-xs !py-2.5 font-semibold"
            >
              {trans('Close & Continue Learning', 'बंद करें और अध्ययन जारी रखें')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
