import { Link } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Power, Star, Trash2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function RowActions({
    viewHref,
    editHref,
    status,
    isFeatured,
    onToggleStatus,
    onToggleFeatured,
    onDelete,
    confirmDeleteMessage = 'This action cannot be undone.',
}) {
    const isActive = String(status).toLowerCase() === 'active';

    const handleDelete = () => {
        if (confirm(confirmDeleteMessage)) {
            onDelete();
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
                    'rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
            >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open actions</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 p-1">
                {viewHref && (
                    <DropdownMenuItem render={<Link href={viewHref} />} className="gap-2 rounded-md">
                        <Eye className="size-4 text-muted-foreground" />
                        View
                    </DropdownMenuItem>
                )}

                {editHref && (
                    <DropdownMenuItem render={<Link href={editHref} />} className="gap-2 rounded-md">
                        <Pencil className="size-4 text-muted-foreground" />
                        Edit
                    </DropdownMenuItem>
                )}

                {(onToggleFeatured || onToggleStatus) && <DropdownMenuSeparator />}

                {onToggleFeatured && (
                    <DropdownMenuItem onClick={onToggleFeatured} className="gap-2 rounded-md">
                        <Star className={cn('size-4', isFeatured ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground')} />
                        {isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                    </DropdownMenuItem>
                )}

                {onToggleStatus && (
                    <DropdownMenuItem
                        onClick={onToggleStatus}
                        className={cn(
                            'gap-2 rounded-md',
                            isActive ? 'text-amber-600 focus:text-amber-600' : 'text-emerald-600 focus:text-emerald-600'
                        )}
                    >
                        <Power className="size-4" />
                        {isActive ? 'Deactivate' : 'Activate'}
                    </DropdownMenuItem>
                )}

                {onDelete && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={handleDelete} className="gap-2 rounded-md">
                            <Trash2 className="size-4" />
                            Delete
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
