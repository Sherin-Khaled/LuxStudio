import { Card, CardContent } from "@/components/ui/card";

const expertiseItems = [
  "Strategy",
  "UI/UX Design",
  "Frontend Development",
  "Backend & Integrations",
  "Dashboards & CMS",
  "Brand & Content",
  "SEO & Performance",
];

const repeatedExpertiseItems = Array.from(
  { length: 4 },
  () => expertiseItems,
).flat();

export const ExpertiseHighlightsSection = (): JSX.Element => {
  return (
    <section
      aria-label="Expertise highlights"
      className="relative w-full overflow-hidden border-y border-[#ffffff24] bg-[#03050a]"
    >
      <Card className="h-auto w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="relative p-0">
          <div className="pointer-events-none absolute inset-0 bg-[#ffffff03]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[123px] bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.8)_40%,rgba(0,0,0,0)_100%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[123px] bg-[linear-gradient(270deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.8)_40%,rgba(0,0,0,0)_100%)]" />
          <div className="overflow-hidden">
            <div
              className="flex min-w-max animate-marquee items-center gap-[49.1px] py-[48px] pl-[49.1px] pr-0"
              style={
                {
                  "--duration": "36s",
                  "--gap": "49.1px",
                } as React.CSSProperties
              }
            >
              {repeatedExpertiseItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-[49.1px]"
                >
                  <span className="relative mt-[-1.00px] whitespace-nowrap [font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.27px] text-[#ffffffc2]">
                    {item}
                  </span>
                  <span className="relative mt-[-1.00px] whitespace-nowrap [font-family:'Inter',Helvetica] text-[19.9px] font-normal leading-[19.9px] tracking-[0] text-[#ffffff5c]">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
