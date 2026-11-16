import { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles, BookOpen, Database, Compass, Award } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export interface FAQItem {
  id: string
  categoryEn: string
  categoryHi: string
  qEn: string
  qHi: string
  aEn: string
  aHi: string
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    categoryEn: 'Platform & Purpose',
    categoryHi: 'प्लेटफ़ॉर्म एवं उद्देश्य',
    qEn: 'What is POLARIS and what problem does it solve?',
    qHi: 'POLARIS क्या है और यह किस समस्या का समाधान करता है?',
    aEn: "POLARIS (Polar Knowledge & Outreach Platform) is India's sovereign digital gateway for polar and cryosphere mission intelligence, created for Smart India Hackathon 2026 (Problem Statement ID: 26063). Supported by the Ministry of Earth Sciences (MoES) and the National Centre for Polar and Ocean Research (NCPOR), it unifies 44 years of Antarctic, Arctic, Southern Ocean, and Himalayan expeditions, open datasets, and scientific outreach for researchers, students, and citizens.",
    aHi: 'POLARIS (ध्रुवीय ज्ञान एवं आउटरीच प्लेटफ़ॉर्म) भारत का संप्रभु डिजिटल पोर्टल है, जिसे स्मार्ट इंडिया हैकाथॉन 2026 (समस्या कोड: 26063) के अंतर्गत पृथ्वी विज्ञान मंत्रालय (MoES) एवं राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR) के मार्गदर्शन में विकसित किया गया है। यह 44 वर्षों के अंटार्कटिक, आर्कटिक, दक्षिणी महासागर और हिमालयी अभियानों, ओपन डेटा और वैज्ञानिक ज्ञान को जन-जन तक पहुँचाता है।',
  },
  {
    id: 'faq-2',
    categoryEn: 'Sovereign Stations',
    categoryHi: 'ध्रुवीय अनुसंधान केंद्र',
    qEn: "What are India's permanent research stations in Antarctica and the Arctic?",
    qHi: 'अंटार्कटिका और आर्कटिक में भारत के स्थायी अनुसंधान केंद्र कौन से हैं?',
    aEn: "India operates two active year-round research stations in Antarctica: Bharati (Larsemann Hills, commissioned 2012) and Maitri (Schirmacher Oasis, commissioned 1989), following its historic first base Dakshin Gangotri (1983–1990). In the Arctic, India maintains Himadri Station at Ny-Ålesund, Svalbard (commissioned 2008), the IndARC underwater mooring observatory in Kongsfjorden, and the high-altitude Himansh base in the Himalayas.",
    aHi: 'भारत अंटार्कटिका में दो सक्रिय वर्षभर संचालित अनुसंधान केंद्र संचालित करता है: भारती (लार्समैन हिल्स, 2012) और मैत्री (शिर्माकर ओएसिस, 1989)। भारत का पहला ऐतिहासिक केंद्र दक्षिण गंगोत्री (1983-1990) था। आर्कटिक में भारत का हिमाद्री स्टेशन (Ny-Ålesund, स्वालबार्ड, 2008) और IndARC गहरे समुद्र की वेधशाला स्थित है, तथा हिमालय में हिमांश बेस स्थित है।',
  },
  {
    id: 'faq-3',
    categoryEn: 'Expeditions',
    categoryHi: 'ध्रुवीय अभियान',
    qEn: 'How many scientific expeditions has India conducted to Antarctica?',
    qHi: 'भारत ने अब तक अंटार्कटिका में कितने वैज्ञानिक अभियान पूरे किए हैं?',
    aEn: 'India has successfully conducted 44 annual scientific expeditions to Antarctica (ISEA) since 1981. The flagship 44th Indian Antarctic Expedition mobilized 72 scientists, resupplying Maitri and Bharati aboard MV Vasiliy Golovnin with over 1,240 MT of supplies and executing cutting-edge ice coring and atmospheric black carbon surveys under the Madrid Environmental Protocol.',
    aHi: 'भारत 1981 से अब तक अंटार्कटिका के लिए 44 वार्षिक वैज्ञानिक अभियान (ISEA) सफलतापूर्वक आयोजित कर चुका है। 44वें अंटार्कटिक अभियान में 72 वैज्ञानिकों का दल शामिल था, जिसने MV Vasiliy Golovnin पोत के माध्यम से मैत्री और भारती बेस पर 1,240 मीट्रिक टन रसद पहुँचाई और बर्फ कोरिंग व ब्लैक कार्बन पर गहन शोध किया।',
  },
  {
    id: 'faq-4',
    categoryEn: 'Open Data',
    categoryHi: 'ओपन डेटासेट',
    qEn: 'Can researchers and students freely download polar datasets from POLARIS?',
    qHi: 'क्या शोधकर्ता और छात्र POLARIS से ध्रुवीय डेटासेट निःशुल्क डाउनलोड कर सकते हैं?',
    aEn: 'Yes, 100% of datasets on POLARIS are open access under the National Polar Data Centre (NPDC · NCPOR) protocols. Datasets include Maitri atmospheric black carbon arrays, Southern Ocean full-depth CTD hydrographic transects (0–4,500m), Himalayan glacier mass balances, and satellite cryosphere altimetry in standardized CSV and NetCDF formats.',
    aHi: 'हाँ, POLARIS पर उपलब्ध सभी डेटासेट राष्ट्रीय ध्रुवीय डेटा केंद्र (NPDC · NCPOR) के नियमों के तहत 100% ओपन एक्सेस हैं। शोधकर्ता और छात्र मैत्री के वायुमंडलीय ब्लैक कार्बन, दक्षिणी महासागर के CTD हाइड्रोग्राफिक प्रोफाइल (0–4,500 मी गहराई) और हिमालयी ग्लेशियर मास बैलेंस को CSV व NetCDF में डाउनलोड कर सकते हैं।',
  },
  {
    id: 'faq-5',
    categoryEn: 'AI Science Guide',
    categoryHi: 'एआई विज्ञान सहायक',
    qEn: 'How does POLARIS AI work and what knowledge sources does it reference?',
    qHi: 'POLARIS AI कैसे कार्य करता है और यह किन स्रोतों से जानकारी प्राप्त करता है?',
    aEn: "POLARIS AI is a lightweight, grounded science assistant designed to explain complex polar science in accessible language. It does not fabricate information; it draws directly from POLARIS's curated repository of Indian expeditions, station telemetry, NCPOR peer-reviewed publications, and open datasets.",
    aHi: 'POLARIS AI एक विशेष वैज्ञानिक सहायक है जो जटिल ध्रुवीय विज्ञान को सरल भाषा में समझाता है। यह मनगढ़ंत उत्तर नहीं देता, बल्कि सीधे POLARIS के आधिकारिक अभियान डेटा, स्टेशन टेलीमेट्री, NCPOR के शोध पत्रों और ओपन डेटासेट से सत्यापित जानकारी प्रदान करता है।',
  },
  {
    id: 'faq-6',
    categoryEn: 'Citations & E-E-A-T',
    categoryHi: 'उद्धरण एवं प्रमाणिकता',
    qEn: 'How should academic institutions and publications cite POLARIS?',
    qHi: 'शैक्षणिक संस्थान और शोध पत्र POLARIS को कैसे उद्धृत (Cite) कर सकते हैं?',
    aEn: 'Scientific works can cite the portal as: NCPOR / MoES (2026). POLARIS: India\'s Sovereign Polar & Cryosphere Mission Intelligence Portal. Ministry of Earth Sciences, Govt. of India. Every individual dataset and paper includes a persistent DOI, ready-to-copy APA citation, and direct links to the official NPDC repository.',
    aHi: 'वैज्ञानिक शोध पत्रों में उद्धरण प्रारूप: NCPOR / MoES (2026). POLARIS: India\'s Sovereign Polar & Cryosphere Mission Intelligence Portal. Ministry of Earth Sciences, Govt. of India. प्रत्येक डेटासेट और प्रकाशन के साथ स्थायी DOI और कॉपी करने योग्य APA उद्धरण उपलब्ध हैं।',
  },
  {
    id: 'faq-7',
    categoryEn: 'Accessibility',
    categoryHi: 'पहुंच एवं भाषा',
    qEn: 'Is POLARIS accessible in Indian regional languages and high-contrast modes?',
    qHi: 'क्या POLARIS भारतीय भाषाओं और हाई-कॉन्ट्रास्ट मोड में सुलभ है?',
    aEn: 'Yes. POLARIS features complete bilingual localization in English and Hindi (हिन्दी), adheres to WCAG AA accessibility standards, and offers both Glacial Light and Polar Night dark themes optimized for low-bandwidth and variable outdoor field display environments.',
    aHi: 'हाँ, POLARIS में अंग्रेजी और हिन्दी का पूर्ण द्विभाषी समर्थन है, यह WCAG AA एक्सेसिबिलिटी मानकों का पालन करता है, और इसमें ग्लेशियल लाइट व ध्रुवीय रात्रि डार्क मोड शामिल हैं।',
  },
  {
    id: 'faq-8',
    categoryEn: 'Education',
    categoryHi: 'शिक्षा एवं प्रमाणन',
    qEn: 'What educational tools and certifications does POLARIS offer for students?',
    qHi: 'POLARIS छात्रों के लिए कौन से शैक्षिक उपकरण और प्रमाण पत्र प्रदान करता है?',
    aEn: 'POLARIS includes an interactive Polar Science Curriculum with 4 comprehensive learning modules (Antarctica, Arctic, Himalayas, and Climate Teleconnections). Students can complete quizzes to earn a cryptographically verified, downloadable Polar Science Scholar Certificate.',
    aHi: 'POLARIS में 4 व्यापक शिक्षण मॉड्यूल (अंटार्कटिका, आर्कटिक, हिमालय और जलवायु टेलीकनेक्शन) के साथ इंटरैक्टिव पाठ्यक्रम शामिल है। छात्र क्विज़ पूरा करके सत्यापित पोलर साइंस स्कॉलर प्रमाण पत्र डाउनलोड कर सकते हैं।',
  },
]

