import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Sparkles, X, Send, ArrowRight, RefreshCw,
  Compass, ShieldCheck, GraduationCap,
  Globe, AlertCircle, ExternalLink, BookOpen, Atom
} from 'lucide-react'
import {
  askPolarisAI, extractPageContext, getPageSuggestions,
  type Audience, type ChatMessage, type PageContext
} from '../lib/polarisAI'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'

/**
 * Parses markdown inline tokens like **bold**, *italic*, and `code`
 */
function renderInlineMarkdown(text: string, isUser = false): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong
          key={match.index}
          className={cn('font-semibold', isUser ? 'text-white' : 'text-slate-900 dark:text-slate-100')}
        >
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic">
          {token.slice(1, -1)}
        </em>
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className={cn(
            'px-1.5 py-0.5 rounded font-mono text-[11px]',
            isUser
              ? 'bg-white/20 text-white'
              : 'bg-sky-100/70 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60'
          )}
        >
          {token.slice(1, -1)}
        </code>
      )
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

/**
 * Formats AI response text with line breaks, bold headers, and styled lists
 */
function FormattedMessageText({ content, isUser = false }: { content: string; isUser?: boolean }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-2 font-sans leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1" />
        }

        // Bullet point check
        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')
        const lineContent = isBullet ? trimmed.replace(/^[\*\-•]\s+/, '') : line

        // Numbered list item check
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className={cn('text-xs shrink-0 leading-normal font-bold', isUser ? 'text-sky-200' : 'text-cyan-600 dark:text-cyan-400')}>
                •
              </span>
              <span className="flex-1">{renderInlineMarkdown(lineContent, isUser)}</span>
            </div>
          )
        }

        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className={cn(
                'text-[10px] font-mono font-bold shrink-0 leading-normal px-1 rounded',
                isUser
                  ? 'bg-white/20 text-white'
                  : 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/50'
              )}>
                {numMatch[1]}
              </span>
              <span className="flex-1">{renderInlineMarkdown(numMatch[2], isUser)}</span>
            </div>
          )
        }

        return (
          <div key={idx}>
            {renderInlineMarkdown(line, isUser)}
          </div>
        )
      })}
    </div>
  )
}

