/**
 * Shared light-mode color tokens for the Home page sections below the hero.
 * Plain string constants (not CSS variables) — Tailwind's JIT scanner needs
 * literal class strings per file, so these are meant to be interpolated into
 * template-literal classNames (`isLight ? LIGHT.heading : "text-[#f5f7fa]"`),
 * not applied as a class name directly. Kept in one place so every section
 * reads from the same palette instead of each file inventing its own close-
 * but-not-quite-matching shade of "dark navy" or "soft blue border."
 */
export const LIGHT = {
  // Backgrounds
  sectionBg: "#F8FBFF",
  sectionBgAlt: "#F6FAFF",
  cardBg: "rgba(255,255,255,0.70)",
  cardBgSubtle: "rgba(255,255,255,0.55)",

  // Text
  heading: "#0f172a",
  bodyStrong: "rgba(15,23,42,0.70)",
  bodyMuted: "rgba(15,23,42,0.55)",
  bodyFaint: "rgba(15,23,42,0.40)",

  // Borders / dividers
  border: "rgba(15,23,42,0.10)",
  borderSoft: "rgba(15,23,42,0.08)",

  // Accent (same family as dark mode's sky-400, kept saturated enough to
  // read clearly against a pale background)
  accent: "#0284c7",
  accentSoft: "rgba(2,132,199,0.35)",
} as const;
