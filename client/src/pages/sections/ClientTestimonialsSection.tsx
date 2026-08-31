import { useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { testimonialsDict } from "@/lib/i18n/home/testimonials";

/* Per-card visual styling only (offset/quoteColor) — the actual quote/
   author/category/tag text comes from testimonialsDict, zipped in by index
   inside the component so it can be localized. */
const testimonialStyles = [
  { offset: "pt-6", quoteColor: "text-[#38bdf89e]" },
  { offset: "pt-10", quoteColor: "text-[#f5f7fa5c]" },
  { offset: "pt-1.5", quoteColor: "text-[#f5f7fa5c]" },
  { offset: "pt-9", quoteColor: "text-[#f5f7fa5c]" },
  { offset: "pt-6", quoteColor: "text-[#f5f7fa5c]" },
  { offset: "pt-2", quoteColor: "text-[#f5f7fa5c]" },
];

export const ClientTestimonialsSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";
  const t = useDict(testimonialsDict);
  const testimonials = t.items.map((item, i) => ({
    id: i + 1,
    ...testimonialStyles[i],
    ...item,
  }));
  // The marquee track below is pinned to dir="ltr" so the page's overall RTL
  // direction can never auto-reverse its flex children (which would silently
  // undo/compound whatever ordering we choose here — "double reversal").
  // With that pin in place, the ONLY way the logical first card ends up
  // nearest the right edge in Arabic is this one explicit, single reversal.
  const orderedTestimonials = isRtl ? [...testimonials].reverse() : testimonials;

  return (
    <section
      className={`relative w-full overflow-hidden bg-[url(/figmaAssets/backgroundstars-1.svg)] bg-[100%_100%] transition-colors ${
        isLight ? "bg-[#F8FBFF]" : "bg-transparent"
      }`}
      aria-labelledby="client-testimonials-heading"
    >
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.85)_0%,rgba(248,251,255,0.55)_40%,rgba(248,251,255,0.85)_100%)]"
        />
      )}
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1519px] gap-[37.3px]">
          <div className={`mt-[337px] ml-[479.6px] h-80 w-[560px] blur-[160px] ${isLight ? "bg-[#1d4ed80d]" : "bg-[#1d4ed817]"}`} />
          <div className={`mt-[248.5px] h-[260px] w-[260px] rounded-full blur-[110px] ${isLight ? "bg-[#7c3aed0a]" : "bg-[#7c3aed0f]"}`} />
        </div>
      </div>
      <div className="relative mx-auto flex min-h-[994px] w-full max-w-[1519px] flex-col px-4 pb-16 pt-28 sm:px-6 lg:px-[68px]">
        <header className="max-w-[1244px]">
          <p className={`text-[13px] leading-[19.5px] tracking-[1.56px] [font-family:'JetBrains_Mono',Helvetica] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa66]"}`}>
            {t.kicker}
          </p>
          <div className="pt-[18px]">
            <h2
              id="client-testimonials-heading"
              className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-semibold leading-[1.02] tracking-[-2.04px] sm:text-[52px] lg:text-[68px] ${
                isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
              }`}
            >
              {t.heading}
            </h2>
          </div>
          <div className="pt-[22px]">
            <p className={`max-w-[560px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27.5px] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa1]"}`}>
              {t.description}
            </p>
          </div>
        </header>
        {/*
          Marquee: duplicated track animated to -50% (exactly one set-width,
          since each set carries its own trailing gap) → seamless infinite
          right-to-left loop. Hover anywhere on the row pauses the animation.
          Reduced motion: a single static set in a swipeable horizontal row.
        */}
        <div className="group relative mt-[54px]">
          {/* dir="ltr" here (not just on the track inside) is the fix: this
              div is a plain block box, wider-than-container child (the
              track) overflows toward its "end" side, which is physically
              LEFT in RTL — so without pinning THIS element's own direction,
              the track was overflowing leftward off a right-anchored start
              position instead of sitting flush at x=0, throwing off every
              translateX in the keyframe (computed as % of the track's own
              width, but relative to a start position that was never at the
              viewport's left edge to begin with). */}
          <div dir="ltr" className={reduced ? "w-full overflow-x-auto" : "w-full overflow-hidden"}>
            <div
              dir="ltr"
              className={`flex w-max items-start pb-8 ${
                reduced ? "" : "animate-marquee-x group-hover:[animation-play-state:paused]"
              }`}
              data-testid="client-notes-marquee"
            >
              {(reduced ? [0] : [0, 1]).map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-start gap-[26px] pr-[26px]"
                  aria-hidden={copy === 1}
                >
              {orderedTestimonials.map((item) => (
                <article
                  key={`${copy}-${item.id}`}
                  dir={dir}
                  className={`flex ${item.offset} shrink-0`}
                >
                  <Card
                    tabIndex={0}
                    className={`group/testimonial relative min-h-[430px] w-[328px] overflow-hidden rounded-[32px] border-[0.8px] backdrop-blur-0 outline-none [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] [will-change:transform,box-shadow] hover:-translate-y-1.5 hover:scale-[1.015] focus-visible:-translate-y-1.5 focus-visible:scale-[1.015] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 ${
                      isLight
                        ? "border-[rgba(15,23,42,0.10)] bg-white/70 shadow-[0px_18px_50px_rgba(15,23,42,0.08)] hover:border-[rgba(2,132,199,0.40)] hover:shadow-[0_0_18px_rgba(2,132,199,0.16),0_0_50px_rgba(2,132,199,0.08),0px_18px_50px_rgba(15,23,42,0.08)] focus-visible:border-[rgba(2,132,199,0.40)] focus-visible:shadow-[0_0_18px_rgba(2,132,199,0.16),0_0_50px_rgba(2,132,199,0.08),0px_18px_50px_rgba(15,23,42,0.08)]"
                        : "border-[#ffffff25] bg-[#ffffff12] shadow-[0px_24px_80px_#0000005c] hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_24px_80px_#0000005c] focus-visible:border-[rgba(56,189,248,0.45)] focus-visible:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_24px_80px_#0000005c]"
                    }`}
                  >
                    <div
                      className={`absolute left-px top-px h-px w-[326px] ${
                        isLight
                          ? "bg-[linear-gradient(90deg,rgba(15,23,42,0.10)_0%,rgba(15,23,42,0.03)_55%,rgba(0,0,0,0)_100%)]"
                          : "bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_55%,rgba(0,0,0,0)_100%)]"
                      }`}
                    />
                    <div
                      className={`absolute left-[131px] top-[258px] h-[171px] w-[196px] ${
                        isLight
                          ? "bg-[radial-gradient(50%_50%_at_100%_100%,rgba(15,23,42,0.05)_0%,rgba(0,0,0,0)_70%)]"
                          : "bg-[radial-gradient(50%_50%_at_100%_100%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_70%)]"
                      }`}
                    />

                    {/* Hover-only inner glass glow overlay — matches the
                        Contact page's client-note cards exactly */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-[1] opacity-0 [transition:opacity_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/testimonial:opacity-100 group-focus-visible/testimonial:opacity-100"
                      style={{
                        background: isLight
                          ? "radial-gradient(circle at 20% 20%, rgba(2,132,199,0.08), transparent 38%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.08), transparent 42%)"
                          : "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.10), transparent 38%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.10), transparent 42%)",
                      }}
                    />

                    <CardContent className="relative z-10 flex h-full flex-col justify-between px-7 pb-[26px] pt-8">
                      <div className="flex flex-col">
                        <p
                          className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-normal leading-[22px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] ${
                            isLight
                              ? "text-[rgba(15,23,42,0.35)] group-hover/testimonial:text-[#0284c7] group-focus-visible/testimonial:text-[#0284c7]"
                              : `${item.quoteColor} group-hover/testimonial:text-[#38bdf8] group-focus-visible/testimonial:text-[#38bdf8]`
                          }`}
                        >
                          "
                        </p>
                        <p className={`max-w-[271px] pt-[18px] [font-family:'Inter',Helvetica] text-[21px] font-normal leading-[31.5px] ${isLight ? "text-[rgba(15,23,42,0.85)]" : "text-[#f5f7faf2]"}`}>
                          {item.text}
                        </p>
                      </div>
                      <footer className="flex flex-col">
                        <div className={`h-px w-full ${isLight ? "bg-[rgba(15,23,42,0.10)]" : "bg-[#ffffff17]"}`} />
                        <div className="pt-4">
                          <p
                            className={`[font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[23.2px] tracking-[-0.08px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] ${
                              isLight
                                ? "text-[rgba(15,23,42,0.80)] group-hover/testimonial:text-[#0f172a] group-focus-visible/testimonial:text-[#0f172a]"
                                : "text-[#f5f7faeb] group-hover/testimonial:text-white group-focus-visible/testimonial:text-white"
                            }`}
                          >
                            {item.author}
                          </p>
                        </div>
                        <div className="pb-3 pt-[5px]">
                          <p className={`[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa9e]"}`}>
                            {item.category}
                          </p>
                        </div>
                        <div>
                          <Badge
                            variant="secondary"
                            className={`h-7 rounded-[999px] border-[0.8px] px-[12.8px] text-[11px] font-normal leading-[16.5px] tracking-[0.88px] [font-family:'JetBrains_Mono',Helvetica] [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1)] ${
                              isLight
                                ? "border-[rgba(15,23,42,0.12)] bg-[rgba(15,23,42,0.04)] text-[rgba(15,23,42,0.65)] hover:bg-[rgba(15,23,42,0.04)] group-hover/testimonial:border-[rgba(2,132,199,0.40)] group-focus-visible/testimonial:border-[rgba(2,132,199,0.40)]"
                                : "border-[#ffffff1f] bg-[#ffffff08] text-[#f5f7fa85] hover:bg-[#ffffff08] group-hover/testimonial:border-[rgba(56,189,248,0.4)] group-focus-visible/testimonial:border-[rgba(56,189,248,0.4)]"
                            }`}
                          >
                            {item.tag}
                          </Badge>
                        </div>
                      </footer>
                    </CardContent>
                  </Card>
                </article>
              ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-[77px] ${
              isLight ? "bg-[linear-gradient(90deg,rgba(248,251,255,1)_0%,rgba(0,0,0,0)_100%)]" : "bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(0,0,0,0)_100%)]"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-[123px] ${
              isLight ? "bg-[linear-gradient(270deg,rgba(248,251,255,1)_60%,rgba(0,0,0,0)_100%)]" : "bg-[linear-gradient(270deg,rgba(3,5,10,1)_60%,rgba(0,0,0,0)_100%)]"
            }`}
          />
        </div>
      </div>
    </section>
  );
};
