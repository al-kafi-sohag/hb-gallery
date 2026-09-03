import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { FormPageLayout } from '@/components/form-page-layout';
import { DocPanel } from '@/components/doc-panel';
import { CategoryForm } from './Partials/CategoryForm';
import { BackButton } from '@/components/back-button';

const docItems = [
    { title: 'Title', description: 'Required. The slug is generated automatically from the title.' },
    { title: 'Parent Category', description: 'Optional. Leave empty to create a top-level category.' },
    { title: 'Status', description: 'Controls whether the category is visible/usable across the site.' },
    { title: 'Featured', description: 'Marks the category to appear in featured/highlighted sections.' },
    { title: 'Thumbnail', description: 'Optional image, JPEG/PNG/WebP, up to 2MB.' },
];

export default function Create({ parentOptions, statusOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        parent_id: null,
        status: 'active',
        is_featured: false,
        thumbnail: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.category-management.categories.store'));
    };

    return (
        <AdminLayout title="Create Category" currentSlug="categories">
            <Head title="Create Category" />

            <FormPageLayout
                header={
                    <PageHeader
                        eyebrow="Category Management"
                        title="Create Category"
                        description="Add a new category or subcategory."
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
                    parentOptions={parentOptions}
                    statusOptions={statusOptions}
                    submitLabel="Create Category"
                />
            </FormPageLayout>
        </AdminLayout>
    );
}
