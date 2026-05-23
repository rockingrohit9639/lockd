import { OBJECT_CATALOG, type ObjectDefinition } from "../shared/objects";
import { SpriteIcon } from "../shared/sprite-icon";
import type { RoomObject } from "../shared/types";

interface ObjectPaletteProps {
  onAddObject: (obj: RoomObject) => void;
}

const CATEGORIES = [
  "furniture",
  "container",
  "key-lock",
  "clue",
  "decoration",
  "special",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  furniture: "Furniture",
  container: "Containers",
  "key-lock": "Keys & Locks",
  clue: "Clues",
  decoration: "Decoration",
  special: "Special",
};

export function ObjectPalette({ onAddObject }: ObjectPaletteProps) {
  function handleAdd(def: ObjectDefinition) {
    const obj: RoomObject = {
      id: crypto.randomUUID(),
      type: def.type,
      name: def.name,
      position: { x: 0, y: 0 },
      size: { width: def.defaultSize.width, height: def.defaultSize.height },
      zIndex: 0,
      hidden: false,
      collectible: false,
      collision: null,
      interactionRadius: 50,
      properties: {},
    };
    onAddObject(obj);
  }

  return (
    <div className="p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 px-1">
        // Objects
      </div>
      {CATEGORIES.map((cat) => {
        const items = OBJECT_CATALOG.filter((o) => o.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 px-1">
              {CATEGORY_LABELS[cat]}
            </div>
            <div className="space-y-0.5">
              {items.map((def) => (
                <button
                  key={def.type}
                  onClick={() => handleAdd(def)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-accent transition-colors group"
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    <SpriteIcon type={def.type} width={20} height={20} />
                  </div>
                  <span className="text-xs text-foreground/60 group-hover:text-foreground transition-colors truncate">
                    {def.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
