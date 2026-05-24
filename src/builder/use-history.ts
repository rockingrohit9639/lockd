import { useCallback, useRef, useState } from "react";
import type { Room } from "../shared/types";

const MAX_HISTORY = 50;

export function useHistory(initial: Room) {
  const [room, setRoomRaw] = useState<Room>(initial);
  const past = useRef<Room[]>([]);
  const future = useRef<Room[]>([]);

  const setRoom = useCallback((updater: Room | ((prev: Room) => Room)) => {
    setRoomRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      past.current.push(prev);
      if (past.current.length > MAX_HISTORY) past.current.shift();
      future.current = [];
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setRoomRaw((current) => {
      const prev = past.current.pop();
      if (!prev) return current;
      future.current.push(current);
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setRoomRaw((current) => {
      const next = future.current.pop();
      if (!next) return current;
      past.current.push(current);
      return next;
    });
  }, []);

  const canUndo = past.current.length > 0;
  const canRedo = future.current.length > 0;

  return { room, setRoom, undo, redo, canUndo, canRedo };
}
