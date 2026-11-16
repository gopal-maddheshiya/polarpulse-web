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
      // 1. Check URL query parameter: ?lang=hi or ?lang=en (e.g. from Google Hindi/English search results)
      const params = new URLSearchParams(window.location.search)
      const urlLang = params.get('lang')?.toLowerCase()
      if (urlLang === 'hi' || urlLang === 'hindi') {
        setLangState('HI')
        localStorage.setItem('polaris-lang', 'HI')
        document.documentElement.lang = 'hi'
        return
      } else if (urlLang === 'en' || urlLang === 'english') {
        setLangState('EN')
        localStorage.setItem('polaris-lang', 'EN')
        document.documentElement.lang = 'en'
        return
      }

      // 2. Fallback to localStorage
      const stored = localStorage.getItem('polaris-lang')
      if (stored === 'HI' || stored === 'हिं') {
        setLangState('HI')
        document.documentElement.lang = 'hi'
      } else if (stored === 'EN') {
        setLangState('EN')
        document.documentElement.lang = 'en'
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
      document.documentElement.setAttribute('lang', normalized === 'HI' ? 'hi' : 'en')
    } catch {
      // Ignore
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'EN' ? 'HI' : 'EN')
  }, [lang, setLang])

  useEffect(() => {
    const code = lang === 'HI' ? 'hi' : 'en'
    document.documentElement.lang = code
    document.documentElement.setAttribute('lang', code)
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
