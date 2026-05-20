import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HomeProps {
  onPlay: () => void;
}

export function Home({ onPlay }: HomeProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-3">
          <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Lockd
          </h1>
          <p className="text-muted-foreground text-xl">
            Build escape rooms. Hide memes. Troll your friends.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="cursor-pointer hover:border-purple-500/50 transition-colors group" onClick={onPlay}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Play
                <Badge variant="secondary">Demo</Badge>
              </CardTitle>
              <CardDescription>
                Try "The Meme Dungeon" — can you escape the rickrolls?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full group-hover:bg-purple-600 transition-colors">
                Play Now
              </Button>
            </CardContent>
          </Card>

          <Card className="opacity-60 cursor-not-allowed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Build
                <Badge variant="outline">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>
                Design your own escape rooms with drag-and-drop + scripting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">
                Open Builder
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="text-muted-foreground text-sm space-y-1">
          <p>Use <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">→</kbd> or click arrows to look around</p>
          <p>Click objects to interact • Select inventory items to use them</p>
        </div>
      </div>
    </div>
  );
}
