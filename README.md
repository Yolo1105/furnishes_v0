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

- Every page the links point to now exists. Two are holding pages until their tools are built: design your room (the 3D planner) and log in (accounts). Their words are in `apps/web/src/features/soon/soonList.ts`.
- The three legal pages are drafts written from what the site promises; have them checked, and fill in what is in [brackets], in `apps/web/src/features/legal/legalList.ts`.
- Placeholders still to replace: the About page's story, team and awards (`features/about/aboutList.ts`), add-on prices, and the coming finishes' sample photos. The rebuild plan, now built, is in `docs/rebuild-sections-plan.md`.
- Prices are shown in Singapore dollars only; the region picker in the bar changes where you ship to, not the currency, until there are exchange rates.
- Partners: the row shows made-up names. Put the real ones in `apps/web/src/features/partners/partnerList.ts`, mark them `confirmed`, and show only those in `Partners.tsx`.
