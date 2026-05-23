import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSignup } from "~/hooks/auth/use-signup";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = useSignup();

  return (
    <div className="dark min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      <header className="border-b border-border px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary" />
          <span className="font-mono text-sm font-bold tracking-wide">
            Lockd
          </span>
        </Link>
        <Link
          to="/login"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Log in
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="font-mono text-2xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-widest">
              // start building escape rooms
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signup.mutate({ name, email, password });
            }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Min 8 characters"
                className="w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {signup.error && (
              <p className="font-mono text-xs text-red-400">
                {signup.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={signup.isPending}
              className="w-full bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest font-bold px-4 py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {signup.isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="font-mono text-xs text-muted-foreground mt-8 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
