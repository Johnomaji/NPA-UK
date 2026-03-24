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
    <div className="space-y-3">
      <p className="section-kicker">{resolvedKicker}</p>
      <h1 className="font-display text-4xl text-ink md:text-5xl">{title}</h1>
      {subtitle ? <p className="max-w-2xl text-base text-charcoal/80">{subtitle}</p> : null}
    </div>
  );
};
