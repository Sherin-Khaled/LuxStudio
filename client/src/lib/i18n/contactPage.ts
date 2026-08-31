import type { Dict } from "./useDict";

/**
 * Copy for ContactPage.tsx. Client/brand names inside `clientNotes`
 * (X Dental, Al Nours, Al Baraka Olives, Houd El Nile) are real client names
 * and stay untranslated — only the quote text, category, and tag labels are
 * localized. Select option *values* come from projectModal.ts's canonical
 * English arrays (projectTypeValues/budgetValues/timelineValues) so the
 * (English-only) dashboard always receives consistent data regardless of
 * submission language; only the displayed *label* is localized here.
 *
 * Pattern: `en` defined first (its inferred shape is the contract), `ar`
 * typed as `typeof en` so a missing/extra Arabic key is a compile error.
 */
const en = {
  hero: {
    eyebrow: "Contact Lux Studio",
    heading: "Let's shape your next digital experience.",
    body: "Tell us what you want to build, improve, or launch — and we'll help define the right strategy, design, and technical direction.",
    tagline: "Websites · E-commerce · Dashboards · CMS · Brand Experiences",
    startAProject: "Start a Project",
    viewOurWork: "View Our Work",
    visualAlt: "A pulsing signal representing a project request reaching the studio",
  },
  form: {
    eyebrow: "Project Signal",
    heading: "Start with a few details.",
    body: "You do not need to have everything ready. Share your idea, business, goals, and any references — we'll help shape the next step.",
    infoRows: [
      { label: "Response time", value: "Within 24–48 hours" },
      { label: "Best for", value: "Websites, systems, dashboards, e-commerce, and brand experiences" },
      { label: "Next step", value: "Discovery → Direction → Proposal" },
    ],
    readyStatus: "Ready to receive new projects",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      contact: { label: "Email or WhatsApp", placeholder: "you@email.com or WhatsApp number" },
      company: { label: "Company / Brand", placeholder: "Business or brand name" },
      projectType: { label: "Project type", placeholder: "Select a project type" },
      budget: { label: "Budget range", placeholder: "Select a budget range" },
      timeline: { label: "Timeline", placeholder: "Select a timeline" },
      message: {
        label: "Project message",
        placeholder:
          "Tell us about your business, project goals, current website, required features, references, or anything you want us to know.",
      },
    },
    honeypotLabel: "Leave this field empty",
    errorRequired: "Please complete the required fields before sending.",
    errorGeneric: "Please check the required fields and try again.",
    errorNetwork: "Something went wrong. Please try again.",
    success: "Your message has been received. We'll review it and get back to you soon.",
    sending: "Sending…",
    submit: "Send Project Request",
  },
  nextSteps: {
    eyebrow: "After You Send",
    heading: "What happens next.",
    body: "We keep the first step simple. Once we receive your message, we review the project direction and suggest the best next move.",
    steps: [
      { num: "01", title: "Review", desc: "We review your message, business needs, project type, and references." },
      {
        num: "02",
        title: "Direction",
        desc: "We suggest the right direction, possible scope, and what the project needs before design or development starts.",
      },
      { num: "03", title: "Proposal", desc: "If the project fits, we prepare a clear proposal, timeline, and next steps." },
    ],
  },
  notes: {
    eyebrow: "Client Notes",
    heading: "What clients notice after working with us.",
    body: "Client feedback, project needs, and the details people value when we shape, design, build, and launch complete digital experiences.",
    items: [
      {
        id: 1,
        text: "The product visuals became much cleaner and more consistent across the platform.",
        author: "X Dental",
        category: "E-commerce Platform",
        tag: "Review",
      },
      {
        id: 2,
        text: "We needed a clearer buying journey and a stronger online presence for customers.",
        author: "Al Nours",
        category: "E-commerce Website",
        tag: "Review",
      },
      {
        id: 3,
        text: "The redesign made the brand feel more premium and easier to understand.",
        author: "Al Baraka Olives",
        category: "Export Brand Website",
        tag: "Review",
      },
      {
        id: 4,
        text: "The website finally felt aligned with our business, products, and export identity.",
        author: "Houd El Nile",
        category: "Agriculture Export Website",
        tag: "Review",
      },
      {
        id: 5,
        text: "The process helped us organize the content before the design and development started.",
        author: "Project Note",
        category: "Website Strategy",
        tag: "Client Note",
      },
      {
        id: 6,
        text: "The final experience felt more complete because design, content, and development were connected.",
        author: "Client Note",
        category: "Digital Experience",
        tag: "Project Note",
      },
      {
        id: 7,
        text: "We appreciated that the work did not stop at the design. The structure, content, performance, and launch details were all considered.",
        author: "Launch Note",
        category: "Website Delivery",
        tag: "Project Note",
      },
      {
        id: 8,
        text: "The website became easier to present, easier to understand, and more aligned with the business direction.",
        author: "Client Note",
        category: "Brand Experience",
        tag: "Review",
      },
    ],
  },
  cta: {
    eyebrow: "Ready",
    heading: "Ready to start the conversation?",
    description: "Send your project details and we'll help you understand the next step.",
    secondaryLabel: "View Work",
  },
};

