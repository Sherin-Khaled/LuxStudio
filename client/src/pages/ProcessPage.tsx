import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useProjectModal } from "@/contexts/ProjectModalContext";

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

/* ─── Data ─── */
const flightNodes = [
  { num: "01", label: "Discover" },
  { num: "02", label: "Define" },
  { num: "03", label: "Create" },
  { num: "04", label: "Design" },
  { num: "05", label: "Build & Connect" },
  { num: "06", label: "Optimize, Launch & Support" },
];

const stages = [
  {
    num: "01",
    title: "Discover",
    description:
      "We start by understanding the business, audience, goals, services, products, competitors, and the digital problem the website or system needs to solve.",
    happens: ["Business discovery", "Audience understanding", "Project goals", "Competitor review", "Website purpose", "Initial direction"],
    client: "Client shares business details, current problems, goals, and available references.",
  },
  {
    num: "02",
    title: "Define",
    description:
      "We turn the discovery into structure: sitemap, user journey, page priorities, features, content needs, and the experience direction.",
    happens: ["Sitemap", "User flows", "Page structure", "Feature planning", "Content outline", "Technical direction"],
    client: "Client reviews and approves the structure before visual design begins.",
  },
  {
    num: "03",
    title: "Create",
    description:
      "We prepare the content and visual assets that support the website, including written content, product data, images, graphics, and media direction when needed.",
    happens: ["Website copy", "Content shaping", "Product data", "Image direction", "Photo editing", "Video / graphic support"],
    client: "Client provides business information, numbers, product details, and brand assets. We shape them into website-ready content.",
  },
  {
    num: "04",
    title: "Design",
    description:
      "We design the interface, visual system, responsiveness, interactions, and page experience with both users and development in mind.",
    happens: ["Wireframes", "UI direction", "High-fidelity screens", "Responsive layouts", "Design system", "Motion direction"],
    client: "Client reviews the design, gives feedback, and approves the visual direction before development.",
  },
  {
    num: "05",
    title: "Build & Connect",
    description:
      "We build the frontend, connect backend logic when needed, prepare dashboards, CMS systems, APIs, authentication, product flows, and real business functionality.",
    happens: ["Frontend development", "Backend development", "CMS / dashboard", "APIs", "Authentication", "E-commerce logic", "Database structure"],
    client: "Client tests key flows and confirms that the system behavior matches the business needs.",
  },
  {
    num: "06",
    title: "Optimize, Launch & Support",
    description:
      "We test responsiveness, speed, SEO, accessibility basics, content accuracy, deployment readiness, hosting, and post-launch updates.",
    happens: ["Performance testing", "SEO setup", "Responsive QA", "Accessibility basics", "Hosting / deployment", "Future support"],
    client: "Client gives final approval before launch and can continue with future improvements or maintenance.",
  },
];

const approvalGates = [
  { num: "01", title: "Structure Approval", desc: "Sitemap, pages, user flow, and feature direction are reviewed before design." },
  { num: "02", title: "Design Approval", desc: "Visual direction, layouts, responsiveness, and interaction ideas are approved before development." },
  { num: "03", title: "Build Review", desc: "Core flows, backend behavior, dashboards, CMS, and forms are tested before final polish." },
  { num: "04", title: "Launch Approval", desc: "Speed, SEO, responsiveness, content, and deployment readiness are checked before going live." },
];

const clientInputs = [
  "Business details",
  "Services or product information",
  "Brand assets or references",
  "Photos, videos, or visual material",
  "Target audience information",
  "Website goals",
  "Access to hosting, domain, or existing systems when needed",
  "Feedback and approvals at key stages",
];

const launchChecklist = [
  "Responsive behavior",
  "Speed and performance",
  "SEO structure",
  "Content accuracy",
  "Forms and contact flows",
  "CMS / dashboard access",
  "Image optimization",
  "Hosting and deployment",
  "Basic accessibility",
  "Post-launch updates",
];

