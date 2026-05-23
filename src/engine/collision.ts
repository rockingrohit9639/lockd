import type { AABB, Vec2 } from "../shared/types";

export function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function makePlayerAABB(
  position: Vec2,
  width: number,
  height: number,
): AABB {
  return {
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  };
}

export function resolveMovement(
  currentPos: Vec2,
  desiredPos: Vec2,
  playerWidth: number,
  playerHeight: number,
  colliders: AABB[],
): Vec2 {
  // Try full movement
  const fullAABB = makePlayerAABB(desiredPos, playerWidth, playerHeight);
  let blocked = false;
  for (const c of colliders) {
    if (aabbOverlap(fullAABB, c)) {
      blocked = true;
      break;
    }
  }
  if (!blocked) return desiredPos;

  // Try X only
  const xOnly: Vec2 = { x: desiredPos.x, y: currentPos.y };
  const xAABB = makePlayerAABB(xOnly, playerWidth, playerHeight);
  let xBlocked = false;
  for (const c of colliders) {
    if (aabbOverlap(xAABB, c)) {
      xBlocked = true;
      break;
    }
  }

  // Try Y only
  const yOnly: Vec2 = { x: currentPos.x, y: desiredPos.y };
  const yAABB = makePlayerAABB(yOnly, playerWidth, playerHeight);
  let yBlocked = false;
  for (const c of colliders) {
    if (aabbOverlap(yAABB, c)) {
      yBlocked = true;
      break;
    }
  }

  if (!xBlocked && !yBlocked) return xOnly; // prefer X slide
  if (!xBlocked) return xOnly;
  if (!yBlocked) return yOnly;

  return currentPos;
}

export function clampToWorld(
  position: Vec2,
  playerWidth: number,
  playerHeight: number,
  worldWidth: number,
  worldHeight: number,
): Vec2 {
  const halfW = playerWidth / 2;
  const halfH = playerHeight / 2;
  return {
    x: Math.max(halfW, Math.min(worldWidth - halfW, position.x)),
    y: Math.max(halfH, Math.min(worldHeight - halfH, position.y)),
  };
}
