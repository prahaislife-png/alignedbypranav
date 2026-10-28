import { getService, services } from "@/data/services";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Aligned by Pranav consultation";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    kicker: service ? `consultation ${service.number}` : "aligned by pranav",
    title: service?.title ?? "Personal consultations",
    subtitle: "with pranav vibhute · graphologist and alignment consultant",
  });
}
