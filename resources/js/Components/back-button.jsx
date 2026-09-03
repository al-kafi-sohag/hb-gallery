import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton({ href, label = 'Back to List' }) {
    return (
        <Button nativeButton={false} variant="outline" render={<Link href={href} />}>
            <ArrowLeft className="size-4" />
            {label}
        </Button>
    );
}
