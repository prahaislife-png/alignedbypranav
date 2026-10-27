<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Aligned by Pranav – project rules

- All business content lives in `src/data/*` and `src/config/*`. Change copy there, not in components.
- Pranav Vibhute is the only public-facing expert. Never add information about other people.
- Never invent prices, durations, formats, deliverables, credentials, years of experience, client counts,
  testimonials, ratings, addresses or results. Unconfirmed values stay `null` and render as safe fallbacks.
- Never describe graphology or symbolic practices as scientific, medical, psychological or diagnostic, and never
  promise outcomes (success, wealth, luck, healing, personality prediction). `npm test` checks for common phrases.
- Optional analytics must stay consent-gated (`src/lib/analytics`). Never send personal or consultation content
  to analytics. Keep the Privacy Policy cookie table in sync with any new integration and CSP in `next.config.ts`.
- Keep pages static: no `cookies()`, `headers()` or `searchParams` in pages (UTMs are read client-side).
- Before finishing a change: `npm run check && npm run build`.
