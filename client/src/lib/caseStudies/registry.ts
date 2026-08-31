import type { Dict } from "@/lib/i18n/useDict";
import type { CaseStudyData } from "./types";
import { xDentalData } from "./xDental.data";
import { xDentalCopy } from "@/lib/i18n/caseStudies/xDental";
import { houdElNileData } from "./houdElNile.data";
import { houdElNileCopy } from "@/lib/i18n/caseStudies/houdElNile";
import { alNoursData } from "./alNours.data";
import { alNoursCopy } from "@/lib/i18n/caseStudies/alNours";
import { alBarakaData } from "./alBaraka.data";
import { alBarakaCopy } from "@/lib/i18n/caseStudies/alBaraka";
import { abdalwahbData } from "./abdalwahb.data";
import { abdalwahbCopy } from "@/lib/i18n/caseStudies/abdalwahb";

/** `copy` is intentionally untyped beyond `Dict<any>` here — every project's
    copy dict has its own shape (X Dental's commerce-scale sections, Houd El
    Nile's repositioning/export sections, ...); the one thing every shape is
    still required to satisfy is `CaseStudySharedCopy` (`hero`/`finalCta`/
    `common`), enforced where those fields are actually read — the shared
    `CaseStudyHero`/`CaseStudyFinalCta` components — not at this registry. */
export interface CaseStudyEntry {
  data: CaseStudyData;
  copy: Dict<any>;
}

/**
 * Single lookup table every future case study registers itself in. The
 * route (`/work/:slug` in App.tsx) is entirely generic; `CaseStudyPage` maps
 * `data.slug` to that project's own "Body" component (see
 * `pages/CaseStudyPage.tsx`). Adding a third case study is "write its
 * `*.data.ts` + `*.ts` copy dict + a `*CaseStudyBody.tsx`, add one line in
 * each of those two files" — no other page/route changes.
 */
export const caseStudyRegistry: Record<string, CaseStudyEntry> = {
  "x-dental": { data: xDentalData, copy: xDentalCopy },
  "houd-el-nile": { data: houdElNileData, copy: houdElNileCopy },
  "al-nours": { data: alNoursData, copy: alNoursCopy },
  "al-baraka": { data: alBarakaData, copy: alBarakaCopy },
  "abdalwahb": { data: abdalwahbData, copy: abdalwahbCopy },
};

export function getCaseStudy(slug: string | undefined): CaseStudyEntry | undefined {
  if (!slug) return undefined;
  return caseStudyRegistry[slug];
}
