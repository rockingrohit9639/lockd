import { useEffect, useRef } from "react";
import type { Room } from "../shared/types";

interface MinimapProps {
  room: Room;
  selectedObjectId: string | null;
  viewport: { x: number; y: number; width: number; height: number; zoom: number };
  onNavigate: (worldX: number, worldY: number) => void;
}

const MINIMAP_WIDTH = 160;
const MINIMAP_HEIGHT = 120;

export function Minimap({
  room,
  selectedObjectId,
  viewport,
  onNavigate,
}: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const scale = Math.min(
      MINIMAP_WIDTH / room.map.width,
      MINIMAP_HEIGHT / room.map.height,
    );

    ctx.clearRect(0, 0, MINIMAP_WIDTH, MINIMAP_HEIGHT);

    // Background
    ctx.fillStyle = room.map.backgroundColor;
    ctx.fillRect(0, 0, room.map.width * scale, room.map.height * scale);

    // Collision zones
    ctx.fillStyle = "rgba(156, 163, 175, 0.6)";
    for (const zone of room.collisionZones) {
      ctx.fillRect(
        zone.bounds.x * scale,
        zone.bounds.y * scale,
        zone.bounds.width * scale,
        zone.bounds.height * scale,
      );
    }

    // Objects
    for (const obj of room.objects) {
      ctx.fillStyle =
        obj.id === selectedObjectId
          ? "#2563eb"
          : "rgba(90, 90, 90, 0.6)";
      ctx.fillRect(
        obj.position.x * scale,
        obj.position.y * scale,
        Math.max(2, obj.size.width * scale),
        Math.max(2, obj.size.height * scale),
      );
    }

    // Player spawn
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(
      room.map.playerSpawn.x * scale,
      room.map.playerSpawn.y * scale,
      3,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // Viewport rectangle
    const vx = (-viewport.x / viewport.zoom) * scale;
    const vy = (-viewport.y / viewport.zoom) * scale;
    const vw = (viewport.width / viewport.zoom) * scale;
    const vh = (viewport.height / viewport.zoom) * scale;

    ctx.strokeStyle = "rgba(37, 99, 235, 0.8)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(vx, vy, vw, vh);
  }, [room, selectedObjectId, viewport]);

  function handleClick(e: React.MouseEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(
      MINIMAP_WIDTH / room.map.width,
      MINIMAP_HEIGHT / room.map.height,
    );
    const worldX = (e.clientX - rect.left) / scale;
    const worldY = (e.clientY - rect.top) / scale;
    onNavigate(worldX, worldY);
  }

  return (
    <div className="absolute bottom-3 left-3 border border-border bg-background/90 backdrop-blur-sm shadow-lg">
      <canvas
        ref={canvasRef}
        width={MINIMAP_WIDTH}
        height={MINIMAP_HEIGHT}
        className="block cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
}
