import type { CaseStudyData } from "./types";

/**
 * Non-text data for the X Dental case study. Real screenshots (cropped from
 * the actual production design/build) live in
 * `client/public/case-studies/x-dental/` — see `media` below. Every fact
 * here (metrics, design tokens, stack) is verified against the real X Dental
 * codebase, not invented — see the research this case study was built from.
 */
export const xDentalData: CaseStudyData = {
  slug: "x-dental",
  projectNumber: "01",
  websiteUrl: "https://dentora-x.com",
  websiteLabel: "dentora-x.com",
  accent: "#38bdf8",

  metrics: [
    { value: "12,942", key: "products" },
    { value: "607", key: "brands" },
    { value: "218", key: "categories" },
  ],

  // Proper nouns / real verified stack — not translated.
  technicalStack: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Radix UI",
    "Express",
    "Prisma",
    "PostgreSQL",
  ],

  // Real X Dental brand tokens, verified against the live Tailwind v4 theme.
  designTokens: [
    { name: "gold", hex: "#D4A72C" },
    { name: "cream", hex: "#F8F7F2" },
    { name: "black", hex: "#050505" },
    { name: "muted", hex: "#6A6A6A" },
    { name: "blue", hex: "#EAF4FF" },
  ],

  systemNodes: [
    { key: "catalogueScale", icon: "LayoutGrid" },
    { key: "specialty", icon: "Stethoscope" },
    { key: "location", icon: "MapPin" },
    { key: "operations", icon: "ShieldCheck" },
  ],

  media: {
    hero: { videoSrc: "/audio/HeroDental.mp4", key: "hero" },
    home: { src: "/case-studies/x-dental/home.webp", key: "home" },
    discovery: { src: "/case-studies/x-dental/discovery.webp", key: "discovery" },
    productDetail: { src: "/case-studies/x-dental/product-detail.webp", key: "productDetail" },
    cart: { src: "/case-studies/x-dental/cart.webp", key: "cart" },
    checkout: { src: "/case-studies/x-dental/checkout.webp", key: "checkout" },
    clinicLocations: { src: "/case-studies/x-dental/clinic-locations.webp", key: "clinicLocations" },
    walletLoyalty: { src: "/case-studies/x-dental/wallet-loyalty.webp", key: "walletLoyalty" },
    quotes: { src: "/case-studies/x-dental/quotes.webp", key: "quotes" },
    account: { src: "/case-studies/x-dental/account.webp", key: "account" },
    support: { src: "/case-studies/x-dental/support.webp", key: "support" },
  },

  // Chains to the next published case study in registry order (see
  // registry.ts) — "Next Case Study" now links forward instead of showing
  // a stale coming-soon state.
  nextSlug: "houd-el-nile",
};
