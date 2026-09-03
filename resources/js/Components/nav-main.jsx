import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavMain({ items, currentSlug }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (!item.items) {
                        const isActive = currentSlug === item.slug;

                        return (
                            <SidebarMenuItem key={item.slug}>
                                <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                                    <Link href={route(item.route)} className="flex gap-2 items-center">
                                        <item.icon className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }

                    const isGroupActive = currentSlug.startsWith(item.slug);

                    return (
                        <Collapsible key={item.slug} defaultOpen={isGroupActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger>
                                    <SidebarMenuButton tooltip={item.title} isActive={isGroupActive}>
                                        <item.icon className={isGroupActive ? 'text-primary' : 'text-muted-foreground'} />
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((child) => {
                                            const isActive = currentSlug === child.slug;
                                            return (
                                                <SidebarMenuSubItem key={child.slug}>
                                                    <SidebarMenuSubButton isActive={isActive}>
                                                        <Link href={route(child.route)}>
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
