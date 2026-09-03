import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const handleOpenChange = (open) => {
        if (!open && closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Dialog open={show} onOpenChange={handleOpenChange}>
            <DialogContent
                showCloseButton={closeable}
                className={`w-full ${maxWidthClass}`}
            >
                {children}
            </DialogContent>
        </Dialog>
    );
}
