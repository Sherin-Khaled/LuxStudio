import type { SEOInput } from "./useSEO";
import type { BreadcrumbSegment } from "./schema";

/**
 * Per-case-study metadata, one entry per slug in
 * `lib/caseStudies/registry.ts`. Every claim here matches that project's own
 * verified data file (`lib/caseStudies/*.data.ts`) and English copy dict
 * (`lib/i18n/caseStudies/*.ts`) — no invented metrics, integrations, or
 * commercial results. `name` is the plain display name (matches each case
 * study's `hero.title` in `lib/i18n/caseStudies/*.ts`) — used for the
 * BreadcrumbList's last segment and the CreativeWork schema's `name`.
 */
interface CaseStudyMetaEntry extends SEOInput {
  name: string;
}

export const caseStudyMeta: Record<string, CaseStudyMetaEntry> = {
  "x-dental": {
    path: "/work/x-dental",
    title: "X Dental — Dental E-Commerce Case Study | Lux Studio",
    description:
      "How Lux Studio designed and built X Dental, a dental supplies e-commerce platform connecting a 12,942-product catalogue across 607 brands into one simple purchasing experience.",
    name: "X Dental",
  },

  "houd-el-nile": {
    path: "/work/houd-el-nile",
    title: "Houd El Nile — Agricultural Export Case Study | Lux Studio",
    description:
      "How Lux Studio repositioned Houd El Nile from a legacy WordPress site into a multilingual export platform for premium Egyptian agricultural produce.",
    name: "Houd El Nile",
  },

  "al-nours": {
    path: "/work/al-nours",
    title: "Al Nours — Bilingual E-Commerce Case Study | Lux Studio",
    description:
      "How Lux Studio built Al Nours, a bilingual Saudi commerce platform connecting a simple customer journey to PostgreSQL and Odoo operations behind the scenes.",
    name: "Al Nours",
  },

  "al-baraka": {
    path: "/work/al-baraka",
    title: "Al Baraka — Food Export Website Case Study | Lux Studio",
    description:
      "How Lux Studio designed a bilingual export experience for Al Baraka, an Egyptian olive and food export brand, turning a product catalogue into export conversations.",
    name: "Al Baraka",
  },

  abdalwahb: {
    path: "/work/abdalwahb",
    title: "Abdalwahb — Bilingual Accounting Website | Lux Studio",
    description:
      "How Lux Studio structured accounting, tax, advisory, and professional training into one clear bilingual digital authority for a founder-led practice.",
    name: "Abdalwahb",
  },
};

/** BreadcrumbList segments for a case study page: Home > Work > <project name>. */
export function getCaseStudyBreadcrumb(slug: string): BreadcrumbSegment[] {
  const entry = caseStudyMeta[slug];
  if (!entry) return [];
  return [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: entry.name, path: entry.path! },
  ];
}
