import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useReducedMotion, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Globe } from "lucide-react";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { SideStars } from "@/components/backgrounds/SideStars";
import { ShootingStars } from "@/components/backgrounds/ShootingStars";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import { workPageDict } from "@/lib/i18n/workPage";
import { getCaseStudy } from "@/lib/caseStudies/registry";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { pageMeta, pageBreadcrumbs } from "@/lib/seo/pageMeta";
import abdalwahbHeroVideo from "../../../attached_assets/herosection.mp4";

gsap.registerPlugin(ScrollTrigger);

// Lives in client/public/audio/, so it's served as a static file at this
// root-relative path — not a module import like abdalwahbHeroVideo above
// (that file lives outside client/public/ and needs Vite's asset pipeline).
const xDentalHeroVideo = "/audio/HeroDental.mp4";

// Real production site — used both for the corner "Open Live Website ↗"
// hover link on the preview and for the small understated domain link
// underneath it. Kept separate from the internal `/work/x-dental` case
// study route: the preview and this link point OUT to the live product,
// "View Case Study" navigates WITHIN Lux Studio.
const xDentalWebsiteUrl = "https://dentora-x.com";
const xDentalWebsiteLabel = "dentora-x.com";

/* Live site previews for the Work page project cards. X Dental has no entry —
   its site isn't uploaded yet, so its card shows a recorded hero-section
   video (xDentalHeroVideo) instead of a live iframe. */
const projectPreviewUrl: Record<string, string> = {
  "houd-el-nile": "https://houdelnile.com",
  "al-nours": "https://al-nours.com",
  "al-baraka": "https://albarakaolives.com",
};

/* Per-project zoom-out amount for the live preview iframes — tuned per site
   since each hero section is a different size. Smaller number = more zoomed
   out (shows more of the page, but text is smaller). */
const projectPreviewScale: Record<string, number> = {
  "houd-el-nile": 0.7,
  "al-nours": 0.75,
  "al-baraka": 0.72,
};

/* Original farm/factory photography shot for Houd El Nile, edited in
   Lightroom. Real files in client/public/figmaAssets — served as-is by Vite
   at their public URL, so no import is needed. */
const houdElNileGalleryImages = [
  "/figmaAssets/4.webp",
  "/figmaAssets/17.webp",
  "/figmaAssets/44.webp",
  "/figmaAssets/222.webp",
];

/* Non-text project metadata only — display copy (type/description/tags/etc.)
   lives in workPageDict so it can be localized; `name` stays here since
   project/company names are real clients and are never translated. */
