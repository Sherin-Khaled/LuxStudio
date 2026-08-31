// Sticky navbar is a fixed-position pill (top-5/top-6 + its own internal
// padding); this is roughly its height plus a bit of breathing room so a
// scrolled-to section's heading doesn't land hidden underneath it.
const NAVBAR_SCROLL_OFFSET = 110;

function isVisible(el: Element): boolean {
  return (el as HTMLElement).offsetParent !== null;
}

// The Services page's desktop "constellation" panel is a single crossfading
// card — every service renders in the exact same screen position, just with
// different content — unlike the mobile/reduced-motion layouts, where each
// service is its own separately-positioned stacked block. Scrolling to a
// specific service's own nav item inside that panel landed inconsistently
// (each nav item sits at a different height within the panel, unrelated to
// where the card content itself starts), so on that layout every one of
// these slugs resolves to this one shared anchor — the panel's own top —
// instead of a per-service position.
const SERVICES_PANEL_SLUGS = new Set([
  "ui-ux-design",
  "brand-content",
  "web-development",
  "backend-cms-dashboards",
  "seo-performance",
]);
export const SERVICES_DESKTOP_PANEL_ID = "services-constellation-panel";
// Mobile + reduced-motion layouts render the service layers in a separate
// section (no desktop constellation panel in the DOM), so cross-route links
// to the desktop panel id resolve here instead.
export const SERVICES_LAYERS_ID = "services-layers";

function resolveTargetId(id: string): string {
  if (id === SERVICES_DESKTOP_PANEL_ID || id === SERVICES_LAYERS_ID) {
    const panel = document.getElementById(SERVICES_DESKTOP_PANEL_ID);
    if (panel && isVisible(panel)) return SERVICES_DESKTOP_PANEL_ID;
    const layers = document.getElementById(SERVICES_LAYERS_ID);
    if (layers && isVisible(layers)) return SERVICES_LAYERS_ID;
    return id;
  }
  if (!SERVICES_PANEL_SLUGS.has(id)) return id;
  const panel = document.getElementById(SERVICES_DESKTOP_PANEL_ID);
  return panel && isVisible(panel) ? SERVICES_DESKTOP_PANEL_ID : id;
}

function targetScrollTop(id: string): number | null {
  const el = document.getElementById(resolveTargetId(id));
  if (!el || !isVisible(el)) return null;
  return el.getBoundingClientRect().top + window.scrollY - NAVBAR_SCROLL_OFFSET;
}

// How close to the target counts as "arrived" — below this, correcting would
// be a sub-pixel nudge nobody can see.
const ARRIVED_TOLERANCE_PX = 4;

// Don't start watching for the scroll to settle until the smooth animation
// has had a chance to actually begin, otherwise the very first reading — where
// nothing has moved yet — reads as "already settled".
const SETTLE_WATCH_START_MS = 250;

// Polled on a timer rather than per animation frame: requestAnimationFrame
// stops entirely in a backgrounded tab, and so does the browser's smooth
// scrolling — so an rAF-driven watcher would never notice it had been left
// short of the target, and would only resume once the tab came back. Timers
// are throttled in the background but still fire, so the correction lands.
const SETTLE_POLL_MS = 80;

// Consecutive polls at an unchanged scroll position that mean motion has
// stopped (either the smooth scroll finished, or it never ran at all).
const SETTLE_STILL_POLLS = 2;

// Upper bound on how long we'll wait for motion to stop before correcting
// anyway — a smooth scroll of any realistic distance is long done by then.
const SETTLE_TIMEOUT_MS = 3000;

// A cold full-page load of a `#hash` URL runs this before web fonts (and, on
// the Process page, the hero's heavy content) have finished reflowing the
// page — a measurement can land correctly against *that* layout and then go
// stale the instant a font swaps in and pushes everything below it down. One
// last re-measure this long after the scroll settles catches that.
const LATE_REFLOW_RECHECK_MS = 800;

/**
 * Corrects the final resting position once the page has actually stopped
 * moving.
 *
 * The previous version re-measured on fixed delays (150/400/900ms) and
 * corrected with another *smooth* scroll. Those delays land while the
 * original smooth scroll is still animating, where the position legitimately
 * hasn't reached the target yet — so the check fired, and re-issuing a smooth
 * scrollTo restarted the browser's animation with a fresh easing curve from
 * wherever it had got to. Repeated restarts make the scroll decelerate over
 * and over instead of arriving.
 *
 * Waiting for motion to stop removes that fight, and correcting *instantly*
 * makes arrival unconditional: an instant scroll can't be interrupted or
 * restarted, so even if the smooth animation is cancelled outright (or never
 * runs, as when the tab isn't compositing), the target is still reached.
 */
function correctOnceSettled(id: string, isCancelled: () => boolean): void {
  const deadline = performance.now() + SETTLE_TIMEOUT_MS;
  let lastY = window.scrollY;
  let stillPolls = 0;

  const snapToTarget = () => {
    const top = targetScrollTop(id);
    if (top != null && Math.abs(top - window.scrollY) > ARRIVED_TOLERANCE_PX) {
      window.scrollTo({ top, behavior: "auto" });
    }
  };

  const watch = () => {
    if (isCancelled()) return;

    const y = window.scrollY;
    stillPolls = y === lastY ? stillPolls + 1 : 0;
    lastY = y;

    if (stillPolls < SETTLE_STILL_POLLS && performance.now() < deadline) {
      window.setTimeout(watch, SETTLE_POLL_MS);
      return;
    }

    snapToTarget();
    window.setTimeout(() => {
      if (!isCancelled()) snapToTarget();
    }, LATE_REFLOW_RECHECK_MS);
  };

  window.setTimeout(watch, SETTLE_WATCH_START_MS);
}

/**
 * Smoothly scrolls to the element with the given id, offsetting for the
 * fixed navbar. Retries across a few animation frames since this is often
 * called right after a route change, before the target page's own sections
 * (and their id attributes) have committed to the DOM — re-resolving the
 * target each attempt so it settles on the right one once things mount.
 */
export function scrollToHashTarget(id: string, attemptsLeft = 20): void {
  const top = targetScrollTop(id);
  if (top != null) {
    window.scrollTo({ top, behavior: "smooth" });

    // Cancelled the instant the user scrolls themselves, so a late
    // correction never yanks someone back who has already moved on.
    let userScrolled = false;
    const cancel = () => { userScrolled = true; };
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchmove", cancel, { passive: true, once: true });

    correctOnceSettled(id, () => userScrolled);
    return;
  }
  if (attemptsLeft > 0) {
    requestAnimationFrame(() => scrollToHashTarget(id, attemptsLeft - 1));
  }
}
