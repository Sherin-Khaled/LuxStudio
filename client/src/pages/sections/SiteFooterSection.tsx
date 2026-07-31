import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import { useTheme } from "@/contexts/ThemeContext";

/*
  Particle dots extracted from the original static background SVG
  (figmaAssets/icon-1.svg): same positions (% of the footer), same diameters,
  and the same effective opacity (the SVG wrapped all dots in a 0.6-opacity
  group). Rendering them as elements lets each one float upward on its own
  duration/delay/drift instead of sitting frozen in one flat image.
  l/t = left/top %, s = size px, o = original path opacity.
*/
const FOOTER_DOTS = [
  { l: 20.23, t: 49.71, s: 4.6, o: 0.10 }, { l: 35.88, t: 88.82, s: 7.1, o: 0.11 },
  { l: 71.11, t: 88.73, s: 4.3, o: 0.21 }, { l: 12.59, t: 85.18, s: 7.4, o: 0.21 },
  { l: 87.73, t: 98.65, s: 8.3, o: 0.10 }, { l: 89.08, t: 17.46, s: 5.4, o: 0.09 },
  { l: 78.90, t: 41.18, s: 6.2, o: 0.17 }, { l: 94.24, t: 81.89, s: 9.4, o: 0.12 },
  { l: 97.79, t: 19.23, s: 8.5, o: 0.07 }, { l: 44.84, t: 69.46, s: 5.1, o: 0.14 },
  { l: 61.68, t: 1.64,  s: 9.3, o: 0.07 }, { l: 55.77, t: 7.21,  s: 5.6, o: 0.08 },
  { l: 81.73, t: 44.80, s: 6.8, o: 0.17 }, { l: 46.62, t: 69.45, s: 4.2, o: 0.15 },
  { l: 64.76, t: 76.12, s: 4.7, o: 0.14 }, { l: 85.45, t: 2.00,  s: 7.6, o: 0.15 },
  { l: 94.93, t: 98.29, s: 7.7, o: 0.14 }, { l: 76.59, t: 65.61, s: 5.7, o: 0.16 },
  { l: 67.37, t: 12.83, s: 7.9, o: 0.06 }, { l: 48.83, t: 80.38, s: 7.8, o: 0.07 },
  { l: 63.77, t: 34.79, s: 9.0, o: 0.16 }, { l: 26.44, t: 87.63, s: 4.1, o: 0.12 },
  { l: 68.38, t: 89.58, s: 5.1, o: 0.08 }, { l: 33.05, t: 8.87,  s: 9.0, o: 0.15 },
  { l: 25.80, t: 48.00, s: 4.5, o: 0.09 }, { l: 34.12, t: 30.80, s: 9.0, o: 0.17 },
  { l: 83.83, t: 30.33, s: 4.0, o: 0.18 }, { l: 16.27, t: 89.82, s: 9.0, o: 0.06 },
  { l: 74.52, t: 42.12, s: 9.9, o: 0.22 }, { l: 66.83, t: 98.26, s: 7.8, o: 0.09 },
  { l: 84.40, t: 26.14, s: 5.5, o: 0.12 }, { l: 60.39, t: 28.03, s: 7.6, o: 0.07 },
  { l: 43.04, t: 16.16, s: 6.8, o: 0.11 }, { l: 60.00, t: 78.93, s: 9.9, o: 0.18 },
  { l: 56.72, t: 14.29, s: 8.9, o: 0.15 }, { l: 89.99, t: 46.06, s: 4.2, o: 0.22 },
  { l: 2.75,  t: 9.01,  s: 9.8, o: 0.20 }, { l: 2.56,  t: 43.12, s: 8.3, o: 0.10 },
  { l: 88.78, t: 40.85, s: 4.2, o: 0.19 }, { l: 22.99, t: 69.99, s: 6.7, o: 0.14 },
  { l: 97.38, t: 92.48, s: 6.6, o: 0.13 },
];

