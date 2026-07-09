import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultContent, type SiteContent } from '../data/siteContent';
import { supabase } from '../lib/supabase';

const CONTENT_ROW_ID = 1;

const mergeWithDefaults = (stored: Partial<SiteContent>): SiteContent => {
  const merged: SiteContent = { ...defaultContent, ...stored };

  // Gallery: preserve Supabase-uploaded images, fall back to public folder
  if (stored.galleryItems) {
    merged.galleryItems = defaultContent.galleryItems.map((def, i) => {
      const saved = stored.galleryItems![i];
      if (!saved) return def;
      return { title: def.title, imageUrl: saved.imageUrl || def.imageUrl };
    });
    if (stored.galleryItems.length > defaultContent.galleryItems.length) {
      merged.galleryItems.push(...stored.galleryItems.slice(defaultContent.galleryItems.length));
    }
  }

  // Members: merge by ID so ordering changes never corrupt data.
  // Bios and titles always come from defaultContent; only imageUrl from DB.
  if (stored.members) {
    const savedById = new Map(
      stored.members.filter(m => m.id).map(m => [m.id, m])
    );
    merged.members = defaultContent.members.map((def) => {
      const saved = savedById.get(def.id);
      if (!saved) return def;
      const imageUrl = def.imageUrl?.startsWith('/')
        ? def.imageUrl
        : (saved.imageUrl || def.imageUrl);
      return { ...def, imageUrl };
    });
    const defaultIds = new Set(defaultContent.members.map(m => m.id));
    const extra = stored.members.filter(m => m.id && !defaultIds.has(m.id));
    merged.members.push(...extra);
  }

  return merged;
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('site_content')
          .select('content')
          .eq('id', CONTENT_ROW_ID)
          .maybeSingle();
        if (data?.content) {
          setContent(mergeWithDefaults(data.content as Partial<SiteContent>));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateContent = useCallback(async (updates: Partial<SiteContent>) => {
    const next = { ...content, ...updates };
    setContent(next);
    await supabase
      .from('site_content')
      .upsert({ id: CONTENT_ROW_ID, content: next, updated_at: new Date().toISOString() });
  }, [content]);

  const resetContent = useCallback(async () => {
    setContent(defaultContent);
    await supabase
      .from('site_content')
      .upsert({ id: CONTENT_ROW_ID, content: defaultContent, updated_at: new Date().toISOString() });
  }, []);

  return useMemo(
    () => ({ content, loading, updateContent, resetContent }),
    [content, loading, updateContent, resetContent],
  );
};
