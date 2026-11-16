import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMedia, type MediaItem } from '../services/polarisService'
import { PageHeader } from '../components/ui/Page'
import { Container, EmptyState, Section, SectionHeader } from '../components/ui/Primitives'
import { X, Play, Image as ImageIcon, FileBarChart2, ChevronLeft, ChevronRight, Compass, ExternalLink } from 'lucide-react'
import { cn } from '../lib/utils'
import { Reveal } from '../lib/reveal'
import { useLanguage } from '../context/LanguageContext'
import SEO from '../components/SEO'

export default function Media() {
  const { isHindi, trans } = useLanguage()
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [params, setParams] = useSearchParams()
  const [tab, setTab] = useState<'all' | 'photo' | 'video' | 'infographic'>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const TABS = [
    { id: 'all', label: trans('All', 'सभी') },
    { id: 'photo', label: trans('Photos', 'छायाचित्र (फ़ोटो)') },
    { id: 'video', label: trans('Videos', 'वीडियो') },
    { id: 'infographic', label: trans('Infographics', 'इन्फ़ोग्राफ़िक्स') },
  ] as const

  useEffect(() => {
    let mounted = true
    getMedia()
      .then(data => {
        if (mounted) {
          setMediaList(data)
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

  const filtered = useMemo(() => tab === 'all' ? mediaList : mediaList.filter(m => m.type === tab), [mediaList, tab])

  useEffect(() => {
    const item = params.get('item')
    if (item && mediaList.length > 0) {
      const idx = mediaList.findIndex(m => m.id === item)
      if (idx >= 0) {
        setLightbox(idx)
        setParams({}, { replace: true })
      }
    }
  }, [params, setParams, mediaList])

  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i === null ? 0 : (i + 1) % mediaList.length))
      if (e.key === 'ArrowLeft') setLightbox(i => (i === null ? 0 : (i - 1 + mediaList.length) % mediaList.length))
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [lightbox, mediaList])

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <SEO
        title={trans('Photographic & Field Media Gallery', 'ध्रुवीय छायाचित्र एवं फ़ील्ड मीडिया गैलरी')}
        description="A visual documentary of Indian polar science: expedition ice-sheet operations, atmospheric instrumentation at Maitri, oceanic hydrography, and High Arctic fjord dynamics."
        canonical="/media"
        keywords={['Polar Photography', 'Antarctica Photos', 'Maitri Station Images', 'Bharati Station Images', 'Arctic Ny-Alesund Photos', 'NCPOR Media']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Media Gallery', url: '/media' }
        ]}
      />
      <PageHeader
        eyebrow={trans('Visual Science Archive', 'दृश्य विज्ञान संग्रह')}
        title={trans('Photographic & Field Media Gallery', 'ध्रुवीय छायाचित्र एवं फ़ील्ड मीडिया गैलरी')}
        sub={trans(
          'A visual documentary of Indian polar science: expedition ice-sheet operations, atmospheric instrumentation at Maitri, oceanic hydrography, and High Arctic fjord dynamics.',
          'भारतीय ध्रुवीय विज्ञान का दृश्य वृत्तचित्र: अभियान में हिम-चादर संचालन, मैत्री में वायुमंडलीय उपकरण, महासागरीय जलविज्ञान, और आर्कटिक फ्योर्ड गतिशीलता।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50/90 border-sky-300 text-sky-900 font-semibold px-3 py-1.5 rounded-full shadow-xs">
            <ImageIcon className="w-3.5 h-3.5 text-sky-600" /> {trans('AUTHENTIC FIELD DISPATCHES', 'सत्यापित फ़ील्ड छायाचित्र')}
          </span>
          <span className="editorial-badge-light bg-white/80 border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full">
            {trans('NCPOR EXPEDITION REPOSITORY', 'एनसीपीओआर अभियान संग्रह')}
          </span>
        </div>
      </PageHeader>

      <Section className="pb-20">
        <Container>
          <Reveal>
            {/* Filter Tabs */}
            <div className="p-2 bg-white/95 border border-sky-200/90 rounded-2xl inline-flex flex-wrap items-center gap-1.5 mb-8 shadow-soft">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                    tab === t.id
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-sky-50/70'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 animate-spin mb-3 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">{trans('Loading polar knowledge...', 'ध्रुवीय मीडिया लोड हो रहा है...')}</p>
            </div>
          ) : error ? (
            <EmptyState
              title={trans('Unable to load media gallery', 'मीडिया गैलरी लोड करने में असमर्थ')}
              message={error}
              action={<button onClick={() => window.location.reload()} className="btn-outline">{trans('Retry', 'पुनः प्रयास करें')}</button>}
            />
          ) : (
            <>
              {/* Media Grid */}
              {filtered.length === 0 ? (
                <EmptyState
                  title={trans('No media found', 'कोई मीडिया सामग्री नहीं मिली')}
                  message={trans('No media items match the selected category.', 'चयनित श्रेणी में कोई मीडिया आइटम उपलब्ध नहीं है।')}
                />
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filtered.map((item, idx) => (
                    <Reveal key={item.id} delay={idx * 30}>
                      <div
                        onClick={() => setLightbox(mediaList.indexOf(item))}
                        className="group cursor-pointer rounded-2xl overflow-hidden bg-white/95 border border-sky-200/90 shadow-soft card-hover hover:border-cyan-400 flex flex-col h-full"
                      >
                        <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                          <img
                            src={item.poster || item.src}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition duration-700 ease-out"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                          
                          <div className="absolute top-2.5 right-2.5">
                            <span className="editorial-badge !text-[9px] !bg-slate-950/80 !border-white/20 !text-sky-300 backdrop-blur-md uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                              {item.type}
                            </span>
                          </div>

                          {item.type === 'video' && (
                            <div className="absolute inset-0 grid place-items-center">
                              <div className="w-11 h-11 rounded-full bg-white/95 text-slate-950 grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 ml-0.5 text-slate-900" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-sky-950 transition-colors leading-snug line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-sans">
                              {item.caption}
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-sky-100 text-[10px] font-mono text-slate-500 flex items-center justify-between font-medium">
                            <span className="truncate pr-2">{item.credit}</span>
                            {item.region && <span className="text-sky-800 font-semibold shrink-0">{item.region}</span>}
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

      {/* Lightbox Modal */}
      {lightbox !== null && mediaList[lightbox] && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh] animate-scale-in"
          >
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                  {mediaList[lightbox].type} · {mediaList[lightbox].credit}
                </span>
                <h3 className="font-display text-base font-bold mt-0.5">
                  {mediaList[lightbox].title}
                </h3>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Viewer */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2 min-h-[300px]">
              {mediaList[lightbox].type === 'video' ? (
                <video
                  src={mediaList[lightbox].src}
                  poster={mediaList[lightbox].poster}
                  controls
                  autoPlay
                  className="max-h-[60vh] max-w-full rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src={mediaList[lightbox].src}
                  alt={mediaList[lightbox].title}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
                />
              )}
            </div>

            {/* Modal Caption */}
            <div className="p-4 sm:px-6 bg-slate-900/90 border-t border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="max-w-xl space-y-1">
                <p className="leading-relaxed font-sans">{mediaList[lightbox].caption}</p>
                {mediaList[lightbox].sourceUrl && (
                  <a
                    href={mediaList[lightbox].sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400 hover:text-sky-300 underline underline-offset-2 font-semibold"
                  >
                    <span>{mediaList[lightbox].sourceLabel || trans('Verify at Official NCPOR Portal', 'आधिकारिक NCPOR पोर्टल पर सत्यापित करें')}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setLightbox((lightbox - 1 + mediaList.length) % mediaList.length)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] text-slate-400 px-1 font-semibold">
                  {lightbox + 1} / {mediaList.length}
                </span>
                <button
                  onClick={() => setLightbox((lightbox + 1) % mediaList.length)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
