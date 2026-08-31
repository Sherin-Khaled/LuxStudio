import type { Dict } from "../useDict";

/**
 * Copy for ClientTestimonialsSection. `items` line up by array index with
 * the local `testimonials` styling data (offset/quoteColor) kept in the
 * component. Real client/brand names (Houd El Nile, X Dental, Al Nours,
 * Al Baraka Olives) are proper nouns and stay identical in both locales;
 * the two internal placeholder attributions ("Project Note", "Launch
 * Process") are ordinary descriptive labels, not client names, so they are
 * translated like the rest of the copy.
 */
const en = {
  kicker: "Client Notes",
  heading: "What clients notice.",
  description:
    "Client feedback, project needs, and the details people value when we shape, design, build, and launch digital experiences.",
  items: [
    {
      text: "The new website finally feels aligned with the company's farms, products, and export identity.",
      author: "Houd El Nile",
      category: "Agriculture Export Website",
      tag: "Review",
    },
    {
      text: "The priority was to turn an outdated website into a multilingual export experience that felt credible from the first screen.",
      author: "Project Note",
      category: "Export Website",
      tag: "Brief",
    },
    {
      text: "The store needed clean product visuals, clear browsing, and a professional buying journey for dental clinics.",
      author: "X Dental",
      category: "E-commerce Platform",
      tag: "Client Need",
    },
    {
      text: "The buying experience needed to feel simple, trusted, and ready for customers to order online.",
      author: "Al Nours",
      category: "E-commerce Website",
      tag: "Client Need",
    },
    {
      text: "The brand needed a cleaner structure, stronger visuals, and subtle motion to make its export identity feel more credible.",
      author: "Al Baraka Olives",
      category: "Export Brand Website",
      tag: "Project Note",
    },
    {
      text: "Speed, SEO, responsiveness, and launch readiness were treated as part of the build, not as final extras.",
      author: "Launch Process",
      category: "Optimization & Deployment",
      tag: "Process Note",
    },
  ],
};

const ar: typeof en = {
  kicker: "ملاحظات العملاء",
  heading: "ما يلاحظه عملاؤنا.",
  description:
    "آراء العملاء، واحتياجات المشاريع، والتفاصيل التي يقدّرها الناس عندما نصمم تجارب رقمية ونطورها ونطلقها.",
  items: [
    {
      text: "أخيرًا أصبح الموقع الجديد معبّرًا بصدق عن مزارع الشركة ومنتجاتها وهويتها التصديرية.",
      author: "Houd El Nile",
      category: "موقع تصدير زراعي",
      tag: "تقييم",
    },
    {
      text: "كانت الأولوية تحويل موقع قديم إلى تجربة تصديرية متعددة اللغات تبعث الثقة من اللحظة الأولى.",
      author: "ملاحظة المشروع",
      category: "موقع تصديري",
      tag: "ملخص",
    },
    {
      text: "احتاج المتجر إلى عرض بصري نظيف للمنتجات، وتصفح واضح، ورحلة شراء احترافية تناسب عيادات الأسنان.",
      author: "X Dental",
      category: "منصة تجارة إلكترونية",
      tag: "احتياج العميل",
    },
    {
      text: "كان لا بد أن تكون تجربة الشراء بسيطة وموثوقة وجاهزة لتلقي طلبات العملاء عبر الإنترنت.",
      author: "Al Nours",
      category: "موقع تجارة إلكترونية",
      tag: "احتياج العميل",
    },
    {
      text: "احتاجت العلامة إلى بنية أوضح، وهوية بصرية أقوى، وحركة لطيفة تمنح هويتها التصديرية مصداقية أكبر.",
      author: "Al Baraka Olives",
      category: "موقع علامة تصديرية",
      tag: "ملاحظة المشروع",
    },
    {
      text: "عُومِلت السرعة وتحسين محركات البحث والتجاوب وجاهزية الإطلاق كجزء أساسي من عملية البناء، لا كإضافات أخيرة.",
      author: "عملية الإطلاق",
      category: "التحسين والنشر",
      tag: "ملاحظة العملية",
    },
  ],
};

export const testimonialsDict: Dict<typeof en> = { en, ar };
