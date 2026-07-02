import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="w-full self-stretch bg-[#03050a]">
      <div className="h-20 w-full bg-[#03050a]" />
      <section className="relative w-full overflow-hidden rounded-t-[88px] bg-[#06152d] shadow-[0px_-40px_120px_#00000061]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0.12)_30%,rgba(255,255,255,0.12)_70%,rgba(0,0,0,0)_100%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-80px] top-[79px] h-[360px] w-[360px] rounded-full bg-[#7c3aed12] blur-[120px]" />
          <div className="absolute left-[32%] top-[-60px] h-[300px] w-[600px] bg-[#38bdf81a] blur-[140px]" />
          <div className="absolute right-[12%] top-[158px] h-80 w-80 rounded-full bg-[#1d4ed817] blur-[110px]" />
          <img
            className="h-full w-full object-cover"
            alt="Icon"
            src="/figmaAssets/icon-1.svg"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1516px] flex-col px-6 pb-11 pt-[104px] sm:px-8 lg:px-[68px]">
          <div className="flex flex-col gap-6 border-b-[0.8px] border-[#ffffff14] pb-14 md:flex-row md:items-center md:justify-between">
            <h2 className="mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] text-2xl font-medium leading-9 tracking-[-0.60px] text-[#f5f7fa] sm:text-3xl">
              Ready to build something memorable?
            </h2>
            <Button
              type="button"
              variant="ghost"
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
