import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { defaultContent } from '../data/siteContent';
import { themeOptions } from '../data/themes';
import { getTranslations, languageOptions } from '../data/translations';

export const Admin = () => {
  const { content, updateContent, resetContent } = useSiteContentContext();
  const t = getTranslations(content.language);
  const [form, setForm] = useState({
    heroHeadline: content.heroHeadline,
    heroSubheadline: content.heroSubheadline,
    mission: content.mission,
    vision: content.vision,
    values: content.values.join(', '),
    contactEmail: content.contactEmail,
    contactPhone: content.contactPhone,
    location: content.location,
    donationLink: content.donationLink,
    announcement: content.announcement,
    theme: content.theme,
    language: content.language,
    blogPosts: content.blogPosts.map((post) => ({ ...post })),
    galleryItems: content.galleryItems.map((item) => ({ ...item })),
  });

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleBlogChange =
    (index: number, key: 'title' | 'date' | 'detail') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        blogPosts: prev.blogPosts.map((post, idx) =>
          idx === index ? { ...post, [key]: event.target.value } : post,
        ),
      }));
    };

  const handleGalleryChange =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        galleryItems: prev.galleryItems.map((item, idx) =>
          idx === index ? { ...item, title: event.target.value } : item,
        ),
      }));
    };

  const addBlogPost = () => {
    setForm((prev) => ({
      ...prev,
      blogPosts: [...prev.blogPosts, { title: '', date: '', detail: '' }],
    }));
  };

  const removeBlogPost = (index: number) => {
    setForm((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((_, idx) => idx !== index),
    }));
  };

  const addGalleryItem = () => {
    setForm((prev) => ({
      ...prev,
      galleryItems: [...prev.galleryItems, { title: '' }],
    }));
  };

  const removeGalleryItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateContent({
      heroHeadline: form.heroHeadline,
      heroSubheadline: form.heroSubheadline,
      mission: form.mission,
      vision: form.vision,
      values: form.values.split(',').map((item) => item.trim()).filter(Boolean),
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      location: form.location,
      donationLink: form.donationLink,
      announcement: form.announcement,
      theme: form.theme,
      language: form.language,
      blogPosts: form.blogPosts,
      galleryItems: form.galleryItems,
    });
  };

  return (
    <div className="space-y-10">
      <PageHeader title={t.admin.title} subtitle={t.admin.subtitle} />
      <form onSubmit={handleSubmit} className="card space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.admin.themeLabel}</label>
            <select
              value={form.theme}
              onChange={handleChange('theme')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.admin.languageLabel}</label>
            <select
              value={form.language}
              onChange={handleChange('language')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Hero Headline</label>
          <input
            value={form.heroHeadline}
            onChange={handleChange('heroHeadline')}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Hero Subheadline</label>
          <textarea
            value={form.heroSubheadline}
            onChange={handleChange('heroSubheadline')}
            rows={3}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Mission</label>
            <textarea
              value={form.mission}
              onChange={handleChange('mission')}
              rows={4}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Vision</label>
            <textarea
              value={form.vision}
              onChange={handleChange('vision')}
              rows={4}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Values (comma separated)</label>
          <input
            value={form.values}
            onChange={handleChange('values')}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Contact Email</label>
            <input
              value={form.contactEmail}
              onChange={handleChange('contactEmail')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Contact Phone</label>
            <input
              value={form.contactPhone}
              onChange={handleChange('contactPhone')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Location</label>
            <input
              value={form.location}
              onChange={handleChange('location')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">Donation Link</label>
            <input
              value={form.donationLink}
              onChange={handleChange('donationLink')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-forest">Announcement</label>
          <textarea
            value={form.announcement}
            onChange={handleChange('announcement')}
            rows={3}
            className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.admin.blogTitle}</label>
            <button
              type="button"
              onClick={addBlogPost}
              className="rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal"
            >
              {t.admin.addPost}
            </button>
          </div>
          <div className="space-y-4">
            {form.blogPosts.map((post, index) => (
              <div key={`${post.title}-${index}`} className="rounded-2xl border border-clay/40 bg-white/80 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-forest">Post {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeBlogPost(index)}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-ember"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-[1.5fr_1fr]">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-forest">Title</label>
                    <input
                      value={post.title}
                      onChange={handleBlogChange(index, 'title')}
                      className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-forest">Date</label>
                    <input
                      value={post.date}
                      onChange={handleBlogChange(index, 'date')}
                      className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-forest">Summary</label>
                  <textarea
                    value={post.detail}
                    onChange={handleBlogChange(index, 'detail')}
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="text-xs uppercase tracking-[0.2em] text-forest">{t.admin.galleryTitle}</label>
            <button
              type="button"
              onClick={addGalleryItem}
              className="rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal"
            >
              {t.admin.addGallery}
            </button>
          </div>
          <div className="space-y-4">
            {form.galleryItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className="rounded-2xl border border-clay/40 bg-white/80 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-forest">Item {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(index)}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-ember"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-forest">Title</label>
                  <input
                    value={item.title}
                    onChange={handleGalleryChange(index)}
                    className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              resetContent();
              setForm({
                heroHeadline: defaultContent.heroHeadline,
                heroSubheadline: defaultContent.heroSubheadline,
                mission: defaultContent.mission,
                vision: defaultContent.vision,
                values: defaultContent.values.join(', '),
                contactEmail: defaultContent.contactEmail,
                contactPhone: defaultContent.contactPhone,
                location: defaultContent.location,
                donationLink: defaultContent.donationLink,
                announcement: defaultContent.announcement,
                theme: defaultContent.theme,
                language: defaultContent.language,
                blogPosts: defaultContent.blogPosts.map((post) => ({ ...post })),
                galleryItems: defaultContent.galleryItems.map((item) => ({ ...item })),
              });
            }}
            className="rounded-full border border-clay/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal"
          >
            Reset Defaults
          </button>
        </div>
      </form>
    </div>
  );
};
