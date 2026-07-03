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
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3) * 100,
    y: seededRandom(i * 3 + 1) * 100,
    size: 0.5 + seededRandom(i * 3 + 2) * 1.2,
    opacity: 0.25 + seededRandom(i * 7) * 0.55,
    duration: 2.5 + seededRandom(i * 5) * 3.5,
    delay: seededRandom(i * 11) * 4,
  }));
}

interface StarsBackgroundProps {
  count?: number;
  className?: string;
}

export const StarsBackground = ({
  count = 70,
  className = "",
}: StarsBackgroundProps) => {
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
      `}</style>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: star.size > 1.2
                ? `0 0 ${star.size * 2}px ${star.size}px rgba(255,255,255,0.3)`
                : undefined,
              ["--star-opacity" as string]: star.opacity,
              opacity: star.opacity,
              animation: reduced
                ? undefined
                : `lux-star-twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
              willChange: reduced ? undefined : "opacity, transform",
            }}
          />
        ))}
      </div>
    </>
  );
};
