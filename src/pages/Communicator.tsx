import { useState } from 'react'
import { PageHeader } from '../components/ui/Page'
import { Container, Section } from '../components/ui/Primitives'
import { generateAIDrafts, type Audience, AI_SERVICE_INFO } from '../lib/aiService'
import {
  Sparkles, Copy, Check, Wand2, FileText, Mic, AtSign, Video,
  AlertTriangle, ArrowRight, Share2, Layers, Download, CheckCircle2,
  BookOpen, Radio, ShieldCheck
} from 'lucide-react'
import { cn } from '../lib/utils'
import { Reveal } from '../lib/reveal'

const AUDIENCES: { id: Audience; label: string; desc: string; readingLevel: string }[] = [
  { id: 'Student', label: 'School Student', desc: '8th–10th grade reading level, conceptual analogies', readingLevel: 'Grade 8–10' },
  { id: 'Teacher', label: 'Educator / Teacher', desc: 'Classroom discussion points & lesson questions', readingLevel: 'Pedagogical' },
  { id: 'Researcher', label: 'Peer Scientist', desc: 'Technical metrics, methodology, citations', readingLevel: 'Academic' },
  { id: 'General Public', label: 'General Public', desc: 'Storytelling narrative, societal importance', readingLevel: 'Accessible' },
]

const REAL_POLAR_SAMPLES = [
  {
    title: 'Maitri Atmospheric Black Carbon',
    category: 'Atmospheric Physics',
    text: 'A seasonal analysis of equivalent black carbon (EBC) mass concentration at Maitri station in the Schirmacher Oasis, East Antarctica. Utilizing a 7-wavelength Aethalometer and HYSPLIT back-trajectories, the study identifies episodic long-range transport events originating from biomass burning in southern Africa, superimposed upon a pristine marine background averaging 8.4 ng/m³.',
  },
  {
    title: 'IndARC Kongsfjorden Mooring',
    category: 'Arctic Oceanography',
    text: 'Moored multi-sensor observations from India’s IndARC observatory deployed at 192 m depth in Kongsfjorden, Svalbard. Continuous CTD, ADCP and dissolved oxygen telemetry records seasonal pulses of warm, saline transformed Atlantic Water (TAW) intruding into the fjord during late winter, suppressing sea-ice formation and impacting Arctic copepod reproduction.',
  },
  {
    title: 'Larsemann Firn Core Isotopes',
    category: 'Glaciology & Ice Cores',
    text: 'Stable water isotope (δ¹⁸O, δD) and major ion stratigraphy recovered from a 12-meter firn core near Bharati station, Larsemann Hills. Reconstructed accumulation rates indicate a 14% increase in precipitation over Prydz Bay coastal margins during 2010–2024, linked to intensifying Southern Annular Mode (SAM) positive phases.',
  },
]

type OutputTab = 'simple' | 'article' | 'social' | 'instagram' | 'video'