const ar: typeof en = {
  hero: {
    eyebrow: "تواصل مع Lux Studio",
    heading: "لنشكّل تجربتك الرقمية القادمة.",
    body: "أخبرنا بما تريد بناءه أو تطويره أو إطلاقه — وسنساعدك في تحديد الاستراتيجية والتصميم والتوجه التقني المناسب.",
    tagline: "مواقع إلكترونية · تجارة إلكترونية · لوحات تحكم · أنظمة إدارة محتوى · تجارب علامات تجارية",
    startAProject: "ابدأ مشروعك",
    viewOurWork: "استعرض أعمالنا",
    visualAlt: "إشارة نابضة ترمز لوصول طلب مشروع إلى الاستوديو",
  },
  form: {
    eyebrow: "إشارة المشروع",
    heading: "ابدأ بذكر بعض التفاصيل.",
    body: "لا تحتاج أن يكون كل شيء جاهزاً. شاركنا فكرتك ونشاطك التجاري وأهدافك وأي مراجع — وسنساعدك في تحديد الخطوة التالية.",
    infoRows: [
      { label: "وقت الرد", value: "خلال 24–48 ساعة" },
      { label: "الأنسب لـ", value: "المواقع الإلكترونية والأنظمة ولوحات التحكم والتجارة الإلكترونية وتجارب العلامات التجارية" },
      { label: "الخطوة التالية", value: "الاكتشاف ← التوجيه ← العرض المقترح" },
    ],
    readyStatus: "جاهزون لاستقبال مشاريع جديدة",
    fields: {
      name: { label: "الاسم", placeholder: "اسمك الكامل" },
      contact: { label: "البريد الإلكتروني أو واتساب", placeholder: "you@email.com أو رقم واتساب" },
      company: { label: "الشركة / العلامة التجارية", placeholder: "اسم الشركة أو العلامة التجارية" },
      projectType: { label: "نوع المشروع", placeholder: "اختر نوع المشروع" },
      budget: { label: "الميزانية التقريبية", placeholder: "اختر نطاق الميزانية" },
      timeline: { label: "الجدول الزمني", placeholder: "اختر الجدول الزمني" },
      message: {
        label: "رسالة المشروع",
        placeholder:
          "أخبرنا عن نشاطك التجاري وأهداف المشروع وموقعك الحالي والميزات المطلوبة وأي مراجع أو تفاصيل تريدنا أن نعرفها.",
      },
    },
    honeypotLabel: "اترك هذا الحقل فارغاً",
    errorRequired: "يرجى إكمال الحقول المطلوبة قبل الإرسال.",
    errorGeneric: "يرجى مراجعة الحقول المطلوبة والمحاولة مرة أخرى.",
    errorNetwork: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    success: "تم استلام رسالتك. سنراجعها ونعاود التواصل معك قريباً.",
    sending: "جارٍ الإرسال…",
    submit: "إرسال طلب المشروع",
  },
  nextSteps: {
    eyebrow: "بعد الإرسال",
    heading: "ماذا يحدث بعد ذلك.",
    body: "نحرص على إبقاء الخطوة الأولى بسيطة. بمجرد استلام رسالتك، نراجع توجه المشروع ونقترح الخطوة التالية الأنسب.",
    steps: [
      { num: "01", title: "المراجعة", desc: "نراجع رسالتك واحتياجات عملك ونوع المشروع وأي مراجع أرفقتها." },
      {
        num: "02",
        title: "التوجيه",
        desc: "نقترح التوجه المناسب والنطاق المحتمل للمشروع وما يحتاجه قبل بدء التصميم أو التطوير.",
      },
      { num: "03", title: "العرض المقترح", desc: "إذا كان المشروع مناسباً، نُعدّ عرضاً واضحاً وجدولاً زمنياً وخطوات تالية." },
    ],
  },
  notes: {
    eyebrow: "ملاحظات العملاء",
    heading: "ما يلاحظه العملاء بعد العمل معنا.",
    body: "ملاحظات العملاء واحتياجات المشاريع والتفاصيل التي يقدّرها الناس عندما نصوغ ونصمم ونبني ونطلق تجارب رقمية متكاملة.",
    items: [
      {
        id: 1,
        text: "أصبحت الصور المرئية للمنتجات أنظف وأكثر اتساقاً عبر المنصة.",
        author: "X Dental",
        category: "منصة تجارة إلكترونية",
        tag: "تقييم",
      },
      {
        id: 2,
        text: "كنا بحاجة إلى رحلة شراء أوضح وحضور أقوى على الإنترنت لعملائنا.",
        author: "Al Nours",
        category: "موقع تجارة إلكترونية",
        tag: "تقييم",
      },
      {
        id: 3,
        text: "جعلت إعادة التصميم العلامة التجارية تبدو أكثر فخامة وأسهل فهماً.",
        author: "Al Baraka Olives",
        category: "موقع علامة تصدير",
        tag: "تقييم",
      },
      {
        id: 4,
        text: "شعر الموقع أخيراً بالانسجام مع نشاطنا ومنتجاتنا وهويتنا التصديرية.",
        author: "Houd El Nile",
        category: "موقع تصدير زراعي",
        tag: "تقييم",
      },
      {
        id: 5,
        text: "ساعدتنا العملية على تنظيم المحتوى قبل بدء التصميم والتطوير.",
        author: "ملاحظة مشروع",
        category: "استراتيجية الموقع",
        tag: "ملاحظة عميل",
      },
      {
        id: 6,
        text: "شعرت التجربة النهائية بمزيد من الاكتمال لأن التصميم والمحتوى والتطوير كانوا مترابطين.",
        author: "ملاحظة عميل",
        category: "تجربة رقمية",
        tag: "ملاحظة مشروع",
      },
      {
        id: 7,
        text: "قدّرنا أن العمل لم يتوقف عند التصميم فقط. تم الاهتمام بالبنية والمحتوى والأداء وتفاصيل الإطلاق جميعها.",
        author: "ملاحظة إطلاق",
        category: "تسليم الموقع",
        tag: "ملاحظة مشروع",
      },
      {
        id: 8,
        text: "أصبح الموقع أسهل في العرض وأسهل في الفهم وأكثر انسجاماً مع توجه العمل.",
        author: "ملاحظة عميل",
        category: "تجربة العلامة التجارية",
        tag: "تقييم",
      },
    ],
  },
  cta: {
    eyebrow: "جاهزون",
    heading: "هل أنتم جاهزون لبدء الحديث؟",
    description: "أرسل تفاصيل مشروعك وسنساعدك على فهم الخطوة التالية.",
    secondaryLabel: "استعرض الأعمال",
  },
};

export const contactPageDict: Dict<typeof en> = { en, ar };
