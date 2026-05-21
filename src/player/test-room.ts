import type { Room } from "../shared/types";

export const TEST_ROOM: Room = {
  id: "test-room-1",
  name: "The Meme Dungeon",
  description:
    "You wake up in a mysterious room. Find the key and escape... if you can handle the memes.",
  objects: [
    {
      id: "desk-1",
      type: "desk",
      name: "Old Desk",
      view: "north",
      position: { x: 30, y: 55 },
      size: { width: 120, height: 60 },
      hidden: false,
      collectible: false,
      properties: {},
    },
    {
      id: "note-1",
      type: "note",
      name: "Mysterious Note",
      view: "north",
      position: { x: 45, y: 50 },
      size: { width: 35, height: 40 },
      hidden: false,
      collectible: true,
      properties: {},
    },
    {
      id: "painting-1",
      type: "painting",
      name: "Suspicious Painting",
      view: "east",
      position: { x: 35, y: 20 },
      size: { width: 80, height: 60 },
      hidden: false,
      collectible: false,
      properties: {},
    },
    {
      id: "key-1",
      type: "key",
      name: "Golden Key",
      view: "east",
      position: { x: 50, y: 35 },
      size: { width: 30, height: 15 },
      hidden: true,
      collectible: true,
      properties: {},
    },
    {
      id: "safe-1",
      type: "safe",
      name: "Wall Safe",
      view: "south",
      position: { x: 40, y: 40 },
      size: { width: 50, height: 50 },
      hidden: false,
      collectible: false,
      properties: {},
    },
    {
      id: "keycard-1",
      type: "keycard",
      name: "Exit Keycard",
      view: "south",
      position: { x: 45, y: 45 },
      size: { width: 40, height: 25 },
      hidden: true,
      collectible: true,
      properties: {},
    },
    {
      id: "door-1",
      type: "door",
      name: "Exit Door",
      view: "west",
      position: { x: 35, y: 15 },
      size: { width: 70, height: 140 },
      hidden: false,
      collectible: false,
      properties: {},
    },
    {
      id: "plant-1",
      type: "plant",
      name: "Suspiciously Large Plant",
      view: "west",
      position: { x: 70, y: 45 },
      size: { width: 40, height: 60 },
      hidden: false,
      collectible: false,
      properties: {},
    },
  ],
  triggers: [
    // Click note -> pick it up + show message
    {
      id: "t-note-click",
      event: "click",
      sourceId: "note-1",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "note-1" },
        {
          type: "show_message",
          message:
            "The note reads: 'Look behind the painting, but beware... you might get distracted.'",
        },
      ],
    },
    // Click painting -> rickroll + reveal key
    {
      id: "t-painting-click",
      event: "click",
      sourceId: "painting-1",
      conditions: [],
      actions: [
        { type: "play_meme", memeId: "rickroll" },
        { type: "reveal", targetId: "key-1" },
      ],
    },
    // Click key -> pick it up
    {
      id: "t-key-click",
      event: "click",
      sourceId: "key-1",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "key-1" },
        {
          type: "show_message",
          message: "You found the Golden Key! Now what does it open...",
        },
      ],
    },
    // Use key on safe -> open safe, reveal keycard, show meme
    {
      id: "t-safe-use-key",
      event: "use_item_on",
      sourceId: "safe-1",
      itemId: "key-1",
      conditions: [{ type: "has_item", itemId: "key-1" }],
      actions: [
        { type: "remove_from_inventory", targetId: "key-1" },
        { type: "reveal", targetId: "keycard-1" },
        { type: "play_meme", memeId: "surprised-pikachu" },
        {
          type: "show_message",
          message: "The safe clicks open! There's a keycard inside.",
        },
      ],
    },
    // Click keycard -> pick it up
    {
      id: "t-keycard-click",
      event: "click",
      sourceId: "keycard-1",
      conditions: [],
      actions: [{ type: "add_to_inventory", targetId: "keycard-1" }],
    },
    // Use keycard on door -> win!
    {
      id: "t-door-use-keycard",
      event: "use_item_on",
      sourceId: "door-1",
      itemId: "keycard-1",
      conditions: [{ type: "has_item", itemId: "keycard-1" }],
      actions: [{ type: "play_meme", memeId: "coffin-dance" }, { type: "win" }],
    },
    // Click door without keycard -> fail meme
    {
      id: "t-door-click-locked",
      event: "click",
      sourceId: "door-1",
      conditions: [{ type: "not_has_item", itemId: "keycard-1" }],
      actions: [
        { type: "play_meme", memeId: "you-died" },
        {
          type: "show_message",
          message: "The door is locked. You need a keycard.",
        },
      ],
    },
    // Click plant -> doge meme (red herring)
    {
      id: "t-plant-click",
      event: "click",
      sourceId: "plant-1",
      conditions: [],
      actions: [
        { type: "play_meme", memeId: "doge" },
        {
          type: "show_message",
          message: "Much plant. Very suspicious. Wow. (Nothing here though)",
        },
      ],
    },
  ],
  winCondition: {
    type: "trigger",
    triggerId: "t-door-use-keycard",
  },
};
