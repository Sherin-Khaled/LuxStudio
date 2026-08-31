import type { Dict } from "../useDict";

/**
 * Copy for MissionStatementSection. The headline is split into two parts to
 * match the two differently-styled <span>s already in the component. The
 * trailing arrow on "Discover Our Approach" is rendered separately in the
 * component (a flippable glyph, not part of the translatable string) so it
 * can be mirrored for RTL without baking a directional character into copy.
 */
const en = {
  headingPart1: "We do not just make websites. ",
  headingPart2: "We create digital systems that move brands forward.",
  intro:
    "We combine strategy, design, content, development, and technology to create digital experiences that look premium, perform efficiently, and grow with the businesses behind them.",
  principles: [
    {
      id: "P.01",
      title: "Strategy before screens",
      body: "We define the purpose, audience, and experience before designing the interface.",
      detail:
        "Every project starts with understanding the business, the audience, the offer, and the result the website or system needs to achieve.",
    },
    {
      id: "P.02",
      title: "Design that can actually be built",
      body: "We create interfaces with responsiveness, performance, and development in mind.",
      detail:
        "The design is shaped to look premium, work across screen sizes, and translate cleanly into real frontend code without losing quality.",
    },
    {
      id: "P.03",
      title: "Systems prepared to scale",
      body: "We build digital foundations that can grow into dashboards, CMS platforms, integrations, and larger business systems.",
      detail:
        "The website is treated as a foundation that can later connect with backend logic, admin panels, product management, APIs, content systems, and business tools.",
    },
  ],
  discoverApproach: "Discover Our Approach",
};

const ar: typeof en = {
  headingPart1: "نحن لا نكتفي بصنع المواقع الإلكترونية. ",
  headingPart2: "بل نبتكر أنظمة رقمية تدفع العلامات التجارية إلى الأمام.",
  intro:
    "نمزج بين الاستراتيجية والتصميم والمحتوى والتطوير والتقنية لصنع تجارب رقمية تبدو فاخرة، وتعمل بكفاءة، وتنمو مع الأعمال التي تقف خلفها.",
  principles: [
    {
      id: "P.01",
      title: "الاستراتيجية قبل الشاشات",
      body: "نحدد الهدف والجمهور والتجربة قبل البدء في تصميم الواجهة.",
      detail:
        "يبدأ كل مشروع بفهم طبيعة العمل، والجمهور المستهدف، والعرض المقدَّم، والنتيجة التي يجب أن يحققها الموقع أو النظام.",
    },
    {
      id: "P.02",
      title: "تصميم قابل للتنفيذ فعلياً",
      body: "نصمم واجهات مستخدم مع مراعاة التجاوب والأداء وسهولة التطوير.",
      detail:
        "يُصاغ التصميم ليبدو فاخراً، ويعمل بسلاسة على مختلف أحجام الشاشات، ويتحول بدقة إلى كود واجهة أمامية حقيقي دون أن يفقد جودته.",
    },
    {
      id: "P.03",
      title: "أنظمة جاهزة للتوسّع",
      body: "نبني أساسيات رقمية قابلة للتطور إلى لوحات تحكم وأنظمة إدارة محتوى وتكاملات وأنظمة أعمال أكبر.",
      detail:
        "يُعامل الموقع كأساس يمكن أن يتصل لاحقاً بمنطق الأنظمة الخلفية، ولوحات الإدارة، وإدارة المنتجات، وواجهات البرمجة، وأنظمة المحتوى، وأدوات الأعمال.",
    },
  ],
  discoverApproach: "اكتشف منهجيتنا",
};

export const missionDict: Dict<typeof en> = { en, ar };
