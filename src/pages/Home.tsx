import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Compass, BookOpen, Database, Sparkles,
  MapPin, CheckCircle2, ChevronRight, GraduationCap, Copy, Check,
  FileText, Layers, ExternalLink, Calendar, User, Radio, Award
} from 'lucide-react'
import { HERO_IMAGE, IMG, GALLERY } from '../data/images'
import { expeditions } from '../data/expeditions'
import { knowledgeItems } from '../data/knowledge'
import { LineChart, type ChartPoint } from '../components/ui/Chart'
import PolarMap from '../components/PolarMap'
import { Container, Section } from '../components/ui/Primitives'
import { Reveal } from '../lib/reveal'
import { cn } from '../lib/utils'

import { useLanguage } from '../context/LanguageContext'

interface StationDossier {
  id: string
  name: string
  commissioned: number
  region: string
  latLong: string
  elevation: string
  img: string
  tagline: string
  description: string
  researchFocus: string[]
  achievements: string[]
  officialUrl?: string
  officialSource?: string
}

const INDIAN_STATIONS: StationDossier[] = [
  {
    id: 'maitri',
    name: 'Maitri Research Base',
    commissioned: 1989,
    region: 'Schirmacher Oasis, East Antarctica',
    latLong: '70°45′57″S, 11°44′09″E',
    elevation: '130 m a.s.l.',
    img: IMG.maitri,
    tagline: 'Continuous year-round polar atmospheric and geomagnetism laboratory for 36+ years.',
    description:
      'Constructed during the 8th Indian Antarctic Expedition on an ice-free rocky oasis. Maitri accommodates up to 25 winter-over researchers studying ozone layer dynamics, auroral electrojets, black carbon aerosol transport, and permafrost thermodynamics.',
    researchFocus: [
      'Atmospheric Chemistry & Total Column Ozone',
      'Geomagnetic Pulsations & Ionospheric Physics',
      'Permafrost Dynamics & Glacial Mass Balance',
      'Lake Priyadarshini Limnological Ecology',
    ],
    achievements: [
      '36+ years of continuous meteorological time series',
      'First permanent inland biological observatory in East Antarctica',
      'Global Atmosphere Watch (WMO-GAW) contributing station',
    ],
    officialUrl: 'https://ncpor.res.in/antarcticas/display/376-maitri-',
    officialSource: 'NCPOR · Maitri Base',
  },
  {
    id: 'bharati',
    name: 'Bharati Polar Station',
    commissioned: 2012,
    region: 'Larsemann Hills, East Antarctica',
    latLong: '69°24′28″S, 76°11′14″E',
    elevation: '35 m a.s.l.',
    img: IMG.bharati,
    tagline: 'State-of-the-art modular station with direct maritime and satellite earth observation access.',
    description:
      'India’s third Antarctic base, engineered with 134 prefabricated shipping containers on elevated stilts to withstand blizzards exceeding 200 km/h. Houses specialized oceanographic laboratories and satellite telemetry ground terminals for ISRO/NRSC.',
    researchFocus: [
      'Southern Ocean Biogeochemistry & Carbon Uptake',
      'Satellite Ground Station (IRS/Oceansat/Cartosat)',
      'Coastal Glaciology & Shallow Firn Cores',
      'Extreme Environment Microbial Genomics',
    ],
    achievements: [
      'Real-time satellite telemetry downlink for Indian Earth Observation satellites',
      'Deep CTD hydrographic ocean transects across polar fronts',
      'Certified zero-liquid discharge environmental design compliance',
    ],
    officialUrl: 'https://ncpor.res.in/antarcticas/display/377-bharati',
    officialSource: 'NCPOR · Bharati Base',
  },
  {
    id: 'himadri',
    name: 'Himadri Arctic Station',
    commissioned: 2008,
    region: 'Ny-Ålesund, Spitsbergen, Svalbard',
    latLong: '78°55′00″N, 11°56′00″E',
    elevation: '20 m a.s.l.',
    img: IMG.himadri,
    tagline: 'India’s permanent scientific gateway to the High Arctic and polar climate amplification.',
    description:
      'Located at 79° North in the world’s northernmost permanent civilian research settlement. Anchors India’s research into Arctic warming amplification, Kongsfjorden fjord hydrography, and inter-hemispheric teleconnections with the Indian Monsoon.',
    researchFocus: [
      'Kongsfjorden Fjord Oceanographic Dynamics',
      'IndARC Multi-Sensor Moored Observatory Network',
      'Arctic-Monsoon Inter-Hemispheric Teleconnections',
      'Snow Albedo Feedback & Atmospheric Aerosols',
    ],
    achievements: [
      'Deployment of IndARC: India’s first moored underwater ocean observatory in Kongsfjorden (2014)',
      'Over 200 Indian scientists hosted for High-Arctic fieldwork',
      'Active scientific contributor to the International Arctic Science Committee (IASC)',
    ],
    officialUrl: 'https://ncpor.res.in/arctics/display/394-himadri',
    officialSource: 'NCPOR · Himadri Station',
  },
]

