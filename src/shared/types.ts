// ─── Legacy (remove in Phase 4 builder rewrite) ───

export type Direction = "north" | "east" | "south" | "west";

// ─── Geometry Primitives ───

export interface Vec2 {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface AABB {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ─── Map ───

export interface MapConfig {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundUrl?: string;
  playerSpawn: Vec2;
}

export interface CollisionZone {
  id: string;
  bounds: AABB;
}

// ─── Player ───

export type FacingDirection = "up" | "down" | "left" | "right";

export interface PlayerConfig {
  speed: number;
  size: Size;
  interactionReach: number;
  spriteSheetUrl?: string;
}

export interface PlayerState {
  position: Vec2;
  velocity: Vec2;
  facing: FacingDirection;
  isMoving: boolean;
}

// ─── Objects ───

export type ObjectType =
  | "desk"
  | "chair"
  | "bookshelf"
  | "cabinet"
  | "bed"
  | "table"
  | "drawer"
  | "safe"
  | "box"
  | "envelope"
  | "key"
  | "padlock"
  | "combination-lock"
  | "keycard"
  | "code-panel"
  | "note"
  | "photo"
  | "map"
  | "newspaper"
  | "phone"
  | "computer"
  | "painting"
  | "clock"
  | "mirror"
  | "plant"
  | "rug"
  | "door"
  | "light-switch"
  | "hidden-panel";

export interface RoomObject {
  id: string;
  type: ObjectType;
  name: string;
  position: Vec2;
  size: Size;
  zIndex: number;
  hidden: boolean;
  collectible: boolean;
  collision: AABB | null;
  interactionRadius: number;
  spriteUrl?: string;
  properties: Record<string, unknown>;
  /** @deprecated Legacy field for old builder — remove in Phase 4 */
  view?: Direction;
}

// ─── Triggers ───

export type TriggerEvent =
  | "interact"
  | "use_item_on"
  | "combine"
  | "enter_zone"
  | "timer_low"
  | "timer_expired";

export type ActionType =
  | "reveal"
  | "hide"
  | "unlock"
  | "lock"
  | "add_to_inventory"
  | "remove_from_inventory"
  | "play_meme"
  | "show_message"
  | "win"
  | "fail";

export interface Condition {
  type: "has_item" | "not_has_item" | "flag_set" | "flag_not_set";
  itemId?: string;
  flag?: string;
}

export interface Action {
  type: ActionType;
  targetId?: string;
  memeId?: string;
  message?: string;
  flag?: string;
}

export interface Trigger {
  id: string;
  event: TriggerEvent;
  sourceId: string;
  itemId?: string;
  conditions: Condition[];
  actions: Action[];
}

// ─── Room ───

export interface WinCondition {
  type: "trigger";
  triggerId: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  map: MapConfig;
  collisionZones: CollisionZone[];
  objects: RoomObject[];
  triggers: Trigger[];
  winCondition: WinCondition;
  timeLimit?: number;
  player: PlayerConfig;
}

// ─── Game State ───

export interface GameState {
  player: PlayerState;
  inventory: string[];
  flags: Set<string>;
  revealedObjects: Set<string>;
  hiddenObjects: Set<string>;
  solved: boolean;
  failed: boolean;
  activeMessage: string | null;
  activeMeme: string | null;
  nearbyObjectId: string | null;
}

// ─── Memes ───

export interface MemeDefinition {
  id: string;
  name: string;
  type: "image" | "video" | "gif";
  url: string;
  duration?: number;
}
