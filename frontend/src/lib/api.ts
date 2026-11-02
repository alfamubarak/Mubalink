/**
 * Central, type-safe API client for talking to the Laravel backend.
 *
 * Every request to the backend goes through `apiFetch`. Keeping it in one
 * place means the base URL, JSON headers, the Sanctum cookie, and error
 * handling are defined once — pages and forms never hand-roll fetch().
 *
 * Requests are same-origin (`/api/v1/...`) and proxied to Laravel by the
 * `rewrites` rule in next.config.ts, which mirrors how production will route
 * traffic behind a single domain.
 */

/** Base path for all API calls. `/api/v1` is proxied to Laravel in dev. */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api/v1";

/** Normalised error thrown when the backend returns a non-2xx response. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Fetch JSON from the backend and return it typed as `T`.
 *
 * - Sends `credentials: "include"` so the Sanctum HttpOnly cookie is sent.
 * - Adds the `X-XSRF-TOKEN` header (read from the CSRF cookie) on writes.
 * - Throws `ApiError` (with the backend's `message`) on any non-2xx status.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const isWrite = !["GET", "HEAD", "OPTIONS"].includes(method);

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  if (isWrite) {
    const token = getXSRFToken();
    if (token) headers["X-XSRF-TOKEN"] = token;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // Non-JSON error body — keep the generic message.
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

/** Read Laravel's `XSRF-TOKEN` cookie (URL-decoded, for the request header). */
function getXSRFToken(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Fetch the CSRF cookie from Sanctum. Must be called before any state-changing
 * request (e.g. login) so Laravel can verify the `X-XSRF-TOKEN` header.
 */
export async function fetchCsrfCookie(): Promise<void> {
  await fetch("/sanctum/csrf-cookie", { credentials: "include" });
}
