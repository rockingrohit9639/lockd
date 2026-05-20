import type { Direction, RoomObject } from "../shared/types";
import { OBJECT_CATALOG, type ObjectDefinition } from "../shared/objects";
import { ObjectSprite, hasSprite } from "../shared/object-sprites";

interface ObjectPaletteProps {
  currentView: Direction;
  onAddObject: (obj: RoomObject) => void;
}

const CATEGORIES = ["furniture", "container", "key-lock", "clue", "decoration", "special"] as const;

const CATEGORY_LABELS: Record<string, string> = {
  "furniture": "Furniture",
  "container": "Containers",
  "key-lock": "Keys & Locks",
  "clue": "Clues",
  "decoration": "Decoration",
  "special": "Special",
};

export function ObjectPalette({ currentView, onAddObject }: ObjectPaletteProps) {
  function handleAdd(def: ObjectDefinition) {
    const obj: RoomObject = {
      id: crypto.randomUUID(),
      type: def.type,
      name: def.name,
      view: currentView,
      position: { x: 40, y: 40 },
      size: { width: def.defaultSize.width, height: def.defaultSize.height },
      hidden: false,
      collectible: false,
      properties: {},
    };
    onAddObject(obj);
  }

  return (
    <div className="p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 px-1">
        // Objects
      </div>
      {CATEGORIES.map((cat) => {
        const items = OBJECT_CATALOG.filter((o) => o.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2 px-1">
              {CATEGORY_LABELS[cat]}
            </div>
            <div className="space-y-0.5">
              {items.map((def) => (
                <button
                  key={def.type}
                  onClick={() => handleAdd(def)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-white/5 transition-colors group"
                >
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                    {hasSprite(def.type) ? (
                      <ObjectSprite type={def.type} width={20} height={20} />
                    ) : (
                      <div
                        className="w-4 h-4 border border-white/10 group-hover:border-white/30"
                        style={{ backgroundColor: def.color }}
                      />
                    )}
                  </div>
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors truncate">
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
