import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Canvas star/particle field for the Start-a-Project modal. Unlike a plain
 * CSS parallax layer (which can only move as one rigid block), each particle
 * here has its own position and reacts individually to distance from the
 * cursor — closer particles get pushed harder, farther ones barely move —
 * which is what makes the field feel "alive" rather than just tilted.
 * Canvas is used instead of ~200 DOM nodes so the per-frame position/opacity
 * updates never touch React state or trigger a re-render; only a handful of
 * refs and a single 2D context are touched per frame.
 */

type ParticleType = "point" | "sparkle" | "dust" | "glow";

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  color: string;
  type: ParticleType;
  depth: number; // 0..1 — how strongly this particle reacts to mouse push + parallax
  driftPhase: number;
  driftSpeed: number;
  twinklePhase: number;
  rotation: number; // sparkle ray angle offset, so not every sparkle lines up +/x
};

// Weighted so most particles read as soft white/cyan "stars," cyan/blue as
// the dominant accent, and violet as a rare highlight — no pink, per spec.
const WEIGHTED_COLORS: Array<[string, number]> = [
  ["rgba(255, 255, 255, 0.65)", 0.32],
  ["rgba(125, 211, 252, 0.75)", 0.28],
  ["rgba(56, 189, 248, 0.65)", 0.22],
  ["rgba(96, 165, 250, 0.55)", 0.13],
  ["rgba(124, 58, 237, 0.35)", 0.05],
];

function pickColor(roll: number): string {
  let acc = 0;
  for (const [color, weight] of WEIGHTED_COLORS) {
    acc += weight;
    if (roll <= acc) return color;
  }
  return WEIGHTED_COLORS[0][0];
}

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Exact proportions (~70% point / ~20% sparkle / ~8% dust), with glow held to
// a hard 5–8 total regardless of field size — a starfield reads as premium
// specifically because glow is rare; letting it scale up with particle count
// would turn "a few bright glints" into "a wall of bubbles."
function assignTypes(count: number, rand: () => number): ParticleType[] {
  const glowCount = Math.min(8, Math.max(5, Math.round(count * 0.02)));
  const sparkleCount = Math.round(count * 0.2);
  const dustCount = Math.round(count * 0.08);
  const pointCount = Math.max(0, count - glowCount - sparkleCount - dustCount);

  const types: ParticleType[] = [
    ...Array(pointCount).fill("point"),
    ...Array(sparkleCount).fill("sparkle"),
    ...Array(dustCount).fill("dust"),
    ...Array(glowCount).fill("glow"),
  ];
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }
  return types;
}

function sizeForType(type: ParticleType, rand: () => number): number {
  switch (type) {
    case "point":
      return 0.6 + rand() * 0.7; // 0.6–1.3px — a pixel-sharp pinprick, not a ball
    case "dust":
      return 0.4 + rand() * 0.5; // 0.4–0.9px, dimmer and even smaller than point
    case "sparkle":
      return 3 + rand() * 4; // 3–7px total ray span
    case "glow":
      return 3.5 + rand() * 1.5; // 3.5–5px soft core, only a handful ever exist
  }
}

function makeParticles(count: number, width: number, height: number, seed: number): Particle[] {
  const rand = mulberry32(seed);
  const types = assignTypes(count, rand);
  return Array.from({ length: count }, (_, i) => {
    const type = types[i];
    const baseX = rand() * width;
    const baseY = rand() * height;
    return {
      baseX,
      baseY,
      x: baseX,
      y: baseY,
      size: sizeForType(type, rand),
      color: pickColor(rand()),
      type,
      depth: 0.35 + rand() * 0.65,
      driftPhase: rand() * Math.PI * 2,
      driftSpeed: 0.15 + rand() * 0.25,
      twinklePhase: rand() * Math.PI * 2,
      rotation: rand() * Math.PI * 0.25,
    };
  });
}

const INFLUENCE_RADIUS = 340; // px — particles within this distance of the cursor react
const MAX_PUSH = 40; // px — strongest displacement, right next to the cursor
const PARALLAX_MAX = 20; // px — whole-field drift toward/away from cursor position
const LERP = 0.09; // easing factor — higher = snappier, lower = dreamier
const BRIGHTEN_RADIUS = 160; // px — particles this close to the cursor brighten slightly

