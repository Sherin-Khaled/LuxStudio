import type { CaseStudyData } from "./types";

/**
 * Non-text data for the Al Baraka case study. Real media lives in
 * `client/public/case-studies/al-baraka/` — the hero video, product/
 * packaging/process photography, and certification marks are all sourced
 * directly from the real Al Baraka codebase's own `client/public/` assets at
 * `D:\Front-End\Work\OLIVE-WEBSITE-Products-1\OLIVE-WEBSITE-Products-1\`
 * (originals left untouched, only optimized copies live here). There is no
 * full-page UI screenshot set for this project — unlike X Dental/Houd El
 * Nile/Al Nours, no capture tool was available, so the case study body
 * builds a few small, honestly-labeled project-specific recreations instead
 * of fabricating screens (see `AlBarakaCaseStudyBody.tsx`).
 *
 * Every fact below (product/language/certification counts, stack, tokens) is
 * verified against that real codebase, not invented — see the research this
 * case study was built from. The project has no working backend/database
 * (an Express static server only, an empty route stub, an unused in-memory
 * user store) — `technicalStack` intentionally omits Drizzle/PostgreSQL/
 * Passport rather than implying a functioning data layer that isn't there.
 */
export const alBarakaData: CaseStudyData = {
  slug: "al-baraka",
  projectNumber: "04",
  websiteUrl: "https://albarakaolives.com",
  websiteLabel: "albarakaolives.com",
  accent: "#a3e635",

  // Deliberately modest, verified counts — the story here is a catalog
  // reshaped around a conversation, not commerce scale.
  metrics: [
    { value: "17", key: "products" },
    { value: "2", key: "languages" },
    { value: "6", key: "certifications" },
    { value: "1", key: "inquiryFlow" },
  ],

  // Real, verified stack — not translated. Express is listed because it does
  // ship the production build; it isn't credited with API/business logic it
  // doesn't have.
  technicalStack: ["React", "TypeScript", "Vite", "Wouter", "Tailwind CSS", "Framer Motion", "Express"],

  // Real Al Baraka brand colors, verified against the live project's own
  // page code (Header.tsx, Contact.tsx, Inquiry.tsx) — hand-picked hex used
  // consistently per usage, not a formal token layer (see Visual Direction).
  designTokens: [
    { name: "deep olive", hex: "#1F3D2B" },
    { name: "olive", hex: "#4F6027" },
    { name: "header green", hex: "#4B6610" },
    { name: "warm neutral", hex: "#F4F6EE" },
  ],

  media: {
    hero: { videoSrc: "/case-studies/al-baraka/hero.mp4", key: "hero" },
    catalog: { src: "/case-studies/al-baraka/catalog.webp", key: "catalog" },
    packaging: { src: "/case-studies/al-baraka/packaging.webp", key: "packaging" },
    about: { src: "/case-studies/al-baraka/about.webp", key: "about" },
    exportLogistics: { src: "/case-studies/al-baraka/export-logistics.webp", key: "exportLogistics" },
    galleryBottling: { src: "/case-studies/al-baraka/gallery-bottling.webp", key: "galleryBottling" },
    galleryWashing: { src: "/case-studies/al-baraka/gallery-washing.webp", key: "galleryWashing" },
    galleryPress: { src: "/case-studies/al-baraka/gallery-press.webp", key: "galleryPress" },
    galleryOrchard: { src: "/case-studies/al-baraka/gallery-orchard.webp", key: "galleryOrchard" },
    galleryShipping: { src: "/case-studies/al-baraka/gallery-shipping.webp", key: "galleryShipping" },
    galleryMobile: { src: "/case-studies/al-baraka/gallery-mobile.webp", key: "galleryMobile" },
  },

  // Fifth case study now exists — completes the chain (X Dental → Houd El
  // Nile → Al Nours → Al Baraka → Abdalwahb).
  nextSlug: "abdalwahb",
};
