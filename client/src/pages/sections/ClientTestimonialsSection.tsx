import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const testimonials = [
  {
    id: 1,
    offset: "pt-6",
    quoteColor: "text-[#38bdf89e]",
    text: "The new website finally feels aligned with the company's farms, products, and export identity.",
    author: "Houd El Nile",
    category: "Agriculture Export Website",
    tag: "Review",
  },
  {
    id: 2,
    offset: "pt-10",
    quoteColor: "text-[#f5f7fa5c]",
    text: "The priority was to turn an outdated website into a multilingual export experience that felt credible from the first screen.",
    author: "Project Note",
    category: "Export Website",
    tag: "Brief",
  },
  {
    id: 3,
    offset: "pt-1.5",
    quoteColor: "text-[#f5f7fa5c]",
    text: "The store needed clean product visuals, clear browsing, and a professional buying journey for dental clinics.",
    author: "X Dental",
    category: "E-commerce Platform",
    tag: "Client Need",
  },
  {
    id: 4,
    offset: "pt-9",
    quoteColor: "text-[#f5f7fa5c]",
    text: "The buying experience needed to feel simple, trusted, and ready for customers to order online.",
    author: "Al Nours",
    category: "E-commerce Website",
    tag: "Client Need",
  },
  {
    id: 5,
    offset: "pt-6",
    quoteColor: "text-[#f5f7fa5c]",
    text: "The brand needed a cleaner structure, stronger visuals, and subtle motion to make its export identity feel more credible.",
    author: "Al Baraka Olives",
    category: "Export Brand Website",
    tag: "Project Note",
  },
  {
    id: 6,
    offset: "pt-2",
    quoteColor: "text-[#f5f7fa5c]",
    text: "Speed, SEO, responsiveness, and launch readiness were treated as part of the build, not as final extras.",
    author: "Launch Process",
    category: "Optimization & Deployment",
    tag: "Process Note",
  },
];

export const ClientTestimonialsSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#03050a] bg-[url(/figmaAssets/backgroundstars-1.svg)] bg-[100%_100%]"
      aria-labelledby="client-testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1519px] gap-[37.3px]">
          <div className="mt-[337px] ml-[479.6px] h-80 w-[560px] bg-[#1d4ed817] blur-[160px]" />
          <div className="mt-[248.5px] h-[260px] w-[260px] rounded-full bg-[#7c3aed0f] blur-[110px]" />
        </div>
      </div>
      <div className="relative mx-auto flex min-h-[994px] w-full max-w-[1519px] flex-col px-4 pb-16 pt-28 sm:px-6 lg:px-[68px]">
        <header className="max-w-[1244px]">
          <p className="text-[13px] leading-[19.5px] tracking-[1.56px] text-[#f5f7fa66] [font-family:'JetBrains_Mono',Helvetica]">
            Client Notes
          </p>
          <div className="pt-[18px]">
            <h2
              id="client-testimonials-heading"
              className="[font-family:'Bricolage_Grotesque',Helvetica] text-[40px] font-semibold leading-[1.02] tracking-[-2.04px] text-[#f5f7fa] sm:text-[52px] lg:text-[68px]"
            >
              What clients notice.
            </h2>
          </div>
          <div className="pt-[22px]">
            <p className="max-w-[560px] [font-family:'Inter',Helvetica] text-[17px] font-normal leading-[27.5px] text-[#f5f7faa1]">
              Client feedback, project needs, and the details people value when
              we shape, design, build, and launch digital experiences.
            </p>
          </div>
        </header>
        <div className="relative mt-[54px]">
          <ScrollArea className="w-full">
            <div className="flex min-w-max items-start gap-[26px] px-0 pb-8">
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className={`flex ${item.offset} shrink-0`}
                >
                  <Card className="relative h-[430px] w-[328px] overflow-hidden rounded-[32px] border-[0.8px] border-[#ffffff25] bg-[#ffffff12] shadow-[0px_24px_80px_#0000005c] backdrop-blur-0">
                    <div className="absolute left-px top-px h-px w-[326px] bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_55%,rgba(0,0,0,0)_100%)]" />
                    <div className="absolute left-[131px] top-[258px] h-[171px] w-[196px] bg-[radial-gradient(50%_50%_at_100%_100%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_70%)]" />
                    <CardContent className="relative flex h-full flex-col justify-between px-7 pb-[26px] pt-8">
                      <div className="flex flex-col">
                        <p
                          className={`[font-family:'Bricolage_Grotesque',Helvetica] text-[22px] font-normal leading-[22px] ${item.quoteColor}`}
                        >
                          "
                        </p>
                        <p className="max-w-[271px] pt-[18px] [font-family:'Inter',Helvetica] text-[21px] font-normal leading-[31.5px] text-[#f5f7faf2]">
                          {item.text}
                        </p>
                      </div>
                      <footer className="flex flex-col">
                        <div className="h-px w-full bg-[#ffffff17]" />
                        <div className="pt-4">
                          <p className="[font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[23.2px] tracking-[-0.08px] text-[#f5f7faeb]">
                            {item.author}
                          </p>
                        </div>
                        <div className="pb-3 pt-[5px]">
                          <p className="[font-family:'Inter',Helvetica] text-[13px] font-normal leading-[19.5px] text-[#f5f7fa9e]">
                            {item.category}
                          </p>
                        </div>
                        <div>
                          <Badge
                            variant="secondary"
                            className="h-7 rounded-[999px] border-[0.8px] border-[#ffffff1f] bg-[#ffffff08] px-[12.8px] text-[11px] font-normal leading-[16.5px] tracking-[0.88px] text-[#f5f7fa85] [font-family:'JetBrains_Mono',Helvetica] hover:bg-[#ffffff08]"
                          >
                            {item.tag}
                          </Badge>
                        </div>
                      </footer>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[77px] bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[123px] bg-[linear-gradient(270deg,rgba(3,5,10,1)_60%,rgba(0,0,0,0)_100%)]" />
        </div>
      </div>
    </section>
  );
};
