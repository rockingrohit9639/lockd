import type { Vec2 } from "../shared/types";

export interface Camera {
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

export function createCamera(
  viewportWidth: number,
  viewportHeight: number,
): Camera {
  return { x: 0, y: 0, viewportWidth, viewportHeight };
}

export function updateCamera(
  camera: Camera,
  target: Vec2,
  worldWidth: number,
  worldHeight: number,
  dt: number,
): Camera {
  const targetX = target.x - camera.viewportWidth / 2;
  const targetY = target.y - camera.viewportHeight / 2;

  // Framerate-independent exponential smoothing
  const smoothing = 1 - 0.0001 ** dt;

  let x = camera.x + (targetX - camera.x) * smoothing;
  let y = camera.y + (targetY - camera.y) * smoothing;

  // Clamp to world bounds
  const maxX = Math.max(0, worldWidth - camera.viewportWidth);
  const maxY = Math.max(0, worldHeight - camera.viewportHeight);
  x = Math.max(0, Math.min(maxX, x));
  y = Math.max(0, Math.min(maxY, y));

  return { ...camera, x, y };
}
