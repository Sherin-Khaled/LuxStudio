import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export const caseStudyContainer = "mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-11";

/**
 * Small eyebrow + heading + body block every narrative section in the case
 * study starts with. Kept generic (no media, no side-by-side layout) so
 * sections that need a bespoke visual (diagrams, galleries, comparison
 * cards) compose it as a heading, then render their own content below —
 * one heading treatment for the whole page instead of N reimplementations.
 */
export const CaseStudyHeading = ({
  eyebrow,
  heading,
  body,
  align = "left",
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.div
      variants={fadeUp}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-start"}`}
    >
      {eyebrow && (
        <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.8px] uppercase ${isLight ? "text-[#0284c7]" : "text-[#38bdf8]"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`max-w-[820px] pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-semibold leading-[1.08] tracking-[-1px] sm:text-[40px] lg:text-[50px] lg:tracking-[-1.4px] ${
          isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
        }`}
      >
        {heading}
      </h2>
      {body && (
        <div className={`max-w-[640px] space-y-4 pt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] sm:text-[16px] sm:leading-[27px] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>
          {body}
        </div>
      )}
    </motion.div>
  );
};

export const CaseStudySection = ({
  id,
  eyebrow,
  heading,
  body,
  align = "left",
  children,
  className = "",
  glow,
}: {
  id?: string;
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  /** Renders a single restrained atmospheric glow behind the section content
      — used sparingly (per spec: ~20% atmosphere, not decoration on every
      section) rather than on every single block. */
  glow?: "blue" | "violet" | "cyan";
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const glowColor =
    glow === "violet"
      ? isLight ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.14)"
      : glow === "cyan"
        ? isLight ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.14)"
        : isLight ? "rgba(29,78,216,0.08)" : "rgba(29,78,216,0.16)";

  return (
    <section id={id} className={`relative w-full py-20 lg:py-28 ${className}`} aria-labelledby={id ? `${id}-heading` : undefined}>
      {glow && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[640px] max-w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
            style={{ background: glowColor }}
          />
        </div>
      )}
      <div className={`relative z-10 ${caseStudyContainer}`}>
        <CaseStudyHeading eyebrow={eyebrow} heading={heading} body={body} align={align} />
        {children && <div className="pt-12 lg:pt-16">{children}</div>}
      </div>
    </section>
  );
};

/**
 * Text column beside a media/visual column (order flips per `mediaSide`) —
 * used by the three sections that pair narrative copy with a real screen
 * (Search & Discovery, Clinic Essentials, VIP & Customer Benefits).
 */
export const CaseStudySplitSection = ({
  id,
  eyebrow,
  heading,
  body,
  media,
  mediaSide = "end",
  children,
  glow,
}: {
  id?: string;
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  media: ReactNode;
  mediaSide?: "start" | "end";
  children?: ReactNode;
  glow?: "blue" | "violet" | "cyan";
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const glowColor =
    glow === "violet"
      ? isLight ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.14)"
      : glow === "cyan"
        ? isLight ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.14)"
        : isLight ? "rgba(29,78,216,0.08)" : "rgba(29,78,216,0.16)";

  return (
    <section id={id} className="relative w-full py-20 lg:py-28" aria-labelledby={id ? `${id}-heading` : undefined}>
      {glow && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
            style={{ background: glowColor }}
          />
        </div>
      )}
      <div className={`relative z-10 ${caseStudyContainer}`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={mediaSide === "start" ? "lg:order-2" : ""}
          >
            <CaseStudyHeading eyebrow={eyebrow} heading={heading} body={body} />
            {children && <div className="pt-8">{children}</div>}
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={mediaSide === "start" ? "lg:order-1" : ""}
          >
            {media}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { fadeUp, fadeIn };
