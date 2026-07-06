import { useParams, Link } from 'react-router-dom';
import { useSiteContentContext } from '../components/SiteContentProvider';

export const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useSiteContentContext();

  const event = content.pastEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="space-y-6 py-24 text-center">
        <p className="text-charcoal/50">Event not found.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
        >
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Back link */}
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/40 transition-colors hover:text-forest"
      >
        ← Back to Events
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-forest">Past Event</p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
          {event.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-charcoal/50">
          <span>{event.date}</span>
          {event.location && (
            <>
              <span>·</span>
              <span>{event.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <div
        className="rounded-2xl p-8"
        style={{ background: 'rgb(var(--card-bg))', border: '1px solid rgb(var(--card-border))' }}
      >
        <p className="text-base leading-relaxed text-charcoal/70">{event.detail}</p>
      </div>

      {/* Photos */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Event Photos</h2>
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full rounded-2xl object-cover"
          />
        ) : (
          <div
            className="flex h-48 items-center justify-center rounded-2xl"
            style={{ background: 'rgb(var(--card-bg))', border: '1px dashed rgb(var(--card-border))' }}
          >
            <p className="text-sm text-charcoal/40">Photos coming soon</p>
          </div>
        )}
      </div>

    </div>
  );
};
