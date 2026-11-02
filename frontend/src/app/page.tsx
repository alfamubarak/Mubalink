import Shell from "@/components/layout/shell";
import HealthCheck from "./health-check";

export default function Home() {
  return (
    <Shell>
      <div className="p-8">
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Milestone 2 — design system foundation. The health card below proves
          the frontend still reaches the Laravel backend.
        </p>
        <div className="mt-8">
          <HealthCheck />
        </div>
      </div>
    </Shell>
  );
}
