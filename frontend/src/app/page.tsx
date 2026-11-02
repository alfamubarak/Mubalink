import Shell from "@/components/layout/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import HealthCheck from "./health-check";

export default function Home() {
  return (
    <Shell>
      <div className="p-8">
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Milestone 2 — reusable component primitives.
        </p>

        <div className="mt-8 grid gap-6">
          <EmptyState
            title="No customers yet"
            description="Customer management arrives in a later milestone. This empty state is the real one — not invented data."
            action={<Button disabled>Add customer</Button>}
          />

          <Card>
            <CardHeader>
              <CardTitle>Backend health</CardTitle>
            </CardHeader>
            <CardContent>
              <HealthCheck />
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
