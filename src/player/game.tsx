import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { GameState, Room } from "../shared/types";
import { handleClick, handleUseItemOn, initializeState } from "./interaction-engine";
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
    [room, state, selectedItem]
  );

  const dismissMeme = useCallback(() => {
    setState((s) => ({ ...s, activeMeme: null }));
  }, []);

  const dismissMessage = useCallback(() => {
    setState((s) => ({ ...s, activeMessage: null }));
  }, []);

  const navigate = useCallback(
    (dir: "left" | "right") => {
      setState((s) => ({
        ...s,
        currentView: dir === "left" ? PREV_VIEW[s.currentView] : NEXT_VIEW[s.currentView],
      }));
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") navigate("left");
      if (e.key === "ArrowRight" || e.key === "d") navigate("right");
    },
    [navigate]
  );

  return (
    <div
      className="flex flex-col h-screen bg-background"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <Button variant="ghost" size="sm" onClick={onExit}>
          ← Exit
        </Button>
        <h1 className="text-lg font-bold">{room.name}</h1>
        <Badge variant="outline">{room.objects.length} objects</Badge>
      </header>

      {/* Room View */}
      <div className="flex-1 relative p-4">
        <div className="relative w-full h-full max-w-4xl mx-auto">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-14 w-10 opacity-80 hover:opacity-100"
          >
            ‹
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-14 w-10 opacity-80 hover:opacity-100"
          >
            ›
          </Button>

          <RoomView room={room} state={state} onClickObject={onClickObject} />
        </div>
      </div>

      {/* Inventory */}
      <Inventory
        items={state.inventory}
        room={room}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
      />

      {/* Win/Fail overlay */}
      {state.solved && <WinScreen onExit={onExit} />}
      {state.failed && <FailScreen onExit={onExit} />}

      {/* Message overlay */}
      {state.activeMessage && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 cursor-pointer backdrop-blur-sm"
          onClick={dismissMessage}
        >
          <Card className="max-w-md animate-bounce-in">
            <CardContent className="p-6 text-center space-y-3">
              <p className="text-lg">{state.activeMessage}</p>
              <p className="text-muted-foreground text-sm">click to dismiss</p>
            </CardContent>
          </Card>
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
      <div className="text-center space-y-6 animate-bounce-in">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          YOU ESCAPED!
        </h2>
        <p className="text-muted-foreground text-xl">Congrats, big brain energy</p>
        <Button size="lg" onClick={onExit} className="bg-green-600 hover:bg-green-500">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

function FailScreen({ onExit }: { onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center space-y-6 animate-bounce-in">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
          GAME OVER
        </h2>
        <p className="text-muted-foreground text-xl">skill issue tbh</p>
        <Button size="lg" variant="destructive" onClick={onExit}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
