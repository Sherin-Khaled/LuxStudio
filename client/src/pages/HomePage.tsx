import { Card, CardContent } from "@/components/ui/card";
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
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <Card className="w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="flex w-full flex-col">
            <HeroBannerSection />
            <ExpertiseHighlightsSection />
            <MissionStatementSection />
            <OfferingsOverviewSection />
            <StudioUniverseSection />
            <ProcessJourneySection />
            <CaseStudyFeatureSection />
            <ClientLogoMarqueeSection />
            <StudioValueSection />
            <ClientTestimonialsSection />
            <SiteFooterSection />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
