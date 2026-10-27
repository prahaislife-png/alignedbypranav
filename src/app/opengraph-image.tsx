import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Aligned by Pranav – personal consultations with Pranav Vibhute";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    kicker: "Clarity · Intention · Alignment",
    title: "Find meaning in the details.",
    subtitle: "Personal consultations with Pranav Vibhute",
  });
}
