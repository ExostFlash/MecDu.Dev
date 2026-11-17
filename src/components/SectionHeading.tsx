export default function SectionHeading({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 font-mono text-xs tracking-[0.25em] text-accent-bright uppercase">
        <span className="text-muted">{`${index} //`}</span> {kicker}
      </p>
      <h2 className="font-stencil text-4xl text-text sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </div>
  );
}
