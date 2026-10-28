import { home } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyPranav() {
  const w = home.why;
  return (
    <section aria-labelledby="why-title" className="section-y border-b border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} intro={w.intro} />
          </div>
        </div>
        <ol className="border-t border-ink lg:col-span-7">
          {w.points.map((point, i) => (
            <li key={point.title} className="reveal grid gap-2 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-6 md:py-8">
              <span className="font-mono text-[0.8125rem] text-madder">0{i + 1}</span>
              <div>
                <h3 className="font-display text-[1.625rem] leading-tight">{point.title}</h3>
                <p className="mt-2 text-muted">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
