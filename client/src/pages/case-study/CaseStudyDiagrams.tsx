import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, Stethoscope, MapPin, ShieldCheck, User, ArrowDown, Crown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { CaseStudySystemNode } from "@/lib/caseStudies/types";

const ICONS: Record<string, typeof LayoutGrid> = {
  LayoutGrid,
  Stethoscope,
  MapPin,
  ShieldCheck,
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ─────────────────────── Core Challenge — 4 nodes ───────────────────────
   Auto-cycling "one dominant at a time" treatment, same underlying idea as
   the Home page's StudioUniverseSection badges: an interval advances the
   active node while the group is in view, manual hover overrides it. No
   scroll-pinning, no scrubbed timeline — just an ordinary in-flow grid that
   happens to highlight one member at a time, so there's no scroll-trap risk. */
const AUTO_CYCLE_MS = 2400;

export const ChallengeNodes = ({
  nodes,
  labels,
}: {
  nodes: CaseStudySystemNode[];
  labels: Record<string, { label: string; result: string }>;
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !inView || hoveredIndex !== null) return;
    const id = window.setInterval(() => setActiveIndex((prev) => (prev + 1) % nodes.length), AUTO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView, hoveredIndex, nodes.length]);

  return (
    <div ref={groupRef} className="relative">
      {/* Connecting line — a single restrained horizontal thread behind the
          row, desktop only (the stacked mobile layout has no "row" for it
          to run through). */}
      <div
        aria-hidden="true"
        className={`absolute left-[12%] right-[12%] top-[38px] hidden h-px lg:block ${isLight ? "bg-[rgba(15,23,42,0.10)]" : "bg-white/10"}`}
      />
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {nodes.map((node, i) => {
          const Icon = ICONS[node.icon] ?? LayoutGrid;
          const copy = labels[node.key];
          const isActive = hoveredIndex !== null ? hoveredIndex === i : reduced ? i === 0 : i === activeIndex;
          return (
            <div
              key={node.key}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex flex-col items-center gap-4 text-center [transition:opacity_500ms_ease,transform_500ms_cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: isActive ? 1 : 0.55, transform: isActive ? "translateY(-2px)" : "none" }}
            >
              <span
                className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl border backdrop-blur-sm [transition:border-color_500ms_ease,box-shadow_500ms_ease,background-color_500ms_ease]"
                style={{
                  borderColor: isActive ? "#38bdf866" : isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.10)",
                  backgroundColor: isActive ? (isLight ? "rgba(56,189,248,0.10)" : "rgba(56,189,248,0.10)") : isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.03)",
                  boxShadow: isActive ? "0 0 32px rgba(56,189,248,0.28)" : "none",
                }}
              >
                <Icon className={`h-7 w-7 ${isActive ? "text-sky-400" : isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa60]"}`} aria-hidden="true" />
              </span>
              <div>
                <p className={`[font-family:'Inter',Helvetica] text-[13.5px] font-medium leading-[19px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                  {copy?.label}
                </p>
                <ArrowDown className={`mx-auto my-1.5 h-3 w-3 ${isLight ? "text-[rgba(15,23,42,0.30)]" : "text-[#f5f7fa40]"}`} aria-hidden="true" />
                <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[0.6px] uppercase ${isActive ? "text-sky-400" : isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa60]"}`}>
                  {copy?.result}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────── Generic constellation diagram ───────────────────────
   Percentage-coordinate nodes + SVG connecting lines, both in the same 0–100
   space so they stay aligned at any container size (preserveAspectRatio
   "none" makes the SVG stretch exactly like the percentage-positioned HTML
   nodes do, regardless of the container's own aspect ratio). Static reveal
   only (whileInView fade) — no scroll-linked motion, no cycling. */
export interface DiagramNode {
  id: string;
  x: number;
  y: number;
  label: ReactNode;
  emphasis?: boolean;
}

export const ConstellationDiagram = ({
  nodes,
  edges,
  heightClass = "h-[300px] sm:h-[340px]",
}: {
  nodes: DiagramNode[];
  edges: [string, string][];
  heightClass?: string;
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const lineColor = isLight ? "rgba(2,132,199,0.35)" : "rgba(56,189,248,0.35)";

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-60px" }}
      className={`relative w-full ${heightClass}`}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {edges.map(([fromId, toId]) => {
          const from = byId[fromId];
          const to = byId[toId];
          if (!from || !to) return null;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={lineColor}
              strokeWidth={0.25}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[11.5px] font-medium backdrop-blur-sm ${
              node.emphasis
                ? isLight
                  ? "border-[rgba(2,132,199,0.40)] bg-[rgba(56,189,248,0.12)] text-[#0284c7] shadow-[0_0_24px_rgba(56,189,248,0.20)]"
                  : "border-[#38bdf866] bg-[#38bdf814] text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.22)]"
                : isLight
                  ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.82)] text-[rgba(15,23,42,0.78)] shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
                  : "border-[#ffffff14] bg-[#ffffff08] text-[#f5f7fac2]"
            }`}
          >
            {node.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

/* ─────────────────────── Personalization diagram ─────────────────────── */
export const PersonalizationDiagram = ({
  copy,
}: {
  copy: { user: string; specialty: string; location: string; clinicEssentials: string; delivery: string };
}): JSX.Element => (
  <ConstellationDiagram
    heightClass="h-[320px] sm:h-[280px]"
    nodes={[
      { id: "user", x: 50, y: 8, label: copy.user, emphasis: true },
      { id: "specialty", x: 25, y: 48, label: copy.specialty },
      { id: "location", x: 75, y: 48, label: copy.location },
      { id: "essentials", x: 25, y: 90, label: copy.clinicEssentials },
      { id: "delivery", x: 75, y: 90, label: copy.delivery },
    ]}
    edges={[
      ["user", "specialty"],
      ["user", "location"],
      ["specialty", "essentials"],
      ["location", "delivery"],
    ]}
  />
);

/* ─────────────────────── Full-stack architecture map ─────────────────────── */
export const ArchitectureMap = ({
  copy,
}: {
  copy: {
    frontend: string;
    backend: string;
    database: string;
    ux: string;
    businessLogic: string;
    dataScale: string;
    dashboard: string;
    operations: string;
  };
}): JSX.Element => (
  <ConstellationDiagram
    heightClass="h-[440px] sm:h-[400px]"
    nodes={[
      { id: "root", x: 50, y: 5, label: "X Dental", emphasis: true },
      { id: "frontend", x: 16, y: 30, label: copy.frontend },
      { id: "backend", x: 50, y: 30, label: copy.backend },
      { id: "database", x: 84, y: 30, label: copy.database },
      { id: "ux", x: 16, y: 55, label: copy.ux },
      { id: "logic", x: 50, y: 55, label: copy.businessLogic },
      { id: "data", x: 84, y: 55, label: copy.dataScale },
      { id: "dashboard", x: 50, y: 78, label: copy.dashboard, emphasis: true },
      { id: "operations", x: 50, y: 96, label: copy.operations },
    ]}
    edges={[
      ["root", "frontend"],
      ["root", "backend"],
      ["root", "database"],
      ["frontend", "ux"],
      ["backend", "logic"],
      ["database", "data"],
      ["ux", "dashboard"],
      ["logic", "dashboard"],
      ["data", "dashboard"],
      ["dashboard", "operations"],
    ]}
  />
);

/* ─────────────────────── Systems convergence diagram ───────────────────────
   The generic "root → three systems → three subsystems → one convergence
   point" tree used by the "One Experience. Multiple Systems." section.
   X Dental's version of this idea is `ArchitectureMap` above (a fixed
   9-node full-stack shape with a trailing "Operations" node); this is the
   same visual grammar — ConstellationDiagram, pill nodes, thin connecting
   lines, emphasis on the root and the convergence point — generalized so a
   project whose story is 3 systems × 3 subsystems (no separate ops layer),
   like Houd El Nile, can reuse it with its own labels instead of forcing
   X Dental's exact 9-node shape onto a different architecture. */
export const SystemsConvergenceDiagram = ({
  root,
  systems,
  subsystems,
  convergence,
}: {
  root: string;
  systems: [ReactNode, ReactNode, ReactNode];
  subsystems: [ReactNode, ReactNode, ReactNode];
  convergence: ReactNode;
}): JSX.Element => (
  <ConstellationDiagram
    heightClass="h-[380px] sm:h-[340px]"
    nodes={[
      { id: "root", x: 50, y: 6, label: root, emphasis: true },
      { id: "sys0", x: 16, y: 36, label: systems[0] },
      { id: "sys1", x: 50, y: 36, label: systems[1] },
      { id: "sys2", x: 84, y: 36, label: systems[2] },
      { id: "sub0", x: 16, y: 64, label: subsystems[0] },
      { id: "sub1", x: 50, y: 64, label: subsystems[1] },
      { id: "sub2", x: 84, y: 64, label: subsystems[2] },
      { id: "convergence", x: 50, y: 94, label: convergence, emphasis: true },
    ]}
    edges={[
      ["root", "sys0"],
      ["root", "sys1"],
      ["root", "sys2"],
      ["sys0", "sub0"],
      ["sys1", "sub1"],
      ["sys2", "sub2"],
      ["sub0", "convergence"],
      ["sub1", "convergence"],
      ["sub2", "convergence"],
    ]}
  />
);

/* ─────────────────────── Scale sequence ─────────────────────── */
export const ScaleSequence = ({ metrics, labels }: { metrics: { value: string; key: string }[]; labels: Record<string, string> }): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const dots = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        x: seededRandom(i * 3) * 100,
        y: seededRandom(i * 3 + 1) * 100,
        size: 1 + seededRandom(i * 3 + 2) * 1.6,
        opacity: 0.15 + seededRandom(i * 7) * 0.3,
      })),
    [],
  );

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 py-6 sm:flex-row sm:gap-4 lg:gap-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {dots.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: isLight ? "#0284c7" : "#38bdf8",
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.key}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : i * 0.15 } }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <span className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[52px] font-semibold leading-none tracking-[-1.5px] sm:text-[64px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
            {metric.value}
          </span>
          <span className={`mt-3 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.6px] uppercase ${isLight ? "text-[#0284c7]" : "text-[#38bdf8]"}`}>
            {labels[metric.key]}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────── VIP / Standard tier compare ─────────────────────── */
export const TierCompare = ({
  standard,
  vip,
}: {
  standard: { title: string; description: string };
  vip: { title: string; description: string };
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div
        className={`rounded-2xl border p-7 ${
          isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.7)]" : "border-[#ffffff10] bg-[#ffffff04]"
        }`}
      >
        <p className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-semibold ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
          {standard.title}
        </p>
        <p className={`mt-2 [font-family:'Inter',Helvetica] text-[14px] leading-[22px] ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa90]"}`}>
          {standard.description}
        </p>
      </div>
      <div
        className={`relative overflow-hidden rounded-2xl border p-7 ${
          isLight ? "border-[rgba(212,167,44,0.45)] bg-[rgba(212,167,44,0.06)]" : "border-[#d4a72c66] bg-[#d4a72c0f]"
        }`}
      >
        <div className="mb-2 flex items-center gap-2">
          <Crown className="h-4 w-4 text-[#d4a72c]" aria-hidden="true" />
          <p className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-semibold text-[#d4a72c]">{vip.title}</p>
        </div>
        <p className={`[font-family:'Inter',Helvetica] text-[14px] leading-[22px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7fa90]"}`}>
          {vip.description}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────── Admin / Support / Customer roles ─────────────────────── */
export const RoleCards = ({
  roles,
}: {
  roles: { key: string; title: string; description: string }[];
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const iconFor = (key: string) => (key === "admin" ? ShieldCheck : key === "support" ? Stethoscope : User);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {roles.map((role) => {
        const Icon = iconFor(role.key);
        return (
          <div
            key={role.key}
            className={`rounded-2xl border p-6 ${isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.7)]" : "border-[#ffffff10] bg-[#ffffff04]"}`}
          >
            <span
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${
                isLight ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.08)]" : "border-[#38bdf83a] bg-[#38bdf80f]"
              }`}
            >
              <Icon className={isLight ? "h-5 w-5 text-[#0284c7]" : "h-5 w-5 text-sky-400"} aria-hidden="true" />
            </span>
            <p className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[19px] font-semibold ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
              {role.title}
            </p>
            <p className={`mt-1.5 [font-family:'Inter',Helvetica] text-[13.5px] leading-[21px] ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa90]"}`}>
              {role.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
