import { SpriteIcon } from "../shared/sprite-icon";
import type { Room, RoomObject } from "../shared/types";

interface LayerPanelProps {
  room: Room;
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onUpdateObject: (id: string, updates: Partial<RoomObject>) => void;
  onDeleteObject: (id: string) => void;
}

export function LayerPanel({
  room,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  onDeleteObject,
}: LayerPanelProps) {
  const sorted = [...room.objects].sort((a, b) => {
    if (a.zIndex !== b.zIndex) return b.zIndex - a.zIndex;
    return b.position.y + b.size.height - (a.position.y + a.size.height);
  });

  function moveUp(obj: RoomObject) {
    const maxZ = Math.max(...room.objects.map((o) => o.zIndex));
    onUpdateObject(obj.id, { zIndex: Math.min(obj.zIndex + 1, maxZ + 1) });
  }

  function moveDown(obj: RoomObject) {
    onUpdateObject(obj.id, { zIndex: Math.max(obj.zIndex - 1, -10) });
  }

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // Layers ({room.objects.length})
        </span>
      </div>

      {sorted.length === 0 && (
        <p className="font-mono text-xs text-muted-foreground/50 text-center py-8">
          No objects. Press Cmd+K to add.
        </p>
      )}

      <div className="space-y-0.5">
        {sorted.map((obj) => {
          const isSelected = obj.id === selectedObjectId;
          return (
            <div
              key={obj.id}
              onClick={() => onSelectObject(obj.id)}
              className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer group transition-colors ${
                isSelected
                  ? "bg-primary/10 border border-primary/30"
                  : "border border-transparent hover:bg-accent"
              }`}
            >
              {/* Sprite preview */}
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                <SpriteIcon type={obj.type} width={16} height={16} />
              </div>

              {/* Name */}
              <span
                className={`font-mono text-[10px] flex-1 truncate ${
                  isSelected ? "text-foreground" : "text-foreground/60"
                } ${obj.hidden ? "line-through opacity-50" : ""}`}
              >
                {obj.name}
              </span>

              {/* Z-index badge */}
              <span className="font-mono text-[8px] text-muted-foreground/50 shrink-0">
                z{obj.zIndex}
              </span>

              {/* Controls (visible on hover) */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveUp(obj);
                  }}
                  className="text-[9px] text-muted-foreground hover:text-foreground px-1"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveDown(obj);
                  }}
                  className="text-[9px] text-muted-foreground hover:text-foreground px-1"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateObject(obj.id, { hidden: !obj.hidden });
                  }}
                  className={`text-[9px] px-1 ${obj.hidden ? "text-amber-500" : "text-muted-foreground hover:text-foreground"}`}
                  title={obj.hidden ? "Show" : "Hide"}
                >
                  {obj.hidden ? "◑" : "◉"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteObject(obj.id);
                  }}
                  className="text-[9px] text-red-400/60 hover:text-red-400 px-1"
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
