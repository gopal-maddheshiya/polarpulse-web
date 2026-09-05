import { PageHeader } from '../components/ui/Page'
import { Container, Section, SectionHeader } from '../components/ui/Primitives'
import {
  Compass, MapPin, Mail, Users, Anchor, GraduationCap, Database, Snowflake,
  Waves, Mountain, Microscope, Activity, ArrowRight, Phone, Globe2, Sparkles,
  ShieldCheck, CheckCircle2, Radio, Calendar
} from 'lucide-react'
import { IMG } from '../data/images'
import { Reveal } from '../lib/reveal'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { isHindi, trans } = useLanguage()

  const MISSION = [
    { 
      icon: Compass, 
      title: trans('Coordinate', 'समन्वय (Coordinate)'), 
      desc: trans(
        'India’s sovereign expeditions to the Arctic, Antarctic, Southern Ocean and the Himalayan cryosphere.',
        'आर्कटिक, अंटार्कटिका, दक्षिणी महासागर और हिमालयी क्रायोस्फीयर में भारत के संप्रभु वैज्ञानिक अभियानों का संचालन व समन्वय।'
      ) 
    },
    { 
      icon: Database, 
      title: trans('Curate', 'संरक्षण व संकलन (Curate)'), 
      desc: trans(
        'Open in-situ telemetry datasets, peer publications, and educational curricula across polar disciplines.',
        'ध्रुवीय विज्ञान के इन-सिटू टेलीमेट्री डेटासेट्स, सहकर्मी-समीक्षित शोध पत्रों और राष्ट्रीय शैक्षणिक पाठ्यक्रमों का प्रमाणिक संग्रह।'
      ) 
    },
    { 
      icon: GraduationCap, 
      title: trans('Educate', 'शिक्षा एवं प्रसार (Educate)'), 
      desc: trans(
        'Dual-mode polar curriculum modules and interactive quizzes built for secondary and university classrooms.',
        'माध्यमिक विद्यालयों एवं विश्वविद्यालयों के लिए तैयार द्वि-स्तरीय ध्रुवीय शिक्षण मॉड्यूल और इंटरएक्टिव मूल्यांकन परीक्षण।'
      ) 
    },
    { 
      icon: Activity, 
      title: trans('Disseminate', 'जन-जागरूकता (Disseminate)'), 
      desc: trans(
        'AI-assisted science communication converting dense technical reports into multi-channel public outreach.',
        'जटिल वैज्ञानिक रिपोर्टों को एआई की मदद से सरल जनसंचार, प्रेस विज्ञप्ति और छात्र-सुलभ आलेखों में रूपांतरित करने की प्रणाली।'
      ) 
    },
  ]

  const TIMELINE = [
    { 
      year: '1981', 
      event: trans('First Indian Expedition', 'प्रथम भारतीय अंटार्कटिक अभियान'), 
      desc: trans(
        'Operation Gangotri marks India’s maiden scientific voyage to Antarctica led by Dr. S. Z. Qasim.',
        'डॉ. एस. ज़ेड. कासिम के नेतृत्व में ‘ऑपरेशन गंगोत्री’ के साथ अंटार्कटिका के लिए भारत की पहली ऐतिहासिक वैज्ञानिक यात्रा शुरू हुई।'
      ) 
    },
    { 
      year: '1983', 
      event: trans('Dakshin Gangotri', 'दक्षिण गंगोत्री बेस की स्थापना'), 
      desc: trans(
        'India’s first permanent Antarctic base established on the ice shelf; India becomes an Antarctic Treaty Consultative Party.',
        'बर्फ की चादर पर भारत का पहला स्थायी अंटार्कटिक बेस स्थापित हुआ; भारत अंटार्कटिक संधि का सलाहकार सदस्य बना।'
      ) 
    },
    { 
      year: '1989', 
      event: trans('Maitri Base Commissioned', 'मैत्री अनुसंधान केंद्र का लोकार्पण'), 
      desc: trans(
        'Second permanent station built in the ice-free Schirmacher Oasis for year-round atmospheric and geological observations.',
        'शिर्माकर ओएसिस के चट्टानी क्षेत्र में साल भर संचालित होने वाला दूसरा स्थायी केंद्र स्थापित किया गया।'
      ) 
    },
    { 
      year: '2008', 
      event: trans('Himadri Arctic Station', 'हिमाद्री आर्कटिक स्टेशन'), 
      desc: trans(
        'India enters the High Arctic with a dedicated research base at Ny-Ålesund, Spitsbergen, Svalbard.',
        'स्वालबार्ड (नॉर्वे) के न्य-ओलेसुंड में स्थायी अनुसंधान स्टेशन के साथ भारत का उच्च आर्कटिक में औपचारिक प्रवेश।'
      ) 
    },
    { 
      year: '2012', 
      event: trans('Bharati Polar Station', 'भारती ध्रुवीय स्टेशन का निर्माण'), 
      desc: trans(
        'State-of-the-art modular station commissioned in the Larsemann Hills with direct maritime and satellite earth telemetry.',
        'लार्समैन हिल्स में अत्याधुनिक मॉड्यूलर स्टेशन कमीशन किया गया, जिसमें शून्य-अपशिष्ट डिस्चार्ज और प्रत्यक्ष उपग्रह टेलीमेट्री उपलब्ध है।'
      ) 
    },
    { 
      year: '2014', 
      event: trans('IndARC Mooring Deployed', 'इंडआर्क (IndARC) मूरिंग की तैनाती'), 
      desc: trans(
        'India deploys its first multi-sensor underwater moored observatory in Kongsfjorden to monitor Arctic ocean warming.',
        'आर्कटिक महासागर के तापमान एवं धाराओं की निगरानी के लिए कोंग्सफ्योर्डन में भारत की पहली पानी के नीचे की मूरिंग वेधशाला।'
      ) 
    },
    { 
      year: '2024–25', 
      event: trans('44th ISEA Active', '44वां भारतीय अंटार्कटिक अभियान (सक्रिय)'), 
      desc: trans(
        'Flagship annual expedition deploying atmospheric and oceanographic arrays across the Southern Ocean.',
        'दक्षिणी महासागर और अंटार्कटिका में उन्नत वायुमंडलीय और महासागरीय अनुसंधान सरणियों की सक्रिय तैनाती।'
      ) 
    },
  ]

  const STATIONS = [
    {
      name: trans('Maitri Research Base', 'मैत्री अनुसंधान केंद्र'),
      country: trans('India · Antarctic (Queen Maud Land)', 'भारत · अंटार्कटिका (क्वीन मौड लैंड)'),
      established: 1989,
      coords: '70°45′57″S, 11°44′09″E',
      blurb: trans(
        'Located in the rocky Schirmacher Oasis. Operates continuous meteorological monitoring (AWS), ozone profiling, geomagnetic pulsation sensing, and limnological studies of freshwater lakes.',
        'शिर्माकर ओएसिस में स्थित। यहां स्वचालित मौसम स्टेशन (AWS), ओजोन मापन, भू-चुंबकीय स्पंदन संवेदन और मीठे पानी की झीलों का लिम्नोलॉजिकल अध्ययन निरंतर जारी रहता है।'
      ),
      img: IMG.maitri,
    },
    {
      name: trans('Bharati Polar Station', 'भारती ध्रुवीय स्टेशन'),
      country: trans('India · Antarctic (Larsemann Hills)', 'भारत · अंटार्कटिका (लार्समैन हिल्स)'),
      established: 2012,
      coords: '69°24′28″S, 76°11′14″E',
      blurb: trans(
        'Constructed using prefabricated shipping containers on stilts. Supports satellite data acquisition for NRSC/ISRO, deep CTD oceanography, coastal firn cores, and extreme microbial ecology.',
        'लार्समैन हिल्स में समुद्र तट के समीप खंभों पर स्थित मॉड्यूलर स्टेशन। इसरो/एनआरएससी उपग्रह डेटा अधिग्रहण, गहन सीटीडी महासागरीय अध्ययन और सूक्ष्मजीव पारिस्थितिकी का केंद्र।'
      ),
      img: IMG.bharati,
    },
    {
      name: trans('Himadri Arctic Station', 'हिमाद्री आर्कटिक स्टेशन'),
      country: trans('India · High Arctic (Svalbard)', 'भारत · उच्च आर्कटिक (स्वालबार्ड, नॉर्वे)'),
      established: 2008,
      coords: '78°55′00″N, 11°56′00″E',
      blurb: trans(
        'India’s sovereign research base at Ny-Ålesund at 79°N latitude. Hosts atmospheric sampling, snow albedo measurements, fjord oceanography campaigns, and monsoon teleconnection studies.',
        '79° उत्तर अक्षांश पर न्य-ओलेसुंड में भारत का संप्रभु अनुसंधान केंद्र। वायुमंडलीय नमूने, हिम एल्बिडो मापन, फ्योर्ड महासागरीय अध्ययन और भारतीय मानसून टेलीकनेक्शन पर शोध।'
      ),
      img: IMG.himadri,
    },
  ]

  return (
    <div className="min-h-screen bg-[#edf5fb]">
      <PageHeader
        eyebrow={trans('Institutional Mission', 'संस्थागत मिशन एवं संकल्प')}
        title={trans('From India’s Polar Research to Public Knowledge', 'भारत के ध्रुवीय अनुसंधान से जन-साधारण तक ज्ञान')}
        sub={trans(
          'POLARIS is India’s integrated digital gateway to polar expeditions, open scientific datasets, peer publications, media archives, and educational outreach. Developed for Smart India Hackathon 2026 under the Ministry of Earth Sciences.',
          'पोलारिस ध्रुवीय वैज्ञानिक अभियानों, ओपन डेटासेट्स, सहकर्मी-समीक्षित शोध पत्रों, दृश्य मीडिया संग्रह और शैक्षणिक पहुंच का भारत का एकीकृत डिजिटल प्रवेश द्वार है। पृथ्वी विज्ञान मंत्रालय के अधीन स्मार्ट इंडिया हैकाथॉन 2026 हेतु विकसित।'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="editorial-badge-light bg-sky-50/90 border-sky-300 text-sky-900 font-semibold px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> {trans('SIH 2026 · PROBLEM ID: 26063', 'एसआईएच 2026 · समस्या आईडी: 26063')}
          </span>
          <span className="editorial-badge-light bg-white/80 border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full">
            {trans('NCPOR · MINISTRY OF EARTH SCIENCES, GOVT. OF INDIA', 'एनसीपीओआर · पृथ्वी विज्ञान मंत्रालय, भारत सरकार')}
          </span>
        </div>
      </PageHeader>

      {/* Mission & Commitments */}
      <Section id="mission">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-sky-800 font-bold mb-1.5">{trans('Four National Commitments', 'चार राष्ट्रीय वैज्ञानिक संकल्प')}</div>
                <h2 className="font-display text-3xl font-bold text-slate-950 tracking-tight leading-tight">{trans('A Unified Portal for India’s Sovereign Science', 'भारत के संप्रभु ध्रुवीय विज्ञान का एकीकृत मंच')}</h2>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm font-sans">
                  {trans(
                    'The National Centre for Polar and Ocean Research (NCPOR) is the nodal agency for the Indian Polar Programme. POLARIS consolidates four decades of field expeditions, technical reports, and telemetry into a single open platform for students, researchers, policymakers, and the global public.',
                    'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR) भारतीय ध्रुवीय कार्यक्रम की नोडल एजेंसी है। पोलारिस चार दशकों के फील्ड अभियानों, तकनीकी रिपोर्टों और टेलीमेट्री को छात्रों, शोधकर्ताओं, नीति निर्माताओं और जनता के लिए एक पारदर्शी और सुलभ मंच पर प्रस्तुत करता है।'
                  )}
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
                  {MISSION.map(m => {
                    const Icon = m.icon
                    return (
                      <div key={m.title} className="p-4 rounded-2xl border border-sky-200/90 bg-white/95 backdrop-blur-md shadow-soft">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 grid place-items-center font-bold shadow-xs">
                            <Icon className="w-4.5 h-4.5 text-sky-600" />
                          </div>
                          <h4 className="font-display font-bold text-slate-900 text-sm">{m.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">{m.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Station Hero Card */}
              <div className="rounded-3xl border border-sky-200/90 shadow-soft overflow-hidden bg-slate-900">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={IMG.station} alt="Polar Research Station" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="editorial-badge-light bg-slate-950/80 text-sky-300 border-white/20 text-[10px] font-bold tracking-wider mb-2 inline-block px-2.5 py-1 rounded-full backdrop-blur-md">
                      {trans('SOVEREIGN RESEARCH INFRASTRUCTURE', 'संप्रभु अनुसंधान अवसंरचना')}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">{trans('Bharati Station, Antarctica', 'भारती स्टेशन, अंटार्कटिका')}</h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
                      {trans(
                        'State-of-the-art zero-liquid discharge modular station operating year-round in Larsemann Hills.',
                        'लार्समैन हिल्स में साल भर सक्रिय रहने वाला शून्य-अपशिष्ट डिस्चार्ज अत्याधुनिक भारतीय अनुसंधान केंद्र।'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Historical Milestones Timeline */}
      <Section className="bg-white/60 backdrop-blur-xs border-y border-sky-200/80 py-16">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={trans('Chronicle of Excellence', 'गौरवशाली इतिहास एवं पड़ाव')}
              title={trans('Four Decades of India’s Polar Science (1981–2025)', 'भारतीय ध्रुवीय विज्ञान के चार दशक (1981–2025)')}
              sub={trans(
                'Key historical milestones that shaped India into a premier consultative nation in Antarctic and Arctic governance.',
                'अंटार्कटिक एवं आर्कटिक शासन में भारत को शीर्ष परामर्शदाता राष्ट्र बनाने वाले ऐतिहासिक वैज्ञानिक मील के पत्थर।'
              )}
            />

            <div className="relative border-l-2 border-sky-200 ml-4 md:ml-6 space-y-8 my-6">
              {TIMELINE.map(t => (
                <div key={t.year} className="pl-6 md:pl-8 relative">
                  <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-sky-600 border-4 border-white shadow-xs" />
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-sm font-bold text-sky-950 bg-sky-100/90 px-2.5 py-0.5 rounded-md border border-sky-300 shadow-xs">
                      {t.year}
                    </span>
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      {t.event}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 max-w-2xl leading-relaxed font-sans">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Three Research Bases Detailed */}
      <Section className="py-16">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={trans('Permanent Infrastructure', 'स्थायी अनुसंधान केंद्र')}
              title={trans('Maitri, Bharati & Himadri', 'मैत्री, भारती एवं हिमाद्री')}
              sub={trans(
                'India\'s three permanent scientific bastions anchoring sovereign observation networks at both polar extremes.',
                'दोनों ध्रुवों पर भारत के वैज्ञानिक प्रेक्षण नेटवर्क को निरंतर सक्रिय रखने वाले तीन स्थायी अनुसंधान केंद्र।'
              )}
            />

            <div className="grid md:grid-cols-3 gap-6">
              {STATIONS.map(s => (
                <div key={s.name} className="rounded-3xl border border-sky-200/90 bg-white/95 backdrop-blur-md shadow-soft hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-950/80 text-sky-300 backdrop-blur-md border border-white/20 shadow-xs">
                        {trans('EST.', 'स्थापना')} {s.established}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="font-mono text-[10px] text-sky-300 font-semibold">{s.coords}</div>
                        <h4 className="font-display font-bold text-base mt-0.5">{s.name}</h4>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-sky-800 font-bold mb-1">
                        {s.country}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                        {s.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-sky-100 mt-2">
                    <Link
                      to="/expeditions"
                      className="btn-outline w-full text-xs !py-2.5 text-center flex items-center justify-center gap-1.5 font-semibold rounded-xl bg-white shadow-xs hover:border-sky-400"
                    >
                      <span>{trans('Expedition Logs', 'अभियान लॉग देखें')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Institutional Contact Section */}
      <Section className="bg-white/60 backdrop-blur-xs border-t border-sky-200/80 py-16" id="contact">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-sky-200/90 p-8 sm:p-10 bg-white/95 backdrop-blur-md shadow-soft">
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-sky-800 font-bold mb-1">{trans('Outreach & Inquiries', 'संपर्क एवं पूछताछ')}</div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">{trans('Get in Touch', 'हमसे संपर्क करें')}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                    {trans(
                      'For scientific data requests, school and college educational collaborations, or media dissemination inquiries with the POLARIS portal.',
                      'वैज्ञानिक डेटा अनुरोध, विद्यालय एवं महाविद्यालय सहयोग, अथवा पोलारिस पोर्टल से संबंधित मीडिया पूछताछ के लिए।'
                    )}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-2xl border border-sky-200/80 bg-sky-50/50 space-y-1">
                    <div className="text-sky-900 uppercase font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" /> {trans('Headquarters', 'मुख्यालय')}
                    </div>
                    <div className="text-slate-800 font-medium font-sans mt-1.5 leading-relaxed">
                      {trans(
                        'National Centre for Polar and Ocean Research (NCPOR)\nMinistry of Earth Sciences, Govt. of India\nHeadland Sada, Vasco da Gama, Goa 403804',
                        'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)\nपृथ्वी विज्ञान मंत्रालय, भारत सरकार\nहेडलैंड साडा, वास्को-द-गामा, गोवा 403804'
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-sky-200/80 bg-sky-50/50 space-y-1">
                    <div className="text-sky-900 uppercase font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-600" /> {trans('Digital Outreach', 'डिजिटल संपर्क')}
                    </div>
                    <div className="text-slate-800 font-medium font-sans mt-1.5 leading-relaxed">
                      polaris.outreach@ncpor.res.in (Demo)<br />
                      Portal: polaris.gov.in (Prototype)<br />
                      {trans('SIH 2026 Problem ID: 26063', 'एसआईएच 2026 समस्या आईडी: 26063')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
