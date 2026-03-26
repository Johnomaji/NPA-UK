import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { useAuth } from '../auth/AuthProvider';

export const Gallery = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const { status } = useAuth();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <PageHeader title={t.gallery.title} subtitle={t.gallery.subtitle} />

      {status === 'authenticated' ? (
        <p className="text-xs uppercase tracking-[0.2em] text-forest/70">
          To upload images, visit the{' '}
          <a href="/admin" className="underline hover:text-ember">
            Admin panel
          </a>
          .
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {content.galleryItems.map((item) => (
          <div key={item.title} className="card group p-4">
            {item.imageUrl ? (
              <button
                onClick={() => setLightbox(item.imageUrl!)}
                className="block w-full"
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-48 w-full rounded-xl object-cover transition-opacity group-hover:opacity-90"
                />
              </button>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-xl bg-sand text-xs uppercase tracking-[0.2em] text-forest">
                {t.gallery.placeholder}
              </div>
            )}
            <p className="mt-3 text-sm font-semibold text-ink group-hover:text-ember">{item.title}</p>
          </div>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 px-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery image"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-white/70 hover:text-white text-2xl font-light"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ) : null}
    </div>
  );
};
