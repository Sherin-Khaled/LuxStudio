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
}

export const SideStars = ({ className = "", starsPerSide = 18 }: SideStarsProps) => {
  const reduced = useReducedMotion();
  const leftStars = useMemo(() => buildStars(starsPerSide, 0), [starsPerSide]);
  const rightStars = useMemo(() => buildStars(starsPerSide, 100), [starsPerSide]);

  const renderStars = (stars: StarDot[]) =>
    stars.map((s) => {
      const color = s.cyan ? "#70d7ff" : "#ffffff";
      const glowColor = s.cyan ? "rgba(112,215,255,0.5)" : "rgba(255,255,255,0.35)";
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
            ["--s-op" as string]: s.opacity,
            opacity: s.opacity,
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
