import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function PageHeader({ eyebrow, title, sub, children }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-polar-100 bg-gradient-to-b from-polar-50/80 to-white">
      <div className="absolute inset-0 bg-polar-grid opacity-50 pointer-events-none" />
      <div className="container-prose relative py-14 sm:py-20">
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-polar-950 max-w-3xl">{title}</h1>
        {sub && <p className="mt-4 text-lg text-polar-600 max-w-2xl leading-relaxed">{sub}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  )
}

export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={cn('chip', className)}>{children}</span>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('card p-5', className)}>{children}</div>
}
