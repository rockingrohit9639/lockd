import { useState } from "react";
import { Button } from "~/components/ui/button";
import type {
  Action,
  ActionType,
  Condition,
  Room,
  Trigger,
  TriggerEvent,
} from "../shared/types";

interface TriggerBuilderProps {
  room: Room;
  onAddTrigger: (trigger: Trigger) => void;
  onDeleteTrigger: (id: string) => void;
  onUpdateTrigger?: (trigger: Trigger) => void;
}

const EVENTS: { value: TriggerEvent; label: string; desc: string }[] = [
  { value: "interact", label: "Interact", desc: "Player presses E" },
  { value: "use_item_on", label: "Use item on", desc: "Use inventory item" },
];

const ACTIONS: { value: ActionType; label: string; color: string }[] = [
  { value: "reveal", label: "Reveal object", color: "text-blue-500" },
  { value: "hide", label: "Hide object", color: "text-gray-500" },
  { value: "add_to_inventory", label: "Collect item", color: "text-emerald-500" },
  { value: "remove_from_inventory", label: "Remove item", color: "text-orange-500" },
  { value: "show_message", label: "Show message", color: "text-violet-500" },
  { value: "play_meme", label: "Play meme", color: "text-pink-500" },
  { value: "set_flag", label: "Set flag", color: "text-cyan-500" },
  { value: "clear_flag", label: "Clear flag", color: "text-slate-500" },
  { value: "win", label: "Win game", color: "text-emerald-400" },
  { value: "fail", label: "Fail game", color: "text-red-500" },
];

const CONDITIONS: { value: Condition["type"]; label: string }[] = [
  { value: "has_item", label: "Has item" },
  { value: "not_has_item", label: "Doesn't have item" },
  { value: "flag_set", label: "Flag is set" },
  { value: "flag_not_set", label: "Flag not set" },
];

