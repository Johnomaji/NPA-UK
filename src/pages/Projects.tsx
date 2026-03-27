import { useSiteContentContext } from '../components/SiteContentProvider';
import { getTranslations } from '../data/translations';
import { PageHeader } from '../components/PageHeader';

const statusConfig: Record<string, { pill: string; dot: string; progress: number }> = {
  Active:   { pill: 'text-forest border-forest/30 bg-forest/10',   dot: 'bg-forest',   progress: 78 },
  Ongoing:  { pill: 'text-sky-400 border-sky-400/30 bg-sky-400/10', dot: 'bg-sky-400',  progress: 55 },
  Funding:  { pill: 'text-ember border-ember/30 bg-ember/10',       dot: 'bg-ember',    progress: 35 },
  Planning: { pill: 'text-charcoal border-clay/60 bg-clay/10',      dot: 'bg-charcoal', progress: 12 },
};

export const Projects = () => {
  const { content } = useSiteContentContext();
  const t = getTranslations(content.language);

  const statusCounts = t.projects.items.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-14">
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />

      {/* Status summary bar */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(statusCounts).map(([status, count]) => {
          const cfg = statusConfig[status] ?? statusConfig.Planning;
          return (
            <div
              key={status}
              className="rounded-2xl p-5 space-y-2"
              style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/50">{status}</p>
              </div>
              <p className="font-display text-3xl font-bold text-ink">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Project cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {t.projects.items.map((project, i) => {
          const cfg = statusConfig[project.status] ?? statusConfig.Planning;
          return (
            <div key={project.title} className="card group p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <span
                  className="font-display text-5xl font-bold leading-none"
                  style={{ color: 'rgb(var(--color-forest) / 0.25)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`mt-1 flex-none rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${cfg.pill}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-2">
                <p className="text-xl font-bold text-ink group-hover:text-forest transition-colors duration-200">
                  {project.title}
                </p>
                <p className="text-sm leading-relaxed text-charcoal/60">{project.detail}</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-charcoal/40">
                  <span>Progress</span>
                  <span>{cfg.progress}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-clay/30">
                  <div
                    className={`h-1 rounded-full transition-all duration-700 ${cfg.dot}`}
                    style={{ width: `${cfg.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom callout */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-12 text-center"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgb(var(--color-forest)/0.08), transparent 65%)',
          }}
        />
        <div className="relative z-10 space-y-4">
          <p className="section-kicker">Have a Project Idea?</p>
          <p className="mx-auto max-w-lg text-base text-charcoal/70">
            The community development fund is open for proposals. Submit your idea and our team
            will review it.
          </p>
          <a
            href="/contact"
            className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sand transition hover:brightness-110"
            style={{ background: 'rgb(var(--color-forest))' }}
          >
            Submit a Proposal
          </a>
        </div>
      </div>
    </div>
  );
};
