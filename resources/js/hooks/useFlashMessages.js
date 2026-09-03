import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export function useFlashMessages(timeout = 4000) {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash);

    useEffect(() => {
        setMessage(flash);

        if (!flash?.success && !flash?.error) {
            return;
        }

        const timer = setTimeout(() => setMessage(null), timeout);

        return () => clearTimeout(timer);
    }, [flash]);

    return message;
}
