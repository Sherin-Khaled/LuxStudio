import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SideStars } from "@/components/backgrounds/SideStars";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Data ─────────────────────────── */
const projects = [
  {
    label: "P.01",
    name: "Houd El Nile",
    subtitle: "Agriculture export company",
    description:
      "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
    tags: ["Website Redesign", "Next.js", "Photography", "7 Languages", "SEO & Performance"],
    domain: "houdelnile.com",
    headerBg: "#16532d",
    bodyBg: "#f0ece4",
    accent: "#1e7a42",
    navLines: ["#4ade80", "#4ade80", "#4ade80"],
  },
  {
    label: "P.02",
    name: "X Dental",
    subtitle: "Dental supplies e-commerce platform",
    description:
      "We designed and built X Dental as a complete e-commerce platform for doctors and clinics. The project included UI/UX design, product flows, cart and checkout, frontend and backend development, and product image editing.",
    tags: ["E-commerce", "UI/UX Design", "Frontend", "Backend", "Photoshop"],
    domain: "xdental.com",
    headerBg: "#0c0c0f",
    bodyBg: "#f5f5f5",
    accent: "#b8943f",
    navLines: ["#b8943f", "#b8943f", "#b8943f"],
  },
  {
    label: "P.03",
    name: "Al Nours",
    subtitle: "Saudi beverage distribution e-commerce",
    description:
      "We created a complete online shopping platform for Al Nours, a Saudi company with distribution rights for Domty juices. The project included logo creation, brand color direction, full-stack development, and deployment.",
    tags: ["E-commerce", "Frontend", "Backend", "Logo Design", "Brand Direction"],
    domain: "alnours.sa",
    headerBg: "#0f2d6b",
    bodyBg: "#f0f5ff",
    accent: "#2563eb",
    navLines: ["#60a5fa", "#60a5fa", "#60a5fa"],
  },
  {
    label: "P.04",
    name: "Al Baraka Olives",
    subtitle: "Olive export company",
    description:
      "We transformed Al Baraka Olives from an outdated website into a cleaner, more premium export-brand experience through full visual redesign, frontend development, photography direction, and cPanel deployment.",
    tags: ["Website Redesign", "Frontend", "Export Brand", "Photography", "cPanel Deployment"],
    domain: "albarakaolives.com",
    headerBg: "#364a18",
    bodyBg: "#f3f0e6",
    accent: "#6b8c2a",
    navLines: ["#a3c456", "#a3c456", "#a3c456"],
  },
];

/*
  Stack visual positions indexed by relative position to the active card.
  y=0/42/84/126: stacked cards offset downward so their bottom strip peeks
  below the active card into the 160px peek spacer below the stack container.
  transformOrigin "top center" keeps the top edge anchored while scale shrinks downward.
*/
const STACK = [
  { y: 0,   scale: 1,     opacity: 1,    zIndex: 40 },
  { y: 42,  scale: 0.985, opacity: 0.65, zIndex: 30 },
  { y: 84,  scale: 0.97,  opacity: 0.42, zIndex: 20 },
  { y: 126, scale: 0.955, opacity: 0.25, zIndex: 10 },
];

