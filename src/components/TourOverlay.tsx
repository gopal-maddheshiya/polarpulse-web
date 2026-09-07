import { useState, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, X, Sparkles, Compass, CheckCircle2 } from 'lucide-react'
import { useTour } from '../context/TourContext'
import { useLanguage } from '../context/LanguageContext'
import { cn } from '../lib/utils'

export default function TourOverlay() {
  const {
    isTourActive,
    isPaused,
    currentStepIndex,
    currentStep,
    totalSteps,
    stepProgress,
    overallProgress,
    pauseTour,
    resumeTour,
    skipStep,
    previousStep,
    exitTour,
    restartTour,
  } = useTour()

  const { isHindi } = useLanguage()

  const [targetRect, setTargetRect] = useState<{
    top: number
    left: number
    width: number
    height: number
  } | null>(null)

  // Continuously track and highlight the target element on the current page
  useEffect(() => {
    if (!isTourActive) {
      setTargetRect(null)
      return
    }

    let isMounted = true

    const updateTarget = () => {
      if (!isMounted) return
      const selector = currentStep.spotlightSelector
      if (!selector) {
        setTargetRect(null)
        return
      }

      // Query element (handle comma-separated selectors gracefully)
      const el = document.querySelector(selector) as HTMLElement | null
      if (el) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.height > 0) {
          setTargetRect({
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
          })
        }
      } else {
        setTargetRect(null)
      }
    }

    // Initial update
    updateTarget()

    // Smoothly scroll target into optical center between navbar and HUD
    const scrollToSafeCenter = () => {
      if (!isMounted) return
      const selector = currentStep.spotlightSelector
      if (!selector) return

      const el = document.querySelector(selector) as HTMLElement | null
      if (el) {
        const r = el.getBoundingClientRect()
        // Top navbar is ~70px, bottom HUD is ~120px
        const safeTop = 76
        const safeBottom = window.innerHeight - 130
        const safeCenterY = safeTop + (safeBottom - safeTop) / 2

        const elCenterY = r.top + r.height / 2
        const deltaY = elCenterY - safeCenterY

        if (Math.abs(deltaY) > 16) {
          window.scrollBy({ top: deltaY, behavior: 'smooth' })
        }
      }
    }

    scrollToSafeCenter()
    const timer1 = setTimeout(scrollToSafeCenter, 250)
    const timer2 = setTimeout(scrollToSafeCenter, 600)

    // Refresh every 80ms and on scroll/resize to track element dynamically
    const interval = setInterval(updateTarget, 80)
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget, { passive: true })

    return () => {
      isMounted = false
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearInterval(interval)
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
    }
  }, [isTourActive, currentStepIndex, currentStep.spotlightSelector])

  if (!isTourActive) return null

  const isLastStep = currentStepIndex === totalSteps - 1

  return (
    <>
      {/* 1. CINEMATIC SPOTLIGHT FRAME & ANIMATED FOCUS POINTER BEACON */}
      {targetRect && (() => {
        const safeTop = 76
        const safeBottom = window.innerHeight - 130
        const maxSafeHeight = safeBottom - safeTop

        const boxTop = Math.max(safeTop + 4, targetRect.top - 8)
        const boxBottom = Math.min(safeBottom - 4, targetRect.top + targetRect.height + 8)
        const boxHeight = Math.max(48, Math.min(maxSafeHeight - 8, boxBottom - boxTop))

        const boxLeft = Math.max(8, targetRect.left - 8)
        const boxWidth = Math.min(window.innerWidth - boxLeft - 8, targetRect.width + 16)

        const hasRoomAbove = boxTop > safeTop + 50

        return (
          <div
            aria-hidden="true"
            className="fixed pointer-events-none z-30 transition-all duration-300 ease-out"
            style={{
              top: `${boxTop}px`,
              left: `${boxLeft}px`,
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              boxShadow: '0 0 0 9999px rgba(3, 10, 24, 0.52)',
              borderRadius: '24px',
            }}
          >
            {/* Animated Neon Cyan Glowing Ring */}
            <div className="absolute inset-0 rounded-[24px] border-2 border-cyan-400 shadow-[0_0_28px_rgba(6,182,212,0.85),inset_0_0_16px_rgba(6,182,212,0.25)] animate-pulse" />

            {/* 4 Corner Aerospace HUD Reticles */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300 rounded-tl-sm shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300 rounded-tr-sm shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300 rounded-bl-sm shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300 rounded-br-sm shadow-[0_0_6px_rgba(6,182,212,0.9)]" />

            {/* Animated Dynamic Focus Beacon Pointing to Element */}
            <div
              className={cn(
                'absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-50',
                hasRoomAbove ? '-top-11' : '-bottom-11'
              )}
            >
              {hasRoomAbove ? (
                <>
                  <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-mono font-black text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(6,182,212,0.8)] border border-white/60 flex items-center gap-1.5 animate-bounce">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950" />
                    </span>
                    <span className="whitespace-nowrap">
                      🎯 {isHindi ? (currentStep.focusBadgeHi || currentStep.titleHi) : (currentStep.focusBadgeEn || currentStep.titleEn)}
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-400 -mt-0.5 filter drop-shadow-[0_2px_4px_rgba(6,182,212,0.6)]" />
                </>
              ) : (
                <>
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyan-400 -mb-0.5 filter drop-shadow-[0_2px_4px_rgba(6,182,212,0.6)]" />
                  <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 font-mono font-black text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(6,182,212,0.8)] border border-white/60 flex items-center gap-1.5 animate-bounce">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950" />
                    </span>
                    <span className="whitespace-nowrap">
                      🎯 {isHindi ? (currentStep.focusBadgeHi || currentStep.titleHi) : (currentStep.focusBadgeEn || currentStep.titleEn)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })()}

      {/* 2. FLOATING HUD CONTROLLER */}
      <aside
        aria-label="POLARIS Demo Tour Controller"
        className={cn(
          'fixed z-50 transition-all duration-500 ease-out pointer-events-none',
          'bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-48px)] max-w-[720px]'
        )}
      >
      <div
        className={cn(
          'pointer-events-auto rounded-2xl sm:rounded-3xl border border-cyan-400/50 shadow-[0_20px_50px_rgba(2,6,23,0.7),0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-2xl transition-all duration-300 overflow-hidden',
          'bg-slate-950/95 text-white ring-1 ring-white/15'
        )}
      >
        {/* Top Glowing Gradient Hairline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
          {/* Main Content Row */}
          <div className="flex items-start sm:items-center justify-between gap-3">
            {/* Left: Indicator & Narrative */}
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              {/* Step Badge with Pulse */}
              <div className="relative shrink-0 mt-0.5 sm:mt-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center font-mono text-xs font-black shadow-[0_0_12px_rgba(6,182,212,0.6)] text-slate-950">
                  {currentStepIndex + 1}
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300" />
                </span>
              </div>

              {/* Title & Description */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    {isHindi ? currentStep.titleHi : currentStep.titleEn}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                    · {isHindi ? 'चरण' : 'Step'} {currentStepIndex + 1}/{totalSteps}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-snug line-clamp-2 mt-0.5">
                  {isHindi ? currentStep.descHi : currentStep.descEn}
                </p>
              </div>
            </div>

            {/* Right: Controls Pill */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/15">
              {/* Previous Step (Desktop) */}
              {currentStepIndex > 0 && (
                <button
                  onClick={previousStep}
                  type="button"
                  aria-label="Previous step"
                  title={isHindi ? 'पिछला चरण' : 'Previous step'}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/15 transition active:scale-95 hidden sm:inline-flex"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Pause / Resume */}
              <button
                onClick={isPaused ? resumeTour : pauseTour}
                type="button"
                aria-label={isPaused ? 'Resume tour' : 'Pause tour'}
                title={isPaused ? (isHindi ? 'पुनः चालू करें (Space)' : 'Resume (Space)') : (isHindi ? 'रोकें (Space)' : 'Pause (Space)')}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold font-mono inline-flex items-center gap-1.5 transition active:scale-95',
                  isPaused
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)] font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                )}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isHindi ? 'जारी रखें' : 'Resume'}</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span className="hidden sm:inline">{isHindi ? 'रोकें' : 'Pause'}</span>
                  </>
                )}
              </button>

              {/* Skip Step */}
              {!isLastStep && (
                <button
                  onClick={skipStep}
                  type="button"
                  aria-label="Skip to next step"
                  title={isHindi ? 'अगला चरण' : 'Next step'}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/15 transition active:scale-95"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Restart Button on Final Step */}
              {isLastStep && (
                <button
                  onClick={restartTour}
                  type="button"
                  className="px-2 py-1 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition active:scale-95"
                >
                  {isHindi ? 'पुनः देखें' : 'Replay'}
                </button>
              )}

              {/* Exit Tour */}
              <button
                onClick={exitTour}
                type="button"
                aria-label="Exit tour (ESC)"
                title={isHindi ? 'टूर समाप्त करें (Esc)' : 'Exit tour (Esc)'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition active:scale-95 ml-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Dual-Progress Bar (Step Duration + Total 60s Progress) */}
          <div className="space-y-1 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {isHindi ? 'स्वचालित 60-सेकंड लाइव प्रदर्शन' : 'Automated 60-Second Live Demonstration'}
              </span>
              <span className="font-semibold text-cyan-300">
                {overallProgress}% {isHindi ? 'पूर्ण' : 'Complete'}
              </span>
            </div>

            {/* Step Sub-Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-100 ease-linear rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                style={{ width: `${stepProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
  )
}
