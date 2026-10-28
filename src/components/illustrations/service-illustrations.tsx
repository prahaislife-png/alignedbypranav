import type { IllustrationKey } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Original line illustrations, one per consultation, drawn on a 320×400
 * canvas. Ink line work with red-pen accents and sage for organic details.
 * Every stroke can be inked in by the `.ink-on-scroll` / `.draw-late` styles.
 */

const INK = "var(--color-ink)";
const ACCENT = "var(--color-madder)";
const SAGE = "var(--color-sage)";
const PAPER = "var(--color-paper)";
const FAINT = "var(--color-line)";

type Props = { className?: string };

/**
 * Each drawing sits a little differently on its canvas, so the frame crops a
 * 300×375 window centred on the drawing's measured ink: every illustration is
 * optically centred in its specimen sheet, whatever its shape.
 */
function Frame({
  children,
  className,
  label,
  center,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  center: [x: number, y: number];
}) {
  const [cx, cy] = center;
  return (
    <svg
      viewBox={`${cx - 150} ${cy - 187.5} 300 375`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
      className={cn("h-full w-full", className)}
    >
      {children}
    </svg>
  );
}

function Signature({ className }: Props) {
  return (
    <Frame center={[172, 230]} className={className} label="Line illustration of a fountain pen finishing a flowing signature">
      <g transform="rotate(-4 160 236)">
        <rect x="58" y="126" width="204" height="226" rx="3" fill={PAPER} stroke={FAINT} strokeWidth="1.2" />
        <path d="M80 312h160" stroke={FAINT} strokeWidth="1" />
        <path d="M80 166h96M80 182h120M80 198h70" stroke={FAINT} strokeWidth="1.4" />
      </g>
      <path
        d="M76 284c14-46 40-50 40-14 0 30-22 30-14 2 7-26 36-30 46-6 8 20 18-10 28-16 12-8 18 18 28 14 14-6 20-30 34-22 14 9-8 46-44 58-30 10-78 6-110 10"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <g transform="translate(204 236) rotate(32)" stroke={INK} strokeWidth="1.5">
        <rect x="-10" y="-150" width="20" height="132" rx="10" fill={PAPER} />
        <path d="M-10 -52h20M-10 -46h20" strokeWidth="1" />
        <path d="M-8 -18h16l-3 22h-10z" fill={PAPER} />
        <path d="M-5 4h10L0 34z" fill={ACCENT} stroke={INK} />
        <path d="M0 15v15" strokeWidth="1" />
        <circle cx="0" cy="14" r="1.6" fill={INK} stroke="none" />
        <path d="M6 -144v62" strokeWidth="1" stroke={ACCENT} />
      </g>
    </Frame>
  );
}

function Logo({ className }: Props) {
  return (
    <Frame center={[160, 225]} className={className} label="Line illustration of geometric logo construction lines">
      <path d="M44 220h232M160 104v232" stroke={FAINT} strokeWidth="1" strokeDasharray="3 5" />
      <path d="M78 138l164 164M242 138L78 302" stroke={FAINT} strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="160" cy="220" r="82" stroke={INK} strokeWidth="1.5" />
      <circle cx="160" cy="220" r="41" stroke={SAGE} strokeWidth="1.3" strokeDasharray="2 4" />
      <path d="M160 138l71 123H89z" stroke={ACCENT} strokeWidth="1.8" />
      <rect x="131" y="191" width="58" height="58" stroke={INK} strokeWidth="1.3" transform="rotate(45 160 220)" />
      {[
        [160, 138],
        [231, 261],
        [89, 261],
        [160, 220],
        [242, 220],
        [78, 220],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={ACCENT} />
      ))}
      <g stroke={INK} strokeWidth="1.2">
        <path d="M70 346h180" />
        {Array.from({ length: 19 }, (_, i) => (
          <path key={i} d={`M${70 + i * 10} 346v${i % 5 === 0 ? -10 : -5}`} />
        ))}
      </g>
    </Frame>
  );
}

