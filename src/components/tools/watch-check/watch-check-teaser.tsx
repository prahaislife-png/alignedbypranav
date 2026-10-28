import { watchCheck } from "@/data/watch-check";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Specimen } from "@/components/ui/specimen";
import { cn } from "@/lib/cn";

/** Invitation to the free Watch Specimen Check, used on the homepage and the wristwatch pages. */
export function WatchCheckTeaser({ className }: { className?: string }) {
  const { teaser } = watchCheck;
  return (
    <section aria-labelledby="watch-check-teaser" className={cn("section-y border-b border-line", className)}>
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading id="watch-check-teaser" eyebrow={teaser.eyebrow} title={teaser.title} intro={teaser.description} />
          <div className="mt-8 flex flex-col items-start gap-3">
            <LinkButton href={watchCheck.path} arrow>
              {teaser.cta}
            </LinkButton>
            <p className="note">two minutes · free · your photo stays on your phone</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:col-span-4 lg:col-start-8 lg:max-w-none">
          <Specimen visual="wristwatch" fig="03" caption="your watch here" className="aspect-[4/5] -rotate-[1.5deg]" />
        </div>
      </div>
    </section>
  );
}
