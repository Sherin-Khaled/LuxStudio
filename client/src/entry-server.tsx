import { PassThrough } from "node:stream";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

const RENDER_TIMEOUT_MS = 30_000;

/** Render one public route after all lazy page modules have resolved. */
export function renderRoute(pathname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let renderError: unknown;
    let abortRender = () => {};

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      abortRender();
      reject(new Error(`SSR timed out after ${RENDER_TIMEOUT_MS}ms for ${pathname}`));
    }, RENDER_TIMEOUT_MS);

    const stream = renderToPipeableStream(<App ssrPath={pathname} />, {
      onAllReady() {
        if (settled) return;
        if (renderError) {
          settled = true;
          clearTimeout(timeout);
          stream.abort();
          reject(renderError);
          return;
        }

        const output = new PassThrough();
        const chunks: Buffer[] = [];
        output.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        output.on("error", (error) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          reject(error);
        });
        output.on("end", () => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
        stream.pipe(output);
      },
      onError(error) {
        renderError = error;
      },
    });
    abortRender = () => stream.abort();
  });
}