const footerColumns = [
  {
    title: "PAGES",
    items: ["Home", "Work", "Services", "About", "Contact"],
  },
  {
    title: "CAPABILITIES",
    items: [
      "UI/UX Design",
      "Web Development",
      "Dashboards & CMS",
      "Brand & Content",
      "SEO & Performance",
    ],
  },
  {
    title: "CONTACT",
    items: ["Start a Project", "Email", "Behance", "LinkedIn", "Instagram"],
  },
];

const NewsletterForm = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: window.location.pathname, website }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.message || "Please check your email and try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex w-full max-w-[420px] flex-col gap-2.5">
      <p className="[font-family:'JetBrains_Mono',Helvetica] text-xs font-normal leading-[18px] tracking-[1.20px] text-[#f5f7fa6b]">
        STAY UPDATED
      </p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@email.com"
          className="w-full flex-1 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 [font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa] outline-none transition-colors placeholder:text-[#f5f7fa40] focus:border-[#38bdf870] focus:bg-white/[0.05]"
        />
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="footer-newsletter-website">Leave this field empty</label>
          <input
            id="footer-newsletter-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="ghost"
          disabled={status === "loading"}
          className="h-auto shrink-0 rounded-full border-[0.8px] border-[#38bdf852] bg-transparent px-5 py-2.5 [font-family:'Inter',Helvetica] text-[14px] font-medium text-sky-400 hover:bg-[#38bdf80d] hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : (
            <span className="flex items-center gap-1.5">
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </div>
      {status === "error" && (
        <p role="alert" className="[font-family:'Inter',Helvetica] text-[13px] text-[#fca5a5]">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="[font-family:'Inter',Helvetica] text-[13px] text-[#7dd3fc]">
          You're subscribed. We'll be in touch with updates.
        </p>
      )}
    </form>
  );
};

