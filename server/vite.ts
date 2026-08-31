import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { isKnownRoute, DASHBOARD_ROUTE } from "@shared/publicRoutes";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
    fs: {
      strict: true,
    },
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("/{*path}", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      // Same known-route check as the production static server (see
      // server/static.ts) — dev-mode direct/hard-refresh requests should
      // get the same real 200-vs-404 status the built app will serve.
      // NOT req.path — this middleware is mounted at "/{*path}", and Express
      // strips the matched mount path from req.path/req.url inside the
      // handler (here that's the *entire* path, so req.path reads as "/"
      // for every request). req.originalUrl is untouched by that stripping.
      const pathname = url.split("?")[0];
      const status = isKnownRoute(pathname) ? 200 : 404;
      const headers: Record<string, string> = { "Content-Type": "text/html" };
      // Defense-in-depth alongside the client-side noindex meta tag
      // (pageMeta.dashboard.robots) — this one is visible to a crawler that
      // never executes JS, since it's a real HTTP header, not DOM content.
      if (pathname === DASHBOARD_ROUTE) {
        headers["X-Robots-Tag"] = "noindex, nofollow";
      }
      res.status(status).set(headers).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
