import { SITE_URL } from "./config";
import type { JSONLDSchema } from "./useJSONLD";

/**
 * JSON-LD builders for Phase 2 structured data. Every function here returns
 * `undefined` — emit nothing — until `SITE_URL` is set (see `config.ts`):
 * Organization/WebSite/BreadcrumbList/CreativeWork all require at least one
 * absolute URL (`url`, `@id`, or a breadcrumb item URL) to be valid
 * schema.org markup, and Lux Studio's production domain isn't confirmed
 * yet. This mirrors `useSEO.ts`'s existing `SITE_URL && path !== undefined`
 * canonical gate exactly — no placeholder/fake URL is ever emitted.
 */

export function buildOrganizationSchema(): JSONLDSchema | undefined {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Lux Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
  };
}

export function buildWebSiteSchema(): JSONLDSchema | undefined {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Lux Studio",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export interface BreadcrumbSegment {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(segments: BreadcrumbSegment[]): JSONLDSchema | undefined {
  if (!SITE_URL || segments.length === 0) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment.name,
      item: `${SITE_URL}${segment.path === "/" ? "/" : segment.path}`,
    })),
  };
}

export interface CreativeWorkInput {
  slug: string;
  name: string;
  description: string;
}

export function buildCreativeWorkSchema(input: CreativeWorkInput): JSONLDSchema | undefined {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}/work/${input.slug}`,
    creator: { "@id": `${SITE_URL}/#organization` },
  };
}
