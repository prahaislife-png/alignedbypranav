import Image from "next/image";
import type { ApprovedImage, IllustrationKey } from "@/types/content";
import { ServiceIllustration } from "@/components/illustrations/service-illustrations";
import { ConcentricRings } from "./ornaments";
import { cn } from "@/lib/cn";

const surfaces = {
  parchment: "bg-parchment",
  sage: "bg-sage-mist",
  ivory: "bg-ivory",
} as const;

/**
 * An arched frame holding either an approved photograph or one of the
 * original service illustrations.
 */
export function ArchVisual({
  visual,
  surface = "parchment",
  className,
  priority = false,
  animate = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  outline = true,
}: {
  visual: IllustrationKey | ApprovedImage;
  surface?: keyof typeof surfaces;
  className?: string;
  priority?: boolean;
  animate?: boolean;
  sizes?: string;
  outline?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {outline && (
        <div aria-hidden="true" className="arch absolute -inset-2.5 border border-gold/45 sm:-inset-3.5" />
      )}
      <div className={cn("arch paper relative isolate h-full w-full overflow-hidden", surfaces[surface])}>
        {typeof visual === "string" ? (
          <>
            <ConcentricRings className="absolute top-1/2 left-1/2 w-[135%] max-w-none -translate-1/2 opacity-60" rings={4} />
            <div className="absolute inset-x-[8%] top-[10%] bottom-[2%]">
              <ServiceIllustration name={visual} animate={animate} />
            </div>
          </>
        ) : (
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            priority={priority}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
