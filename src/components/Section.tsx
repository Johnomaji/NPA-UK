export const Section = ({
  kicker,
  title,
  accent,
  children,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-8">
    <div className="space-y-3">
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2 className="section-title">
        {accent ? (
          <>
            {title}{' '}
            <span className="text-forest">{accent}</span>
          </>
        ) : (
          title
        )}
      </h2>
    </div>
    {children}
  </section>
);
