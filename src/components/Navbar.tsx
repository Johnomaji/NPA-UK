import { Link, NavLink } from 'react-router-dom';
import { getTranslations } from '../data/translations';
import { useSiteContentContext } from './SiteContentProvider';
import { useAuth } from '../auth/AuthProvider';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'events', path: '/events' },
  { key: 'projects', path: '/projects' },
  { key: 'news', path: '/news' },
  { key: 'gallery', path: '/gallery' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contact' },
];

export const Navbar = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const { status, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-sand/80 border-b border-clay/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-2xl text-ink">NPA-UK</span>
          <span className="text-xs uppercase tracking-[0.28em] text-forest">
            {t.common.brandTagline}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-charcoal lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? 'text-ember' : 'text-charcoal hover:text-ember'
                }`
              }
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {status === 'authenticated' ? (
            <button
              type="button"
              onClick={logout}
              className="hidden rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-clay/40 md:inline-flex"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:bg-clay/40 md:inline-flex"
            >
              Login
            </Link>
          )}
          <Link
            to="/donate"
            className="rounded-full border border-ember/60 bg-ember px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow"
          >
            {t.nav.donate}
          </Link>
          <a
            href={content.donationLink}
            className="hidden rounded-full border border-ember/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember transition hover:bg-ember hover:text-white md:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            {t.nav.quickPay}
          </a>
        </div>
      </div>
    </header>
  );
};
