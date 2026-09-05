import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-sky-200/80 dark:border-slate-800/80 bg-gradient-to-b from-[#d6ecf9] via-[#e6f3fa] to-[#edf5fb] dark:from-[#0b1d2e] dark:via-[#091724] dark:to-[#07131e]">
      {/* Apple-style soft glowing light reflection */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-gradient-to-br from-cyan-300/30 via-sky-200/30 to-transparent dark:from-cyan-500/15 dark:via-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-12 w-80 h-80 bg-gradient-to-tr from-sky-300/20 via-blue-200/20 to-transparent dark:from-sky-600/10 dark:via-blue-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Ambient Rotating Coordinate Watermark */}
      <div className="absolute -top-12 -right-12 w-80 h-80 md:w-96 md:h-96 pointer-events-none select-none opacity-30 md:opacity-45 dark:opacity-20">
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="140" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 7" opacity="0.4" />
          <circle cx="150" cy="150" r="120" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
          <circle cx="150" cy="150" r="95" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.25" />
          <text x="150" y="20" textAnchor="middle" fill="#0369a1" fontSize="8" fontFamily="monospace" fontWeight="bold">000°N</text>
          <text x="280" y="153" textAnchor="middle" fill="#0369a1" fontSize="8" fontFamily="monospace" fontWeight="bold">090°E</text>
          <text x="150" y="286" textAnchor="middle" fill="#0369a1" fontSize="8" fontFamily="monospace" fontWeight="bold">180°S</text>
          <text x="20" y="153" textAnchor="middle" fill="#0369a1" fontSize="8" fontFamily="monospace" fontWeight="bold">270°W</text>
        </svg>
      </div>

      <div className="container-prose relative pt-24 sm:pt-28 pb-12 sm:pb-16">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-sky-200 dark:border-slate-700 text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-800 dark:text-cyan-300 shadow-2xs mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white max-w-3xl leading-[1.12]">
          {title}
        </h1>
        {sub && <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{sub}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  )
}

export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={cn('chip', className)}>{children}</span>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('card p-6', className)}>{children}</div>
}
