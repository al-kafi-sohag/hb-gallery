export function FormPageLayout({ header, children, aside }) {
    return (
        <section className="mx-auto w-full max-w-7xl">
            {header && <div className="mb-6">{header}</div>}

            <div className={aside ? 'grid gap-5 xl:grid-cols-[2fr_0.8fr]' : 'grid gap-5'}>
                <div className="space-y-5 min-w-0">{children}</div>

                {aside && <aside className="space-y-5">{aside}</aside>}
            </div>
        </section>
    );
}
