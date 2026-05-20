import { useEffect } from "react";
import { getMemeById } from "../shared/memes";

interface MemePlayerProps {
  memeId: string;
  onDismiss: () => void;
}

export function MemePlayer({ memeId, onDismiss }: MemePlayerProps) {
  const meme = getMemeById(memeId);

  useEffect(() => {
    if (meme?.duration) {
      const timer = setTimeout(onDismiss, meme.duration);
      return () => clearTimeout(timer);
    }
  }, [meme, onDismiss]);

  if (!meme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 cursor-pointer backdrop-blur-md"
      onClick={onDismiss}
    >
      <div className="border border-white/10 bg-[#0a0a0a] p-4 space-y-3">
        <img
          src={meme.url}
          alt={meme.name}
          className="max-w-sm max-h-[60vh] mx-auto"
        />
        <div className="text-center space-y-1">
          <p className="font-mono text-sm font-bold text-[#ccff00]">
            {meme.name}
          </p>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            click to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}
