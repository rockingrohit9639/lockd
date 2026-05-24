import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Game } from "~/player/game";
import { useLoadRoom } from "~/hooks/rooms/use-rooms";
import { TEST_ROOM } from "~/player/test-room";
import { PROFESSORS_STUDY } from "~/player/professors-study";

const BUILT_IN_ROOMS: Record<string, typeof TEST_ROOM> = {
  "test-room": TEST_ROOM,
  "professors-study": PROFESSORS_STUDY,
};

export const Route = createFileRoute("/play")({
  component: PlayPage,
  validateSearch: (search: Record<string, unknown>) => ({
    room: (search.room as string) || undefined,
  }),
});

function PlayPage() {
  const navigate = useNavigate();
  const { room: roomId } = Route.useSearch();

  const builtIn = roomId ? BUILT_IN_ROOMS[roomId] : undefined;
  const { data: room, isLoading } = useLoadRoom(
    roomId && !builtIn ? roomId : null,
  );

  if (roomId && !builtIn && isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <span className="font-mono text-xs text-white/50 animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  const activeRoom = builtIn ?? (roomId && room ? room : PROFESSORS_STUDY);

  return (
    <Game
      room={activeRoom}
      onExit={() => navigate({ to: "/dashboard" })}
    />
  );
}
