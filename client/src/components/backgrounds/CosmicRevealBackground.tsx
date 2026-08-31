import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/* ─── Deterministic PRNG (same technique used across the site's other
   particle layers, so results are stable across renders) ─── */
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Only white + the site's own primary accent blue (sky-400 / #38bdf8) — no
// nebula colors, no violet. Per the reference night-sky photo: plain glowing
// points of light, nothing else.
const PRIMARY_BLUE = "56,189,248";

/**
 * Paints the hidden star field — mostly crisp white pinpoints, plus a
 * smaller minority that glow in the site's primary blue — once onto a
 * canvas. Drawn a single time (on mount and on resize), never per animation
 * frame. There's no nebula/galaxy-band wash here anymore: the stars
 * themselves are the whole scene.
 */
function drawCosmicScene(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx || width === 0 || height === 0) return;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const rand = mulberry32(90210);

  // Count scales with screen area so bigger screens get a proportionally
  // rich field instead of a fixed handful of dots.
  const starCount = Math.min(2200, Math.round((width * height) / 650));

  // Preserve the established density while giving the field natural depth:
  // 55% distant stars, 30% mid-depth, and 15% foreground feature points.
  for (let i = 0; i < starCount; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const tierRoll = rand();
    const isMedium = tierRoll >= 0.55 && tierRoll < 0.85;
    const isBright = tierRoll >= 0.85;
    const sizeRoll = rand();
    const coreRadius = isBright
      ? 0.75 + sizeRoll * 0.3 + (sizeRoll > 0.94 ? 0.1 : 0)
      : isMedium
        ? 0.55 + sizeRoll * 0.2
        : 0.35 + sizeRoll * 0.15;
    const coreAlpha = isBright
      ? 0.9 + rand() * 0.1
      : isMedium
        ? 0.72 + rand() * 0.18
        : 0.5 + rand() * 0.22;
    const colorRoll = rand();
    const coreColor = colorRoll < 0.5
      ? "244,248,255"
      : colorRoll < 0.8
        ? "191,223,255"
        : colorRoll < 0.95
          ? PRIMARY_BLUE
          : "168,156,255";

    const haloRadius = coreRadius * (isBright ? 8 : isMedium ? 7.5 : 4);
    const halo = ctx.createRadialGradient(x, y, 0, x, y, haloRadius);
    const haloAlpha = isBright ? 0.3 : isMedium ? 0.18 : 0.05;
    halo.addColorStop(0, `rgba(${coreColor},${haloAlpha})`);
    halo.addColorStop(0.28, `rgba(${coreColor},${haloAlpha * 0.48})`);
    halo.addColorStop(0.68, `rgba(${coreColor},${haloAlpha * 0.12})`);
    halo.addColorStop(1, `rgba(${coreColor},0)`);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${coreColor},${coreAlpha})`;
    ctx.beginPath();
    ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255,255,255,${Math.min(1, coreAlpha + 0.12)})`;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.16, coreRadius * 0.42), 0, Math.PI * 2);
    ctx.fill();

    if (isBright && rand() < 0.45) {
      const horizontalRadius = coreRadius * 4.6;
      const verticalRadius = coreRadius * 5.8;
      const horizontalFlare = ctx.createLinearGradient(x - horizontalRadius, y, x + horizontalRadius, y);
      const verticalFlare = ctx.createLinearGradient(x, y - verticalRadius, x, y + verticalRadius);
      const flareAlpha = coreAlpha * 0.34;
      horizontalFlare.addColorStop(0, `rgba(${coreColor},0)`);
      horizontalFlare.addColorStop(0.5, `rgba(${coreColor},${flareAlpha})`);
      horizontalFlare.addColorStop(1, `rgba(${coreColor},0)`);
      verticalFlare.addColorStop(0, `rgba(${coreColor},0)`);
      verticalFlare.addColorStop(0.5, `rgba(${coreColor},${flareAlpha})`);
      verticalFlare.addColorStop(1, `rgba(${coreColor},0)`);
      ctx.save();
      ctx.strokeStyle = horizontalFlare;
      ctx.lineWidth = 0.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - horizontalRadius, y);
      ctx.lineTo(x + horizontalRadius, y);
      ctx.stroke();
      ctx.strokeStyle = verticalFlare;
      ctx.beginPath();
      ctx.moveTo(x, y - verticalRadius);
      ctx.lineTo(x, y + verticalRadius);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function sizeCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Stamp radius — small on purpose. A moving stamp accumulates coverage as
