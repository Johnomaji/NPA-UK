import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Events = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.events.title} subtitle={t.events.subtitle} />
      <div className="grid gap-4 md:grid-cols-2">
        {t.events.items.map((event) => (
          <div key={event.title} className="card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-forest">{event.date}</p>
            <p className="font-display text-2xl text-ink">{event.title}</p>
            <p className="text-sm text-charcoal/70">{event.detail}</p>
            <button className="mt-4 rounded-full border border-forest/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              {t.events.rsvp}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
