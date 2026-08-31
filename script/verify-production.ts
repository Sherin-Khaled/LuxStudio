import { readFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_INDEXABLE_ROUTES } from "../shared/publicRoutes";
import { requireProductionSiteUrl } from "./site-url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_PUBLIC = path.join(ROOT, "dist", "public");

function routeFile(route: string): string {
  return route === "/" ? path.join(DIST_PUBLIC, "index.html") : path.join(DIST_PUBLIC, route.slice(1), "index.html");
}

async function main() {
  const siteUrl = requireProductionSiteUrl();
  const failures: string[] = [];
  for (const route of PUBLIC_INDEXABLE_ROUTES) {
    const html = await readFile(routeFile(route), "utf8");
    const canonical = `${siteUrl}${route === "/" ? "/" : route}`;
    const checks: Array<[string, boolean]> = [
      ["SSR body", !html.includes('<div id="root"></div>')],
      ["canonical", html.includes(`<link rel="canonical" href="${canonical}">`)],
      ["OG URL", html.includes(`<meta property="og:url" content="${canonical}">`)],
      ["description", /<meta name="description" content="[^"]+">/.test(html)],
      ["Organization schema", html.includes('data-schema-id="organization"')],
      ["WebSite schema", html.includes('data-schema-id="website"')],
    ];
    for (const [name, passed] of checks) if (!passed) failures.push(`${route}: ${name}`);
  }

  const sitemap = await readFile(path.join(DIST_PUBLIC, "sitemap.xml"), "utf8");
  const robots = await readFile(path.join(DIST_PUBLIC, "robots.txt"), "utf8");
  for (const route of PUBLIC_INDEXABLE_ROUTES) {
    const url = `${siteUrl}${route === "/" ? "/" : route}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`sitemap: ${url}`);
  }
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) failures.push("robots: sitemap directive");

  if (failures.length) throw new Error(`Production verification failed:\n- ${failures.join("\n- ")}`);
  console.log(`[verify:production] ${PUBLIC_INDEXABLE_ROUTES.length} routes plus sitemap.xml and robots.txt passed.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
