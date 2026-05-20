import { Badge } from "@/components/ui/badge";
import type { Direction, GameState, Room, RoomObject } from "../shared/types";
import { getObjectDef } from "../shared/objects";

interface RoomViewProps {
  room: Room;
  state: GameState;
  onClickObject: (id: string) => void;
}

const VIEW_LABELS: Record<Direction, string> = {
  north: "North Wall",
  east: "East Wall",
  south: "South Wall",
  west: "West Wall",
};

const NEXT_VIEW: Record<Direction, Direction> = {
  north: "east",
  east: "south",
  south: "west",
  west: "north",
};

const PREV_VIEW: Record<Direction, Direction> = {
  north: "west",
  west: "south",
  south: "east",
  east: "north",
};

export function RoomView({ room, state, onClickObject }: RoomViewProps) {
  const visibleObjects = room.objects.filter(
    (obj) => obj.view === state.currentView && !state.hiddenObjects.has(obj.id)
  );

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden select-none border border-border/50">
      {/* Wall background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900" />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-amber-950/80 to-amber-900/40" />

      {/* Ceiling accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20" />

      {/* View label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <Badge variant="secondary" className="text-xs">
          {VIEW_LABELS[state.currentView]}
        </Badge>
      </div>

      {/* Navigation hints */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-xs">
        ← {PREV_VIEW[state.currentView]}
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-xs">
        {NEXT_VIEW[state.currentView]} →
      </div>

      {/* Objects */}
      {visibleObjects.map((obj) => (
        <RoomObjectView key={obj.id} object={obj} onClick={() => onClickObject(obj.id)} />
      ))}
    </div>
  );
}

interface RoomObjectViewProps {
  object: RoomObject;
  onClick: () => void;
}

function RoomObjectView({ object, onClick }: RoomObjectViewProps) {
  const def = getObjectDef(object.type);

  return (
    <button
      onClick={onClick}
      className="absolute cursor-pointer hover:brightness-125 hover:scale-105 transition-all rounded-md border-2 border-transparent hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-400/10 group"
      style={{
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        backgroundColor: def?.color ?? "#666",
      }}
      title={object.name}
    >
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-foreground/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-1.5 py-0.5 rounded">
        {object.name}
      </span>
    </button>
  );
}

export { NEXT_VIEW, PREV_VIEW };
