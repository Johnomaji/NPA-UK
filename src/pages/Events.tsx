import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { PageHeader } from '../components/PageHeader';

const parseDate = (dateStr: string) => {
  const parts = dateStr.split(' ');
  return {
    month: (parts[0] ?? '').slice(0, 3).toUpperCase(),
    day: (parts[1] ?? '').replace(',', ''),
    year: parts[2] ?? '',
    full: dateStr,
  };
};

export const Events = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-14">
      <PageHeader title={t.events.title} subtitle={t.events.subtitle} />

      {/* Timeline */}
      <div className="relative space-y-6 pl-6 md:pl-0">
        {/* Vertical line */}
        <div
          className="absolute left-[27px] top-0 hidden h-full w-px md:block"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--color-forest)/0.4), transparent)' }}
        />

        {t.events.items.map((event, i) => {
          const d = parseDate(event.date);
          const isHighlighted = i === 1;
          return (
            <div key={event.title} className="flex gap-6 md:gap-10">
              {/* Date bubble */}
              <div className="relative z-10 hidden flex-none md:flex">
                <div
                  className="flex h-14 w-14 flex-col items-center justify-center rounded-full"
                  style={{
                    background: isHighlighted
                      ? 'rgb(var(--color-forest))'
                      : 'rgb(var(--card-bg))',
                    border: `1px solid ${isHighlighted ? 'rgb(var(--color-forest))' : 'rgb(var(--card-border))'}`,
                  }}
                >
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: isHighlighted ? 'rgb(var(--color-sand))' : 'rgb(var(--color-forest))' }}
                  >
                    {d.month}
                  </span>
                  <span
                    className="font-display text-lg font-bold leading-none"
                    style={{ color: isHighlighted ? 'rgb(var(--color-sand))' : 'rgb(var(--color-ink))' }}
                  >
                    {d.day}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl p-7 space-y-4 transition-all duration-200"
                style={{
                  background: isHighlighted
                    ? 'rgb(var(--color-forest)/0.06)'
                    : 'rgb(var(--card-bg))',
                  border: `1px solid ${isHighlighted ? 'rgb(var(--color-forest)/0.35)' : 'rgb(var(--card-border))'}`,
                }}
              >
                {/* Mobile date */}
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest md:hidden">
                  {event.date}
                </p>

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-ink">{event.title}</p>
                    <p className="hidden text-xs text-charcoal/40 md:block">{event.date}</p>
                  </div>
                  <button
                    className="flex-none rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:brightness-110"
                    style={
                      isHighlighted
                        ? { background: 'rgb(var(--color-forest))', color: 'rgb(var(--color-sand))' }
                        : {
                            border: '1px solid rgb(var(--color-forest)/0.4)',
                            color: 'rgb(var(--color-forest))',
                          }
                    }
                  >
                    {t.events.rsvp}
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-charcoal/60">{event.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <div className="space-y-1">
          <p className="section-kicker">Stay Updated</p>
          <p className="text-sm text-charcoal/60">
            More events are being planned for 2026. Check back soon or contact us.
          </p>
        </div>
        <a
          href="/contact"
          className="rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-forest transition hover:bg-forest/10"
          style={{ borderColor: 'rgb(var(--color-forest)/0.4)' }}
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};
