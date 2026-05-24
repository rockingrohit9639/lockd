import { useEffect, useRef, useState } from "react";
import { OBJECT_CATALOG, type ObjectDefinition } from "../shared/objects";
import { SpriteIcon } from "../shared/sprite-icon";
import type { RoomObject } from "../shared/types";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onAddObject: (obj: RoomObject) => void;
  onSetBackground: (color: string) => void;
}

type Tab = "objects" | "floors" | "characters";

const TABS: { id: Tab; label: string }[] = [
  { id: "objects", label: "Objects" },
  { id: "floors", label: "Floors" },
  { id: "characters", label: "Characters" },
];

const CATEGORY_LABELS: Record<string, string> = {
  furniture: "Furniture",
  container: "Containers",
  "key-lock": "Keys & Locks",
  clue: "Clues",
  decoration: "Decoration",
  special: "Special",
};

const FLOOR_PRESETS = [
  { id: "wood-light", name: "Light Wood", color: "#d4a574" },
  { id: "wood-dark", name: "Dark Wood", color: "#6b4226" },
  { id: "stone-gray", name: "Stone Gray", color: "#9ca3af" },
  { id: "stone-dark", name: "Dark Stone", color: "#4b5563" },
  { id: "tile-white", name: "White Tile", color: "#f3f4f6" },
  { id: "tile-blue", name: "Blue Tile", color: "#bfdbfe" },
  { id: "carpet-red", name: "Red Carpet", color: "#991b1b" },
  { id: "carpet-green", name: "Green Carpet", color: "#166534" },
  { id: "concrete", name: "Concrete", color: "#d1d5db" },
  { id: "dirt", name: "Dirt", color: "#92400e" },
  { id: "grass", name: "Grass", color: "#4ade80" },
  { id: "sand", name: "Sand", color: "#fde68a" },
];

