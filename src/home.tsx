import { Button } from "@/components/ui/button";

interface HomeProps {
	onPlay: () => void;
	onBuild: () => void;
}

export function Home({ onPlay, onBuild }: HomeProps) {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ccff00] selection:text-black">
			{/* Nav */}
			<header className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 bg-[#ccff00]" />
					<span className="font-mono text-sm font-bold tracking-wide">
						Lockd
					</span>
				</div>
				<nav className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/60">
					<span
						onClick={onPlay}
						className="hover:text-white cursor-pointer transition-colors"
					>
						Play
					</span>
					<span
						onClick={onBuild}
						className="hover:text-white cursor-pointer transition-colors"
					>
						Build
					</span>
					<span className="hover:text-white cursor-pointer transition-colors text-white/30">
						Browse
					</span>
				</nav>
			</header>

			<main className="px-8 max-w-6xl mx-auto">
				{/* Meta line */}
				<div className="flex items-center justify-between pt-16 mb-12 font-mono text-xs uppercase tracking-widest text-white/40">
					<span>// escape room platform</span>
					<span>v0.1.0</span>
				</div>

				{/* Hero — title + room preview side by side */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
					{/* Left: Title */}
					<div>
						<h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight">
							Lockd.
						</h1>
						<p className="text-[clamp(1.2rem,3vw,2.2rem)] font-light leading-tight text-white/70 mt-4">
							Build escape rooms.
							<br />
							Share the link.
							<br />
							Watch them suffer.
						</p>

						<div className="mt-10">
							<Button
								onClick={onPlay}
								className="bg-[#ccff00] text-black font-mono text-sm uppercase tracking-widest font-bold px-8 py-6 rounded-none hover:bg-[#b8e600] transition-colors"
							>
								Play Demo
							</Button>
						</div>
					</div>

					{/* Right: Room preview mockup */}
					<div className="border border-white/10 relative overflow-hidden">
						{/* Mini room preview */}
						<div className="aspect-[4/3] bg-[#111] relative">
							{/* Wall */}
							<div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]" />
							{/* Floor */}
							<div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#1a1207]" />
							{/* Objects */}
							<div className="absolute top-[20%] left-[15%] w-[60px] h-[45px] bg-[#8B4513] border border-white/5" />
							<div className="absolute top-[30%] right-[20%] w-[50px] h-[70px] bg-[#5C4033] border border-white/5" />
							<div className="absolute top-[15%] left-[45%] w-[55px] h-[40px] bg-[#8B0000] border border-white/5" />
							<div className="absolute top-[50%] left-[30%] w-[20px] h-[10px] bg-[#FFD700]" />
							{/* Cursor indicator */}
							<div className="absolute top-[48%] left-[31%] w-4 h-4 border-2 border-[#ccff00] animate-pulse" />
							{/* Label */}
							<div className="absolute bottom-3 right-3 font-mono text-[10px] text-white/30 uppercase">
								North Wall
							</div>
							{/* Scan lines */}
							<div
								className="absolute inset-0 pointer-events-none opacity-[0.03]"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)",
								}}
							/>
						</div>
						{/* Bottom bar */}
						<div className="border-t border-white/10 px-3 py-2 flex items-center justify-between bg-[#0a0a0a]">
							<span className="font-mono text-[10px] text-white/40">
								INVENTORY: Golden Key
							</span>
							<span className="font-mono text-[10px] text-[#ccff00]">
								● PLAYING
							</span>
						</div>
					</div>
				</div>

				{/* Dotted separator */}
				<div className="border-t border-dashed border-white/10 my-16" />

				{/* How it works — denser layout */}
				<div className="mb-8 font-mono text-xs uppercase tracking-widest text-white/40">
					<span>// how it works</span>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 mb-8">
					<Feature
						num="01"
						title="Build"
						desc="Drag objects into rooms. Wire up triggers — click this, reveal that, unlock the door."
					/>
					<Feature
						num="02"
						title="Share"
						desc="One URL. Send it to anyone. They're trapped until they solve it."
					/>
					<Feature
						num="03"
						title="Escape"
						desc="Search walls, collect items, crack codes. Or get stuck. That's the fun."
					/>
				</div>

				{/* Stats / social proof placeholder */}
				<div className="grid grid-cols-3 gap-0 border border-white/10 mb-16">
					<div className="p-5 border-r border-white/10 text-center">
						<span className="block font-mono text-2xl font-bold text-[#ccff00]">
							∞
						</span>
						<span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
							Rooms possible
						</span>
					</div>
					<div className="p-5 border-r border-white/10 text-center">
						<span className="block font-mono text-2xl font-bold">4</span>
						<span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
							Walls per room
						</span>
					</div>
					<div className="p-5 text-center">
						<span className="block font-mono text-2xl font-bold">30+</span>
						<span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
							Object types
						</span>
					</div>
				</div>

				{/* Hatched line divider like Motion */}
				<div className="flex items-center gap-2 text-white/20 mb-16 overflow-hidden">
					<span className="font-mono text-xs">+</span>
					<div
						className="flex-1 h-px"
						style={{
							backgroundImage:
								"repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 6px)",
						}}
					/>
					<span className="font-mono text-xs">+</span>
				</div>

				{/* Footer */}
				<div className="pb-16 flex items-center justify-between font-mono text-xs text-white/30 uppercase tracking-widest">
					<span>← → to navigate • click to interact</span>
					<span>open source</span>
				</div>
			</main>
		</div>
	);
}

function Feature({
	num,
	title,
	desc,
}: {
	num: string;
	title: string;
	desc: string;
}) {
	return (
		<div className="p-6 border-r border-white/10 last:border-r-0">
			<span className="font-mono text-xs text-white/30 block mb-3">{num}</span>
			<h3 className="font-mono text-sm font-bold uppercase tracking-wide mb-2">
				{title}
			</h3>
			<p className="text-sm text-white/50 leading-relaxed">{desc}</p>
		</div>
	);
}
