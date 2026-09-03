import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import { navigation } from '@/config/navigation';

export function AppSidebar({ currentSlug, ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center px-3 w-full h-12">
                    <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
                        Admin
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigation} currentSlug={currentSlug} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
