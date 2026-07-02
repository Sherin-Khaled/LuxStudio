const logoNames = ["Houd El Nile", "X Dental", "Al Nours", "Al Baraka Olives"];
const repeatedLogoNames = Array.from({ length: 6 }, () => logoNames).flat();

export const ClientLogoMarqueeSection = (): JSX.Element => {
  return (
    <section
      aria-label="Client logos marquee"
      className="relative w-full overflow-hidden border-y border-[#ffffff21] bg-[#03050a]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#ffffff04]" />
      <div className="relative flex h-[124px] items-center overflow-hidden">
        <div
          className="flex min-w-max shrink-0 items-center pl-[49.1px] [--duration:28s] [--gap:49.1px] animate-marquee"
          aria-hidden="true"
        >
          {repeatedLogoNames.map((name, index) => (
            <div
              key={`marquee-first-${name}-${index}`}
              className="flex items-center gap-[49.1px]"
            >
              <span className="[font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.14px] text-[#ffffffba] whitespace-nowrap">
                {name}
              </span>
              <span className="[font-family:'Inter',Helvetica] text-[16.9px] font-normal leading-[16.9px] text-[#ffffff57] whitespace-nowrap">
                ✦
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex min-w-max shrink-0 items-center pl-[49.1px] [--duration:28s] [--gap:49.1px] animate-marquee"
          aria-hidden="true"
        >
          {repeatedLogoNames.map((name, index) => (
            <div
              key={`marquee-second-${name}-${index}`}
              className="flex items-center gap-[49.1px]"
            >
              <span className="[font-family:'Inter',Helvetica] text-[27px] font-medium leading-[27px] tracking-[-0.14px] text-[#ffffffba] whitespace-nowrap">
                {name}
              </span>
              <span className="[font-family:'Inter',Helvetica] text-[16.9px] font-normal leading-[16.9px] text-[#ffffff57] whitespace-nowrap">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[107px] bg-[linear-gradient(90deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.73)_45%,rgba(0,0,0,0)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[107px] bg-[linear-gradient(270deg,rgba(3,5,10,1)_0%,rgba(3,5,10,0.73)_45%,rgba(0,0,0,0)_100%)]" />
    </section>
  );
};
