import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { CalendarIcon } from '../components/Icons';

const stats = [
  { key: 'members', value: '250+' },
  { key: 'projects', value: '18' },
  { key: 'scholarships', value: '40' },
];

export const Home = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const latestPosts = content.blogPosts.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-24">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl px-5 py-16 sm:px-8 sm:py-20 md:px-14">
        {/* Blurred background image */}
        <div className="absolute inset-0 -z-20 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover scale-110"
            style={{ filter: 'blur(4px)', opacity: 0.18 }}
          />
        </div>
        {/* Dark base + border */}
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{
            background: 'rgb(var(--card-bg) / 0.82)',
            border: '1px solid rgb(var(--card-border))',
          }}
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 rounded-3xl"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgb(var(--color-forest) / 0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute -left-24 top-0 h-96 w-96 rounded-full blur-3xl"
            style={{ background: 'rgb(var(--color-forest) / 0.12)' }}
          />
          <div
            className="absolute -right-16 bottom-0 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'rgb(var(--color-ember) / 0.08)' }}
          />
        </div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          {/* Left — headline + CTAs */}
          <div className="space-y-6 sm:space-y-8">
            <p className="section-kicker">Nenwe Progressive Association UK</p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              United in{' '}
              <span className="text-forest">Heritage.</span>
              <br />
              Driven by{' '}
              <span className="text-ember">Purpose.</span>
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-charcoal/70 sm:text-base">
              {content.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/projects"
                className="rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110 sm:px-6 sm:py-3"
                style={{ background: 'rgb(var(--color-forest))' }}
              >
                {t.home.heroPrimaryCta}
              </Link>
              <Link
                to="/donate"
                className="rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ember transition hover:bg-ember/10 sm:px-6 sm:py-3"
                style={{ borderColor: 'rgb(var(--color-ember) / 0.5)' }}
              >
                {t.home.heroSecondaryCta}
              </Link>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {stats.map((stat, i) => (
              <div
                key={stat.key}
                className="card flex flex-col items-start gap-1 px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5"
              >
                <span className="font-display text-lg font-bold text-forest sm:text-2xl">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <div>
                  <p className="font-display text-2xl font-bold leading-none text-ink sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-charcoal/50 sm:mt-1 sm:text-xs">
                    {t.home.stats[stat.key as keyof typeof t.home.stats]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <Section kicker={t.home.whoKicker} title="Rooted in Igbo heritage," accent="focused on impact.">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {/* Mission */}
          <div className="card space-y-4 p-6 sm:p-7">
            <p className="num-accent">01.</p>
            <p className="text-base font-semibold text-ink">Our Mission</p>
            <p className="text-sm leading-relaxed text-charcoal/70">{content.mission}</p>
          </div>

          {/* Vision — highlighted */}
          <div
            className="card space-y-4 p-6 sm:p-7"
            style={{
              borderColor: 'rgb(var(--color-forest) / 0.35)',
              background: 'rgb(var(--color-forest) / 0.05)',
            }}
          >
            <p className="font-display text-5xl font-bold leading-none text-ember">02.</p>
            <p className="text-base font-semibold text-ink">Our Vision</p>
            <p className="text-sm leading-relaxed text-charcoal/70">{content.vision}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest hover:underline"
            >
              Learn More →
            </Link>
          </div>

          {/* Values */}
          <div className="card space-y-4 p-6 sm:col-span-2 sm:p-7 md:col-span-1">
            <p className="num-accent">03.</p>
            <p className="text-base font-semibold text-ink">Our Values</p>
            <div className="flex flex-wrap gap-2">
              {content.values.map((value) => (
                <span key={value} className="badge">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Upcoming Events ── */}
      <Section kicker={t.home.upcomingKicker} title={t.home.upcomingTitle}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {content.events.slice(0, 3).map((event) => (
            <div key={event.title} className="card group space-y-3 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
                {event.date}
              </p>
              <p className="text-base font-semibold text-ink transition-colors group-hover:text-forest">
                {event.title}
              </p>
              {event.location && (
                <div className="flex items-center gap-2 text-xs text-charcoal/50">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: 'rgb(var(--color-forest))' }}
                  />
                  {event.location}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-right">
          <Link
            to="/events"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-forest hover:underline"
          >
            View All Events →
          </Link>
        </div>
      </Section>

      {/* ── Impact / Projects ── */}
      <Section kicker={t.home.impactKicker} title="Projects shaping" accent="Nenwe.">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {content.projects.slice(0, 3).map((project, i) => {
            const highlight = i === 1;
            return (
              <div
                key={project.title}
                className="card group space-y-4 p-6 sm:p-7"
                style={
                  highlight
                    ? {
                        borderColor: 'rgb(var(--color-ember) / 0.35)',
                        background: 'rgb(var(--color-ember) / 0.04)',
                      }
                    : {}
                }
              >
                <p
                  className="font-display text-4xl font-bold leading-none"
                  style={{
                    color: highlight ? 'rgb(var(--color-ember))' : 'rgb(var(--color-forest))',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}.
                </p>
                <p className="text-base font-semibold text-ink transition-colors group-hover:text-forest">
                  {project.title}
                </p>
                <p className="text-sm leading-relaxed text-charcoal/70">{project.detail}</p>
              </div>
            );
          })}
        </div>
        <div className="text-right">
          <Link
            to="/projects"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-forest hover:underline"
          >
            View All Projects →
          </Link>
        </div>
      </Section>

      {/* ── Latest from the Blog ── */}
      {latestPosts.length > 0 && (
        <Section kicker="Latest News" title="From the" accent="community.">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.title}
                to="/blog"
                className="card group flex flex-col overflow-hidden transition-all duration-200"
              >
                {/* Image */}
                {post.imageUrl ? (
                  <div className="relative h-44 overflow-hidden sm:h-48">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 55%)',
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="h-44 sm:h-48"
                    style={{ background: 'rgb(var(--color-forest)/0.05)' }}
                  />
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-forest">
                    <CalendarIcon className="h-3 w-3" />
                    {post.date}
                  </div>
                  <h3 className="flex-1 text-sm font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-forest sm:text-base">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-charcoal/60 sm:text-sm">
                    {post.detail}
                  </p>
                  <span className="self-start text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-right">
            <Link
              to="/blog"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-forest hover:underline"
            >
              View All Posts →
            </Link>
          </div>
        </Section>
      )}

      {/* ── CTA Banner ── */}
      <section
        className="relative overflow-hidden rounded-3xl px-5 py-14 text-center sm:px-8 sm:py-16 md:px-14"
        style={{ border: '1px solid rgb(var(--card-border))' }}
      >
        {/* Blurred background image */}
        <div className="absolute inset-0 -z-20 overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover scale-110"
            style={{ filter: 'blur(6px)', opacity: 0.2 }}
          />
        </div>
        {/* Dark base */}
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{ background: 'rgb(var(--card-bg) / 0.78)' }}
        />
        {/* Green radial glow from top */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgb(var(--color-forest) / 0.14), transparent 70%)',
          }}
        />
        <div className="relative z-10 space-y-5 sm:space-y-6">
          <p className="section-kicker">Support the Community</p>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
            Every contribution{' '}
            <span className="text-forest">powers real change</span>
            <br className="hidden sm:block" />
            {' '}in Nenwe.
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-charcoal/70">
            From scholarship funds to boreholes — your support directly reaches families and
            communities in Nenwe.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/donate"
              className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110 sm:px-8"
              style={{ background: 'rgb(var(--color-forest))' }}
            >
              Donate Now
            </Link>
            <Link
              to="/projects"
              className="rounded-full border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-charcoal transition hover:text-ink sm:px-8"
              style={{ borderColor: 'rgb(var(--card-border))' }}
            >
              See the Impact
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
