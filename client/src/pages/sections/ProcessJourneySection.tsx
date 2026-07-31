import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";

const steps = [
  {
    id: "01",
    title: "Discover",
    description:
      "We understand the business, audience, goals, challenges, existing digital presence, and what the project needs to achieve.",
    tags: "Research · Goals · Audience",
  },
  {
    id: "02",
    title: "Define",
    description:
      "We shape the strategy, project scope, content direction, sitemap, features, user journey, and approval milestones.",
    tags: "Strategy · Structure · Scope",
  },
  {
    id: "03",
    title: "Create",
    description:
      "We produce and refine the creative assets the project needs, including graphic design, image editing, photography, video editing, and visual content direction.",
    tags: "Graphics · Photography · Video · Content",
  },
  {
    id: "04",
    title: "Design",
    description:
      "We create wireframes, visual direction, UI systems, responsive layouts, and interactive prototypes ready for development.",
    tags: "UX · UI · Design System",
  },
  {
    id: "05",
    title: "Build & Connect",
    description:
      "We develop the frontend, connect backend systems, integrate dashboards, CMS platforms, APIs, databases, and business tools when needed.",
    tags: "Frontend · Backend · CMS · Dashboards",
  },
  {
    id: "06",
    title: "Optimize, Launch & Support",
    description:
      "We test responsiveness, performance, accessibility, SEO, and launch readiness, then support future updates and improvements after launch.",
    tags: "SEO · Performance · Testing · Support",
  },
];

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
const STEP_TRIGGER_ROOT_MARGIN = "-45% 0px -45% 0px";
const STEP_STATE_TRANSITION =
  "opacity 700ms cubic-bezier(0.22,1,0.36,1), background-color 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms cubic-bezier(0.22,1,0.36,1), color 700ms cubic-bezier(0.22,1,0.36,1)";

export const ProcessJourneySection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";

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
      { root: null, rootMargin: STEP_TRIGGER_ROOT_MARGIN, threshold: 0 },
    );
    markerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section className={`relative w-full transition-colors ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`} aria-labelledby="journey-heading">
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
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
            03 / 06
          </p>
          <h2
            id="journey-heading"
            className={`pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-semibold leading-[0.97] tracking-[-1.4px] sm:text-[48px] lg:text-[60px] lg:tracking-[-1.8px] ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            From idea
            <br />
            to launch.
          </h2>
          <p className={`pt-4 max-w-[380px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] sm:text-[14px] sm:leading-[24px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
            A clear, collaborative process that turns strategy, content, design,
            development, and systems into a complete digital experience.
          </p>
          <p className={`pt-3 max-w-[320px] [font-family:'Inter',Helvetica] text-[11px] font-normal leading-[17px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa61]"}`}>
            Every stage is reviewed, refined, and approved before moving forward.
          </p>
        </motion.header>

        {/* ── Right: process timeline — normal document flow, each step
            reveals as it scrolls into view, and whichever one is nearest
            the viewport's center gets the bright/glowing "active" look. ── */}
        <div className="flex min-w-0 flex-1 flex-col pt-2 md:pt-8 lg:pt-10">
          <ol className="flex flex-col gap-12 lg:gap-14" aria-label="Project process steps">
            {steps.map((step, i) => {
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
                  className="flex items-start gap-[18px] lg:gap-5"
                >
                  {/* Per-point marker: dot + short line */}
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
                        height: "64px",
                        marginTop: "4px",
                        background: isLight ? "rgba(2,132,199,0.45)" : "rgba(56,189,248,0.55)",
                        flexShrink: 0,
                        opacity: isVisuallyActive ? 1 : 0.3,
                        transition: STEP_STATE_TRANSITION,
                      }}
                    />
                  </div>

                  {/* Step text */}
                  <article
                    className="flex min-w-0 flex-1 flex-col items-start"
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
