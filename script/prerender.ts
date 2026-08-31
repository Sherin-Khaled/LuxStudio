import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";
import { caseStudyMeta, getCaseStudyBreadcrumb } from "../client/src/lib/seo/caseStudyMeta";
import { pageBreadcrumbs, pageMeta } from "../client/src/lib/seo/pageMeta";
import type { SEOInput } from "../client/src/lib/seo/useSEO";
import { PUBLIC_INDEXABLE_ROUTES } from "../shared/publicRoutes";
import { requireProductionSiteUrl } from "./site-url";

// React's production server renderer omits development-only useLayoutEffect
// warnings; the client intentionally replaces, rather than hydrates, this
// static crawlable markup on load.
process.env.NODE_ENV = "production";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_PUBLIC = path.join(ROOT, "dist", "public");
const CLIENT_ROOT = path.join(ROOT, "client");

type Breadcrumb = { name: string; path: string };
type RouteSEO = { seo: SEOInput; breadcrumbs: Breadcrumb[]; caseSlug?: string };

const topLevelRoutes: Record<string, RouteSEO> = {
  "/": { seo: pageMeta.home, breadcrumbs: [] },
  "/work": { seo: pageMeta.work, breadcrumbs: pageBreadcrumbs.work },
  "/services": { seo: pageMeta.services, breadcrumbs: pageBreadcrumbs.services },
  "/process": { seo: pageMeta.process, breadcrumbs: pageBreadcrumbs.process },
  "/about": { seo: pageMeta.about, breadcrumbs: pageBreadcrumbs.about },
  "/contact": { seo: pageMeta.contact, breadcrumbs: pageBreadcrumbs.contact },
};

function routeSEO(route: string): RouteSEO {
  const topLevel = topLevelRoutes[route];
  if (topLevel) return topLevel;
  const slug = route.match(/^\/work\/([^/]+)$/)?.[1];
  const seo = slug ? caseStudyMeta[slug] : undefined;
  if (!slug || !seo) throw new Error(`No SEO metadata registered for ${route}`);
  return { seo, breadcrumbs: getCaseStudyBreadcrumb(slug), caseSlug: slug };
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeTitle(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function jsonLD(schema: Record<string, unknown>, id: string): string {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return `<script type="application/ld+json" data-schema-id="${id}">${json}</script>`;
}

function buildHead(route: string, siteUrl: string): string {
  const { seo, breadcrumbs, caseSlug } = routeSEO(route);
  const canonical = `${siteUrl}${route === "/" ? "/" : route}`;
  const title = seo.ogTitle ?? seo.title;
  const description = seo.ogDescription ?? seo.description;
  const image = seo.ogImage ? `${siteUrl}${seo.ogImage}` : undefined;
  const schemas: string[] = [
    jsonLD({
      "@context": "https://schema.org", "@type": "Organization",
      "@id": `${siteUrl}/#organization`, name: "Lux Studio", url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
    }, "organization"),
    jsonLD({
      "@context": "https://schema.org", "@type": "WebSite",
      "@id": `${siteUrl}/#website`, name: "Lux Studio", url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    }, "website"),
  ];
  if (breadcrumbs.length) {
    schemas.push(jsonLD({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((segment, index) => ({
        "@type": "ListItem", position: index + 1, name: segment.name,
        item: `${siteUrl}${segment.path === "/" ? "/" : segment.path}`,
      })),
    }, "breadcrumb"));
  }
  if (caseSlug) {
    schemas.push(jsonLD({
      "@context": "https://schema.org", "@type": "CreativeWork",
      name: caseStudyMeta[caseSlug].name,
      description: caseStudyMeta[caseSlug].description,
      url: `${siteUrl}/work/${caseSlug}`,
      creator: { "@id": `${siteUrl}/#organization` },
    }, "creative-work"));
  }
  return [
    `<title>${escapeTitle(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(seo.description)}">`,
    `<meta name="robots" content="${escapeAttribute(seo.robots ?? "index, follow")}">`,
    `<link rel="canonical" href="${escapeAttribute(canonical)}">`,
    `<meta property="og:title" content="${escapeAttribute(title)}">`,
    `<meta property="og:description" content="${escapeAttribute(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}">`,
    image ? `<meta property="og:image" content="${escapeAttribute(image)}">` : "",
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttribute(title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(description)}">`,
    image ? `<meta name="twitter:image" content="${escapeAttribute(image)}">` : "",
    ...schemas,
  ].filter(Boolean).join("\n    ");
}

function replaceSEOHead(shell: string, route: string, siteUrl: string): string {
  const managedPatterns = [
    /\s*<title>[\s\S]*?<\/title>/i,
    /\s*<meta\s+name=["'](?:description|robots|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/gi,
    /\s*<meta\s+property=["'](?:og:title|og:description|og:type|og:url|og:image)["'][^>]*>/gi,
    /\s*<link\s+rel=["']canonical["'][^>]*>/gi,
    /\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
  ];
  const clean = managedPatterns.reduce((html, pattern) => html.replace(pattern, ""), shell);
  return clean.replace("</head>", `    ${buildHead(route, siteUrl)}\n  </head>`);
}

function outputPathForRoute(route: string): string {
  return route === "/" ? path.join(DIST_PUBLIC, "index.html") : path.join(DIST_PUBLIC, route.slice(1), "index.html");
}

async function main() {
  const siteUrl = requireProductionSiteUrl();
  const shell = await readFile(path.join(ROOT, "dist", "spa-shell.html"), "utf8");
  const vite = await createServer({
    configFile: false,
    root: CLIENT_ROOT,
    appType: "custom",
    plugins: [react()],
    server: { middlewareMode: true },
    resolve: { alias: { "@": path.join(CLIENT_ROOT, "src"), "@shared": path.join(ROOT, "shared") } },
  });
  try {
    const entry = await vite.ssrLoadModule("/src/entry-server.tsx") as { renderRoute: (route: string) => Promise<string> };
    for (const route of PUBLIC_INDEXABLE_ROUTES) {
      const body = await entry.renderRoute(route);
      if (!body.trim()) throw new Error(`SSR returned an empty body for ${route}`);
      let html = replaceSEOHead(shell, route, siteUrl);
      html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
      const outPath = outputPathForRoute(route);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf8");
      console.log(`[prerender] ${route} -> ${path.relative(ROOT, outPath)}`);
    }
  } finally {
    await vite.close();
  }
  console.log(`[prerender] done — ${PUBLIC_INDEXABLE_ROUTES.length} routes rendered without a browser.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
