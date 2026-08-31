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
import type { HoudElNileCopy } from "@/lib/i18n/caseStudies/houdElNile";

/**
 * Real certification marks shown on the live Houd El Nile site (verified
 * against `public/certifications/` in the Houd El Nile codebase) — a fixed
 * list of proper nouns, not localized copy, so it lives here rather than in
 * the i18n dict (matching how `technicalStack`/`designTokens` proper nouns
 * live in `houdElNile.data.ts` rather than the copy file).
 */
const CERTIFICATIONS = [
  { name: "GlobalG.A.P.", src: "/case-studies/houd-el-nile/certifications/globalgap.webp" },
  { name: "GRASP", src: "/case-studies/houd-el-nile/certifications/grasp.webp" },
  { name: "BRC", src: "/case-studies/houd-el-nile/certifications/brc.webp" },
  { name: "HACCP", src: "/case-studies/houd-el-nile/certifications/haccp.webp" },
  { name: "ISO 22000", src: "/case-studies/houd-el-nile/certifications/iso22000.webp" },
  { name: "SEDEX", src: "/case-studies/houd-el-nile/certifications/sedex.webp" },
  { name: "SMETA", src: "/case-studies/houd-el-nile/certifications/smeta.webp" },
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

/**
 * Houd El Nile's own section sequence — a repositioning/international-buyer/
 * multilingual story, deliberately shaped nothing like X Dental's commerce-
 * scale one (see `XDentalCaseStudyBody.tsx`). Reuses the exact same shared
 * primitives (`CaseStudyHero`, `CaseStudySection`, `CaseStudySplitSection`,
 * chips, step flow, gallery, final CTA) — nothing here is a new visual
 * system, only new data/copy composed through the existing one.
 */
export const HoudElNileCaseStudyBody = ({ data, copy }: { data: CaseStudyData; copy: HoudElNileCopy }): JSX.Element => {
  const common = useDict(commonDict);

  return (
    <>
      <CaseStudyHero data={data} copy={copy} />

      <CaseStudySplitSection
        id="repositioning"
        eyebrow={copy.repositioning.eyebrow}
        heading={
          <>
            {copy.repositioning.headingLine1}
            <br />
            {copy.repositioning.headingLine2}
          </>
        }
        body={copy.repositioning.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        media={
          <CaseStudyMediaSlot
            media={data.media.legacyBefore}
            title={copy.repositioning.eyebrow}
            caption={copy.repositioning.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      />

      <CaseStudySplitSection
        id="buyer-experience"
        eyebrow={copy.buyerExperience.eyebrow}
        heading={copy.buyerExperience.heading}
        body={copy.buyerExperience.body}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.products}
            title={copy.buyerExperience.eyebrow}
            caption={copy.buyerExperience.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <CaseStudyChipList items={copy.buyerExperience.capabilities} tone="accent" />
      </CaseStudySplitSection>

      <CaseStudySplitSection
        id="product-architecture"
        eyebrow={copy.productArchitecture.eyebrow}
        heading={copy.productArchitecture.heading}
        body={copy.productArchitecture.body}
        media={
          <CaseStudyMediaSlot
            media={data.media.productDetail}
            title={copy.productArchitecture.eyebrow}
            caption={copy.productArchitecture.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <CaseStudyStepFlow steps={copy.productArchitecture.steps} />
      </CaseStudySplitSection>

      <CaseStudySection
        id="multilingual"
        eyebrow={copy.multilingual.eyebrow}
        heading={
          <>
            {copy.multilingual.headingLine1}
            <br />
            {copy.multilingual.headingLine2}
          </>
        }
        body={
          <>
            <p>{copy.multilingual.intro}</p>
            <p>{copy.multilingual.body}</p>
          </>
        }
        align="center"
        glow="violet"
      >
        <div className="flex flex-col items-center gap-12">
          <CaseStudyChipList items={copy.multilingual.languages} tone="accent" />
          <CaseStudyStepFlow steps={copy.multilingual.flow} />
          <p className="max-w-[560px] text-center text-[13.5px] italic opacity-70">{copy.multilingual.note}</p>
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

      <CaseStudySplitSection
        id="trust"
        eyebrow={copy.trust.eyebrow}
        heading={copy.trust.heading}
        body={copy.trust.body}
        mediaSide="start"
        media={
          <CaseStudyMediaSlot
            media={data.media.qualityProcess}
            title={copy.trust.eyebrow}
            caption={copy.trust.mediaCaption}
            aspect="16 / 10"
            pendingLabel={copy.common.pendingScreen}
          />
        }
      >
        <div className="flex flex-col gap-8">
          <CertificationStrip label={copy.trust.certificationsLabel} />
          <CaseStudyChipList items={copy.trust.capabilities} />
          <p className="text-[13.5px] italic opacity-70">{copy.trust.caveat}</p>
        </div>
      </CaseStudySplitSection>

      <CaseStudySection id="conversion" eyebrow={copy.conversion.eyebrow} heading={copy.conversion.heading} body={copy.conversion.body}>
        <CaseStudyStepFlow steps={copy.conversion.steps} />
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
          <div>
            <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.2px] uppercase opacity-60">
              {copy.designSystemSection.stackLabel}
            </p>
            <CaseStudyChipList items={data.technicalStack} />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="motion" eyebrow={copy.motion.eyebrow} heading={copy.motion.heading} body={copy.motion.body} />

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
      />

      <CaseStudySection id="seo" eyebrow={copy.seo.eyebrow} heading={copy.seo.heading} body={copy.seo.body} />

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
          wide={{
            key: "exportServices",
            media: data.media.exportServices,
            title: copy.gallery.items.exportServices.title,
            caption: copy.gallery.items.exportServices.caption,
          }}
          supporting={[
            {
              key: "qualityProcess",
              media: data.media.qualityProcess,
              title: copy.gallery.items.qualityProcess.title,
              caption: copy.gallery.items.qualityProcess.caption,
            },
            { key: "about", media: data.media.about, title: copy.gallery.items.about.title, caption: copy.gallery.items.about.caption },
            { key: "contact", media: data.media.contact, title: copy.gallery.items.contact.title, caption: copy.gallery.items.contact.caption },
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
