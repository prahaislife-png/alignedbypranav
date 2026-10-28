import type { Metadata } from "next";
import Link from "next/link";
import { watchCheck, type WatchCheckTier } from "@/data/watch-check";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { ListMark } from "@/components/ui/ornaments";
import { SectionHeading } from "@/components/ui/section-heading";
import { WatchCheck } from "@/components/tools/watch-check/watch-check";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: watchCheck.seo.title,
  description: watchCheck.seo.description,
  path: watchCheck.path,
  ownSocialImage: true,
});

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** "Free", a confirmed price, or the safe fallback. Never an invented number. */
function tierPrice(tier: WatchCheckTier): string {
  if (tier.free) return "Free";
  const prices = [tier.priceINR && inr.format(tier.priceINR), tier.priceEUR && eur.format(tier.priceEUR)].filter(Boolean);
  return prices.length ? `From ${prices.join(" · ")}` : "Price shared on WhatsApp";
}

export default function WatchCheckPage() {
  const service = getService(watchCheck.serviceId);

  return (
    <>
      <PageIntro
        crumbs={[{ name: "Free watch check", path: watchCheck.path }]}
        eyebrow={watchCheck.intro.eyebrow}
        title={watchCheck.intro.title}
        intro={watchCheck.intro.lead}
      >
        <ol className="mt-10 grid max-w-4xl gap-x-8 gap-y-4 border-t border-ink pt-5 sm:grid-cols-3">
          {watchCheck.steps.map((step, i) => (
            <li key={step.title}>
              <p className="font-mono text-[0.75rem] text-madder">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-[1.25rem] leading-tight">{step.title}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </PageIntro>

      <section aria-labelledby="tool-title" className="section-y border-b border-line bg-paper-2">
        <div className="container-page">
          <h2 id="tool-title" className="sr-only">
            {watchCheck.name}
          </h2>
          <WatchCheck />
          <noscript>
            <p className="mt-6 text-muted">The watch check needs JavaScript. You can still send a photo of your watch to Pranav on WhatsApp.</p>
          </noscript>
        </div>
      </section>

      <section aria-labelledby="tiers-title" className="section-y border-b border-line">
        <div className="container-page">
          <SectionHeading
            id="tiers-title"
            eyebrow="From free to full report"
            title="Start free. Go further with Pranav."
            intro="The specimen check records what can be seen. The first look and the report are where Pranav reads your watch personally."
          />
          <ol className="mt-12 grid border-t border-ink md:grid-cols-2 lg:grid-cols-4">
            {watchCheck.tiers.map((tier, i) => (
              <li
                key={tier.id}
                className="reveal flex flex-col border-b border-line py-7 md:px-6 md:odd:pl-0 lg:border-b-0 lg:border-l lg:odd:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="font-mono text-[0.75rem] text-madder">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-tight">{tier.name}</h3>
                <p className={`mt-3 font-mono text-[0.8125rem] lowercase ${tier.free ? "text-madder" : "text-ink"}`}>{tierPrice(tier)}</p>
                <p className="mt-3 text-[0.9375rem] text-muted">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem]">
                      <ListMark className="mt-[0.7rem]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <aside aria-label="Please note" className="mt-12 max-w-3xl border-l-2 border-madder bg-paper-2 p-6">
            <p className="eyebrow">§ please note</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed">{watchCheck.disclaimer}</p>
            <p className="mt-3 text-[0.9375rem]">
              <Link href="/disclaimer" className="link-line">
                Read the consultation disclaimer
              </Link>
              {" · "}
              <Link href="/privacy#watch-check" className="link-line">
                How your photo is handled
              </Link>
            </p>
          </aside>
        </div>
      </section>

      <FinalCta
        service={service}
        headline="Prefer to talk it through?"
        buttonLabel="Ask Pranav about watches"
        description="Send Pranav a short message about the watch you wear or the one you are considering, and he will explain how he can help."
        placement="final_cta"
      />
    </>
  );
}
