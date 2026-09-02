import { useState, useEffect, type MutableRefObject } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GalaxyStarCanvas } from "@/components/backgrounds/GalaxyStarCanvas";
import { ShootingStars } from "@/components/backgrounds/ShootingStars";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import { heroDict } from "@/lib/i18n/home/hero";

interface HeroBannerSectionProps {
  cinematic?: boolean;
  scrollProgressRef: MutableRefObject<number>;
}

export const HeroBannerSection = ({ scrollProgressRef }: HeroBannerSectionProps): JSX.Element => {
  const { openProjectModal } = useProjectModal();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(heroDict);
  const common = useDict(commonDict);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-transparent"
      aria-label={t.sectionLabel}
    >
      {/* ── Inner frame: natural height, NOT sticky ───────────────────────── */}
      <div className="relative min-h-[730px] w-full md:min-h-screen">

        {/* ── Layer 1 – Background image (parallax scale + y) ───────────────
              Light mode overhangs the frame's bottom edge by 90px: the
              parallax lifts this whole layer up by up to 60px as the user
              scrolls (bgY), and while the 1.07x scale grows the box outward
              from center and claws back some of that, the two don't cancel
              out perfectly — the frame's own bare background color could
              still peek through as a flat, differently-toned band right at
              the seam with the next section. In dark mode this was never
              visible (the frame's bg-[#03050a] is the same color the fade
              already ends at), but light mode's fade ends in a pale blue
              that isn't a perfect match for the frame's own fallback color,
              so the gap read as a visible seam. Dark mode is untouched. ── */}
        <div
          data-home-hero-background
          className={`absolute inset-x-0 top-0 bg-cover bg-center bg-no-repeat ${isLight ? "" : "inset-y-0"}`}
          style={{
            backgroundImage: "url('/figmaAssets/imagewithfallback.webp')",
            bottom: isLight ? "-90px" : undefined,
            transformOrigin: "center center",
            // Washes the same photo out toward a pale, high-key sky instead
            // of swapping images — brightness/saturation only, never invert
            // (invert would flip every hue in the photo, not lighten it).
            // Pulled back from the first pass (1.35/0.65/0.95): that read as
            // milky/foggy rather than airy. Less brightness lift and less
            // desaturation lets the actual stars and blue sky tones show
            // through instead of bleaching them toward flat white.
            filter: isLight ? "brightness(1.16) saturate(0.85) contrast(0.98)" : undefined,
          }}
        >
          {/* Dark gradient overlays (inside bg div so they scale with it) */}
          {false ? (
            // Root-cause fix: this used to carry a THIRD layer —
            // linear-gradient(0deg, rgba(255,255,255,0.36) 0%, ...0) 100%) —
            // stacked on top of the first gradient's own bottom stop, which
            // is also rgba(255,255,255,0.36) at the same physical edge (180deg's
            // 100% stop = 0deg's 0% stop = the bottom). Two independent white
            // layers were compounding at the same spot (~0.36 + ~0.36 →
            // ~0.59 effective), and the 0deg layer's falloff reached all the
            // way to the vertical center, adding an uncounted haze behind the
            // headline too. Every prior pass tuned the OTHER layers (this
            // gradient's own stops, the two separate bottom-fade divs) while
            // this 3rd term kept silently adding back what those edits
            // removed — that's why "reduce the wash" edits never visibly
            // landed. Removing the redundant layer outright, not retuning it.
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0.14)_18%,rgba(219,234,254,0.18)_55%,rgba(255,255,255,0.36)_100%),radial-gradient(55%_50%_at_50%_38%,rgba(191,219,254,0.30)_0%,rgba(255,255,255,0)_68%)]" />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,10,0.28)_0%,rgba(0,0,0,0)_16%,rgba(0,0,0,0)_72%,rgba(3,5,10,0.24)_85%),radial-gradient(50%_50%_at_50%_42%,rgba(112,215,255,0.06)_0%,rgba(0,0,0,0)_65%),radial-gradient(50%_50%_at_50%_44%,rgba(0,0,0,0)_18%,rgba(3,5,10,0.55)_80%),linear-gradient(0deg,rgba(3,5,10,0.48)_0%,rgba(3,5,10,0.48)_100%)]" />
          )}
          {/* Figma frame overlay */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt=""
            aria-hidden="true"
            src="/figmaAssets/container.svg"
          />
          {/* Bottom fade into the next section. Dark mode: unchanged, still
              bridges into the dark section below. Light mode: pulled back
              a second time — the previous pass (peaking at 0.88 opacity)
              still read as a heavy white fog. Peak dropped to 0.30 and the
              whole thing shortened, so it's barely a whisper of atmosphere
              by the time it reaches the frame's real bottom edge (this div
              sits inside the 90px-overhanging wrapper above, so only the
              gradient's first ~70% is ever visible at rest — the last
              stretch is a scroll-only safety margin, not something you
              normally see). */}
          {false ? (
            <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[linear-gradient(180deg,rgba(248,251,255,0)_0%,rgba(203,225,240,0.08)_50%,rgba(226,240,250,0.16)_78%,rgba(248,251,255,0.30)_100%)]" />
          ) : (
            <div className="absolute inset-x-0 bottom-0 h-[300px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(3,5,10,0.28)_30%,rgba(3,5,10,0.70)_60%,rgba(3,5,10,0.93)_82%,rgba(3,5,10,1)_100%)]" />
          )}
        </div>

        {/* Transparent Figma-derived depth field over the original photograph. */}
        <GalaxyStarCanvas isDark={!isLight} progressRef={scrollProgressRef} />
        {/* ── Layer 4 – Shooting stars ── restored for light mode per explicit
              request: an earlier pass disabled this entirely in light mode
              (reasoning: "a bright white streak doesn't fit a calm pale-sky
              light mode"), which was a one-sided design call, not a bug. Now
              themed instead of removed — same component, a deeper blue in
              light mode instead of white. ── */}
        {!isMobile && <ShootingStars className="z-[4]" variant={isLight ? "light" : "dark"} />}

        {/* ── Layer 4.5 – Light-mode-only transition layer ──────────────────
              A dedicated blend into the stripe below, separate from the
              internal image fade above (Layer 1's own bottom fade, which
              lives inside the parallax-transformed wrapper and exists mainly
              to cover that layer's own edge during scroll). This one is a
              plain, non-parallax sibling — it stays put regardless of scroll
              position, sits above the stars so their field settles into it
              rather than cutting off abruptly, and stays under the text/
              buttons (z-10) so nothing about the content changes.
              Taller and a bit more present than the first pass (170px/0.20
              peak): that version was too faint to register as an actual
              gradient against the already-pale hero bottom — it just read as
              a hard cut with nothing bridging it. This one has a genuinely
              graduated curve (five stops instead of four, each one a
              deliberate step) so the eye can follow the blend, while the
              final stop still stays soft rather than opaque. The stripe
              below carries a matching gradient of its own at its top edge —
              the two are designed to meet in the middle, not do the whole
              job from one side. */}
        {false && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[220px] bg-[linear-gradient(180deg,rgba(248,251,255,0)_0%,rgba(219,234,254,0.10)_35%,rgba(203,225,240,0.18)_60%,rgba(219,234,254,0.26)_82%,rgba(240,248,255,0.34)_100%),radial-gradient(75%_100%_at_50%_100%,rgba(56,189,248,0.07)_0%,rgba(56,189,248,0)_65%)]"
          />
        )}

        {/* ── Layer 5 – Hero text content (parallax upward + fade) ─────────── */}
        <div
          className="home-hero-content relative z-10 flex min-h-[730px] flex-col items-center justify-center px-6 pb-[120px] pt-[140px] text-center sm:px-10 md:min-h-screen lg:px-16"
        >
          <div className="flex max-w-[872px] flex-col items-center pb-7">
            <h1
              className="relative mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-center text-[48px] font-semibold leading-[0.96] tracking-[-1.8px] text-[#f5f7fa] transition-colors sm:text-[72px] sm:tracking-[-2.4px] lg:text-[112px] lg:tracking-[-3.36px]"
            >
              {t.heading}
            </h1>
          </div>
          <div className="flex flex-col items-center pb-[22px]">
            <p
              className="relative mt-[-1.00px] max-w-[620px] [font-family:'Inter',Helvetica] text-center text-[16px] font-normal leading-[28px] tracking-[0.10px] text-[#f5f7faad] transition-colors sm:text-[19.9px] sm:leading-[33.9px]"
            >
              {t.description}
            </p>
          </div>
          <div className="flex items-center gap-1.5 pb-9">
            <span
              className="relative mt-[-1.00px] w-fit whitespace-nowrap [font-family:'Inter',Helvetica] text-center text-[15px] font-normal leading-[22.5px] tracking-[0.38px] text-[#f5f7fa61] transition-colors"
            >
              {t.weCreate}
            </span>
            <span
              className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-center text-[15px] font-medium leading-[22.5px] tracking-[0.38px] whitespace-nowrap transition-colors"
              style={{ color: "var(--hero-eyebrow-text-fixed)", textShadow: "var(--hero-eyebrow-text-fixed-shadow)" }}
            >
              {t.digitalExperiences}
            </span>
            <span
              className="h-[15.75px] w-[1.5px] rounded-[1px] transition-colors"
              style={{ backgroundColor: "var(--hero-eyebrow-text-fixed)" }}
              aria-hidden="true"
            />
          </div>
          <div className="inline-flex flex-wrap items-center justify-center gap-3.5">
            <Button
              type="button"
              onClick={openProjectModal}
              data-testid="button-hero-start-project"
              className={`h-auto rounded-full px-[30px] py-[15.75px] transition-colors ${
                isLight
                  ? "bg-[#0b0f1a] shadow-[0px_4px_20px_rgba(2,6,23,0.25),0px_0px_28px_rgba(2,6,23,0.10)] hover:bg-[#141a2b]"
                  : "bg-[#f5f7fa] shadow-[0px_4px_20px_#00000052,0px_0px_32px_#f5f7fa1c] hover:bg-[#f5f7fa]"
              }`}
            >
              <span
                className={`relative w-fit [font-family:'Inter',Helvetica] text-center text-[15px] font-medium leading-[22.5px] tracking-[0.15px] whitespace-nowrap ${
                  isLight ? "text-[#f5f7fa]" : "text-[#080b12]"
                }`}
              >
                {common.actions.startAProject}
              </span>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`h-auto rounded-full border-[0.8px] px-[30px] py-[15.75px] transition-colors ${
                isLight
                  ? "border-[rgba(15,23,42,0.14)] bg-white/70 text-[#0f172a] shadow-[0px_2px_10px_rgba(15,23,42,0.08)] hover:bg-white/85 hover:text-[#0f172a]"
                  : "border-[#f5f7fa33] bg-[#f5f7fa12] text-[#f5f7fa] hover:bg-[#f5f7fa1a] hover:text-[#f5f7fa]"
              }`}
            >
              <Link href="/work" data-testid="button-hero-view-work">
                <span className="relative w-fit [font-family:'Inter',Helvetica] text-center text-[15px] font-normal leading-[22.5px] tracking-[0.15px] whitespace-nowrap">
                  {common.actions.viewOurWork}
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Scroll indicator (fades as user begins scrolling) ────────────── */}
        <div
          data-home-scroll-hint
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-1.5"
        >
          <p
            className="relative mt-[-1.00px] w-fit whitespace-nowrap [font-family:'Inter',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1.40px] text-[#f5f7fa59] transition-colors"
          >
            {t.scrollToExplore}
          </p>
          {/* Inline replacement for the old <img src="container-1.svg">: a
              plain <img> can't be recolored by CSS, and this needs a real
              color swap (not a blanket invert) for light mode. */}
          <svg width="12" height="36" viewBox="0 0 12 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none" aria-hidden="true">
            <rect width="1" height="20" transform="translate(5.5)" fill="url(#hero-scroll-indicator-gradient)" />
            <path
              d="M3 28.5L6 31.5L9 28.5"
              stroke={isLight ? "#0f172a" : "#F5F7FA"}
              strokeOpacity={isLight ? 0.55 : 0.28}
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="hero-scroll-indicator-gradient" x1="0.5" y1="0" x2="0.5" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor={isLight ? "#0f172a" : "#F5F7FA"} stopOpacity="0" />
                <stop offset="1" stopColor={isLight ? "#0f172a" : "#F5F7FA"} stopOpacity={isLight ? 0.55 : 0.28} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
