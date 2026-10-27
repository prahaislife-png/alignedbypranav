import Image from "next/image";
import { pranav } from "@/data/pranav";
import { ConcentricRings } from "./ornaments";
import { cn } from "@/lib/cn";

/**
 * Pranav's portrait in an arched frame. Until an approved photograph is set
 * in src/data/pranav.ts, an abstract monogram placeholder is shown – never
 * a generated likeness.
 */
export function Portrait({
  className,
  priority = false,
  sizes = "(min-width: 1024px) 34vw, 80vw",
  compact = false,
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
}) {
  const photo = pranav.portrait;
  return (
    <figure className={cn("relative", className)}>
      {!compact && <div aria-hidden="true" className="arch absolute -inset-3 border border-gold/45 sm:-inset-4" />}
      <div className="arch relative isolate aspect-[4/5] w-full overflow-hidden bg-plum">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority={priority}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label="Portrait of Pranav Vibhute – photograph to be added"
            className="on-dark flex h-full w-full flex-col items-center justify-center"
          >
            <ConcentricRings tone="light" rings={5} className="absolute top-[56%] left-1/2 w-[150%] max-w-none -translate-1/2 opacity-50" />
            <span
              className={cn(
                "relative font-display text-ivory italic",
                compact ? "text-[2.25rem]" : "text-[clamp(4.5rem,9vw,7.5rem)]",
              )}
            >
              PV
            </span>
            {process.env.NODE_ENV !== "production" && !compact && (
              <span className="absolute bottom-6 rounded-full border border-gold-light/50 px-3 py-1 text-[0.6875rem] tracking-[0.14em] text-gold-light uppercase">
                Portrait placeholder
              </span>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
