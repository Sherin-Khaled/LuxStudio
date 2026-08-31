import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { caseStudyContainer, fadeUp } from "./CaseStudySection";
import { getCaseStudy } from "@/lib/caseStudies/registry";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { CaseStudySharedCopy } from "@/lib/i18n/caseStudies/shared";

/**
 * Case-study-specific pair of CTAs ("Visit [site] ↗" / "Next Case Study →"),
 * reusable as-is by any future case study: pass its own `data`/`copy`, and
 * `nextSlug` (or its absence) decides whether the second link points at a
 * registered case study or renders a "coming soon" state.
 */
export const CaseStudyFinalCta = ({ data, copy }: { data: CaseStudyData; copy: CaseStudySharedCopy }): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const next = getCaseStudy(data.nextSlug);

  return (
    <section className={`relative w-full py-16 ${isLight ? "bg-[#F8FBFF]" : "bg-transparent"}`} aria-label="Case study actions">
      <motion.div
        variants={fadeUp}
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={caseStudyContainer}
      >
        <div
          className={`flex flex-col items-stretch gap-4 rounded-[28px] border p-3 sm:flex-row ${
            isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.7)]" : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <a
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-case-study-final-visit"
            className={`group flex flex-1 items-center justify-between gap-3 rounded-[22px] px-7 py-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[19px] font-semibold transition-colors ${
              isLight ? "text-[#0f172a] hover:bg-[rgba(15,23,42,0.04)]" : "text-[#f5f7fa] hover:bg-white/[0.04]"
            }`}
          >
            {copy.finalCta.visitWebsite}
            <ArrowUpRight className={`h-5 w-5 shrink-0 [transition:transform_300ms_ease] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
          </a>

          {next ? (
            <Link
              href={`/work/${next.data.slug}`}
              data-testid="link-case-study-next"
              className={`group flex flex-1 items-center justify-between gap-3 rounded-[22px] px-7 py-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[19px] font-semibold transition-colors ${
                isLight ? "text-[#0f172a] hover:bg-[rgba(15,23,42,0.04)]" : "text-[#f5f7fa] hover:bg-white/[0.04]"
              }`}
            >
              {copy.finalCta.nextCaseStudy}
              <ArrowRight className={`h-5 w-5 shrink-0 rtl:rotate-180 [transition:transform_300ms_ease] group-hover:translate-x-1 rtl:group-hover:-translate-x-1`} aria-hidden="true" />
            </Link>
          ) : (
            <div
              className={`flex flex-1 items-center justify-between gap-3 rounded-[22px] px-7 py-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[19px] font-semibold opacity-50 ${
                isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
              }`}
              aria-disabled="true"
            >
              {copy.finalCta.comingSoon}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
