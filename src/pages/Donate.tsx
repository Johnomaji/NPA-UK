import { PageHeader } from '../components/PageHeader';
import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';

export const Donate = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  return (
    <div className="space-y-10">
      <PageHeader title={t.donate.title} subtitle={t.donate.subtitle} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <p className="section-kicker">{t.donate.bankTitle}</p>
          <div className="mt-4 space-y-2 text-sm text-charcoal/80">
            <p>{t.donate.accountName}</p>
            <p>{t.donate.bank}</p>
            <p>{t.donate.sortCode}</p>
            <p>{t.donate.accountNumber}</p>
          </div>
        </div>
        <div className="card p-6">
          <p className="section-kicker">{t.donate.onlineTitle}</p>
          <p className="mt-4 text-sm text-charcoal/80">{t.donate.onlineBody}</p>
          <a
            href={content.donationLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-ember px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            {t.donate.onlineCta}
          </a>
        </div>
      </div>
    </div>
  );
};
