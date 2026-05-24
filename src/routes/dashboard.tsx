import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Dashboard } from "~/dashboard";
import { useSession } from "~/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: "/login" });
    }
  }, [isPending, session, navigate]);

  if (isPending || !session) return null;

  return (
    <Dashboard
      onCreateRoom={() => navigate({ to: "/build", search: { room: undefined } })}
      onEditRoom={(id) => navigate({ to: "/build", search: { room: id } })}
      onPlayRoom={(id) => navigate({ to: "/play", search: { room: id } })}
    />
  );
}
