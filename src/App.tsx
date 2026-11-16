import { Route, Routes, useLocation } from 'react-router-dom'
import React, { useEffect, Suspense, lazy } from 'react'
import { Compass } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import PolarisAI from './components/PolarisAI'
import Home from './pages/Home'

// Route Code-Splitting: Lazy load secondary routes to optimize Initial Bundle & LCP
const Explore = lazy(() => import('./pages/Explore'))
const Expeditions = lazy(() => import('./pages/Expeditions'))
const ExpeditionDetail = lazy(() => import('./pages/ExpeditionDetail'))
const Knowledge = lazy(() => import('./pages/Knowledge'))
const KnowledgeDetail = lazy(() => import('./pages/KnowledgeDetail'))
const Datasets = lazy(() => import('./pages/Datasets'))
const DatasetDetail = lazy(() => import('./pages/DatasetDetail'))
const Publications = lazy(() => import('./pages/Publications'))
const PublicationDetail = lazy(() => import('./pages/PublicationDetail'))
const Media = lazy(() => import('./pages/Media'))
const Education = lazy(() => import('./pages/Education'))
const Communicator = lazy(() => import('./pages/Communicator'))
const About = lazy(() => import('./pages/About'))

import { TourProvider } from './context/TourContext'
import TourOverlay from './components/TourOverlay'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'instant' : 'smooth' })
  }, [pathname])
  return null
}

function PolarRouteLoader() {
  return (
    <div className="py-28 text-center flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative flex items-center justify-center mb-4">
        {/* Pulsing polar ripple rings */}
        <div className="absolute w-16 h-16 rounded-full border border-cyan-400/40 animate-ping opacity-50" />
        <div className="absolute w-12 h-12 rounded-full border border-sky-400/50 animate-pulse" />
        <div className="w-12 h-12 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-sky-200 dark:border-slate-800 flex items-center justify-center shadow-lg shadow-sky-500/10 relative z-10">
          <Compass className="w-6 h-6 text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
        </div>
      </div>
      <p className="text-xs font-mono tracking-widest uppercase text-slate-700 dark:text-slate-300 font-bold">
        Synchronizing Polar Telemetry...
      </p>
      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mt-1 font-medium">
        Loading MoES / NCPOR Data Stream
      </span>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <TourProvider>
      <div className="min-h-screen flex flex-col bg-[#d6ecf9] dark:bg-[#0b1d2e] text-slate-900 dark:text-slate-100">
        <ScrollToTop />
        <Header />
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<PolarRouteLoader />}>
            <div key={location.pathname} className="page-transition-wrap flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/expeditions" element={<Expeditions />} />
                <Route path="/expeditions/:id" element={<ExpeditionDetail />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
                <Route path="/datasets" element={<Datasets />} />
                <Route path="/datasets/:id" element={<DatasetDetail />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/publications/:id" element={<PublicationDetail />} />
                <Route path="/media" element={<Media />} />
                <Route path="/education" element={<Education />} />
                <Route path="/communicator" element={<Communicator />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </Suspense>
        </main>
        <Footer />
        <SearchModal />
        <PolarisAI />
        <TourOverlay />
      </div>
    </TourProvider>
  )
}
