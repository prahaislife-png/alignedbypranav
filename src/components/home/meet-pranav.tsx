import { home } from "@/data/home";
import { pranav } from "@/data/pranav";
import { Portrait } from "@/components/ui/portrait";
import { ArrowLink } from "@/components/ui/link-button";

export function MeetPranav() {
  return (
    <section aria-labelledby="meet-title" className="section-y overflow-hidden border-b border-line">
      <div className="container-page grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <Portrait />
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <p className="eyebrow">
            <span aria-hidden="true">§ </span>
            {home.meet.eyebrow}
          </p>
          <h2 id="meet-title" className="display-xl from-baseline mt-4">
            {pranav.name}
          </h2>
          <p className="mt-3 font-mono text-[0.8125rem] text-madder lowercase">{pranav.title}</p>
          <p className="lead mt-8 max-w-2xl !text-ink">{pranav.shortBio}</p>

          <dl className="mt-10 grid border-t border-ink sm:grid-cols-3">
            {pranav.approach.map((item, i) => (
              <div key={item.title} className="border-b border-line py-5 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0">
                <dt className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.75rem] text-madder">0{i + 1}</span>
                  <span className="font-display text-[1.375rem]">{item.title}</span>
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</dd>
              </div>
            ))}
          </dl>

          <ArrowLink href="/about" className="mt-10">
            More about Pranav
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
