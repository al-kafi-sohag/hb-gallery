import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
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
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = item.items?.length > 0;
                    const isActive =
                        currentSlug === item.slug ||
                        item.items?.some((sub) => sub.slug === currentSlug);

                    if (hasChildren) {
                        return (
                            <Collapsible
                                key={item.slug}
                                defaultOpen={isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger
                                        render={
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={isActive}
                                            />
                                        }

                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[panel-open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((sub) => (
                                                <SidebarMenuSubItem key={sub.slug}>
                                                    <SidebarMenuSubButton
                                                        render={<Link href={route(sub.route)} />}
                                                        isActive={currentSlug === sub.slug}
                                                    >
                                                        <span>{sub.title}</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.slug}>
                            <SidebarMenuButton
                                render={<Link href={route(item.route)} />}
                                tooltip={item.title}
                                isActive={currentSlug === item.slug}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
