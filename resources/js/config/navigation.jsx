import { LayoutDashboard, User } from 'lucide-react';

export const navigation = [
    {
        title: 'Dashboard',
        slug: 'dashboard',
        route: 'dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Profile',
        slug: 'profile',
        route: 'profile.edit',
        icon: User,
    },
];
