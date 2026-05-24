import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Home } from "~/home";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  return (
    <Home
      onPlay={() => navigate({ to: "/play", search: { room: undefined } })}
      onBuild={() => navigate({ to: "/build", search: { room: undefined } })}
    />
  );
}
