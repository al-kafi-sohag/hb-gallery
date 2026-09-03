import { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ListFilters } from '@/components/data-table/list-filters';
import { FilterField } from '@/components/data-table/filter-field';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { RowActions } from '@/components/data-table/row-actions';
import { StatusBadge } from '@/components/data-table/status-badge';
import { Plus } from 'lucide-react';

export default function Index({ categories, filters, statusOptions }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [createdFrom, setCreatedFrom] = useState(filters.created_from ?? '');
    const [createdTo, setCreatedTo] = useState(filters.created_to ?? '');
    const [perPage, setPerPage] = useState(filters.per_page ?? 10);

    const applyFilters = (overrides = {}) => {
        router.get(route('admin.category-management.categories.index'), {
            search, status, created_from: createdFrom, created_to: createdTo, per_page: perPage,
            ...overrides,
        }, { preserveState: true, preserveScroll: true, replace: true });
    };

    useEffect(() => {
        const timeout = setTimeout(() => applyFilters({ search }), 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        applyFilters({ status, created_from: createdFrom, created_to: createdTo, per_page: perPage });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, createdFrom, createdTo, perPage]);

    const resetFilters = () => {
        setSearch('');
        setStatus('');
        setCreatedFrom('');
        setCreatedTo('');
        setPerPage(10);
        applyFilters({ search: '', status: '', created_from: '', created_to: '', per_page: 10 });
    };

    const toggleStatus = (category) =>
        router.patch(route('admin.category-management.categories.toggle-status', category.id), {}, { preserveScroll: true });

    const toggleFeatured = (category) =>
        router.patch(route('admin.category-management.categories.toggle-featured', category.id), {}, { preserveScroll: true });

    const destroy = (category) =>
        router.delete(route('admin.category-management.categories.destroy', category.id), { preserveScroll: true });

    return (
        <AdminLayout title="Categories" currentSlug="categories">
            <Head title="Category Management" />

            <section className="mx-auto w-full max-w-7xl">
                <PageHeader
                    eyebrow="Category Management"
                    title="Category Management"
                    actions={
                        <Button nativeButton={false} render={<Link href={route('admin.category-management.categories.create')} />}>
                            <Plus className="size-4" />
                            Add New Category
                        </Button>
                    }

                />

                <Card className="mt-6">
                    <CardContent>
                        <ListFilters onReset={resetFilters}>
                           <FilterField label="Status" htmlFor="filter-status">
                                <select
                                    id="filter-status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                >
                                    <option value="">All Status</option>
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </FilterField>

                            <FilterField label="Created From" htmlFor="filter-from">
                                <input
                                    id="filter-from"
                                    type="date"
                                    value={createdFrom}
                                    onChange={(e) => setCreatedFrom(e.target.value)}
                                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                />
                            </FilterField>

                            <FilterField label="Created To" htmlFor="filter-to">
                                <input
                                    id="filter-to"
                                    type="date"
                                    value={createdTo}
                                    onChange={(e) => setCreatedTo(e.target.value)}
                                    className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                />
                            </FilterField>
                        </ListFilters>

                        <DataTableToolbar
                            perPage={perPage}
                            onPerPageChange={setPerPage}
                            search={search}
                            onSearchChange={setSearch}
                            searchPlaceholder="Title or slug..."
                        />

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>SL</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Parent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                                            No categories found.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {categories.data.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{categories.from + index}</TableCell>
                                        <TableCell className="font-medium text-foreground">{category.title}</TableCell>
                                        <TableCell>{category.parent?.title ?? '—'}</TableCell>
                                        <TableCell><StatusBadge label={category.status_label} color={category.status_color} /></TableCell>
                                        <TableCell>{category.is_featured ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{category.created_at}</TableCell>
                                        <TableCell>{category.creator?.name ?? 'System'}</TableCell>
                                        <TableCell className="text-right">
                                           <RowActions
                                                viewHref={route('admin.category-management.categories.show', category.id)}
                                                editHref={route('admin.category-management.categories.edit', category.id)}
                                                status={category.status}
                                                isFeatured={category.is_featured}
                                                onToggleStatus={() => toggleStatus(category)}
                                                onToggleFeatured={() => toggleFeatured(category)}
                                                onDelete={() => destroy(category)}
                                                confirmDeleteMessage={`Delete "${category.title}"? This cannot be undone.`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <DataTablePagination meta={categories} />
                    </CardContent>
                </Card>
            </section>
        </AdminLayout>
    );
}
