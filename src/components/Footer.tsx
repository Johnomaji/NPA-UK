import { Link } from 'react-router-dom';
import { getTranslations } from '../data/translations';
import { useSiteContentContext } from './SiteContentProvider';
import { useAuth } from '../auth/AuthProvider';

const links = [
  { key: 'about', path: '/about' },
  { key: 'events', path: '/events' },
  { key: 'projects', path: '/projects' },
  { key: 'news', path: '/news' },
  { key: 'gallery', path: '/gallery' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contact' },
  { key: 'admin', path: '/admin' },
];

export const Footer = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const { status } = useAuth();
  const showAdmin = status === 'authenticated';
  const visibleLinks = links.filter((link) => link.key !== 'admin' || showAdmin);

  return (
    <footer className="mt-20 border-t border-clay/60 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-2xl text-ink">NPA-UK Enugu Community</div>
          <p className="text-sm text-charcoal/80">{t.footer.description}</p>
          <div className="rounded-2xl border border-clay/50 bg-sand px-4 py-3 text-xs uppercase tracking-[0.2em] text-forest">
            {content.announcement}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="section-kicker">{t.footer.explore}</p>
          <div className="flex flex-col gap-2">
            {visibleLinks.map((link) => (
              <Link key={link.path} to={link.path} className="link-underline w-fit">
                {link.key === 'admin' ? 'Admin' : t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
            {!showAdmin ? (
              <Link to="/login" className="link-underline w-fit">
                Login
              </Link>
            ) : null}
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="section-kicker">{t.footer.contact}</p>
          <p>{content.location}</p>
          <p>{content.contactEmail}</p>
          <p>{content.contactPhone}</p>
          <Link
            to="/donate"
            className="inline-flex w-fit items-center rounded-full border border-ember/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember transition hover:bg-ember hover:text-white"
          >
            {t.footer.donate}
          </Link>
        </div>
      </div>
      <div className="border-t border-clay/60 py-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal/60">
        {t.footer.rightsPrefix} · {new Date().getFullYear()}
      </div>
    </footer>
  );
};
