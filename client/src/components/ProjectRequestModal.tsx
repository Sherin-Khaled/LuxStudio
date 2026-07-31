import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { ModalParticleField } from "@/components/ModalParticleField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/* ─── Field data (mirrors ContactPage's project-request fields exactly) ─── */
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

/* ─── Field primitives (same visual language as the Contact page form) ─── */
const fieldLabel = "[font-family:'Inter',Helvetica] text-[13px] font-medium text-[#f5f7faa6]";
const fieldControl =
  "w-full min-h-[56px] rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 [font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa] outline-none transition-colors placeholder:text-[#f5f7fa40] focus:border-[#38bdf870] focus:bg-white/[0.06]";

const FormField = ({
  id,
  label,
  required,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
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
      type="text"
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
        className="z-[10010] overflow-hidden rounded-xl border border-white/[0.12] bg-[#0a0f1af0] text-[#f5f7fa] shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
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

/* ─── Mouse-reactive parallax: writes --mouse-x/--mouse-y directly onto the
   given element via a ref, throttled with requestAnimationFrame, so movement
   is smooth and never blocked on a React re-render. Disabled entirely (no
   listener attached at all) when reduced motion is requested. ─── */
function useMouseParallax(ref: React.RefObject<HTMLElement>, enabled: boolean) {
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };

      if (frame.current == null) {
        frame.current = requestAnimationFrame(() => {
          el.style.setProperty("--mouse-x", target.current.x.toFixed(3));
          el.style.setProperty("--mouse-y", target.current.y.toFixed(3));
          frame.current = null;
        });
      }
    };

    el.addEventListener("mousemove", handleMove);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [ref, enabled]);
}

