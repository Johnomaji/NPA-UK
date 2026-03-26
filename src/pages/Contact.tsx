import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { supabase } from '../lib/supabase';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleChange = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitStatus('sending');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setSubmitStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="space-y-10">
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          {submitStatus === 'success' ? (
            <div className="rounded-xl border border-forest/40 bg-forest/10 px-4 py-3 text-sm text-forest">
              {t.contact.form.successMessage}
            </div>
          ) : null}
          {submitStatus === 'error' ? (
            <div className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
              {t.contact.form.errorMessage}
            </div>
          ) : null}
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">
              {t.contact.form.name}
            </label>
            <input
              value={form.name}
              onChange={handleChange('name')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              placeholder={t.contact.form.namePlaceholder}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">
              {t.contact.form.email}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              placeholder={t.contact.form.emailPlaceholder}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-forest">
              {t.contact.form.message}
            </label>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              className="mt-2 w-full rounded-xl border border-clay/60 bg-white px-4 py-3 text-sm"
              rows={5}
              placeholder={t.contact.form.messagePlaceholder}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitStatus === 'sending'}
            className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
          >
            {submitStatus === 'sending' ? t.contact.form.sending : t.contact.form.send}
          </button>
        </form>
        <div className="card space-y-4 p-6">
          <p className="section-kicker">{t.contact.detailsTitle}</p>
          <p className="text-sm text-charcoal/80">{content.location}</p>
          <p className="text-sm text-charcoal/80">{content.contactEmail}</p>
          <p className="text-sm text-charcoal/80">{content.contactPhone}</p>
          <div className="rounded-2xl border border-clay/60 bg-sand p-4 text-xs uppercase tracking-[0.2em] text-forest">
            {t.contact.responseTime}
          </div>
        </div>
      </div>
    </div>
  );
};