// the cursor sweeps, so it can be much smaller than a one-shot reveal
// window and still build a large cumulative patch.
const STAMP_RADIUS_BASE = 130;
const STAMP_RADIUS_LG = 155; // >=1280px
const STAMP_RADIUS_XL = 180; // >=1920px
const STAMP_PEAK_ALPHA = 0.55;
const FADE_DURATION_MS = 2800; // time to fade to FADE_FLOOR if untouched
const FADE_FLOOR = 0.02;
const CURSOR_LERP = 0.22;
const MASK_DPR = 1; // the mask only ever holds soft gradients — upscaling it during the final composite loses nothing visible
const MAX_STAMP_STEPS = 6; // interpolated sub-stamps on a fast swipe, so the trail never leaves a gap

function stampRadiusFor(width: number): number {
  if (width >= 1920) return STAMP_RADIUS_XL;
  if (width >= 1280) return STAMP_RADIUS_LG;
  return STAMP_RADIUS_BASE;
}

/**
 * Global cosmic mouse-reveal background, mounted once near the app root.
 * A hidden star field sits behind the normal page background and is
 * revealed the way a scratch card is revealed: as the cursor sweeps across
 * the screen it leaves a soft, persistent trail that lingers for a couple
 * of seconds and then fades, rather than a spotlight that only ever shows
 * whatever is directly under the cursor *right now*.
 *
 * Three canvases make this work:
 *  - `canvasRef` (visible) — the final composited output, redrawn every frame.
 *  - `sceneCanvasRef` (offscreen) — the static star field, painted once by
 *    `drawCosmicScene()` on mount/resize, never touched per-frame.
 *  - `maskCanvasRef` (offscreen) — the "scratch memory": every frame its
 *    existing alpha decays (via `destination-in`, which multiplies alpha —
 *    pixels the cursor never touched stay at exactly 0 forever, touched
 *    ones shrink geometrically), then a soft circle is stamped at the
 *    cursor's current eased position (via `lighter`, so revisiting an area
 *    brightens it rather than resetting it).
 *
 * Each frame the visible canvas is recomposited: draw the scene, then
 * `destination-in` the mask on top so only the "scratched" parts of the
 * scene remain visible — the mask's own RGB is discarded, only its alpha
 * matters, so there's no path to a washed-out/blown-out look no matter how
 * much of it accumulates.
 */