const INDIAN_STATIONS_HI: StationDossier[] = [
  {
    id: 'maitri',
    name: 'मैत्री अनुसंधान केंद्र',
    commissioned: 1989,
    region: 'शिर्माकर ओएसिस, पूर्वी अंटार्कटिका',
    latLong: '70°45′57″S, 11°44′09″E',
    elevation: '130 मीटर समुद्र तल से',
    img: IMG.maitri,
    tagline: '36+ वर्षों से निरंतर संचालित ध्रुवीय वायुमंडलीय एवं भू-चुंबकत्व प्रयोगशाला।',
    description:
      '8वें भारतीय अंटार्कटिक अभियान के दौरान बर्फ-मुक्त चट्टानी ओएसिस पर निर्मित। मैत्री 25 शीतकालीन शोधकर्ताओं को आश्रय देता है जो ओजोन परत, ऑरोरल इलेक्ट्रोलेट्स, ब्लैक कार्बन एरोसोल और पर्माफ्रॉस्ट का अध्ययन करते हैं।',
    researchFocus: [
      'वायुमंडलीय रसायन विज्ञान एवं ओजोन निगरानी',
      'भू-चुंबकीय स्पंदन एवं आयनमंडलीय भौतिकी',
      'पर्माफ्रॉस्ट गतिशीलता एवं हिमनद संतुलन',
      'प्रियदर्शिनी झील लिम्नोलॉजिकल पारिस्थितिकी',
    ],
    achievements: [
      '36+ वर्षों की सतत मौसम संबंधी समय श्रृंखला',
      'पूर्वी अंटार्कटिका में पहली स्थायी अंतर्देशीय वेधशाला',
      'ग्लोबल एटमॉस्फियर वॉच (WMO-GAW) योगदानकर्ता स्टेशन',
    ],
    officialUrl: 'https://ncpor.res.in/antarcticas/display/376-maitri-',
    officialSource: 'एनसीपीओआर · मैत्री बेस',
  },
  {
    id: 'bharati',
    name: 'भारती ध्रुवीय स्टेशन',
    commissioned: 2012,
    region: 'लार्समैन हिल्स, पूर्वी अंटार्कटिका',
    latLong: '69°24′28″S, 76°11′14″E',
    elevation: '35 मीटर समुद्र तल से',
    img: IMG.bharati,
    tagline: 'प्रत्यक्ष समुद्री और उपग्रह पृथ्वी अवलोकन पहुंच वाली अत्याधुनिक मॉड्यूलर वेधशाला।',
    description:
      'भारत का तीसरा अंटार्कटिक बेस, जिसे 200 किमी/घंटा से अधिक के बर्फीले तूफानों का सामना करने के लिए ऊंचे खंभों पर 134 पूर्वनिर्मित कंटेनरों के साथ तैयार किया गया है। यहाँ इसरो/एनआरएससी के लिए उपग्रह टेलीमेट्री ग्राउंड टर्मिनल स्थापित हैं।',
    researchFocus: [
      'दक्षिणी महासागर जैव-भू-रसायन एवं कार्बन अवशोषण',
      'उपग्रह ग्राउंड स्टेशन (आईआरएस/ओशनसैट/कार्टोसैट)',
      'तटीय हिमनद विज्ञान एवं फ़िर्न कोर नमूने',
      'चरम वातावरण माइक्रोबियल जीनोमिक्स',
    ],
    achievements: [
      'भारतीय पृथ्वी अवलोकन उपग्रहों के लिए वास्तविक समय टेलीमेट्री',
      'ध्रुवीय मोर्चों पर गहरे सीटीडी हाइड्रोग्राफिक महासागरीय अवलोकन',
      'शून्य-तरल निर्वहन पर्यावरण प्रमाणन अनुपालन',
    ],
    officialUrl: 'https://ncpor.res.in/antarcticas/display/377-bharati',
    officialSource: 'एनसीपीओआर · भारती बेस',
  },
  {
    id: 'himadri',
    name: 'हिमाद्री आर्कटिक स्टेशन',
    commissioned: 2008,
    region: 'नाय-एलेसुंड, स्पिट्सबर्गेन, स्वालबार्ड',
    latLong: '78°55′00″N, 11°56′00″E',
    elevation: '20 मीटर समुद्र तल से',
    img: IMG.himadri,
    tagline: 'उच्च आर्कटिक और ध्रुवीय जलवायु प्रवर्धन के लिए भारत का स्थायी वैज्ञानिक प्रवेश द्वार।',
    description:
      'दुनिया की सबसे उत्तरी स्थायी नागरिक अनुसंधान बस्ती में 79° उत्तर में स्थित। यह कोंग्सफजॉर्डन जल विज्ञान और भारतीय मानसून के साथ इसके अंतर्संबंधों पर भारत के अनुसंधान को आधार प्रदान करता है।',
    researchFocus: [
      'कोंग्सफजॉर्डन फ्योर्ड समुद्र विज्ञान गतिशीलता',
      'IndARC मल्टी-सेंसर मूरिंग वेधशाला नेटवर्क',
      'आर्कटिक-मानसून टेलीकनेक्शन अध्ययन',
      'स्नो एल्बिडो फीडबैक एवं वायुमंडलीय एरोसोल',
    ],
    achievements: [
      'IndARC की स्थापना: कोंग्सफजॉर्डन में भारत की पहली जलमग्न वेधशाला (2014)',
      'उच्च-आर्कटिक अनुसंधान के लिए 200 से अधिक भारतीय वैज्ञानिकों की मेज़बानी',
      'अंतर्राष्ट्रीय आर्कटिक विज्ञान समिति (IASC) में सक्रिय योगदानकर्ता',
    ],
    officialUrl: 'https://ncpor.res.in/arctics/display/394-himadri',
    officialSource: 'एनसीपीओआर · हिमाद्री स्टेशन',
  },
]

