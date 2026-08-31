import type { Dict } from "../useDict";

/**
 * Copy for OfferingsOverviewSection's six service cards. The GSAP slide
 * direction per card (-1/1, alternating) is animation data, not copy — it
 * stays in the component as a plain numeric array, kept in sync by index
 * with this list.
 */
const en = {
  heading: "What We Create",
  subheading: "Six core capabilities that combine design, technology, content, and growth.",
  services: [
    {
      id: "A.01",
      title: "Digital Product Design",
      description:
        "UX strategy, UI design, design systems, wireframes, and prototypes shaped around clarity, usability, and scalable structure.",
    },
    {
      id: "A.02",
      title: "High-Performance Websites",
      description:
        "Responsive websites built with modern frontend architecture, strong performance, and a premium experience across every screen.",
    },
    {
      id: "A.03",
      title: "Motion & Scroll Experiences",
      description:
        "Purposeful animation, cinematic interaction, and smooth scrolling that strengthen storytelling without becoming distracting.",
    },
    {
      id: "A.04",
      title: "Business Systems & Integrations",
      description:
        "Dashboards, CMS platforms, admin panels, APIs, and connected systems that help businesses operate and scale.",
    },
    {
      id: "A.05",
      title: "Brand & Content Experiences",
      description:
        "Brand direction, visual content, marketing assets, video editing, and creative experiences designed for consistent communication.",
    },
    {
      id: "A.06",
      title: "SEO & Performance",
      description:
        "Technical SEO, accessibility, Core Web Vitals, and frontend optimization designed to improve visibility and speed.",
    },
  ],
};

const ar: typeof en = {
  heading: "ما نبتكره",
  subheading: "ست قدرات أساسية تجمع بين التصميم والتقنية والمحتوى والنمو.",
  services: [
    {
      id: "A.01",
      title: "تصميم المنتجات الرقمية",
      description:
        "استراتيجية تجربة المستخدم، وتصميم الواجهات، وأنظمة التصميم، والمخططات الأولية، والنماذج الأولية، جميعها مبنية على الوضوح وسهولة الاستخدام وبنية قابلة للتوسّع.",
    },
    {
      id: "A.02",
      title: "مواقع عالية الأداء",
      description:
        "مواقع متجاوبة مبنية بمعمارية واجهات أمامية حديثة، بأداء قوي وتجربة فاخرة على كل شاشة.",
    },
    {
      id: "A.03",
      title: "تجارب الحركة والتمرير",
      description:
        "رسوم متحركة هادفة، وتفاعل سينمائي، وتمرير سلس يعزز سرد القصة دون أن يصبح مُشتتاً.",
    },
    {
      id: "A.04",
      title: "أنظمة الأعمال والتكاملات",
      description:
        "لوحات تحكم، وأنظمة إدارة محتوى، ولوحات إدارة، وواجهات برمجية، وأنظمة مترابطة تساعد الشركات على العمل والتوسّع.",
    },
    {
      id: "A.05",
      title: "تجارب الهوية والمحتوى",
      description:
        "توجيه الهوية البصرية، والمحتوى المرئي، والأصول التسويقية، ومونتاج الفيديو، وتجارب إبداعية مصمَّمة لتواصل متسق.",
    },
    {
      id: "A.06",
      title: "تحسين محركات البحث والأداء",
      description:
        "تحسين تقني لمحركات البحث، وإتاحة الوصول، ومؤشرات الأداء الأساسية (Core Web Vitals)، وتحسين للواجهة الأمامية لرفع الظهور والسرعة.",
    },
  ],
};

export const offeringsDict: Dict<typeof en> = { en, ar };
