import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Aligned by Pranav – personal consultations with Pranav Vibhute";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "clarity · intention · alignment",
    title: "Find meaning in the details.",
    subtitle: "personal consultations with pranav vibhute",
  });
}
