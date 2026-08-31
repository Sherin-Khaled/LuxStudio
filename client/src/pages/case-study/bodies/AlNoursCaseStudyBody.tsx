import { useTheme } from "@/contexts/ThemeContext";
import { CaseStudyHero } from "@/pages/case-study/CaseStudyHero";
import { CaseStudySection, CaseStudySplitSection } from "@/pages/case-study/CaseStudySection";
import { CaseStudyChipList, CaseStudyStepFlow } from "@/pages/case-study/CaseStudyPrimitives";
import { SystemsConvergenceDiagram } from "@/pages/case-study/CaseStudyDiagrams";
import { CaseStudyMediaSlot, CaseStudyGallery } from "@/pages/case-study/CaseStudyGallery";
import { CaseStudyFinalCta } from "@/pages/case-study/CaseStudyFinalCta";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { AlNoursCopy } from "@/lib/i18n/caseStudies/alNours";

/**
 * Small labeled chip row — reused across the backend/Odoo/payments sections
 * for short supporting lists (protocol endpoints, Odoo intelligence,
 * session-security capabilities) that don't warrant their own component,
 * matching the `tokensLabel`/`elementsLabel` label-then-chips pattern
 * already used by X Dental's and Houd El Nile's design-system sections.
 */
const LabeledChips = ({ label, items, tone = "neutral" }: { label: string; items: string[]; tone?: "neutral" | "accent" }): JSX.Element => (
  <div>
    <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{label}</p>
    <CaseStudyChipList items={items} tone={tone} />
  </div>
);

/**
 * Al Nours' own section sequence — a "simple surface, connected
 * underneath" story: a calm bilingual storefront on top, a real backend and
 * Odoo integration underneath, shaped nothing like X Dental's commerce-scale
 * story or Houd El Nile's repositioning/export story (see their own Body
 * files). Reuses the exact same shared primitives (`CaseStudyHero`,
 * `CaseStudySection`, `CaseStudySplitSection`, chips, step flow, the systems
 * diagram, gallery, final CTA) — nothing here is a new visual system, only
 * new data/copy composed through the existing one.
 */
