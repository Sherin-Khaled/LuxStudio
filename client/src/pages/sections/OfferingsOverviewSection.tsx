import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SideStars } from "@/components/backgrounds/SideStars";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "A.01",
    title: "Digital Product Design",
    description:
      "UX strategy, UI design, design systems, wireframes, and prototypes shaped around clarity, usability, and scalable structure.",
    dir: -1, // slides from left
  },
  {
    id: "A.02",
    title: "High-Performance Websites",
    description:
      "Responsive websites built with modern frontend architecture, strong performance, and a premium experience across every screen.",
    dir: 1, // slides from right
  },
  {
    id: "A.03",
    title: "Motion & Scroll Experiences",
    description:
      "Purposeful animation, cinematic interaction, and smooth scrolling that strengthen storytelling without becoming distracting.",
    dir: -1,
  },
  {
    id: "A.04",
    title: "Business Systems & Integrations",
    description:
      "Dashboards, CMS platforms, admin panels, APIs, and connected systems that help businesses operate and scale.",
    dir: 1,
  },
  {
    id: "A.05",
    title: "Brand & Content Experiences",
    description:
      "Brand direction, visual content, marketing assets, video editing, and creative experiences designed for consistent communication.",
    dir: -1,
  },
  {
    id: "A.06",
    title: "SEO & Performance",
    description:
      "Technical SEO, accessibility, Core Web Vitals, and frontend optimization designed to improve visibility and speed.",
    dir: 1,
  },
];

export const OfferingsOverviewSection = (): JSX.Element => {
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
  // One ref per card — callback-ref pattern avoids hooks-in-loops
  const cardRefs = useRef<(HTMLDivElement | null)[]>([
    null, null, null, null, null, null,
  ]);

  useLayoutEffect(() => {
    if (animOff) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // All cards start invisible
      cards.forEach((card, i) => {
        gsap.set(card, {
          autoAlpha: 0,
          x: services[i].dir * 96,
          filter: "blur(8px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Reveal each card in sequence, direction alternates per spec
      cards.forEach((card) => {
        tl.to(card, {
          autoAlpha: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "none",
        });
      });

      // Brief hold so user sees completed grid before section unpins
      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a]"
      aria-labelledby="what-we-create-heading"
    >
      {/* ── Background stars image ── */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-4.svg"
      />

      {/* ── Glow decorations (direct section children — no overflow-hidden parent) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[60%] h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(38, 100, 255, 0.14)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18%] right-[-12%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(38, 100, 255, 0.18)" }}
      />

      {/* ── Side edge stars ── */}
      <SideStars starsPerSide={isMobile ? 8 : 15} className="z-[1]" />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1400px] flex-col justify-center px-6 py-14 sm:px-8 lg:px-11">

        {/* Section header */}
        <header className="flex flex-col items-start pb-10">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.68px] text-[#f5f7fa66]">
            02 / 06
          </p>
          <h2
            id="what-we-create-heading"
            className="pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-medium leading-tight tracking-[-1.6px] text-[#f5f7fa] sm:text-[48px] lg:text-[62px] lg:leading-[64px]"
          >
            What We Create
          </h2>
          <p className="pt-3 [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] tracking-[0.08px] text-[#f5f7fa66] sm:text-[15px]">
            Six core capabilities that combine design, technology, content, and growth.
          </p>
        </header>

        {/* Grid of 6 service cards */}
        <div className="border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, i) => {
              const isLeftCol  = i % 2 === 0;
              const isLastRow  = i >= 4;

              return (
                <div
                  key={service.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={[
                    "flex flex-col items-start p-7 sm:p-8 lg:p-9",
                    !isLastRow ? "border-b border-white/10" : "",
                    isLeftCol  ? "md:border-r md:border-white/10" : "",
                  ].join(" ")}
                >
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1.20px] text-[#f5f7fab8]">
                    {service.id}
                  </p>
                  <h3 className="pt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium leading-[1.06] tracking-[-0.55px] text-[#f5f7fa] sm:text-[26px] lg:text-[30px] lg:leading-[32px]">
                    {service.title}
                  </h3>
                  <p className="max-w-[440px] pt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] text-[#f5f7faa6]">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10" />
      </div>
    </section>
  );
};
