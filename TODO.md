# Lockd — TODO

## In Progress

- [ ] Complete Better Auth setup
  - [ ] Create Neon project and add DATABASE_URL to .env
  - [ ] Run `bun run db:push` to push schema
  - [ ] Build sign up / login UI
  - [ ] Add protected routes (builder requires auth)
  - [ ] Add user menu (avatar, sign out)

## Backend

- [ ] Auth middleware for server functions
- [ ] Room CRUD server functions (create, update, delete, list)
- [ ] Room publishing flow (private draft → public link)
- [ ] Asset upload endpoint (Cloudflare R2)
- [ ] Asset CRUD server functions

## Builder

- [ ] Save rooms to database (currently localStorage only)
- [ ] Load user's rooms from database
- [ ] ⌘+K command palette for asset search
- [ ] Custom room backgrounds (per-wall textures)
- [ ] Undo/redo
- [ ] Duplicate objects
- [ ] Grid snapping
- [ ] Object layering (z-index control)

## Player

- [ ] Fix pointer cursor on transparent bounding box areas
- [ ] Load rooms from database by ID/slug
- [ ] Shareable room links
- [ ] Timer with meme events (running low → "this is fine", time out → coffin dance)
- [ ] Win/lose screens with animations
- [ ] Sound effects
- [ ] Mobile touch support

## Asset Library

- [ ] Upload flow (drag-and-drop + file picker)
- [ ] Asset visibility toggle (public/private)
- [ ] Tag system for assets
- [ ] Fuzzy search
- [ ] Preview thumbnails
- [ ] Recent/favorites
- [ ] Categories: objects, memes, backgrounds
- [ ] Sprite sheet support for animated objects

## Polish

- [ ] Loading states and skeletons
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Keyboard shortcuts documentation
- [ ] Responsive layout for smaller screens
- [ ] Dark mode refinements

## Infrastructure

- [ ] Cloudflare R2 bucket setup for assets
- [ ] Vercel deployment config
- [ ] Rate limiting on auth + uploads
- [ ] Image optimization / thumbnails on upload

## Future Ideas

- [ ] Multiplayer rooms (real-time collaboration in builder)
- [ ] Room templates / starter packs
- [ ] Leaderboard (fastest escape times)
- [ ] Room ratings / comments
- [ ] Embed rooms on external sites (iframe)
