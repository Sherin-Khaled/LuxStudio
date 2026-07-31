import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface StarDot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  cyan: boolean;
}

function buildStars(count: number, seedOffset: number): StarDot[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + seedOffset;
    return {
      id: i,
      x: sr(s * 3) * 100,
      y: sr(s * 3 + 1) * 100,
      size: 1 + sr(s * 3 + 2) * 2,
      opacity: 0.35 + sr(s * 7) * 0.5,
      duration: 5 + sr(s * 11) * 7,
      delay: sr(s * 13) * 8,
      cyan: sr(s * 17) > 0.78,
    };
  });
}

interface SideStarsProps {
  className?: string;
  starsPerSide?: number;
  // Defaults to the site's one existing look (white/cyan on dark) — every
  // current call site keeps that exact appearance unless it opts in to
  // "light" explicitly, which is what the light-mode hero does.
  // "light-accent" is a second light-mode option: both tiers render in
  // blue/cyan instead of "light"'s dark-slate tier — for placements like the
  // hero, where stars sit over a bright sky photo rather than a plain pale
  // page background, and a dark-slate dot reads as near-black instead of
  // "subtle."
  variant?: "dark" | "light" | "light-accent";
}

export const SideStars = ({ className = "", starsPerSide = 18, variant = "dark" }: SideStarsProps) => {
  const isLight = variant === "light" || variant === "light-accent";
  const isLightAccent = variant === "light-accent";
  const reduced = useReducedMotion();
  const leftStars = useMemo(() => buildStars(starsPerSide, 0), [starsPerSide]);
  const rightStars = useMemo(() => buildStars(starsPerSide, 100), [starsPerSide]);

  const renderStars = (stars: StarDot[]) =>
    stars.map((s) => {
      // Same re-tuning as StarsBackground: the "white" tier becomes a soft
      // dark slate against a pale sky, and opacity is scaled down overall
      // so light mode stays calm rather than noisy. "light-accent" skips the
      // slate tier entirely — both tiers stay blue/cyan, just two shades.
      const color = isLightAccent
        ? s.cyan ? "#0284c7" : "#38bdf8"
        : isLight
          ? (s.cyan ? "#3b82f6" : "#475569")
          : s.cyan ? "#70d7ff" : "#ffffff";
      const glowColor = isLightAccent
        ? s.cyan ? "rgba(2,132,199,0.38)" : "rgba(56,189,248,0.34)"
        : isLight
          ? s.cyan
            ? "rgba(59,130,246,0.32)"
            : "rgba(71,85,105,0.22)"
          : s.cyan
            ? "rgba(112,215,255,0.5)"
            : "rgba(255,255,255,0.35)";
      // "light-accent" was still falling into the same 0.65 dampening as
      // plain "light" here — the color swap to blue/cyan alone couldn't fix
      // visibility while opacity was still being cut by a third on top of
      // it. "light-accent" now keeps full opacity, same as dark mode: the
      // whole point of this variant is to stay clearly visible against the
      // photo, not to be calm/muted like the plain "light" variant is
      // elsewhere on the page.
      const opacity = isLightAccent ? s.opacity : isLight ? s.opacity * 0.65 : s.opacity;
      return (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: s.size > 1.8 ? `0 0 ${s.size * 2.5}px ${s.size}px ${glowColor}` : undefined,
            ["--s-op" as string]: opacity,
            opacity,
            animation: reduced
              ? undefined
              : `lux-side-drift ${s.duration}s ${s.delay}s linear infinite`,
            willChange: reduced ? undefined : "transform, opacity",
          }}
        />
      );
    });

  return (
    <>
      <style>{`
        @keyframes lux-side-drift {
          0%   { opacity: 0;               transform: translateY(0); }
          8%   { opacity: var(--s-op); }
          88%  { opacity: var(--s-op); }
          100% { opacity: 0;               transform: translateY(-260px); }
        }
      `}</style>

      {/* Left column */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 top-0 overflow-hidden ${className}`}
        style={{ width: "clamp(100px, 13vw, 180px)" }}
      >
        {renderStars(leftStars)}
      </div>

      {/* Right column */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 top-0 overflow-hidden ${className}`}
        style={{ width: "clamp(100px, 13vw, 180px)" }}
      >
        {renderStars(rightStars)}
      </div>
    </>
  );
};
