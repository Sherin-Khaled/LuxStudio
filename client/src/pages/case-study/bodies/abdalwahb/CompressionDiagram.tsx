import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { CaseStudyChipList } from "@/pages/case-study/CaseStudyPrimitives";

/**
 * The one bespoke visual this case study introduces: a plain, three-tier
 * "breadth → structure → outcome" stack (nine real offerings, wrapped down
 * to the seven real routes, resolving in one outcome pill) — a literal,
 * restrained picture of the project's own core story, not a generic
 * architecture diagram. No scroll-pinning, no cycling animation: everything
 * reveals once on scroll-into-view, same as every other section on this
 * page, so it can never become a scroll trap.
 */
export const CompressionDiagram = ({
  offeringsLabel,
  offerings,
  routesLabel,
  routes,
  outcome,
}: {
  offeringsLabel: string;
  offerings: string[];
  routesLabel: string;
  routes: string[];
  outcome: string;
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const tier = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <motion.div
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: reduced ? 0 : 0.12 }}
      className="mx-auto flex max-w-[720px] flex-col items-center gap-5"
    >
      <motion.div variants={tier} className="flex w-full flex-col items-center gap-3">
        <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa50]"}`}>
          {offeringsLabel}
        </p>
        <div className="flex justify-center">
          <CaseStudyChipList items={offerings} />
        </div>
      </motion.div>

      <motion.div variants={tier}>
        <ArrowDown className={`h-4 w-4 ${isLight ? "text-[rgba(15,23,42,0.30)]" : "text-[#f5f7fa40]"}`} aria-hidden="true" />
      </motion.div>

      <motion.div variants={tier} className="flex w-full flex-col items-center gap-3">
        <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase ${isLight ? "text-[#0284c7]" : "text-sky-400"}`}>
          {routesLabel}
        </p>
        <div className="flex justify-center">
          <CaseStudyChipList items={routes} tone="accent" />
        </div>
      </motion.div>

      <motion.div variants={tier}>
        <ArrowDown className={`h-4 w-4 ${isLight ? "text-[rgba(15,23,42,0.30)]" : "text-[#f5f7fa40]"}`} aria-hidden="true" />
      </motion.div>

      <motion.div variants={tier}>
        <span
          className={`inline-flex items-center rounded-full border px-6 py-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[15px] font-semibold ${
            isLight
              ? "border-[rgba(2,132,199,0.35)] bg-[rgba(56,189,248,0.10)] text-[#0284c7] shadow-[0_0_24px_rgba(56,189,248,0.18)]"
              : "border-[#38bdf866] bg-[#38bdf814] text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.20)]"
          }`}
        >
          {outcome}
        </span>
      </motion.div>
    </motion.div>
  );
};
