export type Direction = "north" | "east" | "south" | "west";

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

export type TriggerEvent =
  | "click"
  | "use_item_on"
  | "combine"
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

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface RoomObject {
  id: string;
  type: ObjectType;
  name: string;
  view: Direction;
  position: Position;
  size: Size;
  hidden: boolean;
  collectible: boolean;
  properties: Record<string, unknown>;
}

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

export interface WinCondition {
  type: "trigger";
  triggerId: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  objects: RoomObject[];
  triggers: Trigger[];
  winCondition: WinCondition;
  timeLimit?: number;
}

export interface GameState {
  currentView: Direction;
  inventory: string[];
  flags: Set<string>;
  revealedObjects: Set<string>;
  hiddenObjects: Set<string>;
  solved: boolean;
  failed: boolean;
  activeMessage: string | null;
  activeMeme: string | null;
}

export interface MemeDefinition {
  id: string;
  name: string;
  type: "image" | "video" | "gif";
  url: string;
  duration?: number;
}
