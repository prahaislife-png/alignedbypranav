/** Custom line icons for the three-step journey. */

const common = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ExploreIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="32" cy="32" r="22" />
      <path d="M32 6v6M32 52v6M6 32h6M52 32h6" />
      <path d="M38.5 25.5 35 35l-9.5 3.5L29 29z" stroke="var(--color-madder)" />
      <circle cx="32" cy="32" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function ConnectIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M12 16h30a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H26l-9 7v-7h-5a6 6 0 0 1-6-6V22a6 6 0 0 1 6-6z" />
      <path d="M17 26h20M17 32h13" stroke="var(--color-madder)" />
      <path d="M52 24h2a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-2v6l-7-6" />
    </svg>
  );
}

export function ConsultIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="24" cy="32" r="15" />
      <circle cx="40" cy="32" r="15" />
      <path d="M32 19.5v25" stroke="var(--color-madder)" />
      <path d="M30 32l2-2 2 2-2 2z" fill="var(--color-madder)" stroke="var(--color-madder)" />
    </svg>
  );
}
