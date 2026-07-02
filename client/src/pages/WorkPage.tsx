import { useReducedMotion, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const projects = [
  {
    id: "x-dental",
    name: "X Dental",
    type: "Dental Supplies E-commerce Platform",
    description:
      "We designed and built a complete e-commerce platform for dental doctors and clinics, combining UI/UX design, frontend, backend, and real store functionality into a cleaner and more professional buying experience.",
    secondary:
      "The project included product browsing, product details, cart, checkout, backend functionality, and large-scale product image preparation. We sourced product visuals, enhanced their quality, removed backgrounds, and created a cleaner and more consistent e-commerce presentation across more than 1000 products.",
    tags: [
      "UI/UX Design",
      "Frontend",
      "Backend",
      "E-commerce",
      "1000+ Product Images",
      "Background Removal",
      "Quality Enhancement",
      "Checkout Flow",
      "SEO & Performance",
      "Motion-Rich UX",
    ],
    proof: [
      "Product Visual Preparation",
      "Image Sourcing",
      "Quality Enhancement",
      "Background Removal",
    ],
    accent: "#38bdf8",
    gradientFrom: "#0c2240",
    gradientTo: "#060f1e",
    layout: "horizontal",
  },
  {
    id: "houd-el-nile",
    name: "Houd El Nile",
    type: "Agriculture Export Company",
    description:
      "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
    secondary:
      "The project included original farm and factory photography, Lightroom image editing, a redesigned visual direction, a rotating hero experience, a top contact bar, seven-language support, SEO / performance thinking, and final deployment.",
    tags: [
      "Website Redesign",
      "Next.js",
      "Photography",
      "Lightroom Editing",
      "7 Languages",
      "Export Brand",
      "SEO & Performance",
      "Scroll Storytelling",
      "Deployment",
    ],
    accent: "#4ade80",
    gradientFrom: "#0a1f12",
    gradientTo: "#060e09",
    layout: "vertical",
  },
  {
    id: "al-nours",
    name: "Al Nours",
    type: "Saudi Beverage Distribution E-commerce",
    description:
      "We created an online shopping platform for Al Nours, combining logo creation, brand direction, frontend, backend, authentication flows, and deployment into a clear and trustworthy e-commerce experience.",
    tags: [
      "E-commerce",
      "Frontend",
      "Backend",
      "Logo Design",
      "Brand Direction",
      "Authentication",
      "Deployment",
      "Motion-Rich UX",
    ],
    accent: "#f59e0b",
    gradientFrom: "#1a1206",
    gradientTo: "#0c0a04",
    layout: "top-right",
  },
  {
    id: "al-baraka",
    name: "Al Baraka Olives",
    type: "Olive Export Brand Website",
    description:
      "We transformed Al Baraka Olives from an outdated website into a cleaner, more premium export-brand experience with stronger visuals, refined structure, and subtle motion.",
    tags: [
      "Website Redesign",
      "Frontend",
      "Export Brand",
      "Photography",
      "Curated Imagery",
      "Subtle Motion",
      "Scroll Storytelling",
      "Deployment",
    ],
    accent: "#a3e635",
    gradientFrom: "#111a06",
    gradientTo: "#090e04",
    layout: "bottom-right",
  },
];

const SideStars = () => (
  <>
    <img
      className="pointer-events-none absolute left-0 top-0 h-full w-auto max-w-[220px] object-cover opacity-60 select-none"
      src="/figmaAssets/backgroundstars-1.svg"
      alt=""
      aria-hidden="true"
    />
    <img
      className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[220px] object-cover opacity-60 select-none"
      src="/figmaAssets/backgroundstars-2.svg"
      alt=""
      aria-hidden="true"
    />
  </>
);

const Meteor = ({ reduced }: { reduced: boolean }) => {
  if (reduced) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[10%] top-[20%] z-10"
      style={{ animationDelay: "0.5s" }}
    >
      <div
        className="animate-meteor h-px w-[180px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(112,215,255,0.9) 60%, white 100%)",
          boxShadow: "0 0 8px 2px rgba(112,215,255,0.4)",
          transform: "rotate(-30deg)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const TagBadge = ({ tag, color }: { tag: string; color: string }) => (
  <span
    className="inline-flex items-center rounded-full border border-[#ffffff14] bg-[#ffffff06] px-3 py-1 [font-family:'Inter',Helvetica] text-[11px] font-medium leading-[16px] tracking-[0.22px] text-[#f5f7faa6] whitespace-nowrap"
    style={{ borderColor: `${color}22` }}
  >
    {tag}
  </span>
);

const XDentalCard = ({ reduced }: { reduced: boolean }) => (
  <motion.div
    variants={fadeUp}
    initial={reduced ? "visible" : "hidden"}
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    data-testid="card-project-x-dental"
    className="relative overflow-hidden rounded-3xl border border-[#ffffff12] bg-[#080f1c] shadow-[0px_0px_60px_#00000060]"
  >
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-80px] top-[-80px] h-[400px] w-[400px] rounded-full bg-[#38bdf80d] blur-[120px]" />
      <div className="absolute right-0 top-0 h-[300px] w-[500px] bg-[#1d4ed80a] blur-[100px]" />
    </div>
    <div className="relative grid gap-0 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col justify-between gap-6 p-8 sm:p-10 lg:p-12">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal tracking-[1.4px] text-[#38bdf8] uppercase">
              Featured Project
            </span>
            <span className="h-px w-8 bg-[#38bdf840]" />
          </div>
          <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[36px] font-semibold leading-[1.05] tracking-[-1px] text-[#f5f7fa] sm:text-[48px] lg:text-[56px]">
            X Dental
          </h3>
          <p className="mt-2 [font-family:'Inter',Helvetica] text-[14px] font-normal tracking-[0.14px] text-[#38bdf8]">
            Dental Supplies E-commerce Platform
          </p>
        </div>
        <p className="max-w-[560px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[27px] tracking-[0] text-[#f5f7faa6]">
          {projects[0].description}
        </p>
        <p className="max-w-[560px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[24px] tracking-[0] text-[#f5f7fa61]">
          {projects[0].secondary}
        </p>
        <div className="flex flex-wrap gap-2">
          {projects[0].tags.map((tag) => (
            <TagBadge key={tag} tag={tag} color={projects[0].accent} />
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Button
            type="button"
            data-testid="button-view-x-dental"
            variant="ghost"
            className="h-auto p-0 [font-family:'Inter',Helvetica] text-[14px] font-medium tracking-[0] text-sky-400 hover:bg-transparent hover:text-sky-300"
          >
            View Case Study →
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#ffffff0a] p-8 lg:border-l lg:border-t-0 lg:p-10">
        <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal tracking-[1.2px] text-[#f5f7fa3d] uppercase">
          Image Production
        </p>
        <div className="grid grid-cols-2 gap-3">
          {projects[0].proof.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-[#38bdf81a] bg-[#38bdf808] p-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400/60 shrink-0" />
              <span className="[font-family:'Inter',Helvetica] text-[12px] font-normal leading-[18px] tracking-[0] text-[#f5f7faa6]">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-[180px] w-full items-center justify-center rounded-2xl border border-[#ffffff0a] bg-[#030a14]">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#38bdf820] bg-[#38bdf808]">
              <span className="text-[20px]">🦷</span>
            </div>
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1px] text-[#f5f7fa2a] uppercase">
              1000+ Products
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({
  project,
  animVariant,
  reduced,
}: {
  project: (typeof projects)[number];
  animVariant: typeof fadeUp | typeof fadeRight;
  reduced: boolean;
}) => (
  <motion.div
    variants={animVariant}
    initial={reduced ? "visible" : "hidden"}
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    data-testid={`card-project-${project.id}`}
    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#ffffff0e] bg-[#060c16] shadow-[0px_0px_40px_#00000040] transition-all duration-500 hover:border-[#ffffff1a]"
    style={{ background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)` }}
  >
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full blur-[100px] opacity-40"
        style={{ background: project.accent }}
      />
    </div>
    <div className="flex h-[160px] items-end p-6 sm:h-[200px]">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ffffff14]"
        style={{ borderColor: `${project.accent}30`, background: `${project.accent}10` }}
      >
        <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-medium tracking-[0.5px] text-[#f5f7fa80]">
          {project.id === "houd-el-nile"
            ? "HN"
            : project.id === "al-nours"
            ? "AN"
            : "AB"}
        </span>
      </div>
    </div>
    <div className="relative flex flex-1 flex-col gap-4 p-6 pt-0">
      <div>
        <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-semibold leading-[1.1] tracking-[-0.65px] text-[#f5f7fa]">
          {project.name}
        </h3>
        <p
          className="mt-1 [font-family:'Inter',Helvetica] text-[12px] font-normal tracking-[0.12px]"
          style={{ color: project.accent }}
        >
          {project.type}
        </p>
      </div>
      <p className="[font-family:'Inter',Helvetica] text-[14px] font-normal leading-[23px] tracking-[0] text-[#f5f7fa80]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag} tag={tag} color={project.accent} />
        ))}
        {project.tags.length > 4 && (
          <span className="inline-flex items-center rounded-full border border-[#ffffff0e] bg-[#ffffff04] px-3 py-1 [font-family:'Inter',Helvetica] text-[11px] text-[#f5f7fa38]">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
      <div className="mt-auto pt-2">
        <Button
          type="button"
          data-testid={`button-view-${project.id}`}
          variant="ghost"
          className="h-auto p-0 [font-family:'Inter',Helvetica] text-[13px] font-medium tracking-[0] hover:bg-transparent"
          style={{ color: project.accent }}
        >
          View Case Study →
        </Button>
      </div>
    </div>
  </motion.div>
);

export const WorkPage = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <main className="w-full overflow-x-hidden bg-[#03050a]" data-testid="page-work">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[640px] w-full overflow-hidden pt-[80px]"
        aria-label="Work page hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/figmaAssets/imagewithfallback.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,10,0.6)_0%,rgba(3,5,10,0.1)_30%,rgba(3,5,10,0.4)_70%,rgba(3,5,10,1)_100%)]" />
        <SideStars />
        <Meteor reduced={reduced} />

        {/* Aurora glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[30%] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#1d4ed818] blur-[160px]" />
          <div className="absolute left-1/2 top-[20%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7c3aed0d] blur-[120px]" />
        </div>

        <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 pb-[100px] pt-[120px] text-center sm:px-10 lg:px-16">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[12px] font-normal tracking-[1.8px] text-[#f5f7fa61] uppercase">
              Selected Projects
            </p>
            <h1 className="max-w-[860px] [font-family:'Bricolage_Grotesque',Helvetica] text-[46px] font-semibold leading-[0.97] tracking-[-1.6px] text-[#f5f7fa] sm:text-[68px] sm:tracking-[-2.2px] lg:text-[96px] lg:tracking-[-2.88px]">
              Work built from strategy to launch.
            </h1>
            <p className="max-w-[600px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[29px] tracking-[0.1px] text-[#f5f7faad]">
              A closer look at websites, e-commerce platforms, brand
              experiences, and digital systems we shaped, designed, developed,
              and launched for real businesses.
            </p>
            <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal tracking-[0.13px] text-[#f5f7fa38]">
              4 selected projects · Websites · E-commerce · Export brands ·
              Digital systems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="relative w-full px-4 pb-20 sm:px-6 lg:px-12 xl:px-20"
        aria-label="Work projects"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          {/* X Dental – featured horizontal */}
          <XDentalCard reduced={reduced} />

          {/* Row 2: Houd El Nile tall | Al Nours + Al Baraka */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
            {/* Houd El Nile – tall vertical */}
            <ProjectCard
              project={projects[1]}
              animVariant={fadeUp}
              reduced={reduced}
            />

            {/* Al Nours + Al Baraka stacked */}
            <div className="flex flex-col gap-5">
              <ProjectCard
                project={projects[2]}
                animVariant={fadeRight}
                reduced={reduced}
              />
              <ProjectCard
                project={projects[3]}
                animVariant={fadeUp}
                reduced={reduced}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative w-full overflow-hidden px-4 pb-24 sm:px-6 lg:px-12"
        aria-label="Work CTA"
      >
        <motion.div
          variants={fadeUp}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[860px]"
        >
          <div
            className="animate-glow-border relative overflow-hidden rounded-3xl border border-[#38bdf820] bg-[#060e1c] p-10 text-center shadow-[0px_0px_60px_#00000050] sm:p-14"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#38bdf80c] blur-[100px]" />
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
                Start a Project
              </p>
              <h2 className="max-w-[600px] [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-semibold leading-[1.1] tracking-[-0.9px] text-[#f5f7fa] sm:text-[40px]">
                Have a project that needs this level of care?
              </h2>
              <p className="max-w-[480px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[27px] tracking-[0] text-[#f5f7faad]">
                Let's shape the strategy, design, system, and launch plan
                behind your next digital experience.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  type="button"
                  data-testid="button-work-cta-start"
                  className="h-auto rounded-full bg-[#f5f7fa] px-8 py-[14px] shadow-[0px_4px_20px_#00000052] hover:bg-[#f5f7fa]"
                >
                  <span className="[font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12]">
                    Start a Project →
                  </span>
                </Button>
                <Link href="/services">
                  <Button
                    type="button"
                    data-testid="button-work-cta-services"
                    variant="outline"
                    className="h-auto rounded-full border-[0.8px] border-[#f5f7fa26] bg-[#f5f7fa0a] px-8 py-[14px] text-[#f5f7fa] hover:bg-[#f5f7fa14] hover:text-[#f5f7fa]"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-[14px] font-normal">
                      Explore Services
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
