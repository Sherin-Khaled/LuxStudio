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
    ctaBg: "#16532d",
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
    ctaBg: "#0c0c0f",
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
    ctaBg: "#0f2d6b",
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
    ctaBg: "#364a18",
  },
];

/* ─────────────────────── Browser mockup ─────────────────────── */
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
    {/* Browser chrome */}
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
    {/* Simulated page */}
    <div style={{ backgroundColor: bodyBg }}>
      {/* Header / nav */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: headerBg }}
      >
        <div className="h-2 w-20 rounded-full opacity-70" style={{ backgroundColor: navLines[0] }} />
        <div className="flex gap-3">
          {navLines.map((c, i) => (
            <div key={i} className="h-1.5 w-10 rounded-full opacity-50" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-5 w-14 rounded" style={{ backgroundColor: accent }} />
      </div>
      {/* Hero block */}
      <div className="px-5 py-5">
        <div className="mb-3 h-4 w-2/3 rounded-full opacity-30" style={{ backgroundColor: headerBg }} />
        <div className="mb-2 h-3 w-1/2 rounded-full opacity-20" style={{ backgroundColor: headerBg }} />
        <div className="mt-4 flex gap-2">
          <div className="h-7 w-20 rounded" style={{ backgroundColor: headerBg, opacity: 0.9 }} />
          <div className="h-7 w-20 rounded border" style={{ borderColor: headerBg, opacity: 0.4 }} />
        </div>
      </div>
      {/* Section divider */}
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

/* ─────────────────────── Main section ─────────────────────── */
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

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.scrollTrigger?.kill();
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (animOff) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4 || !sectionRef.current) return;

    // ── Stack offsets ──
    const stackY     = [0, 22, 42, 60];
    const stackScale = [1, 0.97, 0.94, 0.91];
    const stackOpac  = [1, 0.82, 0.62, 0.42];

    // Initial stack state
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: stackY[i],
        scale: stackScale[i],
        opacity: stackOpac[i],
        zIndex: 40 - i * 10,
        transformOrigin: "top center",
      });
    });

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

    // ── 3 card transitions ──
    for (let t = 0; t < 3; t++) {
      const exiting  = cards[t];
      const incoming = cards[t + 1];

      // Z-index swap at transition start: incoming card rises above exiting
      tl.set(exiting,  { zIndex: 5 });
      tl.set(incoming, { zIndex: 40 }, "<");

      // Exiting card: fade down into the stack
      tl.to(exiting, { opacity: 0, y: 60, scale: 0.88, duration: 1, ease: "none" }, "<");

      // Incoming card rises to the active position
      tl.to(incoming, { y: 0, scale: 1, opacity: 1, duration: 1, ease: "none" }, "<");

      // Remaining cards shift up one position in the stack
      for (let r = t + 2; r < 4; r++) {
        const stackPos = r - (t + 1); // 1, 2, 3 → 0, 1, 2
        tl.to(cards[r], {
          y: stackY[stackPos],
          scale: stackScale[stackPos],
          opacity: stackOpac[stackPos],
          duration: 1,
          ease: "none",
        }, "<");
      }

      // Hold at new active state
      tl.to({}, { duration: t === 2 ? 0.8 : 0.5 });
    }

    tlRef.current = tl;

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      tlRef.current = null;
    };
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="selected-work-heading"
    >
      {/* Stars background */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-2.svg"
      />

      {/* Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[55vw] w-[55vw] max-h-[800px] max-w-[800px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(29, 78, 216, 0.15)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[22%] h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.10)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-[60%] h-[300px] w-[300px] rounded-full blur-[90px]"
        style={{ backgroundColor: "rgba(56, 189, 248, 0.08)" }}
      />

      {/* Edge stars */}
      <SideStars starsPerSide={isMobile ? 6 : 14} className="z-[1]" />

      {/* Main layout */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1400px] flex-col px-6 pb-10 pt-12 sm:px-8 lg:px-11 lg:pt-14">

        {/* Section header */}
        <header className="flex w-full shrink-0 flex-col items-start justify-between gap-5 lg:flex-row lg:items-end lg:gap-12">
          <div className="flex max-w-[700px] flex-col items-start">
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] text-[#f5f7fa61]">
              04 / 06
            </p>
            <h2
              id="selected-work-heading"
              className="pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-medium leading-[1.03] tracking-[-1.2px] text-[#f5f7fa] sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
            >
              Selected work shaped
              <br className="hidden sm:block" />
              {" "}from strategy to launch.
            </h2>
          </div>
          <p className="max-w-[440px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] text-[#f5f7faa6] lg:text-[14px] lg:leading-[24px]">
            A closer look at websites and digital systems we designed, developed, optimized,
            and launched across export brands, e-commerce platforms, and business-focused experiences.
          </p>
        </header>

        {/* ── Card stack ── */}
        {/* overflow-visible so stacked cards can peek below the container boundary */}
        <div className="relative mt-6 flex-1 overflow-visible lg:mt-8">
          {projects.map((project, i) => (
            <div
              key={project.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 will-change-transform"
            >
              {/* Glassmorphism card */}
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/[0.14] bg-white/[0.06] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.08),0_32px_100px_rgba(0,0,0,0.7)] backdrop-blur-sm lg:flex-row">

                {/* Left: project info */}
                <div className="flex flex-col justify-between p-7 sm:p-8 lg:w-[42%] lg:p-10 xl:p-12">
                  <div>
                    <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[1.44px] text-[#f5f7fa61]">
                      {project.label}
                    </p>
                    <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-none tracking-[-0.9px] text-[#f5f7fa] sm:text-[36px] lg:text-[44px] lg:tracking-[-1.2px]">
                      {project.name}
                    </h3>
                    <p className="mt-2 [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px] tracking-[0.12px] text-[#f5f7fa61]">
                      {project.subtitle}
                    </p>
                    <p className="mt-5 max-w-[400px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] text-[#f5f7faa6]">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-8">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
