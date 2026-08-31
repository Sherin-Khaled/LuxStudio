import type { Dict } from "../useDict";

/**
 * Localized copy for the Houd El Nile case study (`/work/houd-el-nile`).
 * Same pattern as every other dictionary in this project: `en` defined
 * first (its inferred shape is the contract), `ar` typed as `typeof en` so
 * a missing/extra Arabic key is a compile error. The real client/product
 * name ("Houd El Nile") stays untranslated, matching `workPage.ts` and the
 * X Dental case study.
 *
 * This dict has an intentionally different shape from `xDental.ts` — a
 * repositioning/export/multilingual story, not a commerce-scale one — see
 * `HoudElNileCaseStudyBody.tsx` for how it's rendered. Only `hero`,
 * `finalCta`, and `common` need to match `CaseStudySharedCopy` (see
 * `lib/i18n/caseStudies/shared.ts`), since those are the only three the
 * shared `CaseStudyHero`/`CaseStudyFinalCta` components actually read.
 *
 * Every factual claim here is scoped to what was verified in the real Houd
 * El Nile Next.js codebase and its archived legacy WordPress project files
 * — see the case study's own "Trust & Quality" and "Performance" sections
 * for the exact hedges (client-provided figures, no Lighthouse claims, no
 * hreflang/CMS/backend claims).
 */
