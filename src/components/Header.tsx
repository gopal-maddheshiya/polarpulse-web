import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Menu, X, ArrowRight, Compass, Database, Globe, Sun, Moon, Play } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useTour } from '../context/TourContext'
import { cn } from '../lib/utils'

interface NavItem {
  to: string
  en: string
  hi: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', en: 'Home', hi: 'मुख्य पृष्ठ' },
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
  const { isDark, toggleTheme } = useTheme()
  const { startTour } = useTour()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    let wasScrolled = window.scrollY > 15
    setScrolled(wasScrolled)
    const onScroll = () => {
      const isScrolled = window.scrollY > 15
      if (isScrolled !== wasScrolled) {
        wasScrolled = isScrolled
        setScrolled(isScrolled)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-2 sm:top-3 z-40 px-2 sm:px-4 lg:px-6 transition-all duration-300 pointer-events-none -mb-14 sm:-mb-16">
      <div
        className={cn(
          'pointer-events-auto mx-auto w-full max-w-[1560px] rounded-full transition-all duration-300 relative overflow-hidden backdrop-blur-xl border',
          scrolled
            ? 'bg-white/80 dark:bg-[#07131e]/85 border-sky-200/90 dark:border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/35 dark:bg-[#07131e]/40 border-sky-200/50 dark:border-slate-800/60 shadow-xs'
        )}
      >
        {/* Subtle Polar Aurora Top Hairline */}
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 dark:via-cyan-400/60 to-transparent" />

        <div className="w-full px-2.5 sm:px-5 lg:px-6 flex items-center justify-between h-14 sm:h-16">
        {/* POLARIS Institutional Brand Crest (Clean & Solid, No Blinking) */}
        <Link to="/" className="flex items-center gap-2 group shrink-0 mr-1 sm:mr-2 xl:mr-4">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 dark:from-slate-850 dark:to-slate-900 text-white grid place-items-center shadow-xs border border-sky-400/50 dark:border-cyan-400/50 group-hover:border-cyan-400 dark:group-hover:border-cyan-300 group-hover:shadow-[0_0_14px_rgba(56,189,248,0.35)] transition-all duration-300">
            <svg
              viewBox="0 0 24 24"
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-cyan-300 group-hover:rotate-90 transition-transform duration-700 ease-out"
              fill="none"
            >
              <circle cx="12" cy="12" r="9.5" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="1.5 2" opacity="0.6" />
              {/* Secondary Diagonal Points */}
              <polygon points="12,12 17,7 13.5,11" fill="#38bdf8" opacity="0.75" />
              <polygon points="12,12 7,7 11,13.5" fill="#0284c7" opacity="0.75" />
              <polygon points="12,12 17,17 11,13.5" fill="#0284c7" opacity="0.75" />
              <polygon points="12,12 7,17 13.5,11" fill="#38bdf8" opacity="0.75" />
              {/* Primary Cardinal Rays (North Star Polaris) */}
              <polygon points="12,2 13.5,10.5 12,12" fill="#ffffff" />
              <polygon points="12,2 10.5,10.5 12,12" fill="#38bdf8" />
              <polygon points="12,22 13.5,13.5 12,12" fill="#38bdf8" />
              <polygon points="12,22 10.5,13.5 12,12" fill="#0284c7" />
              <polygon points="22,12 13.5,13.5 12,12" fill="#ffffff" />
              <polygon points="22,12 13.5,10.5 12,12" fill="#38bdf8" />
              <polygon points="2,12 10.5,13.5 12,12" fill="#38bdf8" />
              <polygon points="2,12 10.5,10.5 12,12" fill="#0284c7" />
              <circle cx="12" cy="12" r="1.8" fill="#ffffff" />
            </svg>
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-extrabold tracking-[0.12em] text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                POLARIS
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-sky-100/90 dark:bg-slate-800 border border-sky-300/80 dark:border-slate-700 text-sky-900 dark:text-sky-300 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {trans('INDIA', 'भारत')}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Institutional Navigation with Modern Capsule Pills */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink-0 bg-slate-100/70 dark:bg-slate-900/60 p-1 rounded-full border border-sky-200/60 dark:border-slate-800/80 backdrop-blur-md">
          {NAV_ITEMS.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'text-xs 2xl:text-[13px] font-semibold transition-all duration-200 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-full whitespace-nowrap',
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/80'
                )
              }
              end={n.to === '/'}
            >
              <span>{isHindi ? n.hi : n.en}</span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action & Search Cluster */}
        <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5 shrink-0">
          {/* Refined Pill Search Bar */}
          <button
            onClick={openSearch}
            type="button"
            aria-label="Search platform"
            className="flex items-center gap-1.5 rounded-full border border-sky-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-sky-50/70 dark:hover:bg-slate-800 hover:border-cyan-400/70 dark:hover:border-slate-700 transition shadow-2xs group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Bilingual Language Switcher Luxury Pill */}
          <div className="flex items-center rounded-full border border-sky-200/80 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 p-0.5 text-xs font-medium shadow-2xs">
            <button
              onClick={() => setLang('EN')}
              type="button"
              className={cn(
                'px-2 2xl:px-2.5 py-1 rounded-full transition-all font-sans text-xs',
                !isHindi
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-bold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              )}
              title="English interface"
            >
              EN
            </button>
            <button
              onClick={() => setLang('HI')}
              type="button"
              className={cn(
                'px-2 2xl:px-2.5 py-1 rounded-full transition-all font-sans text-xs',
                isHindi
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              )}
              title="हिन्दी इंटरफ़ेस"
            >
              हिन्दी
            </button>
          </div>

