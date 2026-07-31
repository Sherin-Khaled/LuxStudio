import { useTheme } from "@/contexts/ThemeContext";

const logoNames = ["Houd El Nile", "X Dental", "Al Nours", "Al Baraka Olives"];
const repeatedLogoNames = Array.from({ length: 6 }, () => logoNames).flat();

export const ClientLogoMarqueeSection = (): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      aria-label="Client logos marquee"
      className={`relative w-full overflow-hidden border-y transition-colors ${
        // Same treatment as the first stripe: light mode drops the solid
        // fill entirely and keeps only the stroke, so the stripe reads as a
        // rule between sections rather than a heavy gray block.
        isLight ? "border-[rgba(15,23,42,0.12)] bg-transparent" : "border-[#ffffff21] bg-[#03050a]"
      }`}
    >
      {!isLight && <div className="pointer-events-none absolute inset-0 bg-[#ffffff04]" />}
      <div className="relative flex h-[124px] items-center overflow-hidden">
        <div
          className="flex min-w-max shrink-0 items-center pl-[49.1px] [--duration:28s] [--gap:49.1px] animate-marquee"
          aria-hidden="true"
        >
          {repeatedLogoNames.map((name, index) => (
            <div
              key={`marquee-first-${name}-${index}`}
              className="flex items-center gap-[49.1px]"
            >
              <span className={`[font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.14px] whitespace-nowrap ${isLight ? "text-[#0f172a]" : "text-[#ffffffba]"}`}>
                {name}
              </span>
              <span className={`[font-family:'Inter',Helvetica] text-[16.9px] font-normal leading-[16.9px] whitespace-nowrap ${isLight ? "text-[rgba(2,132,199,0.45)]" : "text-[#ffffff57]"}`}>
                ✦
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex min-w-max shrink-0 items-center pl-[49.1px] [--duration:28s] [--gap:49.1px] animate-marquee"
          aria-hidden="true"
        >
          {repeatedLogoNames.map((name, index) => (
            <div
              key={`marquee-second-${name}-${index}`}
              className="flex items-center gap-[49.1px]"
            >
              <span className={`[font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.14px] whitespace-nowrap ${isLight ? "text-[#0f172a]" : "text-[#ffffffba]"}`}>
                {name}
              </span>
              <span className={`[font-family:'Inter',Helvetica] text-[16.9px] font-normal leading-[16.9px] whitespace-nowrap ${isLight ? "text-[rgba(2,132,199,0.45)]" : "text-[#ffffff57]"}`}>
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-[107px] ${
          isLight
            ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.6)_45%,rgba(255,255,255,0)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.73)_45%,rgba(0,0,0,0)_100%)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-[107px] ${
          isLight
            ? "bg-[linear-gradient(270deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.6)_45%,rgba(255,255,255,0)_100%)]"
            : "bg-[linear-gradient(270deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.73)_45%,rgba(0,0,0,0)_100%)]"
        }`}
      />
    </section>
  );
};
