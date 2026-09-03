import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { FormField } from '@/components/form-field';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <FormSection title="Manage Profile">
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    span={2}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="name@example.com"
                    required
                    autoComplete="username"
                />

                <FormField
                    id="name"
                    label="Name"
                    span={2}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-sm underline text-foreground hover:text-foreground/80"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex justify-end sm:col-span-2">
                    <Button type="submit" disabled={processing}>
                        Update Profile
                    </Button>
                </div>
            </form>
        </FormSection>
    );
}
