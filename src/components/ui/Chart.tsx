import { useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

export interface ChartPoint {
  label: string
  value: number
}

export interface LineChartProps {
  title: string
  subtitle?: string
  source?: string
  badge?: string
  unit?: string
  data: ChartPoint[]
  baseline?: ChartPoint[]
  baselineLabel?: string
  height?: number
  accent?: string
  showAxis?: boolean
  yLabel?: string
  className?: string
}

export function LineChart({
  title,
  subtitle,
  source,
  badge,
  unit = '',
  data,
  baseline,
  baselineLabel = '1981–2010 Mean Baseline',
  height = 240,
  accent = '#0284c7',
  showAxis = true,
  yLabel,
  className = '',
}: LineChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const padding = { top: 24, right: 16, bottom: 30, left: 44 }

  const { path, area, baselinePath, min, max, points, baselinePoints, width } = useMemo(() => {
    const w = 620
    const h = height
    const innerW = w - padding.left - padding.right
    const innerH = h - padding.top - padding.bottom

    const allValues = [...data.map(d => d.value), ...(baseline ? baseline.map(b => b.value) : [])]
    const mn = Math.floor(Math.min(...allValues) * 0.9)
    const mx = Math.ceil(Math.max(...allValues) * 1.08)
    const range = mx - mn || 1
    const step = innerW / Math.max(data.length - 1, 1)

    const pts = data.map((d, i) => {
      const x = padding.left + i * step
      const y = padding.top + innerH - ((d.value - mn) / range) * innerH
      return { x, y, label: d.label, value: d.value }
    })

    const bPts = baseline
      ? baseline.map((b, i) => {
          const x = padding.left + i * step
          const y = padding.top + innerH - ((b.value - mn) / range) * innerH
          return { x, y, label: b.label, value: b.value }
        })
      : []

    const p = pts.map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(' ')
    const bp = bPts.map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`)).join(' ')
    const a = `${p} L ${pts[pts.length - 1].x} ${padding.top + innerH} L ${pts[0].x} ${padding.top + innerH} Z`

    return {
      path: p,
      area: a,
      baselinePath: bp,
      min: mn,
      max: mx,
      points: pts,
      baselinePoints: bPts,
      width: w,
    }
  }, [data, baseline, height])

  const yTicks = 4
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const t = i / yTicks
    const value = min + (max - min) * t
    const y = padding.top + (1 - t) * (height - padding.top - padding.bottom)
    return { y, value: Math.round(value * 10) / 10 }
  })

  return (
    <div className={cn('editorial-frame p-6 sm:p-8 bg-white', className)}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          {badge && (
            <div className="text-[11px] font-mono tracking-wider uppercase text-sky-800 font-semibold flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              {badge}
            </div>
          )}
          <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-950">{title}</h4>
          {subtitle && <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
        {source && (
          <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500 border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-md shrink-0">
            {source}
          </span>
        )}
      </div>

      {/* Chart Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs font-mono text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: accent }} /> Current Year Obs
        </span>
        {baseline && (
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400" /> {baselineLabel}
          </span>
        )}
      </div>

      <div className="mt-2 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none" role="img" aria-label={title}>
          <defs>
            <linearGradient id="chartGradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid lines & Tick Labels */}
          {showAxis &&
            ticks.map((t, i) => (
              <g key={i}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={t.y}
                  y2={t.y}
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                />
                <text
                  x={padding.left - 8}
                  y={t.y + 3}
                  fontSize="9.5"
                  textAnchor="end"
                  fill="#64748b"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {t.value}
                </text>
              </g>
            ))}

          {/* Baseline Reference Curve */}
          {baselinePath && (
            <path
              d={baselinePath}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
          )}

          {/* Main Area & Main Path */}
          <path d={area} fill="url(#chartGradientFill)" />
          <path
            d={path}
            fill="none"
            stroke={accent}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((p, i) => (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
              {/* Invisible touch expander */}
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              
              {/* Point dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hover === i ? 5 : 2.5}
                fill={hover === i ? accent : '#ffffff'}
                stroke={accent}
                strokeWidth={hover === i ? 2 : 1.5}
                className="transition-all duration-150"
              />

              {/* X Axis Labels */}
              {showAxis && (
                <text
                  x={p.x}
                  y={height - 8}
                  fontSize="9.5"
                  textAnchor="middle"
                  fill="#475569"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={hover === i ? "600" : "400"}
                >
                  {p.label}
                </text>
              )}
            </g>
          ))}

          {/* Crosshair vertical highlight */}
          {hover !== null && points[hover] && (
            <line
              x1={points[hover].x}
              x2={points[hover].x}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="#0f172a"
              strokeOpacity="0.2"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          )}
        </svg>

        {/* Dynamic Tooltip HUD */}
        {hover !== null && points[hover] && (
          <div className="mt-3 p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-400 font-semibold">{points[hover].label}</span>
              <span className="text-slate-300">Observation:</span>
              <span className="font-display text-base font-bold text-white">
                {points[hover].value}{unit}
              </span>
            </div>
            {baselinePoints[hover] && (
              <div className="font-mono text-[11px] text-slate-400">
                Baseline Mean: <span className="text-slate-200">{baselinePoints[hover].value}{unit}</span>
                <span className={cn(
                  'ml-2 font-semibold',
                  points[hover].value >= baselinePoints[hover].value ? 'text-cyan-300' : 'text-amber-300'
                )}>
                  ({points[hover].value >= baselinePoints[hover].value ? '+' : ''}
                  {(points[hover].value - baselinePoints[hover].value).toFixed(1)}{unit})
                </span>
              </div>
            )}
          </div>
        )}

        {yLabel && (
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-2 text-right">
            Units: {yLabel}
          </div>
        )}
      </div>
    </div>
  )
}
