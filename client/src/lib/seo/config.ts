import { normalizeProductionSiteUrl } from "@shared/siteUrl";

/**
 * Verified production domain for Lux Studio, injected at build time via the
 * VITE_SITE_URL env var (see .env.example). No production domain has been
 * confirmed yet (checked .env, .replit, package.json, and every config file
 * in this repo — none references one), so this stays `undefined` until a
 * real domain is set there.
 *
 * Every canonical link and og:url tag in `useSEO` is gated on this being
 * set — we never fabricate a domain, fall back to example.com, or hardcode
 * localhost into a canonical/sitemap URL.
 */
const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = rawSiteUrl ? normalizeProductionSiteUrl(rawSiteUrl) : undefined;
