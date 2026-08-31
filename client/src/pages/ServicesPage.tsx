import { useState, useEffect, useRef } from "react";
import { AnimatePresence, useReducedMotion, motion } from "framer-motion";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { useDict } from "@/lib/i18n/useDict";
import { servicesPageDict } from "@/lib/i18n/servicesPage";
import { scrollToHashTarget, SERVICES_DESKTOP_PANEL_ID, SERVICES_LAYERS_ID } from "@/lib/scrollToHash";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { pageMeta, pageBreadcrumbs } from "@/lib/seo/pageMeta";
import servicesHeroBackground from "../../../attached_assets/herosectionofServicespage.webp";

// Non-translatable identifiers/metadata for the services + engagements
// lists. Order matches servicesPageDict's `services`/`engagement.items`
// arrays exactly — translated title/description/handles/bestFor/includes
// text is merged in from the dictionary at render time via useDict.
const serviceIds = ["01", "02", "03", "04", "05", "06"];
// Stable anchor ids the footer's Capabilities column links to
// (/services#ui-ux-design etc.) — index-matched to servicesPageDict.services
// and serviceIds above. "Strategy & Direction" (index 0) has no footer
// capability entry, so it gets no anchor id.
const SERVICE_ANCHOR_IDS = [
  undefined,
  "ui-ux-design",
  "brand-content",
  "web-development",
  "backend-cms-dashboards",
  "seo-performance",
] as const;

const engagementMeta = [
  { id: "website-build", accent: "#38bdf8" },
  { id: "ecommerce", accent: "#a78bfa" },
  { id: "brand-website", accent: "#4ade80" },
  { id: "dashboard-cms", accent: "#f59e0b" },
];

