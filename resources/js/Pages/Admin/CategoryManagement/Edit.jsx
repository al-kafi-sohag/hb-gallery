import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { FormPageLayout } from '@/components/form-page-layout';
import { DocPanel } from '@/components/doc-panel';
import { CategoryForm } from './Partials/CategoryForm';
import { BackButton } from '@/components/back-button';

const docItems = [
    { title: 'Title', description: 'Required. Slug updates automatically when the title changes.' },
    { title: 'Parent Category', description: 'A category cannot be set as its own parent.' },
    { title: 'Status', description: 'Controls whether the category is visible/usable across the site.' },
    { title: 'Featured', description: 'Marks the category to appear in featured/highlighted sections.' },
    { title: 'Thumbnail', description: 'Uploading a new image replaces the existing one.' },
];

export default function Edit({ category, parentOptions, statusOptions  }) {
    const { data, setData, post, processing, errors } = useForm({
        title: category.title,
        parent_id: category.parent_id,
        status: category.status,
        is_featured: category.is_featured,
        thumbnail: null,
        remove_thumbnail: false,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.category-management.categories.update', category.id));
    };

    return (
        <AdminLayout title="Edit Category" currentSlug="categories">
            <Head title="Edit Category" />

            <FormPageLayout
                header={
                    <PageHeader
                        eyebrow="Category Management"
                        title="Edit Category"
                        description={`Editing "${category.title}"`}
                        actions={<BackButton href={route('admin.category-management.categories.index')} />}
                    />
                }

                aside={<DocPanel items={docItems} />}
            >
                <CategoryForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                    parentOptions={parentOptions.filter((option) => option.id !== category.id)}
                    statusOptions={statusOptions}
                    submitLabel="Update Category"
                    existingThumbnailUrl={category.thumbnail_url}
                />
            </FormPageLayout>
        </AdminLayout>
    );
}
