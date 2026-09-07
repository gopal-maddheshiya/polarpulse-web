import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass, Database, Sparkles, MapPin, CheckCircle2, ChevronRight,
  GraduationCap, Copy, Check, FileText, ExternalLink, Calendar,
  ArrowRight, ArrowUpRight, ThermometerSnowflake, Wind, Anchor,
  Globe2, ShieldCheck, Flame, Layers, Eye, BookOpen, Radio, Award,
  Sun, Activity, Wifi, ChevronDown, CheckCircle
} from 'lucide-react'
import { HERO_IMAGE, IMG } from '../data/images'
import { expeditions } from '../data/expeditions'
import { knowledgeItems } from '../data/knowledge'
import { LineChart, type ChartPoint } from '../components/ui/Chart'
import PolarMap from '../components/PolarMap'
import PolarTelemetryTicker from '../components/PolarTelemetryTicker'
import { Container, Section } from '../components/ui/Primitives'
import { Reveal } from '../lib/reveal'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'

type PolarRealm = 'antarctica' | 'arctic' | 'himalayas'
type HeroStationId = 'bharati' | 'maitri' | 'himadri'

interface LiveTelemetry {
  id: HeroStationId
  name: string
  region: string
  temp: string
  wind: string
  telemetryMetric: string
  telemetryLabel: string
  sunStatus: string
  coordinates: string
  elevation: string
  established: number
  photo: string
  status: 'Operational' | 'Active Observation'
}

const LIVE_STATIONS: Record<HeroStationId, LiveTelemetry> = {
  bharati: {
    id: 'bharati',
    name: 'Bharati Polar Station',
    region: 'Larsemann Hills, East Antarctica',
    temp: '-11.2°C',
    wind: '18 kts SSE',
    telemetryMetric: 'ISRO Telemetry Active',
    telemetryLabel: 'Satellite Downlink',
    sunStatus: 'Polar Summer Window',
    coordinates: '69°24′S, 76°11′E',
    elevation: '35 m',
    established: 2012,
    photo: IMG.bharati,
    status: 'Operational',
  },
  maitri: {
    id: 'maitri',
    name: 'Maitri Research Base',
    region: 'Schirmacher Oasis, East Antarctica',
    temp: '-16.4°C',
    wind: '12 kts E',
    telemetryMetric: '284 DU (Normal)',
    telemetryLabel: 'Total Column Ozone',
    sunStatus: 'Low Horizon Angle (14°)',
    coordinates: '70°45′S, 11°44′E',
    elevation: '130 m',
    established: 1989,
    photo: IMG.maitri,
    status: 'Active Observation',
  },
  himadri: {
    id: 'himadri',
    name: 'Himadri Arctic Station',
    region: 'Ny-Ålesund, Svalbard (79°N)',
    temp: '-4.1°C',
    wind: '08 kts NW',
    telemetryMetric: '192m Fjord Array',
    telemetryLabel: 'IndARC Deep Mooring',
    sunStatus: 'Arctic Twilight',
    coordinates: '78°55′N, 11°56′E',
    elevation: '20 m',
    established: 2008,
    photo: IMG.himadri,
    status: 'Operational',
  },
}

