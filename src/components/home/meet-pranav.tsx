import { home } from "@/data/home";
import { pranav } from "@/data/pranav";
import { Portrait } from "@/components/ui/portrait";
import { ArrowLink } from "@/components/ui/link-button";

export function MeetPranav() {
  return (
    <section aria-labelledby="meet-title" className="section-y overflow-hidden">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <Portrait />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {home.meet.eyebrow}
          </p>
          <h2 id="meet-title" className="display-lg mt-5">
            {home.meet.title}
          </h2>
          <p className="mt-4 font-display text-[1.375rem] text-gold-ink italic">
            {pranav.name}, {pranav.title}
          </p>
          <p className="lead mt-7">{pranav.shortBio}</p>

          <ol className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {pranav.approach.map((item, i) => (
              <li key={item.title}>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-[0.9375rem] text-gold-ink italic">0{i + 1}</span>
                  <span className="font-display text-[1.375rem] text-plum">{item.title}</span>
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>

          <ArrowLink href="/about" className="mt-10">
            More about Pranav
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
