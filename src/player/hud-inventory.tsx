import { SpriteIcon } from "../shared/sprite-icon";
import type { Room } from "../shared/types";

interface HudInventoryProps {
  items: string[];
  room: Room;
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
}

export function HudInventory({
  items,
  room,
  selectedItem,
  onSelectItem,
}: HudInventoryProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-1 backdrop-blur-md bg-black/50 border border-white/10 p-1.5">
      {items.map((itemId, index) => {
        const obj = room.objects.find((o) => o.id === itemId);
        const isSelected = selectedItem === itemId;

        return (
          <button
            key={itemId}
            onClick={() => onSelectItem(isSelected ? null : itemId)}
            className={`relative w-12 h-12 flex items-center justify-center transition-all ${
              isSelected
                ? "bg-emerald-500/20 border border-emerald-400/60"
                : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
            title={obj?.name}
          >
            {obj && <SpriteIcon type={obj.type} width={28} height={28} />}
            <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white/30">
              {index + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}