export default function Home() {
  const { isHindi, trans } = useLanguage()
  const [heroStation, setHeroStation] = useState<HeroStationId>('bharati')
  const [heroViewMode, setHeroViewMode] = useState<'radar' | 'camera'>('radar')
  const [activeRealm, setActiveRealm] = useState<PolarRealm>('antarctica')
  const [eduMode, setEduMode] = useState<'simple' | 'scientific'>('simple')
  const [copiedAbstract, setCopiedAbstract] = useState(false)

  // Listen for automated demo tour events to cycle stations & views in real-time
  useEffect(() => {
    const handleTourStep = (e: any) => {
      const stepId = e.detail?.stepId
      if (stepId === 'live-telemetry') {
        setHeroStation('bharati')
        setHeroViewMode('radar')
        setTimeout(() => setHeroStation('maitri'), 2200)
        setTimeout(() => setHeroViewMode('camera'), 4400)
      } else if (stepId === 'hero-identity') {
        setHeroStation('bharati')
        setHeroViewMode('radar')
      }
    }

    window.addEventListener('polaris:tour-step', handleTourStep as EventListener)
    return () => window.removeEventListener('polaris:tour-step', handleTourStep as EventListener)
  }, [])

  const featuredExpedition = expeditions[0]
  const st = LIVE_STATIONS[heroStation]

  // Southern Ocean Sea-Ice Extent (2024–2025 Climatology vs 1981–2010 Mean)
  const seaIceCurrent: ChartPoint[] = [
    { label: isHindi ? 'जन' : 'Jan', value: 13.8 },
    { label: isHindi ? 'मार्च' : 'Mar', value: 13.1 },
    { label: isHindi ? 'मई' : 'May', value: 11.7 },
    { label: isHindi ? 'जुलाई' : 'Jul', value: 7.1 },
    { label: isHindi ? 'सित' : 'Sep', value: 6.4 },
    { label: isHindi ? 'नव' : 'Nov', value: 11.2 },
    { label: isHindi ? 'दिस' : 'Dec', value: 13.4 },
  ]

  const seaIceBaseline: ChartPoint[] = [
    { label: isHindi ? 'जन' : 'Jan', value: 14.6 },
    { label: isHindi ? 'मार्च' : 'Mar', value: 13.9 },
    { label: isHindi ? 'मई' : 'May', value: 12.3 },
    { label: isHindi ? 'जुलाई' : 'Jul', value: 7.7 },
    { label: isHindi ? 'सित' : 'Sep', value: 7.1 },
    { label: isHindi ? 'नव' : 'Nov', value: 12.1 },
    { label: isHindi ? 'दिस' : 'Dec', value: 14.1 },
  ]

  return (
    <div className="bg-[#edf5fb] dark:bg-[#07131e] text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-900 min-h-screen">
      {/* ========================================================================= */}
      {/* 1. LUXURY SPLIT HERO WITH LIVE POLAR TELEMETRY RADAR WIDGET              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20 border-b border-sky-200/70 dark:border-slate-800/80 bg-gradient-to-b from-[#d6ecf9] via-[#e6f3fa] to-[#edf5fb] dark:from-[#0b1d2e] dark:via-[#091724] dark:to-[#07131e]">
        {/* Apple-style subtle ambient light reflections */}
        <div className="absolute -top-40 right-10 w-[550px] h-[550px] bg-gradient-to-br from-cyan-300/35 via-sky-200/40 to-transparent dark:from-cyan-500/15 dark:via-sky-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-[420px] h-[420px] bg-gradient-to-tr from-sky-300/30 via-blue-200/25 to-transparent dark:from-sky-600/10 dark:via-blue-800/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ambient Rotating Polar Astrolabe in Hero Background */}
        <div className="absolute -top-20 -right-20 md:right-8 w-[580px] h-[580px] lg:w-[700px] lg:h-[700px] pointer-events-none select-none opacity-45 md:opacity-65 dark:opacity-25">
          {/* Outer Clockwise Rotating Degree Ring */}
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r="236" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 7" opacity="0.45" />
            <circle cx="250" cy="250" r="212" stroke="#38bdf8" strokeWidth="1" opacity="0.35" />
            <circle cx="250" cy="250" r="186" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="8 8" opacity="0.25" />
            {/* Azimuth Degree Markers */}
            <text x="250" y="24" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">000° N</text>
            <text x="478" y="254" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">090° E</text>
            <text x="250" y="488" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">180° S</text>
            <text x="22" y="254" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="bold">270° W</text>
            <text x="410" y="95" textAnchor="middle" fill="#0284c7" fontSize="8" fontFamily="monospace" opacity="0.6">045°</text>
            <text x="410" y="415" textAnchor="middle" fill="#0284c7" fontSize="8" fontFamily="monospace" opacity="0.6">135°</text>
            <text x="90" y="415" textAnchor="middle" fill="#0284c7" fontSize="8" fontFamily="monospace" opacity="0.6">225°</text>
            <text x="90" y="95" textAnchor="middle" fill="#0284c7" fontSize="8" fontFamily="monospace" opacity="0.6">315°</text>
          </svg>

          {/* Inner Counter-Clockwise Rotating Coordinate Graticule */}
          <div className="absolute inset-[14%]">
            <svg className="w-full h-full animate-spin-reverse-slow" viewBox="0 0 360 360" fill="none">
              <circle cx="180" cy="180" r="150" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
              <circle cx="180" cy="180" r="110" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="14 14" opacity="0.35" />
              <circle cx="180" cy="180" r="70" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
              <line x1="180" y1="15" x2="180" y2="345" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />
              <line x1="15" y1="180" x2="345" y2="180" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />
              <circle cx="180" cy="30" r="3.5" fill="#0ea5e9" opacity="0.7" />
              <circle cx="330" cy="180" r="3.5" fill="#0ea5e9" opacity="0.7" />
              <circle cx="180" cy="330" r="3.5" fill="#0ea5e9" opacity="0.7" />
              <circle cx="30" cy="180" r="3.5" fill="#0ea5e9" opacity="0.7" />
            </svg>
          </div>
        </div>

        <Container className="relative">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* LEFT COLUMN: Editorial Typography & Intentional Action */}
              <div className="lg:col-span-7 space-y-6">
                <div data-tour="hero-identity" className="space-y-5">
                  {/* Refined Pill Badge with Rotating Polar Compass */}
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-sky-200 dark:border-slate-700 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.06)] text-[11px] font-mono tracking-wide text-slate-700 dark:text-slate-300">
                    <span className="flex h-4 w-4 relative items-center justify-center">
                      <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-spin-slow" />
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      {trans('National Polar Science Gateway', 'राष्ट्रीय ध्रुवीय विज्ञान द्वार')}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-medium">{trans('MoES · NCPOR', 'पृथ्वी विज्ञान मंत्रालय')}</span>
                  </div>

                  {/* Commanding Headline */}
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                    {isHindi ? (
                      <>
                        ध्रुवों के रहस्यमयी विज्ञान का <br />
                        <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                          संप्रभु राष्ट्रीय मंच।
                        </span>
                      </>
                    ) : (
                      <>
                        Deciphering Earth’s <br />
                        <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                          Frozen Frontiers.
                        </span>
                      </>
                    )}
                  </h1>

                  {/* Subtitle with High Typography Hierarchy */}
                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                    {trans(
                      "India's sovereign polar archive connecting 44 years of Antarctic, Arctic, and Southern Ocean expeditions, open cryospheric data, and AI-assisted scientific dissemination.",
                      "अंटार्कटिका, आर्कटिक और दक्षिणी महासागर में भारत के 44 वर्षों के वैज्ञानिक अभियानों, खुले क्रायोस्फेरिक डेटासेट और एआई-संचालित विज्ञान प्रसार का एकीकृत डिजिटल मंच।"
                    )}
                  </p>
                </div>

                {/* Action Buttons: Apple/Linear Luxury Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#polar-map"
                    className="group px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_14px_0_rgba(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.25)] transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Globe2 className="w-4 h-4 text-cyan-400 dark:text-slate-950 group-hover:rotate-45 transition-transform duration-500" />
                    <span>{trans('Explore 3D Polar Map', '3D ध्रुवीय मानचित्र')}</span>
                  </a>

                  <Link
                    to="/expeditions"
                    className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-sky-50/60 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm border border-sky-200/90 dark:border-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-sky-300 transition duration-200 inline-flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{trans('Expeditions (1st–44th)', 'अभियान (1981–2025)')}</span>
                  </Link>

                  <Link
                    to="/datasets"
                    className="px-5 py-3.5 rounded-xl bg-cyan-100/70 dark:bg-cyan-950/60 hover:bg-cyan-200/60 dark:hover:bg-cyan-900/60 text-cyan-950 dark:text-cyan-200 font-semibold text-xs sm:text-sm border border-cyan-300/80 dark:border-cyan-800 transition duration-200 inline-flex items-center gap-2"
                  >
                    <Database className="w-4 h-4 text-cyan-800 dark:text-cyan-300" />
                    <span>{trans('Open Data Portal', 'ओपन डेटासेट')}</span>
                  </Link>
                </div>

                {/* Micro Stat Badges */}
                <div data-tour="hero-identity" className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{trans('44 Missions', '44 अभियान')}</span>
                    <span>(1981–2025)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{trans('3 Bases', '3 स्थायी केंद्र')}</span>
                    <span>{trans('(Year-round)', '(वर्ष पर्यन्त)')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{trans('100% Open Data', '100% खुला डेटा')}</span>
                    <span>(NPDC)</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Live Polar Telemetry & 360° Radar Card */}
              <div data-tour="hero-telemetry-card" className="lg:col-span-5">
                <div className="rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-sky-200 dark:border-slate-800 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.1),0_2px_8px_rgba(15,23,42,0.04)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
                  {/* Station Selector Bar & View Mode Toggle */}
                  <div className="p-3 bg-sky-50/70 dark:bg-slate-950 border-b border-sky-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    {/* Station Selector */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setHeroStation('bharati')}
                        data-tour="hero-station-bharati"
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                          heroStation === 'bharati'
                            ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-sky-200 dark:border-slate-700'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                      >
                        {isHindi ? 'भारती' : 'Bharati'}
                      </button>
                      <button
                        onClick={() => setHeroStation('maitri')}
                        data-tour="hero-station-maitri"
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                          heroStation === 'maitri'
                            ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-sky-200 dark:border-slate-700'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                      >
                        {isHindi ? 'मैत्री' : 'Maitri'}
                      </button>
                      <button
                        onClick={() => setHeroStation('himadri')}
                        data-tour="hero-station-himadri"
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                          heroStation === 'himadri'
                            ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-sky-200 dark:border-slate-700'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                      >
                        {isHindi ? 'हिमाद्रि' : 'Himadri'}
                      </button>
                    </div>

                    {/* View Mode Toggle: Radar vs Camera */}
                    <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-855 p-0.5 rounded-lg border border-sky-200 dark:border-slate-700">
                      <button
                        onClick={() => setHeroViewMode('radar')}
                        data-tour="hero-view-radar"
                        className={cn(
                          'px-2 py-0.5 rounded text-[11px] font-mono font-medium inline-flex items-center gap-1 transition-all',
                          heroViewMode === 'radar'
                            ? 'bg-slate-950 dark:bg-sky-500 text-cyan-300 dark:text-slate-950 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                        title="360° Live Polar Radar Scanner"
                      >
                        <Radio className="w-3 h-3 text-cyan-400 dark:text-slate-950 animate-pulse" />
                        <span>{trans('Radar', 'रडार')}</span>
                      </button>
                      <button
                        onClick={() => setHeroViewMode('camera')}
                        data-tour="hero-view-cam"
                        className={cn(
                          'px-2 py-0.5 rounded text-[11px] font-mono font-medium inline-flex items-center gap-1 transition-all',
                          heroViewMode === 'camera'
                            ? 'bg-slate-950 dark:bg-sky-500 text-white dark:text-slate-950 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                        title="Outpost Camera View"
                      >
                        <Eye className="w-3 h-3 text-sky-400 dark:text-slate-950" />
                        <span>{trans('Cam', 'कैमरा')}</span>
                      </button>
                    </div>
                  </div>

                  {/* DISPLAY CONTAINER: 360° Polar Radar Scanner OR Camera View */}
                  {heroViewMode === 'radar' ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#031326] via-[#081f38] to-[#041224] text-white select-none">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-polar-grid opacity-15" />

                      {/* Concentric Polar Latitude Rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Outer Polar Ring (60°S) */}
                        <div className="w-[88%] h-[88%] rounded-full border border-cyan-500/20" />
                        {/* Middle Polar Ring (70°S) */}
                        <div className="absolute w-[64%] h-[64%] rounded-full border border-cyan-400/25 border-dashed" />
                        {/* Inner Polar Ring (80°S) */}
                        <div className="absolute w-[40%] h-[40%] rounded-full border border-cyan-400/30" />
                        {/* South Pole Center */}
                        <div className="absolute w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee]" />
                        {/* Graticule Crosshairs */}
                        <div className="absolute w-[92%] h-[1px] bg-cyan-500/15" />
                        <div className="absolute h-[92%] w-[1px] bg-cyan-500/15" />
                      </div>

                      {/* Rotating Outer Azimuth Dial */}
                      <div className="absolute inset-2 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 300 300" fill="none">
                          <circle cx="150" cy="150" r="140" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
                          <circle cx="150" cy="150" r="130" stroke="#38bdf8" strokeWidth="0.75" opacity="0.25" />
                          <text x="150" y="16" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">000°N</text>
                          <text x="286" y="153" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">090°E</text>
                          <text x="150" y="292" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">180°S</text>
                          <text x="14" y="153" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">270°W</text>
                        </svg>
                      </div>

                      {/* Counter-Rotating Latitude Ring */}
                      <div className="absolute inset-10 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-full animate-spin-reverse-slow" viewBox="0 0 200 200" fill="none">
                          <circle cx="100" cy="100" r="95" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                          <circle cx="100" cy="100" r="70" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="12 12" opacity="0.35" />
                          <circle cx="100" cy="5" r="2.5" fill="#22d3ee" />
                          <circle cx="195" cy="100" r="2.5" fill="#22d3ee" />
                          <circle cx="100" cy="195" r="2.5" fill="#22d3ee" />
                          <circle cx="5" cy="100" r="2.5" fill="#22d3ee" />
                        </svg>
                      </div>

                      {/* 360° Real-time Sweeping Radar Beam */}
                      <div
                        className="absolute inset-0 origin-center animate-radar-sweep pointer-events-none"
                        style={{
                          background:
                            'conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.45) 0deg, rgba(6, 182, 212, 0.08) 45deg, transparent 65deg)',
                        }}
                      />

                      {/* Orbiting Polar Satellite (ISRO Oceansat-3) */}
                      <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
                        <div
                          className="w-[82%] h-[82%] rounded-full border border-sky-400/20 animate-spin-slow"
                          style={{ animationDuration: '16s' }}
                        >
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-950/80 px-1.5 py-0.5 rounded-full border border-sky-400/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span className="text-[7px] font-mono text-cyan-200">ISRO OCEANSAT-3</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Radar Blip 1: Bharati (69°S, 76°E) */}
                      <button
                        onClick={() => setHeroStation('bharati')}
                        className="group/blip absolute top-[64%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10 transition-transform hover:scale-125"
                      >
                        <span className="relative flex h-3 w-3 items-center justify-center">
                          <span className={cn(
                            'absolute inline-flex h-full w-full rounded-full opacity-75',
                            heroStation === 'bharati' ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'
                          )} />
                          <span className={cn(
                            'relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px]',
                            heroStation === 'bharati' ? 'bg-emerald-400 shadow-emerald-400' : 'bg-cyan-300 shadow-cyan-300'
                          )} />
                        </span>
                        <span className={cn(
                          'text-[8px] font-mono font-bold tracking-tight px-1 py-0.2 rounded mt-0.5 backdrop-blur-xs',
                          heroStation === 'bharati'
                            ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/60'
                            : 'bg-slate-950/70 text-slate-300'
                        )}>
                          BHARATI (69°S)
                        </span>
                      </button>

                      {/* Interactive Radar Blip 2: Maitri (70°S, 11°E) */}
                      <button
                        onClick={() => setHeroStation('maitri')}
                        className="group/blip absolute top-[70%] left-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10 transition-transform hover:scale-125"
                      >
                        <span className="relative flex h-3 w-3 items-center justify-center">
                          <span className={cn(
                            'absolute inline-flex h-full w-full rounded-full opacity-75',
                            heroStation === 'maitri' ? 'bg-cyan-400 animate-ping' : 'bg-sky-400'
                          )} />
                          <span className={cn(
                            'relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px]',
                            heroStation === 'maitri' ? 'bg-cyan-400 shadow-cyan-400' : 'bg-sky-300 shadow-sky-300'
                          )} />
                        </span>
                        <span className={cn(
                          'text-[8px] font-mono font-bold tracking-tight px-1 py-0.2 rounded mt-0.5 backdrop-blur-xs',
                          heroStation === 'maitri'
                            ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/60'
                            : 'bg-slate-950/70 text-slate-300'
                        )}>
                          MAITRI (70°S)
                        </span>
                      </button>

                      {/* Interactive Radar Blip 3: Himadri (79°N, 12°E, Arctic Node) */}
                      <button
                        onClick={() => setHeroStation('himadri')}
                        className="group/blip absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10 transition-transform hover:scale-125"
                      >
                        <span className="relative flex h-3 w-3 items-center justify-center">
                          <span className={cn(
                            'absolute inline-flex h-full w-full rounded-full opacity-75',
                            heroStation === 'himadri' ? 'bg-amber-400 animate-ping' : 'bg-amber-400/60'
                          )} />
                          <span className={cn(
                            'relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px]',
                            heroStation === 'himadri' ? 'bg-amber-400 shadow-amber-400' : 'bg-amber-300 shadow-amber-300'
                          )} />
                        </span>
                        <span className={cn(
                          'text-[8px] font-mono font-bold tracking-tight px-1 py-0.2 rounded mt-0.5 backdrop-blur-xs',
                          heroStation === 'himadri'
                            ? 'bg-amber-950/90 text-amber-300 border border-amber-500/60'
                            : 'bg-slate-950/70 text-slate-300'
                        )}>
                          HIMADRI (79°N)
                        </span>
                      </button>

                      {/* Top HUD Telemetry Overlay */}
                      <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-cyan-300/90 pointer-events-none">
                        <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>POLAR RADAR · 9.41 GHz</span>
                        </div>
                        <div className="bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          <span>360° AZIMUTH SWEEP</span>
                        </div>
                      </div>

                      {/* Bottom HUD Target Lock Readout */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                        <div className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/40 text-cyan-200">
                          <span className="text-cyan-400 font-bold">TARGET: </span>
                          <span>{st.name.toUpperCase()} [{st.coordinates}]</span>
                        </div>
                        <div className="bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded border border-cyan-500/40 text-slate-300 text-[9px]">
                          {st.status}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Station Photo Banner with Sleek Vignette */
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={st.photo}
                        alt={st.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                        <span className="bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[11px]">
                          {st.coordinates}
                        </span>
                        <span className="bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[11px]">
                          Elev. {st.elevation}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-semibold block">
                          {st.region}
                        </span>
                        <h3 className="font-display text-xl font-bold leading-tight mt-0.5">
                          {st.name}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Telemetry Sensor Dashboard Grid */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Sensor 1: Temperature */}
                      <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                          <span>{trans('Temperature', 'सतही तापमान')}</span>
                          <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="font-display text-2xl font-bold text-slate-950 dark:text-white mt-1">
                          {st.temp}
                        </div>
                      </div>

                      {/* Sensor 2: Wind Speed */}
                      <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                          <span>{trans('Surface Wind', 'सतही पवन')}</span>
                          <Wind className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="font-display text-2xl font-bold text-slate-950 dark:text-white mt-1">
                          {st.wind}
                        </div>
                      </div>

                      {/* Sensor 3: Specific Telemetry */}
                      <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                          <span className="truncate">{trans(st.telemetryLabel, st.id === 'bharati' ? 'उपग्रह लिंक' : st.id === 'maitri' ? 'ओजोन स्तंभ' : 'डीप मूरिंग')}</span>
                          <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        </div>
                        <div className="font-sans text-xs font-bold text-slate-950 dark:text-white mt-1.5 truncate">
                          {trans(st.telemetryMetric, st.id === 'bharati' ? 'इसरो टेलीमेट्री सक्रिय' : st.id === 'maitri' ? '284 DU (सामान्य)' : '192 मी सेंसर ऐरे')}
                        </div>
                      </div>

                      {/* Sensor 4: Solar/Sun Elevation */}
                      <div className="p-3 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                          <span>{trans('Solar Condition', 'सौर स्थिति')}</span>
                          <Sun className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="font-sans text-xs font-bold text-slate-950 dark:text-white mt-1.5 truncate">
                          {trans(st.sunStatus, st.id === 'bharati' ? 'ध्रुवीय ग्रीष्म काल' : st.id === 'maitri' ? 'निम्न क्षितिज कोण' : 'आर्कटिक गोधूलि')}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                      <span className="font-mono text-slate-400 dark:text-slate-500">
                        {trans('Est.', 'स्था.')} {st.established} · {trans('Sovereign Outpost', 'संप्रभु अनुसंधान चौकी')}
                      </span>
                      <a
                        href={st.id === 'himadri' ? 'https://ncpor.res.in/arctics/display/394-himadri' : `https://ncpor.res.in/antarcticas/display/${st.id === 'maitri' ? '376-maitri-' : '377-bharati'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>{trans('Official NCPOR Dossier', 'एनसीपीओआर आधिकारिक दस्तावेज़')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. SUBTLE LIVE POLAR OBSERVATION TICKER (MISSION CONTROL STRIP)          */}
      {/* ========================================================================= */}
      <PolarTelemetryTicker />

      {/* ========================================================================= */}
      {/* 3. THREE POLAR REALMS: LUXURY EDITORIAL SHOWCASE                          */}
      {/* ========================================================================= */}
      <Section className="py-16 sm:py-24 bg-[#edf5fb] dark:bg-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                {trans('Sovereign Polar Geometry', 'संप्रभु ध्रुवीय उपस्थिति')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 dark:text-white mt-2 tracking-tight">
                {trans('The Three Polar Realms', 'भारत के तीन ध्रुवीय क्षेत्र')}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {trans(
                  'India operates continuous sovereign scientific stations across both geographical poles and the Himalayan Third Pole to monitor global climate teleconnections.',
                  'भारत वैश्विक जलवायु संतुलन की निगरानी के लिए दोनों भौगोलिक ध्रुवों और हिमालयी तीसरे ध्रुव पर स्थायी संप्रभु अनुसंधान केंद्र संचालित करता है।'
                )}
              </p>
            </div>

            {/* 3 Luxury Horizontal Architectural Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Realm 1: Antarctica */}
              <div className="group rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={IMG.bharati}
                      alt="Antarctica Bharati Station"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border border-transparent dark:border-slate-700">
                        South Pole (70°S)
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-display text-xl font-bold">Antarctica</h3>
                      <div className="text-xs text-cyan-300 font-mono">Maitri (1989) & Bharati (2012)</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {trans(
                        'Over 44 consecutive annual expeditions studying the Antarctic Ice Sheet, total column ozone hole recovery, and Southern Ocean carbon sinks.',
                        'अंटार्कटिक हिम चादर, ओजोन परत की बहाली और दक्षिणी महासागर कार्बन अवशोषण का 44 वर्षों का निरंतर अध्ययन।'
                      )}
                    </p>

                    <div className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('Year-round wintering crew of 49 scientists', '49 वैज्ञानिकों का वर्ष पर्यन्त शीतकालीन दल')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('ISRO Earth Observation satellite downlink', 'इसरो भू-अवलोकन उपग्रह डाउनलिंक')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <a
                    href="https://ncpor.res.in/antarcticas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('NCPOR Antarctic Portal', 'एनसीपीओआर अंटार्कटिक पोर्टल')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link to="/expeditions" className="text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 inline-flex items-center gap-1">
                    <span>{trans('Missions →', 'वैज्ञानिक अभियान →')}</span>
                  </Link>
                </div>
              </div>

              {/* Realm 2: High Arctic */}
              <div className="group rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={IMG.himadri}
                      alt="Himadri Arctic Station"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border border-transparent dark:border-slate-700">
                        High Arctic (79°N)
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-display text-xl font-bold">The Arctic</h3>
                      <div className="text-xs text-cyan-300 font-mono">Himadri (2008) & IndARC (2014)</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {trans(
                        'Located 1,230 km from the North Pole at Ny-Ålesund, Svalbard. Investigates Arctic amplification and marine fjord dynamics.',
                        'उत्तरी ध्रुव से मात्र 1,230 किमी दूर स्वालबार्ड में स्थित। आर्कटिक जलवायु प्रवर्धन और समुद्री फ्योर्ड जलविज्ञान का अध्ययन।'
                      )}
                    </p>

                    <div className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('IndARC multi-sensor underwater mooring (192m)', 'IndARC बहु-सेंसर जलमग्न वेधशाला (192 मी)')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('Arctic-Indian Monsoon teleconnection research', 'आर्कटिक-भारतीय मानसून अंतर्संबंध अनुसंधान')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <a
                    href="https://ncpor.res.in/arctics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('NCPOR Arctic Portal', 'एनसीपीओआर आर्कटिक पोर्टल')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link to="/expeditions" className="text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 inline-flex items-center gap-1">
                    <span>{trans('Missions →', 'वैज्ञानिक अभियान →')}</span>
                  </Link>
                </div>
              </div>

              {/* Realm 3: The Third Pole (Himalayas) */}
              <div className="group rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={IMG.glacier}
                      alt="Himansh Himalayan Cryosphere"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border border-transparent dark:border-slate-700">
                        The Third Pole (4,050m)
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-display text-xl font-bold">The Third Pole</h3>
                      <div className="text-xs text-cyan-300 font-mono">Himansh Station (2016)</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {trans(
                        'Chandra Basin glaciological observatory in Lahaul-Spiti quantifying glacier mass balance and meltwater contributions to North Indian rivers.',
                        'लाहौल-स्पीति में स्थित वेधशाला जो हिमनदों के द्रव्यमान संतुलन और उत्तर भारत की नदियों में हिमनद जल आपूर्ति की निगरानी करती है।'
                      )}
                    </p>

                    <div className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('Benchmark monitoring of Sutri Dhaka & Batal glaciers', 'सुत्री ढाका एवं बाटल हिमनदों की बेंचमार्क निगरानी')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{trans('Critical water security data for 1.4 billion people', '1.4 अरब लोगों की जल सुरक्षा हेतु महत्वपूर्ण डेटा')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <a
                    href="https://ncpor.res.in/pages/display/268-himalaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('NCPOR Cryosphere Portal', 'एनसीपीओआर क्रायोस्फेयर पोर्टल')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link to="/datasets" className="text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 inline-flex items-center gap-1">
                    <span>{trans('Datasets →', 'अनुसंधान डेटासेट →')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 4. "DID YOU KNOW?" SCIENCE HOOK CARDS                                     */}
      {/* ========================================================================= */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#edf5fb] via-[#e2f0fa] to-[#edf5fb] dark:from-[#07131e] dark:via-[#091724] dark:to-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                {trans('Curated Discoveries', 'रोचक वैज्ञानिक तथ्य')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white mt-2">
                {trans('Did You Know? Polar Science Secrets', 'क्या आप जानते हैं? ध्रुवों के अनसुलझे रहस्य')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="text-2xl mb-3">🌧️</div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                    {trans('Antarctica Modulates Indian Rainfall', 'अंटार्कटिका से नियंत्रित होता है भारतीय मानसून')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    {trans(
                      'Antarctic sea ice cold surges propagate across the equator, directly regulating the Mascarene High pressure cell that pushes moisture toward the Indian subcontinent.',
                      'अंटार्कटिका में समुद्री बर्फ के बदलाव मस्करेन हाई दबाव को बदलते हैं, जो भारत में मानसूनी बारिश लाने वाली प्रमुख मौसमी प्रणाली है।'
                    )}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <Link to="/datasets" className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline inline-flex items-center gap-1">
                    <span>{trans('Explore Teleconnection Data →', 'जलवायु डेटा देखें →')}</span>
                  </Link>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="text-2xl mb-3">🏗️</div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                    {trans('Bharati’s 200 km/h Blizzard Envelope', '200 किमी/घंटा तूफानों का सामना करता भारती')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    {trans(
                      'Bharati is built on aerodynamic stilts wrapped in specialized thermal panels. Polar gales blow cleanly under the building, preventing snow drifts from burying the structure.',
                      'भारती स्टेशन को विशेष खंभों पर ऊंचा उठाया गया है जिससे 200 किमी/घंटे की हवाएं इमारत के नीचे से सुरक्षित निकल जाती हैं।'
                    )}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <a
                    href="https://ncpor.res.in/antarcticas/display/377-bharati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('Station Architectural Dossier ↗', 'स्टेशन वास्तुकला विवरण ↗')}</span>
                  </a>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="text-2xl mb-3">🌊</div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                    {trans('IndARC: 192m Deep Under Arctic Ice', 'आर्कटिक समुद्र में 192 मीटर नीचे IndARC')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    {trans(
                      'India operates IndARC, a multi-sensor mooring anchored 192m deep in Kongsfjorden fjord, recording Atlantic water intrusion year-round beneath frozen pack ice.',
                      'भारत का IndARC रोबोटिक वेधशाला कोंग्सफजॉर्डन में 192 मीटर गहरे बर्फीले समुद्र के भीतर साल भर अटलांटिक धाराओं को रिकॉर्ड करता है।'
                    )}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <a
                    href="https://ncpor.res.in/arctics/display/398-indarc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{trans('IndARC Observatory Portal ↗', 'IndARC वेधशाला पोर्टल ↗')}</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE 3D POLAR MAP SPOTLIGHT                                     */}
      {/* ========================================================================= */}
      <Section id="polar-map" className="py-16 sm:py-24 bg-[#edf5fb] dark:bg-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                  {trans('Interactive 3D Projection', '3D इंटरैक्टिव मानचित्र')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white mt-2">
                  {trans('Polar Stations & Voyage Tracks', 'ध्रुवीय स्टेशन एवं समुद्री मार्ग')}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  {trans(
                    'Inspect sovereign Indian bases, international partner stations, and maritime voyage corridors connecting Goa and Cape Town to Antarctica and Svalbard.',
                    'भारतीय अनुसंधान केंद्रों, अंतर्राष्ट्रीय स्टेशनों और गोवा व केप टाउन से अंटार्कटिका व स्वालबार्ड तक समुद्री मार्गों का 3D में अन्वेषण करें।'
                  )}
                </p>
              </div>

              <Link
                to="/explore"
                className="btn bg-slate-950 hover:bg-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-white font-semibold text-xs !py-3 !px-5 rounded-xl shadow-sm inline-flex items-center gap-2 shrink-0"
              >
                <Globe2 className="w-4 h-4 text-cyan-400 dark:text-slate-950 group-hover:rotate-45 transition-transform duration-500" />
                <span>{trans('Full Screen Map Mode', 'पूर्ण स्क्रीन मानचित्र')}</span>
              </Link>
            </div>

            {/* Polar Map container in Apple-like clean viewport */}
            <div data-tour="polar-map-container" className="rounded-3xl bg-white/90 dark:bg-slate-900 border border-sky-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden p-2 sm:p-3">
              <PolarMap />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 6. OBSERVATIONAL CLIMATOLOGY & SEA ICE DATA STORY                         */}
      {/* ========================================================================= */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#edf5fb] via-[#e2f0fa] to-[#edf5fb] dark:from-[#07131e] dark:via-[#091724] dark:to-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-sky-200/70 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                  {trans('Satellite Telemetry Baseline', 'उपग्रह अवलोकन')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white mt-2">
                  {trans('Southern Ocean Sea-Ice Climatology', 'दक्षिणी महासागर समुद्री बर्फ विस्तार')}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                  {trans(
                    'Monthly observational extent compared against the 1981–2010 satellite baseline.',
                    '1981–2010 के ऐतिहासिक उपग्रह औसत की तुलना में वर्तमान समुद्री बर्फ क्षेत्र का अवलोकन।'
                  )}
                </p>
              </div>

              <div className="flex items-baseline gap-5 bg-white/95 dark:bg-slate-900 backdrop-blur-md p-4 rounded-2xl border border-sky-200/90 dark:border-slate-800 shadow-2xs shrink-0">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">{trans('Seasonal Min', 'मौसमी न्यूनतम')}</div>
                  <div className="font-display text-3xl font-extrabold text-slate-950 dark:text-white">
                    13.8 <span className="text-sm font-sans font-normal text-slate-500 dark:text-slate-400">M km²</span>
                  </div>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-4">
                  <div className="text-[10px] font-mono uppercase text-cyan-800 dark:text-cyan-400 font-semibold">{trans('Baseline Anomaly', 'आधार रेखा विचलन')}</div>
                  <div className="font-display text-xl font-bold text-cyan-600 dark:text-cyan-400">
                    -0.8 <span className="text-xs font-sans font-normal text-slate-500 dark:text-slate-400">M km²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-stretch">
              <div className="p-6 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 shadow-xs">
                <LineChart
                  badge={trans('NSIDC / NCPOR OBSERVATIONS', 'एनएसआईडीसी / एनसीपीओआर अवलोकन')}
                  title={trans('Monthly Observational Sea-Ice Extent', 'मासिक अवलोकित समुद्री बर्फ विस्तार')}
                  subtitle={trans(
                    'Comparison between 2024–2025 measurements and the 1981–2010 satellite climatological baseline.',
                    '2024–2025 के मापों और 1981–2010 के उपग्रह जलवायु आधार रेखा की तुलना।'
                  )}
                  source={trans('1981–2010 Baseline', '1981–2010 आधार रेखा')}
                  unit={trans(' M km²', ' मि. वर्ग किमी')}
                  data={seaIceCurrent}
                  baseline={seaIceBaseline}
                  height={260}
                  yLabel={trans('Million Square Kilometers (M km²)', 'मिलियन वर्ग किमी')}
                  accent="#0284c7"
                />
              </div>

              <div className="p-7 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                    {trans('Monsoon Teleconnection', 'जलवायु अंतर्संबंध')}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mt-1.5">
                    {trans('How Polar Ice Modulates India’s Rain', 'ध्रुवीय बर्फ भारतीय वर्षा को कैसे नियंत्रित करती है')}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {trans(
                      '"Variations in Southern Ocean ice alter the position of the Intertropical Convergence Zone (ITCZ). Changes propagate northward across the equator, modulating cross-equatorial moisture transport for the Indian Monsoon."',
                      '"दक्षिणी महासागर की बर्फ में परिवर्तन भूमध्य रेखा के पार नमी परिवहन को प्रभावित करते हैं, जिससे भारत के दक्षिण-पश्चिम मानसून की तीव्रता निर्धारित होती है।"'
                    )}
                  </p>
                  <div className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>— {trans('NCPOR Polar Climate Group', 'एनसीपीओआर ध्रुवीय जलवायु अनुसंधान समूह')}</span>
                    <a
                      href="https://nsidc.org/data/seaice_index"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                    >
                      <span>{trans('NSIDC Index ↗', 'एनएसआईडीसी सूचकांक ↗')}</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <Link to="/datasets" className="btn bg-slate-950 hover:bg-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-white font-semibold text-xs !py-3 flex-1 text-center rounded-xl shadow-xs">
                    {trans('Browse 18 Datasets', '18 डेटासेट देखें')} →
                  </Link>
                  <Link to="/publications" className="btn bg-white hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-sky-200 dark:border-slate-700 text-xs !py-3 flex-1 text-center font-semibold rounded-xl">
                    {trans('Peer Papers', 'शोध पत्र')}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 7. DUAL-LENS SMART EDUCATION (SIH 2026 THEME SHOWCASE)                    */}
      {/* ========================================================================= */}
      <Section className="py-16 sm:py-24 bg-[#edf5fb] dark:bg-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#e4f2fb] via-sky-50/80 to-white dark:from-slate-900 dark:via-[#091724] dark:to-slate-900 border border-sky-200/90 dark:border-slate-800 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-sky-200/70 dark:border-slate-800">
                <div>
                  <div className="text-xs font-mono tracking-wider uppercase text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    {trans('SIH 2026 Problem ID: 26063 · Smart Education Lab', 'स्मार्ट शिक्षा प्रयोगशाला · एसआईएच 2026')}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 dark:text-white mt-2">
                    {trans('Dual-Lens Adaptive Learning', 'द्वि-स्तरीय अनुकूलित शिक्षण')}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
                    {trans(
                      'Dynamically calibrate polar science: switch between foundational intuition for school students and rigorous thermodynamic formulations for researchers.',
                      'स्कूली छात्रों के लिए सरल व रोचक व्याख्या, अथवा शोधकर्ताओं के लिए गूढ़ वैज्ञानिक समीकरण — एक क्लिक में स्विच करें।'
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-sky-200 dark:border-slate-700 shadow-2xs">
                    <button
                      onClick={() => setEduMode('simple')}
                      className={cn(
                        'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
                        eduMode === 'simple'
                          ? 'bg-slate-950 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      )}
                    >
                      {trans('Foundational (Student)', 'सरल व्याख्या (छात्र)')}
                    </button>
                    <button
                      onClick={() => setEduMode('scientific')}
                      className={cn(
                        'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
                        eduMode === 'scientific'
                          ? 'bg-slate-950 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      )}
                    >
                      {trans('Scientific (Researcher)', 'वैज्ञानिक (शोधकर्ता)')}
                    </button>
                  </div>
                  <Link to="/education" className="btn bg-slate-950 hover:bg-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-white font-semibold text-xs !py-2.5 px-4 rounded-xl shadow-xs inline-flex items-center gap-1.5">
                    {trans('Enter Lab', 'लैब खोलें')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-6 sm:p-7 rounded-2xl bg-white/95 dark:bg-slate-950/70 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold">
                    {eduMode === 'simple'
                      ? trans('STUDENT LENS · EVERYDAY INTUITION', 'छात्र स्तर · सहज उदाहरण')
                      : trans('RESEARCHER LENS · THERMODYNAMIC FORMULATION', 'शोधकर्ता स्तर · अकादमिक व्याख्या')}
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                    {trans('Why Are The Poles Cold? Solar Angles & Albedo', 'ध्रुव इतने ठंडे क्यों हैं? सूर्य के कोण और एल्बिडो')}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    {eduMode === 'simple'
                      ? trans(
                          'The poles receive sunlight at a sharp, slanted angle. This spreads the exact same heat over a huge surface area. Pristine white snow also acts like a giant mirror, bouncing up to 90% of sunlight right back into space.',
                          'ध्रुवों पर सूरज की किरणें तिरछी पड़ती हैं, जिससे सौर ऊर्जा बहुत बड़े क्षेत्र में फैल जाती है। इसके अलावा, चमकदार सफेद बर्फ एक विशाल शीशे की तरह 90% धूप को सीधे अंतरिक्ष में वापस परावर्तित कर देती है।'
                        )
                      : trans(
                          'High polar solar zenith angles attenuate insolation per unit horizontal surface area due to geometric spread and longer atmospheric pathlengths. Combined with a planetary snow and sea-ice albedo of 0.80 to 0.90, net radiative deficits persist across polar latitudes year-round.',
                          'उच्च ध्रुवीय सौर चरम कोण ज्यामितीय प्रसार और लंबे वायुमंडलीय पथ के कारण प्रति इकाई सतह क्षेत्र में आतपन को कम करते हैं। 0.80 से 0.90 के बर्फ एल्बिडो के कारण ध्रुवीय अक्षांशों पर शुद्ध विकिरण घाटा बना रहता है।'
                        )}
                  </p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-mono">Linked to 44th ISEA Radiation Sensors</span>
                    <Link to="/education" className="text-cyan-700 dark:text-cyan-400 font-bold hover:underline">
                      {trans('Take Comprehension Quiz →', 'प्रश्नोत्तरी हल करें →')}
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-sky-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/70 backdrop-blur-md shadow-2xs flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-slate-800 text-sky-950 dark:text-sky-300 border border-transparent dark:border-slate-700 grid place-items-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <div className="text-xs font-bold text-slate-950 dark:text-white">{trans('Dual-Lens Adaptive Depth', 'द्वि-स्तरीय अनुकूलित शिक्षा')}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{trans('School students to university level in 1-click.', 'छात्रों से लेकर शोधकर्ताओं तक के लिए अनुकूल।')}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-sky-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/70 backdrop-blur-md shadow-2xs flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-slate-800 text-sky-950 dark:text-sky-300 border border-transparent dark:border-slate-700 grid place-items-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <div className="text-xs font-bold text-slate-950 dark:text-white">{trans('Ground Truth Data Linking', 'प्रत्यक्ष इन-सिटू साक्ष्य')}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{trans('Every lesson points to real station datasets.', 'प्रत्येक पाठ वास्तविक स्टेशन डेटा से जुड़ा है।')}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-sky-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/70 backdrop-blur-md shadow-2xs flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-slate-800 text-sky-950 dark:text-sky-300 border border-transparent dark:border-slate-700 grid place-items-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <div className="text-xs font-bold text-slate-950 dark:text-white">{trans('Polar Scholar Certification', 'ध्रुवीय विद्वान प्रमाणन')}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{trans('Pass interactive quizzes to earn your badge.', 'प्रश्नोत्तरी उत्तीर्ण कर डिजिटल बैज प्राप्त करें।')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 8. PLATFORM GATEWAY WORKFLOWS (LINEAR-STYLE REFINED CARDS)                 */}
      {/* ========================================================================= */}
      <Section className="py-16 sm:py-24 bg-gradient-to-b from-[#edf5fb] via-[#e2f0fa] to-[#edf5fb] dark:from-[#07131e] dark:via-[#091724] dark:to-[#07131e] border-b border-sky-200/70 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-bold">
                {trans('Explore Platform', 'मंच का अन्वेषण')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white mt-2">
                {trans('Everything You Can Explore in POLARIS', 'पोलारिस में क्या-क्या उपलब्ध है')}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                to="/expeditions"
                className="group p-6 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-slate-900 dark:text-sky-300 border border-sky-200 dark:border-slate-700 grid place-items-center font-bold mb-4 group-hover:scale-110 group-hover:bg-cyan-50 dark:group-hover:bg-slate-700 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-all">
                    <Compass className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    {trans('Polar Expeditions', 'ध्रुवीय अभियान')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {trans('1st to 44th annual Antarctic campaigns, Arctic IndARC logs, and Southern Ocean voyages.', '1 से 44वें अंटार्कटिक और आर्कटिक अभियानों का संपूर्ण इतिहास।')}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <span>{trans('44 Missions', '44 अभियान')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/datasets"
                className="group p-6 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-slate-900 dark:text-sky-300 border border-sky-200 dark:border-slate-700 grid place-items-center font-bold mb-4 group-hover:scale-110 group-hover:bg-cyan-50 dark:group-hover:bg-slate-700 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-all">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    {trans('Open Datasets', 'खुले डेटासेट्स')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {trans('Atmospheric black carbon, ocean CTD depth profiles, and sea ice concentrations.', 'ब्लैक कार्बन, सीटीडी समुद्र विज्ञान और समुद्री बर्फ के खुले डेटासेट।')}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <span>{trans('Verified NPDC', 'एनपीडीसी सत्यापित')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/communicator"
                className="group p-6 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-slate-900 dark:text-sky-300 border border-sky-200 dark:border-slate-700 grid place-items-center font-bold mb-4 group-hover:scale-110 group-hover:bg-cyan-50 dark:group-hover:bg-slate-700 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-all">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    {trans('AI Communicator', 'एआई विज्ञान संवादक')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {trans('Translate complex research papers into lessons, social posts, and video scripts in seconds.', 'जटिल वैज्ञानिक शोध पत्रों को सरल भाषा और वीडियो स्क्रिप्ट में बदलें।')}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <span>{trans('Rule-Guided AI', 'एआई अनुवादक')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/media"
                className="group p-6 rounded-3xl bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-sky-500/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-slate-900 dark:text-sky-300 border border-sky-200 dark:border-slate-700 grid place-items-center font-bold mb-4 group-hover:scale-110 group-hover:bg-cyan-50 dark:group-hover:bg-slate-700 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-all">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                    {trans('Media & Photos', 'मीडिया एवं छायाचित्र')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {trans('Authentic expedition photo archive, ice sheet operations, and field dispatches.', 'भारतीय अभियानों के वास्तविक छायाचित्र, आइस शीट ऑपरेशन और वीडियो।')}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <span>{trans('View Gallery', 'गैलरी देखें')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 9. MINIMALIST LUXURY INSTITUTIONAL CALL-TO-ACTION                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-slate-950 to-slate-950" />
        <Container className="relative text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-bold">
                {trans('Sovereign Polar Science Gateway', 'राष्ट्रीय ध्रुवीय विज्ञान द्वार')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {trans('Explore India’s Polar Heritage', 'भारत की ध्रुवीय यात्रा का अन्वेषण करें')}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {trans(
                  'Explore interactive 3D maps, open satellite datasets, educational curriculum modules, or ask questions to POLARIS AI.',
                  '3D मानचित्र, उपग्रह डेटासेट और स्मार्ट शिक्षा मॉड्यूल का अनुभव करें, अथवा पोलारिस एआई से कोई भी प्रश्न पूछें।'
                )}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#polar-map"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm shadow-md transition duration-200 inline-flex items-center gap-2"
                >
                  <Globe2 className="w-4 h-4 text-cyan-600" />
                  <span>{trans('Open 3D Polar Map', '3D मानचित्र खोलें')}</span>
                </a>
                <Link
                  to="/education"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-800 transition duration-200 inline-flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>{trans('Smart Education Lab', 'स्मार्ट शिक्षा प्रयोगशाला')}</span>
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs sm:text-sm border border-slate-800 transition duration-200"
                >
                  {trans('About POLARIS & MoES', 'संस्थागत विवरण')}
                </Link>
              </div>

              <div className="pt-10 text-[11px] font-mono text-slate-500 tracking-wider uppercase">
                MINISTRY OF EARTH SCIENCES · NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH · SMART INDIA HACKATHON 2026
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
