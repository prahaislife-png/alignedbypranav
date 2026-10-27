import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackOnView } from "@/components/analytics/trackers";
import {
  RelatedServices,
  ServiceAudienceAndProcess,
  ServiceExplores,
  ServiceFaqs,
  ServiceHero,
  ServiceIntro,
  ServicePricing,
} from "@/components/services/service-sections";
import { FinalCta } from "@/components/home/final-cta";
import { StickyWhatsAppBar } from "@/components/whatsapp/sticky-whatsapp-bar";
import { resolveWhatsApp } from "@/components/whatsapp/whatsapp-cta";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    ownSocialImage: true,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const whatsapp = resolveWhatsApp(service);

  return (
    <>
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceExplores service={service} />
      <ServiceAudienceAndProcess service={service} />
      <ServicePricing service={service} />
      <ServiceFaqs service={service} />
      <RelatedServices service={service} />
      <FinalCta
        service={service}
        buttonLabel={`Enquire about ${service.shortTitle}`}
        description={`Send Pranav a short message about ${service.title.toLowerCase()} and he will explain the consultation process and starting price.`}
      />
      <StickyWhatsAppBar
        href={whatsapp.href}
        external={whatsapp.external}
        label="Enquire"
        context={service.shortTitle}
        eventProps={{ service_id: service.id }}
      />
      <TrackOnView event="service_view" props={{ service_id: service.id }} />
      <JsonLd data={serviceJsonLd(service)} />
    </>
  );
}
