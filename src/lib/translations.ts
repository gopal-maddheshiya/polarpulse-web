export type Language = 'EN' | 'HI'

export interface TranslationDict {
  [key: string]: {
    en: string
    hi: string
  }
}

export const translations: TranslationDict = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'गृह' },
  'nav.explore': { en: 'Explore', hi: 'अन्वेषण' },
  'nav.expeditions': { en: 'Expeditions', hi: 'अभियान' },
  'nav.knowledge': { en: 'Knowledge', hi: 'ज्ञान केंद्र' },
  'nav.datasets': { en: 'Datasets', hi: 'डेटासेट' },
  'nav.education': { en: 'Education', hi: 'शिक्षा' },
  'nav.media': { en: 'Media', hi: 'मीडिया' },
  'nav.communicator': { en: 'Communicator', hi: 'संवादक' },
  'nav.about': { en: 'About', hi: 'परिचय' },
  'nav.search': { en: 'Search repository', hi: 'रिपॉजिटरी खोजें' },
  'nav.search_placeholder': { en: 'Search across expeditions, datasets, research…', hi: 'अभियान, डेटासेट, अनुसंधान खोजें…' },
  'nav.explore_data': { en: 'Explore Data', hi: 'डेटा देखें' },
  'nav.ministry_sub': { en: 'MoES · National Centre for Polar and Ocean Research', hi: 'पृथ्वी विज्ञान मंत्रालय · राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र' },
  'nav.tagline': { en: "India's Polar Knowledge & Outreach Platform", hi: 'भारत का ध्रुवीय ज्ञान एवं आउटरीच मंच' },
  'nav.switch_lang': { en: 'हिन्दी', hi: 'English' },

  // General Actions & Badges
  'action.back': { en: 'Back', hi: 'वापस' },
  'action.read_more': { en: 'Read More', hi: 'और पढ़ें' },
  'action.explore_data': { en: 'Explore Data', hi: 'डेटा अन्वेषण करें' },
  'action.view_details': { en: 'View Details', hi: 'विवरण देखें' },
  'action.download': { en: 'Download', hi: 'डाउनलोड' },
  'action.cite': { en: 'Cite', hi: 'उद्धरण' },
  'action.copied': { en: 'Copied', hi: 'कॉपी हुआ' },
  'action.clear': { en: 'Clear', hi: 'साफ़ करें' },
  'action.reset': { en: 'Reset', hi: 'रीसेट' },
  'action.retry': { en: 'Retry', hi: 'पुनः प्रयास करें' },
  'action.close': { en: 'Close', hi: 'बंद करें' },
  'action.next': { en: 'Next', hi: 'अगला' },
  'action.filter': { en: 'Filter', hi: 'फ़िल्टर' },
  'action.all': { en: 'All', hi: 'सभी' },

  // States
  'state.loading': { en: 'Loading polar knowledge...', hi: 'ध्रुवीय ज्ञान लोड हो रहा है...' },
  'state.error': { en: 'Unable to load this content. Please try again.', hi: 'सामग्री लोड करने में असमर्थ। कृपया पुन: प्रयास करें।' },
  'state.not_found': { en: 'Polar knowledge not found.', hi: 'ध्रुवीय जानकारी नहीं मिली।' },
  'state.no_results': { en: 'No results found matching your criteria.', hi: 'आपकी खोज से मेल खाने वाले कोई परिणाम नहीं मिले।' },

  // Home Hero & Banner
  'home.hero.badge': { en: 'NATIONAL POLAR SCIENCE PORTAL · GOVT. OF INDIA', hi: 'राष्ट्रीय ध्रुवीय विज्ञान पोर्टल · भारत सरकार' },
  'home.hero.title': { en: "Sovereign Polar Knowledge & Scientific Outreach", hi: 'भारत का संप्रभु ध्रुवीय ज्ञान एवं वैज्ञानिक आउटरीच' },
  'home.hero.subtitle': {
    en: "Official repository of India's 44-year scientific presence across Antarctica, the Arctic, the Southern Ocean, and the High Himalayas. Lead agency: National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences.",
    hi: 'अंटार्कटिका, आर्कटिक, दक्षिणी महासागर और उच्च हिमालय में भारत की 44 वर्षों की निरंतर वैज्ञानिक उपस्थिति का आधिकारिक डिजिटल अभिलेखागार। नोडल एजेंसी: राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR), पृथ्वी विज्ञान मंत्रालय।',
  },
  'home.hero.cta_expeditions': { en: 'Explore Expeditions', hi: 'वैज्ञानिक अभियान देखें' },
  'home.hero.cta_data': { en: 'Access Open Datasets', hi: 'ओपन डेटासेट देखें' },
  'home.hero.cta_ai': { en: 'Ask POLARIS AI', hi: 'पोलारिस एआई से पूछें' },
  'home.hero.stats.expeditions': { en: 'Consecutive Antarctic Campaigns', hi: 'निरंतर अंटार्कटिक अभियान' },
  'home.hero.stats.stations': { en: 'Permanent Polar Stations', hi: 'स्थायी ध्रुवीय अनुसंधान केंद्र' },
  'home.hero.stats.datasets': { en: 'Open Access Research Datasets', hi: 'ओपन रिसर्च डेटासेट' },
  'home.hero.stats.years': { en: 'Years of Polar Science (Since 1981)', hi: 'वर्षों का ध्रुवीय अनुसंधान (1981 से)' },

  // Home Sections
  'home.stations.eyebrow': { en: 'SOVEREIGN RESEARCH BASES', hi: 'भारत के स्थायी अनुसंधान केंद्र' },
  'home.stations.title': { en: "India's Polar Research Infrastructure", hi: 'भारत का ध्रुवीय अनुसंधान बुनियादी ढाँचा' },
  'home.stations.sub': {
    en: 'Operating permanent bases in Antarctica (Maitri & Bharati) and the Arctic (Himadri), supported by atmospheric observatories in the Himalayas (Himansh).',
    hi: 'अंटार्कटिका में स्थायी केंद्र (मैत्री एवं भारती) और आर्कटिक में (हिमाद्रि), तथा हिमालय में क्रायोस्फेरिक वेधशाला (हिमांशु) का संचालन।',
  },
  'home.expeditions.eyebrow': { en: 'EXPEDITION LOGS', hi: 'वैज्ञानिक अभियान लॉग' },
  'home.expeditions.title': { en: 'Flagship Scientific Missions', hi: 'प्रमुख राष्ट्रीय ध्रुवीय मिशन' },
  'home.expeditions.sub': {
    en: 'Chronological documentation of Antarctic, Arctic, and Southern Ocean campaigns supporting climate, geology, and atmospheric research.',
    hi: 'जलवायु, भूविज्ञान और वायुमंडलीय अनुसंधान को समर्पित अंटार्कटिक, आर्कटिक और दक्षिणी महासागर अभियानों का कालानुक्रमिक विवरण।',
  },
  'home.datasets.eyebrow': { en: 'OPEN SCIENCE REPOSITORY', hi: 'ओपन साइंस रिपॉजिटरी' },
  'home.datasets.title': { en: 'In-Situ Observation Data', hi: 'प्रत्यक्ष प्रेक्षण एवं डेटासेट' },
  'home.datasets.sub': {
    en: 'Standardized datasets compliant with NCPOR data policy. Meteorological time series, oceanographic CTD casts, and ice core profiles.',
    hi: 'एनसीपीओआर डेटा नीति के अनुरूप मानकीकृत डेटासेट। मौसम विज्ञान समय-श्रृंखला, महासागरीय सीटीडी प्रोफाइल और आइस कोर रिकॉर्ड।',
  },
  'home.education.eyebrow': { en: 'SMART EDUCATION · SIH 2026', hi: 'स्मार्ट शिक्षा · एसआईएच 2026' },
  'home.education.title': { en: 'Interactive Polar Science Laboratory', hi: 'इंटरैक्टिव ध्रुवीय विज्ञान प्रयोगशाला' },
  'home.education.sub': {
    en: 'Bilingual, dual-lens learning platform calibrated for school students and university researchers with interactive comprehension tests.',
    hi: 'स्कूली विद्यार्थियों और विश्वविद्यालय शोधकर्ताओं के लिए द्विभाषी, दोहरे दृष्टिकोण वाली शिक्षण प्रणाली और इंटरैक्टिव क्विज़।',
  },
  'home.telemetry.title': { en: 'Real-Time Polar Telemetry', hi: 'रीयल-टाइम ध्रुवीय टेलीमेट्री' },
  'home.telemetry.sub': { en: 'Live environmental monitoring from Maitri and Bharati Automatic Weather Stations', hi: 'मैत्री एवं भारती स्वचालित मौसम केंद्रों (AWS) से लाइव पर्यावरणीय निगरानी' },

  // Expeditions Page
  'expeditions.header.eyebrow': { en: 'National Polar Expeditions', hi: 'राष्ट्रीय ध्रुवीय अभियान' },
  'expeditions.header.title': { en: "India's Polar Expedition Registry", hi: 'भारत की ध्रुवीय अभियान रजिस्ट्री' },
  'expeditions.header.sub': {
    en: 'The complete sovereign operational record of Indian Scientific Expeditions to Antarctica, the Arctic, the Southern Ocean, and the High Altitude Himalayas since 1981.',
    hi: '1981 से अंटार्कटिका, आर्कटिक, दक्षिणी महासागर और उच्च हिमालय में भारतीय वैज्ञानिक अभियानों का संप्रभु परिचालन रिकॉर्ड।',
  },
  'expeditions.filter.logs': { en: 'Filter Expedition Logs', hi: 'अभियान लॉग फ़िल्टर करें' },
  'expeditions.filter.all_years': { en: 'All Voyage Years', hi: 'सभी अभियान वर्ष' },
  'expeditions.filter.all_regions': { en: 'All Polar Regions', hi: 'सभी ध्रुवीय क्षेत्र' },
  'expeditions.filter.all_areas': { en: 'All Science Disciplines', hi: 'सभी विज्ञान विषय' },

  // Datasets Page
  'datasets.header.eyebrow': { en: 'Open Scientific Data', hi: 'ओपन साइंटिफिक डेटा' },
  'datasets.header.title': { en: 'Polar Dataset Registry', hi: 'ध्रुवीय डेटासेट रजिस्ट्री' },
  'datasets.header.sub': {
    en: 'Observational in-situ datasets, automated weather station feeds, CTD ocean transects and ice-core stratigraphy collected across India’s polar campaigns.',
    hi: 'भारत के ध्रुवीय अभियानों के दौरान एकत्रित प्रत्यक्ष प्रेक्षण डेटासेट, स्वचालित मौसम केंद्र फीड, महासागरीय सीटीडी और आइस-कोर प्रोफाइल।',
  },
  'datasets.search_placeholder': { en: 'Search by parameter, location, variable (e.g. black carbon, CTD, Maitri)…', hi: 'मापदंड, स्थान, वेरिएबल खोजें (जैसे ब्लैक कार्बन, सीटीडी, मैत्री)…' },

  // Publications Page
  'publications.header.eyebrow': { en: 'Scholarly Research Library', hi: 'शोध अनुसंधान पुस्तकालय' },
  'publications.header.title': { en: 'Peer-Reviewed Publications', hi: 'समीक्षित शोध प्रकाशन' },
  'publications.header.sub': {
    en: 'Index of peer-reviewed journal papers, expedition monographs, and technical reports authored by Indian polar scientists across NCPOR, NIO, IITM, and partner universities.',
    hi: 'एनसीपीओआर, एनआईओ, आईआईटीएम और भागीदार विश्वविद्यालयों के भारतीय वैज्ञानिकों द्वारा लिखित सहकर्मी-समीक्षित शोध पत्र और रिपोर्टें।',
  },
  'publications.search_placeholder': { en: 'Search by title, author, keyword, or journal…', hi: 'शीर्षक, लेखक, कीवर्ड या पत्रिका द्वारा खोजें…' },

  // Knowledge Page
  'knowledge.header.eyebrow': { en: 'Open Knowledge Repository', hi: 'ओपन नॉलेज रिपॉजिटरी' },
  'knowledge.header.title': { en: 'Polar Knowledge Hub', hi: 'ध्रुवीय ज्ञान केंद्र' },
  'knowledge.header.sub': {
    en: 'The consolidated digital archive of polar research papers, expedition reports, educational curriculums, data catalogs, and field science dispatches.',
    hi: 'ध्रुवीय शोध पत्रों, अभियान रिपोर्टों, शैक्षिक पाठ्यचर्या, डेटा कैटलॉग और फील्ड विज्ञान रिपोर्टों का एकीकृत डिजिटल संग्रह।',
  },
  'knowledge.search_placeholder': { en: 'Search articles, reports, field stories, tutorials…', hi: 'लेख, रिपोर्ट, फील्ड डायरी, ट्यूटोरियल खोजें…' },

  // Education Page
  'education.header.eyebrow': { en: 'Smart Education Platform', hi: 'स्मार्ट शिक्षा मंच' },
  'education.header.title': { en: 'Interactive Polar Science Laboratory', hi: 'इंटरैक्टिव ध्रुवीय विज्ञान प्रयोगशाला' },
  'education.header.sub': {
    en: 'Calibrated for schools, colleges and university researchers. Switch between foundational concepts and scientific rigor, inspect direct expedition evidence, and test your knowledge.',
    hi: 'स्कूलों, कॉलेजों और शोधकर्ताओं के लिए तैयार। सरल आधारभूत अवधारणाओं और अकादमिक विवरण के बीच स्विच करें, प्रत्यक्ष साक्ष्य देखें और क्विज़ दें।',
  },
  'education.modules': { en: 'Curriculum Modules', hi: 'पाठ्यचर्या मॉड्यूल' },
  'education.foundational': { en: 'Foundational (Student)', hi: 'सरल व्याख्या (विद्यार्थी)' },
  'education.academic': { en: 'Academic (Researcher)', hi: 'अकादमिक व्याख्या (शोधकर्ता)' },
  'education.progress': { en: 'Scholar Progress', hi: 'अध्ययन प्रगति' },
  'education.badge_button': { en: 'View Polar Scholar Badge', hi: 'ध्रुवीय विद्वान बैज देखें' },

  // Media Page
  'media.header.eyebrow': { en: 'Visual Science Archive', hi: 'दृश्य विज्ञान पुरालेख' },
  'media.header.title': { en: 'Photographic & Field Media Gallery', hi: 'तस्वीरें एवं फील्ड मीडिया गैलरी' },
  'media.header.sub': {
    en: 'A visual documentary of Indian polar science: expedition ice-sheet operations, atmospheric instrumentation at Maitri, oceanic hydrography, and High Arctic fjord dynamics.',
    hi: 'भारतीय ध्रुवीय विज्ञान का दृश्य दस्तावेज: अभियान संचालन, मैत्री में वायुमंडलीय उपकरण, महासागरीय जल विज्ञान और आर्कटिक फ्योर्ड।',
  },
  'media.tab.all': { en: 'All Media', hi: 'सभी मीडिया' },
  'media.tab.photos': { en: 'Photos', hi: 'तस्वीरें' },
  'media.tab.videos': { en: 'Videos', hi: 'वीडियो' },
  'media.tab.infographics': { en: 'Infographics', hi: 'इन्फोग्राफिक्स' },

  // Footer
  'footer.description': {
    en: "POLARIS is India's sovereign digital platform for polar science outreach, research archiving, and open knowledge dissemination. Built under the aegis of the Ministry of Earth Sciences and NCPOR for Smart India Hackathon 2026.",
    hi: 'पोलारिस ध्रुवीय विज्ञान आउटरीच, अनुसंधान अभिलेखागार और खुले ज्ञान प्रसार के लिए भारत का संप्रभु डिजिटल मंच है। स्मार्ट इंडिया हैकथॉन 2026 के लिए पृथ्वी विज्ञान मंत्रालय एवं एनसीपीओआर के तत्वावधान में निर्मित।',
  },
  'footer.col.nav': { en: 'Navigation', hi: 'नेविगेशन' },
  'footer.col.research': { en: 'Polar Research', hi: 'ध्रुवीय अनुसंधान' },
  'footer.col.institutional': { en: 'Institutional', hi: 'संस्थागत लिंक' },
  'footer.copyright': {
    en: '© 2026 POLARIS · Ministry of Earth Sciences (MoES) · National Centre for Polar and Ocean Research (NCPOR), Goa. All rights reserved.',
    hi: '© 2026 पोलारिस · पृथ्वी विज्ञान मंत्रालय (MoES) · राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR), गोवा। सर्वाधिकार सुरक्षित।',
  },

  // AI Assistant
  'ai.title': { en: 'POLARIS AI', hi: 'पोलारिस एआई' },
  'ai.subtitle': { en: "Your guide to India's polar science", hi: 'भारत के ध्रुवीय विज्ञान का आपका मार्गदर्शक' },
  'ai.button': { en: 'Ask POLARIS', hi: 'पोलारिस से पूछें' },
  'ai.placeholder': { en: "Ask anything about India's polar research...", hi: 'भारत के ध्रुवीय अनुसंधान के बारे में कुछ भी पूछें...' },
  'ai.mode.student': { en: 'Student', hi: 'विद्यार्थी' },
  'ai.mode.general': { en: 'General', hi: 'सामान्य' },
  'ai.mode.teacher': { en: 'Teacher', hi: 'शिक्षक' },
  'ai.mode.researcher': { en: 'Researcher', hi: 'शोधकर्ता' },
}
