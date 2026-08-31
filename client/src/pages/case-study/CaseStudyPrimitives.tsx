import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Check } from "lucide-react";

/** Small pill tag — same visual language as the Work page's project tags,
    reused here so case study copy (discovery filters, reliability
    capabilities, admin areas, services) renders consistently. */
export const CaseStudyChip = ({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "accent" }): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const accent = tone === "accent";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-medium leading-[17px] tracking-[0.1px] whitespace-nowrap ${
        isLight
          ? accent
            ? "border-[rgba(56,189,248,0.35)] bg-[rgba(56,189,248,0.08)] text-[#0284c7]"
            : "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.03)] text-[rgba(15,23,42,0.72)]"
          : accent
            ? "border-[#38bdf83a] bg-[#38bdf80f] text-sky-300"
            : "border-[#ffffff12] bg-[#ffffff06] text-[#f5f7fab0]"
      }`}
    >
      {accent && <Check className="h-3 w-3 shrink-0" aria-hidden="true" />}
      {label}
    </span>
  );
};

export const CaseStudyChipList = ({ items, tone = "neutral" }: { items: string[]; tone?: "neutral" | "accent" }): JSX.Element => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <CaseStudyChip key={item} label={item} tone={tone} />
    ))}
  </div>
);

/** Horizontal step sequence (Preview → Validate → Classify → …), wraps to a
    vertical stack on narrow screens. Used by both the Catalogue Import and
    Product Media Pipeline sections. */
export const CaseStudyStepFlow = ({ steps }: { steps: string[] }): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();

  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-4" aria-label="Workflow steps">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 [font-family:'Inter',Helvetica] text-[13px] font-medium ${
              isLight
                ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.7)] text-[#0f172a] shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                : "border-[#ffffff14] bg-[#ffffff06] text-[#f5f7fa]"
            }`}
          >
            <span className={`[font-family:'JetBrains_Mono',Helvetica] text-[11px] ${isLight ? "text-[#0284c7]" : "text-sky-400"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight
              className={`h-3.5 w-3.5 shrink-0 ${dir === "rtl" ? "rotate-180" : ""} ${isLight ? "text-[rgba(15,23,42,0.25)]" : "text-[#f5f7fa38]"}`}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
};
