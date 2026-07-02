import { Card, CardContent } from "@/components/ui/card";

const progressSteps = [
  { className: "w-1.5 h-[3px] bg-[#38bdf873]" },
  { className: "w-1.5 h-[3px] bg-[#38bdf873]" },
  { className: "w-1.5 h-[3px] bg-[#38bdf873]" },
  { className: "w-7 h-[3px] bg-sky-400" },
  { className: "w-1.5 h-[3px] bg-[#ffffff17]" },
  { className: "w-1.5 h-[3px] bg-[#ffffff17]" },
];

const journeySteps = [
  {
    id: "01",
    title: "Discover",
    description:
      "We understand the business, audience, goals, challenges, existing digital presence, and what the project needs to achieve.",
    meta: "Research · Goals · Audience",
    active: true,
  },
];

export const ProcessJourneySection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden bg-[#03050a] py-20 md:py-28 lg:py-[156px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#1d4ed82b] blur-[120px] md:h-[560px] md:w-[560px]" />
        <div className="absolute right-[10%] top-[-4%] h-[220px] w-[220px] rounded-full bg-[#38bdf81c] blur-[90px] md:h-[300px] md:w-[300px]" />
        <div className="absolute bottom-[-8%] left-[2%] h-[220px] w-[220px] rounded-full bg-[#7c3aed1a] blur-[100px] md:h-80 md:w-80" />
        <div className="absolute bottom-[12%] right-[8%] h-[220px] w-[320px] bg-[#38bdf80f] blur-[80px] md:h-[300px] md:w-[500px]" />
      </div>
      <div className="container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,528px)_minmax(0,574px)] lg:justify-between lg:gap-10">
          <header className="flex max-w-[528.65px] flex-col items-start">
            <p className="mt-[-1px] [font-family:'JetBrains_Mono',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[1.56px] text-[#f5f7fa61]">
              03 / 06
            </p>
            <div className="pt-7">
              <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[48px] font-semibold leading-[0.98] tracking-[-1.6px] text-[#f5f7fa] sm:text-[62px] lg:text-[79.8px] lg:tracking-[-2.39px]">
                From idea
                <br />
                to launch.
              </h2>
            </div>
            <div className="pt-6">
              <p className="max-w-[480px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[28.6px] tracking-[0] text-[#f5f7faa6]">
                A clear, collaborative process that turns strategy, content,
                design, development, and systems into a complete digital
                experience.
              </p>
            </div>
            <div className="pt-5">
              <p className="max-w-[380px] [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[20.8px] tracking-[0] text-[#f5f7fa61]">
                Every stage is reviewed, refined, and approved before moving
                forward.
              </p>
            </div>
            <nav
              aria-label="Process progress"
              className="flex h-[57px] w-full items-center gap-2.5 pt-10"
            >
              {progressSteps.map((step, index) => (
                <button
                  key={`progress-step-${index}`}
                  type="button"
                  aria-label={`Go to process step ${index + 1}`}
                  className={`${step.className} h-auto rounded-full transition-opacity hover:opacity-90`}
                />
              ))}
              <div className="flex h-[17px] w-[57px] items-start pl-1.5">
                <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[16.5px] tracking-[0.66px] text-[#f5f7fa61]">
                  04 / 06
                </span>
              </div>
            </nav>
          </header>
          <div className="flex min-h-[199px] w-full max-w-[574px] flex-col justify-center">
            {journeySteps.map((step) => (
              <Card
                key={step.id}
                className="border-0 bg-transparent p-0 shadow-none"
              >
                <CardContent className="flex items-start gap-6 p-0">
                  <div className="flex w-5 shrink-0 flex-col items-center self-stretch pt-[22px]">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        step.active
                          ? "bg-sky-400 shadow-[0px_0px_0px_3px_#38bdf828]"
                          : "bg-[#ffffff17]"
                      }`}
                    />
                    <div className="px-0 pb-0 pt-2.5">
                      <div className="h-[156.88px] w-px bg-[linear-gradient(180deg,rgba(56,189,248,0.42)_0%,rgba(255,255,255,0.09)_100%)]" />
                    </div>
                  </div>
                  <article className="flex min-w-0 flex-1 flex-col items-start pb-9 pt-1">
                    <p
                      className={`[font-family:'JetBrains_Mono',Helvetica] text-[13px] font-medium leading-[13px] tracking-[1.30px] ${
                        step.active ? "text-sky-400" : "text-[#f5f7fa61]"
                      }`}
                    >
                      {step.id}
                    </p>
                    <div className="pt-2.5">
                      <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-3xl font-medium leading-[38.9px] tracking-[-0.72px] text-[#f5f7fa] md:text-4xl">
                        {step.title}
                      </h3>
                    </div>
                    <div className="pt-3 pb-[13px]">
                      <p className="max-w-[580px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-6 tracking-[0] text-[#f5f7faa6]">
                        {step.description}
                      </p>
                    </div>
                    <p className="[font-family:'Inter',Helvetica] text-[11.5px] font-normal leading-[17.2px] tracking-[0.46px] text-[#f5f7fa61]">
                      {step.meta}
                    </p>
                  </article>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
