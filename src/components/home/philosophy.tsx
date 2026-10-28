import { home } from "@/data/home";
import { Handwriting } from "@/components/brand/handwriting";
import { GuideLines } from "@/components/ui/ornaments";

/** The night page: the philosophy in gold ink on midnight plum. */
export function Philosophy() {
  const p = home.philosophy;
  return (
    <section aria-labelledby="philosophy-title" className="on-dark section-y relative overflow-hidden bg-night text-paper">
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <p id="philosophy-title" className="eyebrow !text-gold-light lg:col-span-3">
            <span aria-hidden="true">§ </span>
            {p.eyebrow}
          </p>
          <p className="from-baseline font-display text-[clamp(1.75rem,2.6vw+1rem,3.5rem)] leading-[1.08] tracking-[-0.015em] text-paper lg:col-span-9">
            {p.statement}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <GuideLines tone="dark" className="absolute inset-x-0 -top-10 h-24 w-full" />
          <Handwriting word="aligned" scroll className="relative ml-auto h-20 w-auto text-gold sm:h-28" strokeWidth={2} />
        </div>

        <ol className="mt-12 grid border-t border-gold/40 sm:grid-cols-2 lg:grid-cols-5">
          {p.principles.map((item, i) => (
            <li key={item.title} className="reveal border-b border-gold/20 py-6 sm:pr-6 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <p className="font-mono text-[0.75rem] text-gold-light">0{i + 1}</p>
              <h3 className="mt-2 font-display text-[1.5rem] !text-paper">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper/70">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
