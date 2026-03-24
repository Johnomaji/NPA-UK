import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  username: string | null;
  sessionExpired: boolean;
  login: (
    username: string,
    password: string,
    remember: boolean,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearSessionExpired: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [username, setUsername] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const wasAuthenticatedRef = useRef(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/session', { credentials: 'include' });
      const data = await res.json();
      if (data?.authenticated) {
        setStatus('authenticated');
        setUsername(data.username ?? null);
        setSessionExpired(false);
        wasAuthenticatedRef.current = true;
      } else {
        if (wasAuthenticatedRef.current) {
          setSessionExpired(true);
        }
        setStatus('unauthenticated');
        setUsername(null);
      }
    } catch {
      if (wasAuthenticatedRef.current) {
        setSessionExpired(true);
      }
      setStatus('unauthenticated');
      setUsername(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      refresh();
    }, 1000 * 60 * 2);
    const onFocus = () => {
      refresh();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [refresh]);

  const login = useCallback(async (user: string, pass: string, remember: boolean) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: user, password: pass, remember }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false as const, error: data?.error ?? 'Login failed.' };
      }
      const data = await res.json();
      setStatus('authenticated');
      setUsername(data.username ?? user);
      setSessionExpired(false);
      wasAuthenticatedRef.current = true;
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
      setSessionExpired(false);
      wasAuthenticatedRef.current = false;
    }
  }, []);

  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ status, username, sessionExpired, login, logout, refresh, clearSessionExpired }),
    [status, username, sessionExpired, login, logout, refresh, clearSessionExpired],
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
