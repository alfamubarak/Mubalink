import HealthCheck from "./health-check";

/**
 * Server component (default for files without "use client"). It renders the
 * static shell; the interactive health check lives in its own client component.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] p-8 font-sans">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#201030]">MubaLink</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Milestone 1 — project setup. This page proves the frontend can reach
          the Laravel backend.
        </p>
        <div className="mt-8">
          <HealthCheck />
        </div>
      </div>
    </main>
  );
}
