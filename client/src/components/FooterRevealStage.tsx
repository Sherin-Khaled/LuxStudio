import { useLayoutEffect, useRef, useState } from "react";
import { SiteFooterSection } from "@/pages/sections/SiteFooterSection";

/**
 * Shared footer wrapper, used on every page directly after the page's own
 * `.page-content-layer`. See index.css for how `position: sticky` combines
 * with z-index to produce the curtain reveal — pure CSS tied live to scroll
 * position, no animation library, no measured buffer, no JS timeline.
 *
 * The one thing that does need a runtime check: sticky (`bottom: 0`) keeps
 * re-clamping a taller-than-viewport element to show only its own last
 * `viewportHeight` px for as long as it's stuck — so if the footer's own
 * height exceeds the viewport's, the top portion of it would never become
 * reachable by scrolling at all (sticky never lets it "catch up"). That's
 * only realistic on short/narrow viewports with heavily stacked content, so
 * this measures on mount and on resize and only enables sticky once the
 * footer actually fits within the viewport — otherwise it renders as a
 * normal, fully in-flow section, guaranteeing every bit of it stays
 * reachable regardless of viewport size.
 */
export const FooterRevealStage = (): JSX.Element => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [canStick, setCanStick] = useState(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const check = () => setCanStick(stage.scrollHeight <= window.innerHeight);
    check();

    const resizeObserver = new ResizeObserver(check);
    resizeObserver.observe(stage);
    window.addEventListener("resize", check);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={canStick ? "footer-reveal-stage footer-reveal-stage--sticky" : "footer-reveal-stage"}
    >
      <SiteFooterSection />
    </div>
  );
};