function Wristwatch({ className }: Props) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const major = i % 3 === 0;
    const r1 = major ? 40 : 44;
    return {
      x1: 160 + Math.sin(a) * r1,
      y1: 220 - Math.cos(a) * r1,
      x2: 160 + Math.sin(a) * 49,
      y2: 220 - Math.cos(a) * 49,
      major,
    };
  });
  return (
    <Frame center={[163, 211]} className={className} label="Line illustration of a wristwatch with hands at ten past ten">
      <path d="M128 162V74c0-8 6-14 14-14h36c8 0 14 6 14 14v88" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      <path d="M136 156V78c0-4 3-8 8-8h32c5 0 8 4 8 8v78" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 4" />
      <path d="M128 278v70c0 8 6 14 14 14h36c8 0 14-6 14-14v-70" fill={PAPER} stroke={INK} strokeWidth="1.5" />
      {[300, 322, 344].map((y) => (
        <circle key={y} cx="160" cy={y} r="3" stroke={INK} strokeWidth="1.2" />
      ))}
      <circle cx="160" cy="220" r="66" fill={PAPER} stroke={INK} strokeWidth="1.8" />
      <circle cx="160" cy="220" r="56" stroke={ACCENT} strokeWidth="1.2" />
      <rect x="225" y="212" width="10" height="16" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      {ticks.map((t, i) => (
        <path
          key={i}
          d={`M${t.x1} ${t.y1}L${t.x2} ${t.y2}`}
          stroke={t.major ? ACCENT : INK}
          strokeWidth={t.major ? 2.4 : 1.3}
        />
      ))}
      <path d="M160 220l-26-15" stroke={INK} strokeWidth="2.6" />
      <path d="M160 220l30-25" stroke={INK} strokeWidth="1.8" />
      <path d="M160 238V178" stroke={ACCENT} strokeWidth="1" />
      <circle cx="160" cy="220" r="3.4" fill={ACCENT} />
    </Frame>
  );
}

function OfficeClock({ className }: Props) {
  return (
    <Frame center={[160, 234]} className={className} label="Line illustration of a wall clock aligned above a desk">
      <path d="M40 300h240" stroke={FAINT} strokeWidth="1" />
      <path d="M160 266v38" stroke={ACCENT} strokeWidth="1.2" strokeDasharray="3 5" />
      <circle cx="160" cy="176" r="78" fill={PAPER} stroke={INK} strokeWidth="1.8" />
      <circle cx="160" cy="176" r="70" stroke={FAINT} strokeWidth="1" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <circle
            key={i}
            cx={160 + Math.sin(a) * 58}
            cy={176 - Math.cos(a) * 58}
            r={i % 3 === 0 ? 3.4 : 1.8}
            fill={i % 3 === 0 ? ACCENT : INK}
          />
        );
      })}
      <path d="M160 176l0-40" stroke={INK} strokeWidth="2.4" />
      <path d="M160 176l34 18" stroke={INK} strokeWidth="1.8" />
      <circle cx="160" cy="176" r="4" fill={ACCENT} />
      <path d="M48 330h224" stroke={INK} strokeWidth="1.6" />
      <path d="M64 330v40M256 330v40" stroke={INK} strokeWidth="1.4" />
      <path d="M78 330l6-28h28l6 28" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      <path d="M98 302c-2-18-14-26-22-30 10 0 20 8 22 18 2-14 12-24 24-26-8 8-16 20-18 38" stroke={SAGE} strokeWidth="1.5" />
      <path d="M190 330h56v-10h-56zM196 320h44v-9h-44z" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      <path d="M224 311l10-34M234 277l8 3-10 33" stroke={ACCENT} strokeWidth="1.3" />
    </Frame>
  );
}

function PhoneNumber({ className }: Props) {
  const xs = [104, 160, 216];
  const ys = [140, 192, 244, 296];
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];
  const pos = (n: number) => ({ x: xs[n % 3], y: ys[Math.floor(n / 3)] });
  const pattern = [0, 4, 8, 7].map(pos);
  return (
    <Frame center={[160, 222]} className={className} label="Line illustration of a numeric keypad with a pattern connecting digits">
      <rect x="62" y="74" width="196" height="296" rx="30" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <path d="M142 92h36" stroke={INK} strokeWidth="1.4" />
      <path
        d={`M${pattern.map((p) => `${p.x} ${p.y}`).join("L")}`}
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="1 0"
      />
      {labels.map((label, i) => {
        if (!label) return null;
        const { x, y } = pos(i);
        const inPattern = [0, 4, 8, 7].includes(i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="19" fill={PAPER} stroke={inPattern ? ACCENT : FAINT} strokeWidth={inPattern ? 1.6 : 1.2} />
            <text
              x={x}
              y={y + 7}
              textAnchor="middle"
              fill={INK}
              stroke="none"
              style={{ font: "500 21px var(--font-display), Georgia, serif" }}
            >
              {label}
            </text>
          </g>
        );
      })}
      <path d="M150 340h20" stroke={INK} strokeWidth="1.4" />
    </Frame>
  );
}

