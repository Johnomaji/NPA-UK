import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../auth/AuthProvider';
import { EyeIcon, EyeOffIcon } from '../components/Icons';

export const Login = () => {
  const { status, login, clearSessionExpired } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect') || '/admin';
  const reason = searchParams.get('reason');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    const result = await login(email, password, false);
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
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Password</label>
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-clay/60 bg-white py-3 pl-4 pr-11 text-sm"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 transition hover:text-ink"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
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