/* ─── Section wrapper ─── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative w-full ${className}`}>{children}</section>
);

/* ─── Glass card ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] backdrop-blur-sm ${className}`}>
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
    color = mix(dark, color, vign);

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

const ProcessHeroGradient = ({ reduced }: { reduced: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(true);

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
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

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

const FlightPathTimeline = ({ reduced }: { reduced: boolean }) => {
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
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 8%, rgba(255,255,255,0.14) 92%, transparent 100%)" }}
      />

      {/* Animated glow progress line — grows to meet the active stage (desktop) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[28px] hidden h-px w-full origin-left lg:block"
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
                borderColor: isActive ? "#38bdf8" : isCompleted ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.16)",
                backgroundColor: isActive ? "rgba(56,189,248,0.1)" : isCompleted ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.02)",
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
                  color: isActive ? "#ffffff" : isCompleted ? "rgba(56,189,248,0.85)" : "rgba(245,247,250,0.35)",
                  transition: FLIGHT_STATE_TRANSITION,
                }}
              >
                {node.num}
              </span>
            </div>
            <p
              className="mt-3 text-center [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px]"
              style={{
                color: isActive ? "#f5f7fa" : isCompleted ? "rgba(245,247,250,0.7)" : "rgba(245,247,250,0.35)",
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

type DetailedStageState = "upcoming" | "active" | "completed";

function getDetailedStageState(index: number, activeIndex: number): DetailedStageState {
  if (activeIndex < 0) return "upcoming";
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

const DetailedStagesTimeline = ({ reduced }: { reduced: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
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

      {/* Base dim vertical line */}
      <div aria-hidden="true" className="absolute left-7 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

      {/* Glowing progress line — grows down to meet the active/completed stages */}
      <div
        aria-hidden="true"
        className="absolute left-7 top-0 h-full w-px origin-top"
        style={{
          transform: `translateX(-50%) scaleY(${progressScale})`,
          transition: reduced ? undefined : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          background: "linear-gradient(180deg, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0.35) 88%, rgba(56,189,248,0.15) 100%)",
        }}
      />

      {stages.map((stage, i) => {
        const state = getDetailedStageState(i, activeIndex);
        const isActive = state === "active";
        const isCompleted = state === "completed";

        return (
          <motion.div
            key={stage.num}
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.05} viewport={{ once: true, margin: "-60px" }}
            className="relative flex gap-8 pb-12 lg:gap-12 lg:pb-16"
          >
            {/* Stage number dot */}
            <div className="relative shrink-0">
              <div
                ref={(el) => { markerRefs.current[i] = el; }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full border"
                style={{
                  borderColor: isActive ? "#38bdf8" : isCompleted ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.12)",
                  backgroundColor: "#03050a",
                  boxShadow: isActive
                    ? "0 0 18px rgba(56,189,248,0.55), 0 0 44px rgba(56,189,248,0.22)"
                    : isCompleted
                      ? "0 0 14px rgba(56,189,248,0.18)"
                      : "none",
                  transform: isActive && !reduced ? "scale(1.04)" : "scale(1)",
                  transition: STAGE_STATE_TRANSITION,
                  animation: isActive && !reduced ? "lux-stage-active-pulse 2.4s ease-in-out infinite" : undefined,
                }}
              >
                <span
                  className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1px]"
                  style={{
                    color: isActive ? "#38bdf8" : isCompleted ? "rgba(56,189,248,0.75)" : "rgba(245,247,250,0.4)",
                    transition: STAGE_STATE_TRANSITION,
                  }}
                >
                  {stage.num}
                </span>
              </div>
            </div>

            {/* Stage content */}
            <div className="flex-1 pt-2">
              <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium tracking-[-0.5px] text-[#f5f7fa] lg:text-[28px]">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-[580px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[25px] text-[#f5f7faa6]">
                {stage.description}
              </p>

              <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:gap-10">
                {/* What happens */}
                <GlassCard className="flex-1 p-6">
                  <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] text-[#f5f7fa55] uppercase">What happens</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.happens.map((item) => (
                      <span key={item} className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 [font-family:'Inter',Helvetica] text-[12px] text-[#f5f7fa99]">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* Client involvement */}
                <GlassCard className="flex-1 p-6">
                  <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] text-[#f5f7fa55] uppercase">Client involvement</p>
                  <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] text-[#f5f7faa6]">
                    {stage.client}
                  </p>
                </GlassCard>
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
const ApprovalGatesSection = ({ reduced }: { reduced: boolean }) => {
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
          <p ref={labelRef} className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Collaboration</p>
          <h2 ref={headingRef} className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
            Every stage has a clear review point.
          </h2>
          <p ref={bodyRef} className="mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
            We avoid surprises by reviewing the structure, content, design, development, and launch details with the client before moving forward.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {approvalGates.map((gate, i) => (
            <div key={gate.num} ref={(el) => { cardRefs.current[i] = el; }}>
              <GlassCard className="p-7 lg:p-8">
                <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.5px] text-[#38bdf880]">{gate.num}</span>
                <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] text-[#f5f7fa]">{gate.title}</h3>
                <p className="mt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[23px] text-[#f5f7faa6]">{gate.desc}</p>
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
  const reduced = useReducedMotion() ?? false;
  const { openProjectModal } = useProjectModal();

  return (
    <div className="relative min-h-screen w-full text-[#f5f7fa] overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <Section className="flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Stars background */}
        <img className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" alt="" aria-hidden="true" src="/figmaAssets/backgroundstars-2.svg" />
        {/* Spectral gradient blobs */}
        <ProcessHeroGradient reduced={reduced} />
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-6 text-center sm:px-8">
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] text-[#f5f7fa55] uppercase"
          >
            Process
          </motion.p>
          <motion.h1
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
            className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.04] tracking-[-1.4px] text-[#f5f7fa] sm:text-[54px] lg:text-[72px] lg:tracking-[-2.2px]"
          >
            A clear path from<br />idea to launch.
          </motion.h1>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
            className="mt-7 max-w-[600px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
          >
            We guide every project through strategy, content, design, development, testing, and launch — so the final experience feels premium, functional, and ready to grow.
          </motion.p>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
            className="mt-10 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px] text-[#38bdf880]"
          >
            Discovery · Design · Build · Connect · Optimize · Launch
          </motion.p>
        </div>
      </Section>

      {/* ══════════════ FLIGHT PATH OVERVIEW ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[160px]" style={{ backgroundColor: "rgba(56,189,248,0.06)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Flight Path</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Six stages. One connected journey.
            </h2>
          </motion.div>

          {/* Nodes — horizontal on desktop, vertical on mobile */}
          <FlightPathTimeline reduced={reduced} />
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
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Stages</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              What happens at each stage.
            </h2>
          </motion.div>

          <DetailedStagesTimeline reduced={reduced} />
        </div>
      </Section>

      {/* ══════════════ APPROVAL GATES ══════════════ */}
      <ApprovalGatesSection reduced={reduced} />

      {/* ══════════════ WHAT WE NEED ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
              className="lg:w-[42%]"
            >
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Client Inputs</p>
              <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[40px] lg:tracking-[-1.2px]">
                What helps us move faster.
              </h2>
              <p className="mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                The better the starting information, the smoother the strategy, design, and build process becomes.
              </p>
            </motion.div>

            <div className="flex-1">
              <div className="flex flex-col gap-3">
                {clientInputs.map((item, i) => (
                  <motion.div
                    key={item}
                    variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                    className="flex items-start gap-3.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-5 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf880]" />
                    <span className="[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] text-[#f5f7faa6]">{item}</span>
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
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Before Launch</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Launch is part of the process,<br className="hidden lg:block" /> not the end of it.
            </h2>
            <p className="mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
              Before a website goes live, we check the details that affect real performance, visibility, usability, and client confidence.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {launchChecklist.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-5 py-4"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                <span className="[font-family:'Inter',Helvetica] text-[13.5px] font-normal text-[#f5f7faa6]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════ CTA ══════════════ */}
      <Section className="py-24 pb-32 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <GlassCard className="work-cta-orbit-border relative overflow-hidden p-10 lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.12)" }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.08] tracking-[-0.9px] text-[#f5f7fa] lg:text-[42px] lg:tracking-[-1.3px]">
                  Ready to move from idea to launch?
                </h2>
                <p className="mt-5 max-w-[480px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                  Tell us what you want to build, and we will shape the right process around your goals, content, design, and technical needs.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={openProjectModal}
                    data-testid="button-process-cta-start"
                    className="flex items-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90"
                  >
                    Start a Project <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="/work">
                    <button type="button" className="flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#f5f7fa] transition-colors hover:bg-white/[0.09]">
                      View Work
                    </button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      <SiteFooterSection />
    </div>
  );
};
