import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "ar";

const LANGUAGE_STORAGE_KEY = "lux-language";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

/**
 * Single source of truth for the site's English/Arabic language + text
 * direction. Mounted once at the app root, mirrors ThemeProvider's shape
 * exactly so the two independent toggles behave consistently.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initializer only — the actual attributes are applied by the effect
  // below (index.html also sets them synchronously pre-mount to avoid a
  // layout-direction flash on reload for returning Arabic users).
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Storage can be unavailable (private mode, disabled cookies) — the
      // preference just won't persist across visits, nothing else depends on it.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, dir: language === "ar" ? "rtl" : "ltr" }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
