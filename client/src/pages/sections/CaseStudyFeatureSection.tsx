import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SideStars } from "@/components/backgrounds/SideStars";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Data ─────────────────────────── */
const projects = [
  {
    label: "P.01",
    name: "Houd El Nile",
    subtitle: "Agriculture export company",
    description:
      "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
    tags: ["Website Redesign", "Next.js", "Photography", "7 Languages", "SEO & Performance"],
    domain: "houdelnile.com",
    websiteUrl: "https://houdelnile.com",
    useLivePreview: true,
    headerBg: "#16532d",
    bodyBg: "#f0ece4",
    accent: "#1e7a42",
    navLines: ["#4ade80", "#4ade80", "#4ade80"],
  },
  {
    label: "P.02",
    name: "X Dental",
    subtitle: "Dental supplies e-commerce platform",
    description:
      "We designed and built X Dental as a complete e-commerce platform for doctors and clinics. The project included UI/UX design, product flows, cart and checkout, frontend and backend development, and product image editing.",
    tags: ["E-commerce", "UI/UX Design", "Frontend", "Backend", "Photoshop"],
    domain: "xdental.com",
    websiteUrl: null,
    useLivePreview: false,
    headerBg: "#0c0c0f",
    bodyBg: "#f5f5f5",
    accent: "#b8943f",
    navLines: ["#b8943f", "#b8943f", "#b8943f"],
  },
  {
    label: "P.03",
    name: "Al Nours",
    subtitle: "Saudi beverage distribution e-commerce",
    description:
      "We created a complete online shopping platform for Al Nours, a Saudi company with distribution rights for Domty juices. The project included logo creation, brand color direction, full-stack development, and deployment.",
    tags: ["E-commerce", "Frontend", "Backend", "Logo Design", "Brand Direction"],
    domain: "al-nours.com",
    websiteUrl: "https://al-nours.com",
    useLivePreview: true,
    headerBg: "#0f2d6b",
    bodyBg: "#f0f5ff",
    accent: "#2563eb",
    navLines: ["#60a5fa", "#60a5fa", "#60a5fa"],
  },
  {
    label: "P.04",
    name: "Al Baraka Olives",
    subtitle: "Olive export company",
    description:
      "We transformed Al Baraka Olives from an outdated website into a cleaner, more premium export-brand experience through full visual redesign, frontend development, photography direction, and cPanel deployment.",
    tags: ["Website Redesign", "Frontend", "Export Brand", "Photography", "cPanel Deployment"],
    domain: "albarakaolives.com",
    websiteUrl: "https://albarakaolives.com",
    useLivePreview: true,
    headerBg: "#364a18",
    bodyBg: "#f3f0e6",
    accent: "#6b8c2a",
    navLines: ["#a3c456", "#a3c456", "#a3c456"],
  },
];

/*
  Stack visual positions indexed by relative position to the active card.
  y=0/38/74/108: stacked cards offset downward (positive Y only) so their bottom
  strip peeks below the active card into the peek spacer below the stack
  container — pages resting underneath, never above.
  transformOrigin "top center" keeps the top edge anchored while scale shrinks downward.
*/
const STACK = [
  { y: 0,   scale: 1,     opacity: 1,    zIndex: 40 },
  { y: 38,  scale: 0.985, opacity: 0.62, zIndex: 30 },
  { y: 74,  scale: 0.97,  opacity: 0.40, zIndex: 20 },
  { y: 108, scale: 0.955, opacity: 0.25, zIndex: 10 },
];

/*
  Inactive cards must only show a thin "page edge" peeking out below the
  active card — not their full body. Translucent glass surfaces (bg-white/[0.04])
  let whatever sits behind them bleed through, so relying on z-index + opacity
  alone let stacked cards read as full ghost-cards rather than book-page edges.
  clip-path removes the rest of the card's own pixels outright, independent of
  transparency: only the bottom 6% (a few dozen px, scaling with card height)
  is ever painted for an inactive card. Percent-based (not calc()/px) so GSAP
  can tween it, and both states share the same inset()+round() structure so
  the tween interpolates cleanly between them.
*/
const CLIP_ACTIVE = "inset(0% 0% 0% 0% round 36px 36px 36px 36px)";
const CLIP_EDGE   = "inset(94% 0% 0% 0% round 0px 0px 36px 36px)";

