import type { Dict } from "./useDict";

/** Shape shared by every entry in the six-item services list. */
type ServiceCopy = {
  title: string;
  description: string;
  handles: string[];
  bestFor: string;
};

/** Shape shared by every entry in the four-item engagement grid. */
type EngagementCopy = {
  title: string;
  description: string;
  includes: string[];
};

const en = {
  hero: {
    eyebrow: "Services",
    heading: "Services built as one connected system.",
    subheading:
      "From strategy and content to UI/UX, development, dashboards, SEO, and launch support — every service is shaped to work together, not separately.",
    tagline: "Strategy · Design · Content · Development · Systems · Launch",
  },
  ariaLabels: {
    hero: "Services hero",
    operatingSystem: "Operating system overview",
    constellation: "Services constellation",
    reducedMotionList: "Services",
    servicesList: "Services list",
    engagementTypes: "Engagement types",
    connectedServices: "Connected services",
    processFlow: "Service process flow",
  },
  operatingSystem: {
    eyebrow: "The Lux Studio Operating System",
    tagline: "One connected process, not disconnected tasks.",
  },
  processSteps: [
    "Strategy",
    "Content",
    "Design",
    "Development",
    "Systems",
    "Launch",
  ],
  serviceLabels: {
    whatWeHandle: "What we handle",
    bestFor: "Best for",
  },
  services: [
    {
      title: "Strategy & Direction",
      description:
        "We define the project purpose, audience, structure, and digital direction before designing screens or writing code.",
      handles: [
        "Discovery",
        "Website strategy",
        "User flows",
        "Content structure",
        "Feature planning",
        "Competitor review",
      ],
      bestFor: "Brands that need clarity before starting the design or build.",
    },
    {
      title: "UI/UX Design",
      description:
        "We design clear, premium interfaces that balance beauty, usability, responsiveness, and real development requirements.",
      handles: [
        "User experience",
        "Interface design",
        "Wireframes",
        "High-fidelity screens",
        "Design systems",
        "Responsive layouts",
      ],
      bestFor:
        "Businesses that need a polished experience users can understand and trust.",
    },
    {
      title: "Brand & Content Experience",
      description:
        "We shape the words, visuals, and creative direction that help the website feel aligned with the business behind it.",
      handles: [
        "Website content",
        "Visual direction",
        "Graphic assets",
        "Photography support",
        "Image editing",
        "Video editing",
        "Brand consistency",
      ],
      bestFor:
        "Projects that need more than layout — they need a complete visual and content experience.",
    },
    {
      title: "Frontend Development",
      description:
        "We build responsive, high-performance interfaces with clean structure, smooth interaction, and a premium experience across screen sizes.",
      handles: [
        "React / Next.js",
        "Responsive development",
        "Scroll motion",
        "Pinned storytelling sections",
        "Component systems",
        "Performance-focused UI",
      ],
      bestFor:
        "Websites that need to feel fast, modern, smooth, and ready for real users.",
    },
    {
      title: "Backend, CMS & Dashboards",
      description:
        "We build the systems behind the website so teams can manage content, products, users, requests, files, and business data.",
      handles: [
        "Backend logic",
        "Admin dashboards",
        "CMS platforms",
        "Product management",
        "API integrations",
        "Database structure",
        "Authentication",
      ],
      bestFor:
        "Businesses that need control, scalability, and real system functionality behind the website.",
    },
    {
      title: "SEO, Performance & Launch",
      description:
        "We prepare the website for launch with speed, responsiveness, SEO structure, accessibility, testing, deployment, and future support in mind.",
      handles: [
        "Technical SEO",
        "Performance checks",
        "Responsive testing",
        "Accessibility basics",
        "Deployment",
        "Hosting setup",
        "Future updates",
      ],
      bestFor:
        "Brands that want the website to look premium, load fast, and launch properly.",
    },
  ] satisfies ServiceCopy[],
  engagement: {
    eyebrow: "How we work together",
    heading: "Choose your engagement type.",
    includesLabel: "Includes",
    items: [
      {
        title: "Website Build",
        description:
          "For businesses that need a premium marketing website with strong structure, responsive design, motion, performance, and launch support.",
        includes: ["Strategy", "UI/UX", "Frontend", "Content", "SEO", "Launch"],
      },
      {
        title: "E-commerce Platform",
        description:
          "For brands that need a professional online store with product structure, browsing, cart, checkout, backend logic, and scalable content management.",
        includes: [
          "UI/UX",
          "Frontend",
          "Backend",
          "Products",
          "Checkout",
          "Performance",
        ],
      },
      {
        title: "Brand + Website Experience",
        description:
          "For businesses that need visual direction, content, image editing, motion details, and a website experience that feels aligned with the brand.",
        includes: [
          "Brand Direction",
          "Content",
          "Visual Assets",
          "UI/UX",
          "Frontend",
          "Motion",
        ],
      },
      {
        title: "Dashboard / CMS System",
        description:
          "For teams that need to manage content, requests, products, users, files, data, or internal workflows from a clear digital system.",
        includes: [
          "Backend",
          "CMS",
          "Dashboard",
          "Database",
          "Authentication",
          "APIs",
        ],
      },
    ] satisfies EngagementCopy[],
  },
  cta: {
    eyebrow: "Get Started",
    heading: "Need the full system or only one layer?",
    description:
      "Tell us what you want to build, and we will shape the right strategy, design, and technical direction around it.",
    secondaryLabel: "View Work",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "الخدمات",
    heading: "خدمات مترابطة تعمل كنظام واحد.",
    subheading:
      "من الاستراتيجية والمحتوى إلى تصميم واجهات وتجربة المستخدم، والتطوير، ولوحات التحكم، وتحسين محركات البحث، ودعم الإطلاق — نصمم كل خدمة لتعمل ضمن منظومة واحدة، لا كمهام منفصلة.",
    tagline: "الاستراتيجية · التصميم · المحتوى · التطوير · الأنظمة · الإطلاق",
  },
  ariaLabels: {
    hero: "مقدمة الخدمات",
    operatingSystem: "نظرة عامة على نظام العمل",
    constellation: "عرض الخدمات التفاعلي",
    reducedMotionList: "الخدمات",
    servicesList: "قائمة الخدمات",
    engagementTypes: "أنماط التعاون",
    connectedServices: "الخدمات المترابطة",
    processFlow: "مسار مراحل العمل",
  },
  operatingSystem: {
    eyebrow: "نظام Lux Studio التشغيلي",
    tagline: "عملية واحدة مترابطة، لا مهام متفرقة.",
  },
  processSteps: [
    "الاستراتيجية",
    "المحتوى",
    "التصميم",
    "التطوير",
    "الأنظمة",
    "الإطلاق",
  ],
  serviceLabels: {
    whatWeHandle: "ما نتولاه",
    bestFor: "الأنسب لـ",
  },
  services: [
    {
      title: "الاستراتيجية والتوجيه",
      description:
        "نحدّد هدف المشروع وجمهوره وبنيته واتجاهه الرقمي قبل تصميم أي شاشة أو كتابة سطر برمجي واحد.",
      handles: [
        "الاكتشاف",
        "استراتيجية الموقع",
        "مسارات المستخدم",
        "بنية المحتوى",
        "تخطيط الميزات",
        "تحليل المنافسين",
      ],
      bestFor: "للعلامات التجارية التي تحتاج إلى رؤية واضحة قبل الشروع في التصميم أو البناء.",
    },
    {
      title: "تصميم واجهات وتجربة المستخدم",
      description:
        "نصمّم واجهات واضحة وراقية توازن بين الجمال وسهولة الاستخدام والتجاوب ومتطلبات التطوير الفعلية.",
      handles: [
        "تجربة المستخدم",
        "تصميم الواجهات",
        "المخططات الأولية",
        "شاشات عالية الدقة",
        "أنظمة التصميم",
        "تخطيطات متجاوبة",
      ],
      bestFor: "للشركات التي تحتاج إلى تجربة متقنة يفهمها المستخدمون ويثقون بها.",
    },
    {
      title: "تجربة العلامة والمحتوى",
      description:
        "نصوغ الكلمات والعناصر البصرية والتوجه الإبداعي بما يجعل الموقع انعكاساً حقيقياً للعلامة التجارية خلفه.",
      handles: [
        "محتوى الموقع",
        "التوجه البصري",
        "العناصر الجرافيكية",
        "دعم التصوير الفوتوغرافي",
        "تحرير الصور",
        "تحرير الفيديو",
        "اتساق الهوية",
      ],
      bestFor:
        "للمشاريع التي تحتاج إلى أكثر من مجرد تخطيط — بل إلى تجربة بصرية ومحتوى متكاملين.",
    },
    {
      title: "تطوير الواجهات الأمامية",
      description:
        "نبني واجهات متجاوبة عالية الأداء ببنية نظيفة وتفاعل سلس وتجربة راقية على جميع أحجام الشاشات.",
      handles: [
        "React / Next.js",
        "تطوير متجاوب",
        "حركة أثناء التمرير",
        "أقسام سردية مثبتة",
        "أنظمة المكوّنات",
        "واجهات مُحسَّنة للأداء",
      ],
      bestFor: "للمواقع التي يجب أن تبدو سريعة وعصرية وسلسة وجاهزة لمستخدمين حقيقيين.",
    },
    {
      title: "الأنظمة الخلفية ولوحات التحكم",
      description:
        "نبني الأنظمة الخلفية التي تقف وراء الموقع لتتمكّن الفرق من إدارة المحتوى والمنتجات والمستخدمين والطلبات والملفات وبيانات الأعمال.",
      handles: [
        "منطق النظام الخلفي",
        "لوحات تحكم إدارية",
        "أنظمة إدارة المحتوى",
        "إدارة المنتجات",
        "تكامل واجهات API",
        "بنية قواعد البيانات",
        "المصادقة والتحقق",
      ],
      bestFor: "للشركات التي تحتاج إلى تحكّم كامل وقابلية للتوسّع ووظائف نظام حقيقية خلف الموقع.",
    },
    {
      title: "تحسين محركات البحث والأداء والإطلاق",
      description:
        "نجهّز الموقع للإطلاق مع مراعاة السرعة والتجاوب وبنية تحسين محركات البحث وإمكانية الوصول والاختبار والنشر والدعم المستقبلي.",
      handles: [
        "تحسين تقني لمحركات البحث",
        "فحوصات الأداء",
        "اختبار التجاوب",
        "أساسيات إمكانية الوصول",
        "النشر",
        "إعداد الاستضافة",
        "التحديثات المستقبلية",
      ],
      bestFor: "للعلامات التجارية التي تريد موقعاً يبدو راقياً ويُحمَّل بسرعة ويُطلق بالشكل الصحيح.",
    },
  ] satisfies ServiceCopy[],
  engagement: {
    eyebrow: "كيف نعمل معاً",
    heading: "اختر نموذج التعاون المناسب لك.",
    includesLabel: "يشمل",
    items: [
      {
        title: "بناء الموقع الإلكتروني",
        description:
          "للشركات التي تحتاج إلى موقع تسويقي راقٍ ببنية قوية وتصميم متجاوب وحركة بصرية وأداء عالٍ ودعم عند الإطلاق.",
        includes: ["الاستراتيجية", "تجربة المستخدم", "الواجهة الأمامية", "المحتوى", "تحسين محركات البحث", "الإطلاق"],
      },
      {
        title: "منصة تجارة إلكترونية",
        description:
          "للعلامات التجارية التي تحتاج إلى متجر إلكتروني احترافي ببنية منتجات وتصفح وسلة شراء وإتمام طلب ومنطق خلفي وإدارة محتوى قابلة للتوسّع.",
        includes: [
          "تجربة المستخدم",
          "الواجهة الأمامية",
          "النظام الخلفي",
          "المنتجات",
          "إتمام الطلب",
          "الأداء",
        ],
      },
      {
        title: "تجربة العلامة والموقع",
        description:
          "للشركات التي تحتاج إلى توجه بصري ومحتوى وتحرير صور وتفاصيل حركية وتجربة موقع تنسجم مع هوية علامتها.",
        includes: [
          "التوجه البصري للعلامة",
          "المحتوى",
          "العناصر البصرية",
          "تجربة المستخدم",
          "الواجهة الأمامية",
          "الحركة البصرية",
        ],
      },
      {
        title: "نظام لوحة تحكم / إدارة محتوى",
        description:
          "للفرق التي تحتاج إلى إدارة المحتوى والطلبات والمنتجات والمستخدمين والملفات والبيانات أو سير العمل الداخلي من خلال نظام رقمي واضح.",
        includes: [
          "النظام الخلفي",
          "إدارة المحتوى",
          "لوحة التحكم",
          "قاعدة البيانات",
          "المصادقة",
          "واجهات API",
        ],
      },
    ] satisfies EngagementCopy[],
  },
  cta: {
    eyebrow: "لنبدأ",
    heading: "هل تحتاج إلى المنظومة كاملة أم إلى جزء واحد فقط؟",
    description:
      "أخبرنا بما تريد بناءه، وسنصوغ حوله الاستراتيجية والتصميم والتوجيه التقني المناسب.",
    secondaryLabel: "شاهد أعمالنا",
  },
};

export const servicesPageDict: Dict<typeof en> = { en, ar };
