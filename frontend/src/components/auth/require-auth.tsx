"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Spinner } from "@/components/ui/spinner";

/**
 * Client-side route guard. While the session check is in flight it shows a
 * spinner; once resolved it redirects unauthenticated visitors to /login.
 *
 * Note: this protects the UI, but real authorisation still lives in Laravel —
 * every protected endpoint is also gated by `auth:sanctum` on the server.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting…
  }

  return <>{children}</>;
}
