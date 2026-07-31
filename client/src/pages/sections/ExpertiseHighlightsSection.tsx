import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const expertiseItems = [
  "Strategy",
  "UI/UX Design",
  "Frontend Development",
  "Backend & Integrations",
  "Dashboards & CMS",
  "Brand & Content",
  "SEO & Performance",
];

const repeatedExpertiseItems = Array.from(
  { length: 4 },
  () => expertiseItems,
).flat();

export const ExpertiseHighlightsSection = (): JSX.Element => {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.section
      aria-label="Expertise highlights"
      className={`relative w-full overflow-hidden border-y transition-colors ${
        // Light mode: no solid fill — a heavy translucent-white block read as
        // a gray slab against the page. Just the stroke, so the stripe feels
        // like a subtle rule between sections, not a panel of its own.
        isLight ? "border-[rgba(15,23,42,0.12)] bg-transparent" : "border-[#ffffff24] bg-[#03050a]"
      }`}
      initial={reduced ? false : { opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="h-auto w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="relative p-0">
          {!isLight && <div className="pointer-events-none absolute inset-0 bg-[#ffffff03]" />}
          {/* Light-mode-only top echo, meeting the hero's own bottom
              transition layer halfway — the stripe has no background fill
              of its own to blend from, so without this the hero's gradient
              would just stop dead at the section boundary and the stripe
              would read as a flat, disconnected white block right after it.
              Same soft white/pale-blue/cyan-hint palette as the hero side,
              sized to roughly the top half of the stripe's own height. */}
          {isLight && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[64px] bg-[linear-gradient(180deg,rgba(219,234,254,0.22)_0%,rgba(226,240,250,0.10)_50%,rgba(248,251,255,0)_100%),radial-gradient(70%_100%_at_50%_0%,rgba(56,189,248,0.05)_0%,rgba(56,189,248,0)_65%)]"
            />
          )}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-[123px] ${
              isLight
                ? "bg-[linear-gradient(90deg,rgba(248,251,255,1)_0%,rgba(248,251,255,0.8)_40%,rgba(248,251,255,0)_100%)]"
                : "bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.8)_40%,rgba(0,0,0,0)_100%)]"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-[123px] ${
              isLight
                ? "bg-[linear-gradient(270deg,rgba(248,251,255,1)_0%,rgba(248,251,255,0.8)_40%,rgba(248,251,255,0)_100%)]"
                : "bg-[linear-gradient(270deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.8)_40%,rgba(0,0,0,0)_100%)]"
            }`}
          />
          <div className="overflow-hidden">
            <div
              className="flex min-w-max animate-marquee items-center gap-[49.1px] py-[48px] pl-[49.1px] pr-0"
              style={
                {
                  "--duration": "36s",
                  "--gap": "49.1px",
                } as React.CSSProperties
              }
            >
              {repeatedExpertiseItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-[49.1px]"
                >
                  <span
                    className={`relative mt-[-1.00px] whitespace-nowrap [font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.27px] transition-colors ${
                      // Verified via elementFromPoint hit-testing that nothing
                      // actually overlays this text (no covering div/z-index
                      // bug) — the "faded" look was purely this 0.75 opacity
                      // reading as weak against the section's pale backdrop.
                      // Raised to a solid dark navy for clear contrast.
                      isLight ? "text-[#0f172a]" : "text-[#ffffffc2]"
                    }`}
                  >
                    {item}
                  </span>
                  <span
                    className={`relative mt-[-1.00px] whitespace-nowrap [font-family:'Inter',Helvetica] text-[19.9px] font-normal leading-[19.9px] tracking-[0] transition-colors ${
                      // Soft blue instead of the near-invisible 0.35 dark-slate
                      // it was — "soft but visible" per request.
                      isLight ? "text-[rgba(2,132,199,0.45)]" : "text-[#ffffff5c]"
                    }`}
                  >
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
