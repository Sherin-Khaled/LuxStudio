import type { Dict } from "../useDict";

/** Copy for StudioUniverseSection — the orbiting-sphere "one system" section. */
const en = {
  eyebrow: "Studio Universe",
  heading: "Every layer works inside one system.",
  description:
    "Strategy, content, design, development, motion, systems, performance, and launch all connect to create digital experiences that feel intentional and ready to grow.",
  exploreLayers: "Explore the layers",
  layers: ["Strategy", "Design", "Content", "Motion", "Systems", "Performance"],
};

const ar: typeof en = {
  eyebrow: "عالم الاستوديو",
  heading: "كل طبقة تعمل داخل نظام واحد متكامل.",
  description:
    "تتكامل الاستراتيجية والمحتوى والتصميم والتطوير والحركة والأنظمة والأداء وإطلاق المشروع معًا لصياغة تجارب رقمية مدروسة وجاهزة للنمو.",
  exploreLayers: "استكشف الطبقات",
  layers: ["الاستراتيجية", "التصميم", "المحتوى", "الحركة", "الأنظمة", "الأداء"],
};

export const universeDict: Dict<typeof en> = { en, ar };
