import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
};

export type FinalCtaSectionProps = {
  eyebrow?: string;
  heading: ReactNode;
  description: ReactNode;
  primaryLabel?: string;
  secondaryLabel: string;
  secondaryHref: string;
  /** data-testid for the primary "Start a Project" button — kept per-page
      so existing test hooks (button-work-cta-start, etc.) don't change. */
  primaryTestId: string;
  secondaryTestId: string;
};

/**
 * The single final CTA card every page renders immediately before
 * SiteFooterSection. Light mode matches the Contact page's original design
 * (the agreed source of truth): a white/soft-white card with a blue stroke.
 * Dark mode keeps the same dimensions/structure/spacing but stays a dark
 * navy card with a restrained blue border — no light-mode class ever leaks
 * into the dark branch or vice versa, both are fully separate strings below.
 */
export const FinalCtaSection = ({
  eyebrow,
  heading,
  description,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  primaryTestId,
  secondaryTestId,
}: FinalCtaSectionProps) => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { openProjectModal } = useProjectModal();
  const { dir } = useLanguage();
  const t = useDict(commonDict);
  const resolvedPrimaryLabel = primaryLabel ?? t.actions.startAProject;

  return (
    // Background is always set explicitly (never relies on inheriting
    // whatever the page wrapper happens to be) — Home's own <main> hardcodes
    // bg-white unconditionally, so a dark-mode branch that fell through to
    // "no class" here would show a white section behind a dark CTA card.
    <section
      className={`relative w-full overflow-visible px-4 py-24 pb-24 sm:px-6 lg:px-12 ${isLight ? "bg-[#F8FBFF]" : "bg-transparent"}`}
      aria-label="Call to action"
    >
      <motion.div
        variants={fadeUp}
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mx-auto max-w-[900px]"
      >
        <div
          className={`work-cta-orbit-border relative overflow-hidden rounded-[28px] border p-10 backdrop-blur-sm lg:p-14 ${
            isLight
              ? "border-[rgba(56,189,248,0.35)] bg-[rgba(255,255,255,0.92)] shadow-[0_30px_70px_rgba(15,23,42,0.14)]"
              : "border-[rgba(56,189,248,0.20)] bg-[#060e1c] shadow-[0_20px_55px_rgba(0,0,0,0.35)]"
          }`}
        >
          {/* Internal atmospheric blur — same in both themes, stays inside
              the card's own overflow-hidden bounds so it never crops or
              shows a hard rectangular edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ backgroundColor: "rgba(38,100,255,0.12)" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {eyebrow && (
              <p
                className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal tracking-[1.8px] uppercase ${
                  isLight ? "text-[#0284c7]" : "text-[#38bdf880]"
                }`}
              >
                {eyebrow}
              </p>
            )}
            <h2
              className={`max-w-[600px] [font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.08] tracking-[-0.9px] lg:text-[42px] lg:tracking-[-1.3px] ${
                eyebrow ? "mt-5" : ""
              } ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}
            >
              {heading}
            </h2>
            <p
              className={`mt-5 max-w-[480px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${
                isLight ? "text-[#475569]" : "text-[#f5f7faa6]"
              }`}
            >
              {description}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={openProjectModal}
                data-testid={primaryTestId}
                className={`flex items-center justify-center gap-2 rounded-full px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium [transition:opacity_300ms_ease,transform_300ms_cubic-bezier(0.22,1,0.36,1),box-shadow_300ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:hover:translate-y-0 ${
                  isLight
                    ? "border border-[rgba(15,23,42,0.10)] bg-[#0F172A] text-white shadow-[0_4px_16px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,23,42,0.24)]"
                    : "bg-[#f5f7fa] text-[#080b12] hover:opacity-90"
                }`}
              >
                {resolvedPrimaryLabel} <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </button>
              <Link href={secondaryHref}>
                <button
                  type="button"
                  data-testid={secondaryTestId}
                  className={`flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium transition-colors ${
                    isLight
                      ? "border-[rgba(15,23,42,0.14)] bg-[rgba(15,23,42,0.03)] text-[#0F172A] hover:bg-[rgba(15,23,42,0.07)]"
                      : "border-white/[0.14] bg-white/[0.05] text-[#f5f7fa] hover:bg-white/[0.09]"
                  }`}
                >
                  {secondaryLabel}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
