import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { GameState, Room } from "../shared/types";
import {
  handleClick,
  handleUseItemOn,
  initializeState,
} from "./interaction-engine";
import { Inventory } from "./inventory";
import { MemePlayer } from "./meme-player";
import { NEXT_VIEW, PREV_VIEW, RoomView } from "./room-view";

interface GameProps {
  room: Room;
  onExit: () => void;
}

export function Game({ room, onExit }: GameProps) {
  const [state, setState] = useState<GameState>(() => initializeState(room));
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const onClickObject = useCallback(
    (objectId: string) => {
      if (state.solved || state.failed) return;

      let newState: GameState;
      if (selectedItem) {
        newState = handleUseItemOn(selectedItem, objectId, room, state);
        setSelectedItem(null);
      } else {
        newState = handleClick(objectId, room, state);
      }
      setState(newState);
    },
    [room, state, selectedItem],
  );

  const dismissMeme = useCallback(() => {
    setState((s) => ({ ...s, activeMeme: null }));
  }, []);

  const dismissMessage = useCallback(() => {
    setState((s) => ({ ...s, activeMessage: null }));
  }, []);

  const navigate = useCallback((dir: "left" | "right") => {
    setState((s) => ({
      ...s,
      currentView:
        dir === "left" ? PREV_VIEW[s.currentView] : NEXT_VIEW[s.currentView],
    }));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a") navigate("left");
      if (e.key === "ArrowRight" || e.key === "d") navigate("right");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
        <Button
          variant="ghost"
          onClick={onExit}
          className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white rounded-none px-3 py-1 h-auto"
        >
          ← Exit
        </Button>
        <span className="font-mono text-sm font-bold">{room.name}</span>
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
          {state.currentView}
        </span>
      </header>

      {/* Main: Room + Inventory sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Room — takes remaining width */}
        <div className="flex-1 relative">
          {/* Nav buttons */}
          <button
            onClick={() => navigate("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-14 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors font-mono"
          >
            ‹
          </button>
          <button
            onClick={() => navigate("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-14 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors font-mono"
          >
            ›
          </button>

          <RoomView room={room} state={state} onClickObject={onClickObject} />
        </div>

        {/* Inventory sidebar */}
        <aside className="w-56 shrink-0">
          <Inventory
            items={state.inventory}
            room={room}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
        </aside>
      </div>

      {/* Win/Fail overlay */}
      {state.solved && <WinScreen onExit={onExit} />}
      {state.failed && <FailScreen onExit={onExit} />}

      {/* Message overlay */}
      {state.activeMessage && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 cursor-pointer backdrop-blur-sm"
          onClick={dismissMessage}
        >
          <div className="border border-white/10 bg-[#0a0a0a] px-8 py-6 max-w-md text-center space-y-3">
            <p className="font-mono text-sm text-white">
              {state.activeMessage}
            </p>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
              click to dismiss
            </p>
          </div>
        </div>
      )}

      {/* Meme overlay */}
      {state.activeMeme && (
        <MemePlayer memeId={state.activeMeme} onDismiss={dismissMeme} />
      )}
    </div>
  );
}

function WinScreen({ onExit }: { onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <h2 className="font-mono text-5xl font-bold text-[#ccff00] uppercase tracking-widest">
          Escaped
        </h2>
        <p className="font-mono text-sm text-white/50">you made it out</p>
        <Button
          onClick={onExit}
          className="bg-[#ccff00] text-black font-mono text-xs uppercase tracking-widest font-bold rounded-none hover:bg-[#b8e600] px-6 py-2"
        >
          Done
        </Button>
      </div>
    </div>
  );
}

function FailScreen({ onExit }: { onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <h2 className="font-mono text-5xl font-bold text-red-500 uppercase tracking-widest">
          Failed
        </h2>
        <p className="font-mono text-sm text-white/50">skill issue</p>
        <Button
          variant="ghost"
          onClick={onExit}
          className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white rounded-none px-6 py-2 border border-white/10"
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
