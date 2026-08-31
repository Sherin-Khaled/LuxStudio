import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

type DemoLang = "en" | "ar";

const NAV_ITEMS: Record<DemoLang, string[]> = {
  en: ["Home", "Products", "Export", "About", "Contact"],
  ar: ["الرئيسية", "المنتجات", "التصدير", "من نحن", "تواصل"],
};

const HERO_COPY: Record<DemoLang, { eyebrow: string; title: string }> = {
  en: { eyebrow: "AUTHENTIC EGYPTIAN HERITAGE", title: "Olives Cultivated With Care, Exported With Pride" },
  ar: { eyebrow: "تراث مصري أصيل", title: "زيتون مزروع بعناية، يُصدَّر بفخر" },
};

/**
 * A small, self-contained EN ↔ AR / LTR ↔ RTL demo built from real copy
 * pulled directly from the live Al Baraka locale files (`en.json`/`ar.json`
 * — the homepage eyebrow/title and primary nav labels), not invented
 * strings. Toggling flips its own internal `dir`, independent of Lux
 * Studio's own site-wide language toggle, so switching languages here never
 * changes the rest of this page.
 */
export const BilingualFlip = (): JSX.Element => {
  const [lang, setLang] = useState<DemoLang>("en");
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1 self-start rounded-full border border-[rgba(15,23,42,0.08)] p-1 dark:border-white/10">
        {(["en", "ar"] as DemoLang[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={lang === option}
            className={`rounded-full px-4 py-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-medium transition-colors ${
              lang === option
                ? "bg-[#4F6027] text-white dark:bg-[#a3e635] dark:text-[#0e1a06]"
                : isLight
                  ? "text-[rgba(15,23,42,0.55)] hover:text-[#0f172a]"
                  : "text-[#f5f7fa70] hover:text-[#f5f7fa]"
            }`}
          >
            {option === "en" ? "English" : "العربية"}
          </button>
        ))}
      </div>

      <div
        dir={dir}
        className={`overflow-hidden rounded-[24px] border p-6 sm:p-8 ${
          isLight ? "border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.6)]" : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {/* Nav row — reverses reading order in RTL exactly as the real
            header does, driven by the same `dir` attribute. */}
        <nav aria-label="Demo navigation" className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[rgba(15,23,42,0.06)] pb-5 dark:border-white/10">
          {NAV_ITEMS[lang].map((item, i) => (
            <span
              key={item}
              className={`[font-family:'Inter',Helvetica] text-[13px] ${
                i === 0
                  ? isLight
                    ? "font-semibold text-[#0f172a]"
                    : "font-semibold text-[#f5f7fa]"
                  : isLight
                    ? "text-[rgba(15,23,42,0.55)]"
                    : "text-[#f5f7fa70]"
              }`}
            >
              {item}
            </span>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={reduced ? { opacity: 1 } : { opacity: 0, x: lang === "ar" ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, x: lang === "ar" ? 16 : -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pt-6"
          >
            <p className={`[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[1.4px] uppercase ${isLight ? "text-[#4F6027]" : "text-[#c8f584]"}`}>
              {HERO_COPY[lang].eyebrow}
            </p>
            <p
              className={`mt-3 max-w-[380px] [font-family:'EB_Garamond',Helvetica] text-[22px] font-medium leading-[1.3] sm:text-[26px] ${
                isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
              }`}
            >
              {HERO_COPY[lang].title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
