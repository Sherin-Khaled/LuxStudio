import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { useDict } from "@/lib/i18n/useDict";
import { homePageDict } from "@/lib/i18n/homePage";
import { useSEO } from "@/lib/seo/useSEO";
import { pageMeta } from "@/lib/seo/pageMeta";
import { CaseStudyFeatureSection } from "./sections/CaseStudyFeatureSection";
import { ClientLogoMarqueeSection } from "./sections/ClientLogoMarqueeSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { ExpertiseHighlightsSection } from "./sections/ExpertiseHighlightsSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { MissionStatementSection } from "./sections/MissionStatementSection";
import { OfferingsOverviewSection } from "./sections/OfferingsOverviewSection";
import { ProcessJourneySection } from "./sections/ProcessJourneySection";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { StudioUniverseSection } from "./sections/StudioUniverseSection";
import { StudioValueSection } from "./sections/StudioValueSection";

export const HomePage = (): JSX.Element => {
  useSEO(pageMeta.home);
  const t = useDict(homePageDict);
  const reduced = useReducedMotion() ?? false;
  const heroRootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroScrollProgressRef = useRef(0);

  useLayoutEffect(() => {
    const root = heroRootRef.current;
    const hero = heroRef.current;
    if (!root || !hero || reduced) return;

    let media: ReturnType<typeof gsap.matchMedia> | null = null;
    const ctx = gsap.context(() => {
      const heroContent = hero.querySelector<HTMLElement>(".home-hero-content");
      const heroBackground = hero.querySelector<HTMLElement>("[data-home-hero-background]");
      const scrollHint = hero.querySelector<HTMLElement>("[data-home-scroll-hint]");
      if (!heroContent || !heroBackground || !scrollHint) return;

      media = gsap.matchMedia();
      media.add({ compact: "(max-width: 767px)", wide: "(min-width: 768px)" }, ({ conditions }) => {
        const compact = conditions?.compact ?? false;
        gsap.set(heroBackground, { transformOrigin: "50% 50%", willChange: "transform" });
        gsap.set(scrollHint, { autoAlpha: 1, y: 0 });
        const heroTimeline = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            id: "home-hero-camera",
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              heroScrollProgressRef.current = progress;
            },
            onToggle: ({ isActive }) => {
              gsap.set(heroBackground, { willChange: isActive ? "transform" : "auto" });
            },
          },
        });
        heroTimeline
          .to(heroBackground, { scale: compact ? 1.045 : 1.085, yPercent: compact ? -2 : -5, duration: 1 }, 0)
          .to(heroContent, {
            yPercent: compact ? -6 : -10,
            scale: compact ? 0.985 : 0.955,
            duration: 1,
          }, 0)
          .to(heroContent, {
            autoAlpha: compact ? 0.55 : 0.22,
            duration: 0.45,
          }, 0.55)
          .to(scrollHint, { autoAlpha: 0.75, y: -3, duration: 0.05 }, 0)
          .to(scrollHint, { autoAlpha: 0.25, y: -9, duration: 0.07 }, 0.05)
          .to(scrollHint, { autoAlpha: 0, y: compact ? -10 : -14, duration: 0.08 }, 0.12);
      });

    }, root);

    return () => {
      heroScrollProgressRef.current = 0;
      media?.revert();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <main className="page-content-layer w-full overflow-x-hidden bg-[#F8FBFF] dark:bg-transparent">
      <Card className="w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="flex w-full flex-col">
            <div ref={heroRootRef} className="home-approved-hero">
              <div ref={heroRef} className="home-approved-hero-content" data-section="hero">
                <HeroBannerSection cinematic scrollProgressRef={heroScrollProgressRef} />
              </div>
            </div>
            <ExpertiseHighlightsSection />
            <MissionStatementSection />
            <OfferingsOverviewSection />
            <StudioUniverseSection />
            <ProcessJourneySection />
            <CaseStudyFeatureSection />
            <ClientLogoMarqueeSection />
            <StudioValueSection />
            <ClientTestimonialsSection />
            <FinalCtaSection
              eyebrow={t.cta.eyebrow}
              heading={t.cta.heading}
              description={t.cta.description}
              secondaryLabel={t.cta.secondaryLabel}
              secondaryHref="/work"
              primaryTestId="button-home-cta-start"
              secondaryTestId="button-home-cta-work"
            />
            <SiteFooterSection />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
