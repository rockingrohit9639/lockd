import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Dashboard } from "~/dashboard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Dashboard
      onCreateRoom={() => navigate({ to: "/build", search: { room: undefined } })}
      onEditRoom={(id) => navigate({ to: "/build", search: { room: id } })}
      onPlayRoom={(id) => navigate({ to: "/play", search: { room: id } })}
    />
  );
}
