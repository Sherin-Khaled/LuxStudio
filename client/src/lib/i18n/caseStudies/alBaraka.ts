import type { Dict } from "../useDict";

/**
 * Localized copy for the Al Baraka case study (`/work/al-baraka`). Same
 * pattern as every other dictionary in this project: `en` defined first (its
 * inferred shape is the contract), `ar` typed as `typeof en` so a missing/
 * extra Arabic key is a compile error. The real client/product name
 * ("Al Baraka") stays untranslated, matching `workPage.ts` and the other
 * three case studies.
 *
 * This dict has its own shape — a "product catalog reshaped around a
 * conversation" story, not X Dental's commerce-scale one, Houd El Nile's
 * repositioning/multilingual one, or Al Nours' connected-systems one — see
 * `AlBarakaCaseStudyBody.tsx` for how it's rendered. Only `hero`, `finalCta`,
 * and `common` need to match `CaseStudySharedCopy`.
 *
 * Every factual claim here is scoped to what was verified in the real Al
 * Baraka codebase (`OLIVE-WEBSITE-Products-1`): no backend API, no database
 * in use, no accounts, no WhatsApp Business API — inquiries are client-side
 * `localStorage` state that composes a `wa.me` deep link. See the Inquiry
 * System and Bilingual sections below for the exact hedges.
 */