export default function FAQSection() {
  const { isHindi, trans } = useLanguage()
  const [openId, setOpenId] = useState<string | null>('faq-1')

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  // Schema.org FAQPage JSON-LD with Speakable Specification for Voice Search
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#faq-heading', '.faq-question', '.faq-answer'],
    },
    mainEntity: FAQ_DATA.map(item => ({
      '@type': 'Question',
      name: isHindi ? item.qHi : item.qEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isHindi ? item.aHi : item.aEn,
      },
    })),
  }

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 border-t border-sky-200/80 dark:border-slate-800/80 bg-gradient-to-b from-[#e6f3fa]/50 via-white/40 to-[#d6ecf9]/40 dark:from-[#091724]/60 dark:via-[#07131e]/50 dark:to-[#0b1d2e]/60"
    >
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-prose max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-900 dark:text-cyan-300 shadow-2xs mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{trans('Frequently Asked Questions · AEO Knowledge Hub', 'अक्सर पूछे जाने वाले प्रश्न · ज्ञान केंद्र')}</span>
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 dark:text-white tracking-tight"
          >
            {trans(
              "India's Polar Mission: Clear Answers & Sovereign Science",
              'भारत का ध्रुवीय मिशन: स्पष्ट उत्तर एवं संप्रभु विज्ञान'
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {trans(
              'Authoritative answers verified by NCPOR & MoES documentation for researchers, students, and answer engines exploring Indian Polar Science.',
              'भारतीय ध्रुवीय विज्ञान पर शोधकर्ताओं, छात्रों और एआई आंसर इंजनों के लिए NCPOR एवं MoES द्वारा सत्यापित प्रामाणिक उत्तर।'
            )}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map(item => {
            const isOpen = openId === item.id
            const question = isHindi ? item.qHi : item.qEn
            const answer = isHindi ? item.aHi : item.aEn
            const category = isHindi ? item.categoryHi : item.categoryEn

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white/95 dark:bg-slate-900/95 border-cyan-400/80 dark:border-cyan-500/60 shadow-md shadow-sky-500/5'
                    : 'bg-white/70 dark:bg-slate-900/60 border-sky-200/80 dark:border-slate-800/80 hover:border-sky-300 dark:hover:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-900/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="space-y-1 pr-2">
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      {category}
                    </span>
                    <h3 className="faq-question text-base sm:text-lg font-display font-semibold text-slate-900 dark:text-white leading-snug">
                      {question}
                    </h3>
                  </div>
                  <div
                    className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-cyan-500 text-white border-cyan-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 border-t border-sky-100 dark:border-slate-800/80 leading-relaxed animate-in fade-in duration-150">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
