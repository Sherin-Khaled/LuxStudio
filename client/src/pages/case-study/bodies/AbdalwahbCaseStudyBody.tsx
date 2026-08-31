import { useTheme } from "@/contexts/ThemeContext";
import { CaseStudyHero } from "@/pages/case-study/CaseStudyHero";
import { CaseStudySection, CaseStudySplitSection } from "@/pages/case-study/CaseStudySection";
import { CaseStudyChipList, CaseStudyStepFlow } from "@/pages/case-study/CaseStudyPrimitives";
import { SystemsConvergenceDiagram, ScaleSequence } from "@/pages/case-study/CaseStudyDiagrams";
import { CaseStudyMediaSlot, CaseStudyGallery } from "@/pages/case-study/CaseStudyGallery";
import { CaseStudyFinalCta } from "@/pages/case-study/CaseStudyFinalCta";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { CompressionDiagram } from "@/pages/case-study/bodies/abdalwahb/CompressionDiagram";
import { BilingualMirror } from "@/pages/case-study/bodies/abdalwahb/BilingualMirror";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { AbdalwahbCopy } from "@/lib/i18n/caseStudies/abdalwahb";

const LabeledChips = ({ label, items, tone = "neutral" }: { label: string; items: string[]; tone?: "neutral" | "accent" }): JSX.Element => (
  <div>
    <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{label}</p>
    <CaseStudyChipList items={items} tone={tone} />
  </div>
);

const LabeledSteps = ({ label, steps }: { label: string; steps: string[] }): JSX.Element => (
  <div className="flex flex-col items-center gap-4">
    <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{label}</p>
    <CaseStudyStepFlow steps={steps} />
  </div>
);

/**
 * Abdalwahb's own section sequence — a founder-led, bilingual professional-
 * services story: content complexity, professional authority, trust, and
 * Arabic-first UX, not X Dental's commerce scale, Houd El Nile's
 * repositioning story, Al Nours' connected-systems story, or Al Baraka's
 * export-catalog story (see their own Body files). Every screenshot below is
 * a real capture of the live abdalwahb.com production site (see
 * `abdalwahb.data.ts`), not a recreation — this project's own strength is
 * information architecture and bilingual UX, so its two bespoke visuals
 * (`CompressionDiagram`, `BilingualMirror`) are the only new components this
 * case study introduces; everywhere else reuses the same shared primitives
 * every other case study uses.
 */
