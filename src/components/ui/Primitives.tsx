import { type ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container-prose ${className}`}>{children}</div>
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`section ${className}`}>{children}</section>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <h2 className="section-title">{children}</h2>
      {sub && <p className="mt-3 text-polar-600 text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  )
}

export function SectionHeader({ eyebrow, title, sub, action }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {sub && <p className="mt-3 text-polar-600 max-w-2xl">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-polar-200 bg-polar-50/40 p-10 text-center">
      <div className="mx-auto w-10 h-10 rounded-full bg-white border border-polar-200 grid place-items-center text-polar-500 mb-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <div className="text-sm font-medium text-polar-900">{title}</div>
      <div className="text-sm text-polar-500 mt-1">{message}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
