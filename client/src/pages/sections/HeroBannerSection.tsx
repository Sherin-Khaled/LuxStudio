import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { StarsBackground } from "@/components/backgrounds/StarsBackground";
import { ShootingStars } from "@/components/backgrounds/ShootingStars";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: null },
  { label: "About", href: null },
  { label: "Contact", href: null },
];

export const HeroBannerSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pinDisabled = reduced || isMobile;

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked motion values — only meaningful when pinDisabled is false
  const bgScale = useTransform(scrollYProgress, [0, 0.65], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#03050a]"
      style={pinDisabled ? undefined : { minHeight: "165vh" }}
      aria-label="Hero banner"
    >
      {/* ── Inner sticky frame ── */}
      <div
        className={
          pinDisabled
            ? "relative overflow-hidden"
            : "sticky top-0 h-screen overflow-hidden"
        }
      >
        {/* ── Background image (scale on scroll) ── */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/figmaAssets/imagewithfallback.png')",
            scale: pinDisabled ? 1 : bgScale,
            transformOrigin: "center center",
          }}
        >
          {/* Dark + radial gradient overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,10,0.25)_0%,rgba(0,0,0,0)_16%,rgba(0,0,0,0)_72%,rgba(3,5,10,0.22)_85%),radial-gradient(50%_50%_at_50%_42%,rgba(112,215,255,0.05)_0%,rgba(0,0,0,0)_65%),radial-gradient(50%_50%_at_50%_44%,rgba(0,0,0,0)_18%,rgba(3,5,10,0.62)_80%),linear-gradient(0deg,rgba(3,5,10,0.5)_0%,rgba(3,5,10,0.5)_100%)]" />
          {/* Figma overlay frame */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            alt=""
            aria-hidden="true"
            src="/figmaAssets/container.svg"
          />
          {/* Bottom gradient fade-out */}
          <div className="absolute inset-x-0 bottom-0 h-[280px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(3,5,10,0.3)_32%,rgba(3,5,10,0.72)_62%,rgba(3,5,10,0.92)_82%,rgba(3,5,10,1)_100%)]" />
        </motion.div>

        {/* ── Layer 3: Animated stars ── */}
        <StarsBackground
          count={isMobile ? 40 : 72}
          className="z-[1]"
        />

        {/* ── Layer 4: Shooting stars (below text, above bg) ── */}
        {!isMobile && <ShootingStars className="z-[2]" />}

        {/* ── Layer 5: Navbar (always on top) ── */}
        <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6 lg:px-14">
          <nav
            className="mx-auto flex w-full max-w-[1407px] items-center justify-between rounded-2xl border border-[#ffffff1f] bg-[#03050a70] px-4 py-3 shadow-[0px_4px_28px_#00000059] backdrop-blur-sm sm:px-7"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="relative w-fit mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-[17px] font-semibold leading-[25.5px] tracking-[-0.43px] text-[#f5f7fa] whitespace-nowrap"
            >
              Lux Studio
            </Link>
            <ul className="hidden items-center gap-8 md:flex">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0.13px] text-[#f5f7faad] whitespace-nowrap transition-colors hover:text-[#f5f7fa]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[0.13px] text-[#f5f7fa38] whitespace-nowrap cursor-default">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[26843500px] border border-[#ffffff1f] bg-[#ffffff0e] px-3 py-1.5"
              >
                <img
                  className="h-[11px] w-[11px]"
                  alt="Sound icon"
                  src="/figmaAssets/icon.svg"
                />
                <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-center text-[11.5px] font-medium leading-[17.2px] tracking-[0.29px] text-[#f5f7fa59] whitespace-nowrap">
                  Sound Off
                </span>
              </button>
              <button type="button" aria-label="Open menu" className="shrink-0">
                <img
                  className="h-8 w-8"
                  alt="Menu icon button"
                  src="/figmaAssets/iconbutton.svg"
                />
              </button>
              <Button
                type="button"
                className="h-auto rounded-full bg-[#f5f7fa] px-5 py-[7px] shadow-[0px_3px_12px_#00000047,0px_0px_20px_#f5f7fa1a] hover:bg-[#f5f7fa] hidden sm:inline-flex"
              >
                <span className="relative w-fit [font-family:'Inter',Helvetica] text-center text-[13px] font-medium leading-[19.5px] tracking-[0.13px] text-[#080b12] whitespace-nowrap">
                  Start a Project
                </span>
              </Button>
            </div>
          </nav>
        </header>

        {/* ── Layer 6: Hero content (animates up + fades) ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center px-6 pb-[120px] pt-[140px] text-center sm:px-10 lg:px-16"
          style={{
            minHeight: pinDisabled ? "730px" : "100vh",
            y: pinDisabled ? 0 : contentY,
            opacity: pinDisabled ? 1 : contentOpacity,
          }}
        >
          <div className="flex max-w-[872px] flex-col items-center pb-7">
            <h1 className="relative mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-center text-[48px] font-semibold leading-[0.96] tracking-[-1.8px] text-[#f5f7fa] sm:text-[72px] sm:tracking-[-2.4px] lg:text-[112px] lg:tracking-[-3.36px]">
              Design. Build. Scale.
            </h1>
          </div>
          <div className="flex flex-col items-center pb-[22px]">
            <p className="relative mt-[-1.00px] max-w-[620px] [font-family:'Inter',Helvetica] text-center text-[16px] font-normal leading-[28px] tracking-[0.10px] text-[#f5f7faad] sm:text-[19.9px] sm:leading-[33.9px]">
              From strategy to launch, we create digital experiences people
              remember.
            </p>
          </div>
          <div className="flex items-center gap-1.5 pb-9">
            <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-center text-[15px] font-normal leading-[22.5px] tracking-[0.38px] text-[#f5f7fa61] whitespace-nowrap">
              We create
            </span>
            <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-center text-[15px] font-medium leading-[22.5px] tracking-[0.38px] text-[#70d7ff] whitespace-nowrap">
              Digital Experiences
            </span>
            <span
              className="h-[15.75px] w-[1.5px] rounded-[1px] bg-[#70d7ffd1]"
              aria-hidden="true"
            />
          </div>
          <div className="inline-flex flex-wrap items-center justify-center gap-3.5">
            <Button
              type="button"
              className="h-auto rounded-full bg-[#f5f7fa] px-[30px] py-[15.75px] shadow-[0px_4px_20px_#00000052,0px_0px_32px_#f5f7fa1c] hover:bg-[#f5f7fa]"
            >
              <span className="relative w-fit [font-family:'Inter',Helvetica] text-center text-[15px] font-medium leading-[22.5px] tracking-[0.15px] text-[#080b12] whitespace-nowrap">
                Start a Project
              </span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-auto rounded-full border-[0.8px] border-[#f5f7fa33] bg-[#f5f7fa12] px-[30px] py-[15.75px] text-[#f5f7fa] hover:bg-[#f5f7fa1a] hover:text-[#f5f7fa]"
            >
              <span className="relative w-fit [font-family:'Inter',Helvetica] text-center text-[15px] font-normal leading-[22.5px] tracking-[0.15px] whitespace-nowrap">
                View Our Work
              </span>
            </Button>
          </div>
        </motion.div>

        {/* ── Scroll indicator (fades on scroll) ── */}
        <motion.div
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-1.5"
          style={{ opacity: pinDisabled ? 1 : indicatorOpacity }}
        >
          <p className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1.40px] text-[#f5f7fa59] whitespace-nowrap">
            SCROLL TO EXPLORE
          </p>
          <img
            className="flex-none"
            alt="Scroll indicator"
            src="/figmaAssets/container-1.svg"
          />
        </motion.div>
      </div>
    </section>
  );
};
