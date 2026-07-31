import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Deterministic PRNG — same technique used by the site's other particle
   layers (CosmicRevealBackground, StarsBackground), so point placement is
   stable across renders instead of reshuffling on every re-mount. */
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lux Studio's established accent palette — no pink/orange/rainbow, ever.
const BLUE = "56,189,248";
const VIOLET = "139,92,246";
const WHITE = "255,255,255";

interface SpherePoint {
  // Unit-sphere position, generated once — rotation is applied per frame
  // without ever mutating these base coordinates.
  x: number;
  y: number;
  z: number;
  colorRGB: string;
  isAccent: boolean; // the brighter, slightly larger minority (violet/white)
}

// Fibonacci sphere: places N points with near-uniform spacing over a sphere's
// surface (no clustering at the poles the way naive lat/long grids get).
function generateSpherePoints(count: number, seed: number, whiteRGB: string): SpherePoint[] {
  const rand = mulberry32(seed);
  const points: SpherePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const roll = rand();
    const isAccent = roll > 0.85; // ~15% brighter minority
    const colorRGB = roll > 0.94 ? whiteRGB : roll > 0.72 ? VIOLET : BLUE;

    points.push({ x, y, z, colorRGB, isAccent });
  }
  return points;
}

const ROTATION_SPEED = 0.08; // rad/sec — a full turn every ~78s, slow and premium
const REDUCED_ROTATION_SPEED = 0.006; // barely perceptible, but never fully static
const MAX_TILT = 0.22; // rad, cursor-driven parallax ceiling
const TILT_LERP = 0.05; // slow, weighty follow — never snaps or jitters
const HOVER_RADIUS = 42; // px, screen-space proximity for the "brighten near cursor" effect

interface DottedSphereProps {
  className?: string;
  dotCount?: number;
  // Defaults to the site's one existing look. The "white" dot tier is the
  // only thing that changes in light mode — near-white dots would fade into
  // a pale background, so they become dark navy instead for contrast, per
  // "dark navy if needed for contrast." Blue/violet stay identical in both
  // themes since those hues already read clearly on light or dark.
  variant?: "dark" | "light";
}

/**
 * A rotating sphere built from individually-placed dots (Fibonacci
 * distribution + real 3D rotation/perspective projection each frame) rather
 * than a flat CSS approximation. Auto-rotates continuously around its own Y
 * axis; on desktop, mouse position within the component adds a small,
 * heavily-smoothed tilt on top of that — the sphere never stops turning on
 * its own, the cursor only nudges its orientation.
 */
