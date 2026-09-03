import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/form-section';
import { FormField } from '@/components/form-field';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/image-upload';

function flattenTree(options, parentId = null, depth = 0) {
    return options
        .filter((option) => option.parent_id === parentId)
        .flatMap((option) => [
            { ...option, depth },
            ...flattenTree(options, option.id, depth + 1),
        ]);
}

export function CategoryForm({ data, setData, errors, processing, onSubmit, parentOptions, statusOptions, submitLabel, existingThumbnailUrl }) {
    const nestedOptions = flattenTree(parentOptions);

    return (
        <FormSection title="Category Information">
            <form onSubmit={onSubmit} encType="multipart/form-data" className="grid gap-4 sm:grid-cols-2">
                <FormField
                    id="title"
                    label="Title"
                    span={2}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    placeholder="Enter category title"
                    required
                    autoFocus
                />

                <div>
                    <Label htmlFor="parent_id" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Parent Category
                    </Label>
                    <select
                        id="parent_id"
                        value={data.parent_id ?? ''}
                        onChange={(e) => setData('parent_id', e.target.value || null)}
                        className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        <option value="">None (top level)</option>
                        {nestedOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {'—'.repeat(option.depth)} {option.title}
                            </option>
                        ))}
                    </select>
                    {errors.parent_id && <p className="mt-1.5 text-sm text-destructive">{errors.parent_id}</p>}
                </div>

                <div>
                    <Label htmlFor="status" className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Status
                    </Label>
                   <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {errors.status && <p className="mt-1.5 text-sm text-destructive">{errors.status}</p>}
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                    <input
                        id="is_featured"
                        type="checkbox"
                        checked={data.is_featured}
                        onChange={(e) => setData('is_featured', e.target.checked)}
                        className="size-4 rounded border-input"
                    />
                    <Label htmlFor="is_featured">Show in featured section</Label>
                </div>

                <div className="sm:col-span-2">
                    <ImageUpload
                        id="thumbnail"
                        label="Thumbnail"
                        value={data.thumbnail}
                        existingUrl={!data.remove_thumbnail ? existingThumbnailUrl : null}
                        onChange={(file) => {
                            setData('thumbnail', file);
                            setData('remove_thumbnail', false);
                        }}
                        onRemove={() => {
                            setData('thumbnail', null);
                            if (existingThumbnailUrl) setData('remove_thumbnail', true);
                        }}
                        error={errors.thumbnail}
                        hint="JPEG, PNG or WebP, up to 2MB."
                    />
                </div>

                <div className="flex justify-end sm:col-span-2">
                    <Button type="submit" disabled={processing}>{submitLabel}</Button>
                </div>
            </form>
        </FormSection>
    );
}
