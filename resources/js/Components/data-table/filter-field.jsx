export function FilterField({ label, htmlFor, children }) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
                {label}
            </label>
            {children}
        </div>
    );
}
