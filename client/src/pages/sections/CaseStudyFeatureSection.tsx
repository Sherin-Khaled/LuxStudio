import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const project = {
  sectionIndex: "04 / 06",
  title: "Selected work shaped from strategy to launch.",
  description:
    "A closer look at websites and digital systems we designed, developed, optimized, and launched across export brands, e-commerce platforms, and business-focused experiences.",
  projectIndex: "P.01",
  name: "Houd El Nile",
  category: "Agriculture export company",
  summary:
    "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
  tags: [
    "Website Redesign",
    "Next.js",
    "Photography",
    "7 Languages",
    "SEO & Performance",
  ],
  cta: "View Project",
  domain: "houdelnile.com",
  backgroundStars: "/figmaAssets/backgroundstars-2.svg",
  preview: "/figmaAssets/container-3.svg",
};

export const CaseStudyFeatureSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden bg-[#03050a]">
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        alt="Background stars"
        src={project.backgroundStars}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[55vw] w-[55vw] max-h-[900px] max-w-[900px] -translate-x-1/2 rounded-full bg-[#1d4ed824] blur-[160px]" />
        <div className="absolute right-[-8%] top-[22%] h-[420px] w-[420px] rounded-full bg-[#7c3aed1a] blur-[120px]" />
        <div className="absolute left-[4%] top-[68%] h-[300px] w-[300px] rounded-full bg-[#38bdf817] blur-[90px]" />
      </div>
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 py-20 sm:px-6 md:px-10 lg:px-16 lg:py-40">
        <header className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-[76px]">
          <div className="flex max-w-[734.71px] flex-col items-start">
            <p className="mt-[-1.00px] [font-family:'JetBrains_Mono',Helvetica] text-[13px] font-normal leading-[19.5px] tracking-[1.56px] text-[#f5f7fa61]">
              {project.sectionIndex}
            </p>
            <div className="pt-6">
              <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[38px] font-medium leading-[1.02] tracking-[-1.61px] text-[#f5f7fa] sm:text-[48px] lg:text-[64.4px]">
                Selected work shaped
                <br />
                from strategy to launch.
              </h2>
            </div>
          </div>
          <div className="max-w-[520px]">
            <p className="[font-family:'Inter',Helvetica] text-base font-normal leading-[26.9px] text-[#f5f7faa6]">
              {project.description}
            </p>
          </div>
        </header>
        <div className="flex w-full justify-center pt-16 lg:pt-24">
          <Card className="w-full max-w-screen-xl rounded-[36px] border-[0.8px] border-[#ffffff24] bg-[#ffffff11] shadow-[inset_0px_0px_0px_0.5px_#ffffff0f,0px_40px_120px_#0000007a] overflow-hidden">
            <CardContent className="grid p-0 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,647px)]">
              <section className="flex h-full flex-col justify-between bg-[linear-gradient(90deg,rgba(3,5,10,0.2)_0%,rgba(0,0,0,0)_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-11 lg:py-12">
                <div className="flex flex-col items-start">
                  <p className="[font-family:'JetBrains_Mono',Helvetica] text-xs font-normal leading-[18px] tracking-[1.44px] text-[#f5f7fa61]">
                    {project.projectIndex}
                  </p>
                  <div className="pt-4">
                    <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] text-[34px] font-medium leading-none tracking-[-1.23px] text-[#f5f7fa] sm:text-[40px] lg:text-[49.1px]">
                      {project.name}
                    </h3>
                  </div>
                  <div className="pt-3">
                    <p className="[font-family:'Inter',Helvetica] text-sm font-normal leading-[21px] tracking-[0.14px] text-[#f5f7fa61]">
                      {project.category}
                    </p>
                  </div>
                  <div className="pt-6">
                    <p className="max-w-[420px] [font-family:'Inter',Helvetica] text-[15px] font-normal leading-[24.8px] text-[#f5f7faa6]">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start pt-10">
                  <div className="flex max-w-[420px] flex-wrap gap-2 pb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="h-auto rounded-full border-[0.8px] border-[#ffffff1f] bg-[#ffffff12] px-2.5 py-1 [font-family:'Inter',Helvetica] text-[11px] font-normal leading-[16.5px] text-[#f5f7fa9e] hover:bg-[#ffffff12]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="h-auto p-0 [font-family:'Inter',Helvetica] text-[13px] font-medium leading-[19.5px] tracking-[0.13px] text-[#f5f7fa] opacity-85 hover:no-underline"
                  >
                    <span>{project.cta}</span>
                    <ArrowRightIcon className="ml-1.5 h-4 w-4 shrink-0" />
                  </Button>
                </div>
              </section>
              <div className="hidden py-8 lg:flex">
                <Separator
                  orientation="vertical"
                  className="h-full w-px bg-[#ffffff1a]"
                />
              </div>
              <section className="flex items-center justify-center p-6 sm:p-8 lg:pl-8 lg:pr-9 lg:py-9">
                <div className="w-full max-w-[647px]">
                  <div className="overflow-hidden rounded-xl border-[0.8px] border-[#ffffff1f] bg-[#f5f0e8] shadow-[0px_8px_32px_#00000080]">
                    <div className="flex items-center gap-2.5 border-b-[0.8px] border-[#ffffff12] bg-[#0000008c] px-3.5 py-2.5">
                      <div className="inline-flex items-start gap-[5px]">
                        <div className="h-[9px] w-[9px] rounded-[4.5px] bg-[#ff5f57] opacity-85" />
                        <div className="h-[9px] w-[9px] rounded-[4.5px] bg-[#ffbc2e] opacity-85" />
                        <div className="h-[9px] w-[9px] rounded-[4.5px] bg-[#28c840] opacity-85" />
                      </div>
                      <div className="flex h-[25px] items-start overflow-hidden rounded-md bg-[#ffffff14] px-2.5 py-1">
                        <span className="[font-family:'JetBrains_Mono',Helvetica] text-[11px] font-normal leading-[16.5px] tracking-[0.22px] text-[#ffffff73]">
                          {project.domain}
                        </span>
                      </div>
                    </div>
                    <img
                      className="block h-auto w-full"
                      alt="Container"
                      src={project.preview}
                    />
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
