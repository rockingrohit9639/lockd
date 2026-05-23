import type { FacingDirection } from "../shared/types";

export interface AnimationState {
  frame: number;
  elapsed: number;
}

const WALK_FRAME_DURATION = 0.125; // 8fps walk cycle
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

  // Walk bob offset
  const bob = isMoving ? Math.sin(frame * Math.PI * 0.5) * 1.5 : 0;

  // Body (slightly smaller than collision box)
  const bodyW = width * 0.85;
  const bodyH = height * 0.85;
  const bx = cx - bodyW / 2;
  const by = y + height / 2 - bodyH / 2 - bob;

  // Shadow (stays grounded)
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.beginPath();
  ctx.ellipse(cx, y + height - 2, bodyW / 2, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(bx, by, bodyW, bodyH);

  // Head
  const headR = width * 0.28;
  const headY = by + headR + 2;
  ctx.fillStyle = "#f5d0a9";
  ctx.beginPath();
  ctx.arc(cx, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  // Eyes based on facing
  ctx.fillStyle = "#1a1a1a";
  const eyeR = 2;
  const eyeOffsetX = headR * 0.35;
  const eyeOffsetY = headR * 0.1;

  if (facing === "down") {
    const eyeY = headY + eyeOffsetY;
    ctx.beginPath();
    ctx.arc(cx - eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + eyeOffsetX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();
  } else if (facing === "left" || facing === "right") {
    const eyeX = facing === "right" ? cx + eyeOffsetX : cx - eyeOffsetX;
    ctx.beginPath();
    ctx.arc(eyeX, headY, eyeR, 0, Math.PI * 2);
    ctx.fill();
  }
}
