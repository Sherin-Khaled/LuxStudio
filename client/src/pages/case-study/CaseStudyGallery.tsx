import { ImageOff, Smartphone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { CaseStudyMedia } from "@/lib/caseStudies/types";

/**
 * One media frame: a real screenshot when `media.src`/`media.videoSrc` is
 * set, otherwise a clean "coming soon" slot in Lux's own visual language —
 * never a fabricated/lorem-ipsum screen. Reused both inline (next to
 * narrative copy) and inside the Key Screens gallery grid below, so a
 * future case study only needs to supply real asset paths in its own
 * `*.data.ts` to replace any placeholder.
 */
export const CaseStudyMediaSlot = ({
  media,
  title,
  caption,
  aspect = "4 / 3",
  pendingLabel,
}: {
  media?: CaseStudyMedia;
  title: string;
  caption?: string;
  aspect?: string;
  pendingLabel: string;
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const hasMedia = Boolean(media?.src || media?.videoSrc);

  return (
    <figure className="flex flex-col gap-3">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border ${
          isLight
            ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.6)] shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            : "border-[#ffffff10] bg-[#ffffff03] shadow-[0_16px_40px_rgba(0,0,0,0.30)]"
        }`}
        style={{ aspectRatio: aspect }}
      >
        {hasMedia ? (
          media?.videoSrc ? (
            <video
              src={media.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={media?.src}
              alt={caption ?? title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center ${
              isLight ? "bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.08),transparent_65%)]" : "bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.06),transparent_65%)]"
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${isLight ? "border-[rgba(15,23,42,0.10)] bg-white/60" : "border-white/10 bg-white/[0.04]"}`}>
              <ImageOff className={`h-4 w-4 ${isLight ? "text-[rgba(15,23,42,0.35)]" : "text-[#f5f7fa50]"}`} aria-hidden="true" />
            </span>
            <p className={`[font-family:'Inter',Helvetica] text-[12px] leading-[18px] ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa60]"}`}>
              {title} — {pendingLabel}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className={`[font-family:'Inter',Helvetica] text-[12.5px] leading-[18px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa70]"}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export interface GalleryItem {
  key: string;
  media?: CaseStudyMedia;
  title: string;
  caption?: string;
}

/**
 * Editorial media gallery: one large landscape screen, then two
 * complementary screens, then a full-width screen, then a row of smaller
 * supporting screens, then a dedicated mobile row. Every future case study
 * reuses this exact layout by passing its own `GalleryItem[]` — no per-case
 * -study gallery markup.
 */
export const CaseStudyGallery = ({
  large,
  pair,
  wide,
  supporting,
  mobile,
  pendingLabel,
}: {
  large: GalleryItem;
  pair: [GalleryItem, GalleryItem];
  wide: GalleryItem;
  supporting: GalleryItem[];
  mobile: GalleryItem[];
  pendingLabel: string;
}): JSX.Element => (
  <div className="flex flex-col gap-6">
    <CaseStudyMediaSlot media={large.media} title={large.title} caption={large.caption} aspect="16 / 9" pendingLabel={pendingLabel} />

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {pair.map((item) => (
        <CaseStudyMediaSlot key={item.key} media={item.media} title={item.title} caption={item.caption} aspect="16 / 10" pendingLabel={pendingLabel} />
      ))}
    </div>

    <CaseStudyMediaSlot media={wide.media} title={wide.title} caption={wide.caption} aspect="21 / 9" pendingLabel={pendingLabel} />

    {supporting.length > 0 && (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {supporting.map((item) => (
          <CaseStudyMediaSlot key={item.key} media={item.media} title={item.title} caption={item.caption} aspect="16 / 10" pendingLabel={pendingLabel} />
        ))}
      </div>
    )}

    {mobile.length > 0 && (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {mobile.map((item) => (
          <CaseStudyMediaSlot key={item.key} media={item.media} title={item.title} caption={item.caption} aspect="9 / 16" pendingLabel={pendingLabel} />
        ))}
      </div>
    )}
  </div>
);

export const MobilePlaceholderIcon = Smartphone;
