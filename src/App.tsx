import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import PolarisAI from './components/PolarisAI'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Expeditions from './pages/Expeditions'
import ExpeditionDetail from './pages/ExpeditionDetail'
import Knowledge from './pages/Knowledge'
import KnowledgeDetail from './pages/KnowledgeDetail'
import Datasets from './pages/Datasets'
import DatasetDetail from './pages/DatasetDetail'
import Publications from './pages/Publications'
import PublicationDetail from './pages/PublicationDetail'
import Media from './pages/Media'
import Education from './pages/Education'
import Communicator from './pages/Communicator'
import About from './pages/About'

import { TourProvider } from './context/TourContext'
import TourOverlay from './components/TourOverlay'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
}

export default function App() {
  return (
    <TourProvider>
      <div className="min-h-screen flex flex-col bg-[#d6ecf9] dark:bg-[#0b1d2e] text-slate-900 dark:text-slate-100">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
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
      </main>
        <Footer />
        <SearchModal />
        <PolarisAI />
        <TourOverlay />
      </div>
    </TourProvider>
  )
}
