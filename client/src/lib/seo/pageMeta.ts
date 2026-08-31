import type { SEOInput } from "./useSEO";
import type { BreadcrumbSegment } from "./schema";

/**
 * Per-route metadata for every top-level public route plus /dashboard and
 * the 404 fallback. Written from the real page copy (hero headings/
 * subheadings in `lib/i18n/*`) — see each route's own dictionary for the
 * source. English only for now: the site has no per-language URLs, so a
 * single canonical description per route is correct until a dedicated
 * hreflang/i18n-URL phase changes that.
 */
export const pageMeta = {
  home: {
    path: "/",
    title: "Lux Studio — UI/UX, Web Design & Development",
    description:
      "Lux Studio is a creative technology studio that designs and builds premium websites, UI/UX, and digital systems for real businesses — from strategy to launch.",
    ogImage: "/figmaAssets/imagewithfallback.webp",
  } satisfies SEOInput,

  work: {
    path: "/work",
    title: "Web Design & Development Case Studies | Lux Studio",
    description:
      "A closer look at the websites, e-commerce platforms, and digital systems Lux Studio has designed, built, and launched for real businesses.",
  } satisfies SEOInput,

  services: {
    path: "/services",
    title: "Web Design, UI/UX & Development Services | Lux Studio",
    description:
      "Strategy, UI/UX design, content, development, dashboards, and SEO — Lux Studio's services are built to work together as one connected system.",
  } satisfies SEOInput,

  process: {
    path: "/process",
    title: "Our Process — From Idea to Launch | Lux Studio",
    description:
      "Six connected stages take every Lux Studio project from strategy and content through design and development to launch, with a clear review point at each one.",
  } satisfies SEOInput,

  about: {
    path: "/about",
    title: "About Lux Studio | Creative & Technical Digital Studio",
    description:
      "Lux Studio is a creative technology studio where creative direction meets technical execution — built for clients who need more than a beautiful website.",
  } satisfies SEOInput,

  contact: {
    path: "/contact",
    title: "Contact Lux Studio | Start Your Project",
    description:
      "Tell us what you want to build, and Lux Studio will help you shape the strategy, design, and system that brings it to life.",
  } satisfies SEOInput,

  dashboard: {
    path: "/dashboard",
    title: "Dashboard | Lux Studio",
    description: "Internal Lux Studio dashboard.",
    robots: "noindex, nofollow",
  } satisfies SEOInput,
} as const;

/**
 * BreadcrumbList segments per route, for `schema.buildBreadcrumbSchema`.
 * Home has none (it's the root, a breadcrumb there is redundant) and
 * /dashboard has none (not indexed, so no breadcrumb trail to publish).
 */
export const pageBreadcrumbs: Record<
  Exclude<keyof typeof pageMeta, "home" | "dashboard">,
  BreadcrumbSegment[]
> = {
  work: [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
  ],
  services: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ],
  process: [
    { name: "Home", path: "/" },
    { name: "Process", path: "/process" },
  ],
  about: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  contact: [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ],
};

/** No canonical is emitted for 404s — an unknown URL has no correct canonical target. */
export const notFoundMeta: SEOInput = {
  title: "Page Not Found | Lux Studio",
  description: "The page you're looking for doesn't exist or may have moved.",
  robots: "noindex, nofollow",
};
