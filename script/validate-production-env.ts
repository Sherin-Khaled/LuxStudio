import { requireProductionSiteUrl } from "./site-url";

try {
  const siteUrl = requireProductionSiteUrl();
  console.log(`[production-env] VITE_SITE_URL=${siteUrl}`);
} catch (error) {
  console.error(`[production-env] ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
