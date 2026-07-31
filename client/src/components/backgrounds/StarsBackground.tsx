import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftSize: number;
  driftStartX: number;
  driftStartY: number;
  driftEndX: number;
  driftEndY: number;
  driftDuration: number;
  driftDelay: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const driftEndX = -12 + seededRandom(i * 17 + 3) * 24;

    return {
      id: i,
      x: seededRandom(i * 3) * 100,
      y: seededRandom(i * 3 + 1) * 100,
      size: 0.5 + seededRandom(i * 3 + 2) * 1.2,
      opacity: 0.25 + seededRandom(i * 7) * 0.55,
      duration: 2.5 + seededRandom(i * 5) * 3.5,
      delay: seededRandom(i * 11) * 4,
      driftSize: 1 + seededRandom(i * 31 + 11) * 2.2,
      driftStartX: driftEndX * -0.35,
      driftStartY: 18 + seededRandom(i * 37 + 13) * 22,
      driftEndX,
      driftEndY: -48 - seededRandom(i * 19 + 5) * 32,
      driftDuration: 12 + seededRandom(i * 23 + 7) * 16,
      driftDelay: seededRandom(i * 29 + 9) * 18,
    };
  });
}

interface StarsBackgroundProps {
  count?: number;
  className?: string;
  motion?: "twinkle" | "drift";
  mobileCount?: number;
  tabletCount?: number;
  // Defaults to the site's one existing look (white/cyan on dark) — every
  // current call site keeps that exact appearance unless it opts in to
  // "light" explicitly, which is what the light-mode hero does.
  variant?: "dark" | "light";
}

export const StarsBackground = ({
  count = 70,
  className = "",
  motion = "twinkle",
  mobileCount,
  tabletCount,
  variant = "dark",
}: StarsBackgroundProps) => {
  const isLight = variant === "light";
  const reduced = useReducedMotion();
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <>
      {/* Scoped keyframes for star twinkle */}
      <style>{`
        @keyframes lux-star-twinkle {
          0%, 100% { opacity: var(--star-opacity); transform: scale(1); }
          50% { opacity: calc(var(--star-opacity) * 0.35); transform: scale(0.6); }
        }

        @keyframes lux-star-drift {
          0% {
            opacity: 0;
            transform: translate3d(var(--star-drift-start-x), var(--star-drift-start-y), 0) scale(0.86);
          }
          18% {
            opacity: var(--star-opacity);
          }
          78% {
            opacity: var(--star-opacity);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--star-drift-end-x), var(--star-drift-end-y), 0) scale(1.06);
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {stars.map((star) => {
          const isDrifting = motion === "drift";
          const isAccent = isDrifting && star.id % 8 === 0;
          const isCyan = isDrifting && (isAccent ? star.id % 16 === 0 : star.id % 7 === 0);
          const normalizedOpacity = (star.opacity - 0.25) / 0.55;
          const renderedOpacity = isAccent
            ? 0.68 + normalizedOpacity * 0.2
            : isDrifting
              ? 0.35 + normalizedOpacity * 0.4
              : star.opacity;
          const renderedSize = isAccent
            ? 5 + (star.id % 3) * 0.45
            : isDrifting
              ? 2 + ((star.driftSize - 1) / 2.2) * 2
              : star.size;
          // Light mode: plain white would vanish against a pale sky, so the
          // "white" tier becomes a soft dark slate instead, and the cyan
          // accent tier stays the same hue but softer/less glowy — same
          // structure as dark mode, just re-tuned for a light background.
          const dotColor = isLight ? (isCyan ? "#3b82f6" : "#475569") : isCyan ? "#38bdf8" : "white";
          const glowColor = isLight
            ? isCyan
              ? "rgba(59,130,246,0.30)"
              : "rgba(71,85,105,0.22)"
            : isCyan
              ? "rgba(56,189,248,0.48)"
              : "rgba(255,255,255,0.42)";
          const opacityScale = isLight ? 0.7 : 1;

          return (
            <div
              key={star.id}
              className={
                tabletCount !== undefined && star.id >= tabletCount
                  ? "hidden lg:block"
                  : mobileCount !== undefined && star.id >= mobileCount
                    ? "hidden md:block"
                    : undefined
              }
              style={{
                position: "absolute",
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${renderedSize}px`,
                height: `${renderedSize}px`,
                borderRadius: "50%",
                backgroundColor: dotColor,
                boxShadow: isAccent
                  ? `0 0 14px 1px ${glowColor}`
                  : renderedSize > 2.8
                    ? `0 0 8px ${glowColor}`
                  : undefined,
                ["--star-opacity" as string]: renderedOpacity * opacityScale,
                ["--star-drift-start-x" as string]: `${star.driftStartX}px`,
                ["--star-drift-start-y" as string]: `${star.driftStartY}px`,
                ["--star-drift-end-x" as string]: `${star.driftEndX}px`,
                ["--star-drift-end-y" as string]: `${star.driftEndY}px`,
                opacity: renderedOpacity * opacityScale,
                animation: reduced
                  ? undefined
                  : motion === "drift"
                    ? `lux-star-drift ${star.driftDuration}s -${star.driftDelay}s linear infinite`
                    : `lux-star-twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
                willChange: reduced ? undefined : "opacity, transform",
              }}
            />
          );
        })}
      </div>
    </>
  );
};
