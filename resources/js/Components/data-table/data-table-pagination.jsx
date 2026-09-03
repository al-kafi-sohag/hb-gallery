import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function DataTablePagination({ meta }) {
    if (!meta?.links || meta.last_page <= 1) {
        return (
            <p className="mt-3 text-sm text-muted-foreground">
                Showing {meta?.total ?? 0} of {meta?.total ?? 0} entries
            </p>
        );
    }

    return (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
                Showing {meta.from} to {meta.to} of {meta.total} entries
            </p>

            <nav className="flex items-center gap-1">
                {meta.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        preserveScroll
                        preserveState
                        className={cn(
                            'flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm transition',
                            link.active
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-input bg-background hover:bg-muted',
                            !link.url && 'pointer-events-none opacity-40'
                        )}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </nav>
        </div>
    );
}
