import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const News = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-14">

      {/* ── Page intro ── */}
      <div className="space-y-3">
        <p className="section-kicker">NPA UK</p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{t.news.title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{t.news.subtitle}</p>
      </div>

      {/* ── Featured announcement ── */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-12 md:px-12"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgb(var(--color-forest)), rgb(var(--color-ember)))',
          }}
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl"
          style={{ background: 'rgb(var(--color-forest)/0.06)' }}
        />
        <div className="relative z-10 space-y-4">
          <p className="section-kicker">{t.news.featured}</p>
          <p className="max-w-2xl text-xl font-semibold leading-relaxed text-ink">
            {content.announcement}
          </p>
        </div>
      </div>

      {/* ── News grid ── */}
      <div className="grid gap-5 md:grid-cols-3">
        {t.news.items.map((item, i) => (
          <article
            key={item.title}
            className="card group flex flex-col p-7 space-y-4"
          >
            {/* Date with line */}
            <div className="flex items-center gap-3">
              <div
                className="h-2 w-2 flex-none rounded-full"
                style={{
                  background: i === 0
                    ? 'rgb(var(--color-forest))'
                    : i === 1
                    ? 'rgb(var(--color-ember))'
                    : 'rgb(var(--color-charcoal))',
                }}
              />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/50">
                {item.date}
              </p>
            </div>

            <h3 className="flex-1 text-lg font-bold leading-snug text-ink group-hover:text-forest transition-colors duration-200">
              {item.title}
            </h3>

            <p className="text-sm leading-relaxed text-charcoal/60">{item.detail}</p>

            <div
              className="h-px w-full"
              style={{ background: 'rgb(var(--card-border))' }}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/30">
              NPA UK
            </p>
          </article>
        ))}
      </div>

      {/* ── Subscribe / Contact strip ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-7"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <div className="space-y-1">
          <p className="section-kicker">Never miss an update</p>
          <p className="text-sm text-charcoal/60">
            Contact us to be added to our members&apos; newsletter.
          </p>
        </div>
        <a
          href="/contact"
          className="rounded-full px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
          style={{ background: 'rgb(var(--color-forest))' }}
        >
          Contact Us
        </a>
      </div>

    </div>
  );
};
