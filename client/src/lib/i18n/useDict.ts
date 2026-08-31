import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Every translation dictionary is a plain `{ en, ar }` pair with identical
 * shapes (the `ar` object's type is inferred from `en`, so a missing Arabic
 * key is a compile error, not a silent English fallback at runtime).
 */
export type Dict<T> = { en: T; ar: T };

export function useDict<T>(dict: Dict<T>): T {
  const { language } = useLanguage();
  return dict[language];
}
