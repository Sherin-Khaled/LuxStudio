import type { CaseStudyData } from "./types";

/**
 * Non-text data for the Al Nours case study. Real screenshots live in
 * `client/public/case-studies/al-nours/` — WebP derivatives (top-of-page
 * crops at the same 1600×1000 convention as X Dental/Houd El Nile, plus two
 * untouched-aspect device shots for `tablet`/`mobile`) generated from the
 * real production screens saved in the Al Nours codebase at
 * `D:\Front-End\Work\Senior-Engineer\Senior-Engineer\client\public\images\Home\`.
 * Original source images were left untouched — only optimized copies live
 * here. Every fact below (stack, tokens, metrics) is verified against that
 * real codebase and its live site at al-nours.com, not invented.
 */
export const alNoursData: CaseStudyData = {
  slug: "al-nours",
  projectNumber: "03",
  websiteUrl: "https://al-nours.com",
  websiteLabel: "al-nours.com",
  accent: "#38bdf8",

  // Deliberately modest, verified counts — the story here is connected
  // systems, not commerce scale, so the hero shouldn't read like it is.
  metrics: [
    { value: "2", key: "languages" },
    { value: "4", key: "products" },
    { value: "3", key: "systems" },
  ],

  // Real, verified stack — not translated.
  technicalStack: [
    "React",
    "Vite",
    "TypeScript",
    "Express",
    "PostgreSQL",
    "Drizzle ORM",
    "Odoo",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
    "Wouter",
  ],

  // Real Al Nours brand tokens, verified against the live tailwind.config.ts
  // and index.css design tokens.
  designTokens: [
    { name: "primary", hex: "#0F3D91" },
    { name: "primary hover", hex: "#0C3175" },
    { name: "secondary", hex: "#2FA9C6" },
    { name: "accent", hex: "#F4B740" },
    { name: "ink", hex: "#0F172A" },
  ],

  media: {
    hero: { src: "/case-studies/al-nours/hero.webp", key: "hero" },
    home: { src: "/case-studies/al-nours/home.webp", key: "home" },
    products: { src: "/case-studies/al-nours/products.webp", key: "products" },
    productDetail: { src: "/case-studies/al-nours/product-detail.webp", key: "productDetail" },
    cart: { src: "/case-studies/al-nours/cart.webp", key: "cart" },
    about: { src: "/case-studies/al-nours/about.webp", key: "about" },
    tablet: { src: "/case-studies/al-nours/tablet.webp", key: "tablet" },
    mobile: { src: "/case-studies/al-nours/mobile.webp", key: "mobile" },
  },

  // Fourth case study — "Next Case Study" now chains into Al Baraka.
  nextSlug: "al-baraka",
};
