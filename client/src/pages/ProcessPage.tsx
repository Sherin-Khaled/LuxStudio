import { useReducedMotion, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { SideStars } from "@/components/backgrounds/SideStars";

/* ─── Shared fade-up animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Data ─── */
const flightNodes = [
  { num: "01", label: "Discover" },
  { num: "02", label: "Define" },
  { num: "03", label: "Create" },
  { num: "04", label: "Design" },
  { num: "05", label: "Build & Connect" },
  { num: "06", label: "Optimize, Launch & Support" },
];

const stages = [
  {
    num: "01",
    title: "Discover",
    description:
      "We start by understanding the business, audience, goals, services, products, competitors, and the digital problem the website or system needs to solve.",
    happens: ["Business discovery", "Audience understanding", "Project goals", "Competitor review", "Website purpose", "Initial direction"],
    client: "Client shares business details, current problems, goals, and available references.",
  },
  {
    num: "02",
    title: "Define",
    description:
      "We turn the discovery into structure: sitemap, user journey, page priorities, features, content needs, and the experience direction.",
    happens: ["Sitemap", "User flows", "Page structure", "Feature planning", "Content outline", "Technical direction"],
    client: "Client reviews and approves the structure before visual design begins.",
  },
  {
    num: "03",
    title: "Create",
    description:
      "We prepare the content and visual assets that support the website, including written content, product data, images, graphics, and media direction when needed.",
    happens: ["Website copy", "Content shaping", "Product data", "Image direction", "Photo editing", "Video / graphic support"],
    client: "Client provides business information, numbers, product details, and brand assets. We shape them into website-ready content.",
  },
  {
    num: "04",
    title: "Design",
    description:
      "We design the interface, visual system, responsiveness, interactions, and page experience with both users and development in mind.",
    happens: ["Wireframes", "UI direction", "High-fidelity screens", "Responsive layouts", "Design system", "Motion direction"],
    client: "Client reviews the design, gives feedback, and approves the visual direction before development.",
  },
  {
    num: "05",
    title: "Build & Connect",
    description:
      "We build the frontend, connect backend logic when needed, prepare dashboards, CMS systems, APIs, authentication, product flows, and real business functionality.",
    happens: ["Frontend development", "Backend development", "CMS / dashboard", "APIs", "Authentication", "E-commerce logic", "Database structure"],
    client: "Client tests key flows and confirms that the system behavior matches the business needs.",
  },
  {
    num: "06",
    title: "Optimize, Launch & Support",
    description:
      "We test responsiveness, speed, SEO, accessibility basics, content accuracy, deployment readiness, hosting, and post-launch updates.",
    happens: ["Performance testing", "SEO setup", "Responsive QA", "Accessibility basics", "Hosting / deployment", "Future support"],
    client: "Client gives final approval before launch and can continue with future improvements or maintenance.",
  },
];

const approvalGates = [
  { num: "01", title: "Structure Approval", desc: "Sitemap, pages, user flow, and feature direction are reviewed before design." },
  { num: "02", title: "Design Approval", desc: "Visual direction, layouts, responsiveness, and interaction ideas are approved before development." },
  { num: "03", title: "Build Review", desc: "Core flows, backend behavior, dashboards, CMS, and forms are tested before final polish." },
  { num: "04", title: "Launch Approval", desc: "Speed, SEO, responsiveness, content, and deployment readiness are checked before going live." },
];

const clientInputs = [
  "Business details",
  "Services or product information",
  "Brand assets or references",
  "Photos, videos, or visual material",
  "Target audience information",
  "Website goals",
  "Access to hosting, domain, or existing systems when needed",
  "Feedback and approvals at key stages",
];

const launchChecklist = [
  "Responsive behavior",
  "Speed and performance",
  "SEO structure",
  "Content accuracy",
  "Forms and contact flows",
  "CMS / dashboard access",
  "Image optimization",
  "Hosting and deployment",
  "Basic accessibility",
  "Post-launch updates",
];

/* ─── Section wrapper ─── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative w-full ${className}`}>{children}</section>
);

/* ─── Glass card ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* ─── Page ─── */
export const ProcessPage = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full bg-[#03050a] text-[#f5f7fa] overflow-x-hidden">
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <Section className="flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Stars background */}
        <img className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" alt="" aria-hidden="true" src="/figmaAssets/backgroundstars-2.svg" />
        {/* Glows */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[200px]" style={{ backgroundColor: "rgba(29,78,216,0.18)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-1/3 h-[400px] w-[400px] rounded-full blur-[130px]" style={{ backgroundColor: "rgba(124,58,237,0.12)" }} />
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-6 text-center sm:px-8">
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] text-[#f5f7fa55] uppercase"
          >
            Process
          </motion.p>
          <motion.h1
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
            className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.04] tracking-[-1.4px] text-[#f5f7fa] sm:text-[54px] lg:text-[72px] lg:tracking-[-2.2px]"
          >
            A clear path from<br />idea to launch.
          </motion.h1>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
            className="mt-7 max-w-[600px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
          >
            We guide every project through strategy, content, design, development, testing, and launch — so the final experience feels premium, functional, and ready to grow.
          </motion.p>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
            className="mt-10 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px] text-[#38bdf880]"
          >
            Discovery · Design · Build · Connect · Optimize · Launch
          </motion.p>
        </div>
      </Section>

      {/* ══════════════ FLIGHT PATH OVERVIEW ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[160px]" style={{ backgroundColor: "rgba(56,189,248,0.06)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Flight Path</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Six stages. One connected journey.
            </h2>
          </motion.div>

          {/* Nodes — horizontal on desktop, vertical on mobile */}
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
            {/* Connecting line (desktop) */}
            <div aria-hidden="true" className="absolute left-0 right-0 top-[28px] hidden h-px lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.3) 20%, rgba(56,189,248,0.5) 50%, rgba(56,189,248,0.3) 80%, transparent 100%)" }} />

            {flightNodes.map((node, i) => (
              <motion.div
                key={node.num}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.08} viewport={{ once: true }}
                className="relative flex flex-1 flex-col items-center"
              >
                {/* Connecting line (mobile) */}
                {i < flightNodes.length - 1 && (
                  <div aria-hidden="true" className="absolute left-[27px] top-[56px] h-6 w-px bg-[#38bdf830] lg:hidden" />
                )}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#38bdf840] bg-[#38bdf808] shadow-[0_0_20px_rgba(56,189,248,0.12)]">
                  <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1px] text-[#38bdf8]">{node.num}</span>
                </div>
                <p className="mt-3 text-center [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px] text-[#f5f7faa6]">{node.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════ DETAILED STAGES ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-16"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Stages</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              What happens at each stage.
            </h2>
          </motion.div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical timeline line */}
            <div aria-hidden="true" className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:left-[35px]" />

            {stages.map((stage, i) => (
              <motion.div
                key={stage.num}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.05} viewport={{ once: true, margin: "-60px" }}
                className="relative flex gap-8 pb-12 lg:gap-12 lg:pb-16"
              >
                {/* Stage number dot */}
                <div className="relative shrink-0">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-[#03050a] shadow-[0_0_24px_rgba(56,189,248,0.10)]">
                    <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[1px] text-[#38bdf8]">{stage.num}</span>
                  </div>
                </div>

                {/* Stage content */}
                <div className="flex-1 pt-2">
                  <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium tracking-[-0.5px] text-[#f5f7fa] lg:text-[28px]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 max-w-[580px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[25px] text-[#f5f7faa6]">
                    {stage.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:gap-10">
                    {/* What happens */}
                    <GlassCard className="flex-1 p-6">
                      <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] text-[#f5f7fa55] uppercase">What happens</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.happens.map((item) => (
                          <span key={item} className="rounded-full border border-white/[0.10] bg-white/[0.06] px-3 py-1 [font-family:'Inter',Helvetica] text-[12px] text-[#f5f7fa99]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </GlassCard>

                    {/* Client involvement */}
                    <GlassCard className="flex-1 p-6">
                      <p className="mb-4 [font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.5px] text-[#f5f7fa55] uppercase">Client involvement</p>
                      <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[22px] text-[#f5f7faa6]">
                        {stage.client}
                      </p>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════ APPROVAL GATES ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(56,189,248,0.07)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Collaboration</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Every stage has a clear review point.
            </h2>
            <p className="mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
              We avoid surprises by reviewing the structure, content, design, development, and launch details with the client before moving forward.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {approvalGates.map((gate, i) => (
              <motion.div
                key={gate.num}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.08} viewport={{ once: true, margin: "-40px" }}
              >
                <GlassCard className="p-7 lg:p-8">
                  <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.5px] text-[#38bdf880]">{gate.num}</span>
                  <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] text-[#f5f7fa]">{gate.title}</h3>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[23px] text-[#f5f7faa6]">{gate.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════ WHAT WE NEED ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
              className="lg:w-[42%]"
            >
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Client Inputs</p>
              <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[40px] lg:tracking-[-1.2px]">
                What helps us move faster.
              </h2>
              <p className="mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                The better the starting information, the smoother the strategy, design, and build process becomes.
              </p>
            </motion.div>

            <div className="flex-1">
              <div className="flex flex-col gap-3">
                {clientInputs.map((item, i) => (
                  <motion.div
                    key={item}
                    variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                    className="flex items-start gap-3.5 rounded-xl border border-white/[0.09] bg-white/[0.03] px-5 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf880]" />
                    <span className="[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] text-[#f5f7faa6]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════ LAUNCH CHECKLIST ══════════════ */}
      <Section className="py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">Before Launch</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Launch is part of the process,<br className="hidden lg:block" /> not the end of it.
            </h2>
            <p className="mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
              Before a website goes live, we check the details that affect real performance, visibility, usability, and client confidence.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {launchChecklist.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.05} viewport={{ once: true, margin: "-40px" }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-5 py-4"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
                <span className="[font-family:'Inter',Helvetica] text-[13.5px] font-normal text-[#f5f7faa6]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════ CTA ══════════════ */}
      <Section className="py-24 pb-32 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <GlassCard className="relative overflow-hidden p-10 lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.12)" }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.08] tracking-[-0.9px] text-[#f5f7fa] lg:text-[42px] lg:tracking-[-1.3px]">
                  Ready to move from idea to launch?
                </h2>
                <p className="mt-5 max-w-[480px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                  Tell us what you want to build, and we will shape the right process around your goals, content, design, and technical needs.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact">
                    <button type="button" className="flex items-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90">
                      Start a Project <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="/work">
                    <button type="button" className="flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#f5f7fa] transition-colors hover:bg-white/[0.09]">
                      View Work
                    </button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      <SiteFooterSection />
    </div>
  );
};