export function TriggerBuilder({
  room,
  onAddTrigger,
  onDeleteTrigger,
  onUpdateTrigger,
}: TriggerBuilderProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // Triggers ({room.triggers.length})
        </span>
        <Button
          variant="ghost"
          onClick={() => setIsAdding(true)}
          className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 rounded-none px-2 py-1 h-auto"
        >
          + Add
        </Button>
      </div>

      {/* Existing triggers */}
      {room.triggers.map((trigger) =>
        editingId === trigger.id ? (
          <TriggerForm
            key={trigger.id}
            room={room}
            initial={trigger}
            onSave={(t) => {
              onUpdateTrigger?.(t);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <TriggerCard
            key={trigger.id}
            trigger={trigger}
            room={room}
            onEdit={() => setEditingId(trigger.id)}
            onDelete={() => onDeleteTrigger(trigger.id)}
          />
        ),
      )}

      {/* New trigger form */}
      {isAdding && (
        <TriggerForm
          room={room}
          onSave={(trigger) => {
            onAddTrigger(trigger);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {room.triggers.length === 0 && !isAdding && (
        <p className="font-mono text-xs text-muted-foreground/50 text-center py-8">
          No triggers yet. Add one to make objects interactive.
        </p>
      )}
    </div>
  );
}

function TriggerCard({
  trigger,
  room,
  onEdit,
  onDelete,
}: {
  trigger: Trigger;
  room: Room;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const source = room.objects.find((o) => o.id === trigger.sourceId);
  const item = trigger.itemId
    ? room.objects.find((o) => o.id === trigger.itemId)
    : null;

  return (
    <div className="border border-border group hover:border-foreground/20 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-primary/10 text-primary">
            {trigger.event === "use_item_on" ? "use" : trigger.event}
          </span>
          <span className="font-mono text-[10px] text-foreground/70">
            {source?.name ?? "?"}
          </span>
          {item && (
            <span className="font-mono text-[10px] text-muted-foreground">
              + {item.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="font-mono text-[9px] text-muted-foreground hover:text-foreground px-1"
          >
            edit
          </button>
          <button
            onClick={onDelete}
            className="font-mono text-[9px] text-red-400/60 hover:text-red-400 px-1"
          >
            ×
          </button>
        </div>
      </div>

      {/* Flow visualization */}
      <div className="px-3 py-2 space-y-1">
        {/* Conditions */}
        {trigger.conditions.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] uppercase tracking-widest text-amber-500/70 shrink-0">
              if
            </span>
            <div className="flex flex-wrap gap-1">
              {trigger.conditions.map((c, i) => (
                <ConditionBadge key={i} condition={c} room={room} />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-start gap-1.5">
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground shrink-0 pt-0.5">
            do
          </span>
          <div className="flex flex-wrap gap-1">
            {trigger.actions.map((a, i) => (
              <ActionBadge key={i} action={a} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionBadge({
  condition,
  room,
}: { condition: Condition; room: Room }) {
  let label = "";
  if (condition.type === "has_item" || condition.type === "not_has_item") {
    const obj = room.objects.find((o) => o.id === condition.itemId);
    const prefix = condition.type === "not_has_item" ? "!" : "";
    label = `${prefix}${obj?.name ?? "?"}`;
  } else {
    const prefix = condition.type === "flag_not_set" ? "!" : "";
    label = `${prefix}flag:${condition.flag ?? "?"}`;
  }

  return (
    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/20">
      {label}
    </span>
  );
}

function ActionBadge({ action, room }: { action: Action; room: Room }) {
  const def = ACTIONS.find((a) => a.value === action.type);
  let detail = "";

  switch (action.type) {
    case "reveal":
    case "hide":
    case "add_to_inventory":
    case "remove_from_inventory": {
      const obj = room.objects.find((o) => o.id === action.targetId);
      detail = obj?.name ?? "?";
      break;
    }
    case "show_message":
      detail = action.message
        ? action.message.length > 20
          ? `${action.message.slice(0, 20)}...`
          : action.message
        : "?";
      break;
    case "play_meme":
      detail = action.memeId ?? "?";
      break;
    case "unlock":
    case "lock":
    case "set_flag":
    case "clear_flag":
      detail = action.flag ?? "?";
      break;
  }

  return (
    <span
      className={`font-mono text-[9px] px-1.5 py-0.5 bg-foreground/5 border border-border ${def?.color ?? "text-foreground/70"}`}
    >
      {def?.label ?? action.type}
      {detail && <span className="text-foreground/50 ml-1">{detail}</span>}
    </span>
  );
}

function TriggerForm({
  room,
  initial,
  onSave,
  onCancel,
}: {
  room: Room;
  initial?: Trigger;
  onSave: (t: Trigger) => void;
  onCancel: () => void;
}) {
  const [event, setEvent] = useState<TriggerEvent>(
    initial?.event ?? "interact",
  );
  const [sourceId, setSourceId] = useState(
    initial?.sourceId ?? room.objects[0]?.id ?? "",
  );
  const [itemId, setItemId] = useState(initial?.itemId ?? "");
  const [conditions, setConditions] = useState<Condition[]>(
    initial?.conditions ?? [],
  );
  const [actions, setActions] = useState<Action[]>(initial?.actions ?? []);

  function addCondition() {
    setConditions([...conditions, { type: "has_item", itemId: "" }]);
  }

  function updateCondition(index: number, updates: Partial<Condition>) {
    setConditions(
      conditions.map((c, i) => (i === index ? { ...c, ...updates } : c)),
    );
  }

  function removeCondition(index: number) {
    setConditions(conditions.filter((_, i) => i !== index));
  }

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
    const trigger: Trigger = {
      id: initial?.id ?? crypto.randomUUID(),
      event,
      sourceId,
      ...(event === "use_item_on" ? { itemId } : {}),
      conditions: conditions.filter(
        (c) => c.itemId || c.flag,
      ),
      actions,
    };
    onSave(trigger);
  }

  const isEditing = !!initial;

  return (
    <div className="border border-primary/30 bg-primary/5 overflow-hidden">
      {/* Form header */}
      <div className="px-3 py-2 bg-primary/10 border-b border-primary/20">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          {isEditing ? "Edit Trigger" : "New Trigger"}
        </span>
      </div>

      <div className="p-3 space-y-3">
        {/* Event + Source row */}
        <div className="space-y-2">
          <label className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block">
            When player...
          </label>
          <div className="flex gap-2">
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value as TriggerEvent)}
              className="bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            >
              {EVENTS.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="flex-1 bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            >
              {room.objects.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>

          {event === "use_item_on" && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted-foreground uppercase shrink-0">
                with
              </span>
              <select
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                className="flex-1 bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
              >
                <option value="">Select item...</option>
                {room.objects
                  .filter((o) => o.collectible)
                  .map((obj) => (
                    <option key={obj.id} value={obj.id}>
                      {obj.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Conditions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[9px] text-amber-600 uppercase tracking-widest">
              Conditions
            </label>
            <button
              onClick={addCondition}
              className="font-mono text-[9px] text-muted-foreground hover:text-foreground"
            >
              + add
            </button>
          </div>
          {conditions.map((cond, i) => (
            <ConditionRow
              key={i}
              condition={cond}
              room={room}
              onUpdate={(u) => updateCondition(i, u)}
              onRemove={() => removeCondition(i)}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <label className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block">
            Then do...
          </label>
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
            className="w-full bg-accent border border-dashed border-border px-2 py-1.5 text-xs font-mono text-muted-foreground outline-none focus:border-primary"
          >
            <option value="">+ Add action...</option>
            {ACTIONS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        {/* Save / Cancel */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={handleSave}
            disabled={!sourceId || actions.length === 0}
            className="flex-1 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-bold rounded-none hover:bg-primary/90 h-7 disabled:opacity-30"
          >
            {isEditing ? "Update" : "Save"}
          </Button>
          <Button
            variant="ghost"
            onClick={onCancel}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none h-7"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConditionRow({
  condition,
  room,
  onUpdate,
  onRemove,
}: {
  condition: Condition;
  room: Room;
  onUpdate: (u: Partial<Condition>) => void;
  onRemove: () => void;
}) {
  const isFlag =
    condition.type === "flag_set" || condition.type === "flag_not_set";

  return (
    <div className="flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/20 p-1.5">
      <select
        value={condition.type}
        onChange={(e) => onUpdate({ type: e.target.value as Condition["type"] })}
        className="bg-transparent border-none text-[10px] font-mono text-amber-600 outline-none"
      >
        {CONDITIONS.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {isFlag ? (
        <input
          type="text"
          value={condition.flag ?? ""}
          onChange={(e) => onUpdate({ flag: e.target.value })}
          placeholder="flag name"
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none placeholder:text-muted-foreground/50"
        />
      ) : (
        <select
          value={condition.itemId ?? ""}
          onChange={(e) => onUpdate({ itemId: e.target.value })}
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none"
        >
          <option value="">select...</option>
          {room.objects
            .filter((o) => o.collectible)
            .map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
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

function ActionRow({
  action,
  room,
  onUpdate,
  onRemove,
}: {
  action: Action;
  room: Room;
  onUpdate: (u: Partial<Action>) => void;
  onRemove: () => void;
}) {
  const def = ACTIONS.find((a) => a.value === action.type);

  return (
    <div className="flex items-center gap-1.5 bg-foreground/[0.02] border border-border p-1.5">
      <span
        className={`font-mono text-[9px] uppercase shrink-0 ${def?.color ?? "text-foreground/70"}`}
      >
        {def?.label ?? action.type}
      </span>

      {(action.type === "reveal" ||
        action.type === "hide" ||
        action.type === "add_to_inventory" ||
        action.type === "remove_from_inventory") && (
        <select
          value={action.targetId ?? ""}
          onChange={(e) => onUpdate({ targetId: e.target.value })}
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none"
        >
          <option value="">target...</option>
          {room.objects.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {obj.name}
            </option>
          ))}
        </select>
      )}

      {action.type === "show_message" && (
        <input
          type="text"
          value={action.message ?? ""}
          onChange={(e) => onUpdate({ message: e.target.value })}
          placeholder="Message text..."
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none placeholder:text-muted-foreground/50"
        />
      )}

      {action.type === "play_meme" && (
        <select
          value={action.memeId ?? ""}
          onChange={(e) => onUpdate({ memeId: e.target.value })}
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none"
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

      {(action.type === "unlock" || action.type === "lock" || action.type === "set_flag" || action.type === "clear_flag") && (
        <input
          type="text"
          value={action.flag ?? ""}
          onChange={(e) => onUpdate({ flag: e.target.value })}
          placeholder="flag name"
          className="flex-1 bg-transparent border-none text-[10px] font-mono text-foreground outline-none placeholder:text-muted-foreground/50"
        />
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