const en = {
  hero: {
    eyebrow: "Case Study / 02",
    title: "Houd El Nile",
    subtitle: "Premium Agricultural Export Platform",
    headlineLine1: "From Egypt.",
    headlineLine2: "Built for the world.",
    supporting:
      "Repositioning Houd El Nile from a legacy digital presence into a modern international export platform — connecting premium Egyptian produce, quality standards, multilingual content, and buyer enquiries in one experience.",
    metricLabels: {
      languages: "Languages",
      certifications: "Certifications",
      products: "Products",
    },
    services: [
      "UI/UX Design",
      "Brand Repositioning",
      "Next.js Development",
      "Multilingual Experience",
      "Responsive Design",
      "B2B Product UX",
      "SEO Foundations",
    ],
    visitLiveWebsite: "Visit Live Website",
    scrollHint: "Scroll to explore",
  },

  repositioning: {
    eyebrow: "Repositioning",
    headingLine1: "More than a redesign.",
    headingLine2: "A new digital position.",
    body: [
      "Archived legacy WordPress project files — theme, templates, and a full database export — show the company's previous digital presence: a freelance-built theme positioned broadly around “investment and agricultural development.”",
      "The new experience repositions Houd El Nile more clearly around premium agricultural exports — products, quality, logistics, certifications, and enquiry conversion — for an international B2B audience, not a general company brochure site.",
    ],
    mediaCaption: "The archived legacy WordPress theme — kept here only as a restrained reference point for how the company was previously positioned.",
  },

  buyerExperience: {
    eyebrow: "International Buyer Experience",
    heading: "Designed for buyers beyond the border.",
    body: "This is a B2B export experience, not consumer e-commerce. Every page helps an international buyer answer one question at a time — what does this company grow, is it certified, and how do I request it.",
    capabilities: [
      "What Houd El Nile Grows",
      "Product Availability",
      "Varieties",
      "Packing Specifications",
      "Quality Processes",
      "Certifications",
      "Markets Served",
      "Logistics",
      "How To Submit Requirements",
    ],
    mediaCaption: "Products — category browsing built for import buyers, not retail shoppers.",
  },

  productArchitecture: {
    eyebrow: "Product Architecture",
    heading: "Product pages built around export decisions.",
    body: "There is no cart or checkout here. Every product page is structured around the questions an import buyer actually asks — availability, variety, packing, and quality — ending in a single enquiry action, not a purchase.",
    steps: ["Product Hero", "Quick Facts", "Varieties", "Harvest Calendar", "Packing Specs", "Related Products", "Enquiry CTA"],
    mediaCaption: "Product Detail — quick facts and packing specifications, structured around one export decision at a time.",
  },

  multilingual: {
    eyebrow: "Multilingual Experience",
    headingLine1: "Seven languages.",
    headingLine2: "One consistent experience.",
    intro:
      "Seven real, distinctly translated locale files — English, Arabic, French, German, Russian, Spanish, and Chinese — not an automatic translation widget layered on top.",
    languages: ["English", "Arabic", "French", "German", "Russian", "Spanish", "Chinese"],
    flow: ["Visitor", "Cookie", "Browser Language", "GeoIP", "Locale Experience"],
    body: "A saved cookie preference, Accept-Language detection, and a GeoIP fallback work together — in that order — to choose a visitor's language, with Arabic rendered fully right-to-left and English as the safe fallback.",
    note: "One deliberate rule sits inside that logic: Egypt itself defaults to English, not Arabic.",
  },

  systems: {
    eyebrow: "One Experience. Multiple Systems.",
    headingLine1: "One experience.",
    headingLine2: "Multiple systems.",
    body: "Localization, structured product content, and trust-building conversion flows work together to create one international buyer experience.",
    diagram: {
      root: "Houd El Nile",
      systems: ["Localization Engine", "Content Layer", "Trust & Conversion"],
      subsystems: ["Locale Routing", "Product Data", "Buyer Enquiry"],
      convergence: "Global Buyer Experience",
    },
  },

  trust: {
    eyebrow: "Trust & Quality",
    heading: "Trust had to be visible.",
    body: "Seven certification marks, a documented quality process, and cold-chain and traceability language appear directly on the pages an international buyer reads before enquiring — not buried in a downloadable PDF.",
    certificationsLabel: "Certifications Shown On-Site",
    capabilities: ["Traceability", "Quality Process", "Cold-Chain", "Packing", "Export Logistics"],
    caveat:
      "Certain operational figures presented on the site — export volumes, capacity, country counts — are the client's own business information, not figures independently audited by Lux Studio.",
    mediaCaption: "Quality & Process — the certifications and checks shown to buyers before they enquire.",
  },

  conversion: {
    eyebrow: "Conversion",
    heading: "Every path leads to one clear action.",
    body: "Product pages, quality information, and export services all funnel toward the same next step — a real Next.js API route that sends mail through SMTP, not a CRM or marketing-automation platform.",
    steps: ["Product", "Quality / Export Info", "Send Your Requirements", "Contact Enquiry"],
  },

  designSystemSection: {
    eyebrow: "Design System",
    heading: "Built around agriculture, trust, and export.",
    body: "A deep green and amber palette, paired with Montserrat for titles and Inter for body copy, carries the same restrained rhythm across product cards, glass surfaces, and navigation.",
    caveat:
      "Verified against the project's own Tailwind tokens, including named spacing values — a real, working system, not a single perfectly uniform component library end to end.",
    tokensLabel: "Color Tokens",
    elementsLabel: "Interface Elements",
    elements: ["Typography Scale", "Buttons", "Spacing Rhythm", "Glass Cards", "Navigation", "Product Cards", "Imagery"],
    stackLabel: "Verified Stack",
  },

  motion: {
    eyebrow: "Motion",
    heading: "Restrained, consistent motion throughout.",
    body: "A shared scroll-reveal pattern, animated statistics, and dropdown and menu transitions run on Framer Motion across the experience. This case study itself continues using Lux Studio's own motion system, rather than reproducing Houd El Nile's animations directly.",
  },

  performance: {
    eyebrow: "Performance",
    heading: "Fast where it matters, honestly described.",
    body: "WebP media throughout, Next/Image with explicit sizing, dynamic loading of below-the-fold homepage sections, optimized font loading, and static generation of the homepage per locale.",
    caveat:
      "Product detail pages explicitly disable caching rather than pre-render — this isn't a site-wide static-generation story, and no Lighthouse or Web Vitals scores are claimed here.",
  },

  responsive: {
    eyebrow: "Responsive",
    headingLine1: "Global content.",
    headingLine2: "Local to every screen.",
    body: "A dedicated mobile navigation pattern, responsive typography, and responsive Next/Image usage carry through every page — including right-to-left handling on mobile for Arabic, and a horizontally scrollable harvest-availability calendar where a full month-by-month table won't otherwise fit.",
  },

  seo: {
    eyebrow: "SEO",
    heading: "Crawl foundations across seven languages.",
    body: "Localized titles and descriptions, a generated sitemap and robots file, and a translated alt-text strategy were integrated across the seven-language experience.",
  },

  gallery: {
    eyebrow: "Key Screens",
    heading: "The experience, screen by screen.",
    items: {
      home: { title: "Home", caption: "Hero, product entry points, and the first impression for an international buyer." },
      products: { title: "Products", caption: "Category browsing across citrus, grapes, pomegranates, mango, vegetables, and frozen." },
      productDetail: { title: "Product Detail", caption: "Quick facts, varieties, harvest calendar, and packing specifications." },
      qualityProcess: { title: "Quality & Process", caption: "From orchard to container — checks, traceability, and certifications." },
      exportServices: { title: "Export Services", caption: "Packing, cold-chain logistics, and export documentation." },
      about: { title: "About", caption: "Company story, farming roots, and the export markets served." },
      contact: { title: "Contact", caption: "The enquiry funnel every other page leads back to." },
      mobile: { title: "Mobile", caption: "Screens pending — available on request." },
    },
  },

  result: {
    eyebrow: "The Result",
    headingLine1: "From a local digital presence",
    headingLine2: "to a global buyer experience.",
    body: "Houd El Nile was repositioned as a modern international agricultural export platform, bringing products, quality standards, multilingual content, export services, and buyer enquiries into one consistent digital experience.",
  },

  finalCta: {
    eyebrow: "Built by Lux Studio",
    heading: "Have a project that needs this level of care?",
    description: "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
    visitWebsite: "Visit Houd El Nile",
    nextCaseStudy: "Next Case Study",
    comingSoon: "More case studies coming soon",
  },

  common: {
    openInNewTab: (label: string) => `Open ${label} in a new tab`,
    pendingScreen: "Screen coming soon",
    backToWork: "Back to Work",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "دراسة حالة / 02",
    title: "Houd El Nile",
    subtitle: "منصة تصدير زراعي فاخر",
    headlineLine1: "من مصر.",
    headlineLine2: "بُنيت للعالم.",
    supporting:
      "إعادة تموضع Houd El Nile من حضور رقمي قديم إلى منصة تصدير دولية حديثة — تجمع بين المنتجات المصرية الفاخرة، ومعايير الجودة، والمحتوى متعدد اللغات، واستفسارات المشترين في تجربة واحدة.",
    metricLabels: {
      languages: "لغة",
      certifications: "شهادة",
      products: "منتج",
    },
    services: [
      "تصميم واجهات وتجربة المستخدم",
      "إعادة التموضع البصري للعلامة",
      "تطوير باستخدام Next.js",
      "تجربة متعددة اللغات",
      "تصميم متجاوب",
      "تجربة مستخدم لتجارة الشركات",
      "أساسيات تحسين محركات البحث",
    ],
    visitLiveWebsite: "زيارة الموقع المباشر",
    scrollHint: "مرر للاستكشاف",
  },

  repositioning: {
    eyebrow: "إعادة التموضع",
    headingLine1: "أكثر من مجرد إعادة تصميم.",
    headingLine2: "تموضع رقمي جديد.",
    body: [
      "أظهرت ملفات مشروع WordPress القديمة المؤرشفة — القالب والصفحات وقاعدة بيانات كاملة — الحضور الرقمي السابق للشركة: قالب مبني من قِبل مستقل، متمركز بشكل عام حول “الاستثمار والتنمية الزراعية”.",
      "أعادت التجربة الجديدة تموضع Houd El Nile بشكل أوضح حول التصدير الزراعي الفاخر — المنتجات، والجودة، والخدمات اللوجستية، والشهادات، وتحويل الاستفسارات — لجمهور دولي من قطاع الأعمال، لا كموقع تعريفي عام للشركة.",
    ],
    mediaCaption: "قالب WordPress القديم المؤرشف — معروض هنا فقط كمرجع بصري مقتصد لطريقة تموضع الشركة سابقًا.",
  },

  buyerExperience: {
    eyebrow: "تجربة المشتري الدولي",
    heading: "مصممة للمشترين خارج الحدود.",
    body: "هذه تجربة تصدير بين الشركات، وليست تجارة إلكترونية استهلاكية. كل صفحة تساعد المشتري الدولي على الإجابة عن سؤال واحد في كل مرة — ماذا تزرع الشركة، وهل هي معتمدة، وكيف أطلب المنتج.",
    capabilities: [
      "ماذا تزرع Houd El Nile",
      "توفر المنتج",
      "الأصناف",
      "مواصفات التعبئة",
      "عمليات الجودة",
      "الشهادات",
      "الأسواق المخدومة",
      "الخدمات اللوجستية",
      "كيفية إرسال المتطلبات",
    ],
    mediaCaption: "المنتجات — تصفح الفئات مصمم لمشتري الاستيراد، لا لمتسوقي التجزئة.",
  },

  productArchitecture: {
    eyebrow: "بنية صفحة المنتج",
    heading: "صفحات منتجات مبنية حول قرارات التصدير.",
    body: "لا توجد سلة شراء أو إتمام دفع هنا. كل صفحة منتج مبنية حول الأسئلة التي يطرحها مشتري الاستيراد فعليًا — التوفر، والصنف، والتعبئة، والجودة — لتنتهي بإجراء استفسار واحد، لا بعملية شراء.",
    steps: ["واجهة المنتج", "حقائق سريعة", "الأصناف", "تقويم الحصاد", "مواصفات التعبئة", "منتجات ذات صلة", "دعوة للاستفسار"],
    mediaCaption: "تفاصيل المنتج — حقائق سريعة ومواصفات تعبئة، مبنية حول قرار تصدير واحد في كل مرة.",
  },

  multilingual: {
    eyebrow: "التجربة متعددة اللغات",
    headingLine1: "سبع لغات.",
    headingLine2: "تجربة واحدة متسقة.",
    intro:
      "سبعة ملفات ترجمة حقيقية ومترجمة بتميّز — الإنجليزية والعربية والفرنسية والألمانية والروسية والإسبانية والصينية — وليست أداة ترجمة تلقائية مضافة فوق الموقع.",
    languages: ["الإنجليزية", "العربية", "الفرنسية", "الألمانية", "الروسية", "الإسبانية", "الصينية"],
    flow: ["الزائر", "ملف تعريف الارتباط", "لغة المتصفح", "الموقع الجغرافي", "تجربة اللغة"],
    body: "يعمل تفضيل محفوظ في ملف تعريف الارتباط، واكتشاف عبر ترويسة لغة المتصفح، وبديل احتياطي عبر الموقع الجغرافي معًا — بهذا الترتيب — لاختيار لغة الزائر، مع عرض العربية بشكل كامل من اليمين إلى اليسار، والإنجليزية كخيار احتياطي آمن.",
    note: "توجد قاعدة عمل واحدة مقصودة داخل هذا المنطق: مصر نفسها تُعرض افتراضيًا بالإنجليزية، لا بالعربية.",
  },

  systems: {
    eyebrow: "تجربة واحدة. أنظمة متعددة.",
    headingLine1: "تجربة واحدة.",
    headingLine2: "أنظمة متعددة.",
    body: "يعمل نظام تحديد اللغة، ومحتوى المنتج المُهيكل، ومسارات التحويل الباعثة على الثقة معًا لخلق تجربة واحدة للمشتري الدولي.",
    diagram: {
      root: "Houd El Nile",
      systems: ["نظام تحديد اللغة", "طبقة المحتوى", "الثقة والتحويل"],
      subsystems: ["توجيه اللغة", "بيانات المنتج", "استفسار المشتري"],
      convergence: "تجربة مشترٍ عالمية",
    },
  },

  trust: {
    eyebrow: "الثقة والجودة",
    heading: "كان على الثقة أن تكون مرئية.",
    body: "تظهر سبع علامات اعتماد، وعملية جودة موثّقة، ولغة خاصة بسلسلة التبريد وإمكانية التتبع مباشرة على الصفحات التي يقرؤها المشتري الدولي قبل الاستفسار — لا في ملف مخفي.",
    certificationsLabel: "الشهادات المعروضة على الموقع",
    capabilities: ["إمكانية التتبع", "عملية الجودة", "سلسلة التبريد", "التعبئة", "الخدمات اللوجستية للتصدير"],
    caveat:
      "بعض الأرقام التشغيلية المعروضة على الموقع — أحجام التصدير، والطاقة الاستيعابية، وعدد الدول — هي معلومات أعمال مقدَّمة من العميل نفسه، وليست أرقامًا دقّقتها Lux Studio بشكل مستقل.",
    mediaCaption: "الجودة والعملية — الشهادات والفحوصات المعروضة للمشترين قبل الاستفسار.",
  },

  conversion: {
    eyebrow: "التحويل",
    heading: "كل مسار يؤدي إلى إجراء واحد واضح.",
    body: "تتجه صفحات المنتجات، ومعلومات الجودة، وخدمات التصدير جميعها نحو الخطوة التالية نفسها — عبر مسار API حقيقي في Next.js يرسل البريد عبر SMTP، وليس عبر نظام CRM أو منصة أتمتة تسويقية.",
    steps: ["المنتج", "معلومات الجودة / التصدير", "أرسل متطلباتك", "استفسار التواصل"],
  },

  designSystemSection: {
    eyebrow: "نظام التصميم",
    heading: "مبني حول الزراعة والثقة والتصدير.",
    body: "لوحة ألوان بالأخضر الداكن والكهرماني، مقترنة بخط Montserrat للعناوين وخط Inter لنص المحتوى، تحافظ على الإيقاع نفسه المقتصد عبر بطاقات المنتجات، والأسطح الزجاجية، والتنقل.",
    caveat:
      "تم التحقق من هذا النظام مقابل رموز Tailwind الخاصة بالمشروع نفسه، بما في ذلك قيم تباعد مسمّاة — نظام حقيقي وفعّال، وليس مكتبة مكونات موحّدة تمامًا من البداية للنهاية.",
    tokensLabel: "رموز الألوان",
    elementsLabel: "عناصر الواجهة",
    elements: ["مقياس الطباعة", "الأزرار", "إيقاع التباعد", "البطاقات الزجاجية", "التنقل", "بطاقات المنتجات", "الصور"],
    stackLabel: "البنية التقنية الموثّقة",
  },

  motion: {
    eyebrow: "الحركة",
    heading: "حركة مقتصدة ومتسقة في كل مكان.",
    body: "يعمل نمط ظهور مشترك عند التمرير، وإحصاءات متحركة، وانتقالات للقوائم المنسدلة، جميعها عبر Framer Motion في أنحاء التجربة. تستمر دراسة الحالة هذه نفسها في استخدام نظام الحركة الخاص بـ Lux Studio، بدلًا من إعادة إنتاج حركات Houd El Nile مباشرة.",
  },

  performance: {
    eyebrow: "الأداء",
    heading: "سريع حيث يهم، ومُوصَّف بأمانة.",
    body: "وسائط بصيغة WebP في كل مكان، ومكوّن Next/Image بأبعاد صريحة، وتحميل ديناميكي لأقسام الصفحة الرئيسية أسفل الطية، وتحميل خطوط مُحسّن، وتوليد ثابت للصفحة الرئيسية لكل لغة.",
    caveat:
      "تُعطّل صفحات تفاصيل المنتج التخزين المؤقت صراحة بدلًا من التوليد المسبق — هذه ليست قصة توليد ثابت على مستوى الموقع بأكمله، ولا تُدّعى هنا أي نتائج Lighthouse أو Web Vitals.",
  },

  responsive: {
    eyebrow: "التجاوب",
    headingLine1: "محتوى عالمي.",
    headingLine2: "محلي في كل شاشة.",
    body: "يمتد نمط تنقل مخصص للهاتف المحمول، وطباعة متجاوبة، واستخدام متجاوب لمكوّن Next/Image عبر كل صفحة — بما في ذلك معالجة الاتجاه من اليمين إلى اليسار على الهاتف للعربية، وتقويم توفر حصاد قابل للتمرير أفقيًا حيث لا يتسع جدول شهري كامل.",
  },

  seo: {
    eyebrow: "تحسين محركات البحث",
    heading: "أساسيات فهرسة عبر سبع لغات.",
    body: "تم دمج عناوين وأوصاف مترجمة، وملف خريطة موقع وملف robots تم توليدهما، واستراتيجية نص بديل مترجمة عبر التجربة السباعية اللغة.",
  },

  gallery: {
    eyebrow: "الشاشات الرئيسية",
    heading: "التجربة، شاشة تلو الأخرى.",
    items: {
      home: { title: "الرئيسية", caption: "القسم الرئيسي، ونقاط الدخول إلى المنتجات، والانطباع الأول للمشتري الدولي." },
      products: { title: "المنتجات", caption: "تصفح الفئات عبر الحمضيات والعنب والرمان والمانجو والخضروات والمجمدات." },
      productDetail: { title: "تفاصيل المنتج", caption: "حقائق سريعة، وأصناف، وتقويم حصاد، ومواصفات تعبئة." },
      qualityProcess: { title: "الجودة والعملية", caption: "من البستان إلى الحاوية — الفحوصات، وإمكانية التتبع، والشهادات." },
      exportServices: { title: "خدمات التصدير", caption: "التعبئة، والخدمات اللوجستية لسلسلة التبريد، ووثائق التصدير." },
      about: { title: "من نحن", caption: "قصة الشركة، وجذورها الزراعية، وأسواق التصدير المخدومة." },
      contact: { title: "التواصل", caption: "قمع الاستفسارات الذي تؤدي إليه كل صفحة أخرى." },
      mobile: { title: "الهاتف المحمول", caption: "الشاشات قيد التجهيز — متاحة عند الطلب." },
    },
  },

  result: {
    eyebrow: "النتيجة",
    headingLine1: "من حضور رقمي محلي",
    headingLine2: "إلى تجربة مشترٍ عالمية.",
    body: "أُعيد تموضع Houd El Nile كمنصة تصدير زراعي دولية حديثة، جامعةً المنتجات، ومعايير الجودة، والمحتوى متعدد اللغات، وخدمات التصدير، واستفسارات المشترين في تجربة رقمية واحدة متسقة.",
  },

  finalCta: {
    eyebrow: "من إنتاج Lux Studio",
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description: "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
    visitWebsite: "زيارة Houd El Nile",
    nextCaseStudy: "دراسة الحالة التالية",
    comingSoon: "المزيد من دراسات الحالة قريبًا",
  },

  common: {
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    pendingScreen: "الشاشة قادمة قريبًا",
    backToWork: "العودة إلى الأعمال",
  },
};

export type HoudElNileCopy = typeof en;
export const houdElNileCopy: Dict<HoudElNileCopy> = { en, ar };
