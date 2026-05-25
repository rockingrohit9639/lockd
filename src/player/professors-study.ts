import type { Room } from "../shared/types";

export const PROFESSORS_STUDY: Room = {
  id: "professors-study",
  name: "The Spider's Web",
  description:
    "A graffiti-tagged rooftop hideout. Someone left clues scattered across comic panels and neon signs. Find the web-shooter to zip out.",
  map: {
    width: 2800,
    height: 2200,
    backgroundColor: "#1c1c2e",
    playerSpawn: { x: 1400, y: 1900 },
  },
  player: {
    speed: 190,
    size: { width: 28, height: 28 },
    interactionReach: 22,
  },
  collisionZones: [
    // Walls (rooftop edges)
    { id: "wall-top", bounds: { x: 0, y: 0, width: 2800, height: 40 } },
    { id: "wall-bottom", bounds: { x: 0, y: 2160, width: 2800, height: 40 } },
    { id: "wall-left", bounds: { x: 0, y: 0, width: 40, height: 2200 } },
    { id: "wall-right", bounds: { x: 2760, y: 0, width: 40, height: 2200 } },
    // AC units and rooftop structures
    { id: "ac-unit-1", bounds: { x: 200, y: 200, width: 160, height: 100 } },
    { id: "ac-unit-2", bounds: { x: 2400, y: 300, width: 140, height: 100 } },
    { id: "water-tank", bounds: { x: 1100, y: 100, width: 200, height: 200 } },
    { id: "skylight", bounds: { x: 600, y: 800, width: 180, height: 120 } },
    { id: "vent-block", bounds: { x: 1800, y: 700, width: 120, height: 80 } },
    // Furniture
    { id: "workbench-col", bounds: { x: 300, y: 500, width: 250, height: 80 } },
    { id: "couch-col", bounds: { x: 1800, y: 1500, width: 200, height: 90 } },
    { id: "crate-stack-1", bounds: { x: 2200, y: 900, width: 100, height: 100 } },
    { id: "crate-stack-2", bounds: { x: 100, y: 1400, width: 80, height: 80 } },
    { id: "dumpster", bounds: { x: 2400, y: 1800, width: 150, height: 100 } },
    { id: "generator", bounds: { x: 500, y: 1600, width: 120, height: 100 } },
    // Inner walls (partition - comic panel wall)
    { id: "panel-wall-1", bounds: { x: 1000, y: 500, width: 30, height: 400 } },
    { id: "panel-wall-2", bounds: { x: 1000, y: 1000, width: 30, height: 300 } },
  ],
  objects: [
    // ═══ ROOFTOP STRUCTURES ═══
    {
      id: "obj-ac-unit-1",
      type: "cabinet",
      name: "Busted AC Unit",
      position: { x: 180, y: 180 },
      size: { width: 200, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 200, y: 200, width: 160, height: 100 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-ac-unit-2",
      type: "cabinet",
      name: "Humming AC Unit",
      position: { x: 2380, y: 280 },
      size: { width: 180, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 2400, y: 300, width: 140, height: 100 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-water-tank",
      type: "cabinet",
      name: "Water Tower",
      position: { x: 1070, y: 70 },
      size: { width: 260, height: 250 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1100, y: 100, width: 200, height: 200 },
      interactionRadius: 70,
      properties: {},
    },
    {
      id: "obj-skylight",
      type: "mirror",
      name: "Cracked Skylight",
      position: { x: 580, y: 780 },
      size: { width: 220, height: 150 },
      zIndex: 0,
      hidden: false,
      collectible: false,
      collision: { x: 600, y: 800, width: 180, height: 120 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-vent",
      type: "box",
      name: "Exhaust Vent",
      position: { x: 1780, y: 680 },
      size: { width: 160, height: 110 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1800, y: 700, width: 120, height: 80 },
      interactionRadius: 55,
      properties: {},
    },

    // ═══ WORK AREA (left side) ═══
    {
      id: "obj-workbench",
      type: "desk",
      name: "Workbench",
      position: { x: 270, y: 480 },
      size: { width: 300, height: 110 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 300, y: 500, width: 250, height: 80 },
      interactionRadius: 65,
      properties: {},
    },
    {
      id: "obj-blueprint",
      type: "map",
      name: "Blueprint",
      position: { x: 340, y: 490 },
      size: { width: 60, height: 45 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-soldering-iron",
      type: "key",
      name: "Soldering Iron",
      position: { x: 450, y: 500 },
      size: { width: 30, height: 15 },
      zIndex: 2,
      hidden: false,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-monitor",
      type: "computer",
      name: "CRT Monitor",
      position: { x: 300, y: 380 },
      size: { width: 70, height: 50 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },

    // ═══ GRAFFITI WALL & COMIC PANELS ═══
    {
      id: "obj-graffiti-1",
      type: "painting",
      name: "Spider Tag",
      position: { x: 100, y: 50 },
      size: { width: 140, height: 100 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-comic-panel-1",
      type: "painting",
      name: "Comic Panel #1",
      position: { x: 1500, y: 50 },
      size: { width: 120, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-comic-panel-2",
      type: "painting",
      name: "Comic Panel #2",
      position: { x: 1700, y: 50 },
      size: { width: 120, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-comic-panel-3",
      type: "painting",
      name: "Comic Panel #3",
      position: { x: 1900, y: 50 },
      size: { width: 120, height: 90 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-neon-sign",
      type: "light-switch",
      name: "Neon Sign",
      position: { x: 2100, y: 60 },
      size: { width: 80, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },

    // ═══ LOUNGE AREA (right side) ═══
    {
      id: "obj-couch",
      type: "bed",
      name: "Torn Couch",
      position: { x: 1770, y: 1470 },
      size: { width: 260, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 1800, y: 1500, width: 200, height: 90 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-pizza-box",
      type: "box",
      name: "Pizza Box",
      position: { x: 1850, y: 1630 },
      size: { width: 50, height: 50 },
      zIndex: 0,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 45,
      properties: {},
    },
    {
      id: "obj-radio",
      type: "phone",
      name: "Police Scanner",
      position: { x: 2050, y: 1500 },
      size: { width: 35, height: 50 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-crate-stack",
      type: "cabinet",
      name: "Stacked Crates",
      position: { x: 2180, y: 880 },
      size: { width: 140, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 2200, y: 900, width: 100, height: 100 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-dumpster",
      type: "cabinet",
      name: "Dumpster",
      position: { x: 2380, y: 1780 },
      size: { width: 190, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 2400, y: 1800, width: 150, height: 100 },
      interactionRadius: 60,
      properties: {},
    },

    // ═══ GENERATOR & POWER ═══
    {
      id: "obj-generator",
      type: "safe",
      name: "Generator",
      position: { x: 480, y: 1580 },
      size: { width: 160, height: 130 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 500, y: 1600, width: 120, height: 100 },
      interactionRadius: 60,
      properties: {},
    },
    {
      id: "obj-fuse-box",
      type: "code-panel",
      name: "Fuse Box",
      position: { x: 200, y: 1000 },
      size: { width: 50, height: 60 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },

    // ═══ SCATTERED ITEMS ═══
    {
      id: "obj-backpack",
      type: "box",
      name: "Worn Backpack",
      position: { x: 1400, y: 600 },
      size: { width: 45, height: 50 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-sticky-notes",
      type: "note",
      name: "Sticky Notes",
      position: { x: 1050, y: 420 },
      size: { width: 35, height: 40 },
      zIndex: 2,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-newspaper",
      type: "newspaper",
      name: "Daily Bugle",
      position: { x: 1900, y: 1650 },
      size: { width: 45, height: 55 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-phone",
      type: "phone",
      name: "Burner Phone",
      position: { x: 700, y: 1200 },
      size: { width: 25, height: 45 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-camera",
      type: "photo",
      name: "Camera",
      position: { x: 2500, y: 600 },
      size: { width: 40, height: 40 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-web-fluid-empty",
      type: "envelope",
      name: "Empty Cartridge",
      position: { x: 350, y: 700 },
      size: { width: 40, height: 25 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-spray-cans",
      type: "plant",
      name: "Spray Cans",
      position: { x: 80, y: 800 },
      size: { width: 40, height: 55 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 45,
      properties: {},
    },
    {
      id: "obj-rug",
      type: "rug",
      name: "Tarp",
      position: { x: 250, y: 350 },
      size: { width: 350, height: 300 },
      zIndex: -1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 0,
      properties: {},
    },
    {
      id: "obj-rug-2",
      type: "rug",
      name: "Old Mat",
      position: { x: 1700, y: 1350 },
      size: { width: 400, height: 350 },
      zIndex: -1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 0,
      properties: {},
    },
    {
      id: "obj-crate-small",
      type: "box",
      name: "Small Crate",
      position: { x: 80, y: 1380 },
      size: { width: 100, height: 100 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 100, y: 1400, width: 80, height: 80 },
      interactionRadius: 50,
      properties: {},
    },

    // ═══ KEY PUZZLE ITEMS (hidden) ═══
    {
      id: "obj-fuse",
      type: "key",
      name: "Fuse",
      position: { x: 2220, y: 920 },
      size: { width: 25, height: 25 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-web-fluid",
      type: "keycard",
      name: "Web Fluid Cartridge",
      position: { x: 510, y: 1620 },
      size: { width: 40, height: 25 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-lens",
      type: "combination-lock",
      name: "HUD Lens",
      position: { x: 1420, y: 620 },
      size: { width: 30, height: 30 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
    {
      id: "obj-web-shooter",
      type: "key",
      name: "Web-Shooter",
      position: { x: 1130, y: 150 },
      size: { width: 40, height: 40 },
      zIndex: 2,
      hidden: true,
      collectible: true,
      collision: null,
      interactionRadius: 55,
      properties: {},
    },

    // ═══ EXIT ═══
    {
      id: "obj-zipline",
      type: "door",
      name: "Zipline Anchor",
      position: { x: 2600, y: 50 },
      size: { width: 90, height: 70 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: { x: 2610, y: 55, width: 70, height: 60 },
      interactionRadius: 65,
      properties: {},
    },
    {
      id: "obj-clock",
      type: "clock",
      name: "Rooftop Clock",
      position: { x: 1400, y: 50 },
      size: { width: 60, height: 60 },
      zIndex: 1,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    },
  ],
  triggers: [
    // ╔══════════════════════════════════════════╗
    // ║  PATH A: Power the rooftop (Fuse)       ║
    // ╚══════════════════════════════════════════╝

    // 1. Crate stack → find the fuse
    {
      id: "trg-crate-search",
      event: "interact",
      sourceId: "obj-crate-stack",
      conditions: [{ type: "flag_not_set", flag: "crates_searched" }],
      actions: [
        { type: "reveal", targetId: "obj-fuse" },
        { type: "set_flag", flag: "crates_searched" },
        {
          type: "show_message",
          message: "You dig through old tech junk. Under a tangle of wires — a fuse.",
        },
      ],
    },
    {
      id: "trg-crate-empty",
      event: "interact",
      sourceId: "obj-crate-stack",
      conditions: [{ type: "flag_set", flag: "crates_searched" }],
      actions: [
        { type: "show_message", message: "Just wires and broken circuit boards." },
      ],
    },

    // 2. Collect fuse
    {
      id: "trg-collect-fuse",
      event: "interact",
      sourceId: "obj-fuse",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-fuse" },
        { type: "show_message", message: "Grabbed the fuse. Looks like it fits a standard box." },
      ],
    },

    // 3. Use fuse on fuse box → powers the rooftop
    {
      id: "trg-fusebox-dead",
      event: "interact",
      sourceId: "obj-fuse-box",
      conditions: [{ type: "flag_not_set", flag: "power_on" }],
      actions: [
        { type: "show_message", message: "Fuse box. The slot is empty — everything's dead without power." },
      ],
    },
    {
      id: "trg-fusebox-insert",
      event: "use_item_on",
      sourceId: "obj-fuse-box",
      itemId: "obj-fuse",
      conditions: [{ type: "has_item", itemId: "obj-fuse" }],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-fuse" },
        { type: "set_flag", flag: "power_on" },
        {
          type: "show_message",
          message: "Fuse clicks in. The rooftop hums to life — neon flickers on, the CRT boots up.",
        },
      ],
    },
    {
      id: "trg-fusebox-done",
      event: "interact",
      sourceId: "obj-fuse-box",
      conditions: [{ type: "flag_set", flag: "power_on" }],
      actions: [
        { type: "show_message", message: "Power's running. The fuse box hums steadily." },
      ],
    },

    // ╔══════════════════════════════════════════╗
    // ║  PATH B: CRT Monitor → code reveal      ║
    // ╚══════════════════════════════════════════╝

    // 4. CRT needs power
    {
      id: "trg-monitor-off",
      event: "interact",
      sourceId: "obj-monitor",
      conditions: [{ type: "flag_not_set", flag: "power_on" }],
      actions: [
        { type: "show_message", message: "Dead screen. No power to the rooftop." },
      ],
    },

    // 5. CRT powered → shows encrypted message, needs lens
    {
      id: "trg-monitor-on",
      event: "interact",
      sourceId: "obj-monitor",
      conditions: [
        { type: "flag_set", flag: "power_on" },
        { type: "flag_not_set", flag: "monitor_decoded" },
      ],
      actions: [
        {
          type: "show_message",
          message: "CRT flickers on. Garbled text scrolls: \"W3B-SH00T3R L0C: [ENCRYPTED]. Insert HUD lens to decode.\"",
        },
      ],
    },

    // 6. Use lens on monitor → reveals web-shooter location
    {
      id: "trg-monitor-decode",
      event: "use_item_on",
      sourceId: "obj-monitor",
      itemId: "obj-lens",
      conditions: [
        { type: "has_item", itemId: "obj-lens" },
        { type: "flag_set", flag: "power_on" },
      ],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-lens" },
        { type: "set_flag", flag: "monitor_decoded" },
        {
          type: "show_message",
          message: "Lens snaps onto the screen. Decoded: \"Web-shooter hidden inside water tower. Combination: clock time × 3.\"",
        },
      ],
    },
    {
      id: "trg-monitor-decoded",
      event: "interact",
      sourceId: "obj-monitor",
      conditions: [{ type: "flag_set", flag: "monitor_decoded" }],
      actions: [
        {
          type: "show_message",
          message: "Screen reads: \"Web-shooter inside water tower. Combo: clock time × 3.\"",
        },
      ],
    },

    // ╔══════════════════════════════════════════╗
    // ║  PATH C: Find the HUD Lens              ║
    // ╚══════════════════════════════════════════╝

    // 7. Backpack → hints about lens, reveals it
    {
      id: "trg-backpack-search",
      event: "interact",
      sourceId: "obj-backpack",
      conditions: [{ type: "flag_not_set", flag: "backpack_searched" }],
      actions: [
        { type: "reveal", targetId: "obj-lens" },
        { type: "set_flag", flag: "backpack_searched" },
        {
          type: "show_message",
          message: "Unzipping the backpack — textbooks, a mask (?!), and... a HUD lens. Someone was prepared.",
        },
      ],
    },
    {
      id: "trg-backpack-empty",
      event: "interact",
      sourceId: "obj-backpack",
      conditions: [{ type: "flag_set", flag: "backpack_searched" }],
      actions: [
        { type: "show_message", message: "Empty backpack. Just crumbs and a pen cap." },
      ],
    },

    // 8. Collect lens
    {
      id: "trg-collect-lens",
      event: "interact",
      sourceId: "obj-lens",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-lens" },
        { type: "show_message", message: "Took the HUD lens. Looks like it clips onto a screen." },
      ],
    },

    // ╔══════════════════════════════════════════╗
    // ║  PATH D: Generator → Web Fluid          ║
    // ╚══════════════════════════════════════════╝

    // 9. Generator locked → needs soldering iron
    {
      id: "trg-generator-locked",
      event: "interact",
      sourceId: "obj-generator",
      conditions: [{ type: "flag_not_set", flag: "generator_open" }],
      actions: [
        {
          type: "show_message",
          message: "Heavy-duty generator. The access panel is welded shut — you'd need something hot to cut through.",
        },
      ],
    },

    // 10. Collect soldering iron
    {
      id: "trg-collect-solder",
      event: "interact",
      sourceId: "obj-soldering-iron",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-soldering-iron" },
        { type: "show_message", message: "Grabbed the soldering iron. Still warm." },
      ],
    },

    // 11. Use soldering iron on generator → web fluid
    {
      id: "trg-generator-open",
      event: "use_item_on",
      sourceId: "obj-generator",
      itemId: "obj-soldering-iron",
      conditions: [{ type: "has_item", itemId: "obj-soldering-iron" }],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-soldering-iron" },
        { type: "set_flag", flag: "generator_open" },
        { type: "reveal", targetId: "obj-web-fluid" },
        {
          type: "show_message",
          message: "You melt through the weld. Inside: a fresh web fluid cartridge. Someone stashed it here.",
        },
      ],
    },
    {
      id: "trg-generator-empty",
      event: "interact",
      sourceId: "obj-generator",
      conditions: [{ type: "flag_set", flag: "generator_open" }],
      actions: [
        { type: "show_message", message: "Generator's gutted. Just wiring now." },
      ],
    },

    // 12. Collect web fluid
    {
      id: "trg-collect-web-fluid",
      event: "interact",
      sourceId: "obj-web-fluid",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-web-fluid" },
        { type: "show_message", message: "Web fluid cartridge secured. This goes in a shooter." },
      ],
    },

    // ╔══════════════════════════════════════════╗
    // ║  FINAL: Water Tower → Web-Shooter       ║
    // ╚══════════════════════════════════════════╝

    // 13. Clock → gives the time (2:17)
    {
      id: "trg-clock",
      event: "interact",
      sourceId: "obj-clock",
      conditions: [],
      actions: [
        { type: "show_message", message: "Rooftop clock reads 2:17. Stuck. Probably hasn't run in months." },
      ],
    },

    // 14. Water tower → locked without code knowledge
    {
      id: "trg-tower-locked",
      event: "interact",
      sourceId: "obj-water-tank",
      conditions: [{ type: "flag_not_set", flag: "monitor_decoded" }],
      actions: [
        {
          type: "show_message",
          message: "The water tower has a combination hatch. Three digits. You have no idea what the code is.",
        },
      ],
    },

    // 15. Water tower → open with code (2:17 × 3 = 651)
    {
      id: "trg-tower-open",
      event: "interact",
      sourceId: "obj-water-tank",
      conditions: [
        { type: "flag_set", flag: "monitor_decoded" },
        { type: "flag_not_set", flag: "tower_open" },
      ],
      actions: [
        { type: "set_flag", flag: "tower_open" },
        { type: "reveal", targetId: "obj-web-shooter" },
        {
          type: "show_message",
          message: "Clock time is 217. Times 3... 6-5-1. The hatch pops open. Inside: the web-shooter.",
        },
      ],
    },
    {
      id: "trg-tower-empty",
      event: "interact",
      sourceId: "obj-water-tank",
      conditions: [{ type: "flag_set", flag: "tower_open" }],
      actions: [
        { type: "show_message", message: "Empty tower. Rust and old rainwater." },
      ],
    },

    // 16. Collect web-shooter
    {
      id: "trg-collect-shooter",
      event: "interact",
      sourceId: "obj-web-shooter",
      conditions: [],
      actions: [
        { type: "add_to_inventory", targetId: "obj-web-shooter" },
        {
          type: "show_message",
          message: "Web-shooter in hand. But it's empty — needs a fluid cartridge to fire.",
        },
      ],
    },

    // ╔══════════════════════════════════════════╗
    // ║  EXIT: Load shooter + zipline out       ║
    // ╚══════════════════════════════════════════╝

    // 17. Zipline without loaded shooter
    {
      id: "trg-zip-locked",
      event: "interact",
      sourceId: "obj-zipline",
      conditions: [{ type: "flag_not_set", flag: "shooter_loaded" }],
      actions: [
        {
          type: "show_message",
          message: "A zipline anchor point over the city edge. You need a web-shooter to swing across.",
        },
      ],
    },

    // 18. Use web fluid on web-shooter (in inventory) → loaded
    {
      id: "trg-load-shooter",
      event: "use_item_on",
      sourceId: "obj-zipline",
      itemId: "obj-web-fluid",
      conditions: [
        { type: "has_item", itemId: "obj-web-fluid" },
        { type: "has_item", itemId: "obj-web-shooter" },
      ],
      actions: [
        { type: "remove_from_inventory", targetId: "obj-web-fluid" },
        { type: "set_flag", flag: "shooter_loaded" },
        {
          type: "show_message",
          message: "You slot the cartridge into the web-shooter. Click. Pressurized. Ready to swing.",
        },
      ],
    },

    // 19. Zipline with loaded shooter → WIN
    {
      id: "trg-zip-escape",
      event: "interact",
      sourceId: "obj-zipline",
      conditions: [{ type: "flag_set", flag: "shooter_loaded" }],
      actions: [{ type: "win" }],
    },

    // ╔══════════════════════════════════════════╗
    // ║  RED HERRINGS & ATMOSPHERE              ║
    // ╚══════════════════════════════════════════╝

    {
      id: "trg-graffiti",
      event: "interact",
      sourceId: "obj-graffiti-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A massive spider tag in neon pink. Under it in small letters: \"With great power comes great electricity bills.\"",
        },
      ],
    },
    {
      id: "trg-panel-1",
      event: "interact",
      sourceId: "obj-comic-panel-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A hand-drawn panel: someone swinging between buildings at night. The style is incredible.",
        },
      ],
    },
    {
      id: "trg-panel-2",
      event: "interact",
      sourceId: "obj-comic-panel-2",
      conditions: [],
      actions: [
        { type: "play_meme", memeId: "surprised-pikachu" },
      ],
    },
    {
      id: "trg-panel-3",
      event: "interact",
      sourceId: "obj-comic-panel-3",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "The last panel shows a figure crouching on a rooftop. A speech bubble: \"The answer is always up.\"",
        },
      ],
    },
    {
      id: "trg-neon",
      event: "interact",
      sourceId: "obj-neon-sign",
      conditions: [{ type: "flag_not_set", flag: "power_on" }],
      actions: [
        { type: "show_message", message: "Dead neon tube. No power." },
      ],
    },
    {
      id: "trg-neon-on",
      event: "interact",
      sourceId: "obj-neon-sign",
      conditions: [{ type: "flag_set", flag: "power_on" }],
      actions: [
        {
          type: "show_message",
          message: "The neon buzzes to life: \"THWIP\" in hot pink light.",
        },
      ],
    },
    {
      id: "trg-skylight",
      event: "interact",
      sourceId: "obj-skylight",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Cracked skylight. You can see an empty apartment below. A cat stares up at you judgmentally.",
        },
      ],
    },
    {
      id: "trg-pizza",
      event: "interact",
      sourceId: "obj-pizza-box",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Cold pizza. One slice left. It's been here a while but honestly... still tempting.",
        },
      ],
    },
    {
      id: "trg-radio",
      event: "interact",
      sourceId: "obj-radio",
      conditions: [{ type: "flag_not_set", flag: "power_on" }],
      actions: [
        { type: "show_message", message: "Police scanner. Dead without power." },
      ],
    },
    {
      id: "trg-radio-on",
      event: "interact",
      sourceId: "obj-radio",
      conditions: [{ type: "flag_set", flag: "power_on" }],
      actions: [
        {
          type: "show_message",
          message: "Static crackle: \"...units respond to 5th and Main... suspect wearing red and blue...\" You should probably go.",
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
          message: "DAILY BUGLE: \"SPIDER MENACE STRIKES AGAIN — WHO IS HE?\" Classic Jameson.",
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
          message: "Burner phone. One text: \"Suit's on the roof. You know the drill. — MJ\"",
        },
      ],
    },
    {
      id: "trg-camera",
      event: "interact",
      sourceId: "obj-camera",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "A beat-up camera. The last photo is a blurry selfie mid-swing. You look cool honestly.",
        },
      ],
    },
    {
      id: "trg-blueprint",
      event: "interact",
      sourceId: "obj-blueprint",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Web-shooter blueprint. Annotated: \"v3.2 — improved pressure valve. Cartridge locks with a click.\"",
        },
      ],
    },
    {
      id: "trg-sticky-notes",
      event: "interact",
      sourceId: "obj-sticky-notes",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Sticky notes: \"TODO: fix left shooter trigger. Check water tower dead drop. Feed cat. Study for chem.\"",
        },
      ],
    },
    {
      id: "trg-empty-cartridge",
      event: "interact",
      sourceId: "obj-web-fluid-empty",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Spent web fluid cartridge. Empty and depressurized. Useless.",
        },
      ],
    },
    {
      id: "trg-spray-cans",
      event: "interact",
      sourceId: "obj-spray-cans",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Spray paint cans. Hot pink, electric blue, and black. The artist's palette.",
        },
      ],
    },
    {
      id: "trg-dumpster",
      event: "interact",
      sourceId: "obj-dumpster",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Nope. Not going dumpster diving. You have standards. Low ones, but standards.",
        },
      ],
    },
    {
      id: "trg-ac-1",
      event: "interact",
      sourceId: "obj-ac-unit-1",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Broken AC unit. Fan's jammed with a pigeon feather. NYC rooftops, baby.",
        },
      ],
    },
    {
      id: "trg-ac-2",
      event: "interact",
      sourceId: "obj-ac-unit-2",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "This one's still running. The vibration is... kind of nice? Focus.",
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
          message: "Torn couch. Someone naps here between patrols. There's a blanket and a physics textbook.",
        },
      ],
    },
    {
      id: "trg-vent",
      event: "interact",
      sourceId: "obj-vent",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Hot exhaust air blasts up. Smells like the restaurant below. Actually... that's pretty good.",
        },
      ],
    },
    {
      id: "trg-small-crate",
      event: "interact",
      sourceId: "obj-crate-small",
      conditions: [],
      actions: [
        {
          type: "show_message",
          message: "Old shipping crate stamped \"OSCORP.\" Empty. Suspicious but unhelpful.",
        },
      ],
    },
  ],
  winCondition: { type: "trigger", triggerId: "trg-zip-escape" },
};
