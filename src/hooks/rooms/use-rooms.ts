import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Room } from "~/shared/types";

interface RoomListItem {
  id: string;
  name: string;
  description: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useRooms() {
  return useQuery<RoomListItem[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    },
  });
}

export function useSaveRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (room: Room) => {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: room.id,
          name: room.name,
          description: room.description,
          data: room,
        }),
      });
      if (!res.ok) throw new Error("Failed to save room");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete room");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
}

export function useLoadRoom(id: string | null) {
  return useQuery<Room>({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await fetch(`/api/rooms/${id}`);
      if (!res.ok) throw new Error("Failed to load room");
      const data = await res.json();
      return data.data as Room;
    },
    enabled: !!id,
  });
}
