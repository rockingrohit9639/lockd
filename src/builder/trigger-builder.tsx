import { useState } from "react";
import { Button } from "~/components/ui/button";
import type { Action, Condition, Room, Trigger, TriggerEvent, ActionType } from "../shared/types";

interface TriggerBuilderProps {
  room: Room;
  onAddTrigger: (trigger: Trigger) => void;
  onDeleteTrigger: (id: string) => void;
}

const EVENTS: { value: TriggerEvent; label: string }[] = [
  { value: "click", label: "Click" },
  { value: "use_item_on", label: "Use item on" },
];

const ACTIONS: { value: ActionType; label: string }[] = [
  { value: "reveal", label: "Reveal object" },
  { value: "add_to_inventory", label: "Add to inventory" },
  { value: "remove_from_inventory", label: "Remove from inventory" },
  { value: "show_message", label: "Show message" },
  { value: "play_meme", label: "Play meme" },
  { value: "win", label: "Win game" },
];

export function TriggerBuilder({ room, onAddTrigger, onDeleteTrigger }: TriggerBuilderProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          // Triggers ({room.triggers.length})
        </span>
        <Button
          variant="ghost"
          onClick={() => setIsAdding(true)}
          className="font-mono text-[10px] uppercase tracking-widest text-[#ccff00] hover:text-[#ccff00] hover:bg-[#ccff00]/10 rounded-none px-2 py-1 h-auto"
        >
          + Add
        </Button>
      </div>

      {/* Existing triggers */}
      {room.triggers.map((trigger) => (
        <TriggerCard
          key={trigger.id}
          trigger={trigger}
          room={room}
          onDelete={() => onDeleteTrigger(trigger.id)}
        />
      ))}

      {/* New trigger form */}
      {isAdding && (
        <NewTriggerForm
          room={room}
          onSave={(trigger) => {
            onAddTrigger(trigger);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {room.triggers.length === 0 && !isAdding && (
        <p className="font-mono text-xs text-white/20 text-center py-8">
          No triggers yet. Add one to make objects interactive.
        </p>
      )}
    </div>
  );
}

function TriggerCard({ trigger, room, onDelete }: { trigger: Trigger; room: Room; onDelete: () => void }) {
  const source = room.objects.find((o) => o.id === trigger.sourceId);
  const actionSummary = trigger.actions.map((a) => {
    const target = a.targetId ? room.objects.find((o) => o.id === a.targetId)?.name : null;
    switch (a.type) {
      case "reveal": return `reveal ${target ?? "?"}`;
      case "add_to_inventory": return `collect ${target ?? "?"}`;
      case "remove_from_inventory": return `remove ${target ?? "?"}`;
      case "show_message": return `message`;
      case "play_meme": return `meme: ${a.memeId ?? "?"}`;
      case "win": return `WIN`;
      default: return a.type;
    }
  }).join(", ");

  return (
    <div className="border border-white/10 p-3 space-y-1 group">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-white/70">
          <span className="text-[#ccff00]">{trigger.event}</span>
          {" → "}
          <span className="text-white/50">{source?.name ?? "?"}</span>
        </span>
        <button
          onClick={onDelete}
          className="font-mono text-[9px] text-red-400/60 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
      <p className="font-mono text-[10px] text-white/40">{actionSummary}</p>
    </div>
  );
}

function NewTriggerForm({ room, onSave, onCancel }: { room: Room; onSave: (t: Trigger) => void; onCancel: () => void }) {
  const [event, setEvent] = useState<TriggerEvent>("click");
  const [sourceId, setSourceId] = useState(room.objects[0]?.id ?? "");
  const [itemId, setItemId] = useState("");
  const [actions, setActions] = useState<Action[]>([]);
  const [conditionType, setConditionType] = useState<"" | "has_item" | "not_has_item">("");
  const [conditionItemId, setConditionItemId] = useState("");

  function addAction(type: ActionType) {
    setActions([...actions, { type }]);
  }

  function updateAction(index: number, updates: Partial<Action>) {
    setActions(actions.map((a, i) => (i === index ? { ...a, ...updates } : a)));
  }

  function removeAction(index: number) {
    setActions(actions.filter((_, i) => i !== index));
  }

  function handleSave() {
    const conditions: Condition[] = [];
    if (conditionType && conditionItemId) {
      conditions.push({ type: conditionType, itemId: conditionItemId });
    }

    const trigger: Trigger = {
      id: crypto.randomUUID(),
      event,
      sourceId,
      ...(event === "use_item_on" ? { itemId } : {}),
      conditions,
      actions,
    };
    onSave(trigger);
  }

  return (
    <div className="border border-[#ccff00]/30 p-4 space-y-4 bg-[#ccff00]/5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[#ccff00]">
        New Trigger
      </div>

      {/* Event */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">When</label>
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value as TriggerEvent)}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
        >
          {EVENTS.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
      </div>

      {/* Source object */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">On object</label>
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
        >
          {room.objects.map((obj) => (
            <option key={obj.id} value={obj.id}>{obj.name} ({obj.view})</option>
          ))}
        </select>
      </div>

      {/* Item (for use_item_on) */}
      {event === "use_item_on" && (
        <div className="space-y-1">
          <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">With item</label>
          <select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
          >
            <option value="">Select item...</option>
            {room.objects.filter((o) => o.collectible).map((obj) => (
              <option key={obj.id} value={obj.id}>{obj.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Condition (optional) */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">Condition (optional)</label>
        <div className="flex gap-2">
          <select
            value={conditionType}
            onChange={(e) => setConditionType(e.target.value as "" | "has_item" | "not_has_item")}
            className="flex-1 bg-white/5 border border-white/10 px-2 py-2 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
          >
            <option value="">None</option>
            <option value="has_item">Has item</option>
            <option value="not_has_item">Doesn't have item</option>
          </select>
          {conditionType && (
            <select
              value={conditionItemId}
              onChange={(e) => setConditionItemId(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 px-2 py-2 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
            >
              <option value="">Select...</option>
              {room.objects.filter((o) => o.collectible).map((obj) => (
                <option key={obj.id} value={obj.id}>{obj.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">Then do</label>
        {actions.map((action, i) => (
          <ActionRow
            key={i}
            action={action}
            room={room}
            onUpdate={(updates) => updateAction(i, updates)}
            onRemove={() => removeAction(i)}
          />
        ))}
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) addAction(e.target.value as ActionType);
          }}
          className="w-full bg-white/5 border border-dashed border-white/20 px-3 py-2 text-xs font-mono text-white/40 outline-none focus:border-[#ccff00]"
        >
          <option value="">+ Add action...</option>
          {ACTIONS.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleSave}
          disabled={!sourceId || actions.length === 0}
          className="flex-1 bg-[#ccff00] text-black font-mono text-xs uppercase tracking-widest font-bold rounded-none hover:bg-[#b8e600] disabled:opacity-30"
        >
          Save
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-white rounded-none"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

function ActionRow({ action, room, onUpdate, onRemove }: { action: Action; room: Room; onUpdate: (u: Partial<Action>) => void; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2">
      <span className="font-mono text-[10px] text-[#ccff00] uppercase shrink-0">{action.type.replace(/_/g, " ")}</span>

      {(action.type === "reveal" || action.type === "add_to_inventory" || action.type === "remove_from_inventory") && (
        <select
          value={action.targetId ?? ""}
          onChange={(e) => onUpdate({ targetId: e.target.value })}
          className="flex-1 bg-transparent border-none text-xs font-mono text-white outline-none"
        >
          <option value="">target...</option>
          {room.objects.map((obj) => (
            <option key={obj.id} value={obj.id}>{obj.name}</option>
          ))}
        </select>
      )}

      {action.type === "show_message" && (
        <input
          type="text"
          value={action.message ?? ""}
          onChange={(e) => onUpdate({ message: e.target.value })}
          placeholder="Message text..."
          className="flex-1 bg-transparent border-none text-xs font-mono text-white outline-none placeholder:text-white/20"
        />
      )}

      {action.type === "play_meme" && (
        <select
          value={action.memeId ?? ""}
          onChange={(e) => onUpdate({ memeId: e.target.value })}
          className="flex-1 bg-transparent border-none text-xs font-mono text-white outline-none"
        >
          <option value="">meme...</option>
          <option value="rickroll">Rickroll</option>
          <option value="doge">Doge</option>
          <option value="surprised-pikachu">Surprised Pikachu</option>
          <option value="coffin-dance">Coffin Dance</option>
          <option value="this-is-fine">This Is Fine</option>
          <option value="you-died">You Died</option>
        </select>
      )}

      <button
        onClick={onRemove}
        className="font-mono text-[9px] text-red-400/60 hover:text-red-400 shrink-0"
      >
        ×
      </button>
    </div>
  );
}
