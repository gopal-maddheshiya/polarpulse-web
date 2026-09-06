import React, { useEffect, useRef } from 'react'
import { Radio } from 'lucide-react'

interface TelemetryStation {
  name: string
  coord: string
  status: string
  color: string
}

const TELEMETRY_DATA: TelemetryStation[] = [
  {
    name: 'MAITRI',
    coord: '70°S, 11°E',
    status: '-16.4°C · Wind 12 kts E · Total Ozone 284 DU · WMO GAW Active',
    color: 'bg-cyan-500',
  },
  {
    name: 'BHARATI',
    coord: '69°S, 76°E',
    status: '-11.2°C · Wind 18 kts SSE · 134 Container Chassis · ISRO Downlink Active',
    color: 'bg-emerald-500',
  },
  {
    name: 'HIMADRI',
    coord: '79°N, 12°E',
    status: '-4.1°C · IndARC Mooring 192m · Kongsfjorden Atmospheric Lidar Live',
    color: 'bg-sky-400',
  },
  {
    name: 'HIMANSH',
    coord: '4,050m a.s.l.',
    status: '-2.8°C · Third Pole Cryosphere AWS · Chhota Shigri Mass Balance Online',
    color: 'bg-indigo-400',
  },
  {
    name: 'INDARC MOORING',
    coord: '78°59′N, 11°57′E',
    status: 'Salinity 34.8 PSU · Ocean Current 0.14 m/s · Multi-Depth CTD Stream',
    color: 'bg-teal-400',
  },
  {
    name: 'ORV SAGAR NIDHI',
    coord: '62°S · Polar Front',
    status: 'Deep Sea Hydrography · 4,200m Acoustic Seabed Profiler Operational',
    color: 'bg-blue-400',
  },
]

