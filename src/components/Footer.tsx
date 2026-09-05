import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface FooterLink {
  to: string
  en: string
  hi: string
  external?: boolean
}

interface FooterColumn {
  titleEn: string
  titleHi: string
  links: FooterLink[]
}

const SITEMAP: FooterColumn[] = [
  {
    titleEn: 'Research & Expeditions',
    titleHi: 'अनुसंधान एवं अभियान',
    links: [
      { to: '/expeditions', en: '1st–44th Expeditions', hi: '1 से 44वें राष्ट्रीय अभियान' },
      { to: '/datasets', en: 'Cryospheric Datasets', hi: 'क्रायोस्फेरिक डेटासेट' },
      { to: '/publications', en: 'Peer Publications', hi: 'समीक्षित शोध प्रकाशन' },
      { to: '/explore', en: 'Interactive Map', hi: 'इंटरैक्टिव ध्रुवीय मानचित्र' },
    ],
  },
  {
    titleEn: 'Education & Outreach',
    titleHi: 'शिक्षा एवं आउटरीच',
    links: [
      { to: '/education', en: 'Smart Education Lab', hi: 'स्मार्ट शिक्षा प्रयोगशाला' },
      { to: '/communicator', en: 'AI Science Communicator', hi: 'एआई विज्ञान संवादक' },
      { to: '/knowledge', en: 'Knowledge Repository', hi: 'ध्रुवीय ज्ञान रिपॉजिटरी' },
      { to: '/media', en: 'Media & Photo Archive', hi: 'मीडिया एवं फोटो पुरालेख' },
    ],
  },
  {
    titleEn: 'Institutional & Verification',
    titleHi: 'संस्थागत एवं सत्यापन',
    links: [
      { to: '/about', en: 'About POLARIS', hi: 'पोलारिस के बारे में' },
      { to: 'https://ncpor.res.in', en: 'NCPOR Portal', hi: 'एनसीपीओआर पोर्टल', external: true },
      { to: 'https://moes.gov.in', en: 'Ministry of Earth Sciences', hi: 'पृथ्वी विज्ञान मंत्रालय', external: true },
      { to: 'https://data.ncpor.res.in', en: 'National Polar Data Centre', hi: 'राष्ट्रीय ध्रुवीय डेटा केंद्र', external: true },
    ],
  },
]

export default function Footer() {
  const { isHindi, trans } = useLanguage()

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="container-wide py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Institutional Identification */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-slate-950 grid place-items-center font-display font-bold text-xs shadow-md">
                <div className="absolute inset-0 rounded-xl border border-sky-300/40 animate-[spin_24s_linear_infinite]" />
                <span className="text-white font-extrabold tracking-wider">P</span>
              </div>
              <div className="leading-tight">
                <span className="font-display text-base font-bold tracking-[0.14em] text-white">
                  POLARIS
                </span>
                <span className="text-[10px] font-mono text-sky-400 ml-1.5 font-semibold">
                  {trans('INDIA', 'भारत')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {trans(
                "India's unified polar science repository and outreach gateway archiving 44 years of Antarctic, Arctic, and Southern Ocean expeditions.",
                'अंटार्कटिका, आर्कटिक और दक्षिणी महासागर में भारत के 44 वर्षों के वैज्ञानिक अभियानों को संरक्षित करने वाला एकीकृत डिजिटल मंच।'
              )}
            </p>

            <div className="text-[11px] font-mono text-slate-400 space-y-0.5 pt-1">
              <div className="text-slate-300 font-medium">
                {trans(
                  'National Centre for Polar and Ocean Research (NCPOR)',
                  'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)'
                )}
              </div>
              <div>
                {trans(
                  'Ministry of Earth Sciences, Government of India · Headland Sada, Vasco da Gama, Goa',
                  'पृथ्वी विज्ञान मंत्रालय, भारत सरकार · हेडलैंड सदा, वास्को डी गामा, गोवा'
                )}
              </div>
            </div>
          </div>

          {/* Clean Compact Sitemap Columns */}
          {SITEMAP.map(col => (
            <div key={col.titleEn} className="space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                {isHindi ? col.titleHi : col.titleEn}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {col.links.map(l => (
                  <li key={l.to + l.en}>
                    {l.external ? (
                      <a
                        href={l.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{isHindi ? l.hi : l.en}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity text-sky-400" />
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{isHindi ? l.hi : l.en}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compact Attribution Bar */}
        <div className="mt-8 pt-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-mono text-slate-500">
          <div>
            {trans(
              'Smart India Hackathon 2026 · Problem ID: 26063 · Theme: Smart Education',
              'स्मार्ट इंडिया हैकथॉन 2026 · समस्या कोड: 26063 · विषय: स्मार्ट शिक्षा'
            )}
          </div>
          <div>
            © {new Date().getFullYear()} {trans(
              'Ministry of Earth Sciences (MoES), Government of India.',
              'पृथ्वी विज्ञान मंत्रालय (MoES), भारत सरकार।'
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
