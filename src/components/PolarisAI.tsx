import { useState, useRef, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Sparkles, X, Send, ArrowRight, CornerDownLeft, RefreshCw,
  Compass, MapPin, ShieldCheck, ChevronDown, Check, GraduationCap,
  Layers, Volume2, Globe, MessageSquare, AlertCircle
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
          className={cn('font-semibold', isUser ? 'text-white' : 'text-slate-900')}
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
            'px-1 py-0.5 rounded font-mono text-[11px]',
            isUser
              ? 'bg-white/20 text-white'
              : 'bg-slate-100 text-sky-850 border border-slate-200'
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
              <span className={cn('text-xs shrink-0 leading-normal font-bold', isUser ? 'text-sky-300' : 'text-sky-600')}>
                •
              </span>
              <span className="flex-1">{renderInlineMarkdown(lineContent, isUser)}</span>
            </div>
          )
        }

        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className={cn('text-xs font-mono font-bold shrink-0 leading-normal', isUser ? 'text-sky-300' : 'text-sky-700')}>
                {numMatch[1]}.
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

  // Reset streaming state on unmount
  useEffect(() => {
    return () => {
      setIsStreaming(false)
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

    await askPolarisAI({
      messages: updatedMessages,
      pageContext,
      audience,
      onChunk: (_delta, accumulated) => {
        setStreamingContent(accumulated)
      },
      onDone: (fullText, source, sourceUrl) => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fullText,
          source,
          sourceUrl,
          timestamp: Date.now(),
        }
        setMessages(prev => [...prev, assistantMessage])
        setStreamingContent('')
        setIsStreaming(false)
      },
      onError: () => {
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
    setMessages([])
    setStreamingContent('')
    setError(null)
  }

  const audienceOptions: { id: Audience; label: string; desc: string }[] = [
    { id: 'General Public', label: trans('Public', 'जनसामान्य'), desc: trans('Clear, accessible storytelling', 'सरल एवं सुगम व्याख्या') },
    { id: 'Student', label: trans('Student', 'छात्र'), desc: trans('Simple everyday analogies (8th–10th)', 'सरल दैनिक उदाहरण') },
    { id: 'Teacher', label: trans('Teacher', 'शिक्षक'), desc: trans('Pedagogical talking points', 'शैक्षणिक मुख्य बिंदु') },
    { id: 'Researcher', label: trans('Researcher', 'शोधकर्ता'), desc: trans('Rigorous scientific terminology', 'सटीक वैज्ञानिक शब्दावली') },
  ]

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText)
  }

  return (
    <>
      {/* 1. FLOATING POLARIS AI LAUNCH BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={trans('Open POLARIS AI assistant', 'पोलारिस एआई खोलें')}
          className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl border border-slate-700/80 transition-all duration-300 hover:scale-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        >
          <div className="relative">
            <span className="w-2 h-2 rounded-full bg-sky-400 absolute -top-0.5 -right-0.5 animate-ping" />
            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 grid place-items-center">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            </div>
          </div>
          <div className="text-left leading-none pr-1">
            <div className="text-xs font-display font-bold tracking-wide flex items-center gap-1">
              <span>{trans('Ask POLARIS', 'पोलारिस से पूछें')}</span>
              <span className="text-[10px] font-mono font-medium text-sky-300">AI</span>
            </div>
            <div className="text-[9px] font-sans text-slate-400 mt-0.5 hidden sm:block">
              {trans('Polar Guide', 'ध्रुवीय मार्गदर्शक')}
            </div>
          </div>
        </button>
      )}

      {/* 2. CHAT PANEL / BOTTOM SHEET */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="POLARIS AI Chat Panel"
          className={cn(
            'fixed z-50 flex flex-col bg-white shadow-2xl border border-slate-200 overflow-hidden animate-fade-in',
            // Mobile full-width bottom sheet (below 640px)
            'max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-14 max-sm:rounded-t-2xl',
            // Tablet & Desktop: floating window strictly anchored to bottom-right
            'sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-[420px] sm:h-[620px] sm:max-h-[86vh] sm:rounded-2xl'
          )}
        >
          {/* Header */}
          <div className="bg-slate-950 text-white p-3.5 sm:p-4 shrink-0 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-400/30 grid place-items-center text-sky-300 shadow-2xs shrink-0">
                <Sparkles className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-bold tracking-wide text-white">
                    {trans('Ask POLARIS', 'पोलारिस से पूछें')}
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/20 font-semibold">
                    AI
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {trans("Understand India's polar science in simple language.", 'भारत के ध्रुवीय विज्ञान को सरल भाषा में समझें।')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                aria-label="Close assistant"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Header: Active Page Context & Audience Lens Selector */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-3.5 py-2 shrink-0 flex flex-col gap-1.5 text-xs">
            {/* Active page indicator */}
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-600 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-400">{trans('Viewing:', 'पेज:')}</span>
                <span className="font-semibold text-slate-850 truncate">{pageContext.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">{pageContext.type}</span>
            </div>

            {/* Audience Segmented Selector */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-sky-600" /> {trans('Lens:', 'लेंस:')}
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-medium">
                {audienceOptions.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setAudience(a.id)}
                    title={a.desc}
                    className={cn(
                      'px-2 py-0.5 rounded-md transition font-mono',
                      audience === a.id
                        ? 'bg-slate-900 text-white font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. SCROLLABLE MESSAGES FEED */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {/* Initial Welcome Banner when empty */}
            {messages.length === 0 && !streamingContent && (
              <div className="space-y-3.5 py-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-800 font-semibold">
                    <Compass className="w-3.5 h-3.5 text-sky-600" />
                    <span>{trans('Ask POLARIS', 'पोलारिस से पूछें')}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900">
                    {trans("Understand India's polar science in simple language.", "भारत के ध्रुवीय विज्ञान को सरल भाषा में समझें।")}
                  </div>
                  <p className="text-xs text-slate-650 leading-relaxed font-sans">
                    {trans(
                      "Ask me about India’s 44 Antarctic expeditions, the Arctic station of Himadri, research bases Maitri and Bharati, or open scientific datasets.",
                      "भारत के 44 अंटार्कटिक अभियानों, हिमाद्री आर्कटिक स्टेशन, मैत्री और भारती अनुसंधान केंद्रों या वैज्ञानिक डेटासेट्स के बारे में पूछें।"
                    )}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    {trans('Supports English, हिन्दी and Hinglish questions.', 'अंग्रेजी, हिन्दी और हिंग्लिश में प्रश्न पूछें।')}
                  </div>
                </div>

                {/* Suggested Questions */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                    {trans('Suggested Questions:', 'सुझावित प्रश्न:')}
                  </div>
                  <div className="space-y-1.5">
                    {suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50 text-xs text-slate-800 transition flex items-center justify-between group shadow-2xs"
                      >
                        <span className="line-clamp-1">{sug}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition shrink-0" />
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
                  msg.role === 'user' ? 'items-end' : 'items-start'
                )}
              >
                <div
                  className={cn(
                    'p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[90%] font-sans',
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-xs shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-850 rounded-tl-xs shadow-2xs'
                  )}
                >
                  <FormattedMessageText content={msg.content} isUser={msg.role === 'user'} />
                </div>

                {/* Source attribution on assistant responses */}
                {msg.role === 'assistant' && msg.source && (
                  <div className="mt-1.5 ml-1 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-sky-600 shrink-0" />
                    {msg.sourceUrl ? (
                      <a
                        href={msg.sourceUrl}
                        className="text-sky-700 hover:text-sky-900 hover:underline inline-flex items-center gap-1 font-medium transition"
                        title="View in POLARIS Repository"
                      >
                        <span>{msg.source}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span>{msg.source}</span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Live Streaming Content (written in real-time) */}
            {isStreaming && (
              <div className="flex flex-col items-start animate-fade-in">
                <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-sky-300/80 text-slate-850 text-xs sm:text-sm leading-relaxed max-w-[92%] shadow-2xs font-sans">
                  {streamingContent ? (
                    <FormattedMessageText content={streamingContent} isUser={false} />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-500 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                      POLARIS is thinking...
                    </span>
                  )}
                  {streamingContent && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-sky-500 animate-pulse align-middle" />
                  )}
                </div>
                <div className="mt-1 ml-1 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span>Streaming from {pageContext.sourceName}…</span>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Action Chips (below the latest completed message) */}
            {messages.length > 0 && !isStreaming && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleQuickAction('Explain this in simpler terms for a school student.')}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition"
                >
                  💡 Explain simply
                </button>
                <button
                  onClick={() => handleQuickAction('Isko Hindi me samjhao.')}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition"
                >
                  🇮🇳 Translate to Hindi
                </button>
                <button
                  onClick={() => handleQuickAction('Give me a concrete real-world scientific example from Indian expeditions.')}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition"
                >
                  🔍 Give an example
                </button>
                <button
                  onClick={() => handleQuickAction('What are the scientific implications for India’s climate and monsoon?')}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 transition"
                >
                  🌧️ Monsoon impact
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. INPUT COMPOSER BAR */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSend()
              }}
              className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200/50 transition"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={trans("Ask about India's polar science...", "भारत के ध्रुवीय विज्ञान के बारे में पूछें...")}
                className="flex-1 bg-transparent resize-none outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 px-2 py-1 max-h-24 min-h-[28px] font-sans"
              />

              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                aria-label={trans('Send query', 'संदेश भेजें')}
                className={cn(
                  'w-8 h-8 rounded-lg grid place-items-center transition shrink-0',
                  input.trim() && !isStreaming
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                )}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span>{trans('Grounded in MoES / NCPOR research data', 'पृथ्वी विज्ञान मंत्रालय व एनसीपीओआर शोध पर आधारित')}</span>
              <span className="hidden sm:inline">{trans('Press Enter ↵ to send', 'भेजने के लिए Enter ↵ दबाएं')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
