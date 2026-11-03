# furnishes_v0

The Furnishes website. A pnpm workspace with one Next.js app in `apps/web`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm check   # types, lint, styles, formatting
pnpm build
```

Needs Node 24 and pnpm 10.

## Before going live

- Build the pages the links already point to (all listed in `apps/web/src/lib/routes.ts`): about, contact, design your room, log in, and the three legal pages. Until then those links lead to "not found". The plan for the about page and other sections taken from the rebuild is in `docs/rebuild-sections-plan.md`.
- Prices are shown in Singapore dollars only; the region picker in the bar changes where you ship to, not the currency, until there are exchange rates.
- Partners: the row shows made-up names. Put the real ones in `apps/web/src/features/partners/partnerList.ts`, mark them `confirmed`, and show only those in `Partners.tsx`.
