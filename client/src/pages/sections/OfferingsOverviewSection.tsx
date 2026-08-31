import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { offeringsDict } from "@/lib/i18n/home/offerings";

gsap.registerPlugin(ScrollTrigger);

// Per-card GSAP slide-in direction (-1 = from left, 1 = from right),
// alternating per spec. This is animation data, not copy, so it stays a
// plain array here — kept in sync by index with offeringsDict's services.
const slideDirections = [-1, 1, -1, 1, -1, 1];

export const OfferingsOverviewSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(offeringsDict);
  const services = t.services;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    // A layout pass can land a beat after this effect's first run in some
    // embedding contexts, catching window.innerWidth mid-transition and
    // sticking the wrong reading for the rest of the page's life (no resize
    // event ever fires to correct it). One follow-up check after the next
    // paint catches that without adding any visible delay in the normal case.
    const raf = requestAnimationFrame(check);
    const timeout = window.setTimeout(check, 150);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", check);
    };
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
          x: slideDirections[i] * 96,
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

      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full transition-colors ${isLight ? "bg-[#F8FBFF]" : "bg-transparent"}`}
      aria-labelledby="what-we-create-heading"
    >
      {/* ── Background stars image ── */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/figmaAssets/backgroundstars-4.svg"
      />
      {/* Light-mode wash on top of the star image — same technique as the
          hero/mission sections: a separate static layer, not a filter on the
          whole section (which would also wash out the pinned card text). */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.82)_0%,rgba(248,251,255,0.5)_45%,rgba(248,251,255,0.82)_100%)]"
        />
      )}

      {/* ── Glow decorations (direct section children — no overflow-hidden parent) ── */}
      {/* Light-mode-only echo of Mission's bottom-right glow: Mission's own
          opaque background otherwise cuts that glow off dead at the section
          boundary, since the next section (this one) paints over whatever
          would have bled through. Offset by a fixed pixel amount rather than
          a %-of-height: this section's own height comes from its GSAP pin
          (viewport-driven, h-screen) while Mission's height is content-
          driven — the two never scale together, so a %-based offset only
          ever lined up with Mission's glow by coincidence at one viewport
          size. A fixed offset guarantees deep, reliable overlap with
          whatever's above regardless of either section's height. Opacity
          matched exactly to Mission's own glow (0.12, was 0.10) so the two
          read as one continuous wash rather than two intensities meeting at
          a seam. */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[180px] right-[-10%] h-[560px] w-[560px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(38, 100, 255, 0.12)" }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[60%] h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ backgroundColor: isLight ? "rgba(38, 100, 255, 0.10)" : "rgba(38, 100, 255, 0.14)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18%] right-[-12%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: isLight ? "rgba(124, 58, 237, 0.10)" : "rgba(38, 100, 255, 0.18)" }}
      />

      {/* ── Side edge stars ── */}
      <SideStars starsPerSide={isMobile ? 8 : 15} className="z-[1]" variant={isLight ? "light" : "dark"} />

      {/* ── Main content ── */}
      {/* h-screen (a fixed, single-viewport-tall box) is only meaningful on
          desktop, where GSAP pins this section for exactly one viewport
          while it scrubs each card's opacity — the 2-column grid was tuned
          to fit that box. On mobile the grid collapses to 1 column (6
          stacked cards) and the pin is already disabled (animOff, above),
          but the box itself stayed a fixed h-screen with justify-center:
          since the stacked content is taller than one screen, centering it
          inside a height-capped box made it overflow equally above *and*
          below the box's own edges — bleeding up into the previous section
          and silently eating clicks meant for its CTA. min-h-screen keeps
          the exact same centered-in-one-screen look whenever content fits,
          but lets the box grow to natural content height instead of
          clipping/overlapping when it doesn't. */}
      <div className={`relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 py-14 sm:px-8 lg:px-11 ${isMobile ? "min-h-screen" : "h-screen"}`}>

        {/* Section header */}
        <header className="flex flex-col items-start pb-10">
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.68px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa66]"}`}>
            02 / 06
          </p>
          <h2
            id="what-we-create-heading"
            className={`pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-medium leading-tight tracking-[-1.6px] sm:text-[48px] lg:text-[62px] lg:leading-[64px] ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            {t.heading}
          </h2>
          <p className={`pt-3 [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] tracking-[0.08px] sm:text-[15px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa66]"}`}>
            {t.subheading}
          </p>
        </header>

        {/* Grid of 6 service cards */}
        <div className={`border-t ${isLight ? "border-[rgba(15,23,42,0.10)]" : "border-white/10"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, i) => {
              const isLeftCol  = i % 2 === 0;
              const isLastRow  = i >= 4;
              const dividerClass = isLight ? "border-[rgba(15,23,42,0.10)]" : "border-white/10";

              return (
                <div
                  key={service.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={[
                    "flex flex-col items-start p-7 sm:p-8 lg:p-9",
                    !isLastRow ? `border-b ${dividerClass}` : "",
                    isLeftCol  ? `md:border-r ${dividerClass}` : "",
                  ].join(" ")}
                >
                  <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1.20px] ${isLight ? "text-[#0284c7]" : "text-[#f5f7fab8]"}`}>
                    {service.id}
                  </p>
                  <h3
                    className={`pt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium leading-[1.06] tracking-[-0.55px] sm:text-[26px] lg:text-[30px] lg:leading-[32px] ${
                      isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className={`max-w-[440px] pt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Light mode drops this trailing rule entirely — a lone thin line
            with nothing after it read as a stray/unfinished edge against a
            pale background, where dark mode's near-invisible white/10
            version never drew attention to it. */}
        {!isLight && <div className="border-t border-white/10" />}
      </div>
    </section>
  );
};
