import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageHeader } from '@/components/page-header';
import { FormPageLayout } from '@/components/form-page-layout';
import { DocPanel } from '@/components/doc-panel';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const docItems = [
    {
        title: 'Email',
        description: 'Required and must be unique. This is the address used to log in.',
    },
    {
        title: 'Name',
        description: 'Required. Use your full name as it should appear across the app.',
    },
    {
        title: 'Current Password',
        description: 'Required to change your password. Must match your existing password.',
    },
    {
        title: 'New Password',
        description: 'Required. Use a strong password with letters, numbers, and symbols.',
    },
    {
        title: 'Confirm Password',
        description: 'Required. Must exactly match the new password.',
    },
];

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout title="Profile" currentSlug="profile">
            <Head title="Profile" />

            <FormPageLayout
                header={
                    <PageHeader
                        eyebrow="Profile Settings"
                        title="Profile Management"
                        description="Update your basic profile information and password securely."
                    />
                }

                aside={<DocPanel items={docItems} />}
            >
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                <UpdatePasswordForm />
                {/* <DeleteUserForm /> */}
            </FormPageLayout>
        </AdminLayout>
    );
}
