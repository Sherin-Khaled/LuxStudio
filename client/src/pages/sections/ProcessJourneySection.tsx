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
  const pointRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);

  // Keep a ref to the GSAP context so we can always revert it
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Clean up any previous context first
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    if (animOff) return;

    const points = pointRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots   = dotRefs.current.filter(Boolean)   as HTMLDivElement[];
    const lines  = lineRefs.current.filter(Boolean)  as HTMLDivElement[];

    if (!points.length || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Initial hidden state (GSAP owns these — no conflicting JSX style) ──
      gsap.set(points, { autoAlpha: 0, y: 56, filter: "blur(8px)" });
      gsap.set(dots,  { backgroundColor: "rgba(255,255,255,0.15)", boxShadow: "none" });
      gsap.set(lines, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=440%",
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

        // Reveal point content
        tl.fromTo(
          point,
          { autoAlpha: 0, y: 56, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" }
        );
        // Dot glows cyan + line extends downward in sync
        tl.to(dot,  { backgroundColor: "#38bdf8", boxShadow: "0 0 16px rgba(56,189,248,0.35)", duration: 0.4, ease: "none" }, "<0.2");
        tl.to(line, { scaleY: 1, duration: 0.5, ease: "none" }, "<");

        if (!isLast) {
          // Dim previous point so the next feels active
          tl.to(point, { opacity: 0.70, duration: 0.35, ease: "none" });
          tl.to(dot,   { boxShadow: "none", opacity: 0.45, duration: 0.35, ease: "none" }, "<");
        }
      });

      tl.to({}, { duration: 0.8 }); // brief hold on completed timeline
    }, sectionRef);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
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

      {/* ── Glow orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[18%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(29, 78, 216, 0.18)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[-4%] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ backgroundColor: "rgba(56, 189, 248, 0.10)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] left-[2%] h-[320px] w-[320px] rounded-full blur-[100px]"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.10)" }}
      />

      {/* ── Edge stars ── */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" />

      {/* ── Main layout ── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1360px] flex-col gap-10 px-6 pt-14 pb-10 sm:px-8 md:flex-row md:items-start lg:px-11 lg:pt-16">

        {/* ── Left: editorial heading ── */}
        <header className="flex w-full shrink-0 flex-col items-start md:w-[380px] lg:w-[420px] xl:w-[460px] md:pt-4">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] text-[#f5f7fa61]">
            03 / 06
          </p>
          <h2
            id="journey-heading"
            className="pt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-semibold leading-[0.97] tracking-[-1.4px] text-[#f5f7fa] sm:text-[52px] lg:text-[64px] lg:tracking-[-2px]"
          >
            From idea
            <br />
            to launch.
          </h2>
          <p className="pt-5 max-w-[400px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[23px] tracking-[0] text-[#f5f7faa6] sm:text-[14.5px] sm:leading-[25px]">
            A clear, collaborative process that turns strategy, content, design,
            development, and systems into a complete digital experience.
          </p>
          <p className="pt-4 max-w-[340px] [font-family:'Inter',Helvetica] text-[11.5px] font-normal leading-[18px] tracking-[0] text-[#f5f7fa61]">
            Every stage is reviewed, refined, and approved before moving forward.
          </p>
        </header>

        {/* ── Right: process timeline ── */}
        {/* pt-16/pt-20 pushes the first point down so it is not cropped */}
        <div className="flex min-w-0 flex-1 flex-col pt-4 md:pt-14 lg:pt-20">
          <ol className="flex flex-col gap-[14px] lg:gap-[16px]" aria-label="Project process steps">
            {steps.map((step, i) => (
              <li
                key={step.id}
                ref={(el) => { pointRefs.current[i] = el; }}
                className="flex items-start gap-5 lg:gap-6"
              >
                {/* Per-point marker: dot + short vertical line */}
                <div className="flex shrink-0 flex-col items-center pt-[4px]">
                  {/* Dot — GSAP controls backgroundColor, so no conflicting style here */}
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="rounded-full"
                    style={{ width: "9px", height: "9px", flexShrink: 0 }}
                  />
                  {/* Short line — GSAP controls scaleY, so only non-animated styles here */}
                  <div
                    ref={(el) => { lineRefs.current[i] = el; }}
                    style={{
                      width: "1px",
                      height: "66px",
                      marginTop: "5px",
                      background: "rgba(56,189,248,0.52)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Step text content */}
                <article className="flex min-w-0 flex-1 flex-col items-start pb-1">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-medium leading-[13px] tracking-[1.30px] text-sky-400">
                    {step.id}
                  </p>
                  <h3 className="pt-[5px] [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[25px] tracking-[-0.5px] text-[#f5f7fa] sm:text-[22px] lg:text-[24px] lg:leading-[28px]">
                    {step.title}
                  </h3>
                  <p className="pt-[5px] max-w-[540px] [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[20px] tracking-[0] text-[#f5f7faa6]">
                    {step.description}
                  </p>
                  <p className="pt-[5px] [font-family:'Inter',Helvetica] text-[10px] font-normal leading-[15px] tracking-[0.38px] text-[#f5f7fa61]">
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
