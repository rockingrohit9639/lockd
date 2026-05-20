import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Game } from "./player/game";
import { Home } from "./home";
import { TEST_ROOM } from "./player/test-room";

type Screen = "home" | "play";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <TooltipProvider>
      {screen === "play" ? (
        <Game room={TEST_ROOM} onExit={() => setScreen("home")} />
      ) : (
        <Home onPlay={() => setScreen("play")} />
      )}
    </TooltipProvider>
  );
}
