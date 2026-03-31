import { useParams, Link } from 'react-router-dom';
import { useSiteContentContext } from '../components/SiteContentProvider';

export const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useSiteContentContext();

  const member = content.members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="space-y-6 py-24 text-center">
        <p className="text-charcoal/50">Member not found.</p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
        >
          ← Back to About
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Back link */}
      <Link
        to="/about"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40 transition-colors hover:text-forest"
      >
        ← Back to About
      </Link>

      {/* Profile card */}
      <div
        className="overflow-hidden rounded-3xl"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        {/* Photo */}
        {member.imageUrl ? (
          <div className="relative h-72 overflow-hidden sm:h-96">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-full w-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgb(var(--card-bg)) 0%, transparent 55%)',
              }}
            />
          </div>
        ) : (
          <div
            className="flex h-52 items-center justify-center"
            style={{ background: 'rgb(var(--color-forest)/0.08)' }}
          >
            <span className="font-display text-7xl font-bold" style={{ color: 'rgb(var(--color-forest)/0.25)' }}>
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="space-y-8 px-8 pb-12 pt-6 md:px-12">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">
              {member.title}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              {member.name}
            </h1>
          </div>

          {/* Bio */}
          <div className="max-w-2xl space-y-5">
            {member.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-charcoal/70">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
