import type { Dict } from "../useDict";

/** Copy for ExpertiseHighlightsSection's scrolling marquee of capabilities. */
const en = {
  sectionLabel: "Expertise highlights",
  items: [
    "Strategy",
    "UI/UX Design",
    "Frontend Development",
    "Backend & Integrations",
    "Dashboards & CMS",
    "Brand & Content",
    "SEO & Performance",
  ],
};

const ar: typeof en = {
  sectionLabel: "أبرز مجالات الخبرة",
  items: [
    "الاستراتيجية",
    "تصميم UI/UX",
    "تطوير الواجهات الأمامية",
    "الأنظمة الخلفية والتكاملات",
    "لوحات التحكم وأنظمة المحتوى",
    "الهوية والمحتوى",
    "تحسين محركات البحث والأداء",
  ],
};

export const expertiseDict: Dict<typeof en> = { en, ar };
