import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { translations, type Language } from '../lib/translations'

export type Lang = 'EN' | 'HI'

interface LanguageContextValue {
  lang: Lang
  isHindi: boolean
  setLang: (l: Lang | 'हिं') => void
  toggleLang: () => void
  t: (key: string, fallback?: string) => string
  trans: (enText: string, hiText: string) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('EN')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('polaris-lang')
      if (stored === 'HI' || stored === 'हिं') {
        setLangState('HI')
      } else if (stored === 'EN') {
        setLangState('EN')
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const setLang = useCallback((l: Lang | 'हिं') => {
    const normalized: Lang = l === 'HI' || l === 'हिं' ? 'HI' : 'EN'
    setLangState(normalized)
    try {
      localStorage.setItem('polaris-lang', normalized)
      document.documentElement.lang = normalized === 'HI' ? 'hi' : 'en'
    } catch {
      // Ignore
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'EN' ? 'HI' : 'EN')
  }, [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang === 'HI' ? 'hi' : 'en'
  }, [lang])

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const item = translations[key]
      if (!item) return fallback || key
      return lang === 'HI' ? item.hi : item.en
    },
    [lang]
  )

  const trans = useCallback(
    (enText: string, hiText: string): string => {
      return lang === 'HI' ? hiText : enText
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, isHindi: lang === 'HI', setLang, toggleLang, t, trans }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
