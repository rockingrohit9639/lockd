import { useEffect, useRef } from "react";
import { drawObjectSprite } from "../engine/object-sprites";
import type { ObjectType } from "./types";

interface SpriteIconProps {
  type: ObjectType;
  width: number;
  height: number;
}

export function SpriteIcon({ type, width, height }: SpriteIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, width, height);
    if (!drawObjectSprite(ctx, type, 0, 0, width, height)) {
      ctx.fillStyle = "#888";
      ctx.fillRect(2, 2, width - 4, height - 4);
    }
  }, [type, width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} />;
}
