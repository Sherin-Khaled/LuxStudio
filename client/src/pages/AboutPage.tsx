import { useReducedMotion, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { SideStars } from "@/components/backgrounds/SideStars";

/* ─── Shared fade-up animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Data ─── */
const values = [
  { num: "01", title: "Creativity", desc: "We shape digital experiences with strong visual direction and memorable details." },
  { num: "02", title: "Innovation", desc: "We use modern tools, motion, and systems to create work that feels current and scalable." },
  { num: "03", title: "Excellence", desc: "We care about spacing, structure, responsiveness, performance, and final polish." },
  { num: "04", title: "Partnership", desc: "We work with clients through clear stages, feedback, approvals, and collaboration." },
  { num: "05", title: "Performance", desc: "We build with speed, SEO, accessibility basics, and real user experience in mind." },
];

const studioLayers = [
  "Strategy", "Content", "Structure", "Design",
  "Frontend", "Backend", "CMS", "Dashboards",
  "SEO", "Performance", "Motion", "Systems", "Launch",
];

/* ─── Glass card ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* ─── Page ─── */
export const AboutPage = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full bg-[#03050a] text-[#f5f7fa] overflow-x-hidden">
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20">
        <img className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" alt="" aria-hidden="true" src="/figmaAssets/backgroundstars-2.svg" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[80vw] w-[80vw] max-h-[1000px] max-w-[1000px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[200px]" style={{ backgroundColor: "rgba(29,78,216,0.16)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-8%] top-1/3 h-[440px] w-[440px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.12)" }} />
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: hero text */}
            <div className="flex-1">
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
                className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] text-[#f5f7fa55] uppercase"
              >
                About Lux Studio
              </motion.p>
              <motion.h1
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
                className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-medium leading-[1.04] tracking-[-1.3px] text-[#f5f7fa] sm:text-[50px] lg:text-[64px] lg:tracking-[-2px]"
              >
                Where creative direction meets technical execution.
              </motion.h1>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
                className="mt-7 max-w-[520px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
              >
                Lux Studio is built to connect strategy, content, design, development, systems, and launch into one complete digital experience — shaped with care, clarity, and a premium eye for detail.
              </motion.p>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
                className="mt-9 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px] text-[#38bdf880]"
              >
                Creative Technology Studio · Design · Systems · Launch
              </motion.p>
            </div>

            {/* Right: glass identity card */}
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
              className="w-full max-w-[340px] shrink-0 lg:max-w-[380px]"
            >
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.13] bg-white/[0.05] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-md">
                {/* Glow behind card */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] blur-[60px]" style={{ backgroundColor: "rgba(56,189,248,0.05)" }} />
                {/* Top accent line */}
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#38bdf840] to-transparent" />

                <div className="relative z-10">
                  {/* Avatar placeholder */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.14] bg-white/[0.08]">
                    <span className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-semibold text-[#f5f7fa]">L</span>
                  </div>

                  <div className="mt-5">
                    <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-medium tracking-[-0.5px] text-[#f5f7fa]">Lux Studio</h3>
                    <p className="mt-1.5 [font-family:'Inter',Helvetica] text-[13px] text-[#f5f7fa61]">Founder / UI/UX & Frontend Direction</p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {["Creative Direction", "UI/UX Design", "Frontend Engineering", "Systems & Launch"].map((skill) => (
                      <div key={skill} className="flex items-center gap-2.5">
                        <div className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                        <span className="[font-family:'Inter',Helvetica] text-[13px] text-[#f5f7faa6]">{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                    <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[0.5px] text-[#f5f7fa61]">Available for projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ STUDIO PHILOSOPHY ══════════════ */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        {/* Large glow arc from bottom */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[160px]" style={{ backgroundColor: "rgba(29,78,216,0.2)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-60px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(56,189,248,0.12)" }} />
        {/* Subtle vertical lines */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 120px)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[800px] px-6 text-center sm:px-8">
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
            className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-medium leading-[1.05] tracking-[-1.1px] text-[#f5f7fa] lg:text-[56px] lg:tracking-[-1.8px]"
          >
            We do not separate beauty from function.
          </motion.h2>
          <motion.p
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
            className="mt-7 [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
          >
            Every screen, interaction, system, and piece of content is designed to feel premium, work clearly, and support the business behind it.
          </motion.p>
        </div>
      </section>

      {/* ══════════════ STUDIO NOTE ══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-5%] top-1/4 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.09)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-sm lg:p-14">
              {/* Top inset line */}
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
              {/* Glow behind */}
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.10)" }} />
              {/* Studio signal dot */}
              <div className="absolute right-8 top-8 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[0.8px] text-[#f5f7fa38]">Lux Studio</span>
              </div>

              <div className="relative z-10">
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase">A Studio Note</p>
                <h2 className="mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.07] tracking-[-0.8px] text-[#f5f7fa] lg:text-[38px] lg:tracking-[-1.1px]">
                  Built for clients who need more than a beautiful website.
                </h2>
                <p className="mt-7 max-w-[680px] [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[28px] text-[#f5f7faa6]">
                  Lux Studio was created for clients who want more than polished visuals. They need someone who can understand the business, shape the content, design the experience, build the interface, connect the system, and care about the final launch.
                </p>
                <p className="mt-5 max-w-[680px] [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[28px] text-[#f5f7faa6]">
                  That is why our work brings strategy, design, development, motion, systems, and launch thinking into one connected process — so the final result feels premium, clear, and ready to perform in the real world.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ STUDIO SIGNAL / CONNECTED LAYERS ══════════════ */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(38,100,255,0.09) 0%, transparent 70%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1000px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase">Studio Signal</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              The same care connects every layer.
            </h2>
            <p className="mx-auto mt-5 max-w-[520px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
              From the first idea to the final launch, every layer is shaped to support the next — so the experience feels consistent, intentional, and ready to grow.
            </p>
          </motion.div>

          {/* Central signal element with floating layer words */}
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
            className="relative mx-auto flex max-w-[640px] flex-wrap justify-center gap-3"
          >
            {studioLayers.map((word, i) => (
              <motion.span
                key={word}
                initial={reduced ? { opacity: 0.55 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: i % 3 === 0 ? 0.7 : i % 2 === 0 ? 0.5 : 0.38, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 [font-family:'Inter',Helvetica] text-[13px] font-normal text-[#f5f7fa99]"
              >
                {word}
              </motion.span>
            ))}
            {/* Central glow dot */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" style={{ backgroundColor: "rgba(56,189,248,0.15)" }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="mb-14"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">What Guides Us</p>
            <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[44px] lg:tracking-[-1.3px]">
              Built around clarity, craft, and performance.
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.08} viewport={{ once: true, margin: "-40px" }}
                className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] p-7 backdrop-blur-sm ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.5px] text-[#38bdf880]">{v.num}</span>
                <h3 className="mt-3 [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] text-[#f5f7fa]">{v.title}</h3>
                <p className="mt-3 [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] text-[#f5f7faa6]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="relative py-24 pb-32 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-10 backdrop-blur-sm lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.12)" }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.08] tracking-[-0.9px] text-[#f5f7fa] lg:text-[42px] lg:tracking-[-1.3px]">
                  Have an idea that needs creative<br className="hidden lg:block" /> and technical direction?
                </h2>
                <p className="mt-5 max-w-[480px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                  Tell us what you want to build, and we'll help shape the strategy, design, and system behind it.
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
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooterSection />
    </div>
  );
};
