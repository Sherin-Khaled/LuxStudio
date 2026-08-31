import { useEffect } from "react";

export type JSONLDSchema = Record<string, unknown>;

function upsertJSONLD(id: string, schema: JSONLDSchema | undefined) {
  const existing = document.head.querySelector<HTMLScriptElement>(`script[data-schema-id="${id}"]`);
  if (!schema) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement("script");
  el.setAttribute("type", "application/ld+json");
  el.setAttribute("data-schema-id", id);
  el.textContent = JSON.stringify(schema);
  if (!existing) document.head.appendChild(el);
}

/**
 * Injects one `<script type="application/ld+json">` block into
 * `document.head`, keyed by `id` so multiple schema objects (Organization,
 * BreadcrumbList, CreativeWork, ...) can coexist on one page without
 * overwriting each other — same find-or-create-by-key shape as
 * `useSEO.ts`'s `upsertMeta`/`upsertCanonical`.
 *
 * `schema` is expected to already be `undefined` when it isn't safe to
 * publish (see `lib/seo/schema.ts` — every builder there returns
 * `undefined` until `SITE_URL` is set, since Organization/WebSite/
 * BreadcrumbList/CreativeWork all need at least one absolute URL to be
 * schema.org-valid). Passing `undefined` here removes any previously
 * injected block for this `id` rather than leaving stale/fake data behind.
 */
export function useJSONLD(id: string, schema: JSONLDSchema | undefined) {
  useEffect(() => {
    upsertJSONLD(id, schema);
  }, [id, schema]);
}
