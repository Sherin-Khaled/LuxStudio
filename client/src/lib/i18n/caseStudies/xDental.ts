import type { Dict } from "../useDict";

/**
 * Localized copy for the X Dental case study (`/work/x-dental`). Follows the
 * same pattern as every other dictionary in this project: `en` defined
 * first (its inferred shape is the contract), `ar` typed as `typeof en` so
 * a missing/extra Arabic key is a compile error. Real client/product name
 * ("X Dental") and technical proper nouns stay untranslated, matching
 * `workPage.ts`.
 *
 * Every factual claim here is scoped to what was verified in the real
 * X Dental codebase — no invented percentages, no unverified integrations
 * (see the case study's own "Commercial Reliability" / "Design System"
 * sections for the exact hedges).
 */
const en = {
  hero: {
    eyebrow: "Case Study / 01",
    title: "X Dental",
    subtitle: "Dental Supplies E-commerce Platform",
    headlineLine1: "12,942 products.",
    headlineLine2: "One connected experience.",
    supporting:
      "Designing and building a dental commerce platform where catalogue scale, professional specialty, location, operations, and purchasing work as one connected system.",
    metricLabels: {
      products: "Products",
      brands: "Brands",
      categories: "Categories",
    },
    services: [
      "Strategy",
      "UI/UX Design",
      "Frontend",
      "Backend",
      "E-commerce",
      "Database Architecture",
      "Performance",
      "Admin Systems",
    ],
    visitLiveWebsite: "Visit Live Website",
    scrollHint: "Scroll to explore",
  },

  overview: {
    eyebrow: "Overview",
    heading: "A large catalogue was only the starting point.",
    paragraphs: [
      "X Dental was created for dental professionals who needed access to a broad catalogue of products and brands without the experience feeling like an overwhelming marketplace.",
      "The founder, a doctor and dental supplier, wanted to create a unique commerce platform designed specifically around the way doctors and clinics discover, evaluate, and purchase dental supplies.",
      "With 12,942 products across 607 brands and 218 categories, the challenge was not simply putting products online.",
      "The challenge was making that scale feel simple.",
    ],
  },

  challenge: {
    eyebrow: "The Core Challenge",
    heading: "How do you make 12,942 products feel easy to navigate?",
    body: "At this scale, product discovery, catalogue structure, filtering, performance, and information architecture become part of the core product experience. The interface needed to help professionals reach highly specific products without forcing them through hundreds of irrelevant results, while the application still needed to remain responsive as the catalogue grew.",
    nodes: {
      catalogueScale: { label: "Catalogue Scale", result: "Product Discovery" },
      specialty: { label: "Professional Specialty", result: "Personalization" },
      location: { label: "Clinic Location", result: "Contextual Delivery" },
      operations: { label: "Business Operations", result: "Admin & Permissions" },
    },
  },

  discovery: {
    eyebrow: "Search & Product Discovery",
    heading: "Find one product inside thousands.",
    intro:
      "The platform combines structured search, category hierarchy, brand discovery, filtering, availability, and merchandising filters to reduce catalogue complexity — not an AI-ranked or semantic search engine, but a deliberately structured system built for how professionals actually narrow down a catalogue.",
    capabilities: [
      "Product name search",
      "SKU search",
      "Brand search",
      "Category search",
      "Parent + descendant category filtering",
      "Brand filters",
      "Min / max price",
      "In-stock",
      "Out-of-stock",
      "Low-stock",
      "Weekly Offers",
      "Best Sellers",
      "New Arrivals",
      "Hot Deals",
      "Fast Delivery",
      "Sorting",
      "Pagination",
      "Autocomplete-style product suggestions",
    ],
    mediaCaption: "Category browsing on the live X Dental catalogue.",
  },

  personalization: {
    eyebrow: "Personalization",
    heading: "The store changes with the professional using it.",
    diagram: {
      user: "User",
      specialty: "Specialty",
      location: "Location",
      clinicEssentials: "Clinic Essentials",
      delivery: "Delivery Context / Offers",
    },
  },

  clinicEssentials: {
    eyebrow: "Clinic Essentials",
    heading: "Products that already match the professional.",
    body: "Instead of forcing every professional through the same catalogue, X Dental uses the user's dental specialty — captured and persisted on their account — to surface products more relevant to their field.",
    goalLine1: "Reduce searching.",
    goalLine2: "Increase relevance.",
    mediaCaption: "Clinic Branches — professional specialty and saved locations, managed from the account.",
  },

  delivery: {
    eyebrow: "Location-Aware Delivery",
    headingLine1: "Right offer.",
    headingLine2: "Right zone.",
    headingLine3: "Right day.",
    body: "Customers can save clinic locations, and each saved location is linked to a delivery zone. Delivery offers can target specific zones and follow day-of-week recurrence, so a customer whose saved location matches a zone's active offer sees the relevant delivery terms at checkout.",
    points: [
      "Clinic locations are saved to the account, not required at signup",
      "Each saved location is linked to a named delivery zone",
      "Delivery offers can target specific zones",
      "Offers can follow day-of-week recurrence",
      "Matching offers apply automatically at checkout",
    ],
  },

  designSystemSection: {
    eyebrow: "Design System",
    heading: "Designed for professional commerce.",
    body: "The interface is built on a cream-and-gold visual language — gold reserved for primary actions, pricing emphasis, and selected states rather than used decoratively — supported by soft glass surfaces, restrained blue accents, and a clear typographic hierarchy suited to information-dense product pages.",
    caveat:
      "Built with a Tailwind v4 CSS-variable token system plus a reusable UI component layer on Radix primitives — a real, working system, not a single perfectly uniform component library end to end.",
    tokensLabel: "Color Tokens",
    elementsLabel: "Interface Elements",
    elements: ["Primary Actions", "Typography Hierarchy", "Product Cards", "Chips & Badges", "Inputs & Filters", "Glass Surfaces"],
  },

  scaleSection: {
    eyebrow: "At Scale",
    heading: "The numbers behind the catalogue.",
  },

  architecture: {
    eyebrow: "Full-Stack Architecture",
    headingLine1: "One experience.",
    headingLine2: "Multiple systems.",
    body: "A React and TypeScript frontend, an Express and Prisma backend, and a PostgreSQL database work together behind a single storefront — with the same catalogue and business logic also powering an internal operations dashboard.",
    nodes: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      ux: "UX",
      businessLogic: "Business Logic",
      dataScale: "Data at Scale",
      dashboard: "Dashboard",
      operations: "Operations",
    },
    stackLabel: "Verified Stack",
  },

  reliability: {
    eyebrow: "Commerce Reliability",
    heading: "Checkout has to work every time.",
    body: "Beneath the storefront, a set of server-side systems keep pricing, stock, and orders consistent — so a duplicate click, a stale price, or two customers buying the last unit at once don't become a support ticket.",
    capabilities: [
      "Server-side cart logic",
      "Stock availability checks",
      "Order pricing logic",
      "Coupons & promotions",
      "VIP benefits",
      "Order idempotency",
      "Order lifecycle management",
      "Delivery pricing",
      "Wishlist",
      "Supply lists",
      "Quotes",
      "Product requests",
    ],
  },

  vip: {
    eyebrow: "VIP & Customer Benefits",
    headingLine1: "Different customers.",
    headingLine2: "Different rules.",
    body: "X Dental supports two customer tiers, and VIP capabilities are enforced on the server, not only shown differently in the interface. The platform can apply different delivery, pricing, and loyalty rules depending on tier — without changing the experience for every other customer.",
    standard: {
      title: "Standard",
      description: "Standard commerce rules",
    },
    vipTier: {
      title: "VIP",
      description: "Custom benefits, delivery privileges, and loyalty differences",
    },
    mediaCaption: "Wallet & Points — loyalty balance and reward activity, from the customer account.",
  },

  admin: {
    eyebrow: "Admin & Permissions",
    heading: "The storefront was only half the product.",
    body: "Operating a catalogue this large required an administrative system capable of managing products, users, promotions, delivery, orders, content, and customer operations without giving every team member unrestricted access.",
    roles: {
      admin: { title: "Admin", description: "Full operational control" },
      support: { title: "Support", description: "Only the permissions explicitly granted" },
      customer: { title: "Customer", description: "Commerce and account access" },
    },
    areasLabel: "Managed Areas",
    areas: [
      "Product Management",
      "Categories",
      "Brands",
      "Variants",
      "Users",
      "Delivery",
      "Promotions",
      "Orders",
      "Loyalty",
      "Support",
      "Product Requests",
      "Quotes",
      "Hero & Content",
    ],
  },

  catalogImport: {
    eyebrow: "Catalogue Import & Data Operations",
    heading: "Scale needed a safer way to manage data.",
    body: "Bringing thousands of products into the catalogue safely meant a workflow that checks itself before anything is written — every import is previewed, classified, and reconciled against existing data before it's applied.",
    steps: ["Preview", "Validate", "Classify", "Resolve Conflicts", "Apply"],
  },

  mediaPipeline: {
    eyebrow: "Product Media Pipeline",
    heading: "Nearly 13,000 products also meant nearly 13,000 visual decisions.",
    body: "A dedicated, admin-run pipeline prepares product imagery before it ever reaches the storefront — an operational workflow, not an automatic runtime service.",
    steps: [
      "Image sourcing",
      "File validation",
      "WebP conversion",
      "Verification",
      "Manifest generation",
      "Duplicate & mismatch checks",
      "Production storage upload",
      "Mapping images back to products",
    ],
  },

  responsive: {
    eyebrow: "Responsive Experience",
    heading: "The catalogue had to remain usable everywhere.",
    body: "Product discovery, filtering, purchasing, and account access are all built to adapt across desktop, tablet, and mobile — a genuinely breakpoint-driven interface, refined through real use rather than a single fixed layout.",
  },

  gallery: {
    eyebrow: "Key Screens",
    heading: "The system, screen by screen.",
    items: {
      home: { title: "Home", caption: "Landing experience and catalogue entry points." },
      discovery: { title: "Categories", caption: "Category browsing and structured discovery." },
      productDetail: { title: "Product Detail", caption: "Variant selection, pricing, and availability." },
      cart: { title: "Cart", caption: "Line items, quantities, and order summary." },
      checkout: { title: "Checkout", caption: "Delivery details and order review." },
      account: { title: "Account", caption: "Order history and account management." },
      clinicLocations: { title: "Clinic Branches", caption: "Saved locations and delivery zones." },
      walletLoyalty: { title: "Wallet & Points", caption: "Loyalty balance and reward activity." },
      quotes: { title: "Quotes", caption: "B2B quote requests and status tracking." },
      support: { title: "Support Tickets", caption: "Customer support conversations." },
      admin: { title: "Admin Dashboard", caption: "Screen pending — available on request." },
      mobile: { title: "Mobile", caption: "Screens pending — available on request." },
    },
  },

  result: {
    eyebrow: "The Result",
    headingLine1: "From thousands of products",
    headingLine2: "to one connected system.",
    body: "X Dental became a scalable dental commerce platform capable of organizing and presenting 12,942 products across 607 brands and 218 categories while supporting product discovery, specialty-based personalization, location-aware delivery logic, commerce flows, customer tiers, role-based administration, responsive interfaces, and the operational systems required to manage a growing catalogue.",
  },

  finalCta: {
    eyebrow: "Built by Lux Studio",
    heading: "Have a project that needs this level of care?",
    description: "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
    visitWebsite: "Visit X Dental",
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
    eyebrow: "دراسة حالة / 01",
    title: "X Dental",
    subtitle: "منصة تجارة إلكترونية لمستلزمات طب الأسنان",
    headlineLine1: "12,942 منتجًا.",
    headlineLine2: "تجربة واحدة متكاملة.",
    supporting:
      "تصميم وبناء منصة تجارة لمستلزمات طب الأسنان، حيث يعمل حجم الكتالوج والتخصص المهني والموقع والعمليات والشراء كنظام واحد متصل.",
    metricLabels: {
      products: "منتج",
      brands: "علامة تجارية",
      categories: "فئة",
    },
    services: [
      "الاستراتيجية",
      "تصميم واجهات وتجربة المستخدم",
      "الواجهة الأمامية",
      "الواجهة الخلفية",
      "تجارة إلكترونية",
      "بنية قواعد البيانات",
      "الأداء",
      "أنظمة الإدارة",
    ],
    visitLiveWebsite: "زيارة الموقع المباشر",
    scrollHint: "مرر للاستكشاف",
  },

  overview: {
    eyebrow: "نظرة عامة",
    heading: "كتالوج بهذا الحجم كان مجرد نقطة البداية.",
    paragraphs: [
      "أُنشئ X Dental لأطباء وعيادات الأسنان الذين يحتاجون إلى الوصول إلى كتالوج واسع من المنتجات والعلامات التجارية، دون أن تشعر التجربة بأنها سوق مزدحم يصعب التعامل معه.",
      "أراد المؤسس، وهو طبيب ومورّد لمستلزمات الأسنان، إنشاء منصة تجارية فريدة مصممة خصيصًا حول الطريقة التي يكتشف بها الأطباء والعيادات المنتجات ويقيّمونها ويشترونها.",
      "بوجود 12,942 منتجًا موزعة على 607 علامة تجارية و218 فئة، لم يكن التحدي مجرد عرض المنتجات على الإنترنت.",
      "كان التحدي هو جعل هذا الحجم يبدو بسيطًا.",
    ],
  },

  challenge: {
    eyebrow: "التحدي الأساسي",
    heading: "كيف تجعل 12,942 منتجًا سهلة التصفح؟",
    body: "عند هذا الحجم، يصبح اكتشاف المنتجات وبنية الكتالوج والتصفية والأداء والمعمارية المعلوماتية جزءًا أساسيًا من تجربة المنتج نفسها. كانت الواجهة بحاجة إلى مساعدة المتخصصين على الوصول إلى منتجات محددة للغاية دون إجبارهم على تصفح مئات النتائج غير ذات الصلة، مع بقاء التطبيق سريع الاستجابة رغم نمو الكتالوج.",
    nodes: {
      catalogueScale: { label: "حجم الكتالوج", result: "اكتشاف المنتجات" },
      specialty: { label: "التخصص المهني", result: "التخصيص" },
      location: { label: "موقع العيادة", result: "توصيل مرتبط بالسياق" },
      operations: { label: "عمليات الأعمال", result: "الإدارة والصلاحيات" },
    },
  },

  discovery: {
    eyebrow: "البحث واكتشاف المنتجات",
    heading: "العثور على منتج واحد وسط الآلاف.",
    intro:
      "تجمع المنصة بين بحث منظم وتسلسل هرمي للفئات واكتشاف العلامات التجارية والتصفية والتوفر وفلاتر التسويق لتقليل تعقيد الكتالوج — وليس محرك بحث بترتيب ذكاء اصطناعي أو بحثًا دلاليًا، بل نظام منظم مصمم بعناية بحسب الطريقة التي يُضيّق بها المتخصصون الكتالوج فعليًا.",
    capabilities: [
      "البحث باسم المنتج",
      "البحث برمز SKU",
      "البحث بالعلامة التجارية",
      "البحث بالفئة",
      "تصفية الفئة الأصلية والفرعية",
      "فلاتر العلامة التجارية",
      "الحد الأدنى والأقصى للسعر",
      "متوفر بالمخزون",
      "غير متوفر بالمخزون",
      "مخزون منخفض",
      "عروض أسبوعية",
      "الأكثر مبيعًا",
      "وصل حديثًا",
      "عروض ساخنة",
      "توصيل سريع",
      "الترتيب",
      "التقسيم إلى صفحات",
      "اقتراحات منتجات بأسلوب الإكمال التلقائي",
    ],
    mediaCaption: "تصفح الفئات على كتالوج X Dental الفعلي.",
  },

  personalization: {
    eyebrow: "التخصيص",
    heading: "المتجر يتغيّر بحسب المتخصص الذي يستخدمه.",
    diagram: {
      user: "المستخدم",
      specialty: "التخصص",
      location: "الموقع",
      clinicEssentials: "أساسيات العيادة",
      delivery: "سياق التوصيل / العروض",
    },
  },

  clinicEssentials: {
    eyebrow: "أساسيات العيادة",
    heading: "منتجات تتوافق بالفعل مع المتخصص.",
    body: "بدلًا من إجبار كل متخصص على تصفح الكتالوج ذاته، يستخدم X Dental التخصص السنّي للمستخدم — المسجّل والمحفوظ في حسابه — لإبراز المنتجات الأكثر صلة بمجاله.",
    goalLine1: "تقليل البحث.",
    goalLine2: "زيادة الصلة.",
    mediaCaption: "فروع العيادة — التخصص المهني والمواقع المحفوظة، تُدار من الحساب.",
  },

  delivery: {
    eyebrow: "توصيل مرتبط بالموقع",
    headingLine1: "العرض المناسب.",
    headingLine2: "المنطقة المناسبة.",
    headingLine3: "اليوم المناسب.",
    body: "يمكن للعملاء حفظ مواقع عياداتهم، ويرتبط كل موقع محفوظ بمنطقة توصيل. يمكن لعروض التوصيل استهداف مناطق محددة واتباع تكرار حسب يوم الأسبوع، بحيث يرى العميل الذي يطابق موقعه المحفوظ منطقة عرض نشطة شروط التوصيل المناسبة عند إتمام الشراء.",
    points: [
      "مواقع العيادة تُحفظ في الحساب، وليست إلزامية عند التسجيل",
      "كل موقع محفوظ مرتبط بمنطقة توصيل مُسمّاة",
      "يمكن لعروض التوصيل استهداف مناطق محددة",
      "يمكن للعروض اتباع تكرار حسب يوم الأسبوع",
      "العروض المطابقة تُطبَّق تلقائيًا عند إتمام الشراء",
    ],
  },

  designSystemSection: {
    eyebrow: "نظام التصميم",
    heading: "مصمم للتجارة الاحترافية.",
    body: "بُنيت الواجهة على لغة بصرية بلونَي الكريمي والذهبي — يُخصَّص اللون الذهبي للإجراءات الأساسية وإبراز الأسعار والحالات المحددة بدلًا من استخدامه كزخرفة — مدعومة بأسطح زجاجية ناعمة، ولمسات زرقاء مقتصدة، وتسلسل هرمي واضح للطباعة يناسب صفحات المنتجات الغنية بالمعلومات.",
    caveat:
      "بُني النظام باستخدام رموز متغيرات CSS من Tailwind v4 إلى جانب طبقة مكونات واجهة قابلة لإعادة الاستخدام مبنية على مكوّنات Radix الأساسية — نظام حقيقي وفعّال، وليس مكتبة مكونات موحّدة تمامًا من البداية للنهاية.",
    tokensLabel: "رموز الألوان",
    elementsLabel: "عناصر الواجهة",
    elements: ["الإجراءات الأساسية", "التسلسل الهرمي للطباعة", "بطاقات المنتجات", "الشارات والوسوم", "الحقول والفلاتر", "الأسطح الزجاجية"],
  },

  scaleSection: {
    eyebrow: "على نطاق واسع",
    heading: "الأرقام وراء الكتالوج.",
  },

  architecture: {
    eyebrow: "المعمارية الكاملة",
    headingLine1: "تجربة واحدة.",
    headingLine2: "أنظمة متعددة.",
    body: "تعمل واجهة أمامية مبنية على React وTypeScript، وواجهة خلفية مبنية على Express وPrisma، وقاعدة بيانات PostgreSQL معًا خلف واجهة متجر واحدة — مع تشغيل نفس الكتالوج ومنطق الأعمال للوحة تحكم تشغيلية داخلية أيضًا.",
    nodes: {
      frontend: "الواجهة الأمامية",
      backend: "الواجهة الخلفية",
      database: "قاعدة البيانات",
      ux: "تجربة المستخدم",
      businessLogic: "منطق الأعمال",
      dataScale: "البيانات على نطاق واسع",
      dashboard: "لوحة التحكم",
      operations: "العمليات",
    },
    stackLabel: "البنية التقنية الموثّقة",
  },

  reliability: {
    eyebrow: "موثوقية التجارة",
    heading: "يجب أن يعمل إتمام الشراء في كل مرة.",
    body: "خلف واجهة المتجر، تحافظ مجموعة من الأنظمة على الخادم على اتساق الأسعار والمخزون والطلبات — بحيث لا تتحول نقرة مكررة، أو سعر قديم، أو عميلان يشتريان القطعة الأخيرة في اللحظة نفسها، إلى تذكرة دعم.",
    capabilities: [
      "منطق سلة الشراء على الخادم",
      "فحوصات توفر المخزون",
      "منطق تسعير الطلبات",
      "الكوبونات والعروض الترويجية",
      "مزايا كبار العملاء (VIP)",
      "ضمان عدم تكرار الطلب (Idempotency)",
      "إدارة دورة حياة الطلب",
      "تسعير التوصيل",
      "قائمة الأمنيات",
      "قوائم التوريد",
      "عروض الأسعار",
      "طلبات المنتجات",
    ],
  },

  vip: {
    eyebrow: "كبار العملاء والمزايا",
    headingLine1: "عملاء مختلفون.",
    headingLine2: "قواعد مختلفة.",
    body: "يدعم X Dental فئتين من العملاء، وتُطبَّق قدرات كبار العملاء (VIP) على مستوى الخادم، لا في الواجهة فقط. يمكن للمنصة تطبيق قواعد مختلفة للتوصيل والتسعير والولاء بحسب الفئة — دون تغيير التجربة لبقية العملاء.",
    standard: {
      title: "قياسي",
      description: "قواعد التجارة القياسية",
    },
    vipTier: {
      title: "VIP",
      description: "مزايا مخصصة، وامتيازات توصيل، وفروقات في الولاء",
    },
    mediaCaption: "المحفظة والنقاط — رصيد الولاء ونشاط المكافآت، من حساب العميل.",
  },

  admin: {
    eyebrow: "الإدارة والصلاحيات",
    heading: "واجهة المتجر لم تكن سوى نصف المنتج.",
    body: "تطلّب تشغيل كتالوج بهذا الحجم نظامًا إداريًا قادرًا على إدارة المنتجات والمستخدمين والعروض والتوصيل والطلبات والمحتوى وعمليات العملاء، دون منح كل عضو في الفريق صلاحيات غير مقيّدة.",
    roles: {
      admin: { title: "مدير", description: "تحكّم تشغيلي كامل" },
      support: { title: "دعم", description: "فقط الصلاحيات الممنوحة صراحةً" },
      customer: { title: "عميل", description: "الوصول إلى التجارة والحساب" },
    },
    areasLabel: "المجالات المُدارة",
    areas: [
      "إدارة المنتجات",
      "الفئات",
      "العلامات التجارية",
      "المتغيرات",
      "المستخدمون",
      "التوصيل",
      "العروض الترويجية",
      "الطلبات",
      "الولاء",
      "الدعم",
      "طلبات المنتجات",
      "عروض الأسعار",
      "القسم الرئيسي والمحتوى",
    ],
  },

  catalogImport: {
    eyebrow: "استيراد الكتالوج وعمليات البيانات",
    heading: "احتاج هذا الحجم إلى طريقة أكثر أمانًا لإدارة البيانات.",
    body: "تطلّب إدخال آلاف المنتجات إلى الكتالوج بأمان مسارًا يتحقق من نفسه قبل كتابة أي شيء — كل عملية استيراد تُعاين وتُصنَّف وتُطابَق مع البيانات الحالية قبل تطبيقها.",
    steps: ["معاينة", "تحقق", "تصنيف", "حل التعارضات", "تطبيق"],
  },

  mediaPipeline: {
    eyebrow: "خط إنتاج صور المنتجات",
    heading: "قرابة 13,000 منتج تعني أيضًا قرابة 13,000 قرار بصري.",
    body: "يُجهّز مسار عمل إداري مخصص صور المنتجات قبل وصولها إلى واجهة المتجر — سير عمل تشغيلي، وليس خدمة تعمل تلقائيًا أثناء التشغيل.",
    steps: [
      "توفير الصور",
      "التحقق من الملفات",
      "التحويل إلى WebP",
      "التحقق من الجودة",
      "توليد قائمة حصر (Manifest)",
      "فحوصات التكرار وعدم التطابق",
      "رفع إلى التخزين الإنتاجي",
      "ربط الصور المعتمدة بالمنتجات",
    ],
  },

  responsive: {
    eyebrow: "تجربة متجاوبة",
    heading: "كان على الكتالوج أن يبقى قابلًا للاستخدام في كل مكان.",
    body: "بُني اكتشاف المنتجات والتصفية والشراء والوصول إلى الحساب جميعها للتكيّف عبر أجهزة سطح المكتب واللوحية والهاتف المحمول — واجهة مبنية فعليًا على نقاط توقف، صُقلت عبر استخدام حقيقي وليس بتخطيط ثابت واحد.",
  },

  gallery: {
    eyebrow: "الشاشات الرئيسية",
    heading: "النظام، شاشة تلو الأخرى.",
    items: {
      home: { title: "الرئيسية", caption: "تجربة الهبوط ونقاط الدخول إلى الكتالوج." },
      discovery: { title: "الفئات", caption: "تصفح الفئات والاكتشاف المنظم." },
      productDetail: { title: "تفاصيل المنتج", caption: "اختيار المتغيرات، والتسعير، والتوفر." },
      cart: { title: "سلة الشراء", caption: "عناصر الطلب، والكميات، وملخص الطلب." },
      checkout: { title: "إتمام الشراء", caption: "تفاصيل التوصيل ومراجعة الطلب." },
      account: { title: "الحساب", caption: "سجل الطلبات وإدارة الحساب." },
      clinicLocations: { title: "فروع العيادة", caption: "المواقع المحفوظة ومناطق التوصيل." },
      walletLoyalty: { title: "المحفظة والنقاط", caption: "رصيد الولاء ونشاط المكافآت." },
      quotes: { title: "عروض الأسعار", caption: "طلبات عروض الأسعار للأعمال وتتبّع الحالة." },
      support: { title: "تذاكر الدعم", caption: "محادثات دعم العملاء." },
      admin: { title: "لوحة تحكم الإدارة", caption: "الشاشة قيد التجهيز — متاحة عند الطلب." },
      mobile: { title: "الهاتف المحمول", caption: "الشاشات قيد التجهيز — متاحة عند الطلب." },
    },
  },

  result: {
    eyebrow: "النتيجة",
    headingLine1: "من آلاف المنتجات",
    headingLine2: "إلى نظام واحد متصل.",
    body: "أصبح X Dental منصة تجارة لمستلزمات طب الأسنان قابلة للتوسّع، قادرة على تنظيم وعرض 12,942 منتجًا عبر 607 علامة تجارية و218 فئة، مع دعم اكتشاف المنتجات، والتخصيص القائم على التخصص، ومنطق التوصيل المرتبط بالموقع، ومسارات التجارة، وفئات العملاء، والإدارة القائمة على الأدوار، والواجهات المتجاوبة، والأنظمة التشغيلية اللازمة لإدارة كتالوج متنامٍ.",
  },

  finalCta: {
    eyebrow: "من إنتاج Lux Studio",
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description: "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
    visitWebsite: "زيارة X Dental",
    nextCaseStudy: "دراسة الحالة التالية",
    comingSoon: "المزيد من دراسات الحالة قريبًا",
  },

  common: {
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    pendingScreen: "الشاشة قادمة قريبًا",
    backToWork: "العودة إلى الأعمال",
  },
};

export type CaseStudyCopy = typeof en;
export const xDentalCopy: Dict<CaseStudyCopy> = { en, ar };
