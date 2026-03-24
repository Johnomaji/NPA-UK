import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Projects = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />
      <div className="grid gap-4 md:grid-cols-2">
        {t.projects.items.map((project) => (
          <div key={project.title} className="card p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl text-ink">{project.title}</p>
              <span className="rounded-full border border-clay/60 bg-sand px-3 py-1 text-xs uppercase tracking-[0.2em] text-forest">
                {project.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-charcoal/70">{project.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
