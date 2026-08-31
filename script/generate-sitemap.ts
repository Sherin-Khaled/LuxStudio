import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_INDEXABLE_ROUTES } from "../shared/publicRoutes";
import { requireProductionSiteUrl } from "./site-url";

/** Generate sitemap.xml and robots.txt into the completed production output. */
async function main() {
  const siteUrl = requireProductionSiteUrl();
  const today = new Date().toISOString().slice(0, 10);
  const urls = PUBLIC_INDEXABLE_ROUTES.map((route) => {
    const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  const publicDir = path.resolve(import.meta.dirname, "..", "dist", "public");
  await mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(publicDir, "sitemap.xml"), xml, "utf8"),
    writeFile(path.join(publicDir, "robots.txt"), robots, "utf8"),
  ]);
  console.log(`[seo-files] Wrote ${PUBLIC_INDEXABLE_ROUTES.length} sitemap URLs and robots.txt to ${publicDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
