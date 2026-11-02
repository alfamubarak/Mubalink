"use client";

import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "@/lib/api/health";

type State =
  | { kind: "loading" }
  | { kind: "ok"; data: HealthResponse }
  | { kind: "error"; message: string };

/**
 * Client component: it fetches live data from the backend, so it must run in
 * the browser (interactive, uses `useEffect` + `useState`). Server components
 * cannot do this — they render once, without browser state.
 */
export default function HealthCheck() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    getHealth()
      .then((data) => setState({ kind: "ok", data }))
      .catch((err: Error) => setState({ kind: "error", message: err.message }));
  }, []);

  return (
    <div className="rounded-lg border border-neutral-300 bg-white p-6 max-w-md">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Backend health
      </h2>

      {state.kind === "loading" && (
        <p className="mt-2 text-neutral-600">Checking connection…</p>
      )}

      {state.kind === "ok" && (
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Status</dt>
            <dd className="font-medium text-green-600">{state.data.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Laravel</dt>
            <dd className="font-medium text-neutral-800">{state.data.version}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Server time (UTC)</dt>
            <dd className="font-medium text-neutral-800">{state.data.timestamp}</dd>
          </div>
        </dl>
      )}

      {state.kind === "error" && (
        <p className="mt-2 text-red-600">
          Failed to reach the backend: {state.message}
        </p>
      )}
    </div>
  );
}
