import type {
  Action,
  Condition,
  GameState,
  Room,
  Trigger,
} from "../shared/types";

export function initializeState(room: Room): GameState {
  const hiddenObjects = new Set<string>();
  for (const obj of room.objects) {
    if (obj.hidden) {
      hiddenObjects.add(obj.id);
    }
  }

  return {
    player: {
      position: { ...room.map.playerSpawn },
      velocity: { x: 0, y: 0 },
      facing: "down",
      isMoving: false,
    },
    inventory: [],
    flags: new Set(),
    revealedObjects: new Set(),
    hiddenObjects,
    solved: false,
    failed: false,
    activeMessage: null,
    messageSourceId: null,
    activeMeme: null,
    nearbyObjectId: null,
  };
}

function checkCondition(condition: Condition, state: GameState): boolean {
  switch (condition.type) {
    case "has_item":
      return condition.itemId
        ? state.inventory.includes(condition.itemId)
        : false;
    case "not_has_item":
      return condition.itemId
        ? !state.inventory.includes(condition.itemId)
        : true;
    case "flag_set":
      return condition.flag ? state.flags.has(condition.flag) : false;
    case "flag_not_set":
      return condition.flag ? !state.flags.has(condition.flag) : true;
  }
}

function checkAllConditions(
  conditions: Condition[],
  state: GameState,
): boolean {
  return conditions.every((c) => checkCondition(c, state));
}

function applyAction(action: Action, state: GameState): GameState {
  const next = { ...state };

  switch (action.type) {
    case "reveal":
      if (action.targetId) {
        next.hiddenObjects = new Set(state.hiddenObjects);
        next.hiddenObjects.delete(action.targetId);
        next.revealedObjects = new Set(state.revealedObjects);
        next.revealedObjects.add(action.targetId);
      }
      break;
    case "hide":
      if (action.targetId) {
        next.hiddenObjects = new Set(state.hiddenObjects);
        next.hiddenObjects.add(action.targetId);
      }
      break;
    case "add_to_inventory":
      if (action.targetId && !state.inventory.includes(action.targetId)) {
        next.inventory = [...state.inventory, action.targetId];
        next.hiddenObjects = new Set(state.hiddenObjects);
        next.hiddenObjects.add(action.targetId);
      }
      break;
    case "remove_from_inventory":
      if (action.targetId) {
        next.inventory = state.inventory.filter((id) => id !== action.targetId);
      }
      break;
    case "play_meme":
      if (action.memeId) {
        next.activeMeme = action.memeId;
      }
      break;
    case "show_message":
      if (action.message) {
        next.activeMessage = action.message;
      }
      break;
    case "win":
      next.solved = true;
      break;
    case "fail":
      next.failed = true;
      break;
    case "unlock":
    case "lock":
      if (action.flag) {
        next.flags = new Set(state.flags);
        if (action.type === "unlock") {
          next.flags.add(action.flag);
        } else {
          next.flags.delete(action.flag);
        }
      }
      break;
  }

  return next;
}

export function handleInteract(
  objectId: string,
  room: Room,
  state: GameState,
): GameState {
  const triggers = findTriggers(room, "interact", objectId);
  const result = executeTriggers(triggers, state);
  if (result.activeMessage && result.activeMessage !== state.activeMessage) {
    result.messageSourceId = objectId;
  }
  return result;
}

export function handleUseItemOn(
  itemId: string,
  targetId: string,
  room: Room,
  state: GameState,
): GameState {
  const triggers = room.triggers.filter(
    (t) =>
      t.event === "use_item_on" &&
      t.sourceId === targetId &&
      t.itemId === itemId,
  );
  const result = executeTriggers(triggers, state);
  if (result.activeMessage && result.activeMessage !== state.activeMessage) {
    result.messageSourceId = targetId;
  }
  return result;
}

function findTriggers(room: Room, event: string, sourceId: string): Trigger[] {
  return room.triggers.filter(
    (t) => t.event === event && t.sourceId === sourceId,
  );
}

function executeTriggers(triggers: Trigger[], state: GameState): GameState {
  let current = state;
  for (const trigger of triggers) {
    if (checkAllConditions(trigger.conditions, current)) {
      for (const action of trigger.actions) {
        current = applyAction(action, current);
      }
    }
  }
  return current;
}
