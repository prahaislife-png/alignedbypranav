import { home } from "@/data/home";
import { AlignmentMark } from "@/components/brand/alignment-mark";
import { ConcentricRings } from "@/components/ui/ornaments";

export function Philosophy() {
  const p = home.philosophy;
  return (
    <section aria-labelledby="philosophy-title" className="paper section-y relative overflow-hidden bg-sage-mist">
      <ConcentricRings tone="sage" rings={6} className="absolute top-1/2 left-1/2 w-[64rem] max-w-none -translate-1/2 opacity-60" />
      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <AlignmentMark className="mx-auto size-12" />
          <p id="philosophy-title" className="eyebrow mt-6 !text-sage-ink">
            {p.eyebrow}
          </p>
          <p className="mt-6 font-display text-[clamp(1.75rem,2.4vw+1rem,3.25rem)] leading-[1.15] text-plum italic">
            {p.statement}
          </p>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-sage/25 bg-sage/25 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {p.principles.map((item, i) => (
            <li key={item.title} className="reveal bg-sage-mist/95 px-6 py-7 lg:py-9">
              <p className="font-display text-[0.9375rem] text-sage-ink italic">0{i + 1}</p>
              <h3 className="mt-2 font-display text-[1.625rem] text-plum">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
