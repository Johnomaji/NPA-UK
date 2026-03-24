import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const News = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.news.title} subtitle={t.news.subtitle} />
      <div className="card p-6">
        <p className="section-kicker">{t.news.featured}</p>
        <p className="text-lg text-ink">{content.announcement}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {t.news.items.map((item) => (
          <div key={item.title} className="card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-forest">{item.date}</p>
            <p className="font-display text-xl text-ink">{item.title}</p>
            <p className="text-sm text-charcoal/70">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
