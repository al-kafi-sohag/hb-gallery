import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DocPanel({ title = 'Documentation', items }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item) => (
                    <div key={item.title} className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
