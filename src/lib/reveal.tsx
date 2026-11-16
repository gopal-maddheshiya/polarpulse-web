import { useEffect, useRef } from 'react'

export type RevealVariant = 'up' | 'scale' | 'left' | 'right' | 'fade'

export interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
  cascade?: boolean
  cascadeStep?: number
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -30px 0px', cascade = false, cascadeStep = 60 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If cascade is requested, apply incremental delay to direct child elements
    if (cascade && el.children.length > 0) {
      Array.from(el.children).forEach((child, idx) => {
        const htmlChild = child as HTMLElement
        if (!htmlChild.style.transitionDelay) {
          htmlChild.style.transitionDelay = `${idx * cascadeStep}ms`
        }
      })
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, cascade, cascadeStep])

  return ref
}

export interface RevealProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  variant?: RevealVariant
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  cascade?: boolean
  cascadeStep?: number
}

export function Reveal({
  children,
  className = '',
  as: As = 'div',
  variant = 'up',
  delay,
  duration,
  threshold,
  rootMargin,
  cascade,
  cascadeStep,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ threshold, rootMargin, cascade, cascadeStep })

  const variantClass =
    variant === 'scale'
      ? 'reveal-scale'
      : variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
      ? 'reveal-right'
      : variant === 'fade'
      ? 'reveal-fade'
      : 'reveal'

  const style: React.CSSProperties = {
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
  }

  return (
    <As
      ref={ref as any}
      className={`${variantClass} ${className}`}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </As>
  )
}
