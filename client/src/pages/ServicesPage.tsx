import { useState, useEffect, useRef } from "react";
import { AnimatePresence, useReducedMotion, motion } from "framer-motion";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import servicesHeroBackground from "../../../attached_assets/herosectionofServicespage.jpg";

const processSteps = [
  "Strategy",
  "Content",
  "Design",
  "Development",
  "Systems",
  "Launch",
];

const services = [
  {
    id: "01",
    title: "Strategy & Direction",
    description:
      "We define the project purpose, audience, structure, and digital direction before designing screens or writing code.",
    handles: [
      "Discovery",
      "Website strategy",
      "User flows",
      "Content structure",
      "Feature planning",
      "Competitor review",
    ],
    bestFor: "Brands that need clarity before starting the design or build.",
  },
  {
    id: "02",
    title: "UI/UX Design",
    description:
      "We design clear, premium interfaces that balance beauty, usability, responsiveness, and real development requirements.",
    handles: [
      "User experience",
      "Interface design",
      "Wireframes",
      "High-fidelity screens",
      "Design systems",
      "Responsive layouts",
    ],
    bestFor:
      "Businesses that need a polished experience users can understand and trust.",
  },
  {
    id: "03",
    title: "Brand & Content Experience",
    description:
      "We shape the words, visuals, and creative direction that help the website feel aligned with the business behind it.",
    handles: [
      "Website content",
      "Visual direction",
      "Graphic assets",
      "Photography support",
      "Image editing",
      "Video editing",
      "Brand consistency",
    ],
    bestFor:
      "Projects that need more than layout — they need a complete visual and content experience.",
  },
  {
    id: "04",
    title: "Frontend Development",
    description:
      "We build responsive, high-performance interfaces with clean structure, smooth interaction, and a premium experience across screen sizes.",
    handles: [
      "React / Next.js",
      "Responsive development",
      "Scroll motion",
      "Pinned storytelling sections",
      "Component systems",
      "Performance-focused UI",
    ],
    bestFor:
      "Websites that need to feel fast, modern, smooth, and ready for real users.",
  },
  {
    id: "05",
    title: "Backend, CMS & Dashboards",
    description:
      "We build the systems behind the website so teams can manage content, products, users, requests, files, and business data.",
    handles: [
      "Backend logic",
      "Admin dashboards",
      "CMS platforms",
      "Product management",
      "API integrations",
      "Database structure",
      "Authentication",
    ],
    bestFor:
      "Businesses that need control, scalability, and real system functionality behind the website.",
  },
  {
    id: "06",
    title: "SEO, Performance & Launch",
    description:
      "We prepare the website for launch with speed, responsiveness, SEO structure, accessibility, testing, deployment, and future support in mind.",
    handles: [
      "Technical SEO",
      "Performance checks",
      "Responsive testing",
      "Accessibility basics",
      "Deployment",
      "Hosting setup",
      "Future updates",
    ],
    bestFor:
      "Brands that want the website to look premium, load fast, and launch properly.",
  },
];

const engagements = [
  {
    id: "website-build",
    title: "Website Build",
    description:
      "For businesses that need a premium marketing website with strong structure, responsive design, motion, performance, and launch support.",
    includes: ["Strategy", "UI/UX", "Frontend", "Content", "SEO", "Launch"],
    accent: "#38bdf8",
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    description:
      "For brands that need a professional online store with product structure, browsing, cart, checkout, backend logic, and scalable content management.",
    includes: ["UI/UX", "Frontend", "Backend", "Products", "Checkout", "Performance"],
    accent: "#a78bfa",
  },
  {
    id: "brand-website",
    title: "Brand + Website Experience",
    description:
      "For businesses that need visual direction, content, image editing, motion details, and a website experience that feels aligned with the brand.",
    includes: ["Brand Direction", "Content", "Visual Assets", "UI/UX", "Frontend", "Motion"],
    accent: "#4ade80",
  },
  {
    id: "dashboard-cms",
    title: "Dashboard / CMS System",
    description:
      "For teams that need to manage content, requests, products, users, files, data, or internal workflows from a clear digital system.",
    includes: ["Backend", "CMS", "Dashboard", "Database", "Authentication", "APIs"],
    accent: "#f59e0b",
  },
];