export const ModalParticleField = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let isMobile = window.innerWidth < 768;
    const canInteract = !reduced && !isMobile;

    const mouse = { x: -9999, y: -9999, active: false };
    let mouseTargetX = -9999;
    let mouseTargetY = -9999;
    let parallaxX = 0;
    let parallaxY = 0;
    let frame: number | null = null;
    const start = performance.now();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduced ? 90 : isMobile ? 80 : 220;
      particles = makeParticles(count, width, height, 5150);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseTargetX = e.clientX - rect.left;
      mouseTargetY = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleLeave = () => {
      mouse.active = false;
    };

    if (canInteract) {
      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);
    }

    const renderFrame = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = (now - start) / 1000;

      mouse.x += (mouseTargetX - mouse.x) * LERP;
      mouse.y += (mouseTargetY - mouse.y) * LERP;

      const activeNow = canInteract && mouse.active;
      const targetParallaxX = activeNow ? ((mouse.x / width) * 2 - 1) * PARALLAX_MAX : 0;
      const targetParallaxY = activeNow ? ((mouse.y / height) * 2 - 1) * PARALLAX_MAX : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.05;
      parallaxY += (targetParallaxY - parallaxY) * 0.05;

      // Soft cursor-following halo, drawn beneath the particles so nearby
      // ones read as sitting inside a gentle glow rather than a hard circle.
      if (activeNow) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        halo.addColorStop(0, "rgba(94, 189, 248, 0.10)");
        halo.addColorStop(0.5, "rgba(124, 58, 237, 0.05)");
        halo.addColorStop(1, "rgba(94, 189, 248, 0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      for (const p of particles) {
        const driftX = Math.sin(t * p.driftSpeed + p.driftPhase) * 4;
        const driftY = Math.cos(t * p.driftSpeed * 0.8 + p.driftPhase) * 4;

        let targetX = p.baseX + driftX + parallaxX * p.depth;
        let targetY = p.baseY + driftY + parallaxY * p.depth;

        if (activeNow) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE_RADIUS) {
            const falloff = 1 - dist / INFLUENCE_RADIUS;
            const push = falloff * falloff * MAX_PUSH * p.depth;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * push;
            targetY += Math.sin(angle) * push;
          }
        }

        p.x += (targetX - p.x) * LERP;
        p.y += (targetY - p.y) * LERP;

        const twinkle = reduced ? 1 : 0.72 + 0.28 * Math.sin(t * 1.4 + p.twinklePhase);

        let boost = 1;
        if (activeNow) {
          const bx = p.x - mouse.x;
          const by = p.y - mouse.y;
          const bd = Math.sqrt(bx * bx + by * by);
          if (bd < BRIGHTEN_RADIUS) boost = 1 + (1 - bd / BRIGHTEN_RADIUS) * 0.6;
        }

        ctx.globalAlpha = Math.min(1, twinkle * boost);

        // Draw method differs by type — this is what keeps the field reading
        // as a starfield rather than a cluster of filled bubbles. Only "glow"
        // ever uses ctx.arc(); everything else is a square pixel or a set of
        // thin strokes, so most of the field has no round silhouette at all.
        switch (p.type) {
          case "point":
          case "dust": {
            ctx.shadowBlur = 0;
            ctx.fillStyle = p.color;
            const s = p.size;
            ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
            break;
          }
          case "sparkle": {
            const r = (p.size / 2) * (1 + (boost - 1) * 0.3); // rays lengthen only slightly near the cursor
            ctx.shadowBlur = 4 * boost;
            ctx.shadowColor = p.color;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            // main cross
            ctx.moveTo(p.x, p.y - r);
            ctx.lineTo(p.x, p.y + r);
            ctx.moveTo(p.x - r, p.y);
            ctx.lineTo(p.x + r, p.y);
            // short diagonal rays, rotated slightly per-particle so sparkles
            // don't all sit on the same + axis
            const dr = r * 0.55;
            const cosR = Math.cos(p.rotation);
            const sinR = Math.sin(p.rotation);
            const dx1 = dr * cosR - dr * sinR;
            const dy1 = dr * sinR + dr * cosR;
            ctx.moveTo(p.x - dx1, p.y - dy1);
            ctx.lineTo(p.x + dx1, p.y + dy1);
            ctx.moveTo(p.x - dy1, p.y + dx1);
            ctx.lineTo(p.x + dy1, p.y - dx1);
            ctx.stroke();
            break;
          }
          case "glow": {
            ctx.shadowBlur = 10 * boost;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 + (boost - 1) * 0.4), 0, Math.PI * 2);
            ctx.fill();
            break;
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    // Draw one frame synchronously so the field is never blank while the
    // first requestAnimationFrame callback is pending.
    renderFrame(start);
    if (!reduced) {
      const loop = (now: number) => {
        renderFrame(now);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (canInteract) {
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      }
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, [reduced, containerRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
