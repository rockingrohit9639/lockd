# Lockd — Roadmap

## Asset Library

A searchable library of assets that users can upload and use in their rooms.

### How it works

- Users upload custom assets (sprites, images) to the library
- Each asset can be **private** (only visible to the uploader) or **public** (searchable by everyone)
- In the builder, press **⌘+K** to open a command palette that searches the library
- Select an asset from results to place it on the canvas
- The current built-in object palette remains as defaults; the library extends it

### UX

- ⌘+K dialog: fast, keyboard-first (Spotlight/Raycast feel)
- Fuzzy search by name, tags, category
- Preview thumbnails in results
- Recent/favorites section for quick access

### Technical considerations

- Asset storage: Cloudflare R2
- Metadata/search index: D1 or KV
- Upload flow: drag-and-drop or file picker with crop/resize
- Auth required for uploads; browsing public assets is open
- Sprite sheet support for animated objects