const SequentialGlow = ({ reduced }: { reduced: boolean }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-0 gap-y-3"
      aria-label="Service process flow"
      role="list"
    >
      {processSteps.map((step, i) => (
        <div key={step} className="flex items-center" role="listitem">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-[7px] w-[7px] rounded-full border transition-all duration-500"
              style={{
                borderColor: active === i ? "#38bdf8" : "#ffffff20",
                background: active === i ? "#38bdf8" : "transparent",
                boxShadow: active === i ? "0 0 10px 3px #38bdf860" : "none",
              }}
            />
            <span
              className="[font-family:'Inter',Helvetica] text-[15px] font-medium tracking-[-0.15px] transition-all duration-500"
              style={{
                color: active === i ? "#f5f7fa" : "#f5f7fa40",
                textShadow: active === i ? "0 0 20px rgba(56,189,248,0.5)" : "none",
              }}
            >
              {step}
            </span>
          </div>
          {i < processSteps.length - 1 && (
            <span className="mx-3 [font-family:'Inter',Helvetica] text-[14px] text-[#ffffff14]">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const ServiceConstellationSection = ({ reduced }: { reduced: boolean }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [cycleRestart, setCycleRestart] = useState(0);

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

  if (reduced) {
    return (
      <section className="w-full px-4 py-16 sm:px-6 lg:px-12" aria-label="Services">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-[#38bdf820] bg-[#060e1c] p-8"
              data-testid={`service-panel-${s.id}`}
            >
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.3px] text-sky-400 uppercase mb-2">{s.id}</p>
              <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-semibold tracking-[-0.6px] text-[#f5f7fa] mb-3">{s.title}</h3>
              <p className="[font-family:'Inter',Helvetica] text-[15px] leading-[26px] text-[#f5f7faa6] mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.handles.map((h) => (
                  <span key={h} className="rounded-full border border-[#ffffff10] bg-[#ffffff06] px-3 py-1 [font-family:'Inter',Helvetica] text-[12px] text-[#f5f7fa70]">{h}</span>
                ))}
              </div>
              <p className="[font-family:'Inter',Helvetica] text-[13px] text-[#f5f7fa50] italic">{s.bestFor}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const activeService = services[activeIdx]!;

  return (
    <section
      className="relative hidden px-12 py-12 lg:block xl:px-20"
      aria-label="Services constellation"
    >
      <div className="relative min-h-[620px] overflow-hidden">
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
                  className="flex items-center gap-3 text-left transition-all duration-300"
                >
                  <span
                    className="h-[6px] w-[6px] rounded-full transition-all duration-400 shrink-0"
                    style={{
                      background: activeIdx === i ? "#38bdf8" : "#ffffff18",
                      boxShadow: activeIdx === i ? "0 0 8px 2px #38bdf870" : "none",
                    }}
                  />
                  <span
                    className="[font-family:'Inter',Helvetica] text-[14px] font-medium leading-[20px] transition-all duration-300"
                    style={{
                      color: activeIdx === i ? "#f5f7fa" : "#f5f7fa30",
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: active service panel */}
            <div
              className="relative flex min-h-[540px] items-center overflow-hidden"
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
                    className="group relative w-full overflow-hidden rounded-3xl border border-[#38bdf825] p-10 shadow-[0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] outline-none [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1),transform_600ms_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.015] hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08),0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] focus-visible:-translate-y-1 focus-visible:scale-[1.015] focus-visible:border-[rgba(56,189,248,0.45)] focus-visible:shadow-[0_0_24px_rgba(56,189,248,0.18),0_0_70px_rgba(56,189,248,0.08),0_0_0_1px_#38bdf815,0_0_40px_#38bdf808] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 xl:p-12"
                    style={{
                      background: "linear-gradient(135deg, #070f1c 0%, #03050a 100%)",
                    }}
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
                        <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-semibold leading-[1.05] tracking-[-1.2px] text-[#f5f7fa] xl:text-[48px]">
                          {activeService.title}
                        </h3>
                      </div>
                      <p className="max-w-[560px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] tracking-[0] text-[#f5f7faa6]">
                        {activeService.description}
                      </p>
                      <div>
                        <p className="mb-3 [font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] text-[#f5f7fa40] uppercase">
                          What we handle
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeService.handles.map((h) => (
                            <span
                              key={h}
                              className="rounded-full border border-[#38bdf818] bg-[#38bdf808] px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-normal text-[#f5f7faa0]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-[#ffffff0a] pt-5">
                        <p className="mb-1 [font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] text-[#f5f7fa40] uppercase">
                          Best for
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] tracking-[0] text-[#f5f7fa60] italic">
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

const ServicesMobileList = () => (
  <section className="w-full px-4 py-8 sm:px-6 lg:hidden" aria-label="Services list">
    <div className="mx-auto max-w-[860px] flex flex-col gap-5">
      {services.map((s) => (
        <div
          key={s.id}
          data-testid={`service-panel-mobile-${s.id}`}
          className="rounded-2xl border border-[#38bdf818] bg-[#060e1c] p-7 shadow-[0px_0px_30px_#00000040]"
        >
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.3px] text-sky-400 uppercase mb-2">{s.id}</p>
          <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[24px] font-semibold tracking-[-0.6px] text-[#f5f7fa] mb-3">{s.title}</h3>
          <p className="[font-family:'Inter',Helvetica] text-[14px] leading-[24px] text-[#f5f7faa6] mb-4">{s.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.handles.map((h) => (
              <span key={h} className="rounded-full border border-[#38bdf818] bg-[#38bdf808] px-3 py-1 [font-family:'Inter',Helvetica] text-[11.5px] text-[#f5f7fa80]">{h}</span>
            ))}
          </div>
          <p className="[font-family:'Inter',Helvetica] text-[12px] text-[#f5f7fa50] italic">{s.bestFor}</p>
        </div>
      ))}
    </div>
  </section>
);

const EngagementSection = ({ reduced }: { reduced: boolean }) => {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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
      aria-label="Engagement types"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.5px] text-[#f5f7fa40] uppercase">
            How we work together
          </p>
          <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-semibold leading-[1.1] tracking-[-1px] text-[#f5f7fa] sm:text-[48px]">
            Choose your engagement type.
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
              className="relative overflow-hidden rounded-2xl border border-[#ffffff0e] bg-[#060b17] p-6 shadow-[0px_0px_30px_#00000040]"
              style={{ borderColor: `${eng.accent}18` }}
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
                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-semibold leading-[1.2] tracking-[-0.5px] text-[#f5f7fa]">
                  {eng.title}
                </h3>
                <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] tracking-[0] text-[#f5f7fa70]">
                  {eng.description}
                </p>
                <div className="mt-auto">
                  <p className="mb-2 [font-family:'JetBrains_Mono',Helvetica] text-[9px] tracking-[1px] text-[#f5f7fa30] uppercase">
                    Includes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {eng.includes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border px-2.5 py-0.5 [font-family:'Inter',Helvetica] text-[11px]"
                        style={{
                          borderColor: `${eng.accent}25`,
                          color: `${eng.accent}cc`,
                          background: `${eng.accent}08`,
                        }}
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
  const reduced = useReducedMotion() ?? false;
  const { openProjectModal } = useProjectModal();

  return (
    <main className="w-full overflow-x-hidden" data-testid="page-services">

      {/* Hero */}
      <section
        className="relative min-h-[600px] w-full overflow-hidden pt-[80px]"
        aria-label="Services hero"
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
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.8px] text-[#f5f7fa61] uppercase">
              Services
            </p>
            <h1 className="max-w-[860px] [font-family:'Bricolage_Grotesque',Helvetica] text-[46px] font-semibold leading-[0.97] tracking-[-1.6px] text-[#f5f7fa] sm:text-[68px] sm:tracking-[-2.2px] lg:text-[88px] lg:tracking-[-2.64px]">
              Services built as one connected system.
            </h1>
            <p className="max-w-[620px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[29px] tracking-[0.1px] text-[#f5f7faad]">
              From strategy and content to UI/UX, development, dashboards,
              SEO, and launch support — every service is shaped to work
              together, not separately.
            </p>
            <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal tracking-[0.13px] text-[#f5f7fa38]">
              Strategy · Design · Content · Development · Systems · Launch
            </p>
          </motion.div>
        </div>
      </section>

      {/* Operating System Overview */}
      <section
        className="relative w-full overflow-hidden border-y border-[#ffffff0f] bg-[#03050a] py-14"
        aria-label="Operating system overview"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf805] blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-6">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.5px] text-[#f5f7fa30] uppercase">
            The Lux Studio Operating System
          </p>
          <p className="[font-family:'Inter',Helvetica] text-[14px] font-normal tracking-[0] text-[#f5f7fa50] text-center max-w-[440px]">
            One connected process, not disconnected tasks.
          </p>
          <SequentialGlow reduced={reduced} />
        </div>
      </section>

      {/* Service Constellation — desktop pinned */}
      <ServiceConstellationSection reduced={reduced} />

      {/* Service list — mobile */}
      <ServicesMobileList />

      {/* Engagement Types */}
      <EngagementSection reduced={reduced} />

      {/* Connected Services Strip */}
      <section
        className="relative w-full overflow-hidden border-y border-[#ffffff0a] bg-[#03050a] py-12"
        aria-label="Connected services"
      >
        <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-4 px-6">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.5px] text-[#f5f7fa30] uppercase">
            One connected process, not disconnected tasks.
          </p>
          <SequentialGlow reduced={reduced} />
        </div>
      </section>

      {/* Services CTA */}
      <section
        className="relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-12"
        aria-label="Services CTA"
      >
        <motion.div
          variants={fadeUp}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[860px]"
        >
          <div className="work-cta-orbit-border relative overflow-hidden rounded-3xl border border-[#38bdf820] bg-[#060e1c] p-10 text-center shadow-[0px_0px_60px_#00000050] sm:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#38bdf80a] blur-[100px]" />
              {!reduced &&
                Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-float-star absolute h-[2px] w-[2px] rounded-full bg-sky-300/70"
                    style={{
                      left: `${10 + i * 11}%`,
                      bottom: `${20 + (i % 3) * 20}%`,
                      "--duration": `${3 + i * 0.7}s`,
                      "--delay": `${i * 0.5}s`,
                    } as React.CSSProperties}
                  />
                ))}
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.5px] text-[#38bdf880] uppercase">
                Get Started
              </p>
              <h2 className="max-w-[580px] [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-semibold leading-[1.1] tracking-[-0.9px] text-[#f5f7fa] sm:text-[40px]">
                Need the full system or only one layer?
              </h2>
              <p className="max-w-[480px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[27px] tracking-[0] text-[#f5f7faad]">
                Tell us what you want to build, and we will shape the right
                strategy, design, and technical direction around it.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  type="button"
                  onClick={openProjectModal}
                  data-testid="button-services-cta-start"
                  className="h-auto rounded-full bg-[#f5f7fa] px-8 py-[14px] shadow-[0px_4px_20px_#00000052] hover:bg-[#f5f7fa]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12]">
                    Start a Project →
                  </span>
                </Button>
                <Link href="/work">
                  <Button
                    type="button"
                    data-testid="button-services-cta-work"
                    variant="outline"
                    className="h-auto rounded-full border-[0.8px] border-[#f5f7fa26] bg-[#f5f7fa0a] px-8 py-[14px] text-[#f5f7fa] hover:bg-[#f5f7fa14] hover:text-[#f5f7fa]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-[14px] font-normal">
                      View Work
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SiteFooterSection />
    </main>
  );
};
