import { useTheme } from "@/contexts/ThemeContext";
import { CaseStudyHero } from "@/pages/case-study/CaseStudyHero";
import { CaseStudySection, CaseStudySplitSection } from "@/pages/case-study/CaseStudySection";
import { CaseStudyChipList, CaseStudyStepFlow } from "@/pages/case-study/CaseStudyPrimitives";
import { SystemsConvergenceDiagram, ScaleSequence } from "@/pages/case-study/CaseStudyDiagrams";
import { CaseStudyMediaSlot, CaseStudyGallery } from "@/pages/case-study/CaseStudyGallery";
import { CaseStudyFinalCta } from "@/pages/case-study/CaseStudyFinalCta";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { ProcessScrollDemo } from "@/pages/case-study/bodies/al-baraka/ProcessScrollDemo";
import { CartVsConversation } from "@/pages/case-study/bodies/al-baraka/CartVsConversation";
import { BilingualFlip } from "@/pages/case-study/bodies/al-baraka/BilingualFlip";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";
import type { CaseStudyData } from "@/lib/caseStudies/types";
import type { AlBarakaCopy } from "@/lib/i18n/caseStudies/alBaraka";

/**
 * Real certification marks copied from the live Al Baraka site's own
 * `Home/certification-section/` assets (verified against `productData.ts`'s
 * `certifications` array in the source codebase) — a fixed list of proper
 * nouns, not localized copy, so it lives here rather than in the i18n dict,
 * matching how Houd El Nile's own certification strip is built.
 */
const CERTIFICATIONS = [
  { name: "Halal", src: "/case-studies/al-baraka/certifications/halal.webp" },
  { name: "HACCP", src: "/case-studies/al-baraka/certifications/haccp.webp" },
  { name: "ISO 22000", src: "/case-studies/al-baraka/certifications/iso22000.webp" },
  { name: "Organic", src: "/case-studies/al-baraka/certifications/organic.webp" },
  { name: "EU Standards", src: "/case-studies/al-baraka/certifications/eu.webp" },
  { name: "FDA", src: "/case-studies/al-baraka/certifications/fda.webp" },
];

const CertificationStrip = ({ label }: { label: string }): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div>
      <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{label}</p>
      <div className="flex flex-wrap gap-3">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.name}
            className={`flex h-14 items-center rounded-xl border px-4 ${
              isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.7)]" : "border-[#ffffff10] bg-[#ffffff04]"
            }`}
          >
            <img src={cert.src} alt={cert.name} loading="lazy" decoding="async" className="h-8 w-auto max-w-[92px] object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

const LabeledChips = ({ label, items, tone = "neutral" }: { label: string; items: string[]; tone?: "neutral" | "accent" }): JSX.Element => (
  <div>
    <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{label}</p>
    <CaseStudyChipList items={items} tone={tone} />
  </div>
);

/**
 * Al Baraka's own section sequence — "a product catalog reshaped around a
 * conversation" story: no backend, no accounts, no checkout, and no massive
 * catalog to navigate. Its signature pieces are a persistent multi-product
 * inquiry list that ends in a WhatsApp message instead of a purchase, a
 * scroll-driven production timeline (recreated in `ProcessScrollDemo`), and
 * a genuinely bilingual EN/AR + RTL architecture (demonstrated in
 * `BilingualFlip`) — shaped nothing like X Dental's commerce-scale story,
 * Houd El Nile's repositioning story, or Al Nours' connected-systems story
 * (see their own Body files). Reuses the same shared primitives everywhere
 * a shared primitive fits; the three components imported above are the only
 * new, project-specific visuals this case study introduces.
 */
