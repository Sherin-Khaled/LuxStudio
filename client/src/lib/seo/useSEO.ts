import { useEffect } from "react";
import { SITE_URL } from "./config";

export interface SEOInput {
  /** Document title, e.g. "Services | Lux Studio". */
  title: string;
  /** Meta description — one to two sentences, no keyword-stuffing. */
  description: string;
  /**
   * Root-relative canonical path, e.g. "/services" or "/work/x-dental".
   * Omit (leave undefined) for pages that should never get a canonical tag
   * — 404s and other non-indexable, non-canonical states.
   */
  path?: string;
  /** Defaults to "index, follow". Pass "noindex, nofollow" for /dashboard, 404s, etc. */
  robots?: string;
  /** Defaults to `title`/`description` when omitted. */
  ogTitle?: string;
  ogDescription?: string;
  /** Root-relative or fully-resolved image URL. Optional — most routes have none yet (P1). */
  ogImage?: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string | undefined) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }
  const el = existing ?? document.createElement("link");
  el.setAttribute("rel", "canonical");
  el.setAttribute("href", href);
  if (!existing) document.head.appendChild(el);
}

/**
 * Sets per-route document title + meta tags (description, robots, canonical,
 * OG, Twitter) directly against `document.head` — this app is a Vite/React
 * SPA on React 18 (no native document-metadata support, no react-helmet),
 * so a small effect-based upsert is the whole "framework" needed here.
 *
 * Every page component calls this once with its own static metadata. Because
 * Wouter keeps the same component instance mounted across param changes
 * (e.g. /work/x-dental -> /work/houd-el-nile both render CaseStudyPage), the
 * effect deliberately depends on the resolved `seo` object reference — each
 * route's metadata is a distinct module-level constant, so navigating to a
 * different route always produces a new reference and re-fires the effect.
 */
export function useSEO(seo: SEOInput) {
  useEffect(() => {
    const { title, description, path, robots = "index, follow", ogTitle, ogDescription, ogImage } = seo;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", ogTitle ?? title);
    upsertMeta("property", "og:description", ogDescription ?? description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", ogTitle ?? title);
    upsertMeta("name", "twitter:description", ogDescription ?? description);

    const canonicalUrl = SITE_URL && path !== undefined ? `${SITE_URL}${path}` : undefined;
    upsertCanonical(canonicalUrl);
    if (canonicalUrl) {
      upsertMeta("property", "og:url", canonicalUrl);
    }

    if (ogImage) {
      const absoluteImage = SITE_URL ? `${SITE_URL}${ogImage}` : ogImage;
      upsertMeta("property", "og:image", absoluteImage);
      upsertMeta("name", "twitter:image", absoluteImage);
    }
  }, [seo]);
}
