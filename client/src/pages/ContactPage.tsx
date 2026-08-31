import { useEffect, useState, type FormEvent } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { FooterRevealStage } from "@/components/FooterRevealStage";
import { SideStars } from "@/components/backgrounds/SideStars";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { contactPageDict } from "@/lib/i18n/contactPage";
import { projectModalDict, projectTypeValues, budgetValues, timelineValues } from "@/lib/i18n/projectModal";
import { useSEO } from "@/lib/seo/useSEO";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { pageMeta, pageBreadcrumbs } from "@/lib/seo/pageMeta";

type SelectOption = { value: string; label: string };
type ClientNote = { id: number; text: string; author: string; category: string; tag: string };

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
const GlassCard = ({
  children,
  className = "",
  isLight = false,
}: {
  children: React.ReactNode;
  className?: string;
  isLight?: boolean;
}) => (
  <div
    className={`rounded-[20px] border backdrop-blur-sm ${
      isLight
        ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.72)]"
        : "border-white/[0.11] bg-white/[0.04]"
    } ${className}`}
  >
    {children}
  </div>
);

/* ─── Signal / orbit visual (hero) ─── */
const SignalOrbitVisual = ({ reduced, isLight, ariaLabel }: { reduced: boolean; isLight: boolean; ariaLabel: string }) => (
  <div
    className="relative aspect-square w-full max-w-[300px] mx-auto lg:max-w-[340px]"
    role="img"
    aria-label={ariaLabel}
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

    {/* Ring borders — light mode gets a stronger, darker blue tint; the
        original rgba(56,189,248,0.16) reads as nearly invisible on a light
        page. */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        aria-hidden="true"
        className={`absolute rounded-full border ${isLight ? "border-[rgba(2,132,199,0.35)]" : "border-[#38bdf82a]"}`}
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
      {/* Was bg-white/70 — invisible on a light page. Light mode uses a
          solid accent blue instead of white. */}
      <span className={`absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${isLight ? "bg-[#0284c7]/85" : "bg-white/70"}`} />
    </div>

    {/* Core pulse — dark mode's gradient starts from near-white, which reads
        as "glowing" against a dark backdrop but would blend into a light
        page. Light mode starts from a saturated sky blue instead, so the
        center still reads as a distinct light source. */}
    <div
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
        isLight
          ? "bg-[radial-gradient(circle,rgba(2,132,199,0.95)_0%,rgba(56,189,248,0.75)_20%,rgba(29,78,216,0.45)_46%,transparent_76%)]"
          : "bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(156,229,255,0.7)_20%,rgba(56,189,248,0.4)_46%,transparent_76%)]"
      }`}
      style={{ animation: reduced ? "none" : "lux-contact-core-pulse 6.5s ease-in-out infinite" }}
    />
  </div>
);

/* ─── Form field primitives ─── */
const fieldLabel = (isLight: boolean) =>
  `[font-family:'Inter',Helvetica] text-[13px] font-medium ${isLight ? "text-[#64748B]" : "text-[#f5f7faa6]"}`;
const fieldControl = (isLight: boolean) =>
  `w-full rounded-xl border px-4 py-3 [font-family:'Inter',Helvetica] text-[14px] outline-none transition-colors ${
    isLight
      ? "border-[rgba(15,23,42,0.12)] bg-[rgba(255,255,255,0.6)] text-[#0F172A] placeholder:text-[#94a3b8] focus:border-[rgba(2,132,199,0.55)] focus:bg-white"
      : "border-white/[0.12] bg-white/[0.03] text-[#f5f7fa] placeholder:text-[#f5f7fa40] focus:border-[#38bdf870] focus:bg-white/[0.05]"
  }`;

const FormField = ({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  isLight,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLight: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={fieldLabel(isLight)}>
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
      className={fieldControl(isLight)}
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
  isLight,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  isLight: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className={fieldLabel(isLight)}>
      {label}
      {required && <span className="text-[#38bdf8]"> *</span>}
    </label>
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        data-testid={`select-${id}`}
        className={`${fieldControl(isLight)} h-auto justify-between gap-2 focus:ring-0 focus:ring-offset-0 [&_svg]:opacity-100 ${
          isLight ? "data-[placeholder]:text-[#94a3b8] [&_svg]:text-[#64748B]" : "data-[placeholder]:text-[#f5f7fa40] [&_svg]:text-[#f5f7fa60]"
        }`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={8}
        className={`overflow-hidden rounded-xl border backdrop-blur-xl ${
          isLight
            ? "border-[rgba(15,23,42,0.10)] bg-[#ffffffed] text-[#0F172A] shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
            : "border-white/[0.12] bg-[#0a0f1af0] text-[#f5f7fa] shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        }`}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={`cursor-pointer rounded-lg py-2.5 ps-8 pe-3 text-start [font-family:'Inter',Helvetica] text-[14px] data-[state=checked]:text-[#38bdf8] ${
              isLight
                ? "text-[#334155] focus:bg-[rgba(2,132,199,0.10)] focus:text-[#0284c7]"
                : "text-[#f5f7fac7] focus:bg-[#38bdf81a] focus:text-[#38bdf8]"
            }`}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/* ─── Testimonial card ─── */
const NoteCard = ({ note, isLight }: { note: ClientNote; isLight: boolean }) => {
  // The marquee track this card lives in is pinned to dir="ltr" so its own
  // flex children never auto-reverse (see NoteRow) — this puts the page's
  // real direction back on the card itself, so its text still reads RTL in
  // Arabic even though its ancestor's layout direction is pinned to ltr.
  const { dir } = useLanguage();
  return (
  <article dir={dir} className="flex shrink-0">
    <div
      tabIndex={0}
      className={`group/card relative flex min-h-[360px] w-[300px] flex-col justify-between overflow-hidden rounded-[28px] border-[0.8px] px-6 pb-6 pt-7 backdrop-blur-0 outline-none [transition:transform_600ms_cubic-bezier(0.22,1,0.36,1),border-color_600ms_cubic-bezier(0.22,1,0.36,1),box-shadow_600ms_cubic-bezier(0.22,1,0.36,1)] [will-change:transform,box-shadow] hover:-translate-y-1.5 hover:scale-[1.015] hover:border-[rgba(56,189,248,0.45)] focus-visible:-translate-y-1.5 focus-visible:scale-[1.015] focus-visible:border-[rgba(56,189,248,0.45)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 sm:w-[320px] ${
        isLight
          ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.85)] shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:shadow-[0_0_22px_rgba(56,189,248,0.16),0_0_70px_rgba(56,189,248,0.08),0_18px_50px_rgba(15,23,42,0.08)] focus-visible:shadow-[0_0_22px_rgba(56,189,248,0.16),0_0_70px_rgba(56,189,248,0.08),0_18px_50px_rgba(15,23,42,0.08)]"
          : "border-[#ffffff20] bg-[#ffffff0c] shadow-[0px_20px_70px_#0000005c] hover:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_20px_70px_#0000005c] focus-visible:shadow-[0_0_22px_rgba(56,189,248,0.20),0_0_70px_rgba(56,189,248,0.10),0px_20px_70px_#0000005c]"
      }`}
    >
      <div className={`absolute left-px top-px h-px w-[calc(100%-2px)] ${isLight ? "bg-[linear-gradient(90deg,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.04)_55%,rgba(0,0,0,0)_100%)]" : "bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_55%,rgba(0,0,0,0)_100%)]"}`} />

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
        <p className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-normal leading-[20px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:text-[#38bdf8] group-focus-visible/card:text-[#38bdf8] ${isLight ? "text-[#0284c7]" : "text-[#38bdf896]"}`}>
          "
        </p>
        <p className={`pt-4 [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7faf2]"}`}>
          {note.text}
        </p>
      </div>
      <footer className="relative z-10 flex flex-col">
        <div className={`h-px w-full ${isLight ? "bg-[rgba(15,23,42,0.08)]" : "bg-[#ffffff17]"}`} />
        <div className="pt-3.5">
          <p className={`[font-family:'Inter',Helvetica] text-[14.5px] font-normal leading-[22px] tracking-[-0.08px] [transition:color_600ms_cubic-bezier(0.22,1,0.36,1)] ${isLight ? "text-[#0F172A]" : "text-[#f5f7faeb] group-hover/card:text-white group-focus-visible/card:text-white"}`}>
            {note.author}
          </p>
        </div>
        <div className="pb-3 pt-1">
          <p className={`[font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[19px] ${isLight ? "text-[#64748B]" : "text-[#f5f7fa9e]"}`}>
            {note.category}
          </p>
        </div>
        <div>
          <span className={`inline-flex h-6 items-center rounded-[999px] border-[0.8px] px-3 [font-family:'JetBrains_Mono',Helvetica] text-[10.5px] font-normal leading-[16px] tracking-[0.8px] [transition:border-color_600ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:border-[rgba(56,189,248,0.4)] group-focus-visible/card:border-[rgba(56,189,248,0.4)] ${
            isLight ? "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.03)] text-[#64748B]" : "border-[#ffffff1f] bg-[#ffffff08] text-[#f5f7fa85]"
          }`}>
            {note.tag}
          </span>
        </div>
      </footer>
    </div>
  </article>
  );
};

