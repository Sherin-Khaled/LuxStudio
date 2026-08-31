import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { studioValueDict } from "@/lib/i18n/home/studioValue";

/* Fade-up-and-unblur reveal, once per element as it enters the viewport.
   Normal scroll only — no pin, no scroll-takeover. This section is a calm
   closing argument, not another interactive scroll moment. */
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* Tailwind's JIT scanner needs literal, statically-greppable class strings —
   a template-literal class like `lg:ml-[${i * 18}px]` would never be
   generated. A lookup array of pre-written literals keeps the stagger
   dynamic (indexed at runtime) while staying visible to the scanner. */
const LAYER_INDENT_CLASS = [
  "",
  "lg:ml-[18px]",
  "lg:ml-[36px]",
  "lg:ml-[54px]",
  "lg:ml-[72px]",
  "lg:ml-[90px]",
];

/* Ambient upward-drifting stars, local to this section only. These use a
   dedicated keyframe scoped in this component's own <style> block below
   (`.lux-value-star`) rather than the shared `.animate-float-star` class in
   index.css — that shared class has no notion of color or horizontal drift,
   and is left completely untouched since WorkPage/ServicesPage still use it
   as-is. Positions lean toward the lower-left, lower-middle, and lower-right,
   which read emptiest against the card stack on the right. Count went from
   9 to 14 (+~56%) in a follow-up pass once 9 still read as sparse. */
type StudioStarColor = "white" | "blue" | "violet";

const STUDIO_STAR_RGB: Record<StudioStarColor, string> = {
  white: "255, 255, 255",
  blue: "56, 189, 248",
  violet: "167, 139, 250",
};

const upwardStars: Array<{
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  color: StudioStarColor;
  peak: number;
}> = [
  { left: "5%",  top: "80%", size: 1.5, duration: 22, delay: 0,   driftX: 6,   color: "white",  peak: 0.26 },
  { left: "8%",  top: "96%", size: 1,   duration: 21, delay: 7.2, driftX: -5,  color: "blue",   peak: 0.24 },
  { left: "12%", top: "64%", size: 1,   duration: 18, delay: 3.4, driftX: -8,  color: "blue",   peak: 0.22 },
  { left: "20%", top: "90%", size: 3,   duration: 26, delay: 1.1, driftX: 4,   color: "white",  peak: 0.58 },
  { left: "30%", top: "55%", size: 1.5, duration: 20, delay: 5.2, driftX: -6,  color: "violet", peak: 0.30 },
  { left: "38%", top: "94%", size: 1,   duration: 24, delay: 2.6, driftX: 10,  color: "blue",   peak: 0.24 },
  { left: "42%", top: "82%", size: 2,   duration: 25, delay: 4.8, driftX: 7,   color: "white",  peak: 0.30 },
  { left: "47%", top: "72%", size: 1.5, duration: 16, delay: 0.8, driftX: -4,  color: "white",  peak: 0.32 },
  { left: "53%", top: "92%", size: 1,   duration: 19, delay: 3.1, driftX: -9,  color: "white",  peak: 0.22 },
  { left: "57%", top: "48%", size: 2.6, duration: 28, delay: 4.4, driftX: 8,   color: "blue",   peak: 0.52 },
  { left: "67%", top: "84%", size: 1.5, duration: 19, delay: 2.0, driftX: -10, color: "white",  peak: 0.20 },
  { left: "77%", top: "62%", size: 1,   duration: 23, delay: 6.1, driftX: 5,   color: "violet", peak: 0.28 },
  { left: "88%", top: "78%", size: 1.5, duration: 17, delay: 1.7, driftX: -6,  color: "violet", peak: 0.27 },
  { left: "94%", top: "58%", size: 2.8, duration: 27, delay: 5.6, driftX: 9,   color: "blue",   peak: 0.50 },
];

/* Cards take turns glowing on their own — same visual treatment as hover,
   just driven by a timer instead of the mouse. A manual hover always wins
   while it's happening (see `displayedActiveIndex` below); the timer itself
   never stops, so once the mouse leaves, the sequence is simply wherever it
   already is — no restart, no jump. */
