import type { Dict } from "../useDict";

/**
 * Copy for HeroBannerSection. "Start a Project" / "View Our Work" are not
 * duplicated here — they're pulled from commonDict since they match the
 * shared action labels exactly.
 */
const en = {
  sectionLabel: "Hero banner",
  heading: "Design. Build. Scale.",
  description: "From strategy to launch, we create digital experiences people remember.",
  weCreate: "We create",
  digitalExperiences: "Digital Experiences",
  scrollToExplore: "SCROLL TO EXPLORE",
};

const ar: typeof en = {
  sectionLabel: "البانر الرئيسي",
  heading: "تصميم. بناء. توسّع.",
  description: "من الاستراتيجية وحتى الإطلاق، نصنع تجارب رقمية تبقى في الذاكرة.",
  weCreate: "نصنع",
  digitalExperiences: "تجارب رقمية",
  scrollToExplore: "مرر للأسفل للاستكشاف",
};

export const heroDict: Dict<typeof en> = { en, ar };
