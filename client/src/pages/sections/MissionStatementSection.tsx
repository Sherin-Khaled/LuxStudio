import { useRef, useState, useEffect, type Ref } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    id: "P.01",
    title: "Strategy before screens",
    description:
      "We define the purpose, audience, and experience before designing the interface.",
  },
  {
    id: "P.02",
    title: "Design that can actually be built",
    description:
      "We create interfaces with responsiveness, performance, and development in mind.",
  },
  {
    id: "P.03",
    title: "Systems prepared to scale",
    description:
      "We build digital foundations that can grow into dashboards, CMS platforms, integrations, and larger business systems.",
  },
];

export const MissionStatementSection = (): JSX.Element => {
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
  const p1Ref = useRef<HTMLElement>(null);
  const p2Ref = useRef<HTMLElement>(null);
  const p3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (animOff) return;

    const pts = [p1Ref.current, p2Ref.current, p3Ref.current];

    const ctx = gsap.context(() => {
      // Hide all points before animation starts
      gsap.set(pts, { opacity: 0, y: 48, filter: "blur(8px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Reveal each point in sequence, scroll-controlled
      tl.to(p1Ref.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "none",
      })
        .to(p2Ref.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "none",
        })
        .to(p3Ref.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "none",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#03050a] bg-[url(/figmaAssets/backgroundstars.svg)] bg-[100%_100%]"
      aria-labelledby="mission-statement-heading"
    >
      {/* ── Glow decorations — direct section children, NOT inside overflow-hidden ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-40px] top-[182px] h-[340px] w-[340px] rounded-full bg-[#70d7ff1c] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* ── Content ── */}
      <div className="container relative z-10 flex min-h-screen flex-col justify-center px-8 py-24 md:px-10 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,480px)] lg:gap-16 xl:gap-20">

          {/* Left — editorial headline */}
          <header className="max-w-[816px]">
            <h2
              id="mission-statement-heading"
              className="[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.02] tracking-[-1.2px] sm:text-[52px] md:text-[68px] md:tracking-[-1.78px] lg:text-[80px] lg:leading-[82px]"
            >
              <span className="text-[#f5f7fa70]">We do not just make websites. </span>
              <span className="text-[#f5f7fa]">
                We create digital systems that move brands forward.
              </span>
            </h2>
          </header>

          {/* Right — intro + scroll-revealed points */}
          <aside className="flex w-full flex-col justify-center justify-self-start lg:pt-4">
            <p className="[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[27px] tracking-[0] text-[#f5f7faa6] md:text-[17px] md:leading-[29px]">
              We combine strategy, design, content, development, and technology
              to create digital experiences that look premium, perform
              efficiently, and grow with the businesses behind them.
            </p>

            {/* Principles list */}
            <div className="mt-10 flex flex-col border-t border-white/10">
              <article
                ref={p1Ref as Ref<HTMLElement>}
                className="w-full border-b border-white/10 pb-[22px] pt-5"
              >
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1px] text-[#70d7ff99]">
                  P.01
                </p>
                <h3 className="pt-[7px] [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[24px] tracking-[-0.28px] text-[#f5f7fa]">
                  Strategy before screens
                </h3>
                <p className="pt-[7px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] text-[#f5f7fa99]">
                  We define the purpose, audience, and experience before
                  designing the interface.
                </p>
              </article>

              <article
                ref={p2Ref as Ref<HTMLElement>}
                className="w-full border-b border-white/10 pb-[22px] pt-5"
              >
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1px] text-[#70d7ff99]">
                  P.02
                </p>
                <h3 className="pt-[7px] [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[24px] tracking-[-0.28px] text-[#f5f7fa]">
                  Design that can actually be built
                </h3>
                <p className="pt-[7px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] text-[#f5f7fa99]">
                  We create interfaces with responsiveness, performance, and
                  development in mind.
                </p>
              </article>

              <article
                ref={p3Ref as Ref<HTMLElement>}
                className="w-full border-b border-white/10 pb-[22px] pt-5"
              >
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1px] text-[#70d7ff99]">
                  P.03
                </p>
                <h3 className="pt-[7px] [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[24px] tracking-[-0.28px] text-[#f5f7fa]">
                  Systems prepared to scale
                </h3>
                <p className="pt-[7px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] text-[#f5f7fa99]">
                  We build digital foundations that can grow into dashboards,
                  CMS platforms, integrations, and larger business systems.
                </p>
              </article>
            </div>

            <a
              href="#"
              className="mt-8 inline-flex w-fit items-center gap-1.5 [font-family:'Inter',Helvetica] text-[13.5px] font-medium leading-[20px] tracking-[0.14px] text-[#f5f7fa61] transition-colors duration-200 hover:text-[#f5f7fa]"
            >
              Discover Our Approach →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};
