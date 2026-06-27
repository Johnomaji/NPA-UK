import { useEffect, useMemo, useState } from 'react';
import { defaultContent, type SiteContent } from '../data/siteContent';

const STORAGE_KEY = 'npa-uk-content';

const readContent = (): SiteContent => {
  if (typeof window === 'undefined') {
    return defaultContent;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultContent;
  }

  try {
    const stored = JSON.parse(raw) as Partial<SiteContent>;
    const merged: SiteContent = { ...defaultContent, ...stored };

    // Merge gallery items by index so public-folder images always show,
    // but any image the admin uploaded via Supabase is kept.
    if (stored.galleryItems) {
      merged.galleryItems = defaultContent.galleryItems.map((def, i) => {
        const saved = stored.galleryItems![i];
        if (!saved) return def;
        return { ...def, ...saved, imageUrl: saved.imageUrl || def.imageUrl };
      });
      // Keep any extra items the admin added beyond the defaults
      if (stored.galleryItems.length > defaultContent.galleryItems.length) {
        merged.galleryItems.push(...stored.galleryItems.slice(defaultContent.galleryItems.length));
      }
    }

    return merged;
  } catch {
    return defaultContent;
  }
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(() => readContent());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...updates }));
  };

  const resetContent = () => {
    setContent(defaultContent);
  };

  return useMemo(
    () => ({ content, updateContent, resetContent }),
    [content],
  );
};
