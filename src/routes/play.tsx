import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Game } from "~/player/game";
import { TEST_ROOM } from "~/player/test-room";

export const Route = createFileRoute("/play")({
  component: PlayPage,
});

function PlayPage() {
  const navigate = useNavigate();

  return <Game room={TEST_ROOM} onExit={() => navigate({ to: "/" })} />;
}
