import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLogin } from "~/hooks/auth/use-login";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ccff00] selection:text-black flex flex-col">
      <header className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ccff00]" />
          <span className="font-mono text-sm font-bold tracking-wide">
            Lockd
          </span>
        </Link>
        <Link
          to="/signup"
          className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          Sign up
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="font-mono text-2xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="font-mono text-xs text-white/40 mt-2 uppercase tracking-widest">
              // log in to continue
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({ email, password });
            }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-white/60">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#ccff00] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-white/60">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-transparent border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#ccff00] transition-colors"
              />
            </div>

            {login.error && (
              <p className="font-mono text-xs text-red-400">
                {login.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full bg-[#ccff00] text-black font-mono text-sm uppercase tracking-widest font-bold px-4 py-4 hover:bg-[#b8e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {login.isPending ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="font-mono text-xs text-white/40 mt-8 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#ccff00] hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
