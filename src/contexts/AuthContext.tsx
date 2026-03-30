import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { authApi } from "@/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email?: string; username?: string; password: string }) => Promise<void>;
  register: (data: { username: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("spotify_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: { email?: string; username?: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(credentials);
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem("spotify_user", JSON.stringify(userData));
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || "Login failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: { username: string; email: string; password: string; role: string }) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register(data);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || (err.code === "ERR_NETWORK" ? "Backend server not reachable. Make sure your backend is running on port 2545 with CORS enabled." : "Registration failed");
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem("spotify_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
