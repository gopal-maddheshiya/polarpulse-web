import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStations, getExpeditions, type ResearchStation, type Expedition } from '../services/polarisService'
import { stations as defaultStations } from '../data/stations'
import { expeditions as defaultExpeditions } from '../data/expeditions'
import { cn } from '../lib/utils'
import { ArrowRight, Compass, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

type RegionFilter = 'all' | 'india' | 'antarctic' | 'arctic'

export default function PolarMap() {
  const { isHindi, trans } = useLanguage()
  const [stationsList, setStationsList] = useState<ResearchStation[]>(defaultStations)
  const [expeditionsList, setExpeditionsList] = useState<Expedition[]>(defaultExpeditions)
  const [active, setActive] = useState<string>('bharati')
  const [filter, setFilter] = useState<RegionFilter>('all')

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
    return true
  })

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
            {trans('Indian Bases', 'भारतीय केंद्र')} (3)
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
        </div>

        <div className="text-slate-500 font-sans text-[11px] flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> {trans('Sovereign Indian Outpost', 'संप्रभु भारतीय चौकी')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> {trans('International Station', 'अंतर्राष्ट्रीय स्टेशन')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-300 border-t border-dashed" /> {trans('Expedition Track', 'अभियान समुद्री मार्ग')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
        {/* Scientific Polar Map Canvas */}
        <div className="rounded-2xl border border-slate-200 bg-[#06182a] overflow-hidden relative select-none min-h-[340px] sm:min-h-[420px] flex items-center justify-center p-2">
          <svg viewBox="0 0 100 114" className="w-full h-auto max-h-[560px] block">
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
            <text x="36" y="58" fontSize="1.8" fontFamily="sans-serif" fill="#7dd3fc">
              Cape Town Port
            </text>

            {/* Latitude Labels */}
            <text x="2" y="14.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">80°N Arctic</text>
            <text x="2" y="42.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">15°N Goa</text>
            <text x="2" y="56.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">00° Equator</text>
            <text x="2" y="70.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">60°S Southern Ocean</text>
            <text x="2" y="84.5" fontSize="1.8" fontFamily="monospace" fill="#64748b">70°S Maitri / Bharati</text>

            {/* Station Markers */}
            {visibleStations.map(s => {
              const isIndian = s.country === 'India'
              const isSelected = active === s.id
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
                      x="2.4"
                      y="0.6"
                      fontSize="2.1"
                      fontFamily="sans-serif"
                      fontWeight={isIndian ? '700' : '400'}
                      fill={isIndian ? '#ffffff' : '#cbd5e1'}
                    >
                      {s.name}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Cartography Readout Badge */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded border border-white/10">
            STEREOGRAPHIC PROJECTION · MOES SOVEREIGN BASES
          </div>
        </div>

        {/* Quick Mobile Station Selector for Small Touch Screens */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
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

        {/* Station Details Dossier */}
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

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              {station.blurb}
            </p>

            {station.country === 'India' && (
              <div className="mt-4 p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-sky-950 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  {trans('National Sovereign Base', 'राष्ट्रीय संप्रभु अनुसंधान केंद्र')}
                </div>
                <div className="text-slate-600">
                  {trans(
                    'Operated year-round by NCPOR, Ministry of Earth Sciences, Government of India.',
                    'एनसीपीओआर, पृथ्वी विज्ञान मंत्रालय, भारत सरकार द्वारा वर्ष पर्यन्त संचालित।'
                  )}
                </div>
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

            <Link
              to="/expeditions"
              className="btn bg-slate-950 hover:bg-slate-850 text-white w-full text-xs !py-2.5 text-center rounded-xl"
            >
              {trans('Explore All Polar Expeditions', 'सभी ध्रुवीय अभियानों का अन्वेषण करें')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
