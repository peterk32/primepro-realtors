export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-tight text-stone-50 md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-stone-400 ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