export const SiteFooterSection = (): JSX.Element => {
  const { openProjectModal } = useProjectModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <footer className={`w-full self-stretch transition-colors ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}>
      {/* Footer itself stays dark navy in both themes (a deliberate strong
          final contrast, per spec). The spacer used to fade from the page's
          pale background down into that dark navy over just 80px — too
          short a distance for that much contrast change, so it read as a
          murky dark band rather than atmosphere. In light mode it's now flat
          page-color instead: the footer's own rounded top corner is what
          announces the transition, arriving deliberately rather than fading
          in through a dark smear. */}
      <div
        className={`h-20 w-full ${isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"}`}
      />
      {/* Root cause of the "heavy shadow in light mode" complaint: this
          box-shadow was never theme-gated at all — the same
          0px_-40px_120px_#00000061 (a large, near-black spread) rendered
          identically in both themes. It reads fine sitting above dark mode's
          own near-black page background, but the exact same heavy black
          spread over a pale page in light mode is what looked like a heavy
          gray/black block. Dark mode keeps this exact value; light mode gets
          a dramatically softer shadow instead of none, so the transition
          still reads as gently lifted rather than a hard cut. */}
      <section className={`relative w-full overflow-hidden rounded-t-[88px] bg-[#06152d] ${isLight ? "shadow-[0_-12px_40px_rgba(15,23,42,0.06)]" : "shadow-[0px_-40px_120px_#00000061]"}`}>
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0.12)_30%,rgba(255,255,255,0.12)_70%,rgba(0,0,0,0)_100%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[79px] h-[360px] w-[360px] rounded-full bg-[#7c3aed12] blur-[120px]" />
          <div className="absolute left-[32%] top-[-60px] h-[300px] w-[600px] bg-[#38bdf81a] blur-[140px]" />
          <div className="absolute right-[12%] top-[158px] h-80 w-80 rounded-full bg-[#1d4ed817] blur-[110px]" />
          {/* Floating particle dots — same constellation as the old static SVG,
              each drifting slowly upward on its own duration/delay. */}
          {FOOTER_DOTS.map((dot, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="animate-footer-dot absolute rounded-full bg-[#f5f7fa]"
              style={{
                left: `${dot.l}%`,
                top: `${dot.t}%`,
                width: `${dot.s}px`,
                height: `${dot.s}px`,
                opacity: +(dot.o * 0.6).toFixed(3),
                ["--dot-peak" as string]: Math.min(0.32, +(dot.o * 1.5).toFixed(3)),
                ["--dot-duration" as string]: `${18 + ((i * 3) % 19)}s`,
                ["--dot-delay" as string]: `${-((i * 4.7) % (18 + ((i * 3) % 19)))}s`,
                ["--dot-drift" as string]: `${((i % 5) - 2) * 6}px`,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto flex w-full max-w-[1516px] flex-col px-6 pb-11 pt-[104px] sm:px-8 lg:px-[68px]">
          <div className="flex flex-col gap-6 border-b-[0.8px] border-[#ffffff14] pb-14 md:flex-row md:items-center md:justify-between">
            <h2 className="mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-2xl font-medium leading-9 tracking-[-0.60px] text-[#f5f7fa] sm:text-3xl">
              Ready to build something memorable?
            </h2>
            <Button
              type="button"
              variant="ghost"
              onClick={openProjectModal}
              data-testid="button-footer-cta-start"
              className="h-auto rounded-[999px] border-[0.8px] border-[#38bdf852] bg-transparent px-6 py-3 [font-family:'Inter',Helvetica] text-[15px] font-medium leading-[22.5px] tracking-[-0.08px] text-sky-400 hover:bg-[#38bdf80d] hover:text-sky-300"
            >
              Start a Project →
            </Button>
          </div>
          <div className="grid w-full gap-14 pb-0 pt-[72px] lg:grid-cols-[minmax(320px,447.84px)_1fr] lg:gap-[76.72px]">
            <div className="flex flex-col items-start">
              <h3 className="mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-semibold leading-[57px] tracking-[-0.95px] text-[#f5f7fa]">
                Lux Studio
              </h3>
              <p className="pt-2 [font-family:'Inter',Helvetica] text-base font-normal leading-6 tracking-[-0.08px] text-[#f5f7fac7]">
                Design. Build. Scale.
              </p>
              <p className="max-w-[420px] pt-5 [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[24.3px] tracking-[0] text-[#f5f7faa1]">
                A creative technology studio shaping premium websites, digital
                systems, and brand experiences from strategy to launch.
              </p>
              <NewsletterForm />
            </div>
            <nav aria-label="Footer navigation" className="w-full">
              <div className="grid w-full gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {footerColumns.map((column) => (
                  <div key={column.title} className="flex flex-col items-start">
                    <h4 className="mt-[-1.00px] [font-family:'JetBrains_Mono',Helvetica] text-xs font-normal leading-[18px] tracking-[1.20px] text-[#f5f7fa6b]">
                      {column.title}
                    </h4>
                    <ul className="flex flex-col items-start pt-[18px]">
                      {column.items.map((item) => (
                        <li key={item}>
                          <Button
                            type="button"
                            variant="link"
                            onClick={item === "Start a Project" ? openProjectModal : undefined}
                            data-testid={item === "Start a Project" ? "button-footer-list-start" : undefined}
                            className="h-auto p-0 text-left [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[28.7px] tracking-[0] text-[#f5f7fac7] hover:text-[#f5f7fa] hover:no-underline"
                          >
                            {item}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex w-full flex-col items-start px-0 pb-0 pt-16 sm:pt-20 lg:pt-24">
            <div className="w-full overflow-hidden">
              <div className="[font-family:'Bricolage_Grotesque',Helvetica] text-[56px] font-bold leading-none tracking-[-2px] text-[#ffffff0d] sm:text-[88px] lg:text-[153.4px] lg:tracking-[-6.14px] lg:leading-[153.4px]">
                LUX STUDIO
              </div>
            </div>
            <Separator className="mt-4 bg-[#ffffff0f]" />
            <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0] text-[#f5f7fa6b]">
                © 2026 Lux Studio. All rights reserved.
              </p>
              <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0] text-[#f5f7fa6b]">
                Designed and built by Lux Studio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
