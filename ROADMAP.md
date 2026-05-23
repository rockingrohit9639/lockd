# Lockd — Roadmap

## Game Engine (Current Focus)

Lockd is being rewritten from a static 4-wall point-and-click room into a top-down 2D explorable game with a movable player character.

### How it works

- Player character moves freely on a large 2D map using WASD/arrow keys
- Camera follows the player with smooth interpolation
- Objects are placed on the map with collision boxes and interaction radii
- Walk near an object → interaction prompt appears → press E/Space to interact
- Triggers fire on interaction (same condition/action system as before)
- Inventory, memes, win/fail — all carry over

### Tech

- **Renderer**: HTML5 Canvas 2D with custom game loop (requestAnimationFrame, fixed timestep)
- **Physics**: AABB collision with slide resolution, no acceleration (instant movement for responsive feel)
- **Sprites**: Flat/vector style (SVG → ImageBitmap pre-rasterized for performance)
- **Architecture**: Pure engine code (src/engine/) decoupled from React; React handles UI overlays only

### Art Style

- Flat/vector (inspired by Set Snail / Google I/O Adventure)
- Top-down perspective
- Simple player character (4-direction walk animation)
- Clean, minimal object sprites

---

## Asset Library

A searchable library of assets that users can upload and use in their rooms.

### How it works

- Users upload custom assets (sprites, images, memes) to the library
- Each asset can be **private** (only visible to the uploader) or **public** (searchable by everyone)
- In the builder, press **⌘+K** to open a command palette that searches the library
- Select an asset from results to place it on the canvas
- The current built-in object palette remains as defaults; the library extends it
- Custom sprites are referenced via `spriteUrl` on RoomObject

### Asset types

- **Objects** — top-down sprites/images to place in rooms (furniture, props, custom art)
- **Memes** — gifs, images, short videos to use as trigger actions
- **Backgrounds** — map background textures/images

### Technical considerations

- Asset storage: Cloudflare R2
- Metadata/search index: Neon Postgres
- Upload flow: drag-and-drop or file picker
- Auth required for uploads; browsing public assets is open
- Sprites pre-rasterized to ImageBitmap at game load time

---

## Custom Maps

Maps are free-form continuous worlds (not tile-based):

- Configurable dimensions (e.g., 2000x1500px)
- Background image or solid color
- Collision zones: explicit AABB rectangles defining blocked areas
- Player spawn point
- Objects placed at exact pixel coordinates with depth sorting by Y-position
