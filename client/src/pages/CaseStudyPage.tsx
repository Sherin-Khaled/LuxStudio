import { lazy, Suspense, type ComponentType } from "react";
import { useParams } from "wouter";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { getCaseStudy } from "@/lib/caseStudies/registry";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import { xDentalCopy } from "@/lib/i18n/caseStudies/xDental";
import NotFound from "@/pages/not-found";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema, buildCreativeWorkSchema } from "@/lib/seo/schema";
import { caseStudyMeta, getCaseStudyBreadcrumb } from "@/lib/seo/caseStudyMeta";
import { notFoundMeta } from "@/lib/seo/pageMeta";

/**
 * Each case study's story is shaped differently (X Dental's is a commerce-
 * scale story with VIP tiers and an admin system; Houd El Nile's is a
 * repositioning/multilingual/export story with none of that) — so instead
 * of forcing every project through one fixed section sequence, each project
 * owns its own "Body" component that composes the *same shared* section
 * primitives (`CaseStudyHero`, `CaseStudySection`, `CaseStudySplitSection`,
 * the diagrams, the gallery, the final CTA) in whatever order its own story
 * needs. Registering a new case study here (plus one line in
 * `lib/caseStudies/registry.ts`) is the only thing a future case study adds.
 *
 * Lazy-loaded per slug — a visitor to `/work/x-dental` only ever renders
 * one of these five, so there's no reason to force the other four's code
 * (each 300-400 lines, several with their own framer-motion sub-components)
 * into that visitor's bundle.
 */
const CASE_STUDY_BODIES: Record<string, ComponentType<{ data: CaseStudyData; copy: any }>> = {
  "x-dental": lazy(() =>
    import("@/pages/case-study/bodies/XDentalCaseStudyBody").then((m) => ({ default: m.XDentalCaseStudyBody })),
  ),
  "houd-el-nile": lazy(() =>
    import("@/pages/case-study/bodies/HoudElNileCaseStudyBody").then((m) => ({ default: m.HoudElNileCaseStudyBody })),
  ),
  "al-nours": lazy(() =>
    import("@/pages/case-study/bodies/AlNoursCaseStudyBody").then((m) => ({ default: m.AlNoursCaseStudyBody })),
  ),
  "al-baraka": lazy(() =>
    import("@/pages/case-study/bodies/AlBarakaCaseStudyBody").then((m) => ({ default: m.AlBarakaCaseStudyBody })),
  ),
  abdalwahb: lazy(() =>
    import("@/pages/case-study/bodies/AbdalwahbCaseStudyBody").then((m) => ({ default: m.AbdalwahbCaseStudyBody })),
  ),
};

export const CaseStudyPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getCaseStudy(slug);
  // Hooks must run unconditionally on every render, so useDict/useSEO/
  // useJSONLD are always called — falling back to any valid dict/metadata
  // when the slug doesn't resolve. Their results are simply unused then.
  const copy = useDict(entry?.copy ?? xDentalCopy);
  useSEO(entry ? caseStudyMeta[entry.data.slug] : notFoundMeta);
  useJSONLD("breadcrumb", entry ? buildBreadcrumbSchema(getCaseStudyBreadcrumb(entry.data.slug)) : undefined);
  useJSONLD(
    "creative-work",
    entry
      ? buildCreativeWorkSchema({
          slug: entry.data.slug,
          name: caseStudyMeta[entry.data.slug]?.name ?? entry.data.slug,
          description: caseStudyMeta[entry.data.slug]?.description ?? "",
        })
      : undefined,
  );
  const { theme } = useTheme();
  const isLight = theme === "light";

  if (!entry) return <NotFound />;

  const Body = CASE_STUDY_BODIES[entry.data.slug] ?? CASE_STUDY_BODIES["x-dental"];

  return (
    <main className="w-full overflow-x-clip" data-testid={`page-case-study-${entry.data.slug}`}>
      {/* `.page-content-layer` (z-index 1) is what's supposed to visually
          cover FooterRevealStage (z-index 0) for as long as content is still
          scrolling — but that stage is `position: sticky; bottom: 0` on the
          page's very LAST element, which for a page this long renders pinned
          to the viewport bottom for nearly the whole scroll, relying
          entirely on THIS layer's own opacity to stay hidden. The page's
          individual sections are mostly transparent (sparse text/whitespace
          over the global cosmic background), so without an opaque backdrop
          here the footer's real content bleeds through every section's
          padding. A solid background on the layer itself (not just on
          individual sections) closes every one of those gaps at once. */}
      <div className={`page-content-layer ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}>
        <Suspense fallback={null}>
          <Body data={entry.data} copy={copy} />
        </Suspense>
      </div>
      <FooterRevealStage />
    </main>
  );
};
