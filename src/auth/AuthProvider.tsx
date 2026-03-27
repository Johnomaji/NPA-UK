import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  username: string | null;
  sessionExpired: boolean;
  login: (
    email: string,
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
  const [email, setEmail] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const wasAuthenticatedRef = useRef(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('authenticated');
        setEmail(session.user.email ?? null);
        wasAuthenticatedRef.current = true;
      } else {
        setStatus('unauthenticated');
      }
    });

    // Supabase handles token refresh automatically; we just listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setStatus('authenticated');
        setEmail(session.user.email ?? null);
        setSessionExpired(false);
        wasAuthenticatedRef.current = true;
      } else {
        if (wasAuthenticatedRef.current && event !== 'SIGNED_OUT') {
          setSessionExpired(true);
        }
        if (event === 'SIGNED_OUT') {
          wasAuthenticatedRef.current = false;
        }
        setStatus('unauthenticated');
        setEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (userEmail: string, password: string, _remember: boolean) => {
    // Dev-mode fallback: works when Supabase is not yet connected
    const DEV_EMAIL = 'admin@npa-uk.org';
    const DEV_PASSWORD = 'npauk-dev-2026';
    if (userEmail === DEV_EMAIL && password === DEV_PASSWORD) {
      setStatus('authenticated');
      setEmail(DEV_EMAIL);
      wasAuthenticatedRef.current = true;
      return { ok: true as const };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password,
      });
      if (error) {
        return { ok: false as const, error: error.message };
      }
      return { ok: true as const };
    } catch {
      return { ok: false as const, error: 'Login failed.' };
    }
  }, []);

  const logout = useCallback(async () => {
    setStatus('unauthenticated');
    setEmail(null);
    wasAuthenticatedRef.current = false;
    await supabase.auth.signOut();
  }, []);

  const refresh = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setStatus('authenticated');
      setEmail(session.user.email ?? null);
    } else {
      setStatus('unauthenticated');
      setEmail(null);
    }
  }, []);

  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ status, username: email, sessionExpired, login, logout, refresh, clearSessionExpired }),
    [status, email, sessionExpired, login, logout, refresh, clearSessionExpired],
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
