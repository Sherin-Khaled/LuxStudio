import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: null },
];

interface NavbarProps {
  variant?: "fixed" | "absolute";
}

export const Navbar = ({ variant = "fixed" }: NavbarProps) => {
  const [location] = useLocation();

  return (
    <header
      data-testid="navbar"
      className={`${variant === "fixed" ? "fixed" : "absolute"} inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-14`}
    >
      <nav
        className="mx-auto flex w-full max-w-[1407px] items-center justify-between rounded-2xl border border-[#ffffff1f] bg-[#03050a70] px-4 py-3 shadow-[0px_4px_28px_#00000059] backdrop-blur-sm sm:px-7"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          data-testid="link-home"
          className="relative w-fit mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-[17px] font-semibold leading-[25.5px] tracking-[-0.43px] text-[#f5f7fa] whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Lux Studio
        </Link>

        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navLinks.map((item) => {
            const isActive = item.href !== null && location === item.href;
            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    data-testid={`link-${item.label.toLowerCase()}`}
                    className={`relative [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0.13px] whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-[#f5f7fa]"
                        : "text-[#f5f7faad] hover:text-[#f5f7fa]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-px rounded-full bg-sky-400/50" />
                    )}
                  </Link>
                ) : (
                  <span className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0.13px] text-[#f5f7fa38] cursor-default select-none whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            data-testid="button-sound"
            className="inline-flex items-center gap-1.5 rounded-[26843500px] border border-[#ffffff1f] bg-[#ffffff0e] px-3 py-1.5"
          >
            <img className="h-[11px] w-[11px]" alt="Sound icon" src="/figmaAssets/icon.svg" />
            <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-center text-[11.5px] font-medium leading-[17.2px] tracking-[0.29px] text-[#f5f7fa59] whitespace-nowrap">
              Sound Off
            </span>
          </button>
          <button
            type="button"
            aria-label="Open menu"
            data-testid="button-menu"
            className="shrink-0"
          >
            <img className="h-8 w-8" alt="Menu icon button" src="/figmaAssets/iconbutton.svg" />
          </button>
          <Button
            type="button"
            data-testid="button-start-project-nav"
            className="h-auto rounded-full bg-[#f5f7fa] px-5 py-[7px] shadow-[0px_3px_12px_#00000047,0px_0px_20px_#f5f7fa1a] hover:bg-[#f5f7fa] hidden sm:inline-flex"
          >
            <span className="relative w-fit [font-family:'Inter',Helvetica] text-center text-[13px] font-medium leading-[19.5px] tracking-[0.13px] text-[#080b12] whitespace-nowrap">
              Start a Project
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
};
