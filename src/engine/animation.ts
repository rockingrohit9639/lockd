import type { FacingDirection } from "../shared/types";

export interface AnimationState {
  frame: number;
  elapsed: number;
}

const WALK_FRAME_DURATION = 0.1; // 10fps walk cycle
const WALK_FRAMES = 4;

export function createAnimationState(): AnimationState {
  return { frame: 0, elapsed: 0 };
}

export function updateAnimation(
  anim: AnimationState,
  isMoving: boolean,
  dt: number,
): AnimationState {
  if (!isMoving) {
    return { frame: 0, elapsed: 0 };
  }

  const elapsed = anim.elapsed + dt;
  if (elapsed >= WALK_FRAME_DURATION) {
    return {
      frame: (anim.frame + 1) % WALK_FRAMES,
      elapsed: elapsed - WALK_FRAME_DURATION,
    };
  }
  return { ...anim, elapsed };
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  facing: FacingDirection,
  isMoving: boolean,
  frame: number,
): void {
  const cx = x + width / 2;
  const bottom = y + height;

  // Walk bob + leg animation
  const bob = isMoving ? Math.sin(frame * Math.PI * 0.5) * 1.5 : 0;
  const legSwing = isMoving ? Math.sin(frame * Math.PI * 0.5) * 3 : 0;

  // Shadow (stays grounded)
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.beginPath();
  ctx.ellipse(cx, bottom - 1, width * 0.35, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  const legW = width * 0.18;
  const legH = height * 0.3;
  const legY = bottom - legH - 1;
  ctx.fillStyle = "#1e3a5f";

  // Left leg
  ctx.fillRect(cx - legW * 2 + legSwing * 0.5, legY, legW, legH);
  // Right leg
  ctx.fillRect(cx + legW - legSwing * 0.5, legY, legW, legH);

  // Body
  const bodyW = width * 0.7;
  const bodyH = height * 0.45;
  const bx = cx - bodyW / 2;
  const by = bottom - legH - bodyH - bob;

  ctx.fillStyle = "#2563eb";
  ctx.fillRect(bx, by, bodyW, bodyH);

  // Arms (side view for left/right, hidden for up/down)
  const armW = width * 0.14;
  const armH = height * 0.3;
  if (facing === "left" || facing === "right") {
    ctx.fillStyle = "#1d4ed8";
    const armSwing = isMoving ? Math.cos(frame * Math.PI * 0.5) * 2 : 0;
    if (facing === "right") {
      ctx.fillRect(bx + bodyW - 2, by + bodyH * 0.2 + armSwing, armW, armH);
    } else {
      ctx.fillRect(bx - armW + 2, by + bodyH * 0.2 + armSwing, armW, armH);
    }
  } else {
    ctx.fillStyle = "#1d4ed8";
    const armSwing = isMoving ? Math.cos(frame * Math.PI * 0.5) * 2 : 0;
    ctx.fillRect(bx - armW + 1, by + bodyH * 0.15 + armSwing, armW, armH);
    ctx.fillRect(bx + bodyW - 1, by + bodyH * 0.15 - armSwing, armW, armH);
  }

  // Head
  const headR = width * 0.26;
  const headY = by - headR + 2;
  ctx.fillStyle = "#f5d0a9";
  ctx.beginPath();
  ctx.arc(cx, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = "#4a3728";
  ctx.beginPath();
  ctx.arc(cx, headY - headR * 0.15, headR, Math.PI * 1.1, Math.PI * 1.9);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#1a1a1a";
  const eyeR = 1.8;
  const eyeOffsetX = headR * 0.35;

  if (facing === "down") {
    const eyeY = headY + headR * 0.15;
    ctx.beginPath();
    ctx.arc(cx - eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
  } else if (facing === "left" || facing === "right") {
    const eyeX = facing === "right" ? cx + eyeOffsetX * 0.8 : cx - eyeOffsetX * 0.8;
    const eyeY = headY + headR * 0.1;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
  }
  // "up" facing — no eyes visible (back of head)
}
