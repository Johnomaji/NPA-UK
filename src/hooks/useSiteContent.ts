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
    return { ...defaultContent, ...JSON.parse(raw) } as SiteContent;
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
