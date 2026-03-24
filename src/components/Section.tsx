export const Section = ({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-6">
    {kicker ? <p className="section-kicker">{kicker}</p> : null}
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);
