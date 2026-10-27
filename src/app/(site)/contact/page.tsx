import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { pranav } from "@/data/pranav";
import { isWhatsAppConfigured } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { Diamond } from "@/components/ui/ornaments";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { InstagramIcon } from "@/components/layout/social-icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact Pranav on WhatsApp",
  description:
    "Enquire about a consultation with Pranav Vibhute on WhatsApp. Ask about the process and starting price for the service that interests you.",
  path: "/contact",
});

const include = [
  "Which consultation you are interested in",
  "A sentence or two about what you would like to explore",
  "Whether it is for you, your family or your business",
  "Where you are based (India, Europe or elsewhere)",
];

const avoid = [
  "Signed documents, cheques, ID or bank details",
  "Children’s drawings or photographs, until Pranav explains how they’ll be used",
  "Anything you would not want stored on your phone or Pranav’s",
];

export default function ContactPage() {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <>
      <PageIntro
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Begin with a *conversation.*"
        intro={`Enquiries are handled personally by ${pranav.name} on WhatsApp. Ask about any consultation, its process and its starting price.`}
      />

      <section aria-label="Ways to get in touch" className="paper section-y bg-parchment">
        <div className="container-page grid gap-6 lg:grid-cols-12">
          <div id="enquire" className="on-dark relative overflow-hidden rounded-[1.75rem] bg-plum p-8 text-ivory sm:p-12 lg:col-span-7">
            <WhatsAppIcon className="size-10 text-gold-light" />
            <h2 className="display-md mt-6 !text-ivory">Enquire on WhatsApp</h2>
            {whatsappReady ? (
              <>
                <p className="mt-4 max-w-md text-ivory/75">
                  The button opens WhatsApp with a short message already written. You can edit it before sending.
                </p>
                <div data-hero-cta className="mt-8">
                  <WhatsAppCta placement="contact_page" variant="light" label="Message Pranav on WhatsApp" />
                </div>
              </>
            ) : (
              <p className="mt-4 max-w-md text-ivory/75" role="status">
                WhatsApp enquiries are being set up and will be available here shortly.
                {site.contact.email ? " In the meantime, you are welcome to email." : ""}
              </p>
            )}
          </div>

          <div className="grid gap-6 lg:col-span-5">
            {site.contact.email && (
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-center gap-5 rounded-[1.75rem] border border-line-soft bg-ivory p-7 transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <Mail aria-hidden="true" className="size-7 shrink-0 text-gold-ink" strokeWidth={1.3} />
                <span>
                  <span className="block font-display text-[1.375rem] text-plum">Email</span>
                  <span className="link-line text-[0.9375rem] text-muted">{site.contact.email}</span>
                </span>
              </a>
            )}
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-[1.75rem] border border-line-soft bg-ivory p-7 transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <InstagramIcon className="size-7 shrink-0 text-gold-ink" />
                <span>
                  <span className="block font-display text-[1.375rem] text-plum">Instagram</span>
                  <span className="text-[0.9375rem] text-muted">Follow Aligned by Pranav (opens in a new tab)</span>
                </span>
              </a>
            )}
            <div className="rounded-[1.75rem] border border-line-soft bg-ivory p-7">
              <h2 className="font-display text-[1.375rem] text-plum">Good to include</h2>
              <ul className="mt-4 space-y-2.5">
                {include.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-muted">
                    <Diamond className="mt-[0.55rem] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="by-service" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="by-service" className="display-md">
              Enquire about a specific consultation
            </h2>
            <p className="mt-5 text-muted">Each link opens WhatsApp with a message about that consultation.</p>
            <div className="mt-10 rounded-2xl bg-sage-mist p-6">
              <h3 className="font-display text-[1.25rem] text-plum">Please don’t send in your first message</h3>
              <ul className="mt-3 space-y-2">
                {avoid.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-charcoal/85">
                    <span aria-hidden="true" className="mt-[0.75rem] h-px w-3 shrink-0 bg-sage-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {services.map((service) => (
              <li key={service.id} className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-[1rem] text-gold-ink italic">{service.number}</span>
                  <span className="font-display text-[1.375rem] leading-tight text-plum">{service.title}</span>
                </span>
                <WhatsAppCta
                  service={service}
                  placement="contact_page"
                  variant="text"
                  label="Enquire"
                  srContext={`about ${service.title}`}
                  className="shrink-0 pl-9 text-[0.9375rem] sm:pl-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