export const AbdalwahbCaseStudyBody = ({ data, copy }: { data: CaseStudyData; copy: AbdalwahbCopy }): JSX.Element => {
  const common = useDict(commonDict);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <>
      <CaseStudyHero data={data} copy={copy} />

      {/* 1. Project At A Glance */}
      <CaseStudySection
        id="glance"
        eyebrow={copy.glance.eyebrow}
        heading={
          <>
            {copy.glance.headingLine1}
            <br />
            {copy.glance.headingLine2}
          </>
        }
        body={<p>{copy.glance.body}</p>}
        align="center"
      >
        <div className="flex flex-col items-center gap-12">
          <ScaleSequence metrics={data.metrics} labels={copy.hero.metricLabels} />
          <CaseStudyChipList items={copy.glance.chips} tone="accent" />
        </div>
      </CaseStudySection>

      {/* 2. The Core Problem */}
      <CaseStudySection
        id="challenge"
        eyebrow={copy.challenge.eyebrow}
        heading={copy.challenge.heading}
        body={copy.challenge.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      />

      {/* 3. From Breadth To Clarity — the one bespoke "compression" visual */}
      <CaseStudySection id="compression" eyebrow={copy.compression.eyebrow} heading={copy.compression.heading} body={<p>{copy.compression.body}</p>} align="center" glow="blue">
        <CompressionDiagram
          offeringsLabel={copy.compression.offeringsLabel}
          offerings={copy.compression.offerings}
          routesLabel={copy.compression.routesLabel}
          routes={copy.architecture.routes}
          outcome={copy.compression.outcome}
        />
      </CaseStudySection>

      {/* 4. Information Architecture */}
      <CaseStudySection
        id="architecture"
        eyebrow={copy.architecture.eyebrow}
        heading={
          <>
            {copy.architecture.headingLine1}
            <br />
            {copy.architecture.headingLine2}
          </>
        }
        body={copy.architecture.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      >
        <LabeledSteps label={copy.architecture.routesLabel} steps={copy.architecture.routes} />
      </CaseStudySection>

      {/* 5. Primary User Journeys */}
      <CaseStudySection
        id="journeys"
        eyebrow={copy.journeys.eyebrow}
        heading={
          <>
            {copy.journeys.headingLine1}
            <br />
            {copy.journeys.headingLine2}
          </>
        }
        body={<p>{copy.journeys.body}</p>}
        align="center"
      >
        <div className="flex flex-col items-center gap-10">
          <LabeledSteps label={copy.journeys.clientLabel} steps={copy.journeys.clientSteps} />
          <LabeledSteps label={copy.journeys.learnerLabel} steps={copy.journeys.learnerSteps} />
          <LabeledSteps label={copy.journeys.careersLabel} steps={copy.journeys.careersSteps} />
        </div>
      </CaseStudySection>

      {/* 6. Arabic-First UX — the second bespoke visual: a real AR/EN mirror */}
      <CaseStudySection
        id="bilingual"
        eyebrow={copy.bilingual.eyebrow}
        heading={
          <>
            {copy.bilingual.headingLine1}
            <br />
            {copy.bilingual.headingLine2}
          </>
        }
        body={
          <>
            <p>{copy.bilingual.intro}</p>
          </>
        }
        align="center"
        glow="violet"
      >
        <div className="flex flex-col items-center gap-10">
          <CaseStudyChipList items={copy.bilingual.languages} tone="accent" />
          <div className="w-full max-w-[820px]">
            <BilingualMirror
              ar={data.media.hero}
              en={data.media.homeEn}
              arLabel={copy.bilingual.mirrorArLabel}
              enLabel={copy.bilingual.mirrorEnLabel}
              caption={copy.bilingual.mirrorCaption}
            />
          </div>
          <p className="max-w-[640px] text-center text-[13.5px] italic opacity-70">{copy.bilingual.caveat}</p>
        </div>
      </CaseStudySection>

      {/* 7. One Experience. Multiple Systems. — the shared diagram, reused as-is */}
      <CaseStudySection
        id="systems"
        eyebrow={copy.systems.eyebrow}
        heading={
          <>
            {copy.systems.headingLine1}
            <br />
            {copy.systems.headingLine2}
          </>
        }
        body={<p>{copy.systems.body}</p>}
        align="center"
        glow="blue"
      >
        <div className="mx-auto max-w-[640px]">
          <SystemsConvergenceDiagram
            root={copy.systems.diagram.root}
            systems={[copy.systems.diagram.systems[0], copy.systems.diagram.systems[1], copy.systems.diagram.systems[2]]}
            subsystems={[copy.systems.diagram.subsystems[0], copy.systems.diagram.subsystems[1], copy.systems.diagram.subsystems[2]]}
            convergence={copy.systems.diagram.convergence}
          />
        </div>
      </CaseStudySection>

      {/* 8. Services Architecture */}
      <CaseStudySplitSection
        id="services"
        eyebrow={copy.services.eyebrow}
        heading={copy.services.heading}
        body={<p>{copy.services.body}</p>}
        media={
          <CaseStudyMediaSlot media={data.media.services} title={copy.services.eyebrow} caption={copy.services.mediaCaption} aspect="16 / 10" pendingLabel={copy.common.pendingScreen} />
        }
      >
        <LabeledChips label={copy.services.categoriesLabel} items={copy.services.categories} tone="accent" />
      </CaseStudySplitSection>

      {/* 9. Training & Courses */}
      <CaseStudySplitSection
        id="training"
        eyebrow={copy.training.eyebrow}
        heading={copy.training.heading}
        body={<p>{copy.training.body}</p>}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot media={data.media.training} title={copy.training.eyebrow} caption={copy.training.mediaCaption} aspect="16 / 10" pendingLabel={copy.common.pendingScreen} />
        }
      >
        <div className="flex flex-col gap-8">
          <LabeledChips label={copy.training.audienceLabel} items={copy.training.audience} />
          <p className="text-[13.5px] italic opacity-80">{copy.training.caveat}</p>
        </div>
      </CaseStudySplitSection>

      {/* 10. Trust Architecture */}
      <CaseStudySplitSection
        id="trust"
        eyebrow={copy.trust.eyebrow}
        heading={copy.trust.heading}
        body={<p>{copy.trust.body}</p>}
        media={<CaseStudyMediaSlot media={data.media.profile} title={copy.trust.eyebrow} caption={copy.trust.mediaCaption} aspect="16 / 10" pendingLabel={copy.common.pendingScreen} />}
      >
        <div className="flex flex-col gap-8">
          <LabeledChips label={copy.trust.credentialsLabel} items={copy.trust.credentials} tone="accent" />
          <p className="text-[13.5px] italic opacity-70">{copy.trust.caveat}</p>
        </div>
      </CaseStudySplitSection>

      {/* 11. Visual Identity & Motion */}
      <CaseStudySplitSection
        id="visual-identity"
        eyebrow={copy.visualIdentity.eyebrow}
        heading={copy.visualIdentity.heading}
        body={<p>{copy.visualIdentity.body}</p>}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot media={data.media.about} title={copy.visualIdentity.eyebrow} caption={copy.visualIdentity.mediaCaption} aspect="16 / 10" pendingLabel={copy.common.pendingScreen} />
        }
      >
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.visualIdentity.tokensLabel}</p>
            <div className="flex flex-wrap gap-4">
              {data.designTokens.map((token) => (
                <div key={token.name} className="flex items-center gap-2.5">
                  <span className="h-9 w-9 shrink-0 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: token.hex }} aria-hidden="true" />
                  <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] uppercase opacity-70">{token.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <LabeledChips label={copy.visualIdentity.typographyLabel} items={copy.visualIdentity.typography} />
          <div>
            <p className="mb-2 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.visualIdentity.componentLabel}</p>
            <p className={`text-[14px] leading-[23px] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>{copy.visualIdentity.componentNote}</p>
          </div>
          <div>
            <p className="mb-2 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.visualIdentity.motionLabel}</p>
            <p className={`text-[14px] leading-[23px] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>{copy.visualIdentity.motionNote}</p>
          </div>
        </div>
      </CaseStudySplitSection>

      {/* 12. Engineering, Where It Mattered */}
      <CaseStudySection id="engineering" eyebrow={copy.engineering.eyebrow} heading={copy.engineering.heading} body={copy.engineering.body.map((p) => <p key={p}>{p}</p>)}>
        <div className="flex flex-col gap-6">
          <LabeledSteps label={copy.engineering.stackLabel} steps={copy.engineering.stackSteps} />
          <p className="text-center text-[13.5px] italic opacity-70">{copy.engineering.caveat}</p>
        </div>
      </CaseStudySection>

      {/* 13. Lead Generation */}
      <CaseStudySplitSection
        id="lead-gen"
        eyebrow={copy.leadGen.eyebrow}
        heading={copy.leadGen.heading}
        body={<p>{copy.leadGen.body}</p>}
        media={<CaseStudyMediaSlot media={data.media.contact} title={copy.leadGen.eyebrow} caption={copy.leadGen.mediaCaption} aspect="16 / 10" pendingLabel={copy.common.pendingScreen} />}
      >
        <div className="flex flex-col gap-8">
          <LabeledChips label={copy.leadGen.formsLabel} items={copy.leadGen.forms} tone="accent" />
          <p className="text-[13.5px] italic opacity-70">{copy.leadGen.cvNote}</p>
        </div>
      </CaseStudySplitSection>

      {/* 14. Key Screens */}
      <CaseStudySection id="gallery" eyebrow={copy.gallery.eyebrow} heading={copy.gallery.heading}>
        <CaseStudyGallery
          pendingLabel={copy.common.pendingScreen}
          large={{ key: "hero", media: data.media.hero, title: copy.gallery.items.hero.title, caption: copy.gallery.items.hero.caption }}
          pair={[
            { key: "homeEn", media: data.media.homeEn, title: copy.gallery.items.homeEn.title, caption: copy.gallery.items.homeEn.caption },
            { key: "services", media: data.media.services, title: copy.gallery.items.services.title, caption: copy.gallery.items.services.caption },
          ]}
          wide={{ key: "training", media: data.media.training, title: copy.gallery.items.training.title, caption: copy.gallery.items.training.caption }}
          supporting={[
            { key: "profile", media: data.media.profile, title: copy.gallery.items.profile.title, caption: copy.gallery.items.profile.caption },
            { key: "about", media: data.media.about, title: copy.gallery.items.about.title, caption: copy.gallery.items.about.caption },
            { key: "careers", media: data.media.careers, title: copy.gallery.items.careers.title, caption: copy.gallery.items.careers.caption },
            { key: "contact", media: data.media.contact, title: copy.gallery.items.contact.title, caption: copy.gallery.items.contact.caption },
          ]}
          mobile={[{ key: "mobileHome", media: data.media.mobileHome, title: copy.gallery.items.mobileHome.title, caption: copy.gallery.items.mobileHome.caption }]}
        />
      </CaseStudySection>

      {/* 15. The Result */}
      <CaseStudySection
        id="result"
        eyebrow={copy.result.eyebrow}
        heading={
          <>
            {copy.result.headingLine1}
            <br />
            {copy.result.headingLine2}
          </>
        }
        body={<p>{copy.result.body}</p>}
        align="center"
        glow="blue"
      />

      <CaseStudyFinalCta data={data} copy={copy} />

      <FinalCtaSection
        eyebrow={copy.finalCta.eyebrow}
        heading={copy.finalCta.heading}
        description={copy.finalCta.description}
        secondaryLabel={common.actions.viewWork}
        secondaryHref="/work"
        primaryTestId="button-case-study-cta-start"
        secondaryTestId="button-case-study-cta-work"
      />
    </>
  );
};
