import { cn } from "@/lib/cn";

interface InputProps extends React.ComponentProps<"input"> {
  /** Marks the field as invalid (red border) for validation errors. */
  invalid?: boolean;
}

/**
 * Base text input. React 19 passes `ref` through `...props`, so no forwardRef
 * is needed.
 */
export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-10 w-full rounded-md border bg-surface px-3 text-sm text-ink",
        "placeholder:text-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60",
        invalid ? "border-red-500" : "border-line",
        className,
      )}
      {...props}
    />
  );
}