export const AlNoursCaseStudyBody = ({ data, copy }: { data: CaseStudyData; copy: AlNoursCopy }): JSX.Element => {
  const common = useDict(commonDict);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <>
      <CaseStudyHero data={data} copy={copy} />

      <CaseStudySection
        id="overview"
        eyebrow={copy.overview.eyebrow}
        heading={
          <>
            {copy.overview.headingLine1}
            <br />
            {copy.overview.headingLine2}
          </>
        }
        body={copy.overview.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      >
        <CaseStudyStepFlow steps={copy.overview.flow} />
      </CaseStudySection>

      <CaseStudySplitSection
        id="visual-direction"
        eyebrow={copy.visualDirection.eyebrow}
        heading={
          <>
            {copy.visualDirection.headingLine1}
            <br />
            {copy.visualDirection.headingLine2}
          </>
        }
        body={
          <>
            <p>{copy.visualDirection.body}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.visualDirection.glassNote}</p>
          </>
        }
        media={
          <CaseStudyMediaSlot
            media={data.media.home}
            title={copy.visualDirection.eyebrow}
            caption={copy.visualDirection.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
              {copy.visualDirection.tokensLabel}
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
          <LabeledChips label={copy.visualDirection.typographyLabel} items={copy.visualDirection.typography} />
          <LabeledChips label={copy.visualDirection.elementsLabel} items={copy.visualDirection.elements} />
          <LabeledChips label={copy.visualDirection.stackLabel} items={data.technicalStack} />
        </div>
      </CaseStudySplitSection>

      <CaseStudySplitSection
        id="mesh-motion"
        eyebrow={copy.meshMotion.eyebrow}
        heading={copy.meshMotion.heading}
        body={copy.meshMotion.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.productDetail}
            title={copy.meshMotion.eyebrow}
            caption={copy.meshMotion.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-6">
          <CaseStudyChipList items={copy.meshMotion.flavors} tone="accent" />
          <p className="text-[13.5px] italic opacity-70">{copy.meshMotion.note}</p>
        </div>
      </CaseStudySplitSection>

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
            <p>{copy.bilingual.body}</p>
          </>
        }
        align="center"
        glow="violet"
      >
        <div className="flex flex-col items-center gap-12">
          <CaseStudyChipList items={copy.bilingual.languages} tone="accent" />
          <CaseStudyStepFlow steps={copy.bilingual.flow} />
          <p className="max-w-[560px] text-center text-[13.5px] italic opacity-70">{copy.bilingual.note}</p>
        </div>
      </CaseStudySection>

      <CaseStudySection id="commerce-journey" eyebrow={copy.commerceJourney.eyebrow} heading={copy.commerceJourney.heading} body={copy.commerceJourney.body}>
        <CaseStudyStepFlow steps={copy.commerceJourney.steps} />
      </CaseStudySection>

      <CaseStudySplitSection
        id="checkout"
        eyebrow={copy.checkout.eyebrow}
        heading={copy.checkout.heading}
        body={copy.checkout.body}
        media={
          <CaseStudyMediaSlot
            media={data.media.cart}
            title={copy.checkout.eyebrow}
            caption={copy.checkout.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <CaseStudyStepFlow steps={copy.checkout.steps} />
          <LabeledChips label={copy.checkout.capabilitiesLabel} items={copy.checkout.capabilities} tone="accent" />
          <p className="text-[13.5px] italic opacity-80">{copy.checkout.caveat}</p>
        </div>
      </CaseStudySplitSection>

      <CaseStudySection
        id="challenge"
        eyebrow={copy.challenge.eyebrow}
        heading={copy.challenge.heading}
        body={copy.challenge.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        align="center"
        glow="blue"
      >
        <CaseStudyStepFlow steps={copy.challenge.flow} />
      </CaseStudySection>

      <CaseStudySection id="odoo-integration" eyebrow={copy.odooIntegration.eyebrow} heading={copy.odooIntegration.heading} body={copy.odooIntegration.body}>
        <LabeledChips label={copy.odooIntegration.protocolLabel} items={copy.odooIntegration.protocol} tone="accent" />
      </CaseStudySection>

      <CaseStudySection id="odoo-flow" eyebrow={copy.odooFlow.eyebrow} heading={copy.odooFlow.heading} body={copy.odooFlow.body}>
        <div className="flex flex-col gap-10">
          <CaseStudyStepFlow steps={copy.odooFlow.steps} />
          <LabeledChips label={copy.odooFlow.intelligenceLabel} items={copy.odooFlow.intelligence} />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="hard-problem"
        eyebrow={copy.hardProblem.eyebrow}
        heading={
          <>
            {copy.hardProblem.headingLine1}
            <br />
            {copy.hardProblem.headingLine2}
          </>
        }
        body={copy.hardProblem.body}
        align="center"
      />

      <CaseStudySection id="reliability" eyebrow={copy.reliability.eyebrow} heading={copy.reliability.heading} body={copy.reliability.body}>
        <div className="flex flex-col gap-8">
          <CaseStudyStepFlow steps={copy.reliability.flow} />
          <p className="text-[13.5px] italic opacity-80">{copy.reliability.caveat}</p>
          <div
            className={`rounded-2xl border p-6 ${isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.7)]" : "border-[#ffffff10] bg-[#ffffff04]"}`}
          >
            <p className="mb-2 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
              {copy.reliability.duplicateProtectionLabel}
            </p>
            <p className="[font-family:'Inter',Helvetica] text-[14px] leading-[23px] opacity-80">{copy.reliability.duplicateProtection}</p>
          </div>
        </div>
      </CaseStudySection>

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
        body={copy.systems.body}
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

      <CaseStudySection id="backend" eyebrow={copy.backend.eyebrow} heading={copy.backend.heading} body={copy.backend.body}>
        <div className="flex flex-col gap-10">
          <CaseStudyStepFlow steps={copy.backend.flow} />
          <LabeledChips label={copy.backend.capabilitiesLabel} items={copy.backend.capabilities} />
          <LabeledChips label={copy.backend.authLabel} items={copy.backend.auth} />
        </div>
      </CaseStudySection>

      <CaseStudySection id="promotions" eyebrow={copy.promotions.eyebrow} heading={copy.promotions.heading} body={copy.promotions.body}>
        <CaseStudyChipList items={copy.promotions.codes} tone="accent" />
      </CaseStudySection>

      <CaseStudySection
        id="payments"
        eyebrow={copy.payments.eyebrow}
        heading={copy.payments.heading}
        body={
          <>
            <p>{copy.payments.body}</p>
            <p>{copy.payments.reliability}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.payments.caveat}</p>
          </>
        }
        glow="cyan"
      >
        <CaseStudyChipList items={copy.payments.capabilities} tone="accent" />
      </CaseStudySection>

      <CaseStudySection id="security" eyebrow={copy.security.eyebrow} heading={copy.security.heading} body={copy.security.body}>
        <CaseStudyChipList items={copy.security.items} />
      </CaseStudySection>

      <CaseStudySection
        id="performance"
        eyebrow={copy.performance.eyebrow}
        heading={copy.performance.heading}
        body={
          <>
            <p>{copy.performance.body}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.performance.caveat}</p>
          </>
        }
      />

      <CaseStudySection
        id="responsive"
        eyebrow={copy.responsive.eyebrow}
        heading={
          <>
            {copy.responsive.headingLine1}
            <br />
            {copy.responsive.headingLine2}
          </>
        }
        body={copy.responsive.body}
      >
        <div className="grid grid-cols-2 gap-6 sm:max-w-[440px]">
          <CaseStudyMediaSlot
            media={data.media.tablet}
            title={copy.responsive.devices.tablet}
            caption={copy.responsive.devices.tablet}
            aspect="1100 / 1051"
            pendingLabel={copy.common.pendingScreen}
          />
          <CaseStudyMediaSlot
            media={data.media.mobile}
            title={copy.responsive.devices.mobile}
            caption={copy.responsive.devices.mobile}
            aspect="700 / 1165"
            pendingLabel={copy.common.pendingScreen}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="seo"
        eyebrow={copy.seo.eyebrow}
        heading={copy.seo.heading}
        body={
          <>
            <p>{copy.seo.body}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.seo.caveat}</p>
          </>
        }
      />

      <CaseStudySection id="gallery" eyebrow={copy.gallery.eyebrow} heading={copy.gallery.heading}>
        <CaseStudyGallery
          pendingLabel={copy.common.pendingScreen}
          large={{ key: "home", media: data.media.home, title: copy.gallery.items.home.title, caption: copy.gallery.items.home.caption }}
          pair={[
            { key: "products", media: data.media.products, title: copy.gallery.items.products.title, caption: copy.gallery.items.products.caption },
            {
              key: "productDetail",
              media: data.media.productDetail,
              title: copy.gallery.items.productDetail.title,
              caption: copy.gallery.items.productDetail.caption,
            },
          ]}
          wide={{ key: "cart", media: data.media.cart, title: copy.gallery.items.cart.title, caption: copy.gallery.items.cart.caption }}
          supporting={[{ key: "about", media: data.media.about, title: copy.gallery.items.about.title, caption: copy.gallery.items.about.caption }]}
          mobile={[{ key: "mobile", media: data.media.mobile, title: copy.gallery.items.mobile.title, caption: copy.gallery.items.mobile.caption }]}
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
