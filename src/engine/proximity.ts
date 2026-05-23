import type { RoomObject, Vec2 } from "../shared/types";

export function findNearestInteractable(
  playerPos: Vec2,
  playerReach: number,
  objects: RoomObject[],
  hiddenObjects: Set<string>,
): string | null {
  let closestId: string | null = null;
  let closestDist = Infinity;

  for (const obj of objects) {
    if (obj.interactionRadius <= 0) continue;
    if (hiddenObjects.has(obj.id)) continue;

    const objCenter: Vec2 = {
      x: obj.position.x + obj.size.width / 2,
      y: obj.position.y + obj.size.height / 2,
    };

    const dx = playerPos.x - objCenter.x;
    const dy = playerPos.y - objCenter.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const threshold = obj.interactionRadius + playerReach;
    if (dist < threshold && dist < closestDist) {
      closestDist = dist;
      closestId = obj.id;
    }
  }

  return closestId;
}
