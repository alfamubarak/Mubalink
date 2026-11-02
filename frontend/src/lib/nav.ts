/** Primary navigation for the admin sidebar, mirroring the core modules. */
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "Packages", href: "/packages" },
  { label: "Payments", href: "/payments" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Wi-Fi", href: "/wifi" },
  { label: "Notifications", href: "/notifications" },
  { label: "Reports", href: "/reports" },
];
