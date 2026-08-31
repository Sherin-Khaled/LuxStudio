import type { Dict } from "../useDict";

/**
 * Copy for StudioValueSection — the closing "one studio" layered-system
 * argument. `progress` ("06 / 06") is a numeric position indicator, not
 * language content, so it stays identical in both locales. The trailing
 * arrow on the CTA link is rendered separately in the component (a
 * flippable glyph, not part of the translatable string).
 */
const en = {
  progress: "06 / 06",
  heading: "One studio for the brand, the website, and the system behind it.",
  description:
    "We combine creative direction, content, UI/UX, frontend, backend, dashboards, SEO, and launch support into one connected process — so every part of the digital experience feels consistent, fast, and ready to grow.",
  ctaLabel: "Start a project with us",
  layers: [
    {
      num: "01",
      title: "Brand Direction",
      description: "Visual identity, positioning, and communication direction.",
    },
    {
      num: "02",
      title: "Content & Visuals",
      description: "Copy, imagery, graphics, photography, and edited assets.",
    },
    {
      num: "03",
      title: "UX/UI System",
      description: "Page structure, interface design, responsive layouts, and design systems.",
    },
    {
      num: "04",
      title: "Frontend Experience",
      description: "Fast, responsive, animated interfaces built for real users.",
    },
    {
      num: "05",
      title: "Backend & Dashboards",
      description: "CMS, admin panels, APIs, databases, and business tools.",
    },
    {
      num: "06",
      title: "SEO, Launch & Support",
      description: "Performance, accessibility, SEO, deployment, and future updates.",
    },
  ],
};

const ar: typeof en = {
  progress: "06 / 06",
  heading: "استوديو واحد للعلامة، والموقع، والنظام الذي يقف خلفهما.",
  description:
    "نجمع التوجيه الإبداعي والمحتوى وتصميم واجهات المستخدم والواجهة الأمامية والخلفية ولوحات التحكم وتحسين محركات البحث ودعم الإطلاق ضمن عملية واحدة متصلة، بحيث يبدو كل جزء من التجربة الرقمية متسقًا وسريعًا وجاهزًا للنمو.",
  ctaLabel: "ابدأ مشروعك معنا",
  layers: [
    {
      num: "01",
      title: "التوجيه البصري للعلامة",
      description: "الهوية البصرية، والتموضع، وتوجيه الخطاب التواصلي.",
    },
    {
      num: "02",
      title: "المحتوى والعناصر البصرية",
      description: "النصوص، والصور، والتصاميم الجرافيكية، والتصوير الفوتوغرافي، والأصول المُعالجة.",
    },
    {
      num: "03",
      title: "نظام UX/UI",
      description: "بنية الصفحات، وتصميم الواجهات، والتصاميم المتجاوبة، وأنظمة التصميم.",
    },
    {
      num: "04",
      title: "تجربة الواجهة الأمامية",
      description: "واجهات سريعة ومتجاوبة ومتحركة، مبنية لخدمة مستخدمين حقيقيين.",
    },
    {
      num: "05",
      title: "الواجهة الخلفية ولوحات التحكم",
      description: "أنظمة إدارة المحتوى، ولوحات الإدارة، وواجهات البرمجة، وقواعد البيانات، وأدوات الأعمال.",
    },
    {
      num: "06",
      title: "تحسين محركات البحث والإطلاق والدعم",
      description: "الأداء، وإمكانية الوصول، وتحسين محركات البحث، والنشر، والتحديثات المستقبلية.",
    },
  ],
};

export const studioValueDict: Dict<typeof en> = { en, ar };