export default function PolarisAI() {
  const { isHindi, trans } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [audience, setAudience] = useState<Audience>('General Public')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const location = useLocation()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const targetBufferRef = useRef('')
  const displayedBufferRef = useRef('')
  const typingTimerRef = useRef<any>(null)
  const isCompleteRef = useRef(false)
  const pendingDoneRef = useRef<{ fullText: string; source: string; sourceUrl?: string; officialSourceUrl?: string; officialSourceLabel?: string } | null>(null)

  // Current page context
  const pageContext: PageContext = useMemo(() => {
    return extractPageContext(location.pathname)
  }, [location.pathname])

  // Contextual suggested questions
  const suggestions = useMemo(() => {
    return getPageSuggestions(pageContext, isHindi)
  }, [pageContext, isHindi])

  // Auto-scroll to bottom as text arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent])

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Reset streaming state and timer on unmount
  useEffect(() => {
    return () => {
      setIsStreaming(false)
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current)
        typingTimerRef.current = null
      }
    }
  }, [])

  // Listen for automated demo tour events
  useEffect(() => {
    const onOpenAI = (e: any) => {
      setIsOpen(true)
      const prompt = e.detail?.prompt
      if (prompt) {
        setTimeout(() => {
          handleSend(prompt)
        }, 400)
      }
    }
    const onCloseAI = () => {
      setIsOpen(false)
    }

    window.addEventListener('polaris:open-ai', onOpenAI as EventListener)
    window.addEventListener('polaris:close-ai', onCloseAI as EventListener)
    return () => {
      window.removeEventListener('polaris:open-ai', onOpenAI as EventListener)
      window.removeEventListener('polaris:close-ai', onCloseAI as EventListener)
    }
  }, [])

  const handleSend = async (questionText?: string) => {
    const textToSend = (questionText || input).trim()
    if (!textToSend || isStreaming) return

    setInput('')
    setError(null)

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsStreaming(true)
    setStreamingContent('')

    targetBufferRef.current = ''
    displayedBufferRef.current = ''
    isCompleteRef.current = false
    pendingDoneRef.current = null

    // High-refresh fluid typewriter loop (~70 FPS)
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
    typingTimerRef.current = setInterval(() => {
      const target = targetBufferRef.current
      const current = displayedBufferRef.current
      if (current.length < target.length) {
        const remaining = target.length - current.length
        const step = remaining > 100 ? 8 : remaining > 40 ? 4 : remaining > 15 ? 2 : 1
        const next = target.slice(0, current.length + step)
        displayedBufferRef.current = next
        setStreamingContent(next)
      } else if (isCompleteRef.current && pendingDoneRef.current) {
        clearInterval(typingTimerRef.current)
        typingTimerRef.current = null
        const { fullText, source, sourceUrl, officialSourceUrl, officialSourceLabel } = pendingDoneRef.current
        setMessages(prev => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: fullText,
            source,
            sourceUrl,
            officialSourceUrl,
            officialSourceLabel,
            timestamp: Date.now(),
          },
        ])
        setStreamingContent('')
        setIsStreaming(false)
        pendingDoneRef.current = null
      }
    }, 14)

    await askPolarisAI({
      messages: updatedMessages,
      pageContext,
      audience,
      isHindi,
      onChunk: (_delta, accumulated) => {
        targetBufferRef.current = accumulated
      },
      onDone: (fullText, source, sourceUrl, officialSourceUrl, officialSourceLabel) => {
        targetBufferRef.current = fullText
        isCompleteRef.current = true
        pendingDoneRef.current = { fullText, source, sourceUrl, officialSourceUrl, officialSourceLabel }
      },
      onError: () => {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current)
          typingTimerRef.current = null
        }
        setError(trans("Sorry, I couldn't process that right now. Please try again.", "क्षमा करें, मैं इसे अभी प्रोसेस नहीं कर सका। कृपया पुनः प्रयास करें।"))
        setIsStreaming(false)
        setStreamingContent('')
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current)
      typingTimerRef.current = null
    }
    setMessages([])
    setStreamingContent('')
    setError(null)
  }

  const audienceOptions: { id: Audience; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'General Public', label: trans('Public', 'जनसामान्य'), desc: trans('Clear, accessible storytelling', 'सरल एवं सुगम व्याख्या'), icon: Globe },
    { id: 'Student', label: trans('Student', 'छात्र'), desc: trans('Simple everyday analogies (8th–10th)', 'सरल दैनिक उदाहरण'), icon: GraduationCap },
    { id: 'Teacher', label: trans('Teacher', 'शिक्षक'), desc: trans('Pedagogical talking points', 'शैक्षणिक मुख्य बिंदु'), icon: BookOpen },
    { id: 'Researcher', label: trans('Researcher', 'शोधकर्ता'), desc: trans('Rigorous scientific terminology', 'सटीक वैज्ञानिक शब्दावली'), icon: Atom },
  ]

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText)
  }

  return (
    <>
      {/* 1. FLOATING POLARIS AI LAUNCH BUTTON (LUXURY POLAR CYBER-GLASS PILL) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={trans('Open POLARIS AI assistant', 'पोलारिस एआई खोलें')}
          className="fixed bottom-5 right-5 z-40 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
        >
          {/* Animated aurora background glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 opacity-60 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:scale-105" />

          {/* Frosted Glass Pill Capsule */}
          <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-950/90 dark:bg-[#071524]/95 text-white backdrop-blur-xl border border-cyan-400/40 shadow-xl shadow-cyan-950/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute -top-0.5 -right-0.5 animate-ping opacity-80" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-sky-600/30 border border-cyan-400/50 text-cyan-300 grid place-items-center shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="text-left leading-none pr-1">
              <div className="text-xs font-display font-bold tracking-wide flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent font-bold">
                  {trans('Ask POLARIS', 'पोलारिस से पूछें')}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-bold uppercase tracking-wider">
                  AI
                </span>
              </div>
              <div className="text-[9.5px] font-mono text-cyan-300/80 mt-1 hidden sm:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{trans('MoES Polar Guide', 'ध्रुवीय मार्गदर्शक')}</span>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* 2. CHAT PANEL / BOTTOM SHEET (FROSTED GLASS COMMAND CENTER) */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 sm:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            data-tour="polaris-ai-drawer"
            role="dialog"
            aria-label="POLARIS AI Chat Panel"
            className={cn(
              'fixed z-50 flex flex-col bg-white/95 dark:bg-[#081523]/95 backdrop-blur-2xl shadow-2xl border border-sky-200/70 dark:border-cyan-900/50 overflow-hidden',
              // Mobile full-width bottom sheet (below 640px) with safe top margin to breathe below navbar
              'max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-16 max-sm:rounded-t-3xl max-sm:border-b-0 max-sm:animate-slide-up',
              // Tablet & Desktop: floating window strictly anchored to bottom-right
              'sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-[430px] sm:h-[640px] sm:max-h-[86vh] sm:rounded-3xl shadow-2xl shadow-cyan-950/30 sm:animate-scale-in'
            )}
          >
          {/* Mobile pull indicator */}
          <div className="sm:hidden w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto my-1.5 shrink-0" />

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-[#071a2c] to-slate-950 text-white p-3.5 sm:p-4 shrink-0 flex items-center justify-between border-b border-cyan-900/40 relative overflow-hidden">
            {/* Ambient Aurora Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-sky-500/15 blur-xl pointer-events-none" />

            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500/25 to-sky-600/30 border border-cyan-400/40 grid place-items-center text-cyan-300 shadow-inner shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-bold tracking-wide bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent">
                    {trans('Ask POLARIS', 'पोलारिस से पूछें')}
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-bold uppercase tracking-wider">
                    AI
                  </span>
                </div>
                <div className="text-[10px] text-slate-300/80 leading-tight flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{trans("India's Polar Science Assistant", 'भारत का ध्रुवीय विज्ञान सहायक')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                aria-label="Close assistant"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Header: Active Page Context & Audience Lens Selector */}
          <div className="bg-sky-50/70 dark:bg-[#091827] border-b border-sky-100 dark:border-cyan-950/80 px-3.5 py-2.5 shrink-0 flex flex-col gap-2 text-xs">
            {/* Active page indicator */}
            <div className="flex items-center justify-between gap-2 text-[10.5px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-xs shadow-cyan-500" />
                <span className="text-slate-500 dark:text-slate-400">{trans('Viewing:', 'पेज:')}</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate">{pageContext.title}</span>
              </div>
              <span className="text-[9.5px] text-cyan-700 dark:text-cyan-400 bg-cyan-100/70 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-300/40 dark:border-cyan-800/40 shrink-0 font-medium hidden sm:inline">
                {pageContext.type}
              </span>
            </div>

            {/* Audience Segmented Selector */}
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-sky-200/60 dark:border-slate-800/80">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 shrink-0">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {trans('Lens:', 'लेंस:')}
              </span>
              <div className="grid grid-cols-4 gap-1 bg-slate-200/60 dark:bg-[#06121e] p-1 rounded-xl border border-slate-300/50 dark:border-slate-800/80 flex-1 max-w-[280px]">
                {audienceOptions.map(a => {
                  const Icon = a.icon
                  const isActive = audience === a.id
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      title={a.desc}
                      className={cn(
                        'flex items-center justify-center gap-1 py-1 px-1 rounded-lg transition-all font-mono text-[10px]',
                        isActive
                          ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold shadow-xs shadow-cyan-900/30'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                      )}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{a.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 3. SCROLLABLE MESSAGES FEED */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-sky-50/40 via-white/50 to-sky-50/30 dark:from-[#06101a] dark:via-[#07131e] dark:to-[#06101a]">
            {/* Initial Welcome Banner when empty */}
            {messages.length === 0 && !streamingContent && (
              <div className="space-y-3.5 py-1">
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1f32] border border-sky-200/80 dark:border-cyan-900/50 shadow-sm relative overflow-hidden space-y-2">
                  <Compass className="absolute -right-3 -bottom-3 w-20 h-20 text-sky-100/60 dark:text-cyan-950/40 pointer-events-none select-none" />

                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                    <Compass className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{trans('Ask POLARIS', 'पोलारिस से पूछें')}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {trans("Understand India's polar science in simple language.", "भारत के ध्रुवीय विज्ञान को सरल भाषा में समझें।")}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans relative z-10">
                    {trans(
                      "Ask me about India’s 44 Antarctic expeditions, the Arctic station of Himadri, research bases Maitri and Bharati, or open scientific datasets.",
                      "भारत के 44 अंटार्कटिक अभियानों, हिमाद्री आर्कटिक स्टेशन, मैत्री और भारती अनुसंधान केंद्रों या वैज्ञानिक डेटासेट्स के बारे में पूछें।"
                    )}
                  </p>
                  <div className="text-[10.5px] font-mono text-cyan-700/80 dark:text-cyan-400/80 pt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>{trans('Supports English, हिन्दी and Hinglish questions.', 'अंग्रेजी, हिन्दी और हिंग्लिश में प्रश्न पूछें।')}</span>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-500" />
                    <span>{trans('Suggested Questions:', 'सुझावित प्रश्न:')}</span>
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="w-full text-left p-2.5 px-3 rounded-xl border border-sky-200/70 dark:border-cyan-900/40 bg-white/90 dark:bg-[#0c1f32]/90 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-sky-50/80 dark:hover:bg-[#10273f] text-xs text-slate-850 dark:text-slate-100 transition-all flex items-center justify-between group shadow-2xs hover:shadow-sm hover:translate-x-0.5"
                      >
                        <span className="line-clamp-1 font-medium">{sug}</span>
                        <ArrowRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Conversation History */}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col',
                  msg.role === 'user' ? 'items-end' : 'items-start max-w-[94%]'
                )}
              >
                {/* Assistant Label */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1 ml-1 text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-cyan-500" />
                    <span>POLARIS AI</span>
                  </div>
                )}

                <div
                  className={cn(
                    'p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed font-sans shadow-sm',
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-sky-600 via-sky-600 to-cyan-600 text-white rounded-tr-xs max-w-[88%]'
                      : 'bg-white dark:bg-[#0c1f32] border border-sky-200/80 dark:border-cyan-900/50 text-slate-850 dark:text-slate-100 rounded-tl-xs w-full'
                  )}
                >
                  <FormattedMessageText content={msg.content} isUser={msg.role === 'user'} />
                </div>

                {/* Source attribution on assistant responses */}
                {msg.role === 'assistant' && (msg.source || msg.officialSourceUrl) && (
                  <div className="mt-2 ml-1 text-[10.5px] font-mono text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
                    {msg.source && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 shadow-2xs">
                        <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        {msg.sourceUrl ? (
                          <a
                            href={msg.sourceUrl}
                            className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100 hover:underline inline-flex items-center gap-1 font-semibold transition"
                            title="View in POLARIS Repository"
                          >
                            <span>{msg.source}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{msg.source}</span>
                        )}
                      </div>
                    )}
                    {msg.officialSourceUrl && (
                      <a
                        href={msg.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 hover:underline font-semibold shadow-2xs transition"
                        title="Verify at Official Government Portal"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{msg.officialSourceLabel || 'Official Govt Source'}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Live Streaming Content (written in real-time) */}
            {isStreaming && (
              <div className="flex flex-col items-start max-w-[94%] animate-fade-in">
                <div className="flex items-center gap-1.5 mb-1 ml-1 text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-cyan-500 animate-spin-slow" />
                  <span>POLARIS AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white dark:bg-[#0c1f32] border border-cyan-400/80 dark:border-cyan-500/80 text-slate-850 dark:text-slate-100 text-xs sm:text-sm leading-relaxed shadow-md shadow-cyan-500/10 font-sans w-full">
                  {streamingContent ? (
                    <FormattedMessageText content={streamingContent} isUser={false} />
                  ) : (
                    <span className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-xs py-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                      {trans('Consulting Polar Science Knowledge Graph...', 'ध्रुवीय विज्ञान डेटाबेस से संपर्क हो रहा है...')}
                    </span>
                  )}
                  {streamingContent && (
                    <span className="inline-block w-2 h-4 ml-1 bg-cyan-500 animate-pulse align-middle rounded-xs" />
                  )}
                </div>
                <div className="mt-1.5 ml-1 text-[10px] font-mono text-cyan-700/80 dark:text-cyan-400/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Live telemetry feed from {pageContext.sourceName}…</span>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Action Chips (below the latest completed message) */}
            {messages.length > 0 && !isStreaming && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleQuickAction('Explain this in simpler terms for a school student.')}
                  className="text-[10.5px] font-mono px-3 py-1 rounded-full border border-sky-200/70 dark:border-cyan-900/40 bg-white/90 dark:bg-[#0c1f32] text-slate-700 dark:text-slate-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-2xs hover:scale-102"
                >
                  💡 Explain simply
                </button>
                <button
                  onClick={() => handleQuickAction('Isko Hindi me samjhao.')}
                  className="text-[10.5px] font-mono px-3 py-1 rounded-full border border-sky-200/70 dark:border-cyan-900/40 bg-white/90 dark:bg-[#0c1f32] text-slate-700 dark:text-slate-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-2xs hover:scale-102"
                >
                  🇮🇳 Translate to Hindi
                </button>
                <button
                  onClick={() => handleQuickAction('Give me a concrete real-world scientific example from Indian expeditions.')}
                  className="text-[10.5px] font-mono px-3 py-1 rounded-full border border-sky-200/70 dark:border-cyan-900/40 bg-white/90 dark:bg-[#0c1f32] text-slate-700 dark:text-slate-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-2xs hover:scale-102"
                >
                  🔍 Real example
                </button>
                <button
                  onClick={() => handleQuickAction('What are the scientific implications for India’s climate and monsoon?')}
                  className="text-[10.5px] font-mono px-3 py-1 rounded-full border border-sky-200/70 dark:border-cyan-900/40 bg-white/90 dark:bg-[#0c1f32] text-slate-700 dark:text-slate-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-2xs hover:scale-102"
                >
                  🌧️ Monsoon impact
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. INPUT COMPOSER BAR */}
          <div className="p-3 bg-white/95 dark:bg-[#07131e]/95 border-t border-sky-100 dark:border-cyan-950/80 shrink-0 backdrop-blur-md">
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSend()
              }}
              className="relative flex items-end gap-2 bg-slate-100/80 dark:bg-[#0c1f32] border border-sky-200/80 dark:border-cyan-900/50 rounded-2xl p-2 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all shadow-inner"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={trans("Ask about India's polar science...", "भारत के ध्रुवीय विज्ञान के बारे में पूछें...")}
                className="flex-1 bg-transparent resize-none outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-2 py-1 max-h-24 min-h-[28px] font-sans"
              />

              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                aria-label={trans('Send query', 'संदेश भेजें')}
                className={cn(
                  'w-8 h-8 rounded-xl grid place-items-center transition-all shrink-0',
                  input.trim() && !isStreaming
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white hover:from-sky-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                )}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                {trans('MoES / NCPOR Verified Science', 'पृथ्वी विज्ञान मंत्रालय व एनसीपीओआर प्रमाणित')}
              </span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
                {trans('Enter ↵ to send', 'Enter ↵ दबाएं')}
              </span>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  )
}
