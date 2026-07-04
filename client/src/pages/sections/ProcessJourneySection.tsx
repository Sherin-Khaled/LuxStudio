import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SideStars } from "@/components/backgrounds/SideStars";

gsap.registerPlugin(ScrollTrigger);

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

export const ProcessJourneySection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const animOff = reduced || isMobile;

  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLOListElement>(null);
  const pointRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  // Store the timeline so cleanup kills it without ctx.revert() DOM conflicts
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Clean up any previous timeline + ScrollTrigger without reverting DOM
    if (tlRef.current) {
      tlRef.current.scrollTrigger?.kill();
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (animOff) return;

    const points = pointRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots   = dotRefs.current.filter(Boolean)   as HTMLDivElement[];
    const lines  = lineRefs.current.filter(Boolean)  as HTMLDivElement[];
    const list   = listRef.current;
    if (!points.length || !sectionRef.current) return;

    // ── Initial hidden states — GSAP owns these exclusively ──
    gsap.set(points, { autoAlpha: 0, y: 50, filter: "blur(8px)" });
    gsap.set(dots,   { backgroundColor: "rgba(56,189,248,0.25)", boxShadow: "none" });
    gsap.set(lines,  { scaleY: 0, transformOrigin: "top center" });
    if (list) gsap.set(list, { y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    points.forEach((point, i) => {
      const dot  = dots[i];
      const line = lines[i];
      const isLast = i === points.length - 1;

      // Reveal point — active / bright state
      tl.fromTo(
        point,
        { autoAlpha: 0, y: 50, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "none" }
      );
      tl.to(dot,  { backgroundColor: "#38bdf8", boxShadow: "0 0 12px rgba(56,189,248,0.28)", duration: 0.35, ease: "none" }, "<0.15");
      tl.to(line, { scaleY: 1, duration: 0.45, ease: "none" }, "<");

      if (!isLast) {
        // Brief hold at full brightness so user clearly sees the active state
        tl.to({}, { duration: 0.3 });
        // Dim to "previous / revealed" — 50% opacity for clear contrast with active
        tl.to(point, { opacity: 0.50, duration: 0.4, ease: "none" });
        tl.to(dot,   { backgroundColor: "rgba(56,189,248,0.45)", boxShadow: "none", opacity: 0.55, duration: 0.4, ease: "none" }, "<");
        tl.to(line,  { opacity: 0.30, duration: 0.4, ease: "none" }, "<");

        // After point 03 dims, start scrolling list upward so 04/05/06 stay visible
        if (i === 2 && list) {
          tl.to(list, { y: -65, duration: 0.6, ease: "none" });
        }
        // After point 04 dims, scroll list up further so 05 and 06 are fully unclipped
        if (i === 3 && list) {
          tl.to(list, { y: -140, duration: 0.7, ease: "none" });
        }
      }
    });

    // Brief hold so the user sees the completed timeline before unpin
    tl.to({}, { duration: 0.8 });

    tlRef.current = tl;

    return () => {
      // Kill ScrollTrigger and timeline without reverting DOM to avoid React conflicts
      tl.scrollTrigger?.kill();
      tl.kill();
      tlRef.current = null;
    };
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="journey-heading"
    >
      {/* ── Background stars ── */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-4.svg"
      />

      {/* ── Atmospheric glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[15%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(29, 78, 216, 0.18)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[-4%] h-[280px] w-[280px] rounded-full blur-[90px]"
        style={{ backgroundColor: "rgba(56, 189, 248, 0.09)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] left-[2%] h-[300px] w-[300px] rounded-full blur-[100px]"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.09)" }}
      />

      {/* ── Edge stars ── */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1360px] flex-col gap-8 px-6 pt-12 pb-8 sm:px-8 md:flex-row md:items-start lg:px-11 lg:pt-14">

        {/* ── Left: editorial heading ── */}
        <header className="flex w-full shrink-0 flex-col items-start md:w-[360px] lg:w-[400px] xl:w-[440px] md:pt-2">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] text-[#f5f7fa61]">
            03 / 06
          </p>
          <h2
            id="journey-heading"
            className="pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-semibold leading-[0.97] tracking-[-1.4px] text-[#f5f7fa] sm:text-[48px] lg:text-[60px] lg:tracking-[-1.8px]"
          >
            From idea
            <br />
            to launch.
          </h2>
          <p className="pt-4 max-w-[380px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] text-[#f5f7faa6] sm:text-[14px] sm:leading-[24px]">
            A clear, collaborative process that turns strategy, content, design,
            development, and systems into a complete digital experience.
          </p>
          <p className="pt-3 max-w-[320px] [font-family:'Inter',Helvetica] text-[11px] font-normal leading-[17px] tracking-[0] text-[#f5f7fa61]">
            Every stage is reviewed, refined, and approved before moving forward.
          </p>
        </header>

        {/* ── Right: process timeline ──
            overflow-visible so GSAP's upward list translation doesn't get clipped. ── */}
        <div className="flex min-w-0 flex-1 flex-col overflow-visible pt-2 md:pt-8 lg:pt-10">
          <ol
            ref={listRef}
            className="flex flex-col gap-[9px] lg:gap-[11px]"
            aria-label="Project process steps"
          >
            {steps.map((step, i) => (
              <li
                key={step.id}
                ref={(el) => { pointRefs.current[i] = el; }}
                className="flex items-start gap-[18px] lg:gap-5"
              >
                {/* Per-point marker: dot + short line (no continuous vertical bar) */}
                <div className="flex shrink-0 flex-col items-center pt-[3px]">
                  {/* Dot — GSAP controls bg/shadow/opacity only */}
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="rounded-full"
                    style={{ width: "8px", height: "8px", flexShrink: 0 }}
                  />
                  {/* Short per-point line — GSAP controls scaleY/opacity only */}
                  <div
                    ref={(el) => { lineRefs.current[i] = el; }}
                    style={{
                      width: "1px",
                      height: "52px",
                      marginTop: "4px",
                      background: "rgba(56,189,248,0.55)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Step text */}
                <article className="flex min-w-0 flex-1 flex-col items-start">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-medium leading-[12px] tracking-[1.2px] text-sky-400">
                    {step.id}
                  </p>
                  <h3 className="pt-[4px] [font-family:'Bricolage_Grotesque',Helvetica] text-[18px] font-semibold leading-[23px] tracking-[-0.45px] text-[#f5f7fa] lg:text-[20px] lg:leading-[25px]">
                    {step.title}
                  </h3>
                  <p className="pt-[4px] max-w-[540px] [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[19px] tracking-[0] text-[#f5f7faa6]">
                    {step.description}
                  </p>
                  <p className="pt-[4px] [font-family:'Inter',Helvetica] text-[10px] font-normal leading-[14px] tracking-[0.38px] text-[#f5f7fa61]">
                    {step.tags}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
