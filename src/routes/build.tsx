import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Builder } from "~/builder/builder";
import { useLoadRoom } from "~/hooks/rooms/use-rooms";

export const Route = createFileRoute("/build")({
  component: BuildPage,
  validateSearch: (search: Record<string, unknown>) => ({
    room: (search.room as string) || undefined,
  }),
});

function BuildPage() {
  const navigate = useNavigate();
  const { room: roomId } = Route.useSearch();
  const { data: room, isLoading } = useLoadRoom(roomId ?? null);

  if (roomId && isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <span className="font-mono text-xs text-muted-foreground animate-pulse">
          Loading room...
        </span>
      </div>
    );
  }

  return (
    <Builder
      room={roomId ? room : undefined}
      onExit={() => navigate({ to: "/dashboard" })}
    />
  );
}
