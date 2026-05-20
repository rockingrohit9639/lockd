import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Direction, Room, RoomObject, Trigger } from "../shared/types";
import { ObjectPalette } from "./object-palette";
import { BuilderCanvas } from "./builder-canvas";
import { PropertiesPanel } from "./properties-panel";
import { TriggerBuilder } from "./trigger-builder";
import { Game } from "../player/game";

interface BuilderProps {
  onExit: () => void;
}

type RightPanel = "properties" | "triggers";

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
  const [rightPanel, setRightPanel] = useState<RightPanel>("properties");
  const [previewing, setPreviewing] = useState(false);

  const selectedObject = room.objects.find((o) => o.id === selectedObjectId) ?? null;

  function addObject(obj: RoomObject) {
    setRoom((r) => ({ ...r, objects: [...r.objects, obj] }));
    setSelectedObjectId(obj.id);
    setRightPanel("properties");
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

  function addTrigger(trigger: Trigger) {
    setRoom((r) => ({ ...r, triggers: [...r.triggers, trigger] }));
  }

  function deleteTrigger(id: string) {
    setRoom((r) => ({ ...r, triggers: r.triggers.filter((t) => t.id !== id) }));
  }

  const views: Direction[] = ["north", "east", "south", "west"];

  if (previewing) {
    return <Game room={room} onExit={() => setPreviewing(false)} />;
  }

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

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setPreviewing(true)}
            disabled={room.objects.length === 0}
            className="font-mono text-xs uppercase tracking-widest text-[#ccff00] hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-none px-3 py-1 h-auto disabled:opacity-30"
          >
            ▶ Play
          </Button>
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            {room.objects.length} objects · {room.triggers.length} triggers
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
            onSelectObject={(id) => {
              setSelectedObjectId(id);
              if (id) setRightPanel("properties");
            }}
            onUpdateObject={updateObject}
          />
        </main>

        {/* Right: Properties / Triggers */}
        <aside className="w-80 border-l border-white/10 overflow-y-auto shrink-0 flex flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-white/10 shrink-0">
            <button
              onClick={() => setRightPanel("properties")}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-3 transition-colors ${
                rightPanel === "properties"
                  ? "text-white bg-white/5 border-b border-[#ccff00]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setRightPanel("triggers")}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-3 transition-colors ${
                rightPanel === "triggers"
                  ? "text-white bg-white/5 border-b border-[#ccff00]"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Triggers
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            {rightPanel === "properties" ? (
              <PropertiesPanel
                object={selectedObject}
                onUpdate={(updates) => selectedObjectId && updateObject(selectedObjectId, updates)}
                onDelete={() => selectedObjectId && deleteObject(selectedObjectId)}
              />
            ) : (
              <TriggerBuilder
                room={room}
                onAddTrigger={addTrigger}
                onDeleteTrigger={deleteTrigger}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
