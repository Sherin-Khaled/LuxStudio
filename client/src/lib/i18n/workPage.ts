import type { Dict } from "./useDict";

/**
 * Copy for the Work (project showcase) page. Project/company names
 * (X Dental, Houd El Nile, Al Nours, Al Baraka Olives, Abdalwahb) are real
 * client names and are intentionally NOT translated — only the studio's own
 * descriptive copy, category/tag labels, and UI chrome are localized here.
 *
 * Pattern: `en` defined first (its inferred shape is the contract), `ar`
 * typed as `typeof en` so a missing/extra Arabic key is a compile error.
 */
const en = {
  hero: {
    eyebrow: "Selected Projects",
    heading: "Work built from strategy to launch.",
    subheading:
      "A closer look at websites, e-commerce platforms, brand experiences, and digital systems we shaped, designed, developed, and launched for real businesses.",
    stats: "4 selected projects · Websites · E-commerce · Export brands · Digital systems",
    ariaLabel: "Work page hero",
  },
  projectsAriaLabel: "Work projects",
  preview: {
    imageNeeded: "Preview image needed.",
    notUploaded: "Website not uploaded yet — preview coming soon.",
    openInNewTab: (label: string) => `Open ${label} in a new tab`,
    openLiveWebsite: "Open Live Website",
  },
  card: {
    featuredProject: "Featured Project",
    imageProduction: "Image Production",
    viewCaseStudy: "View Case Study",
    websitePreviewTitle: (name: string) => `${name} website preview`,
  },
  xDental: {
    type: "Dental Supplies E-commerce Platform",
    description:
      "We designed and built a complete e-commerce platform for dental doctors and clinics, combining UI/UX design, frontend, backend, and real store functionality into a cleaner and more professional buying experience.",
    secondary:
      "The project included product browsing, product details, cart, checkout, backend functionality, and large-scale product image preparation. We sourced product visuals, enhanced their quality, removed backgrounds, and created a cleaner and more consistent e-commerce presentation across more than 1000 products.",
    tags: [
      "UI/UX Design",
      "Frontend",
      "Backend",
      "E-commerce",
      "1000+ Product Images",
      "Background Removal",
      "Quality Enhancement",
      "Checkout Flow",
      "SEO & Performance",
      "Motion-Rich UX",
    ],
    proof: [
      "Product Visual Preparation",
      "Image Sourcing",
      "Quality Enhancement",
      "Background Removal",
    ],
  },
  houdElNile: {
    type: "Agriculture Export Company",
    description:
      "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
    secondary:
      "The project included original farm and factory photography, Lightroom image editing, a redesigned visual direction, a rotating hero experience, a top contact bar, seven-language support, SEO / performance thinking, and final deployment.",
    tags: [
      "Website Redesign",
      "Next.js",
      "Photography",
      "Lightroom Editing",
      "7 Languages",
      "Export Brand",
      "SEO & Performance",
      "Scroll Storytelling",
      "Deployment",
    ],
    photographyLabel: "Photography & Lightroom Editing",
    photographyDescription:
      "We captured original farm and factory visuals for Houd El Nile, then refined the selected images in Lightroom to support a more premium agriculture export identity.",
    galleryAlt: (n: number) => `Houd El Nile farm and factory photography ${n}`,
  },
  alNours: {
    type: "Saudi Beverage Distribution E-commerce",
    description:
      "We created an online shopping platform for Al Nours, combining logo creation, brand direction, frontend, backend, authentication flows, and deployment into a clear and trustworthy e-commerce experience.",
    tags: [
      "E-commerce",
      "Frontend",
      "Backend",
      "Logo Design",
      "Brand Direction",
      "Authentication",
      "Deployment",
      "Motion-Rich UX",
    ],
  },
  alBaraka: {
    type: "Olive Export Brand Website",
    description:
      "We transformed Al Baraka Olives from an outdated website into a cleaner, more premium export-brand experience with stronger visuals, refined structure, and subtle motion.",
    tags: [
      "Website Redesign",
      "Frontend",
      "Export Brand",
      "Photography",
      "Curated Imagery",
      "Subtle Motion",
      "Scroll Storytelling",
      "Deployment",
    ],
  },
  abdalwahb: {
    type: "Accounting & Financial Consulting Portfolio Website",
    description:
      "We designed and developed a premium portfolio website for an accounting and financial consulting professional, presenting services, training, courses, and business credibility through a clean bilingual digital experience.",
    secondary:
      "The website was created to support trust, authority, and clear service communication through structured service pages, training content, course information, contact flows, and a modern blue visual identity.",
    tags: [
      "Portfolio Website",
      "Accounting Services",
      "Courses",
      "Training",
      "UI/UX Design",
      "Frontend Development",
      "Bilingual Website",
      "SEO Structure",
    ],
  },
  cta: {
    heading: "Have a project that needs this level of care?",
    description:
      "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "أعمال مختارة",
    heading: "أعمال بُنيت من الاستراتيجية إلى الإطلاق.",
    subheading:
      "نظرة أقرب على المواقع الإلكترونية ومنصات التجارة الإلكترونية وتجارب العلامات التجارية والأنظمة الرقمية التي صُغناها وصممناها وطوّرناها وأطلقناها لشركات حقيقية.",
    stats: "4 مشاريع مختارة · مواقع إلكترونية · تجارة إلكترونية · علامات تصدير · أنظمة رقمية",
    ariaLabel: "قسم استعراض صفحة الأعمال",
  },
  projectsAriaLabel: "مشاريع الأعمال",
  preview: {
    imageNeeded: "يلزم توفير صورة للمعاينة.",
    notUploaded: "لم يُرفع الموقع بعد — المعاينة قادمة قريبًا.",
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    openLiveWebsite: "فتح الموقع المباشر",
  },
  card: {
    featuredProject: "مشروع مميز",
    imageProduction: "إنتاج الصور",
    viewCaseStudy: "عرض دراسة الحالة",
    websitePreviewTitle: (name: string) => `معاينة موقع ${name}`,
  },
  xDental: {
    type: "منصة تجارة إلكترونية لمستلزمات طب الأسنان",
    description:
      "صممنا وطوّرنا منصة تجارة إلكترونية متكاملة لأطباء وعيادات الأسنان، جامعين بين تصميم واجهات وتجربة المستخدم والواجهة الأمامية والخلفية ووظائف متجر حقيقية، لنقدّم تجربة شراء أنظف وأكثر احترافية.",
    secondary:
      "شمل المشروع تصفح المنتجات وتفاصيلها وسلة الشراء وإتمام الطلب ووظائف الواجهة الخلفية، إلى جانب تجهيز صور المنتجات على نطاق واسع. قمنا بتوفير الصور وتحسين جودتها وإزالة خلفياتها، لنخرج بعرض تجاري أكثر نظافة واتساقًا لأكثر من 1000 منتج.",
    tags: [
      "تصميم واجهات وتجربة المستخدم",
      "الواجهة الأمامية",
      "الواجهة الخلفية",
      "تجارة إلكترونية",
      "أكثر من 1000 صورة منتج",
      "إزالة الخلفيات",
      "تحسين الجودة",
      "مسار إتمام الشراء",
      "تحسين محركات البحث والأداء",
      "تجربة غنية بالحركة",
    ],
    proof: [
      "تجهيز الصور المرئية للمنتجات",
      "توفير الصور",
      "تحسين الجودة",
      "إزالة الخلفيات",
    ],
  },
  houdElNile: {
    type: "شركة تصدير زراعي",
    description:
      "أعدنا بناء الحضور الرقمي لشركة Houd El Nile من موقع ووردبريس قديم إلى تجربة فاخرة متعددة اللغات مبنية على Next.js، تعكس بشكل أفضل مزارع الشركة ومصانعها وأعمال التصدير وجودة منتجاتها.",
    secondary:
      "شمل المشروع تصويرًا أصليًا للمزارع والمصانع، وتحرير الصور عبر Lightroom، وتوجهًا بصريًا مُعاد تصميمه، وتجربة قسم رئيسي متغيّر، وشريط تواصل علوي، ودعم سبع لغات، والتفكير في تحسين محركات البحث والأداء، وأخيرًا النشر الفعلي للموقع.",
    tags: [
      "إعادة تصميم الموقع",
      "Next.js",
      "تصوير فوتوغرافي",
      "تحرير عبر Lightroom",
      "7 لغات",
      "علامة تصدير",
      "تحسين محركات البحث والأداء",
      "سرد بصري عبر التمرير",
      "النشر والتشغيل",
    ],
    photographyLabel: "التصوير الفوتوغرافي وتحرير Lightroom",
    photographyDescription:
      "التقطنا صورًا أصلية للمزارع والمصانع الخاصة بـHoud El Nile، ثم نقّحنا الصور المختارة عبر Lightroom لدعم هوية أكثر فخامة لعلامة التصدير الزراعي.",
    galleryAlt: (n: number) => `تصوير مزارع ومصانع Houd El Nile رقم ${n}`,
  },
  alNours: {
    type: "تجارة إلكترونية لتوزيع المشروبات في السعودية",
    description:
      "أنشأنا منصة تسوق إلكتروني لشركة Al Nours، جامعين بين تصميم الشعار والتوجه البصري للعلامة والواجهة الأمامية والخلفية ومسارات المصادقة والنشر، للخروج بتجربة تجارة إلكترونية واضحة وموثوقة.",
    tags: [
      "تجارة إلكترونية",
      "الواجهة الأمامية",
      "الواجهة الخلفية",
      "تصميم الشعار",
      "التوجه البصري للعلامة",
      "المصادقة وتسجيل الدخول",
      "النشر والتشغيل",
      "تجربة غنية بالحركة",
    ],
  },
  alBaraka: {
    type: "موقع علامة تصدير زيتون",
    description:
      "حوّلنا موقع Al Baraka Olives من موقع قديم إلى تجربة أكثر نظافة وفخامة لعلامة تصدير، ببصريات أقوى وبنية أكثر دقة وحركة رقيقة.",
    tags: [
      "إعادة تصميم الموقع",
      "الواجهة الأمامية",
      "علامة تصدير",
      "تصوير فوتوغرافي",
      "صور مُنتقاة بعناية",
      "حركة رقيقة",
      "سرد بصري عبر التمرير",
      "النشر والتشغيل",
    ],
  },
  abdalwahb: {
    type: "موقع أعمال لخدمات المحاسبة والاستشارات المالية",
    description:
      "صممنا وطوّرنا موقع أعمال فاخرًا لمتخصص في المحاسبة والاستشارات المالية، يعرض الخدمات والتدريب والدورات والمصداقية المهنية من خلال تجربة رقمية أنيقة وثنائية اللغة.",
    secondary:
      "أُنشئ الموقع لتعزيز الثقة والمصداقية ووضوح التواصل حول الخدمات، من خلال صفحات خدمات منظمة ومحتوى تدريبي ومعلومات عن الدورات ومسارات تواصل وهوية بصرية زرقاء عصرية.",
    tags: [
      "موقع أعمال",
      "خدمات محاسبية",
      "دورات تدريبية",
      "تدريب",
      "تصميم واجهات وتجربة المستخدم",
      "تطوير الواجهة الأمامية",
      "موقع ثنائي اللغة",
      "بنية تحسين محركات البحث",
    ],
  },
  cta: {
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description:
      "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
  },
};

export const workPageDict: Dict<typeof en> = { en, ar };
