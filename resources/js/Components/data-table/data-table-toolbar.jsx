import { Input } from '@/components/ui/input';

const ENTRY_OPTIONS = [10, 25, 50, 100];

export function DataTableToolbar({ perPage, onPerPageChange, search, onSearchChange, searchPlaceholder = 'Search...' }) {
    return (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    className="h-9 rounded-md border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                    {ENTRY_OPTIONS.map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                entries
            </label>

            <div className="flex items-center gap-2">
                <label htmlFor="table-search" className="text-sm text-muted-foreground">Search</label>
                <Input
                    id="table-search"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-56"
                />
            </div>
        </div>
    );
}
