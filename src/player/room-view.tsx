import type { Direction, GameState, Room, RoomObject } from "../shared/types";
import { getObjectDef } from "../shared/objects";
import { ObjectSprite, hasSprite } from "../shared/object-sprites";

interface RoomViewProps {
  room: Room;
  state: GameState;
  onClickObject: (id: string) => void;
}

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
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Wall background */}
      <div
        className="absolute inset-0"
        style={{
          background: "#1a1a1a url('https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1200&q=80&fit=crop') center/cover",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4 border-t border-white/[0.06]"
        style={{
          background: "#111 url('https://images.unsplash.com/photo-1573869908170-64b53a60d8da?w=1200&q=80&fit=crop') center/cover",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* View label */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">
        {state.currentView} wall
      </div>

      {/* Navigation hints */}
      <div className="absolute left-4 bottom-[26%] font-mono text-[10px] text-white/30 uppercase tracking-widest">
        ← {PREV_VIEW[state.currentView]}
      </div>
      <div className="absolute right-4 bottom-[26%] font-mono text-[10px] text-white/30 uppercase tracking-widest">
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
  const showSprite = hasSprite(object.type);

  if (showSprite) {
    return (
      <div
        onClick={onClick}
        className="absolute [&_svg]:cursor-pointer [&_svg]:pointer-events-auto"
        style={{
          left: `${object.position.x}%`,
          top: `${object.position.y}%`,
          width: `${object.size.width}px`,
          height: `${object.size.height}px`,
          pointerEvents: "none",
        }}
      >
        <ObjectSprite type={object.type} width={object.size.width} height={object.size.height} />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="absolute cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        backgroundColor: def?.color ?? "#666",
      }}
    />
  );
}

export { NEXT_VIEW, PREV_VIEW };
