import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Room } from "../shared/types";
import { getObjectDef } from "../shared/objects";

interface InventoryProps {
  items: string[];
  room: Room;
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
}

export function Inventory({ items, room, selectedItem, onSelectItem }: InventoryProps) {
  return (
    <div className="border-t px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-sm font-medium">Inventory</span>
        {items.length === 0 && (
          <span className="text-muted-foreground/50 text-sm italic">nothing yet...</span>
        )}
        {items.map((itemId) => {
          const obj = room.objects.find((o) => o.id === itemId);
          const def = obj ? getObjectDef(obj.type) : undefined;
          const isSelected = selectedItem === itemId;

          return (
            <Tooltip key={itemId}>
              <TooltipTrigger
                onClick={() => onSelectItem(isSelected ? null : itemId)}
                className={`w-12 h-12 rounded-md border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-400/20 scale-110 shadow-lg shadow-yellow-400/20"
                    : "border-border bg-muted hover:border-muted-foreground/50"
                }`}
                style={{ color: def?.color ?? "#fff" }}
              >
                {obj?.name?.slice(0, 3) ?? "?"}
              </TooltipTrigger>
              <TooltipContent>
                <p>{obj?.name ?? itemId}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {selectedItem && (
          <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 animate-pulse ml-2">
            Click an object to use it on
          </Badge>
        )}
      </div>
    </div>
  );
}
