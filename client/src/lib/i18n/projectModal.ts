import type { Dict } from "./useDict";

/**
 * Canonical option *values* stored in form state and sent to /api/contact —
 * always English, stable, and independent of the display language, so the
 * (English-only) dashboard always receives consistent data regardless of
 * which language the visitor submitted the form in. Dictionaries below only
 * translate the *label* shown for each value.
 */
export const projectTypeValues = [
  "Website",
  "E-commerce",
  "Dashboard / CMS",
  "Brand + Website",
  "Website Redesign",
  "Not sure yet",
] as const;
export const budgetValues = ["Small project", "Medium project", "Large / custom system", "Not sure yet"] as const;
export const timelineValues = ["As soon as possible", "This month", "1–3 months", "Flexible"] as const;

const en = {
  title: "Start your project signal.",
  description:
    "Tell us what you want to build, improve, or launch — and we'll help shape the right strategy, design, and technical direction.",
  fields: {
    name: { label: "Name", placeholder: "Your full name" },
    contact: { label: "Email or WhatsApp", placeholder: "you@email.com or WhatsApp number" },
    company: { label: "Company / Brand", placeholder: "Business or brand name" },
    projectType: { label: "Project type", placeholder: "Select a project type" },
    budget: { label: "Budget range", placeholder: "Select a budget range" },
    timeline: { label: "Timeline", placeholder: "Select a timeline" },
    message: {
      label: "Message",
      placeholder:
        "Tell us about your business, project goals, current website, required features, references, or anything you want us to know.",
    },
  },
  optionLabels: {
    projectType: {
      Website: "Website",
      "E-commerce": "E-commerce",
      "Dashboard / CMS": "Dashboard / CMS",
      "Brand + Website": "Brand + Website",
      "Website Redesign": "Website Redesign",
      "Not sure yet": "Not sure yet",
    } as Record<(typeof projectTypeValues)[number], string>,
    budget: {
      "Small project": "Small project",
      "Medium project": "Medium project",
      "Large / custom system": "Large / custom system",
      "Not sure yet": "Not sure yet",
    } as Record<(typeof budgetValues)[number], string>,
    timeline: {
      "As soon as possible": "As soon as possible",
      "This month": "This month",
      "1–3 months": "1–3 months",
      Flexible: "Flexible",
    } as Record<(typeof timelineValues)[number], string>,
  },
  honeypotLabel: "Leave this field empty",
  errorRequired: "Please check the required fields and try again.",
  success: "Project signal received. We'll review your message and respond soon.",
  savedNote: "Project signal will be saved to dashboard and sent to email when configured.",
  sending: "Sending…",
  submit: "Send Project Signal",
  close: "Close",
};

const ar: typeof en = {
  title: "أرسل إشارة بدء مشروعك.",
  description:
    "أخبرنا بما تريد بناءه أو تطويره أو إطلاقه — وسنساعدك في تحديد الاستراتيجية والتصميم والتوجه التقني المناسب.",
  fields: {
    name: { label: "الاسم", placeholder: "اسمك الكامل" },
    contact: { label: "البريد الإلكتروني أو واتساب", placeholder: "you@email.com أو رقم واتساب" },
    company: { label: "الشركة / العلامة التجارية", placeholder: "اسم الشركة أو العلامة التجارية" },
    projectType: { label: "نوع المشروع", placeholder: "اختر نوع المشروع" },
    budget: { label: "الميزانية التقريبية", placeholder: "اختر نطاق الميزانية" },
    timeline: { label: "الجدول الزمني", placeholder: "اختر الجدول الزمني" },
    message: {
      label: "الرسالة",
      placeholder:
        "أخبرنا عن نشاطك التجاري وأهداف المشروع وموقعك الحالي والميزات المطلوبة وأي مراجع أو تفاصيل تريدنا أن نعرفها.",
    },
  },
  optionLabels: {
    projectType: {
      Website: "موقع إلكتروني",
      "E-commerce": "متجر إلكتروني",
      "Dashboard / CMS": "لوحة تحكم / نظام إدارة محتوى",
      "Brand + Website": "هوية تجارية + موقع إلكتروني",
      "Website Redesign": "إعادة تصميم موقع",
      "Not sure yet": "لست متأكداً بعد",
    },
    budget: {
      "Small project": "مشروع صغير",
      "Medium project": "مشروع متوسط",
      "Large / custom system": "مشروع كبير / نظام مخصص",
      "Not sure yet": "لست متأكداً بعد",
    },
    timeline: {
      "As soon as possible": "في أقرب وقت ممكن",
      "This month": "خلال هذا الشهر",
      "1–3 months": "١–٣ أشهر",
      Flexible: "مرن",
    },
  },
  honeypotLabel: "اترك هذا الحقل فارغاً",
  errorRequired: "يرجى مراجعة الحقول المطلوبة والمحاولة مرة أخرى.",
  success: "تم استلام إشارة مشروعك. سنراجع رسالتك ونرد عليك قريباً.",
  savedNote: "سيتم حفظ إشارة المشروع في لوحة التحكم وإرسالها بالبريد الإلكتروني عند تفعيله.",
  sending: "جارٍ الإرسال…",
  submit: "إرسال إشارة المشروع",
  close: "إغلاق",
};

export const projectModalDict: Dict<typeof en> = { en, ar };
