import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { LIGHT } from "@/lib/lightModeColors";

/* Fade-up-and-unblur reveal, triggered once per element as it enters the
   viewport — replaces the previous pinned/scrubbed GSAP timeline. `custom`
   carries each element's own delay so the headline leads, the paragraph
   follows, then the three principles stagger in (120-180ms apart) rather
   than everything appearing at once. */
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const principles = [
  {
    id: "P.01",
    title: "Strategy before screens",
    body: "We define the purpose, audience, and experience before designing the interface.",
    detail:
      "Every project starts with understanding the business, the audience, the offer, and the result the website or system needs to achieve.",
  },
  {
    id: "P.02",
    title: "Design that can actually be built",
    body: "We create interfaces with responsiveness, performance, and development in mind.",
    detail:
      "The design is shaped to look premium, work across screen sizes, and translate cleanly into real frontend code without losing quality.",
  },
  {
    id: "P.03",
    title: "Systems prepared to scale",
    body: "We build digital foundations that can grow into dashboards, CMS platforms, integrations, and larger business systems.",
    detail:
      "The website is treated as a foundation that can later connect with backend logic, admin panels, product management, APIs, content systems, and business tools.",
  },
];

export const MissionStatementSection = (): JSX.Element => {
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className={`relative w-full bg-[url(/figmaAssets/backgroundstars.svg)] bg-[100%_100%] transition-colors ${
        isLight ? "bg-[#F8FBFF]" : "bg-[#03050a]"
      }`}
      aria-labelledby="mission-statement-heading"
    >
      {/* Light-mode wash — the star-texture background image stays in place
          (same "soft star atmosphere" as dark mode) but gets a pale overlay
          on top of it, the same technique used on the hero: a separate layer,
          not a filter on the whole section (which would also wash out the text). */}
      {isLight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.85)_0%,rgba(248,251,255,0.55)_40%,rgba(248,251,255,0.85)_100%)]"
        />
      )}

      {/* ── Glow decorations (direct section children, no overflow-hidden parent) ── */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-[-40px] top-[182px] h-[340px] w-[340px] rounded-full blur-[80px] ${
          isLight ? "bg-[#0ea5e91a]" : "bg-[#70d7ff1c]"
        }`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] right-[-10%] h-[560px] w-[560px] rounded-full blur-[140px]"
        style={{ backgroundColor: isLight ? "rgba(38, 100, 255, 0.12)" : "rgba(38, 100, 255, 0.25)" }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10 flex min-h-screen flex-col justify-center px-8 py-24 md:px-10 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,480px)] lg:gap-16 xl:gap-20">

          {/* Left — editorial headline */}
          <header className="max-w-[816px]">
            <motion.h2
              variants={fadeUp}
              custom={0}
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              id="mission-statement-heading"
              className="[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.02] tracking-[-1.2px] sm:text-[52px] md:text-[68px] md:tracking-[-1.78px] lg:text-[80px] lg:leading-[82px]"
            >
              <span className={isLight ? "text-[rgba(15,23,42,0.55)]" : "text-[#f5f7fa70]"}>We do not just make websites. </span>
              <span className={isLight ? "text-[#0f172a]" : "text-[#f5f7fa]"}>
                We create digital systems that move brands forward.
              </span>
            </motion.h2>
          </header>

          {/* Right — intro paragraph + revealed points */}
          <aside className="flex w-full flex-col justify-center justify-self-start lg:pt-4">
            <motion.p
              variants={fadeUp}
              custom={0.12}
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[27px] tracking-[0] md:text-[17px] md:leading-[29px] ${
                isLight ? "text-[rgba(15,23,42,0.68)]" : "text-[#f5f7faa6]"
              }`}
            >
              We combine strategy, design, content, development, and technology
              to create digital experiences that look premium, perform
              efficiently, and grow with the businesses behind them.
            </motion.p>

            <div className={`mt-10 flex flex-col border-t ${isLight ? "border-[rgba(15,23,42,0.10)]" : "border-white/10"}`}>
              {principles.map((principle, i) => (
                <motion.article
                  key={principle.id}
                  variants={fadeUp}
                  custom={0.28 + i * 0.15}
                  initial={reduced ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`group w-full border-b pb-5 pt-5 ${
                    // Light-mode-only: subtle lift on hover (translateX + a
                    // hair of scale, per spec) plus a divider tint toward the
                    // accent blue. Kept entirely inside the isLight branch —
                    // dark mode's className stays the exact string it always
                    // was ("border-white/10"), no transition/transform added.
                    isLight
                      ? "border-[rgba(15,23,42,0.10)] transition-all duration-300 ease-out hover:translate-x-1 hover:scale-[1.015] hover:border-[rgba(2,132,199,0.35)]"
                      : "border-white/10"
                  }`}
                >
                  <p
                    className={`[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1px] transition-all duration-300 ${
                      isLight
                        ? "text-[#0284c7] group-hover:text-[#0ea5e9] group-hover:[text-shadow:0_0_14px_rgba(14,165,233,0.35)]"
                        : "text-[#70d7ff99]"
                    }`}
                  >
                    {principle.id}
                  </p>
                  <h3
                    className={`pt-[7px] [font-family:'Bricolage_Grotesque',Helvetica] text-[20px] font-medium leading-[24px] tracking-[-0.28px] transition-all duration-300 ${
                      isLight
                        ? "text-[#0f172a] group-hover:text-[#0284c7] group-hover:[text-shadow:0_0_14px_rgba(14,165,233,0.30)]"
                        : "text-[#f5f7fa]"
                    }`}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className={`pt-[6px] [font-family:'Inter',Helvetica] text-[13.5px] font-normal leading-[22px] tracking-[0] transition-colors duration-300 ${
                      isLight
                        ? "text-[rgba(15,23,42,0.65)] group-hover:text-[rgba(15,23,42,0.85)]"
                        : "text-[#f5f7fa99]"
                    }`}
                  >
                    {principle.body}
                  </p>
                  <p
                    className={`pt-[5px] [font-family:'Inter',Helvetica] text-[12.5px] font-normal leading-[20px] tracking-[0] transition-colors duration-300 ${
                      isLight
                        ? "text-[rgba(15,23,42,0.50)] group-hover:text-[rgba(15,23,42,0.70)]"
                        : "text-[#f5f7fa52]"
                    }`}
                  >
                    {principle.detail}
                  </p>
                </motion.article>
              ))}
            </div>

            <a
              href="#"
              className={`mt-8 inline-flex w-fit items-center gap-1.5 [font-family:'Inter',Helvetica] text-[13.5px] font-medium leading-[20px] tracking-[0.14px] transition-colors duration-200 ${
                isLight ? "text-[rgba(15,23,42,0.55)] hover:text-[#0f172a]" : "text-[#f5f7fa61] hover:text-[#f5f7fa]"
              }`}
            >
              Discover Our Approach →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};
