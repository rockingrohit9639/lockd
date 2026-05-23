# Lockd

A lightweight 2D escape room builder & player. Users create point-and-click rooms with inventory puzzles, hidden memes, and share them with friends.

## Stack

- **Framework:** TanStack Start (React + Nitro)
- **Styling:** Tailwind CSS v4
- **Database:** Drizzle ORM + Neon Postgres
- **Auth:** Better Auth (email + password)
- **Linting:** Biome
- **Deployment:** Vercel (Nitro preset)
- **Storage (planned):** Cloudflare R2

## Design System

- Sharp, minimal UI (Motion.dev inspired)
- Monospace type (Geist)
- Accent color: `#ccff00`
- No border-radius — everything is sharp/square
- Dark mode only
- Memes are hidden surprises, not a selling point

## Project Structure

```
src/
├── builder/        # Room builder components
├── player/         # Room player engine
├── db/             # Drizzle schema + connection
├── lib/            # Utilities + auth client
├── routes/         # TanStack Start file-based routes
├── shared/         # Types, object catalog
├── storage/        # localStorage helpers (legacy)
├── env.ts          # Zod env validation
└── styles.css      # Tailwind entry
server/
├── lib/            # Server-only modules (auth config)
└── routes/         # Nitro API routes
```

## Commands

```bash
bun dev              # Start dev server
bun run build        # Production build + type check
bun run check        # Biome lint + format (auto-fix)
bun run db:generate  # Generate Drizzle migration
bun run db:push      # Push schema to database
bun run db:studio    # Open Drizzle Studio
```

## Rules

Follow all guidelines in [.claude/RULES.md](./.claude/RULES.md) — especially the hook extraction pattern for TanStack Query mutations and queries.

## Conventions

- Path alias: `~/` maps to `src/`
- File naming: kebab-case for all files
- Imports: double quotes, organized by Biome
- Server routes live in `server/routes/` (Nitro convention)
- Env vars validated via `src/env.ts` — import `env` instead of using `process.env`

## Key Files

- [TODO.md](./TODO.md) — task tracker and project roadmap
- [ROADMAP.md](./ROADMAP.md) — feature plans (asset library, custom backgrounds)
- `src/db/schema.ts` — database schema (auth + app tables)
- `server/lib/auth.ts` — Better Auth server configuration
- `src/shared/types.ts` — core game types (Room, Object, Trigger, Action)
- `drizzle.config.ts` — Drizzle Kit migration config
