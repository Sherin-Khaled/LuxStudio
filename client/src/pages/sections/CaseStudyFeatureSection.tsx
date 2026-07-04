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
  Stack visual positions indexed by the card's relative position to the active card.
  relativeIndex 0 = active, 1 = behind 1, 2 = behind 2, 3 = behind 3.
  transformOrigin "top center" keeps the top edge anchored while scale shrinks the card downward.
*/
const STACK = [
  { y: 0,   scale: 1,     opacity: 1,    zIndex: 40 },
  { y: 36,  scale: 0.985, opacity: 0.65, zIndex: 30 },
  { y: 72,  scale: 0.97,  opacity: 0.42, zIndex: 20 },
  { y: 108, scale: 0.955, opacity: 0.25, zIndex: 10 },
];

/* ─────────────────────── Browser mockup ─────────────────────── */
const BrowserMockup = ({
  domain, headerBg, bodyBg, accent, navLines,
}: {
  domain: string; headerBg: string; bodyBg: string; accent: string; navLines: string[];
}) => (
  <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
    <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-3 py-2.5">
      <div className="flex gap-1.5">
        <div className="h-2 w-2 rounded-full bg-[#ff5f57] opacity-80" />
        <div className="h-2 w-2 rounded-full bg-[#ffbc2e] opacity-80" />
        <div className="h-2 w-2 rounded-full bg-[#28c840] opacity-80" />
      </div>
      <div className="flex h-5 items-center rounded bg-white/10 px-2.5">
        <span className="font-mono text-[10px] leading-none text-white/50">{domain}</span>
      </div>
    </div>
    <div style={{ backgroundColor: bodyBg }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: headerBg }}>
        <div className="h-2 w-20 rounded-full opacity-70" style={{ backgroundColor: navLines[0] }} />
        <div className="flex gap-3">
          {navLines.map((c, i) => (
            <div key={i} className="h-1.5 w-10 rounded-full opacity-50" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-5 w-14 rounded" style={{ backgroundColor: accent }} />
      </div>
      <div className="px-5 py-5">
        <div className="mb-3 h-4 w-2/3 rounded-full opacity-30" style={{ backgroundColor: headerBg }} />
        <div className="mb-2 h-3 w-1/2 rounded-full opacity-20" style={{ backgroundColor: headerBg }} />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded opacity-90" style={{ backgroundColor: headerBg }} />
          <div className="h-7 w-20 rounded border opacity-40" style={{ borderColor: headerBg }} />
        </div>
      </div>
      <div className="mx-5 border-t opacity-10" style={{ borderColor: headerBg }} />
      <div className="flex gap-4 px-5 py-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 space-y-1.5">
            <div className="h-8 w-full rounded opacity-15" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-3/4 rounded-full opacity-10" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-2/3 rounded-full opacity-10" style={{ backgroundColor: headerBg }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────── Section ─────────────────── */
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
  /*
    cardRefs:    outer wrapper div — GSAP controls y / scale / opacity / zIndex
    contentRefs: inner content div — GSAP controls opacity (0 = inactive, 1 = active)
    Only one card should have readable content at a time.
  */
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Cleanup previous timeline. useLayoutEffect ensures cleanup runs synchronously
    // BEFORE React's commit-phase DOM mutations, so GSAP's pin-spacer is removed
    // before React tries to reconcile — preventing the "removeChild" HMR crash.
    if (tlRef.current) {
      try { tlRef.current.scrollTrigger?.kill(); tlRef.current.kill(); } catch (_) {}
      tlRef.current = null;
    }
    if (animOff) return;

    const cards    = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4 || contents.length < 4 || !sectionRef.current) return;

    // ── Initial stack positions ──
    // All cards share absolute top:0 and have the same height (h-full of the stack container).
    // Stacked cards are offset downward (y=36/72/108) so their bottom edge peeks below
    // the active card into the h-28 peek spacer reserved at the bottom of the layout.
    cards.forEach((card, i) => {
      gsap.set(card, { ...STACK[i], transformOrigin: "top center" });
    });
    // Active card content visible; others hidden
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

    // Opening hold — user sees the full first card before scrolling triggers a transition
    tl.to({}, { duration: 0.3 });

    for (let t = 0; t < 3; t++) {
      const exiting  = cards[t];
      const incoming = cards[t + 1];
      const exitContent  = contents[t];
      const enterContent = contents[t + 1];

      // ── Z-index swap: incoming card rises above exiting card ──
      tl.set(exiting,  { zIndex: 5 });
      tl.set(incoming, { zIndex: 40 }, "<");

      // ── Content: hide exiting text fast, reveal incoming text as card rises ──
      tl.to(exitContent,  { opacity: 0, duration: 0.25, ease: "none" }, "<");
      tl.to(enterContent, { opacity: 1, duration: 0.65, ease: "none" }, "<0.35");

      // ── Exiting card: moves backward into deck (y=108) and fades out ──
      tl.to(exiting, {
        y: 108, scale: STACK[3].scale, opacity: 0,
        duration: 1.05, ease: "none",
      }, "<");

      // ── Incoming card: rises from its stack position to active (y=0) ──
      tl.to(incoming, {
        y: 0, scale: 1, opacity: 1,
        duration: 1.05, ease: "none",
      }, "<");

      // ── Remaining stacked cards shift one position forward in the deck ──
      for (let r = t + 2; r < 4; r++) {
        const newPos = STACK[r - (t + 1)]; // shift up one slot
        tl.to(cards[r], {
          y: newPos.y, scale: newPos.scale, opacity: newPos.opacity,
          duration: 0.9, ease: "none",
        }, "<");
      }

      // Hold at the new active card so the user can read it before next scroll
      tl.to({}, { duration: t === 2 ? 0.9 : 0.45 });
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
        alt=""
        aria-hidden="true"
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

      {/* ──────────────────── Main layout ──────────────────── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1400px] flex-col px-6 pt-12 pb-0 sm:px-8 lg:px-11 lg:pt-14">

        {/* Section header */}
        <header className="flex w-full shrink-0 flex-col items-start justify-between gap-4 lg:flex-row lg:items-end lg:gap-10">
          <div className="flex flex-col items-start">
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] text-[#f5f7fa61]">
              04 / 06
            </p>
            <h2
              id="selected-work-heading"
              className="pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.05] tracking-[-1px] text-[#f5f7fa] sm:text-[40px] lg:text-[52px] lg:tracking-[-1.6px]"
            >
              Selected work shaped
              <br className="hidden sm:block" />
              {" "}from strategy to launch.
            </h2>
          </div>
          <p className="max-w-[400px] shrink-0 [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[21px] text-[#f5f7faa6] lg:text-[13.5px] lg:leading-[23px]">
            A closer look at websites and digital systems we designed, developed, optimized,
            and launched across export brands, e-commerce platforms, and business-focused experiences.
          </p>
        </header>

        {/*
          ── CARD STACK STAGE ──
          All 4 cards share this same absolute area (position: relative, overflow: visible).
          overflow:visible allows the stacked cards (y=36/72/108) to extend downward
          into the h-28 peek spacer, creating the layered-deck visual.

          Stack container uses flex-1 to fill the space between the header and the peek spacer.
          Each card is absolute top-0 left-0 right-0 h-full — they all occupy the same area.
          GSAP controls y / scale / opacity / zIndex to create the stacked appearance.
        */}
        {animOff ? (
          /* Mobile: vertical list of full cards */
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
              Stack container: flex-1 fills remaining space after header.
              overflow:visible lets stacked cards' bottom edges show in the peek spacer below.
            */}
            <div className="relative mt-5 flex-1 overflow-visible lg:mt-6">
              {projects.map((project, i) => (
                <div
                  key={project.label}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  /*
                    All cards: absolute, same top-0, same full size (h-full, w-full).
                    GSAP drives y/scale/opacity/zIndex.
                    transformOrigin "top center" (set by GSAP) keeps the top edge anchored.
                  */
                  className="absolute inset-x-0 top-0 h-full will-change-transform"
                >
                  {/* Card shell — glassmorphism surface always visible at the card's opacity */}
                  <div className="relative flex h-full w-full overflow-hidden rounded-[28px] border border-white/[0.14] bg-white/[0.06] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08),0_32px_100px_rgba(0,0,0,0.7)] backdrop-blur-sm">

                    {/*
                      Content wrapper — GSAP controls opacity: 0 (inactive) or 1 (active).
                      Only the top active card has opacity=1 here; stacked cards have opacity=0.
                      This prevents multiple project titles/descriptions from being visible simultaneously.
                    */}
                    <div
                      ref={(el) => { contentRefs.current[i] = el; }}
                      className="flex h-full w-full flex-col lg:flex-row"
                    >
                      {/* Left: project info */}
                      <div className="flex flex-col justify-between p-7 sm:p-8 lg:w-[42%] lg:p-10 xl:p-11">
                        <div>
                          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[1.44px] text-[#f5f7fa61]">
                            {project.label}
                          </p>
                          <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-none tracking-[-0.8px] text-[#f5f7fa] sm:text-[34px] lg:text-[42px] lg:tracking-[-1.1px]">
                            {project.name}
                          </h3>
                          <p className="mt-2 [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[18px] tracking-[0.12px] text-[#f5f7fa61]">
                            {project.subtitle}
                          </p>
                          <p className="mt-5 max-w-[400px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] text-[#f5f7faa6]">
                            {project.description}
                          </p>
                        </div>
                        <div className="mt-6">
                          <div className="flex flex-wrap gap-[6px]">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/[0.14] bg-white/[0.08] px-2.5 py-1 [font-family:'Inter',Helvetica] text-[10.5px] font-normal leading-[15px] text-[#f5f7fa99]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="mt-5 flex items-center gap-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-medium leading-[19px] tracking-[0.12px] text-[#f5f7fa] opacity-80 transition-opacity hover:opacity-100"
                            data-testid={`btn-view-project-${project.label}`}
                          >
                            View Project
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Vertical divider */}
                      <div className="hidden w-px bg-white/[0.10] lg:block" />

                      {/* Right: browser mockup */}
                      <div className="flex flex-1 items-center justify-center p-6 sm:p-7 lg:p-8">
                        <div className="w-full max-w-[600px]">
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
                    {/* End content wrapper */}
                  </div>
                  {/* End card shell */}
                </div>
                /* End card outer wrapper */
              ))}
            </div>

            {/*
              ── Peek spacer ──
              This h-28 (112px) block at the bottom of the flex column is intentionally
              empty. It reserves visible room within the section for the stacked cards'
              bottom edges to peek into, creating the layered-deck look.
              Without this, the overflow-visible cards' peeking portions would land
              outside/below the h-screen section boundary and be invisible.
            */}
            <div className="shrink-0 h-28" aria-hidden="true" />
          </>
        )}
      </div>
    </section>
  );
};
