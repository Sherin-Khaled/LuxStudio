import { useEffect, useState, type FormEvent } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteFooterSection } from "./sections/SiteFooterSection";
import { SideStars } from "@/components/backgrounds/SideStars";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectModal } from "@/contexts/ProjectModalContext";

/* ─── Shared fade-up animation (same easing as About / Process pages) ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Glass card ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[20px] border border-white/[0.11] bg-white/[0.04] backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* ─── Data ─── */
const infoRows = [
  { label: "Response time", value: "Within 24–48 hours" },
  { label: "Best for", value: "Websites, systems, dashboards, e-commerce, and brand experiences" },
  { label: "Next step", value: "Discovery → Direction → Proposal" },
];

const projectTypeOptions = [
  "Website",
  "E-commerce",
  "Dashboard / CMS",
  "Brand + Website",
  "Website Redesign",
  "Not sure yet",
];

const budgetOptions = ["Small project", "Medium project", "Large / custom system", "Not sure yet"];

const timelineOptions = ["As soon as possible", "This month", "1–3 months", "Flexible"];

const nextSteps = [
  {
    num: "01",
    title: "Review",
    desc: "We review your message, business needs, project type, and references.",
  },
  {
    num: "02",
    title: "Direction",
    desc: "We suggest the right direction, possible scope, and what the project needs before design or development starts.",
  },
  {
    num: "03",
    title: "Proposal",
    desc: "If the project fits, we prepare a clear proposal, timeline, and next steps.",
  },
];

const clientNotes = [
  {
    id: 1,
    text: "The product visuals became much cleaner and more consistent across the platform.",
    author: "X Dental",
    category: "E-commerce Platform",
    tag: "Review",
  },
  {
    id: 2,
    text: "We needed a clearer buying journey and a stronger online presence for customers.",
    author: "Al Nours",
    category: "E-commerce Website",
    tag: "Review",
  },
  {
    id: 3,
    text: "The redesign made the brand feel more premium and easier to understand.",
    author: "Al Baraka Olives",
    category: "Export Brand Website",
    tag: "Review",
  },
  {
    id: 4,
    text: "The website finally felt aligned with our business, products, and export identity.",
    author: "Houd El Nile",
    category: "Agriculture Export Website",
    tag: "Review",
  },
  {
    id: 5,
    text: "The process helped us organize the content before the design and development started.",
    author: "Project Note",
    category: "Website Strategy",
    tag: "Client Note",
  },
  {
    id: 6,
    text: "The final experience felt more complete because design, content, and development were connected.",
    author: "Client Note",
    category: "Digital Experience",
    tag: "Project Note",
  },
  {
    id: 7,
    text: "We appreciated that the work did not stop at the design. The structure, content, performance, and launch details were all considered.",
    author: "Launch Note",
    category: "Website Delivery",
    tag: "Project Note",
  },
  {
    id: 8,
    text: "The website became easier to present, easier to understand, and more aligned with the business direction.",
    author: "Client Note",
    category: "Brand Experience",
    tag: "Review",
  },
];

const clientNotesRow1 = clientNotes.slice(0, 4);
const clientNotesRow2 = clientNotes.slice(4, 8);

/* ─── Signal / orbit visual (hero) ─── */
const SignalOrbitVisual = ({ reduced }: { reduced: boolean }) => (
  <div
    className="relative aspect-square w-full max-w-[300px] mx-auto lg:max-w-[340px]"
    role="img"
    aria-label="A pulsing signal representing a project request reaching the studio"
  >
    <style>{`
      @keyframes lux-contact-orbit-spin { to { transform: rotate(360deg); } }
      @keyframes lux-contact-core-pulse {
        0%, 100% { opacity: 0.75; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1.08); }
      }
      @keyframes lux-contact-ping {
        0% { transform: scale(0.75); opacity: 0.45; }
        100% { transform: scale(1.9); opacity: 0; }
      }
    `}</style>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-[10%] rounded-full blur-[60px]"
      style={{ background: "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(38,100,255,0.08) 45%, transparent 72%)" }}
    />

    {[0, 1, 2].map((i) => (
      <div
        key={i}
        aria-hidden="true"
        className="absolute rounded-full border border-[#38bdf82a]"
        style={{ inset: `${i * 13}%` }}
      />
    ))}

    {!reduced &&
      [0, 1].map((i) => (
        <div
          key={`ping-${i}`}
          aria-hidden="true"
          className="absolute inset-[32%] rounded-full border border-[#38bdf8]"
          style={{ animation: `lux-contact-ping 3.4s ${i * 1.7}s ease-out infinite` }}
        />
      ))}

    <div
      aria-hidden="true"
      className="absolute inset-[6%]"
      style={{ animation: reduced ? "none" : "lux-contact-orbit-spin 24s linear infinite" }}
    >
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-[19%]"
      style={{ animation: reduced ? "none" : "lux-contact-orbit-spin 17s linear infinite reverse" }}
    >
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/70" />
    </div>

    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(156,229,255,0.7)_20%,rgba(56,189,248,0.4)_46%,transparent_76%)]"
      style={{ animation: reduced ? "none" : "lux-contact-core-pulse 6.5s ease-in-out infinite" }}
    />
  </div>
);

