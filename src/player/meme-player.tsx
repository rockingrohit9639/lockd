import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="animate-bounce-in border-purple-500/50 shadow-2xl shadow-purple-500/20">
        <CardContent className="p-4 space-y-3">
          <img
            src={meme.url}
            alt={meme.name}
            className="max-w-sm max-h-[60vh] rounded-lg mx-auto"
          />
          <div className="text-center space-y-1">
            <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {meme.name}
            </p>
            <p className="text-muted-foreground text-xs">click anywhere to dismiss</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
