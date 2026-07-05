import { Link } from 'react-router-dom';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const About = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-20">

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden rounded-3xl px-10 py-20 md:px-16"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'rgb(var(--color-forest) / 0.08)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-10 h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgb(var(--color-ember) / 0.06)' }}
        />
        <div className="relative z-10 max-w-3xl space-y-6">
          <p className="section-kicker">Nenwe Progressive Association UK</p>
          <h1 className="font-display text-5xl font-bold leading-[1.1] text-ink md:text-6xl">
            We are{' '}
            <span className="text-forest">Ndi Nenwe.</span>
            <br />
            We are{' '}
            <span className="text-ember">One.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-charcoal/70">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="space-y-6">
        <p className="section-kicker">{t.about.purposeKicker}</p>
        <h2 className="section-title">{t.about.purposeTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <div
            className="rounded-3xl p-8 space-y-4"
            style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                style={{ background: 'rgb(var(--color-forest) / 0.15)' }}
              >
                <span className="text-sm font-bold text-forest">M</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Mission</p>
            </div>
            <p className="text-xl font-semibold leading-snug text-ink">{content.mission}</p>
          </div>

          {/* Vision */}
          <div
            className="rounded-3xl p-8 space-y-4"
            style={{
              background: 'rgb(var(--color-forest) / 0.05)',
              border: '1px solid rgb(var(--color-forest) / 0.25)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                style={{ background: 'rgb(var(--color-ember) / 0.15)' }}
              >
                <span className="text-sm font-bold text-ember">V</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Vision</p>
            </div>
            <p className="text-xl font-semibold leading-snug text-ink">{content.vision}</p>
          </div>
        </div>
      </section>

      {/* ── Values strip ── */}
      <section
        className="rounded-3xl px-8 py-10"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
          <p className="flex-none text-xs font-bold uppercase tracking-[0.25em] text-charcoal/50">
            Our Values
          </p>
          <div className="h-px flex-1 bg-clay/40" />
          <div className="flex flex-wrap gap-3">
            {content.values.map((value, i) => (
              <span
                key={value}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]"
                style={{
                  borderColor: i % 2 === 0 ? 'rgb(var(--color-forest)/0.3)' : 'rgb(var(--color-ember)/0.3)',
                  color: i % 2 === 0 ? 'rgb(var(--color-forest))' : 'rgb(var(--color-ember))',
                  background: i % 2 === 0 ? 'rgb(var(--color-forest)/0.08)' : 'rgb(var(--color-ember)/0.08)',
                }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="section-kicker">{t.about.leadershipKicker}</p>
          <h2 className="section-title">{t.about.leadershipTitle}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.about.leadership.map((leader, i) => (
            <div key={leader.name} className="card group p-7 space-y-5">
              {/* Avatar */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: i === 1
                    ? 'rgb(var(--color-forest)/0.15)'
                    : 'rgb(var(--card-border))',
                  border: i === 1
                    ? '1px solid rgb(var(--color-forest)/0.3)'
                    : '1px solid rgb(var(--card-border))',
                }}
              >
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: i === 1 ? 'rgb(var(--color-forest))' : 'rgb(var(--color-charcoal))' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-ink group-hover:text-forest transition-colors">
                  {leader.name}
                </p>
                <p className="text-sm leading-relaxed text-charcoal/60">{leader.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community Members ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="section-kicker">Our People</p>
          <h2 className="section-title">Community Members</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {content.members.map((member) => (
            <Link
              key={member.id}
              to={`/members/${member.id}`}
              className="card group flex flex-col overflow-hidden p-0 transition-transform hover:-translate-y-1"
            >
              {/* Photo */}
              <div
                className="relative flex h-48 items-center justify-center overflow-hidden"
                style={{ background: 'rgb(var(--color-forest)/0.08)' }}
              >
                <span
                  className="font-display text-4xl font-bold"
                  style={{ color: 'rgb(var(--color-forest)/0.3)' }}
                >
                  {member.name.charAt(0)}
                </span>
                {member.imageUrl && (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
              </div>
              {/* Info */}
              <div className="space-y-1 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-forest">
                  {member.title}
                </p>
                <p className="text-sm font-bold text-ink transition-colors group-hover:text-forest">
                  {member.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};
