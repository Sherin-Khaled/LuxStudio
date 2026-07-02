import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    id: "P.01",
    title: "Strategy before screens",
    description:
      "We define the purpose, audience, and experience before designing the interface.",
  },
];

export const MissionStatementSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#03050a] bg-[url(/figmaAssets/backgroundstars.svg)] bg-[100%_100%] py-24 md:py-32"
      aria-labelledby="mission-statement-heading"
    >
      <div className="pointer-events-none absolute left-[-40px] top-[182px] h-[340px] w-[340px] rounded-full bg-[#70d7ff1c] blur-[80px]" />
      <div className="pointer-events-none absolute right-[-80px] top-[330px] h-[620px] w-[620px] rounded-full bg-[#2664ff40] blur-[120px]" />
      <div className="container relative px-8 md:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,500px)] lg:gap-16 xl:gap-24">
          <header className="max-w-[816px]">
            <h2
              id="mission-statement-heading"
              className="[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-medium leading-[1.02] tracking-[-1.2px] text-transparent sm:text-[52px] md:text-[68px] md:tracking-[-1.78px] lg:text-[84.4px] lg:leading-[86.9px]"
            >
              <span className="text-[#f5f7fa99]">
                We do not just make websites.{" "}
              </span>
              <span className="text-[#f5f7fa]">
                We create digital systems that move brands forward.
              </span>
            </h2>
          </header>
          <aside className="flex w-full max-w-[500px] flex-col justify-center justify-self-start lg:pt-6">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-0">
                <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[29.7px] tracking-[0] text-[#f5f7faa6] md:text-lg">
                  We combine strategy, design, content, development, and
                  technology to create digital experiences that look premium,
                  perform efficiently, and grow with the businesses behind them.
                </p>
              </CardContent>
            </Card>
            <div className="mt-12 flex flex-col">
              {principles.map((principle) => (
                <article
                  key={principle.id}
                  className="w-full border-b border-white/10 pb-[22px] pt-5"
                >
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10px] font-normal leading-[15px] tracking-[1px] text-[#f5f7fa61]">
                    {principle.id}
                  </p>
                  <h3 className="pt-2 [font-family:'Bricolage_Grotesque',Helvetica] text-[21px] font-medium leading-[25.2px] tracking-[-0.31px] text-[#f5f7fa]">
                    {principle.title}
                  </h3>
                  <p className="pt-2 [font-family:'Inter',Helvetica] text-[14.5px] font-normal leading-[23.2px] tracking-[0] text-[#f5f7faa6]">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
