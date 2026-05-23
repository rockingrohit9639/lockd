# Lockd

A top-down 2D escape room builder & player. Users create explorable maps with a movable character, inventory puzzles, hidden memes, and share them with friends.

## Stack

- **Framework:** TanStack Start (React + Nitro)
- **Game Engine:** Custom Canvas 2D (src/engine/) — pure TS, no dependencies
- **Styling:** Tailwind CSS v4
- **Database:** Drizzle ORM + Neon Postgres
- **Auth:** Better Auth (email + password)
- **Linting:** Biome
- **Deployment:** Vercel (Nitro preset)
- **Storage (planned):** Cloudflare R2

## Design System

- Sharp, minimal UI
- Monospace type (Geist)
- CSS variables (shadcn-style): `--primary`, `--foreground`, `--border`, etc.
- No border-radius — everything is sharp/square
- Light mode (`:root`), dark mode via `.dark` class
- Game art: flat/vector style (top-down perspective)
- Memes are hidden surprises, not a selling point

## Project Structure

```
src/
├── engine/         # Game engine (pure logic, no React)
│   ├── game-loop.ts, input.ts, camera.ts
│   ├── collision.ts, proximity.ts
│   ├── renderer.ts, sprite-cache.ts, animation.ts
├── builder/        # Room builder components (React DOM)
├── player/         # Game UI shell (React + <canvas>)
├── db/             # Drizzle schema + connection
├── lib/            # Utilities + auth client
├── hooks/          # TanStack Query hooks (by feature)
├── routes/         # TanStack Start file-based routes
├── shared/         # Types, object catalog, sprites
├── storage/        # localStorage helpers (legacy)
├── env.ts          # Zod env validation
└── styles/app.css  # Tailwind entry + CSS variables
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
- Engine code (src/engine/) is pure TypeScript — no React, no DOM APIs except Canvas

## Key Files

- [TODO.md](./TODO.md) — task tracker and project roadmap
- [ROADMAP.md](./ROADMAP.md) — feature plans (game engine, asset library, custom maps)
- `src/shared/types.ts` — core game types (Room, RoomObject, Trigger, Vec2, AABB, etc.)
- `src/engine/` — game loop, input, collision, camera, rendering
- `src/player/game-canvas.tsx` — React component that owns the <canvas> and starts the engine
- `src/builder/builder-canvas.tsx` — 2D map editor (React DOM)
- `src/db/schema.ts` — database schema (auth + app tables)
- `server/lib/auth.ts` — Better Auth server configuration
- `drizzle.config.ts` — Drizzle Kit migration config
