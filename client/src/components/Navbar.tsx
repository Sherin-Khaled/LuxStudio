import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Languages, Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useAudioController } from "@/hooks/use-audio-controller";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDict } from "@/lib/i18n/useDict";
import { commonDict } from "@/lib/i18n/common";

export const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openProjectModal } = useProjectModal();
  const { isPlaying: isSoundOn, toggle: toggleSound } = useAudioController();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const { language, toggleLanguage } = useLanguage();
  const t = useDict(commonDict);
  const navLinks = [
    { key: "work", label: t.nav.work, href: "/work" },
    { key: "services", label: t.nav.services, href: "/services" },
    { key: "process", label: t.nav.process, href: "/process" },
    { key: "about", label: t.nav.about, href: "/about" },
    { key: "contact", label: t.nav.contact, href: "/contact" },
  ];
  // Per spec, the accessible label always names the *target* language, so it
  // reads from the language being switched to, not the current dictionary.
  const languageSwitchLabel =
    language === "en" ? commonDict.en.language.switchToArabic : commonDict.ar.language.switchToEnglish;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="navbar"
      className="fixed left-1/2 top-5 z-[9999] w-[calc(100%-2rem)] max-w-[1407px] -translate-x-1/2 sm:top-6 sm:w-[calc(100%-3rem)] lg:w-[calc(100%-7rem)]"
    >
      <nav
        className={`overflow-hidden rounded-2xl border px-4 py-3 transition-colors sm:px-7 ${
          isLight
            ? "border-[rgba(15,23,42,0.10)] bg-[rgba(255,255,255,0.68)] shadow-[0px_4px_24px_rgba(15,23,42,0.10)] backdrop-blur-[18px]"
            : "border-[#ffffff1f] bg-[#03050a70] shadow-[0px_4px_28px_#00000059] backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            data-testid="link-home"
            aria-label="Lux Studio home"
            dir="ltr"
            className={`shrink-0 [font-family:'Bricolage_Grotesque',Helvetica] text-[17px] font-semibold leading-[25.5px] tracking-[-0.43px] transition-opacity hover:opacity-90 ${
              isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"
            }`}
          >
            {t.brand}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8" role="list">
            {navLinks.map((item) => {
              const isActive = location === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    data-testid={`link-${item.key}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative whitespace-nowrap [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0.13px] transition-colors ${
                      isLight
                        ? isActive
                          ? "text-[#0f172a]"
                          : "text-[rgba(15,23,42,0.55)] hover:text-[#0f172a]"
                        : isActive
                          ? "text-[#f5f7fa]"
                          : "text-[#f5f7faad] hover:text-[#f5f7fa]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 inset-x-0 h-px rounded-full bg-sky-400/60" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={toggleSound}
              data-testid="button-sound"
              className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 transition-colors sm:px-3 ${
                isLight
                  ? "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.05)] text-[rgba(15,23,42,0.55)]"
                  : "border-[#ffffff1f] bg-[#ffffff0e] text-[#f5f7fa59]"
              }`}
              aria-label={isSoundOn ? t.sound.onLabel : t.sound.offLabel}
              title={isSoundOn ? t.sound.onLabel : t.sound.offLabel}
            >
              {isSoundOn ? (
                <Volume2 className="h-3 w-3" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3 w-3" aria-hidden="true" />
              )}
              <span className="hidden [font-family:'Inter',Helvetica] text-[11.5px] font-medium leading-[17.2px] tracking-[0.29px] sm:inline">
                {isSoundOn ? t.sound.on : t.sound.off}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              data-testid="button-theme"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                isLight
                  ? "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.05)] text-[rgba(15,23,42,0.55)] hover:bg-[rgba(15,23,42,0.08)] hover:text-[#0f172a]"
                  : "border-[#ffffff1f] bg-[#ffffff0e] text-[#f5f7faad] hover:bg-[#ffffff18] hover:text-[#f5f7fa]"
              }`}
              aria-label={isLight ? t.theme.toDark : t.theme.toLight}
              title={isLight ? t.theme.toDark : t.theme.toLight}
            >
              {isLight ? (
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              data-testid="button-language"
              className={`inline-flex h-8 items-center gap-1 rounded-full border px-2.5 transition-colors ${
                isLight
                  ? "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.05)] text-[rgba(15,23,42,0.55)] hover:bg-[rgba(15,23,42,0.08)] hover:text-[#0f172a]"
                  : "border-[#ffffff1f] bg-[#ffffff0e] text-[#f5f7faad] hover:bg-[#ffffff18] hover:text-[#f5f7fa]"
              }`}
              aria-label={languageSwitchLabel}
              title={languageSwitchLabel}
            >
              <Languages className="h-3 w-3" aria-hidden="true" />
              <span dir="ltr" className="[font-family:'Inter',Helvetica] text-[11.5px] font-medium leading-[17.2px] tracking-[0.29px]">
                {t.language.code}
              </span>
            </button>

            <button
              type="button"
              onClick={openProjectModal}
              data-testid="button-start-project-nav"
              className={`hidden h-8 items-center rounded-full px-5 [font-family:'Inter',Helvetica] text-[13px] font-medium leading-[19.5px] tracking-[0.13px] transition-colors lg:inline-flex ${
                isLight
                  ? "bg-[#0b0f1a] text-[#f5f7fa] shadow-[0px_3px_14px_rgba(2,6,23,0.28),0px_0px_20px_rgba(2,6,23,0.10)] hover:bg-[#141a2b]"
                  : "bg-[#f5f7fa] text-[#080b12] shadow-[0px_3px_12px_#00000047,0px_0px_20px_#f5f7fa1a] hover:bg-white"
              }`}
            >
              {t.actions.startAProject}
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? t.actions.closeMenu : t.actions.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              data-testid="button-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors lg:hidden ${
                isLight
                  ? "border-[rgba(15,23,42,0.10)] bg-[rgba(15,23,42,0.05)] text-[rgba(15,23,42,0.55)] hover:bg-[rgba(15,23,42,0.08)] hover:text-[#0f172a]"
                  : "border-[#ffffff1f] bg-[#ffffff0e] text-[#f5f7faad] hover:bg-[#ffffff18] hover:text-[#f5f7fa]"
              }`}
            >
              {isMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={`${isMenuOpen ? "grid" : "hidden"} mt-3 border-t pt-3 lg:hidden ${
            isLight ? "border-[rgba(15,23,42,0.10)]" : "border-[#ffffff14]"
          }`}
        >
          <ul className="grid gap-1" role="list">
            {navLinks.map((item) => {
              const isActive = location === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-xl px-3 py-2.5 [font-family:'Inter',Helvetica] text-[13px] transition-colors ${
                      isLight
                        ? isActive
                          ? "bg-[rgba(15,23,42,0.06)] text-[#0f172a]"
                          : "text-[rgba(15,23,42,0.55)] hover:bg-[rgba(15,23,42,0.05)] hover:text-[#0f172a]"
                        : isActive
                          ? "bg-white/[0.08] text-[#f5f7fa]"
                          : "text-[#f5f7faad] hover:bg-white/[0.05] hover:text-[#f5f7fa]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            data-testid="button-start-project-nav-mobile"
            onClick={() => {
              setIsMenuOpen(false);
              openProjectModal();
            }}
            className={`mt-3 flex h-10 items-center justify-center rounded-full px-5 [font-family:'Inter',Helvetica] text-[13px] font-medium transition-colors ${
              isLight
                ? "bg-[#0b0f1a] text-[#f5f7fa] shadow-[0px_3px_14px_rgba(2,6,23,0.28)]"
                : "bg-[#f5f7fa] text-[#080b12] shadow-[0px_3px_12px_#00000047]"
            }`}
          >
            {t.actions.startAProject}
          </button>
        </div>
      </nav>
    </header>
  );
};
