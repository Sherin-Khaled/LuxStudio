import { useTheme } from "@/contexts/ThemeContext";
import type { CaseStudyMedia } from "@/lib/caseStudies/types";

/**
 * Real AR/EN comparison — not a simulated toggle like Al Baraka's
 * `BilingualFlip` (built that way because no full-page capture existed for
 * that project). Here we have real screenshots of the same live home page in
 * both languages, so the mirror shows the actual production UI: logo side,
 * nav order, and text alignment all genuinely flip between the two crops
 * below, exactly as they do on abdalwahb.com itself.
 */
export const BilingualMirror = ({
  ar,
  en,
  arLabel,
  enLabel,
  caption,
}: {
  ar?: CaseStudyMedia;
  en?: CaseStudyMedia;
  arLabel: string;
  enLabel: string;
  caption: string;
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const Frame = ({ src, label, dir }: { src?: string; label: string; dir: "rtl" | "ltr" }) => (
    <figure className="flex flex-1 flex-col gap-3" dir={dir}>
      <div
        className={`relative w-full overflow-hidden rounded-2xl border ${
          isLight ? "border-[rgba(15,23,42,0.08)] shadow-[0_16px_40px_rgba(15,23,42,0.08)]" : "border-[#ffffff10] shadow-[0_16px_40px_rgba(0,0,0,0.30)]"
        }`}
        style={{ aspectRatio: "16 / 10" }}
      >
        {src && <img src={src} alt={label} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />}
      </div>
      <figcaption
        className={`self-start rounded-full border px-3 py-1 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1px] uppercase ${
          isLight ? "border-[rgba(15,23,42,0.10)] text-[rgba(15,23,42,0.55)]" : "border-white/10 text-[#f5f7fa70]"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <Frame src={ar?.src} label={arLabel} dir="rtl" />
        <Frame src={en?.src} label={enLabel} dir="ltr" />
      </div>
      <p className={`max-w-[640px] text-[13.5px] italic ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa80]"}`}>{caption}</p>
    </div>
  );
};