const projectMeta = [
  {
    id: "x-dental",
    name: "X Dental",
    accent: "#38bdf8",
    gradientFrom: "#0c2240",
    gradientTo: "#060f1e",
    layout: "horizontal",
  },
  {
    id: "houd-el-nile",
    name: "Houd El Nile",
    accent: "#4ade80",
    gradientFrom: "#0a1f12",
    gradientTo: "#060e09",
    layout: "vertical",
  },
  {
    id: "al-nours",
    name: "Al Nours",
    accent: "#f59e0b",
    gradientFrom: "#1a1206",
    gradientTo: "#0c0a04",
    layout: "top-right",
  },
  {
    id: "al-baraka",
    name: "Al Baraka Olives",
    accent: "#a3e635",
    gradientFrom: "#111a06",
    gradientTo: "#090e04",
    layout: "bottom-right",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const TagBadge = ({ tag, color, isLight }: { tag: string; color: string; isLight: boolean }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[11px] font-medium leading-[16px] tracking-[0.22px] whitespace-nowrap ${
      isLight
        ? "bg-[rgba(15,23,42,0.03)] text-[rgba(15,23,42,0.70)]"
        : "bg-[#ffffff06] text-[#f5f7faa6]"
    }`}
    style={{ borderColor: isLight ? `${color}45` : `${color}22` }}
  >
    {tag}
  </span>
);

/* Mock-browser website preview used inside every project card. `active` gates
   the iframe's `src` behind the card's own scroll-into-view moment (on top of
   loading="lazy"), so nothing loads until the visitor actually scrolls here.
   There is deliberately no "did it load" detection: cross-origin iframes
   can't be inspected from our page (contentDocument/contentWindow access is
   blocked by the browser's same-origin policy), so any check we could write
   would just be guessing — and a guess that fires on a timer is exactly what
   made a real, already-visible preview disappear on its own. Once a live URL
   is set, the iframe renders and stays rendered; the only case that shows a
   placeholder instead is a project with no URL at all (X Dental). */
export const BrowserPreview = ({
  url,
  label,
  title,
  active,
  height = "260px",
  aspectRatio,
  scale = 0.72,
  imageSrc,
  imageFit = "cover",
  imageBg,
  videoSrc,
  videoFit = "cover",
  videoPosition = "center",
  videoPreload = "auto",
  isLight,
  // Optional per-card override for the light-mode shadow — kept as a prop
  // (rather than changed in place) so a single card's spec-requested shadow
  // value doesn't silently change every other card using this component.
  lightShadowClass = "shadow-[0_14px_35px_rgba(15,23,42,0.08)] group-hover:shadow-[0_14px_35px_rgba(15,23,42,0.08),0_0_24px_rgba(56,189,248,0.14)]",
}: {
  url?: string;
  label: string;
  title: string;
  active: boolean;
  height?: string;
  aspectRatio?: string;
  scale?: number;
  imageSrc?: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  videoSrc?: string;
  videoFit?: "cover" | "contain";
  videoPosition?: string;
  videoPreload?: "auto" | "metadata" | "none";
  isLight: boolean;
  lightShadowClass?: string;
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const useVideoMode = Boolean(videoSrc);
  const useImageMode = !useVideoMode && Boolean(imageSrc);
  const imageBroken = useImageMode && imageFailed;
  const showNoUrlFallback = !url && !imageSrc && !videoSrc;
  const inversePercent = `${100 / scale}%`;
  // Falls back per-theme instead of a single hardcoded dark value: every card
  // shows this exact color for a moment before its preview activates (lazy/
  // inactive state) or as the permanent backdrop when there's no url/image/
  // video at all. A hardcoded dark fallback here was the real root cause of
  // the "dark patch before the CTA" — it wasn't only Abdalwahb, every card
  // using this component had the same unconditional #050810 default; it just
  // happened to land on a section seam for the last card before the CTA.
  const resolvedImageBg = imageBg ?? (isLight ? "#F8FBFF" : "#050810");

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/[0.08] [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),filter_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.01] group-hover:brightness-110 ${
        // Outer frame background — sits behind the chrome bar and preview
        // area, both of which fully cover it via rounded-2xl + overflow-
        // hidden clipping. Still theme-gated (was unconditionally #03050a)
        // so no dark value survives anywhere in this component in light mode.
        isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"
      } ${
        // Root cause of "heavy shadow under the preview": this was never
        // theme-gated at all — same 0_20px_50px_rgba(0,0,0,0.45) in both
        // themes, same pattern as the earlier CaseStudyFeatureSection/footer
        // shadow bugs. Fine against dark mode's own near-black cards; over
        // the new light-mode glass cards it read as a heavy black smudge.
        isLight
          ? lightShadowClass
          : "shadow-[0_20px_50px_rgba(0,0,0,0.45)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_30px_rgba(56,189,248,0.16)]"
      }`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0a0f1a] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        <span className="ml-2 truncate rounded-full bg-white/[0.05] px-2.5 py-0.5 [font-family:'JetBrains_Mono',Helvetica] text-[10px] text-[#f5f7fa60]">
          {label}
        </span>
      </div>

      {/* Preview area — a fixed-height clipped window. Three mutually exclusive
          content modes:
          1) videoSrc set → a local recorded video (Abdalwahb), muted/looping,
             gated behind `active` the same way the iframe is below so a 12MB
             file doesn't start downloading until the card is actually scrolled
             near.
          2) imageSrc set → a static screenshot, used for sites that block
             iframe embedding (their server refuses X-Frame-Options/CSP, which
             we can't detect reliably, so a static image sidesteps the problem
             entirely instead of guessing).
          3) no imageSrc/videoSrc, url set → the live iframe, scaled up then
             shrunk so more of the real site's hero fits in the small frame. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ ...(aspectRatio ? { aspectRatio } : { height }), backgroundColor: resolvedImageBg }}
      >
        {useVideoMode && active && (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload={videoPreload}
            aria-label={title}
            style={{ objectFit: videoFit, objectPosition: videoPosition }}
            className="absolute inset-0 h-full w-full [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),filter_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:brightness-110"
          />
        )}

        {useImageMode && !imageBroken && (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            style={{ objectFit: imageFit }}
            className="absolute inset-0 h-full w-full object-top [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),filter_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:brightness-110"
          />
        )}

        {!useVideoMode && !useImageMode && url && active && (
          <div
            className="pointer-events-none absolute left-0 top-0 origin-top-left"
            style={{ width: inversePercent, height: inversePercent, transform: `scale(${scale})` }}
          >
            <iframe
              src={url}
              title={title}
              loading="lazy"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin"
              className="h-full w-full border-0"
            />
          </div>
        )}

        {(showNoUrlFallback || imageBroken) && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.10),transparent_65%)] px-4 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <Globe className="h-4 w-4 text-[#f5f7fa60]" />
            </span>
            <p className="[font-family:'Inter',Helvetica] text-[12px] leading-[18px] text-[#f5f7fa70]">
              {imageBroken ? "Preview image needed." : "Website not uploaded yet — preview coming soon."}
            </p>
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} in a new tab`}
            className="absolute bottom-2 right-2 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 [font-family:'Inter',Helvetica] text-[11px] text-white opacity-0 backdrop-blur-sm [transition:opacity_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
          >
            Open Live Website ↗
          </a>
        )}
      </div>
    </div>
  );
};

const XDentalCard = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const t = useDict(workPageDict);
  const copy = t.xDental;
  const [previewActive, setPreviewActive] = useState(false);

  return (
  <motion.div
    variants={fadeUp}
    // Light mode: this card's own entrance is fully owned by the GSAP
    // scroll-reveal on its wrapper (see WorkPage's "work-first-project"
    // effect) — starting already "visible" here means framer-motion has
    // nothing left to animate, so the two systems never fight over the
    // same opacity/transform. Dark mode is completely untouched — same
    // whileInView reveal it always had.
    initial={reduced || isLight ? "visible" : "hidden"}
    whileInView="visible"
    onViewportEnter={() => setPreviewActive(true)}
    viewport={{ once: true, margin: "-80px" }}
    data-testid="card-project-x-dental"
    className={`group relative overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1.5 hover:brightness-[1.03] ${
      isLight
        ? "rounded-[32px] border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.75)] shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.08),0_0_40px_rgba(56,189,248,0.16)]"
        : "rounded-3xl border-[#ffffff12] bg-[#080f1c] shadow-[0px_0px_60px_#00000060] hover:border-[#38bdf873] hover:shadow-[0px_0px_60px_#00000060,0_0_40px_rgba(56,189,248,0.14),0_0_90px_rgba(37,99,235,0.10)]"
    }`}
  >
    {/* Ambient always-on accent blobs — light mode drops these (they'd sit as
        a permanent colored patch on the new glass surface); dark mode keeps
        them exactly as before. Accent still comes through via labels/hover/
        CTA per spec, just not as a standing background tint. */}
    {!isLight && (
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-[400px] w-[400px] rounded-full bg-[#38bdf80d] blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[500px] bg-[#1d4ed80a] blur-[100px]" />
      </div>
    )}
    {/* Right column widened from a fixed 380px (read as a narrow phone-style
        sidebar next to the text) to a 54/46 split, so the video preview gets
        real widescreen room instead of being squeezed into a vertical box. */}
    <div className="relative grid gap-0 lg:grid-cols-[54%_46%]">
      <div className="flex flex-col justify-between gap-6 p-8 sm:p-10 lg:p-12">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.4px] text-[#38bdf8] uppercase">
              {t.card.featuredProject}
            </span>
            <span className="h-px w-8 bg-[#38bdf840]" />
          </div>
          <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-semibold leading-[1.05] tracking-[-1px] sm:text-[48px] lg:text-[56px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
            X Dental
          </h3>
          <p className="mt-2 [font-family:'Inter',Helvetica] text-[14px] font-normal tracking-[0.14px] text-[#38bdf8]">
            {copy.type}
          </p>
        </div>
        <p className={`max-w-[560px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[27px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>
          {copy.description}
        </p>
        <p className={`max-w-[560px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[24px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa61]"}`}>
          {copy.secondary}
        </p>
        <div className="flex flex-wrap gap-2">
          {copy.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} color="#38bdf8" isLight={isLight} />
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Button
            asChild
            data-testid="button-view-x-dental"
            variant="ghost"
            className="h-auto p-0 [font-family:'Inter',Helvetica] text-[14px] font-medium tracking-[0] text-sky-400 hover:bg-transparent hover:text-sky-300"
          >
            {/* Internal navigation — this is a Lux Studio page, not the
                external product, so it never opens a new tab. */}
            <Link href="/work/x-dental">
              {t.card.viewCaseStudy} <span className="rtl:rotate-180 inline-block">→</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className={`flex flex-col gap-4 border-t p-8 lg:border-l lg:border-t-0 lg:p-10 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-[#ffffff0a]"}`}>
        <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.40)]" : "text-[#f5f7fa3d]"}`}>
          {t.card.imageProduction}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {copy.proof.map((item) => (
            <div
              key={item}
              className={`flex items-center gap-2.5 rounded-xl border p-3 ${
                isLight ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.06)]" : "border-[#38bdf81a] bg-[#38bdf808]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400/60 shrink-0" />
              <span className={`[font-family:'Inter',Helvetica] text-[12px] font-normal leading-[18px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <BrowserPreview
            url={xDentalWebsiteUrl}
            label={xDentalWebsiteLabel}
            title={t.card.websitePreviewTitle("X Dental")}
            active={previewActive}
            aspectRatio="16 / 9"
            videoSrc={xDentalHeroVideo}
            videoFit="cover"
            videoPreload="metadata"
            isLight={isLight}
            lightShadowClass="shadow-[0_16px_40px_rgba(15,23,42,0.10)] group-hover:shadow-[0_16px_40px_rgba(15,23,42,0.10),0_0_24px_rgba(56,189,248,0.14)]"
          />
          {/* Small, understated external link — deliberately quieter than
              "View Case Study" (no bold color, thin underline only on
              hover) so it never competes with the internal CTA above. */}
          <a
            href={xDentalWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-x-dental-domain"
            className={`mt-2.5 inline-flex items-center gap-1 [font-family:'Inter',Helvetica] text-[11.5px] font-normal tracking-[0.1px] underline-offset-4 transition-colors hover:underline ${
              isLight ? "text-[rgba(15,23,42,0.42)] hover:text-[#0284c7]" : "text-[#f5f7fa4d] hover:text-sky-300"
            }`}
          >
            {xDentalWebsiteLabel} <span className="rtl:rotate-180 inline-block">↗</span>
          </a>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const ProjectCard = ({
  project,
  animVariant,
  reduced,
  isLight,
}: {
  project: (typeof projectMeta)[number];
  animVariant: typeof fadeUp | typeof fadeRight;
  reduced: boolean;
  isLight: boolean;
}) => {
  const t = useDict(workPageDict);
  const copy =
    project.id === "houd-el-nile" ? t.houdElNile : project.id === "al-nours" ? t.alNours : t.alBaraka;
  const [previewActive, setPreviewActive] = useState(false);
  const previewUrl = projectPreviewUrl[project.id];
  const previewLabel = previewUrl
    ? new URL(previewUrl).hostname
    : `${project.name.toLowerCase().replace(/\s+/g, "")}.com`;
  // Resolves dynamically against the case-study registry — every project
  // rendered through ProjectCard (Houd El Nile, Al Nours, Al Baraka) now has
  // a real entry there, so this is truthy for all three and the button
  // below renders as an internal Link to /work/<slug>. Only a project with
  // no registry entry at all would fall through to the inert Button below.
  const caseStudy = getCaseStudy(project.id);

  return (
  <motion.div
    variants={animVariant}
    initial={reduced ? "visible" : "hidden"}
    whileInView="visible"
    onViewportEnter={() => setPreviewActive(true)}
    viewport={{ once: true, margin: "-60px" }}
    data-testid={`card-project-${project.id}`}
    className={`group relative flex h-full flex-col overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1.5 hover:brightness-[1.03] ${
      isLight
        ? "rounded-[32px] border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.75)] shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md hover:border-[var(--card-accent-border)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.08),0_0_40px_var(--card-accent-glow)]"
        : "rounded-3xl border-[#ffffff0e] bg-[#060c16] shadow-[0px_0px_40px_#00000040] hover:border-[#38bdf873] hover:shadow-[0px_0px_40px_#00000040,0_0_40px_rgba(56,189,248,0.14),0_0_90px_rgba(37,99,235,0.10)]"
    }`}
    style={
      isLight
        ? ({ "--card-accent-border": `${project.accent}80`, "--card-accent-glow": `${project.accent}33` } as React.CSSProperties)
        : { background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)` }
    }
  >
    {/* Always-on accent wash — dropped in light mode so the accent only
        shows via the corner badge, hover glow, and text highlights, per
        spec ("do not color the entire card"). */}
    {!isLight && (
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full blur-[100px] opacity-40"
          style={{ background: project.accent }}
        />
      </div>
    )}
    <div className="relative p-4">
      <div
        className="absolute left-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-sm"
        style={{ borderColor: `${project.accent}30`, background: `${project.accent}18` }}
      >
        <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-medium tracking-[0.5px] ${isLight ? "text-[rgba(15,23,42,0.75)]" : "text-[#f5f7fa80]"}`}>
          {project.id === "houd-el-nile"
            ? "HN"
            : project.id === "al-nours"
            ? "AN"
            : "AB"}
        </span>
      </div>
      <BrowserPreview
        url={previewUrl}
        label={previewLabel}
        title={t.card.websitePreviewTitle(project.name)}
        active={previewActive}
        height="clamp(300px, 24vw, 380px)"
        scale={projectPreviewScale[project.id]}
        isLight={isLight}
      />
      {/* Same understated external-domain treatment as the X Dental card's
          own domain link — deliberately quieter than "View Case Study" so it
          never competes with the internal CTA below. Houd El Nile and Al
          Nours both have a real preview URL wired to an actual live site
          among these three cards, so this is scoped to them rather than
          shown for every card (Al Baraka's site isn't uploaded yet). */}
      {(project.id === "houd-el-nile" || project.id === "al-nours") && previewUrl && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`link-${project.id}-domain`}
          className={`mt-2.5 inline-flex items-center gap-1 [font-family:'Inter',Helvetica] text-[11.5px] font-normal tracking-[0.1px] underline-offset-4 transition-colors hover:underline ${
            isLight ? "text-[rgba(15,23,42,0.42)] hover:text-[#0284c7]" : "text-[#f5f7fa4d] hover:text-sky-300"
          }`}
        >
          {previewLabel} <span className="rtl:rotate-180 inline-block">↗</span>
        </a>
      )}
    </div>
    <div className="relative flex flex-1 flex-col p-6 pt-0">
      <div>
        <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-semibold leading-[1.1] tracking-[-0.65px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
          {project.name}
        </h3>
        <p
          className="mt-1 [font-family:'Inter',Helvetica] text-[12px] font-normal tracking-[0.12px]"
          style={{ color: project.accent }}
        >
          {copy.type}
        </p>
      </div>
      <p className={`mt-4 [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[23px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7fa80]"}`}>
        {copy.description}
      </p>
      <div className={`flex flex-wrap gap-1.5 ${project.id === "houd-el-nile" ? "mt-6" : "mt-4"}`}>
        {copy.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag} tag={tag} color={project.accent} isLight={isLight} />
        ))}
        {copy.tags.length > 4 && (
          <span className={`inline-flex items-center rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[11px] ${isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.03)] text-[rgba(15,23,42,0.40)]" : "border-[#ffffff0e] bg-[#ffffff04] text-[#f5f7fa38]"}`}>
            +{copy.tags.length - 4}
          </span>
        )}
      </div>

      {project.id === "houd-el-nile" && (
        <div className="mt-7 lg:mt-10">
          <div>
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-medium tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa50]"}`}>
              {t.houdElNile.photographyLabel}
            </p>
            <p className={`mt-2.5 max-w-[90%] [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[1.6] ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa70]"}`}>
              {t.houdElNile.photographyDescription}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-7">
            {houdElNileGalleryImages.map((src, i) => (
              <div
                key={src}
                className={`group/photo relative aspect-[4/3] overflow-hidden rounded-[18px] border [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] hover:border-[#4ade8080] ${
                  isLight
                    ? "border-[rgba(15,23,42,0.08)] shadow-[0_10px_30px_rgba(15,23,42,0.10)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.10),0_0_24px_rgba(74,222,128,0.18)]"
                    : "border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_24px_rgba(74,222,128,0.18)]"
                }`}
              >
                <img
                  src={src}
                  alt={t.houdElNile.galleryAlt(i + 1)}
                  loading="lazy"
                  className="h-full w-full object-cover [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),filter_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.04] group-hover/photo:brightness-110"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={project.id === "houd-el-nile" ? "mt-8 pb-0 lg:mt-10" : "mt-auto pt-2"}>
        {caseStudy ? (
          <Button
            asChild
            data-testid={`button-view-${project.id}`}
            variant="ghost"
            className="h-auto p-0 [font-family:'Inter',Helvetica] text-[13px] font-medium tracking-[0] hover:bg-transparent"
            style={{ color: project.accent }}
          >
            {/* Internal navigation — this is a Lux Studio page, not the
                external product, so it never opens a new tab. */}
            <Link href={`/work/${caseStudy.data.slug}`}>
              {t.card.viewCaseStudy} <span className="rtl:rotate-180 inline-block">→</span>
            </Link>
          </Button>
        ) : (
          <Button
            type="button"
            data-testid={`button-view-${project.id}`}
            variant="ghost"
            className="h-auto p-0 [font-family:'Inter',Helvetica] text-[13px] font-medium tracking-[0] hover:bg-transparent"
            style={{ color: project.accent }}
          >
            {t.card.viewCaseStudy} <span className="rtl:rotate-180 inline-block">→</span>
          </Button>
        )}
      </div>
    </div>
  </motion.div>
  );
};

/* Abdalwahb — a standalone featured card (like X Dental), not driven by the
   shared `projects` array, so it can't accidentally affect the other cards. */
const abdalwahbUrl = "https://abdalwahb.com";

const AbdalwahbCard = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const t = useDict(workPageDict);
  const copy = t.abdalwahb;
  const [previewActive, setPreviewActive] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      onViewportEnter={() => setPreviewActive(true)}
      viewport={{ once: true, margin: "-60px" }}
      data-testid="card-project-abdalwahb"
      className={`group relative overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1.5 hover:brightness-[1.03] ${
        // Light-mode shadow reduced from the shared 0_20px_60px card shadow
        // (offset+blur reach ~80px) to 0_8px_24px (reach ~32px) — this is
        // the LAST card before the CTA, and the old shadow's blur envelope
        // physically extended past the section's own ~32px bottom gap into
        // the CTA area, a bleed getComputedStyle(...).backgroundColor can't
        // detect since it doesn't change the CTA section's own background
        // property. Same soft "glass" character (color/alpha), just a
        // tighter falloff so it never reaches the next section. Scoped to
        // this card only — every other card keeps the original shared shadow.
        isLight
          ? "rounded-[32px] border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.75)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.06),0_0_40px_rgba(56,189,248,0.16)]"
          : "rounded-3xl border-[#ffffff0e] shadow-[0px_0px_40px_#00000040] hover:border-[#38bdf873] hover:shadow-[0px_0px_40px_#00000040,0_0_40px_rgba(56,189,248,0.14),0_0_90px_rgba(37,99,235,0.10)]"
      }`}
      style={isLight ? undefined : { background: "linear-gradient(135deg, #0f172a 0%, #060c16 100%)" }}
    >
      {!isLight && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full bg-[#38bdf8] opacity-[0.14] blur-[130px]" />
          <div className="absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-[#2563eb] opacity-[0.1] blur-[120px]" />
        </div>
      )}

      <div className="relative grid min-h-[440px] gap-8 p-6 sm:p-8 lg:min-h-[480px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-10">
        {/* Left: text content */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.4px] text-[#38bdf8] uppercase">
              A.05
            </span>
            <h3 className={`mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-semibold leading-[1.1] tracking-[-0.7px] sm:text-[36px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
              Abdalwahb
            </h3>
            <p className="mt-1 [font-family:'Inter',Helvetica] text-[12px] font-normal tracking-[0.12px] text-[#38bdf8]">
              {copy.type}
            </p>
          </div>
          <p className={`[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[23px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7fa80]"}`}>
            {copy.description}
          </p>
          <p className={`[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[21px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa61]"}`}>
            {copy.secondary}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {copy.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} color="#38bdf8" isLight={isLight} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-1">
            <Button
              asChild
              data-testid="button-view-abdalwahb"
              variant="ghost"
              className="h-auto p-0 [font-family:'Inter',Helvetica] text-[13px] font-medium tracking-[0] text-sky-400 hover:bg-transparent hover:text-sky-300"
            >
              {/* Internal navigation — this is a Lux Studio page, not the
                  external product, so it never opens a new tab. Previously a
                  plain, non-navigating Button; this is the fix for the
                  reported "View Case Study" button that didn't go anywhere. */}
              <Link href="/work/abdalwahb">
                {t.card.viewCaseStudy} <span className="rtl:rotate-180 inline-block">→</span>
              </Link>
            </Button>
            <a
              href={abdalwahbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`[font-family:'Inter',Helvetica] text-[13px] font-medium tracking-[0] transition-colors ${isLight ? "text-[rgba(15,23,42,0.65)] hover:text-[#0f172a]" : "text-[#f5f7fa80] hover:text-[#f5f7fa]"}`}
            >
              {t.preview.openLiveWebsite} <span className="rtl:rotate-180 inline-block">↗</span>
            </a>
          </div>
        </div>

        {/* Right: wide landscape website preview — 16/10, so the full hero
            width shows instead of the sides being cropped off. Capped to a
            max width so it can't grow to fill the whole (wider) right column
            and push the card taller than needed; a wide, short shape stays
            short even at a large width, unlike a square (whose height always
            equals its width). */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[560px]">
            <BrowserPreview
              url={abdalwahbUrl}
              videoSrc={abdalwahbHeroVideo}
              label="abdalwahb.com"
              title={t.card.websitePreviewTitle("Abdalwahb")}
              active={previewActive}
              aspectRatio="16 / 10"
              videoFit="cover"
              videoPosition="60% center"
              // No explicit imageBg override needed — BrowserPreview's own
              // default now resolves per-theme (see resolvedImageBg there),
              // so every card's lazy/inactive preview state matches its
              // theme instead of only this one card being special-cased.
              isLight={isLight}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const WorkPage = () => {
  useSEO(pageMeta.work);
  useJSONLD("breadcrumb", buildBreadcrumbSchema(pageBreadcrumbs.work));
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(workPageDict);
  const common = useDict(commonDict);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-linked "rising sheet" reveal — light mode only. The sheet's
  // FINAL resting position still comes from the static negative margin on
  // its section (unchanged, untouched by this effect) — that's what keeps
  // the layout stable and gives the "slight negative overlap" end state.
  // This effect only adds an ADDITIVE transform on top: the sheet starts
  // pushed down by translateY(220px), which more than cancels the negative
  // margin at rest (so nothing overlaps the hero on load), then scrubs back
  // to translateY(0) as the user scrolls past the hero — at that point the
  // static margin alone is doing the overlapping, exactly as before.
  const heroRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const firstProjectRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLight || reduced) return;
    const heroEl = heroRef.current;
    const sheetEl = sheetRef.current;
    const firstProjectEl = firstProjectRef.current;
    if (!heroEl || !sheetEl || !firstProjectEl) return;

    const ctx = gsap.context(() => {
      gsap.set(sheetEl, { y: 220, opacity: 0.98, willChange: "transform", backfaceVisibility: "hidden" });
      gsap.set(firstProjectEl, { y: 80, opacity: 0, willChange: "transform, opacity", backfaceVisibility: "hidden" });

      gsap.to(sheetEl, {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "bottom bottom",
          end: "bottom 45%",
          scrub: 0.8,
        },
      });

      gsap.to(firstProjectEl, {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sheetEl,
          start: "top 85%",
          end: "top 55%",
          scrub: 0.8,
        },
      });
    });

    return () => ctx.revert();
  }, [isLight, reduced]);

  return (
    <main className={`w-full overflow-x-clip ${isLight ? "bg-[#F8FBFF]" : ""}`} data-testid="page-work">
      <div className="page-content-layer">

      {/* Hero */}
      <section
        ref={heroRef}
        data-section="work-hero"
        className={`relative w-full pt-[80px] ${isLight ? "z-[1] overflow-visible min-h-[100svh] lg:min-h-[980px]" : "overflow-hidden min-h-[640px]"}`}
        aria-label={t.hero.ariaLabel}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/figmaAssets/imagewithfallback.webp')" }}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,5,10,0.6)_0%,rgba(3,5,10,0.1)_30%,rgba(3,5,10,0.4)_70%,rgba(3,5,10,1)_100%)]" />

        {/* Aurora glow */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute left-1/2 top-[30%] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#1d4ed818] blur-[160px]" />
          <div className="absolute left-1/2 top-[20%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7c3aed0d] blur-[120px]" />
        </div>

        <StarsBackground count={isMobile ? 35 : 65} className="z-[2]" />
        <SideStars starsPerSide={isMobile ? 10 : 18} className="z-[3]" />
        {!isMobile && <ShootingStars className="z-[4]" />}

        {/* No separate bottom-fade layer: per explicit instruction, the
            negative-margin overlap below is what blends hero into the
            projects sheet — a gradient stacked on top of the overlap kept
            reading as its own "band" no matter how faint. Original dark
            overlay above is untouched either way, so dark mode is
            unaffected. */}

        {/* Content wrapper intentionally stays content-hugging (min-h-[560px])
            in both themes, not stretched to the new taller light-mode hero.
            Stretching it to fill the full height (an earlier attempt) centered
            the text within the whole hero, pushing it down into the overlap
            zone below — the sheet was covering real text, not just
            atmosphere. Keeping the text anchored near the top means the
            EXTRA height added in light mode becomes pure breathing space
            below the text, which is exactly where the overlap should land. */}
        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 pb-[100px] pt-[120px] text-center sm:px-10 lg:px-16">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <p
              className="[font-family:'JetBrains_Mono',Helvetica] text-[12px] font-normal tracking-[1.8px] uppercase"
              style={{ color: "var(--hero-eyebrow-text-fixed)", textShadow: "var(--hero-eyebrow-text-fixed-shadow)" }}
            >
              {t.hero.eyebrow}
            </p>
            <h1 className="max-w-[860px] [font-family:'Bricolage_Grotesque',Helvetica] text-[46px] font-semibold leading-[0.97] tracking-[-1.6px] text-[#f5f7fa] sm:text-[68px] sm:tracking-[-2.2px] lg:text-[96px] lg:tracking-[-2.88px]">
              {t.hero.heading}
            </h1>
            <p className="max-w-[600px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[29px] tracking-[0.1px] text-[#f5f7faad]">
              {t.hero.subheading}
            </p>
            <p
              className="[font-family:'Inter',Helvetica] text-[13px] font-normal tracking-[0.13px]"
              style={{ color: "var(--hero-accent-text-fixed)", textShadow: "var(--hero-accent-text-fixed-shadow)" }}
            >
              {t.hero.stats}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section — light mode only. Static negative margin gives it
          its FINAL resting overlap (unchanged, still the sole layout
          mechanism — no animation touches margin/top/height). The entrance
          itself is a separate, additive GSAP transform (see the effect
          above) that starts the sheet pushed down far enough to cancel this
          margin at rest, then scrubs to translateY(0) on scroll — at which
          point the static margin alone produces the overlap, same as
          before. Explicit z-[5] against the hero's own z-[1] guarantees
          this sheet paints on top of the hero regardless of DOM order.
          Dark mode keeps the exact original flush, unpositioned layout —
          no margin, no z-index, no rounded corners, no GSAP effect. */}
      <section
        ref={sheetRef}
        data-section="work-projects-sheet"
        className={`relative w-full overflow-visible px-4 pb-20 sm:px-6 lg:px-12 xl:px-20 ${
          isLight
            ? "z-[5] -mt-[60px] rounded-t-[72px] border-t border-[rgba(15,23,42,0.08)] bg-[#F8FBFF] pt-16 shadow-[0_-24px_80px_rgba(15,23,42,0.08)] sm:-mt-[100px] lg:-mt-[150px]"
            : ""
        }`}
        aria-label={t.projectsAriaLabel}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          {/* X Dental – featured horizontal. Wrapped so the GSAP reveal
              above (the ONLY system controlling this entrance in light
              mode) has an element to animate that's separate from
              XDentalCard's own framer-motion whileInView — see the isLight
              guard added to that card's own `initial` prop, which hands
              this reveal fully to GSAP in light mode without touching its
              dark-mode behavior at all. */}
          <div ref={firstProjectRef} data-section="work-first-project">
            <XDentalCard reduced={reduced} isLight={isLight} />
          </div>

          {/* Row 2: Houd El Nile tall | Al Nours + Al Baraka */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
            {/* Houd El Nile – tall vertical */}
            <ProjectCard
              project={projectMeta[1]}
              animVariant={fadeUp}
              reduced={reduced}
              isLight={isLight}
            />

            {/* Al Nours + Al Baraka stacked */}
            <div className="flex flex-col gap-5">
              <ProjectCard
                project={projectMeta[2]}
                animVariant={fadeRight}
                reduced={reduced}
                isLight={isLight}
              />
              <ProjectCard
                project={projectMeta[3]}
                animVariant={fadeUp}
                reduced={reduced}
                isLight={isLight}
              />
            </div>
          </div>

          {/* Abdalwahb – full-width featured card, below the existing cards */}
          <AbdalwahbCard reduced={reduced} isLight={isLight} />
        </div>
      </section>

      <FinalCtaSection
        eyebrow={common.actions.startAProject}
        heading={t.cta.heading}
        description={t.cta.description}
        secondaryLabel={common.actions.exploreServices}
        secondaryHref="/services"
        primaryTestId="button-work-cta-start"
        secondaryTestId="button-work-cta-services"
      />

      </div>
      <FooterRevealStage />
    </main>
  );
};
