import type { ObjectType } from "../shared/types";

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) => void;

const sprites: Partial<Record<ObjectType, DrawFn>> = {
  safe: (ctx, x, y, w, h) => {
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
    // Handle
    ctx.fillStyle = "#888";
    ctx.fillRect(x + w * 0.6, y + h * 0.35, w * 0.08, h * 0.3);
    // Dial
    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.arc(x + w * 0.35, y + h * 0.5, Math.min(w, h) * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(x + w * 0.35, y + h * 0.5, Math.min(w, h) * 0.08, 0, Math.PI * 2);
    ctx.fill();
  },

  key: (ctx, x, y, w, h) => {
    const cx = x + w / 2;
    const cy = y + h / 2;
    // Ring
    ctx.strokeStyle = "#d4a017";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy - h * 0.15, Math.min(w, h) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
    // Shaft
    ctx.fillStyle = "#d4a017";
    ctx.fillRect(cx - 1.5, cy, 3, h * 0.35);
    // Teeth
    ctx.fillRect(cx, cy + h * 0.2, w * 0.15, 3);
    ctx.fillRect(cx, cy + h * 0.3, w * 0.1, 3);
  },

  door: (ctx, x, y, w, h) => {
    // Frame
    ctx.fillStyle = "#5c3a1e";
    ctx.fillRect(x, y, w, h);
    // Panel
    ctx.fillStyle = "#7a4f2e";
    ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
    // Top panel inset
    ctx.fillStyle = "#6b4226";
    ctx.fillRect(x + 8, y + 8, w - 16, h * 0.35);
    // Bottom panel inset
    ctx.fillRect(x + 8, y + h * 0.5, w - 16, h * 0.35);
    // Knob
    ctx.fillStyle = "#d4a017";
    ctx.beginPath();
    ctx.arc(x + w * 0.8, y + h * 0.55, 4, 0, Math.PI * 2);
    ctx.fill();
  },

  note: (ctx, x, y, w, h) => {
    // Paper
    ctx.fillStyle = "#fef9c3";
    ctx.fillRect(x, y, w, h);
    // Fold corner
    ctx.fillStyle = "#e5d9a0";
    ctx.beginPath();
    ctx.moveTo(x + w - 8, y);
    ctx.lineTo(x + w, y + 8);
    ctx.lineTo(x + w - 8, y + 8);
    ctx.closePath();
    ctx.fill();
    // Lines
    ctx.strokeStyle = "#bbb";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      const ly = y + h * (i / 4.5) + 4;
      ctx.beginPath();
      ctx.moveTo(x + 6, ly);
      ctx.lineTo(x + w - 6, ly);
      ctx.stroke();
    }
  },

  desk: (ctx, x, y, w, h) => {
    // Top surface
    ctx.fillStyle = "#8b6914";
    ctx.fillRect(x, y, w, h * 0.3);
    // Front
    ctx.fillStyle = "#704d0f";
    ctx.fillRect(x, y + h * 0.3, w, h * 0.7);
    // Drawer
    ctx.strokeStyle = "#5a3d0a";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + w * 0.1, y + h * 0.4, w * 0.35, h * 0.25);
    ctx.strokeRect(x + w * 0.55, y + h * 0.4, w * 0.35, h * 0.25);
    // Handles
    ctx.fillStyle = "#ccc";
    ctx.fillRect(x + w * 0.22, y + h * 0.5, w * 0.1, 3);
    ctx.fillRect(x + w * 0.67, y + h * 0.5, w * 0.1, 3);
  },

  chair: (ctx, x, y, w, h) => {
    // Seat (top-down view)
    ctx.fillStyle = "#6b4226";
    ctx.fillRect(x + w * 0.1, y + h * 0.3, w * 0.8, h * 0.5);
    // Back
    ctx.fillStyle = "#5c3a1e";
    ctx.fillRect(x + w * 0.15, y, w * 0.7, h * 0.35);
  },

  bookshelf: (ctx, x, y, w, h) => {
    // Frame
    ctx.fillStyle = "#5c3a1e";
    ctx.fillRect(x, y, w, h);
    // Shelves
    ctx.fillStyle = "#4a2f17";
    const shelfCount = 3;
    for (let i = 1; i <= shelfCount; i++) {
      ctx.fillRect(x + 2, y + (h / (shelfCount + 1)) * i - 2, w - 4, 4);
    }
    // Books
    const colors = ["#c0392b", "#2980b9", "#27ae60", "#8e44ad", "#f39c12"];
    for (let s = 0; s < shelfCount; s++) {
      const shelfY = y + (h / (shelfCount + 1)) * s + 4;
      const shelfH = h / (shelfCount + 1) - 8;
      let bx = x + 4;
      for (let i = 0; i < 4; i++) {
        const bw = 4 + Math.random() * 4;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(bx, shelfY, bw, shelfH);
        bx += bw + 1;
        if (bx > x + w - 6) break;
      }
    }
  },

  cabinet: (ctx, x, y, w, h) => {
    ctx.fillStyle = "#5c3a1e";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#4a2f17";
    ctx.fillRect(x + 3, y + 3, w - 6, h / 2 - 4);
    ctx.fillRect(x + 3, y + h / 2 + 1, w - 6, h / 2 - 4);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(x + w / 2 - 4, y + h * 0.22, 8, 3);
    ctx.fillRect(x + w / 2 - 4, y + h * 0.72, 8, 3);
  },

  box: (ctx, x, y, w, h) => {
    ctx.fillStyle = "#a0826b";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#7a5f4b";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    // Tape
    ctx.fillStyle = "#c9b896";
    ctx.fillRect(x + w * 0.3, y, w * 0.4, h);
  },

  painting: (ctx, x, y, w, h) => {
    // Frame
    ctx.fillStyle = "#8b6914";
    ctx.fillRect(x, y, w, h);
    // Canvas
    ctx.fillStyle = "#f5f0e0";
    ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
    // Abstract art
    ctx.fillStyle = "#3498db";
    ctx.beginPath();
    ctx.arc(x + w * 0.4, y + h * 0.45, Math.min(w, h) * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(x + w * 0.5, y + h * 0.3, w * 0.25, h * 0.35);
  },

  plant: (ctx, x, y, w, h) => {
    // Pot
    ctx.fillStyle = "#a0522d";
    ctx.fillRect(x + w * 0.25, y + h * 0.6, w * 0.5, h * 0.4);
    // Leaves
    ctx.fillStyle = "#27ae60";
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.4, w * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.35, y + h * 0.3, w * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.65, y + h * 0.3, w * 0.2, 0, Math.PI * 2);
    ctx.fill();
  },

  clock: (ctx, x, y, w, h) => {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = Math.min(w, h) * 0.4;
    // Face
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Hands
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - r * 0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * 0.5, cy);
    ctx.stroke();
  },

  "light-switch": (ctx, x, y, w, h) => {
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(x + w * 0.3, y + h * 0.3, w * 0.4, h * 0.4);
  },

  computer: (ctx, x, y, w, h) => {
    // Monitor
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(x, y, w, h * 0.7);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(x + 3, y + 3, w - 6, h * 0.7 - 6);
    // Stand
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(x + w * 0.4, y + h * 0.7, w * 0.2, h * 0.15);
    ctx.fillRect(x + w * 0.25, y + h * 0.85, w * 0.5, h * 0.1);
  },

  phone: (ctx, x, y, w, h) => {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#333";
    ctx.fillRect(x + 2, y + h * 0.1, w - 4, h * 0.75);
  },

  rug: (ctx, x, y, w, h) => {
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#d4a017";
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 6, y + 6, w - 12, h - 12);
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 12, y + 12, w - 24, h - 24);
  },
};

export function drawObjectSprite(
  ctx: CanvasRenderingContext2D,
  type: ObjectType,
  x: number,
  y: number,
  w: number,
  h: number,
): boolean {
  const draw = sprites[type];
  if (!draw) return false;
  draw(ctx, x, y, w, h);
  return true;
}
