import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const About = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-12">
      <PageHeader title={t.about.title} subtitle={t.about.subtitle} />

      <Section kicker={t.about.purposeKicker} title={t.about.purposeTitle}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <p className="text-sm text-charcoal/80">{content.mission}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-charcoal/80">{content.vision}</p>
          </div>
        </div>
      </Section>

      <Section kicker={t.about.leadershipKicker} title={t.about.leadershipTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {t.about.leadership.map((leader) => (
            <div key={leader.name} className="card p-5">
              <p className="text-sm font-semibold text-ink">{leader.name}</p>
              <p className="text-sm text-charcoal/70">{leader.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
