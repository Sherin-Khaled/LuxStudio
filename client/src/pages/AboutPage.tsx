import { useEffect, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { SideStars } from "@/components/backgrounds/SideStars";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { aboutPageDict } from "@/lib/i18n/aboutPage";
import { commonDict } from "@/lib/i18n/common";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { pageMeta, pageBreadcrumbs } from "@/lib/seo/pageMeta";

/* ─── Shared fade-up animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* Deterministic tiny PRNG (mulberry32) — lets the Studio Note particle field
   look randomly scattered while staying identical on every render, since the
   array below is built once at module load, not re-rolled per component render. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STUDIO_NOTE_PARTICLE_COLORS = ["#38bdf8", "#60a5fa", "#8b5cf6", "#a855f7"];
const STUDIO_NOTE_PARTICLE_PATTERNS = ["a", "b", "c"] as const;
const STUDIO_NOTE_PARTICLE_LAYERS = ["far", "mid", "near"] as const;

/* Soft cosmic dot field for the Studio Note card hover, ~160 particles split across
   three depth layers so mouse-move parallax (see index.css) reads as real depth —
   near-layer dots are slightly bigger/brighter, far-layer dots smaller/dimmer. */
const studioNoteParticles = (() => {
  const rand = mulberry32(1337);
  return Array.from({ length: 160 }, (_, i) => {
    const layer = STUDIO_NOTE_PARTICLE_LAYERS[i % 3];
    const sizeBase = layer === "near" ? 2 : layer === "mid" ? 1.5 : 1;
    return {
      top: Number((rand() * 100).toFixed(2)),
      left: Number((rand() * 100).toFixed(2)),
      size: Number((sizeBase + rand() * 1).toFixed(2)),
      color: STUDIO_NOTE_PARTICLE_COLORS[Math.floor(rand() * STUDIO_NOTE_PARTICLE_COLORS.length)],
      opacity: Number((0.12 + rand() * 0.63).toFixed(2)),
      duration: Number((7 + rand() * 9).toFixed(1)),
      delay: Number((rand() * 6).toFixed(2)),
      pattern: STUDIO_NOTE_PARTICLE_PATTERNS[i % 3],
      layer,
    };
  });
})();

/* ─── Glass card ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* ─── Code-generated Milky-Way-style particle galaxy — Canvas 2D.
   The previous version placed particles at random points near each spiral
   arm — at any particle count that runs smoothly, random points leave gaps,
   which is what reads as "dotted" instead of "cloudy". This version instead
   walks each arm SYSTEMATICALLY (small fixed steps from center to edge, no
   randomness in the walk itself) and stamps a small soft-glow sprite at
   every step — since consecutive steps are close together and each stamp
   has a soft gradient falloff, they overlap into one continuous glowing
   band by construction, not by chance. A handful of sharp round dots are
   layered on top for pinpoint stars. Nothing is an image: the sprites are
   tiny offscreen canvases painted with a radial gradient, generated once in
   JS, then stamped many times with ctx.drawImage — that's still 100%
   code-generated, drawImage is just a fast way to reuse a shape you drew
   yourself. No background fill anywhere, so density/opacity simply taper to
   nothing near the outer radius — that taper *is* the edge. ─── */
const GALAXY_ARM_COUNT = 2; // a "grand design" 2-arm spiral, matching a real Milky Way-style reference
const GALAXY_ROTATION_PER_FRAME = 0.0009; // radians per frame — slow, cinematic spin
const GALAXY_BASE_TILT = -0.36; // ~-20.6deg constant tilt, so the disk reads as viewed at an angle
const GALAXY_ELLIPSE_Y = 0.42; // vertical squash of the disk (perspective)
const GALAXY_SPIRAL_WIND = Math.PI * 2.3; // how many radians the arm winds through center -> edge

type GalaxyParticleKind = "core" | "band" | "lane" | "star" | "micro" | "backdrop";

interface GalaxyParticle {
  radius: number; // 0..1, normalized distance from center. Unused/0 for "backdrop" (screen-space, see x/y).
  baseAngle: number;
  size: number;
  opacity: number;
  color: string; // for "band"/"lane": a sprite key; for "core"/"star"/"micro"/"backdrop": a literal CSS color
  kind: GalaxyParticleKind;
  shimmer: number; // phase offset (0..2π) for a per-particle twinkle; only read in the light-mode draw path
  x?: number; // 0..1 screen-space, "backdrop" kind only — scattered across the whole canvas, ignoring disk rotation/tilt
  y?: number;
}

// Box-Muller gaussian noise from a uniform PRNG — used only for light mode's
// arm jitter (see generateGalaxyParticles) so the spiral's edge reads as a
// smooth organic curve rather than uniformly-scattered dots. Dark mode's arm
// generation is untouched and never calls this.
function gaussianNoise(rand: () => number): number {
  const u = Math.max(rand(), 0.000001);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Soft-glow sprite colors, keyed by name — each becomes one small offscreen
 * canvas (a radial gradient baked in), built once and reused via drawImage
 * for every "band"/"lane" particle instead of redrawing a gradient per dot.
 * Dark-mode set is untouched. Light-mode set exists because these particles
 * are drawn with "lighter" (additive/screen) blending in dark mode — additive
 * blending with ANY color against a white background mathematically stays
 * white (screen(white, x) = white), so pale/warm dark-mode tones would be
 * completely invisible in light mode regardless of opacity tuning. Light
 * mode instead uses "source-over" blending (see drawGalaxyFrame) with more
 * saturated blue/violet/lavender tones that have real presence against
 * white, and a soft slate shadow instead of near-black for the dust lanes. */
const GALAXY_SPRITE_RGB_DARK: Record<string, string> = {
  warm: "255,247,232",
  cyan: "170,226,255",
  blue: "120,158,255",
  violet: "160,120,255",
  dust: "8,11,24",
};

const GALAXY_SPRITE_RGB_LIGHT: Record<string, string> = {
  warm: "186,204,224", // icy silver-blue (replaces the warm/gold zone nearest the core)
  cyan: "56,189,248", // sky-400 — the site's own accent, solid against white
  blue: "37,99,235", // blue-600 — deeper, clearly visible
  violet: "139,92,246", // violet-500 — soft lavender
  dust: "165,175,214", // soft lavender-blue shadow, not neutral slate-gray — reads as
  // atmospheric depth rather than "dirty gray" against a bright premium page
};

function createGalaxySprite(rgb: string): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d")!;
  const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.4, `rgba(${rgb},0.5)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  sctx.fillStyle = grad;
  sctx.beginPath();
  sctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  sctx.fill();
  return sprite;
}

function buildGalaxySprites(isLight: boolean): Record<string, HTMLCanvasElement> {
  const rgbMap = isLight ? GALAXY_SPRITE_RGB_LIGHT : GALAXY_SPRITE_RGB_DARK;
  const sprites: Record<string, HTMLCanvasElement> = {};
  for (const key of Object.keys(rgbMap)) {
    sprites[key] = createGalaxySprite(rgbMap[key]);
  }
  return sprites;
}

function bandColorFor(t: number): string {
  if (t < 0.32) return "warm";
  if (t < 0.58) return "cyan";
  if (t < 0.8) return "blue";
  return "violet";
}

function generateGalaxyParticles(isMobile: boolean, isLight: boolean): GalaxyParticle[] {
  const armSteps = isMobile ? 130 : 240; // systematic walk along each arm — no gaps by construction
  const perStep = isMobile ? 2 : 3;
  const laneSteps = isMobile ? 90 : 170;
  const lanePerStep = isMobile ? 1 : 2;
  // Light mode gets a modest star/micro-star bump — dark mode's additive
  // blending makes overlapping faint stars "glow" and read as present even
  // at low individual opacity; source-over blending in light mode doesn't
  // get that boost, so the same counts would read as a thinner field.
  const starCount = isMobile ? (isLight ? 175 : 150) : (isLight ? 440 : 380);
  const microCount = isMobile ? (isLight ? 155 : 130) : (isLight ? 350 : 300);
  const coreCount = isMobile ? 50 : 100;
  // Light-mode-only: a full-canvas backdrop star field (screen-space, drawn
  // ignoring the disk's own rotation/tilt) — inspired by the reference
  // GalaxyEffect's "background" tier. Reads as "this galaxy sits in a wider
  // sky" rather than an isolated colored disc. Dark mode doesn't need this
  // (its own StarsBackground/SideStars already surround the hero).
  const backdropCount = isLight ? (isMobile ? 55 : 90) : 0;

  const particles: GalaxyParticle[] = [];
  const shimmer = () => Math.random() * Math.PI * 2;

  // 1. Core texture — sharp, tiny, bright, tightly clustered at the very center.
  // Dark mode: pale/near-white, made to glow via additive blending against
  // black. Light mode: richer jewel tones — pale-on-white would be invisible
  // under the same additive blend, and these are drawn via source-over in
  // light mode (see drawGalaxyFrame), so they need real color to read at all.
  const coreColors = isLight ? ["#7dd3fc", "#a5b4fc", "#c4b5fd"] : ["#fff8ee", "#eaf6ff", "#cfe9ff"];
  for (let i = 0; i < coreCount; i++) {
    const t = Math.pow(Math.random(), 1.8) * 0.14;
    particles.push({
      radius: t,
      baseAngle: Math.random() * Math.PI * 2,
      size: 0.6 + Math.random() * 0.7,
      opacity: 0.55 + Math.random() * 0.4,
      color: coreColors[(Math.random() * coreColors.length) | 0],
      kind: "core",
      shimmer: shimmer(),
    });
  }

  // 2. Spiral arm bands — walk each arm in small fixed steps (systematic, not
  // random), clustering a few soft sprites tightly around every step so they
  // overlap continuously into one glowing band instead of scattered dots.
  // Light mode's perpendicular jitter uses gaussian noise instead of uniform
  // random (inspired by the reference's spiralPoint) — a bell-curve spread
  // clusters most particles near the arm's centerline with a smooth falloff,
  // reading as a soft organic curve rather than an evenly-scattered band.
  // Dark mode's formula is untouched.
  for (let arm = 0; arm < GALAXY_ARM_COUNT; arm++) {
    const armOffset = (arm / GALAXY_ARM_COUNT) * Math.PI * 2;
    for (let s = 0; s < armSteps; s++) {
      const t = s / armSteps;
      const centerAngle = armOffset + t * GALAXY_SPIRAL_WIND;
      for (let p = 0; p < perStep; p++) {
        const thickness = 0.05 + t * 0.1;
        const perpJitter = isLight
          ? gaussianNoise(Math.random) * thickness * 0.5
          : (Math.random() - 0.5) * thickness; // organic thickness, not a clean line
        const radialJitter = (Math.random() - 0.5) * 0.02;
        particles.push({
          radius: Math.min(1, Math.max(0.015, t + radialJitter)),
          baseAngle: centerAngle + perpJitter,
          size: (1 - t * 0.55) * (0.75 + Math.random() * 0.6), // thicker near core, thinner near the tips
          opacity: Math.max(0.08, (1 - t) * 0.55 + 0.14) * (0.75 + Math.random() * 0.45),
          color: bandColorFor(t),
          kind: "band",
          shimmer: shimmer(),
        });
      }
    }
  }

  // 3. Dust lanes — same systematic walk, offset just inside/trailing each
  // bright arm, low opacity — real contrast, not harsh lines. Light mode
  // dampens this further on top of its already-softer color (see
  // GALAXY_SPRITE_RGB_LIGHT) so it stays a bare hint of depth, not a visible
  // gray smear on an otherwise bright, airy scene.
  for (let arm = 0; arm < GALAXY_ARM_COUNT; arm++) {
    const armOffset = (arm / GALAXY_ARM_COUNT) * Math.PI * 2;
    for (let s = 0; s < laneSteps; s++) {
      const t = 0.12 + (s / laneSteps) * 0.72;
      const centerAngle = armOffset + t * GALAXY_SPIRAL_WIND - 0.16;
      for (let p = 0; p < lanePerStep; p++) {
        const perpJitter = (Math.random() - 0.5) * 0.06;
        particles.push({
          radius: t,
          baseAngle: centerAngle + perpJitter,
          size: 0.55 + Math.random() * 0.5,
          opacity: Math.max(0.05, 0.3 - t * 0.18) * (0.7 + Math.random() * 0.4) * (isLight ? 0.6 : 1),
          color: "dust",
          kind: "lane",
          shimmer: shimmer(),
        });
      }
    }
  }

  // 4. Bright scatter stars — sharp pinpoints within and around the arms.
  // Same reasoning as the core colors: light mode needs saturated tones that
  // read as distinct marks against white, not pale ones meant to glow on black.
  const starColors = isLight
    ? ["#0ea5e9", "#38bdf8", "#7c3aed", "#a78bfa", "#0284c7"]
    : ["#ffffff", "#dff0ff", "#9ce0ff", "#38bdf8", "#c9b8ff"];
  for (let i = 0; i < starCount; i++) {
    const t = Math.pow(Math.random(), 0.65);
    particles.push({
      radius: t,
      baseAngle: Math.random() * Math.PI * 2,
      size: 0.5 + Math.random() * 1.1,
      // Light mode floor raised (0.32 vs 0.15) for the same reason as the
      // count bump above — a "clear star-field impression" needs pinpoints
      // that don't rely on additive stacking to be noticeable.
      opacity: isLight
        ? Math.max(0.32, (1 - t) * 0.75 + Math.random() * 0.25)
        : Math.max(0.15, (1 - t) * 0.7 + Math.random() * 0.25),
      color: starColors[(Math.random() * starColors.length) | 0],
      kind: "star",
      shimmer: shimmer(),
    });
  }

  // 5. Background micro-stars — tiny, faint, scattered broadly (not confined to arms)
  for (let i = 0; i < microCount; i++) {
    const t = Math.random();
    particles.push({
      radius: t,
      baseAngle: Math.random() * Math.PI * 2,
      size: 0.4 + Math.random() * 0.7,
      opacity: isLight
        ? Math.max(0.12, (1 - t) * 0.4 + Math.random() * 0.15)
        : Math.max(0.03, (1 - t) * 0.28 + Math.random() * 0.1),
      color: isLight ? "#94a3b8" : "#c9e6ff",
      kind: "micro",
      shimmer: shimmer(),
    });
  }

  // 6. Backdrop star field (light mode only) — plain screen-space points
  // scattered across the entire canvas rectangle, unrelated to the disk's
  // radius/angle/rotation. Gives the sense of a broader sky the galaxy sits
  // within, rather than an isolated shape floating on flat background.
  const backdropColors = ["#bae6fd", "#c4b5fd", "#93c5fd"];
  for (let i = 0; i < backdropCount; i++) {
    particles.push({
      radius: 0,
      baseAngle: 0,
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 0.9,
      opacity: 0.08 + Math.random() * 0.16,
      color: backdropColors[(Math.random() * backdropColors.length) | 0],
      kind: "backdrop",
      shimmer: shimmer(),
    });
  }

  return particles;
}

function drawGalaxyFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: GalaxyParticle[],
  sprites: Record<string, HTMLCanvasElement>,
  rotation: number,
  pulsePhase: number,
  reduced: boolean,
  isLight: boolean,
) {
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const galaxyRadius = Math.min(width, height) * 0.47;
  const dotScale = Math.min(width, height) / 400;
  const tiltCos = Math.cos(GALAXY_BASE_TILT);
  const tiltSin = Math.sin(GALAXY_BASE_TILT);

  // Backdrop star field (light mode only, "backdrop" kind never exists in
  // dark mode's particle set) — drawn first, in plain screen-space pixel
  // coordinates, deliberately outside any rotate/tilt transform so it reads
  // as a static wider sky rather than something spinning with the disk.
  ctx.globalCompositeOperation = "source-over";
  for (const p of particles) {
    if (p.kind !== "backdrop") continue;
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x! * width, p.y! * height, p.size * dotScale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Projects a (angle, radius) pair through the ellipse squash *and* the
  // constant base tilt, so the whole disk reads as viewed at an angle
  // (like a real galaxy photo) instead of a flat top-down icon.
  function project(angle: number, r: number) {
    const ex = Math.cos(angle) * r;
    const ey = Math.sin(angle) * r * GALAXY_ELLIPSE_Y;
    return {
      x: cx + ex * tiltCos - ey * tiltSin,
      y: cy + ex * tiltSin + ey * tiltCos,
    };
  }

  // Soft bright core glow, tilted/flattened the same way as the particles.
  // Dark mode gradient/size is untouched. Light mode can't just lighten the
  // same stops — near-white fading to transparent reads as literally nothing
  // against a near-white page — so it uses a sky-to-violet gradient that
  // carries its own color and fades via opacity, not by approaching white.
  // Its reach is also larger (3.9x vs 3.2x) so the center reads clearly as a
  // "luminous glow," not a small pale smudge.
  const pulse = reduced ? 1 : 0.94 + Math.sin(pulsePhase) * 0.06;
  const coreRadius = galaxyRadius * 0.22 * pulse;
  const coreGlowReach = isLight ? coreRadius * 3.9 : coreRadius * 3.2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(GALAXY_BASE_TILT);
  ctx.scale(1, GALAXY_ELLIPSE_Y);

  // Light mode only: a large, very soft ambient halo drawn before the core
  // glow — inspired by the reference's wide elliptical halo wash. This is
  // what makes the galaxy feel "embedded in atmosphere" rather than a disk
  // with a sharp edge sitting on the page: it's low-alpha and extends well
  // past the particle disk itself (1.15x galaxyRadius), so by the time it
  // reaches its own edge it has already faded to nothing — no crop, no
  // visible boundary. Dark mode doesn't need this; its particle spread
  // already reads as embedded against a dark background.
  if (isLight) {
    const ambientHaloRadius = galaxyRadius * 1.15;
    const ambientHalo = ctx.createRadialGradient(0, 0, 0, 0, 0, ambientHaloRadius);
    ambientHalo.addColorStop(0, "rgba(199,221,254,0.22)");
    ambientHalo.addColorStop(0.35, "rgba(191,201,250,0.14)");
    ambientHalo.addColorStop(0.7, "rgba(196,181,253,0.06)");
    ambientHalo.addColorStop(1, "rgba(196,181,253,0)");
    ctx.fillStyle = ambientHalo;
    ctx.beginPath();
    ctx.arc(0, 0, ambientHaloRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, coreGlowReach);
  if (isLight) {
    coreGradient.addColorStop(0, "rgba(186,230,253,0.85)");
    coreGradient.addColorStop(0.22, "rgba(147,197,253,0.6)");
    coreGradient.addColorStop(0.5, "rgba(167,139,250,0.32)");
    coreGradient.addColorStop(0.78, "rgba(196,181,253,0.14)");
    coreGradient.addColorStop(1, "rgba(196,181,253,0)");
  } else {
    coreGradient.addColorStop(0, "rgba(255,250,235,0.98)");
    coreGradient.addColorStop(0.18, "rgba(255,244,222,0.75)");
    coreGradient.addColorStop(0.42, "rgba(210,225,255,0.42)");
    coreGradient.addColorStop(0.7, "rgba(140,170,255,0.16)");
    coreGradient.addColorStop(1, "rgba(56,189,248,0)");
  }
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(0, 0, coreGlowReach, 0, Math.PI * 2);
  ctx.fill();

  // Light mode only: a small, crisp, saturated nucleus dot at dead-center,
  // drawn on top of the soft glow. The glow alone reads as atmosphere, not a
  // light source — a distinct bright point is what actually sells "luminous
  // center" the way the reference photo's core does. Dark mode is
  // unaffected (this block only runs when isLight).
  if (isLight) {
    const nucleusGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius * 0.55);
    nucleusGradient.addColorStop(0, "rgba(224,242,254,0.95)");
    nucleusGradient.addColorStop(0.5, "rgba(147,197,253,0.7)");
    nucleusGradient.addColorStop(1, "rgba(147,197,253,0)");
    ctx.fillStyle = nucleusGradient;
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Spiral arm bands — soft sprites stamped densely along each arm. Dark
  // mode uses additive ("lighter") blending so overlapping stamps brighten
  // into a continuous glowing band. That same additive blend against a
  // WHITE canvas is a no-op (screen(white, x) = white for any x) — light
  // mode uses normal ("source-over") blending instead, which is why its
  // sprite colors (GALAXY_SPRITE_RGB_LIGHT) need to carry real saturation:
  // the color itself has to read against white, not just brighten it.
  ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";
  for (const p of particles) {
    if (p.kind !== "band") continue;
    const sprite = sprites[p.color];
    const { x, y } = project(p.baseAngle + rotation, p.radius * galaxyRadius);
    // Dark mode's additive blend naturally builds up density where sprites
    // overlap; source-over doesn't (the top draw just occludes the one
    // beneath at its own alpha), so light mode draws each sprite a bit
    // larger to keep the arm reading as a continuous band rather than a
    // patchier scatter at the same particle count.
    const drawSize = p.size * dotScale * (isLight ? 35 : 30);
    // Light mode only: a slow per-particle twinkle (±12% alpha) so the arm
    // reads as made of individually-shimmering points rather than a flat
    // static wash — a small, cheap touch that reads as premium motion.
    const shimmerMul = isLight ? 0.88 + Math.sin(pulsePhase * 0.6 + p.shimmer) * 0.12 : 1;
    ctx.globalAlpha = p.opacity * shimmerMul;
    ctx.drawImage(sprite, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
  }

  // Dust lanes — normal blending in both themes (this layer was already
  // source-over) so they darken the band underneath rather than brighten
  // it. Only the color differs: near-black in dark mode, a soft slate
  // shadow in light mode (see GALAXY_SPRITE_RGB_LIGHT) so it reads as gentle
  // depth between arms instead of a harsh black smear on a light page.
  ctx.globalCompositeOperation = "source-over";
  for (const p of particles) {
    if (p.kind !== "lane") continue;
    const sprite = sprites[p.color];
    const { x, y } = project(p.baseAngle + rotation, p.radius * galaxyRadius);
    const drawSize = p.size * dotScale * 30;
    ctx.globalAlpha = p.opacity;
    ctx.drawImage(sprite, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
  }

  // Sharp populations on top: core texture, bright stars, micro stars —
  // same additive-vs-normal split as the arm bands, for the same reason.
  ctx.globalCompositeOperation = isLight ? "source-over" : "lighter";
  for (const p of particles) {
    if (p.kind !== "core" && p.kind !== "star" && p.kind !== "micro") continue;
    const { x, y } = project(p.baseAngle + rotation, p.radius * galaxyRadius);
    // Light mode only: same per-particle twinkle as the arm bands, a touch
    // stronger for "star" points specifically so pinpoints feel alive.
    const shimmerMul = isLight
      ? 0.85 + Math.sin(pulsePhase * (p.kind === "star" ? 0.8 : 0.5) + p.shimmer) * (p.kind === "star" ? 0.15 : 0.1)
      : 1;
    ctx.globalAlpha = p.opacity * shimmerMul;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(x, y, p.size * dotScale, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

const AnimatedGalaxy = ({ reduced, isLight, ariaLabel }: { reduced: boolean; isLight: boolean; ariaLabel: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Particles and sprites are regenerated whenever isMobile OR isLight
  // changes — the color palette (and, for sprites, the actual baked pixels)
  // differs by theme, so a stale dark-mode particle set can't just be
  // recolored in place on a theme toggle.
  const particlesRef = useRef<GalaxyParticle[] | null>(null);
  const particlesKeyRef = useRef<string | null>(null);
  const particlesKey = `${isMobile}:${isLight}`;
  if (particlesRef.current === null || particlesKeyRef.current !== particlesKey) {
    particlesRef.current = generateGalaxyParticles(isMobile, isLight);
    particlesKeyRef.current = particlesKey;
  }

  const spritesRef = useRef<Record<string, HTMLCanvasElement> | null>(null);
  const spritesForLightRef = useRef<boolean | null>(null);
  if (typeof document !== "undefined" && (spritesRef.current === null || spritesForLightRef.current !== isLight)) {
    spritesRef.current = buildGalaxySprites(isLight);
    spritesForLightRef.current = isLight;
  }

  // isLight is read fresh via this ref inside the draw calls below, rather
  // than closed over, so a theme toggle doesn't require tearing down and
  // recreating the ResizeObserver/rAF loop — same pattern as the Process
  // hero shader. particlesRef/spritesRef are already read fresh via
  // `.current` on every call, so only isLight needed this treatment.
  const isLightRef = useRef(isLight);
  const redrawRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    isLightRef.current = isLight;
    if (reduced) redrawRef.current?.();
  }, [isLight, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let rafId = 0;
    let rotation = 0;
    let pulsePhase = 0;

    function renderStatic() {
      drawGalaxyFrame(ctx!, canvas!.width, canvas!.height, particlesRef.current!, spritesRef.current!, 0, 0, true, isLightRef.current);
    }
    redrawRef.current = renderStatic;

    function loop() {
      rotation += GALAXY_ROTATION_PER_FRAME;
      pulsePhase += 0.012;
      drawGalaxyFrame(ctx!, canvas!.width, canvas!.height, particlesRef.current!, spritesRef.current!, rotation, pulsePhase, false, isLightRef.current);
      rafId = requestAnimationFrame(loop);
    }

    if (reduced) {
      renderStatic();
    } else {
      // Draw one frame immediately so the galaxy is never blank while waiting
      // for the first rAF tick (e.g. a tab that loaded in the background).
      drawGalaxyFrame(ctx, canvas.width, canvas.height, particlesRef.current!, spritesRef.current!, rotation, pulsePhase, false, isLightRef.current);
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      redrawRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [reduced]);

  return (
    <div
      className="relative aspect-square w-full overflow-visible"
      role="img"
      aria-label={ariaLabel}
    >
      <style>{`
        @keyframes lux-about-ring-breathe {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
      `}</style>

      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Minimal orbit accents — almost invisible, decorative only, breathing slowly.
          Peak opacity 0.05 (within the 0.03-0.07 target), dipping to ~0.0125 at its faintest. */}
      {[0, 1].map((orbit) => (
        <div
          key={orbit}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: `${18 + orbit * 7}% ${10 + orbit * 5}%`,
            transform: `rotate(${18 + orbit * 34}deg)`,
            border: "1px solid rgba(112,215,255,0.05)",
            animation: reduced ? "none" : `lux-about-ring-breathe ${16 + orbit * 5}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Page ─── */
export const AboutPage = (): JSX.Element => {
  useSEO(pageMeta.about);
  useJSONLD("breadcrumb", buildBreadcrumbSchema(pageBreadcrumbs.about));
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(aboutPageDict);
  const common = useDict(commonDict);

  const studioNoteCardRef = useRef<HTMLDivElement>(null);
  const studioNoteRafRef = useRef<number | null>(null);

  const handleStudioNoteMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = studioNoteCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    if (studioNoteRafRef.current) cancelAnimationFrame(studioNoteRafRef.current);
    studioNoteRafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--mouse-x", mx.toFixed(3));
      card.style.setProperty("--mouse-y", my.toFixed(3));
    });
  };

  const handleStudioNoteMouseLeave = () => {
    const card = studioNoteCardRef.current;
    if (!card) return;
    if (studioNoteRafRef.current) cancelAnimationFrame(studioNoteRafRef.current);
    card.style.setProperty("--mouse-x", "0");
    card.style.setProperty("--mouse-y", "0");
  };

  return (
    <div className={`relative min-h-screen w-full overflow-x-clip ${isLight ? "bg-[#F8FBFF] text-[#0F172A]" : "text-[#f5f7fa]"}`}>
      <div className="page-content-layer">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20">
        <img className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" alt="" aria-hidden="true" src="/figmaAssets/backgroundstars-2.svg" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[80vw] w-[80vw] max-h-[1000px] max-w-[1000px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[200px]" style={{ backgroundColor: "rgba(29,78,216,0.16)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-8%] top-1/3 h-[440px] w-[440px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.12)" }} />
        <SideStars starsPerSide={12} variant={isLight ? "light" : "dark"} />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: hero text */}
            <div className="flex-1">
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
                className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] uppercase"
                style={{ color: "var(--hero-eyebrow-text)", textShadow: "var(--hero-eyebrow-text-shadow)" }}
              >
                {t.hero.eyebrow}
              </motion.p>
              <motion.h1
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
                className={`mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-medium leading-[1.04] tracking-[-1.3px] sm:text-[50px] lg:text-[64px] lg:tracking-[-2px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}
              >
                {t.hero.heading}
              </motion.h1>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
                className={`mt-7 max-w-[520px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}
              >
                {t.hero.body}
              </motion.p>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
                className="mt-9 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px]"
                style={{ color: "var(--hero-accent-text)", textShadow: "var(--hero-accent-text-shadow)" }}
              >
                {t.hero.tagline}
              </motion.p>
            </div>

            {/* Right: animated creative-technology galaxy */}
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
              className="w-full max-w-[340px] shrink-0 self-center lg:max-w-[380px] lg:self-auto"
            >
              <AnimatedGalaxy reduced={reduced} isLight={isLight} ariaLabel={t.hero.galaxyAlt} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ STUDIO PHILOSOPHY (PhilosophyArc) ══════════════ */}
      {/* Was an unconditional dark section (bg #020409, white text, a "dark
          planet with a lit rim" SVG) regardless of theme — the single
          biggest remaining dark-mode leftover on this page. Light mode now
          gets its own pale background, a light-toned "planet" gradient
          (bright celestial body instead of a black occluding disc), a
          reworked rim-line gradient (the old white peak would vanish against
          a light page), and readable text. Dark mode is fully unchanged. */}
      <section className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden sm:min-h-[640px] lg:min-h-[720px]" style={{ backgroundColor: isLight ? "#F8FBFF" : "#020409" }}>
        {/* Top fade — blends the hero's background into this section's tone
            so there is no visible seam where the two sections meet. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[160px]"
          style={{ background: isLight ? "linear-gradient(to bottom, #F8FBFF 0%, rgba(248,251,255,0) 100%)" : "linear-gradient(to bottom, #03050a 0%, rgba(3,5,10,0) 100%)" }}
        />

        {/* Sparse background stars — reuses the existing StarsBackground component, low count on purpose */}
        <StarsBackground count={30} mobileCount={14} tabletCount={22} motion="twinkle" className="z-[1]" variant={isLight ? "light" : "dark"} />

        {/* Subtle vertical grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage: isLight
              ? "repeating-linear-gradient(90deg, rgba(15,23,42,0.025) 0px, rgba(15,23,42,0.025) 1px, transparent 1px, transparent 120px)"
              : "repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 120px)",
          }}
        />

        {/* Violet corner glows — the two-tone edge effect (blue/cyan near the arc, violet further out) */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12%] left-[-10%] z-[1] h-[380px] w-[380px] rounded-full blur-[120px]" style={{ backgroundColor: isLight ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.18)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12%] right-[-10%] z-[1] h-[380px] w-[380px] rounded-full blur-[120px]" style={{ backgroundColor: isLight ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.18)" }} />

        {/* Glowing arc / horizon — an SVG ellipse system whose center sits below
            the section, so only its top curve peeks up, like a planet horizon. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 720"
          preserveAspectRatio="xMidYMax slice"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        >
          <defs>
            <radialGradient id="philosophy-arc-pool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9ce5ff" stopOpacity="0.6" />
              <stop offset="45%" stopColor="#2563eb" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="philosophy-atmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#cdeeff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="philosophy-aurora-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.58" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            {/* Dark mode: a near-black planet body, occluding the glow behind
                it so the interior reads as a dark eclipsed disc. Light mode:
                the same occluding shape instead reads as a bright, pale
                celestial body — the "planet" concept stays, just lit instead
                of dark, since a black disc is exactly the "heavy black mass"
                being fixed here. */}
            {isLight ? (
              <linearGradient id="philosophy-planet-body" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#eef4ff" stopOpacity="0.92" />
                <stop offset="45%" stopColor="#e2ebfb" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d7e3f7" stopOpacity="0.97" />
              </linearGradient>
            ) : (
              <linearGradient id="philosophy-planet-body" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0c1a36" stopOpacity="0.88" />
                <stop offset="45%" stopColor="#040810" stopOpacity="0.94" />
                <stop offset="100%" stopColor="#020409" stopOpacity="0.96" />
              </linearGradient>
            )}
            {/* Dark mode: unchanged, peaks at pure white for an incandescent
                rim. Light mode: a white peak would vanish against a light
                page, so it peaks at a saturated sky blue instead — same
                violet-to-blue traveling structure, just carrying its own
                color instead of relying on white-hot contrast against black. */}
            {isLight ? (
              <linearGradient id="philosophy-arc-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                <stop offset="18%" stopColor="#7c3aed" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
                <stop offset="82%" stopColor="#2563eb" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            ) : (
              <linearGradient id="philosophy-arc-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                <stop offset="18%" stopColor="#7c3aed" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="82%" stopColor="#2563eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            )}
            <filter id="philosophy-arc-blur-wide" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="55" />
            </filter>
            <filter id="philosophy-arc-blur-atmo" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
            <filter id="philosophy-arc-blur-surface" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="philosophy-arc-blur-med" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
            <filter id="philosophy-arc-blur-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>

            {/* Light-mode-only, smaller-spread variants of the two widest
                blur filters — used only by the outer atmosphere layers
                (halo/aurora/drift/violet band/cyan ring), not by the crisp
                rim line or the main "illuminate behind the paragraph" glow,
                so the atmosphere feels lighter/tighter while the arc itself
                stays exactly as defined. Dark mode never references these. */}
            <filter id="philosophy-arc-blur-wide-light" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="42" />
            </filter>
            <filter id="philosophy-arc-blur-atmo-light" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
            <filter id="philosophy-arc-blur-med-light" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="20" />
            </filter>

            {/* Light-mode-only bottom-weighted fade mask: fully visible
                through the upper ~60% (where the rim first appears and the
                paragraph-illuminating glow sits), then dissolves smoothly to
                fully transparent by the section's bottom edge. Applied only
                to the outer atmosphere group below — never to the planet
                body, rim line, or inner rim glow, which stay fully defined
                per "the arc itself must not wash out." */}
            <linearGradient id="philosophy-glow-fade-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="82%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <mask id="philosophy-glow-bottom-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="720">
              <rect x="0" y="0" width="1200" height="720" fill="url(#philosophy-glow-fade-gradient)" />
            </mask>
          </defs>

          {/* Outer atmosphere group — halo/aurora/drift/violet-band/cyan-ring.
              Light mode only: each layer's intensity and blur spread is
              reduced a little (opacity down, tighter blur filter), and the
              whole group is bottom-fade masked so it dissolves into the page
              toward the section's lower edge instead of ending abruptly.
              Dark mode: mask is omitted (undefined attribute), filters and
              opacities are the original ones — pixel-identical to before. */}
          <g mask={isLight ? "url(#philosophy-glow-bottom-fade)" : undefined}>
            {/* Wide blurred halo — ambient background wash */}
            <ellipse
              cx="600" cy="770" rx="620" ry="360"
              fill="url(#philosophy-arc-pool)"
              filter={isLight ? "url(#philosophy-arc-blur-wide-light)" : "url(#philosophy-arc-blur-wide)"}
              opacity={isLight ? 0.7 : 1}
            />

            {/* Aurora drift layer — a slow diagonal-drifting wash of blue/violet
                behind the atmosphere, giving the glow depth instead of one flat
                light source. Sits behind the dark planet body, so it never
                brightens the occluded interior — only the outer wash. */}
            <ellipse
              cx="600" cy="700" rx="520" ry="220"
              fill="url(#philosophy-aurora-gradient)"
              filter={isLight ? "url(#philosophy-arc-blur-wide-light)" : "url(#philosophy-arc-blur-wide)"}
              opacity={isLight ? 0.65 : 1}
              style={{ transformOrigin: "600px 700px", animation: reduced ? "none" : "lux-philosophy-aurora-drift 6s ease-in-out infinite" }}
            />

            {/* Secondary drift layer — subtler, different axis and timing than
                the aurora layer above, so the two never move in sync (parallax). */}
            <ellipse
              cx="600" cy="620" rx="430" ry="160"
              fill="url(#philosophy-arc-pool)"
              filter={isLight ? "url(#philosophy-arc-blur-atmo-light)" : "url(#philosophy-arc-blur-atmo)"}
              opacity={isLight ? 0.5 : 0.72}
              style={{ transformOrigin: "600px 620px", animation: reduced ? "none" : "lux-philosophy-drift-b 9s ease-in-out -4s infinite" }}
            />

            {/* Atmosphere — the main light source: soft glow rising ABOVE the rim,
                illuminating the space behind the paragraph like the reference.
                Left at full strength/blur even in light mode (only the
                bottom-fade mask affects it) — this is what backlights the
                paragraph text, not "outer" glow the fix is aimed at. */}
            <ellipse
              cx="600" cy="550" rx="600" ry="200"
              fill="url(#philosophy-atmosphere)" filter="url(#philosophy-arc-blur-atmo)"
              style={{ transformOrigin: "600px 550px", animation: reduced ? "none" : "lux-philosophy-atmosphere-breathe 4s ease-in-out infinite" }}
            />

            {/* Violet outer band — soft purple ring outside the rim */}
            <ellipse
              cx="600" cy="770" rx="560" ry="325"
              fill="none" stroke="#8b5cf6" strokeOpacity={isLight ? 0.22 : 0.32} strokeWidth="24"
              filter={isLight ? "url(#philosophy-arc-blur-med-light)" : "url(#philosophy-arc-blur-med)"}
            />

            {/* Medium cyan glow ring — hugs the outside of the rim, narrower than
                before so it doesn't fog the crisp rim line */}
            <ellipse
              cx="600" cy="770" rx="480" ry="270"
              fill="none" stroke="#38bdf8" strokeOpacity={isLight ? 0.24 : 0.32} strokeWidth={isLight ? 46 : 56}
              filter={isLight ? "url(#philosophy-arc-blur-med-light)" : "url(#philosophy-arc-blur-med)"}
              style={{ transformOrigin: "600px 770px", animation: reduced ? "none" : "lux-philosophy-arc-breathe 4s ease-in-out infinite" }}
            />
          </g>

          {/* Thin distinct secondary violet arc — the crisp purple line visible
              outside the main rim in the reference (strongest at the sides).
              Kept outside the atmosphere group/mask on purpose — this is a
              near-rim accent, not outer atmosphere, and stays subtle-but-
              present in both themes exactly as before. */}
          <ellipse
            cx="600" cy="770" rx="505" ry="287"
            fill="none" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="2"
            filter="url(#philosophy-arc-blur-soft)"
          />

          {/* Dark planet body — occludes all the glow INSIDE the curve, which is
              what makes the interior read as a dark planet with a lit edge
              (the single biggest difference vs. the foggy previous version) */}
          <ellipse cx="600" cy="772" rx="437" ry="237" fill="url(#philosophy-planet-body)" />

          {/* Inner rim glow — a soft bright band hugging just inside the rim.
              The pale icy-blue dark-mode stroke would read as barely-there
              against a light planet body, so light mode uses a more
              saturated sky blue at the same structural weight instead. */}
          <ellipse
            cx="600" cy="770" rx="432" ry="233"
            fill="none" stroke={isLight ? "#38bdf8" : "#bfe8ff"} strokeOpacity={isLight ? 0.38 : 0.42} strokeWidth="16"
            filter="url(#philosophy-arc-blur-surface)"
            style={{ transformOrigin: "600px 770px", animation: reduced ? "none" : "lux-philosophy-rim-breathe 4.5s ease-in-out -6s infinite" }}
          />

          {/* Main bright arc line — the crisp incandescent white-cyan rim */}
          <ellipse
            cx="600" cy="770" rx="440" ry="240"
            fill="none" stroke="url(#philosophy-arc-line)" strokeWidth="2.5"
            filter="url(#philosophy-arc-blur-soft)"
          />

          {/* Rim highlight — a soft, wide patch of extra brightness that slowly
              and continuously rotates around the rim (never appears/disappears
              suddenly since it's always faintly present, and it's a long soft
              segment rather than a thin fast line, so the rotation itself reads
              as a gentle drift rather than a sweep). */}
          <ellipse
            cx="600" cy="770" rx="440" ry="240"
            fill="none" stroke="rgba(125,211,252,0.22)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray="650 1530"
            filter="url(#philosophy-arc-blur-med)"
            style={{ animation: reduced ? "none" : "lux-philosophy-rim-highlight-rotate 14s linear infinite" }}
          />

          {/* Inner faint depth arcs — barely visible inside the dark body */}
          <ellipse cx="600" cy="770" rx="360" ry="190" fill="none" stroke="#9ce5ff" strokeOpacity="0.1" strokeWidth="1.2" />
          <ellipse cx="600" cy="770" rx="300" ry="150" fill="none" stroke="#7c3aed" strokeOpacity="0.08" strokeWidth="1" />

          {/* Subtle glow pool at the crown center, inside the dark body */}
          <ellipse cx="600" cy="770" rx="260" ry="90" fill="url(#philosophy-arc-pool)" opacity="0.5" filter="url(#philosophy-arc-blur-med)" />
        </svg>

        {/* Bottom fade — dissolves the arc/glow into the section's own
            background before the next section starts, so there is no sharp
            horizontal cut at the seam. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[200px]"
          style={{ background: isLight ? "linear-gradient(to bottom, rgba(248,251,255,0) 0%, #F8FBFF 70%, #F8FBFF 100%)" : "linear-gradient(to bottom, transparent 0%, #03050a 70%, #03050a 100%)" }}
        />

        <div className="relative z-10 mx-auto mb-24 w-full max-w-[860px] px-6 text-center sm:mb-32 sm:px-8 lg:mb-48">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${isLight ? "border-[rgba(148,163,184,0.28)] bg-[rgba(255,255,255,0.6)]" : "border-white/[0.12] bg-white/[0.04]"}`}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] uppercase ${isLight ? "text-[#475569]" : "text-[#f5f7fa99]"}`}>
              {t.philosophy.badge}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
            className={`mt-7 [font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.05] tracking-[-1.2px] sm:text-[52px] lg:text-[68px] lg:tracking-[-2.1px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}
          >
            {t.philosophy.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
            className={`mt-7 mb-8 [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}
          >
            {t.philosophy.body}
          </motion.p>
        </div>
      </section>

      {/* ══════════════ STUDIO NOTE ══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-5%] top-1/4 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.09)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <div
              ref={studioNoteCardRef}
              onMouseMove={handleStudioNoteMouseMove}
              onMouseLeave={handleStudioNoteMouseLeave}
              className={`studio-note-glow-border isolate relative overflow-hidden rounded-[28px] border p-10 backdrop-blur-sm [transition:border-color_700ms_cubic-bezier(0.22,1,0.36,1),transform_700ms_cubic-bezier(0.22,1,0.36,1),box-shadow_700ms_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(56,189,248,0.45)] lg:p-14 ${
                isLight
                  ? "border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.72)] shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.08),0_0_40px_rgba(56,189,248,0.16)]"
                  : "border-white/[0.12] bg-white/[0.04] shadow-[0_40px_120px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(56,189,248,0.20),0_0_80px_rgba(56,189,248,0.10),0_40px_120px_rgba(0,0,0,0.5)]"
              }`}
            >
              {/* Top inset line */}
              <div className={`absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isLight ? "via-[rgba(15,23,42,0.12)]" : "via-white/[0.14]"}`} />
              {/* Glow behind */}
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.10)" }} />
              {/* Hover-only blended gradient wash, Stripe-style */}
              <div
                aria-hidden="true"
                className="studio-note-gradient-wash pointer-events-none absolute inset-0 z-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.16), transparent 35%), radial-gradient(circle at 70% 70%, rgba(139,92,246,0.14), transparent 45%)",
                }}
              />
              {/* Hover-only soft cosmic particle field — three depth layers for mouse parallax */}
              {STUDIO_NOTE_PARTICLE_LAYERS.map((layerName) => (
                <div
                  key={layerName}
                  aria-hidden="true"
                  className={`studio-note-particle-layer studio-note-particle-layer-${layerName} pointer-events-none absolute inset-0 z-0`}
                >
                  {studioNoteParticles
                    .filter((p) => p.layer === layerName)
                    .map((p, idx) => (
                      <div
                        key={idx}
                        className="studio-note-particle absolute rounded-full"
                        style={{
                          top: `${p.top}%`,
                          left: `${p.left}%`,
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                          backgroundColor: p.color,
                          boxShadow: `0 0 12px ${p.color}`,
                          "--particle-target-opacity": p.opacity,
                          animationName: reduced ? "none" : `lux-particle-drift-${p.pattern}`,
                          animationDuration: reduced ? undefined : `${p.duration}s`,
                          animationDelay: reduced ? undefined : `${p.delay}s`,
                          animationTimingFunction: reduced ? undefined : "ease-in-out",
                          animationIterationCount: reduced ? undefined : "infinite",
                        } as React.CSSProperties}
                      />
                    ))}
                </div>
              ))}
              {/* Hover-only readability scrim, sits above particles, below text.
                  Was unconditionally a dark scrim (bg-[#03050a]/25) — needed in
                  dark mode to keep text readable over the busy particle field,
                  but a dark patch appearing on hover over a now-light card
                  would read as a bug, not a feature. Light mode gets a light
                  scrim serving the same "calm the particles down" purpose. */}
              <div aria-hidden="true" className={`studio-note-scrim pointer-events-none absolute inset-0 z-[1] ${isLight ? "bg-white/45" : "bg-[#03050a]/25"}`} />
              {/* Studio signal dot */}
              <div className="absolute end-8 top-8 z-10 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[0.8px] ${isLight ? "text-[#64748B]" : "text-[#f5f7fa38]"}`}>{t.studioNote.badgeBrand}</span>
              </div>

              <div className="relative z-10">
                <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.studioNote.eyebrow}</p>
                <h2 className={`mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.07] tracking-[-0.8px] lg:text-[38px] lg:tracking-[-1.1px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
                  {t.studioNote.heading}
                </h2>
                <p className={`mt-7 max-w-[680px] [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[28px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
                  {t.studioNote.body1}
                </p>
                <p className={`mt-5 max-w-[680px] [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[28px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
                  {t.studioNote.body2}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ STUDIO SIGNAL / CONNECTED LAYERS ══════════════ */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(38,100,255,0.09) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.signal.eyebrow}</p>
            <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
              {t.signal.heading}
            </h2>
            <p className={`mx-auto mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
              {t.signal.body}
            </p>
          </motion.div>

          {/* Central signal element with floating layer words */}
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
            className="relative mx-auto flex max-w-[640px] flex-wrap justify-center gap-3"
          >
            {t.signal.layers.map((word, i) => (
              <motion.span
                key={word}
                initial={reduced ? { opacity: 0.55 } : { opacity: 0, y: 10 }}
                // Dark mode: unchanged constellation opacity spread (0.38-0.7).
                // Light mode: same three-tier pattern, but with a much higher
                // floor (0.55-0.85) — this per-word opacity multiplies with
                // the (already solid) light-mode text color, and the old
                // floor of 0.38 is exactly the "parent opacity washes out
                // text" failure mode on a light background.
                whileInView={{
                  opacity: isLight
                    ? (i % 3 === 0 ? 0.85 : i % 2 === 0 ? 0.65 : 0.55)
                    : (i % 3 === 0 ? 0.7 : i % 2 === 0 ? 0.5 : 0.38),
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                whileHover={
                  reduced
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        scale: 1.04,
                        y: -2,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                style={{ transformOrigin: "center" }}
                className={`relative cursor-pointer select-none rounded-full border px-4 py-2 [font-family:'Inter',Helvetica] text-[13px] font-normal [transition:color_500ms_cubic-bezier(0.22,1,0.36,1),border-color_500ms_cubic-bezier(0.22,1,0.36,1),background-color_500ms_cubic-bezier(0.22,1,0.36,1),box-shadow_500ms_cubic-bezier(0.22,1,0.36,1)] [will-change:transform,box-shadow] hover:z-[5] hover:border-[rgba(56,189,248,0.6)] hover:bg-[rgba(56,189,248,0.14)] hover:text-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.35),0_0_50px_rgba(56,189,248,0.18),inset_0_1px_0_rgba(255,255,255,0.14)] ${
                  isLight
                    ? "border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.6)] text-[#475569]"
                    : "border-white/[0.10] bg-white/[0.04] text-[#f5f7fa99]"
                }`}
              >
                {word}
              </motion.span>
            ))}
            {/* Central glow dot */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" style={{ backgroundColor: "rgba(56,189,248,0.15)" }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.values.eyebrow}</p>
            <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
              {t.values.heading}
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.values.items.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.08} viewport={{ once: true, margin: "-40px" }}
                whileHover={reduced ? {} : { y: -4, scale: 1.015, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                whileFocus={reduced ? {} : { y: -4, scale: 1.015, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                tabIndex={0}
                style={{ transformOrigin: "center" }}
                className={`group relative overflow-hidden rounded-[20px] border p-7 backdrop-blur-sm outline-none [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(56,189,248,0.45)] focus-visible:border-[rgba(56,189,248,0.45)] ${
                  isLight
                    ? "border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.72)] shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.08),0_0_40px_rgba(56,189,248,0.16)] focus-visible:shadow-[0_18px_50px_rgba(15,23,42,0.08),0_0_40px_rgba(56,189,248,0.16)]"
                    : "border-white/[0.11] bg-white/[0.04] hover:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08)] focus-visible:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08)]"
                } ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Gradient overlay — Stripe-style blended color, hidden until hover/focus */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 [transition:opacity_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(124,58,237,0.18), transparent 40%), linear-gradient(135deg, rgba(56,189,248,0.08), rgba(124,58,237,0.08))",
                  }}
                />

                {/* Decorative mini bar chart — Stripe-style, appears on hover/focus only */}
                <div aria-hidden="true" className="pointer-events-none absolute bottom-5 right-6 z-0 flex items-end gap-[3px]">
                  {[18, 34, 26, 52, 40, 72, 46, 60, 28].map((h, bi) => (
                    <div
                      key={bi}
                      className={`w-[3px] origin-bottom rounded-t-sm opacity-0 ${reduced ? "" : "scale-y-0"} [transition:opacity_500ms_ease,transform_700ms_cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 ${reduced ? "" : "group-hover:scale-y-100 group-focus-visible:scale-y-100"}`}
                      style={{
                        height: `${h}px`,
                        backgroundColor: "rgba(56,189,248,0.65)",
                        boxShadow: "0 0 12px rgba(56,189,248,0.35)",
                        transitionDelay: reduced ? "0ms" : `${bi * 60}ms`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.5px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:text-[#38bdf8] group-focus-visible:text-[#38bdf8] ${isLight ? "text-[#0284c7]" : "text-[#38bdf880]"}`}>{v.num}</span>
                  <h3
                    className={`mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] [transition:text-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] ${
                      isLight
                        ? "text-[#0F172A] group-hover:[text-shadow:0_0_16px_rgba(14,165,233,0.25)] group-focus-visible:[text-shadow:0_0_16px_rgba(14,165,233,0.25)]"
                        : "text-[#f5f7fa] group-hover:[text-shadow:0_0_16px_rgba(255,255,255,0.28)] group-focus-visible:[text-shadow:0_0_16px_rgba(255,255,255,0.28)]"
                    }`}
                  >
                    {v.title}
                  </h3>
                  <p
                    className={`mt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] ${
                      isLight
                        ? "text-[#475569] group-hover:text-[#334155] group-focus-visible:text-[#334155]"
                        : "text-[#f5f7faa6] group-hover:text-[#f5f7fac2] group-focus-visible:text-[#f5f7fac2]"
                    }`}
                  >
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection
        eyebrow={t.cta.eyebrow}
        heading={<>{t.cta.headingBefore}<br className="hidden lg:block" /> {t.cta.headingAfter}</>}
        description={t.cta.description}
        secondaryLabel={common.actions.viewWork}
        secondaryHref="/work"
        primaryTestId="button-about-cta-start"
        secondaryTestId="button-about-cta-work"
      />

      </div>
      <FooterRevealStage />
    </div>
  );
};
