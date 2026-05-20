import type { MemeDefinition } from "./types";

export const MEME_LIBRARY: MemeDefinition[] = [
  {
    id: "rickroll",
    name: "Rickroll",
    type: "image",
    url: "https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif",
    duration: 5000,
  },
  {
    id: "doge",
    name: "Doge",
    type: "image",
    url: "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
    duration: 3000,
  },
  {
    id: "coffin-dance",
    name: "Coffin Dance",
    type: "image",
    url: "https://media.giphy.com/media/j6ZlX8ghxNFRknObVk/giphy.gif",
    duration: 5000,
  },
  {
    id: "this-is-fine",
    name: "This Is Fine",
    type: "image",
    url: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
    duration: 4000,
  },
  {
    id: "surprised-pikachu",
    name: "Surprised Pikachu",
    type: "image",
    url: "https://media.giphy.com/media/6nWhy3ulBL7GSCvKw6/giphy.gif",
    duration: 3000,
  },
  {
    id: "distracted-bf",
    name: "Distracted Boyfriend",
    type: "image",
    url: "https://media.giphy.com/media/l0HlvtIPdijBpFLXi/giphy.gif",
    duration: 4000,
  },
  {
    id: "stonks",
    name: "Stonks",
    type: "image",
    url: "https://media.giphy.com/media/YnkMcHgNIMW4Yfber1/giphy.gif",
    duration: 3000,
  },
  {
    id: "disaster-girl",
    name: "Disaster Girl",
    type: "image",
    url: "https://media.giphy.com/media/5zkHGrgdd5Hu6DsYuj/giphy.gif",
    duration: 3000,
  },
  {
    id: "confused-math",
    name: "Confused Math Lady",
    type: "image",
    url: "https://media.giphy.com/media/WRQBXSCnEFJIuxktnw/giphy.gif",
    duration: 4000,
  },
  {
    id: "you-died",
    name: "You Died (Dark Souls)",
    type: "image",
    url: "https://media.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif",
    duration: 4000,
  },
];

export function getMemeById(id: string): MemeDefinition | undefined {
  return MEME_LIBRARY.find((m) => m.id === id);
}
