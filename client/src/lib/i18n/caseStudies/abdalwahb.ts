import type { Dict } from "../useDict";

/**
 * Localized copy for the Abdalwahb ("Dr. Accountant") case study
 * (`/work/abdalwahb`). Same pattern as every other dictionary in this
 * project: `en` defined first (its inferred shape is the contract), `ar`
 * typed as `typeof en` so a missing/extra Arabic key is a compile error.
 * The real client name ("Abdalwahb") stays untranslated in copy that names
 * the project, matching `workPage.ts` and the other four case studies.
 *
 * This is a founder-led professional-services story — content complexity,
 * professional authority, trust, and Arabic-first UX — not a commerce or
 * backend-integration story like the other four case studies. Only `hero`,
 * `finalCta`, and `common` need to match `CaseStudySharedCopy`; see
 * `AbdalwahbCaseStudyBody.tsx` for how the rest is rendered.
 *
 * Every factual claim here is scoped to what the research on the real
 * `Digital-Vision-Hub` codebase and the live production site verified: no
 * database, no CMS, no LMS, no payments, no user accounts, no numeric
 * years-of-experience or client-count claim, no testimonials/client-logo
 * system. See the "Claims To Avoid" note inline where a section is prone to
 * overclaiming.
 */
const en = {
  hero: {
    eyebrow: "Case Study / 05",
    title: "Abdalwahb",
    subtitle: "Accounting, Advisory & Professional Training",
    headlineLine1: "Broad expertise.",
    headlineLine2: "One clear digital authority.",
    supporting:
      "We structured accounting, tax, advisory, licensing and professional training into one coherent bilingual experience — helping a founder-led professional practice communicate broad expertise without feeling fragmented or difficult to navigate.",
    metricLabels: {
      services: "Service Categories",
      languages: "Languages",
      pages: "Primary Pages",
      leadForms: "Lead-Gen Forms",
    },
    services: ["UI/UX", "Information Architecture", "Frontend", "Bilingual UX", "RTL", "Lead Generation", "SEO"],
    visitLiveWebsite: "Visit Live Website",
    scrollHint: "Scroll to explore",
  },

  glance: {
    eyebrow: "Project At A Glance",
    headingLine1: "One practice.",
    headingLine2: "Multiple reasons to visit.",
    body: "Dr. Mohamed Abdelwahab's practice covers accounting, auditing, tax and zakat, company formation, feasibility studies, financial consulting and digital-transformation advisory — plus a separate professional training business, serving individuals and companies across Egypt, Saudi Arabia, and the UAE. Training is counted as an additional, distinct offering alongside the eight service categories, not folded into them.",
    chips: ["Bilingual Arabic-First UX", "RTL-Native Layout", "Founder-Led Authority", "Consulting + Education", "Three Lead Funnels"],
  },

  challenge: {
    eyebrow: "The Core Problem",
    heading: "Expertise can become complexity.",
    body: [
      "The practice covers accounting, auditing, tax, company formation, feasibility studies, financial consulting, digital transformation, and professional training. Every one of those is a real, distinct service a client might come looking for specifically.",
      "The challenge was not adding more content — it was giving that breadth a structure customers could understand quickly, in the language they actually think in, without making the practice feel fragmented or difficult to navigate.",
    ],
  },

  compression: {
    eyebrow: "From Breadth To Clarity",
    heading: "Nine offerings, compressed into one experience.",
    body: "The core design decision on this project wasn't a visual one — it was structural: how nine real offerings fold down into seven focused destinations without losing any of them along the way.",
    offeringsLabel: "9 Real Offerings",
    offerings: [
      "Accounting",
      "Auditing",
      "Tax & Zakat",
      "Company Formation",
      "Feasibility Studies",
      "Financial Consulting",
      "Import / Export Services",
      "Digital Transformation",
      "Training",
    ],
    routesLabel: "Information Architecture",
    outcome: "One structured professional experience",
  },

  architecture: {
    eyebrow: "Information Architecture",
    headingLine1: "Nine offerings.",
    headingLine2: "Seven focused destinations.",
    body: [
      "Breadth was handled through hierarchy, not page multiplication. The eight service categories live on one Services page as a scannable set, not eight separate detail pages; Training gets its own destination because it serves a genuinely different audience.",
      "The site deliberately avoids dozens of individual service or course detail pages — that's a content-architecture decision, not a missing feature. Seven routes carry the entire experience.",
    ],
    routesLabel: "The seven real routes",
    routes: ["Home", "About", "Services", "Training", "Profile", "Careers", "Contact"],
  },

  journeys: {
    eyebrow: "Primary User Journeys",
    headingLine1: "One website.",
    headingLine2: "Two primary intentions.",
    body: "A prospective client and a prospective learner arrive with different questions. Both are one click from Home, and both resolve into a form built for exactly what they're asking about.",
    clientLabel: "Client — seeking services",
    clientSteps: ["Home", "Services", "About / Profile", "Contact"],
    learnerLabel: "Learner — seeking training",
    learnerSteps: ["Home", "Training", "Course Preview", "Registration"],
    careersLabel: "Candidate — a smaller third path",
    careersSteps: ["Careers", "Application", "CV Upload"],
  },

  bilingual: {
    eyebrow: "Arabic-First UX",
    headingLine1: "Arabic wasn't the translation.",
    headingLine2: "It was the starting point.",
    intro:
      "Arabic is the default language the site loads in, not a toggle bolted on after an English-first build. Switching language flips the document's own `dir` and `lang` attributes, swaps the entire interface between Cairo (Arabic) and Inter (English), and mirrors layout using logical start/end positioning rather than hard-coded left/right values — so RTL is a native layout mode, not a stylesheet trick.",
    languages: ["Arabic — default, RTL", "English — LTR"],
    mirrorArLabel: "Arabic · RTL",
    mirrorEnLabel: "English · LTR",
    mirrorCaption:
      "The same home page in both languages: the logo, navigation order, text alignment, and heading rhythm all genuinely mirror between RTL and LTR — down to project-specific work on how the Arabic hero title line-breaks.",
    caveat:
      "This is a fully bilingual, client-side language experience with RTL-native design — both languages are served at the same URL, so it isn't locale-prefixed or server-routed multilingual SEO.",
  },

  systems: {
    eyebrow: "One Experience. Multiple Systems.",
    headingLine1: "One experience.",
    headingLine2: "Multiple systems.",
    body: "For a professional-services practice with no backend to diagram, these three \"systems\" are the site's real content pillars rather than software layers — advisory, compliance, and education, all resolving into the same outcome.",
    diagram: {
      root: "Abdalwahb",
      systems: ["Advisory", "Compliance", "Education"],
      subsystems: ["Accounting", "Tax", "Training"],
      convergence: "Professional Credibility",
    },
  },

  services: {
    eyebrow: "Services Architecture",
    heading: "A broad practice, without the browsing burden.",
    body: "Eight service categories, each with a short description and a consultation CTA, laid out as one scannable grid rather than a product catalog to browse.",
    mediaCaption: "The Services page, captured live from abdalwahb.com.",
    categoriesLabel: "The eight categories",
    categories: [
      "Accounting Services",
      "Auditing Services",
      "Tax & Zakat Consulting",
      "Company Formation & Licensing",
      "Feasibility Studies",
      "Financial & Management Consulting",
      "Import & Export Card Services",
      "IT & Digital Transformation",
    ],
  },

  training: {
    eyebrow: "Training & Courses",
    heading: "Education without pretending to be an LMS.",
    body: "A dedicated training-marketing page — audience segments, program tracks for accountants and for company teams, delivery methods, an embedded course-preview video, and a registration form built to move interest into a real enquiry.",
    mediaCaption: "The Training page, captured live from abdalwahb.com.",
    audienceLabel: "Who it's built for",
    audience: ["Accountants", "Fresh Graduates", "Company Employees", "Business Owners", "Finance Teams"],
    caveat:
      "This is a training-marketing journey designed to move interest into registration — not a course platform. There's no login, no course library, no student dashboard, no progress tracking, and no course purchasing.",
  },

  trust: {
    eyebrow: "Trust Architecture",
    heading: "Trust without a logo wall.",
    body: "For a founder-led professional practice, credibility had to come from verifiable expertise rather than generic social proof. The real site carries no testimonials and no client-logo strip — trust is built entirely on real, checkable credentials instead.",
    mediaCaption: "The Profile / CV page, captured live from abdalwahb.com.",
    credentialsLabel: "What actually carries the trust",
    credentials: [
      "BSc, MSc & PhD in Accounting & Finance",
      "6 Professional Memberships",
      "Two Physical Office Locations",
      "AccountingService Structured Data",
      "Founder / Person Structured Data",
    ],
    caveat: "Every credential shown here is real and independently verifiable — none are estimated or invented.",
  },

  visualIdentity: {
    eyebrow: "Visual Identity & Motion",
    heading: "Professional, without becoming distant.",
    body: "Navy reads as financial and institutional trust; a single turquoise accent keeps it from reading as cold or generic corporate. Motion is used with restraint — scroll reveals, a cache-aware hero image loader that skips its own fade-in once an image is already cached, and full respect for `prefers-reduced-motion`.",
    mediaCaption: "The About page, captured live from abdalwahb.com.",
    tokensLabel: "Real design tokens",
    typographyLabel: "Typography",
    typography: ["Cairo — Arabic (RTL)", "Inter — English (LTR)"],
    componentLabel: "Component foundation",
    componentNote:
      "The website was built on a reusable component foundation (shadcn/Radix primitives plus a handful of hand-built site components), supporting consistent interaction and styling across the seven-page experience — not every installed primitive is used on a live page.",
    motionLabel: "Motion, deliberately",
    motionNote: "Framer Motion scroll reveals, a cache-aware hero loader, and reduced-motion support throughout — no GSAP, no parallax system, no canvas/mesh animation.",
  },

  engineering: {
    eyebrow: "Engineering, Where It Mattered",
    heading: "Production stability over theoretical chunking.",
    body: [
      "This project's strength is UI/UX and content architecture, not backend complexity — but two real engineering decisions are worth stating plainly.",
      "One form contract, two hosting environments: development ran on a Node-capable environment, while production runs on shared cPanel hosting with no persistent Node process — so the same contact/training/careers form contract is served by a portable PHP (PHPMailer) mail layer in production instead.",
      "A documented production build issue — splitting React into its own vendor chunk created a circular dependency that crashed the production build to a blank page — was resolved with a deliberate Vite/Rollup chunking strategy: React stays with its dependent libraries, while safer packages are isolated into their own chunks.",
    ],
    stackLabel: "Production architecture",
    stackSteps: ["React / Vite SPA", "Static cPanel Hosting", ".htaccess Routing", "PHP Mail Endpoint", "SMTP"],
    caveat: "The current production site is not WordPress-dependent — there is no evidence of a legacy system anywhere in its history.",
  },

  leadGen: {
    eyebrow: "Lead Generation",
    heading: "Three intentions. One conversion layer.",
    body: "Consultation requests, training registrations, and career applications are three distinct, working forms — all client-side validated, all posting to the same mail endpoint with a genuine loading/success/error state.",
    mediaCaption: "The Contact page, captured live from abdalwahb.com.",
    formsLabel: "Three real forms",
    forms: ["Consultation Request", "Training Registration", "Career Application + CV Upload"],
    cvNote: "CV upload genuinely works: PDF, DOC or DOCX up to 5 MB, validated by real file type on the server, not just its extension.",
  },

  gallery: {
    eyebrow: "Key Screens",
    heading: "The real website, across languages and devices.",
    items: {
      hero: { title: "Home — Arabic (default)", caption: "The Arabic-first home page, as it loads for every new visitor." },
      homeEn: { title: "Home — English", caption: "The same page after switching language." },
      services: { title: "Services", caption: "All eight service categories on one scannable page." },
      training: { title: "Training & Courses", caption: "Audience segments, program tracks, and the registration form." },
      profile: { title: "Profile / CV", caption: "Academic qualifications and professional memberships." },
      about: { title: "About", caption: "Mission, vision, and values." },
      careers: { title: "Careers", caption: "Benefits and the CV-upload application form." },
      contact: { title: "Contact", caption: "Office locations and the general enquiry form." },
      mobileHome: { title: "Home — Mobile", caption: "The Arabic home page at a 390px mobile width." },
    },
  },

  result: {
    eyebrow: "The Result",
    headingLine1: "Expertise,",
    headingLine2: "made easier to trust.",
    body: "Abdalwahb became a structured bilingual professional presence where consulting, compliance and training coexist without competing for attention — giving clients, learners and candidates clear paths through one coherent experience.",
  },

  finalCta: {
    eyebrow: "From Lux Studio",
    heading: "Have a project that needs this level of care?",
    description: "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
    visitWebsite: "Visit Abdalwahb",
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
    eyebrow: "دراسة حالة / ٠٥",
    title: "عبدالوهاب",
    subtitle: "المحاسبة والاستشارات والتدريب المهني",
    headlineLine1: "خبرة واسعة.",
    headlineLine2: "هوية رقمية واحدة وواضحة.",
    supporting:
      "قمنا بهيكلة المحاسبة والضرائب والاستشارات والتراخيص والتدريب المهني في تجربة واحدة متماسكة وثنائية اللغة — لمساعدة ممارسة مهنية يقودها مؤسسها على توصيل خبرتها الواسعة دون أن تبدو مجزأة أو صعبة التصفح.",
    metricLabels: {
      services: "فئات الخدمات",
      languages: "اللغات",
      pages: "الصفحات الرئيسية",
      leadForms: "نماذج التواصل",
    },
    services: ["تجربة المستخدم", "هيكلة المعلومات", "الواجهة الأمامية", "تجربة ثنائية اللغة", "دعم RTL", "توليد العملاء", "تحسين محركات البحث"],
    visitLiveWebsite: "زيارة الموقع المباشر",
    scrollHint: "مرر للاستكشاف",
  },

  glance: {
    eyebrow: "نظرة عامة على المشروع",
    headingLine1: "مكتب واحد.",
    headingLine2: "أسباب متعددة للزيارة.",
    body: "يغطي مكتب الدكتور محمد عبد الوهاب المحاسبة والمراجعة والضرائب والزكاة، وتأسيس الشركات، ودراسات الجدوى، والاستشارات المالية، واستشارات التحول الرقمي — بالإضافة إلى نشاط تدريب مهني منفصل، يخدم الأفراد والشركات في مصر والسعودية والإمارات. يُحتسب التدريب كخدمة إضافية ومستقلة إلى جانب فئات الخدمات الثماني، وليس ضمنها.",
    chips: ["تجربة ثنائية اللغة بالعربية أولاً", "تصميم أصيل لـ RTL", "مصداقية يقودها المؤسس", "استشارات + تعليم", "ثلاث قنوات لتوليد العملاء"],
  },

  challenge: {
    eyebrow: "المشكلة الجوهرية",
    heading: "الخبرة الواسعة قد تتحول إلى تعقيد.",
    body: [
      "يغطي المكتب المحاسبة والمراجعة والضرائب وتأسيس الشركات ودراسات الجدوى والاستشارات المالية والتحول الرقمي والتدريب المهني. كل واحدة من هذه الخدمات حقيقية ومستقلة، وقد يبحث عنها عميل بعينه تحديدًا.",
      "لم يكن التحدي في إضافة المزيد من المحتوى، بل في منح هذا الاتساع هيكلًا يفهمه العميل بسرعة، وباللغة التي يفكر بها فعليًا، دون أن يشعر المكتب بأنه مجزأ أو صعب التصفح.",
    ],
  },

  compression: {
    eyebrow: "من الاتساع إلى الوضوح",
    heading: "تسع خدمات، مضغوطة في تجربة واحدة.",
    body: "لم يكن القرار التصميمي الجوهري في هذا المشروع بصريًا — بل هيكليًا: كيف تُطوى تسع خدمات حقيقية في سبع وجهات مركّزة دون أن تفقد أيًا منها في الطريق.",
    offeringsLabel: "٩ خدمات حقيقية",
    offerings: [
      "المحاسبة",
      "المراجعة",
      "الضرائب والزكاة",
      "تأسيس الشركات",
      "دراسات الجدوى",
      "الاستشارات المالية",
      "خدمات الاستيراد والتصدير",
      "التحول الرقمي",
      "التدريب",
    ],
    routesLabel: "هيكلة المعلومات",
    outcome: "تجربة مهنية واحدة ومنظمة",
  },

  architecture: {
    eyebrow: "هيكلة المعلومات",
    headingLine1: "تسع خدمات.",
    headingLine2: "سبع وجهات مركّزة.",
    body: [
      "تمت معالجة الاتساع من خلال التسلسل الهرمي، لا من خلال تكاثر الصفحات. تعيش فئات الخدمات الثماني في صفحة خدمات واحدة قابلة للتصفح السريع، لا في ثماني صفحات تفصيلية منفصلة؛ ويحصل التدريب على وجهته الخاصة لأنه يخدم جمهورًا مختلفًا فعليًا.",
      "يتجنب الموقع عمدًا عشرات صفحات الخدمة أو الدورة التفصيلية — وهذا قرار في هيكلة المحتوى، لا نقص في الميزات. سبعة مسارات تحمل التجربة بأكملها.",
    ],
    routesLabel: "المسارات السبعة الحقيقية",
    routes: ["الرئيسية", "من نحن", "الخدمات", "التدريب", "السيرة الذاتية", "الوظائف", "تواصل معنا"],
  },

  journeys: {
    eyebrow: "رحلات المستخدم الأساسية",
    headingLine1: "موقع واحد.",
    headingLine2: "نيتان أساسيتان.",
    body: "يصل العميل المحتمل والمتدرب المحتمل بأسئلة مختلفة. كلاهما على بُعد نقرة واحدة من الرئيسية، وكلاهما ينتهي إلى نموذج مُصمم تحديدًا لما يسأل عنه.",
    clientLabel: "العميل — يبحث عن خدمة",
    clientSteps: ["الرئيسية", "الخدمات", "من نحن / السيرة الذاتية", "تواصل معنا"],
    learnerLabel: "المتدرب — يبحث عن تدريب",
    learnerSteps: ["الرئيسية", "التدريب", "معاينة الدورة", "التسجيل"],
    careersLabel: "المتقدم للوظائف — مسار ثالث أصغر",
    careersSteps: ["الوظائف", "التقديم", "رفع السيرة الذاتية"],
  },

  bilingual: {
    eyebrow: "تجربة عربية أولاً",
    headingLine1: "العربية لم تكن ترجمة.",
    headingLine2: "بل كانت نقطة البداية.",
    intro:
      "العربية هي اللغة الافتراضية التي يُحمَّل بها الموقع، وليست خيارًا أُضيف لاحقًا فوق بناء إنجليزي أولاً. يؤدي تبديل اللغة إلى تغيير اتجاه المستند ولغته نفسيهما، وتبديل الواجهة بالكامل بين خط Cairo (العربية) وخط Inter (الإنجليزية)، وعكس التخطيط باستخدام مواضع منطقية للبداية/النهاية بدلاً من قيم يمين/يسار ثابتة — بحيث يكون RTL نمط تخطيط أصيلًا، لا حيلة في ورقة الأنماط.",
    languages: ["العربية — افتراضية، RTL", "الإنجليزية — LTR"],
    mirrorArLabel: "العربية · RTL",
    mirrorEnLabel: "الإنجليزية · LTR",
    mirrorCaption:
      "الصفحة الرئيسية نفسها بكلتا اللغتين: الشعار وترتيب التنقل ومحاذاة النص وإيقاع العناوين، كلها تنعكس فعليًا بين RTL و LTR — وصولًا إلى عمل خاص بالمشروع حول كيفية تقسيم سطر العنوان الرئيسي بالعربية.",
    caveat:
      "هذه تجربة ثنائية اللغة بالكامل من جانب العميل، بتصميم أصيل لـ RTL — تُقدَّم كلتا اللغتين على نفس الرابط، لذا فهي ليست تحسين محركات بحث متعدد اللغات موجَّهًا بروابط منفصلة لكل لغة أو موجَّهًا من جانب الخادم.",
  },

  systems: {
    eyebrow: "تجربة واحدة. أنظمة متعددة.",
    headingLine1: "تجربة واحدة.",
    headingLine2: "أنظمة متعددة.",
    body: "بالنسبة لممارسة مهنية بلا بنية تحتية تقنية لرسمها، فإن هذه \"الأنظمة\" الثلاثة هي ركائز المحتوى الحقيقية للموقع لا طبقات برمجية — الاستشارات، والامتثال، والتعليم، وجميعها تنتهي إلى نفس النتيجة.",
    diagram: {
      root: "عبدالوهاب",
      systems: ["استشارات", "الامتثال", "التعليم"],
      subsystems: ["المحاسبة", "الضرائب", "التدريب"],
      convergence: "الثقة المهنية",
    },
  },

  services: {
    eyebrow: "هيكلة الخدمات",
    heading: "ممارسة واسعة، دون عبء التصفح.",
    body: "ثماني فئات خدمات، لكل منها وصف موجز ودعوة لطلب استشارة، معروضة في شبكة واحدة قابلة للتصفح السريع لا كتالوج منتجات.",
    mediaCaption: "صفحة الخدمات، مُلتقطة مباشرة من abdalwahb.com.",
    categoriesLabel: "الفئات الثماني",
    categories: [
      "خدمات المحاسبة",
      "خدمات المراجعة",
      "استشارات الضرائب والزكاة",
      "تأسيس الشركات والتراخيص",
      "دراسات الجدوى",
      "الاستشارات المالية والإدارية",
      "خدمات بطاقات الاستيراد والتصدير",
      "تكنولوجيا المعلومات والتحول الرقمي",
    ],
  },

  training: {
    eyebrow: "التدريب والكورسات",
    heading: "تعليم دون التظاهر بأنه نظام إدارة تعلّم.",
    body: "صفحة مخصصة للتسويق للتدريب — فئات الجمهور، مسارات برامج للمحاسبين ولفرق الشركات، طرق التقديم، فيديو معاينة للدورة، ونموذج تسجيل مصمم لتحويل الاهتمام إلى استفسار حقيقي.",
    mediaCaption: "صفحة التدريب، مُلتقطة مباشرة من abdalwahb.com.",
    audienceLabel: "لمن صُمم",
    audience: ["المحاسبون", "حديثو التخرج", "موظفو الشركات", "أصحاب الأعمال", "فرق المالية"],
    caveat:
      "هذه رحلة تسويقية للتدريب مصممة لتحويل الاهتمام إلى تسجيل — وليست منصة دورات. لا يوجد تسجيل دخول، ولا مكتبة دورات، ولا لوحة تحكم للطالب، ولا تتبع للتقدم، ولا شراء للدورات.",
  },

  trust: {
    eyebrow: "بنية الثقة",
    heading: "ثقة دون جدار من الشعارات.",
    body: "بالنسبة لممارسة مهنية يقودها مؤسسها، كان لا بد أن تأتي المصداقية من خبرة يمكن التحقق منها لا من دليل اجتماعي عام. لا يحمل الموقع الحقيقي أي شهادات عملاء ولا شريط شعارات — بل تُبنى الثقة بالكامل على اعتمادات حقيقية وقابلة للتحقق.",
    mediaCaption: "صفحة السيرة الذاتية، مُلتقطة مباشرة من abdalwahb.com.",
    credentialsLabel: "ما يحمل الثقة فعليًا",
    credentials: ["بكالوريوس وماجستير ودكتوراه في المحاسبة والتمويل", "٦ عضويات مهنية", "مكتبان فعليان", "بيانات هيكلية لخدمة محاسبية", "بيانات هيكلية للمؤسس"],
    caveat: "كل اعتماد ظاهر هنا حقيقي وقابل للتحقق بشكل مستقل — لا شيء منه مقدَّر أو مُختلَق.",
  },

  visualIdentity: {
    eyebrow: "الهوية البصرية والحركة",
    heading: "احترافي، دون أن يصبح بعيدًا.",
    body: "يُقرأ اللون الكحلي كثقة مالية ومؤسسية؛ ويمنع لون تركوازي واحد الموقع من أن يبدو باردًا أو مؤسسيًا عامًا. تُستخدم الحركة بتحفظ — كشف عند التمرير، ومُحمِّل صورة رئيسية واعٍ بالتخزين المؤقت يتجاوز حركة الظهور التدريجي إذا كانت الصورة محفوظة بالفعل، واحترام كامل لخيار تقليل الحركة.",
    mediaCaption: "صفحة من نحن، مُلتقطة مباشرة من abdalwahb.com.",
    tokensLabel: "رموز التصميم الحقيقية",
    typographyLabel: "الخطوط",
    typography: ["Cairo — العربية (RTL)", "Inter — الإنجليزية (LTR)"],
    componentLabel: "أساس المكونات",
    componentNote:
      "بُني الموقع على أساس مكونات قابلة لإعادة الاستخدام (مكتبة shadcn/Radix بالإضافة إلى عدد من مكونات الموقع المبنية يدويًا)، ما يدعم تفاعلًا وتنسيقًا متسقين عبر تجربة السبع صفحات — وليس كل مكون مُثبَّت مُستخدَمًا فعليًا في صفحة حية.",
    motionLabel: "حركة مقصودة",
    motionNote: "كشف عند التمرير عبر Framer Motion، ومُحمِّل رئيسي واعٍ بالتخزين المؤقت، ودعم كامل لتقليل الحركة — بلا GSAP، ولا نظام بارالاكس، ولا حركة كانفاس أو شبكية.",
  },

  engineering: {
    eyebrow: "الهندسة، حيث كانت مهمة",
    heading: "استقرار الإنتاج قبل التقسيم النظري.",
    body: [
      "قوة هذا المشروع تكمن في تجربة المستخدم وهيكلة المحتوى، لا في تعقيد الخلفية البرمجية — لكن هناك قرارين هندسيين حقيقيين يستحقان الذكر بوضوح.",
      "عقد نموذج واحد، بيئتا استضافة: جرى التطوير في بيئة تدعم Node، بينما يعمل الإنتاج على استضافة cPanel مشتركة بلا عملية Node دائمة — لذا تُخدَّم نماذج التواصل والتدريب والوظائف نفسها عبر طبقة بريد PHP (PHPMailer) قابلة للنقل في بيئة الإنتاج بدلًا من ذلك.",
      "مشكلة موثقة في بناء الإنتاج — أدى فصل React في حزمة مورّدين خاصة به إلى اعتمادية دائرية أدت إلى تعطل بناء الإنتاج بصفحة فارغة — وحُلّت باستراتيجية تجزئة مدروسة عبر Vite/Rollup: يبقى React مع المكتبات المعتمدة عليه، بينما تُعزل الحزم الأكثر أمانًا في حزمها الخاصة.",
    ],
    stackLabel: "بنية الإنتاج",
    stackSteps: ["تطبيق React / Vite أحادي الصفحة", "استضافة cPanel ثابتة", "توجيه عبر .htaccess", "نقطة نهاية بريد PHP", "SMTP"],
    caveat: "موقع الإنتاج الحالي لا يعتمد على WordPress — لا يوجد أي دليل على نظام قديم في تاريخه.",
  },

  leadGen: {
    eyebrow: "توليد العملاء",
    heading: "ثلاث نوايا. طبقة تحويل واحدة.",
    body: "طلبات الاستشارة، وتسجيلات التدريب، وطلبات التوظيف هي ثلاثة نماذج حقيقية وعاملة — جميعها مُتحقَّق منها من جانب العميل، وجميعها تُرسَل إلى نفس نقطة نهاية البريد بحالة تحميل/نجاح/خطأ حقيقية.",
    mediaCaption: "صفحة تواصل معنا، مُلتقطة مباشرة من abdalwahb.com.",
    formsLabel: "ثلاثة نماذج حقيقية",
    forms: ["طلب استشارة", "تسجيل تدريب", "طلب توظيف + رفع سيرة ذاتية"],
    cvNote: "رفع السيرة الذاتية يعمل فعليًا: PDF أو DOC أو DOCX حتى ٥ ميجابايت، يُتحقق من نوعه الحقيقي على الخادم لا من امتداده فقط.",
  },

  gallery: {
    eyebrow: "أهم الشاشات",
    heading: "الموقع الحقيقي، عبر اللغات والأجهزة.",
    items: {
      hero: { title: "الرئيسية — عربي (افتراضي)", caption: "الصفحة الرئيسية بالعربية أولاً، كما تظهر لكل زائر جديد." },
      homeEn: { title: "الرئيسية — إنجليزي", caption: "الصفحة نفسها بعد تبديل اللغة." },
      services: { title: "الخدمات", caption: "فئات الخدمات الثماني في صفحة واحدة قابلة للتصفح السريع." },
      training: { title: "التدريب والكورسات", caption: "فئات الجمهور، ومسارات البرامج، ونموذج التسجيل." },
      profile: { title: "السيرة الذاتية", caption: "المؤهلات الأكاديمية والعضويات المهنية." },
      about: { title: "من نحن", caption: "الرسالة والرؤية والقيم." },
      careers: { title: "الوظائف", caption: "المزايا ونموذج التقديم برفع السيرة الذاتية." },
      contact: { title: "تواصل معنا", caption: "مواقع المكاتب ونموذج الاستفسار العام." },
      mobileHome: { title: "الرئيسية — جوال", caption: "الصفحة الرئيسية بالعربية بعرض ٣٩٠ بكسل." },
    },
  },

  result: {
    eyebrow: "النتيجة",
    headingLine1: "خبرة،",
    headingLine2: "أصبحت أسهل في الثقة بها.",
    body: "أصبح عبدالوهاب حضورًا مهنيًا ثنائي اللغة ومنظمًا، حيث تتعايش الاستشارات والامتثال والتدريب دون أن يتنافس أي منها على الانتباه — ما يمنح العملاء والمتدربين والمتقدمين للوظائف مسارات واضحة عبر تجربة واحدة متماسكة.",
  },

  finalCta: {
    eyebrow: "من إنتاج Lux Studio",
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description: "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
    visitWebsite: "زيارة عبدالوهاب",
    nextCaseStudy: "دراسة الحالة التالية",
    comingSoon: "المزيد من دراسات الحالة قريبًا",
  },

  common: {
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    pendingScreen: "الشاشة قادمة قريبًا",
    backToWork: "العودة إلى الأعمال",
  },
};

export type AbdalwahbCopy = typeof en;
export const abdalwahbCopy: Dict<AbdalwahbCopy> = { en, ar };