export function CommandPalette({
  open,
  onClose,
  onAddObject,
  onSetBackground,
}: CommandPaletteProps) {
  const [tab, setTab] = useState<Tab>("objects");
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const filteredObjects = search
    ? OBJECT_CATALOG.filter((o) =>
        o.name.toLowerCase().includes(search.toLowerCase()),
      )
    : OBJECT_CATALOG;

  const filteredFloors = search
    ? FLOOR_PRESETS.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase()),
      )
    : FLOOR_PRESETS;

  const currentItems =
    tab === "objects"
      ? filteredObjects
      : tab === "floors"
        ? filteredFloors
        : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [search, tab]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, currentItems.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && currentItems.length > 0) {
      e.preventDefault();
      selectItem(selectedIndex);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const tabIds = TABS.map((t) => t.id);
      const idx = tabIds.indexOf(tab);
      setTab(tabIds[(idx + (e.shiftKey ? -1 : 1) + tabIds.length) % tabIds.length]);
    }
  }

  function selectItem(index: number) {
    if (tab === "objects") {
      const def = filteredObjects[index];
      if (def) placeObject(def);
    } else if (tab === "floors") {
      const preset = filteredFloors[index];
      if (preset) {
        onSetBackground(preset.color);
        onClose();
      }
    }
  }

  function placeObject(def: ObjectDefinition) {
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
    onClose();
  }

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector("[data-selected='true']");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative w-[560px] max-h-[60vh] flex flex-col bg-background border border-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-border px-4 py-3 gap-3">
          <span className="font-mono text-xs text-muted-foreground shrink-0">
            /
          </span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search objects, floors..."
            className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
          />
          <kbd className="font-mono text-[9px] text-muted-foreground/60 bg-accent px-1.5 py-0.5 border border-border">
            esc
          </kbd>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4 shrink-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`font-mono text-[10px] uppercase tracking-widest py-2.5 px-3 transition-colors border-b -mb-px ${
                tab === t.id
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-3">
          {tab === "objects" && (
            <ObjectGrid
              items={filteredObjects}
              selectedIndex={selectedIndex}
              onSelect={(def) => placeObject(def)}
              onHover={setSelectedIndex}
              search={search}
            />
          )}
          {tab === "floors" && (
            <FloorGrid
              items={filteredFloors}
              selectedIndex={selectedIndex}
              onSelect={(preset) => {
                onSetBackground(preset.color);
                onClose();
              }}
              onHover={setSelectedIndex}
            />
          )}
          {tab === "characters" && (
            <div className="flex items-center justify-center py-12">
              <p className="font-mono text-xs text-muted-foreground/50">
                Coming soon — custom player skins & NPCs
              </p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-border px-4 py-2 flex items-center gap-4 shrink-0">
          <span className="font-mono text-[9px] text-muted-foreground/60">
            <kbd className="bg-accent px-1 py-0.5 border border-border mr-1">↑↓</kbd>
            navigate
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/60">
            <kbd className="bg-accent px-1 py-0.5 border border-border mr-1">↵</kbd>
            place
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/60">
            <kbd className="bg-accent px-1 py-0.5 border border-border mr-1">tab</kbd>
            switch tab
          </span>
        </div>
      </div>
    </div>
  );
}

function ObjectGrid({
  items,
  selectedIndex,
  onSelect,
  onHover,
  search,
}: {
  items: ObjectDefinition[];
  selectedIndex: number;
  onSelect: (def: ObjectDefinition) => void;
  onHover: (index: number) => void;
  search: string;
}) {
  if (items.length === 0) {
    return (
      <p className="font-mono text-xs text-muted-foreground/50 text-center py-8">
        No objects match "{search}"
      </p>
    );
  }

  // Group by category when not searching
  if (!search) {
    const categories = [
      "furniture",
      "container",
      "key-lock",
      "clue",
      "decoration",
      "special",
    ];
    let globalIndex = 0;

    return (
      <div className="space-y-4">
        {categories.map((cat) => {
          const catItems = items.filter((o) => o.category === cat);
          if (catItems.length === 0) return null;
          const startIndex = globalIndex;
          globalIndex += catItems.length;
          return (
            <div key={cat}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-2 px-1">
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {catItems.map((def, i) => {
                  const idx = startIndex + i;
                  return (
                    <ObjectItem
                      key={def.type}
                      def={def}
                      selected={idx === selectedIndex}
                      onClick={() => onSelect(def)}
                      onMouseEnter={() => onHover(idx)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {items.map((def, i) => (
        <ObjectItem
          key={def.type}
          def={def}
          selected={i === selectedIndex}
          onClick={() => onSelect(def)}
          onMouseEnter={() => onHover(i)}
        />
      ))}
    </div>
  );
}

function ObjectItem({
  def,
  selected,
  onClick,
  onMouseEnter,
}: {
  def: ObjectDefinition;
  selected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}) {
  return (
    <button
      data-selected={selected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex flex-col items-center gap-1.5 p-2.5 transition-colors ${
        selected
          ? "bg-primary/10 border border-primary/40"
          : "border border-transparent hover:bg-accent"
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <SpriteIcon type={def.type} width={28} height={28} />
      </div>
      <span className="font-mono text-[9px] text-foreground/60 text-center leading-tight truncate w-full">
        {def.name}
      </span>
    </button>
  );
}

function FloorGrid({
  items,
  selectedIndex,
  onSelect,
  onHover,
}: {
  items: typeof FLOOR_PRESETS;
  selectedIndex: number;
  onSelect: (preset: (typeof FLOOR_PRESETS)[0]) => void;
  onHover: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((preset, i) => (
        <button
          key={preset.id}
          data-selected={i === selectedIndex}
          onClick={() => onSelect(preset)}
          onMouseEnter={() => onHover(i)}
          className={`flex flex-col items-center gap-2 p-3 transition-colors ${
            i === selectedIndex
              ? "bg-primary/10 border border-primary/40"
              : "border border-transparent hover:bg-accent"
          }`}
        >
          <div
            className="w-10 h-10 border border-border"
            style={{ backgroundColor: preset.color }}
          />
          <span className="font-mono text-[9px] text-foreground/60 text-center leading-tight">
            {preset.name}
          </span>
        </button>
      ))}
    </div>
  );
}
