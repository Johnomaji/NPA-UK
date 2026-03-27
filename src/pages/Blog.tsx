import { useState } from 'react';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { CalendarIcon } from '../components/Icons';
import type { BlogPost } from '../data/siteContent';

const ACCENT_COLORS = [
  'rgb(var(--color-forest))',
  'rgb(var(--color-ember))',
  'rgb(var(--color-forest))',
];

export const Blog = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const featured = content.blogPosts[0];
  const rest = content.blogPosts.slice(1);

  return (
    <div className="space-y-14">

      {/* Page intro */}
      <div className="space-y-3">
        <p className="section-kicker">NPA UK</p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{t.blog.title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{t.blog.subtitle}</p>
      </div>

      {/* Featured post */}
      {featured && (
        <article
          className="group cursor-pointer overflow-hidden rounded-3xl transition-all duration-200"
          style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          onClick={() => setActivePost(featured)}
          role="article"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActivePost(featured)}
        >
          {/* Image */}
          {featured.imageUrl ? (
            <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 60%)',
                }}
              />
              <span
                className="badge absolute left-6 top-6"
              >
                Featured
              </span>
            </div>
          ) : (
            <div
              className="flex h-48 items-center justify-center"
              style={{ background: 'rgb(var(--color-forest)/0.06)' }}
            >
              <span className="badge">Featured</span>
            </div>
          )}

          {/* Content */}
          <div className="p-7 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-charcoal/40">
              <CalendarIcon className="h-3.5 w-3.5" />
              {featured.date}
            </div>
            <h2 className="font-display text-2xl font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-forest sm:text-3xl md:text-4xl">
              {featured.title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-charcoal/60">
              {featured.detail}
            </p>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-forest hover:underline">
              {t.blog.readMore} →
            </button>
          </div>
        </article>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <article
              key={post.title}
              className="card group flex cursor-pointer flex-col overflow-hidden transition-all duration-200"
              onClick={() => setActivePost(post)}
              role="article"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActivePost(post)}
            >
              {/* Image */}
              {post.imageUrl ? (
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 55%)',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="h-44 sm:h-48"
                  style={{ background: 'rgb(var(--color-forest)/0.05)' }}
                />
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}>
                  <CalendarIcon className="h-3 w-3" />
                  {post.date}
                </div>
                <h3 className="flex-1 text-base font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-forest">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-charcoal/60">
                  {post.detail}
                </p>
                <button
                  className="self-start text-xs font-semibold uppercase tracking-[0.2em] text-ember hover:underline"
                >
                  {t.blog.readMore} →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: 'rgb(var(--color-sand)/0.8)' }}
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            {activePost.imageUrl && (
              <div className="relative h-48 w-full flex-none overflow-hidden sm:h-56">
                <img
                  src={activePost.imageUrl}
                  alt={activePost.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 60%)',
                  }}
                />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-charcoal/60 transition hover:text-ink"
              style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal content */}
            <div className="overflow-y-auto p-7 sm:p-10 space-y-5">
              <div className="flex items-center gap-2 text-xs text-charcoal/40">
                <CalendarIcon className="h-3.5 w-3.5" />
                {activePost.date}
              </div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {activePost.title}
              </h2>
              <div
                className="h-px w-16"
                style={{ background: 'rgb(var(--color-forest))' }}
              />
              {activePost.body ? (
                <div className="space-y-4 text-sm leading-relaxed text-charcoal/70">
                  {activePost.body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-charcoal/70">{activePost.detail}</p>
              )}
              <button
                onClick={() => setActivePost(null)}
                className="rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50 transition hover:text-ink"
                style={{ borderColor: 'rgb(var(--card-border))' }}
              >
                {t.blog.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
