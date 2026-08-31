import type { Dict } from "../useDict";

/**
 * Copy for ClientLogoMarqueeSection. The scrolling names themselves
 * (Houd El Nile, X Dental, Al Nours, Al Baraka Olives) are real client/brand
 * names and stay identical in both locales — only the section's aria-label
 * is translated.
 */
const en = {
  ariaLabel: "Client logos marquee",
};

const ar: typeof en = {
  ariaLabel: "شريط شعارات العملاء المتحرك",
};

export const logoMarqueeDict: Dict<typeof en> = { en, ar };
