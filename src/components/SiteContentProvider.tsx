import { createContext, useContext } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const SiteContentContext = createContext<ReturnType<typeof useSiteContent> | null>(null);

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useSiteContent();
  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContentContext = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContentContext must be used within SiteContentProvider');
  }
  return ctx;
};
