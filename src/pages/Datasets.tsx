import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDatasets, type Dataset } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section } from '../components/ui/Primitives'
import { Database, ArrowRight, Search, X, Filter, Download, FileSpreadsheet, HardDrive, Layers, Compass, Eye, Copy, Check } from 'lucide-react'
import { copyToClipboard, downloadCsv, downloadRealFile } from '../lib/actions'
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

  // Live Tabular Data Inspector Modal State
  const [inspectDataset, setInspectDataset] = useState<Dataset | null>(null)
  const [paramSearch, setParamSearch] = useState('')
  const [copiedToast, setCopiedToast] = useState(false)

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

                {/* Area, Year, and Format Dropdowns - Responsive Grid on Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                  <select
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs w-full"
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
                    className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs w-full"
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
                    className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-2xs w-full"
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
                      <div className="group flex flex-col justify-between h-full bg-white/95 backdrop-blur-md rounded-3xl border border-sky-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12)] hover:border-cyan-400 transition-all duration-300 p-7">
                        <Link to={`/datasets/${d.id}`} className="space-y-3 block">
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
                        </Link>

                        {/* Metadata Footer & Quick Actions */}
                        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[11px] text-slate-700 font-semibold">{d.region}</span>
                            <span className="font-mono text-[11px]">·</span>
                            <span className="font-mono text-[11px]">{d.year}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => { setInspectDataset(d); setParamSearch('') }}
                              className="px-2.5 py-1 rounded-lg bg-sky-50 text-cyan-800 hover:bg-cyan-100/90 transition text-xs font-semibold flex items-center gap-1.5 border border-sky-200 shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-cyan-600" />
                              {trans('Inspect Table', 'तालिका देखें')}
                            </button>
                            <Link
                              to={`/datasets/${d.id}`}
                              className="text-xs font-bold text-cyan-700 hover:text-cyan-900 hover:translate-x-0.5 transition inline-flex items-center gap-1"
                            >
                              {trans('Details', 'विवरण')} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* Live Tabular Data Inspector Modal */}
      {inspectDataset && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => { setInspectDataset(null); setParamSearch('') }}
        >
          <div
            className="max-w-3xl w-full bg-white/98 backdrop-blur-md border border-sky-200 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[88vh] relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-sky-100 shrink-0">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="editorial-badge-light bg-sky-50 text-cyan-900 border-sky-200 font-bold !text-[10px]">
                    {inspectDataset.area}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    ID: <strong className="text-slate-800 font-bold">{inspectDataset.id.toUpperCase()}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    NPDC Level-2
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 leading-snug">
                  {inspectDataset.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {inspectDataset.region} · {inspectDataset.coverage}
                </p>
              </div>
              <button
                onClick={() => { setInspectDataset(null); setParamSearch('') }}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-Modal Parameter Search & Summary */}
            <div className="py-3 flex items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={paramSearch}
                  onChange={e => setParamSearch(e.target.value)}
                  placeholder={trans('Filter parameters or values...', 'मापदंड या मान फ़िल्टर करें...')}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {inspectDataset.previewRows.length} {trans('Variables recorded', 'चर दर्ज')}
              </span>
            </div>

            {/* Scrollable Data Table */}
            <div className="overflow-y-auto rounded-2xl border border-sky-200/80 bg-white shadow-2xs flex-1 my-2">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] font-mono uppercase tracking-wider text-slate-700 bg-sky-50/80 border-b border-sky-200/80 sticky top-0 font-bold z-10">
                  <tr>
                    <th className="py-3 px-4">{trans('Parameter / Variable', 'मापदंड / चर')}</th>
                    <th className="py-3 px-4">{trans('In-Situ Observation Reading', 'इन-सिटू प्रेक्षण पाठ्यांक')}</th>
                    <th className="py-3 px-4 hidden sm:table-cell">{trans('Status', 'स्थिति')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100 text-slate-700">
                  {inspectDataset.previewRows
                    .filter(r => !paramSearch.trim() || r.name.toLowerCase().includes(paramSearch.toLowerCase()) || r.value.toLowerCase().includes(paramSearch.toLowerCase()))
                    .map((r, i) => (
                      <tr key={i} className="hover:bg-sky-50/60 transition">
                        <td className="py-2.5 px-4 font-mono text-xs text-slate-900 font-semibold">{r.name}</td>
                        <td className="py-2.5 px-4 font-mono text-xs text-cyan-700 font-bold">{r.value}</td>
                        <td className="py-2.5 px-4 hidden sm:table-cell">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {trans('Validated', 'प्रमाणित')}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await copyToClipboard(JSON.stringify(inspectDataset.previewRows, null, 2))
                    if (ok) {
                      setCopiedToast(true)
                      setTimeout(() => setCopiedToast(false), 2000)
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-sky-200 bg-white text-slate-700 hover:bg-sky-50 transition text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  {copiedToast ? trans('Copied JSON!', 'कॉपी हो गया!') : trans('Copy JSON', 'JSON कॉपी करें')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (inspectDataset.downloadUrl) {
                      downloadRealFile(inspectDataset.downloadUrl, `${inspectDataset.id}.csv`)
                    } else {
                      downloadCsv(`${inspectDataset.id}.csv`, inspectDataset.previewRows)
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-sky-200 bg-white text-slate-700 hover:bg-sky-50 transition text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-600" />
                  {trans('Download CSV', 'CSV डाउनलोड')}
                </button>
              </div>

              <Link
                to={`/datasets/${inspectDataset.id}`}
                className="btn-primary !py-2 !px-4 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
              >
                <span>{trans('Open Full Analytics & Visualisations', 'पूर्ण विश्लेषण एवं चार्ट खोलें')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
