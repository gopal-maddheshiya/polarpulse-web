import { Link } from 'react-router-dom'
import {
  Compass, BookOpen, Database, Image as ImageIcon, GraduationCap, FileText,
  Sparkles, ArrowRight, ArrowUpRight, ShieldCheck, MapPin, Radio
} from 'lucide-react'
import { PageHeader } from '../components/ui/Page'
import { Section, Container, SectionHeader } from '../components/ui/Primitives'
import PolarMap from '../components/PolarMap'
import { Reveal } from '../lib/reveal'

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
    <div>
      <PageHeader
        eyebrow="Platform Sitemap & Architecture"
        title="Interactive Platform Navigator"
        sub="Navigate India’s unified polar portal. From stereographic station cartography to open-access datasets and AI-assisted dissemination workflows."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50 border-sky-300 text-sky-900 font-semibold">
            <Compass className="w-3.5 h-3.5 text-sky-600" /> FULL PORTAL SITEMAP
          </span>
          <span className="editorial-badge-light">
            NCPOR · MINISTRY OF EARTH SCIENCES
          </span>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Polar Cartography"
              title="Global Station Network"
              sub="Click any sovereign or international station to inspect geographic coordinates, elevation, and linked Indian expedition campaigns."
            />
            <PolarMap />
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Platform Pillars"
              title="Explore POLARIS by Domain"
              sub="Access every core functional pillar designed for researchers, students, educators, and science communicators."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTIONS.map(s => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.title}
                    to={s.to}
                    className="editorial-frame p-6 bg-white hover:border-sky-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 grid place-items-center text-sky-800 group-hover:bg-slate-950 group-hover:text-sky-300 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="editorial-badge-light text-[9px] font-bold">
                          {s.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-sky-900 mt-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-semibold text-sky-800 group-hover:text-slate-950">
                      <span>Open Section</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