export const CosmicRevealBackground = (): JSX.Element | null => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const reduced = useReducedMotion() ?? false;
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const lastStampPos = useRef({ x: 0, y: 0 });
  const lastFrameTime = useRef<number | null>(null);
  const hasInteracted = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    // A layout pass can land a beat after this effect's first run in some
    // embedding contexts, catching window.innerWidth mid-transition and
    // sticking the wrong reading for the rest of the page's life (no resize
    // event ever fires to correct it). One follow-up check after the next
    // paint catches that without adding any visible delay in the normal case.
    const raf = requestAnimationFrame(check);
    const timeout = window.setTimeout(check, 150);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", check);
    };
  }, []);

  const interactive = !reduced && !isMobile;

  // Paints/sizes the canvases on mount and on resize — fully independent of
  // the tick loop below, since the star field itself never needs to be
  // redrawn on mousemove, only the mask revealing it does.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLight) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (interactive) {
        if (!sceneCanvasRef.current) sceneCanvasRef.current = document.createElement("canvas");
        if (!maskCanvasRef.current) maskCanvasRef.current = document.createElement("canvas");
        drawCosmicScene(sceneCanvasRef.current, width, height, dpr);
        sizeCanvas(maskCanvasRef.current, width, height, MASK_DPR);
        sizeCanvas(canvas, width, height, dpr);
      } else {
        // Mobile / reduced-motion: no scratch mechanic at all, paint
        // straight onto the visible canvas exactly like before.
        drawCosmicScene(canvas, width, height, dpr);
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [interactive, isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const el = layerRef.current;
    if (!canvas || !el || !interactive || isLight) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { ...target.current };
    lastStampPos.current = { ...target.current };
    lastFrameTime.current = null;
    hasInteracted.current = false;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        el.style.opacity = "0.55";
      }
    };

    const stampAt = (maskCtx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      const grad = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(255,255,255,${STAMP_PEAK_ALPHA})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      maskCtx.fillStyle = grad;
      maskCtx.beginPath();
      maskCtx.arc(x, y, radius, 0, Math.PI * 2);
      maskCtx.fill();
    };

    const tick = (now: number) => {
      const scene = sceneCanvasRef.current;
      const mask = maskCanvasRef.current;
      if (!scene || !mask) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      const maskCtx = mask.getContext("2d");
      if (!maskCtx) {
        frame.current = requestAnimationFrame(tick);
        return;
      }

      const dt = lastFrameTime.current == null ? 16 : now - lastFrameTime.current;
      lastFrameTime.current = now;

      current.current.x += (target.current.x - current.current.x) * CURSOR_LERP;
      current.current.y += (target.current.y - current.current.y) * CURSOR_LERP;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const radius = stampRadiusFor(width);

      // Decay the mask's existing alpha — time-delta based so the fade
      // duration stays constant regardless of refresh rate or a throttled
      // tab. destination-in multiplies alpha, so never-touched pixels
      // (alpha 0) stay at exactly 0 forever; touched pixels shrink
      // geometrically toward it instead of ever flooding upward.
      const decayFactor = Math.pow(FADE_FLOOR, dt / FADE_DURATION_MS);
      maskCtx.globalCompositeOperation = "destination-in";
      maskCtx.fillStyle = `rgba(0,0,0,${decayFactor})`;
      maskCtx.fillRect(0, 0, width, height);

      // Stamp the current position onto the mask, additively. Interpolate
      // sub-points on a fast swipe so the trail never leaves a visible gap.
      const dx = current.current.x - lastStampPos.current.x;
      const dy = current.current.y - lastStampPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.min(MAX_STAMP_STEPS, Math.max(1, Math.ceil(dist / (radius * 0.5))));
      maskCtx.globalCompositeOperation = "lighter";
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        stampAt(maskCtx, lastStampPos.current.x + dx * t, lastStampPos.current.y + dy * t, radius);
      }
      maskCtx.globalCompositeOperation = "source-over";
      lastStampPos.current = { ...current.current };

      // Recomposite the visible canvas: the scene, then keep only the
      // parts the mask has revealed.
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(scene, 0, 0, width, height);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [interactive, isLight]);

  // This whole layer — a hidden dark star field revealed by mouse movement,
  // sitting fixed behind the entire page — predates the theme system and
  // was never made theme-aware. Its own base fill is always dark navy; in
  // dark mode every section painted over it so that never mattered, but the
  // instant any section goes transparent in light mode (like the two stripe
  // sections), this fixed dark layer shows straight through. A hidden dark
  // starfield doesn't belong in the light theme's language anyway, so the
  // correct fix is to not mount any of it at all here — not to keep patching
  // every section that might someday go transparent. Including `isLight` in
  // both effects' dependency arrays above ensures their listeners/rAF loop
  // are properly torn down the instant the theme switches, not just left to
  // silently no-op against a detached canvas.
  if (isLight) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base fill — same tone the pages used to paint directly, so the idle
          (no cursor nearby) look is unchanged */}
      <div className="absolute inset-0 bg-[#03050a]" />

      <div
        ref={layerRef}
        className={`cosmic-reveal-layer absolute inset-0 ${!interactive ? "cosmic-reveal-fallback" : ""}`}
        style={interactive ? { opacity: 0.18 } : undefined}
      >
        <canvas ref={canvasRef} className="cosmic-reveal-canvas absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
};
