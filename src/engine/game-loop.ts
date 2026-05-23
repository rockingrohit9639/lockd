import type { AABB, FacingDirection, GameState, Room } from "../shared/types";
import {
  type AnimationState,
  createAnimationState,
  updateAnimation,
} from "./animation";
import { type Camera, createCamera, updateCamera } from "./camera";
import { clampToWorld, resolveMovement } from "./collision";
import {
  type EffectsState,
  createEffectsState,
  getShakeOffset,
  renderParticles,
  triggerFailShake,
  triggerWinParticles,
  updateEffects,
} from "./effects";
import {
  attachInputListeners,
  consumeInteract,
  createInputState,
  getMovementDirection,
  type InputState,
} from "./input";
import { findNearestInteractable } from "./proximity";
import { type RenderContext, render } from "./renderer";
import { preloadSprites } from "./sprite-cache";

export interface GameEngine {
  start: () => void;
  stop: () => void;
  getState: () => GameState;
  setState: (state: GameState) => void;
  resize: (width: number, height: number) => void;
  onInteract: (callback: (objectId: string) => void) => void;
  triggerWin: () => void;
  triggerFail: () => void;
}

export function createGameEngine(
  canvas: HTMLCanvasElement,
  room: Room,
  initialState: GameState,
): GameEngine {
  const ctx = canvas.getContext("2d")!;
  const input: InputState = createInputState();
  let camera: Camera = createCamera(canvas.width, canvas.height);
  let state: GameState = initialState;
  let animation: AnimationState = createAnimationState();
  let effects: EffectsState = createEffectsState();
  let animFrameId: number | null = null;
  let lastTime = 0;
  let interactCallback: ((objectId: string) => void) | null = null;

  const detachInput = attachInputListeners(input);

  // Preload custom sprites
  const spriteUrls = room.objects
    .filter((o) => o.spriteUrl)
    .map((o) => o.spriteUrl!);
  if (spriteUrls.length > 0) {
    preloadSprites(spriteUrls);
  }

  // Collect all collision AABBs
  function getColliders(): AABB[] {
    const colliders: AABB[] = [];
    for (const zone of room.collisionZones) {
      colliders.push(zone.bounds);
    }
    for (const obj of room.objects) {
      if (obj.collision && !state.hiddenObjects.has(obj.id)) {
        colliders.push(obj.collision);
      }
    }
    return colliders;
  }

  function update(dt: number): void {
    if (state.solved || state.failed) return;

    const dir = getMovementDirection(input);
    const speed = room.player.speed;
    const playerW = room.player.size.width;
    const playerH = room.player.size.height;

    // Update facing direction
    let facing: FacingDirection = state.player.facing;
    if (dir.x > 0) facing = "right";
    else if (dir.x < 0) facing = "left";
    else if (dir.y > 0) facing = "down";
    else if (dir.y < 0) facing = "up";

    const isMoving = dir.x !== 0 || dir.y !== 0;

    // Calculate desired position
    const desiredPos = {
      x: state.player.position.x + dir.x * speed * dt,
      y: state.player.position.y + dir.y * speed * dt,
    };

    // Resolve collisions
    let newPos = resolveMovement(
      state.player.position,
      desiredPos,
      playerW,
      playerH,
      getColliders(),
    );

    // Clamp to world bounds
    newPos = clampToWorld(
      newPos,
      playerW,
      playerH,
      room.map.width,
      room.map.height,
    );

    // Update player state
    state = {
      ...state,
      player: {
        ...state.player,
        position: newPos,
        velocity: { x: dir.x * speed, y: dir.y * speed },
        facing,
        isMoving,
      },
    };

    // Update animation
    animation = updateAnimation(animation, isMoving, dt);

    // Proximity detection
    const nearbyObjectId = findNearestInteractable(
      newPos,
      room.player.interactionReach,
      room.objects,
      state.hiddenObjects,
    );
    state = { ...state, nearbyObjectId };

    // Handle interaction
    if (consumeInteract(input) && nearbyObjectId && interactCallback) {
      interactCallback(nearbyObjectId);
    }

    // Update camera
    camera = updateCamera(camera, newPos, room.map.width, room.map.height, dt);
  }

  function frame(time: number): void {
    const dt = Math.min((time - lastTime) / 1000, 0.033);
    lastTime = time;

    update(dt);
    effects = updateEffects(effects, dt);

    // Apply screen shake offset
    const shakeOffset = getShakeOffset(effects.shake);

    const rc: RenderContext = {
      ctx,
      camera,
      map: room.map,
      objects: room.objects,
      collisionZones: room.collisionZones,
      player: state.player,
      playerSize: room.player.size,
      nearbyObjectId: state.nearbyObjectId,
      hiddenObjects: state.hiddenObjects,
      animation,
      debug: false,
    };

    // Apply shake to canvas
    ctx.save();
    ctx.translate(shakeOffset.x, shakeOffset.y);
    render(rc);
    ctx.restore();

    // Render particles in screen space (on top of everything)
    if (effects.particles.length > 0) {
      ctx.save();
      ctx.translate(-camera.x + shakeOffset.x, -camera.y + shakeOffset.y);
      renderParticles(ctx, effects.particles);
      ctx.restore();
    }

    animFrameId = requestAnimationFrame(frame);
  }

  return {
    start() {
      lastTime = performance.now();
      // Snap camera to player immediately
      camera = updateCamera(
        camera,
        state.player.position,
        room.map.width,
        room.map.height,
        10, // large dt to snap instantly
      );
      animFrameId = requestAnimationFrame(frame);
    },
    stop() {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      detachInput();
    },
    getState() {
      return state;
    },
    setState(newState: GameState) {
      state = newState;
    },
    resize(width: number, height: number) {
      canvas.width = width;
      canvas.height = height;
      camera = { ...camera, viewportWidth: width, viewportHeight: height };
    },
    onInteract(callback: (objectId: string) => void) {
      interactCallback = callback;
    },
    triggerWin() {
      effects = triggerWinParticles(effects, state.player.position.x, state.player.position.y);
    },
    triggerFail() {
      effects = triggerFailShake(effects);
    },
  };
}
