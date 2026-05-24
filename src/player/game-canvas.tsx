import { useEffect, useRef } from "react";
import { createGameEngine, type GameEngine } from "../engine/game-loop";
import type { GameState, Room } from "../shared/types";

interface GameCanvasProps {
  room: Room;
  initialState: GameState;
  onStateChange: (state: GameState) => void;
  onInteract: (objectId: string, engineState: GameState) => GameState | void;
}

export function GameCanvas({
  room,
  initialState,
  onStateChange,
  onInteract,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const onInteractRef = useRef(onInteract);
  onInteractRef.current = onInteract;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const engine = createGameEngine(canvas, room, initialState);
    engineRef.current = engine;

    engine.onInteract((objectId) => {
      const currentState = engine.getState();
      const newState = onInteractRef.current(objectId, currentState);
      if (newState) {
        // Detect new items added to inventory
        const addedItems = newState.inventory.filter(
          (id) => !currentState.inventory.includes(id),
        );
        if (addedItems.length > 0) {
          // Suppress message for collectibles and trigger pickup animation
          newState.activeMessage = null;
          newState.messageSourceId = null;
          for (const itemId of addedItems) {
            const obj = room.objects.find((o) => o.id === itemId);
            if (obj) {
              const cx = obj.position.x + obj.size.width / 2;
              const cy = obj.position.y;
              engine.triggerPickup(cx, cy, obj.name);
            }
          }
        }
        engine.setState(newState);
        if (newState.solved && !currentState.solved) engine.triggerWin();
        if (newState.failed && !currentState.failed) engine.triggerFail();
      }
    });

    engine.start();

    const syncInterval = setInterval(() => {
      onStateChange(engine.getState());
    }, 100);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        engine.resize(width, height);
      }
    });
    resizeObserver.observe(container);

    return () => {
      engine.stop();
      resizeObserver.disconnect();
      clearInterval(syncInterval);
      engineRef.current = null;
    };
  }, [room]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
