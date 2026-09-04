import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react'

interface SearchContextValue {
  query: string
  setQuery: (q: string) => void
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const openSearch = useCallback(() => setIsOpen(true), [])
  const closeSearch = useCallback(() => setIsOpen(false), [])
  const toggleSearch = useCallback(() => setIsOpen(o => !o), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, toggleSearch, closeSearch])

  return (
    <SearchContext.Provider value={{ query, setQuery, isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
