import type { Dict } from "../useDict";

/**
 * Localized copy for the Al Nours case study (`/work/al-nours`). Same
 * pattern as every other dictionary in this project: `en` defined first
 * (its inferred shape is the contract), `ar` typed as `typeof en` so a
 * missing/extra Arabic key is a compile error. The real client/product name
 * ("Al Nours") stays untranslated, matching `workPage.ts` and the other two
 * case studies.
 *
 * This dict has its own shape — a "simple surface, connected underneath"
 * story built around Odoo/backend architecture, not X Dental's commerce-
 * scale story or Houd El Nile's repositioning/export story — see
 * `AlNoursCaseStudyBody.tsx` for how it's rendered. Only `hero`, `finalCta`,
 * and `common` need to match `CaseStudySharedCopy`.
 *
 * Every factual claim here is scoped to what was verified in the real Al
 * Nours codebase (`D:\Front-End\Work\Senior-Engineer\Senior-Engineer`) and
 * its live site at al-nours.com — see the "Reliability Decision" and
 * "Payments" sections in particular for the exact hedges (no retry queue,
 * no admin resync dashboard, card payments technically complete but not
 * publicly activated).
 */
const en = {
  hero: {
    eyebrow: "Case Study / 03",
    title: "Al Nours",
    subtitle: "Saudi Consumer Commerce Platform",
    headlineLine1: "Simple to buy.",
    headlineLine2: "Connected to operate.",
    supporting:
      "Designing and building a bilingual Saudi commerce experience where a simple customer journey connects directly to backend business logic, PostgreSQL, and Odoo operations.",
    metricLabels: {
      languages: "Languages",
      products: "Products",
      systems: "Connected Systems",
    },
    services: ["UI/UX", "Frontend", "Backend", "E-commerce", "Odoo", "Database", "Bilingual UX"],
    visitLiveWebsite: "Visit Live Website",
    scrollHint: "Scroll to explore",
  },

  overview: {
    eyebrow: "Overview",
    headingLine1: "The customer sees simplicity.",
    headingLine2: "The business needs structure.",
    body: [
      "Al Nours is a Saudi consumer commerce platform built around a deliberately simple buying experience.",
      "Customers move through product discovery, cart, checkout, and order confirmation without needing to understand the operational systems behind the storefront.",
      "Underneath that simple journey, the application coordinates server-side pricing, promotions, customer data, PostgreSQL, and Odoo to turn each completed checkout into usable business information.",
    ],
    flow: ["Discover", "Product", "Cart", "Checkout", "Order"],
  },

  visualDirection: {
    eyebrow: "Visual Direction",
    headingLine1: "Calm interface.",
    headingLine2: "Fluid identity.",
    body: "A navy-and-teal palette, fully pill-shaped buttons with a gradient-stroke border treatment, soft radii, and restrained shadows carry the same rhythm across the storefront, product pages, and checkout.",
    glassNote:
      "Selective glass surfaces were used to add depth without turning the entire interface into a glassmorphism-heavy experience — verified mainly in the navigation bar and the sign-in/sign-up accents, not as a site-wide card treatment. The regular product and content cards use plain light surfaces and soft shadows instead.",
    mediaCaption: "Home — navy pill navigation, gradient-stroke buttons, and the flavor palette in one view.",
    tokensLabel: "Color Tokens",
    typographyLabel: "Typography",
    typography: ["Sora — headings", "Inter — English body", "Cairo / Tajawal — Arabic"],
    elementsLabel: "Interface Elements",
    elements: ["Pill Buttons", "Gradient-Stroke Border", "Soft Radii", "Restrained Shadows", "Scroll-Aware Navigation"],
    stackLabel: "Verified Stack",
  },

  meshMotion: {
    eyebrow: "Color Mesh Motion",
    heading: "Motion without visual noise.",
    body: [
      "The animated background mesh is built from layered radial gradients, an SVG feTurbulence and feDisplacementMap filter for organic distortion, and CSS keyframes — no GSAP or Framer Motion drives the core effect, and no video is involved.",
      "On product pages, the same mesh language shifts palette per flavor — cocktail, mango, orange, and guava each carry their own ambient tint.",
    ],
    flavors: ["Cocktail", "Mango", "Orange", "Guava"],
    note: "The visual system adds motion around the interface rather than inside every interaction, keeping the shopping experience calm while giving the brand a more distinctive digital presence.",
    mediaCaption: "Product Detail — the ambient mesh shifts tone to match the selected flavor.",
  },

  bilingual: {
    eyebrow: "Bilingual Experience",
    headingLine1: "One storefront.",
    headingLine2: "Two reading directions.",
    intro:
      "English and Arabic, switched client-side through a language context that flips the document direction, mirrors layout where needed, and swaps typography — Cairo and Tajawal for Arabic, Sora and Inter for English.",
    languages: ["English", "Arabic"],
    flow: ["EN · LTR", "AR · RTL"],
    body: "Checkout, account pages, and every storefront screen are translated and RTL-aware, not only the marketing pages.",
    note: "Language switching is client-side rather than routed through separate locale-prefixed URLs.",
  },

  commerceJourney: {
    eyebrow: "Commerce Journey",
    heading: "A buying flow designed to stay simple.",
    body: "Product discovery, product detail, cart, checkout, and order confirmation form one continuous, unhurried path.",
    steps: ["Products", "Product Detail", "Cart", "Checkout", "Order"],
  },

  checkout: {
    eyebrow: "Checkout Experience",
    heading: "A complex order flow made to feel simple.",
    body: "Checkout is a three-stage, authenticated experience: shipping details, payment method, and a final review before the order is placed.",
    mediaCaption: "Cart — the last simple screen before the three-step checkout begins.",
    steps: ["Shipping", "Payment", "Review"],
    capabilitiesLabel: "Implemented",
    capabilities: [
      "Authenticated Checkout",
      "Saved-Address Quick-Fill",
      "Server-Side Pricing",
      "Server-Side Quantity Validation",
      "Promotion Validation",
      "Shipping Cost",
      "Order Confirmation",
    ],
    caveat: "Guest checkout, multiple shipping methods, distance-based shipping, and tax calculation are not part of the current implementation.",
  },

  challenge: {
    eyebrow: "Core Technical Challenge",
    heading: "Checkout was only half the job.",
    body: [
      "Completing the order on the website was only the customer-facing half of the problem.",
      "The business also needed every completed checkout to arrive inside Odoo with the correct customer, contact details, addresses, products, quantities, totals, and order reference — without forcing the customer to wait for the ERP.",
    ],
    flow: ["Customer", "Checkout", "Local Order", "Data Mapping", "Odoo XML-RPC", "Customer / Address / Sales Order"],
  },

  odooIntegration: {
    eyebrow: "Odoo Integration",
    heading: "Connecting commerce to operations.",
    body: "The integration is a genuine production architecture using XML-RPC through Odoo's standard external API. Credentials stay on the server — the Odoo username, API key, database name, and every private environment value are never exposed to the browser.",
    protocolLabel: "Protocol",
    protocol: ["XML-RPC", "/xmlrpc/2/common", "/xmlrpc/2/object"],
  },

  odooFlow: {
    eyebrow: "Odoo Data Flow",
    heading: "One checkout, six coordinated steps.",
    body: "The website creates the local order first. The backend then searches for or creates the Odoo customer record, reuses or creates the delivery and invoice contacts, maps each product to its Odoo reference, and creates a sale.order with order lines, a shipping line, and a discount line where a promotion applied — carrying the customer, shipping address, invoice address, and a stable order reference. Odoo order states can later be mapped back into the customer's own order history.",
    steps: ["Local Order", "Customer / Partner", "Shipping & Invoice Address", "Product Mapping", "Sales Order", "Status Sync"],
    intelligenceLabel: "Additional Odoo Intelligence",
    intelligence: [
      "Odoo → Website Product Sync",
      "Localized EN/AR Product Descriptions",
      "Description Sanitization & Caching",
      "Order-Status Retrieval",
      "CRM Lead Creation From Contact Form",
    ],
  },

  hardProblem: {
    eyebrow: "The Hard Integration Problem",
    headingLine1: "Two systems.",
    headingLine2: "No shared transaction.",
    body: "The website database and Odoo cannot participate in one atomic transaction. A failure in the ERP should not automatically mean a failed customer checkout. The architecture treats the website order as the customer-facing source of truth and synchronizes it into Odoo as a separate, subsequent step.",
  },

  reliability: {
    eyebrow: "Reliability Decision",
    heading: "Don't let the ERP break the checkout.",
    flow: ["Checkout Completed", "PostgreSQL Order", "Customer Confirmation", "Odoo Synchronization"],
    body: "The local website order is created first, and the customer is confirmed against that record. Odoo synchronization happens afterward — if Odoo is temporarily unavailable, the website does not hold the customer's confirmation hostage to the ERP.",
    caveat:
      "There is currently no automatic retry queue, no dead-letter queue, and no admin resync dashboard for a sync that fails — a direction for a future phase, not something built today.",
    duplicateProtectionLabel: "Duplicate Protection",
    duplicateProtection:
      "Before creating an Odoo sales order, the integration checks whether an order already exists for that same client_order_ref, so a repeated synchronization reuses the existing order instead of creating a second one. This reduces duplicate sales orders — it is not distributed exactly-once delivery or a two-phase commit.",
  },

  systems: {
    eyebrow: "One Experience. Multiple Systems.",
    headingLine1: "One experience.",
    headingLine2: "Multiple systems.",
    body: "The customer experience, the application backend, and the Odoo integration operate as separate systems, but converge around one connected order journey.",
    diagram: {
      root: "Al Nours",
      systems: ["Storefront", "Backend", "Odoo"],
      subsystems: ["Bilingual UI & Motion", "Checkout & Commerce", "Partner & Order Sync"],
      convergence: "Connected Order Experience",
    },
  },

  backend: {
    eyebrow: "Backend",
    heading: "More than a storefront.",
    body: "Express APIs sit behind a shared TypeScript contract validated with Zod on both ends, backed by PostgreSQL through Drizzle ORM. Session-based authentication, server-side order validation, server-side pricing, promotion rules, Odoo synchronization, and SMTP email infrastructure all live here — not only page rendering.",
    flow: ["React / Vite", "Express", "PostgreSQL / Drizzle", "Odoo"],
    capabilitiesLabel: "Backend Capabilities",
    capabilities: [
      "Shared TypeScript API Contract",
      "Zod Validation",
      "Session-Based Authentication",
      "Server-Side Order Validation",
      "Server-Side Pricing",
      "Odoo Synchronization",
      "SMTP Email",
    ],
    authLabel: "Database & Session Security",
    auth: [
      "PostgreSQL",
      "Drizzle ORM",
      "PostgreSQL-Backed Sessions",
      "bcrypt Password Hashing",
      "httpOnly Cookies",
      "Secure Cookies In Production",
      "Session Regeneration At Login",
    ],
  },

  promotions: {
    eyebrow: "Promotions",
    heading: "Discounts the server actually enforces.",
    body: "Three real promotion codes carry constraints like minimum subtotal, once-per-user, and first-order-only. Eligibility is checked on the server against the customer's real order history, not only in the browser.",
    codes: ["FREESHIP", "SAVE20", "WELCOME10"],
  },

  payments: {
    eyebrow: "Payments — Planned Rollout",
    heading: "Built for the next phase.",
    body: "The Moyasar card-payment architecture was completed technically — secure client-side tokenization, server-side payment creation, a 3-D Secure flow, callback and webhook handling, and amount, currency, and order verification before anything is finalized. Public activation was intentionally postponed by the client for a later rollout phase, not because the integration is incomplete.",
    capabilities: ["Client-Side Tokenization", "Server-Side Payment Creation", "3-D Secure Flow", "Webhook Verification", "PostgreSQL Advisory Lock"],
    reliability:
      "Both the payment webhook and the customer's own return-to-site verification can safely converge on the same finalization path, protected by a PostgreSQL advisory lock that prevents the same payment from creating two orders.",
    caveat: "The storefront currently focuses on Cash on Delivery while this architecture remains prepared behind a feature flag — not visible to customers as a live payment option today.",
  },

  security: {
    eyebrow: "Security & Reliability",
    heading: "A concise set of credible decisions.",
    body: "Server-side credentials, server-side checkout validation, session security, rate limiting on sensitive routes, payment verification, and Odoo credentials kept fully isolated from the client.",
    items: [
      "Server-Side Credentials",
      "Server-Side Checkout Validation",
      "Session Security",
      "Sensitive-Route Rate Limiting",
      "Payment Verification",
      "Odoo Credentials Isolated From Client",
    ],
  },

  performance: {
    eyebrow: "Performance",
    heading: "Quick where the customer feels it.",
    body: "Route-level code splitting with React.lazy and Suspense, lazy-loaded and optimized product imagery, and TTL caching for the product list, Odoo descriptions, and Odoo order status — with Server-Timing headers and slow-request logging to watch it.",
    caveat: "No Lighthouse scores, Core Web Vitals figures, or CDN image pipeline are claimed here.",
  },

  responsive: {
    eyebrow: "Responsive",
    headingLine1: "Simple at every size.",
    headingLine2: "Not just on desktop.",
    body: "Breakpoint-driven layout, a collapsing mobile navigation, and a simplified mesh treatment on small screens carry the same calm storefront from a 1440px desktop down to a 390px phone.",
    devices: { tablet: "Tablet", mobile: "Mobile" },
  },

  seo: {
    eyebrow: "SEO",
    heading: "Real foundations, honestly scoped.",
    body: "Per-page titles, descriptions, canonical tags, Open Graph and Twitter metadata, Organization and Product JSON-LD, a sitemap, and a robots file are all in place.",
    caveat: "The language switcher is client-side rather than routed through separate locale URLs, so this isn't a fully localized SEO architecture yet.",
  },

  gallery: {
    eyebrow: "Key Screens",
    heading: "The experience, screen by screen.",
    items: {
      home: { title: "Home", caption: "Hero, featured products, and shop-by-flavor entry points." },
      products: { title: "Products", caption: "Flavor filtering across the four Domty premium drinks." },
      productDetail: { title: "Product Detail", caption: "Ingredients, nutrition, size selection, and related flavors." },
      cart: { title: "Cart", caption: "Line items, coupon entry, and order totals before checkout." },
      about: { title: "About", caption: "Mission, coverage, and how the distribution model works." },
      mobile: { title: "Mobile", caption: "The hero experience collapsed to a single-column phone layout." },
    },
  },

  result: {
    eyebrow: "The Result",
    headingLine1: "From checkout",
    headingLine2: "to operations.",
    body: "Al Nours became a connected commerce platform where a simple bilingual buying experience works with a dedicated application backend, PostgreSQL, and Odoo — transforming website orders into structured operational records without exposing that complexity to the customer.",
  },

  finalCta: {
    eyebrow: "Built by Lux Studio",
    heading: "Have a project that needs this level of care?",
    description: "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
    visitWebsite: "Visit Al Nours",
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
    eyebrow: "دراسة حالة / 03",
    title: "Al Nours",
    subtitle: "منصة تجارة استهلاكية سعودية",
    headlineLine1: "بسيطة في الشراء.",
    headlineLine2: "متصلة في التشغيل.",
    supporting:
      "تصميم وبناء تجربة تجارة سعودية ثنائية اللغة، حيث تتصل رحلة عميل بسيطة مباشرة بمنطق العمل في الخلفية، وقاعدة بيانات PostgreSQL، وعمليات Odoo.",
    metricLabels: {
      languages: "لغة",
      products: "منتج",
      systems: "أنظمة متصلة",
    },
    services: ["واجهة وتجربة المستخدم", "الواجهة الأمامية", "الواجهة الخلفية", "تجارة إلكترونية", "Odoo", "قاعدة البيانات", "تجربة ثنائية اللغة"],
    visitLiveWebsite: "زيارة الموقع المباشر",
    scrollHint: "مرر للاستكشاف",
  },

  overview: {
    eyebrow: "نظرة عامة",
    headingLine1: "العميل يرى البساطة.",
    headingLine2: "والعمل يحتاج إلى بنية.",
    body: [
      "Al Nours منصة تجارة استهلاكية سعودية مبنية حول تجربة شراء بسيطة عن قصد.",
      "يتنقل العملاء عبر اكتشاف المنتج، والسلة، وإتمام الطلب، وتأكيد الطلب دون الحاجة لفهم الأنظمة التشغيلية خلف الواجهة.",
      "وتحت هذه الرحلة البسيطة، ينسّق التطبيق التسعير من جانب الخادم، والعروض الترويجية، وبيانات العملاء، وPostgreSQL، وOdoo لتحويل كل عملية شراء مكتملة إلى معلومات عمل قابلة للاستخدام.",
    ],
    flow: ["اكتشاف", "المنتج", "السلة", "إتمام الطلب", "الطلب"],
  },

  visualDirection: {
    eyebrow: "التوجه البصري",
    headingLine1: "واجهة هادئة.",
    headingLine2: "هوية سلسة.",
    body: "لوحة ألوان بالأزرق الداكن والتركواز، وأزرار كبسولية الشكل بالكامل بمعالجة حدّ متدرج، وزوايا ناعمة، وظلال مقتصدة، تحافظ على الإيقاع نفسه عبر الواجهة، وصفحات المنتجات، وإتمام الطلب.",
    glassNote:
      "استُخدمت أسطح زجاجية مختارة لإضافة عمق دون تحويل الواجهة بالكامل إلى تجربة زجاجية كثيفة — تم التحقق من وجودها أساسًا في شريط التنقل ولمسات تسجيل الدخول والتسجيل، وليست معالجة شاملة لكل البطاقات في الموقع. بطاقات المنتجات والمحتوى العادية تستخدم أسطحًا فاتحة عادية وظلالًا ناعمة بدلًا من ذلك.",
    mediaCaption: "الصفحة الرئيسية — تنقل كبسولي بالأزرق الداكن، وأزرار بحدّ متدرج، ولوحة ألوان النكهات في مشهد واحد.",
    tokensLabel: "رموز الألوان",
    typographyLabel: "الطباعة",
    typography: ["Sora — العناوين", "Inter — النص الإنجليزي", "Cairo / Tajawal — العربية"],
    elementsLabel: "عناصر الواجهة",
    elements: ["أزرار كبسولية", "حدّ بتدرج لوني", "زوايا ناعمة", "ظلال مقتصدة", "تنقل واعٍ بالتمرير"],
    stackLabel: "البنية التقنية الموثّقة",
  },

  meshMotion: {
    eyebrow: "حركة الشبكة اللونية",
    heading: "حركة بلا ضوضاء بصرية.",
    body: [
      "الخلفية المتحركة مبنية من تدرجات شعاعية متراكبة، وفلتر SVG من نوع feTurbulence وfeDisplacementMap لتشويه عضوي، وCSS keyframes — لا يعتمد التأثير الأساسي على GSAP أو Framer Motion، ولا يستخدم أي فيديو.",
      "في صفحات المنتج، تتحول لوحة اللغة البصرية نفسها بحسب النكهة — الكوكتيل، والمانجو، والبرتقال، والجوافة، لكل منها درجة لون محيطة خاصة بها.",
    ],
    flavors: ["كوكتيل", "مانجو", "برتقال", "جوافة"],
    note: "يضيف النظام البصري حركة حول الواجهة بدلًا من داخل كل تفاعل، ما يحافظ على هدوء تجربة التسوق مع منح العلامة حضورًا رقميًا أكثر تميزًا.",
    mediaCaption: "تفاصيل المنتج — تتحول الشبكة المحيطة لتطابق النكهة المختارة.",
  },

  bilingual: {
    eyebrow: "التجربة ثنائية اللغة",
    headingLine1: "واجهة واحدة.",
    headingLine2: "اتجاها قراءة.",
    intro:
      "الإنجليزية والعربية، يتم التبديل بينهما من جانب المتصفح عبر سياق لغة يقلب اتجاه المستند، ويعكس التخطيط عند الحاجة، ويبدّل الطباعة — Cairo وTajawal للعربية، وSora وInter للإنجليزية.",
    languages: ["الإنجليزية", "العربية"],
    flow: ["EN · من اليسار لليمين", "AR · من اليمين لليسار"],
    body: "إتمام الطلب، وصفحات الحساب، وكل شاشة في المتجر مترجمة ومهيأة للاتجاه من اليمين لليسار، وليست صفحات التسويق فقط.",
    note: "تبديل اللغة يتم من جانب المتصفح، وليس عبر روابط منفصلة ببادئة لغة.",
  },

  commerceJourney: {
    eyebrow: "رحلة الشراء",
    heading: "رحلة شراء صُممت لتبقى بسيطة.",
    body: "اكتشاف المنتج، وتفاصيل المنتج، والسلة، وإتمام الطلب، وتأكيد الطلب، تشكّل مسارًا واحدًا متصلًا وغير متسرّع.",
    steps: ["المنتجات", "تفاصيل المنتج", "السلة", "إتمام الطلب", "الطلب"],
  },

  checkout: {
    eyebrow: "تجربة إتمام الطلب",
    heading: "مسار طلب معقّد صُنع ليبدو بسيطًا.",
    body: "إتمام الطلب تجربة من ثلاث مراحل، تتطلب تسجيل الدخول: تفاصيل الشحن، وطريقة الدفع، ومراجعة نهائية قبل تقديم الطلب.",
    mediaCaption: "السلة — آخر شاشة بسيطة قبل بدء إتمام الطلب من ثلاث خطوات.",
    steps: ["الشحن", "الدفع", "المراجعة"],
    capabilitiesLabel: "مُنفَّذ",
    capabilities: [
      "إتمام طلب يتطلب تسجيل الدخول",
      "تعبئة سريعة من عنوان محفوظ",
      "تسعير من جانب الخادم",
      "التحقق من الكمية من جانب الخادم",
      "التحقق من صلاحية العرض الترويجي",
      "تكلفة الشحن",
      "تأكيد الطلب",
    ],
    caveat: "إتمام الطلب كضيف، وطرق شحن متعددة، والشحن حسب المسافة، وحساب الضريبة، ليست جزءًا من التنفيذ الحالي.",
  },

  challenge: {
    eyebrow: "التحدي التقني الأساسي",
    heading: "إتمام الطلب كان نصف المهمة فقط.",
    body: [
      "إتمام الطلب على الموقع كان النصف الموجّه للعميل فقط من المشكلة.",
      "احتاج العمل أيضًا أن يصل كل طلب مكتمل إلى Odoo بالعميل الصحيح، وبيانات التواصل، والعناوين، والمنتجات، والكميات، والإجماليات، ومرجع الطلب — دون أن ينتظر العميل نظام تخطيط الموارد.",
    ],
    flow: ["العميل", "إتمام الطلب", "الطلب المحلي", "تخطيط البيانات", "Odoo عبر XML-RPC", "العميل / العنوان / أمر البيع"],
  },

  odooIntegration: {
    eyebrow: "تكامل Odoo",
    heading: "ربط التجارة بالتشغيل.",
    body: "التكامل بنية إنتاجية حقيقية تستخدم XML-RPC عبر واجهة Odoo الخارجية القياسية. تبقى بيانات الاعتماد على الخادم — اسم مستخدم Odoo، ومفتاح API، واسم قاعدة البيانات، وكل قيمة بيئة خاصة لا تُعرض أبدًا للمتصفح.",
    protocolLabel: "البروتوكول",
    protocol: ["XML-RPC", "/xmlrpc/2/common", "/xmlrpc/2/object"],
  },

  odooFlow: {
    eyebrow: "تدفق بيانات Odoo",
    heading: "عملية شراء واحدة، بست خطوات منسّقة.",
    body: "ينشئ الموقع الطلب المحلي أولًا. ثم يبحث الخادم عن سجل عميل Odoo أو ينشئه، ويعيد استخدام جهات اتصال التسليم والفوترة أو ينشئها، ويربط كل منتج بمرجعه في Odoo، وينشئ sale.order يحتوي على بنود الطلب، وبند شحن، وبند خصم عند تطبيق عرض ترويجي — حاملًا العميل، وعنوان الشحن، وعنوان الفوترة، ومرجع طلب ثابت. يمكن لاحقًا ربط حالات طلب Odoo بسجل طلبات العميل الخاص به على الموقع.",
    steps: ["الطلب المحلي", "العميل / جهة الاتصال", "عنوان الشحن والفوترة", "ربط المنتجات", "أمر البيع", "مزامنة الحالة"],
    intelligenceLabel: "ذكاء إضافي في تكامل Odoo",
    intelligence: [
      "مزامنة المنتجات من Odoo إلى الموقع",
      "أوصاف منتجات محلّية بالإنجليزية والعربية",
      "تنقية أوصاف المنتج وتخزينها المؤقت",
      "استرجاع حالة الطلب",
      "إنشاء عميل محتمل في CRM من نموذج التواصل",
    ],
  },

  hardProblem: {
    eyebrow: "مشكلة التكامل الصعبة",
    headingLine1: "نظامان.",
    headingLine2: "بلا معاملة مشتركة.",
    body: "لا يمكن لقاعدة بيانات الموقع وOdoo أن يشتركا في معاملة ذرّية واحدة. فشل في نظام تخطيط الموارد يجب ألا يعني تلقائيًا فشل إتمام الطلب لدى العميل. تعامل البنية طلب الموقع كمصدر الحقيقة الموجّه للعميل، وتزامنه إلى Odoo كخطوة منفصلة لاحقة.",
  },

  reliability: {
    eyebrow: "قرار الموثوقية",
    heading: "لا تدع نظام تخطيط الموارد يكسر إتمام الطلب.",
    flow: ["اكتمال إتمام الطلب", "طلب PostgreSQL", "تأكيد العميل", "مزامنة Odoo"],
    body: "يُنشأ طلب الموقع المحلي أولًا، ويُؤكَّد للعميل بناءً على ذلك السجل. تحدث مزامنة Odoo بعد ذلك — وإذا كان Odoo غير متاح مؤقتًا، لا يُبقي الموقع تأكيد العميل رهينة لنظام تخطيط الموارد.",
    caveat:
      "لا توجد حاليًا طابور إعادة محاولة تلقائي، ولا طابور رسائل ميتة، ولا لوحة تحكم لإعادة المزامنة اليدوية عند فشلها — وجهة لمرحلة مستقبلية، وليست مبنية اليوم.",
    duplicateProtectionLabel: "الحماية من التكرار",
    duplicateProtection:
      "قبل إنشاء أمر بيع في Odoo، يتحقق التكامل مما إذا كان هناك طلب موجود بالفعل لنفس client_order_ref، بحيث تعيد المزامنة المتكررة استخدام الطلب الموجود بدلًا من إنشاء طلب ثانٍ. هذا يقلل من تكرار أوامر البيع — وليس تسليمًا موزّعًا بمرة واحدة مضمونة أو التزامًا بمرحلتين.",
  },

  systems: {
    eyebrow: "تجربة واحدة. أنظمة متعددة.",
    headingLine1: "تجربة واحدة.",
    headingLine2: "أنظمة متعددة.",
    body: "تعمل تجربة العميل، وتطبيق الخلفية، وتكامل Odoo كأنظمة منفصلة، لكنها تتقارب حول رحلة طلب واحدة متصلة.",
    diagram: {
      root: "Al Nours",
      systems: ["واجهة المتجر", "الخلفية", "Odoo"],
      subsystems: ["واجهة ثنائية اللغة وحركة", "إتمام الطلب والتجارة", "مزامنة العملاء والطلبات"],
      convergence: "تجربة طلب متصلة",
    },
  },

  backend: {
    eyebrow: "الخلفية",
    heading: "أكثر من مجرد واجهة متجر.",
    body: "تقف واجهات Express خلف عقد TypeScript مشترك يتم التحقق منه بواسطة Zod على الطرفين، مدعومًا بـPostgreSQL عبر Drizzle ORM. المصادقة القائمة على الجلسات، والتحقق من الطلب من جانب الخادم، والتسعير من جانب الخادم، وقواعد العروض الترويجية، ومزامنة Odoo، وبنية بريد SMTP، كلها موجودة هنا — وليس فقط عرض الصفحات.",
    flow: ["React / Vite", "Express", "PostgreSQL / Drizzle", "Odoo"],
    capabilitiesLabel: "قدرات الخلفية",
    capabilities: [
      "عقد API مشترك بـTypeScript",
      "تحقق باستخدام Zod",
      "مصادقة قائمة على الجلسات",
      "تحقق من الطلب من جانب الخادم",
      "تسعير من جانب الخادم",
      "مزامنة Odoo",
      "بريد إلكتروني عبر SMTP",
    ],
    authLabel: "قاعدة البيانات وأمان الجلسات",
    auth: [
      "PostgreSQL",
      "Drizzle ORM",
      "جلسات مخزَّنة في PostgreSQL",
      "تجزئة كلمات المرور بـbcrypt",
      "كوكيز httpOnly",
      "كوكيز آمنة في بيئة الإنتاج",
      "تجديد الجلسة عند تسجيل الدخول",
    ],
  },

  promotions: {
    eyebrow: "العروض الترويجية",
    heading: "خصومات يفرضها الخادم فعليًا.",
    body: "ثلاثة أكواد عروض ترويجية حقيقية تحمل شروطًا مثل الحد الأدنى للمجموع الفرعي، والاستخدام لمرة واحدة لكل مستخدم، والاقتصار على الطلب الأول. يتم التحقق من الأهلية على الخادم مقابل سجل طلبات العميل الفعلي، وليس في المتصفح فقط.",
    codes: ["FREESHIP", "SAVE20", "WELCOME10"],
  },

  payments: {
    eyebrow: "المدفوعات — طرح مخطط له",
    heading: "مبنية للمرحلة القادمة.",
    body: "اكتملت بنية الدفع بالبطاقة عبر Moyasar تقنيًا بالكامل — ترميز آمن من جانب العميل، وإنشاء دفعة من جانب الخادم، ومسار 3-D Secure، ومعالجة نداءات الرجوع والويب هوك، والتحقق من المبلغ والعملة والطلب قبل إتمام أي شيء. تأجيل التفعيل العلني كان قرارًا مقصودًا من العميل لمرحلة طرح لاحقة، وليس لأن التكامل غير مكتمل.",
    capabilities: ["ترميز من جانب العميل", "إنشاء الدفعة من جانب الخادم", "مسار 3-D Secure", "التحقق عبر الويب هوك", "قفل استشاري في PostgreSQL"],
    reliability:
      "يمكن لكل من الويب هوك الخاص بالدفع وتحقق العميل نفسه عند العودة إلى الموقع أن يتقاربا بأمان على مسار الإتمام نفسه، محميين بقفل استشاري في PostgreSQL يمنع الدفعة نفسها من إنشاء طلبين.",
    caveat: "يركّز المتجر حاليًا على الدفع عند الاستلام بينما تبقى هذه البنية جاهزة خلف علم تفعيل — وغير ظاهرة للعملاء كخيار دفع مباشر اليوم.",
  },

  security: {
    eyebrow: "الأمان والموثوقية",
    heading: "مجموعة مقتضبة من القرارات الموثوقة.",
    body: "بيانات اعتماد من جانب الخادم، وتحقق من إتمام الطلب من جانب الخادم، وأمان الجلسات، وتحديد معدل الطلبات على المسارات الحساسة، والتحقق من الدفع، وعزل بيانات اعتماد Odoo بالكامل عن العميل.",
    items: [
      "بيانات اعتماد من جانب الخادم",
      "تحقق من إتمام الطلب من جانب الخادم",
      "أمان الجلسات",
      "تحديد معدل الطلبات على المسارات الحساسة",
      "التحقق من الدفع",
      "عزل بيانات اعتماد Odoo عن العميل",
    ],
  },

  performance: {
    eyebrow: "الأداء",
    heading: "سريع حيث يشعر به العميل.",
    body: "تقسيم الشيفرة على مستوى المسار باستخدام React.lazy وSuspense، وتحميل كسول وصور منتجات محسّنة، وتخزين مؤقت محدد المدة لقائمة المنتجات، وأوصاف Odoo، وحالة طلب Odoo — مع ترويسات Server-Timing وتسجيل للطلبات البطيئة لمراقبته.",
    caveat: "لا تُدّعى هنا أي نتائج Lighthouse أو Core Web Vitals أو مسار توزيع صور عبر CDN.",
  },

  responsive: {
    eyebrow: "التجاوب",
    headingLine1: "بسيطة في كل مقاس.",
    headingLine2: "وليس فقط على سطح المكتب.",
    body: "تخطيط مبني على نقاط التوقف، وتنقل هاتف محمول قابل للطي، ومعالجة مبسّطة للشبكة المتحركة على الشاشات الصغيرة، تحافظ جميعها على المتجر الهادئ نفسه من سطح مكتب 1440 بكسل حتى هاتف 390 بكسل.",
    devices: { tablet: "لوحي", mobile: "هاتف" },
  },

  seo: {
    eyebrow: "تحسين محركات البحث",
    heading: "أساسيات حقيقية، بنطاق موصوف بأمانة.",
    body: "عناوين وأوصاف لكل صفحة، ووسوم canonical، وبيانات Open Graph وTwitter، وJSON-LD لكل من المؤسسة والمنتج، وملف خريطة موقع، وملف robots — جميعها موجودة.",
    caveat: "مبدّل اللغة يعمل من جانب المتصفح وليس عبر روابط لغة منفصلة، لذا هذه ليست بعد بنية تحسين محركات بحث مترجمة بالكامل.",
  },

  gallery: {
    eyebrow: "الشاشات الرئيسية",
    heading: "التجربة، شاشة تلو الأخرى.",
    items: {
      home: { title: "الرئيسية", caption: "القسم الرئيسي، والمنتجات المميزة، ونقاط الدخول للتسوق حسب النكهة." },
      products: { title: "المنتجات", caption: "تصفية حسب النكهة عبر مشروبات Domty المميزة الأربعة." },
      productDetail: { title: "تفاصيل المنتج", caption: "المكونات، والقيمة الغذائية، واختيار الحجم، والنكهات ذات الصلة." },
      cart: { title: "السلة", caption: "عناصر الطلب، وإدخال كوبون الخصم، وإجماليات الطلب قبل إتمامه." },
      about: { title: "من نحن", caption: "الرسالة، ونطاق التغطية، وطريقة عمل نموذج التوزيع." },
      mobile: { title: "الهاتف المحمول", caption: "تجربة القسم الرئيسي مطوية في تخطيط عمود واحد للهاتف." },
    },
  },

  result: {
    eyebrow: "النتيجة",
    headingLine1: "من إتمام الطلب",
    headingLine2: "إلى التشغيل.",
    body: "أصبح Al Nours منصة تجارة متصلة، حيث تعمل تجربة شراء بسيطة وثنائية اللغة مع خلفية تطبيق مخصصة، وPostgreSQL، وOdoo — محوّلة طلبات الموقع إلى سجلات تشغيلية مُهيكلة دون كشف هذا التعقيد للعميل.",
  },

  finalCta: {
    eyebrow: "من إنتاج Lux Studio",
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description: "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
    visitWebsite: "زيارة Al Nours",
    nextCaseStudy: "دراسة الحالة التالية",
    comingSoon: "المزيد من دراسات الحالة قريبًا",
  },

  common: {
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    pendingScreen: "الشاشة قادمة قريبًا",
    backToWork: "العودة إلى الأعمال",
  },
};

export type AlNoursCopy = typeof en;
export const alNoursCopy: Dict<AlNoursCopy> = { en, ar };