export default function PolarTelemetryTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)

  // Physics State (Decoupled, Delta-time normalized, smooth inertia)
  const isHoveredRef = useRef(false)
  const isVisibleRef = useRef(true)
  const currentOffset = useRef(0)
  const velocity = useRef(42) // Current velocity in pixels/sec
  const targetDirection = useRef(1) // +1 for Down-scroll (Rightwards/Forward), -1 for Up-scroll (Leftwards/Reverse)
  const scrollImpulse = useRef(0) // Extra velocity from scroll action
  const lastScrollY = useRef(0)
  const animFrameId = useRef<number | null>(null)
  const singleWidthRef = useRef<number>(2200)

  useEffect(() => {
    // Measure single set width accurately
    const measureWidth = () => {
      if (singleSetRef.current) {
        const nextEl = singleSetRef.current.nextElementSibling as HTMLElement | null
        if (nextEl) {
          const stride = nextEl.offsetLeft - singleSetRef.current.offsetLeft
          if (stride > 100) {
            singleWidthRef.current = stride
            return
          }
        }
        const w = singleSetRef.current.offsetWidth
        if (w > 0) {
          singleWidthRef.current = w + 24 // fallback w + gap
        }
      }
    }

    measureWidth()
    const timer = setTimeout(measureWidth, 250)
    window.addEventListener('resize', measureWidth, { passive: true })

    // Track scroll position with dead-band threshold to avoid direction flickering
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY.current
      lastScrollY.current = scrollY

      // Ignore micro jitters (< 3px) so direction doesn't flutter
      if (Math.abs(delta) > 3) {
        // Downward scroll moves forward (+1), Upward scroll moves reverse (-1)
        targetDirection.current = delta > 0 ? 1 : -1

        // Smoothly inject directional scroll impulse (capped at ±180 px/s to prevent jumping)
        const addedForce = delta * 1.8
        scrollImpulse.current = Math.max(-180, Math.min(180, scrollImpulse.current + addedForce))
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Pause physics loop when ticker is scrolled far off-screen to save 100% GPU/CPU for page scrolling
    let observer: IntersectionObserver | null = null
    if ('IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting
        },
        { rootMargin: '120px 0px' }
      )
      observer.observe(containerRef.current)
    }

    // High-precision physics loop using delta-time
    let lastTime = performance.now()

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        lastTime = timestamp
        animFrameId.current = requestAnimationFrame(animate)
        return
      }

      // Delta time in seconds (clamped to 50ms max to prevent jump on tab switch)
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05)
      lastTime = timestamp

      // Cruising speed (slower when hovered for comfortable reading)
      const baseCruisingSpeed = isHoveredRef.current ? 12 : 42

      // Smooth exponential decay of scroll impulse
      scrollImpulse.current *= Math.exp(-4.2 * dt)

      // Target velocity combines cruising direction and user scroll impulse
      const targetVelocity = (targetDirection.current * baseCruisingSpeed) + scrollImpulse.current

      // Inertial smoothing: smoothly glide through zero on direction change (no sudden jerk)
      const lerpFactor = 1 - Math.exp(-6.5 * dt)
      velocity.current += (targetVelocity - velocity.current) * lerpFactor

      // Continuous movement based on elapsed time (independent of 60Hz / 120Hz display refresh)
      currentOffset.current += velocity.current * dt

      const singleW = singleWidthRef.current || 2200
      // Seamless mathematical modulo wrap in both positive and negative directions
      const wrappedX = ((currentOffset.current % singleW) + singleW) % singleW - singleW

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${wrappedX.toFixed(2)}px, 0, 0)`
      }

      animFrameId.current = requestAnimationFrame(animate)
    }

    animFrameId.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measureWidth)
      if (observer) observer.disconnect()
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current)
      }
    }
  }, [])

  const renderStationSet = (isKeyRef = false) => (
    <div
      ref={isKeyRef ? singleSetRef : undefined}
      className="flex items-center gap-3.5 shrink-0 py-1"
    >
      {/* Stream Station Capsule Badge */}
      <div className="flex items-center gap-2 shrink-0 bg-gradient-to-r from-cyan-600/10 via-sky-600/10 to-transparent dark:from-cyan-500/20 dark:via-sky-500/15 dark:to-transparent px-3 py-1.5 rounded-xl border border-cyan-300/70 dark:border-cyan-700/60 shadow-2xs">
        <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse shrink-0" />
        <span className="font-bold tracking-widest text-[10px] text-cyan-950 dark:text-cyan-200 uppercase font-sans">
          NCPOR Polar Telemetry
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shrink-0" />
      </div>

      {TELEMETRY_DATA.map((st, i) => (
        <React.Fragment key={`${st.name}-${i}`}>
          {/* Chic Solid/Translucent Telemetry Card (Zero backdrop-blur overhead during translation) */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-[#0b1b2a]/95 border border-sky-200/80 dark:border-cyan-900/60 shadow-2xs transition-colors hover:border-cyan-400 dark:hover:border-cyan-600 cursor-default">
            {/* Live radar beacon dot */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className={`relative inline-flex rounded-full h-2 w-2 ${st.color}`} />
              </span>
              <span className="font-bold text-[11px] tracking-wider text-slate-950 dark:text-white font-sans">
                {st.name}
              </span>
            </div>

            {/* Coordinates in stylish soft tag */}
            <span className="text-[10px] text-cyan-700 dark:text-cyan-300 font-mono bg-sky-100/70 dark:bg-cyan-950/70 px-1.5 py-0.5 rounded font-medium shrink-0">
              {st.coord}
            </span>

            {/* Subtle Divider */}
            <div className="h-3 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* Formatted live metrics */}
            <span className="text-[11px] text-slate-700 dark:text-slate-200 font-sans font-medium whitespace-nowrap">
              {st.status}
            </span>
          </div>

          {/* Sleek Illuminated Separator */}
          <div className="flex items-center px-1 text-cyan-400/50 dark:text-cyan-600/50 select-none">
            <span className="text-[9px]">◆</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
      className="relative overflow-hidden bg-gradient-to-r from-[#eef7fc]/95 via-[#e6f4fb]/90 to-[#eef7fc]/95 dark:from-[#050e18] dark:via-[#071524] dark:to-[#050e18] border-y border-sky-200/90 dark:border-cyan-950/80 py-2.5 shadow-2xs select-none"
    >
      {/* Deep gradient fade masks for smooth cinematic entrance/exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#edf6fc] dark:from-[#050e18] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#edf6fc] dark:from-[#050e18] to-transparent z-10" />

      {/* Hardware-accelerated translate3d track with layout containment */}
      <div
        ref={trackRef}
        className="flex items-center gap-3.5 whitespace-nowrap will-change-transform"
        style={{ transform: 'translate3d(0px, 0, 0)', contain: 'layout style' }}
      >
        {/* Render 3 identical sets for infinite smooth bidirectional loop */}
        {renderStationSet(true)}
        {renderStationSet(false)}
        {renderStationSet(false)}
      </div>
    </div>
  )
}
