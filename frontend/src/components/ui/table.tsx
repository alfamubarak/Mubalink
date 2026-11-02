import { cn } from "@/lib/cn";

/**
 * Styled table primitives. Data tables across the app (customers, payments,
 * subscriptions) are built from these so headers, row hover and borders stay
 * consistent.
 */
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-line bg-canvas/60 text-left text-xs uppercase tracking-wide text-muted">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-line">{children}</tbody>;
}

export function TableRow({
  className,
  children,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr className={cn("hover:bg-canvas/50", className)} {...props}>
      {children}
    </tr>
  );
}

export function Th({
  className,
  children,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn("px-4 py-3 font-medium", className)}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({
  className,
  children,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td className={cn("px-4 py-3 align-middle text-ink", className)} {...props}>
      {children}
    </td>
  );
}
