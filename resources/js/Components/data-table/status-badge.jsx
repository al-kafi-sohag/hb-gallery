import { cn } from '@/lib/utils';

export function StatusBadge({ label, color, className }) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                color ?? 'bg-muted text-muted-foreground',
                className
            )}
        >
            {label}
        </span>
    );
}
