import { Link, NavLink } from 'react-router-dom';
import { getTranslations } from '../data/translations';
import { useSiteContentContext } from './SiteContentProvider';
import { useAuth } from '../auth/AuthProvider';
import { useState } from 'react';

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: 'rgb(var(--color-sand) / 0.88)',
        borderBottom: '1px solid rgb(var(--card-border))',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-forest">
            NPA UK
          </span>
          <span
            className="hidden rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand sm:inline-block"
            style={{ background: 'rgb(var(--color-forest))' }}
          >
            Community
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-forest' : 'text-charcoal hover:text-ink'}`
              }
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            className="rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-forest/40 hover:text-forest lg:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>

          {status === 'authenticated' ? (
            <button
              type="button"
              onClick={logout}
              className="hidden rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:border-forest/40 hover:text-forest md:inline-flex"
            >
              Logout
            </button>
          ) : null}

          <Link
            to="/donate"
            className="hidden rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110 lg:inline-flex"
            style={{ background: 'rgb(var(--color-forest))' }}
          >
            {t.nav.donate}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen ? (
        <div style={{ borderTop: '1px solid rgb(var(--card-border))', background: 'rgb(var(--color-sand) / 0.97)' }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 text-sm font-medium text-charcoal">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-forest' : 'text-charcoal hover:text-forest'}`
                }
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </NavLink>
            ))}
            {status === 'authenticated' ? (
              <button
                type="button"
                onClick={() => { logout(); setMenuOpen(false); }}
                className="text-left text-charcoal hover:text-forest"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
};