const NoteRow = ({ notes, reverse = false, isLight }: { notes: ClientNote[]; reverse?: boolean; isLight: boolean }) => {
  // Pinned to dir="ltr" for the same reason as the outer marquee track (see
  // the two call sites below): without this, the page's real RTL direction
  // would auto-reverse these flex children on top of the explicit reversal
  // already applied to `notes` — a double reversal. NoteCard puts the real
  // direction back on each card individually.
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";
  const orderedNotes = isRtl ? [...notes].reverse() : notes;
  return (
    <div
      dir="ltr"
      className="flex w-max shrink-0 items-start gap-5 pr-5"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {orderedNotes.map((note) => (
        <NoteCard key={note.id} note={note} isLight={isLight} />
      ))}
    </div>
  );
};

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
  useSEO(pageMeta.contact);
  useJSONLD("breadcrumb", buildBreadcrumbSchema(pageBreadcrumbs.contact));
  const reduced = useReducedMotion() ?? false;
  const { openProjectModal } = useProjectModal();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const t = useDict(contactPageDict);
  const modalT = useDict(projectModalDict);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never fill this in
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const nextSteps = t.nextSteps.steps;
  const clientNotes = t.notes.items;
  const clientNotesRow1 = clientNotes.slice(0, 4);
  const clientNotesRow2 = clientNotes.slice(4, 8);
  const projectTypeOptions: SelectOption[] = projectTypeValues.map((value) => ({
    value,
    label: modalT.optionLabels.projectType[value],
  }));
  const budgetOptions: SelectOption[] = budgetValues.map((value) => ({
    value,
    label: modalT.optionLabels.budget[value],
  }));
  const timelineOptions: SelectOption[] = timelineValues.map((value) => ({
    value,
    label: modalT.optionLabels.timeline[value],
  }));

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % nextSteps.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [reduced, nextSteps.length]);

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
      setErrorMessage(t.form.errorRequired);
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
        setErrorMessage(data.message || t.form.errorGeneric);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setWebsite("");
    } catch {
      setErrorMessage(t.form.errorNetwork);
      setStatus("error");
    }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-x-clip ${isLight ? "bg-[#F8FBFF] text-[#0F172A]" : "text-[#f5f7fa]"}`} data-testid="page-contact">
      <div className="page-content-layer">

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
        {/* Light mode only: the two blobs above sit near the top/middle of
            this tall min-h-screen hero and fade out well before the bottom
            edge, so the plain area beneath them met the next section's own
            top-anchored blob abruptly — reading as a hard crop. This bridges
            the gap with a soft bottom-anchored wash. */}
        {isLight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(29,78,216,0.10) 0%, transparent 70%)" }}
          />
        )}
        <SideStars starsPerSide={12} />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: hero text */}
            <div className="flex-1">
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true }}
                className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[2px] uppercase"
                style={{ color: "var(--hero-eyebrow-text)", textShadow: "var(--hero-eyebrow-text-shadow)" }}
              >
                {t.hero.eyebrow}
              </motion.p>
              <motion.h1
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.1} viewport={{ once: true }}
                className={`mt-6 [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-medium leading-[1.04] tracking-[-1.3px] sm:text-[50px] lg:text-[64px] lg:tracking-[-2px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}
              >
                {t.hero.heading}
              </motion.h1>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.2} viewport={{ once: true }}
                className={`mt-7 max-w-[520px] [font-family:'Inter',Helvetica] text-[16px] font-normal leading-[28px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}
              >
                {t.hero.body}
              </motion.p>
              <motion.p
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.3} viewport={{ once: true }}
                className="mt-9 [font-family:'JetBrains_Mono',Helvetica] text-[11px] tracking-[1.8px]"
                style={{ color: "var(--hero-accent-text)", textShadow: "var(--hero-accent-text-shadow)" }}
              >
                {t.hero.tagline}
              </motion.p>

              <motion.div
                variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.4} viewport={{ once: true }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <button
                  type="button"
                  onClick={openProjectModal}
                  data-testid="button-contact-hero-start"
                  className={`flex items-center gap-2 rounded-full px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium transition-opacity hover:opacity-90 ${
                    isLight
                      ? "border border-[rgba(15,23,42,0.10)] bg-[#0F172A] text-white shadow-[0_4px_16px_rgba(15,23,42,0.16)]"
                      : "bg-[#f5f7fa] text-[#080b12]"
                  }`}
                >
                  {t.hero.startAProject} <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </button>
                <Link href="/work">
                  <button
                    type="button"
                    data-testid="button-contact-hero-work"
                    className={`flex items-center gap-2 rounded-full border px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium transition-colors ${
                      isLight
                        ? "border-[rgba(15,23,42,0.14)] bg-[rgba(15,23,42,0.03)] text-[#0F172A] hover:bg-[rgba(15,23,42,0.07)]"
                        : "border-white/[0.14] bg-white/[0.05] text-[#f5f7fa] hover:bg-white/[0.09]"
                    }`}
                  >
                    {t.hero.viewOurWork}
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: signal/orbit visual */}
            <motion.div
              variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={0.15} viewport={{ once: true }}
              className="w-full max-w-[300px] shrink-0 self-center lg:max-w-[340px] lg:self-auto"
            >
              <SignalOrbitVisual reduced={reduced} isLight={isLight} ariaLabel={t.hero.visualAlt} />
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
            <GlassCard
              className={`relative overflow-hidden p-8 sm:p-10 lg:p-14 ${isLight ? "shadow-[0_18px_50px_rgba(15,23,42,0.08)]" : "shadow-[0_40px_120px_rgba(0,0,0,0.5)]"}`}
              isLight={isLight}
            >
              <div className={`absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${isLight ? "via-[rgba(15,23,42,0.12)]" : "via-white/[0.14]"}`} />
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[520px] -translate-x-1/2 rounded-full blur-[110px]" style={{ backgroundColor: "rgba(38,100,255,0.1)" }} />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
                {/* Left: project signal info */}
                <div className="flex flex-col">
                  <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>
                    {t.form.eyebrow}
                  </p>
                  <h2 className={`mt-5 [font-family:'Bricolage_Grotesque',Helvetica] text-[28px] font-medium leading-[1.08] tracking-[-0.8px] lg:text-[36px] lg:tracking-[-1px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
                    {t.form.heading}
                  </h2>
                  <p className={`mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
                    {t.form.body}
                  </p>

                  <div className="mt-9 flex flex-col gap-5">
                    {t.form.infoRows.map((row) => (
                      <div key={row.label} className={`border-t pt-4 first:border-t-0 first:pt-0 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-white/[0.08]"}`}>
                        <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] tracking-[1.2px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa50]"}`}>
                          {row.label}
                        </p>
                        <p className={`mt-1.5 [font-family:'Inter',Helvetica] text-[14px] font-normal leading-[22px] ${isLight ? "text-[#334155]" : "text-[#f5f7fad0]"}`}>
                          {row.value}
                        </p>
                      </div>
                    ))}
                    <div className={`flex items-center gap-2.5 border-t pt-4 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-white/[0.08]"}`}>
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </span>
                      <span className={`[font-family:'Inter',Helvetica] text-[13.5px] font-normal ${isLight ? "text-[#334155]" : "text-[#f5f7fac7]"}`}>
                        {t.form.readyStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: form */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      id="name"
                      label={t.form.fields.name.label}
                      required
                      value={form.name}
                      onChange={(v) => updateField("name", v)}
                      placeholder={t.form.fields.name.placeholder}
                      isLight={isLight}
                    />
                    <FormField
                      id="contact-method"
                      label={t.form.fields.contact.label}
                      required
                      value={form.contact}
                      onChange={(v) => updateField("contact", v)}
                      placeholder={t.form.fields.contact.placeholder}
                      isLight={isLight}
                    />
                  </div>

                  <FormField
                    id="company"
                    label={t.form.fields.company.label}
                    value={form.company}
                    onChange={(v) => updateField("company", v)}
                    placeholder={t.form.fields.company.placeholder}
                    isLight={isLight}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormSelectField
                      id="project-type"
                      label={t.form.fields.projectType.label}
                      required
                      value={form.projectType}
                      onChange={(v) => updateField("projectType", v)}
                      options={projectTypeOptions}
                      placeholder={t.form.fields.projectType.placeholder}
                      isLight={isLight}
                    />
                    <FormSelectField
                      id="budget"
                      label={t.form.fields.budget.label}
                      value={form.budget}
                      onChange={(v) => updateField("budget", v)}
                      options={budgetOptions}
                      placeholder={t.form.fields.budget.placeholder}
                      isLight={isLight}
                    />
                  </div>

                  <FormSelectField
                    id="timeline"
                    label={t.form.fields.timeline.label}
                    value={form.timeline}
                    onChange={(v) => updateField("timeline", v)}
                    options={timelineOptions}
                    placeholder={t.form.fields.timeline.placeholder}
                    isLight={isLight}
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={fieldLabel(isLight)}>
                      {t.form.fields.message.label}<span className="text-[#38bdf8]"> *</span>
                    </label>
                    <textarea
                      id="message"
                      data-testid="input-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder={t.form.fields.message.placeholder}
                      className={`${fieldControl(isLight)} resize-none`}
                    />
                  </div>

                  {/* Honeypot — hidden from real visitors, off-screen (not display:none) so bots that ignore CSS still fill it in */}
                  <div aria-hidden="true" className="absolute start-[-9999px] top-auto h-0 w-0 overflow-hidden">
                    <label htmlFor="website">{t.form.honeypotLabel}</label>
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
                      className={`rounded-xl border px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] ${
                        isLight ? "border-[#f8717150] bg-[#f8717110] text-[#b91c1c]" : "border-[#f8717140] bg-[#f8717112] text-[#fca5a5]"
                      }`}
                    >
                      {errorMessage || t.form.errorRequired}
                    </p>
                  )}
                  {status === "success" && (
                    <p
                      role="status"
                      data-testid="text-form-success"
                      className={`rounded-xl border px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] ${
                        isLight ? "border-[rgba(2,132,199,0.35)] bg-[rgba(2,132,199,0.08)] text-[#075985]" : "border-[#38bdf840] bg-[#38bdf812] text-[#7dd3fc]"
                      }`}
                    >
                      {t.form.success}
                    </p>
                  )}

                  <button
                    type="submit"
                    data-testid="button-submit-contact"
                    disabled={status === "loading"}
                    className={`mt-2 flex items-center justify-center gap-2 rounded-full px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${
                      isLight
                        ? "border border-[rgba(15,23,42,0.10)] bg-[#0F172A] text-white shadow-[0_4px_16px_rgba(15,23,42,0.16)]"
                        : "bg-[#f5f7fa] text-[#080b12]"
                    }`}
                  >
                    {status === "loading" ? t.form.sending : t.form.submit}
                    {status !== "loading" && <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />}
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
              <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.8px] uppercase ${isLight ? "text-[#64748B]" : "text-[#f5f7fa55]"}`}>{t.nextSteps.eyebrow}</p>
              <h2 className={`mt-4 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.9px] lg:text-[42px] lg:tracking-[-1.2px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}>
                {t.nextSteps.heading}
              </h2>
              <p className={`mt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[26px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa6]"}`}>
                {t.nextSteps.body}
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
                  // Dark mode: unchanged near-white tones. Light mode: navy
                  // for the title (inactive was rgba(255,255,255,0.82), pale
                  // white, invisible on a light page) and slate for the body.
                  const titleColor = active ? "#38bdf8" : isLight ? "#0F172A" : "rgba(255,255,255,0.82)";
                  const titleShadow = active ? "0 0 12px rgba(56,189,248,0.35)" : "none";
                  const bodyColor = isLight
                    ? (active ? "#334155" : "#64748B")
                    : (active ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)");
                  const numberTransform = active && !reduced ? "translateY(-1px)" : "translateY(0)";
                  const stepTransition = "[transition:color_600ms_cubic-bezier(0.22,1,0.36,1),text-shadow_600ms_cubic-bezier(0.22,1,0.36,1),opacity_600ms_cubic-bezier(0.22,1,0.36,1),transform_600ms_cubic-bezier(0.22,1,0.36,1)]";
                  return (
                    <motion.div
                      key={step.num}
                      variants={fadeUp} initial={reduced ? "visible" : "hidden"} whileInView="visible" custom={i * 0.1} viewport={{ once: true, margin: "-40px" }}
                      className={`flex gap-6 border-t py-7 first:border-t-0 first:pt-0 ${isLight ? "border-[rgba(15,23,42,0.08)]" : "border-white/[0.08]"}`}
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
        className={`relative w-full overflow-hidden py-24 lg:py-32 ${
          isLight ? "bg-[#F8FBFF]" : "bg-[#03050a] bg-[url(/figmaAssets/backgroundstars-1.svg)] bg-[100%_100%]"
        }`}
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
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[13px] leading-[19.5px] tracking-[1.56px] ${isLight ? "text-[#64748B]" : "text-[#f5f7fa66]"}`}>
              {t.notes.eyebrow}
            </p>
            <h2
              id="contact-notes-heading"
              className={`mt-[18px] [font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-semibold leading-[1.05] tracking-[-1.6px] sm:text-[44px] lg:text-[56px] ${isLight ? "text-[#0F172A]" : "text-[#f5f7fa]"}`}
            >
              {t.notes.heading}
            </h2>
            <p className={`mt-[22px] max-w-[560px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27.5px] ${isLight ? "text-[#475569]" : "text-[#f5f7faa1]"}`}>
              {t.notes.body}
            </p>
          </motion.header>

          {reduced ? (
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {clientNotes.map((note) => (
                <NoteCard key={note.id} note={note} isLight={isLight} />
              ))}
            </div>
          ) : (
            <div className="mt-14 flex flex-col gap-5">
              <div className="group relative">
                {/* dir="ltr" on THIS wrapper (not just the track inside) is
                    required: it's a plain block box, and a wider-than-
                    container block child overflows toward its "end" side —
                    physically LEFT in RTL — so without pinning this
                    element's own direction, the track sat overflowing
                    leftward from a right-anchored start position instead of
                    flush at x=0, throwing off every translateX in the
                    keyframe (a % of the track's own width, computed from a
                    baseline that was never actually at the viewport's left
                    edge). The inner dir="ltr" alone (on the track) only
                    fixed the two NoteRow copies' order relative to each
                    other, not where the whole track sits in the viewport. */}
                <div dir="ltr" className="-my-8 w-full overflow-hidden">
                  <div dir="ltr" className="flex w-max animate-marquee-x items-start py-8 group-hover:[animation-play-state:paused]">
                    <NoteRow notes={clientNotesRow1} isLight={isLight} />
                    <NoteRow notes={clientNotesRow1} isLight={isLight} />
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div dir="ltr" className="-my-8 w-full overflow-hidden">
                  <div
                    dir="ltr"
                    className="flex w-max animate-marquee-x items-start py-8 group-hover:[animation-play-state:paused]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <NoteRow notes={clientNotesRow2} isLight={isLight} />
                    <NoteRow notes={clientNotesRow2} isLight={isLight} />
                  </div>
                </div>
              </div>
              {/* Marquee edge fades — must match this section's own
                  background exactly (previously hardcoded to the dark bg
                  even in light mode, which would have shown a dark stripe
                  over a light section). */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[77px]"
                style={{ background: isLight ? "linear-gradient(90deg, rgba(248,251,255,1) 0%, rgba(248,251,255,0) 100%)" : "linear-gradient(90deg, rgba(3,5,10,1) 0%, rgba(0,0,0,0) 100%)" }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[123px]"
                style={{ background: isLight ? "linear-gradient(270deg, rgba(248,251,255,1) 60%, rgba(0,0,0,0) 100%)" : "linear-gradient(270deg, rgba(3,5,10,1) 60%, rgba(0,0,0,0) 100%)" }}
              />
            </div>
          )}
        </div>
      </section>

      <FinalCtaSection
        eyebrow={t.cta.eyebrow}
        heading={t.cta.heading}
        description={t.cta.description}
        secondaryLabel={t.cta.secondaryLabel}
        secondaryHref="/work"
        primaryTestId="button-contact-cta-start"
        secondaryTestId="button-contact-cta-work"
      />

      </div>
      {/* ══════════════ 6. SHARED FOOTER ══════════════ */}
      <FooterRevealStage />
    </div>
  );
};
