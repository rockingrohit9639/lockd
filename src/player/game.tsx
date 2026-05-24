import { useCallback, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import type { GameState, Room } from "../shared/types";
import { GameCanvas } from "./game-canvas";
import { HudInventory } from "./hud-inventory";
import {
  handleInteract,
  handleUseItemOn,
  initializeState,
} from "./interaction-engine";
import { MemePlayer } from "./meme-player";

interface GameProps {
  room: Room;
  onExit: () => void;
}

export function Game({ room, onExit }: GameProps) {
  const [state, setState] = useState<GameState>(() => initializeState(room));
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const selectedItemRef = useRef(selectedItem);
  selectedItemRef.current = selectedItem;

  const onInteract = useCallback(
    (objectId: string, engineState: GameState): GameState | void => {
      if (engineState.solved || engineState.failed) return;

      let newState: GameState;
      if (selectedItemRef.current) {
        newState = handleUseItemOn(
          selectedItemRef.current,
          objectId,
          room,
          engineState,
        );
        setSelectedItem(null);
      } else {
        newState = handleInteract(objectId, room, engineState);
      }
      setState(newState);
      return newState;
    },
    [room],
  );

  const onStateChange = useCallback((newState: GameState) => {
    setState(newState);
  }, []);

  const dismissMeme = useCallback(() => {
    setState((s) => ({ ...s, activeMeme: null }));
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Fullscreen canvas */}
      <GameCanvas
        room={room}
        initialState={state}
        onStateChange={onStateChange}
        onInteract={onInteract}
        hasSelectedItem={!!selectedItem}
      />

      {/* HUD Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            onClick={onExit}
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 rounded-none px-3 py-1.5 h-auto backdrop-blur-sm bg-black/30 border border-white/10"
          >
            ← Exit
          </Button>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 backdrop-blur-sm bg-black/30 px-3 py-1.5 border border-white/10">
            {room.name}
          </span>
        </div>

        {/* Controls hint — bottom left */}
        <div className="absolute bottom-4 left-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
            WASD move · E interact
          </span>
        </div>

        {/* Inventory hotbar — bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
          <HudInventory
            items={state.inventory}
            room={room}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
        </div>

        {/* Selected item hint */}
        {selectedItem && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest animate-pulse">
              Click or press E near an object to use
            </span>
          </div>
        )}
      </div>

      {/* Win/Fail overlay */}
      {state.solved && <WinScreen onExit={onExit} />}
      {state.failed && <FailScreen onExit={onExit} />}

      {/* Meme overlay */}
      {state.activeMeme && (
        <MemePlayer memeId={state.activeMeme} onDismiss={dismissMeme} />
      )}
    </div>
  );
}

function WinScreen({ onExit }: { onExit: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <h2 className="font-mono text-5xl font-bold text-emerald-400 uppercase tracking-widest">
          Escaped
        </h2>
        <p className="font-mono text-sm text-white/50">you made it out</p>
        <Button
          onClick={onExit}
          className="pointer-events-auto bg-emerald-500 text-black font-mono text-xs uppercase tracking-widest font-bold rounded-none hover:bg-emerald-400 px-6 py-2"
        >
          Done
        </Button>
      </div>
    </div>
  );
}

function FailScreen({ onExit }: { onExit: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <h2 className="font-mono text-5xl font-bold text-red-500 uppercase tracking-widest">
          Failed
        </h2>
        <p className="font-mono text-sm text-white/50">skill issue</p>
        <Button
          variant="ghost"
          onClick={onExit}
          className="pointer-events-auto font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white rounded-none px-6 py-2 border border-white/20"
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
