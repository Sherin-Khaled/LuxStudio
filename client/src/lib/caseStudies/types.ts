/**
 * Shared shape for every case study's non-text data (numbers, colors, media
 * paths, proper nouns). Mirrors the existing `projectMeta`/`workPageDict`
 * split used on the Work page: language-independent facts live here,
 * localized copy lives in a matching `client/src/lib/i18n/caseStudies/*`
 * dictionary keyed by the same `slug`.
 *
 * Adding a future case study (Houd El Nile, Al Nours, Al Baraka) means
 * creating one more `CaseStudyData` object + one more copy dictionary and
 * registering both in `registry.ts` — no page/section component changes.
 */
export interface CaseStudyMetric {
  /** Plain, language-independent numeral string, e.g. "12,942". */
  value: string;
  /** Key used to look up the localized label in the case study's dict. */
  key: string;
}

export interface CaseStudyMedia {
  /** Root-relative static path, e.g. "/case-studies/x-dental/home.webp". */
  src?: string;
  /** Root-relative video path, used instead of `src` when set. */
  videoSrc?: string;
  /** Key used to look up the localized caption/alt text in the dict. */
  key: string;
}

export interface CaseStudySystemNode {
  key: string;
  /** lucide-react icon name resolved by the diagram component. */
  icon: string;
}

export interface CaseStudyDesignToken {
  name: string;
  hex: string;
}

export interface CaseStudyData {
  slug: string;
  projectNumber: string;
  websiteUrl: string;
  websiteLabel: string;
  accent: string;
  metrics: CaseStudyMetric[];
  technicalStack: string[];
  designTokens: CaseStudyDesignToken[];
  /** Only used by `ChallengeNodes` (X Dental's 4-icon "core challenge"
      diagram) — optional because not every project's story is shaped that
      way; Houd El Nile, for instance, has no equivalent section. */
  systemNodes?: CaseStudySystemNode[];
  media: Record<string, CaseStudyMedia>;
  /** Slug of the case study to link to from "Next Case Study" — undefined
      only for whichever case study is currently the last one published. */
  nextSlug?: string;
}
