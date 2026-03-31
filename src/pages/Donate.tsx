import { useState } from 'react';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { CheckCircleIcon, HeartIcon } from '../components/Icons';

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] transition"
      style={{
        background: copied ? 'rgb(var(--color-forest)/0.15)' : 'rgb(var(--card-border))',
        color: copied ? 'rgb(var(--color-forest))' : 'rgb(var(--color-charcoal)/0.5)',
      }}
    >
      {copied ? <><CheckCircleIcon className="h-3 w-3" /> Copied</> : 'Copy'}
    </button>
  );
};

const impactAreas = [
  {
    label: 'Education',
    description: 'Scholarships, school supplies, and mentorship for students in Nenwe.',
    color: 'forest',
  },
  {
    label: 'Health',
    description: 'Annual medical missions, screenings, and maternal care support.',
    color: 'ember',
  },
  {
    label: 'Infrastructure',
    description: 'Boreholes, roads, and community spaces that serve Nenwe for generations.',
    color: 'forest',
  },
  {
    label: 'Enterprise',
    description: 'Micro-grants and coaching for women-owned businesses in Nenwe.',
    color: 'ember',
  },
];

export const Donate = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-20">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden rounded-3xl px-10 py-20 md:px-16"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'rgb(var(--color-ember) / 0.07)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgb(var(--color-forest) / 0.06)' }}
        />
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ background: 'rgb(var(--color-ember)/0.15)', border: '1px solid rgb(var(--color-ember)/0.3)' }}
            >
              <HeartIcon className="h-5 w-5 text-ember" />
            </div>
            <p className="section-kicker">Support the Mission</p>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.1] text-ink md:text-6xl">
            Every pound{' '}
            <span className="text-ember">builds</span>
            <br />
            something{' '}
            <span className="text-forest">lasting.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-charcoal/70">
            {t.donate.subtitle}
          </p>
        </div>
      </section>

      {/* ── Impact areas ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="section-kicker">Where Your Money Goes</p>
          <h2 className="section-title">Four pillars of <span className="text-forest">impact</span></h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactAreas.map((area) => (
            <div
              key={area.label}
              className="rounded-2xl p-6 space-y-3"
              style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
            >
              <div
                className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  background: area.color === 'forest' ? 'rgb(var(--color-forest)/0.12)' : 'rgb(var(--color-ember)/0.12)',
                  color: area.color === 'forest' ? 'rgb(var(--color-forest))' : 'rgb(var(--color-ember))',
                }}
              >
                {area.label}
              </div>
              <p className="text-sm leading-relaxed text-charcoal/60">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ways to give ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="section-kicker">Ways to Give</p>
          <h2 className="section-title">Simple, <span className="text-ember">secure</span> giving</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Bank transfer */}
          <div
            className="rounded-3xl p-8 space-y-6"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          >
            <div className="space-y-1">
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: 'rgb(var(--color-forest)/0.12)', border: '1px solid rgb(var(--color-forest)/0.25)' }}
              >
                <span className="text-base font-bold text-forest">£</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">{t.donate.bankTitle}</p>
              <p className="text-lg font-semibold text-ink">Direct bank transfer</p>
              <p className="text-sm text-charcoal/50">Send directly to our Lloyds account. No fees, all of it reaches Nenwe.</p>
            </div>

            {/* Details */}
            <div
              className="rounded-2xl divide-y"
              style={{
                background: 'rgb(var(--color-forest)/0.04)',
                border: '1px solid rgb(var(--color-forest)/0.15)',
                borderColor: 'rgb(var(--color-forest)/0.15)',
              }}
            >
              {[
                { label: 'Account Name', value: t.donate.accountName },
                { label: 'Bank', value: t.donate.bank },
                { label: 'Sort Code', value: t.donate.sortCode },
                { label: 'Account Number', value: t.donate.accountNumber },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                  style={{ borderColor: 'rgb(var(--color-forest)/0.12)' }}
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal/40">{label}</p>
                    <p className="mt-0.5 font-mono text-sm font-semibold text-ink">{value}</p>
                  </div>
                  <CopyButton value={value} />
                </div>
              ))}
            </div>

            <p className="text-xs text-charcoal/40">
              Please include your name and "Donation" in the payment reference so we can acknowledge your gift.
            </p>
          </div>

          {/* Online donation */}
          <div
            className="flex flex-col rounded-3xl p-8 space-y-6"
            style={{
              background: 'rgb(var(--color-ember)/0.04)',
              border: '1px solid rgb(var(--color-ember)/0.2)',
            }}
          >
            <div className="space-y-1">
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: 'rgb(var(--color-ember)/0.15)', border: '1px solid rgb(var(--color-ember)/0.3)' }}
              >
                <HeartIcon className="h-5 w-5 text-ember" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember">{t.donate.onlineTitle}</p>
              <p className="text-lg font-semibold text-ink">Give online in seconds</p>
              <p className="text-sm text-charcoal/50">{t.donate.onlineBody}</p>
            </div>

            {/* Suggested amounts */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Suggested amounts</p>
              <div className="flex flex-wrap gap-2">
                {['£10', '£25', '£50', '£100', '£250'].map((amount) => (
                  <span
                    key={amount}
                    className="rounded-full px-4 py-2 text-xs font-bold"
                    style={{ background: 'rgb(var(--color-ember)/0.1)', color: 'rgb(var(--color-ember))' }}
                  >
                    {amount}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <a
                href={content.donationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110 active:scale-[0.98]"
                style={{ background: 'rgb(var(--color-ember))' }}
              >
                <HeartIcon className="h-4 w-4" />
                {t.donate.onlineCta}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Reassurance strip ── */}
      <section
        className="rounded-3xl px-8 py-10"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
          <p className="flex-none text-xs font-bold uppercase tracking-[0.25em] text-charcoal/40">
            Our Promise
          </p>
          <div className="h-px flex-1 bg-clay/40" />
          <div className="flex flex-wrap gap-4">
            {['100% reaches Nenwe', 'Transparent reporting', 'Community-governed', 'No hidden fees'].map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                style={{
                  borderColor: i % 2 === 0 ? 'rgb(var(--color-forest)/0.3)' : 'rgb(var(--color-ember)/0.3)',
                  color: i % 2 === 0 ? 'rgb(var(--color-forest))' : 'rgb(var(--color-ember))',
                  background: i % 2 === 0 ? 'rgb(var(--color-forest)/0.07)' : 'rgb(var(--color-ember)/0.07)',
                }}
              >
                <CheckCircleIcon className="h-3 w-3 flex-none" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
