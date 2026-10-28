import { home } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConnectIcon, ConsultIcon, ExploreIcon } from "@/components/ui/step-icons";

const icons = [ExploreIcon, ConnectIcon, ConsultIcon];

/** Three steps joined by a pen line that is drawn as the reader scrolls. */
export function HowItWorks() {
  const h = home.howItWorks;
  return (
    <section aria-labelledby="how-title" className="section-y border-b border-line">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow={h.eyebrow} title={h.title} />
        <div className="relative mt-14 lg:mt-20">
          <svg aria-hidden="true" viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute top-[5.25rem] left-0 hidden h-5 w-full md:block">
            <path
              className="scroll-ink"
              pathLength={1}
              d="M40 60 C 180 -10, 260 130, 380 60 S 600 -10, 700 60 S 880 120, 970 40"
              stroke="var(--color-madder)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {h.steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <li key={step.title} className="reveal relative">
                  <div className="flex items-end gap-4">
                    <span className="font-display text-[4.5rem] leading-[0.8] text-ink">{i + 1}</span>
                    <span className="mb-1 flex size-14 items-center justify-center border border-ink bg-paper text-ink">
                      <Icon className="size-9" />
                    </span>
                  </div>
                  <h3 className="display-sm mt-6">{step.title}</h3>
                  <p className="mt-3 max-w-[20rem] text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
