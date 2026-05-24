import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Game } from "../player/game";
import type {
  CollisionZone,
  PlayerConfig,
  Room,
  RoomObject,
  Trigger,
  Vec2,
} from "../shared/types";
import { downloadRoom, importRoom, saveRoom } from "../storage/room-storage";
import { BuilderCanvas, type BuilderTool } from "./builder-canvas";
import { CommandPalette } from "./command-palette";
import { MapSettings } from "./map-settings";
import { PropertiesPanel } from "./properties-panel";
import { TriggerBuilder } from "./trigger-builder";
import { useHistory } from "./use-history";

interface BuilderProps {
  room?: Room;
  onExit: () => void;
}

type RightPanel = "properties" | "triggers" | "map";

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
  const { room, setRoom, undo, redo } = useHistory(initialRoom ?? createEmptyRoom());
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<RightPanel>("properties");
  const [tool, setTool] = useState<BuilderTool>("select");
  const [previewing, setPreviewing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 1500);
      return () => clearTimeout(t);
    }
  }, [saved]);

  // Global keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Cmd+K opens palette (works even from inputs)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      // Undo/Redo
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }

      // Delete selected
      if ((e.key === "Delete" || e.key === "Backspace") && selectedObjectId) {
        e.preventDefault();
        deleteObject(selectedObjectId);
        return;
      }

      // Duplicate selected
      if ((e.metaKey || e.ctrlKey) && e.key === "d" && selectedObjectId) {
        e.preventDefault();
        duplicateObject(selectedObjectId);
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, undo, redo]);

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
    // Place at center of map
    const centeredObj = {
      ...obj,
      position: {
        x: room.map.width / 2 - obj.size.width / 2,
        y: room.map.height / 2 - obj.size.height / 2,
      },
    };
    setRoom((r) => ({ ...r, objects: [...r.objects, centeredObj] }));
    setSelectedObjectId(centeredObj.id);
    setRightPanel("properties");
    setTool("select");
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

  function duplicateObject(id: string) {
    const obj = room.objects.find((o) => o.id === id);
    if (!obj) return;
    const newObj: RoomObject = {
      ...obj,
      id: `obj-${crypto.randomUUID().slice(0, 8)}`,
      name: `${obj.name} copy`,
      position: { x: obj.position.x + 32, y: obj.position.y + 32 },
    };
    setRoom((r) => ({ ...r, objects: [...r.objects, newObj] }));
    setSelectedObjectId(newObj.id);
  }

  function addTrigger(trigger: Trigger) {
    setRoom((r) => ({ ...r, triggers: [...r.triggers, trigger] }));
  }

  function updateTrigger(trigger: Trigger) {
    setRoom((r) => ({
      ...r,
      triggers: r.triggers.map((t) => (t.id === trigger.id ? trigger : t)),
    }));
  }

  function deleteTrigger(id: string) {
    setRoom((r) => ({ ...r, triggers: r.triggers.filter((t) => t.id !== id) }));
  }

  function addCollisionZone(zone: CollisionZone) {
    setRoom((r) => ({ ...r, collisionZones: [...r.collisionZones, zone] }));
  }

  function deleteCollisionZone(id: string) {
    setRoom((r) => ({
      ...r,
      collisionZones: r.collisionZones.filter((z) => z.id !== id),
    }));
  }

  function updateSpawn(pos: Vec2) {
    setRoom((r) => ({
      ...r,
      map: {
        ...r.map,
        playerSpawn: { x: Math.round(pos.x), y: Math.round(pos.y) },
      },
    }));
    setTool("select");
  }

  function updateMap(updates: Partial<Room["map"]>) {
    setRoom((r) => ({ ...r, map: { ...r.map, ...updates } }));
  }

  function setBackground(color: string) {
    setRoom((r) => ({ ...r, map: { ...r.map, backgroundColor: color } }));
  }

  function updatePlayer(updates: Partial<PlayerConfig>) {
    setRoom((r) => ({ ...r, player: { ...r.player, ...updates } }));
  }

  if (previewing) {
    return <Game room={room} onExit={() => setPreviewing(false)} />;
  }

  const tools: { id: BuilderTool; label: string }[] = [
    { id: "select", label: "Select" },
    { id: "collision", label: "Collision" },
    { id: "spawn", label: "Spawn" },
  ];

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

        {/* Tool selector + undo/redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPaletteOpen(true)}
            title="Add object (Cmd+K)"
            className="font-mono text-xs px-2.5 py-1.5 text-primary hover:bg-primary/10 transition-colors"
          >
            + Add
          </button>
          <div className="h-4 w-px bg-accent mx-1" />
          <button
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="font-mono text-xs px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          >
            ↩
          </button>
          <button
            onClick={redo}
            title="Redo (Ctrl+Shift+Z)"
            className="font-mono text-xs px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
          >
            ↪
          </button>
          <div className="h-4 w-px bg-accent mx-1" />
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${
                tool === t.id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {t.label}
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
            className="font-mono text-xs uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 rounded-none px-3 py-1 h-auto"
          >
            ▶ Play
          </Button>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {room.objects.length} obj · {room.triggers.length} trg
          </span>
        </div>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <main className="flex-1 overflow-hidden bg-muted">
          <BuilderCanvas
            room={room}
            selectedObjectId={selectedObjectId}
            tool={tool}
            onSelectObject={(id) => {
              setSelectedObjectId(id);
              if (id) setRightPanel("properties");
            }}
            onUpdateObject={updateObject}
            onAddCollisionZone={addCollisionZone}
            onUpdateSpawn={updateSpawn}
          />
        </main>

        {/* Right: Properties / Triggers / Map */}
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
            <button
              onClick={() => setRightPanel("map")}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-3 transition-colors ${
                rightPanel === "map"
                  ? "text-foreground bg-muted border-b border-primary"
                  : "text-muted-foreground hover:text-muted-foreground"
              }`}
            >
              Map
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
            ) : rightPanel === "triggers" ? (
              <TriggerBuilder
                room={room}
                onAddTrigger={addTrigger}
                onUpdateTrigger={updateTrigger}
                onDeleteTrigger={deleteTrigger}
              />
            ) : (
              <MapSettings
                map={room.map}
                player={room.player}
                collisionZones={room.collisionZones}
                onUpdateMap={updateMap}
                onUpdatePlayer={updatePlayer}
                onDeleteCollisionZone={deleteCollisionZone}
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

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onAddObject={addObject}
        onSetBackground={setBackground}
      />
    </div>
  );
}
