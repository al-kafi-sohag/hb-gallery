import { useEffect, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

export function ImageUpload({
    id = 'image-upload',
    label = 'Image',
    value,
    existingUrl,
    onChange,
    onRemove,
    error,
    accept = 'image/*',
    hint,
}) {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!value) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(value);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [value]);

    const displayUrl = previewUrl ?? existingUrl ?? null;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        if (file) onChange(file);
        e.target.value = '';
    };

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {label}
            </label>

            {displayUrl ? (
                <div className="relative inline-flex">
                    <img src={displayUrl} alt={label} className="h-28 w-28 rounded-lg border object-cover" />

                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition hover:bg-destructive hover:text-destructive-foreground"
                    >
                        <X className="size-3.5" />
                        <span className="sr-only">Remove image</span>
                    </button>

                    <label
                        htmlFor={id}
                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/0 text-transparent transition hover:bg-black/40 hover:text-white"
                    >
                        <span className="text-xs font-medium">Replace</span>
                    </label>
                </div>
            ) : (
                <label
                    htmlFor={id}
                    className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-muted-foreground transition hover:border-ring hover:text-foreground"
                >
                    <ImagePlus className="size-5" />
                    <span className="text-xs font-medium">Upload</span>
                </label>
            )}

            <input id={id} type="file" accept={accept} onChange={handleFileChange} className="hidden" />

            {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
            {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
        </div>
    );
}
