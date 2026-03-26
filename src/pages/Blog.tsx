import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import type { BlogPost } from '../data/siteContent';

export const Blog = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const openPost = (post: BlogPost) => setActivePost(post);
  const closePost = () => setActivePost(null);

  return (
    <div className="space-y-10">
      <PageHeader title={t.blog.title} subtitle={t.blog.subtitle} />
      <div className="grid gap-4 md:grid-cols-3">
        {content.blogPosts.map((post) => (
          <div key={post.title} className="card flex flex-col p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-forest">{post.date}</p>
            <p className="font-display text-xl text-ink">{post.title}</p>
            <p className="flex-1 text-sm text-charcoal/70">{post.detail}</p>
            <button
              onClick={() => openPost(post)}
              className="mt-4 self-start text-xs font-semibold uppercase tracking-[0.2em] text-ember hover:underline"
            >
              {t.blog.readMore}
            </button>
          </div>
        ))}
      </div>

      {activePost ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4 py-8"
          onClick={closePost}
        >
          <div
            className="card relative max-h-[80vh] w-full max-w-2xl overflow-y-auto p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePost}
              className="absolute right-5 top-5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50 hover:text-ember"
              aria-label="Close"
            >
              {t.blog.close} ✕
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-forest">{activePost.date}</p>
            <h2 className="font-display text-2xl text-ink">{activePost.title}</h2>
            {activePost.body ? (
              <div className="space-y-4 text-sm leading-relaxed text-charcoal/80">
                {activePost.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-charcoal/80">{activePost.detail}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
