import { Button } from "~/components/ui/button";
import type { RoomObject } from "../shared/types";

interface PropertiesPanelProps {
  object: RoomObject | null;
  onUpdate: (updates: Partial<RoomObject>) => void;
  onDelete: () => void;
}

export function PropertiesPanel({
  object,
  onUpdate,
  onDelete,
}: PropertiesPanelProps) {
  if (!object) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <p className="font-mono text-xs text-white/20 uppercase tracking-widest text-center">
          Select an object
          <br />
          to edit properties
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        // Properties
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">
          Name
        </label>
        <input
          type="text"
          value={object.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm font-mono text-white outline-none focus:border-[#ccff00] transition-colors"
        />
      </div>

      {/* Type */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">
          Type
        </label>
        <div className="font-mono text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-2">
          {object.type}
        </div>
      </div>

      {/* Position */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">
          Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30">X</span>
            <input
              type="number"
              value={Math.round(object.position.x)}
              onChange={(e) =>
                onUpdate({
                  position: { ...object.position, x: Number(e.target.value) },
                })
              }
              className="w-full bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30">Y</span>
            <input
              type="number"
              value={Math.round(object.position.y)}
              onChange={(e) =>
                onUpdate({
                  position: { ...object.position, y: Number(e.target.value) },
                })
              }
              className="w-full bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
            />
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">
          Size
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30">W</span>
            <input
              type="number"
              value={object.size.width}
              onChange={(e) =>
                onUpdate({
                  size: { ...object.size, width: Number(e.target.value) },
                })
              }
              className="w-full bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30">H</span>
            <input
              type="number"
              value={object.size.height}
              onChange={(e) =>
                onUpdate({
                  size: { ...object.size, height: Number(e.target.value) },
                })
              }
              className="w-full bg-white/5 border border-white/10 px-2 py-1.5 text-xs font-mono text-white outline-none focus:border-[#ccff00]"
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={object.hidden}
            onChange={(e) => onUpdate({ hidden: e.target.checked })}
            className="w-4 h-4 accent-[#ccff00]"
          />
          <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors">
            Hidden (revealed by trigger)
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={object.collectible}
            onChange={(e) => onUpdate({ collectible: e.target.checked })}
            className="w-4 h-4 accent-[#ccff00]"
          />
          <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors">
            Collectible (goes to inventory)
          </span>
        </label>
      </div>

      {/* Delete */}
      <div className="pt-4 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={onDelete}
          className="w-full font-mono text-xs uppercase tracking-widest text-red-400/80 hover:text-red-400 hover:bg-red-400/10 rounded-none"
        >
          Delete Object
        </Button>
      </div>
    </div>
  );
}
