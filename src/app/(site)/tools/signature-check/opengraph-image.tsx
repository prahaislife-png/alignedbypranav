import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Free Signature Specimen Check by Aligned by Pranav";
export const size = ogSize;
export const contentType = "image/png";

export default function SignatureCheckOpengraphImage() {
  return renderOgImage({
    kicker: "free tool · signature specimen check",
    title: "Your signature, on the specimen sheet.",
    subtitle: "slant · baseline · rhythm · free practice sheet · nothing uploaded",
  });
}