function Drawing({ className }: Props) {
  return (
    <Frame center={[162, 223]} className={className} label="Line illustration of a child's drawing of a sun, a house and a tree, with a crayon">
      <g transform="rotate(3 160 220)">
        <rect x="52" y="96" width="216" height="248" rx="3" fill={PAPER} stroke={FAINT} strokeWidth="1.2" />
      </g>
      <g stroke={ACCENT} strokeWidth="2.2">
        <path d="M108 150c0-11 9-19 19-18 10 1 17 10 16 20-1 10-10 17-20 16-9-1-15-9-15-18z" />
        <path d="M126 116v-10M152 128l8-6M160 152h10M98 132l-7-6M92 156H82M150 178l7 7M102 176l-6 7" />
      </g>
      <g stroke={INK} strokeWidth="2">
        <path d="M150 266c0-15 1-30 0-46 22-1 44 0 66 1 1 15 0 30 1 45" />
        <path d="M144 222c13-17 27-31 40-44 13 14 26 28 40 44" />
        <path d="M176 266v-22c4-1 9-1 13 0v22" />
        <path d="M156 236h12v10h-12z" strokeWidth="1.6" />
      </g>
      <g stroke={SAGE} strokeWidth="2.2">
        <path d="M100 266c1-14 0-26 1-38" />
        <path d="M100 230c-14 0-22-10-20-22 2-12 14-18 24-14 10-6 24 2 22 14 0 12-12 22-26 22z" />
      </g>
      <path d="M66 272c18-6 34 4 52-2s34-6 52 0 36 4 54-2 26 0 32 2" stroke={SAGE} strokeWidth="1.6" />
      <g transform="translate(232 318) rotate(-38)">
        <path d="M-46 -9h76l16 9-16 9h-76z" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <path d="M30 -9l16 9-16 9z" fill={ACCENT} stroke={INK} strokeWidth="1.3" />
        <path d="M-28 -9v18M-20 -9v18M10 -9v18" stroke={ACCENT} strokeWidth="1.2" />
      </g>
    </Frame>
  );
}

function VisionBoard({ className }: Props) {
  return (
    <Frame center={[160, 216]} className={className} label="Line illustration of a vision board with pinned cards">
      <rect x="50" y="80" width="220" height="272" rx="4" fill="var(--color-paper-3)" stroke={INK} strokeWidth="1.5" />
      <g transform="rotate(-4 112 150)">
        <rect x="68" y="102" width="88" height="96" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <path d="M76 180l22-28 14 16 12-12 24 24" stroke={INK} strokeWidth="1.3" />
        <circle cx="134" cy="126" r="9" stroke={ACCENT} strokeWidth="1.6" />
      </g>
      <g transform="rotate(5 210 140)">
        <rect x="172" y="98" width="80" height="84" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <path d="M212 168c-18-16-16-42 0-56 16 14 18 40 0 56zM212 168v-48" stroke={SAGE} strokeWidth="1.5" />
      </g>
      <g transform="rotate(3 116 274)">
        <rect x="70" y="224" width="96" height="104" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <path d="M84 250h66M84 266h54M84 282h62M84 298h38" stroke={FAINT} strokeWidth="2" />
      </g>
      <g transform="rotate(-5 216 270)">
        <rect x="182" y="208" width="72" height="72" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <path d="M200 256l18-28 18 28z" stroke={ACCENT} strokeWidth="1.5" />
      </g>
      <g transform="rotate(-2 214 316)">
        <rect x="186" y="294" width="62" height="40" fill={PAPER} stroke={INK} strokeWidth="1.3" />
        <path d="M196 314h42" stroke={ACCENT} strokeWidth="1.5" />
      </g>
      <path d="M150 210l30-10" stroke={ACCENT} strokeWidth="5" opacity="0.45" />
      {[
        [112, 104],
        [212, 100],
        [118, 226],
        [218, 210],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill={ACCENT} stroke={INK} strokeWidth="1" />
      ))}
    </Frame>
  );
}

const registry: Record<IllustrationKey, (props: Props) => React.ReactElement> = {
  signature: Signature,
  logo: Logo,
  wristwatch: Wristwatch,
  "office-clock": OfficeClock,
  "phone-number": PhoneNumber,
  drawing: Drawing,
  "vision-board": VisionBoard,
};

export function ServiceIllustration({ name, ...props }: Props & { name: IllustrationKey }) {
  const Illustration = registry[name];
  return <Illustration {...props} />;
}
