/** Normalize and validate the one production origin used by every SEO output. */
export function normalizeProductionSiteUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new Error(`VITE_SITE_URL must be an absolute URL; received ${JSON.stringify(raw)}.`);
  }

  if (url.protocol !== "https:") {
    throw new Error("VITE_SITE_URL must use https:// in production.");
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("VITE_SITE_URL must contain only the production origin, with no path, query, hash, or credentials.");
  }

  return url.origin;
}
