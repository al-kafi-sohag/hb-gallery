import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function FormField({ id, label, error, span = 1, className, ...inputProps }) {
    return (
        <div className={cn(span === 2 && 'sm:col-span-2')}>
            <Label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {label}
            </Label>
            <Input id={id} className={className} {...inputProps} />
            {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
        </div>
    );
}
