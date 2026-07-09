import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { useAuth } from '../auth/AuthProvider';
import { defaultContent } from '../data/siteContent';
import { themeOptions } from '../data/themes';
import { languageOptions } from '../data/translations';
import { supabase } from '../lib/supabase';
import {
  CameraIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  LogOutIcon,
  EyeIcon,
  ImageIcon,
  SettingsIcon,
  UsersIcon,
  CalendarIcon,
} from '../components/Icons';
import type { EventItem, PastEvent, ProjectItem, NewsItem } from '../data/siteContent';

// ── Helpers ────────────────────────────────────────────────────────────────

const inputCls =
  'mt-2 w-full rounded-xl border px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest/50';
const inputStyle = {
  background: 'rgb(var(--card-bg))',
  borderColor: 'rgb(var(--card-border))',
};

type FieldProps = {
  label: string;
  children: React.ReactNode;
  hint?: string;
};
const Field = ({ label, children, hint }: FieldProps) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
      {label}
    </label>
    {children}
    {hint && <p className="text-[10px] text-charcoal/40">{hint}</p>}
  </div>
);

type CardProps = { title: string; children: React.ReactNode };
const Card = ({ title, children }: CardProps) => (
  <div
    className="rounded-2xl space-y-5 p-6"
    style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
  >
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">{title}</p>
    {children}
  </div>
);

type TabId = 'general' | 'events' | 'past-events' | 'projects' | 'news' | 'blog' | 'gallery' | 'members';

const PROJECT_STATUSES = ['Active', 'Ongoing', 'Funding', 'Planning'] as const;

// ── Component ──────────────────────────────────────────────────────────────

