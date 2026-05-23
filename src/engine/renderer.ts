import type {
  CollisionZone,
  MapConfig,
  PlayerState,
  RoomObject,
} from "../shared/types";
import type { AnimationState } from "./animation";
import { drawPlayer } from "./animation";
import type { Camera } from "./camera";
import { drawObjectSprite } from "./object-sprites";
import { getSprite } from "./sprite-cache";

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
  animation: AnimationState;
  debug: boolean;
}

export function render(rc: RenderContext): void {
  const { ctx, camera } = rc;

  ctx.clearRect(0, 0, camera.viewportWidth, camera.viewportHeight);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  drawBackground(rc);
  drawScene(rc);
  drawInteractionPrompt(rc);

  if (rc.debug) {
    drawDebugCollision(rc);
  }

  ctx.restore();
}

function drawBackground(rc: RenderContext): void {
  const { ctx, map, collisionZones } = rc;
  ctx.fillStyle = map.backgroundColor;
  ctx.fillRect(0, 0, map.width, map.height);

  // Grid for visual reference
  ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
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

  // Draw walls/collision zones as solid blocks
  ctx.fillStyle = "#9ca3af";
  for (const zone of collisionZones) {
    const { x, y, width, height } = zone.bounds;
    ctx.fillRect(x, y, width, height);
    // Inner shadow for depth
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(x, y + height - 4, width, 4);
    ctx.fillStyle = "#9ca3af";
  }
}

function drawScene(rc: RenderContext): void {
  const { objects, hiddenObjects, player, playerSize } = rc;

  const visible = objects.filter((o) => !hiddenObjects.has(o.id));

  // Player's "foot" Y for depth sorting
  const playerFootY = player.position.y + playerSize.height / 2;

  // Sort objects + player together by Y-bottom
  type Sortable =
    | { type: "object"; obj: (typeof visible)[0] }
    | { type: "player" };
  const items: Sortable[] = visible.map((obj) => ({ type: "object", obj }));
  items.push({ type: "player" });

  items.sort((a, b) => {
    const ay =
      a.type === "player" ? playerFootY : a.obj.position.y + a.obj.size.height;
    const by =
      b.type === "player" ? playerFootY : b.obj.position.y + b.obj.size.height;
    if (a.type === "object" && b.type === "object") {
      if (a.obj.zIndex !== b.obj.zIndex) return a.obj.zIndex - b.obj.zIndex;
    }
    return ay - by;
  });

  for (const item of items) {
    if (item.type === "player") {
      drawPlayerCharacter(rc);
    } else {
      drawObject(rc, item.obj);
    }
  }
}

function drawObject(rc: RenderContext, obj: RoomObject): void {
  const { ctx } = rc;
  const { x } = obj.position;
  const { y } = obj.position;
  const w = obj.size.width;
  const h = obj.size.height;

  // Try custom sprite URL first
  if (obj.spriteUrl) {
    const bitmap = getSprite(obj.spriteUrl);
    if (bitmap) {
      ctx.drawImage(bitmap, x, y, w, h);
      return;
    }
  }

  // Try procedural sprite
  if (!drawObjectSprite(ctx, obj.type, x, y, w, h)) {
    ctx.fillStyle = "#5a5a5a";
    ctx.fillRect(x, y, w, h);
  }

  // Shadow beneath object
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h, w * 0.4, 3, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayerCharacter(rc: RenderContext): void {
  const { ctx, player, playerSize, animation } = rc;

  const x = player.position.x - playerSize.width / 2;
  const y = player.position.y - playerSize.height / 2;

  drawPlayer(
    ctx,
    x,
    y,
    playerSize.width,
    playerSize.height,
    player.facing,
    player.isMoving,
    animation.frame,
  );
}

function drawInteractionPrompt(rc: RenderContext): void {
  const { ctx, nearbyObjectId, objects } = rc;
  if (!nearbyObjectId) return;

  const obj = objects.find((o) => o.id === nearbyObjectId);
  if (!obj) return;

  const cx = obj.position.x + obj.size.width / 2;
  const floatOffset = Math.sin(Date.now() * 0.004) * 3;
  const cy = obj.position.y - 16 + floatOffset;

  // Key indicator
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  const label = `E  ${obj.name}`;
  const metrics = ctx.measureText(label);
  const padX = 10;
  const padY = 5;
  const w = metrics.width + padX * 2;
  const h = 14 + padY * 2;
  const rx = cx - w / 2;
  const ry = cy - h / 2;

  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(rx, ry, w, h);

  // Key badge
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(rx, ry, 22, h);

  // Key letter
  ctx.fillStyle = "#fff";
  ctx.font = "bold 11px monospace";
  ctx.fillText("E", rx + 11, cy + 4);

  // Object name
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "10px monospace";
  ctx.textAlign = "left";
  ctx.fillText(obj.name, rx + 28, cy + 4);
  ctx.textAlign = "center";
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