export const ProjectRequestModal = (): JSX.Element => {
  const { isOpen, closeProjectModal, triggerRef } = useProjectModal();
  const reduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  useMouseParallax(cardRef, isOpen && !reduced);

  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real visitors never fill this in

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
      setErrorMessage("Please check the required fields and try again.");
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
      setErrorMessage("Please check the required fields and try again.");
      setStatus("error");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) closeProjectModal();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[10000] bg-[#03050acc] backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto p-3 sm:p-4 lg:p-8">
              <Dialog.Content
                asChild
                forceMount
                aria-modal="true"
                onCloseAutoFocus={(e) => {
                  e.preventDefault();
                  triggerRef.current?.focus?.();
                }}
              >
                <motion.div
                  ref={cardRef}
                  style={{ "--mouse-x": 0, "--mouse-y": 0 } as React.CSSProperties}
                  initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : 16 }}
                  transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[920px] flex-col overflow-hidden rounded-[24px] border border-[rgba(56,189,248,0.22)] bg-[rgba(8,15,28,0.72)] shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(56,189,248,0.12)] backdrop-blur-2xl sm:w-full sm:max-h-[calc(100dvh-48px)] sm:rounded-[32px] lg:max-h-[calc(100dvh-64px)]"
                >
                  {/* Layering: overlay (above) → particle field → gradient glow → dark scrim → card content */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <ModalParticleField containerRef={cardRef} />
                    <div
                      className="project-modal-glow absolute -inset-1/4"
                      style={{
                        background:
                          "radial-gradient(circle at 28% 22%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at 76% 82%, rgba(124,58,237,0.14), transparent 55%)",
                      }}
                    />
                    {/* Subtle scrim so star/glow layers never fight with field text for readability */}
                    <div className="absolute inset-0" style={{ background: "rgba(2,6,23,0.22)" }} />
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close"
                      data-testid="button-close-project-modal"
                      className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f5f7faa6] transition-colors hover:border-white/20 hover:bg-white/10 hover:text-[#f5f7fa]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>

                  {/* Header — stays visible, never scrolls away */}
                  <div className="relative z-10 flex-shrink-0 px-6 pb-6 pt-6 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
                    <Dialog.Title className="max-w-[560px] pr-10 [font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-medium leading-tight text-[#f5f7fa] sm:text-[32px]">
                      Start your project signal.
                    </Dialog.Title>
                    <Dialog.Description className="mt-3 max-w-[560px] [font-family:'Inter',Helvetica] text-[14.5px] leading-[24px] text-[#f5f7faa6] sm:text-[15px]">
                      Tell us what you want to build, improve, or launch — and we'll help
                      shape the right strategy, design, and technical direction.
                    </Dialog.Description>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative z-10 flex min-h-0 flex-1 flex-col"
                  >
                    {/* Scrollable body — everything else scrolls inside here, not the page */}
                    <div className="modal-scroll-body min-h-0 flex-1 overflow-y-auto px-6 pb-6 sm:px-10 lg:px-14">
                      <div className="flex flex-col gap-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            id="project-modal-name"
                            label="Name"
                            required
                            value={form.name}
                            onChange={(v) => updateField("name", v)}
                            placeholder="Your full name"
                          />
                          <FormField
                            id="project-modal-contact"
                            label="Email or WhatsApp"
                            required
                            value={form.contact}
                            onChange={(v) => updateField("contact", v)}
                            placeholder="you@email.com or WhatsApp number"
                          />
                        </div>

                        <FormField
                          id="project-modal-company"
                          label="Company / Brand"
                          value={form.company}
                          onChange={(v) => updateField("company", v)}
                          placeholder="Business or brand name"
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormSelectField
                            id="project-modal-type"
                            label="Project type"
                            required
                            value={form.projectType}
                            onChange={(v) => updateField("projectType", v)}
                            options={projectTypeOptions}
                            placeholder="Select a project type"
                          />
                          <FormSelectField
                            id="project-modal-budget"
                            label="Budget range"
                            value={form.budget}
                            onChange={(v) => updateField("budget", v)}
                            options={budgetOptions}
                            placeholder="Select a budget range"
                          />
                        </div>

                        <FormSelectField
                          id="project-modal-timeline"
                          label="Timeline"
                          value={form.timeline}
                          onChange={(v) => updateField("timeline", v)}
                          options={timelineOptions}
                          placeholder="Select a timeline"
                        />

                        <div className="flex flex-col gap-2">
                          <label htmlFor="project-modal-message" className={fieldLabel}>
                            Message<span className="text-[#38bdf8]"> *</span>
                          </label>
                          <textarea
                            id="project-modal-message"
                            data-testid="input-project-modal-message"
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => updateField("message", e.target.value)}
                            placeholder="Tell us about your business, project goals, current website, required features, references, or anything you want us to know."
                            className={`${fieldControl} min-h-[140px] resize-none`}
                          />
                        </div>

                        {/* Honeypot — off-screen, not display:none, so bots that ignore CSS still fill it in */}
                        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                          <label htmlFor="project-modal-website">Leave this field empty</label>
                          <input
                            id="project-modal-website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer — stays visible, holds submission feedback + the submit button */}
                    <div className="relative z-10 flex-shrink-0 border-t border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md sm:px-10 lg:px-14">
                      {status === "error" && (
                        <p
                          role="alert"
                          data-testid="text-project-modal-error"
                          className="mb-4 rounded-xl border border-[#f8717140] bg-[#f8717112] px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] text-[#fca5a5]"
                        >
                          {errorMessage || "Please check the required fields and try again."}
                        </p>
                      )}
                      {status === "success" && (
                        <p
                          role="status"
                          data-testid="text-project-modal-success"
                          className="mb-4 rounded-xl border border-[#38bdf840] bg-[#38bdf812] px-4 py-3 [font-family:'Inter',Helvetica] text-[13.5px] text-[#7dd3fc]"
                        >
                          Project signal received. We'll review your message and respond soon.
                        </p>
                      )}
                      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="[font-family:'Inter',Helvetica] text-[12.5px] leading-[18px] text-[#f5f7fa75]">
                          Project signal will be saved to dashboard and sent to email when configured.
                        </p>
                        <button
                          type="submit"
                          data-testid="button-submit-project-modal"
                          disabled={status === "loading"}
                          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#f5f7fa] px-7 py-3.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {status === "loading" ? "Sending…" : "Send Project Signal"}
                          {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
