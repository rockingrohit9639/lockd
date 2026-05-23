import type {
  AABB,
  CollisionZone,
  FacingDirection,
  MapConfig,
  PlayerState,
  RoomObject,
  Vec2,
} from "../shared/types";
import type { Camera } from "./camera";

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  camera: Camera;
  map: MapConfig;
  objects: RoomObject[];
  collisionZones: CollisionZone[];
  player: PlayerState;
  playerSize: { width: number; height: number };
  nearbyObjectId: string | null;
  hiddenObjects: Set<string>;
  debug: boolean;
}

export function render(rc: RenderContext): void {
  const { ctx, camera } = rc;

  ctx.clearRect(0, 0, camera.viewportWidth, camera.viewportHeight);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  drawBackground(rc);
  drawObjects(rc);
  drawPlayer(rc);
  drawInteractionPrompt(rc);

  if (rc.debug) {
    drawDebugCollision(rc);
  }

  ctx.restore();
}

function drawBackground(rc: RenderContext): void {
  const { ctx, map } = rc;
  ctx.fillStyle = map.backgroundColor;
  ctx.fillRect(0, 0, map.width, map.height);

  // Grid for visual reference
  ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
  ctx.lineWidth = 1;
  const gridSize = 64;
  for (let x = 0; x <= map.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, map.height);
    ctx.stroke();
  }
  for (let y = 0; y <= map.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(map.width, y);
    ctx.stroke();
  }
}

function drawObjects(rc: RenderContext): void {
  const { ctx, objects, hiddenObjects } = rc;

  const visible = objects
    .filter((o) => !hiddenObjects.has(o.id))
    .sort((a, b) => {
      if (a.zIndex !== b.zIndex) return a.zIndex - b.zIndex;
      return a.position.y + a.size.height - (b.position.y + b.size.height);
    });

  for (const obj of visible) {
    ctx.fillStyle = "#5a5a5a";
    ctx.fillRect(
      obj.position.x,
      obj.position.y,
      obj.size.width,
      obj.size.height,
    );

    // Object label
    ctx.fillStyle = "#333";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      obj.name,
      obj.position.x + obj.size.width / 2,
      obj.position.y - 4,
    );
  }
}

function drawPlayer(rc: RenderContext): void {
  const { ctx, player, playerSize } = rc;

  const x = player.position.x - playerSize.width / 2;
  const y = player.position.y - playerSize.height / 2;

  // Body
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(x, y, playerSize.width, playerSize.height);

  // Direction indicator
  ctx.fillStyle = "#fff";
  const indicatorSize = 6;
  const center: Vec2 = { x: player.position.x, y: player.position.y };
  let ix = center.x - indicatorSize / 2;
  let iy = center.y - indicatorSize / 2;

  switch (player.facing) {
    case "up":
      iy = y;
      break;
    case "down":
      iy = y + playerSize.height - indicatorSize;
      break;
    case "left":
      ix = x;
      break;
    case "right":
      ix = x + playerSize.width - indicatorSize;
      break;
  }

  ctx.fillRect(ix, iy, indicatorSize, indicatorSize);
}

function drawInteractionPrompt(rc: RenderContext): void {
  const { ctx, nearbyObjectId, objects } = rc;
  if (!nearbyObjectId) return;

  const obj = objects.find((o) => o.id === nearbyObjectId);
  if (!obj) return;

  const cx = obj.position.x + obj.size.width / 2;
  const cy = obj.position.y - 20;

  // Background pill
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  const text = "[E]";
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  const metrics = ctx.measureText(text);
  const padX = 8;
  const padY = 4;
  ctx.fillRect(
    cx - metrics.width / 2 - padX,
    cy - 10 - padY,
    metrics.width + padX * 2,
    14 + padY * 2,
  );

  // Text
  ctx.fillStyle = "#fff";
  ctx.fillText(text, cx, cy);
}

function drawDebugCollision(rc: RenderContext): void {
  const { ctx, collisionZones, objects, player, playerSize } = rc;

  // Draw collision zones
  ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
  ctx.lineWidth = 2;
  for (const zone of collisionZones) {
    ctx.strokeRect(
      zone.bounds.x,
      zone.bounds.y,
      zone.bounds.width,
      zone.bounds.height,
    );
  }

  // Draw object collision boxes
  ctx.strokeStyle = "rgba(255, 165, 0, 0.5)";
  for (const obj of objects) {
    if (obj.collision) {
      ctx.strokeRect(
        obj.collision.x,
        obj.collision.y,
        obj.collision.width,
        obj.collision.height,
      );
    }
  }

  // Draw player collision box
  ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
  ctx.strokeRect(
    player.position.x - playerSize.width / 2,
    player.position.y - playerSize.height / 2,
    playerSize.width,
    playerSize.height,
  );

  // Draw interaction radii
  ctx.strokeStyle = "rgba(0, 150, 255, 0.3)";
  ctx.setLineDash([4, 4]);
  for (const obj of objects) {
    if (obj.interactionRadius > 0) {
      ctx.beginPath();
      ctx.arc(
        obj.position.x + obj.size.width / 2,
        obj.position.y + obj.size.height / 2,
        obj.interactionRadius,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }
  }
  ctx.setLineDash([]);
}
