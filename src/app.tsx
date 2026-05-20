import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Game } from "./player/game";
import { Home } from "./home";
import { Builder } from "./builder/builder";
import { TEST_ROOM } from "./player/test-room";

type Screen = "home" | "play" | "build";

export function App() {
	const [screen, setScreen] = useState<Screen>("home");

	return (
		<TooltipProvider>
			{screen === "play" ? (
				<Game room={TEST_ROOM} onExit={() => setScreen("home")} />
			) : screen === "build" ? (
				<Builder onExit={() => setScreen("home")} />
			) : (
				<Home
					onPlay={() => setScreen("play")}
					onBuild={() => setScreen("build")}
				/>
			)}
		</TooltipProvider>
	);
}
