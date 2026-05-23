import { useCallback, useEffect, useRef, useState } from "react";
import { drawObjectSprite } from "../engine/object-sprites";
import type {
  AABB,
  CollisionZone,
  Room,
  RoomObject,
  Vec2,
} from "../shared/types";

interface BuilderCanvasProps {
  room: Room;
  selectedObjectId: string | null;
  tool: BuilderTool;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (id: string, updates: Partial<RoomObject>) => void;
  onAddCollisionZone: (zone: CollisionZone) => void;
  onUpdateSpawn: (pos: Vec2) => void;
}

export type BuilderTool = "select" | "collision" | "spawn";

interface ViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
}

export function BuilderCanvas({
  room,
  selectedObjectId,
  tool,
  onSelectObject,
  onUpdateObject,
  onAddCollisionZone,
  onUpdateSpawn,
}: BuilderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ViewState>({
    offsetX: 0,
    offsetY: 0,
    zoom: 0.5,
  });
  const [dragging, setDragging] = useState<{
    type: "pan" | "move" | "resize" | "draw-collision";
    startX: number;
    startY: number;
    startObjPos?: Vec2;
    startObjSize?: { width: number; height: number };
    objectId?: string;
    drawStart?: Vec2;
  } | null>(null);
  const [drawRect, setDrawRect] = useState<AABB | null>(null);

  const viewRef = useRef(view);
  viewRef.current = view;
  const roomRef = useRef(room);
  roomRef.current = room;
  const selectedRef = useRef(selectedObjectId);
  selectedRef.current = selectedObjectId;
  const drawRectRef = useRef(drawRect);
  drawRectRef.current = drawRect;

  // Convert screen coords to world coords
  const screenToWorld = useCallback(
    (screenX: number, screenY: number): Vec2 => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const x = (screenX - rect.left - view.offsetX) / view.zoom;
      const y = (screenY - rect.top - view.offsetY) / view.zoom;
      return { x, y };
    },
    [view],
  );

  // Render loop — uses refs to avoid teardown on state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d")!;
    let animId: number;

    function draw() {
      const v = viewRef.current;
      const currentRoom = roomRef.current;
      const currentSelected = selectedRef.current;
      const currentDrawRect = drawRectRef.current;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      ctx.save();
      ctx.translate(v.offsetX, v.offsetY);
      ctx.scale(v.zoom, v.zoom);

      // Background
      ctx.fillStyle = currentRoom.map.backgroundColor;
      ctx.fillRect(0, 0, currentRoom.map.width, currentRoom.map.height);

      // Grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      ctx.lineWidth = 1 / v.zoom;
      const gridSize = 64;
      for (let x = 0; x <= currentRoom.map.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, currentRoom.map.height);
        ctx.stroke();
      }
      for (let y = 0; y <= currentRoom.map.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(currentRoom.map.width, y);
        ctx.stroke();
      }

      // Collision zones
      ctx.fillStyle = "rgba(156, 163, 175, 0.5)";
      ctx.strokeStyle = "rgba(107, 114, 128, 0.8)";
      ctx.lineWidth = 2 / v.zoom;
      for (const zone of currentRoom.collisionZones) {
        ctx.fillRect(
          zone.bounds.x,
          zone.bounds.y,
          zone.bounds.width,
          zone.bounds.height,
        );
        ctx.strokeRect(
          zone.bounds.x,
          zone.bounds.y,
          zone.bounds.width,
          zone.bounds.height,
        );
      }

      // Objects
      const sorted = [...currentRoom.objects].sort((a, b) => {
        if (a.zIndex !== b.zIndex) return a.zIndex - b.zIndex;
        return a.position.y + a.size.height - (b.position.y + b.size.height);
      });

      for (const obj of sorted) {
        const { x, y } = obj.position;
        const w = obj.size.width;
        const h = obj.size.height;

        ctx.globalAlpha = obj.hidden ? 0.4 : 1;

        if (!drawObjectSprite(ctx, obj.type, x, y, w, h)) {
          ctx.fillStyle = "#5a5a5a";
          ctx.fillRect(x, y, w, h);
        }

        // Selection highlight
        if (obj.id === currentSelected) {
          ctx.strokeStyle = "#2563eb";
          ctx.lineWidth = 2 / v.zoom;
          ctx.setLineDash([4 / v.zoom, 4 / v.zoom]);
          ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
          ctx.setLineDash([]);

          // Resize handle
          ctx.fillStyle = "#2563eb";
          const handleSize = 8 / v.zoom;
          ctx.fillRect(
            x + w - handleSize / 2,
            y + h - handleSize / 2,
            handleSize,
            handleSize,
          );
        }

        // Interaction radius (subtle)
        if (obj.id === currentSelected && obj.interactionRadius > 0) {
          ctx.strokeStyle = "rgba(37, 99, 235, 0.2)";
          ctx.lineWidth = 1 / v.zoom;
          ctx.setLineDash([4 / v.zoom, 4 / v.zoom]);
          ctx.beginPath();
          ctx.arc(x + w / 2, y + h / 2, obj.interactionRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.globalAlpha = 1;

        // Label
        ctx.fillStyle = "#333";
        ctx.font = `${11 / v.zoom}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(obj.name, x + w / 2, y - 6 / v.zoom);
      }

      // Player spawn marker
      const spawn = currentRoom.map.playerSpawn;
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(spawn.x, spawn.y, 10 / v.zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#166534";
      ctx.lineWidth = 2 / v.zoom;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${8 / v.zoom}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("P", spawn.x, spawn.y);
      ctx.textBaseline = "alphabetic";

      // Draw-in-progress collision rect
      if (currentDrawRect) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
        ctx.lineWidth = 2 / v.zoom;
        ctx.fillRect(
          currentDrawRect.x,
          currentDrawRect.y,
          currentDrawRect.width,
          currentDrawRect.height,
        );
        ctx.strokeRect(
          currentDrawRect.x,
          currentDrawRect.y,
          currentDrawRect.width,
          currentDrawRect.height,
        );
      }

      // World boundary
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 2 / v.zoom;
      ctx.strokeRect(0, 0, currentRoom.map.width, currentRoom.map.height);

      ctx.restore();

      animId = requestAnimationFrame(draw);
    }

    draw();

    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
      }
    });
    resizeObs.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
    };
  }, []);

  // Center view on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const zoom =
      Math.min(rect.width / room.map.width, rect.height / room.map.height) *
      0.85;
    setView({
      zoom,
      offsetX: (rect.width - room.map.width * zoom) / 2,
      offsetY: (rect.height - room.map.height * zoom) / 2,
    });
  }, [room.map.width, room.map.height]);

  // Mouse wheel zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setView((v) => {
        const newZoom = Math.max(0.1, Math.min(3, v.zoom * zoomFactor));
        const scale = newZoom / v.zoom;
        return {
          zoom: newZoom,
          offsetX: mouseX - (mouseX - v.offsetX) * scale,
          offsetY: mouseY - (mouseY - v.offsetY) * scale,
        };
      });
    }

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);

  function findObjectAt(worldPos: Vec2): RoomObject | null {
    // Search in reverse (top objects first)
    for (let i = room.objects.length - 1; i >= 0; i--) {
      const obj = room.objects[i];
      if (
        worldPos.x >= obj.position.x &&
        worldPos.x <= obj.position.x + obj.size.width &&
        worldPos.y >= obj.position.y &&
        worldPos.y <= obj.position.y + obj.size.height
      ) {
        return obj;
      }
    }
    return null;
  }

  function isOnResizeHandle(worldPos: Vec2): boolean {
    if (!selectedObjectId) return false;
    const obj = room.objects.find((o) => o.id === selectedObjectId);
    if (!obj) return false;
    const handleSize = 12 / view.zoom;
    const hx = obj.position.x + obj.size.width;
    const hy = obj.position.y + obj.size.height;
    return (
      worldPos.x >= hx - handleSize &&
      worldPos.x <= hx + handleSize &&
      worldPos.y >= hy - handleSize &&
      worldPos.y <= hy + handleSize
    );
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      // Middle click or alt+click: pan
      setDragging({
        type: "pan",
        startX: e.clientX - view.offsetX,
        startY: e.clientY - view.offsetY,
      });
      return;
    }

    if (e.button !== 0) return;

    const worldPos = screenToWorld(e.clientX, e.clientY);

    if (tool === "spawn") {
      onUpdateSpawn(worldPos);
      return;
    }

    if (tool === "collision") {
      setDragging({
        type: "draw-collision",
        startX: e.clientX,
        startY: e.clientY,
        drawStart: worldPos,
      });
      return;
    }

    // Select tool
    if (isOnResizeHandle(worldPos)) {
      const obj = room.objects.find((o) => o.id === selectedObjectId)!;
      setDragging({
        type: "resize",
        startX: e.clientX,
        startY: e.clientY,
        startObjSize: { ...obj.size },
        objectId: obj.id,
      });
      return;
    }

    const clickedObj = findObjectAt(worldPos);
    if (clickedObj) {
      onSelectObject(clickedObj.id);
      setDragging({
        type: "move",
        startX: e.clientX,
        startY: e.clientY,
        startObjPos: { ...clickedObj.position },
        objectId: clickedObj.id,
      });
    } else {
      onSelectObject(null);
      // Start panning
      setDragging({
        type: "pan",
        startX: e.clientX - view.offsetX,
        startY: e.clientY - view.offsetY,
      });
    }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return;

    if (dragging.type === "pan") {
      setView((v) => ({
        ...v,
        offsetX: e.clientX - dragging.startX,
        offsetY: e.clientY - dragging.startY,
      }));
    } else if (
      dragging.type === "move" &&
      dragging.objectId &&
      dragging.startObjPos
    ) {
      const dx = (e.clientX - dragging.startX) / view.zoom;
      const dy = (e.clientY - dragging.startY) / view.zoom;
      onUpdateObject(dragging.objectId, {
        position: {
          x: Math.round(Math.max(0, dragging.startObjPos.x + dx)),
          y: Math.round(Math.max(0, dragging.startObjPos.y + dy)),
        },
      });
    } else if (
      dragging.type === "resize" &&
      dragging.objectId &&
      dragging.startObjSize
    ) {
      const dx = (e.clientX - dragging.startX) / view.zoom;
      const dy = (e.clientY - dragging.startY) / view.zoom;
      onUpdateObject(dragging.objectId, {
        size: {
          width: Math.max(16, Math.round(dragging.startObjSize.width + dx)),
          height: Math.max(16, Math.round(dragging.startObjSize.height + dy)),
        },
      });
    } else if (dragging.type === "draw-collision" && dragging.drawStart) {
      const currentWorld = screenToWorld(e.clientX, e.clientY);
      const x = Math.min(dragging.drawStart.x, currentWorld.x);
      const y = Math.min(dragging.drawStart.y, currentWorld.y);
      const width = Math.abs(currentWorld.x - dragging.drawStart.x);
      const height = Math.abs(currentWorld.y - dragging.drawStart.y);
      setDrawRect({
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
      });
    }
  }

  function handleMouseUp() {
    if (
      dragging?.type === "draw-collision" &&
      drawRect &&
      drawRect.width > 8 &&
      drawRect.height > 8
    ) {
      onAddCollisionZone({
        id: `zone-${crypto.randomUUID().slice(0, 8)}`,
        bounds: drawRect,
      });
    }
    setDragging(null);
    setDrawRect(null);
  }

  // Keyboard: delete selected, arrow keys nudge
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedObjectId) return;
      const obj = room.objects.find((o) => o.id === selectedObjectId);
      if (!obj) return;

      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      let dy = 0;

      switch (e.key) {
        case "ArrowLeft":
          dx = -step;
          break;
        case "ArrowRight":
          dx = step;
          break;
        case "ArrowUp":
          dy = -step;
          break;
        case "ArrowDown":
          dy = step;
          break;
        default:
          return;
      }

      e.preventDefault();
      onUpdateObject(selectedObjectId, {
        position: {
          x: Math.max(0, obj.position.x + dx),
          y: Math.max(0, obj.position.y + dy),
        },
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, room.objects, onUpdateObject]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-crosshair"
      style={{
        cursor:
          tool === "select"
            ? dragging?.type === "pan"
              ? "grabbing"
              : "default"
            : "crosshair",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
