import { useEffect, useRef } from "react";
import { hasSprite, ObjectSprite } from "../shared/object-sprites";
import { getObjectDef } from "../shared/objects";
import type { Direction, Room, RoomObject } from "../shared/types";

interface BuilderCanvasProps {
  room: Room;
  currentView: Direction;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (id: string, updates: Partial<RoomObject>) => void;
}

const MOVE_STEP = 1;

export function BuilderCanvas({
  room,
  currentView,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
}: BuilderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleObjects = room.objects.filter((obj) => obj.view === currentView);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedObjectId) return;
      const obj = room.objects.find((o) => o.id === selectedObjectId);
      if (!obj) return;

      let dx = 0;
      let dy = 0;

      switch (e.key) {
        case "ArrowLeft":
          dx = -MOVE_STEP;
          break;
        case "ArrowRight":
          dx = MOVE_STEP;
          break;
        case "ArrowUp":
          dy = -MOVE_STEP;
          break;
        case "ArrowDown":
          dy = MOVE_STEP;
          break;
        case "Delete":
        case "Backspace":
          return;
        default:
          return;
      }

      e.preventDefault();
      onUpdateObject(selectedObjectId, {
        position: {
          x: Math.max(0, Math.min(90, obj.position.x + dx)),
          y: Math.max(0, Math.min(85, obj.position.y + dy)),
        },
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, room.objects, onUpdateObject]);

  function handleCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onSelectObject(null);
    }
  }

  function handleObjectMouseDown(e: React.MouseEvent, obj: RoomObject) {
    e.stopPropagation();
    onSelectObject(obj.id);

    const canvas = containerRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = obj.position.x;
    const startPosY = obj.position.y;

    function onMouseMove(me: MouseEvent) {
      const dx = ((me.clientX - startX) / rect.width) * 100;
      const dy = ((me.clientY - startY) / rect.height) * 100;
      onUpdateObject(obj.id, {
        position: {
          x: Math.max(0, Math.min(90, startPosX + dx)),
          y: Math.max(0, Math.min(85, startPosY + dy)),
        },
      });
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function handleResizeMouseDown(e: React.MouseEvent, obj: RoomObject) {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = obj.size.width;
    const startH = obj.size.height;

    function onMouseMove(me: MouseEvent) {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      onUpdateObject(obj.id, {
        size: {
          width: Math.max(20, startW + dx),
          height: Math.max(20, startH + dy),
        },
      });
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return (
    <div className="h-full flex items-center justify-center p-6 bg-muted">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl aspect-[16/10] border border-border overflow-hidden"
        style={{
          background:
            "var(--background) url('https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1200&q=80&fit=crop') center/cover",
        }}
        onClick={handleCanvasClick}
      >
        {/* Darkening overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/4 border-t border-border/30"
          style={{
            background:
              "#111 url('https://images.unsplash.com/photo-1573869908170-64b53a60d8da?w=1200&q=80&fit=crop') center/cover",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "10% 10%",
          }}
        />

        {/* Wall label */}
        <div className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest">
          {currentView} wall
        </div>

        {/* Objects */}
        {visibleObjects.map((obj) => {
          const def = getObjectDef(obj.type);
          const isSelected = obj.id === selectedObjectId;

          return (
            <div
              key={obj.id}
              onMouseDown={(e) => handleObjectMouseDown(e, obj)}
              className={`absolute cursor-move transition-shadow group ${
                isSelected
                  ? "outline outline-2 outline-primary shadow-[0_0_12px_rgba(245,245,245,0.3)]"
                  : "hover:outline hover:outline-1 hover:outline-foreground/30"
              } ${obj.hidden ? "opacity-40 border-dashed" : ""}`}
              style={{
                left: `${obj.position.x}%`,
                top: `${obj.position.y}%`,
                width: `${obj.size.width}px`,
                height: `${obj.size.height}px`,
                backgroundColor: hasSprite(obj.type)
                  ? "transparent"
                  : (def?.color ?? "#666"),
              }}
            >
              {hasSprite(obj.type) && (
                <ObjectSprite
                  type={obj.type}
                  width={obj.size.width}
                  height={obj.size.height}
                />
              )}
              <span className="absolute -bottom-5 left-0 font-mono text-[9px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {obj.name}
              </span>
              {isSelected && (
                <div
                  onMouseDown={(e) => handleResizeMouseDown(e, obj)}
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary cursor-se-resize"
                />
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {visibleObjects.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-xs text-muted-foreground/50 uppercase tracking-widest">
              Click objects in the palette to add them
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
