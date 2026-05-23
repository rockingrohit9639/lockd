import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Game } from "../player/game";
import type { Direction, Room, RoomObject, Trigger } from "../shared/types";
import { downloadRoom, importRoom, saveRoom } from "../storage/room-storage";
import { BuilderCanvas } from "./builder-canvas";
import { ObjectPalette } from "./object-palette";
import { PropertiesPanel } from "./properties-panel";
import { TriggerBuilder } from "./trigger-builder";

interface BuilderProps {
  room?: Room;
  onExit: () => void;
}

type RightPanel = "properties" | "triggers";

function createEmptyRoom(): Room {
  return {
    id: crypto.randomUUID(),
    name: "Untitled Room",
    description: "",
    map: {
      width: 1600,
      height: 1200,
      backgroundColor: "#e8e8e8",
      playerSpawn: { x: 800, y: 600 },
    },
    player: {
      speed: 200,
      size: { width: 28, height: 28 },
      interactionReach: 20,
    },
    collisionZones: [],
    objects: [],
    triggers: [],
    winCondition: { type: "trigger", triggerId: "" },
  };
}

export function Builder({ room: initialRoom, onExit }: BuilderProps) {
  const [room, setRoom] = useState<Room>(initialRoom ?? createEmptyRoom);
  const [currentView, setCurrentView] = useState<Direction>("north");
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<RightPanel>("properties");
  const [previewing, setPreviewing] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleSave = useCallback(() => {
    saveRoom(room);
    setSaved(true);
  }, [room]);

  const handleExport = useCallback(() => {
    downloadRoom(room);
  }, [room]);

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = importRoom(reader.result as string);
          setRoom(imported);
          setSelectedObjectId(null);
        } catch {
          alert("Invalid room file");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [],
  );

  const selectedObject =
    room.objects.find((o) => o.id === selectedObjectId) ?? null;

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
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Top bar */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onExit}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none px-3 py-1 h-auto"
          >
            ← Exit
          </Button>
          <div className="h-4 w-px bg-accent" />
          <input
            type="text"
            value={room.name}
            onChange={(e) => setRoom((r) => ({ ...r, name: e.target.value }))}
            className="bg-transparent font-mono text-sm font-bold border-none outline-none focus:text-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${
                currentView === v
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {v[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={handleImport}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none px-2 py-1 h-auto"
          >
            Import
          </Button>
          <Button
            variant="ghost"
            onClick={handleExport}
            disabled={room.objects.length === 0}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none px-2 py-1 h-auto disabled:opacity-30"
          >
            Export
          </Button>
          <Button
            variant="ghost"
            onClick={handleSave}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none px-2 py-1 h-auto"
          >
            {saved ? "✓ Saved" : "Save"}
          </Button>
          <div className="h-4 w-px bg-accent" />
          <Button
            variant="ghost"
            onClick={() => setPreviewing(true)}
            disabled={room.objects.length === 0}
            className="font-mono text-xs uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 rounded-none px-3 py-1 h-auto disabled:opacity-30"
          >
            ▶ Play
          </Button>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {room.objects.length} obj · {room.triggers.length} trg
          </span>
        </div>
      </header>

      {/* Main area — 3 panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Object Palette */}
        <aside className="w-56 border-r border-border overflow-y-auto shrink-0">
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
        <aside className="w-80 border-l border-border overflow-y-auto shrink-0 flex flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-border shrink-0">
            <button
              onClick={() => setRightPanel("properties")}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-3 transition-colors ${
                rightPanel === "properties"
                  ? "text-foreground bg-muted border-b border-primary"
                  : "text-muted-foreground hover:text-muted-foreground"
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setRightPanel("triggers")}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-3 transition-colors ${
                rightPanel === "triggers"
                  ? "text-foreground bg-muted border-b border-primary"
                  : "text-muted-foreground hover:text-muted-foreground"
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
                onUpdate={(updates) =>
                  selectedObjectId && updateObject(selectedObjectId, updates)
                }
                onDelete={() =>
                  selectedObjectId && deleteObject(selectedObjectId)
                }
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

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.lockd.json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
