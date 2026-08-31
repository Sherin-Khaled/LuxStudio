import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BrowserPreview } from "@/pages/WorkPage";
import { caseStudyContainer } from "./CaseStudySection";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { CaseStudySharedCopy } from "@/lib/i18n/caseStudies/shared";

export const CaseStudyHero = ({ data, copy }: { data: CaseStudyData; copy: CaseStudySharedCopy }): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden pt-[140px] pb-20 lg:pt-[160px] lg:pb-28 ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}
      aria-label={`${data.slug} case study hero`}
    >
      {/* Atmosphere — restrained cyan + violet glows, no planets/particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[170px]"
          style={{ background: isLight ? "rgba(29,78,216,0.08)" : "rgba(29,78,216,0.16)" }}
        />
        <div
          className="absolute right-[8%] top-[20%] h-[320px] w-[320px] rounded-full blur-[130px]"
          style={{ background: isLight ? "rgba(124,58,237,0.06)" : "rgba(124,58,237,0.12)" }}
        />
      </div>

      <StarsBackground count={isMobile ? 30 : 60} className="z-[1]" variant={isLight ? "light" : "dark"} />
      <SideStars starsPerSide={isMobile ? 8 : 16} className="z-[1]" variant={isLight ? "light" : "dark"} />

      <div className={`relative z-10 ${caseStudyContainer}`}>
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/work"
            className={`inline-flex items-center gap-1.5 [font-family:'Inter',Helvetica] text-[13px] font-medium transition-colors ${
              isLight ? "text-[rgba(15,23,42,0.55)] hover:text-[#0f172a]" : "text-[#f5f7fa80] hover:text-[#f5f7fa]"
            }`}
          >
            <ArrowLeft className={`h-3.5 w-3.5 ${dir === "rtl" ? "rotate-180" : ""}`} aria-hidden="true" />
            {copy.common.backToWork}
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: editorial copy */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : 0.05 }}
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[12px] font-normal tracking-[1.8px] uppercase ${isLight ? "text-[#0284c7]" : "text-[#38bdf8]"}`}>
              {copy.hero.eyebrow}
            </p>
            <p className={`mt-4 [font-family:'Inter',Helvetica] text-[15px] font-medium ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa90]"}`}>
              {copy.hero.title} — {copy.hero.subtitle}
            </p>
            <h1
              className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[44px] font-semibold leading-[1.04] tracking-[-1.4px] sm:text-[58px] lg:text-[68px] lg:tracking-[-2px] ${
                isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
              }`}
            >
              {copy.hero.headlineLine1}
              <br />
              {copy.hero.headlineLine2}
            </h1>
            <p className={`mt-6 max-w-[520px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[27px] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>
              {copy.hero.supporting}
            </p>

            {/* Metrics — compact inline stat row (the dedicated cinematic
                reveal lives further down the page in ScaleSequence; this is
                the quick-glance version). */}
            <div className={`mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-y py-6 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-white/10"}`}>
              {data.metrics.map((metric) => (
                <div key={metric.key} className="flex flex-col">
                  <span className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-semibold leading-none tracking-[-0.6px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                    {metric.value}
                  </span>
                  <span className={`mt-1.5 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa61]"}`}>
                    {copy.hero.metricLabels[metric.key as keyof typeof copy.hero.metricLabels]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {copy.hero.services.map((service) => (
                <span
                  key={service}
                  className={`inline-flex items-center rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[11px] font-medium whitespace-nowrap ${
                    isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.03)] text-[rgba(15,23,42,0.60)]" : "border-white/10 bg-white/[0.04] text-[#f5f7fa90]"
                  }`}
                >
                  {service}
                </span>
              ))}
            </div>

            <a
              href={data.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium transition-all duration-300 ${
                isLight
                  ? "bg-[#0F172A] text-white shadow-[0_10px_28px_rgba(15,23,42,0.20)] hover:-translate-y-0.5"
                  : "bg-[#f5f7fa] text-[#080b12] hover:-translate-y-0.5 hover:opacity-90"
              }`}
              data-testid="link-case-study-visit-live"
            >
              {copy.hero.visitLiveWebsite}
              <ArrowUpRight className={`h-4 w-4 [transition:transform_300ms_ease] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dir === "rtl" ? "-scale-x-100" : ""}`} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Right: real hero media, reusing the exact browser-mockup
              treatment already built for the Work page card. A project
              supplies either a video (X Dental) or a photo (Houd El Nile's
              own farm/orchard photography) via `data.media.hero` — whichever
              is set wins, mirroring BrowserPreview's own video-then-image
              precedence. */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : 0.15 }}
          >
            <BrowserPreview
              url={data.websiteUrl}
              label={data.websiteLabel}
              title={`${data.slug} website preview`}
              active
              aspectRatio="16 / 10"
              videoSrc={data.media.hero?.videoSrc}
              imageSrc={data.media.hero?.src}
              videoFit="cover"
              imageFit="cover"
              videoPreload="auto"
              isLight={isLight}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
