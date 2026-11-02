import { apiFetch } from "@/lib/api";

/** Shape of the response from `GET /api/v1/health`. */
export interface HealthResponse {
  status: "ok";
  version: string;
  timestamp: string;
}

/** Ping the backend health endpoint — proves the two apps can talk. */
export function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/health");
}
