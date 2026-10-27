import { home } from "@/data/home";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConnectIcon, ConsultIcon, ExploreIcon } from "@/components/ui/step-icons";

const icons = [ExploreIcon, ConnectIcon, ConsultIcon];

export function HowItWorks() {
  const h = home.howItWorks;
  return (
    <section aria-labelledby="how-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow={h.eyebrow} title={h.title} align="center" />
        <div className="relative mt-16 lg:mt-20">
          <div aria-hidden="true" className="absolute top-12 right-[16%] left-[16%] hidden border-t border-dashed border-gold/60 md:block" />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {h.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className="reveal relative text-center">
                <div className="relative mx-auto flex size-24 items-center justify-center rounded-full border border-gold/40 bg-ivory text-plum">
                  <Icon className="size-12" />
                  <span className="absolute -top-1 -right-1 flex size-8 items-center justify-center rounded-full bg-plum font-display text-[0.9375rem] text-ivory italic">
                    {i + 1}
                  </span>
                </div>
                <h3 className="display-sm mt-7">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[19rem] text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
