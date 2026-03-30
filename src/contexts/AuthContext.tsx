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
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("spotify_token");
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: { email?: string; username?: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(credentials);
      const userData = res.data.user;
      const token = res.data.token;
      setUser(userData);
      setToken(token);
      localStorage.setItem("spotify_user", JSON.stringify(userData));
      localStorage.setItem("spotify_token", token);
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
      const res = await authApi.register(data);
      const userData = res.data.user;
      const token = res.data.token;
      setUser(userData);
      setToken(token);
      localStorage.setItem("spotify_user", JSON.stringify(userData));
      localStorage.setItem("spotify_token", token);
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
    setToken(null);
    localStorage.removeItem("spotify_user");
    localStorage.removeItem("spotify_token");
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
