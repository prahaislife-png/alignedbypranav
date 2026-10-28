import Image from "next/image";
import type { ApprovedImage, IllustrationKey } from "@/types/content";
import { ServiceIllustration } from "@/components/illustrations/service-illustrations";
import { Ruler } from "./ornaments";
import { cn } from "@/lib/cn";

/**
 * A specimen sheet, as a graphologist would file it: figure number, caption,
 * faint ruling and a measuring rule. Holds an approved photograph or one of
 * the original line illustrations, which inks itself in as it scrolls into
 * view (`ink="scroll"`) or just after load (`ink="load"`, for heroes).
 */
export function Specimen({
  visual,
  fig,
  caption,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  ink = "scroll",
  compact = false,
}: {
  visual: IllustrationKey | ApprovedImage;
  fig?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  ink?: "scroll" | "load" | "none";
  compact?: boolean;
}) {
  return (
    <figure className={cn("relative flex flex-col border border-line bg-paper", className)}>
      {!compact && (fig || caption) && (
        <figcaption className="note flex items-baseline justify-between gap-4 border-b border-line px-3 py-2">
          {fig && <span className="text-madder">fig. {fig}</span>}
          {caption && <span className="truncate lowercase">{caption}</span>}
        </figcaption>
      )}
      <div className={cn("relative min-h-0 flex-1 overflow-hidden", !compact && "ruled [background-size:100%_1.6rem]")}>
        {typeof visual === "string" ? (
          <div
            className={cn(
              compact ? "absolute inset-[3%]" : "absolute inset-x-[9%] top-[5%] bottom-[2%]",
              ink === "scroll" && "ink-on-scroll",
              ink === "load" && "draw-late",
            )}
            style={ink === "load" ? { ["--delay" as string]: "0.3s" } : undefined}
          >
            <ServiceIllustration name={visual} />
          </div>
        ) : (
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            priority={priority}
            sizes={sizes}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      {!compact && <Ruler className="px-3 pt-1.5 pb-2" ticks={compact ? 20 : 40} />}
    </figure>
  );
}
