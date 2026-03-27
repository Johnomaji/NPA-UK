import { Link } from 'react-router-dom';
import { getTranslations } from '../data/translations';
import { useSiteContentContext } from './SiteContentProvider';
import { useAuth } from '../auth/AuthProvider';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from './Icons';

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
    <footer style={{ borderTop: '1px solid rgb(var(--card-border))' }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">

        {/* Brand */}
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <div className="font-display text-2xl font-bold text-ink">NPA UK Community</div>
          <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
            {t.footer.description}
          </p>
          <div
            className="rounded-xl px-4 py-3 text-xs leading-relaxed text-charcoal/70"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          >
            {content.announcement}
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-4">
          <p className="section-kicker">{t.footer.explore}</p>
          <div className="flex flex-col gap-3 text-sm">
            {visibleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="link-underline w-fit text-charcoal/60 hover:text-ink transition-colors"
              >
                {link.key === 'admin' ? 'Admin' : t.nav[link.key as keyof typeof t.nav]}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <p className="section-kicker">{t.footer.contact}</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-charcoal/60">
              <MapPinIcon className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
              <span>{content.location}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-charcoal/60">
              <EnvelopeIcon className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
              <span>{content.contactEmail}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-charcoal/60">
              <PhoneIcon className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
              <span>{content.contactPhone}</span>
            </div>
          </div>
          <Link
            to="/donate"
            className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest transition hover:bg-forest/10"
            style={{ borderColor: 'rgb(var(--color-forest)/0.4)' }}
          >
            {t.footer.donate}
          </Link>
        </div>
      </div>

      <div
        className="py-5 text-center text-xs uppercase tracking-[0.2em] text-charcoal/30"
        style={{ borderTop: '1px solid rgb(var(--card-border))' }}
      >
        {t.footer.rightsPrefix} · {new Date().getFullYear()}
      </div>
    </footer>
  );
};
