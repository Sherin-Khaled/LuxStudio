import type { Dict } from "./useDict";

/**
 * Copy for AboutPage.tsx. Follows the project-wide dictionary pattern: `en`
 * defines the shape, `ar` is typed as `typeof en` so a missing/extra key is a
 * compile error. Section keys mirror the page's own section comments (HERO,
 * STUDIO PHILOSOPHY, STUDIO NOTE, STUDIO SIGNAL, VALUES, CTA) so it's easy to
 * find the right string while editing the JSX.
 */
const en = {
  hero: {
    eyebrow: "About Lux Studio",
    heading: "Where creative direction meets technical execution.",
    body: "Lux Studio is built to connect strategy, content, design, development, systems, and launch into one complete digital experience — shaped with care, clarity, and a premium eye for detail.",
    tagline: "Creative Technology Studio · Design · Systems · Launch",
    galaxyAlt:
      "An animated spiral galaxy made of particles, representing design, code, and connected digital systems",
  },
  philosophy: {
    badge: "Our Philosophy",
    heading: "We do not separate beauty from function.",
    body: "Every screen, interaction, system, and piece of content is designed to feel premium, work clearly, and support the business behind it.",
  },
  studioNote: {
    badgeBrand: "Lux Studio",
    eyebrow: "A Studio Note",
    heading: "Built for clients who need more than a beautiful website.",
    body1:
      "Lux Studio was created for clients who want more than polished visuals. They need someone who can understand the business, shape the content, design the experience, build the interface, connect the system, and care about the final launch.",
    body2:
      "That is why our work brings strategy, design, development, motion, systems, and launch thinking into one connected process — so the final result feels premium, clear, and ready to perform in the real world.",
  },
  signal: {
    eyebrow: "Studio Signal",
    heading: "The same care connects every layer.",
    body: "From the first idea to the final launch, every layer is shaped to support the next — so the experience feels consistent, intentional, and ready to grow.",
    layers: [
      "Strategy",
      "Content",
      "Structure",
      "Design",
      "Frontend",
      "Backend",
      "CMS",
      "Dashboards",
      "SEO",
      "Performance",
      "Motion",
      "Systems",
      "Launch",
    ],
  },
  values: {
    eyebrow: "What Guides Us",
    heading: "Built around clarity, craft, and performance.",
    items: [
      {
        num: "01",
        title: "Creativity",
        desc: "We shape digital experiences with strong visual direction and memorable details.",
      },
      {
        num: "02",
        title: "Innovation",
        desc: "We use modern tools, motion, and systems to create work that feels current and scalable.",
      },
      {
        num: "03",
        title: "Excellence",
        desc: "We care about spacing, structure, responsiveness, performance, and final polish.",
      },
      {
        num: "04",
        title: "Partnership",
        desc: "We work with clients through clear stages, feedback, approvals, and collaboration.",
      },
      {
        num: "05",
        title: "Performance",
        desc: "We build with speed, SEO, accessibility basics, and real user experience in mind.",
      },
    ],
  },
  cta: {
    eyebrow: "Let's Talk",
    headingBefore: "Have an idea that needs creative",
    headingAfter: "and technical direction?",
    description:
      "Tell us what you want to build, and we'll help shape the strategy, design, and system behind it.",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "عن Lux Studio",
    heading: "حيث يلتقي التوجيه الإبداعي بالتنفيذ التقني.",
    body: "بُني Lux Studio ليجمع الاستراتيجية والمحتوى والتصميم والتطوير والأنظمة والإطلاق في تجربة رقمية متكاملة واحدة — تُصاغ بعناية ووضوح وحسّ عالٍ بالتفاصيل.",
    tagline: "استوديو تقنية إبداعية · تصميم · أنظمة · إطلاق",
    galaxyAlt:
      "مجرة حلزونية متحركة مكوّنة من جسيمات، ترمز إلى التصميم والبرمجة والأنظمة الرقمية المترابطة",
  },
  philosophy: {
    badge: "فلسفتنا",
    heading: "لا نفصل بين الجمال والوظيفة.",
    body: "كل شاشة وتفاعل ونظام وجزء من المحتوى يُصمَّم ليمنح إحساسًا فاخرًا، ويعمل بوضوح، ويخدم العمل الذي يقف خلفه.",
  },
  studioNote: {
    badgeBrand: "Lux Studio",
    eyebrow: "ملاحظة من الاستوديو",
    heading: "صُنع لعملاء يحتاجون إلى أكثر من مجرد موقع جميل.",
    body1:
      "تأسس Lux Studio لعملاء يريدون أكثر من مرئيات مصقولة. إنهم بحاجة إلى من يفهم أعمالهم، ويصوغ المحتوى، ويصمم التجربة، ويبني الواجهة، ويربط النظام، ويهتم بالإطلاق النهائي.",
    body2:
      "لهذا يجمع عملنا بين الاستراتيجية والتصميم والتطوير والحركة والأنظمة وتفكير الإطلاق في مسار واحد مترابط — لتخرج النتيجة النهائية فاخرة وواضحة وجاهزة للأداء في عالم الواقع.",
  },
  signal: {
    eyebrow: "نبض الاستوديو",
    heading: "العناية ذاتها تربط كل طبقة.",
    body: "من الفكرة الأولى إلى الإطلاق النهائي، تُصاغ كل طبقة لتدعم التي تليها — لتبدو التجربة متسقة ومقصودة وجاهزة للنمو.",
    layers: [
      "الاستراتيجية",
      "المحتوى",
      "البنية",
      "التصميم",
      "الواجهة الأمامية",
      "الواجهة الخلفية",
      "CMS",
      "لوحات التحكم",
      "SEO",
      "الأداء",
      "الحركة",
      "الأنظمة",
      "الإطلاق",
    ],
  },
  values: {
    eyebrow: "ما يقودنا",
    heading: "مبني على الوضوح والحِرفية والأداء.",
    items: [
      {
        num: "01",
        title: "الإبداع",
        desc: "نصوغ التجارب الرقمية بتوجيه بصري قوي وتفاصيل لا تُنسى.",
      },
      {
        num: "02",
        title: "الابتكار",
        desc: "نستخدم أدوات وحركة وأنظمة حديثة لإنتاج أعمال تبدو عصرية وقابلة للتوسع.",
      },
      {
        num: "03",
        title: "التميّز",
        desc: "نهتم بالتباعد والبنية والاستجابة والأداء واللمسة الأخيرة.",
      },
      {
        num: "04",
        title: "الشراكة",
        desc: "نعمل مع عملائنا عبر مراحل واضحة، وملاحظات، واعتمادات، وتعاون حقيقي.",
      },
      {
        num: "05",
        title: "الأداء",
        desc: "نبني مع مراعاة السرعة، وتحسين محركات البحث، وأساسيات إمكانية الوصول، وتجربة مستخدم حقيقية.",
      },
    ],
  },
  cta: {
    eyebrow: "لنتحدث",
    headingBefore: "هل لديك فكرة تحتاج إلى توجيه إبداعي",
    headingAfter: "وتقني؟",
    description:
      "أخبرنا بما تريد بناءه، وسنساعدك في صياغة الاستراتيجية والتصميم والنظام الذي يقوم عليه.",
  },
};

export const aboutPageDict: Dict<typeof en> = { en, ar };
