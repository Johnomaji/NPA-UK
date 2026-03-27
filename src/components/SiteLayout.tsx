import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { useSiteContentContext } from './SiteContentProvider';

export const SiteLayout = () => {
  const { content } = useSiteContentContext();

  useEffect(() => {
    document.documentElement.dataset.theme = content.theme;
    document.documentElement.lang = content.language;
  }, [content.language, content.theme]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
