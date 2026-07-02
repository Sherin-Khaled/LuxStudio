import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const valueItems = [
  {
    number: "01",
    title: "One connected process",
    description:
      "Strategy, content, design, development, testing, and launch are handled as one complete workflow instead of disconnected tasks.",
  },
];

export const StudioValueSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden bg-[#03050a] bg-[url(/figmaAssets/backgroundstars-3.svg)] bg-cover bg-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-[58%] h-[340px] w-[340px] rounded-full bg-[#38bdf812] blur-[120px]" />
        <div className="absolute right-0 top-[20%] h-[520px] w-[520px] rounded-full bg-[#1d4ed81a] blur-[160px]" />
      </div>
      <div className="relative mx-auto flex min-h-[1322px] w-full max-w-[1519px] items-start px-8 py-24 sm:px-10 md:px-14 lg:px-[70px] lg:py-[168px]">
        <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[minmax(0,565.8px)_minmax(0,1fr)] lg:gap-[107.41px]">
          <div className="relative pl-0 lg:pl-0">
            <div className="absolute bottom-0 left-0 top-0 hidden w-px -translate-x-7 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(56,189,248,0.5)_30%,rgba(56,189,248,0.5)_70%,rgba(0,0,0,0)_100%)] lg:block" />
            <Card className="border-0 bg-transparent p-0 shadow-none">
              <CardContent className="flex flex-col items-start p-0 lg:pt-[120px]">
                <p className="relative w-fit [font-family:'JetBrains_Mono',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[1.56px] text-[#f5f7fa70]">
                  06 / 06
                </p>
                <header className="flex w-full flex-col items-start pt-8">
                  <h2 className="max-w-[566px] [font-family:'Bricolage_Grotesque',Helvetica] text-[48px] font-semibold leading-[1.02] tracking-[-1.6px] text-[#f5f7fa] sm:text-[58px] md:text-[68px] lg:text-[84.4px] lg:tracking-[-2.53px]">
                    One studio for the brand, the website, and the system behind
                    it.
                  </h2>
                </header>
                <div className="flex flex-col items-start pt-[30px] pb-9">
                  <p className="max-w-[540px] [font-family:'Inter',Helvetica] text-lg font-normal leading-[29.5px] tracking-[0] text-[#f5f7faa8]">
                    We combine creative direction, content, UI/UX, frontend,
                    backend, dashboards, SEO, and launch support into one
                    connected process — so every part of the digital experience
                    feels consistent, fast, and ready to grow.
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex h-auto items-center gap-1.5 border-b-[0.8px] border-[#38bdf880] pb-0.5 [font-family:'Inter',Helvetica] text-[15px] font-medium leading-[22.5px] tracking-[-0.08px] text-sky-400 transition-opacity hover:opacity-90 focus:outline-none focus:ring-0"
                >
                  Start a project with us →
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="flex min-h-[816px] flex-col justify-center">
            <Separator className="bg-[#ffffff1a]" />
            {valueItems.map((item) => (
              <div key={item.number} className="flex flex-col">
                <Card className="border-0 bg-transparent py-8 shadow-none">
                  <CardContent className="p-0">
                    <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                      <div className="min-w-7 pt-[5px]">
                        <p className="[font-family:'JetBrains_Mono',Helvetica] text-[15px] font-medium leading-[15px] tracking-[1.50px] text-sky-400">
                          {item.number}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-3xl font-medium leading-[34.2px] tracking-[-0.60px] text-[#f5f7fa]">
                          {item.title}
                        </h3>
                        <p className="max-w-[600px] pt-2.5 [font-family:'Inter',Helvetica] text-[15.5px] font-normal leading-[24.8px] tracking-[0] text-[#f5f7faa8]">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </CardContent>
                </Card>
                <Separator className="bg-[#ffffff1a]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
