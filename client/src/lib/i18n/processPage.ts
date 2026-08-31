import type { Dict } from "./useDict";

/**
 * Copy for ProcessPage.tsx. Follows the project-wide dictionary pattern: `en`
 * defines the shape, `ar` is typed as `typeof en` so a missing/extra key is a
 * compile error. Section keys mirror the page's own section comments (HERO,
 * FLIGHT PATH OVERVIEW, DETAILED STAGES, APPROVAL GATES, WHAT WE NEED, LAUNCH
 * CHECKLIST, CTA) so it's easy to find the right string while editing the
 * JSX. Step/gate `num` fields are kept identical across `en`/`ar` on purpose
 * (Western digits, not translated) — matches `num` fields in other page
 * dictionaries like aboutPage.ts's `values.items`.
 */
const en = {
  hero: {
    eyebrow: "Process",
    headingLine1: "A clear path from",
    headingLine2: "idea to launch.",
    body: "We guide every project through strategy, content, design, development, testing, and launch — so the final experience feels premium, functional, and ready to grow.",
    tagline: "Discovery · Design · Build · Connect · Optimize · Launch",
  },
  flightPath: {
    label: "Flight Path",
    heading: "Six stages. One connected journey.",
    nodes: [
      { num: "01", label: "Discover" },
      { num: "02", label: "Define" },
      { num: "03", label: "Create" },
      { num: "04", label: "Design" },
      { num: "05", label: "Build & Connect" },
      { num: "06", label: "Optimize, Launch & Support" },
    ],
  },
  stagesSection: {
    label: "Stages",
    heading: "What happens at each stage.",
    whatHappensLabel: "What happens",
    clientInvolvementLabel: "Client involvement",
  },
  stages: [
    {
      num: "01",
      title: "Discover",
      description:
        "We start by understanding the business, audience, goals, services, products, competitors, and the digital problem the website or system needs to solve.",
      happens: ["Business discovery", "Audience understanding", "Project goals", "Competitor review", "Website purpose", "Initial direction"],
      client: "Client shares business details, current problems, goals, and available references.",
    },
    {
      num: "02",
      title: "Define",
      description:
        "We turn the discovery into structure: sitemap, user journey, page priorities, features, content needs, and the experience direction.",
      happens: ["Sitemap", "User flows", "Page structure", "Feature planning", "Content outline", "Technical direction"],
      client: "Client reviews and approves the structure before visual design begins.",
    },
    {
      num: "03",
      title: "Create",
      description:
        "We prepare the content and visual assets that support the website, including written content, product data, images, graphics, and media direction when needed.",
      happens: ["Website copy", "Content shaping", "Product data", "Image direction", "Photo editing", "Video / graphic support"],
      client: "Client provides business information, numbers, product details, and brand assets. We shape them into website-ready content.",
    },
    {
      num: "04",
      title: "Design",
      description:
        "We design the interface, visual system, responsiveness, interactions, and page experience with both users and development in mind.",
      happens: ["Wireframes", "UI direction", "High-fidelity screens", "Responsive layouts", "Design system", "Motion direction"],
      client: "Client reviews the design, gives feedback, and approves the visual direction before development.",
    },
    {
      num: "05",
      title: "Build & Connect",
      description:
        "We build the frontend, connect backend logic when needed, prepare dashboards, CMS systems, APIs, authentication, product flows, and real business functionality.",
      happens: ["Frontend development", "Backend development", "CMS / dashboard", "APIs", "Authentication", "E-commerce logic", "Database structure"],
      client: "Client tests key flows and confirms that the system behavior matches the business needs.",
    },
    {
      num: "06",
      title: "Optimize, Launch & Support",
      description:
        "We test responsiveness, speed, SEO, accessibility basics, content accuracy, deployment readiness, hosting, and post-launch updates.",
      happens: ["Performance testing", "SEO setup", "Responsive QA", "Accessibility basics", "Hosting / deployment", "Future support"],
      client: "Client gives final approval before launch and can continue with future improvements or maintenance.",
    },
  ],
  approvalGates: {
    label: "Collaboration",
    heading: "Every stage has a clear review point.",
    body: "We avoid surprises by reviewing the structure, content, design, development, and launch details with the client before moving forward.",
    gates: [
      { num: "01", title: "Structure Approval", desc: "Sitemap, pages, user flow, and feature direction are reviewed before design." },
      { num: "02", title: "Design Approval", desc: "Visual direction, layouts, responsiveness, and interaction ideas are approved before development." },
      { num: "03", title: "Build Review", desc: "Core flows, backend behavior, dashboards, CMS, and forms are tested before final polish." },
      { num: "04", title: "Launch Approval", desc: "Speed, SEO, responsiveness, content, and deployment readiness are checked before going live." },
    ],
  },
  clientInputs: {
    label: "Client Inputs",
    heading: "What helps us move faster.",
    body: "The better the starting information, the smoother the strategy, design, and build process becomes.",
    items: [
      "Business details",
      "Services or product information",
      "Brand assets or references",
      "Photos, videos, or visual material",
      "Target audience information",
      "Website goals",
      "Access to hosting, domain, or existing systems when needed",
      "Feedback and approvals at key stages",
    ],
  },
  launchChecklist: {
    label: "Before Launch",
    headingLine1: "Launch is part of the process,",
    headingLine2: "not the end of it.",
    body: "Before a website goes live, we check the details that affect real performance, visibility, usability, and client confidence.",
    items: [
      "Responsive behavior",
      "Speed and performance",
      "SEO structure",
      "Content accuracy",
      "Forms and contact flows",
      "CMS / dashboard access",
      "Image optimization",
      "Hosting and deployment",
      "Basic accessibility",
      "Post-launch updates",
    ],
  },
  cta: {
    eyebrow: "Ready",
    heading: "Ready to move from idea to launch?",
    description: "Tell us what you want to build, and we will shape the right process around your goals, content, design, and technical needs.",
    secondaryLabel: "View Work",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "المنهجية",
    headingLine1: "مسار واضح من الفكرة",
    headingLine2: "إلى الانطلاق.",
    body: "نرافق كل مشروع عبر مراحل الاستراتيجية والمحتوى والتصميم والتطوير والاختبار والإطلاق، لتخرج التجربة النهائية فاخرة وعملية وجاهزة للنمو.",
    tagline: "الاكتشاف · التصميم · البناء · الربط · التحسين · الإطلاق",
  },
  flightPath: {
    label: "مسار الرحلة",
    heading: "ست مراحل. رحلة واحدة متكاملة.",
    nodes: [
      { num: "01", label: "الاكتشاف" },
      { num: "02", label: "التحديد" },
      { num: "03", label: "الإنشاء" },
      { num: "04", label: "التصميم" },
      { num: "05", label: "البناء والربط" },
      { num: "06", label: "التحسين والإطلاق والدعم" },
    ],
  },
  stagesSection: {
    label: "المراحل",
    heading: "ما الذي يحدث في كل مرحلة.",
    whatHappensLabel: "ماذا يحدث",
    clientInvolvementLabel: "دور العميل",
  },
  stages: [
    {
      num: "01",
      title: "الاكتشاف",
      description:
        "نبدأ بفهم طبيعة العمل والجمهور المستهدف والأهداف والخدمات والمنتجات والمنافسين، وتحديد المشكلة الرقمية التي يجب أن يحلها الموقع أو النظام.",
      happens: ["اكتشاف طبيعة العمل", "فهم الجمهور المستهدف", "أهداف المشروع", "دراسة المنافسين", "الغاية من الموقع", "التوجه المبدئي"],
      client: "يشارك العميل تفاصيل عمله، والتحديات الحالية، والأهداف، وأي مراجع متاحة.",
    },
    {
      num: "02",
      title: "التحديد",
      description:
        "نحوّل نتائج الاكتشاف إلى بنية واضحة: خريطة الموقع، ورحلة المستخدم، وأولويات الصفحات، والمزايا، واحتياجات المحتوى، وتوجه التجربة.",
      happens: ["خريطة الموقع", "مسارات المستخدم", "بنية الصفحات", "تخطيط المزايا", "مخطط المحتوى", "التوجه التقني"],
      client: "يراجع العميل البنية ويعتمدها قبل البدء بالتصميم البصري.",
    },
    {
      num: "03",
      title: "الإنشاء",
      description:
        "نجهّز المحتوى والعناصر البصرية التي يعتمد عليها الموقع، بما في ذلك المحتوى المكتوب وبيانات المنتجات والصور والرسوميات وتوجيه الوسائط عند الحاجة.",
      happens: ["نصوص الموقع", "صياغة المحتوى", "بيانات المنتجات", "توجيه الصور", "تحرير الصور", "دعم الفيديو والرسوميات"],
      client: "يزوّدنا العميل بمعلومات العمل والأرقام وتفاصيل المنتجات وعناصر الهوية، ونتولى صياغتها في محتوى جاهز للموقع.",
    },
    {
      num: "04",
      title: "التصميم",
      description:
        "نصمم الواجهة والنظام البصري والتجاوب والتفاعلات وتجربة الصفحات، مع مراعاة المستخدم ومتطلبات التطوير معًا.",
      happens: ["المخططات الأولية", "توجه الواجهة", "شاشات عالية الدقة", "تخطيطات متجاوبة", "نظام التصميم", "توجه الحركة"],
      client: "يراجع العميل التصميم، ويقدّم ملاحظاته، ويعتمد التوجه البصري قبل البدء بالتطوير.",
    },
    {
      num: "05",
      title: "البناء والربط",
      description:
        "نبني واجهة الاستخدام الأمامية، ونربطها بمنطق الخلفية عند الحاجة، ونجهّز لوحات التحكم وأنظمة CMS وواجهات APIs والمصادقة ومسارات المنتجات ووظائف العمل الفعلية.",
      happens: ["تطوير الواجهة الأمامية", "تطوير الواجهة الخلفية", "CMS ولوحة التحكم", "APIs", "المصادقة", "منطق التجارة الإلكترونية", "بنية قاعدة البيانات"],
      client: "يختبر العميل المسارات الأساسية، ويتأكد من أن سلوك النظام يلبي احتياجات العمل.",
    },
    {
      num: "06",
      title: "التحسين والإطلاق والدعم",
      description:
        "نختبر التجاوب والسرعة وSEO وأساسيات إمكانية الوصول ودقة المحتوى وجاهزية النشر والاستضافة والتحديثات بعد الإطلاق.",
      happens: ["اختبار الأداء", "إعداد SEO", "فحص التجاوب", "أساسيات إمكانية الوصول", "الاستضافة والنشر", "الدعم المستقبلي"],
      client: "يمنح العميل الموافقة النهائية قبل الإطلاق، ويمكنه لاحقًا متابعة التحسينات أو الصيانة المستقبلية.",
    },
  ],
  approvalGates: {
    label: "التعاون",
    heading: "لكل مرحلة نقطة مراجعة واضحة.",
    body: "نتجنّب أي مفاجآت من خلال مراجعة البنية والمحتوى والتصميم والتطوير وتفاصيل الإطلاق مع العميل قبل الانتقال إلى الخطوة التالية.",
    gates: [
      { num: "01", title: "اعتماد البنية", desc: "تُراجَع خريطة الموقع والصفحات ومسار المستخدم وتوجه المزايا قبل بدء التصميم." },
      { num: "02", title: "اعتماد التصميم", desc: "يُعتمد التوجه البصري والتخطيطات والتجاوب وأفكار التفاعل قبل بدء التطوير." },
      { num: "03", title: "مراجعة البناء", desc: "تُختبر المسارات الأساسية وسلوك الخلفية ولوحات التحكم وCMS والنماذج قبل اللمسات الأخيرة." },
      { num: "04", title: "اعتماد الإطلاق", desc: "تُفحص السرعة وSEO والتجاوب والمحتوى وجاهزية النشر قبل الانطلاق الفعلي." },
    ],
  },
  clientInputs: {
    label: "مدخلات العميل",
    heading: "ما الذي يساعدنا على التقدّم بسرعة أكبر.",
    body: "كلما كانت المعلومات الأولية أوضح، كانت مراحل الاستراتيجية والتصميم والبناء أكثر سلاسة.",
    items: [
      "تفاصيل العمل",
      "معلومات الخدمات أو المنتجات",
      "عناصر الهوية أو المراجع البصرية",
      "الصور أو الفيديوهات أو المواد البصرية",
      "معلومات الجمهور المستهدف",
      "أهداف الموقع",
      "الوصول إلى الاستضافة أو النطاق أو الأنظمة الحالية عند الحاجة",
      "الملاحظات والموافقات في المراحل الرئيسية",
    ],
  },
  launchChecklist: {
    label: "قبل الإطلاق",
    headingLine1: "الإطلاق جزء من المسار،",
    headingLine2: "وليس نهايته.",
    body: "قبل أن يُطلَق الموقع، نراجع التفاصيل التي تؤثر في الأداء الفعلي وقابلية الظهور وسهولة الاستخدام وثقة العميل.",
    items: [
      "سلوك التجاوب",
      "السرعة والأداء",
      "بنية SEO",
      "دقة المحتوى",
      "النماذج ومسارات التواصل",
      "الوصول إلى CMS ولوحة التحكم",
      "تحسين الصور",
      "الاستضافة والنشر",
      "أساسيات إمكانية الوصول",
      "التحديثات بعد الإطلاق",
    ],
  },
  cta: {
    eyebrow: "جاهزون",
    heading: "هل أنتم جاهزون للانتقال من الفكرة إلى الإطلاق؟",
    description: "أخبرونا بما ترغبون في بنائه، وسنصمم المسار المناسب وفق أهدافكم ومحتواكم وتصميمكم واحتياجاتكم التقنية.",
    secondaryLabel: "استعرض الأعمال",
  },
};

export const processPageDict: Dict<typeof en> = { en, ar };
