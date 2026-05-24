import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { useDeleteRoom, useRooms } from "~/hooks/rooms/use-rooms";
import { signOut, useSession } from "~/lib/auth-client";


interface DashboardProps {
  onCreateRoom: () => void;
  onEditRoom: (id: string) => void;
  onPlayRoom: (id: string) => void;
}

export function Dashboard({
  onCreateRoom,
  onEditRoom,
  onPlayRoom,
}: DashboardProps) {
  const { data: session } = useSession();
  const { data: rooms, isLoading } = useRooms();
  const deleteRoom = useDeleteRoom();
  const roomList = rooms ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-4 h-4 bg-foreground" />
            <span className="font-mono text-sm font-bold">Lockd</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {session?.user?.name}
          </span>
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-none px-3 py-1 h-auto"
          >
            Log out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">My Rooms</h1>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              Create, edit, and share your escape rooms
            </p>
          </div>
          <Button
            onClick={onCreateRoom}
            className="bg-foreground text-background font-mono text-xs uppercase tracking-widest font-bold rounded-none hover:bg-foreground/90 px-5 py-2.5"
          >
            + New Room
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <span className="font-mono text-xs text-muted-foreground animate-pulse">
              Loading...
            </span>
          </div>
        )}

        {!isLoading && roomList.length === 0 && (
          <div className="border border-dashed border-border py-20 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              You haven't created any rooms yet
            </p>
            <Button
              onClick={onCreateRoom}
              className="bg-foreground text-background font-mono text-xs uppercase tracking-widest font-bold rounded-none hover:bg-foreground/90 px-5 py-2.5"
            >
              Create your first room
            </Button>
          </div>
        )}

        {roomList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roomList.map((r) => (
              <RoomCard
                key={r.id}
                room={r}
                onEdit={() => onEditRoom(r.id)}
                onPlay={() => onPlayRoom(r.id)}
                onDelete={() => {
                  if (confirm(`Delete "${r.name}"?`)) {
                    deleteRoom.mutate(r.id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function RoomCard({
  room,
  onEdit,
  onPlay,
  onDelete,
}: {
  room: {
    id: string;
    name: string;
    description: string | null;
    published: boolean;
    updatedAt: string;
  };
  onEdit: () => void;
  onPlay: () => void;
  onDelete: () => void;
}) {
  const updatedAt = new Date(room.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border border-border p-5 group hover:border-foreground/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm truncate">{room.name}</h3>
          {room.description && (
            <p className="font-mono text-[10px] text-muted-foreground mt-1 truncate">
              {room.description}
            </p>
          )}
        </div>
        {room.published && (
          <span className="font-mono text-[8px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 shrink-0">
            live
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-mono text-[9px] text-muted-foreground/60">
          {updatedAt}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPlay}
            className="font-mono text-[9px] uppercase tracking-widest text-primary hover:text-primary/80"
          >
            Play
          </button>
          <button
            onClick={onEdit}
            className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="font-mono text-[9px] uppercase tracking-widest text-red-400/60 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
