import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Contact = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form className="card space-y-4 p-6">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.contact.form.name}</label>
            <input
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              placeholder={t.contact.form.namePlaceholder}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.contact.form.email}</label>
            <input
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              placeholder={t.contact.form.emailPlaceholder}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.contact.form.message}</label>
            <textarea
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              rows={5}
              placeholder={t.contact.form.messagePlaceholder}
            />
          </div>
          <button className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t.contact.form.send}
          </button>
        </form>
        <div className="card space-y-4 p-6">
          <p className="section-kicker">{t.contact.detailsTitle}</p>
          <p className="text-sm text-charcoal/80">{content.location}</p>
          <p className="text-sm text-charcoal/80">{content.contactEmail}</p>
          <p className="text-sm text-charcoal/80">{content.contactPhone}</p>
          <div className="rounded-2xl border border-clay/60 bg-sand p-4 text-xs uppercase tracking-[0.2em] text-forest">
            {t.contact.responseTime}
          </div>
        </div>
      </div>
    </div>
  );
};
