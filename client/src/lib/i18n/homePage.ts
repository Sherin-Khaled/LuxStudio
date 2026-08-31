import type { Dict } from "./useDict";

const en = {
  cta: {
    eyebrow: "Start a Project",
    heading: "Ready to build something memorable?",
    description:
      "Tell us what you want to build, and we'll help shape the strategy, design, and system that brings it to life.",
    secondaryLabel: "View Work",
  },
};

const ar: typeof en = {
  cta: {
    eyebrow: "ابدأ مشروعك",
    heading: "هل أنت مستعد لبناء شيء لا يُنسى؟",
    description: "أخبرنا بما تريد بناءه، وسنساعدك في تحديد الاستراتيجية والتصميم والنظام الذي يحوّله إلى واقع.",
    secondaryLabel: "استعرض الأعمال",
  },
};

export const homePageDict: Dict<typeof en> = { en, ar };
