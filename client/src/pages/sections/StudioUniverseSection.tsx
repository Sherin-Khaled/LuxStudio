import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { DottedSphere } from "@/components/backgrounds/DottedSphere";
import { useTheme } from "@/contexts/ThemeContext";

const LAYERS = ["Strategy", "Design", "Content", "Motion", "Systems", "Performance"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Orbit positions for the desktop floating pills — evenly spaced around the
   sphere starting at the top, computed once (angles never change, only the
   sphere behind them keeps rotating independently). */
function useOrbitPositions(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        return {
          left: `${50 + Math.cos(angle) * 46}%`,
          top: `${50 + Math.sin(angle) * 46}%`,
        };
      }),
    [count],
  );
}

/* ─────────── Tiny constellation of moving stars around each badge ─────────── */

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

type StarAnim = "drift" | "float" | "orbit" | "pulse";
const STAR_ANIMS: StarAnim[] = ["drift", "float", "orbit", "pulse"];

interface BadgeStar {
  leftPct: number;
  topPct: number;
  size: number;
  colorRGB: string;
  isAccent: boolean;
  anim: StarAnim;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  floatY: number;
  orbitR: number;
  baseOpacity: number;
}

/* Positions scatter just outside the pill's own silhouette in two loose
   shells (an inner and outer radius band) rather than one ring, so a denser
   count still reads as a dimensional scatter instead of a halo. Base angles
   are spaced evenly around the full circle with only a small jitter — with
   this many points, even spacing is what keeps every side of the badge
   covered; heavy jitter is what caused the lopsided look at lower counts.
   Each star gets its own animation type/timing so they never move in
   lockstep — a small "living constellation," not a synced sparkle ring.
   Deterministic per badge (seeded), so it doesn't reshuffle on re-render. */
function generateBadgeStars(seedBase: number, count: number, whiteRGB: string): BadgeStar[] {
  return Array.from({ length: count }, (_, i) => {
    const s = seedBase * 97 + i * 13;
    const angle = (i / count) * Math.PI * 2 + (seededRandom(s + 1) - 0.5) * 0.5;
    const shell = i % 2 === 0 ? 44 + seededRandom(s + 2) * 16 : 66 + seededRandom(s + 2) * 20; // % — inner/outer band, just past the pill's edge
    const roll = seededRandom(s + 3);
    const isAccent = roll > 0.8;
    const colorRGB = roll > 0.92 ? whiteRGB : roll > 0.66 ? "139,92,246" : "56,189,248";

    return {
      leftPct: 50 + Math.cos(angle) * shell,
      topPct: 50 + Math.sin(angle) * shell,
      size: isAccent ? 1.4 + seededRandom(s + 4) * 0.6 : 0.8 + seededRandom(s + 4) * 0.5,
      colorRGB,
      isAccent,
      anim: STAR_ANIMS[i % STAR_ANIMS.length],
      duration: 3.4 + seededRandom(s + 5) * 3.6,
      delay: -seededRandom(s + 6) * 8,
      driftX: (seededRandom(s + 7) - 0.5) * 9,
      driftY: (seededRandom(s + 8) - 0.5) * 9,
      floatY: 4 + seededRandom(s + 9) * 4,
      orbitR: 2.5 + seededRandom(s + 10) * 2.5,
      baseOpacity: isAccent ? 0.6 + seededRandom(s + 11) * 0.2 : 0.38 + seededRandom(s + 11) * 0.2,
    };
  });
}

interface LayerBadgeProps {
  label: string;
  seed: number;
  variant: "orbit" | "inline";
  style?: CSSProperties;
  reduced: boolean;
  isActive: boolean;
  isLight: boolean;
  onHoverChange: (hovering: boolean) => void;
}

