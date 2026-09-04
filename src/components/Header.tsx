import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Menu, X, ArrowRight, Compass, Database, Globe } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import { useLanguage } from '../context/LanguageContext'
import { cn } from '../lib/utils'

interface NavItem {
  to: string
  en: string
  hi: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', en: 'Home', hi: 'गृह' },
  { to: '/explore', en: 'Explore', hi: 'अन्वेषण' },
  { to: '/expeditions', en: 'Expeditions', hi: 'अभियान' },
  { to: '/knowledge', en: 'Knowledge', hi: 'ज्ञान केंद्र' },
  { to: '/datasets', en: 'Datasets', hi: 'डेटासेट' },
  { to: '/education', en: 'Education', hi: 'शिक्षा' },
  { to: '/media', en: 'Media', hi: 'मीडिया' },
  { to: '/communicator', en: 'Communicator', hi: 'संवादक' },
  { to: '/about', en: 'About', hi: 'परिचय' },
]

export default function Header() {
  const { openSearch } = useSearch()
  const { isHindi, setLang, toggleLang, trans } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-200 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-2xs border-slate-200'
          : 'bg-white/90 backdrop-blur-xs border-slate-200/80'
      )}
    >
      <div className="container-wide flex items-center justify-between h-14 sm:h-16">
        {/* POLARIS Institutional Brand Crest */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0 mr-4">
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white grid place-items-center transition-colors group-hover:bg-slate-850 shadow-2xs">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-sky-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <circle cx="12" cy="12" r="2.2" fill="#38bdf8" stroke="none" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-bold tracking-[0.14em] text-slate-950">
                POLARIS
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-semibold">
                {trans('INDIA', 'भारत')}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-sans tracking-tight hidden sm:block">
              {trans(
                'MoES · National Centre for Polar and Ocean Research',
                'पृथ्वी विज्ञान मंत्रालय · राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र'
              )}
            </div>
          </div>
        </Link>

        {/* Desktop Institutional Navigation */}
        <nav className="hidden xl:flex items-center gap-2.5 2xl:gap-4 shrink-0">
          {NAV_ITEMS.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'text-xs 2xl:text-sm font-medium transition-colors py-1 relative whitespace-nowrap',
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-950'
                )
              }
              end={n.to === '/'}
            >
              {({ isActive }) => (
                <>
                  <span>{isHindi ? n.hi : n.en}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-950 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action & Search Cluster */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          <button
            onClick={openSearch}
            aria-label="Search platform"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden 2xl:inline text-slate-500">
              {trans('Search repository', 'रिपॉजिटरी खोजें')}
            </span>
            <kbd className="text-[10px] font-mono px-1 rounded bg-white border border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Bilingual Language Switcher Pill Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100/90 p-0.5 text-xs font-medium">
            <button
              onClick={() => setLang('EN')}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all font-sans',
                !isHindi
                  ? 'bg-white text-slate-950 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
              title="English interface"
            >
              English
            </button>
            <button
              onClick={() => setLang('HI')}
              className={cn(
                'px-2.5 py-1 rounded-md transition-all font-sans',
                isHindi
                  ? 'bg-sky-600 text-white font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
              title="हिन्दी इंटरफ़ेस"
            >
              हिन्दी
            </button>
          </div>

          <Link
            to="/datasets"
            className="btn bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition whitespace-nowrap"
          >
            {trans('Explore Data', 'डेटा अन्वेषण')}
          </Link>
        </div>

        {/* Mobile / Tablet Header Controls */}
        <div className="flex xl:hidden items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <Search className="w-4 h-4" />
          </button>
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100/90 p-0.5 text-xs font-medium">
            <button
              onClick={() => setLang('EN')}
              className={cn(
                'px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] transition-all font-sans',
                !isHindi
                  ? 'bg-white text-slate-950 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang('HI')}
              className={cn(
                'px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] transition-all font-sans',
                isHindi
                  ? 'bg-sky-600 text-white font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              हिन्दी
            </button>
          </div>
          <button
            className="p-1.5 sm:p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg shadow-xl animate-fade-in">
          <div className="container-wide py-4 space-y-3">
            <div className="grid grid-cols-2 gap-1 pb-2 border-b border-slate-100">
              {NAV_ITEMS.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between',
                      isActive
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )
                  }
                  end={n.to === '/'}
                >
                  <span>{isHindi ? n.hi : n.en}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-1 flex items-center gap-2">
              <Link
                to="/datasets"
                className="btn bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex-1 text-center inline-flex items-center justify-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5" />
                {trans('Explore Polar Data', 'ध्रुवीय डेटा अन्वेषण')}
              </Link>
              <Link
                to="/expeditions"
                className="btn border border-slate-300 text-slate-800 text-xs py-2.5 px-3 rounded-lg hover:bg-slate-50"
              >
                <Compass className="w-3.5 h-3.5 text-sky-600" />
              </Link>
            </div>

            <div className="text-[11px] font-mono text-slate-400 text-center pt-1">
              {trans(
                'Ministry of Earth Sciences · NCPOR',
                'पृथ्वी विज्ञान मंत्रालय · राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र'
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
