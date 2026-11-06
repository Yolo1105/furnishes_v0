# Furnishes

The Furnishes website: ready-made and modular furniture for Singapore homes. A pnpm workspace with one Next.js app in `apps/web`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm check   # types, lint, styles, formatting
pnpm build
```

Needs Node 24 and pnpm 10.

## v1: built up from v0

This branch rebuilds the site from `rebuild-sections` one step at a time: the shell first (Milestone 0), then each page, one section at a time, each checked by the owner before it is committed. The foundations plan, with the settled design values and type roles, is the reference.
