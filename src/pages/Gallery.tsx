import { useState } from 'react';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { useAuth } from '../auth/AuthProvider';
import { CameraIcon } from '../components/Icons';

export const Gallery = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const { status } = useAuth();
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);

  const withImages = content.galleryItems.filter((i) => i.imageUrl);
  const withoutImages = content.galleryItems.filter((i) => !i.imageUrl);

  return (
    <div className="space-y-14">

      {/* Page intro */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="section-kicker">NPA UK</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{t.gallery.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{t.gallery.subtitle}</p>
        </div>
        {status === 'authenticated' && (
          <a
            href="/admin"
            className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest transition hover:bg-forest/10"
            style={{ borderColor: 'rgb(var(--color-forest)/0.4)' }}
          >
            <CameraIcon className="h-3.5 w-3.5" />
            Upload Images
          </a>
        )}
      </div>

      {/* Images grid */}
      {withImages.length > 0 && (
        <div className="space-y-4">
          <p className="section-kicker">Photos</p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {withImages.map((item) => (
              <button
                key={item.title}
                onClick={() => setLightbox({ url: item.imageUrl!, title: item.title })}
                className="group relative overflow-hidden rounded-2xl text-left"
                style={{ border: '1px solid rgb(var(--card-border))' }}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4"
                  style={{
                    background:
                      'linear-gradient(to top, rgb(var(--color-sand)/0.85) 0%, transparent 60%)',
                  }}
                >
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                </div>
                {/* Always-visible title bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3"
                  style={{ background: 'rgb(var(--color-sand)/0.7)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="truncate text-xs font-semibold text-ink">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder cards grid */}
      {withoutImages.length > 0 && (
        <div className="space-y-4">
          {withImages.length > 0 && (
            <p className="section-kicker">Coming Soon</p>
          )}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {withoutImages.map((item, i) => (
              <div
                key={item.title}
                className="card group flex flex-col overflow-hidden"
              >
                {/* Placeholder area */}
                <div
                  className="flex h-36 items-center justify-center"
                  style={{
                    background: i % 3 === 0
                      ? 'rgb(var(--color-forest)/0.06)'
                      : i % 3 === 1
                      ? 'rgb(var(--color-ember)/0.06)'
                      : 'rgb(var(--card-border)/0.5)',
                  }}
                >
                  <CameraIcon
                    className="h-7 w-7"
                    style={{
                      color: i % 3 === 0
                        ? 'rgb(var(--color-forest)/0.4)'
                        : i % 3 === 1
                        ? 'rgb(var(--color-ember)/0.4)'
                        : 'rgb(var(--color-charcoal)/0.2)',
                    } as React.CSSProperties}
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-semibold text-charcoal/60 group-hover:text-ink transition-colors">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-charcoal/30">
                    No image yet
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {content.galleryItems.length === 0 && (
        <div
          className="flex flex-col items-center justify-center rounded-3xl py-24 space-y-4 text-center"
          style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
        >
          <CameraIcon className="h-12 w-12 text-charcoal/20" />
          <p className="text-sm text-charcoal/40">No gallery items yet.</p>
          {status === 'authenticated' && (
            <a href="/admin" className="text-xs font-semibold text-forest hover:underline">
              Add items in Admin →
            </a>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgb(var(--color-sand)/0.9)', backdropFilter: 'blur(12px)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="max-h-[78vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-center text-sm font-semibold text-ink">{lightbox.title}</p>
          </div>
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-charcoal/60 transition hover:text-ink"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
