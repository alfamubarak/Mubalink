import Shell from "@/components/layout/shell";
import RequireAuth from "@/components/auth/require-auth";

/**
 * Layout for authenticated pages. The `(protected)` route group keeps the
 * URL unchanged (its folder name is ignored in the path) while wrapping every
 * page here in the auth guard + app shell.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <Shell>{children}</Shell>
    </RequireAuth>
  );
}
