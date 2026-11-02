"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";

/**
 * Dark sidebar. Client component: it reads the current pathname to highlight
 * the active nav item, and exposes the current admin + logout.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-panel text-white">
      <div className="flex h-16 items-center px-6">
        <span className="font-display text-lg font-bold tracking-tight">
          Muba<span className="text-accent">Link</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary-soft/20 font-semibold text-primary-soft"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-4 py-3">
        <p className="truncate text-sm font-medium text-white">{user?.name}</p>
        <p className="truncate text-xs text-white/50">{user?.email}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="mt-2 w-full justify-start px-0 text-white/70 hover:bg-transparent hover:text-white"
        >
          Sign out
        </Button>
      </div>
    </aside>
  );
}
