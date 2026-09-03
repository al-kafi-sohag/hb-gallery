import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FormSection({ title, description, children, className = '' }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
