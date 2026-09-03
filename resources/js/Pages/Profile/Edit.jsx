import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout title="Profile" currentSlug="profile">
            <Head title="Profile" />

            <div className="mx-auto space-y-6 max-w-2xl">
                <Card>
                    <CardContent className="pt-6">
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <UpdatePasswordForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <DeleteUserForm />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
