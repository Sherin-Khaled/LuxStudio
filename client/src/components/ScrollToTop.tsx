import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Resets scroll position to the top on every route change (wouter's `location`
   is just the pathname, so this only fires on real navigation, not on in-page
   state updates). The reset runs in useLayoutEffect so it happens before the
   browser paints the next frame — no visible flash of the old scroll position
   — and, since React flushes every layout effect in the tree before any
   passive effect runs, it also lands before the newly-mounted page's own
   GSAP/ScrollTrigger setup effects measure anything. ScrollTrigger.refresh()
   then runs in a regular effect, guaranteed to fire after those setup effects,
   as a final re-measure so pinned sections calculate from the top of the page
   rather than the previous scroll position. */
export function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location]);

  return null;
}
