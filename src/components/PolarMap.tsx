import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStations, getExpeditions, type ResearchStation, type Expedition } from '../services/polarisService'
import { stations as defaultStations } from '../data/stations'
import { expeditions as defaultExpeditions } from '../data/expeditions'
import { cn } from '../lib/utils'
import { ArrowRight, Compass, MapPin, Wind, Thermometer, Gauge, SunMedium, Radio, Navigation2, Database } from 'lucide-react'
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
      ? '0 58 100 56'
      : viewMode === 'north'
      ? '15 0 72 45'
      : '0 0 100 114'

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
              'px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 shrink-0',
              filter === 'india'
                ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500" />
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
            {trans('Arctic Svalbard', 'आर्कटिक स्वालबार्ड')}
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
            <span className="w-2 h-2 rounded-full bg-sky-400" /> {trans('Sovereign Indian Outpost', 'संप्रभु भारतीय चौकी')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> {trans('International Station', 'अंतर्राष्ट्रीय स्टेशन')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-300 border-t border-dashed" /> {trans('Live Vessel Transit', 'सक्रिय पोत मार्ग')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
        {/* Scientific Polar Map Canvas */}
        <div className="rounded-2xl border border-slate-200 bg-[#06182a] overflow-hidden relative select-none min-h-[360px] sm:min-h-[440px] flex items-center justify-center p-2">
          {/* Floating Cartography & Projection Mode Controls */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <div className="text-[10px] font-mono text-slate-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>STEREOGRAPHIC RADAR · 60 FPS</span>
            </div>
          </div>

          {/* Floating View Mode Switcher */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-white/15 text-[11px] font-mono z-10 shadow-lg">
            <button
              onClick={() => setViewMode('global')}
              className={cn(
                'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                viewMode === 'global' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              )}
            >
              <Navigation2 className="w-3 h-3" />
              <span>{trans('Global', 'ग्लोबल')}</span>
            </button>
            <button
              onClick={() => setViewMode('south')}
              className={cn(
                'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                viewMode === 'south' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              )}
            >
              <Radio className="w-3 h-3 text-cyan-300" />
              <span>{trans('Antarctica', 'अंटार्कटिका')}</span>
            </button>
            <button
              onClick={() => setViewMode('north')}
              className={cn(
                'px-2.5 py-1 rounded-lg transition font-semibold flex items-center gap-1 text-[10px] sm:text-[11px]',
                viewMode === 'north' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              )}
            >
              <Compass className="w-3 h-3 text-sky-300" />
              <span>{trans('Arctic Cap', 'आर्कटिक')}</span>
            </button>
          </div>

          <svg
            viewBox={viewBox}
            className="w-full h-auto max-h-[560px] block transition-all duration-700 ease-out"
          >
            <defs>
              <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a243e" />
                <stop offset="100%" stopColor="#041220" />
              </linearGradient>
              <linearGradient id="iceSheet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
              <linearGradient id="arcticSeaIce" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="radarBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ocean Basin Background */}
            <rect x="0" y="0" width="100" height="114" fill="url(#oceanGradient)" rx="2" />

            {/* Coordinate Graticules */}
            {[14, 28, 42, 56, 70, 84, 98].map(y => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="#1e3a5f"
                strokeWidth="0.18"
                strokeDasharray="0.6 1.4"
              />
            ))}
            {[15, 30, 45, 60, 75, 90].map(x => (
              <line
                key={x}
                x1={x}
                x2={x}
                y1="0"
                y2="114"
                stroke="#1e3a5f"
                strokeWidth="0.18"
                strokeDasharray="0.6 1.4"
              />
            ))}

            {/* Concentric Polar Latitude Rings in Antarctic View */}
            {viewMode === 'south' && (
              <g opacity="0.35">
                <circle cx="50" cy="85" r="28" fill="none" stroke="#60a5fa" strokeWidth="0.2" strokeDasharray="1 1" />
                <circle cx="50" cy="85" r="18" fill="none" stroke="#60a5fa" strokeWidth="0.2" strokeDasharray="1 1" />
                <circle cx="50" cy="85" r="8" fill="none" stroke="#60a5fa" strokeWidth="0.2" strokeDasharray="1 1" />
                <text x="50" y="85.5" fontSize="1.8" fontFamily="sans-serif" fill="#93c5fd" textAnchor="middle">90°S South Pole</text>
              </g>
            )}

            {/* Arctic Region & Svalbard */}
            <ellipse cx="50" cy="14" rx="38" ry="9.5" fill="url(#arcticSeaIce)" stroke="#3b82f6" strokeWidth="0.2" />
            <path
              d="M31,8 Q38,4 43,9 Q41,16 36,18 Q31,16 31,8 Z"
              fill="url(#iceSheet)"
              stroke="#60a5fa"
              strokeWidth="0.25"
            />
            {/* Svalbard / Ny-Ålesund Highlight */}
            <circle cx="59.5" cy="15.5" r="1.4" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.3" />
            <text x="62.5" y="16.3" fontSize="2" fontFamily="sans-serif" fill="#bae6fd" fontWeight="600">
              Svalbard (Himadri)
            </text>

            {/* Indian Subcontinent (NCPOR HQ Goa) */}
            <path
              d="M61,34 Q66,33 70,36 Q73,42 70,47 Q67,51 63,49 Q61,43 61,34 Z"
              fill="#0ea5e9"
              fillOpacity="0.25"
              stroke="#38bdf8"
              strokeWidth="0.35"
            />
            <circle cx="65.5" cy="41" r="0.9" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.2" />
            <text x="67.5" y="41.5" fontSize="2.2" fontFamily="sans-serif" fill="#e0f2fe" fontWeight="700">
              Goa (NCPOR HQ)
            </text>

            {/* Antarctica Continental Landmass */}
            <path
              d="M4,68 Q10,61 20,62 Q28,57 37,61 Q45,56 53,59 Q62,54 71,59 Q80,54 89,59 Q97,58 98,66
                 Q99,74 96,82 Q93,92 84,97 Q72,102 57,100 Q43,104 28,100 Q17,100 9,95 Q3,86 4,76 Z"
              fill="url(#iceSheet)"
              stroke="#93c5fd"
              strokeWidth="0.35"
            />
            <path d="M28,82 Q50,75 72,82 Q62,90 50,88 Q38,90 28,82 Z" fill="#ffffff" fillOpacity="0.3" />

            {/* Expedition Voyage Tracks from Goa & Cape Town */}
            <path
              d="M65.5,41 Q50,48 34,58 Q32,68 31,78"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.4"
              strokeDasharray="0.8 1.4"
              strokeOpacity="0.8"
            />
            <path
              d="M34,58 Q48,68 56,80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.4"
              strokeDasharray="0.8 1.4"
              strokeOpacity="0.8"
            />

            {/* Himalayan Research Transit Corridor: Goa to Himansh (4,050m) */}
            <path
              d="M65.5,41 Q66,36 64,32"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.35"
              strokeDasharray="0.6 1.0"
              strokeOpacity="0.8"
            />
            <text x="36" y="58" fontSize="1.8" fontFamily="sans-serif" fill="#7dd3fc">
              Cape Town Port
            </text>

            {/* Latitude Labels */}
            <text x="2" y="14.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">80°N Arctic</text>
            <text x="2" y="32.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">32°N Himalaya</text>
            <text x="2" y="42.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">15°N Goa</text>
            <text x="2" y="56.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">00° Equator</text>
            <text x="2" y="70.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">60°S Southern Ocean</text>
            <text x="2" y="84.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">70°S Maitri / Bharati</text>

            {/* 🚢 ANIMATED RESEARCH VESSEL 1: ORV Sagar Nidhi on Goa -> Cape Town -> Antarctica Track */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="16s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M65.5,41 Q50,48 34,58 Q32,68 31,78 Q32,68 34,58 Q50,48 65.5,41"
                />
                {/* Sonar Beacon Pulse */}
                <circle r="1.8" fill="none" stroke="#38bdf8" strokeWidth="0.25">
                  <animate attributeName="r" values="0.8;3.2;0.8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Ship Hull Shape */}
                <polygon points="-1.2,-0.5 1.5,0 -1.2,0.5 -0.6,0" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.2" />
                <text x="2.2" y="-1.2" fontSize="1.8" fontFamily="monospace" fontWeight="bold" fill="#7dd3fc">
                  ORV Sagar Nidhi
                </text>
              </g>
            </g>

            {/* 🚢 ANIMATED RESEARCH VESSEL 2: Cape Town to Bharati (Larsemann Hills) */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="20s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M34,58 Q48,68 56,80 Q48,68 34,58"
                />
                <circle r="1.5" fill="none" stroke="#0ea5e9" strokeWidth="0.2">
                  <animate attributeName="r" values="0.8;2.6;0.8" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <polygon points="-1,-0.4 1.3,0 -1,0.4 -0.5,0" fill="#0ea5e9" stroke="#ffffff" strokeWidth="0.2" />
                <text x="2" y="-1" fontSize="1.6" fontFamily="monospace" fontWeight="bold" fill="#38bdf8">
                  MV Polar Pioneer
                </text>
              </g>
            </g>

            {/* ✈️ ANIMATED HIMALAYAN SCIENTIFIC LOGISTICS: Goa to Himansh */}
            <g className="pointer-events-none select-none">
              <g>
                <animateMotion
                  dur="10s"
                  repeatCount="indefinite"
                  rotate="auto"
                  path="M65.5,41 Q66,36 64,32 Q66,36 65.5,41"
                />
                <circle r="0.7" fill="#38bdf8">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="1.5" y="-0.8" fontSize="1.4" fontFamily="monospace" fill="#bae6fd">
                  HiCOM Corridor
                </text>
              </g>
            </g>

            {/* 🛰️ ISRO POLAR SATELLITE TELEMETRY GROUND STATION RADAR SWEEP AT BHARATI */}
            <g transform="translate(56, 80)" className="pointer-events-none">
              <circle r="6" fill="none" stroke="#38bdf8" strokeWidth="0.15" strokeDasharray="0.6 0.8" opacity="0.4" />
              <circle r="10" fill="none" stroke="#0ea5e9" strokeWidth="0.1" strokeDasharray="1 1.2" opacity="0.25" />
              <line x1="0" y1="0" x2="6" y2="0" stroke="url(#radarBeam)" strokeWidth="0.4">
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

            {/* Station Markers */}
            {visibleStations.map(s => {
              const isIndian = s.country === 'India'
              const isSelected = active === s.id
              const labelText = s.id === 'himansh'
                ? 'Himansh (3rd Pole)'
                : s.id === 'dakshin-gangotri'
                ? 'Dakshin Gangotri'
                : s.name.split(' (')[0]
              const isLeftAlign = s.id === 'himansh' || s.x > 75

              return (
                <g
                  key={s.id}
                  transform={`translate(${s.x}, ${s.y})`}
                  onClick={() => setActive(s.id)}
                  className="cursor-pointer group"
                >
                  {/* Generous touch target for mobile interaction */}
                  <circle r="6" fill="transparent" />

                  {/* Selection Ring */}
                  {isSelected && (
                    <circle
                      r="3.4"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.4"
                      strokeDasharray="0.6 0.8"
                    />
                  )}

                  <circle
                    r={isSelected ? 1.8 : isIndian ? 1.4 : 0.9}
                    fill={isIndian ? '#38bdf8' : '#94a3b8'}
                    stroke={isSelected ? '#ffffff' : '#041220'}
                    strokeWidth={0.3}
                  />

                  {/* Clean text label */}
                  {(isIndian || isSelected) && (
                    <text
                      x={isLeftAlign ? -2.4 : 2.4}
                      y="0.6"
                      textAnchor={isLeftAlign ? 'end' : 'start'}
                      fontSize="2.1"
                      fontFamily="sans-serif"
                      fontWeight={isIndian ? '700' : '400'}
                      fill={isIndian ? '#ffffff' : '#cbd5e1'}
                    >
                      {labelText}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
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
        <div className="editorial-frame p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-800 font-semibold">
                  {station.country} · {station.region}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-950 mt-0.5">
                  {station.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded shrink-0">
                {trans('Est.', 'स्था.')} {station.established}
              </span>
            </div>

            {/* 📡 Live Station Observational Telemetry HUD */}
            <div className="mt-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-200/90 shadow-2xs space-y-3">
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
                <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 font-semibold mb-0.5">
                    <Thermometer className="w-3 h-3 text-cyan-600" />
                    <span>{trans('Temp', 'तापमान')}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900">{telemetry.temp}</div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-500 font-semibold mb-0.5">
                    <Wind className="w-3 h-3 text-cyan-600" />
                    <span>{trans('Wind', 'पवन')}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900">{telemetry.wind}</div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-sky-100 shadow-2xs">
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
              <div className="p-2.5 rounded-xl bg-white/90 border border-sky-100 text-[11px] font-mono text-slate-700 flex items-start gap-2">
                <SunMedium className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">{telemetry.daylight}:</span>{' '}
                  <span className="text-slate-600">{telemetry.solarState}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {station.blurb}
            </p>

            {station.country === 'India' && (
              <div className="mt-4 p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 space-y-1">
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
                <div className="text-slate-600">
                  {trans(
                    'Operated year-round by NCPOR, Ministry of Earth Sciences, Government of India.',
                    'एनसीपीओआर, पृथ्वी विज्ञान मंत्रालय, भारत सरकार द्वारा वर्ष पर्यन्त संचालित।'
                  )}
                </div>
              </div>
            )}
            {station.country !== 'India' && station.officialUrl && (
              <div className="mt-3 pt-2 text-right">
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

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
            {linkedExpeditions.length > 0 && (
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  {trans('Linked Indian Expeditions', 'संबद्ध भारतीय अभियान')}
                </div>
                <div className="space-y-1.5">
                  {linkedExpeditions.map(e => (
                    <Link
                      key={e.id}
                      to={`/expeditions/${e.id}`}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition text-xs"
                    >
                      <span className="font-medium text-slate-900">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/datasets"
                className="btn-light text-xs !py-2.5 text-center rounded-xl flex items-center justify-center gap-1.5"
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
