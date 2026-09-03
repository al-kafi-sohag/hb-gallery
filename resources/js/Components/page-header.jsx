export function PageHeader({ eyebrow, title, description, actions }) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
                {eyebrow && (
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-primary uppercase">
                        {eyebrow}
                    </span>
                )}
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}
