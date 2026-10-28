import Image from "next/image";
import { pranav } from "@/data/pranav";
import { GuideLines } from "./ornaments";
import { cn } from "@/lib/cn";

/**
 * Pranav's portrait. Until an approved photograph is set in
 * src/data/pranav.ts, a typographic placeholder is shown – never a
 * generated likeness.
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
      {/* A photograph is shown whole, at its own proportions; thumbnails and the
          placeholder use a 4:5 head-and-shoulders frame. */}
      <div
        className={cn("relative isolate w-full overflow-hidden bg-night", !(photo && !compact) && "aspect-[4/5]")}
        style={photo && !compact ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}
      >
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority={priority}
            sizes={sizes}
            className="h-full w-full object-cover object-[50%_8%]"
          />
        ) : (
          <div role="img" aria-label="Portrait of Pranav Vibhute – photograph to be added" className="on-dark relative h-full w-full">
            {/* Initials sat on the guide lines: in BluuNext with leading-none the
                baseline falls 0.84em down, which the 72% line of this box matches. */}
            <div
              className={cn(
                "absolute inset-x-0 font-display leading-none text-paper italic",
                compact ? "bottom-[18%] text-[2.75rem]" : "bottom-[30%] text-[clamp(5rem,11vw,9rem)]",
              )}
            >
              <GuideLines tone="dark" xHeight={false} className="absolute inset-x-0 top-[-0.43em] h-[1.76em] w-full" />
              <span className="relative ml-[8%]">PV</span>
            </div>
            {!compact && (
              <span className="note absolute top-4 left-4 !text-gold-light">fig. — portrait</span>
            )}
            {process.env.NODE_ENV !== "production" && !compact && (
              <span className="note absolute right-4 bottom-4 !text-gold-light">placeholder · add approved photo</span>
            )}
          </div>
        )}
      </div>
      {photo && !compact && (
        <figcaption className="note mt-2 flex justify-between gap-4">
          <span className="text-madder">fig. — portrait</span>
          <span className="lowercase">{pranav.name}</span>
        </figcaption>
      )}
    </figure>
  );
}