export default function Communicator() {
  const [input, setInput] = useState('')
  const [audience, setAudience] = useState<Audience>('Student')
  const [loading, setLoading] = useState(false)
  const [draft, setDraft] = useState<Awaited<ReturnType<typeof generateAIDrafts>> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<OutputTab>('article')

  async function handleGenerate() {
    if (!input.trim()) {
      setError('Please provide a scientific report abstract or research summary.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const result = await generateAIDrafts(input, audience)
      setDraft(result)
    } catch (e: any) {
      setError(e.message || 'Error occurred during draft transformation.')
    } finally {
      setLoading(false)
    }
  }

  function copyToClipboard(key: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  function handleDownloadDraft() {
    if (!draft) return
    const content = `POLARIS AI SCIENCE DISSEMINATION REPORT
Target Audience: ${audience}
Generated: ${new Date().toLocaleDateString()}

========================================
1. SIMPLE EXPLANATION
========================================
${draft.simpleExplanation}

========================================
2. WEBSITE ARTICLE
========================================
${draft.websiteArticle}

========================================
3. SOCIAL POST (X / LINKEDIN)
========================================
${draft.socialPost}

========================================
4. INSTAGRAM CAPTION
========================================
${draft.instagramCaption}

========================================
5. VIDEO SCRIPT (60s)
========================================
${draft.videoScript}

========================================
Disclaimer: AI-assisted draft — verify scientific accuracy before publication.
`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `polaris-draft-${audience.toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI Science Communicator"
        title="From Peer Review to Public Outreach"
        sub="Transform dense expedition findings into channel-specific outreach content. Bridge the gap between polar laboratories and schools, journalists, and social media."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50 border-sky-300 text-sky-900 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> MULTI-FORMAT SCIENCE DISSEMINATION
          </span>
          <span className="editorial-badge-light">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> FACT-CHECKED POLAR DOMAIN RULES
          </span>
        </div>
      </PageHeader>

      {/* 4-Stage Workflow Visualizer */}
      <div className="border-b border-slate-200 bg-slate-50/70 py-4">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white grid place-items-center text-[10px] font-bold">1</span>
              <span>Scientific Abstract</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white grid place-items-center text-[10px] font-bold">2</span>
              <span>Audience Lens</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white grid place-items-center text-[10px] font-bold">3</span>
              <span>Linguistic Mapping</span>
            </div>
            <div className="flex items-center gap-2 text-sky-800 font-semibold">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white grid place-items-center text-[10px] font-bold">4</span>
              <span>5 Channel Drafts</span>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">
              {/* Input Formulation Panel */}
              <div className="editorial-frame p-6 bg-white space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="editorial-badge-light">STAGE 1 & 2</span>
                    <h3 className="font-display text-lg font-bold text-slate-950 mt-1">Research Input Formulation</h3>
                  </div>
                  <span className="font-mono text-xs text-slate-400">{input.length} characters</span>
                </div>

                {/* Pre-Loaded Real Indian Polar Papers */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                    Load Authenticated Indian Polar Abstracts:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {REAL_POLAR_SAMPLES.map(sample => (
                      <button
                        key={sample.title}
                        onClick={() => {
                          setInput(sample.text)
                          setDraft(null)
                        }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-slate-50 text-left transition text-xs"
                      >
                        <div className="font-semibold text-slate-900 line-clamp-1">{sample.title}</div>
                        <div className="text-[10px] font-mono text-cyan-800 mt-0.5">{sample.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea Input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5 font-semibold">
                    Raw Scientific Abstract / Expedition Report
                  </label>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Paste research abstract, expedition telemetry report, or methodology paper here…"
                    className="w-full h-44 rounded-xl border border-slate-200 p-3.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-y font-sans placeholder:text-slate-400"
                  />
                </div>

                {/* Target Audience Calibration */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                    Target Dissemination Persona
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AUDIENCES.map(a => {
                      const isSelected = audience === a.id
                      return (
                        <button
                          key={a.id}
                          onClick={() => setAudience(a.id)}
                          className={cn(
                            'p-3 rounded-xl border text-left transition-all',
                            isSelected
                              ? 'border-polar-950 bg-polar-950 text-white shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                          )}
                        >
                          <div className="font-display font-bold text-xs flex items-center justify-between">
                            <span>{a.label}</span>
                            <span className={cn('text-[9px] font-mono px-1.5 py-0.5 rounded', isSelected ? 'bg-white/20 text-cyan-300' : 'bg-slate-100 text-slate-600')}>
                              {a.readingLevel}
                            </span>
                          </div>
                          <div className={cn('text-[11px] mt-1 line-clamp-1', isSelected ? 'text-slate-300' : 'text-slate-500')}>
                            {a.desc}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Generation Triggers */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="btn bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex-1 !py-3 transition rounded-xl"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                    {loading ? 'Synthesizing Multichannel Drafts…' : 'Generate Dissemination Drafts'}
                  </button>

                  <button
                    onClick={() => { setInput(''); setDraft(null); setError(null) }}
                    className="btn-outline !py-3 text-xs"
                  >
                    Clear
                  </button>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Honest AI Governance Box */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px] text-slate-600 leading-relaxed font-mono">
                  <span className="font-bold text-slate-800">EDITORIAL SAFEGUARD:</span> AI-assisted draft — all statistics and findings should be verified by the principal investigator before public release.
                </div>
              </div>

              {/* Multi-Channel Output Workspace */}
              <div className="space-y-4">
                {/* Empty State */}
                {!draft && !loading && (
                  <div className="editorial-frame p-12 bg-white text-center border-dashed border-2">
                    <Sparkles className="w-10 h-10 text-sky-600 mx-auto opacity-70 mb-3 animate-pulse" />
                    <h4 className="font-display font-bold text-slate-900 text-lg">Multi-Channel Dissemination Desk</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                      Select an Indian polar research sample or paste your expedition report to synthesize educational texts, news articles, and social media releases.
                    </p>
                  </div>
                )}

                {/* Loading Skeleton */}
                {loading && (
                  <div className="editorial-frame p-6 bg-white space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-24 bg-slate-100 rounded-xl" />
                    <div className="h-20 bg-slate-100 rounded-xl" />
                    <div className="h-20 bg-slate-100 rounded-xl" />
                  </div>
                )}

                {/* Generated Multi-Channel Workspace */}
                {draft && !loading && (
                  <div className="editorial-frame bg-white shadow-md">
                    {/* Channel Selector Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50/70">
                      <div className="flex items-center gap-1 overflow-x-auto">
                        <button
                          onClick={() => setActiveTab('article')}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5',
                            activeTab === 'article' ? 'bg-polar-950 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                          )}
                        >
                          <FileText className="w-3.5 h-3.5" /> Web Article
                        </button>
                        <button
                          onClick={() => setActiveTab('simple')}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5',
                            activeTab === 'simple' ? 'bg-polar-950 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                          )}
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Simple Explanation
                        </button>
                        <button
                          onClick={() => setActiveTab('social')}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5',
                            activeTab === 'social' ? 'bg-polar-950 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                          )}
                        >
                          <Share2 className="w-3.5 h-3.5" /> X / Social Post
                        </button>
                        <button
                          onClick={() => setActiveTab('video')}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5',
                            activeTab === 'video' ? 'bg-polar-950 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                          )}
                        >
                          <Video className="w-3.5 h-3.5" /> 60s Video Script
                        </button>
                        <button
                          onClick={() => setActiveTab('instagram')}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5',
                            activeTab === 'instagram' ? 'bg-polar-950 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                          )}
                        >
                          <AtSign className="w-3.5 h-3.5" /> Instagram Carousel
                        </button>
                      </div>

                      <button
                        onClick={handleDownloadDraft}
                        className="btn-outline !py-1.5 !px-2.5 text-xs shrink-0 flex items-center gap-1 ml-2"
                        title="Download all formats as text file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export Package</span>
                      </button>
                    </div>

                    {/* Channel Content Body */}
                    <div className="p-6">
                      {activeTab === 'article' && (
                        <ChannelCard
                          title="Portal Web Article & Press Release"
                          badge="EDITORIAL / CMS READY"
                          text={draft.websiteArticle}
                          copiedKey="article"
                          copied={copied}
                          onCopy={copyToClipboard}
                        />
                      )}

                      {activeTab === 'simple' && (
                        <ChannelCard
                          title="Foundational Classroom Explanation"
                          badge="8TH–10TH GRADE READING LEVEL"
                          text={draft.simpleExplanation}
                          copiedKey="simple"
                          copied={copied}
                          onCopy={copyToClipboard}
                        />
                      )}

                      {activeTab === 'social' && (
                        <ChannelCard
                          title="Social Media Broadcast (X / LinkedIn)"
                          badge="THREAD WITH HASHTAGS"
                          text={draft.socialPost}
                          copiedKey="social"
                          copied={copied}
                          onCopy={copyToClipboard}
                        />
                      )}

                      {activeTab === 'video' && (
                        <ChannelCard
                          title="60-Second Short Video / Reel Script"
                          badge="VOICEOVER + B-ROLL PROMPTS"
                          text={draft.videoScript}
                          copiedKey="video"
                          copied={copied}
                          onCopy={copyToClipboard}
                        />
                      )}

                      {activeTab === 'instagram' && (
                        <ChannelCard
                          title="Visual Storytelling & Carousel Caption"
                          badge="VISUAL SLIDE BREAKDOWN"
                          text={draft.instagramCaption}
                          copiedKey="ig"
                          copied={copied}
                          onCopy={copyToClipboard}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}

function ChannelCard({
  title,
  badge,
  text,
  copiedKey,
  copied,
  onCopy,
}: {
  title: string
  badge: string
  text: string
  copiedKey: string
  copied: string | null
  onCopy: (key: string, val: string) => void
}) {
  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="telemetry-badge">{badge}</span>
          <h4 className="font-display font-bold text-slate-900 text-base mt-1">{title}</h4>
        </div>
        <button
          onClick={() => onCopy(copiedKey, text)}
          className={cn(
            'btn-outline !py-1.5 !px-3 text-xs flex items-center gap-1.5 font-semibold transition',
            copied === copiedKey && 'border-emerald-500 bg-emerald-50 text-emerald-800'
          )}
        >
          {copied === copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied === copiedKey ? 'Copied to Clipboard' : 'Copy Output'}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed font-sans font-normal">
          {text}
        </pre>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Channel Word Count: {text.split(/\s+/).length} words</span>
        <span>Review for scientific nuances prior to broadcasting</span>
      </div>
    </div>
  )
}
