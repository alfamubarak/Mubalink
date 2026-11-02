import { apiFetch } from "@/lib/api";

/** Authenticated admin (as returned by the backend's UserResource). */
export interface Admin {
  id: number;
  name: string;
  email: string;
}

/** Log in and return the authenticated admin. */
export function login(email: string, password: string): Promise<Admin> {
  return apiFetch<{ data: Admin }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then((r) => r.data);
}

/** Fetch the currently authenticated admin (throws ApiError 401 if logged out). */
export function me(): Promise<Admin> {
  return apiFetch<{ data: Admin }>("/auth/me").then((r) => r.data);
}

/** Log out, invalidating the session. */
export function logout(): Promise<void> {
  return apiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
  }).then(() => undefined);
}
