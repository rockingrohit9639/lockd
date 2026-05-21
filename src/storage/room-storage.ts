import type { Room } from "../shared/types";

const STORAGE_KEY = "lockd_rooms";

export interface RoomMeta {
  id: string;
  name: string;
  updatedAt: number;
}

function getRoomIndex(): RoomMeta[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function setRoomIndex(index: RoomMeta[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(index));
}

function roomKey(id: string) {
  return `lockd_room_${id}`;
}

export function listRooms(): RoomMeta[] {
  return getRoomIndex().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function saveRoom(room: Room): void {
  localStorage.setItem(roomKey(room.id), JSON.stringify(room));

  const index = getRoomIndex();
  const existing = index.findIndex((r) => r.id === room.id);
  const meta: RoomMeta = {
    id: room.id,
    name: room.name,
    updatedAt: Date.now(),
  };

  if (existing >= 0) {
    index[existing] = meta;
  } else {
    index.push(meta);
  }
  setRoomIndex(index);
}

export function loadRoom(id: string): Room | null {
  const raw = localStorage.getItem(roomKey(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function deleteRoom(id: string): void {
  localStorage.removeItem(roomKey(id));
  const index = getRoomIndex().filter((r) => r.id !== id);
  setRoomIndex(index);
}

export function exportRoom(room: Room): string {
  return JSON.stringify(room, null, 2);
}

export function importRoom(json: string): Room {
  const room = JSON.parse(json);
  if (!room.id || !room.objects || !room.triggers) {
    throw new Error("Invalid room file");
  }
  return room as Room;
}

export function downloadRoom(room: Room): void {
  const blob = new Blob([exportRoom(room)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${room.name.toLowerCase().replace(/\s+/g, "-")}.lockd.json`;
  a.click();
  URL.revokeObjectURL(url);
}
