import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { processPageDict } from "@/lib/i18n/processPage";
import { scrollToHashTarget } from "@/lib/scrollToHash";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { pageMeta, pageBreadcrumbs } from "@/lib/seo/pageMeta";

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared fade-up animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Section wrapper ─── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative w-full ${className}`}>{children}</section>
);

/* ─── Glass card ─── */
const GlassCard = ({
  children,
  className = "",
  isLight = false,
}: {
  children: React.ReactNode;
  className?: string;
  isLight?: boolean;
}) => (
  <div
    className={`rounded-[20px] border backdrop-blur-sm ${
      isLight
        ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.72)] shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
        : "border-white/[0.11] bg-white/[0.04]"
    } ${className}`}
  >
    {children}
  </div>
);

/* ─── Hero spectral gradient — a real WebGL fragment-shader flowing mesh
   (same technique as stripe.com's hero canvas), not blurred CSS shapes.
   Domain-warped fractal noise drives a seamless, liquid color blend between
   violet/indigo/blue/cyan, fading to the page's dark background at the edges
   via a vignette baked into the shader itself — so it's naturally immune to
   how tall the section renders (no percentage-of-parent positioning at all,
   every coordinate is relative to the canvas's own live pixel size). ─── */
const PROCESS_GRADIENT_VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = (aPosition + 1.0) * 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const PROCESS_GRADIENT_FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uIsLight;
  varying vec2 vUv;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;
    p *= 2.3;

    float t = uTime * 0.045;

    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p + 3.2 * q + vec2(1.7, 9.2) + 0.12 * t),
      fbm(p + 3.2 * q + vec2(8.3, 2.8) + 0.09 * t)
    );
    float n = fbm(p + 3.4 * r);

    vec3 dark   = vec3(0.012, 0.020, 0.039);
    vec3 indigo = vec3(0.302, 0.235, 0.831);
    vec3 violet = vec3(0.545, 0.361, 0.965);
    vec3 blue   = vec3(0.161, 0.357, 0.965);
    vec3 cyan   = vec3(0.216, 0.741, 0.973);

    vec3 color = mix(dark, indigo, smoothstep(0.15, 0.55, n));
    color = mix(color, violet, smoothstep(0.35, 0.75, r.x));
    color = mix(color, blue, smoothstep(0.45, 0.85, q.y) * 0.7);
    color = mix(color, cyan, smoothstep(0.6, 0.95, r.y) * 0.5);

    vec2 edgeDist = abs(vUv - 0.5);
    float fadeX = 1.0 - smoothstep(0.32, 0.5, edgeDist.x);
    float fadeY = 1.0 - smoothstep(0.28, 0.5, edgeDist.y);
    float vign = fadeX * fadeY;

    // Dark mode: unchanged, mixes all the way down to near-black at the
    // edges (vign reaches 0 in the corners). Light mode: the vignette is
    // disabled entirely (vignMix pinned to 1.0) — the flowing color field
    // renders at full strength edge to edge, no dark mixing anywhere.
    // uIsLight blends between the two so dark mode's math is byte-identical
    // to before.
    float vignMix = mix(vign, 1.0, uIsLight);
    color = mix(dark, color, vignMix);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileProcessGradientShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const ProcessHeroGradient = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(true);
  const isLightRef = useRef(isLight);
  const redrawRef = useRef<((elapsedSeconds: number) => void) | null>(null);

  // Kept in a ref (not a rerun of the WebGL-setup effect below) so toggling
  // theme doesn't tear down and recompile the whole GL program — the rAF
  // loop just reads the latest value each frame. With reduced motion there's
  // no loop to pick it up on its own, so force one redraw when it changes.
  useEffect(() => {
    isLightRef.current = isLight;
    if (reduced) redrawRef.current?.(0);
  }, [isLight, reduced]);

  // This shader recomputes a 5-octave fractal-noise field per pixel, every
  // frame — real GPU/CPU cost, not free decoration. Without gating, it kept
  // rendering continuously for as long as the page was open, including the
  // entire time a visitor had scrolled far past the hero into the pinned
  // ScrollTrigger section further down — competing for the same per-frame
  // budget as that section's scrub updates, which is what a busy background
  // animation "stealing" frames from scroll-driven work actually feels like:
  // stutter that reads as lag, not a rendering bug in the pin itself.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "200px 0px" },
    );
    io.observe(canvas);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vertexShader = compileProcessGradientShader(gl, gl.VERTEX_SHADER, PROCESS_GRADIENT_VERTEX_SHADER);
    const fragmentShader = compileProcessGradientShader(gl, gl.FRAGMENT_SHADER, PROCESS_GRADIENT_FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const isLightLocation = gl.getUniformLocation(program, "uIsLight");

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const startTime = performance.now();
    let rafId = 0;

    function draw(elapsedSeconds: number) {
      gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLocation, elapsedSeconds);
      gl!.uniform1f(isLightLocation, isLightRef.current ? 1.0 : 0.0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    redrawRef.current = draw;

    function loop(now: number) {
      if (visibleRef.current) draw((now - startTime) / 1000);
      rafId = requestAnimationFrame(loop);
    }

    if (reduced) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      redrawRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ─── Flight Path timeline — auto-advancing glow states.
   Every 2s the active stage moves forward one step (looping after the last),
   and each node's border/text/glow is derived purely from comparing its own
   index to the active index (upcoming / active / completed). A glowing
   progress line grows to meet the active node. Only transform, opacity,
   border-color, text color, and box-shadow are transitioned — no width or
   height changes on the circles, so nothing shifts layout. ─── */
const FLIGHT_STAGE_INTERVAL_MS = 2000;
const FLIGHT_STATE_TRANSITION = "border-color 750ms cubic-bezier(0.22,1,0.36,1), background-color 750ms cubic-bezier(0.22,1,0.36,1), box-shadow 750ms cubic-bezier(0.22,1,0.36,1), transform 750ms cubic-bezier(0.22,1,0.36,1), color 750ms cubic-bezier(0.22,1,0.36,1)";

type FlightStageState = "upcoming" | "active" | "completed";

function getFlightStageState(index: number, activeIndex: number): FlightStageState {
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

const FlightPathTimeline = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const flightNodes = useDict(processPageDict).flightPath.nodes;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flightNodes.length);
    }, FLIGHT_STAGE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [reduced]);

  const progressScale = ((activeIndex + 0.5) / flightNodes.length);

  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
      <style>{`
        @keyframes lux-flight-active-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(56,189,248,0.55), 0 0 42px rgba(56,189,248,0.22); }
          50%      { box-shadow: 0 0 26px rgba(56,189,248,0.72), 0 0 54px rgba(56,189,248,0.32); }
        }
      `}</style>

      {/* Base dim line across the whole journey (desktop) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[28px] hidden h-px lg:block"
        style={{
          background: isLight
            ? "linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.14) 8%, rgba(15,23,42,0.14) 92%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 8%, rgba(255,255,255,0.14) 92%, transparent 100%)",
        }}
      />

      {/* Animated glow progress line — grows to meet the active stage (desktop) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[28px] hidden h-px w-full origin-left rtl:origin-right lg:block"
        style={{
          transform: reduced ? `scaleX(${(0.5 / flightNodes.length)})` : `scaleX(${progressScale})`,
          transition: reduced ? undefined : "transform 750ms cubic-bezier(0.22,1,0.36,1)",
          background: "linear-gradient(90deg, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0.55) 80%, rgba(56,189,248,0.85) 100%)",
          boxShadow: "0 0 10px rgba(56,189,248,0.3)",
        }}
      />

      {flightNodes.map((node, i) => {
        const state: FlightStageState = reduced ? (i === 0 ? "active" : "upcoming") : getFlightStageState(i, activeIndex);
        const isActive = state === "active";
        const isCompleted = state === "completed";

        return (
          <motion.div
            key={node.num}
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.08} viewport={{ once: true }}
            className="relative flex flex-1 flex-col items-center"
          >
            {/* Connecting line (mobile) */}
            {i < flightNodes.length - 1 && (
              <div aria-hidden="true" className="absolute left-[27px] top-[56px] h-6 w-px bg-[#38bdf830] lg:hidden" />
            )}

            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full border"
              style={{
                borderColor: isActive
                  ? "#38bdf8"
                  : isCompleted
                    ? "rgba(56,189,248,0.45)"
                    : isLight ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.16)",
                backgroundColor: isActive
                  ? (isLight ? "rgba(14,165,233,0.12)" : "rgba(56,189,248,0.1)")
                  : isCompleted
                    ? "rgba(56,189,248,0.06)"
                    : isLight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.02)",
                boxShadow: isActive
                  ? "0 0 18px rgba(56,189,248,0.55), 0 0 42px rgba(56,189,248,0.22)"
                  : isCompleted
                    ? "0 0 14px rgba(56,189,248,0.20)"
                    : "none",
                transform: isActive ? "scale(1.06)" : "scale(1)",
                transition: FLIGHT_STATE_TRANSITION,
                animation: isActive && !reduced ? "lux-flight-active-pulse 2s ease-in-out infinite" : undefined,
              }}
            >
              <span
                className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1px]"
                style={{
                  color: isActive
                    ? (isLight ? "#0284c7" : "#ffffff")
                    : isCompleted
                      ? "rgba(56,189,248,0.85)"
                      : isLight ? "#94A3B8" : "rgba(245,247,250,0.35)",
                  transition: FLIGHT_STATE_TRANSITION,
                }}
              >
                {node.num}
              </span>
            </div>
            <p
              className="mt-3 text-center [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px]"
              style={{
                color: isActive
                  ? (isLight ? "#0F172A" : "#f5f7fa")
                  : isCompleted
                    ? (isLight ? "#475569" : "rgba(245,247,250,0.7)")
                    : isLight ? "#94A3B8" : "rgba(245,247,250,0.35)",
                transition: FLIGHT_STATE_TRANSITION,
              }}
            >
              {node.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── Detailed Stages timeline — scroll-driven glow states.
   A single IntersectionObserver watches each stage's number circle; whichever
   one is centered in a thin band around 45%-60% of the viewport becomes
   active, everything above it is completed, everything below stays upcoming.
   Only transform, opacity, border-color, text color, and box-shadow are
   transitioned — the circles never move or resize their own box. ─── */
const STAGE_TRIGGER_ROOT_MARGIN = "-45% 0px -40% 0px";
const STAGE_STATE_TRANSITION = "border-color 700ms cubic-bezier(0.22,1,0.36,1), background-color 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1), color 700ms cubic-bezier(0.22,1,0.36,1)";
// Faster, dedicated timing for the new hover-reactive elements (title,
// description, cards) — kept separate from STAGE_STATE_TRANSITION above so
// the circle/number's existing scroll-active pacing (700ms, tuned for how
// slowly a stage scrolls into "active") isn't sped up as a side effect.
const STAGE_HOVER_TRANSITION = "color 250ms ease-out, border-color 250ms ease-out, background-color 250ms ease-out";

type DetailedStageState = "upcoming" | "active" | "completed";

function getDetailedStageState(index: number, activeIndex: number): DetailedStageState {
  if (activeIndex < 0) return "upcoming";
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

const DetailedStagesTimeline = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const t = useDict(processPageDict);
  const stages = t.stages;
  const { whatHappensLabel, clientInvolvementLabel } = t.stagesSection;
  const { dir } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(-1);
  // Hover is a second, independent input into the same "highlighted" look
  // the scroll-active stage already uses — it never touches activeIndex
  // itself, so scroll position stays the sole owner of which stage is
  // "really" active; hovering another stage just temporarily borrows the
  // same visual treatment for that stage too.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = markerRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: STAGE_TRIGGER_ROOT_MARGIN, threshold: 0 },
    );

    markerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progressScale = activeIndex < 0 ? 0 : (activeIndex + 1) / stages.length;

  return (
    <div className="relative flex flex-col gap-0">
      <style>{`
        @keyframes lux-stage-active-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(56,189,248,0.55), 0 0 44px rgba(56,189,248,0.22); }
          50%      { box-shadow: 0 0 26px rgba(56,189,248,0.72), 0 0 56px rgba(56,189,248,0.32); }
        }
      `}</style>

      {/* Base dim vertical line — start-7 (logical) keeps it anchored under
          the stage circle's center on whichever side the circle actually
          renders on: the circle is the first child of a plain flex row
          (`flex gap-8`), so it sits at the row's start edge automatically in
          both directions (left in LTR, right in RTL) — this line just needs
          to track that same "start" edge instead of a hardcoded left. The
          translateX sign has to flip too: translate is a physical (not
          logical) transform, so "shift toward the start" means -50% in LTR
          but +50% in RTL. */}
      <div
        aria-hidden="true"
        className={`absolute start-7 top-0 bottom-0 w-px -translate-x-1/2 rtl:translate-x-1/2 bg-gradient-to-b from-transparent to-transparent ${
          isLight ? "via-[rgba(15,23,42,0.12)]" : "via-white/[0.08]"
        }`}
      />

      {/* Glowing progress line — grows down to meet the active/completed stages */}
      <div
        aria-hidden="true"
        className="absolute start-7 top-0 h-full w-px origin-top"
        style={{
          transform: `translateX(${dir === "rtl" ? "50%" : "-50%"}) scaleY(${progressScale})`,
          transition: reduced ? undefined : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          background: "linear-gradient(180deg, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0.35) 88%, rgba(56,189,248,0.15) 100%)",
        }}
      />

      {stages.map((stage, i) => {
        const state = getDetailedStageState(i, activeIndex);
        const isActive = state === "active";
        const isCompleted = state === "completed";
        // Hover borrows the exact same "highlighted" look active already
        // has — it never changes activeIndex/isCompleted, so scroll stays
        // the sole owner of real active/completed state; this only affects
        // which stages currently render with that look.
        const isHighlighted = isActive || hoveredIndex === i;

        return (
          <motion.div
            key={stage.num}
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.05} viewport={{ once: true, margin: "-60px" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
            className="group relative flex gap-8 pb-12 [transition:transform_250ms_ease-out] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 lg:gap-12 lg:pb-16"
          >
            {/* Stage number dot */}
            <div className="relative shrink-0">
              <div
                ref={(el) => { markerRefs.current[i] = el; }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full border"
                style={{
                  borderColor: isHighlighted
                    ? "#38bdf8"
                    : isCompleted
                      ? "rgba(56,189,248,0.45)"
                      : isLight ? "rgba(15,23,42,0.14)" : "rgba(255,255,255,0.12)",
                  // Was an unconditional #03050a fill regardless of theme —
                  // every circle (active, completed, or upcoming) rendered as
                  // a small near-black dot in light mode. Active gets a light
                  // blue fill (matching the Flight Path timeline above it for
                  // visual consistency); inactive gets a plain white fill.
                  backgroundColor: isHighlighted
                    ? (isLight ? "rgba(14,165,233,0.12)" : "#03050a")
                    : isLight ? "rgba(255,255,255,0.9)" : "#03050a",
                  boxShadow: isHighlighted
                    ? "0 0 18px rgba(56,189,248,0.55), 0 0 44px rgba(56,189,248,0.22)"
                    : isCompleted
                      ? "0 0 14px rgba(56,189,248,0.18)"
                      : "none",
                  transform: isHighlighted && !reduced ? "scale(1.04)" : "scale(1)",
                  transition: STAGE_STATE_TRANSITION,
                  animation: isHighlighted && !reduced ? "lux-stage-active-pulse 2.4s ease-in-out infinite" : undefined,
                }}
              >
                <span
                  className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1px]"
                  style={{
                    color: isHighlighted
                      ? (isLight ? "#0284c7" : "#38bdf8")
                      : isCompleted
                        ? "rgba(56,189,248,0.75)"
                        : isLight ? "#94A3B8" : "rgba(245,247,250,0.4)",
                    transition: STAGE_STATE_TRANSITION,
                  }}
                >
                  {stage.num}
                </span>
              </div>
            </div>

            {/* Stage content */}
            <div className="flex-1 pt-2">
              <h3
                className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium tracking-[-0.5px] lg:text-[28px]"
                style={{
                  color: isHighlighted ? (isLight ? "#0284c7" : "#38bdf8") : isLight ? "#0F172A" : "#f5f7fa",
                  transition: STAGE_HOVER_TRANSITION,
                }}
              >
                {stage.title}
              </h3>
              <p
                className="mt-3 max-w-[580px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[25px]"
                style={{
                  color: isHighlighted
                    ? (isLight ? "#1e293b" : "#e2e8f0")
                    : isLight ? "#475569" : "#f5f7faa6",
                  transition: STAGE_HOVER_TRANSITION,
                }}
              >
                {stage.description}
              </p>

              <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:gap-10">
                {/* What happens — bespoke div (mirrors GlassCard's own base
                    recipe) instead of <GlassCard> so it can carry a
                    highlighted state the shared component doesn't have,
                    same reasoning as "Client involvement" below. */}
                <div
                  className="flex-1 rounded-[20px] border p-6 backdrop-blur-sm"
                  style={{
                    borderColor: isLight
                      ? isHighlighted ? "rgba(2,132,199,0.35)" : "rgba(15,23,42,0.10)"
                      : isHighlighted ? "rgba(56,189,248,0.28)" : "rgba(255,255,255,0.11)",
                    backgroundColor: isLight
                      ? isHighlighted ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.72)"
                      : isHighlighted ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                    boxShadow: isLight ? "0 18px 50px rgba(15,23,42,0.08)" : undefined,
                    transition: STAGE_HOVER_TRANSITION,
                  }}
                >
                  <p className={`mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{whatHappensLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.happens.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[12px] ${
                          isLight
                            ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.06)] text-sky-700"
                            : "border-white/[0.10] bg-white/[0.06] text-[#f5f7fa99]"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client involvement — deliberately NOT routed through
                    GlassCard: it needs a highlighted state (active-or-hover)
                    GlassCard doesn't have, in both themes now — light already
                    had a distinct look while active, dark previously had
                    none at all (always plain GlassCard styling regardless of
                    state), which is what this pass adds. */}
                <div
                  className="flex-1 rounded-[20px] border p-6"
                  style={{
                    borderColor: isLight
                      ? isHighlighted ? "rgba(14,165,233,0.38)" : "rgba(148,163,184,0.12)"
                      : isHighlighted ? "rgba(56,189,248,0.30)" : "rgba(255,255,255,0.11)",
                    backgroundColor: isLight
                      ? isHighlighted ? "rgba(224,242,254,0.55)" : "rgba(255,255,255,0.25)"
                      : isHighlighted ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                    boxShadow: isLight && isHighlighted ? "0 18px 45px rgba(14,165,233,0.12)" : undefined,
                    backdropFilter: isLight && isHighlighted ? "blur(4px)" : undefined,
                    transition: STAGE_HOVER_TRANSITION,
                  }}
                >
                  <p className={`mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{clientInvolvementLabel}</p>
                  <p
                    className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px]"
                    style={{
                      color: isLight
                        ? isHighlighted ? "#0F172A" : "#475569"
                        : isHighlighted ? "#e2e8f0" : "#f5f7faa6",
                      transition: STAGE_HOVER_TRANSITION,
                    }}
                  >
                    {stage.client}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── Approval Gates — pinned, scroll-controlled reveal (desktop only).
   Mirrors the same GSAP ScrollTrigger technique already used by the Home
   page's "What We Create" section (OfferingsOverviewSection.tsx): the
   section pins in place, a single scrubbed timeline reveals label -> heading
   -> body -> each card in order, then holds briefly before unpinning. On
   mobile or with prefers-reduced-motion, pinning is skipped entirely and
   everything renders normally, in its final visible state. ─── */
const ApprovalGatesSection = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const { label, heading, body, gates: approvalGates } = useDict(processPageDict).approvalGates;
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

  const animOff = reduced || isMobile;

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  useLayoutEffect(() => {
    if (animOff) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(labelRef.current, { autoAlpha: 0, y: 32, filter: "blur(8px)" });
      gsap.set(headingRef.current, { autoAlpha: 0, y: 32, filter: "blur(8px)" });
      gsap.set(bodyRef.current, { autoAlpha: 0, y: 32, filter: "blur(8px)" });
      cards.forEach((card, i) => {
        gsap.set(card, {
          autoAlpha: 0,
          x: (i % 2 === 0 ? -1 : 1) * 96,
          filter: "blur(8px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(labelRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" });
      tl.to(headingRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" });
      tl.to(bodyRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none" });
      cards.forEach((card) => {
        tl.to(card, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "none" });
      });
      // Brief hold so the user sees the completed grid before the section unpins
      tl.to({}, { duration: 0.8 });
    }, sectionRef);

    return () => ctx.revert();
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${animOff ? "py-24 lg:py-32" : "overflow-hidden"}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(56,189,248,0.07)" }} />
      <div
        className={`relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12 ${animOff ? "" : "flex h-screen flex-col justify-center"}`}
      >
        <div className="mb-14">
          <p ref={labelRef} className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{label}</p>
          <h2 ref={headingRef} className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
            {heading}
          </h2>
          <p ref={bodyRef} className={`mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
            {body}
          </p>
        </div>

        {/* sm:auto-rows-fr forces both rows to the height of their tallest
            card — since Arabic gate text wraps to a different number of
            lines per card, a plain grid would leave each card at its own
            natural (uneven) height. Gated to sm: so mobile's single-column
            stack keeps each card's natural height instead of being forced
            to match the tallest of all four. items-stretch is CSS Grid's
            default anyway, but stated explicitly since the fix depends on
            it. */}
        <div className="grid gap-4 sm:grid-cols-2 sm:auto-rows-fr sm:items-stretch">
          {approvalGates.map((gate, i) => (
            <div key={gate.num} ref={(el) => { cardRefs.current[i] = el; }} className="h-full">
              {/* h-full here is what actually turns the grid row's stretched
                  track height into extra bottom padding-space rather than a
                  no-op: the wrapper div above stretches for free (grid
                  align-items:stretch), but GlassCard is a plain block child
                  of it and would otherwise size to its own content only. */}
              <GlassCard className="flex h-full flex-col p-7 lg:p-8" isLight={isLight}>
                <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.5px] ${isLight ? "text-[#0284c7]" : "text-[#38bdf880]"}`}>{gate.num}</span>
                <h3 className={`mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>{gate.title}</h3>
                <p className={`mt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[23px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>{gate.desc}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Page ─── */
export const ProcessPage = (): JSX.Element => {
  useSEO(pageMeta.process);
  useJSONLD("breadcrumb", buildBreadcrumbSchema(pageBreadcrumbs.process));
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(processPageDict);

  // Landed here via a cross-page anchor (e.g. Home's "Discover Our Approach"
  // CTA, /process#approach) — scroll to that section once it's actually in
  // the DOM, offset for the sticky navbar. ScrollToTop (mounted once at the
  // app root) resets scroll to 0 first on this same navigation; this effect
  // runs after and takes over with the smooth scroll to the real target.
  // Same pattern as ServicesPage's own mount effect.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) scrollToHashTarget(hash);
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-x-clip ${isLight ? "bg-[#F8FBFF] text-[#0f172a]" : "text-[#f5f7fa]"}`}>
      <div className="page-content-layer">

      {/* ══════════════ HERO ══════════════ */}
      {/* Hero artwork/composition/typography stays exactly as-is in both
          themes per explicit instruction. Only touch: the shader's own
          vignette is fully disabled in light mode via its uIsLight uniform
          (see ProcessHeroGradient/the fragment shader source) — no dark
          edge mixing at all, full color shows edge to edge. No CSS overlay
          of any kind sits on top of the canvas in either theme. */}
      <Section className="flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Stars background */}
        <img className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" alt="" aria-hidden="true" src="/figmaAssets/backgroundstars-2.svg" />
        {/* Spectral gradient blobs */}
        <ProcessHeroGradient reduced={reduced} isLight={isLight} />
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-6 text-center sm:px-8">
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] uppercase"
            style={{ color: "var(--hero-eyebrow-text-fixed)", textShadow: "var(--hero-eyebrow-text-fixed-shadow)" }}
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
            className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.04] tracking-[-1.4px] text-[#f5f7fa] sm:text-[54px] lg:text-[72px] lg:tracking-[-2.2px]"
          >
            {t.hero.headingLine1}<br />{t.hero.headingLine2}
          </motion.h1>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
            className="mt-7 max-w-[600px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
          >
            {t.hero.body}
          </motion.p>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
            className="mt-10 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px]"
            style={{ color: "var(--hero-accent-text-fixed)", textShadow: "var(--hero-accent-text-fixed-shadow)" }}
          >
            {t.hero.tagline}
          </motion.p>
        </div>
      </Section>

      {/* ══════════════ FLIGHT PATH OVERVIEW ══════════════ */}
      {/* id="approach" is the cross-page landing target for the Home page's
          "Discover Our Approach" CTA (MissionStatementSection) — this is the
          first section that actually summarizes the studio's approach/
          methodology as a single connected journey (Discover → Define →
          Create → Design → Build & Connect → Optimize/Launch/Support), so it
          reads as the direct answer to "our approach" rather than the page's
          hero (too generic) or a later single-stage section (too narrow). */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[160px]" style={{ backgroundColor: "rgba(56,189,248,0.06)" }} />
        <div id="approach" className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12 scroll-mt-[110px]">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.flightPath.label}</p>
            <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
              {t.flightPath.heading}
            </h2>
          </motion.div>

          {/* Nodes — horizontal on desktop, vertical on mobile */}
          <FlightPathTimeline reduced={reduced} isLight={isLight} />
        </div>
      </Section>

      {/* ══════════════ DETAILED STAGES ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-16"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.stagesSection.label}</p>
            <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
              {t.stagesSection.heading}
            </h2>
          </motion.div>

          <DetailedStagesTimeline reduced={reduced} isLight={isLight} />
        </div>
      </Section>

      {/* ══════════════ APPROVAL GATES ══════════════ */}
      <ApprovalGatesSection reduced={reduced} isLight={isLight} />

      {/* ══════════════ WHAT WE NEED ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
              className="lg:w-[42%]"
            >
              <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.clientInputs.label}</p>
              <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[40px] lg:tracking-[-1.2px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                {t.clientInputs.heading}
              </h2>
              <p className={`mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
                {t.clientInputs.body}
              </p>
            </motion.div>

            <div className="flex-1">
              <div className="flex flex-col gap-3">
                {t.clientInputs.items.map((item, i) => (
                  <motion.div
                    key={item}
                    variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                    className={`flex items-start gap-3.5 rounded-xl border px-5 py-4 ${
                      isLight ? "border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.6)]" : "border-white/[0.09] bg-white/[0.03]"
                    }`}
                  >
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${isLight ? "text-[#0284c7]" : "text-[#38bdf880]"}`} />
                    <span className={`[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════ LAUNCH CHECKLIST ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-12"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.launchChecklist.label}</p>
            <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[44px] lg:tracking-[-1.3px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
              {t.launchChecklist.headingLine1}<br className="hidden lg:block" /> {t.launchChecklist.headingLine2}
            </h2>
            <p className={`mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
              {t.launchChecklist.body}
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.launchChecklist.items.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${
                  isLight ? "border-[rgba(148,163,184,0.22)] bg-[rgba(255,255,255,0.6)]" : "border-white/[0.09] bg-white/[0.03]"
                }`}
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                <span className={`[font-family:'Inter',Helvetica] text-[13.5px] font-normal ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <FinalCtaSection
        eyebrow={t.cta.eyebrow}
        heading={t.cta.heading}
        description={t.cta.description}
        secondaryLabel={t.cta.secondaryLabel}
        secondaryHref="/work"
        primaryTestId="button-process-cta-start"
        secondaryTestId="button-process-cta-work"
      />

      </div>
      <FooterRevealStage />
    </div>
  );
};
