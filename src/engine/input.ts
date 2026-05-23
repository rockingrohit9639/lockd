import type { Vec2 } from "../shared/types";

export interface InputState {
  keysDown: Set<string>;
  interactPressed: boolean;
}

export function createInputState(): InputState {
  return {
    keysDown: new Set(),
    interactPressed: false,
  };
}

export function attachInputListeners(state: InputState): () => void {
  function onKeyDown(e: KeyboardEvent) {
    state.keysDown.add(e.key.toLowerCase());

    if (e.key === "e" || e.key === " ") {
      state.interactPressed = true;
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    state.keysDown.delete(e.key.toLowerCase());
  }

  function onBlur() {
    state.keysDown.clear();
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
  };
}

export function getMovementDirection(state: InputState): Vec2 {
  let dx = 0;
  let dy = 0;

  if (state.keysDown.has("w") || state.keysDown.has("arrowup")) dy -= 1;
  if (state.keysDown.has("s") || state.keysDown.has("arrowdown")) dy += 1;
  if (state.keysDown.has("a") || state.keysDown.has("arrowleft")) dx -= 1;
  if (state.keysDown.has("d") || state.keysDown.has("arrowright")) dx += 1;

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    const len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;
  }

  return { x: dx, y: dy };
}

export function consumeInteract(state: InputState): boolean {
  if (state.interactPressed) {
    state.interactPressed = false;
    return true;
  }
  return false;
}
