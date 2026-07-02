import { Card, CardContent } from "@/components/ui/card";

const offerings = [
  {
    id: "A.01",
    title: "Digital Product Design",
    description:
      "UX strategy, UI design, design systems, wireframes, and prototypes shaped around clarity, usability, and scalable structure.",
  },
];

export const OfferingsOverviewSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden bg-[#03050a]">
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        alt="Background stars"
        src="/figmaAssets/backgroundstars-4.svg"
      />
      <div className="pointer-events-none absolute left-[-8%] top-[72%] h-[460px] w-[460px] rounded-full bg-[#1e50dc17] blur-[140px]" />
      <div className="pointer-events-none absolute right-[-4%] top-[22%] h-[280px] w-[280px] rounded-full bg-[#64c8ff12] blur-[100px]" />
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-6 pb-16 pt-24 sm:px-8 lg:px-11 lg:pt-[152px]">
        <header className="flex flex-col items-start">
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-sm font-normal tracking-[1.68px] leading-[21px] text-[#f5f7fa66]">
            02 / 06
          </p>
          <div className="pt-6">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-4xl font-medium leading-tight tracking-[-1.80px] text-[#f5f7fa] sm:text-5xl lg:text-7xl lg:leading-[72px]">
              What We Create
            </h2>
          </div>
          <p className="pt-3.5 [font-family:'Inter',Helvetica] text-base font-normal leading-6 tracking-[0.08px] text-[#f5f7fa66]">
            Six core capabilities that combine design, technology, content, and
            growth.
          </p>
        </header>
        <div className="pt-[72px]">
          <div className="h-px w-full bg-[#ffffff1a]" />
        </div>
        <div className="w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            {offerings.map((offering) => (
              <Card
                key={offering.id}
                className="rounded-none border-0 border-b border-r border-[#ffffff1a] bg-transparent shadow-none"
              >
                <CardContent className="flex min-h-[279px] flex-col items-start p-8 sm:p-10 lg:p-11">
                  <div className="[font-family:'JetBrains_Mono',Helvetica] text-xs font-normal leading-[18px] tracking-[1.20px] text-[#f5f7fab8]">
                    {offering.id}
                  </div>
                  <h3 className="pt-7 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium leading-[1.06] tracking-[-0.88px] text-[#f5f7fa] sm:text-[38px] lg:text-[44px] lg:leading-[46.6px]">
                    {offering.title}
                  </h3>
                  <p className="max-w-[460px] pt-[18px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[26.5px] tracking-[0] text-[#f5f7faa6]">
                    {offering.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-[#ffffff1a]" />
      </div>
    </section>
  );
};
