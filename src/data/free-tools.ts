import type { IllustrationKey, ServiceId } from "@/types/content";
import { signatureCheck } from "./signature-check";
import { watchCheck } from "./watch-check";

/** The free tools, in the order they appear on /tools and on the homepage. */
export interface FreeTool {
  id: "signature-check" | "watch-check";
  name: string;
  path: string;
  serviceId: ServiceId;
  illustration: IllustrationKey;
  fig: string;
  caption: string;
  teaser: { eyebrow: string; title: string; description: string; cta: string };
}

export const freeTools: FreeTool[] = [
  {
    id: "signature-check",
    name: signatureCheck.name,
    path: signatureCheck.path,
    serviceId: signatureCheck.serviceId,
    illustration: "signature",
    fig: "01",
    caption: "your signature here",
    teaser: signatureCheck.teaser,
  },
  {
    id: "watch-check",
    name: watchCheck.name,
    path: watchCheck.path,
    serviceId: watchCheck.serviceId,
    illustration: "wristwatch",
    fig: "03",
    caption: "your watch here",
    teaser: watchCheck.teaser,
  },
];

export const toolsHub = {
  path: "/tools",
  seo: {
    title: "Free Tools",
    description:
      "Free specimen checks from Aligned by Pranav: put your signature or your watch on a graphologist’s specimen sheet in two minutes. Nothing is uploaded.",
  },
  eyebrow: "Free tools",
  title: "Start with a *specimen sheet.*",
  lead: "Two-minute checks that record your signature or your watch the way a graphologist would. Free, private (nothing leaves your device) and yours to keep. When you are ready, send the sheet to Pranav for a personal first look.",
};

export const toolForService = (serviceId: ServiceId) => freeTools.find((t) => t.serviceId === serviceId);
