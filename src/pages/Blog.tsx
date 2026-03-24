import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Blog = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.blog.title} subtitle={t.blog.subtitle} />
      <div className="grid gap-4 md:grid-cols-3">
        {content.blogPosts.map((post) => (
          <div key={post.title} className="card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-forest">{post.date}</p>
            <p className="font-display text-xl text-ink">{post.title}</p>
            <p className="text-sm text-charcoal/70">{post.detail}</p>
            <button className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              {t.blog.readMore}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
