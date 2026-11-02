import Sidebar from "./sidebar";

/**
 * Application shell: dark sidebar + light content column.
 * Server component — it only composes static layout; the sidebar brings its
 * own client state for active-link highlighting.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
