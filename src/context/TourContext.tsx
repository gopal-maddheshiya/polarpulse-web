import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'

export interface TourStep {
  id: string
  route: string
  durationMs: number
  titleEn: string
  titleHi: string
  descEn: string
  descHi: string
  spotlightSelector?: string
  focusBadgeEn?: string
  focusBadgeHi?: string
  action?: () => void
}

interface TourContextType {
  isTourActive: boolean
  isPaused: boolean
  currentStepIndex: number
  currentStep: TourStep
  totalSteps: number
  stepProgress: number // 0 to 100
  overallProgress: number // 0 to 100
  startTour: () => void
  pauseTour: () => void
  resumeTour: () => void
  skipStep: () => void
  previousStep: () => void
  restartTour: () => void
  exitTour: () => void
}

const TourContext = createContext<TourContextType | null>(null)

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero-identity',
    route: '/',
    durationMs: 7000,
    titleEn: 'SOVEREIGN POLAR GATEWAY',
    titleHi: 'संप्रभु ध्रुवीय राष्ट्रीय मंच',
    descEn: "Unified national gateway connecting 44 years of Antarctic, Arctic & Southern Ocean expeditions with live telemetry.",
    descHi: 'अंटार्कटिका, आर्कटिक और दक्षिणी महासागर में भारत के 44 वर्षों के अभियानों व लाइव टेलीमेट्री का एकीकृत डिजिटल मंच।',
    spotlightSelector: '[data-tour="hero-identity"]',
    focusBadgeEn: 'SOVEREIGN POLAR IDENTITY & 44-YEAR ARCHIVE',
    focusBadgeHi: 'राष्ट्रीय ध्रुवीय द्वार एवं 44 वर्षों का इतिहास',
  },
  {
    id: 'live-telemetry',
    route: '/',
    durationMs: 7500,
    titleEn: 'REAL-TIME OUTPOST TELEMETRY',
    titleHi: 'रीयल-टाइम आउटपोस्ट टेलीमेट्री',
    descEn: 'Continuous downlinks monitoring katabatic winds, sub-zero temps, and photoperiod across Bharati, Maitri, and Himadri.',
    descHi: 'भारती, मैत्री और हिमाद्रि से सतही तापमान, कैटाबैटिक पवन व सौर स्थिति की 24/7 लाइव सेंसर मॉनिटरिंग।',
    spotlightSelector: '[data-tour="hero-telemetry-card"]',
    focusBadgeEn: '24/7 SENSOR DOWNLINK & RADAR OBSERVATORY',
    focusBadgeHi: 'भारती, मैत्री व हिमाद्रि से 24/7 लाइव सेंसर',
  },
  {
    id: 'polar-radar-map',
    route: '/#polar-map',
    durationMs: 8000,
    titleEn: 'INTERACTIVE 3D POLAR RADAR',
    titleHi: 'इंटरैक्टिव 3D पोलर रडार मैप',
    descEn: 'Stereographic cartography tracking sovereign research bases, oceanic currents, and live transit of ORV Sagar Nidhi.',
    descHi: 'भारतीय ध्रुवीय अनुसंधान केंद्रों, समुद्री धाराओं और सक्रिय शोध पोत ORV सागर निधि का लाइव ट्रैकिंग मैप।',
    spotlightSelector: '[data-tour="polar-map-canvas"]',
    focusBadgeEn: '3D POLAR PROJECTION & SAGAR NIDHI TRANSIT',
    focusBadgeHi: '3D पोलर प्रोजेक्शन व ORV सागर निधि ट्रैकिंग',
  },
  {
    id: 'expeditions-registry',
    route: '/expeditions',
    durationMs: 7500,
    titleEn: 'SOVEREIGN EXPEDITIONS ARCHIVE',
    titleHi: 'राष्ट्रीय वैज्ञानिक अभियान पुरालेख',
    descEn: 'Verifiable historical registry of every Indian expedition since 1981, highlighting the historic 44th ISEA mission.',
    descHi: '1981 से अब तक के प्रत्येक भारतीय मिशन का सत्यापित रिकॉर्ड, जिसमें 44वें अंटार्कटिक अभियान का पूरा विवरण शामिल है।',
    spotlightSelector: '[data-tour="expedition-card-featured"], [data-tour="expeditions-list"]',
    focusBadgeEn: '44TH EXPEDITION DOSSIER & POLAR ARCHIVE',
    focusBadgeHi: '44वां अंटार्कटिक मिशन व वैज्ञानिक पुरालेख',
  },
  {
    id: 'datasets-inspector',
    route: '/datasets',
    durationMs: 8000,
    titleEn: 'OPEN DATA & VERIFIABLE SCIENCE',
    titleHi: 'खुला वैज्ञानिक डेटा व सत्यापन',
    descEn: 'Open cryospheric datasets with live tabular inspectors, CSV downloads, and verified institutional DOI citations.',
    descHi: 'तालिकाबद्ध डेटासेट इंस्पेक्टर, सीधे CSV डाउनलोड और राष्ट्रीय ध्रुवीय डेटा केंद्र (NPDC) के आधिकारिक सत्यापन लिंक।',
    spotlightSelector: '[data-tour="dataset-inspect-modal"], [data-tour="datasets-registry"]',
    focusBadgeEn: 'OPEN CRYOSPHERIC DATA & TABULAR INSPECTOR',
    focusBadgeHi: 'ओपन क्रायोस्फेरिक डेटा व लाइव टेबल इंस्पेक्टर',
  },
  {
    id: 'smart-education',
    route: '/education',
    durationMs: 7500,
    titleEn: 'DUAL-MODE SMART EDUCATION LAB',
    titleHi: 'स्मार्ट ध्रुवीय शिक्षा प्रयोगशाला',
    descEn: 'Transforming complex glaciology into foundational school lessons and peer-level scientific evidence.',
    descHi: 'जटिल ध्रुवीय विज्ञान को सरल स्कूली पाठों और उच्च स्तरीय वैज्ञानिक प्रमाणों में बदलने वाली दोहरी शिक्षण प्रणाली।',
    spotlightSelector: '[data-tour="education-curriculum"]',
    focusBadgeEn: 'DUAL-LENS LAB: SIMPLE VS SCIENTIFIC',
    focusBadgeHi: 'दोहरा लेंस: सरल स्कूली व वैज्ञानिक दृष्टिकोण',
  },
  {
    id: 'polaris-ai-communicator',
    route: '/education', // Keeps background steady while AI modal opens
    durationMs: 9000,
    titleEn: 'AI POLAR SCIENCE COMMUNICATOR',
    titleHi: 'एआई ध्रुवीय विज्ञान संवादक',
    descEn: 'Gemini-powered multilingual communicator answering polar queries with source-grounded scientific citations.',
    descHi: 'जेमिनी-संचालित द्विभाषी एआई सहायक जो आधिकारिक स्रोतों के सत्यापन के साथ तुरंत वैज्ञानिक उत्तर देता है।',
    spotlightSelector: '[data-tour="polaris-ai-drawer"]',
    focusBadgeEn: 'GEMINI AI MULTILINGUAL SCIENCE COMMUNICATOR',
    focusBadgeHi: 'जेमिनी-पावर्ड ध्रुवीय एआई संवादक',
  },
  {
    id: 'ecosystem-cta',
    route: '/',
    durationMs: 6500,
    titleEn: 'ONE INTEGRATED POLAR ECOSYSTEM',
    titleHi: 'एक एकीकृत ध्रुवीय इकोसिस्टम',
    descEn: "Everything in POLARIS is production-ready, fully functional, and open for exploration. Tour complete.",
    descHi: 'अभियान, डेटासेट, शिक्षा और एआई संवादक एक ही मंच पर पूरी तरह सक्रिय और तैयार। आपका स्वागत है।',
    spotlightSelector: '[data-tour="hero-identity"]',
    focusBadgeEn: 'FULL ACCESS GRANTED · EXPLORE FREELY',
    focusBadgeHi: 'पूर्ण एक्सेस सक्रिय · अब स्वयं अन्वेषण करें',
  },
]

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()
  const { isHindi } = useLanguage()

  const activeStepRef = useRef<number>(0)
  const stepStartTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)
  const timerFrameRef = useRef<number | null>(null)
  const isTourActiveRef = useRef<boolean>(false)
  const isPausedRef = useRef<boolean>(false)

  // Keep refs synced
  activeStepRef.current = currentStepIndex
  isTourActiveRef.current = isTourActive
  isPausedRef.current = isPaused

  const totalSteps = TOUR_STEPS.length
  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0]

  // Cleanup all animation frames and timers
  const clearTourTimers = useCallback(() => {
    if (timerFrameRef.current !== null) {
      cancelAnimationFrame(timerFrameRef.current)
      timerFrameRef.current = null
    }
  }, [])

  // Execute step-specific real interactions
  const triggerStepInteractions = useCallback((stepIndex: number) => {
    const step = TOUR_STEPS[stepIndex]
    if (!step) return

    // Dispatch a global event for UI components to listen to
    window.dispatchEvent(
      new CustomEvent('polaris:tour-step', {
        detail: {
          stepIndex,
          stepId: step.id,
          isHindi,
        },
      })
    )

    // Step 0: Hero top
    if (step.id === 'hero-identity') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Step 1: Telemetry card on Home
    else if (step.id === 'live-telemetry') {
      setTimeout(() => {
        const telemetryCard = document.querySelector('[data-tour="hero-telemetry-card"]')
        if (telemetryCard) {
          telemetryCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        // Auto click Maitri button after 2.5s
        setTimeout(() => {
          const maitriBtn = document.querySelector('[data-tour="hero-station-maitri"]') as HTMLButtonElement
          if (maitriBtn) maitriBtn.click()
        }, 2200)
        // Auto click Cam view after 5s
        setTimeout(() => {
          const camBtn = document.querySelector('[data-tour="hero-view-cam"]') as HTMLButtonElement
          if (camBtn) camBtn.click()
        }, 4800)
      }, 400)
    }

    // Step 2: 3D Polar Map
    else if (step.id === 'polar-radar-map') {
      setTimeout(() => {
        const mapSection = document.getElementById('polar-map')
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        // Auto click South Pole / Antarctica view
        setTimeout(() => {
          const southBtn = document.querySelector('[data-tour="map-view-south"]') as HTMLButtonElement
          if (southBtn) southBtn.click()
        }, 2200)
        // Auto click Bharati station marker
        setTimeout(() => {
          const bharatiMarker = document.querySelector('[data-tour="map-station-bharati"]') as HTMLElement
          if (bharatiMarker) bharatiMarker.click()
        }, 4500)
      }, 500)
    }

    // Step 3: Expeditions Registry
    else if (step.id === 'expeditions-registry') {
      setTimeout(() => {
        window.scrollTo({ top: 220, behavior: 'smooth' })
      }, 400)
    }

    // Step 4: Datasets
    else if (step.id === 'datasets-inspector') {
      setTimeout(() => {
        window.scrollTo({ top: 260, behavior: 'smooth' })
        // Auto open Tabular Inspector modal
        setTimeout(() => {
          const inspectBtn = document.querySelector('[data-tour="dataset-inspect-btn"]') as HTMLButtonElement
          if (inspectBtn) inspectBtn.click()
        }, 2200)
        // Auto close Inspector modal before step ends
        setTimeout(() => {
          const closeBtn = document.querySelector('[data-tour="dataset-inspect-close"]') as HTMLButtonElement
          if (closeBtn) closeBtn.click()
        }, 6800)
      }, 400)
    }

    // Step 5: Smart Education Lab
    else if (step.id === 'smart-education') {
      setTimeout(() => {
        window.scrollTo({ top: 240, behavior: 'smooth' })
        // Auto toggle to scientific mode
        setTimeout(() => {
          const scientificToggle = document.querySelector('[data-tour="education-mode-scientific"]') as HTMLButtonElement
          if (scientificToggle) scientificToggle.click()
        }, 2600)
      }, 400)
    }

    // Step 6: Polaris AI Science Communicator
    else if (step.id === 'polaris-ai-communicator') {
      // Dispatch open AI with meaningful prompt
      window.dispatchEvent(
        new CustomEvent('polaris:open-ai', {
          detail: {
            prompt: isHindi
              ? "भारत के ध्रुवीय मिशन (अंटार्कटिका और आर्कटिक) के मुख्य वैज्ञानिक उद्देश्य क्या हैं?"
              : "Explain India's polar research mission in Antarctica and the Arctic in simple language.",
          },
        })
      )
    }

    // Step 7: Ecosystem CTA
    else if (step.id === 'ecosystem-cta') {
      // Close AI modal
      window.dispatchEvent(new CustomEvent('polaris:close-ai'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isHindi])

  // Move to a specific step
  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= TOUR_STEPS.length) {
      exitTour()
      return
    }

    clearTourTimers()
    setCurrentStepIndex(index)
    setStepProgress(0)

    const nextStep = TOUR_STEPS[index]

    // Handle routing if needed
    const targetPath = nextStep.route.split('#')[0]
    if (location.pathname !== targetPath) {
      navigate(targetPath)
    }

    // Trigger step interactions
    triggerStepInteractions(index)

    // Start progress timer loop
    stepStartTimeRef.current = performance.now()

    const stepDuration = nextStep.durationMs

    const updateLoop = (now: number) => {
      if (!isTourActiveRef.current) return

      if (isPausedRef.current) {
        // Keep frame looping but freeze progress
        stepStartTimeRef.current += (now - (pausedTimeRef.current || now))
        pausedTimeRef.current = now
        timerFrameRef.current = requestAnimationFrame(updateLoop)
        return
      }
      pausedTimeRef.current = 0

      const elapsed = now - stepStartTimeRef.current
      const progress = Math.min(100, (elapsed / stepDuration) * 100)
      setStepProgress(progress)

      if (elapsed >= stepDuration) {
        // Step complete, advance to next
        if (activeStepRef.current + 1 < TOUR_STEPS.length) {
          goToStep(activeStepRef.current + 1)
        } else {
          exitTour()
        }
      } else {
        timerFrameRef.current = requestAnimationFrame(updateLoop)
      }
    }

    timerFrameRef.current = requestAnimationFrame(updateLoop)
  }, [clearTourTimers, location.pathname, navigate, triggerStepInteractions])

  // Start the 60-second tour
  const startTour = useCallback(() => {
    setIsTourActive(true)
    setIsPaused(false)
    goToStep(0)
  }, [goToStep])

  // Pause
  const pauseTour = useCallback(() => {
    setIsPaused(true)
    pausedTimeRef.current = performance.now()
  }, [])

  // Resume
  const resumeTour = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Skip step
  const skipStep = useCallback(() => {
    if (currentStepIndex + 1 < TOUR_STEPS.length) {
      goToStep(currentStepIndex + 1)
    } else {
      exitTour()
    }
  }, [currentStepIndex, goToStep])

  // Previous step
  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1)
    }
  }, [currentStepIndex, goToStep])

  // Restart
  const restartTour = useCallback(() => {
    startTour()
  }, [startTour])

  // Exit tour cleanly
  const exitTour = useCallback(() => {
    clearTourTimers()
    setIsTourActive(false)
    setIsPaused(false)
    setStepProgress(0)

    // Ensure any open tour modals are closed
    window.dispatchEvent(new CustomEvent('polaris:close-ai'))
    window.dispatchEvent(new CustomEvent('polaris:tour-exit'))

    const closeDatasetBtn = document.querySelector('[data-tour="dataset-inspect-close"]') as HTMLButtonElement
    if (closeDatasetBtn) closeDatasetBtn.click()
  }, [clearTourTimers])

  // Global keyboard shortcuts (ESC to exit, Space to pause/resume)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isTourActiveRef.current) return

      if (e.key === 'Escape') {
        e.preventDefault()
        exitTour()
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault()
        if (isPausedRef.current) {
          resumeTour()
        } else {
          pauseTour()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [exitTour, pauseTour, resumeTour])

  const overallProgress = Math.round(
    ((currentStepIndex + stepProgress / 100) / totalSteps) * 100
  )

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        isPaused,
        currentStepIndex,
        currentStep,
        totalSteps,
        stepProgress,
        overallProgress,
        startTour,
        pauseTour,
        resumeTour,
        skipStep,
        previousStep,
        restartTour,
        exitTour,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
}
