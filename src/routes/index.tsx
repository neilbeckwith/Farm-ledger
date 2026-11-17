import { createFileRoute } from "@tanstack/react-router";
import { AcreApp } from "@/components/acre/AcreApp";

export const Route = createFileRoute("/")({
  component: AcreApp,
});
