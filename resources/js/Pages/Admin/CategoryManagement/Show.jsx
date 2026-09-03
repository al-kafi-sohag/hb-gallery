import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { FormSection } from '@/components/form-section';
import { StatusBadge } from '@/components/data-table/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BackButton } from '@/components/back-button';

function InfoItem({ label, children, span = 1 }) {
    return (
        <div className={cn('rounded-lg border bg-muted/40 p-3', span === 2 && 'sm:col-span-2', span === 3 && 'sm:col-span-2 lg:col-span-3')}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
            <div className="mt-1 text-sm font-medium text-foreground">{children}</div>
        </div>
    );
}

export default function Show({ category }) {
    return (
        <AdminLayout title="Category Details" currentSlug="categories">
            <Head title={`Category — ${category.title}`} />

            <section className="mx-auto w-full max-w-7xl">
                <PageHeader
                    eyebrow="Category Management"
                    title="Category Details"
                    actions={<BackButton href={route('admin.category-management.categories.index')} />}
                />

                <div className="mt-6">
                    <FormSection title="Category Information">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem label="Title" span={2}>{category.title}</InfoItem>
                            <InfoItem label="Slug">{category.slug}</InfoItem>
                            <InfoItem label="Parent Category">{category.parent?.title ?? 'None (top level)'}</InfoItem>
                            <InfoItem label="Status">
                                <StatusBadge label={category.status_label} color={category.status_color} />
                            </InfoItem>
                            <InfoItem label="Featured">{category.is_featured ? 'Yes' : 'No'}</InfoItem>
                            <InfoItem label="Created At">{category.created_at}</InfoItem>
                            <InfoItem label="Created By">{category.creator?.name ?? 'System'}</InfoItem>

                            <InfoItem label="Thumbnail" span={3}>
                                {category.thumbnail_url ? (

                                    <a
                                        href={category.thumbnail_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block"
                                    >
                                        <img
                                            src={category.thumbnail_url}
                                            alt={category.title}
                                            className="h-84 w-84 rounded-lg border object-contain transition hover:opacity-90"
                                        />
                                    </a>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No thumbnail uploaded.</p>
                                )}
                            </InfoItem>
                        </div>
                    </FormSection>
                </div>
            </section>
        </AdminLayout>
    );
}
