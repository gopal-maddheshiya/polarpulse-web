import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStations, getExpeditions, type ResearchStation, type Expedition } from '../services/polarisService'
import { stations as defaultStations } from '../data/stations'
import { expeditions as defaultExpeditions } from '../data/expeditions'
import { cn } from '../lib/utils'
import { ArrowRight, Compass, MapPin, Wind, Thermometer, Gauge, SunMedium, Radio, Navigation2, Database, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

type RegionFilter = 'all' | 'india' | 'antarctic' | 'arctic' | 'himalaya'
type ViewMode = 'global' | 'south' | 'north'

interface StationTelemetry {
  temp: string
  wind: string
  pressure: string
  daylight: string
  solarState: string
}

const STATION_TELEMETRY: Record<string, StationTelemetry> = {
  maitri: {
    temp: '-16.8 °C',
    wind: '18 kts (E)',
    pressure: '984 hPa',
    daylight: 'Austral Summer Transition',
    solarState: '24h Daylight (Midnight Sun) · Dobson O3 Active',
  },
  bharati: {
    temp: '-14.2 °C',
    wind: '22 kts (ENE)',
    pressure: '988 hPa',
    daylight: 'Austral Summer Transition',
    solarState: 'ISRO Polar Satellite Telemetry Downlink Active',
  },
  'dakshin-gangotri': {
    temp: '-21.4 °C',
    wind: '26 kts (SSE)',
    pressure: '978 hPa',
    daylight: 'Ice Shelf Sub-firn Site',
    solarState: 'Subsurface Historic Monument #44',
  },
  himadri: {
    temp: '-4.8 °C',
    wind: '12 kts (WNW)',
    pressure: '1004 hPa',
    daylight: 'High Arctic Twilight',
    solarState: '16.5h Photoperiod · Fjord Mooring Telemetry Active',
  },
  himansh: {
    temp: '-11.5 °C',
    wind: '9 kts (NW)',
    pressure: '618 hPa (4,050m)',
    daylight: 'Alpine Mountain Diurnal',
    solarState: 'Solar Peak 1,020 W/m² · Glacier Runoff Sensors Online',
  },
  vostok: {
    temp: '-58.4 °C',
    wind: '14 kts (S)',
    pressure: '624 hPa (3,488m)',
    daylight: 'Central Polar Plateau',
    solarState: 'Deep Inversion Layer · Lake Vostok Ice Core Site',
  },
  mcmurdo: {
    temp: '-12.0 °C',
    wind: '16 kts (SW)',
    pressure: '992 hPa',
    daylight: 'Ross Island Coastal',
    solarState: 'Continuous Logistics & Geophysics Operations',
  },
  troll: {
    temp: '-18.0 °C',
    wind: '15 kts (ESE)',
    pressure: '870 hPa (1,270m)',
    daylight: 'Queen Maud Nunatak',
    solarState: 'DROMLAN Blue-Ice Airway Active',
  },
  syowa: {
    temp: '-15.4 °C',
    wind: '20 kts (NE)',
    pressure: '986 hPa',
    daylight: 'East Ongul Island',
    solarState: 'SuperDARN Radar Array Online',
  },
  amundsen: {
    temp: '-49.2 °C',
    wind: '11 kts (Grid N)',
    pressure: '680 hPa (2,835m)',
    daylight: '90°S Geographic Pole',
    solarState: 'IceCube Neutrino & South Pole Telescope Active',
  },
}

export default function PolarMap() {
  const { isHindi, trans } = useLanguage()
  const [stationsList, setStationsList] = useState<ResearchStation[]>(defaultStations)
  const [expeditionsList, setExpeditionsList] = useState<Expedition[]>(defaultExpeditions)
  const [active, setActive] = useState<string>('bharati')
  const [filter, setFilter] = useState<RegionFilter>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('global')

  useEffect(() => {
    let mounted = true
    Promise.all([getStations(), getExpeditions()])
      .then(([s, e]) => {
        if (mounted) {
          setStationsList(s)
          setExpeditionsList(e)
        }
      })
      .catch(console.warn)
    return () => { mounted = false }
  }, [])

  const station = stationsList.find(s => s.id === active) || stationsList[0]
  const linkedExpeditions = expeditionsList.filter(e => station.relatedExpeditions.includes(e.id))

  const visibleStations = stationsList.filter(s => {
    if (filter === 'india') return s.country === 'India'
    if (filter === 'antarctic') return s.region === 'Antarctic'
    if (filter === 'arctic') return s.region === 'Arctic'
    if (filter === 'himalaya') return s.region === 'Himalaya' || s.id === 'himansh'
    return true
  })

  const indianStationsCount = stationsList.filter(s => s.country === 'India').length
  const telemetry = STATION_TELEMETRY[station.id] || {
    temp: '-14.0 °C',
    wind: '15 kts',
    pressure: '985 hPa',
    daylight: 'Polar Observation',
    solarState: 'Scientific Telemetry Ingestion Active',
  }

  const viewBox =
    viewMode === 'south'
      ? '0 48 100 38'
      : viewMode === 'north'
      ? '15 0 70 28'
      : '0 0 100 86'

  return (
    <div className="space-y-4">
      {/* Editorial Filter & Legend Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition shrink-0',
              filter === 'all'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trans('All Stations', 'सभी स्टेशन')} ({stationsList.length})
          </button>
          <button
            onClick={() => setFilter('india')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition shrink-0',
              filter === 'india'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trans('Indian Bases', 'भारतीय केंद्र')} ({indianStationsCount})
          </button>
          <button
            onClick={() => setFilter('antarctic')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition shrink-0',
              filter === 'antarctic'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trans('Antarctica', 'अंटार्कटिका')}
          </button>
          <button
            onClick={() => setFilter('arctic')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition shrink-0',
              filter === 'arctic'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trans('Arctic / Svalbard', 'आर्कटिक / स्वालबार्ड')}
          </button>
          <button
            onClick={() => setFilter('himalaya')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium transition shrink-0',
              filter === 'himalaya'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {trans('Third Pole (Himalaya)', 'थर्ड पोल (हिमालय)')}
          </button>
        </div>

        <div className="text-slate-500 font-sans text-[11px] flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 ring-2 ring-sky-400/30" /> {trans('Sovereign Indian Outpost', 'संप्रभु भारतीय चौकी')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> {trans('International Station', 'अंतर्राष्ट्रीय स्टेशन')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-300 border-t border-dashed" /> {trans('Live Vessel Transit', 'सक्रिय पोत मार्ग')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 items-stretch">
        {/* Scientific Polar Map Canvas */}
        <div className="rounded-2xl border border-slate-200 bg-[#06182a] overflow-hidden relative select-none h-[340px] sm:h-[400px] lg:h-[430px] flex items-center justify-center p-2">
          {/* Unified Responsive Mission Control Top Bar (No collisions on mobile) */}
          <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
            {/* Left Status Badge (Desktop & Tablet only to give mobile 100% button room) */}
            <div className="pointer-events-auto hidden sm:flex text-[10px] font-mono text-slate-200 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-sky-400/25 shadow-lg items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="font-bold tracking-wide">POLAR RADAR</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-semibold text-[10px]">60 FPS</span>
            </div>

            {/* Right Projection View Controls */}
            <div className="pointer-events-auto ml-auto flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-sky-400/25 text-[10px] sm:text-[11px] font-mono shadow-xl shrink-0">
              <button
                onClick={() => setViewMode('global')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                  viewMode === 'global' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Navigation2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{trans('Global', 'ग्लोबल')}</span>
              </button>
              <button
                onClick={() => setViewMode('south')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                  viewMode === 'south' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-300" />
                <span>{trans('Antarctica', 'अंटार्कटिका')}</span>
              </button>
              <button
                onClick={() => setViewMode('north')}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                  viewMode === 'north' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                )}
              >
                <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-300" />
                <span>{trans('Arctic Cap', 'आर्कटिक')}</span>
              </button>
            </div>
          </div>

          <svg
            viewBox={viewBox}
            className="w-full h-full max-h-[420px] block transition-all duration-700 ease-out"
          >
            <defs>
              <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#081e35" />
                <stop offset="100%" stopColor="#03101c" />
              </linearGradient>
              <linearGradient id="iceSheet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
              <linearGradient id="arcticSeaIce" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="radarBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
              {/* 🌌 Atmospheric Aurora Borealis Gradient (Emerald-Cyan-Violet) */}
              <linearGradient id="auroraBorealis" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.55" />
                <stop offset="85%" stopColor="#8b5cf6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              {/* 🌌 Atmospheric Aurora Australis Gradient */}
              <linearGradient id="auroraAustralis" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="35%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ocean Basin Background */}
            <rect x="0" y="0" width="100" height="86" fill="url(#oceanGradient)" rx="2" />

            {/* Coordinate Graticules */}
            {[11, 23, 33, 42, 57, 70].map(y => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="#152e4d"
                strokeWidth="0.2"
                strokeDasharray="0.8 1.4"
              />
            ))}
            {[15, 30, 45, 60, 75, 90].map(x => (
              <line
                key={x}
                x1={x}
                x2={x}
                y1="0"
                y2="86"
                stroke="#152e4d"
                strokeWidth="0.2"
                strokeDasharray="0.8 1.4"
              />
            ))}

            {/* 🌊 Animated Antarctic Circumpolar Ocean Currents (Flowing West-to-East) */}
            <g className="pointer-events-none opacity-45">
              <path
                d="M0,53 Q25,52 50,52.5 Q75,53.5 100,53"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.3"
                strokeDasharray="2.5 3.5"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-60" dur="12s" repeatCount="indefinite" />
              </path>
              <path
                d="M0,55 Q25,54 50,54.5 Q75,55.5 100,55"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="0.25"
                strokeDasharray="2 3"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-50" dur="9s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Concentric Polar Latitude Rings in Antarctic View */}
            {viewMode === 'south' && (
              <g opacity="0.4">
                <circle cx="50" cy="74" r="22" fill="none" stroke="#60a5fa" strokeWidth="0.25" strokeDasharray="1 1.2" />
                <circle cx="50" cy="74" r="14" fill="none" stroke="#60a5fa" strokeWidth="0.25" strokeDasharray="1 1.2" />
                <circle cx="50" cy="74" r="6" fill="none" stroke="#60a5fa" strokeWidth="0.25" strokeDasharray="1 1.2" />
                <text x="50" y="74.5" fontSize="1.8" fontFamily="sans-serif" fontWeight="bold" fill="#0284c7" textAnchor="middle">
                  90°S South Pole
                </text>
              </g>
            )}

            {/* Arctic Region & Svalbard */}
            <ellipse cx="50" cy="11" rx="42" ry="7.5" fill="url(#arcticSeaIce)" stroke="#3b82f6" strokeWidth="0.25" />
            <path
              d="M31,6 Q38,2.5 43,6.5 Q41,12 36,13.5 Q31,12 31,6 Z"
              fill="url(#iceSheet)"
              stroke="#60a5fa"
              strokeWidth="0.3"
            />
            {/* 🌌 Atmospheric Aurora Borealis (Northern Lights Ribbon) */}
            <g className="pointer-events-none select-none">
              <path
                d="M18,10 Q34,5 50,8 Q66,11 82,8 Q66,10 50,6.5 Q34,4 18,10 Z"
                fill="url(#auroraBorealis)"
              >
                <animate attributeName="opacity" values="0.3;0.75;0.4;0.8;0.3" dur="7s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 1.5,-0.8; -1.5,0.8; 0,0"
                  dur="11s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
            {/* Svalbard / Ny-Ålesund Marker */}
            <circle cx="59.5" cy="12" r="1.3" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.3" />

            {/* Indian Subcontinent (NCPOR HQ Goa) */}
            <path
              d="M61,26 Q66,25 70,28 Q73,33 70,38 Q67,41 63,40 Q61,34 61,26 Z"
              fill="#0ea5e9"
              fillOpacity="0.3"
              stroke="#38bdf8"
              strokeWidth="0.4"
            />
            <circle cx="65.5" cy="33" r="1.1" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.3" />
            <text
              x="68"
              y="33.8"
              fontSize="2.2"
              fontFamily="system-ui, sans-serif"
              fontWeight="bold"
              fill="#f8fafc"
            >
              Goa (NCPOR HQ)
            </text>

            {/* 🌌 Atmospheric Aurora Australis (Southern Lights Halo) */}
            <g className="pointer-events-none select-none">
              <path
                d="M8,59 Q28,54 50,55.5 Q72,54 92,59 Q72,56.5 50,58 Q28,55.5 8,59 Z"
                fill="url(#auroraAustralis)"
              >
                <animate attributeName="opacity" values="0.25;0.65;0.3;0.7;0.25" dur="9s" repeatCount="indefinite" />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -1,0.5; 1,-0.5; 0,0"
                  dur="13s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Antarctica Continental Landmass */}
            <path
              d="M4,62 Q12,57 22,58 Q32,56 42,57 Q52,56 62,56 Q72,57 82,57 Q92,58 98,62
                 Q99,66 96,71 Q93,78 84,82 Q72,85 57,84 Q43,86 28,84 Q17,84 9,80 Q3,73 4,65 Z"
              fill="url(#iceSheet)"
              stroke="#93c5fd"
              strokeWidth="0.4"
            />
            <path d="M28,69 Q50,64 72,69 Q62,76 50,75 Q38,76 28,69 Z" fill="#ffffff" fillOpacity="0.35" />

            {/* Expedition Voyage Tracks from Goa & Cape Town */}
            <path
              d="M65.5,33 Q50,38 35,49 Q28,59 36,69"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.45"
              strokeDasharray="0.8 1.4"
              strokeOpacity="0.85"
            />
            <path
              d="M35,49 Q46,59 58,69"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.45"
              strokeDasharray="0.8 1.4"
              strokeOpacity="0.85"
            />

            {/* Himalayan Research Transit Corridor: Goa to Himansh (4,050m) */}
            <path
              d="M65.5,33 Q66,28 64,23"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.4"
              strokeDasharray="0.6 1.0"
              strokeOpacity="0.85"
            />

            {/* Port & Geographical Anchor Labels */}
            <text
              x="37"
              y="49.5"
              fontSize="2.1"
              fontFamily="system-ui, sans-serif"
              fontWeight="600"
              fill="#7dd3fc"
            >
              Cape Town Port
            </text>

            {/* Left Rail Latitude Degree Marks (Subtle Cartographic Coordinates - Zero Collision) */}
            <text x="2" y="12" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">80°N</text>
            <text x="2" y="23.5" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">32°N</text>
            <text x="2" y="33.5" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">15°N</text>
            <text x="2" y="42.5" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">00°</text>
            <text x="2" y="57.5" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">60°S</text>
            <text x="2" y="70.5" fontSize="1.8" fontFamily="monospace" fontWeight="500" fill="#64748b">70°S</text>

            {/* 🚢 ANIMATED RESEARCH VESSEL 1: ORV Sagar Nidhi on Goa -> Cape Town -> Antarctica Track */}
            {/* NOTE: Ship body rotates to face motion heading; ZERO text inside rotate="auto" so text never inverts! */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="18s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M65.5,33 Q50,38 35,49 Q28,59 36,69 Q28,59 35,49 Q50,38 65.5,33"
                />
                {/* Sonar Beacon Pulse & Expanding Ship Wake Ripples */}
                <circle r="3" fill="none" stroke="#38bdf8" strokeWidth="0.3">
                  <animate attributeName="r" values="1;4;1" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="2" fill="none" stroke="#0ea5e9" strokeWidth="0.2">
                  <animate attributeName="r" values="2;5.5;2" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
                </circle>
                {/* Crisp Ship Hull Vector */}
                <polygon points="-2.2,-1.1 2.8,0 -2.2,1.1 -1,0" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.35" />
              </g>
            </g>

            {/* 🚢 ANIMATED RESEARCH VESSEL 2: Cape Town to Bharati (Larsemann Hills) */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="22s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M35,49 Q46,59 58,69 Q46,59 35,49"
                />
                <circle r="2.4" fill="none" stroke="#0ea5e9" strokeWidth="0.25">
                  <animate attributeName="r" values="0.8;3.4;0.8" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <polygon points="-1.8,-0.9 2.2,0 -1.8,0.9 -0.8,0" fill="#0ea5e9" stroke="#ffffff" strokeWidth="0.3" />
              </g>
            </g>

            {/* ✈️ ANIMATED HIMALAYAN SCIENTIFIC LOGISTICS: Goa to Himansh */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M65.5,33 Q66,28 64,23 Q66,28 65.5,33"
                />
                <circle r="1" fill="#38bdf8">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* 🛰️ ANIMATED ISRO POLAR SATELLITE (EOS-06 / Oceansat) IN SUN-SYNCHRONOUS ORBIT */}
            <g className="pointer-events-none select-none">
              {/* Polar Orbit Ground Track Line */}
              <path
                d="M62,0 L64,12 L65.5,33 L58,69 L52,86"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.25"
                strokeDasharray="0.8 1.6"
                strokeOpacity="0.35"
              />
              {/* Satellite Body with Solar Arrays & Scanning Swath */}
              <g>
                <animateMotion
                  dur="22s"
                  repeatCount="indefinite"
                  path="M62,0 L64,12 L65.5,33 L58,69 L52,86"
                />
                {/* Conical Sensor Scanning Beam Swath */}
                <polygon points="-3.5,-1 0,3 3.5,-1" fill="#38bdf8" fillOpacity="0.12" />
                {/* Downlink Telemetry Beacon Pulse */}
                <circle r="1.6" fill="none" stroke="#38bdf8" strokeWidth="0.2">
                  <animate attributeName="r" values="0.8;3.2;0.8" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.1;0.85" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {/* Twin Blue Photovoltaic Solar Wings */}
                <rect x="-2.4" y="-0.4" width="1.3" height="0.8" rx="0.15" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.1" />
                <rect x="1.1" y="-0.4" width="1.3" height="0.8" rx="0.15" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.1" />
                {/* Golden Core Satellite Bus */}
                <circle r="0.75" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="0.2" />
                {/* Blinking Optics Payload */}
                <circle r="0.3" fill="#38bdf8">
                  <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* 🛰️ ISRO POLAR SATELLITE TELEMETRY GROUND STATION RADAR SWEEP AT BHARATI */}
            <g transform="translate(58, 69)" className="pointer-events-none">
              <circle r="6" fill="none" stroke="#38bdf8" strokeWidth="0.2" strokeDasharray="0.6 0.8" opacity="0.45" />
              <circle r="10" fill="none" stroke="#0ea5e9" strokeWidth="0.15" strokeDasharray="1 1.2" opacity="0.3" />
              <line x1="0" y1="0" x2="6" y2="0" stroke="url(#radarBeam)" strokeWidth="0.5">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </line>
            </g>

            {/* Station Markers with Clean Anti-Overlap Labels (Zero Clumsy Outlines) */}
            {visibleStations.map(s => {
              const isIndian = s.country === 'India'
              const isSelected = active === s.id

              let labelText = s.name.split(' (')[0]
              let xOffset = 3.2
              let yOffset = 0.8
              let textAnchor: 'start' | 'end' | 'middle' = 'start'
              const isOnIce = s.y > 56 || s.region === 'Arctic'
              let labelFill = isOnIce ? '#071d33' : '#f8fafc'

              if (s.id === 'dakshin-gangotri') {
                labelText = 'Dakshin Gangotri'
                xOffset = -3.2
                textAnchor = 'end' 
                yOffset = 0.8
              } else if (s.id === 'maitri') {
                labelText = 'Maitri'
                xOffset = 3.2
                textAnchor = 'start'
                yOffset = 0.8
              } else if (s.id === 'bharati') {
                labelText = 'Bharati'
                xOffset = 3.2
                textAnchor = 'start'
                yOffset = 0.8
              } else if (s.id === 'himansh') {
                labelText = 'Himansh (4,050m)'
                xOffset = 3.2
                textAnchor = 'start'
                yOffset = 0.8
              } else if (s.id === 'himadri') {
                labelText = 'Himadri (78°55′N)'
                xOffset = 3.2
                textAnchor = 'start'
                yOffset = 0.8
              } else if (s.x > 75) {
                xOffset = -3.2
                textAnchor = 'end'
              }

              if (isSelected) {
                labelFill = isOnIce ? '#0369a1' : '#38bdf8'
              }

              return (
                <g
                  key={s.id}
                  transform={`translate(${s.x}, ${s.y})`}
                  onClick={() => setActive(s.id)}
                  className="cursor-pointer group"
                >
                  <circle r="6" fill="transparent" />

                  {isSelected && (
                    <g>
                      <circle r="5" fill="none" stroke="#38bdf8" strokeWidth="0.25">
                        <animate attributeName="r" values="2.5;7;2.5" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.85;0.1;0.85" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                      <circle
                        r="4.2"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="0.45"
                        strokeDasharray="1.2 0.9"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 0 0"
                          to="360 0 0"
                          dur="8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <line x1="-5.5" y1="0" x2="-2.5" y2="0" stroke="#38bdf8" strokeWidth="0.35" />
                      <line x1="2.5" y1="0" x2="5.5" y2="0" stroke="#38bdf8" strokeWidth="0.35" />
                      <line x1="0" y1="-5.5" x2="0" y2="-2.5" stroke="#38bdf8" strokeWidth="0.35" />
                      <line x1="0" y1="2.5" x2="0" y2="5.5" stroke="#38bdf8" strokeWidth="0.35" />
                    </g>
                  )}

                  {isIndian && !isSelected && (
                    <circle
                      r="2.6"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.25"
                      strokeDasharray="0.6 0.8"
                      opacity="0.85"
                    />
                  )}

                  <circle
                    r={isSelected ? 2.2 : isIndian ? 1.8 : 1.0}
                    fill={isSelected ? '#38bdf8' : isIndian ? '#0ea5e9' : '#64748b'}
                    stroke="#ffffff"
                    strokeWidth={isSelected || isIndian ? 0.35 : 0.2}
                  />

                  {isIndian && (
                    <circle r="0.65" fill="#ffffff" />
                  )}

                  {(isIndian || isSelected) && (
                    <text
                      x={xOffset}
                      y={yOffset}
                      textAnchor={textAnchor}
                      fontSize="2.3"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight={isIndian ? 'bold' : '600'}
                      fill={labelFill}
                      className="pointer-events-none select-none tracking-tight"
                    >
                      {labelText}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Bottom Live Fleet & Telemetry Mission Control Bar */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none z-10">
            <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono shadow-xl text-slate-200 pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-slate-400 font-semibold">{trans('FLEET:', 'सक्रिय पोत:')}</span>
              <span className="text-white font-bold truncate max-w-[130px] sm:max-w-none">ORV Sagar Nidhi</span>
              <span className="text-cyan-300 text-[9px] hidden sm:inline">· 54°20′S, 57°30′E</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15 text-[10px] font-mono text-slate-300 shadow-xl pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{trans('ISRO Telemetry:', 'इसरो लिंक:')}</span>
              <span className="text-emerald-400 font-bold">{trans('ACTIVE', 'सक्रिय')}</span>
            </div>
          </div>
        </div>

        {/* Quick Mobile Station Selector for Small Touch Screens */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
          {visibleStations.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition border',
                active === s.id
                  ? 'bg-sky-50 text-sky-950 font-bold border-sky-300'
                  : 'bg-white text-slate-600 border-slate-200'
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Station Details Dossier with Live Telemetry HUD */}
        <div className="editorial-frame p-4 sm:p-5 bg-white flex flex-col justify-between h-auto lg:h-[430px] overflow-y-auto">
          <div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-2.5 gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-sky-800 font-semibold">
                  {station.country} · {station.region}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mt-0.5">
                  {station.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                {trans('Est.', 'स्था.')} {station.established}
              </span>
            </div>

            {/* 📡 Live Station Observational Telemetry HUD */}
            <div className="mt-3 p-3 rounded-xl bg-sky-50/70 border border-sky-200/90 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {trans('Real-Time Station Observational HUD', 'रीयल-टाइम स्टेशन प्रेक्षण एचयूडी')}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-sky-200 text-sky-900 font-bold">
                  WMO GAW Level-2
                </span>
              </div>

              {/* 3-Column Mini Telemetry Gauges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 font-semibold mb-0.5">
                    <Thermometer className="w-3 h-3 text-cyan-600" />
                    <span>{trans('Temp', 'तापमान')}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900">{telemetry.temp}</div>
                </div>

                <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 font-semibold mb-0.5">
                    <Wind className="w-3 h-3 text-cyan-600" />
                    <span>{trans('Wind', 'पवन')}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900">{telemetry.wind}</div>
                </div>

                <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 font-semibold mb-0.5">
                    <Gauge className="w-3 h-3 text-cyan-600" />
                    <span>{trans('Baro', 'वायुदाब')}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900 truncate" title={telemetry.pressure}>
                    {telemetry.pressure.split(' ')[0]} hPa
                  </div>
                </div>
              </div>

              {/* Photoperiod / Solar Cycle */}
              <div className="p-2 rounded-xl bg-white/90 border border-sky-100 text-[10px] sm:text-[11px] font-mono text-slate-700 flex items-start gap-2">
                <SunMedium className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">{telemetry.daylight}:</span>{' '}
                  <span className="text-slate-600">{telemetry.solarState}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3">
              {station.blurb}
            </p>

            {station.country === 'India' && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-sky-950 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    {trans('National Sovereign Base', 'राष्ट्रीय संप्रभु अनुसंधान केंद्र')}
                  </span>
                  {station.officialUrl && (
                    <a
                      href={station.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-sky-900 font-semibold hover:underline inline-flex items-center gap-0.5 text-[11px]"
                    >
                      <span>{trans('Verify NCPOR', 'एनसीपीओआर सत्यापन')} ↗</span>
                    </a>
                  )}
                </div>
                <div className="text-[11px] text-slate-600">
                  {trans(
                    'Operated year-round by NCPOR, Ministry of Earth Sciences, Government of India.',
                    'एनसीपीओआर, पृथ्वी विज्ञान मंत्रालय, भारत सरकार द्वारा वर्ष पर्यन्त संचालित।'
                  )}
                </div>
              </div>
            )}
            {station.country !== 'India' && station.officialUrl && (
              <div className="mt-2 pt-1 text-right">
                <a
                  href={station.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:text-sky-900 font-medium hover:underline inline-flex items-center gap-1 text-xs"
                >
                  <span>{station.officialSource || 'Official Station Portal'} ↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
            {linkedExpeditions.length > 0 && (
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                  {trans('Linked Indian Expeditions', 'संबद्ध भारतीय अभियान')}
                </div>
                <div className="space-y-1">
                  {linkedExpeditions.map(e => (
                    <Link
                      key={e.id}
                      to={`/expeditions/${e.id}`}
                      className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition text-xs"
                    >
                      <span className="font-medium text-slate-900 truncate">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/datasets"
                className="btn-light text-xs !py-2 text-center rounded-xl flex items-center justify-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-cyan-700" />
                <span>{trans('Base Datasets', 'स्टेशन डेटा')}</span>
              </Link>
              <Link
                to="/expeditions"
                className="btn bg-slate-950 hover:bg-slate-850 text-white text-xs !py-2.5 text-center rounded-xl flex items-center justify-center gap-1"
              >
                <span>{trans('All Expeditions', 'सभी अभियान')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
