import { CaseStudyHero } from "@/pages/case-study/CaseStudyHero";
import { CaseStudySection, CaseStudySplitSection } from "@/pages/case-study/CaseStudySection";
import { CaseStudyChipList, CaseStudyStepFlow } from "@/pages/case-study/CaseStudyPrimitives";
import {
  ChallengeNodes,
  PersonalizationDiagram,
  ArchitectureMap,
  ScaleSequence,
  TierCompare,
  RoleCards,
} from "@/pages/case-study/CaseStudyDiagrams";
import { CaseStudyMediaSlot, CaseStudyGallery } from "@/pages/case-study/CaseStudyGallery";
import { CaseStudyFinalCta } from "@/pages/case-study/CaseStudyFinalCta";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { CaseStudyCopy } from "@/lib/i18n/caseStudies/xDental";

/**
 * X Dental's full section sequence — moved as-is out of the old, single
 * hardcoded `CaseStudyPage.tsx` (see `CaseStudyPage.tsx` for why: adding
 * Houd El Nile's very different story meant the page needed to render a
 * *different* section sequence per project, not just different copy inside
 * the same fixed sequence). Nothing in this file changed in the move —
 * same components, same order, same props.
 */
export const XDentalCaseStudyBody = ({ data, copy }: { data: CaseStudyData; copy: CaseStudyCopy }): JSX.Element => {
  const common = useDict(commonDict);

  return (
    <>
      <CaseStudyHero data={data} copy={copy} />

      <CaseStudySection
        id="overview"
        eyebrow={copy.overview.eyebrow}
        heading={copy.overview.heading}
        body={copy.overview.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      />

      <CaseStudySection
        id="challenge"
        eyebrow={copy.challenge.eyebrow}
        heading={copy.challenge.heading}
        body={copy.challenge.body}
        glow="blue"
      >
        <ChallengeNodes nodes={data.systemNodes ?? []} labels={copy.challenge.nodes} />
      </CaseStudySection>

      <CaseStudySplitSection
        id="discovery"
        eyebrow={copy.discovery.eyebrow}
        heading={copy.discovery.heading}
        body={copy.discovery.intro}
        media={
          <CaseStudyMediaSlot
            media={data.media.discovery}
            title={copy.discovery.eyebrow}
            caption={copy.discovery.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <CaseStudyChipList items={copy.discovery.capabilities} tone="accent" />
      </CaseStudySplitSection>

      <CaseStudySection eyebrow={copy.personalization.eyebrow} heading={copy.personalization.heading} align="center" glow="violet">
        <div className="mx-auto max-w-[560px]">
          <PersonalizationDiagram copy={copy.personalization.diagram} />
        </div>
      </CaseStudySection>

      <CaseStudySplitSection
        id="clinic-essentials"
        eyebrow={copy.clinicEssentials.eyebrow}
        heading={copy.clinicEssentials.heading}
        body={copy.clinicEssentials.body}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.clinicLocations}
            title={copy.clinicEssentials.eyebrow}
            caption={copy.clinicEssentials.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <p className="[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[1.3]">
          {copy.clinicEssentials.goalLine1}
          <br />
          {copy.clinicEssentials.goalLine2}
        </p>
      </CaseStudySplitSection>

      <CaseStudySection
        id="delivery"
        eyebrow={copy.delivery.eyebrow}
        heading={
          <>
            {copy.delivery.headingLine1}
            <br />
            {copy.delivery.headingLine2}
            <br />
            {copy.delivery.headingLine3}
          </>
        }
        body={copy.delivery.body}
        glow="cyan"
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {copy.delivery.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 [font-family:'Inter',Helvetica] text-[14px] leading-[22px] text-current opacity-80"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        id="design-system"
        eyebrow={copy.designSystemSection.eyebrow}
        heading={copy.designSystemSection.heading}
        body={
          <>
            <p>{copy.designSystemSection.body}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.designSystemSection.caveat}</p>
          </>
        }
      >
        <div className="flex flex-col gap-10">
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
              {copy.designSystemSection.tokensLabel}
            </p>
            <div className="flex flex-wrap gap-4">
              {data.designTokens.map((token) => (
                <div key={token.name} className="flex items-center gap-2.5">
                  <span
                    className="h-9 w-9 shrink-0 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: token.hex }}
                    aria-hidden="true"
                  />
                  <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] uppercase opacity-70">{token.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
              {copy.designSystemSection.elementsLabel}
            </p>
            <CaseStudyChipList items={copy.designSystemSection.elements} />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={copy.scaleSection.eyebrow} heading={copy.scaleSection.heading} align="center">
        <ScaleSequence metrics={data.metrics} labels={copy.hero.metricLabels} />
      </CaseStudySection>

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
        body={copy.architecture.body}
        align="center"
        glow="blue"
      >
        <div className="mx-auto max-w-[640px]">
          <ArchitectureMap copy={copy.architecture.nodes} />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
            {copy.architecture.stackLabel}
          </p>
          <CaseStudyChipList items={data.technicalStack} />
        </div>
      </CaseStudySection>

      <CaseStudySection id="reliability" eyebrow={copy.reliability.eyebrow} heading={copy.reliability.heading} body={copy.reliability.body}>
        <CaseStudyChipList items={copy.reliability.capabilities} tone="accent" />
      </CaseStudySection>

      <CaseStudySplitSection
        id="vip"
        eyebrow={copy.vip.eyebrow}
        heading={
          <>
            {copy.vip.headingLine1}
            <br />
            {copy.vip.headingLine2}
          </>
        }
        body={copy.vip.body}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.walletLoyalty}
            title={copy.vip.eyebrow}
            caption={copy.vip.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <TierCompare standard={copy.vip.standard} vip={copy.vip.vipTier} />
      </CaseStudySplitSection>

      <CaseStudySection id="admin" eyebrow={copy.admin.eyebrow} heading={copy.admin.heading} body={copy.admin.body} glow="violet">
        <div className="flex flex-col gap-10">
          <RoleCards
            roles={[
              { key: "admin", ...copy.admin.roles.admin },
              { key: "support", ...copy.admin.roles.support },
              { key: "customer", ...copy.admin.roles.customer },
            ]}
          />
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.admin.areasLabel}</p>
            <CaseStudyChipList items={copy.admin.areas} />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="catalog-import" eyebrow={copy.catalogImport.eyebrow} heading={copy.catalogImport.heading} body={copy.catalogImport.body}>
        <CaseStudyStepFlow steps={copy.catalogImport.steps} />
      </CaseStudySection>

      <CaseStudySection id="media-pipeline" eyebrow={copy.mediaPipeline.eyebrow} heading={copy.mediaPipeline.heading} body={copy.mediaPipeline.body}>
        <CaseStudyStepFlow steps={copy.mediaPipeline.steps} />
      </CaseStudySection>

      <CaseStudySection id="responsive" eyebrow={copy.responsive.eyebrow} heading={copy.responsive.heading} body={copy.responsive.body} />

      <CaseStudySection id="gallery" eyebrow={copy.gallery.eyebrow} heading={copy.gallery.heading}>
        <CaseStudyGallery
          pendingLabel={copy.common.pendingScreen}
          large={{ key: "home", media: data.media.home, title: copy.gallery.items.home.title, caption: copy.gallery.items.home.caption }}
          pair={[
            { key: "discovery", media: data.media.discovery, title: copy.gallery.items.discovery.title, caption: copy.gallery.items.discovery.caption },
            { key: "productDetail", media: data.media.productDetail, title: copy.gallery.items.productDetail.title, caption: copy.gallery.items.productDetail.caption },
          ]}
          wide={{ key: "checkout", media: data.media.checkout, title: copy.gallery.items.checkout.title, caption: copy.gallery.items.checkout.caption }}
          supporting={[
            { key: "cart", media: data.media.cart, title: copy.gallery.items.cart.title, caption: copy.gallery.items.cart.caption },
            { key: "account", media: data.media.account, title: copy.gallery.items.account.title, caption: copy.gallery.items.account.caption },
            { key: "clinicLocations", media: data.media.clinicLocations, title: copy.gallery.items.clinicLocations.title, caption: copy.gallery.items.clinicLocations.caption },
            { key: "quotes", media: data.media.quotes, title: copy.gallery.items.quotes.title, caption: copy.gallery.items.quotes.caption },
            { key: "walletLoyalty", media: data.media.walletLoyalty, title: copy.gallery.items.walletLoyalty.title, caption: copy.gallery.items.walletLoyalty.caption },
            { key: "support", media: data.media.support, title: copy.gallery.items.support.title, caption: copy.gallery.items.support.caption },
            { key: "admin", title: copy.gallery.items.admin.title, caption: copy.gallery.items.admin.caption },
          ]}
          mobile={[{ key: "mobile", title: copy.gallery.items.mobile.title, caption: copy.gallery.items.mobile.caption }]}
        />
      </CaseStudySection>

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
        body={copy.result.body}
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
