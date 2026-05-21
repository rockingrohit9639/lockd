import { hasSprite, ObjectSprite } from "../shared/object-sprites";
import { getObjectDef } from "../shared/objects";
import type { Room } from "../shared/types";

interface InventoryProps {
  items: string[];
  room: Room;
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
}

export function Inventory({
  items,
  room,
  selectedItem,
  onSelectItem,
}: InventoryProps) {
  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border-l border-white/10">
      <div className="px-4 py-3 border-b border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          // Inventory ({items.length})
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.length === 0 && (
          <p className="font-mono text-xs text-white/20 text-center py-8">
            Empty
          </p>
        )}
        {items.map((itemId) => {
          const obj = room.objects.find((o) => o.id === itemId);
          const def = obj ? getObjectDef(obj.type) : undefined;
          const isSelected = selectedItem === itemId;

          return (
            <button
              key={itemId}
              onClick={() => onSelectItem(isSelected ? null : itemId)}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                isSelected
                  ? "bg-[#ccff00]/10 border border-[#ccff00]/50"
                  : "border border-white/10 hover:border-white/20"
              }`}
            >
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                {obj && hasSprite(obj.type) ? (
                  <ObjectSprite type={obj.type} width={24} height={24} />
                ) : (
                  <div
                    className="w-5 h-5"
                    style={{ backgroundColor: def?.color ?? "#666" }}
                  />
                )}
              </div>
              <span
                className={`font-mono text-xs ${isSelected ? "text-[#ccff00]" : "text-white/70"}`}
              >
                {obj?.name ?? "?"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedItem && (
        <div className="px-4 py-3 border-t border-white/10">
          <span className="font-mono text-[10px] text-[#ccff00] uppercase tracking-widest animate-pulse">
            Click an object to use item on
          </span>
        </div>
      )}
    </div>
  );
}