const SequentialGlow = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const [active, setActive] = useState(0);
  const t = useDict(servicesPageDict);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % t.processSteps.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [reduced, t.processSteps.length]);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3"
      aria-label={t.ariaLabels.processFlow}
      role="list"
    >
      {t.processSteps.map((step, i) => (
        <div key={step} className="flex items-center" role="listitem">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-[7px] w-[7px] rounded-full border transition-all duration-500"
              style={{
                borderColor: active === i ? "#38bdf8" : isLight ? "rgba(15,23,42,0.18)" : "#ffffff20",
                background: active === i ? "#38bdf8" : "transparent",
                boxShadow: active === i ? "0 0 10px 3px #38bdf860" : "none",
              }}
            />
            <span
              className="[font-family:'Inter',Helvetica] text-[15px] font-medium tracking-[-0.15px] transition-all duration-500"
              style={{
                color: active === i ? (isLight ? "#0f172a" : "#f5f7fa") : isLight ? "rgba(15,23,42,0.35)" : "#f5f7fa40",
                textShadow: active === i ? "0 0 20px rgba(56,189,248,0.5)" : "none",
              }}
            >
              {step}
            </span>
          </div>
          {i < t.processSteps.length - 1 && (
            <span
              className="mx-3 inline-block [font-family:'Inter',Helvetica] text-[14px] rtl:rotate-180"
              style={{ color: isLight ? "rgba(15,23,42,0.18)" : "#ffffff14" }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const ServiceConstellationSection = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [cycleRestart, setCycleRestart] = useState(0);
  const t = useDict(servicesPageDict);
  const services = serviceIds.map((id, i) => ({ id, ...t.services[i] }));

  useEffect(() => {
    if (reduced || isAutoPaused) return;

    const timer = window.setInterval(() => {
      setActiveIdx((current) => (current + 1) % services.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [reduced, isAutoPaused, cycleRestart]);

  const selectService = (index: number) => {
    setActiveIdx(index);
    setCycleRestart((current) => current + 1);
  };

  // Footer's Capabilities links land on /services#<slug>: this component
  // owns which service is "active" (the desktop view is a single crossfading
  // panel, not separately-scrollable sections), so it independently checks
  // the hash on mount and jumps straight to the matching service rather than
  // leaving whatever the 3s auto-cycle happened to land on. The custom event
  // covers the same-page case (footer capability link clicked while already
  // on /services) — a pushState-only URL change wouldn't fire anything here
  // on its own, since the pathname never changes.
  useEffect(() => {
    const selectFromSlug = (slug: string) => {
      const idx = SERVICE_ANCHOR_IDS.indexOf(slug as (typeof SERVICE_ANCHOR_IDS)[number]);
      if (idx !== -1) selectService(idx);
    };
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) selectFromSlug(hash);

    const onSelectEvent = (e: Event) => selectFromSlug((e as CustomEvent<string>).detail);
    window.addEventListener("lux:select-service", onSelectEvent);
    return () => window.removeEventListener("lux:select-service", onSelectEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduced) {
    return (
      <section
        id={SERVICES_LAYERS_ID}
        className="w-full scroll-mt-[110px] px-4 py-16 sm:px-6 lg:px-12"
        aria-label={t.ariaLabels.reducedMotionList}
      >
        <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
          {services.map((s, i) => (
            <div
              key={s.id}
              id={SERVICE_ANCHOR_IDS[i]}
              className={`rounded-2xl border p-8 ${
                isLight
                  ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.75)] shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  : "border-[#38bdf820] bg-[#060e1c]"
              }`}
              data-testid={`service-panel-${s.id}`}
            >
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.3px] text-sky-400 uppercase mb-2">{s.id}</p>
              <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-semibold tracking-[-0.6px] mb-3 ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>{s.title}</h3>
              <p className={`[font-family:'Inter',Helvetica] text-[15px] leading-[26px] mb-4 ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.handles.map((h) => (
                  <span
                    key={h}
                    className={`rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[12px] ${
                      isLight
                        ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.06)] text-[rgba(15,23,42,0.68)]"
                        : "border-[#ffffff10] bg-[#ffffff06] text-[#f5f7fa70]"
                    }`}
                  >
                    {h}
                  </span>
                ))}
              </div>
              <p className={`[font-family:'Inter',Helvetica] text-[13px] italic ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa50]"}`}>{s.bestFor}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const activeService = services[activeIdx]!;

  return (
    <section
      id={SERVICES_DESKTOP_PANEL_ID}
      className="relative hidden scroll-mt-[110px] px-12 py-12 lg:block xl:px-20"
      aria-label={t.ariaLabels.constellation}
    >
      {/* overflow-hidden contains the two ambient blur blobs below so they
          don't bleed oddly into neighboring sections in dark mode — a real
          need there. But the right-panel card (deep inside this box) sits
          flush against this wrapper's own right edge with zero horizontal
          slack, so its light-mode hover shadow was getting clipped on that
          side even after fixing the closer wrapper. `.hover-bleed-safe`
          (index.css) only flips this to overflow-visible in light mode; the
          blobs stay contained in dark mode exactly as before, and in light
          mode any bleed is an already near-invisible ~2-3% opacity glow onto
          a page that's the same flat #F8FBFF on both sides of this section. */}
      <div className={`hover-bleed-safe relative min-h-[620px] overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/2 h-[500px] w-[400px] -translate-y-1/2 rounded-full bg-[#38bdf808] blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[350px] rounded-full bg-[#7c3aed06] blur-[100px]" />
        </div>

        <div className="relative z-10 flex min-h-[620px] items-center">
          <div className="mx-auto grid w-full max-w-[1300px] grid-cols-[280px_1fr] gap-12 xl:gap-20">
            {/* Left: service index */}
            <div className="flex flex-col justify-center gap-3">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  data-testid={`service-nav-${s.id}`}
                  onClick={() => selectService(i)}
                  className="flex items-center gap-3 text-start transition-all duration-300"
                >
                  <span
                    className="h-[6px] w-[6px] rounded-full transition-all duration-400 shrink-0"
                    style={{
                      background: activeIdx === i ? "#38bdf8" : isLight ? "rgba(15,23,42,0.16)" : "#ffffff18",
                      boxShadow: activeIdx === i ? "0 0 8px 2px #38bdf870" : "none",
                    }}
                  />
                  <span
                    className="[font-family:'Inter',Helvetica] text-[14px] font-medium leading-[20px] transition-all duration-300"
                    style={{
                      color: activeIdx === i
                        ? (isLight ? "#0284c7" : "#f5f7fa")
                        : (isLight ? "rgba(15,23,42,0.45)" : "#f5f7fa30"),
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: active service panel. overflow-hidden here contains
                the AnimatePresence x-slide transition (cards enter/exit at
                +72/-36px) so an off-screen slide doesn't visibly spill past
                this column — that's a real layout need, not a leftover bug.
                But it also clipped the card's own hover shadow/glow/scale in
                light mode, since the card sits flush against this boundary
                with no breathing room. `.hover-bleed-safe` (see index.css)
                switches this to overflow-visible in light mode only; dark
                mode keeps the original hard clip untouched. */}
            <div
              className={`hover-bleed-safe relative flex min-h-[540px] items-center overflow-hidden pr-6 lg:pr-12`}
              onMouseEnter={() => setIsAutoPaused(true)}
              onMouseLeave={() => setIsAutoPaused(false)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeService.id}
                  data-testid={`service-panel-${activeService.id}`}
                  initial={{ opacity: 0, x: 72 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -36 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center"
                  style={{
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div
                    tabIndex={0}
                    className={`group relative w-full overflow-hidden rounded-3xl border p-10 outline-none xl:p-12 ${
                      isLight
                        ? "lux-glass-hover-card backdrop-blur-md"
                        : "border-[#38bdf825] shadow-[0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1),transform_600ms_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.015] hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08),0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] focus-visible:-translate-y-1 focus-visible:scale-[1.015] focus-visible:border-[rgba(56,189,248,0.45)] focus-visible:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08),0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100"
                    }`}
                    style={
                      isLight
                        ? undefined
                        : { background: "linear-gradient(135deg, #070f1c 0%, #03050a 100%)" }
                    }
                  >
                    {/* Gradient overlay — Stripe-style blended color, hidden until hover/focus (same as About value cards) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 opacity-0 [transition:opacity_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(124,58,237,0.18), transparent 40%), linear-gradient(135deg, rgba(56,189,248,0.08), rgba(124,58,237,0.08))",
                      }}
                    />

                    {/* Decorative mini bar chart — same effect as About value cards */}
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-6 right-8 z-0 flex items-end gap-[3px]">
                      {[18, 34, 26, 52, 40, 72, 46, 60, 28].map((h, bi) => (
                        <div
                          key={bi}
                          className={`w-[3px] origin-bottom rounded-t-sm opacity-0 ${reduced ? "" : "scale-y-0"} [transition:opacity_500ms_ease,transform_700ms_cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 ${reduced ? "" : "group-hover:scale-y-100 group-focus-visible:scale-y-100"}`}
                          style={{
                            height: `${h}px`,
                            backgroundColor: "rgba(56,189,248,0.65)",
                            boxShadow: "0 0 12px rgba(56,189,248,0.35)",
                            transitionDelay: reduced ? "0ms" : `${bi * 60}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                      <div>
                        <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.5px] text-sky-400 uppercase mb-3">
                          {activeService.id}
                        </p>
                        <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-semibold leading-[1.05] tracking-[-1.2px] xl:text-[48px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                          {activeService.title}
                        </h3>
                      </div>
                      <p className={`max-w-[560px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>
                        {activeService.description}
                      </p>
                      <div>
                        <p className={`mb-3 [font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa40]"}`}>
                          {t.serviceLabels.whatWeHandle}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeService.handles.map((h) => (
                            <span
                              key={h}
                              className={`rounded-full border px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-normal ${
                                isLight
                                  ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.06)] text-sky-700"
                                  : "border-[#38bdf818] bg-[#38bdf808] text-[#f5f7faa0]"
                              }`}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`border-t pt-5 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-[#ffffff0a]"}`}>
                        <p className={`mb-1 [font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa40]"}`}>
                          {t.serviceLabels.bestFor}
                        </p>
                        <p className={`[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] tracking-[0] italic ${isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa60]"}`}>
                          {activeService.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesMobileList = ({ isLight, reduced }: { isLight: boolean; reduced: boolean }) => {
  const t = useDict(servicesPageDict);
  const services = serviceIds.map((id, i) => ({ id, ...t.services[i] }));

  return (
  <section
    id={reduced ? undefined : SERVICES_LAYERS_ID}
    className="w-full scroll-mt-[110px] px-4 py-8 sm:px-6 lg:hidden"
    aria-label={t.ariaLabels.servicesList}
  >
    <div className="mx-auto max-w-[860px] flex flex-col gap-5">
      {services.map((s, i) => (
        <div
          key={s.id}
          id={SERVICE_ANCHOR_IDS[i]}
          data-testid={`service-panel-mobile-${s.id}`}
          className={`rounded-2xl border p-7 ${
            isLight
              ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.75)] shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md"
              : "border-[#38bdf818] bg-[#060e1c] shadow-[0px_0px_30px_#00000040]"
          }`}
        >
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.3px] text-sky-400 uppercase mb-2">{s.id}</p>
          <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[24px] font-semibold tracking-[-0.6px] mb-3 ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>{s.title}</h3>
          <p className={`[font-family:'Inter',Helvetica] text-[14px] leading-[24px] mb-4 ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"}`}>{s.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.handles.map((h) => (
              <span
                key={h}
                className={`rounded-full border px-3 py-1 [font-family:'Inter',Helvetica] text-[11.5px] ${
                  isLight
                    ? "border-[rgba(56,189,248,0.30)] bg-[rgba(56,189,248,0.06)] text-sky-700"
                    : "border-[#38bdf818] bg-[#38bdf808] text-[#f5f7fa80]"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
          <p className={`[font-family:'Inter',Helvetica] text-[12px] italic ${isLight ? "text-[rgba(15,23,42,0.50)]" : "text-[#f5f7fa50]"}`}>{s.bestFor}</p>
        </div>
      ))}
    </div>
  </section>
  );
};

const EngagementSection = ({ reduced, isLight }: { reduced: boolean; isLight: boolean }) => {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const t = useDict(servicesPageDict);
  const engagements = engagementMeta.map((meta, i) => ({ ...meta, ...t.engagement.items[i] }));

  useEffect(() => {
    if (reduced) {
      setVisible(4);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(4);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);

  const delays = [0, 0.15, 0.3, 0.45];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-12 xl:px-20"
      aria-label={t.ariaLabels.engagementTypes}
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.5px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa40]"}`}>
            {t.engagement.eyebrow}
          </p>
          <h2 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-semibold leading-[1.1] tracking-[-1px] sm:text-[48px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
            {t.engagement.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {engagements.map((eng, i) => (
            <motion.div
              key={eng.id}
              data-testid={`card-engagement-${eng.id}`}
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              animate={visible > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: delays[i], ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl border p-6 ${
                isLight
                  ? "bg-[rgba(255,255,255,0.75)] shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md"
                  : "border-[#ffffff0e] bg-[#060b17] shadow-[0px_0px_30px_#00000040]"
              }`}
              style={{ borderColor: isLight ? `${eng.accent}40` : `${eng.accent}18` }}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-[200px] w-[200px] rounded-full blur-[80px] opacity-30"
                style={{ background: eng.accent }}
              />
              <div className="relative z-10 flex flex-col gap-4 h-full">
                <div
                  className="h-1 w-8 rounded-full"
                  style={{ background: eng.accent }}
                />
                <h3 className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                  {eng.title}
                </h3>
                <p className={`[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] ${isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7fa70]"}`}>
                  {eng.description}
                </p>
                <div className="mt-auto">
                  <p className={`mb-2 [font-family:'JetBrains_Mono',Helvetica] text-[9px] tracking-[1px] uppercase ${isLight ? "text-[rgba(15,23,42,0.40)]" : "text-[#f5f7fa30]"}`}>
                    {t.engagement.includesLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {eng.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-2.5 py-0.5 [font-family:'Inter',Helvetica] text-[11px]"
                        style={
                          isLight
                            ? { borderColor: `${eng.accent}35`, color: "rgba(15,23,42,0.68)", background: `${eng.accent}0e` }
                            : { borderColor: `${eng.accent}25`, color: `${eng.accent}cc`, background: `${eng.accent}08` }
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export const ServicesPage = () => {
  useSEO(pageMeta.services);
  useJSONLD("breadcrumb", buildBreadcrumbSchema(pageBreadcrumbs.services));
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const t = useDict(servicesPageDict);

  // Landed here via a footer Capabilities link (/services#<slug>) — scroll
  // to that section once it's actually in the DOM, offset for the sticky
  // navbar. ScrollToTop (mounted once at the app root) resets scroll to 0
  // first on this same navigation; this effect runs after and takes over
  // with the smooth scroll to the real target.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) scrollToHashTarget(hash);
  }, []);

  return (
    <main className={`w-full overflow-x-clip ${isLight ? "bg-[#F8FBFF]" : ""}`} data-testid="page-services">
      <div className="page-content-layer">

      {/* Hero */}
      <section
        className="relative min-h-[600px] w-full overflow-hidden pt-[80px]"
        aria-label={t.ariaLabels.hero}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${servicesHeroBackground})` }}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,5,10,0.52)_0%,rgba(3,5,10,0.40)_42%,rgba(3,5,10,0.58)_80%,rgba(3,5,10,1)_100%)]" />
        <StarsBackground count={84} tabletCount={58} mobileCount={36} motion="drift" className="z-[2]" />

        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0 z-[3]">
          <div className="absolute left-1/2 top-[25%] h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-[#1d4ed814] blur-[150px]" />
          <div className="absolute left-[30%] top-[10%] h-[200px] w-[300px] rounded-full bg-[#7c3aed0c] blur-[100px]" />
        </div>

        <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-6 pb-[80px] pt-[120px] text-center">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <p
              className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.8px] uppercase"
              style={{ color: "var(--hero-eyebrow-text-fixed)", textShadow: "var(--hero-eyebrow-text-fixed-shadow)" }}
            >
              {t.hero.eyebrow}
            </p>
            <h1 className="max-w-[860px] [font-family:'Bricolage_Grotesque',Helvetica] text-[46px] font-semibold leading-[0.97] tracking-[-1.6px] text-[#f5f7fa] sm:text-[68px] sm:tracking-[-2.2px] lg:text-[88px] lg:tracking-[-2.64px]">
              {t.hero.heading}
            </h1>
            <p className="max-w-[620px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[29px] tracking-[0.1px] text-[#f5f7faad]">
              {t.hero.subheading}
            </p>
            <p
              className="[font-family:'Inter',Helvetica] text-[13px] font-normal tracking-[0.13px] mb-36"
              style={{ color: "var(--hero-accent-text-fixed)", textShadow: "var(--hero-accent-text-fixed-shadow)" }}
            >
              {t.hero.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Operating System Overview */}
      <section
        className={`relative w-full overflow-hidden border-y py-16
           ${
          isLight ? "border-[rgba(15,23,42,0.08)] bg-[#F8FBFF]" : "border-[#ffffff0f] bg-[#03050a]"
        }
        `}
        aria-label={t.ariaLabels.operatingSystem}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf805] blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-6">
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.5px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa30]"}`}>
            {t.operatingSystem.eyebrow}
          </p>
          <p className={`[font-family:'Inter',Helvetica] text-[14px] font-normal tracking-[0] text-center max-w-[440px] ${isLight ? "text-[rgba(15,23,42,0.60)]" : "text-[#f5f7fa50]"}`}>
            {t.operatingSystem.tagline}
          </p>
          <SequentialGlow reduced={reduced} isLight={isLight} />
        </div>
      </section>

      {/* Service Constellation — desktop pinned */}
      <ServiceConstellationSection reduced={reduced} isLight={isLight} />

      {/* Service list — mobile */}
      <ServicesMobileList isLight={isLight} reduced={reduced} />

      {/* Engagement Types */}
      <EngagementSection reduced={reduced} isLight={isLight} />

      {/* Connected Services Strip */}
      <section
        className={`relative w-full overflow-hidden border-y py-12 ${
          isLight ? "border-[rgba(15,23,42,0.08)] bg-[#F8FBFF]" : "border-[#ffffff0a] bg-[#03050a]"
        }`}
        aria-label={t.ariaLabels.connectedServices}
      >
        <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-4 px-6">
          <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.5px] uppercase ${isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa30]"}`}>
            {t.operatingSystem.tagline}
          </p>
          <SequentialGlow reduced={reduced} isLight={isLight} />
        </div>
      </section>

      <FinalCtaSection
        eyebrow={t.cta.eyebrow}
        heading={t.cta.heading}
        description={t.cta.description}
        secondaryLabel={t.cta.secondaryLabel}
        secondaryHref="/work"
        primaryTestId="button-services-cta-start"
        secondaryTestId="button-services-cta-work"
      />

      </div>
      <FooterRevealStage />
    </main>
  );
};
