import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Builder } from "~/builder/builder";

export const Route = createFileRoute("/build")({
  component: BuildPage,
});

function BuildPage() {
  const navigate = useNavigate();

  return <Builder onExit={() => navigate({ to: "/" })} />;
}
