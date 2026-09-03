import { router, usePage } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { useFlashMessages } from '@/hooks/useFlashMessages';

export default function AdminLayout({ children, title, currentSlug }) {
    const { auth, flash } = usePage().props;
    useFlashMessages();

    const user = auth?.user;

    const logout = () => {
        router.post(route('logout'));
    };

    const initials =
        user?.name
            ?.split(' ')
            .filter(Boolean)
            .map((name) => name[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'A';

    return (
        <SidebarProvider>
            <AppSidebar currentSlug={currentSlug} />
            <SidebarInset>
                <header className="flex sticky top-0 z-20 justify-between items-center px-4 h-14 border-b bg-background">
                    <div className="flex gap-3 items-center">
                        <SidebarTrigger />
                        <h1 className="text-base font-semibold">{title}</h1>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" className="flex gap-2 items-center px-2" />
                            }

                        >
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm font-medium sm:inline">
                                {user?.name ?? 'Admin'}
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem className="cursor-default px-2 py-1.5 focus:bg-transparent">
                                <div className="flex flex-col">
                                    <span className="font-medium">{user?.name ?? 'Admin'}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {user?.email ?? ''}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.visit(route('profile.edit'))}
                                className="cursor-pointer px-2 py-1.5 focus:bg-accent"
                            >
                                <User className="mr-2 w-4 h-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={logout}
                                className="cursor-pointer text-destructive focus:text-destructive"
                            >
                                <LogOut className="mr-2 w-4 h-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <main className="flex flex-col flex-1 gap-4 p-4 sm:p-6">
                    {flash?.success && (
                        <div className="px-4 py-2 text-sm text-green-700 bg-green-50 rounded-md">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="px-4 py-2 text-sm text-red-700 bg-red-50 rounded-md">
                            {flash.error}
                        </div>
                    )}
                    {children}
                </main>

                <footer className="px-6 py-3 text-xs text-center border-t text-muted-foreground">
                    &copy; {new Date().getFullYear()} — Admin Panel
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
}
