import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { FormPageLayout } from '@/components/form-page-layout';
import { FormSection } from '@/components/form-section';
import { FormField } from '@/components/form-field';
import { DocPanel } from '@/components/doc-panel';
import { Button } from '@/components/ui/button';

// Reference template: header + two-column layout + grid form fields + docs sidebar.
// Copy this file for any new create/edit page and swap the fields, doc items, and submit route.
export default function FormPageTemplate() {
    const { data, setData, post, processing, errors } = useForm({
        field_one: '',
        field_two: '',
        field_three: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('some.route')); // replace with the real route name
    };

    const docItems = [
        { title: 'Field One', description: 'Explain what this field is for and any constraints.' },
        { title: 'Field Two', description: 'Explain what this field is for and any constraints.' },
        { title: 'Field Three', description: 'Explain what this field is for and any constraints.' },
    ];

    return (
        <AdminLayout title="Template" currentSlug="template">
            <Head title="Template" />

            <FormPageLayout
                header={
                    <PageHeader
                        eyebrow="Example Eyebrow"
                        title="Page Title"
                        description="One-line description of what this page lets the user do."
                    />
                }
                aside={<DocPanel items={docItems} />}
            >
                <FormSection title="Section Title">
                    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            id="field_one"
                            label="Field One"
                            span={2}
                            value={data.field_one}
                            onChange={(e) => setData('field_one', e.target.value)}
                            error={errors.field_one}
                            placeholder="Enter value"
                        />

                        <FormField
                            id="field_two"
                            label="Field Two"
                            value={data.field_two}
                            onChange={(e) => setData('field_two', e.target.value)}
                            error={errors.field_two}
                            placeholder="Enter value"
                        />

                        <FormField
                            id="field_three"
                            label="Field Three"
                            value={data.field_three}
                            onChange={(e) => setData('field_three', e.target.value)}
                            error={errors.field_three}
                            placeholder="Enter value"
                        />

                        <div className="flex justify-end sm:col-span-2">
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </FormSection>
            </FormPageLayout>
        </AdminLayout>
    );
}
