import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function ListFilters({ onReset, children }) {
    return (
        <div className="mb-4 rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Filter
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {children}

                <div className="flex items-end">
                    <Button type="button" variant="outline" className="w-full" onClick={onReset}>
                        <RotateCcw className="size-4" />
                        Reset Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
