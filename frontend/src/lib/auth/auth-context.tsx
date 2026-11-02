"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login as loginApi,
  logout as logoutApi,
  me as meApi,
  type Admin,
} from "@/lib/api/auth";
import { fetchCsrfCookie } from "@/lib/api";

interface AuthContextValue {
  user: Admin | null;
  /** True while the initial session check is in flight. */
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Holds the authenticated admin and exposes login/logout. On mount it asks the
 * backend who is logged in (via the HttpOnly cookie) so a page refresh keeps
 * the session.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meApi()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Sanctum SPA flow: fetch the CSRF cookie first, then submit credentials.
    await fetchCsrfCookie();
    const admin = await loginApi(email, password);
    setUser(admin);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      // Always clear local state, even if the network call failed.
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
