import type { Dict } from "./useDict";

/**
 * Strings shared across the navbar, footer, and more than one page (nav
 * labels, the "Start a Project" CTA, generic action labels). Page-specific
 * copy lives in its own dictionary file next to the page it belongs to.
 *
 * Pattern every dictionary in this project follows: define `en` first (its
 * inferred shape becomes the contract), then type `ar` as `typeof en` so a
 * missing or extra Arabic key is a compile error, not a silent runtime gap.
 */
const en = {
  brand: "Lux Studio",
  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    about: "About",
    contact: "Contact",
  },
  actions: {
    startAProject: "Start a Project",
    viewWork: "View Work",
    viewOurWork: "View Our Work",
    exploreServices: "Explore Services",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  sound: {
    on: "Sound On",
    off: "Sound Off",
    onLabel: "Sound on",
    offLabel: "Sound off",
  },
  theme: {
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
  },
  language: {
    switchToArabic: "Switch to Arabic",
    switchToEnglish: "Switch to English",
    code: "EN",
  },
};

const ar: typeof en = {
  brand: "Lux Studio",
  nav: {
    work: "الأعمال",
    services: "الخدمات",
    process: "المنهجية",
    about: "من نحن",
    contact: "تواصل معنا",
  },
  actions: {
    startAProject: "ابدأ مشروعك",
    viewWork: "استعرض الأعمال",
    viewOurWork: "استعرض أعمالنا",
    exploreServices: "استكشف الخدمات",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },
  sound: {
    on: "الصوت مفعّل",
    off: "الصوت متوقف",
    onLabel: "الصوت مفعّل",
    offLabel: "الصوت متوقف",
  },
  theme: {
    toDark: "التبديل إلى الوضع الداكن",
    toLight: "التبديل إلى الوضع الفاتح",
  },
  language: {
    switchToArabic: "التبديل إلى العربية",
    switchToEnglish: "التبديل إلى الإنجليزية",
    code: "AR",
  },
};

export const commonDict: Dict<typeof en> = { en, ar };
