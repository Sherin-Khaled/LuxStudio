import { useReducedMotion } from "framer-motion";

const CYCLE = 9; // seconds — total cycle per star
const DURATION_FRACTION = 0.165; // fraction of cycle that is the actual shot

const shooters = [
  { id: 1, top: "56%", right: "28%", delay: 0 },
  { id: 2, top: "70%", right: "52%", delay: 3 },
  { id: 3, top: "62%", right: "10%", delay: 6 },
];

interface ShootingStarsProps {
  className?: string;
}

export const ShootingStars = ({ className = "" }: ShootingStarsProps) => {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const shotPct = DURATION_FRACTION * 100;

  return (
    <>
      <style>{`
        @keyframes lux-shoot {
          0% {
            transform: translate(0, 0) rotate(-30deg);
            opacity: 0;
          }
          ${(shotPct * 0.12).toFixed(2)}% {
            opacity: 1;
          }
          ${shotPct.toFixed(2)}% {
            transform: translate(-480px, 240px) rotate(-30deg);
            opacity: 0;
          }
          100% {
            transform: translate(-480px, 240px) rotate(-30deg);
            opacity: 0;
          }
        }

        .lux-ss-wrap {
          position: absolute;
          pointer-events: none;
          overflow: hidden;
          inset: 0;
        }

        .lux-ss {
          position: absolute;
          display: block;
          width: 2.5px;
          height: 2.5px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 4px 1.5px rgba(255, 255, 255, 0.9),
            0 0 10px 3px rgba(112, 215, 255, 0.35);
          animation: lux-shoot ${CYCLE}s linear infinite;
          will-change: transform, opacity;
        }

        .lux-ss::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          width: 130px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.75) 0%,
            rgba(112, 215, 255, 0.2) 55%,
            transparent 100%
          );
          border-radius: 0 1px 1px 0;
        }
      `}</style>

      <div className={`lux-ss-wrap ${className}`} aria-hidden="true">
        {shooters.map((s) => (
          <span
            key={s.id}
            className="lux-ss"
            style={{
              top: s.top,
              right: s.right,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};