/* ─────────────────────── Browser mockup ─────────────────────── */
/*
  Same browser frame for every project. When `websiteUrl` is set and `showLive`
  is true, the content area renders the real site in a scaled-down iframe
  (2× width at scale 0.5 → desktop layout) with a themed "Open live website"
  panel layered underneath as the loading/blocked fallback. A transparent
  anchor covers the whole frame so the entire preview is clickable and the
  iframe never captures scroll/clicks. Without `websiteUrl` (X Dental for now)
  the original skeleton preview renders unchanged.
*/
const BrowserMockup = ({
  name, domain, headerBg, bodyBg, accent, navLines, websiteUrl, showLive,
}: {
  name: string; domain: string; headerBg: string; bodyBg: string; accent: string;
  navLines: string[]; websiteUrl: string | null; showLive: boolean;
}) => {
  // Root cause of Issue 1: this shadow was never theme-gated at all — the
  // same heavy 0_20px_64px_rgba(0,0,0,0.65) rendered identically in both
  // themes, same pattern as the earlier footer-shadow bug. Fine against
  // dark mode's own near-black page; over a pale light-mode page it read as
  // a big gray haze under the browser mockup.
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
  <div className={`relative overflow-hidden rounded-2xl border border-white/10 ${isLight ? "shadow-[0_18px_45px_rgba(15,23,42,0.12)]" : "shadow-[0_20px_64px_rgba(0,0,0,0.65)]"}`}>
    {/* Chrome bar */}
    <div className="flex items-center gap-2.5 border-b border-white/10 bg-[#111111] px-4 py-3">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] opacity-80" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbc2e] opacity-80" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840] opacity-80" />
      </div>
      <div className="flex h-5 flex-1 items-center rounded bg-white/10 px-3">
        <span className="font-mono text-[10px] leading-none text-white/45">{domain}</span>
      </div>
    </div>
    {websiteUrl ? (
      /* ── Live website preview ── height matches the skeleton's natural size */
      <div className="relative h-[clamp(340px,46vh,446px)]" style={{ backgroundColor: bodyBg }}>
        {/* Themed fallback — visible while the iframe loads or if embedding fails */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <span className="[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium" style={{ color: headerBg }}>
            {name}
          </span>
          <span className="font-mono text-[10px] tracking-[1.2px] opacity-60" style={{ color: headerBg }}>
            {domain}
          </span>
          <span
            className="mt-2.5 rounded-full border px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-medium"
            style={{ borderColor: accent, color: accent }}
          >
            Open live website →
          </span>
        </div>
        {showLive && (
          <iframe
            src={websiteUrl}
            title={`${name} website preview`}
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
          />
        )}
        {/* Full-frame click target — opens the real site in a new tab */}
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} live website in a new tab`}
          className="absolute inset-0 z-10 cursor-pointer"
          data-testid={`link-live-preview-${domain}`}
        />
      </div>
    ) : (
    /* ── Skeleton page content (no live URL yet) ── */
    <div style={{ backgroundColor: bodyBg }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: headerBg }}>
        <div className="h-2.5 w-24 rounded-full opacity-75" style={{ backgroundColor: navLines[0] }} />
        <div className="flex gap-4">
          {navLines.map((c, i) => (
            <div key={i} className="h-1.5 w-12 rounded-full opacity-50" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-6 w-16 rounded-md" style={{ backgroundColor: accent }} />
      </div>
      {/* Hero */}
      <div className="px-6 py-6">
        <div className="mb-1.5 h-2 w-16 rounded-full opacity-25" style={{ backgroundColor: headerBg }} />
        <div className="mb-3 h-5 w-3/4 rounded-full opacity-35" style={{ backgroundColor: headerBg }} />
        <div className="mb-1 h-2.5 w-2/3 rounded-full opacity-20" style={{ backgroundColor: headerBg }} />
        <div className="mb-1 h-2.5 w-1/2 rounded-full opacity-15" style={{ backgroundColor: headerBg }} />
        <div className="mt-5 flex gap-3">
          <div className="h-8 w-24 rounded-lg opacity-90" style={{ backgroundColor: headerBg }} />
          <div className="h-8 w-24 rounded-lg border-2 opacity-35" style={{ borderColor: headerBg }} />
        </div>
      </div>
      {/* Divider */}
      <div className="mx-6 border-t opacity-10" style={{ borderColor: headerBg }} />
      {/* Feature images row */}
      <div className="flex gap-3 px-6 py-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 space-y-2">
            <div className="h-20 w-full rounded-lg opacity-[0.13]" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-3/4 rounded-full opacity-[0.12]" style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-1/2 rounded-full opacity-[0.08]" style={{ backgroundColor: headerBg }} />
          </div>
        ))}
      </div>
      {/* Second divider */}
      <div className="mx-6 border-t opacity-[0.07]" style={{ borderColor: headerBg }} />
      {/* Stats / testimonial row */}
      <div className="flex items-center gap-8 px-6 py-4">
        {[{ w: "w-1/3" }, { w: "w-1/4" }, { w: "w-1/5" }].map(({ w }, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className={`h-4 ${w} rounded-full opacity-25`} style={{ backgroundColor: headerBg }} />
            <div className="h-2 w-16 rounded-full opacity-12" style={{ backgroundColor: headerBg }} />
          </div>
        ))}
      </div>
    </div>
    )}
  </div>
  );
};

/* ─────────────────────────── Section ─────────────────────────── */
export const CaseStudyFeatureSection = (): JSX.Element => {
  const reduced  = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  // Pinned book animation only runs where the two-column card layout exists (lg+);
  // below 1024px (tablet/mobile) the static vertical list keeps content readable.
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    // A layout pass can land a beat after this effect's first run in some
    // embedding contexts, catching window.innerWidth mid-transition and
    // sticking the wrong reading for the rest of the page's life (no resize
    // event ever fires to correct it). One follow-up check after the next
    // paint catches that without adding any visible delay in the normal case.
    const raf = requestAnimationFrame(check);
    const timeout = window.setTimeout(check, 150);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", check);
    };
  }, []);

  const animOff = reduced || isCompact;

  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLElement>(null);
  const stageRef    = useRef<HTMLDivElement>(null);
  // Entry animation target: an inner wrapper of the stage. The pin trigger is
  // stageRef — transforming stageRef itself would corrupt ScrollTrigger's
  // start measurement (rect includes transforms), shifting the pinned resting
  // position. A child transform leaves the trigger's geometry untouched.
  const entryRef    = useRef<HTMLDivElement>(null);

  // Mount the live preview iframes only once the section approaches the viewport,
  // so three external sites don't load during initial page load or drag on the
  // pinned animation elsewhere on the page.
  const [previewsReady, setPreviewsReady] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || previewsReady) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPreviewsReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [previewsReady]);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // useLayoutEffect: cleanup runs synchronously before React's DOM mutations,
    // removing GSAP's pin-spacer before React reconciles — prevents "removeChild" crash.
    if (tlRef.current) {
      try { tlRef.current.scrollTrigger?.kill(); tlRef.current.kill(); } catch (_) {}
      tlRef.current = null;
    }
    if (animOff) return;

    const cards    = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 4 || contents.length < 4 || !sectionRef.current || !stageRef.current) return;

    /*
      Initial stack positions. Stacked cards get their bottom-center origin
      HERE, at setup — never mid-transition. Changing origin on a scaled
      element shifts it visibly, so all origin state a card needs as
      "incoming" is baked in while nothing is on screen.
      No rotateX/perspective tilt on these cards — a 3D-transformed parent
      combined with a backdrop-blur child (the card shell) is a known source
      of compositor shimmer, which is what read as "vibration" while pinned.
      Removing the tilt keeps the card flat and stops that interaction, with
      no visible change to the stack's y/scale/opacity/clip-path depth cues.
      pointerEvents: only the ACTIVE card may receive clicks — stacked and exited
      cards must never intercept the live-preview overlay of the card on top.
      Content uses autoAlpha (opacity + visibility) so hidden content is also
      unclickable, not just transparent.
    */
    cards.forEach((card, i) => {
      gsap.set(card, {
        ...STACK[i],
        transformOrigin: i === 0 ? "top center" : "bottom center",
        pointerEvents: i === 0 ? "auto" : "none",
        clipPath: i === 0 ? CLIP_ACTIVE : CLIP_EDGE,
      });
    });
    gsap.set(contents[0], { autoAlpha: 1 });
    contents.slice(1).forEach((c) => gsap.set(c, { autoAlpha: 0 }));

    /*
      Pin timing: the trigger is the card stack stage, which sits vertically
      centered inside a 100vh pin stage below the header. "center center" fires
      exactly when that pin stage fills the viewport — the heading has scrolled
      away naturally and the active card rests centered with symmetric space
      above and below it. The whole section is pinned (not the inner stage) so
      the star/glow background stays stable behind the cards.
    */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stageRef.current,
        pin: sectionRef.current,
        start: "center center",
        end: "+=450%",
        scrub: 0.9,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to({}, { duration: 0.3 }); // opening hold

    /*
      Book/page transitions: the outgoing page lifts UP and off the top of the
      stack (it stays on top while leaving — never drops behind), while the next
      page rises from its slot BELOW to become active. Cards behind the active
      one only ever sit at positive Y (underneath), never above.

      Each transition is sequenced in four explicit phases (as a fraction of
      ACTIVE_DURATION) instead of starting every tween at once, which used to
      let the outgoing content vanish (0.35s) long before the outgoing SHELL
      finished leaving (1.05s) — a bare glass card with no text — while the
      incoming card's content and its clip-path reveal both dragged on for the
      full 1.05s at the same time, so its "edge" visibly ballooned throughout
      the whole rise instead of staying small until it mattered:
        0%–45%  hold — outgoing card stays fully readable, nothing moves.
        45%–80% incoming's shell (y/scale) rises into place, but stays
                edge-clipped the whole time — it reads as a page sliding up,
                not a swelling ghost card.
        70%–100% incoming unclips AND its content fades in together — one
                tight reveal instead of a long half-visible middle state.
        80%–100% only now does the outgoing card's shell + content fade/lift
                together, so a bare shell never outlives its own text.
      This guarantees at least one card is always fully readable: outgoing
      stays legible through 80%, incoming is already legible before 100%.
    */
    const ACTIVE_DURATION = 1.8; // one card-to-card transition, phase math below is % of this

    for (let t = 0; t < 3; t++) {
      const exiting      = cards[t];
      const incoming     = cards[t + 1];
      const exitContent  = contents[t];
      const enterContent = contents[t + 1];
      const label = `card${t}`;

      tl.addLabel(label);

      // Invisible state prep: exiting is at identity (origin swap has no effect),
      // both z bumps keep the existing paint order (exiting stays topmost, so it
      // visually lifts to reveal incoming beneath it, page-by-page).
      tl.set(exiting,  { zIndex: 50, transformOrigin: "top center" }, label);
      tl.set(incoming, { zIndex: 40 }, label);

      // 45%–80%: incoming's shell rises into position while still edge-clipped.
      tl.to(incoming, {
        y: 0, scale: 1,
        duration: ACTIVE_DURATION * 0.35, ease: "power2.inOut",
      }, `${label}+=${ACTIVE_DURATION * 0.45}`);

      // Remaining stacked cards settle into their next slot in the same window.
      for (let r = t + 2; r < 4; r++) {
        const newPos = STACK[r - (t + 1)];
        tl.to(cards[r], {
          y: newPos.y, scale: newPos.scale, opacity: newPos.opacity,
          duration: ACTIVE_DURATION * 0.35, ease: "power1.inOut",
        }, `${label}+=${ACTIVE_DURATION * 0.45}`);
        tl.set(cards[r], { zIndex: newPos.zIndex }, `${label}+=${ACTIVE_DURATION * 0.45}`);
      }

      // 70%–100%: incoming unclips, brightens to full opacity, and fades its
      // content in together, and only now does click ownership move to it —
      // it's finally the readable card.
      tl.to(incoming, {
        clipPath: CLIP_ACTIVE, opacity: 1,
        duration: ACTIVE_DURATION * 0.3, ease: "power1.out",
      }, `${label}+=${ACTIVE_DURATION * 0.70}`);
      tl.to(enterContent, {
        autoAlpha: 1,
        duration: ACTIVE_DURATION * 0.3, ease: "power1.out",
      }, `${label}+=${ACTIVE_DURATION * 0.70}`);
      tl.set(incoming, { pointerEvents: "auto" }, `${label}+=${ACTIVE_DURATION * 0.70}`);
      tl.set(exiting,  { pointerEvents: "none" }, `${label}+=${ACTIVE_DURATION * 0.70}`);

      // 80%–100%: outgoing card drifts upward like a page gently lifting away —
      // shell and content fade/lift together, never leaving a bare glass shell.
      tl.to(exiting, {
        y: -140, scale: 0.975, autoAlpha: 0,
        duration: ACTIVE_DURATION * 0.2, ease: "power2.in",
      }, `${label}+=${ACTIVE_DURATION * 0.80}`);
      tl.to(exitContent, {
        autoAlpha: 0,
        duration: ACTIVE_DURATION * 0.2, ease: "power1.in",
      }, `${label}+=${ACTIVE_DURATION * 0.80}`);

      tl.to({}, { duration: t === 2 ? 1.0 : 0.6 }); // rest at new active card
    }

    tlRef.current = tl;

    /*
      Soft entry before the pin: the heading and the card stack settle in as
      the section scrolls into view. Subtle, time-based, plays once — by the
      time the stage reaches "center center" and the pin engages, both are at
      identity, so the pin start has no visible transform hand-off.
    */
    const entries: gsap.core.Tween[] = [];
    if (headerRef.current) {
      entries.push(
        gsap.from(headerRef.current, {
          autoAlpha: 0, y: 40, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        }),
      );
    }
    if (entryRef.current) {
      entries.push(
        gsap.from(entryRef.current, {
          autoAlpha: 0, y: 80, scale: 0.985, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 92%", once: true },
        }),
      );
    }

    return () => {
      try { tl.scrollTrigger?.kill(); tl.kill(); } catch (_) {}
      entries.forEach((tw) => { try { tw.scrollTrigger?.kill(); tw.kill(); } catch (_) {} });
      tlRef.current = null;
    };
  }, [animOff]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full transition-colors ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}
      aria-labelledby="selected-work-heading"
    >
      {/* Background stars */}
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        alt="" aria-hidden="true"
        src="/figmaAssets/backgroundstars-2.svg"
      />
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.85)_0%,rgba(248,251,255,0.5)_45%,rgba(248,251,255,0.85)_100%)]"
        />
      )}

      {/* Light-mode-only echo of Process Journey's bottom-left glow — same
          continuity technique used at every section seam in light mode, so
          the violet wash reads as carrying through rather than cutting off
          dead at the boundary above. */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[6%] left-[-4%] h-[300px] w-[300px] rounded-full blur-[100px]"
          style={{ backgroundColor: "rgba(124, 58, 237, 0.07)" }}
        />
      )}

      {/* Atmospheric glows — root cause of Issue 2 (traced via getBoundingClientRect
          overlap against the pin stage's rect): all three of these sit directly
          behind the card stack in light mode. Card wrapper opacity (GSAP's STACK
          config, down to 0.25 for the deepest stacked card) composites the whole
          card as one unit before blending over whatever's behind it, so upwards
          of 75-90% of a stacked card's visible pixel was actually THIS glow
          bleeding through, not the card. Light mode gets smaller/fainter
          versions so their reach doesn't extend into the stage; dark mode's
          size/opacity is untouched (dark cards are near-fully transparent glass
          by design, so a tinted glow behind them reads as intended atmosphere,
          not haze — this was never a dark-mode complaint). */}
      <div aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 rounded-full ${
          isLight ? "h-[36vw] w-[36vw] max-h-[440px] max-w-[440px] blur-[140px]" : "h-[55vw] w-[55vw] max-h-[800px] max-w-[800px] blur-[160px]"
        }`}
        style={{ backgroundColor: isLight ? "rgba(29,78,216,0.045)" : "rgba(29,78,216,0.15)" }} />
      <div aria-hidden="true"
        className={`pointer-events-none absolute right-[-8%] top-[22%] rounded-full ${isLight ? "h-[260px] w-[260px] blur-[110px]" : "h-[420px] w-[420px] blur-[120px]"}`}
        style={{ backgroundColor: isLight ? "rgba(124,58,237,0.035)" : "rgba(124,58,237,0.10)" }} />
      <div aria-hidden="true"
        className={`pointer-events-none absolute left-[4%] top-[55%] rounded-full ${isLight ? "h-[180px] w-[180px] blur-[80px]" : "h-[300px] w-[300px] blur-[90px]"}`}
        style={{ backgroundColor: isLight ? "rgba(56,189,248,0.03)" : "rgba(56,189,248,0.08)" }} />

      {/* Edge stars */}
      <SideStars starsPerSide={isCompact ? 6 : 14} className="z-[1]" variant={isLight ? "light" : "dark"} />

      {/* ── Main layout ── */}
      {/*
        Header scrolls normally; below it the pin stage is a full 100vh flex box
        that vertically centers the card stack, so when the pin engages the active
        card sits mid-viewport with symmetric space above and below. The stacked
        cards' bottom strips (y=52/104/156) extend into the lower centering gap.
      */}
      {/* pt/pb give the pinned chapter breathing room on both sides so it
          neither crashes into the previous section nor releases abruptly
          into the next one. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col px-6 pb-[140px] pt-[100px] sm:px-8 lg:px-11 lg:pb-[180px] lg:pt-[130px]">

        {/* ── Section header — kept compact so the stack gets maximum height ── */}
        <header
          ref={headerRef}
          className="flex w-full shrink-0 flex-col items-start justify-between gap-3 lg:flex-row lg:items-end lg:gap-12"
        >
          <div className="flex flex-col items-start">
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[17px] tracking-[1.5px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
              04 / 06
            </p>
            <h2
              id="selected-work-heading"
              className={`pt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.06] tracking-[-0.8px] sm:text-[36px] lg:text-[44px] lg:tracking-[-1.4px] ${
                isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
              }`}
            >
              Selected work shaped
              <br className="hidden sm:block" />
              {" "}from strategy to launch.
            </h2>
          </div>
          <p className={`max-w-[380px] shrink-0 [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[20px] lg:text-[13px] lg:leading-[22px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
            A closer look at websites and digital systems we designed, developed,
            optimized, and launched across export brands, e-commerce platforms,
            and business-focused experiences.
          </p>
        </header>

        {/* ── CARD STACK STAGE ── */}
        {animOff ? (
          /* Tablet / mobile / reduced-motion: static vertical list */
          <div className="mt-6 flex flex-col gap-5 overflow-y-auto pb-8">
            {projects.map((project) => (
              <div
                key={project.label}
                className={`flex min-h-[480px] flex-col overflow-hidden rounded-[24px] border backdrop-blur-sm ${
                  isLight
                    ? "border-[rgba(15,23,42,0.10)] bg-white/70 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                    : "border-white/[0.11] bg-white/[0.05] shadow-[0_32px_100px_rgba(0,0,0,0.6)]"
                }`}
              >
                <div className="flex flex-col p-7">
                  <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.44px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>{project.label}</p>
                  <h3 className={`mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>{project.name}</h3>
                  <p className={`mt-2 text-[12px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>{project.subtitle}</p>
                  <p className={`mt-5 text-[13px] leading-[22px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex h-8 items-center rounded-full border px-3.5 text-[10.5px] leading-none ${
                          isLight ? "border-[rgba(15,23,42,0.12)] bg-[rgba(15,23,42,0.04)] text-[rgba(15,23,42,0.70)]" : "border-white/[0.12] bg-white/[0.05] text-[#f5f7fa99]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`mt-6 flex items-center gap-1.5 text-[12.5px] font-medium transition-colors ${
                      isLight ? "text-[rgba(15,23,42,0.75)] hover:text-[#0f172a]" : "text-[#f5f7fac2] hover:text-[#f5f7fa]"
                    }`}
                  >
                    View Project <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-6">
                  <BrowserMockup name={project.name} domain={project.domain} headerBg={project.headerBg} bodyBg={project.bodyBg} accent={project.accent} navLines={project.navLines} websiteUrl={project.useLivePreview ? project.websiteUrl : null} showLive={previewsReady} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/*
              ── Pin stage ── full-viewport flex box that vertically centers the
              card stack. ScrollTrigger fires at stack "center center", which is
              the exact moment this stage fills the viewport.

              Stack container (stageRef) — explicit height clamp: at least 520px
              (card never tiny), preferably viewport minus 330px (breathing room
              above + peek strips below when centered), capped at 700px.
              overflow:visible everywhere: stacked cards (y=38/74/108) extend
              their clipped bottom-edge strips into the centering gap below the stack.
              Cards are absolute top-0, same size (h-full), controlled by GSAP.
            */}
            <div className="flex min-h-screen w-full items-center justify-center overflow-visible">
            <div
              ref={stageRef}
              className="relative h-[clamp(520px,calc(100vh_-_330px),700px)] w-full overflow-visible"
            >
              {/* Entry wrapper — carries the settle-in transform so the pin
                  trigger (stageRef) keeps clean, transform-free geometry. */}
              <div ref={entryRef} className="absolute inset-0 overflow-visible">
              {projects.map((project, i) => (
                <div
                  key={project.label}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute inset-x-0 top-0 h-full [will-change:transform,opacity,clip-path]"
                  data-testid={`work-card-${i + 1}`}
                >
                  {/*
                    Card shell — glassmorphism surface.
                    overflow-hidden clips child elements to the rounded card boundary.
                    The card must be tall enough (via h-full of the stack container) that
                    no content is hidden by this clip; if it were too short, the CTA would
                    be cut off. The peek spacer guarantees adequate stack height.
                  */}
                  <div
                    className={`relative flex h-full w-full overflow-hidden rounded-[36px] border backdrop-blur-sm transition-colors duration-500 ${
                      isLight
                        // Root cause of the "color haze under the card" complaint:
                        // CSS opacity on the card WRAPPER (GSAP's STACK config,
                        // down to 0.25 for the deepest stacked card) composites the
                        // ENTIRE card — shell background included — as one unit
                        // before blending it over whatever sits behind the stage.
                        // At bg-white/70 with a 0.25 wrapper opacity, the effective
                        // alpha of this card's own white reaching the viewer was
                        // only 0.70*0.25=0.175 — over 80% of the visible pixel was
                        // actually the section's own background glow bleeding
                        // through, not the card at all. Raising the shell's own
                        // base opacity to near-solid (0.70→0.95) cuts most of that
                        // bleed at its source (0.95*0.25=0.2375, ~35% more white)
                        // without changing the STACK y/scale/opacity/clip-path
                        // numbers that create the page-stack effect itself.
                        ? "border-[rgba(15,23,42,0.22)] bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:border-[rgba(2,132,199,0.42)] hover:shadow-[0_0_26px_rgba(2,132,199,0.16),0_0_70px_rgba(2,132,199,0.09),0_18px_50px_rgba(15,23,42,0.08)]"
                        : "border-white/[0.10] bg-white/[0.04] shadow-[0_40px_120px_rgba(0,0,0,0.65)] hover:border-[rgba(56,189,248,0.22)]"
                    }`}
                  >

                    {/*
                      Content wrapper — GSAP drives opacity: 0 (inactive) → 1 (active).
                      opacity-0 hides all readable text for stacked cards; their glass shell
                      remains visible because opacity is on the shell's parent (the card wrapper),
                      not on the shell itself — the content ref controls only content visibility.
                    */}
                    <div
                      ref={(el) => { contentRefs.current[i] = el; }}
                      className="flex h-full w-full flex-col lg:flex-row"
                    >
                      {/* Subtle atmosphere — one soft blue/violet wash, not a
                          decorative panel; clipped to the card's own rounded
                          corners by the shell's overflow-hidden above.
                          Root-cause fix: this used to live as a sibling BEFORE
                          the content wrapper, outside the subtree GSAP toggles
                          via `autoAlpha` — so while a stacked card's readable
                          text correctly vanished (autoAlpha:0 on the content
                          wrapper), this glow sat just outside that wrapper and
                          stayed lit, only dimmed by the card's own opacity
                          (down to as low as 0.25). Its blur (110px) still
                          bled down into the clipped bottom-6% "page edge"
                          strip every stacked card shows, reading as a stray
                          colored wash under the active card instead of a
                          clean edge. Moving it inside the content wrapper
                          ties its visibility to the exact same autoAlpha
                          toggle as the rest of the readable content — it's
                          now only ever visible on the truly active card. */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-1/4 -top-1/4 h-[70%] w-[70%] rounded-full opacity-70 blur-[110px]"
                        style={{
                          background: isLight
                            ? "radial-gradient(circle, rgba(2,132,199,0.07), rgba(124,58,237,0.05) 55%, transparent 78%)"
                            : "radial-gradient(circle, rgba(56,189,248,0.10), rgba(124,58,237,0.06) 55%, transparent 78%)",
                        }}
                      />
                      {/* ── Left column: project info ── */}
                      <div className="flex flex-col justify-between p-10 sm:p-12 lg:w-[42%] lg:p-14 xl:p-16">
                        <div>
                          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[1.44px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
                            {project.label}
                          </p>
                          <h3
                            className={`mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.02] tracking-[-0.8px] sm:text-[34px] lg:text-[44px] lg:tracking-[-1.2px] ${
                              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
                            }`}
                          >
                            {project.name}
                          </h3>
                          <p className={`mt-4 [font-family:'Inter',Helvetica] text-[12px] font-normal leading-[18px] tracking-[0.12px] ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa61]"}`}>
                            {project.subtitle}
                          </p>
                          <p className={`mt-7 max-w-[420px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[24px] ${isLight ? "text-[rgba(15,23,42,0.65)]" : "text-[#f5f7faa6]"}`}>
                            {project.description}
                          </p>
                        </div>

                        {/* Tags + CTA pinned to bottom */}
                        <div className="mt-8">
                          <div className="flex flex-wrap gap-2.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`inline-flex h-9 items-center rounded-full border px-4 [font-family:'Inter',Helvetica] text-[11px] font-normal leading-none ${
                                  isLight ? "border-[rgba(15,23,42,0.12)] bg-[rgba(15,23,42,0.04)] text-[rgba(15,23,42,0.70)]" : "border-white/[0.12] bg-white/[0.05] text-[#f5f7fa99]"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            className={`mt-7 flex items-center gap-2 [font-family:'Inter',Helvetica] text-[13.5px] font-medium leading-[20px] tracking-[0.12px] transition-colors ${
                              isLight ? "text-[rgba(15,23,42,0.75)] hover:text-[#0f172a]" : "text-[#f5f7fac2] hover:text-[#f5f7fa]"
                            }`}
                            data-testid={`btn-view-project-${project.label}`}
                          >
                            View Project
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Vertical divider */}
                      <div className={`hidden w-px shrink-0 lg:block ${isLight ? "bg-[rgba(15,23,42,0.10)]" : "bg-white/[0.08]"}`} />

                      {/* ── Right column: browser preview ── */}
                      <div className="relative flex flex-1 items-center justify-center overflow-visible p-8 sm:p-10 lg:p-12 xl:p-14">
                        {/* Soft blue/violet lighting behind the preview */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div
                            className="h-[70%] w-[80%] rounded-full opacity-70 blur-[110px]"
                            style={{
                              background: isLight
                                ? "radial-gradient(circle, rgba(2,132,199,0.10), rgba(124,58,237,0.08) 55%, transparent 78%)"
                                : "radial-gradient(circle, rgba(56,189,248,0.14), rgba(124,58,237,0.10) 55%, transparent 78%)",
                            }}
                          />
                        </div>
                        <div className="relative w-[94%] max-w-[800px] transition-transform duration-500 [will-change:transform] hover:-translate-y-1.5">
                          <BrowserMockup
                            name={project.name}
                            domain={project.domain}
                            headerBg={project.headerBg}
                            bodyBg={project.bodyBg}
                            accent={project.accent}
                            navLines={project.navLines}
                            websiteUrl={project.useLivePreview ? project.websiteUrl : null}
                            showLive={previewsReady}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
