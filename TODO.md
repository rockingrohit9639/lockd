# Lockd — TODO

## In Progress

- [ ] **Phase 1: Engine Foundation** — Player moves on canvas with collision
  - [ ] Revise shared types (Vec2, AABB, MapConfig, PlayerState, etc.)
  - [ ] Create src/engine/ modules (input, collision, camera, game-loop, renderer)
  - [ ] Create game-canvas.tsx (React component owning <canvas>)
  - [ ] Hardcoded test map with collision walls
  - [ ] Verify: WASD moves player, camera follows, walls block

## Next Up

- [ ] **Phase 2: Sprites + Objects** — Render objects with depth sorting
  - [ ] Sprite cache (SVG/PNG → ImageBitmap)
  - [ ] Player animation controller (4 directions × idle/walk)
  - [ ] Default player sprite sheet (flat/vector top-down)
  - [ ] Redraw 5 key object sprites as top-down SVGs
  - [ ] Depth-sorted rendering (Y-position sorting)

- [ ] **Phase 3: Interaction System** — Proximity triggers + full gameplay
  - [ ] Proximity detection (nearest interactable object)
  - [ ] Interaction prompts drawn on canvas
  - [ ] Wire E/Space → interaction-engine (handleInteract)
  - [ ] Inventory selection → use_item_on
  - [ ] GameState changes → React overlays (messages, memes, win/fail)

- [ ] **Phase 4: Builder Rewrite** — Top-down 2D map editor
  - [ ] Rewrite builder-canvas as scrollable/zoomable 2D editor
  - [ ] Collision zone drawing tool
  - [ ] Player spawn marker placement
  - [ ] Map settings panel (dimensions, background, player speed)
  - [ ] Updated properties panel (zIndex, collision, interactionRadius, spriteUrl)
  - [ ] Updated trigger builder (interact + enter_zone events)

- [ ] **Phase 5: Polish + Custom Assets**
  - [ ] Redraw all object sprites as top-down
  - [ ] Asset upload UI + spriteUrl support
  - [ ] Performance testing (spatial hash if needed)
  - [ ] Visual effects (highlight glow on interactables, footstep dust)

- [ ] **Phase 6: Migration + Cleanup**
  - [ ] Remove old Direction/wall code
  - [ ] Room format migration utility (old → new)
  - [ ] Update test-room with showcase map

## Backend

- [ ] Complete Better Auth setup (protected routes, user menu)
- [ ] Room CRUD server functions (create, update, delete, list)
- [ ] Room publishing flow (private draft → public link)
- [ ] Asset upload endpoint (Cloudflare R2)

## Infrastructure

- [ ] Cloudflare R2 bucket setup for assets
- [ ] Vercel deployment config
- [ ] Rate limiting on auth + uploads

## Future Ideas

- [ ] Multiplayer rooms (real-time collaboration in builder)
- [ ] Room templates / starter packs
- [ ] Leaderboard (fastest escape times)
- [ ] Room ratings / comments
- [ ] Embed rooms on external sites (iframe)
- [ ] Sound effects + ambient music
- [ ] Mobile touch controls (virtual joystick)
