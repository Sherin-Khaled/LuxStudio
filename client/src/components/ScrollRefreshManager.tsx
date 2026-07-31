import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  Pinned sections measure their start/end scroll positions once, when their
  GSAP effect mounts. Web fonts (loaded via Google Fonts @import) and
  below-the-fold images can still be loading at that moment — if they swap
  in afterward and change text/line height, every pinned section's cached
  measurement goes stale, which is what causes a pinned section to release
  early/late or leave a gap a few seconds after the page first paints.
  Refreshing once fonts are ready and once the window fully loads re-syncs
  every ScrollTrigger on the page to the final, settled layout.
*/
export const ScrollRefreshManager = (): null => {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    document.fonts?.ready?.then(refresh);

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
};
