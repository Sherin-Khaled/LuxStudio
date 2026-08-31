import type { CaseStudyData } from "./types";

/**
 * Non-text data for the Houd El Nile case study. Real assets live in
 * `client/public/case-studies/houd-el-nile/` — seven of them are optimized
 * WebP crops of the actual UI/UX page exports at `D:\UIUX\houdelnile\`
 * (top-of-page crop, 1600×1000, same convention as X Dental's own case-study
 * assets), one is real farm/orchard photography sourced from the live
 * project's own `public/hero/` folder, and one is a restrained, mildly
 * upscaled copy of the archived legacy WordPress theme's own screenshot —
 * see `HoudElNileCaseStudyBody.tsx` for how each is used.
 *
 * Every fact here (languages, certifications, product count, stack, tokens)
 * is verified against the real Houd El Nile Next.js codebase at
 * `D:\Front-End\Work\HOUDELNILE\`, not invented.
 */
export const houdElNileData: CaseStudyData = {
  slug: "houd-el-nile",
  projectNumber: "02",
  websiteUrl: "https://houdelnile.com",
  websiteLabel: "houdelnile.com",
  accent: "#4ade80",

  // Deliberately modest, verified counts (7 locale files, 7 certification
  // marks, 11 product SKUs) rather than X Dental's commerce-scale numbers —
  // the point here isn't scale, so the hero shouldn't read like it is.
  metrics: [
    { value: "7", key: "languages" },
    { value: "7", key: "certifications" },
    { value: "11", key: "products" },
  ],

  // Real, verified stack — not translated.
  technicalStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "next-intl", "Framer Motion", "Nodemailer"],

  // Real Houd El Nile brand tokens, verified against the live tailwind.config.mjs.
  designTokens: [
    { name: "deep green", hex: "#0B3D2E" },
    { name: "amber", hex: "#F5A300" },
    { name: "amber hover", hex: "#D87C00" },
    { name: "ink", hex: "#0E0E0E" },
    { name: "paper", hex: "#F7F5EF" },
  ],

  media: {
    hero: { src: "/case-studies/houd-el-nile/hero.webp", key: "hero" },
    legacyBefore: { src: "/case-studies/houd-el-nile/legacy-before.webp", key: "legacyBefore" },
    home: { src: "/case-studies/houd-el-nile/home.webp", key: "home" },
    products: { src: "/case-studies/houd-el-nile/products.webp", key: "products" },
    productDetail: { src: "/case-studies/houd-el-nile/product-detail.webp", key: "productDetail" },
    qualityProcess: { src: "/case-studies/houd-el-nile/quality-process.webp", key: "qualityProcess" },
    exportServices: { src: "/case-studies/houd-el-nile/export-services.webp", key: "exportServices" },
    about: { src: "/case-studies/houd-el-nile/about.webp", key: "about" },
    contact: { src: "/case-studies/houd-el-nile/contact.webp", key: "contact" },
  },

  // Chains to the next published case study in registry order (see
  // registry.ts) — "Next Case Study" now links forward instead of showing
  // a stale coming-soon state.
  nextSlug: "al-nours",
};
