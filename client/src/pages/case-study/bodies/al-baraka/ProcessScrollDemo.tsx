import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Factory, Package, Ship, Sprout } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const STAGE_ICONS = [Sprout, Factory, Package, Ship];
const AUTO_ADVANCE_MS = 3800;

export interface ProcessStage {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
}

/**
 * A project-specific, self-contained recreation of the real Al Baraka site's
 * scroll-pinned production/export timeline (`ScrollProcessTimeline.tsx` in
 * the source codebase — rAF-driven scroll progress, `position: fixed`
 * pinning, a filling progress rail, Framer Motion cross-fades, reused across
 * About and Export). That component pins to the *whole page's* scroll,
 * which isn't safe to reproduce inside this case study — this page already
 * has its own fragile sticky-footer scroll mechanics (see the z-index note
 * in `CaseStudyPage.tsx`) that a second position:fixed scroll-jacking
 * element would fight with. Instead this recreation contains the exact same
 * "one stage, pinned, one focus, filling progress rail, cross-fading
 * copy/media" idea entirely inside its own bounded panel — advanced by
 * clicking a stage, the arrows, or (when the panel is in view and the
 * visitor hasn't touched it) a slow auto-advance — rather than by hijacking
 * the page's own scrollbar.
 */
export const ProcessScrollDemo = ({
  stages,
  stepLabel,
  caveat,
}: {
  stages: ProcessStage[];
  stepLabel: string;
  caveat?: string;
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || interacted || !inView) return;
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % stages.length), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduced, interacted, inView, stages.length]);

  const goTo = (index: number) => {
    setInteracted(true);
    setActive((index + stages.length) % stages.length);
  };

  const Icon = STAGE_ICONS[active % STAGE_ICONS.length];

  return (
    <div ref={panelRef} className="flex flex-col gap-5">
      <div
        className={`relative h-[420px] w-full overflow-hidden rounded-[28px] border sm:h-[480px] ${
          isLight ? "border-[rgba(15,23,42,0.08)] shadow-[0_20px_60px_rgba(15,23,42,0.10)]" : "border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={stages[active].image}
            src={stages[active].image}
            alt={stages[active].title}
            loading="lazy"
            decoding="async"
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Olive-toned scrim so copy stays legible over any production photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,26,10,0.15) 0%, rgba(12,20,8,0.55) 65%, rgba(9,14,4,0.82) 100%)" }}
        />

        {/* Progress rail */}
        <div className="absolute inset-x-6 top-6 flex gap-2 sm:inset-x-8 sm:top-8">
          {stages.map((stage, i) => (
            <button
              key={stage.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${stepLabel} ${i + 1}: ${stage.title}`}
              aria-current={i === active ? "step" : undefined}
              className="group relative h-1 flex-1 overflow-hidden rounded-full bg-white/25"
            >
              <span
                className="absolute inset-y-0 start-0 rounded-full bg-[#a3e635] [transition:width_300ms_ease]"
                style={{ width: i < active ? "100%" : i === active ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>

        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={stages[active].title}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[420px]"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#a3e63566] bg-[#a3e63522] text-[#c8f584]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.4px] text-[#c8f584] uppercase">
                  {stages[active].eyebrow}
                </p>
              </div>
              <h4 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[24px] font-semibold leading-[1.15] text-white sm:text-[28px]">
                {stages[active].title}
              </h4>
              <p className="mt-2 [font-family:'Inter',Helvetica] text-[13.5px] leading-[21px] text-white/80">{stages[active].desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous stage"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {isRTL ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronLeft className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next stage"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {isRTL ? <ChevronLeft className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {stages.map((stage, i) => (
            <button
              key={stage.title}
              type="button"
              onClick={() => goTo(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[12px] font-medium transition-colors ${
                i === active
                  ? "border-[#a3e63580] bg-[#a3e63514] text-[#4F6027] dark:text-[#c8f584]"
                  : isLight
                    ? "border-[rgba(15,23,42,0.10)] text-[rgba(15,23,42,0.55)] hover:border-[rgba(15,23,42,0.20)]"
                    : "border-white/10 text-[#f5f7fa70] hover:border-white/20"
              }`}
            >
              <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10px]">{String(i + 1).padStart(2, "0")}</span>
              {stage.title}
            </button>
          ))}
        </div>
      </div>

      {caveat && <p className={`text-[12.5px] italic ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa60]"}`}>{caveat}</p>}
    </div>
  );
};
