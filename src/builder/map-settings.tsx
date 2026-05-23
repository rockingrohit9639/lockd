import { Button } from "~/components/ui/button";
import type { CollisionZone, MapConfig, PlayerConfig } from "../shared/types";

interface MapSettingsProps {
  map: MapConfig;
  player: PlayerConfig;
  collisionZones: CollisionZone[];
  onUpdateMap: (updates: Partial<MapConfig>) => void;
  onUpdatePlayer: (updates: Partial<PlayerConfig>) => void;
  onDeleteCollisionZone: (id: string) => void;
}

export function MapSettings({
  map,
  player,
  collisionZones,
  onUpdateMap,
  onUpdatePlayer,
  onDeleteCollisionZone,
}: MapSettingsProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        // Map Settings
      </div>

      {/* Map dimensions */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Map Size
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/70">
              W
            </span>
            <input
              type="number"
              value={map.width}
              onChange={(e) => onUpdateMap({ width: Number(e.target.value) })}
              step={64}
              className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/70">
              H
            </span>
            <input
              type="number"
              value={map.height}
              onChange={(e) => onUpdateMap({ height: Number(e.target.value) })}
              step={64}
              className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Background color */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Background
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={map.backgroundColor}
            onChange={(e) => onUpdateMap({ backgroundColor: e.target.value })}
            className="w-8 h-8 border border-border cursor-pointer"
          />
          <input
            type="text"
            value={map.backgroundColor}
            onChange={(e) => onUpdateMap({ backgroundColor: e.target.value })}
            className="flex-1 bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Player spawn */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Player Spawn
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/70">
              X
            </span>
            <input
              type="number"
              value={Math.round(map.playerSpawn.x)}
              onChange={(e) =>
                onUpdateMap({
                  playerSpawn: {
                    ...map.playerSpawn,
                    x: Number(e.target.value),
                  },
                })
              }
              className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground/70">
              Y
            </span>
            <input
              type="number"
              value={Math.round(map.playerSpawn.y)}
              onChange={(e) =>
                onUpdateMap({
                  playerSpawn: {
                    ...map.playerSpawn,
                    y: Number(e.target.value),
                  },
                })
              }
              className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>
        <p className="font-mono text-[9px] text-muted-foreground/60">
          Use spawn tool to click-place on map
        </p>
      </div>

      {/* Player speed */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Player Speed
        </label>
        <input
          type="number"
          value={player.speed}
          onChange={(e) => onUpdatePlayer({ speed: Number(e.target.value) })}
          step={10}
          className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
        />
      </div>

      {/* Interaction reach */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Interaction Reach
        </label>
        <input
          type="number"
          value={player.interactionReach}
          onChange={(e) =>
            onUpdatePlayer({ interactionReach: Number(e.target.value) })
          }
          step={5}
          className="w-full bg-accent border border-border px-2 py-1.5 text-xs font-mono text-foreground outline-none focus:border-primary"
        />
      </div>

      {/* Collision Zones */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
          Collision Zones ({collisionZones.length})
        </label>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {collisionZones.map((zone) => (
            <div
              key={zone.id}
              className="flex items-center justify-between px-2 py-1 bg-accent border border-border"
            >
              <span className="font-mono text-[10px] text-foreground/60 truncate">
                {zone.id} ({zone.bounds.width}×{zone.bounds.height})
              </span>
              <Button
                variant="ghost"
                onClick={() => onDeleteCollisionZone(zone.id)}
                className="font-mono text-[9px] text-red-400/80 hover:text-red-400 px-1 py-0 h-auto"
              >
                ×
              </Button>
            </div>
          ))}
          {collisionZones.length === 0 && (
            <p className="font-mono text-[9px] text-muted-foreground/60">
              Use collision tool to draw zones on map
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
