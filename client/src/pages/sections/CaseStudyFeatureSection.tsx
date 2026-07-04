import { useRef, useState, useEffect } from "react";
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

/* ─────────────────── Browser mockup ─────────────────── */
const BrowserMockup = ({
  domain,
  headerBg,
  bodyBg,
  accent,
  navLines,
}: {
  domain: string;
  headerBg: string;
  bodyBg: string;
  accent: string;
  navLines: string[];
}) => (
  <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
    {/* Chrome bar */}
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
    {/* Page */}
    <div style={{ backgroundColor: bodyBg }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: headerBg }}>
        <div className="h-2 w-20 rounded-full opacity-70" style={{ backgroundColor: navLines[0] }} />
        <div className="flex gap-3">
          {navLines.map((c, i) => (
            <div key={i} className="h-1.5 w-10 rounded-full opacity-50" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-5 w-14 rounded" style={{ backgroundColor: accent }} />
      </div>
      {/* Hero */}
      <div className="px-5 py-5">
        <div className="mb-3 h-4 w-2/3 rounded-full opacity-30" style={{ backgroundColor: headerBg }} />
        <div className="mb-2 h-3 w-1/2 rounded-full opacity-20" style={{ backgroundColor: headerBg }} />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded opacity-90" style={{ backgroundColor: headerBg }} />
          <div className="h-7 w-20 rounded border opacity-40" style={{ borderColor: headerBg }} />
        </div>
      </div>
      <div className="mx-5 border-t opacity-10" style={{ borderColor: headerBg }} />
      {/* Content row */}
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

/* ─────────────────── Card content ─────────────────── */
const ProjectCardContent = ({ project }: { project: typeof projects[0] }) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/[0.14] bg-white/[0.06] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08),0_32px_100px_rgba(0,0,0,0.7)] backdrop-blur-sm lg:flex-row">
    {/* Left: info */}
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
);

/* ─────────────────── Section ─────────────────── */

// Space (px) reserved below the active card's bottom edge for the stack peek
const PEEK_SPACE = 64;
// How far each stacked card's top edge is from the active card's bottom edge
const PEEK_OFFSETS = [6, 22, 36]; // px below active card bottom for cards 1, 2, 3

export const CaseStudyFeatureSection = (): JSX.Element => {
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

  const sectionRef  = useRef<HTMLElement>(null);
  const stackRef    = useRef<HTMLDivElement>(null);          // overflow:hidden container
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Clean up previous timeline
    if (tlRef.current) {
      tlRef.current.scrollTrigger?.kill();
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (animOff) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4 || !sectionRef.current || !stackRef.current) return;

    const CH = stackRef.current.clientHeight; // container height
    // Card height is set by CSS: calc(100% - PEEK_SPACE px).
    // GSAP only animates y / opacity / zIndex — never height.
    const activeH = CH - PEEK_SPACE;

    // Initial y positions
    const peekY = [
      activeH + PEEK_OFFSETS[0], // card 1 peek top
      activeH + PEEK_OFFSETS[1], // card 2 peek top
      activeH + PEEK_OFFSETS[2], // card 3 peek top
    ];

    gsap.set(cards[0], { y: 0,        opacity: 1,    zIndex: 40 });
    gsap.set(cards[1], { y: peekY[0], opacity: 1,    zIndex: 30 });
    gsap.set(cards[2], { y: peekY[1], opacity: 0.90, zIndex: 20 });
    gsap.set(cards[3], { y: peekY[2], opacity: 0.80, zIndex: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=320%",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Brief opening hold
    tl.to({}, { duration: 0.3 });

    for (let t = 0; t < 3; t++) {
      const exiting  = cards[t];
      const incoming = cards[t + 1];

      // Z-index: incoming rises above exiting immediately
      tl.set(exiting,  { zIndex: 5 });
      tl.set(incoming, { zIndex: 40 }, "<");

      // Exiting card: quick opacity fade + slow upward exit (clipped by overflow:hidden)
      tl.to(exiting, { opacity: 0, duration: 0.3, ease: "none" }, "<");
      tl.to(exiting, { y: -(activeH + 30), duration: 1.1, ease: "none" }, "<");

      // Incoming card: rises from peek position into full active position
      tl.to(incoming, { y: 0, opacity: 1, duration: 1.1, ease: "none" }, "<");

      // Remaining stacked cards shift up one position
      for (let r = t + 2; r < 4; r++) {
        const newPeekIdx = r - (t + 1) - 1; // 0, 1
        tl.to(cards[r], {
          y: peekY[newPeekIdx],
          duration: 0.9,
          ease: "none",
        }, "<");
      }

      // Hold at new active state
      tl.to({}, { duration: t === 2 ? 0.9 : 0.4 });
    }

    tlRef.current = tl;

    return () => {
      // Wrap in try-catch: during HMR, React may detach DOM nodes before this
      // cleanup runs, causing GSAP's pin-spacer removeChild to race and throw.
      try {
        tl.scrollTrigger?.kill();
        tl.kill();
      } catch (_) {
        // suppress HMR pin-spacer race
      }
      tlRef.current = null;
    };
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="selected-work-heading"
    >
      {/* Stars */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-2.svg"
      />

      {/* Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-[55vw] w-[55vw] max-h-[800px] max-w-[800px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(29,78,216,0.15)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8%] top-[22%] h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(124,58,237,0.10)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute left-[4%] top-[60%] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ backgroundColor: "rgba(56,189,248,0.08)" }} />

      {/* Edge stars */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" />

      {/* ── Main layout ── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1400px] flex-col px-6 pb-6 pt-12 sm:px-8 lg:px-11 lg:pt-14">

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
          ── Card stack container ──
          overflow:hidden clips:
            (a) cards exiting upward (above y=0)
            (b) stacked cards that extend below the container bottom
          The bottom PEEK_SPACE px of the container is the "peek zone" where
          stacked cards' top edges appear.
        */}
        {animOff ? (
          /* Mobile: vertical list */
          <div className="mt-6 flex flex-col gap-5 overflow-y-auto">
            {projects.map((p) => (
              <div key={p.label} className="h-auto min-h-[480px]">
                <ProjectCardContent project={p} />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={stackRef}
            className="relative mt-5 flex-1 overflow-hidden lg:mt-6"
          >
            {projects.map((project, i) => (
              <div
                key={project.label}
                ref={(el) => { cardRefs.current[i] = el; }}
                /*
                  width: 100%, position: absolute, top: 0.
                  Height and y-transform are set by GSAP in useEffect.
                  Initially rendered with a fallback height so the card
                  is visible before GSAP runs.
                */
                className="absolute inset-x-0 top-0 will-change-transform"
                style={{ height: `calc(100% - ${PEEK_SPACE}px)` }}
              >
                <ProjectCardContent project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
