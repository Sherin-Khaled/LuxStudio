import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { processJourneyDict } from "@/lib/i18n/home/processJourney";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* Same center-band technique already used by the Process page's own
   "DetailedStagesTimeline" — a single IntersectionObserver watches each
   step's marker dot; whichever one sits in a thin band around the vertical
   center becomes "active" as the user scrolls normally past it. No pin, no
   scrubbed timeline — scrolling is just scrolling, this only decides which
   step currently gets the bright/glowing treatment. */
const STEP_STATE_TRANSITION =
  "opacity 700ms cubic-bezier(0.22,1,0.36,1), background-color 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms cubic-bezier(0.22,1,0.36,1), color 700ms cubic-bezier(0.22,1,0.36,1)";

export const ProcessJourneySection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(processJourneyDict);
  const steps = t.steps;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [activeIndex, setActiveIndex] = useState(-1);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Light-mode-only: hovering a step should visually reuse the exact same
  // active-state styling the auto-scroll/IntersectionObserver logic already
  // produces, not a separate hover treatment. `hoveredIndex` never touches
  // `activeIndex` itself (the automatic current-step tracking below is
  // completely untouched) — it only feeds into what each step renders as.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = markerRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    markerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section className={`relative w-full transition-colors ${isLight ? "bg-[#F8FBFF]" : "bg-transparent"}`} aria-labelledby="journey-heading">
      {/* ── Background stars ── */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-4.svg"
      />
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.85)_0%,rgba(248,251,255,0.55)_45%,rgba(248,251,255,0.85)_100%)]"
        />
      )}

      {/* ── Atmospheric glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[15%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: isLight ? "rgba(29, 78, 216, 0.10)" : "rgba(29, 78, 216, 0.18)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[-4%] h-[280px] w-[280px] rounded-full blur-[90px]"
        style={{ backgroundColor: isLight ? "rgba(2, 132, 199, 0.08)" : "rgba(56, 189, 248, 0.09)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] left-[2%] h-[300px] w-[300px] rounded-full blur-[100px]"
        style={{ backgroundColor: isLight ? "rgba(124, 58, 237, 0.07)" : "rgba(124, 58, 237, 0.09)" }}
      />

      {/* ── Edge stars ── */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" variant={isLight ? "light" : "dark"} />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-10 px-6 py-20 sm:px-8 md:flex-row md:items-start lg:px-11 lg:py-28">

        {/* ── Left: editorial heading ── */}
        <motion.header
          variants={fadeUp}
          custom={0}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex w-full shrink-0 flex-col items-start md:w-[360px] lg:w-[400px] xl:w-[440px] md:pt-2"
        >
          <p dir="ltr" className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
            {t.progress}
          </p>
          <h2
            id="journey-heading"
            className={`pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-semibold leading-[0.97] tracking-[-1.4px] sm:text-[48px] lg:text-[60px] lg:tracking-[-1.8px] ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h2>
          <p className={`pt-4 max-w-[380px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] sm:text-[14px] sm:leading-[24px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
            {t.description}
          </p>
          <p className={`pt-3 max-w-[320px] [font-family:'Inter',Helvetica] text-[11px] font-normal leading-[17px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa61]"}`}>
            {t.note}
          </p>
        </motion.header>

        {/* ── Right: process timeline — normal document flow, each step
            reveals as it scrolls into view, and whichever one is nearest
            the viewport's center gets the bright/glowing "active" look. ── */}
        <div className="flex min-w-0 flex-1 flex-col pt-2 md:pt-8 lg:pt-10">
          {/* gap-* used to live on the <ol> itself; it's now reproduced as
              bottom padding on each step's own content column instead (see
              isLast below), so the marker column is free to stretch its
              connecting line through that same vertical space — otherwise
              the rail visibly stopped in the ol's own inter-item gap, which
              no per-row line could ever reach across. */}
          <ol className="flex flex-col" aria-label={t.ariaStepsLabel}>
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const isActive = reduced
                ? i === 0
                : i === activeIndex || (activeIndex === -1 && i === 0);
              // Manual hover overrides the automatic active step (same idea
              // as the Studio Universe badges' auto-cycle/hover relationship):
              // while any step is hovered, only that step shows the "active"
              // look; leaving reverts to whatever the scroll position says is
              // current. Dark mode is untouched — `isVisuallyActive` just
              // equals `isActive` there, so hovering does nothing new.
              const isHoveringAnyStep = hoveredIndex !== null;
              const isVisuallyActive = isLight
                ? i === hoveredIndex || (!isHoveringAnyStep && isActive)
                : isActive;

              return (
                <motion.li
                  key={step.id}
                  variants={fadeUp}
                  custom={Math.min(i * 0.06, 0.3)}
                  initial={reduced ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
                  className="flex items-stretch gap-[18px] lg:gap-5"
                >
                  {/* Per-point marker: dot + connecting line. items-stretch
                      above makes this column as tall as the content column
                      beside it; the line below grows (flex-1) to fill that
                      full height for every row but the last, so it reaches
                      the next row's dot with no gap — the last row keeps its
                      original short trailing cap since there's no next dot
                      to reach. */}
                  <div className="flex shrink-0 flex-col items-center pt-[3px]">
                    <div
                      ref={(el) => { markerRefs.current[i] = el; }}
                      className="rounded-full"
                      style={{
                        width: "8px",
                        height: "8px",
                        flexShrink: 0,
                        backgroundColor: isVisuallyActive
                          ? isLight ? "#0284c7" : "#38bdf8"
                          : isLight ? "rgba(100,116,139,0.35)" : "rgba(56,189,248,0.35)",
                        boxShadow: isVisuallyActive
                          ? isLight ? "0 0 12px rgba(2,132,199,0.35)" : "0 0 12px rgba(56,189,248,0.35)"
                          : "none",
                        transition: STEP_STATE_TRANSITION,
                      }}
                    />
                    <div
                      style={{
                        width: "1px",
                        height: isLast ? "64px" : undefined,
                        flexGrow: isLast ? 0 : 1,
                        flexBasis: isLast ? undefined : "64px",
                        marginTop: "4px",
                        background: isLight ? "rgba(2,132,199,0.45)" : "rgba(56,189,248,0.55)",
                        flexShrink: 0,
                        opacity: isVisuallyActive ? 1 : 0.3,
                        transition: STEP_STATE_TRANSITION,
                      }}
                    />
                  </div>

                  {/* Step text — bottom padding reproduces the ol's old
                      inter-item gap-12/gap-14 (last row keeps none, matching
                      how a flex gap never applies after the final item). */}
                  <article
                    className={`flex min-w-0 flex-1 flex-col items-start ${isLast ? "" : "pb-12 lg:pb-14"}`}
                    style={{ opacity: isVisuallyActive ? 1 : 0.55, transition: STEP_STATE_TRANSITION }}
                  >
                    <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[12px] font-medium leading-[15px] tracking-[1.2px] lg:text-[13px] lg:leading-[16px] ${isLight ? "text-[#0284c7]" : "text-sky-400"}`}>
                      {step.id}
                    </p>
                    <h3
                      className="pt-[4px] [font-family:'Bricolage_Grotesque',Helvetica] text-[21px] font-semibold leading-[26px] tracking-[-0.5px] lg:text-[27px] lg:leading-[33px] lg:tracking-[-0.6px]"
                      style={{
                        color: isLight
                          ? isVisuallyActive ? "#0f172a" : "rgba(15,23,42,0.72)"
                          : isVisuallyActive ? "#f5f7fa" : "#f5f7fac2",
                        transition: STEP_STATE_TRANSITION,
                      }}
                    >
                      {step.title}
                    </h3>
                    {/* Root cause of Issue 3: these two colors were static —
                        no active/inactive branch at all, unlike the title
                        above. The article's overall opacity already reaches
                        1 when active, but 1 × a permanently-faded 0.65/0.50
                        alpha color still reads as faded. Active now gets its
                        own clearer color; inactive keeps the original dim
                        value. */}
                    <p
                      className="pt-[5px] max-w-[560px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] tracking-[0] lg:text-[17px] lg:leading-[27px]"
                      style={{
                        color: isLight
                          ? isVisuallyActive ? "rgba(51,65,85,0.88)" : "rgba(15,23,42,0.65)"
                          : "#f5f7faa6",
                        transition: STEP_STATE_TRANSITION,
                      }}
                    >
                      {step.description}
                    </p>
                    <p
                      className="pt-[5px] [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[17px] tracking-[0.38px] lg:text-[14px] lg:leading-[20px]"
                      style={{
                        color: isLight
                          ? isVisuallyActive ? "rgba(71,85,105,0.78)" : "rgba(15,23,42,0.50)"
                          : "#f5f7fa61",
                        transition: STEP_STATE_TRANSITION,
                      }}
                    >
                      {step.tags}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
