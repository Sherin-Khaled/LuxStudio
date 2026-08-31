/**
 * Single source of truth for every publicly-routable path in the app —
 * used by the server (to decide 200 vs. real 404 status on direct/hard-
 * refresh requests, see `server/static.ts` / `server/vite.ts`) and by the
 * sitemap generator (`script/generate-sitemap.ts`). Keep this in sync with
 * the routes registered in `client/src/App.tsx` and the case study slugs in
 * `client/src/lib/caseStudies/registry.ts`.
 *
 * `/dashboard` is intentionally included here — it's a real, working route
 * (200, not a 404) that just isn't meant to be *indexed* (see its
 * `noindex, nofollow` robots meta in `client/src/lib/seo/pageMeta.ts`).
 * "Publicly routable" and "publicly indexable" are different questions;
 * `PUBLIC_INDEXABLE_ROUTES` below answers the second one, for the sitemap.
 */

/** Every static (non-dynamic) route the SPA renders with a real page, dashboard included. */
export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/work",
  "/services",
  "/process",
  "/about",
  "/contact",
  "/dashboard",
] as const;

/** The one route that's publicly reachable (200) but deliberately not indexable. */
export const DASHBOARD_ROUTE = "/dashboard";

/** Slugs registered in `client/src/lib/caseStudies/registry.ts` — the only valid `/work/:slug` values. */
export const CASE_STUDY_SLUGS = [
  "x-dental",
  "houd-el-nile",
  "al-nours",
  "al-baraka",
  "abdalwahb",
] as const;

/** Routes that belong in sitemap.xml — everything routable minus /dashboard (noindex, not public marketing). */
export const PUBLIC_INDEXABLE_ROUTES = [
  ...PUBLIC_STATIC_ROUTES.filter((route) => route !== "/dashboard"),
  ...CASE_STUDY_SLUGS.map((slug) => `/work/${slug}`),
];

/**
 * True if `pathname` (already stripped of query/hash, trailing slash
 * normalized) is a real, registered route — i.e. should get HTTP 200.
 * Everything else (typos, removed pages, unregistered case-study slugs)
 * should get a real HTTP 404, even though the SPA shell still renders its
 * own styled NotFound component client-side for any of them.
 */
export function isKnownRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if ((PUBLIC_STATIC_ROUTES as readonly string[]).includes(normalized)) {
    return true;
  }

  const workMatch = normalized.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    return (CASE_STUDY_SLUGS as readonly string[]).includes(workMatch[1]);
  }

  return false;
}
