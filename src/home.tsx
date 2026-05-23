import { Link } from "@tanstack/react-router";

interface HomeProps {
  onPlay: () => void;
  onBuild: () => void;
}

export function Home({ onPlay, onBuild }: HomeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero — full viewport with visual */}
      <section className="relative h-screen w-full overflow-hidden bg-secondary">
        {/* Nav overlay */}
        <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-foreground" />
            <span className="font-mono text-sm font-bold tracking-wide">
              Lockd
            </span>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-foreground text-background px-4 py-2 font-bold hover:bg-foreground/80 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </header>

        {/* Hero visual placeholder (will be gameplay video) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[70%] relative">
            <div className="absolute inset-0 bg-muted border border-border">
              {/* Mock room elements */}
              <div className="absolute top-[15%] left-[10%] w-[120px] h-[90px] bg-[#8B4513]/20 border border-border" />
              <div className="absolute top-[20%] right-[15%] w-[80px] h-[120px] bg-[#5C4033]/20 border border-border" />
              <div className="absolute top-[10%] left-[40%] w-[100px] h-[80px] bg-[#8B0000]/15 border border-border" />
              <div className="absolute top-[50%] left-[25%] w-[30px] h-[15px] bg-[#FFD700]/50" />
              <div className="absolute bottom-[20%] right-[25%] w-[60px] h-[60px] bg-foreground/10 border border-border" />
              <div className="absolute bottom-[30%] left-[50%] w-[40px] h-[40px] bg-foreground/5 border border-border" />
              {/* Grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            </div>
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={onPlay}
                className="w-20 h-20 bg-background/90 border border-border flex items-center justify-center hover:bg-background transition-colors group"
              >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-foreground ml-1 group-hover:border-l-muted-foreground transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero text overlay — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
          <div className="max-w-6xl mx-auto flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-background bg-foreground px-2 py-1 inline-block mb-3">
                Escape Room Builder
              </span>
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-black leading-[1.1] tracking-tight">
                Build. Share.
                <br />
                Escape.
              </h1>
            </div>
            <button
              onClick={onPlay}
              className="hidden sm:inline-block font-mono text-xs border border-foreground/30 px-5 py-3 hover:border-foreground transition-colors"
            >
              Read more
            </button>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="px-8 py-24 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-16">
            Key Capabilities
          </span>
          <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-tight max-w-3xl mb-20">
            We make it dead simple to create point-and-click escape rooms and
            share them with anyone. Here are our superpowers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <Capability
              num="01"
              title="Drag & Drop Builder"
              desc="Place objects, wire triggers, create puzzles. No code required."
            />
            <Capability
              num="02"
              title="Instant Sharing"
              desc="Every room gets a unique URL. Send it anywhere, play immediately."
            />
            <Capability
              num="03"
              title="Inventory System"
              desc="Keys, codes, items — classic point-and-click puzzle mechanics built in."
            />
            <Capability
              num="04"
              title="Hidden Surprises"
              desc="Easter eggs and unexpected moments tucked into every corner."
            />
          </div>
        </div>
      </section>

      {/* Projects / What you can build */}
      <section className="px-8 py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-16">
            What You Can Build
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ProjectCard
              title="Mystery Mansion"
              type="Puzzle"
              desc="Classic locked room with hidden compartments and cipher locks."
            />
            <ProjectCard
              title="Space Station"
              type="Sci-Fi"
              desc="Fix the airlock before oxygen runs out. Timer-based tension."
            />
            <ProjectCard
              title="Meme Dungeon"
              type="Chaos"
              desc="Nothing makes sense. That's the point. Pure unhinged fun."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark px-8 py-24 bg-background text-foreground">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to trap your friends?
          </h2>
          <p className="font-mono text-sm text-muted-foreground mb-10">
            Free to use. No account needed to play.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="bg-foreground text-background font-mono text-sm uppercase tracking-widest font-bold px-8 py-4 hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </Link>
            <button
              onClick={onBuild}
              className="border border-border font-mono text-sm uppercase tracking-widest font-bold px-8 py-4 hover:border-foreground/60 transition-colors"
            >
              Try Builder
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-foreground" />
            <span className="font-mono text-xs font-bold">Lockd</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Open source • Built for fun
          </span>
        </div>
      </footer>
    </div>
  );
}

function Capability({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <span className="font-mono text-[10px] text-muted-foreground block mb-3">
        {num}
      </span>
      <h3 className="text-sm font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({
  title,
  type,
  desc,
}: {
  title: string;
  type: string;
  desc: string;
}) {
  return (
    <div className="border border-border p-8 hover:border-foreground transition-colors group cursor-pointer">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
        {type}
      </span>
      <h3 className="text-lg font-bold mb-2 group-hover:text-muted-foreground transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
