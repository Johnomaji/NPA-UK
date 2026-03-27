import { useState } from 'react';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { supabase } from '../lib/supabase';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, HeartIcon } from '../components/Icons';

type FormState = { name: string; email: string; message: string };
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-4">
    <div
      className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl text-forest"
      style={{ background: 'rgb(var(--color-forest)/0.12)', border: '1px solid rgb(var(--color-forest)/0.2)' }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">{label}</p>
      <p className="mt-0.5 text-sm text-charcoal/80">{value}</p>
    </div>
  </div>
);

export const Contact = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-14">

      {/* Page intro */}
      <div className="space-y-3">
        <p className="section-kicker">NPA UK</p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{t.contact.title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{t.contact.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">

        {/* ── Form ── */}
        <div
          className="rounded-3xl p-7 sm:p-10 space-y-6"
          style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">Send a message</p>

          {status === 'success' && (
            <div
              className="rounded-2xl px-5 py-4 text-sm text-forest"
              style={{ background: 'rgb(var(--color-forest)/0.1)', border: '1px solid rgb(var(--color-forest)/0.25)' }}
            >
              {t.contact.form.successMessage}
            </div>
          )}
          {status === 'error' && (
            <div
              className="rounded-2xl px-5 py-4 text-sm text-ember"
              style={{ background: 'rgb(var(--color-ember)/0.1)', border: '1px solid rgb(var(--color-ember)/0.25)' }}
            >
              {t.contact.form.errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                  {t.contact.form.name}
                </label>
                <input
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder={t.contact.form.namePlaceholder}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-forest/50"
                  style={{ borderColor: 'rgb(var(--card-border))' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder={t.contact.form.emailPlaceholder}
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-forest/50"
                  style={{ borderColor: 'rgb(var(--card-border))' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                {t.contact.form.message}
              </label>
              <textarea
                value={form.message}
                onChange={handleChange('message')}
                placeholder={t.contact.form.messagePlaceholder}
                required
                rows={7}
                className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-forest/50"
                style={{ borderColor: 'rgb(var(--card-border))' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110 disabled:opacity-50"
              style={{ background: 'rgb(var(--color-forest))' }}
            >
              {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
            </button>
          </form>
        </div>

        {/* ── Info panel ── */}
        <div className="flex flex-col gap-5">

          {/* Contact details */}
          <div
            className="rounded-3xl p-7 space-y-6"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">
              {t.contact.detailsTitle}
            </p>
            <div className="space-y-5">
              <InfoRow
                icon={<MapPinIcon className="h-4 w-4" />}
                label="Location"
                value={content.location}
              />
              <InfoRow
                icon={<EnvelopeIcon className="h-4 w-4" />}
                label="Email"
                value={content.contactEmail}
              />
              <InfoRow
                icon={<PhoneIcon className="h-4 w-4" />}
                label="Phone"
                value={content.contactPhone}
              />
            </div>
          </div>

          {/* Response time */}
          <div
            className="relative overflow-hidden rounded-3xl p-7 space-y-2"
            style={{
              background: 'rgb(var(--color-forest)/0.06)',
              border: '1px solid rgb(var(--color-forest)/0.25)',
            }}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
              style={{ background: 'rgb(var(--color-forest)/0.15)' }}
            />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-forest">
              Response Time
            </p>
            <p className="relative font-display text-4xl font-bold text-ink">72 hrs</p>
            <p className="relative text-sm text-charcoal/60">{t.contact.responseTime}</p>
          </div>

          {/* Donate link */}
          <a
            href="/donate"
            className="flex items-center gap-4 rounded-3xl p-6 transition hover:border-forest/30 group"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          >
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-ember"
              style={{ background: 'rgb(var(--color-ember)/0.12)', border: '1px solid rgb(var(--color-ember)/0.2)' }}
            >
              <HeartIcon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Support Us</p>
              <p className="mt-0.5 text-sm font-semibold text-charcoal/80 group-hover:text-forest transition-colors">
                Donate to our mission
              </p>
            </div>
            <span className="text-charcoal/30 group-hover:text-forest transition-colors">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