/* ─── Form field primitives ─── */
const fieldLabel =
  "[font-family:'Inter',Helvetica] text-[13px] font-medium text-[#f5f7faa6]";
const fieldControl =
  "w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3 [font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa] outline-none transition-colors placeholder:text-[#f5f7fa40] focus:border-[#38bdf870] focus:bg-white/[0.05]";

const FormField = ({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={fieldLabel}>
      {label}
      {required && <span className="text-[#38bdf8]"> *</span>}
    </label>
    <input
      id={id}
      data-testid={`input-${id}`}
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={fieldControl}
    />
  </div>
);

const FormSelectField = ({
  id,
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={fieldLabel}>
      {label}
      {required && <span className="text-[#38bdf8]"> *</span>}
    </label>
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        data-testid={`select-${id}`}
        className={`${fieldControl} h-auto justify-between gap-2 focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-[#f5f7fa40] [&_svg]:text-[#f5f7fa60] [&_svg]:opacity-100`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={8}
        className="overflow-hidden rounded-xl border border-white/[0.12] bg-[#0a0f1af0] text-[#f5f7fa] shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="cursor-pointer rounded-lg py-2.5 pl-8 pr-3 [font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fac7] focus:bg-[#38bdf81a] focus:text-[#38bdf8] data-[state=checked]:text-[#38bdf8]"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/* ─── Testimonial card ─── */
const NoteCard = ({ note }: { note: (typeof clientNotes)[number] }) => (
  <article className="flex shrink-0">
    <div
      tabIndex={0}
      className="group/card relative flex h-[360px] w-[300px] flex-col justify-between overflow-hidden rounded-[28px] border-[0.8px] border-[#ffffff20] bg-[#ffffff0c] px-6 pb-6 pt-7 shadow-[0px_20px_70px_#0000005c] backdrop-blur-0 outline-none [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] [will-change:transform,box-shadow] hover:-translate-y-1.5 hover:scale-[1.015] hover:border-[rgba(56,189,248,0.45)] hover:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_20px_70px_#0000005c] focus-visible:-translate-y-1.5 focus-visible:scale-[1.015] focus-visible:border-[rgba(56,189,248,0.45)] focus-visible:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_20px_70px_#0000005c] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 sm:w-[320px]"
    >
      <div className="absolute left-px top-px h-px w-[calc(100%-2px)] bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_55%,rgba(0,0,0,0)_100%)]" />

      {/* Hover-only inner glass glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 [transition:opacity_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.10), transparent 38%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.10), transparent 42%)",
        }}
      />

      <div className="relative z-10 flex flex-col">
        <p className="[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-normal leading-[20px] text-[#38bdf896] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-[#38bdf8] group-focus-visible/card:text-[#38bdf8]">
          "
        </p>
        <p className="pt-4 [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27px] text-[#f5f7faf2]">
          {note.text}
        </p>
      </div>
      <footer className="relative z-10 flex flex-col">
        <div className="h-px w-full bg-[#ffffff17]" />
        <div className="pt-3.5">
          <p className="[font-family:'Inter',Helvetica] text-[14.5px] font-normal leading-[22px] tracking-[-0.08px] text-[#f5f7faeb] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-white group-focus-visible/card:text-white">
            {note.author}
          </p>
        </div>
        <div className="pb-3 pt-1">
          <p className="[font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px] text-[#f5f7fa9e]">
            {note.category}
          </p>
        </div>
        <div>
          <span className="inline-flex h-6 items-center rounded-[999px] border-[0.8px] border-[#ffffff1f] bg-[#ffffff08] px-3 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[0.8px] text-[#f5f7fa85] [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:border-[rgba(56,189,248,0.4)] group-focus-visible/card:border-[rgba(56,189,248,0.4)]">
            {note.tag}
          </span>
        </div>
      </footer>
    </div>
  </article>
);

const NoteRow = ({ notes, reverse = false }: { notes: typeof clientNotes; reverse?: boolean }) => (
  <div
    className="flex w-max shrink-0 items-start gap-5 pr-5"
    style={reverse ? { animationDirection: "reverse" } : undefined}
  >
    {notes.map((note) => (
      <NoteCard key={note.id} note={note} />
    ))}
  </div>
);

/* ─── Page ─── */
type FormState = {
  name: string;
  contact: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  contact: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

export const ContactPage = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { openProjectModal } = useProjectModal();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never fill this in
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % nextSteps.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [reduced]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = Boolean(
      form.name.trim() && form.contact.trim() && form.projectType && form.message.trim(),
    );
    if (!isValid) {
      setErrorMessage("Please complete the required fields before sending.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.message || "Please check the required fields and try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setWebsite("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen w-full text-[#f5f7fa] overflow-x-hidden" data-testid="page-contact">

      {/* ══════════════ 1. CONTACT HERO ══════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-20">
        <img
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80"
          alt=""
          aria-hidden="true"
          src="/figmaAssets/backgroundstars-2.svg"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[80vw] w-[80vw] max-h-[1000px] max-w-[1000px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[200px]"
          style={{ backgroundColor: "rgba(29,78,216,0.16)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-1/3 h-[440px] w-[440px] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
        />
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: hero text */}
            <div className="flex-1">
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
                className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] text-[#f5f7fa55] uppercase"
              >
                Contact Lux Studio
              </motion.p>
              <motion.h1
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
                className="mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-medium leading-[1.04] tracking-[-1.3px] text-[#f5f7fa] sm:text-[50px] lg:text-[64px] lg:tracking-[-2px]"
              >
                Let's shape your next digital experience.
              </motion.h1>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
                className="mt-7 max-w-[520px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] text-[#f5f7faa6]"
              >
                Tell us what you want to build, improve, or launch — and we'll help define the right strategy, design, and technical direction.
              </motion.p>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
                className="mt-9 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px] text-[#38bdf880]"
              >
                Websites · E-commerce · Dashboards · CMS · Brand Experiences
              </motion.p>

              <motion.div
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.4} viewport={{ once: true }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <button
                  type="button"
                  onClick={openProjectModal}
                  data-testid="button-contact-hero-start"
                  className="flex items-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </button>
                <Link href="/work">
                  <button
                    type="button"
                    data-testid="button-contact-hero-work"
                    className="flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#f5f7fa] transition-colors hover:bg-white/[0.09]"
                  >
                    View Our Work
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: signal/orbit visual */}
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
              className="w-full max-w-[300px] shrink-0 self-center lg:max-w-[340px] lg:self-auto"
            >
              <SignalOrbitVisual reduced={reduced} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ 2. PROJECT SIGNAL / CONTACT FORM ══════════════ */}
      <section id="contact-form" className="relative scroll-mt-28 py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[180px]" style={{ backgroundColor: "rgba(29,78,216,0.12)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            <GlassCard className="relative overflow-hidden p-8 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-10 lg:p-14">
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[520px] -translate-x-1/2 rounded-full blur-[110px]" style={{ backgroundColor: "rgba(38,100,255,0.1)" }} />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
                {/* Left: project signal info */}
                <div className="flex flex-col">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase">
                    Project Signal
                  </p>
                  <h2 className="mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.08] tracking-[-0.8px] text-[#f5f7fa] lg:text-[36px] lg:tracking-[-1px]">
                    Start with a few details.
                  </h2>
                  <p className="mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                    You do not need to have everything ready. Share your idea, business, goals, and any references — we'll help shape the next step.
                  </p>

                  <div className="mt-9 flex flex-col gap-5">
                    {infoRows.map((row) => (
                      <div key={row.label} className="border-t border-white/[0.08] pt-4 first:border-t-0 first:pt-0">
                        <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.2px] text-[#f5f7fa50] uppercase">
                          {row.label}
                        </p>
                        <p className="mt-1.5 [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] text-[#f5f7fad0]">
                          {row.value}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2.5 border-t border-white/[0.08] pt-4">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </span>
                      <span className="[font-family:'Inter',Helvetica] text-[13.5px] font-normal text-[#f5f7fac7]">
                        Ready to receive new projects
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: form */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      id="name"
                      label="Name"
                      required
                      value={form.name}
                      onChange={(v) => updateField("name", v)}
                      placeholder="Your full name"
                    />
                    <FormField
                      id="contact-method"
                      label="Email or WhatsApp"
                      required
                      value={form.contact}
                      onChange={(v) => updateField("contact", v)}
                      placeholder="you@email.com or WhatsApp number"
                    />
                  </div>

                  <FormField
                    id="company"
                    label="Company / Brand"
                    value={form.company}
                    onChange={(v) => updateField("company", v)}
                    placeholder="Business or brand name"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormSelectField
                      id="project-type"
                      label="Project type"
                      required
                      value={form.projectType}
                      onChange={(v) => updateField("projectType", v)}
                      options={projectTypeOptions}
                      placeholder="Select a project type"
                    />
                    <FormSelectField
                      id="budget"
                      label="Budget range"
                      value={form.budget}
                      onChange={(v) => updateField("budget", v)}
                      options={budgetOptions}
                      placeholder="Select a budget range"
                    />
                  </div>

                  <FormSelectField
                    id="timeline"
                    label="Timeline"
                    value={form.timeline}
                    onChange={(v) => updateField("timeline", v)}
                    options={timelineOptions}
                    placeholder="Select a timeline"
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={fieldLabel}>
                      Project message<span className="text-[#38bdf8]"> *</span>
                    </label>
                    <textarea
                      id="message"
                      data-testid="input-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us about your business, project goals, current website, required features, references, or anything you want us to know."
                      className={`${fieldControl} resize-none`}
                    />
                  </div>

                  {/* Honeypot — hidden from real visitors, off-screen (not display:none) so bots that ignore CSS still fill it in */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      data-testid="text-form-error"
                      className="rounded-xl border border-[#f8717140] bg-[#f8717112] px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] text-[#fca5a5]"
                    >
                      {errorMessage || "Please complete the required fields before sending."}
                    </p>
                  )}
                  {status === "success" && (
                    <p
                      role="status"
                      data-testid="text-form-success"
                      className="rounded-xl border border-[#38bdf840] bg-[#38bdf812] px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] text-[#7dd3fc]"
                    >
                      Your message has been received. We'll review it and get back to you soon.
                    </p>
                  )}

                  <button
                    type="submit"
                    data-testid="button-submit-contact"
                    disabled={status === "loading"}
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send Project Request"}
                    {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 3. WHAT HAPPENS NEXT ══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ backgroundColor: "rgba(124,58,237,0.08)" }} />
        <SideStars starsPerSide={8} />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
              className="lg:w-[38%]"
            >
              <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#f5f7fa55] uppercase">After You Send</p>
              <h2 className="mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] text-[#f5f7fa] lg:text-[42px] lg:tracking-[-1.2px]">
                What happens next.
              </h2>
              <p className="mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                We keep the first step simple. Once we receive your message, we review the project direction and suggest the best next move.
              </p>
            </motion.div>

            <div className="flex-1">
              <div className="flex flex-col">
                {nextSteps.map((step, i) => {
                  const active = i === activeStepIndex;
                  const completed = i < activeStepIndex;
                  const numberColor = active ? "#38bdf8" : completed ? "rgba(56,189,248,0.32)" : "rgba(56,189,248,0.45)";
                  const numberShadow = active
                    ? "0 0 10px rgba(56,189,248,0.85), 0 0 24px rgba(56,189,248,0.45), 0 0 48px rgba(56,189,248,0.22)"
                    : "none";
                  const titleColor = active ? "#38bdf8" : "rgba(255,255,255,0.82)";
                  const titleShadow = active ? "0 0 12px rgba(56,189,248,0.35)" : "none";
                  const bodyColor = active ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)";
                  const numberTransform = active && !reduced ? "translateY(-1px)" : "translateY(0)";
                  const stepTransition = "[transition:color_600ms_cubic-bezier(0.22,1,0.36,1),text-shadow_600ms_cubic-bezier(0.22,1,0.36,1),opacity_600ms_cubic-bezier(0.22,1,0.36,1),transform_600ms_cubic-bezier(0.22,1,0.36,1)]";
                  return (
                    <motion.div
                      key={step.num}
                      variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.1} viewport={{ once: true, margin: "-40px" }}
                      className="flex gap-6 border-t border-white/[0.08] py-7 first:border-t-0 first:pt-0"
                    >
                      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-visible">
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full ${stepTransition}`}
                          style={{
                            background: "radial-gradient(circle, rgba(56,189,248,0.32), rgba(56,189,248,0.12) 38%, transparent 70%)",
                            filter: "blur(10px)",
                            opacity: active ? 1 : 0,
                          }}
                        />
                        <span
                          className={`relative z-[2] [font-family:'JetBrains_Mono',Helvetica] text-[13px] font-medium tracking-[1px] ${stepTransition}`}
                          style={{ color: numberColor, textShadow: numberShadow, transform: numberTransform }}
                        >
                          {step.num}
                        </span>
                      </span>
                      <div>
                        <h3
                          className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium tracking-[-0.4px] ${stepTransition}`}
                          style={{ color: titleColor, textShadow: titleShadow }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mt-2.5 max-w-[520px] [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[24px] ${stepTransition}`}
                          style={{ color: bodyColor }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 4. CLIENT NOTES / TESTIMONIALS ══════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#03050a] bg-[url(/figmaAssets/backgroundstars-1.svg)] bg-[100%_100%] py-24 lg:py-32"
        aria-labelledby="contact-notes-heading"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1519px] gap-[37px]">
            <div className="mt-[300px] ml-[480px] h-80 w-[560px] bg-[#1d4ed817] blur-[160px]" />
            <div className="mt-[220px] h-[260px] w-[260px] rounded-full bg-[#7c3aed0f] blur-[110px]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1519px] px-4 sm:px-6 lg:px-[68px]">
          <motion.header
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
            className="max-w-[1244px]"
          >
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[13px] leading-[19.5px] tracking-[1.56px] text-[#f5f7fa66]">
              Client Notes
            </p>
            <h2
              id="contact-notes-heading"
              className="mt-[18px] [font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-semibold leading-[1.05] tracking-[-1.6px] text-[#f5f7fa] sm:text-[44px] lg:text-[56px]"
            >
              What clients notice after working with us.
            </h2>
            <p className="mt-[22px] max-w-[560px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27.5px] text-[#f5f7faa1]">
              Client feedback, project needs, and the details people value when we shape, design, build, and launch complete digital experiences.
            </p>
          </motion.header>

          {reduced ? (
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {clientNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="mt-14 flex flex-col gap-5">
              <div className="group relative">
                <div className="-my-8 w-full overflow-hidden">
                  <div className="flex w-max animate-marquee-x items-start py-8 group-hover:[animation-play-state:paused]">
                    <NoteRow notes={clientNotesRow1} />
                    <NoteRow notes={clientNotesRow1} />
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="-my-8 w-full overflow-hidden">
                  <div
                    className="flex w-max animate-marquee-x items-start py-8 group-hover:[animation-play-state:paused]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <NoteRow notes={clientNotesRow2} />
                    <NoteRow notes={clientNotesRow2} />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[77px] bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(0,0,0,0)_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[123px] bg-[linear-gradient(270deg,rgba(3,5,10,1)_60%,rgba(0,0,0,0)_100%)]" />
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ 5. FINAL CTA ══════════════ */}
      <section className="relative py-24 pb-32 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
          >
            <div className="work-cta-orbit-border relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-10 backdrop-blur-sm lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(38,100,255,0.12)" }} />
              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] text-[#38bdf880] uppercase">
                  Ready
                </p>
                <h2 className="mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[30px] font-medium leading-[1.08] tracking-[-0.9px] text-[#f5f7fa] lg:text-[42px] lg:tracking-[-1.3px]">
                  Ready to start the conversation?
                </h2>
                <p className="mt-5 max-w-[480px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] text-[#f5f7faa6]">
                  Send your project details and we'll help you understand the next step.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={openProjectModal}
                    data-testid="button-contact-cta-start"
                    className="flex items-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90"
                  >
                    Start a Project <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="/work">
                    <button
                      type="button"
                      data-testid="button-contact-cta-work"
                      className="flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#f5f7fa] transition-colors hover:bg-white/[0.09]"
                    >
                      View Work
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 6. SHARED FOOTER ══════════════ */}
      <SiteFooterSection />
    </div>
  );
};