/* ─────────────────────── Browser mockup ─────────────────────── */
const BrowserMockup = ({
  domain, headerBg, bodyBg, accent, navLines,
}: {
  domain: string; headerBg: string; bodyBg: string; accent: string; navLines: string[];
}) => (
  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_64px_rgba(0,0,0,0.65)]">
    {/* Chrome bar */}
    <div className="flex items-center gap-2.5 border-b border-white/10 bg-[#111111] px-4 py-3">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] opacity-80" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbc2e] opacity-80" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840] opacity-80" />
      </div>
      <div className="flex h-5 flex-1 items-center rounded bg-white/10 px-3">
        <span className="font-mono text-[10px] leading-none text-white/45">{domain}</span>
      </div>
    </div>
    {/* Page content */}
    <div style={{ backgroundColor: bodyBg }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: headerBg }}>
        <div className="h-2.5 w-24 rounded-full opacity-75" style={{ backgroundColor: navLines[0] }} />
        <div className="flex gap-4">
          {navLines.map((c, i) => (
            <div key={i} className="h-1.5 w-12 rounded-full opacity-50" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-6 w-16 rounded-md" style={{ backgroundColor: accent }} />
      </div>
      {/* Hero */}
      <div className="px-6 py-6">
        <div className="mb-1.5 h-2 w-16 rounded-full opacity-25" style={{ backgroundColor: headerBg }} />
        <div className="mb-3 h-5 w-3/4 rounded-full opacity-35" style={{ backgroundColor: headerBg }} />
        <div className="mb-1 h-2.5 w-2/3 rounded-full opacity-20" style={{ backgroundColor: headerBg }} />
        <div className="mb-1 h-2.5 w-1/2 rounded-full opacity-15" style={{ backgroundColor: headerBg }} />
        <div className="mt-5 flex gap-3">
          <div className="h-8 w-24 rounded-lg opacity-90" style={{ backgroundColor: headerBg }} />
          <div className="h-8 w-24 rounded-lg border-2 opacity-35" style={{ borderColor: headerBg }} />
        </div>
      </div>
      {/* Divider */}
      <div className="mx-6 border-t opacity-10" style={{ borderColor: headerBg }} />
      {/* Feature images row */}
      <div className="flex gap-3 px-6 py-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 space-y-2">
            <div className="h-20 w-full rounded-lg opacity-[0.13]" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-3/4 rounded-full opacity-[0.12]" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-1/2 rounded-full opacity-[0.08]" style={{ backgroundColor: headerBg }} />
          </div>
        ))}
      </div>
      {/* Second divider */}
      <div className="mx-6 border-t opacity-[0.07]" style={{ borderColor: headerBg }} />
      {/* Stats / testimonial row */}
      <div className="flex items-center gap-8 px-6 py-4">
        {[{ w: "w-1/3" }, { w: "w-1/4" }, { w: "w-1/5" }].map(({ w }, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className={`h-4 ${w} rounded-full opacity-25`} style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-16 rounded-full opacity-12" style={{ backgroundColor: headerBg }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Section ─────────────────────────── */
export const CaseStudyFeatureSection = (): JSX.Element => {
  const reduced  = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const animOff = reduced || isMobile;

  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // useLayoutEffect: cleanup runs synchronously before React's DOM mutations,
    // removing GSAP's pin-spacer before React reconciles — prevents "removeChild" crash.
    if (tlRef.current) {
      try { tlRef.current.scrollTrigger?.kill(); tlRef.current.kill(); } catch (_) {}
      tlRef.current = null;
    }
    if (animOff) return;

    const cards    = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4 || contents.length < 4 || !sectionRef.current) return;

    // Initial stack positions — transformOrigin "top center" keeps top edges aligned
    cards.forEach((card, i) => {
      gsap.set(card, { ...STACK[i], transformOrigin: "top center" });
    });
    gsap.set(contents[0], { opacity: 1 });
    contents.slice(1).forEach((c) => gsap.set(c, { opacity: 0 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=310%",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to({}, { duration: 0.3 }); // opening hold

    for (let t = 0; t < 3; t++) {
      const exiting      = cards[t];
      const incoming     = cards[t + 1];
      const exitContent  = contents[t];
      const enterContent = contents[t + 1];

      // Z-swap: incoming card rises above exiting
      tl.set(exiting,  { zIndex: 5 });
      tl.set(incoming, { zIndex: 40 }, "<");

      // Content: hide exiting fast, reveal incoming as card rises
      tl.to(exitContent,  { opacity: 0, duration: 0.25, ease: "none" }, "<");
      tl.to(enterContent, { opacity: 1, duration: 0.65, ease: "none" }, "<0.35");

      // Exiting card fades backward into the deck
      tl.to(exiting, { y: 126, scale: STACK[3].scale, opacity: 0, duration: 1.05, ease: "none" }, "<");

      // Incoming card rises to active position
      tl.to(incoming, { y: 0, scale: 1, opacity: 1, duration: 1.05, ease: "none" }, "<");

      // Remaining stacked cards shift one position forward
      for (let r = t + 2; r < 4; r++) {
        const newPos = STACK[r - (t + 1)];
        tl.to(cards[r], {
          y: newPos.y, scale: newPos.scale, opacity: newPos.opacity,
          duration: 0.9, ease: "none",
        }, "<");
      }

      tl.to({}, { duration: t === 2 ? 0.9 : 0.45 }); // hold at new active
    }

    tlRef.current = tl;

    return () => {
      try { tl.scrollTrigger?.kill(); tl.kill(); } catch (_) {}
      tlRef.current = null;
    };
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="selected-work-heading"
    >
      {/* Background stars */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        alt="" aria-hidden="true"
        src="/figmaAssets/backgroundstars-2.svg"
      />

      {/* Atmospheric glows */}
      <div aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[55vw] w-[55vw] max-h-[800px] max-w-[800px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(29,78,216,0.15)" }} />
      <div aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[22%] h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(124,58,237,0.10)" }} />
      <div aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-[55%] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ backgroundColor: "rgba(56,189,248,0.08)" }} />

      {/* Edge stars */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" />

      {/* ── Main layout ── */}
      {/*
        h-screen ensures the section fills the viewport for GSAP pinning.
        Layout budget (1080px example):
          pt-10 (40px) + header (~75px) + mt-4 (16px) + stack (flex-1 ≈ 789px) + peek-spacer (160px) = 1080px
        The peek spacer is the reserved area where stacked cards' bottom strips peek below
        the active card (y=42/84/126 offsets × 1px per unit → 42px/84px/126px strips).
      */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1560px] flex-col px-5 pt-10 sm:px-8 lg:px-12">

        {/* ── Section header — kept compact so the stack gets maximum height ── */}
        <header className="flex w-full shrink-0 flex-col items-start justify-between gap-3 lg:flex-row lg:items-end lg:gap-12">
          <div className="flex flex-col items-start">
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[17px] tracking-[1.5px] text-[#f5f7fa61]">
              04 / 06
            </p>
            <h2
              id="selected-work-heading"
              className="pt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.06] tracking-[-0.8px] text-[#f5f7fa] sm:text-[36px] lg:text-[44px] lg:tracking-[-1.4px]"
            >
              Selected work shaped
              <br className="hidden sm:block" />
              {" "}from strategy to launch.
            </h2>
          </div>
          <p className="max-w-[380px] shrink-0 [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[20px] text-[#f5f7faa6] lg:text-[13px] lg:leading-[22px]">
            A closer look at websites and digital systems we designed, developed,
            optimized, and launched across export brands, e-commerce platforms,
            and business-focused experiences.
          </p>
        </header>

        {/* ── CARD STACK STAGE ── */}
        {animOff ? (
          /* Mobile / reduced-motion: vertical list */
          <div className="mt-6 flex flex-col gap-5 overflow-y-auto pb-8">
            {projects.map((project) => (
              <div key={project.label} className="flex min-h-[480px] flex-col overflow-hidden rounded-[24px] border border-white/[0.14] bg-white/[0.06] shadow-[0_32px_100px_rgba(0,0,0,0.7)] backdrop-blur-sm">
                <div className="flex flex-col p-7">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.44px] text-[#f5f7fa61]">{project.label}</p>
                  <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium text-[#f5f7fa]">{project.name}</h3>
                  <p className="mt-1 text-[12px] text-[#f5f7fa61]">{project.subtitle}</p>
                  <p className="mt-4 text-[13px] leading-[22px] text-[#f5f7faa6]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.14] bg-white/[0.08] px-2.5 py-1 text-[10.5px] text-[#f5f7fa99]">{tag}</span>
                    ))}
                  </div>
                  <button type="button" className="mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-[#f5f7fa] opacity-80">
                    View Project <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-6">
                  <BrowserMockup domain={project.domain} headerBg={project.headerBg} bodyBg={project.bodyBg} accent={project.accent} navLines={project.navLines} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/*
              Stack container — flex-1 fills the space between the section header and the peek spacer.
              overflow:visible is critical: stacked cards (y=42/84/126) extend downward into
              the 160px peek spacer below, where their bottom strips remain visible.
              Cards are absolute top-0, same size (h-full), controlled by GSAP.
            */}
            <div className="relative mt-4 flex-1 overflow-visible lg:mt-5">
              {projects.map((project, i) => (
                <div
                  key={project.label}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute inset-x-0 top-0 h-full will-change-transform"
                >
                  {/*
                    Card shell — glassmorphism surface.
                    overflow-hidden clips child elements to the rounded card boundary.
                    The card must be tall enough (via h-full of the stack container) that
                    no content is hidden by this clip; if it were too short, the CTA would
                    be cut off. The peek spacer guarantees adequate stack height.
                  */}
                  <div className="relative flex h-full w-full overflow-hidden rounded-[28px] border border-white/[0.14] bg-white/[0.06] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08),0_40px_120px_rgba(0,0,0,0.75)] backdrop-blur-sm">

                    {/*
                      Content wrapper — GSAP drives opacity: 0 (inactive) → 1 (active).
                      opacity-0 hides all readable text for stacked cards; their glass shell
                      remains visible because opacity is on the shell's parent (the card wrapper),
                      not on the shell itself — the content ref controls only content visibility.
                    */}
                    <div
                      ref={(el) => { contentRefs.current[i] = el; }}
                      className="flex h-full w-full flex-col lg:flex-row"
                    >
                      {/* ── Left column: project info ── */}
                      <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-[42%] lg:p-14 xl:p-16">
                        <div>
                          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[1.44px] text-[#f5f7fa61]">
                            {project.label}
                          </p>
                          <h3 className="mt-3.5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.02] tracking-[-0.8px] text-[#f5f7fa] sm:text-[34px] lg:text-[44px] lg:tracking-[-1.2px]">
                            {project.name}
                          </h3>
                          <p className="mt-2.5 [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[18px] tracking-[0.12px] text-[#f5f7fa61]">
                            {project.subtitle}
                          </p>
                          <p className="mt-6 max-w-[420px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[24px] text-[#f5f7faa6]">
                            {project.description}
                          </p>
                        </div>

                        {/* Tags + CTA pinned to bottom */}
                        <div className="mt-8">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-normal leading-[15px] text-[#f5f7fa99]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="mt-7 flex items-center gap-2 [font-family:'Inter',Helvetica] text-[13.5px] font-medium leading-[20px] tracking-[0.12px] text-[#f5f7fa] opacity-75 transition-opacity hover:opacity-100"
                            data-testid={`btn-view-project-${project.label}`}
                          >
                            View Project
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Vertical divider */}
                      <div className="hidden w-px shrink-0 bg-white/[0.09] lg:block" />

                      {/* ── Right column: browser preview ── */}
                      <div className="flex flex-1 items-center justify-center overflow-visible p-8 sm:p-10 lg:p-10 xl:p-12">
                        <div className="w-[92%] max-w-[760px]">
                          <BrowserMockup
                            domain={project.domain}
                            headerBg={project.headerBg}
                            bodyBg={project.bodyBg}
                            accent={project.accent}
                            navLines={project.navLines}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/*
              ── Peek spacer ──
              160px of empty space below the stack container.
              This is where the 3 stacked cards' bottom strips become visible:
                strip 1 (card at y=42): last 42px of its height appears here
                strip 2 (card at y=84): last 84px minus strip-1 coverage = 42px
                strip 3 (card at y=126): last 126px minus strip-1&2 coverage = 42px
              Total: 3 × 42px = 126px of peeking strips, within the 160px spacer. ✓
            */}
            <div className="shrink-0" style={{ height: "160px" }} aria-hidden="true" />
          </>
        )}
      </div>
    </section>
  );
};