const AUTO_GLOW_INTERVAL_MS = 2000;

export const StudioValueSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const t = useDict(studioValueDict);
  const layers = t.layers;

  // Automatic sequence: -1 (nothing auto-glowing) under reduced motion, else
  // starts on card 1 immediately and advances every 2s. Runs continuously —
  // never paused by hover — so it's always ready to resume the instant the
  // mouse leaves a card.
  const [activeLayerIndex, setActiveLayerIndex] = useState(reduced ? -1 : 0);
  const [hoveredLayerIndex, setHoveredLayerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveLayerIndex((prev) => (prev + 1) % layers.length);
    }, AUTO_GLOW_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  // A manual hover always overrides whatever the timer is doing; once the
  // mouse leaves, this simply falls back to reading the timer's current value.
  const displayedActiveIndex = hoveredLayerIndex ?? activeLayerIndex;

  return (
    <section
      className={`relative w-full overflow-hidden bg-[url(/figmaAssets/backgroundstars-3.svg)] bg-cover bg-center py-24 transition-colors lg:py-32 ${
        isLight ? "bg-[#F8FBFF]" : "bg-transparent"
      }`}
      aria-labelledby="studio-value-heading"
    >
      {/* Scoped styles for the layer stack — see comment above the `.lux-layer`
          rule for why opacity/scale are driven by CSS custom properties
          rather than inline style: hover needs to change the *same*
          `transform` property, and an inline style on transform/opacity
          would silently out-rank any hover class trying to override it. */}
      <style>{`
        .lux-layer {
          opacity: var(--layer-opacity, 1);
          transform: scale(var(--layer-scale, 1));
          transition:
            opacity 450ms cubic-bezier(0.22,1,0.36,1),
            transform 450ms cubic-bezier(0.22,1,0.36,1),
            border-color 450ms cubic-bezier(0.22,1,0.36,1),
            background 450ms cubic-bezier(0.22,1,0.36,1),
            box-shadow 450ms cubic-bezier(0.22,1,0.36,1);
        }
        /* .lux-layer--active is the automatic-sequence equivalent of :hover —
           same rule, same values, so the timer-driven glow and the manual
           hover glow are always visually identical. Light mode keeps the
           same blue/cyan family, just softer, per the light hero direction. */
        .lux-layer:hover,
        .lux-layer.lux-layer--active {
          opacity: 1;
          transform: scale(var(--layer-scale, 1)) translate(6px, -6px);
          border-color: ${isLight ? "rgba(2, 132, 199, 0.45)" : "rgba(56, 189, 248, 0.55)"};
          background: ${
            isLight
              ? "linear-gradient(135deg, rgba(2,132,199,0.10) 0%, rgba(255,255,255,0.55) 100%)"
              : "linear-gradient(135deg, rgba(56,189,248,0.09) 0%, rgba(255,255,255,0.05) 100%)"
          };
          box-shadow: ${
            isLight
              ? "0 0 22px rgba(2, 132, 199, 0.16), 0 0 60px rgba(37, 99, 235, 0.10)"
              : "0 0 32px rgba(56, 189, 248, 0.18), 0 0 90px rgba(37, 99, 235, 0.12)"
          };
        }
        .lux-layer:hover .lux-layer-dot,
        .lux-layer.lux-layer--active .lux-layer-dot {
          background-color: ${isLight ? "#0284c7" : "#38bdf8"};
          box-shadow: ${
            isLight
              ? "0 0 12px rgba(2,132,199,0.45), 0 0 28px rgba(2,132,199,0.18)"
              : "0 0 16px rgba(56,189,248,0.55), 0 0 36px rgba(56,189,248,0.22)"
          };
        }
        /* Upward star drift: opacity carries the fade-in/out and a gentle
           twinkle (dipping partway through instead of holding flat), while
           transform carries the slow rise plus a slight horizontal wander.
           Each star's own color/peak-brightness is baked into its inline
           background/box-shadow (see render below) — this animation only
           ever multiplies that authored color toward 0, so it can never
           brighten a star past what it was given. */
        @keyframes lux-value-star-drift {
          0%   { transform: translate(0, 0); opacity: 0; }
          8%   { opacity: 1; }
          30%  { opacity: 0.55; }
          50%  { opacity: 1; }
          72%  { opacity: 0.5; }
          92%  { opacity: 1; }
          100% { transform: translate(var(--star-drift-x, 0px), -170px); opacity: 0; }
        }
        .lux-value-star {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          animation: lux-value-star-drift var(--star-duration, 20s) linear var(--star-delay, 0s) infinite;
        }
      `}</style>

      {/* Light-mode wash on top of the star-texture background — same
          technique as the other Home sections: a separate static layer,
          not a filter on the whole section (which would also wash out the
          card text). */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.82)_0%,rgba(248,251,255,0.5)_45%,rgba(248,251,255,0.82)_100%)]"
        />
      )}

      {/* ── Atmospheric glows (unchanged section identity) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -left-20 top-[58%] h-[340px] w-[340px] rounded-full blur-[120px] ${isLight ? "bg-[#0284c70d]" : "bg-[#38bdf812]"}`} />
        <div className={`absolute right-0 top-[20%] h-[520px] w-[520px] rounded-full blur-[160px] ${isLight ? "bg-[#1d4ed810]" : "bg-[#1d4ed81a]"}`} />
        {/* Upward-drifting stars — white / cyan-blue / soft violet only,
            weighted toward the lower-left, lower-middle, and lower-right
            where the background otherwise reads emptiest next to the card
            stack. */}
        {!reduced &&
          upwardStars.map((s, i) => {
            // Light mode: a plain white star would vanish against a pale
            // sky, so the "white" tier becomes a soft slate-gray instead —
            // same swap already used for the hero's and other sections'
            // star fields. Blue/violet keep their hue in both themes.
            const rgb = isLight && s.color === "white" ? "100, 116, 139" : STUDIO_STAR_RGB[s.color];
            return (
              <div
                key={i}
                className="lux-value-star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  backgroundColor: `rgba(${rgb}, ${s.peak})`,
                  boxShadow: `0 0 ${s.size * 2.4}px rgba(${rgb}, ${s.peak * 0.65})`,
                  ["--star-duration" as string]: `${s.duration}s`,
                  ["--star-delay" as string]: `${s.delay}s`,
                  ["--star-drift-x" as string]: `${s.driftX}px`,
                } as React.CSSProperties}
              />
            );
          })}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-12 px-6 sm:px-8 md:flex-row md:items-start md:gap-10 lg:px-11 lg:gap-16">
        {/* ── Left: editorial heading + CTA (unchanged) ── */}
        <motion.header
          variants={fadeUp}
          custom={0}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex w-full shrink-0 flex-col items-start md:w-[360px] md:pt-2 lg:w-[420px] xl:w-[460px]"
        >
          {/* Spine accent — sits on the header's own "start" (outer) edge,
              away from the card stack: left in LTR, right in RTL. start-0
              (logical) tracks that automatically; the translate sign still
              has to flip explicitly since transforms are physical, not
              logical. */}
          <div className="absolute bottom-0 start-0 top-0 hidden w-px -translate-x-7 rtl:translate-x-7 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(56,189,248,0.5)_30%,rgba(56,189,248,0.5)_70%,rgba(0,0,0,0)_100%)] lg:block" />
          <p dir="ltr" className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[18px] tracking-[1.56px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
            {t.progress}
          </p>
          <h2
            id="studio-value-heading"
            className={`pt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-semibold leading-[1.04] tracking-[-1.1px] sm:text-[42px] lg:text-[48px] lg:tracking-[-1.6px] ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            {t.heading}
          </h2>
          <p className={`max-w-[420px] pt-4 [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] sm:text-[14px] sm:leading-[24px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
            {t.description}
          </p>
          <a
            href="#"
            className={`mt-6 inline-flex h-auto items-center gap-1.5 border-b-[0.8px] pb-0.5 [font-family:'Inter',Helvetica] text-[15px] font-medium leading-[22.5px] tracking-[-0.08px] transition-opacity hover:opacity-90 focus:outline-none focus:ring-0 ${
              isLight ? "border-[#0284c780] text-[#0284c7]" : "border-[#38bdf880] text-sky-400"
            }`}
            data-testid="link-start-project"
          >
            {t.ctaLabel} <span className={dir === "rtl" ? "inline-block rotate-180" : ""}>→</span>
          </a>
        </motion.header>

        {/* ── Right: layered glass system ──
            Normal document flow (no absolute-position overlap), so all six
            layers stay fully legible at once — only the horizontal stagger
            (desktop only) and a subtle opacity/scale gradient suggest depth.
            Deliberately 2D-only (no rotateX/perspective): a 3D-tilted parent
            combined with this card's own backdrop-blur is a known source of
            compositor shimmer (found and fixed in CaseStudyFeatureSection
            earlier), so this stack fakes depth without that risk. */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 pt-2 md:pt-8 lg:gap-6 lg:pt-10">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.num}
              variants={fadeUp}
              custom={Math.min(0.15 + i * 0.08, 0.5)}
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className={`relative ${LAYER_INDENT_CLASS[i] ?? ""}`}
            >
              <div
                className={`lux-layer relative flex items-center gap-4 rounded-2xl border px-6 py-5 backdrop-blur-sm sm:px-7 sm:py-6 ${
                  isLight ? "border-[rgba(15,23,42,0.10)] bg-white/60" : "border-white/[0.10] bg-white/[0.04]"
                }${i === displayedActiveIndex ? " lux-layer--active" : ""}`}
                style={{
                  ["--layer-opacity" as string]: 0.68 + i * 0.064,
                  ["--layer-scale" as string]: 0.94 + i * 0.012,
                }}
                onMouseEnter={() => setHoveredLayerIndex(i)}
                onMouseLeave={() => setHoveredLayerIndex(null)}
              >
                {/* Node marker — a small glowing dot reading as "one socket in a
                    connected system," not a timeline bullet. Hidden on mobile
                    since there's no horizontal stagger there to connect. */}
                {/* width/height/min-width/min-height are all pinned to the same
                    literal value (not derived from each other) and aspect-ratio
                    is set as a backstop, so nothing — a grid ancestor, a flex
                    stretch, a font-size change — can ever squash this into an
                    oval. flex-shrink: 0 stops the row's own layout from
                    shrinking it unevenly on either axis. */}
                <span
                  aria-hidden="true"
                  className={`lux-layer-dot absolute -start-[5px] top-1/2 hidden -translate-y-1/2 rounded-full transition-all duration-500 ease-out lg:block ${
                    isLight ? "bg-[rgba(2,132,199,0.45)]" : "bg-[rgba(56,189,248,0.4)]"
                  }`}
                  style={{
                    width: "10px",
                    height: "10px",
                    minWidth: "10px",
                    minHeight: "10px",
                    aspectRatio: "1 / 1",
                    flexShrink: 0,
                    borderRadius: "999px",
                  }}
                />

                <span className={`shrink-0 [font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1.2px] ${isLight ? "text-[#0284c7]/70" : "text-sky-400/70"}`}>
                  {layer.num}
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[16px] font-semibold leading-[22px] tracking-[-0.2px] transition-colors duration-500 ease-out sm:text-[17px] ${
                      isLight ? "text-[rgba(15,23,42,0.78)]" : "text-[#f5f7fac2]"
                    }`}
                  >
                    {layer.title}
                  </h3>
                  <p
                    className={`mt-1 [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px] tracking-[0] transition-colors duration-500 ease-out sm:text-[13px] ${
                      isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa55]"
                    }`}
                  >
                    {layer.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
