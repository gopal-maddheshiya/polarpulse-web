import React, { useEffect, useRef, useState } from 'react'
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
    coord: '70°S, 11°E · Queen Maud Land',
    status: '-16.4°C · 12 kts E · Total Ozone 284 DU · WMO GAW Active',
    color: 'bg-cyan-500',
  },
  {
    name: 'BHARATI',
    coord: '69°S, 76°E · Larsemann Hills',
    status: '-11.2°C · 18 kts SSE · 134 Container Stilts · ISRO Earth Downlink Operational',
    color: 'bg-emerald-500',
  },
  {
    name: 'HIMADRI',
    coord: '79°N, 12°E · Ny-Ålesund, Svalbard',
    status: '-4.1°C · IndARC Underwater Mooring 192m · Kongsfjorden Atmospheric Array',
    color: 'bg-sky-400',
  },
  {
    name: 'HIMANSH',
    coord: '4,050m · Chandra Basin, Western Himalaya',
    status: '-2.8°C · Third Pole Cryosphere AWS · Glacier Mass Balance Telemetry Live',
    color: 'bg-indigo-400',
  },
  {
    name: 'INDARC MOORING',
    coord: '79°N, 11°E · Kongsfjorden Fjord',
    status: 'Salinity 34.8 PSU · Ocean Current 0.14 m/s · Multi-depth CTD Sensors Active',
    color: 'bg-teal-400',
  },
  {
    name: 'ORV SAGAR NIDHI',
    coord: '62°S · Southern Ocean Polar Front',
    status: 'Deep Sea Core Hydrography · 4,200m Acoustic Profiling Active',
    color: 'bg-blue-400',
  },
]

export default function PolarTelemetryTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Physics & Direction State:
  // velocity: signed pixels per frame (+ = Left-to-Right when scrolling down, - = Right-to-Left when scrolling up)
  const currentOffset = useRef(0)
  const velocity = useRef(0.85)
  const targetDirection = useRef(1)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollIntensity = useRef(0)
  const animFrameId = useRef<number | null>(null)
  const singleWidthRef = useRef<number>(2000)

  useEffect(() => {
    // Measure single set width + exact flex gap accurately
    const measureWidth = () => {
      if (singleSetRef.current) {
        const nextEl = singleSetRef.current.nextElementSibling as HTMLElement | null
        if (nextEl) {
          const stride = nextEl.offsetLeft - singleSetRef.current.offsetLeft
          if (stride > 50) {
            singleWidthRef.current = stride
            return
          }
        }
        const w = singleSetRef.current.offsetWidth
        if (w > 0) {
          singleWidthRef.current = w + 32 // fallback w + gap-8 (32px)
        }
      }
    }
    measureWidth()
    // Re-measure after initial font/layout render
    const timer = setTimeout(measureWidth, 300)
    window.addEventListener('resize', measureWidth)

    // Initial scroll position
    lastScrollY.current = window.scrollY

    // On scroll: detect direction and calculate scroll speed boost
    // - Scrolling DOWN -> Left to Right (direction = +1)
    // - Scrolling UP   -> Right to Left (direction = -1)
    const onScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY.current
      lastScrollY.current = scrollY

      // Ignore microscopic subpixel jitter (< 1.5px)
      if (Math.abs(delta) > 1.5) {
        lastScrollTime.current = performance.now()
        targetDirection.current = delta > 0 ? 1 : -1

        // Proportional speed boost: pleasant responsive momentum (capped at 6.5px boost)
        const boost = Math.min(Math.abs(delta) * 0.22, 6.5)
        scrollIntensity.current = Math.max(scrollIntensity.current, boost)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Ultra-smooth physics animation loop
    const animate = () => {
      const now = performance.now()
      const timeSinceScroll = now - lastScrollTime.current
      const isActivelyScrolling = timeSinceScroll < 100

      // Base steady cruising speed
      const baseSpeed = isHovered ? 0.25 : 0.85

      let targetVelocity: number
      if (isActivelyScrolling) {
        // Active scroll: speed up in the active direction
        targetVelocity = targetDirection.current * (baseSpeed + scrollIntensity.current)
        // Responsive acceleration
        velocity.current += (targetVelocity - velocity.current) * 0.16
      } else {
        // Decay the temporary scroll boost gradually
        scrollIntensity.current += (0 - scrollIntensity.current) * 0.08
        // Target velocity returns to base cruising speed in the established direction
        targetVelocity = targetDirection.current * (baseSpeed + scrollIntensity.current)
        // Luxurious inertial deceleration back to steady cruising speed
        velocity.current += (targetVelocity - velocity.current) * 0.045
      }

      // Continuous movement without interruption
      currentOffset.current += velocity.current

      const singleW = singleWidthRef.current || 2000
      // Mathematical modulo wrap for infinite seamless continuous movement
      const wrappedX = ((currentOffset.current % singleW) + singleW) % singleW - singleW

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${wrappedX}px, 0, 0)`
      }

      animFrameId.current = requestAnimationFrame(animate)
    }

    animFrameId.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measureWidth)
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current)
      }
    }
  }, [isHovered])

  const renderStationSet = (isKeyRef = false) => (
    <div
      ref={isKeyRef ? singleSetRef : undefined}
      className="flex items-center gap-8 shrink-0 py-0.5"
    >
      <div className="flex items-center gap-2 shrink-0 text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-100/70 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-300/60 dark:border-cyan-800/60 shadow-2xs">
        <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
        <span className="tracking-wider text-[10.5px]">NCPOR POLAR TELEMETRY STREAM:</span>
      </div>

      {TELEMETRY_DATA.map((st, i) => (
        <React.Fragment key={`${st.name}-${i}`}>
          <div className="flex items-center gap-2 group/item cursor-default">
            <span className={`w-2 h-2 rounded-full ${st.color} shadow-xs`} />
            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-300 transition-colors">
              {st.name} ({st.coord}):
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {st.status}
            </span>
          </div>
          <span className="text-slate-300 dark:text-slate-700 select-none">✦</span>
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-gradient-to-r from-sky-50/90 via-cyan-50/60 to-sky-50/90 dark:from-[#061019] dark:via-[#081522] dark:to-[#061019] border-y border-sky-200/80 dark:border-slate-800/90 py-2.5 shadow-2xs select-none backdrop-blur-md"
    >
      {/* Edge gradient fade masks for smooth entrance/exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-sky-50 dark:from-[#061019] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-sky-50 dark:from-[#061019] to-transparent z-10" />

      {/* Track wrapper with hardware-accelerated translate3d */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap text-[11px] font-mono will-change-transform"
        style={{ transform: 'translate3d(0px, 0, 0)' }}
      >
        {/* Render 3 identical sets to ensure infinite smooth seamless looping */}
        {renderStationSet(true)}
        {renderStationSet(false)}
        {renderStationSet(false)}
      </div>
    </div>
  )
}
