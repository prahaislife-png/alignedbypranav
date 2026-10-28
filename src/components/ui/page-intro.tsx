import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { RichHeadline } from "./rich-text";

/** Opening block for secondary pages: breadcrumbs, margin note, H1 on ruled baselines, intro. */
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
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div className="container-page relative pt-8 pb-14 lg:pt-12 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="relative mt-12 lg:mt-16">
          <p className="eyebrow mb-5">
            <span aria-hidden="true">§ </span>
            {eyebrow}
          </p>
          <h1 id="page-title" className="display-xl baseline-ruled rule-written max-w-[16ch]">
            <RichHeadline text={title} />
          </h1>
        </div>
        {intro && <p className="lead mt-8 max-w-2xl">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