const LayerBadge = ({ label, seed, variant, style, reduced, isActive, isLight, onHoverChange }: LayerBadgeProps): JSX.Element => {
  const starCount = 10 + (seed % 4); // 10–13 stars per badge — a clearly visible mini constellation
  // Softer than near-black: a dark slate-blue reads as premium rather than
  // heavy, while still standing out from the pale background.
  const whiteRGB = isLight ? "51,65,85" : "255,255,255";
  const stars = useMemo(() => generateBadgeStars(seed, starCount, whiteRGB), [seed, starCount, whiteRGB]);

  const base =
    variant === "orbit"
      ? "lux-badge pointer-events-auto absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      : "lux-badge relative inline-flex items-center justify-center";

  return (
    <span
      className={isActive ? `${base} lux-badge--active` : base}
      style={style}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="lux-badge-star pointer-events-none absolute rounded-full"
          style={{
            left: `${star.leftPct}%`,
            top: `${star.topPct}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: `rgb(${star.colorRGB})`,
            boxShadow: star.isAccent ? `0 0 ${star.size * 3}px rgba(${star.colorRGB},0.65)` : undefined,
            animation: reduced ? undefined : `lux-badge-star-${star.anim} ${star.duration}s ${star.delay}s ease-in-out infinite`,
            ["--star-base-opacity" as string]: star.baseOpacity,
            ["--star-drift-x" as string]: `${star.driftX}px`,
            ["--star-drift-y" as string]: `${star.driftY}px`,
            ["--star-float-y" as string]: `-${star.floatY}px`,
            ["--star-orbit-r" as string]: `${star.orbitR}px`,
          }}
        />
      ))}
      <span
        className={`lux-badge-pill relative z-10 inline-flex items-center rounded-full border px-4 py-1.5 [font-family:'Inter',Helvetica] text-[12px] font-medium tracking-[0.1px] backdrop-blur-sm transition-all duration-300 ${
          isLight
            // Root cause of "hover/active isn't obvious": this default state
            // used to already carry a blue border/bg/shadow (all three tinted
            // rgba(2,132,199,...)), so the hover/active rule below only ever
            // had to nudge an already-blue pill slightly bluer. Default is
            // now genuinely neutral (white/near-white, dark navy text, no
            // blue anywhere) so hover/active is the first and only place
            // blue appears.
            ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.82)] text-[rgba(15,23,42,0.78)] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
            : "border-[#ffffff14] bg-[#ffffff06] text-[#f5f7fac2] shadow-[0_4px_18px_rgba(0,0,0,0.25)]"
        }`}
      >
        {label}
      </span>
    </span>
  );
};

const AUTO_CYCLE_MS = 2000;

export const StudioUniverseSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const orbitPositions = useOrbitPositions(LAYERS.length);

  // Auto-highlight sequence: one badge "active" at a time, advancing every
  // 2s and wrapping back to the first. Manual hover pauses the interval
  // entirely (rather than letting it advance underneath the user) and
  // suppresses the auto-active badge's own highlight, so only the badge
  // actually under the cursor glows — CSS still shows that one via its own
  // :hover rule regardless of `isActive`. Leaving resumes with a fresh full
  // interval on whatever badge was already active, rather than picking up
  // mid-countdown.
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (reduced || isHovering) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LAYERS.length);
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, isHovering]);

  const handleHoverChange = useCallback((hovering: boolean) => {
    setIsHovering(hovering);
  }, []);

  return (
    <section
      className={`relative w-full py-24 transition-colors lg:py-32 ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}
      aria-labelledby="studio-universe-heading"
    >
      {/* Scoped keyframes + hover/opacity wiring for the badge constellations.
          "Engaged" (glowing) state is driven by a real :hover match OR the
          .lux-badge--active class the auto-cycle JS toggles — one rule per
          property, listing both selectors, so manual hover and the automatic
          sequence produce byte-for-byte the same visual result instead of
          two effects that could drift apart over time.

          Star opacity is driven by the --star-base-opacity custom property
          rather than inline `opacity` directly, and the engaged rule
          *redefines that property* (not opacity itself) via a separate
          hover-multiplier variable — a star's own opacity keeps animating
          (the pulse keyframe also reads opacity), and a running animation's
          computed value would otherwise ignore a plain opacity override
          entirely. A *second* variable that both the resting rule and the
          pulse keyframe multiply by avoids that, and also avoids a
          self-referencing `--x: calc(var(--x) * n)` redefinition, which
          browsers treat as a dependency cycle and invalidate outright
          (verified empirically — it silently resolves to nothing, not the
          intended brighter value). */}
      <style>{`
        .lux-badge-star {
          --star-hover-mult: 1;
          opacity: calc(var(--star-base-opacity, 0.4) * var(--star-hover-mult));
          transition: opacity 300ms ease;
        }
        .lux-badge:hover .lux-badge-star,
        .lux-badge--active .lux-badge-star {
          --star-hover-mult: 1.8;
        }
        .lux-badge:hover .lux-badge-pill,
        .lux-badge--active .lux-badge-pill {
          ${isLight ? `
          border-color: rgba(14,165,233,0.45);
          background-color: rgba(224,246,255,0.92);
          color: #0284c7;
          box-shadow: 0 0 28px rgba(14,165,233,0.28), 0 16px 42px rgba(2,132,199,0.14);
          transform: translateY(-3px) scale(1.04);
          ` : `
          border-color: #38bdf866;
          background-color: #38bdf812;
          color: #f5f7fa;
          box-shadow: 0 0 24px rgba(56,189,248,0.3);
          `}
        }
        @keyframes lux-badge-star-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--star-drift-x), var(--star-drift-y)); }
        }
        @keyframes lux-badge-star-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--star-float-y)); }
        }
        @keyframes lux-badge-star-orbit {
          from { transform: rotate(0deg) translateX(var(--star-orbit-r)); }
          to   { transform: rotate(360deg) translateX(var(--star-orbit-r)); }
        }
        @keyframes lux-badge-star-pulse {
          0%, 100% { opacity: calc(var(--star-base-opacity, 0.4) * var(--star-hover-mult, 1)); transform: scale(1); }
          50% { opacity: calc(var(--star-base-opacity, 0.4) * var(--star-hover-mult, 1) * 0.35); transform: scale(0.7); }
        }
      `}</style>

      {/* Light-mode-only echo of Offerings' bottom-right glow. Root-cause fix:
          this used to live inside the "overflow-hidden" wrapper below (meant
          only to contain the OTHER, non-bleeding glows), which silently
          clipped it right at this section's own top edge — no tuning of its
          position could ever make it visible past the boundary while it sat
          inside that wrapper. It's now a direct section child instead, and
          the section itself no longer carries its own overflow-hidden
          either (nothing else here relied on it — the inner wrapper still
          clips the other three glows exactly as before). Offset by a fixed
          pixel amount rather than a %-of-height: Offerings' own height comes
          from its GSAP pin (viewport-driven) while this section's height is
          content-driven — the two never scale together, so matching by
          percentage only ever lined up by coincidence at one viewport size.
          Opacity raised from ~0.05 to 0.10 to match Offerings' own glow
          exactly, so the two read as one continuous wash, not two different
          intensities meeting at a seam. */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[180px] right-[-10%] h-[560px] w-[560px] rounded-full bg-[#7c3aed1a] blur-[130px]"
        />
      )}

      {/* Atmospheric glows — same established palette as the rest of the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute left-1/2 top-[38%] h-[60vw] w-[60vw] max-h-[820px] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[170px] ${isLight ? "bg-[#1d4ed814]" : "bg-[#1d4ed822]"}`} />
        <div className={`absolute left-[18%] top-[62%] h-[380px] w-[380px] rounded-full blur-[130px] ${isLight ? "bg-[#7c3aed0d]" : "bg-[#7c3aed14]"}`} />
        <div className={`absolute right-[14%] top-[20%] h-[300px] w-[300px] rounded-full blur-[110px] ${isLight ? "bg-[#38bdf80d]" : "bg-[#38bdf814]"}`} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col items-center px-6 sm:px-8 lg:px-11">
        {/* Header — centered, matching the page's text-block conventions */}
        <motion.div
          variants={fadeUp}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex max-w-[720px] flex-col items-center text-center"
        >
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.8px] opacity-90 uppercase ${isLight ? "text-[#0284c7]" : "text-[#38bdf8]"}`}>
            Studio Universe
          </p>
          <h2
            id="studio-universe-heading"
            className={`pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-medium leading-[1.08] tracking-[-1px] sm:text-[44px] lg:text-[54px] lg:tracking-[-1.6px] ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            Every layer works inside one system.
          </h2>
          <p className={`max-w-[560px] pt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] sm:text-[16px] sm:leading-[27px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
            Strategy, content, design, development, motion, systems,
            performance, and launch all connect to create digital experiences
            that feel intentional and ready to grow.
          </p>
          <Link href="/services">
            <button
              type="button"
              data-testid="button-studio-universe-explore"
              className={`group mt-7 inline-flex items-center gap-2 rounded-full border px-6 py-3 [font-family:'Inter',Helvetica] text-[14px] font-medium backdrop-blur-sm transition-colors duration-300 ${
                isLight
                  ? "border-[rgba(15,23,42,0.12)] bg-[rgba(15,23,42,0.03)] text-[#0f172a] hover:border-[#0284c74a] hover:bg-[#0284c70f]"
                  : "border-[#ffffff1a] bg-[#ffffff08] text-[#f5f7fa] hover:border-[#38bdf84a] hover:bg-[#38bdf80f]"
              }`}
            >
              Explore the layers
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </Link>
        </motion.div>

        {/* Sphere stage — the dotted globe plus its orbiting layer labels */}
        <motion.div
          variants={fadeUp}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-16 w-full max-w-[620px] lg:mt-20"
        >
          <div className="relative mx-auto aspect-square w-[clamp(280px,72vw,520px)]">
            <DottedSphere className="h-full w-full" variant={isLight ? "light" : "dark"} />

            {/* Desktop: labels orbiting the sphere at fixed points in space */}
            <div className="pointer-events-none absolute inset-[-14%] hidden lg:block">
              {LAYERS.map((label, i) => (
                <LayerBadge
                  key={label}
                  label={label}
                  seed={i}
                  variant="orbit"
                  style={orbitPositions[i]}
                  reduced={reduced}
                  isActive={!isHovering && i === activeIndex}
                  isLight={isLight}
                  onHoverChange={handleHoverChange}
                />
              ))}
            </div>
          </div>

          {/* Mobile/tablet: labels as a simple wrapped row beneath the sphere */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 lg:hidden">
            {LAYERS.map((label, i) => (
              <LayerBadge
                key={label}
                label={label}
                seed={i}
                variant="inline"
                reduced={reduced}
                isActive={!isHovering && i === activeIndex}
                isLight={isLight}
                onHoverChange={handleHoverChange}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
