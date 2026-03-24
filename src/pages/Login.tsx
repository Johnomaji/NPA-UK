import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../auth/AuthProvider';

export const Login = () => {
  const { status, login, clearSessionExpired } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect') || '/admin';
  const reason = searchParams.get('reason');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (reason === 'expired') {
      clearSessionExpired();
    }
  }, [reason, clearSessionExpired]);

  if (status === 'authenticated') {
    return <Navigate to={redirect} replace />;
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await login(username, password, rememberMe);
    setSubmitting(false);
    if (result.ok) {
      navigate(redirect, { replace: true });
      return;
    }
    setError(result.error);
  };

  return (
    <div className="space-y-8 max-w-xl">
      <PageHeader title="Admin Login" subtitle="Enter your credentials to continue." />
      <form onSubmit={onSubmit} className="card space-y-5 p-6">
        {reason === 'expired' ? (
          <div className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
            Your session expired. Please sign in again.
          </div>
        ) : null}
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Username</label>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            autoComplete="current-password"
          />
        </div>
        <label className="flex items-center gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-clay/60 text-forest focus:ring-forest"
          />
          Remember me (optional)
        </label>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
