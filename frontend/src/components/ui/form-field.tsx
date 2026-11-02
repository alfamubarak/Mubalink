interface FormFieldProps {
  label: string;
  /** Matches the `id` of the wrapped control, so the label is clickable. */
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Label + control + hint/error wrapper. Keeps every form input visually and
 * accessibly consistent (label is associated with the control via htmlFor).
 */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-red-600">
            {" *"}
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
