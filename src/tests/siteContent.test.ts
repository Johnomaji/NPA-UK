import { describe, it, expect } from 'vitest';
import { defaultContent } from '../data/siteContent';
import { getTranslations } from '../data/translations';

describe('defaultContent', () => {
  it('has required fields', () => {
    expect(defaultContent.heroHeadline).toBeTruthy();
    expect(defaultContent.mission).toBeTruthy();
    expect(defaultContent.vision).toBeTruthy();
    expect(defaultContent.values.length).toBeGreaterThan(0);
    expect(defaultContent.blogPosts.length).toBeGreaterThan(0);
    expect(defaultContent.galleryItems.length).toBeGreaterThan(0);
  });

  it('uses Nenwe not Enugu in location', () => {
    expect(defaultContent.location).toContain('Nenwe');
  });

  it('blog posts have title, date, and detail', () => {
    defaultContent.blogPosts.forEach((post) => {
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.detail).toBeTruthy();
    });
  });

  it('blog posts with body have non-empty body', () => {
    defaultContent.blogPosts.forEach((post) => {
      if (post.body !== undefined) {
        expect(post.body.length).toBeGreaterThan(0);
      }
    });
  });

  it('gallery items have titles', () => {
    defaultContent.galleryItems.forEach((item) => {
      expect(item.title).toBeTruthy();
    });
  });
});

describe('getTranslations', () => {
  it('returns English translations', () => {
    const t = getTranslations('en');
    expect(t.blog.readMore).toBe('Read more');
    expect(t.contact.form.send).toBe('Send Message');
    expect(t.contact.form.successMessage).toBeTruthy();
    expect(t.blog.close).toBe('Close');
  });

  it('returns Igbo translations', () => {
    const t = getTranslations('ig');
    expect(t.blog.readMore).toBe('Gụọ ọzọ');
    expect(t.contact.form.send).toBe('Ziga Ozi');
  });

  it('falls back to English for unknown language', () => {
    const t = getTranslations('xx');
    expect(t.blog.readMore).toBe('Read more');
  });

  it('about subtitle mentions Nenwe Progressive Association', () => {
    const t = getTranslations('en');
    expect(t.about.subtitle).toContain('Nenwe Progressive Association');
  });

  it('blog subtitle mentions Nenwe Progressive Association', () => {
    const t = getTranslations('en');
    expect(t.blog.subtitle).toContain('Nenwe Progressive Association');
  });

  it('footer description mentions Nenwe', () => {
    const t = getTranslations('en');
    expect(t.footer.description).toContain('Nenwe');
  });

  it('admin translations include upload and fullContent keys', () => {
    const t = getTranslations('en');
    expect(t.admin.uploadImage).toBeTruthy();
    expect(t.admin.fullContent).toBeTruthy();
  });
});
