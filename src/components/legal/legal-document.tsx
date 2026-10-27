import { site } from "@/config/site";
import { PageIntro } from "@/components/ui/page-intro";

/**
 * Layout for the legal drafts. While `site.legal.lastUpdated` is empty the
 * document is treated as an unreviewed draft and says so.
 */
export function LegalDocument({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro: string;
  children: React.ReactNode;
}) {
  const reviewed = Boolean(site.legal.lastUpdated);
  return (
    <>
      <PageIntro crumbs={[{ name: title, path }]} eyebrow="Legal" title={title} intro={intro}>
        <p className="mt-6 text-[0.875rem] text-muted">
          Last updated: <TBC value={site.legal.lastUpdated} label="date of legal review" />
        </p>
      </PageIntro>
      <section className="paper border-t border-line-soft bg-parchment/50 py-16 lg:py-24">
        <div className="container-page">
          {!reviewed && (
            <aside className="mx-auto mb-12 max-w-3xl rounded-2xl border border-gold/40 bg-ivory p-6 text-[0.9375rem]" aria-label="Draft notice">
              <p className="eyebrow">Draft for review</p>
              <p className="mt-2 text-muted">
                This document is a draft template prepared for review by the business owners and a qualified legal
                adviser. It is not legal advice. Highlighted items must be completed before launch.
              </p>
            </aside>
          )}
          <article className="legal-prose mx-auto max-w-3xl">{children}</article>
        </div>
      </section>
    </>
  );
}

/** Shows a configured value, or a clearly highlighted placeholder. */
export function TBC({ value, label }: { value: string | null | undefined; label: string }) {
  if (value) return <>{value}</>;
  return (
    <mark className="rounded bg-gold-light/40 px-1.5 py-0.5 text-[0.95em] text-plum">
      [To be confirmed: {label}]
    </mark>
  );
}
