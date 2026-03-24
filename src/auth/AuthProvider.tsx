import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  username: string | null;
  login: (username: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [username, setUsername] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/session', { credentials: 'include' });
      const data = await res.json();
      if (data?.authenticated) {
        setStatus('authenticated');
        setUsername(data.username ?? null);
      } else {
        setStatus('unauthenticated');
        setUsername(null);
      }
    } catch {
      setStatus('unauthenticated');
      setUsername(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (user: string, pass: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false as const, error: data?.error ?? 'Login failed.' };
      }
      const data = await res.json();
      setStatus('authenticated');
      setUsername(data.username ?? user);
      return { ok: true as const };
    } catch {
      return { ok: false as const, error: 'Login failed.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setStatus('unauthenticated');
      setUsername(null);
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({ status, username, login, logout, refresh }),
    [status, username, login, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
