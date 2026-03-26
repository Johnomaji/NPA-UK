import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { defaultContent } from '../data/siteContent';
import { themeOptions } from '../data/themes';
import { getTranslations, languageOptions } from '../data/translations';
import { supabase } from '../lib/supabase';

export const Admin = () => {
  const { content, updateContent, resetContent } = useSiteContentContext();
  const t = getTranslations(content.language);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
    blogPosts: content.blogPosts.map((post) => ({ ...post, body: post.body ?? '' })),
    galleryItems: content.galleryItems.map((item) => ({ ...item })),
  });

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleBlogChange =
    (index: number, key: 'title' | 'date' | 'detail' | 'body') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        blogPosts: prev.blogPosts.map((post, idx) =>
          idx === index ? { ...post, [key]: event.target.value } : post,
        ),
      }));
    };

  const handleGalleryTitleChange =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        galleryItems: prev.galleryItems.map((item, idx) =>
          idx === index ? { ...item, title: event.target.value } : item,
        ),
      }));
    };

  const handleGalleryImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    setUploadError(null);
    try {
      const ext = file.name.split('.').pop();
      const filename = `gallery-${Date.now()}-${index}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('gallery')
        .upload(filename, file, { upsert: true });
      if (uploadErr) throw uploadErr;
      const { data } = supabase.storage.from('gallery').getPublicUrl(filename);
      setForm((prev) => ({
        ...prev,
        galleryItems: prev.galleryItems.map((item, idx) =>
          idx === index ? { ...item, imageUrl: data.publicUrl } : item,
        ),
      }));
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : 'Upload failed. Check your Supabase storage bucket.',
      );
    } finally {
      setUploadingIndex(null);
    }
  };

  const addBlogPost = () => {
    setForm((prev) => ({
      ...prev,
      blogPosts: [...prev.blogPosts, { title: '', date: '', detail: '', body: '' }],
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
      blogPosts: form.blogPosts.map(({ title, date, detail, body }) => ({
        title,
        date,
        detail,
        body: body || undefined,
      })),
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

        {/* Blog Posts */}
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
              <div key={index} className="rounded-2xl border border-clay/40 bg-white/80 p-4 space-y-3">
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
                    rows={2}
                    className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-forest">
                    {t.admin.fullContent}
                  </label>
                  <textarea
                    value={post.body}
                    onChange={handleBlogChange(index, 'body')}
                    rows={6}
                    placeholder="Full post content. Separate paragraphs with a blank line."
                    className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Items */}
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
          {uploadError ? (
            <p className="text-xs text-ember">{uploadError}</p>
          ) : null}
          <div className="space-y-4">
            {form.galleryItems.map((item, index) => (
              <div key={index} className="rounded-2xl border border-clay/40 bg-white/80 p-4 space-y-3">
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
                    onChange={handleGalleryTitleChange(index)}
                    className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-forest">
                    {t.admin.uploadImage}
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-16 w-16 rounded-lg object-cover border border-clay/40"
                      />
                    ) : null}
                    <label className="cursor-pointer rounded-full border border-clay/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal hover:bg-sand">
                      {uploadingIndex === index ? t.admin.uploading : t.admin.uploadImage}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={uploadingIndex !== null}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleGalleryImageUpload(index, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
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
              if (!confirm('Reset all content to defaults?')) return;
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
                blogPosts: defaultContent.blogPosts.map((post) => ({ ...post, body: post.body ?? '' })),
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
