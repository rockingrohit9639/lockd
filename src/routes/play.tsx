import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Game } from "~/player/game";
import { useLoadRoom } from "~/hooks/rooms/use-rooms";
import { TEST_ROOM } from "~/player/test-room";

export const Route = createFileRoute("/play")({
  component: PlayPage,
  validateSearch: (search: Record<string, unknown>) => ({
    room: (search.room as string) || undefined,
  }),
});

function PlayPage() {
  const navigate = useNavigate();
  const { room: roomId } = Route.useSearch();
  const { data: room, isLoading } = useLoadRoom(roomId ?? null);

  if (roomId && isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <span className="font-mono text-xs text-white/50 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <Game
      room={roomId && room ? room : TEST_ROOM}
      onExit={() => navigate({ to: "/dashboard" })}
    />
  );
}
