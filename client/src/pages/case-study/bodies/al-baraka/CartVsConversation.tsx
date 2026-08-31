import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, ShoppingCart, ClipboardList, Package, CreditCard } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const TRADITIONAL_ICONS = [Package, ShoppingCart, CreditCard];
const ALBARAKA_ICONS = [Package, ClipboardList, MessageCircle];

/**
 * The "cart with nothing to buy" idea, shown rather than told: two short,
 * near-identical-looking flows side by side, differing only in their last
 * step — the same familiar ecommerce shape (pick → collect → act), ending
 * in a conversation instead of a payment. Deliberately light on copy: the
 * two three-step rows carry the whole argument.
 */
const FlowRow = ({
  label,
  steps,
  icons,
  emphasis,
}: {
  label: string;
  steps: string[];
  icons: typeof TRADITIONAL_ICONS;
  emphasis?: boolean;
}): JSX.Element => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  return (
    <div
      className={`flex flex-col gap-5 rounded-[24px] border p-6 sm:p-8 ${
        emphasis
          ? isLight
            ? "border-[#4F602733] bg-[#4F60270a]"
            : "border-[#a3e63533] bg-[#a3e63508]"
          : isLight
            ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.55)]"
            : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <p
        className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.4px] uppercase ${
          emphasis ? (isLight ? "text-[#4F6027]" : "text-[#c8f584]") : isLight ? "text-[rgba(15,23,42,0.45)]" : "text-[#f5f7fa60]"
        }`}
      >
        {label}
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {steps.map((step, i) => {
          const Icon = icons[i] ?? icons[icons.length - 1];
          const isLast = i === steps.length - 1;
          return (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div
                className={`flex flex-1 flex-col items-center gap-2.5 rounded-2xl border px-4 py-5 text-center [transition:transform_300ms_ease] ${
                  isLast && emphasis
                    ? "border-[#4F602766] bg-[#4F602714] dark:border-[#a3e63566] dark:bg-[#a3e63518]"
                    : isLight
                      ? "border-[rgba(15,23,42,0.08)] bg-white"
                      : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isLast && emphasis
                      ? "bg-[#4F6027] text-white dark:bg-[#a3e635] dark:text-[#0e1a06]"
                      : isLight
                        ? "bg-[rgba(15,23,42,0.05)] text-[rgba(15,23,42,0.60)]"
                        : "bg-white/[0.06] text-[#f5f7fa80]"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className={`[font-family:'Inter',Helvetica] text-[13px] font-medium ${isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}`}>
                  {step}
                </span>
              </div>
              {!isLast && (
                <ArrowRight
                  className={`h-4 w-4 shrink-0 ${isRTL ? "rotate-180" : ""} ${isLight ? "text-[rgba(15,23,42,0.25)]" : "text-[#f5f7fa38]"}`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CartVsConversation = ({
  traditional,
  albaraka,
}: {
  traditional: { label: string; steps: string[] };
  albaraka: { label: string; steps: string[] };
}): JSX.Element => {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4"
    >
      <FlowRow label={traditional.label} steps={traditional.steps} icons={TRADITIONAL_ICONS} />
      <FlowRow label={albaraka.label} steps={albaraka.steps} icons={ALBARAKA_ICONS} emphasis />
    </motion.div>
  );
};
