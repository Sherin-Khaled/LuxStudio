import { normalizeProductionSiteUrl } from "../shared/siteUrl";

export function requireProductionSiteUrl(): string {
  const raw = process.env.VITE_SITE_URL?.trim();
  if (!raw) {
    throw new Error(
      "VITE_SITE_URL is required for a production build (example: https://luxstudio.example).",
    );
  }

  return normalizeProductionSiteUrl(raw);
}
