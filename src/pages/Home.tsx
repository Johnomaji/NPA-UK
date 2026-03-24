import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

const stats = [
  { key: 'members', value: '250+' },
  { key: 'projects', value: '18' },
  { key: 'scholarships', value: '40' },
];

const events = [
  {
    title: 'Enugu Cultural Showcase',
    date: 'June 14, 2026',
    location: 'London',
  },
  {
    title: 'Community Town Hall',
    date: 'July 5, 2026',
    location: 'Virtual',
  },
  {
    title: 'Youth Leadership Retreat',
    date: 'August 20, 2026',
    location: 'Enugu',
  },
];

const projects = [
  {
    title: 'Rural Water Access',
    detail: 'Borehole installations in three Enugu communities.',
  },
  {
    title: 'STEM Mentorship',
    detail: 'Weekly online mentoring for secondary students.',
  },
  {
    title: 'Women in Enterprise Fund',
    detail: 'Micro-grants for local businesses led by women.',
  },
];

export const Home = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-hero-texture px-8 py-14 shadow-card">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <PageHeader title={content.heroHeadline} subtitle={content.heroSubheadline} />
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                {t.home.heroPrimaryCta}
              </Link>
              <Link
                to="/donate"
                className="rounded-full border border-forest/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest"
              >
                {t.home.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {stats.map((stat) => (
              <div key={stat.key} className="card p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-forest">
                  {t.home.stats[stat.key as keyof typeof t.home.stats]}
                </p>
                <p className="font-display text-3xl text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section kicker={t.home.whoKicker} title={t.home.whoTitle}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <p className="text-sm text-charcoal/80">{content.mission}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-charcoal/80">{content.vision}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {content.values.map((value) => (
            <span
              key={value}
              className="rounded-full border border-clay/60 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal"
            >
              {value}
            </span>
          ))}
        </div>
      </Section>

      <Section kicker={t.home.upcomingKicker} title={t.home.upcomingTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((event) => (
            <div key={event.title} className="card p-5">
              <p className="text-sm font-semibold text-ink">{event.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-forest">{event.date}</p>
              <p className="text-xs text-charcoal/70">{event.location}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker={t.home.impactKicker} title={t.home.impactTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="card p-5">
              <p className="text-sm font-semibold text-ink">{project.title}</p>
              <p className="text-sm text-charcoal/70">{project.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
