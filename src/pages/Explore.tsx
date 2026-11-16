import { Link } from 'react-router-dom'
import {
  Compass, BookOpen, Database, Image as ImageIcon, GraduationCap, FileText,
  Sparkles, ArrowRight, ArrowUpRight, ShieldCheck, MapPin, Radio
} from 'lucide-react'
import { PageHeader } from '../components/ui/Page'
import { Section, Container, SectionHeader } from '../components/ui/Primitives'
import PolarMap from '../components/PolarMap'
import { Reveal } from '../lib/reveal'
import SEO from '../components/SEO'

const SECTIONS = [
  { title: 'Expeditions Registry', desc: 'Sovereign Indian expeditions to the Arctic, Antarctic, Southern Ocean and Himalayas since 1981.', to: '/expeditions', icon: Compass, badge: '44 MISSIONS' },
  { title: 'Open Polar Datasets', desc: 'In-situ meteorological observations, CTD profiles, firn cores, and NetCDF data feeds.', to: '/datasets', icon: Database, badge: 'OPEN ACCESS' },
  { title: 'Peer Publications', desc: 'Scientific journal articles, monographs, and expedition reports with DOI links and APA citations.', to: '/publications', icon: FileText, badge: 'SCOPUS INDEXED' },
  { title: 'Knowledge Hub', desc: 'Central searchable archive of articles, datasets, policy documents, and field science stories.', to: '/knowledge', icon: BookOpen, badge: 'REPOSITORY' },
  { title: 'Smart Education', desc: 'Dual-mode foundational & scientific curricula, terminology glossary, and verified quiz checks.', to: '/education', icon: GraduationCap, badge: 'SIH THEME' },
  { title: 'AI Science Communicator', desc: 'Transform complex polar papers into classroom lessons, press releases, and video scripts.', to: '/communicator', icon: Sparkles, badge: 'DISSEMINATION' },
  { title: 'Visual Media Archive', desc: 'Curated field photography, expedition video logs, and scientific infographics from the ice.', to: '/media', icon: ImageIcon, badge: 'FIELD GALLERY' },
  { title: 'About the Platform', desc: 'Governance, four-decade timeline, polar research stations, and MoES institutional contact.', to: '/about', icon: ShieldCheck, badge: 'NCPOR / MoES' },
]

export default function Explore() {
  return (
    <div className="min-h-screen bg-[#edf5fb] dark:bg-[#07131e]">
      <SEO
        title="Interactive 3D Polar Map & Station Navigator"
        description="Explore India's sovereign research bases (Bharati, Maitri, Himadri), real-time station telemetry, dual-pole cartography, and open polar science architecture."
        canonical="/explore"
        keywords={['Polar Map', 'Antarctica Map', 'Bharati Station', 'Maitri Station', 'Himadri Station', 'NCPOR', 'Polar Telemetry']}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Explore & Polar Map', url: '/explore' }
        ]}
      />
      <PageHeader
        eyebrow="Platform Sitemap & Architecture"
        title="Interactive Platform Navigator"
        sub="Navigate India’s unified polar portal. From stereographic station cartography to open-access datasets and AI-assisted dissemination workflows."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50/90 dark:bg-slate-900/90 border-sky-300 dark:border-slate-700 text-sky-900 dark:text-sky-300 font-semibold px-3 py-1.5 rounded-full shadow-xs">
            <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 animate-[spin_20s_linear_infinite]" /> FULL PORTAL SITEMAP
          </span>
          <span className="editorial-badge-light bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium px-3 py-1.5 rounded-full">
            NCPOR · MINISTRY OF EARTH SCIENCES
          </span>
        </div>
      </PageHeader>

      <Section className="bg-[#edf5fb] dark:bg-[#07131e]">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Polar Cartography"
              title="Global Station Network"
              sub="Click any sovereign or international station to inspect geographic coordinates, elevation, and linked Indian expedition campaigns."
            />
            <div className="bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 rounded-3xl p-3 md:p-4 shadow-soft">
              <PolarMap />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0 pb-20 bg-[#edf5fb] dark:bg-[#07131e]">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Platform Pillars"
              title="Explore POLARIS by Domain"
              sub="Access every core functional pillar designed for researchers, students, educators, and science communicators."
            />
          </Reveal>
          <Reveal cascade cascadeStep={50} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTIONS.map(s => {
              const Icon = s.icon
              return (
                <Link
                  key={s.title}
                  to={s.to}
                  className="p-6 bg-white/95 dark:bg-slate-900 backdrop-blur-md border border-sky-200/90 dark:border-slate-800 rounded-2xl card-hover hover:border-sky-400 dark:hover:border-sky-500/60 shadow-soft group flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-100/50 dark:from-sky-500/10 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 grid place-items-center text-sky-800 dark:text-sky-300 group-hover:bg-slate-950 group-hover:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-sky-50/80 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 text-sky-800 dark:text-sky-300">
                          {s.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-base group-hover:text-sky-950 dark:group-hover:text-sky-300 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-sans">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-sky-100/80 dark:border-slate-800 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 dark:text-sky-400 group-hover:text-slate-950 dark:group-hover:text-sky-300 transition-colors relative z-10">
                      <span>Open Section</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-sky-600 dark:text-sky-400" />
                    </div>
                  </Link>
                )
              })}
            </Reveal>
        </Container>
      </Section>
    </div>
  )
}
