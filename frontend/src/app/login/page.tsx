import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign in — MubaLink",
};

/**
 * Login page. Server component — the interactive form is a client component,
 * but this page needs no client state itself.
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Muba<span className="text-primary">Link</span>
          </h1>
          <p className="mt-1 text-sm text-muted">Sign in to the admin panel</p>
        </div>

        <div className="rounded-lg border border-line bg-surface p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
