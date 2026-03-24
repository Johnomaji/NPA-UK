import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status, sessionExpired } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return <div className="text-sm text-charcoal/70">Checking access...</div>;
  }

  if (status !== 'authenticated') {
    const redirect = encodeURIComponent(location.pathname + location.search);
    const reason = sessionExpired ? '&reason=expired' : '';
    return <Navigate to={`/login?redirect=${redirect}${reason}`} replace />;
  }

  return children;
};
