import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Free Watch Specimen Check by Aligned by Pranav";
export const size = ogSize;
export const contentType = "image/png";

export default function WatchCheckOpengraphImage() {
  return renderOgImage({
    kicker: "free tool · watch specimen check",
    title: "Put your watch on the specimen sheet.",
    subtitle: "colours, shape and details · free · your photo stays on your phone",
  });
}
