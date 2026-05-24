import type { Room } from "../shared/types";

export const PROFESSORS_STUDY: Room = {
  id: "professors-study",
  name: "The Professor's Study",
  description:
    "Professor Aldric vanished mid-lecture. His study holds the answer — but he never made anything easy.",
  map: {
    width: 2400,
    height: 2000,
    backgroundColor: "#c9c2b4",
    playerSpawn: { x: 1200, y: 1700 },
  },
  player: {
    speed: 170,
    size: { width: 28, height: 28 },
    interactionReach: 20,
  },
  collisionZones: [
    // Walls
    { id: "wall-top", bounds: { x: 0, y: 0, width: 2400, height: 40 } },
    { id: "wall-bottom", bounds: { x: 0, y: 1960, width: 2400, height: 40 } },
    { id: "wall-left", bounds: { x: 0, y: 0, width: 40, height: 2000 } },
    { id: "wall-right", bounds: { x: 2360, y: 0, width: 40, height: 2000 } },
    // Interior walls (creates rooms within the study)
    { id: "partition-1", bounds: { x: 900, y: 40, width: 32, height: 500 } },
    { id: "partition-2", bounds: { x: 900, y: 640, width: 32, height: 360 } },
    // Furniture collisions
    { id: "desk-main", bounds: { x: 150, y: 150, width: 220, height: 100 } },
    { id: "bookshelf-1", bounds: { x: 50, y: 500, width: 160, height: 50 } },
    { id: "bookshelf-2", bounds: { x: 50, y: 700, width: 160, height: 50 } },
    { id: "cabinet-col", bounds: { x: 1000, y: 100, width: 120, height: 80 } },
    { id: "filing-col", bounds: { x: 1200, y: 100, width: 80, height: 60 } },
    { id: "lab-table", bounds: { x: 1500, y: 300, width: 200, height: 80 } },
    { id: "couch-col", bounds: { x: 500, y: 1200, width: 200, height: 80 } },
    { id: "coffee-table", bounds: { x: 550, y: 1320, width: 100, height: 60 } },
    { id: "piano-col", bounds: { x: 1800, y: 800, width: 180, height: 100 } },
    { id: "globe-stand", bounds: { x: 1700, y: 1400, width: 50, height: 50 } },
    { id: "wardrobe-col", bounds: { x: 2100, y: 100, width: 100, height: 200 } },
    { id: "desk-2", bounds: { x: 1800, y: 1600, width: 160, height: 80 } },
  ],
  objects: [
    // ═══ MAIN STUDY (left of partition) ═══

    // Professor's desk area
    {
      id: "obj-desk",
      type: "desk",
      name: "Professor's Desk",
      position: { x: 130, y: 130 },
      size: { width: 260, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 150, y: 150, width: 220, height: 100 },
      interactionRadius: 65,
      properties: {},
    },
    {
      id: "obj-note-desk",
      type: "note",
      name: "Lecture Notes",
      position: { x: 200, y: 145 },
      size: { width: 35, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 65,
      properties: {},
    },
    {
      id: "obj-drawer-desk",
      type: "drawer",
      name: "Desk Drawer",
      position: { x: 310, y: 220 },
      size: { width: 60, height: 40 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-computer",
      type: "computer",
      name: "Desktop Computer",
      position: { x: 160, y: 140 },
      size: { width: 70, height: 50 },
      zIndex: 3,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 65,
      properties: {},
    },
    {
      id: "obj-chair-desk",
      type: "chair",
      name: "Office Chair",
      position: { x: 230, y: 290 },
      size: { width: 50, height: 50 },
      zIndex: 0,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 0,
      properties: {},
    },

    // Bookshelves along left wall
    {
      id: "obj-bookshelf-1",
      type: "bookshelf",
      name: "Bookshelf (Philosophy)",
      position: { x: 40, y: 470 },
      size: { width: 180, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 50, y: 500, width: 160, height: 50 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-bookshelf-2",
      type: "bookshelf",
      name: "Bookshelf (Cryptography)",
      position: { x: 40, y: 670 },
      size: { width: 180, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 50, y: 700, width: 160, height: 50 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-hidden-panel",
      type: "hidden-panel",
      name: "Wall Panel",
      position: { x: 80, y: 810 },
      size: { width: 70, height: 70 },
      zIndex: 0,
      hidden: true,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },

    // Wall decorations
    {
      id: "obj-painting-1",
      type: "painting",
      name: "Oil Painting",
      position: { x: 450, y: 50 },
      size: { width: 120, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-painting-2",
      type: "painting",
      name: "Abstract Painting",
      position: { x: 650, y: 50 },
      size: { width: 100, height: 80 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-clock",
      type: "clock",
      name: "Wall Clock",
      position: { x: 500, y: 400 },
      size: { width: 50, height: 50 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-mirror",
      type: "mirror",
      name: "Ornate Mirror",
      position: { x: 700, y: 400 },
      size: { width: 60, height: 80 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },

    // Living area
    {
      id: "obj-couch",
      type: "bed",
      name: "Leather Couch",
      position: { x: 470, y: 1170 },
      size: { width: 240, height: 110 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 500, y: 1200, width: 200, height: 80 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-coffee-table",
      type: "table",
      name: "Coffee Table",
      position: { x: 530, y: 1300 },
      size: { width: 120, height: 80 },
      zIndex: 0,
      hidden: false,
      collectible: false,
      collision: { x: 550, y: 1320, width: 100, height: 60 },
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-newspaper",
      type: "newspaper",
      name: "Crumpled Newspaper",
      position: { x: 565, y: 1330 },
      size: { width: 45, height: 55 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-rug-1",
      type: "rug",
      name: "Persian Rug",
      position: { x: 400, y: 1050 },
      size: { width: 350, height: 420 },
      zIndex: -1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 0,
      properties: {},
    },
    {
      id: "obj-plant-1",
      type: "plant",
      name: "Potted Fern",
      position: { x: 80, y: 1000 },
      size: { width: 50, height: 70 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 45,
      properties: {},
    },
    {
      id: "obj-plant-2",
      type: "plant",
      name: "Dead Orchid",
      position: { x: 800, y: 1100 },
      size: { width: 40, height: 55 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 45,
      properties: {},
    },

    // ═══ RIGHT WING (through partition gap) ═══

    // Research cabinet area
    {
      id: "obj-cabinet",
      type: "cabinet",
      name: "Locked Cabinet",
      position: { x: 980, y: 80 },
      size: { width: 140, height: 100 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1000, y: 100, width: 120, height: 80 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-filing",
      type: "drawer",
      name: "Filing Cabinet",
      position: { x: 1180, y: 80 },
      size: { width: 100, height: 80 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1200, y: 100, width: 80, height: 60 },
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-photo",
      type: "photo",
      name: "Framed Photo",
      position: { x: 1050, y: 220 },
      size: { width: 40, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },

    // Lab/research table
    {
      id: "obj-lab-table",
      type: "table",
      name: "Research Table",
      position: { x: 1480, y: 280 },
      size: { width: 240, height: 110 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1500, y: 300, width: 200, height: 80 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-note-research",
      type: "note",
      name: "Research Notes",
      position: { x: 1550, y: 290 },
      size: { width: 35, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-map",
      type: "map",
      name: "Marked Map",
      position: { x: 1640, y: 290 },
      size: { width: 60, height: 45 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-box-chemicals",
      type: "box",
      name: "Supply Box",
      position: { x: 1750, y: 310 },
      size: { width: 45, height: 45 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },

    // Piano corner
    {
      id: "obj-piano",
      type: "cabinet",
      name: "Grand Piano",
      position: { x: 1780, y: 780 },
      size: { width: 220, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1800, y: 800, width: 180, height: 100 },
      interactionRadius: 70,
      properties: {},
    },
    {
      id: "obj-sheet-music",
      type: "note",
      name: "Sheet Music",
      position: { x: 1860, y: 780 },
      size: { width: 40, height: 45 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 65,
      properties: {},
    },

    // Globe and reading area
    {
      id: "obj-globe",
      type: "cabinet",
      name: "Antique Globe",
      position: { x: 1680, y: 1380 },
      size: { width: 70, height: 70 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1700, y: 1400, width: 50, height: 50 },
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-rug-2",
      type: "rug",
      name: "Oriental Rug",
      position: { x: 1500, y: 1200 },
      size: { width: 280, height: 200 },
      zIndex: -1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 0,
      properties: {},
    },

    // Wardrobe area
    {
      id: "obj-wardrobe",
      type: "cabinet",
      name: "Wardrobe",
      position: { x: 2080, y: 80 },
      size: { width: 130, height: 230 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 2100, y: 100, width: 100, height: 200 },
      interactionRadius: 65,
      properties: {},
    },

    // Secondary desk (assistant's?)
    {
      id: "obj-desk-2",
      type: "desk",
      name: "Assistant's Desk",
      position: { x: 1780, y: 1580 },
      size: { width: 200, height: 100 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1800, y: 1600, width: 160, height: 80 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-phone",
      type: "phone",
      name: "Rotary Phone",
      position: { x: 1830, y: 1590 },
      size: { width: 30, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-envelope",
      type: "envelope",
      name: "Sealed Envelope",
      position: { x: 1900, y: 1600 },
      size: { width: 40, height: 25 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },

    // ═══ KEY ITEMS (hidden) ═══
    {
      id: "obj-screwdriver",
      type: "key",
      name: "Screwdriver",
      position: { x: 95, y: 830 },
      size: { width: 28, height: 28 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-keycard",
      type: "keycard",
      name: "Access Card",
      position: { x: 1060, y: 240 },
      size: { width: 40, height: 25 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-cipher-wheel",
      type: "combination-lock",
      name: "Cipher Wheel",
      position: { x: 1870, y: 1610 },
      size: { width: 35, height: 35 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-master-key",
      type: "key",
      name: "Brass Key",
      position: { x: 1715, y: 1415 },
      size: { width: 30, height: 15 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },

    // ═══ SAFE & DOOR ═══
    {
      id: "obj-safe",
      type: "safe",
      name: "Floor Safe",
      position: { x: 1680, y: 1030 },
      size: { width: 70, height: 70 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1685, y: 1035, width: 60, height: 60 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-code-panel",
      type: "code-panel",
      name: "Door Panel",
      position: { x: 1165, y: 45 },
      size: { width: 50, height: 60 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },
    {
      id: "obj-door",
      type: "door",
      name: "Reinforced Door",
      position: { x: 1080, y: 40 },
      size: { width: 80, height: 60 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1085, y: 42, width: 70, height: 55 },
      interactionRadius: 60,
      properties: {},
    },

    // Light switch
    {
      id: "obj-light-switch",
      type: "light-switch",
      name: "Light Switch",
      position: { x: 880, y: 560 },
      size: { width: 20, height: 30 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 45,
      properties: {},
    },
  ],
  triggers: [
    // ╔══════════════════════════════════════╗
    // ║  PUZZLE PATH A: The Computer Code   ║
    // ╚══════════════════════════════════════╝

    // 1. Read lecture notes → hint about cryptography bookshelf
    {
      id: "trg-lecture-notes",
      event: "interact",
      sourceId: "obj-note-desk",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message:
            "\"Today's topic: hiding in plain sight. The Cryptography shelf holds more than books. Pull the red spine.\" — Prof. Aldric's last lecture notes.",
        },
      ],
    },

    // 2. Computer needs a password
    {
      id: "trg-computer-locked",
      event: "interact",
      sourceId: "obj-computer",
      conditions: [{ type: "flag_not_set", flag: "computer_unlocked" }],
      actions: [
        {
          type: "show_message",
          message:
            "Login required. The screen shows: \"Hint: my companion's name, lowercase.\" A cat photo is pinned to the monitor.",
        },
      ],
    },
    {
      id: "trg-computer-unlocked",
      event: "interact",
      sourceId: "obj-computer",
      conditions: [{ type: "flag_set", flag: "computer_unlocked" }],
      actions: [
        {
          type: "show_message",
          message:
            "Emails open. One draft reads: \"The safe combination is the clock time backward: 1-3-4. But the safe needs the cipher wheel to decode the final digit.\"",
        },
      ],
    },

    // 3. Framed photo reveals cat's name (for computer password)
    {
      id: "trg-photo",
      event: "interact",
      sourceId: "obj-photo",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message:
            "A photo of Professor Aldric holding a grey tabby. Handwritten on the back: \"Minerva, 2019.\"",
        },
      ],
    },

    // ╔══════════════════════════════════════╗
    // ║  PUZZLE PATH B: The Hidden Panel    ║
    // ╚══════════════════════════════════════╝

    // 4. Cryptography bookshelf → reveals hidden panel
    {
      id: "trg-bookshelf-crypto",
      event: "interact",
      sourceId: "obj-bookshelf-2",
      conditions: [{ type: "flag_not_set", flag: "panel_revealed" }],
      actions: [
        { type: "reveal", targetId: "obj-hidden-panel" },
        { type: "reveal", targetId: "obj-screwdriver" },
        { type: "set_flag", flag: "panel_revealed" },
        {
          type: "show_message",
          message:
            "You pull the red-spined book. The shelf slides, revealing a maintenance panel. A screwdriver rests inside.",
        },
      ],
    },
    {
      id: "trg-bookshelf-crypto-done",
      event: "interact",
      sourceId: "obj-bookshelf-2",
      conditions: [{ type: "flag_set", flag: "panel_revealed" }],
      actions: [
        {
          type: "show_message",
          message: "The bookshelf is already displaced. Dust motes drift in the gap.",
        },
      ],
    },

    // 5. Collect screwdriver
    {
      id: "trg-collect-screwdriver",
      event: "interact",
      sourceId: "obj-screwdriver",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-screwdriver" },
        { type: "show_message", message: "Grabbed the screwdriver." },
      ],
    },

    // 6. Use screwdriver on cabinet → reveals keycard
    {
      id: "trg-cabinet-locked",
      event: "interact",
      sourceId: "obj-cabinet",
      conditions: [{ type: "flag_not_set", flag: "cabinet_open" }],
      actions: [
        {
          type: "show_message",
          message: "The cabinet's screws are exposed. You could pry it open with the right tool.",
        },
      ],
    },
    {
      id: "trg-cabinet-open",
      event: "use_item_on",
      sourceId: "obj-cabinet",
      itemId: "obj-screwdriver",
      conditions: [{ type: "has_item", itemId: "obj-screwdriver" }],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-screwdriver" },
        { type: "reveal", targetId: "obj-keycard" },
        { type: "set_flag", flag: "cabinet_open" },
        {
          type: "show_message",
          message: "The screws pop out. Inside: an access card labeled \"TERMINAL AUTH.\"",
        },
      ],
    },
    {
      id: "trg-cabinet-empty",
      event: "interact",
      sourceId: "obj-cabinet",
      conditions: [{ type: "flag_set", flag: "cabinet_open" }],
      actions: [
        { type: "show_message", message: "Cabinet's empty. Just dust and stripped screws." },
      ],
    },

    // 7. Collect keycard
    {
      id: "trg-collect-keycard",
      event: "interact",
      sourceId: "obj-keycard",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-keycard" },
        { type: "show_message", message: "Picked up the access card." },
      ],
    },

    // 8. Use keycard on computer → unlocks it
    {
      id: "trg-use-card-computer",
      event: "use_item_on",
      sourceId: "obj-computer",
      itemId: "obj-keycard",
      conditions: [{ type: "has_item", itemId: "obj-keycard" }],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-keycard" },
        { type: "set_flag", flag: "computer_unlocked" },
        {
          type: "show_message",
          message:
            "Card accepted. The screen unlocks — Professor Aldric's email is open. Read the computer again.",
        },
      ],
    },

    // ╔══════════════════════════════════════╗
    // ║  PUZZLE PATH C: The Safe + Globe    ║
    // ╚══════════════════════════════════════╝

    // 9. Clock → subtle hint (time = 4:31)
    {
      id: "trg-clock",
      event: "interact",
      sourceId: "obj-clock",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "The clock stopped at 4:31. The battery compartment is empty.",
        },
      ],
    },

    // 10. Envelope on assistant's desk → reveals cipher wheel
    {
      id: "trg-envelope",
      event: "interact",
      sourceId: "obj-envelope",
      conditions: [{ type: "flag_not_set", flag: "envelope_opened" }],
      actions: [
        { type: "reveal", targetId: "obj-cipher-wheel" },
        { type: "set_flag", flag: "envelope_opened" },
        {
          type: "show_message",
          message:
            "You tear it open. Inside: a small cipher wheel and a note — \"The fourth digit is the sum of the first three.\"",
        },
      ],
    },
    {
      id: "trg-envelope-empty",
      event: "interact",
      sourceId: "obj-envelope",
      conditions: [{ type: "flag_set", flag: "envelope_opened" }],
      actions: [
        { type: "show_message", message: "Empty envelope. You already took the contents." },
      ],
    },

    // 11. Collect cipher wheel
    {
      id: "trg-collect-cipher",
      event: "interact",
      sourceId: "obj-cipher-wheel",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-cipher-wheel" },
        { type: "show_message", message: "Took the cipher wheel." },
      ],
    },

    // 12. Use cipher wheel on safe → opens it (needs computer flag too)
    {
      id: "trg-safe-locked",
      event: "interact",
      sourceId: "obj-safe",
      conditions: [{ type: "flag_not_set", flag: "safe_open" }],
      actions: [
        {
          type: "show_message",
          message: "A heavy floor safe. It has a 4-digit combination lock with a cipher slot.",
        },
      ],
    },
    {
      id: "trg-safe-no-computer",
      event: "use_item_on",
      sourceId: "obj-safe",
      itemId: "obj-cipher-wheel",
      conditions: [
        { type: "has_item", itemId: "obj-cipher-wheel" },
        { type: "flag_not_set", flag: "computer_unlocked" },
      ],
      actions: [
        {
          type: "show_message",
          message: "The cipher wheel fits the slot, but you don't know the combination yet.",
        },
      ],
    },
    {
      id: "trg-safe-open",
      event: "use_item_on",
      sourceId: "obj-safe",
      itemId: "obj-cipher-wheel",
      conditions: [
        { type: "has_item", itemId: "obj-cipher-wheel" },
        { type: "flag_set", flag: "computer_unlocked" },
      ],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-cipher-wheel" },
        { type: "set_flag", flag: "safe_open" },
        { type: "reveal", targetId: "obj-master-key" },
        {
          type: "show_message",
          message:
            "1... 3... 4... sum is 8. You dial 1-3-4-8. Click. The safe opens, revealing a brass key.",
        },
      ],
    },
    {
      id: "trg-safe-opened",
      event: "interact",
      sourceId: "obj-safe",
      conditions: [{ type: "flag_set", flag: "safe_open" }],
      actions: [
        { type: "show_message", message: "The safe is open and empty." },
      ],
    },

    // 13. Collect master key
    {
      id: "trg-collect-key",
      event: "interact",
      sourceId: "obj-master-key",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-master-key" },
        { type: "show_message", message: "You take the heavy brass key. It feels important." },
      ],
    },

    // 14. Globe → hint about door panel
    {
      id: "trg-globe",
      event: "interact",
      sourceId: "obj-globe",
      conditions: [{ type: "flag_not_set", flag: "globe_spun" }],
      actions: [
        { type: "set_flag", flag: "globe_spun" },
        {
          type: "show_message",
          message:
            "You spin the globe. A slip of paper falls out: \"The door panel requires the key AND the correct sequence: M-I-N-E-R-V-A.\"",
        },
      ],
    },
    {
      id: "trg-globe-again",
      event: "interact",
      sourceId: "obj-globe",
      conditions: [{ type: "flag_set", flag: "globe_spun" }],
      actions: [
        { type: "show_message", message: "The globe is hollow. Nothing else inside." },
      ],
    },

    // ╔══════════════════════════════════════╗
    // ║  FINAL: Door Panel + Key = Escape   ║
    // ╚══════════════════════════════════════╝

    // 15. Door panel — use key on it
    {
      id: "trg-panel-no-key",
      event: "interact",
      sourceId: "obj-code-panel",
      conditions: [{ type: "flag_not_set", flag: "panel_activated" }],
      actions: [
        {
          type: "show_message",
          message: "An electronic panel next to the door. It has a keyhole and a letter display: _ _ _ _ _ _ _",
        },
      ],
    },
    {
      id: "trg-panel-use-key",
      event: "use_item_on",
      sourceId: "obj-code-panel",
      itemId: "obj-master-key",
      conditions: [{ type: "has_item", itemId: "obj-master-key" }],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-master-key" },
        { type: "set_flag", flag: "panel_activated" },
        {
          type: "show_message",
          message:
            "Key inserted. The panel lights up green, letters cycling: M-I-N-E-R-V-A. The lock disengages with a heavy thunk.",
        },
      ],
    },
    {
      id: "trg-panel-done",
      event: "interact",
      sourceId: "obj-code-panel",
      conditions: [{ type: "flag_set", flag: "panel_activated" }],
      actions: [
        { type: "show_message", message: "Panel shows: MINERVA — ACCESS GRANTED." },
      ],
    },

    // 16. Door — only opens after panel activated
    {
      id: "trg-door-locked",
      event: "interact",
      sourceId: "obj-door",
      conditions: [{ type: "flag_not_set", flag: "panel_activated" }],
      actions: [
        {
          type: "show_message",
          message: "A reinforced steel door. The electronic lock won't budge — the panel beside it needs activation.",
        },
      ],
    },
    {
      id: "trg-door-open",
      event: "interact",
      sourceId: "obj-door",
      conditions: [{ type: "flag_set", flag: "panel_activated" }],
      actions: [{ type: "win" }],
    },

    // ╔══════════════════════════════════════╗
    // ║  RED HERRINGS & ATMOSPHERE          ║
    // ╚══════════════════════════════════════╝

    {
      id: "trg-painting-1",
      event: "interact",
      sourceId: "obj-painting-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A portrait of a stern woman. The nameplate reads: \"Dean Crawford, 1987.\" Nothing helpful.",
        },
      ],
    },
    {
      id: "trg-painting-2",
      event: "interact",
      sourceId: "obj-painting-2",
      conditions: [],
      actions: [
        { type: "play_meme", memeId: "confused-math" },
      ],
    },
    {
      id: "trg-mirror",
      event: "interact",
      sourceId: "obj-mirror",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "You look haggard. Written in the dust on the frame: \"Things aren't always what they seem.\"",
        },
      ],
    },
    {
      id: "trg-bookshelf-philosophy",
      event: "interact",
      sourceId: "obj-bookshelf-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Nietzsche, Sartre, Camus... fascinating but useless for escaping. One spine is dog-eared: \"The Myth of Sisyphus.\"",
        },
      ],
    },
    {
      id: "trg-newspaper",
      event: "interact",
      sourceId: "obj-newspaper",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message:
            "Three-week-old headline: \"CRYPTOGRAPHY PROF VANISHES AFTER CLAIMING HE 'SOLVED EVERYTHING'.\" The word 'everything' is circled in red.",
        },
      ],
    },
    {
      id: "trg-piano",
      event: "interact",
      sourceId: "obj-piano",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "You press a few keys. They echo in the empty room. The piano is badly out of tune.",
        },
      ],
    },
    {
      id: "trg-sheet-music",
      event: "interact",
      sourceId: "obj-sheet-music",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Chopin's \"Ballade No. 1\" — heavily annotated. In the margin: \"Play this at my funeral (or my triumphant return).\"",
        },
      ],
    },
    {
      id: "trg-phone",
      event: "interact",
      sourceId: "obj-phone",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "You pick up the receiver. Dial tone. You try the last redial — a recorded message: \"The number you have dialed is no longer in service.\"",
        },
      ],
    },
    {
      id: "trg-desk-drawer",
      event: "interact",
      sourceId: "obj-drawer-desk",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Pencils, a calculator, three USB drives (all blank), and a sticky note: \"Don't forget to feed Minerva!\"",
        },
      ],
    },
    {
      id: "trg-filing",
      event: "interact",
      sourceId: "obj-filing",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Student papers from last semester. Lots of C-minuses. One paper is marked \"See me\" — the student's name is illegible.",
        },
      ],
    },
    {
      id: "trg-research-notes",
      event: "interact",
      sourceId: "obj-note-research",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Dense equations and diagrams. One page is circled: \"If the clock stops, read it backward.\" Underneath: \"431 → 134.\"",
        },
      ],
    },
    {
      id: "trg-map",
      event: "interact",
      sourceId: "obj-map",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A campus map. The professor's office, the library, and the old clock tower are connected by red thread. The clock tower is circled twice.",
        },
      ],
    },
    {
      id: "trg-box",
      event: "interact",
      sourceId: "obj-box-chemicals",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Lab supplies: solvent, pH strips, a broken beaker. Nothing that helps you escape.",
        },
      ],
    },
    {
      id: "trg-plant-1",
      event: "interact",
      sourceId: "obj-plant-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "This fern hasn't been watered in weeks. A layer of dust coats the leaves.",
        },
      ],
    },
    {
      id: "trg-plant-2",
      event: "interact",
      sourceId: "obj-plant-2",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A dead orchid. The pot has a sticky note: \"Water me (I dare you).\"",
        },
      ],
    },
    {
      id: "trg-wardrobe",
      event: "interact",
      sourceId: "obj-wardrobe",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Three identical tweed jackets. Elbow patches and all. The pockets contain only lint and a single cough drop.",
        },
      ],
    },
    {
      id: "trg-couch",
      event: "interact",
      sourceId: "obj-couch",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Cracked leather. You check between the cushions — a coin, a pen cap, and a very old raisin.",
        },
      ],
    },
    {
      id: "trg-light-switch",
      event: "interact",
      sourceId: "obj-light-switch",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Click. Click. Nothing happens. The power must be cut to this section.",
        },
      ],
    },
    {
      id: "trg-hidden-panel",
      event: "interact",
      sourceId: "obj-hidden-panel",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A maintenance access panel. The opening mechanism is exposed — just wires and dust now.",
        },
      ],
    },
  ],
  winCondition: { type: "trigger", triggerId: "trg-door-open" },
};
