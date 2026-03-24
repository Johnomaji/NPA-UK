import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const NotFound = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-6">
      <PageHeader title={t.notFound.title} subtitle={t.notFound.subtitle} />
      <Link
        to="/"
        className="inline-flex rounded-full bg-forest px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
      >
        {t.notFound.backHome}
      </Link>
    </div>
  );
};
