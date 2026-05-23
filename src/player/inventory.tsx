import { SpriteIcon } from "../shared/sprite-icon";
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
    <div className="h-full flex flex-col bg-background border-l border-border">
      <div className="px-4 py-3 border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // Inventory ({items.length})
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.length === 0 && (
          <p className="font-mono text-xs text-muted-foreground/50 text-center py-8">
            Empty
          </p>
        )}
        {items.map((itemId) => {
          const obj = room.objects.find((o) => o.id === itemId);
          const isSelected = selectedItem === itemId;

          return (
            <button
              key={itemId}
              onClick={() => onSelectItem(isSelected ? null : itemId)}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                isSelected
                  ? "bg-primary/10 border border-primary/50"
                  : "border border-border hover:border-foreground/20"
              }`}
            >
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                {obj && <SpriteIcon type={obj.type} width={24} height={24} />}
              </div>
              <span
                className={`font-mono text-xs ${isSelected ? "text-primary" : "text-foreground/70"}`}
              >
                {obj?.name ?? "?"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedItem && (
        <div className="px-4 py-3 border-t border-border">
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest animate-pulse">
            Click an object to use item on
          </span>
        </div>
      )}
    </div>
  );
}
