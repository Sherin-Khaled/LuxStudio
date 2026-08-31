import type { Dict } from "./useDict";

const en = {
  columns: [
    {
      title: "PAGES",
      items: [
        { key: "home", label: "Home" },
        { key: "work", label: "Work" },
        { key: "services", label: "Services" },
        { key: "process", label: "Process" },
        { key: "about", label: "About" },
        { key: "contact", label: "Contact" },
      ],
    },
    {
      title: "CAPABILITIES",
      items: [
        { key: "uiux", label: "UI/UX Design" },
        { key: "webdev", label: "Web Development" },
        { key: "dashboards", label: "Dashboards & CMS" },
        { key: "brand", label: "Brand & Content" },
        { key: "seo", label: "SEO & Performance" },
      ],
    },
    {
      title: "CONTACT",
      items: [
        { key: "start", label: "Start a Project" },
        { key: "youtube", label: "YouTube" },
        { key: "behance", label: "Behance" },
        { key: "linkedin", label: "LinkedIn" },
        { key: "github", label: "GitHub" },
        { key: "instagram", label: "Instagram" },
      ],
    },
  ],
  tagline: "Design. Build. Scale.",
  description:
    "A creative technology studio shaping premium websites, digital systems, and brand experiences from strategy to launch.",
  navAriaLabel: "Footer navigation",
  newsletter: {
    eyebrow: "STAY UPDATED",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    honeypotLabel: "Leave this field empty",
    subscribe: "Subscribe",
    sending: "Sending…",
    errorEmpty: "Please enter your email address.",
    errorGeneric: "Please check your email and try again.",
    errorNetwork: "Something went wrong. Please try again.",
    success: "You're subscribed. We'll be in touch with updates.",
  },
  copyright: "© 2026 Lux Studio. All rights reserved.",
  craftedBy: "Designed and built by Lux Studio.",
};

const ar: typeof en = {
  columns: [
    {
      title: "الصفحات",
      items: [
        { key: "home", label: "الرئيسية" },
        { key: "work", label: "الأعمال" },
        { key: "services", label: "الخدمات" },
        { key: "process", label: "المنهجية" },
        { key: "about", label: "من نحن" },
        { key: "contact", label: "تواصل معنا" },
      ],
    },
    {
      title: "الخدمات",
      items: [
        { key: "uiux", label: "تصميم UI/UX" },
        { key: "webdev", label: "تطوير الويب" },
        { key: "dashboards", label: "لوحات التحكم وأنظمة المحتوى" },
        { key: "brand", label: "الهوية والمحتوى" },
        { key: "seo", label: "تحسين محركات البحث والأداء" },
      ],
    },
    {
      title: "تواصل معنا",
      items: [
        { key: "start", label: "ابدأ مشروعك" },
        { key: "youtube", label: "YouTube" },
        { key: "behance", label: "Behance" },
        { key: "linkedin", label: "LinkedIn" },
        { key: "github", label: "GitHub" },
        { key: "instagram", label: "Instagram" },
      ],
    },
  ],
  tagline: "تصميم. بناء. توسّع.",
  description:
    "استوديو تقني إبداعي يبني مواقع ونظماً رقمية وتجارب علامة تجارية متميزة، من الاستراتيجية وحتى الإطلاق.",
  navAriaLabel: "روابط الفوتر",
  newsletter: {
    eyebrow: "ابقَ على اطلاع",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "you@email.com",
    honeypotLabel: "اترك هذا الحقل فارغاً",
    subscribe: "اشتراك",
    sending: "جارٍ الإرسال…",
    errorEmpty: "يرجى إدخال بريدك الإلكتروني.",
    errorGeneric: "يرجى التحقق من بريدك الإلكتروني والمحاولة مرة أخرى.",
    errorNetwork: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    success: "تم اشتراكك بنجاح. سنوافيك بآخر التحديثات.",
  },
  copyright: "© 2026 Lux Studio. جميع الحقوق محفوظة.",
  craftedBy: "تصميم وتطوير Lux Studio.",
};

export const footerDict: Dict<typeof en> = { en, ar };
