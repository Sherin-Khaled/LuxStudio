import { useEffect, useRef, type MutableRefObject } from "react";

interface StarDot {
  nx: number;
  ny: number;
  size: number;
  opacity: number;
  layer: 0 | 1 | 2 | 3;
  cyan: boolean;
  rect: boolean;
}

interface StarCounts {
  micro: number;
  haze: number;
  middle: number;
  near: number;
  foreground: number;
}

interface GalaxyStarCanvasProps {
  isDark: boolean;
  progressRef: MutableRefObject<number>;
}

const PARALLAX = [0.004, 0.011, 0.026, 0.05] as const;
const POINTER_DAMPING = 0.038;

const DESKTOP_COUNTS: StarCounts = {
  micro: 420,
  haze: 150,
  middle: 225,
  near: 90,
  foreground: 14,
};

const MOBILE_COUNTS: StarCounts = {
  micro: 160,
  haze: 60,
  middle: 100,
  near: 45,
  foreground: 0,
};

function buildStars(counts: StarCounts): StarDot[] {
  const out: StarDot[] = [];
  let seed = 2891336453;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967295;
  };

  for (let index = 0; index < counts.micro; index++) {
    const nx = random();
    const ny = random() * 0.88;
    const inBand = Math.abs(nx - 0.5) < 0.18 && ny < 0.72;
    const opacity = inBand ? random() * 0.55 + 0.08 : random() * 0.38 + 0.05;
    const size = random() * 0.22 + 0.15;
    out.push({ nx, ny, size, opacity: Math.min(opacity, 0.82), layer: 0, cyan: random() < 0.03, rect: size < 0.28 });
  }

  for (let index = 0; index < counts.haze; index++) {
    out.push({
      nx: 0.32 + random() * 0.36,
      ny: random() * random() * 0.78,
      size: random() * 0.18 + 0.12,
      opacity: random() * 0.28 + 0.04,
      layer: 0,
      cyan: random() < 0.06,
      rect: true,
    });
  }

  for (let index = 0; index < counts.middle; index++) {
    out.push({
      nx: random(), ny: random() * 0.9, size: random() * 0.38 + 0.42,
      opacity: random() * 0.52 + 0.18, layer: 1, cyan: random() < 0.07, rect: false,
    });
  }

  for (let index = 0; index < counts.near; index++) {
    out.push({
      nx: random(), ny: random() * 0.84, size: random() * 0.6 + 0.82,
      opacity: random() * 0.4 + 0.4, layer: 2, cyan: random() < 0.18, rect: false,
    });
  }

  for (let index = 0; index < counts.foreground; index++) {
    out.push({
      nx: random(), ny: random() * 0.78, size: random() * 0.8 + 1.55,
      opacity: random() * 0.28 + 0.68, layer: 3, cyan: random() < 0.32, rect: false,
    });
  }

  return out;
}

const DESKTOP_STARS = buildStars(DESKTOP_COUNTS);
const MOBILE_STARS = buildStars(MOBILE_COUNTS);

export const GalaxyStarCanvas = ({ isDark, progressRef }: GalaxyStarCanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    reducedMotion.current = motionQuery.matches;

    let width = 1;
    let height = 1;
    let stars = DESKTOP_STARS;
    let visible = true;
    let running = false;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      if (!reducedMotion.current) {
        mouse.current.x += (target.current.x - mouse.current.x) * POINTER_DAMPING;
        mouse.current.y += (target.current.y - mouse.current.y) * POINTER_DAMPING;
      }

      const dx = mouse.current.x - 0.5;
      const dy = mouse.current.y - 0.5;
      const progress = reducedMotion.current ? 0 : Math.min(1, Math.max(0, progressRef.current));
      const zoom = 1 + progress * 0.1;

      for (const star of stars) {
        const multiplier = PARALLAX[star.layer];
        const offsetX = reducedMotion.current ? 0 : dx * width * multiplier;
        const offsetY = reducedMotion.current ? 0 : dy * height * multiplier;
        const px = (0.5 + (star.nx - 0.5) * zoom) * width + offsetX;
        const py = (0.5 + (star.ny - 0.5) * zoom) * height + offsetY;
        if (px < -4 || px > width + 4 || py < -4 || py > height + 4) continue;

        const opacity = isDark ? star.opacity : star.opacity * 0.45;
        const size = star.size;

        if (star.layer === 3 && isDark) {
          const radius = size * 5.5;
          const glow = context.createRadialGradient(px, py, 0, px, py, radius);
          glow.addColorStop(0, star.cyan ? "rgba(112,215,255,0.50)" : "rgba(220,240,255,0.42)");
          glow.addColorStop(0.4, star.cyan ? "rgba(80,190,255,0.14)" : "rgba(180,220,255,0.10)");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          context.save();
          context.globalAlpha = opacity;
          context.fillStyle = glow;
          context.beginPath();
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }

        if (star.layer === 2 && isDark) {
          const radius = size * 2.8;
          const glow = context.createRadialGradient(px, py, 0, px, py, radius);
          glow.addColorStop(0, star.cyan ? "rgba(112,215,255,0.30)" : "rgba(210,235,255,0.25)");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          context.save();
          context.globalAlpha = opacity * 0.65;
          context.fillStyle = glow;
          context.beginPath();
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }

        context.save();
        context.globalAlpha = opacity;
        context.fillStyle = isDark
          ? star.cyan ? "#7AD8FF" : star.layer >= 2 ? "#F2F8FF" : star.layer === 1 ? "#DCEEFF" : "#C8E0F8"
          : star.cyan ? "#0E5CB8" : "#1A3870";

        if (star.rect) {
          const rx = Math.round(px * 2) / 2;
          const ry = Math.round(py * 2) / 2;
          context.fillRect(rx - 0.5, ry - 0.5, 1, 1);
        } else {
          context.beginPath();
          context.arc(px, py, size, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
    };

    const frame = () => {
      if (!visible || reducedMotion.current) {
        running = false;
        return;
      }
      draw();
      rafRef.current = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || reducedMotion.current) return;
      running = true;
      rafRef.current = window.requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = width < 768 ? MOBILE_STARS : DESKTOP_STARS;
      draw();
    };

    const onMouseMove = (event: MouseEvent) => {
      if (coarsePointer.matches || width < 768 || reducedMotion.current) return;
      target.current = {
        x: event.clientX / Math.max(window.innerWidth, 1),
        y: event.clientY / Math.max(window.innerHeight, 1),
      };
    };

    const onMouseLeave = () => {
      target.current = { x: 0.5, y: 0.5 };
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
      if (event.matches) {
        window.cancelAnimationFrame(rafRef.current);
        running = false;
        mouse.current = { x: 0.5, y: 0.5 };
        target.current = { x: 0.5, y: 0.5 };
        draw();
      } else {
        start();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        draw();
        start();
      } else {
        window.cancelAnimationFrame(rafRef.current);
        running = false;
      }
    });

    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    motionQuery.addEventListener("change", onMotionChange);
    resize();
    start();

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      running = false;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [isDark, progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-galaxy-star-canvas="true"
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
    />
  );
};
