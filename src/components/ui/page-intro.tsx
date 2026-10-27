import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { ConcentricRings } from "./ornaments";
import { RichHeadline } from "./rich-text";

/** Opening block for secondary pages: breadcrumbs, eyebrow, H1 and intro. */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden">
      <ConcentricRings rings={5} className="absolute -top-72 -right-72 w-[46rem] opacity-50" />
      <div className="container-page relative pt-8 pb-14 lg:pt-12 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-10 flex items-center gap-3 lg:mt-14">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
        <h1 id="page-title" className="display-xl mt-5 max-w-[16ch]">
          <RichHeadline text={title} />
        </h1>
        {intro && <p className="lead mt-7 max-w-2xl">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
