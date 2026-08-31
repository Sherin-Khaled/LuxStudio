import type { Dict } from "../useDict";

/**
 * Copy for ProcessJourneySection — the six-step "from idea to launch"
 * timeline. `progress` ("03 / 06") is a numeric position indicator, not
 * language content, so it stays identical in both locales.
 */
const en = {
  progress: "03 / 06",
  headingLine1: "From idea",
  headingLine2: "to launch.",
  description:
    "A clear, collaborative process that turns strategy, content, design, development, and systems into a complete digital experience.",
  note: "Every stage is reviewed, refined, and approved before moving forward.",
  ariaStepsLabel: "Project process steps",
  steps: [
    {
      id: "01",
      title: "Discover",
      description:
        "We understand the business, audience, goals, challenges, existing digital presence, and what the project needs to achieve.",
      tags: "Research · Goals · Audience",
    },
    {
      id: "02",
      title: "Define",
      description:
        "We shape the strategy, project scope, content direction, sitemap, features, user journey, and approval milestones.",
      tags: "Strategy · Structure · Scope",
    },
    {
      id: "03",
      title: "Create",
      description:
        "We produce and refine the creative assets the project needs, including graphic design, image editing, photography, video editing, and visual content direction.",
      tags: "Graphics · Photography · Video · Content",
    },
    {
      id: "04",
      title: "Design",
      description:
        "We create wireframes, visual direction, UI systems, responsive layouts, and interactive prototypes ready for development.",
      tags: "UX · UI · Design System",
    },
    {
      id: "05",
      title: "Build & Connect",
      description:
        "We develop the frontend, connect backend systems, integrate dashboards, CMS platforms, APIs, databases, and business tools when needed.",
      tags: "Frontend · Backend · CMS · Dashboards",
    },
    {
      id: "06",
      title: "Optimize, Launch & Support",
      description:
        "We test responsiveness, performance, accessibility, SEO, and launch readiness, then support future updates and improvements after launch.",
      tags: "SEO · Performance · Testing · Support",
    },
  ],
};

const ar: typeof en = {
  progress: "03 / 06",
  headingLine1: "من الفكرة",
  headingLine2: "إلى الإطلاق.",
  description:
    "عملية واضحة وتعاونية تحوّل الاستراتيجية والمحتوى والتصميم والتطوير والأنظمة إلى تجربة رقمية متكاملة.",
  note: "تتم مراجعة كل مرحلة وصقلها واعتمادها قبل الانتقال إلى ما يليها.",
  ariaStepsLabel: "مراحل عملية المشروع",
  steps: [
    {
      id: "01",
      title: "الاكتشاف",
      description:
        "نتعرّف على طبيعة العمل، والجمهور المستهدف، والأهداف، والتحديات، والحضور الرقمي الحالي، وما يحتاج المشروع لتحقيقه.",
      tags: "البحث · الأهداف · الجمهور",
    },
    {
      id: "02",
      title: "التحديد",
      description:
        "نصوغ الاستراتيجية ونطاق المشروع، ووجهة المحتوى، وخريطة الموقع، والميزات، ورحلة المستخدم، ومحطات الاعتماد.",
      tags: "الاستراتيجية · البنية · النطاق",
    },
    {
      id: "03",
      title: "الإبداع",
      description:
        "ننتج ونصقل الأصول الإبداعية التي يحتاجها المشروع، من التصميم الجرافيكي وتحرير الصور والتصوير الفوتوغرافي ومونتاج الفيديو إلى توجيه المحتوى البصري.",
      tags: "التصميم الجرافيكي · التصوير · الفيديو · المحتوى",
    },
    {
      id: "04",
      title: "التصميم",
      description:
        "نُعدّ المخططات الأولية، والتوجه البصري، وأنظمة الواجهات، والتصاميم المتجاوبة، والنماذج التفاعلية الجاهزة للتطوير.",
      tags: "UX · UI · نظام التصميم",
    },
    {
      id: "05",
      title: "البناء والربط",
      description:
        "نطوّر الواجهة الأمامية، ونربط الأنظمة الخلفية، وندمج لوحات التحكم ومنصات إدارة المحتوى وواجهات البرمجة وقواعد البيانات وأدوات الأعمال عند الحاجة.",
      tags: "الواجهة الأمامية · الواجهة الخلفية · إدارة المحتوى · لوحات التحكم",
    },
    {
      id: "06",
      title: "التحسين والإطلاق والدعم",
      description:
        "نختبر التجاوب والأداء وإمكانية الوصول وتحسين محركات البحث وجاهزية الإطلاق، ثم ندعم التحديثات والتحسينات المستقبلية بعد الإطلاق.",
      tags: "تحسين محركات البحث · الأداء · الاختبار · الدعم",
    },
  ],
};

export const processJourneyDict: Dict<typeof en> = { en, ar };