export const DottedSphere = ({ className = "", dotCount, variant = "dark" }: DottedSphereProps): JSX.Element => {
  const whiteRGB = variant === "light" ? "15,23,42" : WHITE;
  const reduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<SpherePoint[]>([]);
  const frame = useRef<number | null>(null);
  const angle = useRef(0);
  const lastFrameTime = useRef<number | null>(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });
  const hoverPoint = useRef<{ x: number; y: number } | null>(null);
  const visible = useRef(true);

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    const raf = requestAnimationFrame(check);
    const timeout = window.setTimeout(check, 150);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Pause the render loop entirely while the sphere is scrolled out of view —
  // it runs continuously (not just on hover), so this matters for a section
  // that isn't always the one currently on screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = dotCount ?? (isMobile ? 480 : 950);
    pointsRef.current = generateSpherePoints(count, 8402, whiteRGB);

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    // A layout pass (e.g. fonts/images above this section settling, or the
    // section's own fadeUp entrance transform) can land a beat after this
    // effect first runs, catching the container mid-transition and sticking
    // the wrong size for good since no resize event follows it. Two cheap
    // follow-up re-measurements catch that without any visible delay.
    const raf = requestAnimationFrame(resize);
    const timeout = window.setTimeout(resize, 200);
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const nx = (px / rect.width) * 2 - 1;
      const ny = (py / rect.height) * 2 - 1;
      tiltTarget.current = {
        x: Math.max(-1, Math.min(1, nx)) * MAX_TILT,
        y: Math.max(-1, Math.min(1, ny)) * MAX_TILT,
      };
      hoverPoint.current = { x: px, y: py };
    };
    const handleLeave = () => {
      tiltTarget.current = { x: 0, y: 0 };
      hoverPoint.current = null;
    };

    if (!isMobile) {
      container.addEventListener("mousemove", handleMove, { passive: true });
      container.addEventListener("mouseleave", handleLeave, { passive: true });
    }

    const tick = (now: number) => {
      const dt = lastFrameTime.current == null ? 16 : now - lastFrameTime.current;
      lastFrameTime.current = now;

      if (!visible.current || width === 0 || height === 0) {
        frame.current = requestAnimationFrame(tick);
        return;
      }

      const spinSpeed = reduced ? REDUCED_ROTATION_SPEED : ROTATION_SPEED;
      angle.current += (dt / 1000) * spinSpeed;

      if (!reduced) {
        tiltCurrent.current.x += (tiltTarget.current.x - tiltCurrent.current.x) * TILT_LERP;
        tiltCurrent.current.y += (tiltTarget.current.y - tiltCurrent.current.y) * TILT_LERP;
      }

      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.34;
      const FOCAL = R * 3;
      const cosY = Math.cos(angle.current);
      const sinY = Math.sin(angle.current);
      const cosTiltY = Math.cos(tiltCurrent.current.x);
      const sinTiltY = Math.sin(tiltCurrent.current.x);
      const cosTiltX = Math.cos(tiltCurrent.current.y);
      const sinTiltX = Math.sin(tiltCurrent.current.y);

      ctx.clearRect(0, 0, width, height);

      // Faint orbital guide rings, drawn behind the dots — two great circles
      // (equator + one tilted meridian) rotated the same way as the points,
      // rendered as very soft strokes rather than a full ring of dots.
      const drawRing = (tiltAroundX: number, alpha: number) => {
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          let rx = Math.cos(t);
          let ry = Math.sin(t) * Math.cos(tiltAroundX);
          let rz = Math.sin(t) * Math.sin(tiltAroundX);
          // auto-rotation + cursor tilt, same transform as the dots
          const rx1 = rx * cosY + rz * sinY;
          const rz1 = -rx * sinY + rz * cosY;
          const ry2 = ry * cosTiltX - rz1 * sinTiltX;
          const rz2 = ry * sinTiltX + rz1 * cosTiltX;
          const rx3 = rx1 * cosTiltY + rz2 * sinTiltY;
          const rz3 = -rx1 * sinTiltY + rz2 * cosTiltY;
          const scale = FOCAL / (FOCAL + (R - rz3 * R));
          const sx = cx + rx3 * R * scale;
          const sy = cy + ry2 * R * scale;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${BLUE},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };
      drawRing(Math.PI / 2, 0.07);
      drawRing(Math.PI / 6, 0.05);

      // Rotate + project every dot, then depth-sort so the back of the
      // sphere paints first and the near side paints on top of it.
      const projected = pointsRef.current.map((p) => {
        // auto-rotation around Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // cursor tilt around X
        const y2 = p.y * cosTiltX - z1 * sinTiltX;
        const z2 = p.y * sinTiltX + z1 * cosTiltX;
        // cursor tilt around Y
        const x3 = x1 * cosTiltY + z2 * sinTiltY;
        const z3 = -x1 * sinTiltY + z2 * cosTiltY;

        const depth = (z3 + 1) / 2; // 0 = far side, 1 = near side
        const scale = FOCAL / (FOCAL + (R - z3 * R));
        const sx = cx + x3 * R * scale;
        const sy = cy + y2 * R * scale;
        return { sx, sy, depth, colorRGB: p.colorRGB, isAccent: p.isAccent, z: z3 };
      });
      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const baseAlpha = 0.14 + p.depth * 0.78;
        const baseSize = (p.isAccent ? 1.7 : 1.1) + p.depth * 1.5;
        let alpha = baseAlpha;
        let size = baseSize;

        if (hoverPoint.current) {
          const dx = p.sx - hoverPoint.current.x;
          const dy = p.sy - hoverPoint.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < HOVER_RADIUS) {
            const proximity = 1 - dist / HOVER_RADIUS;
            alpha = Math.min(1, alpha + proximity * 0.4);
            size += proximity * 1.4;
          }
        }

        if (p.isAccent && p.depth > 0.55) {
          ctx.shadowBlur = size * 2.5;
          ctx.shadowColor = `rgba(${p.colorRGB},${alpha * 0.8})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${p.colorRGB},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      }
      if (frame.current != null) cancelAnimationFrame(frame.current);
      lastFrameTime.current = null;
    };
  }, [isMobile, reduced, dotCount, whiteRGB]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
