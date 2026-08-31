/**
 * The subset of a case study's copy that the *shared, reusable* section
 * components (`CaseStudyHero`, `CaseStudyFinalCta`) actually read. Every
 * project's own copy dict (`xDental.ts`, `houdElNile.ts`, ...) has its own
 * much larger shape for its own project-specific sections, but as long as it
 * structurally includes `hero` / `finalCta` / `common` in this shape, it can
 * be passed into the shared components unchanged — that's what lets two case
 * studies with completely different section layouts still share the same
 * hero and final-CTA components instead of each reimplementing them.
 */
export interface CaseStudySharedCopy {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    headlineLine1: string;
    headlineLine2: string;
    supporting: string;
    metricLabels: Record<string, string>;
    services: string[];
    visitLiveWebsite: string;
    scrollHint: string;
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    description: string;
    visitWebsite: string;
    nextCaseStudy: string;
    comingSoon: string;
  };
  common: {
    openInNewTab: (label: string) => string;
    pendingScreen: string;
    backToWork: string;
  };
}
