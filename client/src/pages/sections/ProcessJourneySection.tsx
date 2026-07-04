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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const animOff = reduced || isMobile;

  const sectionRef = useRef<HTMLElement>(null);
  const pointRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);

  useEffect(() => {
    if (animOff) return;

    const points = pointRefs.current.filter(Boolean) as HTMLDivElement[];
    const dots   = dotRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // All points start invisible
      gsap.set(points, { autoAlpha: 0, y: 56, filter: "blur(8px)" });
      // All dots start muted
      gsap.set(dots, { backgroundColor: "rgba(255,255,255,0.12)" });

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
        const dot = dots[i];
        const isLast = i === points.length - 1;

        // Reveal point from below with blur
        tl.fromTo(
          point,
          { autoAlpha: 0, y: 56, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" }
        );
        // Dot lights up cyan in sync with reveal
        tl.to(dot, { backgroundColor: "#38bdf8", duration: 0.4, ease: "none" }, "<0.2");

        if (!isLast) {
          // Dim the revealed point so the next one feels "active"
          tl.to(point, { opacity: 0.72, duration: 0.35, ease: "none" });
          tl.to(dot,   { opacity: 0.40, duration: 0.35, ease: "none" }, "<");
        }
      });

      // Brief hold so user sees the completed timeline
      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="journey-heading"
    >
      {/* ── Background image ── */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-4.svg"
      />

      {/* ── Glow orbs (direct section children so pin-spacer overflow:visible can show them) ── */}
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
      <SideStars starsPerSide={isMobile ? 6 : 12} className="z-[1]" />

      {/* ── Main layout ── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1360px] items-start gap-10 px-6 py-14 sm:px-8 lg:items-center lg:px-11 lg:py-20">

        {/* ── Left: editorial fixed text ── */}
        <header className="flex w-full shrink-0 flex-col items-start lg:w-[420px] xl:w-[460px]">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] text-[#f5f7fa61]">
            03 / 06
          </p>
          <h2
            id="journey-heading"
            className="pt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[42px] font-semibold leading-[0.97] tracking-[-1.6px] text-[#f5f7fa] sm:text-[54px] lg:text-[66px] lg:tracking-[-2px]"
          >
            From idea
            <br />
            to launch.
          </h2>
          <p className="pt-5 max-w-[420px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[24px] tracking-[0] text-[#f5f7faa6] sm:text-[15px] sm:leading-[26px]">
            A clear, collaborative process that turns strategy, content, design,
            development, and systems into a complete digital experience.
          </p>
          <p className="pt-4 max-w-[360px] [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[19px] tracking-[0] text-[#f5f7fa61]">
            Every stage is reviewed, refined, and approved before moving forward.
          </p>
        </header>

        {/* ── Right: vertical timeline ── */}
        <div className="relative flex min-w-0 flex-1 flex-col">

          {/* Thin continuous vertical timeline line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[7px] top-[22px] w-px"
            style={{
              bottom: "22px",
              background:
                "linear-gradient(180deg,rgba(56,189,248,0.35) 0%,rgba(255,255,255,0.08) 100%)",
            }}
          />

          <ol className="flex flex-col" aria-label="Project process steps">
            {steps.map((step, i) => (
              <li
                key={step.id}
                ref={(el) => { pointRefs.current[i] = el; }}
                className={[
                  "flex items-start gap-5",
                  i < steps.length - 1 ? "pb-[18px] lg:pb-5" : "",
                  animOff ? "" : "",
                ].join(" ")}
              >
                {/* Timeline dot */}
                <div className="relative flex shrink-0 flex-col items-center pt-[5px]">
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="h-[10px] w-[10px] rounded-full"
                    style={{
                      backgroundColor: animOff ? "#38bdf8" : "rgba(255,255,255,0.12)",
                      boxShadow: animOff ? "0 0 0 3px rgba(56,189,248,0.18)" : "none",
                    }}
                  />
                </div>

                {/* Step content */}
                <article className="flex min-w-0 flex-1 flex-col items-start">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium leading-[13px] tracking-[1.30px] text-sky-400">
                    {step.id}
                  </p>
                  <h3 className="pt-[7px] [font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium leading-[26px] tracking-[-0.55px] text-[#f5f7fa] lg:text-[26px] lg:leading-[30px]">
                    {step.title}
                  </h3>
                  <p className="pt-[6px] max-w-[560px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[21px] tracking-[0] text-[#f5f7faa6]">
                    {step.description}
                  </p>
                  <p className="pt-[6px] [font-family:'Inter',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[0.40px] text-[#f5f7fa61]">
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
