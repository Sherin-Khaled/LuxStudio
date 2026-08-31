import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type Star = {
  x: number;
  y: number;
  depth: number;
  size: number;
  alpha: number;
  tint: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Stable pseudo-random values keep the field from reshuffling on theme or
// language changes while avoiding a large texture download.
const random = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const createStars = (count: number): Star[] =>
  Array.from({ length: count }, (_, index) => ({
    x: random(index + 11),
    y: random(index + 83),
    depth: 0.2 + random(index + 191) * 0.8,
    size: 0.45 + random(index + 277) * 1.75,
    alpha: 0.28 + random(index + 349) * 0.7,
    tint: random(index + 419),
  }));

/**
 * Home-only 2.5D galaxy. The supplied Milky Way image establishes the visual
 * composition; independently projected star layers, scroll-depth travel,
 * atmospheric gradients and damped pointer parallax provide spatial motion.
 * Canvas state stays in refs/local variables, so animation frames never cause
 * React renders.
 */
export const HomeMotionEnvironment = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const image = new Image();
    image.decoding = "async";
    image.src = "/figmaAssets/imagewithfallback.webp";

    let width = 1;
    let height = 1;
    let frame = 0;
    let lastFrame = 0;
    let visible = !document.hidden;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const compact = window.innerWidth < 768;
    const tablet = window.innerWidth < 1100;
    const stars = createStars(compact ? 72 : tablet ? 125 : 190);

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now());
    };

    const draw = (time: number) => {
      const isLight = theme === "light";
      // Scroll depth is owned by the Home GSAP timeline. The canvas draws a
      // stable frame and that single timeline transforms the canvas layer.
      const progress = reduced ? 0.16 : 0;
      easedX += (pointerX - easedX) * 0.035;
      easedY += (pointerY - easedY) * 0.035;

      context.globalCompositeOperation = "source-over";
      context.fillStyle = isLight ? "#edf7ff" : "#02050b";
      context.fillRect(0, 0, width, height);

      if (image.complete && image.naturalWidth) {
        const baseScale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const zoom = 1.02 + progress * (compact ? 0.08 : 0.2);
        const drawWidth = image.naturalWidth * baseScale * zoom;
        const drawHeight = image.naturalHeight * baseScale * zoom;
        const x = (width - drawWidth) / 2 + easedX * 13;
        const y = (height - drawHeight) / 2 + easedY * 9 - progress * 22;
        context.save();
        context.globalAlpha = isLight ? 0.34 : 0.62;
        context.filter = isLight
          ? "brightness(1.55) saturate(.75) contrast(.78)"
          : "brightness(.72) saturate(1.18) contrast(1.12)";
        context.drawImage(image, x, y, drawWidth, drawHeight);
        context.restore();
      }

      const fog = context.createRadialGradient(
        width * (0.54 + easedX * 0.008),
        height * (0.46 + easedY * 0.006),
        0,
        width * 0.52,
        height * 0.48,
        Math.max(width, height) * 0.72,
      );
      fog.addColorStop(0, isLight ? "rgba(56,189,248,.20)" : "rgba(14,165,233,.17)");
      fog.addColorStop(0.4, isLight ? "rgba(99,102,241,.10)" : "rgba(37,99,235,.10)");
      fog.addColorStop(1, isLight ? "rgba(248,251,255,.72)" : "rgba(2,5,11,.82)");
      context.fillStyle = fog;
      context.fillRect(0, 0, width, height);

      const drift = reduced ? 0 : time * 0.000012;
      for (const star of stars) {
        const near = 1 - star.depth;
        const travel = progress * (0.08 + near * 0.55);
        const scale = 1 + travel;
        const baseX = (star.x - 0.5) * width;
        const baseY = (star.y - 0.5) * height;
        const x = width / 2 + baseX * scale + easedX * (3 + near * 16) + Math.sin(drift * 80 + star.x * 9) * near * 3;
        const y = height / 2 + baseY * scale + easedY * (2 + near * 12) - progress * near * 24;
        if (x < -8 || x > width + 8 || y < -8 || y > height + 8) continue;
        const radius = star.size * (0.75 + near * 0.8) * (1 + progress * near * 0.55);
        const alpha = star.alpha * (isLight ? 0.65 : 1);
        context.beginPath();
        context.fillStyle = star.tint > 0.82
          ? `rgba(167,139,250,${alpha})`
          : star.tint > 0.42
            ? `rgba(112,215,255,${alpha})`
            : isLight
              ? `rgba(15,75,125,${alpha})`
              : `rgba(245,247,250,${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        if (radius > 1.45) {
          context.fillStyle = `rgba(112,215,255,${alpha * 0.11})`;
          context.fillRect(x - radius * 4, y - 0.4, radius * 8, 0.8);
        }
      }

      const vignette = context.createRadialGradient(width / 2, height / 2, height * 0.12, width / 2, height / 2, Math.max(width, height) * 0.72);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, isLight ? "rgba(130,180,215,.18)" : "rgba(0,2,8,.58)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      if (!visible) return;
      // Compact layouts run at about 30fps; desktop keeps the full cadence.
      if (!compact || time - lastFrame > 30) {
        draw(time);
        lastFrame = time;
      }
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (coarse || reduced) return;
      pointerX = clamp(event.clientX / Math.max(width, 1), 0, 1) * 2 - 1;
      pointerY = clamp(event.clientY / Math.max(height, 1), 0, 1) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const onVisibility = () => {
      visible = !document.hidden;
      cancelAnimationFrame(frame);
      if (visible && !reduced) frame = requestAnimationFrame(render);
    };

    resize();
    image.addEventListener("load", () => draw(performance.now()), { once: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, theme]);

  return (
    <div className="home-motion-environment" aria-hidden="true">
      <canvas ref={canvasRef} className="home-motion-canvas" />
      <div className="home-motion-glow home-motion-glow--blue" />
      <div className="home-motion-glow home-motion-glow--violet" />
      <div className="home-motion-noise" />
    </div>
  );
};
