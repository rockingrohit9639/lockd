import { useCallback, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  type Asset,
  useAssets,
  useDeleteAsset,
  useUploadAsset,
} from "~/hooks/assets/use-assets";

type AssetType = "sprite" | "background" | "character" | "meme";

const TABS: { id: AssetType; label: string }[] = [
  { id: "sprite", label: "Sprites" },
  { id: "background", label: "Backgrounds" },
  { id: "character", label: "Characters" },
  { id: "meme", label: "Memes" },
];

interface AssetLibraryProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (asset: Asset) => void;
}

export function AssetLibrary({ open, onClose, onSelect }: AssetLibraryProps) {
  const [tab, setTab] = useState<AssetType>("sprite");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: assets, isLoading, error } = useAssets();
  const upload = useUploadAsset();
  const deleteAsset = useDeleteAsset();

  const filtered = assets?.filter((a) => a.type === tab) ?? [];

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      for (const file of Array.from(files)) {
        const name = file.name.replace(/\.[^.]+$/, "");
        upload.mutate({ file, name, type: tab });
      }
    },
    [tab, upload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[720px] max-w-[90vw] max-h-[80vh] bg-background border border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-sm font-bold">Asset Library</h2>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              {assets?.length ?? 0} files
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 font-mono text-[10px] uppercase tracking-widest py-2.5 transition-colors ${
                tab === t.id
                  ? "text-foreground border-b border-primary"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {t.label}
              {assets && (
                <span className="ml-1.5 text-muted-foreground/50">
                  {assets.filter((a) => a.type === t.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <span className="font-mono text-xs text-muted-foreground animate-pulse">
                Loading...
              </span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <span className="font-mono text-xs text-red-400">
                Failed to load assets
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                Sign in to upload and manage assets
              </span>
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <DropZone
              tab={tab}
              dragOver={dragOver}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClickUpload={() => fileInputRef.current?.click()}
              uploading={upload.isPending}
            />
          )}

          {filtered.length > 0 && (
            <div className="space-y-4">
              {/* Grid */}
              <div className="grid grid-cols-4 gap-3">
                {filtered.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    onSelect={() => onSelect?.(asset)}
                    onDelete={() => {
                      if (confirm(`Delete "${asset.name}"?`)) {
                        deleteAsset.mutate(asset.id);
                      }
                    }}
                  />
                ))}

                {/* Upload card */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-foreground/30 transition-colors group"
                >
                  <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                    +
                  </span>
                  <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest">
                    Upload
                  </span>
                </button>
              </div>

              {/* Drop area below grid */}
              {upload.isPending && (
                <div className="text-center py-2">
                  <span className="font-mono text-[10px] text-primary animate-pulse">
                    Uploading...
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-5 py-3 flex items-center justify-between shrink-0">
          <span className="font-mono text-[9px] text-muted-foreground">
            PNG, JPG, GIF, WebP, SVG · Max 5MB
          </span>
          <div className="flex items-center gap-2">
            {upload.isError && (
              <span className="font-mono text-[9px] text-red-400">
                {upload.error.message}
              </span>
            )}
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={upload.isPending}
              className="bg-foreground text-background font-mono text-[10px] uppercase tracking-widest font-bold rounded-none hover:bg-foreground/90 px-4 py-1.5 h-auto"
            >
              {upload.isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function DropZone({
  tab,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onClickUpload,
  uploading,
}: {
  tab: AssetType;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClickUpload: () => void;
  uploading: boolean;
}) {
  const hints: Record<AssetType, string> = {
    sprite: "Upload custom sprites for objects in your room",
    background: "Upload floor textures or room background images",
    character: "Upload player character sprites or NPC art",
    meme: "Upload meme images to surprise players",
  };

  return (
    <div
      className={`border-2 border-dashed py-20 text-center transition-colors ${
        dragOver
          ? "border-primary bg-primary/5"
          : "border-border hover:border-foreground/20"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="space-y-3">
        <div className="text-3xl text-muted-foreground/30">
          {tab === "sprite" && "◆"}
          {tab === "background" && "▬"}
          {tab === "character" && "◉"}
          {tab === "meme" && "✦"}
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {hints[tab]}
        </p>
        <p className="font-mono text-[10px] text-muted-foreground/50">
          Drag & drop files here, or
        </p>
        <button
          onClick={onClickUpload}
          disabled={uploading}
          className="font-mono text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Browse files"}
        </button>
      </div>
    </div>
  );
}

function AssetCard({
  asset,
  onSelect,
  onDelete,
}: {
  asset: Asset;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group relative border border-border hover:border-foreground/30 transition-colors">
      {/* Thumbnail */}
      <button
        onClick={onSelect}
        className="w-full aspect-square overflow-hidden bg-muted flex items-center justify-center"
      >
        <img
          src={asset.thumbnailUrl || asset.url}
          alt={asset.name}
          className="w-full h-full object-contain p-2"
        />
      </button>

      {/* Name */}
      <div className="px-2 py-1.5 border-t border-border">
        <p className="font-mono text-[9px] text-foreground truncate">
          {asset.name}
        </p>
      </div>

      {/* Hover actions */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
        <button
          onClick={onSelect}
          className="font-mono text-[8px] bg-primary text-background px-1.5 py-0.5 hover:bg-primary/80"
        >
          Use
        </button>
        <button
          onClick={onDelete}
          className="font-mono text-[8px] bg-red-500/80 text-white px-1.5 py-0.5 hover:bg-red-500"
        >
          ×
        </button>
      </div>
    </div>
  );
}
