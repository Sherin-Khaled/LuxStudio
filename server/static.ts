import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { isKnownRoute, DASHBOARD_ROUTE } from "@shared/publicRoutes";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // spa-shell.html is `script/build.ts`'s preserved copy of the generic,
  // un-prerendered Vite output — deliberately kept OUTSIDE distPath (dist/public)
  // so it's never web-reachable by URL guess. It's what /dashboard and every
  // 404 serve, since neither has (or should have) prerendered content: the
  // real, route-specific static HTML that `npm run prerender` produces lives
  // at dist/public/<route>/index.html (dist/public/index.html itself for
  // "/") and is served automatically by express.static below, before this
  // fallback ever runs.
  const shellPath = path.resolve(__dirname, "spa-shell.html");
  const fallbackPath = fs.existsSync(shellPath) ? shellPath : path.resolve(distPath, "index.html");

  // redirect: false disables express.static's own trailing-slash-adding
  // redirect for directory matches (e.g. a request for "/work/x-dental"
  // matching the dist/public/work/x-dental/ directory `npm run prerender`
  // creates). Without this, that redirect would fight our own no-trailing-
  // slash canonical middleware (server/index.ts), which strips the slash
  // right back off — an infinite redirect loop. With it, an un-slashed
  // directory request instead falls through (a plain 404-then-next() inside
  // send/serve-static, verified by reading their source) to our catch-all
  // below, which resolves and serves the exact prerendered file directly.
  app.use(express.static(distPath, { redirect: false }));

  // Fall through to here for any path express.static didn't already serve
  // as a real file. In practice that's every known route except "/" itself
  // (express.static's own root-index handling already serves that one) —
  // confirmed by reading serve-static/send's source (see the comment
  // above): a directory match *without* a trailing slash never gets
  // auto-served, `redirect: false` just changes what happens next from a
  // 301 to a plain fall-through. So this handler is what actually resolves
  // and serves each prerendered route's index.html.
  app.use("/{*path}", (req, res) => {
    // NOT req.path — this middleware is mounted at "/{*path}", and Express
    // strips the matched mount path from req.path/req.url inside the
    // handler (here that's the *entire* path, so req.path reads as "/" for
    // every request). req.originalUrl is untouched by that stripping.
    const pathname = req.originalUrl.split("?")[0];

    if (pathname === DASHBOARD_ROUTE) {
      // Defense-in-depth alongside the client-side noindex meta tag
      // (pageMeta.dashboard.robots) — this one is visible to a crawler that
      // never executes JS, since it's a real HTTP header, not DOM content.
      res.set("X-Robots-Tag", "noindex, nofollow");
      res.status(200).sendFile(fallbackPath);
      return;
    }

    if (isKnownRoute(pathname)) {
      const prerenderedPath = path.resolve(distPath, pathname.replace(/^\//, ""), "index.html");
      // Known route without a prerendered file yet (e.g. `npm run build`
      // ran but `npm run prerender` hasn't) — the plain SPA shell still
      // renders that route correctly client-side, just without baked-in
      // per-route <head> tags, so this is a safe fallback, not an error.
      res.status(200).sendFile(fs.existsSync(prerenderedPath) ? prerenderedPath : fallbackPath);
      return;
    }

    res.status(404).sendFile(fallbackPath);
  });
}