const en = {
  hero: {
    eyebrow: "Case Study / 04",
    title: "Al Baraka",
    subtitle: "Egyptian Olive & Food Export Platform",
    headlineLine1: "From product catalog",
    headlineLine2: "to export conversation.",
    supporting:
      "Al Baraka needed more than a corporate website. We designed a bilingual export experience that brings product discovery, packaging specifications, production credibility and multi-product inquiries into one clear journey — ending where real sales conversations begin.",
    metricLabels: {
      products: "Products",
      languages: "Languages",
      certifications: "Certifications",
      inquiryFlow: "Inquiry Flow",
    },
    services: [
      "UI/UX Design",
      "Frontend Development",
      "Bilingual UX",
      "RTL",
      "B2B Export",
      "Product Architecture",
      "Interaction Design",
    ],
    visitLiveWebsite: "Visit Live Website",
    scrollHint: "Scroll to explore",
  },

  glance: {
    eyebrow: "Project At A Glance",
    headingLine1: "A compact export catalog,",
    headingLine2: "built to be believed.",
    body: "Al Baraka for Olives and Food Industries exports olives, olive oil, and pickled vegetables from Sharkia, Egypt. The site had to read as a B2B export platform, not a corporate brochure — bilingual, certified, and structured around a request rather than a purchase.",
    chips: [
      "B2B Export Platform",
      "English + Arabic",
      "RTL Experience",
      "Export-Oriented Catalog",
      "WhatsApp RFQ Flow",
      "6 Certifications",
    ],
  },

  challenge: {
    eyebrow: "The Challenge",
    heading: "Marketing copy isn't enough for an export buyer.",
    body: [
      "Al Baraka already had a digital presence before this project — a system built to list products and manage them through an admin panel. What it didn't do was speak to how an export buyer actually decides: comparing packaging formats, checking certifications, and asking about several products at once before ever picking up the phone.",
      "The brief wasn't to add more pages. It was to rebuild the experience around one audience — English- and Arabic-speaking buyers who need specification-level detail and a single, low-friction way to start a real conversation, without a shopping cart pretending to be something this business isn't.",
    ],
  },

  journey: {
    eyebrow: "Rethinking The Journey",
    heading: "One path, five honest steps.",
    body: "Every page on the site leads somewhere specific. Instead of a flat brochure structure, the journey moves a buyer from broad orientation to a single, concrete action — building and sending an inquiry.",
    steps: ["Discover", "Explore Products", "Understand Packaging & Export", "Build Inquiry", "WhatsApp Conversation"],
  },

  systems: {
    eyebrow: "One Experience. Multiple Systems.",
    headingLine1: "One experience.",
    headingLine2: "Multiple systems.",
    body: "A product and packaging catalog, a scroll-driven process story, and a bilingual RTL layer all resolve into the same place — a single export inquiry.",
    diagram: {
      root: "Al Baraka",
      systems: ["Catalog System", "Process Engine", "Language Layer"],
      subsystems: ["Product & Packaging Data", "Scroll-Pinned Timeline", "Bilingual RTL Context"],
      convergence: "Single Export Inquiry",
    },
  },

  inquirySystem: {
    eyebrow: "The Inquiry System",
    headingLine1: "A buyer builds one request,",
    headingLine2: "not five.",
    body: [
      "A buyer can add products to an inquiry from the catalog, a product detail page, or a related-products rail — and the selection stays with them as they keep browsing. Removing an item, clearing the list, or coming back later all just work.",
      "Once they're ready, the whole list — every product, with its own notes — compiles into one structured message and opens as a pre-filled WhatsApp conversation with Al Baraka's export team.",
    ],
    stepsLabel: "How A Request Gets Built",
    steps: ["Browse Catalog", "Add From Any Page", "Persist Across Visits", "Manage Selections", "See Related Products", "Send One WhatsApp Inquiry"],
    capabilitiesLabel: "What This Actually Is",
    capabilities: ["React Context State", "Persisted In The Browser (localStorage)", "Related-Product Suggestions", "One Compiled WhatsApp Message"],
    caveat:
      "This is browser-local state, not an account system — there's no login, no cloud-saved cart across devices, and no order placed. It's a request builder, not a checkout.",
    mediaCaption: "Real product photography from the live catalog — the kind of item a buyer adds to an inquiry.",
  },

  cartVsConversation: {
    eyebrow: "The UX Idea",
    headingLine1: "A cart with",
    headingLine2: "nothing to buy.",
    body: "The familiar ecommerce mental model — pick, collect, review — reduces friction. The final action just matches how this business actually sells: through a conversation, not a checkout button.",
    traditional: { label: "Traditional Ecommerce", steps: ["Product", "Cart", "Checkout"] },
    albaraka: { label: "Al Baraka", steps: ["Product", "Inquiry List", "Conversation"] },
  },

  process: {
    eyebrow: "Signature Interaction",
    headingLine1: "The process,",
    headingLine2: "made to scroll.",
    body: "The live site pins a step panel to the viewport while the visitor scrolls, tracking progress with a filling rail and cross-fading each stage's copy and media — reused across the About and Export pages. The recreation below mirrors that same pinned, one-stage-at-a-time behavior.",
    note: "Operational complexity became a guided story — one stage, one focus, one clear progression.",
    stepLabel: "Stage",
    steps: [
      {
        eyebrow: "Stage 1",
        title: "Cultivation",
        desc: "The journey begins with olive cultivation and land reclamation, supporting product quality from the source.",
      },
      {
        eyebrow: "Stage 2",
        title: "Processing & Manufacturing",
        desc: "Products are prepared with care to suit food-safety requirements and buyer specifications.",
      },
      {
        eyebrow: "Stage 3",
        title: "Packaging",
        desc: "Products are packed into export-ready formats matched to each market's requirements.",
      },
      {
        eyebrow: "Stage 4",
        title: "Export",
        desc: "Shipment is coordinated with the customer, the export team, and the logistics provider.",
      },
    ],
    caveat: "A self-contained recreation built for this case study — not an embed of the live site.",
  },

  bilingual: {
    eyebrow: "Bilingual By Architecture",
    headingLine1: "Built in two languages,",
    headingLine2: "not translated after the fact.",
    intro: "English and Arabic are both first-class here — full right-to-left layout, not a machine-translated label swap.",
    body: "Toggling language flips the document's own reading direction, persists the visitor's choice, and re-runs every page's metadata — while several components branch on direction directly rather than relying on a blanket CSS mirror.",
    languages: ["English", "Arabic"],
    flow: ["Visitor Choice", "Saved Preference", "Direction Flip (LTR ↔ RTL)", "Direction-Aware Layout"],
    note: "One real limitation, stated plainly: language switches on the same URL rather than across separate localized routes, so hreflang tags exist without yet pointing at distinct indexable pages per language. The engineering strength here is the runtime RTL experience, not search-engine localization.",
  },

  catalogArchitecture: {
    eyebrow: "Catalog & Packaging Architecture",
    heading: "Specification-first, not scale-first.",
    body: "This isn't a story about navigating thousands of SKUs. It's a compact, four-family catalog organized around the details an export buyer actually needs before they'll ask a question — variety, format, and size.",
    familiesLabel: "Product Families",
    families: ["Green Olives", "Black Olives", "Premium & Olive Oil", "Pickled Vegetables"],
    packagingLabel: "Export Packaging Formats",
    packaging: ["Glass & Plastic Jars", "Cans", "Flexible Pouches", "Plastic Barrels — up to 160kg"],
    mediaCaption: "Packaging built for export — retail jars through bulk barrel formats.",
  },

  visualDirection: {
    eyebrow: "Visual Direction",
    heading: "Olive green, warm neutrals, and real photography.",
    body: "A deep, editorial olive palette against warm off-white backgrounds, EB Garamond headings over an Inter body, and full-bleed agricultural photography carry the identity — restrained rather than decorative.",
    caveat: "A real, reused component layer exists (buttons, cards, stat blocks) — but colors are applied per-usage rather than drawn from a formal token system, so it's described here as a visual direction, not a mature design system.",
    tokensLabel: "Color Palette",
    typographyLabel: "Typography",
    typography: ["EB Garamond — Display", "Inter — Body & UI"],
    elementsLabel: "Distinctive Elements",
    elements: ["Edge Side-Navigation Rail", "Full-Bleed Editorial Heroes", "Restrained Scroll Reveals", "Circular Icon Badges"],
    stackLabel: "Verified Stack",
    mediaCaption: "Production photography from the live site's own asset library.",
  },

  trust: {
    eyebrow: "Trust For An Export Audience",
    heading: "Credibility, stated plainly.",
    body: "Six certification marks, a named base of operations, and a stated leadership figure sit directly on the pages a buyer reads before they'll enquire — not buried behind a downloadable PDF.",
    certificationsLabel: "Certifications Shown On-Site",
    infoLabel: "Company Information",
    info: ["Sharkia Governorate, Egypt", "Operating Since 2004", "Chaired by Haj Essam Ammara", "Export-Directed Production"],
    caveat:
      "Operating history and export-share figures shown on the site are Al Baraka's own stated business information — not numbers independently measured or audited by Lux Studio.",
    mediaCaption: "Production photography — the facility behind the certifications.",
  },

  gallery: {
    eyebrow: "Key Screens & Media",
    heading: "The experience, screen by screen.",
    items: {
      bottling: { title: "Production", caption: "The olive oil bottling line — production credibility made visible." },
      washing: { title: "Processing", caption: "Washing and sorting, part of the cultivation-to-export story." },
      press: { title: "Craft", caption: "Traditional pressing — the agricultural roots behind the brand." },
      orchard: { title: "Source", caption: "Where the product starts, before it ever reaches a buyer." },
      shipping: { title: "Export", caption: "Logistics — the final stage of the process timeline." },
      mobile: { title: "Mobile", caption: "Full-page screens pending — available on request." },
    },
  },

  result: {
    eyebrow: "The Result",
    headingLine1: "From a product catalog",
    headingLine2: "to an export conversation.",
    body: "Product discovery, packaging specifications, production credibility, and multi-product inquiries now sit inside one bilingual journey — ending, deliberately, where a real sales conversation begins rather than at a checkout screen.",
  },

  finalCta: {
    eyebrow: "Built by Lux Studio",
    heading: "Have a project that needs this level of care?",
    description: "Let's shape the strategy, design, system, and launch plan behind your next digital experience.",
    visitWebsite: "Visit Al Baraka",
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
    eyebrow: "دراسة حالة / 04",
    title: "Al Baraka",
    subtitle: "منصة تصدير الزيتون والمنتجات الغذائية المصرية",
    headlineLine1: "من كتالوج منتجات",
    headlineLine2: "إلى محادثة تصدير.",
    supporting:
      "كانت البركة بحاجة إلى أكثر من مجرد موقع تعريفي. صممنا تجربة تصدير ثنائية اللغة تجمع بين استكشاف المنتجات، ومواصفات التعبئة، ومصداقية الإنتاج، والاستفسارات متعددة المنتجات في رحلة واحدة واضحة — تنتهي حيث تبدأ محادثات البيع الحقيقية.",
    metricLabels: {
      products: "منتج",
      languages: "لغة",
      certifications: "شهادة",
      inquiryFlow: "مسار استفسار",
    },
    services: [
      "تصميم واجهات وتجربة المستخدم",
      "تطوير الواجهة الأمامية",
      "تجربة ثنائية اللغة",
      "الاتجاه من اليمين لليسار",
      "تصدير بين الشركات",
      "بنية المنتج",
      "تصميم التفاعل",
    ],
    visitLiveWebsite: "زيارة الموقع المباشر",
    scrollHint: "مرر للاستكشاف",
  },

  glance: {
    eyebrow: "المشروع في لمحة",
    headingLine1: "كتالوج تصدير مُركّز،",
    headingLine2: "مبني ليكون مقنعًا.",
    body: "تُصدّر شركة البركة للزيتون والصناعات الغذائية الزيتون وزيت الزيتون والمخللات من الشرقية، مصر. كان على الموقع أن يبدو كمنصة تصدير بين الشركات، لا كموقع تعريفي عام — ثنائي اللغة، ومعتمد، ومبني حول طلب لا حول عملية شراء.",
    chips: [
      "منصة تصدير بين الشركات",
      "الإنجليزية والعربية",
      "تجربة من اليمين لليسار",
      "كتالوج موجّه للتصدير",
      "مسار استفسار عبر واتساب",
      "6 شهادات اعتماد",
    ],
  },

  challenge: {
    eyebrow: "التحدي",
    heading: "المحتوى التسويقي وحده لا يكفي مشتري التصدير.",
    body: [
      "كان لدى البركة حضور رقمي قبل هذا المشروع — نظام مبني لعرض المنتجات وإدارتها عبر لوحة تحكم. لكنه لم يكن يخاطب الطريقة التي يقرر بها مشتري التصدير فعليًا: مقارنة صيغ التعبئة، والتحقق من الشهادات، والسؤال عن عدة منتجات في آن واحد قبل أن يتواصل هاتفيًا.",
      "لم يكن الهدف إضافة المزيد من الصفحات، بل إعادة بناء التجربة حول جمهور واحد — مشترين يتحدثون الإنجليزية والعربية ويحتاجون تفاصيل دقيقة على مستوى المواصفات، وطريقة واحدة سهلة لبدء محادثة حقيقية، دون سلة تسوق تتظاهر بأنها شيء لا تمثله هذه الشركة.",
    ],
  },

  journey: {
    eyebrow: "إعادة التفكير في الرحلة",
    heading: "مسار واحد، بخمس خطوات صادقة.",
    body: "كل صفحة في الموقع تقود إلى مكان محدد. بدلًا من بنية تعريفية مسطحة، تنقل الرحلة المشتري من التوجه العام إلى إجراء واحد ملموس — بناء استفسار وإرساله.",
    steps: ["اكتشاف", "استكشاف المنتجات", "فهم التعبئة والتصدير", "بناء الاستفسار", "محادثة عبر واتساب"],
  },

  systems: {
    eyebrow: "تجربة واحدة. أنظمة متعددة.",
    headingLine1: "تجربة واحدة.",
    headingLine2: "أنظمة متعددة.",
    body: "يلتقي كتالوج المنتجات والتعبئة، وقصة العملية المدفوعة بالتمرير، والطبقة ثنائية اللغة من اليمين لليسار جميعها في مكان واحد — استفسار تصدير واحد.",
    diagram: {
      root: "Al Baraka",
      systems: ["نظام الكتالوج", "محرك العملية", "طبقة اللغة"],
      subsystems: ["بيانات المنتج والتعبئة", "الخط الزمني المثبّت عند التمرير", "سياق ثنائي اللغة من اليمين لليسار"],
      convergence: "استفسار تصدير واحد",
    },
  },

  inquirySystem: {
    eyebrow: "نظام الاستفسار",
    headingLine1: "المشتري يبني طلبًا واحدًا،",
    headingLine2: "لا خمسة.",
    body: [
      "يمكن للمشتري إضافة منتجات إلى استفسار من الكتالوج، أو من صفحة تفاصيل المنتج، أو من شريط المنتجات ذات الصلة — ويبقى اختياره معه أثناء مواصلة التصفح. إزالة عنصر، أو مسح القائمة، أو العودة لاحقًا، كل ذلك يعمل ببساطة.",
      "وعندما يكون جاهزًا، تتجمّع القائمة كاملة — كل منتج بملاحظاته الخاصة — في رسالة واحدة منظمة تُفتح كمحادثة واتساب معبأة مسبقًا مع فريق التصدير في البركة.",
    ],
    stepsLabel: "كيف يُبنى الطلب",
    steps: ["تصفح الكتالوج", "الإضافة من أي صفحة", "الاستمرار عبر الزيارات", "إدارة الاختيارات", "رؤية منتجات ذات صلة", "إرسال استفسار واتساب واحد"],
    capabilitiesLabel: "ما هو هذا فعليًا",
    capabilities: ["حالة عبر React Context", "محفوظة في المتصفح (localStorage)", "اقتراحات منتجات ذات صلة", "رسالة واتساب واحدة مجمّعة"],
    caveat:
      "هذه حالة محلية في المتصفح، وليست نظام حسابات — لا تسجيل دخول، ولا سلة محفوظة سحابيًا عبر الأجهزة، ولا طلب فعلي يُنفَّذ. إنها أداة بناء طلب، لا نظام إتمام شراء.",
    mediaCaption: "صور منتجات حقيقية من الكتالوج المباشر — نوع العنصر الذي يضيفه المشتري إلى استفساره.",
  },

  cartVsConversation: {
    eyebrow: "فكرة تجربة المستخدم",
    headingLine1: "سلة",
    headingLine2: "لا شيء فيها للشراء.",
    body: "النموذج الذهني المألوف للتجارة الإلكترونية — اختر، اجمع، راجع — يقلل الاحتكاك. أما الإجراء النهائي فيطابق فعليًا الطريقة التي تبيع بها هذه الشركة: عبر محادثة، لا عبر زر إتمام شراء.",
    traditional: { label: "التجارة الإلكترونية التقليدية", steps: ["منتج", "سلة", "إتمام شراء"] },
    albaraka: { label: "Al Baraka", steps: ["منتج", "قائمة استفسار", "محادثة"] },
  },

  process: {
    eyebrow: "تفاعل مميز",
    headingLine1: "العملية،",
    headingLine2: "مصمَّمة لتُروى بالتمرير.",
    body: "يثبّت الموقع المباشر لوحة كل مرحلة على الشاشة أثناء التمرير، ويتتبّع التقدم بخط ممتلئ تدريجيًا، مع تلاشٍ متبادل لنص كل مرحلة وصورتها — ويُعاد استخدامه في صفحتي 'من نحن' و'التصدير'. إعادة البناء أدناه تحاكي السلوك نفسه: تثبيت، ومرحلة واحدة في كل مرة.",
    note: "تحوّلت التعقيدات التشغيلية إلى قصة موجَّهة — مرحلة واحدة، تركيز واحد، تقدّم واضح.",
    stepLabel: "مرحلة",
    steps: [
      {
        eyebrow: "المرحلة 1",
        title: "الزراعة",
        desc: "تبدأ الرحلة بزراعة الزيتون واستصلاح الأراضي، بما يدعم جودة المنتج منذ المصدر.",
      },
      {
        eyebrow: "المرحلة 2",
        title: "المعالجة والتصنيع",
        desc: "تُحضَّر المنتجات بعناية لتلبية متطلبات سلامة الغذاء ومواصفات المشتري.",
      },
      {
        eyebrow: "المرحلة 3",
        title: "التعبئة",
        desc: "تُعبأ المنتجات في صيغ جاهزة للتصدير تتوافق مع متطلبات كل سوق.",
      },
      {
        eyebrow: "المرحلة 4",
        title: "التصدير",
        desc: "يُنسَّق الشحن بين العميل وفريق التصدير ومزود الخدمات اللوجستية.",
      },
    ],
    caveat: "إعادة بناء مستقلة صُممت خصيصًا لدراسة الحالة هذه — وليست تضمينًا للموقع المباشر.",
  },

  bilingual: {
    eyebrow: "ثنائية اللغة كجزء من البنية",
    headingLine1: "مبنية بلغتين،",
    headingLine2: "لا مترجمة لاحقًا.",
    intro: "الإنجليزية والعربية كلتاهما لغتان أساسيتان هنا — تخطيط كامل من اليمين لليسار، لا مجرد تبديل تسمية مترجمة آليًا.",
    body: "تبديل اللغة يقلب اتجاه القراءة في المستند نفسه، ويحفظ اختيار الزائر، ويعيد تشغيل بيانات كل صفحة الوصفية — بينما تتفرّع عدة مكوّنات حسب الاتجاه مباشرة بدلًا من الاعتماد على انعكاس CSS شامل.",
    languages: ["الإنجليزية", "العربية"],
    flow: ["اختيار الزائر", "تفضيل محفوظ", "قلب الاتجاه (يسار لليمين ↔ يمين لليسار)", "تخطيط واعٍ بالاتجاه"],
    note: "قيد حقيقي واحد، مذكور بوضوح: تبديل اللغة يتم على الرابط نفسه بدلًا من مسارات محلية منفصلة، لذا توجد وسوم hreflang دون أن تشير بعد إلى صفحات مستقلة قابلة للفهرسة لكل لغة. القوة الهندسية هنا في تجربة الاتجاه أثناء التشغيل، لا في التوطين لمحركات البحث.",
  },

  catalogArchitecture: {
    eyebrow: "بنية الكتالوج والتعبئة",
    heading: "المواصفات أولًا، لا الحجم أولًا.",
    body: "هذه ليست قصة عن التصفح بين آلاف المنتجات. إنها كتالوج مُركّز من أربع فئات، مُنظّم حول التفاصيل التي يحتاجها مشتري التصدير فعليًا قبل أن يطرح سؤالًا — الصنف، والصيغة، والحجم.",
    familiesLabel: "فئات المنتجات",
    families: ["زيتون أخضر", "زيتون أسود", "منتجات فاخرة وزيت زيتون", "خضروات مخللة"],
    packagingLabel: "صيغ تعبئة التصدير",
    packaging: ["برطمانات زجاجية وبلاستيكية", "علب معدنية", "أكياس مرنة", "براميل بلاستيكية — حتى 160 كجم"],
    mediaCaption: "تعبئة مبنية للتصدير — من برطمانات التجزئة إلى صيغ البراميل بالجملة.",
  },

  visualDirection: {
    eyebrow: "التوجه البصري",
    heading: "أخضر زيتوني، ألوان محايدة دافئة، وصور حقيقية.",
    body: "لوحة زيتونية تحريرية عميقة على خلفيات دافئة قريبة من الأبيض، وعناوين بخط EB Garamond فوق نص أساسي بخط Inter، وصور زراعية بامتداد كامل تحمل الهوية — بأسلوب مقتصد لا زخرفي.",
    caveat: "توجد طبقة مكوّنات حقيقية ومُعاد استخدامها (أزرار، بطاقات، كتل إحصائية) — لكن الألوان تُطبَّق حسب كل استخدام لا من نظام رموز رسمي، لذا تُوصف هنا كتوجه بصري لا كنظام تصميم ناضج.",
    tokensLabel: "لوحة الألوان",
    typographyLabel: "الطباعة",
    typography: ["EB Garamond — للعناوين", "Inter — للنص والواجهة"],
    elementsLabel: "عناصر مميزة",
    elements: ["شريط تنقّل جانبي على الحافة", "أقسام رئيسية تحريرية بامتداد كامل", "ظهور مقتصد عند التمرير", "شارات أيقونات دائرية"],
    stackLabel: "البنية التقنية الموثّقة",
    mediaCaption: "صور إنتاج حقيقية من مكتبة أصول الموقع المباشر نفسه.",
  },

  trust: {
    eyebrow: "الثقة لجمهور التصدير",
    heading: "مصداقية، مذكورة بوضوح.",
    body: "تظهر ست علامات اعتماد، وموقع تشغيل مُسمّى، وشخصية قيادية مذكورة مباشرة على الصفحات التي يقرؤها المشتري قبل الاستفسار — لا خلف ملف PDF قابل للتنزيل.",
    certificationsLabel: "الشهادات المعروضة على الموقع",
    infoLabel: "معلومات الشركة",
    info: ["محافظة الشرقية، مصر", "تعمل منذ عام 2004", "برئاسة الحاج عصام عمارة", "إنتاج موجّه للتصدير"],
    caveat:
      "الأرقام المتعلقة بتاريخ التشغيل وحصة التصدير المعروضة على الموقع هي معلومات أعمال مقدَّمة من البركة نفسها — وليست أرقامًا دقّقتها أو قاستها Lux Studio بشكل مستقل.",
    mediaCaption: "صور إنتاج حقيقية — المنشأة وراء الشهادات.",
  },

  gallery: {
    eyebrow: "الشاشات والوسائط الرئيسية",
    heading: "التجربة، شاشة تلو الأخرى.",
    items: {
      bottling: { title: "الإنتاج", caption: "خط تعبئة زيت الزيتون — مصداقية الإنتاج بشكل مرئي." },
      washing: { title: "المعالجة", caption: "الغسيل والفرز، جزء من قصة الرحلة من الزراعة إلى التصدير." },
      press: { title: "الحرفية", caption: "العصر التقليدي — الجذور الزراعية وراء العلامة." },
      orchard: { title: "المصدر", caption: "من حيث يبدأ المنتج، قبل أن يصل إلى أي مشترٍ." },
      shipping: { title: "التصدير", caption: "الخدمات اللوجستية — المرحلة الأخيرة من الخط الزمني للعملية." },
      mobile: { title: "الهاتف المحمول", caption: "شاشات كاملة قيد التجهيز — متاحة عند الطلب." },
    },
  },

  result: {
    eyebrow: "النتيجة",
    headingLine1: "من كتالوج منتجات",
    headingLine2: "إلى محادثة تصدير.",
    body: "أصبح اكتشاف المنتجات، ومواصفات التعبئة، ومصداقية الإنتاج، والاستفسارات متعددة المنتجات تعيش الآن داخل رحلة واحدة ثنائية اللغة — تنتهي، عن قصد، حيث تبدأ محادثة بيع حقيقية لا عند شاشة إتمام شراء.",
  },

  finalCta: {
    eyebrow: "من إنتاج Lux Studio",
    heading: "هل لديك مشروع يستحق هذا المستوى من العناية؟",
    description: "دعنا نصوغ الاستراتيجية والتصميم والنظام وخطة الإطلاق وراء تجربتك الرقمية القادمة.",
    visitWebsite: "زيارة Al Baraka",
    nextCaseStudy: "دراسة الحالة التالية",
    comingSoon: "المزيد من دراسات الحالة قريبًا",
  },

  common: {
    openInNewTab: (label: string) => `فتح ${label} في علامة تبويب جديدة`,
    pendingScreen: "الشاشة قادمة قريبًا",
    backToWork: "العودة إلى الأعمال",
  },
};

export type AlBarakaCopy = typeof en;
export const alBarakaCopy: Dict<AlBarakaCopy> = { en, ar };
