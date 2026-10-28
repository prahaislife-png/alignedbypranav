import { home } from "@/data/home";
import { pranav } from "@/data/pranav";
import { handwriting } from "@/components/brand/handwriting-data";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

/**
 * Typographic hero. The headline is set in BluuNext except its key word,
 * which is written live with a pen and then annotated the way a
 * graphologist marks up a sample: baseline, x-height and slant.
 * The real word stays in the <h1> for search engines and screen readers.
 */
export function HomeHero() {
  const { hero } = home;
  const match = hero.headline.match(/^(.*?)\*([a-z]+)([^*]*)\*(.*)$/i);
  const [before, word, punctuation, after] = match ? match.slice(1) : [hero.headline, "", "", ""];
  const written = word.toLowerCase() in handwriting;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="container-page grid gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-12 lg:gap-x-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-8">
          <p className="eyebrow">
            <span aria-hidden="true">§ </span>
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-5 max-w-[11ch] font-display text-[clamp(3rem,6.4vw+0.75rem,8.5rem)] leading-[0.92] tracking-[-0.03em] lg:mt-7"
          >
            {before}
            {written ? <WrittenWord word={word.toLowerCase() as "details"} /> : <em className="accent-italic">{word}</em>}
            {punctuation}
            {after}
          </h1>
        </div>

        <div className="flex flex-col justify-end lg:col-span-4 lg:pb-3">
          <p className="lead max-w-[30rem] !text-ink">{hero.supportingLine}</p>
          <div data-hero-cta className="mt-8 flex flex-col gap-4 xs:flex-row xs:flex-wrap">
            <WhatsAppCta label={hero.secondaryCta} placement="hero" />
            <LinkButton href="/services" variant="outline" arrow>
              {hero.primaryCta}
            </LinkButton>
          </div>
          <ul
            className="mt-9 grid gap-1.5 border-t border-line pt-5 font-mono text-[0.75rem] text-muted lowercase"
            aria-label="About these consultations"
          >
            {[...hero.trustDescriptors, pranav.title].map((item, i) => (
              <li key={item} className="flex gap-3">
                <span className="text-madder">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Geometry in the handwriting's own units (baseline y = 0). The slant guide
   follows the stem of the "d" as written: 60° from the baseline. */
const SLANT = { x1: 134, y1: 60, x2: 639, y2: -820, at: 168.5 };

function WrittenWord({ word }: { word: "details" }) {
  const { d, viewBox } = handwriting[word];
  const [minX, , width] = viewBox.split(" ").map(Number);
  const timing = { ["--write-duration" as string]: "2.2s", ["--write-delay" as string]: "0.35s" };
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="sr-only">{word}</span>
      <svg aria-hidden="true" viewBox={viewBox} fill="none" className="inline-block h-[1.32em] w-auto overflow-visible align-[-0.24em]">
        {/* Guide lines: x-height (dotted), baseline and slant (red pen), drawn after the word. */}
        <g className="draw-late" style={{ ["--delay" as string]: "2.3s", ["--ink-length" as string]: 3000 }}>
          <line x1={minX} x2={minX + width} y1={-356} y2={-356} stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
          <line x1={minX - 40} x2={minX + width + 40} y1={0} y2={0} stroke="var(--color-madder)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <line x1={SLANT.x1} y1={SLANT.y1} x2={SLANT.x2} y2={SLANT.y2} stroke="var(--color-madder)" strokeWidth="1.2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
          <path d={`M${SLANT.at + 170} 0A170 170 0 0 0 ${SLANT.at + 85} -147.2`} stroke="var(--color-madder)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </g>
        <path
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="write-on"
          style={timing}
        />
        <g className="pen-nib" style={{ ...timing, offsetPath: `path("${d}")`, opacity: 0 }}>
          <g transform="rotate(-35) scale(1.6)">
            <path d="M0 0 L-46 -150 Q0 -205 46 -150 Z" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="10" />
            <path d="M0 -8 L0 -120" stroke="var(--color-ink)" strokeWidth="9" strokeLinecap="round" />
            <rect x="-60" y="-330" width="120" height="175" rx="20" fill="var(--color-ink)" />
          </g>
        </g>
      </svg>
      {/* Margin notes in red pen, once the word is written. */}
      <span
        aria-hidden="true"
        className="fade-in absolute top-full left-[2%] mt-1 font-mono text-[0.6875rem] leading-none font-normal tracking-normal text-madder not-italic sm:text-[0.75rem]"
        style={{ ["--delay" as string]: "2.7s" }}
      >
        slant 60°
      </span>
      <span
        aria-hidden="true"
        className="fade-in absolute top-full right-0 mt-1 hidden font-mono text-[0.75rem] leading-none font-normal tracking-normal text-madder sm:block"
        style={{ ["--delay" as string]: "2.9s" }}
      >
        baseline · even
      </span>
    </span>
  );
}