export const Admin = () => {
  const { content, updateContent, resetContent } = useSiteContentContext();
  const { username, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set([0]));
  const [memberUploadingIndex, setMemberUploadingIndex] = useState<number | null>(null);
  const [memberUploadError, setMemberUploadError] = useState<string | null>(null);
  const [expandedMembers, setExpandedMembers] = useState<Set<number>>(new Set([0]));
  const [pastEventUploadingIndex, setPastEventUploadingIndex] = useState<number | null>(null);
  const [pastEventUploadError, setPastEventUploadError] = useState<string | null>(null);

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
    blogPosts: content.blogPosts.map((p) => ({ ...p, body: p.body ?? '', imageUrl: p.imageUrl ?? '' })),
    galleryItems: content.galleryItems.map((i) => ({ ...i })),
    members: content.members.map((m) => ({ ...m, imageUrl: m.imageUrl ?? '' })),
    events: content.events.map((e) => ({ ...e })),
    pastEvents: content.pastEvents.map((e) => ({ ...e, images: e.images ?? [] })),
    projects: content.projects.map((p) => ({ ...p })),
    newsItems: content.newsItems.map((n) => ({ ...n })),
  });

  // Auto-dismiss saved toast after 3 s
  useEffect(() => {
    if (savedAt === null) return;
    const id = setTimeout(() => setSavedAt(null), 3000);
    return () => clearTimeout(id);
  }, [savedAt]);

  const handleChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleBlogChange =
    (index: number, key: 'title' | 'date' | 'detail' | 'body' | 'imageUrl') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        blogPosts: prev.blogPosts.map((p, i) => (i === index ? { ...p, [key]: e.target.value } : p)),
      }));

  const handleGalleryTitleChange =
    (index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        galleryItems: prev.galleryItems.map((item, i) =>
          i === index ? { ...item, title: e.target.value } : item,
        ),
      }));

  const uploadToImgBB = async (file: File): Promise<string> => {
    const key = import.meta.env.VITE_IMGBB_KEY;
    if (!key || key === 'your_imgbb_api_key_here') {
      throw new Error('ImgBB API key not set. Add VITE_IMGBB_KEY to your .env file.');
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', key);
    const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
    const json = await res.json();
    if (!json.success) throw new Error(json.error?.message ?? 'Image upload failed.');
    return json.data.url as string;
  };

  const handleGalleryImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    setUploadError(null);
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({
        ...prev,
        galleryItems: prev.galleryItems.map((item, i) =>
          i === index ? { ...item, imageUrl: url } : item,
        ),
      }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const addBlogPost = () => {
    const next = form.blogPosts.length;
    setForm((prev) => ({
      ...prev,
      blogPosts: [...prev.blogPosts, { title: '', date: '', detail: '', body: '', imageUrl: '' }],
    }));
    setExpandedPosts((prev) => new Set([...prev, next]));
  };

  const removeBlogPost = (index: number) => {
    setForm((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((_, i) => i !== index),
    }));
    setExpandedPosts((prev) => {
      const next = new Set<number>();
      prev.forEach((n) => { if (n < index) next.add(n); else if (n > index) next.add(n - 1); });
      return next;
    });
  };

  const togglePost = (index: number) =>
    setExpandedPosts((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });

  const addGalleryItem = () =>
    setForm((prev) => ({ ...prev, galleryItems: [...prev.galleryItems, { title: '' }] }));

  const removeGalleryItem = (index: number) =>
    setForm((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((_, i) => i !== index),
    }));

  const handleMemberChange =
    (index: number, key: 'name' | 'title' | 'bio' | 'imageUrl') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        members: prev.members.map((m, i) => (i === index ? { ...m, [key]: e.target.value } : m)),
      }));

  const handleMemberImageUpload = async (index: number, file: File) => {
    setMemberUploadingIndex(index);
    setMemberUploadError(null);
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({
        ...prev,
        members: prev.members.map((m, i) =>
          i === index ? { ...m, imageUrl: url } : m,
        ),
      }));
    } catch (err) {
      setMemberUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setMemberUploadingIndex(null);
    }
  };

  const addMember = () => {
    const id = `member-${Date.now()}`;
    const next = form.members.length;
    setForm((prev) => ({
      ...prev,
      members: [...prev.members, { id, name: '', title: '', bio: '', imageUrl: '' }],
    }));
    setExpandedMembers((prev) => new Set([...prev, next]));
  };

  const removeMember = (index: number) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
    setExpandedMembers((prev) => {
      const next = new Set<number>();
      prev.forEach((n) => {
        if (n < index) next.add(n);
        else if (n > index) next.add(n - 1);
      });
      return next;
    });
  };

  const toggleMember = (index: number) =>
    setExpandedMembers((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });

  const handleEventChange =
    (index: number, key: keyof EventItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        events: prev.events.map((ev, i) => (i === index ? { ...ev, [key]: e.target.value } : ev)),
      }));

  const addEvent = () =>
    setForm((prev) => ({
      ...prev,
      events: [...prev.events, { title: '', date: '', location: '', detail: '' }],
    }));

  const removeEvent = (index: number) =>
    setForm((prev) => ({ ...prev, events: prev.events.filter((_, i) => i !== index) }));

  const handlePastEventChange =
    (index: number, key: keyof PastEvent) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        pastEvents: prev.pastEvents.map((ev, i) => (i === index ? { ...ev, [key]: e.target.value } : ev)),
      }));

  const addPastEvent = () =>
    setForm((prev) => ({
      ...prev,
      pastEvents: [
        ...prev.pastEvents,
        { id: `past-event-${Date.now()}`, title: '', date: '', location: '', detail: '', images: [] },
      ],
    }));

  const removePastEvent = (index: number) =>
    setForm((prev) => ({ ...prev, pastEvents: prev.pastEvents.filter((_, i) => i !== index) }));

  const handlePastEventImageUpload = async (eventIndex: number, file: File) => {
    setPastEventUploadingIndex(eventIndex);
    setPastEventUploadError(null);
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({
        ...prev,
        pastEvents: prev.pastEvents.map((ev, i) =>
          i === eventIndex
            ? { ...ev, images: [...(ev.images ?? []), url] }
            : ev
        ),
      }));
    } catch (err) {
      setPastEventUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setPastEventUploadingIndex(null);
    }
  };

  const removePastEventImage = (eventIndex: number, imageIndex: number) =>
    setForm((prev) => ({
      ...prev,
      pastEvents: prev.pastEvents.map((ev, i) =>
        i === eventIndex
          ? { ...ev, images: (ev.images ?? []).filter((_, j) => j !== imageIndex) }
          : ev
      ),
    }));

  const handleProjectChange =
    (index: number, key: keyof ProjectItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({
        ...prev,
        projects: prev.projects.map((p, i) => (i === index ? { ...p, [key]: e.target.value } : p)),
      }));

  const addProject = () =>
    setForm((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', status: 'Planning' as const, detail: '' }],
    }));

  const removeProject = (index: number) =>
    setForm((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));

  const handleNewsChange =
    (index: number, key: keyof NewsItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        newsItems: prev.newsItems.map((n, i) => (i === index ? { ...n, [key]: e.target.value } : n)),
      }));

  const addNewsItem = () =>
    setForm((prev) => ({
      ...prev,
      newsItems: [...prev.newsItems, { title: '', date: '', detail: '' }],
    }));

  const removeNewsItem = (index: number) =>
    setForm((prev) => ({ ...prev, newsItems: prev.newsItems.filter((_, i) => i !== index) }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await updateContent({
        heroHeadline: form.heroHeadline,
        heroSubheadline: form.heroSubheadline,
        mission: form.mission,
        vision: form.vision,
        values: form.values.split(',').map((v) => v.trim()).filter(Boolean),
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        location: form.location,
        donationLink: form.donationLink,
        announcement: form.announcement,
        theme: form.theme,
        language: form.language,
        blogPosts: form.blogPosts.map(({ title, date, detail, body, imageUrl }) => ({
          title,
          date,
          detail,
          body: body || undefined,
          imageUrl: imageUrl || undefined,
        })),
        galleryItems: form.galleryItems,
        dataVersion: defaultContent.dataVersion,
        members: form.members.map(({ id, name, title, bio, imageUrl }) => ({
          id,
          name,
          title,
          bio,
          imageUrl: imageUrl || undefined,
        })),
        events: form.events,
        pastEvents: form.pastEvents.map(({ id, title, date, location, detail, images }) => ({
          id,
          title,
          date,
          location,
          detail,
          images: images?.length ? images : undefined,
        })),
        projects: form.projects,
        newsItems: form.newsItems,
      });
      setSavedAt(Date.now());
    },
    [form, updateContent],
  );

  const handleReset = async () => {
    if (!confirm('Reset all content to defaults? This cannot be undone.')) return;
    await resetContent();
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
      blogPosts: defaultContent.blogPosts.map((p) => ({ ...p, body: p.body ?? '', imageUrl: p.imageUrl ?? '' })),
      galleryItems: defaultContent.galleryItems.map((i) => ({ ...i })),
      members: defaultContent.members.map((m) => ({ ...m, imageUrl: m.imageUrl ?? '' })),
      events: defaultContent.events.map((e) => ({ ...e })),
      pastEvents: defaultContent.pastEvents.map((e) => ({ ...e, images: e.images ?? [] })),
      projects: defaultContent.projects.map((p) => ({ ...p })),
      newsItems: defaultContent.newsItems.map((n) => ({ ...n })),
    });
    setSavedAt(Date.now());
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'general', label: 'General', icon: <SettingsIcon className="h-3.5 w-3.5" /> },
    { id: 'events', label: 'Events', icon: <CalendarIcon className="h-3.5 w-3.5" />, count: form.events.length },
    { id: 'past-events', label: 'Past Events', icon: <CalendarIcon className="h-3.5 w-3.5" />, count: form.pastEvents.length },
    { id: 'projects', label: 'Projects', icon: <ImageIcon className="h-3.5 w-3.5" />, count: form.projects.length },
    { id: 'news', label: 'News', icon: <ImageIcon className="h-3.5 w-3.5" />, count: form.newsItems.length },
    { id: 'blog', label: 'Blog', icon: <ImageIcon className="h-3.5 w-3.5" />, count: form.blogPosts.length },
    { id: 'gallery', label: 'Gallery', icon: <CameraIcon className="h-3.5 w-3.5" />, count: form.galleryItems.length },
    { id: 'members', label: 'Members', icon: <UsersIcon className="h-3.5 w-3.5" />, count: form.members.length },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-0">

      {/* ── Admin header ── */}
      <div
        className="sticky top-0 z-40 -mx-6 px-6 py-4 sm:-mx-8 sm:px-8 md:-mx-14 md:px-14"
        style={{ background: 'rgb(var(--color-sand)/0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgb(var(--card-border))' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Admin Dashboard</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{username ?? 'Administrator'}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Saved indicator */}
            {savedAt && (
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-forest"
                style={{ background: 'rgb(var(--color-forest)/0.1)', border: '1px solid rgb(var(--color-forest)/0.25)' }}>
                <CheckCircleIcon className="h-3.5 w-3.5" /> Saved
              </span>
            )}
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-charcoal/60 transition hover:text-ink"
              style={{ borderColor: 'rgb(var(--card-border))' }}
            >
              <EyeIcon className="h-3.5 w-3.5" /> View Site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-ember transition hover:bg-ember/10"
              style={{ borderColor: 'rgb(var(--color-ember)/0.35)' }}
            >
              <LogOutIcon className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mt-4 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                activeTab === tab.id
                  ? 'text-forest'
                  : 'text-charcoal/40 hover:text-charcoal/70'
              }`}
              style={activeTab === tab.id ? { background: 'rgb(var(--color-forest)/0.1)' } : {}}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{
                    background: activeTab === tab.id ? 'rgb(var(--color-forest)/0.15)' : 'rgb(var(--card-border))',
                    color: activeTab === tab.id ? 'rgb(var(--color-forest))' : 'rgb(var(--color-charcoal)/0.5)',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="space-y-5 pt-6">

        {/* ════ GENERAL TAB ════ */}
        {activeTab === 'general' && (
          <div className="space-y-5">

            <Card title="Appearance">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Theme">
                  <select value={form.theme} onChange={handleChange('theme')} className={inputCls} style={inputStyle}>
                    {themeOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Language">
                  <select value={form.language} onChange={handleChange('language')} className={inputCls} style={inputStyle}>
                    {languageOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </Card>

            <Card title="Hero Section">
              <Field label="Headline">
                <input value={form.heroHeadline} onChange={handleChange('heroHeadline')} className={inputCls} style={inputStyle} />
              </Field>
              <Field label="Subheadline">
                <textarea value={form.heroSubheadline} onChange={handleChange('heroSubheadline')} rows={3} className={inputCls} style={inputStyle} />
              </Field>
            </Card>

            <Card title="About Us">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Mission">
                  <textarea value={form.mission} onChange={handleChange('mission')} rows={4} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Vision">
                  <textarea value={form.vision} onChange={handleChange('vision')} rows={4} className={inputCls} style={inputStyle} />
                </Field>
              </div>
              <Field label="Values" hint="Separate each value with a comma">
                <input value={form.values} onChange={handleChange('values')} className={inputCls} style={inputStyle} placeholder="Unity, Integrity, Service" />
                {/* Preview pills */}
                {form.values && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {form.values.split(',').map((v) => v.trim()).filter(Boolean).map((v) => (
                      <span key={v} className="badge">{v}</span>
                    ))}
                  </div>
                )}
              </Field>
            </Card>

            <Card title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email">
                  <input type="email" value={form.contactEmail} onChange={handleChange('contactEmail')} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Phone">
                  <input value={form.contactPhone} onChange={handleChange('contactPhone')} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Location">
                  <input value={form.location} onChange={handleChange('location')} className={inputCls} style={inputStyle} />
                </Field>
                <Field label="Donation Link">
                  <input type="url" value={form.donationLink} onChange={handleChange('donationLink')} className={inputCls} style={inputStyle} />
                </Field>
              </div>
            </Card>

            <Card title="Announcement Banner">
              <Field label="Banner Text" hint="Shown in the footer and homepage. Keep it brief.">
                <textarea value={form.announcement} onChange={handleChange('announcement')} rows={3} className={inputCls} style={inputStyle} />
              </Field>
              {form.announcement && (
                <div
                  className="rounded-xl px-4 py-3 text-xs leading-relaxed text-charcoal/70"
                  style={{ background: 'rgb(var(--color-forest)/0.06)', border: '1px solid rgb(var(--color-forest)/0.2)' }}
                >
                  <span className="mr-2 text-[9px] font-bold uppercase tracking-[0.2em] text-forest">Preview</span>
                  {form.announcement}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ════ EVENTS TAB ════ */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Events</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.events.length} events · shown on Events page and Home</p>
              </div>
              <button
                type="button"
                onClick={addEvent}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Event
              </button>
            </div>

            {form.events.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <CalendarIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No events yet.</p>
              </div>
            )}

            <div className="space-y-4">
              {form.events.map((event, index) => (
                <div
                  key={index}
                  className="rounded-2xl space-y-4 p-5"
                  style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: 'rgb(var(--card-border))', color: 'rgb(var(--color-charcoal)/0.5)' }}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-semibold text-ink">
                      {event.title || <span className="italic text-charcoal/30">Untitled event</span>}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEvent(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal/30 transition hover:text-ember"
                      style={{ border: '1px solid rgb(var(--card-border))' }}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Event Title">
                      <input value={event.title} onChange={handleEventChange(index, 'title')} className={inputCls} style={inputStyle} placeholder="e.g. Nenwe Cultural Showcase" />
                    </Field>
                    <Field label="Date" hint="e.g. June 14, 2026">
                      <input value={event.date} onChange={handleEventChange(index, 'date')} className={inputCls} style={inputStyle} placeholder="June 14, 2026" />
                    </Field>
                    <Field label="Location">
                      <input value={event.location} onChange={handleEventChange(index, 'location')} className={inputCls} style={inputStyle} placeholder="e.g. London, UK or Virtual" />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea value={event.detail} onChange={handleEventChange(index, 'detail')} rows={2} className={inputCls} style={inputStyle} placeholder="Brief description of the event" />
                  </Field>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ PAST EVENTS TAB ════ */}
        {activeTab === 'past-events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Past Events</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.pastEvents.length} past events · each has its own page at /events/:id</p>
              </div>
              <button
                type="button"
                onClick={addPastEvent}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Past Event
              </button>
            </div>

            {pastEventUploadError && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-ember"
                style={{ background: 'rgb(var(--color-ember)/0.1)', border: '1px solid rgb(var(--color-ember)/0.25)' }}
              >
                {pastEventUploadError}
              </div>
            )}

            {form.pastEvents.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <CalendarIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No past events yet.</p>
              </div>
            )}

            <div className="space-y-4">
              {form.pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="rounded-2xl space-y-4 p-5"
                  style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: 'rgb(var(--card-border))', color: 'rgb(var(--color-charcoal)/0.5)' }}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-semibold text-ink">
                      {event.title || <span className="italic text-charcoal/30">Untitled event</span>}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePastEvent(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal/30 transition hover:text-ember"
                      style={{ border: '1px solid rgb(var(--card-border))' }}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Event Title">
                      <input value={event.title} onChange={handlePastEventChange(index, 'title')} className={inputCls} style={inputStyle} placeholder="e.g. NPA UK Get-Together in Manchester" />
                    </Field>
                    <Field label="Date" hint="e.g. November 2025">
                      <input value={event.date} onChange={handlePastEventChange(index, 'date')} className={inputCls} style={inputStyle} placeholder="November 2025" />
                    </Field>
                    <Field label="Location">
                      <input value={event.location} onChange={handlePastEventChange(index, 'location')} className={inputCls} style={inputStyle} placeholder="e.g. Manchester, UK" />
                    </Field>
                    <Field label="URL Slug (do not change)" hint="Used in the event page URL">
                      <input value={event.id} onChange={handlePastEventChange(index, 'id')} className={inputCls} style={inputStyle} placeholder="e.g. manchester-nov-2025" />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea value={event.detail} onChange={handlePastEventChange(index, 'detail')} rows={2} className={inputCls} style={inputStyle} placeholder="Brief description of the event" />
                  </Field>

                  {/* Photos */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
                      Event Photos
                    </label>
                    {(event.images ?? []).length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {(event.images ?? []).map((url, imgIdx) => (
                          <div key={imgIdx} className="relative group">
                            <img
                              src={url}
                              alt=""
                              className="h-20 w-full rounded-lg object-cover"
                              style={{ border: '1px solid rgb(var(--card-border))' }}
                            />
                            <button
                              type="button"
                              onClick={() => removePastEventImage(index, imgIdx)}
                              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-sand opacity-0 transition group-hover:opacity-100"
                            >
                              <TrashIcon className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <label
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                        pastEventUploadingIndex === index
                          ? 'cursor-not-allowed text-charcoal/30'
                          : 'text-forest hover:bg-forest/10'
                      }`}
                      style={{
                        borderColor: pastEventUploadingIndex === index
                          ? 'rgb(var(--card-border))'
                          : 'rgb(var(--color-forest)/0.35)',
                      }}
                    >
                      <CameraIcon className="h-3 w-3" />
                      {pastEventUploadingIndex === index ? 'Uploading…' : 'Add Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={pastEventUploadingIndex !== null}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePastEventImageUpload(index, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ PROJECTS TAB ════ */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Projects</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.projects.length} projects · shown on Projects page and Home</p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Project
              </button>
            </div>

            {form.projects.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <ImageIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No projects yet.</p>
              </div>
            )}

            <div className="space-y-4">
              {form.projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-2xl space-y-4 p-5"
                  style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: 'rgb(var(--card-border))', color: 'rgb(var(--color-charcoal)/0.5)' }}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-semibold text-ink">
                      {project.title || <span className="italic text-charcoal/30">Untitled project</span>}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal/30 transition hover:text-ember"
                      style={{ border: '1px solid rgb(var(--card-border))' }}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Project Title">
                      <input value={project.title} onChange={handleProjectChange(index, 'title')} className={inputCls} style={inputStyle} placeholder="e.g. Rural Water Access" />
                    </Field>
                    <Field label="Status">
                      <select value={project.status} onChange={handleProjectChange(index, 'status')} className={inputCls} style={inputStyle}>
                        {PROJECT_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea value={project.detail} onChange={handleProjectChange(index, 'detail')} rows={2} className={inputCls} style={inputStyle} placeholder="Brief description of the project" />
                  </Field>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ NEWS TAB ════ */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">News Items</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.newsItems.length} items · shown on News page</p>
              </div>
              <button
                type="button"
                onClick={addNewsItem}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Item
              </button>
            </div>

            {form.newsItems.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <ImageIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No news items yet.</p>
              </div>
            )}

            <div className="space-y-4">
              {form.newsItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl space-y-4 p-5"
                  style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold"
                      style={{ background: 'rgb(var(--card-border))', color: 'rgb(var(--color-charcoal)/0.5)' }}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-semibold text-ink">
                      {item.title || <span className="italic text-charcoal/30">Untitled item</span>}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeNewsItem(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal/30 transition hover:text-ember"
                      style={{ border: '1px solid rgb(var(--card-border))' }}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Headline">
                      <input value={item.title} onChange={handleNewsChange(index, 'title')} className={inputCls} style={inputStyle} placeholder="e.g. Scholarship Applications Open" />
                    </Field>
                    <Field label="Date" hint="e.g. March 12, 2026">
                      <input value={item.date} onChange={handleNewsChange(index, 'date')} className={inputCls} style={inputStyle} placeholder="March 12, 2026" />
                    </Field>
                  </div>
                  <Field label="Summary">
                    <textarea value={item.detail} onChange={handleNewsChange(index, 'detail')} rows={2} className={inputCls} style={inputStyle} placeholder="Brief summary of the news item" />
                  </Field>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ BLOG TAB ════ */}
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Blog Posts</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.blogPosts.length} posts · first post is featured</p>
              </div>
              <button
                type="button"
                onClick={addBlogPost}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Post
              </button>
            </div>

            {form.blogPosts.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <ImageIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No blog posts yet.</p>
              </div>
            )}

            <div className="space-y-3">
              {form.blogPosts.map((post, index) => {
                const isOpen = expandedPosts.has(index);
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl"
                    style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                  >
                    {/* Accordion header */}
                    <button
                      type="button"
                      onClick={() => togglePost(index)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-forest/5"
                    >
                      <span
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ background: index === 0 ? 'rgb(var(--color-forest)/0.15)' : 'rgb(var(--card-border))', color: index === 0 ? 'rgb(var(--color-forest))' : 'rgb(var(--color-charcoal)/0.5)' }}
                      >
                        {index + 1}
                      </span>
                      <span className="flex-1 truncate text-sm font-semibold text-ink">
                        {post.title || <span className="text-charcoal/30 italic">Untitled post</span>}
                      </span>
                      {index === 0 && (
                        <span className="badge mr-1">Featured</span>
                      )}
                      <span className="text-xs text-charcoal/40">{post.date}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 flex-none text-charcoal/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Accordion body */}
                    {isOpen && (
                      <div className="space-y-4 border-t px-5 py-5" style={{ borderColor: 'rgb(var(--card-border))' }}>
                        <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
                          <Field label="Title">
                            <input value={post.title} onChange={handleBlogChange(index, 'title')} className={inputCls} style={inputStyle} />
                          </Field>
                          <Field label="Date" hint="e.g. March 3, 2026">
                            <input value={post.date} onChange={handleBlogChange(index, 'date')} className={inputCls} style={inputStyle} placeholder="March 3, 2026" />
                          </Field>
                        </div>
                        <Field label="Summary" hint="Shown on card previews">
                          <textarea value={post.detail} onChange={handleBlogChange(index, 'detail')} rows={2} className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="Image URL" hint="Paste a direct image link (Unsplash, your own upload, etc.)">
                          <div className="flex gap-3">
                            <input value={post.imageUrl} onChange={handleBlogChange(index, 'imageUrl')} className={inputCls} style={inputStyle} placeholder="https://…" />
                            {post.imageUrl && (
                              <img src={post.imageUrl} alt="" className="mt-2 h-10 w-16 flex-none rounded-lg object-cover" style={{ border: '1px solid rgb(var(--card-border))' }} />
                            )}
                          </div>
                        </Field>
                        <Field label="Full Content" hint="Separate paragraphs with a blank line">
                          <textarea value={post.body} onChange={handleBlogChange(index, 'body')} rows={8} className={inputCls} style={inputStyle} placeholder="Write the full post body here…" />
                        </Field>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeBlogPost(index)}
                            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-ember transition hover:bg-ember/10"
                            style={{ borderColor: 'rgb(var(--color-ember)/0.35)' }}
                          >
                            <TrashIcon className="h-3 w-3" /> Remove Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ GALLERY TAB ════ */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Gallery Items</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.galleryItems.length} items · upload images via Supabase storage</p>
              </div>
              <button
                type="button"
                onClick={addGalleryItem}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Item
              </button>
            </div>

            {uploadError && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-ember"
                style={{ background: 'rgb(var(--color-ember)/0.1)', border: '1px solid rgb(var(--color-ember)/0.25)' }}
              >
                {uploadError}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {form.galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl"
                  style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                >
                  {/* Image preview or placeholder */}
                  {item.imageUrl ? (
                    <div className="relative h-40 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 50%)' }} />
                    </div>
                  ) : (
                    <div
                      className="flex h-40 items-center justify-center"
                      style={{ background: index % 2 === 0 ? 'rgb(var(--color-forest)/0.05)' : 'rgb(var(--color-ember)/0.05)' }}
                    >
                      <CameraIcon className="h-8 w-8 text-charcoal/20" />
                    </div>
                  )}

                  {/* Controls */}
                  <div className="space-y-3 p-4">
                    <input
                      value={item.title}
                      onChange={handleGalleryTitleChange(index)}
                      placeholder="Item title"
                      className="w-full rounded-lg border px-3 py-2 text-xs text-ink outline-none transition-colors focus:border-forest/50"
                      style={inputStyle}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <label
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                          uploadingIndex === index
                            ? 'cursor-not-allowed text-charcoal/30'
                            : 'text-forest hover:bg-forest/10'
                        }`}
                        style={{ borderColor: uploadingIndex === index ? 'rgb(var(--card-border))' : 'rgb(var(--color-forest)/0.35)' }}
                      >
                        <CameraIcon className="h-3 w-3" />
                        {uploadingIndex === index ? 'Uploading…' : item.imageUrl ? 'Replace' : 'Upload'}
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
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(index)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal/30 transition hover:text-ember"
                        style={{ border: '1px solid rgb(var(--card-border))' }}
                        title="Remove item"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add item placeholder */}
              <button
                type="button"
                onClick={addGalleryItem}
                className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 rounded-2xl transition hover:bg-forest/5"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <PlusIcon className="h-6 w-6 text-charcoal/20" />
                <p className="text-xs text-charcoal/30">Add item</p>
              </button>
            </div>
          </div>
        )}

        {/* ════ MEMBERS TAB ════ */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Community Members</p>
                <p className="mt-0.5 text-xs text-charcoal/50">{form.members.length} members · shown on the About page</p>
              </div>
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                <PlusIcon className="h-3 w-3" /> Add Member
              </button>
            </div>

            {memberUploadError && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-ember"
                style={{ background: 'rgb(var(--color-ember)/0.1)', border: '1px solid rgb(var(--color-ember)/0.25)' }}
              >
                {memberUploadError}
              </div>
            )}

            {form.members.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ border: '1px dashed rgb(var(--card-border))' }}
              >
                <UsersIcon className="mb-3 h-8 w-8 text-charcoal/20" />
                <p className="text-sm text-charcoal/40">No members yet. Add your first one.</p>
              </div>
            )}

            <div className="space-y-3">
              {form.members.map((member, index) => {
                const isOpen = expandedMembers.has(index);
                return (
                  <div
                    key={member.id}
                    className="overflow-hidden rounded-2xl"
                    style={{ border: '1px solid rgb(var(--card-border))', background: 'rgb(var(--card-bg))' }}
                  >
                    {/* Accordion header */}
                    <button
                      type="button"
                      onClick={() => toggleMember(index)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-forest/5"
                    >
                      {/* Photo thumbnail or initial */}
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt=""
                          className="h-8 w-8 flex-none rounded-lg object-cover object-top"
                          style={{ border: '1px solid rgb(var(--card-border))' }}
                        />
                      ) : (
                        <span
                          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-xs font-bold"
                          style={{ background: 'rgb(var(--color-forest)/0.1)', color: 'rgb(var(--color-forest))' }}
                        >
                          {member.name ? member.name.charAt(0).toUpperCase() : index + 1}
                        </span>
                      )}
                      <span className="flex-1 truncate text-sm font-semibold text-ink">
                        {member.name || <span className="italic text-charcoal/30">Unnamed member</span>}
                      </span>
                      {member.title && (
                        <span className="hidden text-xs text-charcoal/40 sm:block">{member.title}</span>
                      )}
                      <ChevronDownIcon
                        className={`h-4 w-4 flex-none text-charcoal/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Accordion body */}
                    {isOpen && (
                      <div className="space-y-4 border-t px-5 py-5" style={{ borderColor: 'rgb(var(--card-border))' }}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Full Name">
                            <input
                              value={member.name}
                              onChange={handleMemberChange(index, 'name')}
                              className={inputCls}
                              style={inputStyle}
                              placeholder="e.g. Chukwuemeka Obi"
                            />
                          </Field>
                          <Field label="Title / Role">
                            <input
                              value={member.title}
                              onChange={handleMemberChange(index, 'title')}
                              className={inputCls}
                              style={inputStyle}
                              placeholder="e.g. Community Secretary"
                            />
                          </Field>
                        </div>

                        <Field label="Bio" hint="Separate paragraphs with a blank line">
                          <textarea
                            value={member.bio}
                            onChange={handleMemberChange(index, 'bio')}
                            rows={6}
                            className={inputCls}
                            style={inputStyle}
                            placeholder="Write the member's biography here…"
                          />
                        </Field>

                        <Field label="Photo" hint="Paste a direct image URL, or upload to Supabase storage">
                          <div className="flex gap-3">
                            <input
                              value={member.imageUrl}
                              onChange={handleMemberChange(index, 'imageUrl')}
                              className={inputCls}
                              style={inputStyle}
                              placeholder="/img1.jpeg or https://…"
                            />
                            {member.imageUrl && (
                              <img
                                src={member.imageUrl}
                                alt=""
                                className="mt-2 h-10 w-10 flex-none rounded-lg object-cover object-top"
                                style={{ border: '1px solid rgb(var(--card-border))' }}
                              />
                            )}
                          </div>
                          <label
                            className={`mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                              memberUploadingIndex === index
                                ? 'cursor-not-allowed text-charcoal/30'
                                : 'text-forest hover:bg-forest/10'
                            }`}
                            style={{
                              borderColor:
                                memberUploadingIndex === index
                                  ? 'rgb(var(--card-border))'
                                  : 'rgb(var(--color-forest)/0.35)',
                            }}
                          >
                            <CameraIcon className="h-3 w-3" />
                            {memberUploadingIndex === index
                              ? 'Uploading…'
                              : member.imageUrl
                              ? 'Replace Photo'
                              : 'Upload Photo'}
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              disabled={memberUploadingIndex !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleMemberImageUpload(index, file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </Field>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-ember transition hover:bg-ember/10"
                            style={{ borderColor: 'rgb(var(--color-ember)/0.35)' }}
                          >
                            <TrashIcon className="h-3 w-3" /> Remove Member
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Save / Reset bar ── */}
        <div
          className="sticky bottom-0 -mx-6 flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:-mx-8 sm:px-8 md:-mx-14 md:px-14"
          style={{ background: 'rgb(var(--color-sand)/0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgb(var(--card-border))' }}
        >
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50 transition hover:text-ink"
            style={{ borderColor: 'rgb(var(--card-border))' }}
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
            style={{ background: 'rgb(var(--color-forest))' }}
          >
            {savedAt ? <><CheckCircleIcon className="h-3.5 w-3.5" /> Saved!</> : 'Save Changes'}
          </button>
        </div>

      </div>
    </form>
  );
};
