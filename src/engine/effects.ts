export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface ScreenShake {
  intensity: number;
  duration: number;
  elapsed: number;
}

export interface PickupAnimation {
  x: number;
  y: number;
  label: string;
  life: number;
  maxLife: number;
}

export interface EffectsState {
  particles: Particle[];
  shake: ScreenShake | null;
  pickups: PickupAnimation[];
}

export function createEffectsState(): EffectsState {
  return { particles: [], shake: null, pickups: [] };
}

export function triggerPickup(
  effects: EffectsState,
  x: number,
  y: number,
  label: string,
): EffectsState {
  return {
    ...effects,
    pickups: [...effects.pickups, { x, y, label, life: 1.2, maxLife: 1.2 }],
  };
}

export function triggerWinParticles(
  effects: EffectsState,
  x: number,
  y: number,
): EffectsState {
  const particles: Particle[] = [];
  const colors = ["#22c55e", "#eab308", "#3b82f6", "#f97316", "#a855f7"];

  for (let i = 0; i < 40; i++) {
    const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.3;
    const speed = 80 + Math.random() * 160;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 50,
      life: 1.0 + Math.random() * 0.5,
      maxLife: 1.0 + Math.random() * 0.5,
      size: 3 + Math.random() * 4,
      color: colors[i % colors.length],
    });
  }

  return { ...effects, particles: [...effects.particles, ...particles] };
}

export function triggerFailShake(effects: EffectsState): EffectsState {
  return {
    ...effects,
    shake: { intensity: 8, duration: 0.4, elapsed: 0 },
  };
}

export function updateEffects(effects: EffectsState, dt: number): EffectsState {
  // Update particles
  const particles = effects.particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt,
      vy: p.vy + 200 * dt, // gravity
      life: p.life - dt,
    }))
    .filter((p) => p.life > 0);

  // Update shake
  let shake = effects.shake;
  if (shake) {
    shake = { ...shake, elapsed: shake.elapsed + dt };
    if (shake.elapsed >= shake.duration) {
      shake = null;
    }
  }

  // Update pickups
  const pickups = effects.pickups
    .map((p) => ({ ...p, life: p.life - dt }))
    .filter((p) => p.life > 0);

  return { particles, shake, pickups };
}

export function getShakeOffset(shake: ScreenShake | null): { x: number; y: number } {
  if (!shake) return { x: 0, y: 0 };
  const progress = shake.elapsed / shake.duration;
  const decay = 1 - progress;
  const intensity = shake.intensity * decay;
  return {
    x: (Math.random() - 0.5) * 2 * intensity,
    y: (Math.random() - 0.5) * 2 * intensity,
  };
}

export function renderPickups(
  ctx: CanvasRenderingContext2D,
  pickups: PickupAnimation[],
): void {
  for (const p of pickups) {
    const progress = 1 - p.life / p.maxLife;
    const alpha = 1 - progress;
    const yOffset = progress * 40;

    ctx.globalAlpha = alpha;
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";

    // Background pill
    const metrics = ctx.measureText(p.label);
    const padX = 8;
    const padY = 4;
    const w = metrics.width + padX * 2;
    const h = 14 + padY * 2;

    ctx.fillStyle = "rgba(34, 197, 94, 0.9)";
    ctx.fillRect(p.x - w / 2, p.y - yOffset - h / 2, w, h);

    // Text
    ctx.fillStyle = "#fff";
    ctx.fillText(p.label, p.x, p.y - yOffset + 4);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "center";
}

export function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
): void {
  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}
