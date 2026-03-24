import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Gallery = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.gallery.title} subtitle={t.gallery.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {content.galleryItems.map((item) => (
          <div key={item.title} className="card group p-4">
            <div className="flex h-36 items-center justify-center rounded-xl bg-sand text-xs uppercase tracking-[0.2em] text-forest">
              {t.gallery.placeholder}
            </div>
            <p className="mt-3 text-sm font-semibold text-ink group-hover:text-ember">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