          {/* Dark / Light Mode Toggle Button with Tactile Pill Design */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? trans("Switch to Glacial Light", "ग्लेशियल लाइट मोड पर जाएँ") : trans("Switch to Polar Night", "ध्रुवीय रात्रि डार्क मोड पर जाएँ")}
            className="p-1.5 2xl:p-2 rounded-full border border-sky-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-amber-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:scale-105"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* 60-Second Automated Demo Tour Launch Pill */}
          <button
            onClick={startTour}
            type="button"
            className="group px-3 py-1.5 2xl:py-2 rounded-full bg-slate-950 dark:bg-sky-500/20 text-cyan-400 dark:text-sky-300 hover:text-white dark:hover:text-white border border-cyan-500/50 dark:border-sky-400/50 hover:border-cyan-400 font-semibold text-xs shadow-[0_0_14px_rgba(6,182,212,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] hover:scale-[1.03] transition-all whitespace-nowrap inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title={trans('Experience POLARIS in 60 seconds (Automated Demo)', '60 सेकंड का स्वचालित लाइव डेमो')}
          >
            <Play className="w-3.5 h-3.5 fill-current text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>{trans('60s Tour', '60s डेमो')}</span>
          </button>

          {/* Luxury Gradient Explore CTA */}
          <Link
            to="/datasets"
            className="group px-3 py-1.5 2xl:py-2 rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:via-sky-500 hover:to-blue-500 text-white font-semibold text-xs shadow-[0_2px_12px_rgba(2,132,199,0.25)] hover:shadow-[0_4px_16px_rgba(2,132,199,0.4)] hover:scale-[1.02] transition-all whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            <span>{trans('Explore Data', 'डेटा अन्वेषण')}</span>
          </Link>
        </div>

        {/* Mobile / Tablet Header Controls (Sleek 56px height, snug-bordered buttons) */}
        <div className="flex xl:hidden items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Mobile 60s Tour Trigger */}
          <button
            onClick={startTour}
            type="button"
            aria-label="Start 60-second Demo Tour"
            title={trans('Start 60-second Demo Tour', '60 सेकंड डेमो टूर')}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400/60 bg-slate-950 text-cyan-400 shadow-2xs hover:border-cyan-400 active:scale-95 transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
          </button>

          {/* Search Button with Snug Border */}
          <button
            onClick={openSearch}
            type="button"
            aria-label="Search"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-sky-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 shadow-2xs hover:border-cyan-400/80 active:scale-95 transition"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Mobile Theme Toggle with Snug Border */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? trans("Switch to Glacial Light", "ग्लेशियल लाइट मोड") : trans("Switch to Polar Night", "ध्रुवीय डार्क मोड")}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-sky-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-amber-300 shadow-2xs hover:border-cyan-400/80 active:scale-95 transition"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Both EN & हिन्दी Segmented Pill */}
          <div className="flex items-center rounded-full border border-sky-200/90 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 p-0.5 text-xs font-medium shadow-2xs">
            <button
              onClick={() => setLang('EN')}
              type="button"
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold transition-all font-sans',
                !isHindi
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-bold shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang('HI')}
              type="button"
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold transition-all font-sans',
                isHindi
                  ? 'bg-sky-600 text-white font-bold shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              )}
            >
              हिन्दी
            </button>
          </div>

          {/* Mobile Hamburger Toggle with Snug Border */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-sky-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 shadow-2xs hover:border-cyan-400/80 active:scale-95 transition"
            onClick={() => setOpen(o => !o)}
            type="button"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-900 dark:text-slate-100" /> : <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-900 dark:text-slate-100" />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="pointer-events-auto mt-2 mx-auto w-full max-w-[1560px] rounded-2xl border border-sky-200/90 dark:border-slate-800/90 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl shadow-2xl animate-slide-down overflow-hidden">
          <div className="px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-1 pb-2 border-b border-slate-100 dark:border-slate-850">
              {NAV_ITEMS.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between',
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                    )
                  }
                  end={n.to === '/'}
                >
                  <span>{isHindi ? n.hi : n.en}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer 60s Demo Tour Banner */}
            <button
              onClick={() => { setOpen(false); startTour(); }}
              type="button"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{trans('▶ Start 60-Second Demo Tour', '▶ 60-सेकंड लाइव डेमो शुरू करें')}</span>
            </button>

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
                className="btn border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs py-2.5 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              </Link>
            </div>

            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 text-center pt-1">
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