export const AlBarakaCaseStudyBody = ({ data, copy }: { data: CaseStudyData; copy: AlBarakaCopy }): JSX.Element => {
  const common = useDict(commonDict);

  const processStages = copy.process.steps.map((step, i) => ({
    ...step,
    image: [data.media.galleryOrchard, data.media.galleryWashing, data.media.packaging, data.media.galleryShipping][i]?.src ?? "",
  }));

  return (
    <>
      <CaseStudyHero data={data} copy={copy} />

      {/* 1. Project At A Glance — a big-number scale sequence instead of a
          table, matching how X Dental/Al Nours already use ScaleSequence for
          a visual metrics moment. */}
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

      {/* 2. The Challenge */}
      <CaseStudySection
        id="challenge"
        eyebrow={copy.challenge.eyebrow}
        heading={copy.challenge.heading}
        body={copy.challenge.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      />

      {/* 3. Rethinking The Journey */}
      <CaseStudySection id="journey" eyebrow={copy.journey.eyebrow} heading={copy.journey.heading} body={copy.journey.body} align="center" glow="violet">
        <CaseStudyStepFlow steps={copy.journey.steps} />
      </CaseStudySection>

      {/* 4. One Experience. Multiple Systems. */}
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

      {/* 5. The Inquiry System */}
      <CaseStudySplitSection
        id="inquiry-system"
        eyebrow={copy.inquirySystem.eyebrow}
        heading={
          <>
            {copy.inquirySystem.headingLine1}
            <br />
            {copy.inquirySystem.headingLine2}
          </>
        }
        body={copy.inquirySystem.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        media={
          <CaseStudyMediaSlot
            media={data.media.catalog}
            title={copy.inquirySystem.eyebrow}
            caption={copy.inquirySystem.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.inquirySystem.stepsLabel}</p>
            <CaseStudyStepFlow steps={copy.inquirySystem.steps} />
          </div>
          <LabeledChips label={copy.inquirySystem.capabilitiesLabel} items={copy.inquirySystem.capabilities} tone="accent" />
          <p className="text-[13.5px] italic opacity-80">{copy.inquirySystem.caveat}</p>
        </div>
      </CaseStudySplitSection>

      {/* 6. A Cart With Nothing To Buy */}
      <CaseStudySection
        id="cart-vs-conversation"
        eyebrow={copy.cartVsConversation.eyebrow}
        heading={
          <>
            {copy.cartVsConversation.headingLine1}
            <br />
            {copy.cartVsConversation.headingLine2}
          </>
        }
        body={<p>{copy.cartVsConversation.body}</p>}
        align="center"
      >
        <div className="mx-auto max-w-[820px]">
          <CartVsConversation traditional={copy.cartVsConversation.traditional} albaraka={copy.cartVsConversation.albaraka} />
        </div>
      </CaseStudySection>

      {/* 7. The Process, Made To Scroll */}
      <CaseStudySection
        id="process"
        eyebrow={copy.process.eyebrow}
        heading={
          <>
            {copy.process.headingLine1}
            <br />
            {copy.process.headingLine2}
          </>
        }
        body={
          <>
            <p>{copy.process.body}</p>
            <p className="[font-family:'EB_Garamond',Helvetica] text-[17px] italic opacity-90">{copy.process.note}</p>
          </>
        }
      >
        <ProcessScrollDemo stages={processStages} stepLabel={copy.process.stepLabel} caveat={copy.process.caveat} />
      </CaseStudySection>

      {/* 8. Bilingual By Architecture */}
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
          <div className="w-full max-w-[420px]">
            <BilingualFlip />
          </div>
          <p className="max-w-[600px] text-center text-[13.5px] italic opacity-70">{copy.bilingual.note}</p>
        </div>
      </CaseStudySection>

      {/* 9. Catalog & Packaging Architecture */}
      <CaseStudySplitSection
        id="catalog-architecture"
        eyebrow={copy.catalogArchitecture.eyebrow}
        heading={copy.catalogArchitecture.heading}
        body={<p>{copy.catalogArchitecture.body}</p>}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.packaging}
            title={copy.catalogArchitecture.eyebrow}
            caption={copy.catalogArchitecture.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <LabeledChips label={copy.catalogArchitecture.familiesLabel} items={copy.catalogArchitecture.families} tone="accent" />
          <LabeledChips label={copy.catalogArchitecture.packagingLabel} items={copy.catalogArchitecture.packaging} />
        </div>
      </CaseStudySplitSection>

      {/* 10. Visual Direction — deliberately not titled "Design System"; see
          copy.visualDirection.caveat. */}
      <CaseStudySplitSection
        id="visual-direction"
        eyebrow={copy.visualDirection.eyebrow}
        heading={copy.visualDirection.heading}
        body={
          <>
            <p>{copy.visualDirection.body}</p>
            <p className="text-[13.5px] italic opacity-80">{copy.visualDirection.caveat}</p>
          </>
        }
        media={
          <CaseStudyMediaSlot
            media={data.media.about}
            title={copy.visualDirection.eyebrow}
            caption={copy.visualDirection.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">{copy.visualDirection.tokensLabel}</p>
            <div className="flex flex-wrap gap-4">
              {data.designTokens.map((token) => (
                <div key={token.name} className="flex items-center gap-2.5">
                  <span className="h-9 w-9 shrink-0 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: token.hex }} aria-hidden="true" />
                  <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] uppercase opacity-70">{token.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <LabeledChips label={copy.visualDirection.typographyLabel} items={copy.visualDirection.typography} />
          <LabeledChips label={copy.visualDirection.elementsLabel} items={copy.visualDirection.elements} tone="accent" />
          <LabeledChips label={copy.visualDirection.stackLabel} items={data.technicalStack} />
        </div>
      </CaseStudySplitSection>

      {/* 11. Trust For An Export Audience */}
      <CaseStudySplitSection
        id="trust"
        eyebrow={copy.trust.eyebrow}
        heading={copy.trust.heading}
        body={<p>{copy.trust.body}</p>}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.exportLogistics}
            title={copy.trust.eyebrow}
            caption={copy.trust.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <CertificationStrip label={copy.trust.certificationsLabel} />
          <LabeledChips label={copy.trust.infoLabel} items={copy.trust.info} tone="accent" />
          <p className="text-[13.5px] italic opacity-70">{copy.trust.caveat}</p>
        </div>
      </CaseStudySplitSection>

      {/* 12. Key Screens & Media */}
      <CaseStudySection id="gallery" eyebrow={copy.gallery.eyebrow} heading={copy.gallery.heading}>
        <CaseStudyGallery
          pendingLabel={copy.common.pendingScreen}
          large={{ key: "bottling", media: data.media.galleryBottling, title: copy.gallery.items.bottling.title, caption: copy.gallery.items.bottling.caption }}
          pair={[
            { key: "washing", media: data.media.galleryWashing, title: copy.gallery.items.washing.title, caption: copy.gallery.items.washing.caption },
            { key: "press", media: data.media.galleryPress, title: copy.gallery.items.press.title, caption: copy.gallery.items.press.caption },
          ]}
          wide={{ key: "shipping", media: data.media.galleryShipping, title: copy.gallery.items.shipping.title, caption: copy.gallery.items.shipping.caption }}
          supporting={[{ key: "orchard", media: data.media.galleryOrchard, title: copy.gallery.items.orchard.title, caption: copy.gallery.items.orchard.caption }]}
          mobile={[{ key: "mobile", media: data.media.galleryMobile, title: copy.gallery.items.mobile.title, caption: copy.gallery.items.mobile.caption }]}
        />
      </CaseStudySection>

      {/* 13. The Result */}
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
