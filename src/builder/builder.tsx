import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Direction, Room, RoomObject } from "../shared/types";
import { ObjectPalette } from "./object-palette";
import { BuilderCanvas } from "./builder-canvas";
import { PropertiesPanel } from "./properties-panel";

interface BuilderProps {
  onExit: () => void;
}

function createEmptyRoom(): Room {
  return {
    id: crypto.randomUUID(),
    name: "Untitled Room",
    description: "",
    objects: [],
    triggers: [],
    winCondition: { type: "trigger", triggerId: "" },
  };
}

export function Builder({ onExit }: BuilderProps) {
  const [room, setRoom] = useState<Room>(createEmptyRoom);
  const [currentView, setCurrentView] = useState<Direction>("north");
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const selectedObject = room.objects.find((o) => o.id === selectedObjectId) ?? null;

  function addObject(obj: RoomObject) {
    setRoom((r) => ({ ...r, objects: [...r.objects, obj] }));
    setSelectedObjectId(obj.id);
  }

  function updateObject(id: string, updates: Partial<RoomObject>) {
    setRoom((r) => ({
      ...r,
      objects: r.objects.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    }));
  }

  function deleteObject(id: string) {
    setRoom((r) => ({
      ...r,
      objects: r.objects.filter((o) => o.id !== id),
    }));
    setSelectedObjectId(null);
  }

  const views: Direction[] = ["north", "east", "south", "west"];

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top bar */}
      <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onExit}
            className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white rounded-none px-3 py-1 h-auto"
          >
            ← Exit
          </Button>
          <div className="h-4 w-px bg-white/10" />
          <input
            type="text"
            value={room.name}
            onChange={(e) => setRoom((r) => ({ ...r, name: e.target.value }))}
            className="bg-transparent font-mono text-sm font-bold border-none outline-none focus:text-[#ccff00] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Wall tabs */}
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${
                currentView === v
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {v[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            {room.objects.length} objects
          </span>
        </div>
      </header>

      {/* Main area — 3 panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Object Palette */}
        <aside className="w-56 border-r border-white/10 overflow-y-auto shrink-0">
          <ObjectPalette currentView={currentView} onAddObject={addObject} />
        </aside>

        {/* Center: Canvas */}
        <main className="flex-1 overflow-hidden">
          <BuilderCanvas
            room={room}
            currentView={currentView}
            selectedObjectId={selectedObjectId}
            onSelectObject={setSelectedObjectId}
            onUpdateObject={updateObject}
          />
        </main>

        {/* Right: Properties */}
        <aside className="w-72 border-l border-white/10 overflow-y-auto shrink-0">
          <PropertiesPanel
            object={selectedObject}
            onUpdate={(updates) => selectedObjectId && updateObject(selectedObjectId, updates)}
            onDelete={() => selectedObjectId && deleteObject(selectedObjectId)}
          />
        </aside>
      </div>
    </div>
  );
}
