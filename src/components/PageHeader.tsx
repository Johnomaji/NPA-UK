import { getTranslations } from '../data/translations';
import { useSiteContentContext } from './SiteContentProvider';

export const PageHeader = ({
  title,
  subtitle,
  kicker,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
}) => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);
  const resolvedKicker = kicker ?? t.common.kicker;

  return (
    <div className="space-y-4 border-b pb-10" style={{ borderColor: 'rgb(var(--card-border))' }}>
      <p className="section-kicker">{resolvedKicker}</p>
      <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{title}</h1>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/70">{subtitle}</p>
      ) : null}
    </div>
  );
};
