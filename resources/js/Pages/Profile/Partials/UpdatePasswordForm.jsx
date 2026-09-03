import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { FormField } from '@/components/form-field';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <FormSection title="Update Password">
            <form onSubmit={updatePassword} className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="current_password"
                    label="Previous Password"
                    type="password"
                    span={2}
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    error={errors.current_password}
                    placeholder="Enter previous password"
                    autoComplete="current-password"
                />

                <FormField
                    id="password"
                    label="New Password"
                    type="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                />

                <FormField
                    id="password_confirmation"
                    label="Retype New Password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder="Retype new password"
                    autoComplete="new-password"
                />

                <div className="flex justify-end sm:col-span-2">
                    <Button type="submit" disabled={processing}>
                        Update Password
                    </Button>
                </div>
            </form>
        </FormSection>
    );
}
