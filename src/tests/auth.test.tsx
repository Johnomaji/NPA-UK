import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../auth/AuthProvider';
import { supabase } from '../lib/supabase';

// Simple test component to expose auth state
const AuthDisplay = () => {
  const { status, username } = useAuth();
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="username">{username ?? 'none'}</span>
    </div>
  );
};

// Login form test component
const LoginForm = () => {
  const { login } = useAuth();
  const handleLogin = async () => {
    await login('admin@npa-uk.org', 'password123', false);
  };
  return <button onClick={handleLogin}>Login</button>;
};

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as never);
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as never);
  });

  it('starts in loading state then transitions to unauthenticated', async () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>,
    );

    expect(screen.getByTestId('status')).toHaveTextContent('loading');

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('unauthenticated');
    });
    expect(screen.getByTestId('username')).toHaveTextContent('none');
  });

  it('sets status to authenticated when session exists', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: { user: { email: 'admin@npa-uk.org' } },
      },
      error: null,
    } as never);

    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('authenticated');
    });
    expect(screen.getByTestId('username')).toHaveTextContent('admin@npa-uk.org');
  });

  it('calls signInWithPassword on login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { session: {}, user: {} },
      error: null,
    } as never);

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>,
    );

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'admin@npa-uk.org',
      password: 'password123',
    });
  });

  it('returns error message on failed login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { session: null, user: null },
      error: { message: 'Invalid credentials' },
    } as never);

    let result: { ok: boolean; error?: string } = { ok: true };

    const TestLogin = () => {
      const { login } = useAuth();
      return (
        <button
          onClick={async () => {
            result = await login('bad@email.com', 'wrong', false);
          }}
        >
          Try Login
        </button>
      );
    };

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestLogin />
      </AuthProvider>,
    );

    await user.click(screen.getByRole('button', { name: /try login/i }));

    await waitFor(() => {
      expect(result).toEqual({ ok: false, error: 'Invalid credentials' });
    });
  });

  it('calls signOut on logout', async () => {
    const TestLogout = () => {
      const { logout } = useAuth();
      return <button onClick={logout}>Logout</button>;
    };

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestLogout />
      </AuthProvider>,
    );

    await user.click(screen.getByRole('button', { name: /logout/i }));
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });
});
