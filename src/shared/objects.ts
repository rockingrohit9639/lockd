import type { ObjectType } from "./types";

export interface ObjectDefinition {
  type: ObjectType;
  name: string;
  category:
    | "furniture"
    | "container"
    | "key-lock"
    | "clue"
    | "decoration"
    | "special";
  defaultSize: { width: number; height: number };
  color: string;
}

export const OBJECT_CATALOG: ObjectDefinition[] = [
  {
    type: "desk",
    name: "Desk",
    category: "furniture",
    defaultSize: { width: 120, height: 60 },
    color: "#8B4513",
  },
  {
    type: "chair",
    name: "Chair",
    category: "furniture",
    defaultSize: { width: 50, height: 50 },
    color: "#A0522D",
  },
  {
    type: "bookshelf",
    name: "Bookshelf",
    category: "furniture",
    defaultSize: { width: 100, height: 150 },
    color: "#654321",
  },
  {
    type: "cabinet",
    name: "Cabinet",
    category: "furniture",
    defaultSize: { width: 80, height: 120 },
    color: "#6B4226",
  },
  {
    type: "bed",
    name: "Bed",
    category: "furniture",
    defaultSize: { width: 140, height: 80 },
    color: "#4169E1",
  },
  {
    type: "table",
    name: "Table",
    category: "furniture",
    defaultSize: { width: 100, height: 60 },
    color: "#D2691E",
  },

  {
    type: "drawer",
    name: "Drawer",
    category: "container",
    defaultSize: { width: 60, height: 40 },
    color: "#8B6914",
  },
  {
    type: "safe",
    name: "Safe",
    category: "container",
    defaultSize: { width: 50, height: 50 },
    color: "#2F4F4F",
  },
  {
    type: "box",
    name: "Box",
    category: "container",
    defaultSize: { width: 40, height: 40 },
    color: "#CD853F",
  },
  {
    type: "envelope",
    name: "Envelope",
    category: "container",
    defaultSize: { width: 40, height: 25 },
    color: "#F5DEB3",
  },

  {
    type: "key",
    name: "Key",
    category: "key-lock",
    defaultSize: { width: 30, height: 15 },
    color: "#FFD700",
  },
  {
    type: "padlock",
    name: "Padlock",
    category: "key-lock",
    defaultSize: { width: 30, height: 35 },
    color: "#808080",
  },
  {
    type: "combination-lock",
    name: "Combination Lock",
    category: "key-lock",
    defaultSize: { width: 35, height: 40 },
    color: "#696969",
  },
  {
    type: "keycard",
    name: "Keycard",
    category: "key-lock",
    defaultSize: { width: 40, height: 25 },
    color: "#00CED1",
  },
  {
    type: "code-panel",
    name: "Code Panel",
    category: "key-lock",
    defaultSize: { width: 50, height: 60 },
    color: "#333333",
  },

  {
    type: "note",
    name: "Note",
    category: "clue",
    defaultSize: { width: 35, height: 40 },
    color: "#FFFACD",
  },
  {
    type: "photo",
    name: "Photo",
    category: "clue",
    defaultSize: { width: 40, height: 40 },
    color: "#FFFFFF",
  },
  {
    type: "map",
    name: "Map",
    category: "clue",
    defaultSize: { width: 60, height: 45 },
    color: "#F5F5DC",
  },
  {
    type: "newspaper",
    name: "Newspaper",
    category: "clue",
    defaultSize: { width: 45, height: 55 },
    color: "#DCDCDC",
  },
  {
    type: "phone",
    name: "Phone",
    category: "clue",
    defaultSize: { width: 30, height: 55 },
    color: "#1C1C1C",
  },
  {
    type: "computer",
    name: "Computer",
    category: "clue",
    defaultSize: { width: 70, height: 50 },
    color: "#4682B4",
  },

  {
    type: "painting",
    name: "Painting",
    category: "decoration",
    defaultSize: { width: 80, height: 60 },
    color: "#8B0000",
  },
  {
    type: "clock",
    name: "Clock",
    category: "decoration",
    defaultSize: { width: 40, height: 40 },
    color: "#DAA520",
  },
  {
    type: "mirror",
    name: "Mirror",
    category: "decoration",
    defaultSize: { width: 50, height: 70 },
    color: "#E0FFFF",
  },
  {
    type: "plant",
    name: "Plant",
    category: "decoration",
    defaultSize: { width: 40, height: 60 },
    color: "#228B22",
  },
  {
    type: "rug",
    name: "Rug",
    category: "decoration",
    defaultSize: { width: 120, height: 80 },
    color: "#800020",
  },

  {
    type: "door",
    name: "Door",
    category: "special",
    defaultSize: { width: 70, height: 140 },
    color: "#5C4033",
  },
  {
    type: "light-switch",
    name: "Light Switch",
    category: "special",
    defaultSize: { width: 20, height: 30 },
    color: "#F0F0F0",
  },
  {
    type: "hidden-panel",
    name: "Hidden Panel",
    category: "special",
    defaultSize: { width: 60, height: 60 },
    color: "#A9A9A9",
  },
];

export function getObjectDef(type: ObjectType): ObjectDefinition | undefined {
  return OBJECT_CATALOG.find((o) => o.type === type);
}
