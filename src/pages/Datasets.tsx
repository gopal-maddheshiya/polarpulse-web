import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDatasets, type Dataset } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import { Database, ArrowRight, Search, X, Filter, Download, FileSpreadsheet, HardDrive, Layers, Compass } from 'lucide-react'
import { Reveal } from '../lib/reveal'
import { cn } from '../lib/utils'
import { useLanguage } from '../context/LanguageContext'

const AREAS = ['All', 'Atmospheric Sciences', 'Oceanography', 'Glaciology', 'Biodiversity', 'Geology', 'Climate']
const FORMATS = ['All', 'CSV', 'NetCDF', 'CSV / NetCDF']

export default function Datasets() {
  const { isHindi, trans } = useLanguage()
  const [datasetsList, setDatasetsList] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const [area, setArea] = useState('All')
  const [year, setYear] = useState('All')
  const [format, setFormat] = useState('All')

  useEffect(() => {
    let mounted = true
    getDatasets()
      .then(data => {
        if (mounted) {
          setDatasetsList(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Unable to load this content. Please try again.')
          setLoading(false)
        }
      })
    return () => { mounted = false }
  }, [])

  const years = useMemo(() => ['All', ...Array.from(new Set(datasetsList.map(d => d.year))).sort((a, b) => b - a).map(String)], [datasetsList])

  const filtered = useMemo(() => datasetsList.filter(d => {
    if (area !== 'All' && d.area !== area) return false
    if (year !== 'All' && String(d.year) !== year) return false
    if (format !== 'All' && !d.format.includes(format)) return false
    if (q.trim()) {
      const t = q.toLowerCase()
      return d.title.toLowerCase().includes(t) || d.description.toLowerCase().includes(t) || d.area.toLowerCase().includes(t) || d.region.toLowerCase().includes(t)
    }
    return true
  }), [datasetsList, q, area, year, format])

  const hasFilters = q.trim() !== '' || area !== 'All' || year !== 'All' || format !== 'All'

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <PageHeader
        eyebrow={trans('Open Scientific Data', 'खुला वैज्ञानिक डेटा')}
        title={trans('Polar Dataset Registry', 'ध्रुवीय डेटासेट रजिस्ट्री')}
        sub={trans(
          'Observational in-situ datasets, automated weather station feeds, CTD ocean transects and ice-core stratigraphy collected across India’s polar campaigns.',
          'भारत के ध्रुवीय अभियानों में एकत्रित अवलोकित इन-सिटू डेटासेट, स्वचालित मौसम केंद्र फ़ीड, सीटीडी महासागरीय आंकड़े और आइस-कोर स्तरिकी।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-white/90 border-sky-300 text-sky-950 font-bold shadow-2xs">
            <Database className="w-3.5 h-3.5 text-cyan-600" /> {trans('OPEN ACCESS RESEARCH DATA', 'मुक्त पहुँच अनुसंधान डेटा')}
          </span>
          <span className="editorial-badge-light bg-white/90 border-sky-200 text-slate-700 font-semibold shadow-2xs">
            {trans('NCPOR DATA REPOSITORY COMPLIANT', 'एनसीपीओआर डेटा रिपॉजिटरी अनुरूप')}
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Reveal>
            {/* Search and Filters Bar */}
            <div className="rounded-3xl border border-sky-200/90 bg-white/95 backdrop-blur-md p-6 mb-8 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="flex-1 flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 min-w-[240px] shadow-2xs">
                  <Search className="w-4 h-4 text-cyan-600 shrink-0" />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder={trans('Search by parameter, location, variable (e.g. black carbon, CTD, Maitri)…', 'पैरामीटर, स्थान या चर द्वारा खोजें (जैसे ब्लैक कार्बन, सीटीडी, मैत्री)…')}
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm placeholder:text-slate-400 font-sans font-medium"
                  />
                  {q && (
                    <button onClick={() => setQ('')} className="text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Area Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="rounded-xl border border-sky-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                  >
                    {AREAS.map(a => (
                      <option key={a} value={a}>
                        {a === 'All' ? trans('All Disciplines', 'सभी विषय') : (a === 'Atmospheric Sciences' ? trans('Atmospheric Sciences', 'वायुमंडलीय विज्ञान') : a === 'Oceanography' ? trans('Oceanography', 'समुद्र विज्ञान') : a === 'Glaciology' ? trans('Glaciology', 'हिमनद विज्ञान') : a === 'Geology' ? trans('Geology', 'भूविज्ञान') : a === 'Biodiversity' ? trans('Biodiversity', 'जैव विविधता') : a === 'Climate' ? trans('Climate', 'जलवायु') : a)}
                      </option>
                    ))}
                  </select>

                  {/* Year Dropdown */}
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="rounded-xl border border-sky-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                  >
                    {years.map(y => (
                      <option key={y} value={y}>
                        {y === 'All' ? trans('All Years', 'सभी वर्ष') : (isHindi ? `वर्ष: ${y}` : `Year: ${y}`)}
                      </option>
                    ))}
                  </select>

                  {/* Format Dropdown */}
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                    className="rounded-xl border border-sky-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs"
                  >
                    {FORMATS.map(f => (
                      <option key={f} value={f}>
                        {f === 'All' ? trans('All Formats', 'सभी प्रारूप') : (isHindi ? `प्रारूप: ${f}` : `Format: ${f}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {hasFilters && (
                  <button
                    onClick={() => { setQ(''); setArea('All'); setYear('All'); setFormat('All') }}
                    className="btn-ghost !py-2 !px-3 text-xs text-slate-600 hover:text-slate-950 font-semibold inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> {trans('Clear', 'साफ़ करें')}
                  </button>
                )}
              </div>

              {/* Discipline Quick Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-sky-100">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 font-semibold">{trans('Discipline:', 'विषय:')}</span>
                {AREAS.map(a => (
                  <button
                    key={a}
                    onClick={() => setArea(a)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-xl transition font-semibold',
                      area === a 
                        ? 'bg-slate-950 text-white shadow-xs font-bold' 
                        : 'bg-sky-50 text-slate-700 hover:bg-sky-100/80 border border-sky-200/80'
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-sky-200 text-cyan-600 animate-spin-slow mb-3 shadow-xs">
                <Database className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Loading polar scientific datasets...</p>
            </div>
          ) : error ? (
            <EmptyState
              title="Unable to load datasets"
              message={error}
              action={<button onClick={() => window.location.reload()} className="btn-outline">Retry</button>}
            />
          ) : (
            <>
              {/* Results summary count */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-5">
                <span>Displaying {filtered.length} scientific dataset{filtered.length === 1 ? '' : 's'}</span>
                <span className="text-cyan-800 font-bold">OPEN DATA ARCHIVE · NCPOR REPOSITORY</span>
              </div>

              {/* Dataset Cards Grid */}
              {filtered.length === 0 ? (
                <EmptyState
                  title="No datasets match your filters"
                  message="Try clearing your search query or adjusting your discipline and format filters."
                  action={
                    <button
                      onClick={() => { setQ(''); setArea('All'); setYear('All'); setFormat('All') }}
                      className="btn-outline"
                    >
                      {trans('Reset filters', 'फ़िल्टर हटाएं')}
                    </button>
                  }
                />
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filtered.map((d, idx) => (
                    <Reveal key={d.id} delay={idx * 40}>
                      <Link
                        to={`/datasets/${d.id}`}
                        className="group flex flex-col justify-between h-full bg-white/95 backdrop-blur-md rounded-3xl border border-sky-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12)] hover:border-cyan-400 transition-all duration-300 p-7"
                      >
                        <div className="space-y-3">
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="editorial-badge-light bg-sky-50/80 border-sky-200 text-cyan-900 font-bold !text-[10px]">
                              {d.area}
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] font-semibold">
                              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900">{d.format}</span>
                              <span>·</span>
                              <span>{d.size}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-display text-lg font-bold text-slate-950 group-hover:text-cyan-700 transition leading-snug">
                            {d.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {d.description}
                          </p>
                        </div>

                        {/* Metadata Footer */}
                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-slate-700 font-semibold">{d.region}</span>
                            <span className="font-mono text-[11px]">{trans('Yr:', 'वर्ष:')} {d.year}</span>
                          </div>

                          <span className="text-xs font-bold text-cyan-700 group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                            {trans('Explore Data', 'डेटा देखें')} <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </div>
  )
}