export default function Home() {
  const { isHindi, trans } = useLanguage()
  const [selectedStation, setSelectedStation] = useState<string>('bharati')
  const [eduMode, setEduMode] = useState<'simple' | 'scientific'>('simple')
  const [copiedAbstract, setCopiedAbstract] = useState(false)
  const [knowledgeCategory, setKnowledgeCategory] = useState<string>('all')

  const stationsData = isHindi ? INDIAN_STATIONS_HI : INDIAN_STATIONS
  const featuredExpedition = expeditions[0]
  const currentStation =
    stationsData.find(s => s.id === selectedStation) || stationsData[0]

  // Filtered knowledge repository items
  const filteredKnowledge = knowledgeItems
    .filter(k => {
      if (knowledgeCategory === 'all') return true
      if (knowledgeCategory === 'reports') return k.type.toLowerCase().includes('report')
      if (knowledgeCategory === 'papers') return k.type.toLowerCase().includes('paper') || k.type.toLowerCase().includes('monograph')
      if (knowledgeCategory === 'datasets') return k.type.toLowerCase().includes('dataset')
      return true
    })
    .slice(0, 4)

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
    <div className="space-y-0">
      {/* 1. CINEMATIC EDITORIAL HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[78vh] flex items-center">
        {/* High-Resolution Polar Photography Backdrop */}
        <img
          src={HERO_IMAGE}
          alt="Antarctic continental polar ice sheet"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 filter saturate-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />

        <div className="relative container-wide py-16 sm:py-24 lg:py-28">
          <Reveal>
            <div className="max-w-4xl">
              {/* Sovereign Institutional Identifier */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-950/70 text-sky-200 text-xs font-mono tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>{trans('Government of India · Ministry of Earth Sciences · NCPOR', 'भारत सरकार · पृथ्वी विज्ञान मंत्रालय · एनसीपीओआर')}</span>
              </div>

              {/* Commanding Headline */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight leading-[1.0] text-white">
                {isHindi ? (
                  <>
                    ध्रुवों के <br />
                    <span className="text-sky-300">रहस्यमयी विज्ञान को जानें।</span>
                  </>
                ) : (
                  <>
                    Discover the <br />
                    <span className="text-sky-300">Science of the Poles.</span>
                  </>
                )}
              </h1>

              {/* Supporting Narrative */}
              <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                {trans(
                  "India’s sovereign digital repository archiving 44 years of Antarctic, Arctic, and Southern Ocean expeditions. Access peer-reviewed publications, open cryospheric datasets, and AI-assisted scientific dissemination.",
                  "अंटार्कटिक, आर्कटिक और दक्षिणी महासागर अभियानों के 44 वर्षों का भारत का संप्रभु डिजिटल संग्रह। सहकर्मी-समीक्षित शोध पत्र, खुले क्रायोस्फेरिक डेटासेट और एआई-संचालित वैज्ञानिक प्रसार का अन्वेषण करें।"
                )}
              </p>

              {/* Clear Primary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/expeditions"
                  className="btn bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl transition duration-200 inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  {trans('Explore Expeditions (1981–2025)', 'अभियानों का अन्वेषण करें (1981–2025)')}
                </Link>
                <Link
                  to="/datasets"
                  className="btn bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-xl border border-white/20 transition duration-200 inline-flex items-center gap-2"
                >
                  <Database className="w-4 h-4 text-sky-300" />
                  {trans('Explore Research Datasets', 'शोध डेटासेट देखें')}
                </Link>
              </div>

              {/* Subtle Coordinates Annotation */}
              <div className="mt-12 text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-x-5 gap-y-1">
                <span>70°45′S 11°44′E · {trans('MAITRI', 'मैत्री')}</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span>69°24′S 76°11′E · {trans('BHARATI', 'भारती')}</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span>78°55′N 11°56′E · {trans('HIMADRI', 'हिमाद्री')}</span>
              </div>
            </div>

            {/* Dignified Institutional Metrics Strip */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl text-left">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">44</div>
                <div className="text-xs text-slate-400 mt-0.5">{trans('Annual Antarctic Expeditions', 'वार्षिक अंटार्कटिक अभियान')}</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">3</div>
                <div className="text-xs text-slate-400 mt-0.5">{trans('Permanent Research Stations', 'स्थायी अनुसंधान केंद्र')}</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">2008</div>
                <div className="text-xs text-slate-400 mt-0.5">{trans('Arctic Outpost Established', 'आर्कटिक स्टेशन स्थापित')}</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">{trans('Open Scientific Access', 'खुली वैज्ञानिक पहुँच')}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. INDIA'S POLAR PRESENCE: EDITORIAL STATION EXPLORER */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                {trans('Sovereign Research Infrastructure', 'संप्रभु अनुसंधान अवसंरचना')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 mt-1.5 tracking-tight">
                {trans('Three Stations. One Scientific Frontier.', 'तीन अनुसंधान केंद्र। एक वैज्ञानिक क्षितिज।')}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                {trans(
                  "From the historic ice-sheet outpost of Dakshin Gangotri in 1983 to the modern modular laboratories of Bharati and the high-latitude Arctic station of Himadri, India maintains an active year-round sovereign polar research presence under the Ministry of Earth Sciences.",
                  "1983 में दक्षिण गंगोत्री की ऐतिहासिक चौकी से लेकर भारती की अत्याधुनिक प्रयोगशालाओं और हिमाद्री के उच्च-अक्षांश आर्कटिक स्टेशन तक, भारत पृथ्वी विज्ञान मंत्रालय के अंतर्गत वर्ष पर्यंत ध्रुवीय अनुसंधान बनाए हुए है।"
                )}
              </p>
            </div>

            {/* Asymmetrical Magazine Layout: Station Navigation Rail + Editorial Showcase */}
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
              {/* Station Navigation Rail */}
              <div className="space-y-2.5">
                {stationsData.map(station => {
                  const isSelected = selectedStation === station.id
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station.id)}
                      className={cn(
                        'w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group',
                        isSelected
                          ? 'border-sky-500 bg-sky-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-slate-950 text-base sm:text-lg">
                            {station.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 font-mono">
                          {station.region} · {trans('Est.', 'स्था.')} {station.commissioned}
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          'w-5 h-5 transition-transform text-slate-400 group-hover:text-slate-600',
                          isSelected && 'text-sky-600 rotate-90'
                        )}
                      />
                    </button>
                  )
                })}

                <div className="pt-4 flex items-center gap-4">
                  <Link to="/expeditions" className="btn-primary text-xs !py-2.5">
                    <Compass className="w-3.5 h-3.5" /> {trans('All 44 Expeditions', 'सभी 44 अभियान')}
                  </Link>
                  <Link
                    to="/about"
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                  >
                    {trans('National Polar Policy', 'राष्ट्रीय ध्रुवीय नीति')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Large Authentic Editorial Showcase */}
              <div className="editorial-frame bg-slate-50 overflow-hidden shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={currentStation.img}
                    alt={currentStation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                    <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
                      {currentStation.latLong}
                    </span>
                    <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
                      Elev. {currentStation.elevation}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-300 font-semibold">
                      {trans('NCPOR Operational Outpost', 'एनसीपीओआर परिचालन चौकी')}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-white">
                      {currentStation.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-white space-y-5">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {currentStation.description}
                  </p>

                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2.5">
                      {trans('Core Scientific Focus Areas', 'प्रमुख वैज्ञानिक अनुसंधान क्षेत्र')}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStation.researchFocus.map(focus => (
                        <div key={focus} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                          <span>{focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
                    <span>{trans('Ministry of Earth Sciences · NCPOR', 'पृथ्वी विज्ञान मंत्रालय · एनसीपीओआर')}</span>
                    <div className="flex items-center gap-4">
                      {currentStation.officialUrl && (
                        <a
                          href={currentStation.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-700 font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>{trans('Official NCPOR Dossier', 'आधिकारिक एनसीपीओआर डॉसियर')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <Link
                        to="/expeditions"
                        className="text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1"
                      >
                        {trans('Expedition Archive', 'अभियान पुरालेख')} <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. INTERACTIVE POLAR MAP */}
      <Section className="bg-slate-50 border-y border-slate-200">
        <Container>
          <Reveal>
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                  {trans('Interactive Cartography', 'इंटरैक्टिव मानचित्रण')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                  {trans('Polar Stations & Voyage Tracks', 'ध्रुवीय स्टेशन एवं समुद्री मार्ग')}
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  {trans(
                    'Explore sovereign Indian bases, international partner stations, and maritime voyage corridors connecting Goa and Cape Town to Antarctica and Svalbard.',
                    'भारतीय अनुसंधान केंद्रों, अंतर्राष्ट्रीय सहयोगी स्टेशनों और गोवा व केप टाउन से अंटार्कटिका व स्वालबार्ड तक समुद्री मार्गों का अन्वेषण करें।'
                  )}
                </p>
              </div>
              <Link to="/about#mission" className="btn-outline text-xs !py-2 !px-4 shrink-0">
                {trans('Logistics & Projection Details', 'लॉजिस्टिक्स एवं प्रक्षेप विवरण')} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <PolarMap />
          </Reveal>
        </Container>
      </Section>

      {/* 4. DATA STORY: OBSERVATIONAL CLIMATOLOGY & MONSOON TELECONNECTION */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            {/* Prominent High-Level Story Headline */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                  {trans('Observational Climatology', 'अवलोकन जलवायु विज्ञान')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                  {trans('Southern Ocean Sea-Ice Climatology', 'दक्षिणी महासागर समुद्री बर्फ जलवायु विज्ञान')}
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  {trans(
                    'Monthly sea-ice area observations compared against the 1981–2010 satellite baseline.',
                    '1981–2010 के उपग्रह आधारभूत स्तर की तुलना में मासिक समुद्री बर्फ क्षेत्र अवलोकन।'
                  )}
                </p>
              </div>

              {/* Large Highlighted Statistic */}
              <div className="flex items-baseline gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                    {trans('Seasonal Minimum', 'मौसमी न्यूनतम')}
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-slate-950">
                    13.8 <span className="text-sm font-sans font-normal text-slate-500">{trans('M km²', 'मि. वर्ग किमी')}</span>
                  </div>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <div className="text-[10px] font-mono uppercase text-sky-800 font-semibold tracking-wider">
                    {trans('Baseline Anomaly', 'आधार रेखा विसंगति')}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-sky-600">
                    -0.8 <span className="text-xs font-sans font-normal text-slate-500">{trans('M km²', 'मि. वर्ग किमी')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Asymmetric Layout: Chart + Scientific Context */}
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-stretch">
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
                height={270}
                yLabel={trans('Million Square Kilometers (M km²)', 'मिलियन वर्ग किलोमीटर (मि. वर्ग किमी)')}
                accent="#0284c7"
              />

              {/* Scientific Context Narrative */}
              <div className="editorial-frame p-6 sm:p-7 bg-slate-50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                    {trans('Monsoon Teleconnection', 'मानसून अंतर्संबंध')}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 mt-1.5">
                    {trans('How Polar Sea Ice Modulates the Indian Monsoon', 'ध्रुवीय समुद्री बर्फ भारतीय मानसून को कैसे प्रभावित करती है')}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {trans(
                      '"Variations in Southern Ocean sea surface temperatures alter the position of the Intertropical Convergence Zone (ITCZ). Changes in Antarctic sea ice propagate northward through the Mascarene High, modulating cross-equatorial moisture transport and the strength of India’s Southwest Monsoon."',
                      '"दक्षिणी महासागर के समुद्री सतह तापमान में विविधता अंतर-उष्णकटिबंधीय अभिसरण क्षेत्र (ITCZ) की स्थिति को बदलती है। अंटार्कटिक समुद्री बर्फ में परिवर्तन मस्करेन हाई के माध्यम से उत्तर की ओर बढ़ता है, जिससे भारत के दक्षिण-पश्चिम मानसून की नमी और तीव्रता प्रभावित होती है।"'
                    )}
                  </p>
                  <div className="mt-3 text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2">
                    <span>{trans('— NCPOR Polar Climate Dynamics Group', '— एनसीपीओआर ध्रुवीय जलवायु गतिशीलता समूह')}</span>
                    <a
                      href="https://nsidc.org/data/seaice_index"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-sky-900 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>{trans('NSIDC Sea Ice Index', 'एनएसआईडीसी इंडेक्स')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                  <Link to="/datasets" className="btn-primary text-xs !py-2.5 flex-1 text-center">
                    {trans('Browse 18 Datasets', '18 डेटासेट ब्राउज़ करें')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/publications" className="btn-outline text-xs !py-2.5 flex-1 text-center">
                    {trans('Peer Publications', 'सहकर्मी प्रकाशन')}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5. 44TH INDIAN ANTARCTIC EXPEDITION (EDITORIAL MAGAZINE SPREAD) */}
      <Section className="bg-slate-50 border-t border-slate-200">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                  {trans('Flagship Mission Dispatch', 'प्रमुख मिशन प्रेषण')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                  {trans('The 44th Indian Antarctic Expedition', '44वाँ भारतीय अंटार्कटिक अभियान')}
                </h2>
              </div>
              <Link to="/expeditions" className="btn-outline text-xs !py-2 !px-4">
                {trans('Full 44-Expedition Archive', 'पूर्ण 44-अभियान पुरालेख')} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Asymmetric Magazine Spread: Authentic Vessel Image + Expedition Milestones */}
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-stretch">
              <div className="editorial-frame overflow-hidden group bg-slate-900 relative shadow-sm">
                {/* Desktop / Tablet Viewport (sm and up) with full cinematic overlay */}
                <div className="hidden sm:block relative aspect-[16/11] overflow-hidden">
                  <img
                    src={featuredExpedition.image}
                    alt={featuredExpedition.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                    <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
                      {trans('MISSION:', 'मिशन:')} {featuredExpedition.shortTitle}
                    </span>
                    <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
                      {trans('VESSEL:', 'पोत:')} {featuredExpedition.vessel}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-mono text-xs text-sky-300 uppercase tracking-widest font-semibold">
                      {trans('Southern Ocean & East Antarctica', 'दक्षिणी महासागर एवं पूर्वी अंटार्कटिका')}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-white">
                      {isHindi ? '44वाँ भारतीय वैज्ञानिक अंटार्कटिक अभियान' : featuredExpedition.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                      {isHindi
                        ? 'दक्षिणी महासागर और पूर्वी अंटार्कटिका में आइस-शीट मॉडलिंग, वायुमंडलीय वेधशाला और समुद्री हिमनद विज्ञान का संचालन।'
                        : featuredExpedition.overview}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        to={`/expeditions/${featuredExpedition.id}`}
                        className="btn bg-white hover:bg-sky-100 text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5"
                      >
                        {trans('Open Expedition Logbook', 'अभियान लॉगबुक खोलें')} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/publications?expedition=${featuredExpedition.id}`}
                        className="btn bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2.5 rounded-xl border border-white/20"
                      >
                        {trans('Resulting Research', 'संबंधित शोध')}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile Viewport (< sm): Stacked image banner + clear readable content */}
                <div className="sm:hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={featuredExpedition.image}
                      alt={featuredExpedition.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white">
                      <span className="bg-slate-900/85 px-2 py-0.5 rounded border border-white/10">
                        {featuredExpedition.shortTitle}
                      </span>
                      <span className="bg-slate-900/85 px-2 py-0.5 rounded border border-white/10">
                        {featuredExpedition.vessel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 text-white bg-slate-950 space-y-2.5">
                    <span className="font-mono text-[10px] text-sky-300 uppercase tracking-widest font-semibold block">
                      {trans('Southern Ocean & East Antarctica', 'दक्षिणी महासागर एवं पूर्वी अंटार्कटिका')}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white leading-snug">
                      {isHindi ? '44वाँ भारतीय वैज्ञानिक अंटार्कटिक अभियान' : featuredExpedition.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isHindi
                        ? 'दक्षिणी महासागर और पूर्वी अंटार्कटिका में आइस-शीट मॉडलिंग और वेधशाला संचालन।'
                        : featuredExpedition.overview}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Link
                        to={`/expeditions/${featuredExpedition.id}`}
                        className="btn bg-white hover:bg-sky-100 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5"
                      >
                        {trans('Open Logbook', 'लॉगबुक खोलें')} <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        to={`/publications?expedition=${featuredExpedition.id}`}
                        className="btn bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2 rounded-lg border border-white/20"
                      >
                        {trans('Research', 'शोध')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voyage Chronology & Objectives */}
              <div className="flex flex-col gap-5 justify-between">
                <div className="editorial-frame p-6 bg-white">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
                    {trans('Voyage Milestones (2024–2025)', 'यात्रा के प्रमुख पड़ाव (2024–2025)')}
                  </div>
                  <ol className="relative border-l border-slate-200 ml-2 space-y-3.5 my-1">
                    {(isHindi ? [
                      { date: 'नवंबर 2024', event: 'एमवी वासिली गोलोवनिन केप टाउन से रवाना' },
                      { date: 'दिसंबर 2024', event: 'मैत्री बेस पर 44वें दल का आगमन एवं वैज्ञानिक उपकरणों की स्थापना' },
                      { date: 'जनवरी 2025', event: 'लार्समैन हिल्स भारती स्टेशन पर समुद्री सीटीडी एवं कोरिंग' },
                      { date: 'मार्च 2025', event: 'शीतकालीन दल की तैनाती एवं वापसी यात्रा' },
                    ] : featuredExpedition.timeline.slice(0, 4)).map((t, i) => (
                      <li key={t.date} className="pl-5">
                        <span
                          className={cn(
                            'absolute -left-1.5 w-3 h-3 rounded-full border-2 border-white',
                            i === 0 ? 'bg-sky-500' : 'bg-slate-300'
                          )}
                        />
                        <div className="font-mono text-[10px] uppercase text-sky-800 font-semibold">
                          {t.date}
                        </div>
                        <div className="text-xs font-medium text-slate-800 mt-0.5">{t.event}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="editorial-frame p-6 bg-white">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3">
                    {trans('Key Field Science Objectives', 'प्रमुख क्षेत्रीय वैज्ञानिक उद्देश्य')}
                  </div>
                  <ul className="space-y-2.5">
                    {(isHindi ? [
                      { title: 'क्रायोस्फेरिक आइस शीट कोरिंग', description: 'प्राचीन जलवायु और बर्फ पिघलने की दर का अध्ययन करने के लिए 100 मीटर फ़िर्न कोर का निष्कर्षण।' },
                      { title: 'दक्षिणी महासागर हाइड्रोग्राफी', description: 'ध्रुवीय मोर्चों के पार तापमान और लवणता प्रोफाइल के लिए 24 गहरे सीटीडी कास्ट।' },
                      { title: 'ग्रीनहाउस गैस एवं एरोसोल निगरानी', description: 'मैत्री वेधशाला में ब्लैक कार्बन और क्षोभमंडलीय ओजोन का निरंतर संवेदन।' },
                    ] : featuredExpedition.highlights).map(h => (
                      <li key={h.title} className="flex gap-2.5 text-xs">
                        <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-800 grid place-items-center shrink-0 font-bold text-[11px]">
                          ✓
                        </span>
                        <div>
                          <div className="font-bold text-slate-950">{h.title}</div>
                          <div className="text-slate-600 mt-0.5">{h.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 6. POLAR KNOWLEDGE REPOSITORY: DOCUMENT / ARCHIVE INTERFACE */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                  {trans('Open Research Archive', 'खुला शोध पुरालेख')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                  {trans('Polar Knowledge Repository', 'ध्रुवीय ज्ञान रिपॉजिटरी')}
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  {trans(
                    'Technical reports, monographs, peer-reviewed journal papers, and policy records preserved for national research access.',
                    'तकनीकी रिपोर्ट, शोध पत्र, मोनोग्राफ और नीति दस्तावेज राष्ट्रीय अनुसंधान उपयोग हेतु संरक्षित।'
                  )}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar max-w-full shrink-0">
                <button
                  onClick={() => setKnowledgeCategory('all')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                    knowledgeCategory === 'all'
                      ? 'bg-white text-slate-950 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {trans('All', 'सभी')}
                </button>
                <button
                  onClick={() => setKnowledgeCategory('reports')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                    knowledgeCategory === 'reports'
                      ? 'bg-white text-slate-950 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {trans('Reports', 'रिपोर्ट्स')}
                </button>
                <button
                  onClick={() => setKnowledgeCategory('papers')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                    knowledgeCategory === 'papers'
                      ? 'bg-white text-slate-950 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {trans('Papers', 'शोध पत्र')}
                </button>
                <button
                  onClick={() => setKnowledgeCategory('datasets')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                    knowledgeCategory === 'datasets'
                      ? 'bg-white text-slate-950 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {trans('Datasets', 'डेटासेट्स')}
                </button>
              </div>
            </div>

            {/* Document/Archive Interface (Subtle Separators, Not Floating Cards) */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden bg-white">
              {filteredKnowledge.map(k => (
                <Link
                  key={k.id}
                  to={`/knowledge/${k.id}`}
                  className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="max-w-3xl space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                        {k.type}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{k.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{k.year}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 group-hover:text-sky-700 transition-colors">
                      {k.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {k.excerpt}
                    </p>
                    <div className="text-xs text-slate-400 font-mono pt-0.5">
                      {trans('Lead:', 'प्रमुख:')} {k.author}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-sky-700 group-hover:translate-x-1 transition-transform">
                    <span>{trans('Read Document', 'दस्तावेज़ पढ़ें')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/knowledge"
                className="btn-outline text-xs !py-2.5 !px-5 inline-flex items-center gap-1.5"
              >
                {trans(`Search Complete Polar Knowledge Index (${knowledgeItems.length} Artifacts)`, `संपूर्ण ध्रुवीय ज्ञान अनुक्रमणिका खोजें (${knowledgeItems.length} प्रविष्टियाँ)`)} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7. DUAL-LENS LEARNING LABORATORY (SIH SMART EDUCATION THEME) */}
      <Section className="bg-slate-50 border-y border-slate-200">
        <Container>
          <Reveal>
            <div className="editorial-frame p-6 sm:p-10 bg-white">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                  <div className="text-xs font-mono tracking-wider uppercase text-sky-800 font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    {trans('SIH 2026 Theme · Smart Education', 'एसआईएच 2026 थीम · स्मार्ट शिक्षा')}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 mt-1.5">
                    {trans('Dual-Lens Learning Laboratory', 'द्वि-स्तरीय शिक्षण प्रयोगशाला')}
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mt-1.5 leading-relaxed">
                    {trans(
                      'Calibrate polar science concepts dynamically: choose foundational explanations for school students, or rigorous technical descriptions for university researchers.',
                      'ध्रुवीय विज्ञान के सिद्धांतों को अनुकूलित करें: स्कूली छात्रों के लिए सरल व्याख्या, अथवा विश्वविद्यालयी शोधकर्ताओं के लिए गूढ़ तकनीकी विवरण चुनें।'
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setEduMode('simple')}
                      className={cn(
                        'px-3.5 py-2 rounded-lg text-xs font-semibold transition',
                        eduMode === 'simple'
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      )}
                    >
                      {trans('Foundational (Student)', 'बुनियादी (छात्र)')}
                    </button>
                    <button
                      onClick={() => setEduMode('scientific')}
                      className={cn(
                        'px-3.5 py-2 rounded-lg text-xs font-semibold transition',
                        eduMode === 'scientific'
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      )}
                    >
                      {trans('Scientific (Researcher)', 'वैज्ञानिक (शोधकर्ता)')}
                    </button>
                  </div>
                  <Link to="/education" className="btn-primary text-xs !py-2">
                    {trans('All Modules', 'सभी मॉड्यूल')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Interactive Dual-Lens Calibration Preview */}
              <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-sky-800 font-semibold">
                      {trans('Curriculum Chapter Preview', 'पाठ्यक्रम अध्याय पूर्वावलोकन')}
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-950 mt-1">
                      {trans('Why the Poles Are Cold: Solar Angles & Albedo Feedback', 'ध्रुव इतने ठंडे क्यों हैं: सूर्य के कोण एवं एल्बिडो प्रभाव')}
                    </h3>

                    <div className="mt-4 p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        {eduMode === 'simple'
                          ? trans('STUDENT & PUBLIC EXPLANATION', 'छात्र एवं जनसाधारण स्पष्टीकरण')
                          : trans('ACADEMIC SCIENTIFIC EXPLANATION', 'अकादमिक वैज्ञानिक व्याख्या')}
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-normal">
                        {eduMode === 'simple'
                          ? trans(
                              'The poles receive sunlight at a sharp, slanted angle. This spreads the exact same solar energy over a much wider surface area than at the equator. In addition, pristine white snow reflects up to 90% of incoming sunlight straight back into space like a giant mirror.',
                              'ध्रुवों पर सूर्य की किरणें अत्यंत तिरछे कोण पर पहुँचती हैं। इससे भूमध्य रेखा की तुलना में समान सौर ऊर्जा बहुत बड़े क्षेत्र में फैल जाती है। इसके अलावा, धवल श्वेत बर्फ एक विशाल दर्पण की तरह आने वाली 90% धूप को अंतरिक्ष में वापस परावर्तित कर देती है।'
                            )
                          : trans(
                              'High polar solar zenith angles attenuate insolation per unit horizontal surface area due to geometric spread and longer atmospheric pathlengths. Combined with a planetary snow and sea-ice albedo of 0.80 to 0.90, net radiative deficits persist across polar latitudes year-round.',
                              'उच्च ध्रुवीय सौर चरम कोण ज्यामितीय प्रसार और लंबे वायुमंडलीय पथ के कारण प्रति इकाई क्षैतिज सतह क्षेत्र में आतपन को कम करते हैं। 0.80 से 0.90 के ग्रह हिम और समुद्री बर्फ एल्बिडो के संयोजन से, ध्रुवीय अक्षांशों पर वर्ष भर शुद्ध विकिरण घाटा बना रहता है।'
                            )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500">{trans('Linked to 44th ISEA radiation datasets', '44वें आईएसईए सौर विकिरण डेटासेट से संबद्ध')}</span>
                    <Link to="/education" className="text-sky-800 font-bold hover:underline">
                      {trans('Take Chapter Quiz →', 'अध्याय प्रश्नोत्तरी हल करें →')}
                    </Link>
                  </div>
                </div>

                {/* 3-Step Educational Framework */}
                <div className="space-y-3 flex flex-col justify-between">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="font-display font-bold text-slate-950 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 grid place-items-center text-xs font-bold">1</span>
                      <span>{trans('Dual-Lens Calibration', 'द्वि-स्तरीय अनुकूलन')}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-7">
                      {trans(
                        'Accessible explanations for middle schools; rigorous thermodynamic formulations for university scholars.',
                        'माध्यमिक विद्यालयों के लिए सुगम व्याख्या; शोधकर्ताओं के लिए सटीक थर्मोडायनामिक समीकरण।'
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="font-display font-bold text-slate-950 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 grid place-items-center text-xs font-bold">2</span>
                      <span>{trans('Linked In-Situ Evidence', 'प्रत्यक्ष जमीनी साक्ष्य')}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-7">
                      {trans(
                        'Every module is tied directly to real Indian expeditions, research stations, and open datasets.',
                        'प्रत्येक मॉड्यूल वास्तविक भारतीय अभियानों, शोध केंद्रों और खुले डेटासेट से सीधे जुड़ा है।'
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="font-display font-bold text-slate-950 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 grid place-items-center text-xs font-bold">3</span>
                      <span>{trans('Polar Scholar Certification', 'ध्रुवीय विद्वान प्रमाणन')}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-7">
                      {trans(
                        'Interactive conceptual quizzes with instant verification and downloadable scholar completion badges.',
                        'तत्काल परिणाम एवं डाउनलोड करने योग्य डिजिटल प्रमाणपत्र के साथ संवादात्मक प्रश्नोत्तरी।'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 8. AI SCIENCE COMMUNICATOR ENGINE (EDITORIAL TRANSFORMATION PIPELINE) */}
      <Section className="bg-slate-950 text-white overflow-hidden relative">
        <Container className="relative">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  {trans('AI Science Dissemination Pipeline', 'एआई विज्ञान प्रसार प्रणाली')}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  {trans('From Peer Review to Public Reach.', 'सहकर्मी समीक्षा से जन-जन तक।')}
                </h2>
                <p className="mt-4 text-slate-300 text-base leading-relaxed">
                  {trans(
                    'Bridge the gap between specialized cryospheric papers and public understanding. Transform technical expedition reports into calibrated classroom lessons, press releases, social digests, and video scripts.',
                    'विशिष्ट क्रायोस्फेरिक शोध पत्रों और आम जनता की समझ के बीच की दूरी को मिटाएं। तकनीकी अभियान रिपोर्टों को कक्षा पाठों, प्रेस विज्ञप्तियों, सोशल मीडिया सारांशों और वीडियो स्क्रिप्ट में बदलें।'
                  )}
                </p>

                {/* Clear 3-Stage Transformation Process */}
                <div className="mt-6 space-y-3 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-400/40 grid place-items-center text-sky-300 font-bold">
                      1
                    </span>
                    <span>{trans('Technical Input: Research paper abstract, thesis, or expedition log', 'तकनीकी इनपुट: शोध पत्र सारांश, थीसिस या अभियान लॉगबुक')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-400/40 grid place-items-center text-sky-300 font-bold">
                      2
                    </span>
                    <span>{trans('Audience Calibration: Student, Educator, Researcher, or Media', 'लक्षित पाठक वर्ग: छात्र, शिक्षक, शोधकर्ता या मीडिया')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-400/40 grid place-items-center text-sky-300 font-bold">
                      3
                    </span>
                    <span>{trans('Multi-Channel Output: 5 dissemination-ready editorial formats', 'मल्टी-चैनल आउटपुट: 5 प्रसार-तैयार संपादकीय प्रारूप')}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    to="/communicator"
                    className="btn bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-1.5"
                  >
                    {trans('Launch AI Communicator', 'एआई कम्यूनिकेटर शुरू करें')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] font-mono text-slate-400">
                    {trans('Rule-guided scientific accuracy', 'सटीक वैज्ञानिक नियमों पर आधारित')}
                  </span>
                </div>
              </div>

              {/* Sample Transformation Demonstration */}
              <div className="editorial-frame border-white/10 bg-white/5 p-6 sm:p-7 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-sky-300 uppercase tracking-widest font-semibold">
                    {trans('Input: Maitri Atmospheric Science Paper', 'इनपुट: मैत्री वायुमंडलीय विज्ञान शोध पत्र')}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'Continuous equivalent black carbon (EBC) observations at Maitri demonstrate episodic long-range aerosol transport from biomass burning in Southern Africa.'
                      )
                      setCopiedAbstract(true)
                      setTimeout(() => setCopiedAbstract(false), 1500)
                    }}
                    className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedAbstract ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedAbstract ? trans('COPIED', 'कॉपी किया') : trans('COPY', 'कॉपी')}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 leading-relaxed">
                  {trans(
                    '"Continuous equivalent black carbon (EBC) observations at Maitri demonstrate episodic long-range aerosol transport from biomass burning in Southern Africa into pristine East Antarctica..."',
                    '"मैत्री में निरंतर समकक्ष ब्लैक कार्बन (EBC) अवलोकन दक्षिणी अफ्रीका में बायोमास जलने से प्राचीन पूर्वी अंटार्कटिका में लंबी दूरी के एरोसोल परिवहन को प्रदर्शित करते हैं..."'
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono text-sky-300 font-semibold uppercase tracking-wider">
                      {trans('Student Explanation', 'छात्रों के लिए व्याख्या')}
                    </div>
                    <div className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                      {trans(
                        '"Soot from forest fires thousands of miles away can travel across the ocean winds all the way to pristine Antarctic snow."',
                        '"हजारों मील दूर जंगलों की आग से निकला धुआँ और कालिख समुद्री हवाओं के सहारे अंटार्कटिका की प्राचीन बर्फ तक पहुँच सकती है।"'
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono text-sky-300 font-semibold uppercase tracking-wider">
                      {trans('Social / Media Digest', 'सोशल / मीडिया सारांश')}
                    </div>
                    <div className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                      {trans(
                        '"Why does Antarctica have smoke particles? Indian scientists at Maitri track long-range southern hemisphere winds. ❄️🌏"',
                        '"अंटार्कटिका में धुएं के कण कैसे पहुंचे? मैत्री स्टेशन पर भारतीय वैज्ञानिक दक्षिणी गोलार्ध की लंबी दूरी की हवाओं को ट्रैक कर रहे हैं। ❄️🌏"'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 9. VISUAL DISPATCHES: ASYMMETRICAL EDITORIAL PHOTOGRAPHY GRID */}
      <Section className="bg-white">
        <Container>
          <Reveal>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
                  {trans('Visual Science Archive', 'दृश्य विज्ञान पुरालेख')}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
                  {trans('Dispatches From the Ice', 'बर्फ के मैदानों से प्रेषण')}
                </h2>
              </div>
              <Link to="/media" className="btn-outline text-xs !py-2 !px-4">
                {trans('Open Full Media Gallery', 'पूर्ण मीडिया गैलरी खोलें')} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Asymmetrical Photo Grid with Authentic Polar Science Imagery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Feature Hero Photo (Ice Core Examination) */}
              <Link
                to="/media"
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 md:col-span-2 aspect-[16/10] shadow-2xs"
              >
                <img
                  src={IMG.iceCore}
                  alt="Scientist examines an ice core"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                    {trans('Cryosphere Glaciology', 'क्रायोस्फीयर हिमनद विज्ञान')}
                  </div>
                  <div className="text-base font-bold mt-0.5">
                    {trans('Ice Core Paleoclimate Extraction & Stratigraphy', 'आइस कोर प्राचीन जलवायु निष्कर्षण एवं स्तरिकी')}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {trans('Analyzing trapped atmospheric gases to reconstruct ancient monsoon cycles.', 'प्राचीन मानसूनी चक्रों के पुनर्निर्माण के लिए फंसी वायुमंडलीय गैसों का विश्लेषण।')}
                  </div>
                </div>
              </Link>

              {/* Supporting Photo 1 (Bharati Modular Station) */}
              <Link
                to="/media"
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/10] shadow-2xs"
              >
                <img
                  src={IMG.bharati}
                  alt="Bharati Antarctic station"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                    {trans('Larsemann Hills, East Antarctica', 'लार्समैन हिल्स, पूर्वी अंटार्कटिका')}
                  </div>
                  <div className="text-sm font-bold mt-0.5">{trans('Bharati Polar Station', 'भारती ध्रुवीय स्टेशन')}</div>
                </div>
              </Link>

              {/* Supporting Photo 2 (Kongsfjorden Glacier Front) */}
              <Link
                to="/media"
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/10] shadow-2xs"
              >
                <img
                  src={IMG.glacier}
                  alt="Kongsfjorden glacier front"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                    {trans('Svalbard, High Arctic', 'स्वालबार्ड, उच्च आर्कटिक')}
                  </div>
                  <div className="text-sm font-bold mt-0.5">{trans('Kongsfjorden Fjord Glacier Calving', 'कोंग्सफजॉर्डन फ्योर्ड हिमनद विखंडन')}</div>
                </div>
              </Link>

              {/* Supporting Photo 3 (Historical Dakshin Gangotri) */}
              <Link
                to="/media"
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 md:col-span-2 aspect-[16/10] shadow-2xs"
              >
                <img
                  src={IMG.dakshinGangotri}
                  alt="Dakshin Gangotri station archive"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                    {trans('Historical National Archive', 'ऐतिहासिक राष्ट्रीय पुरालेख')}
                  </div>
                  <div className="text-base font-bold mt-0.5">
                    {trans('Dakshin Gangotri: India’s First Permanent Antarctic Base (1983)', 'दक्षिण गंगोत्री: भारत का पहला स्थायी अंटार्कटिक बेस (1983)')}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {trans('Constructed during the 3rd Indian Antarctic Expedition on the ice shelf.', 'हिम शेल्फ़ पर तीसरे भारतीय अंटार्कटिक अभियान के दौरान निर्मित।')}
                  </div>
                </div>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 10. INSTITUTIONAL CALL-TO-ACTION */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-t border-slate-800">
        <Container className="text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                {trans('National Polar Science Collaboration', 'राष्ट्रीय ध्रुवीय विज्ञान सहयोग')}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2">
                {trans('Explore India’s Polar Knowledge Frontier', 'भारत के ध्रुवीय ज्ञान क्षितिज का अन्वेषण करें')}
              </h2>
              <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                {trans(
                  'Whether analyzing Southern Ocean hydrographic casts, exploring curriculum modules for schools, or discovering the 44-year legacy of Indian polar expeditions, POLARIS is your national digital gateway.',
                  'चाहे दक्षिणी महासागर के हाइड्रोग्राफिक आंकड़ों का विश्लेषण करना हो, स्कूलों के लिए शिक्षण मॉड्यूल देखना हो, या भारतीय अभियानों के 44 साल के गौरवशाली इतिहास को जानना हो, पोलारिस आपका राष्ट्रीय डिजिटल प्रवेश द्वार है।'
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/expeditions"
                  className="btn bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Compass className="w-4 h-4" /> {trans('Explore Expeditions (1st–44th)', 'अभियानों का अन्वेषण करें (1st–44th)')}
                </Link>
                <Link
                  to="/datasets"
                  className="btn bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 inline-flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Database className="w-4 h-4" /> {trans('Access Polar Datasets', 'ध्रुवीय डेटासेट देखें')}
                </Link>
                <Link
                  to="/education"
                  className="btn bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 inline-flex items-center gap-2 text-xs sm:text-sm"
                >
                  <GraduationCap className="w-4 h-4" /> {trans('Smart Education Modules', 'स्मार्ट शिक्षा मॉड्यूल')}
                </Link>
              </div>

              <div className="mt-10 text-xs font-mono text-slate-400 tracking-wider">
                {trans(
                  'GOVERNMENT OF INDIA · MINISTRY OF EARTH SCIENCES · NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH',
                  'भारत सरकार · पृथ्वी विज्ञान मंत्रालय · राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र'
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
