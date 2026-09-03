import { LayoutDashboard, User, FolderTree } from 'lucide-react';

export const navigation = [
    { title: 'Dashboard', slug: 'dashboard', route: 'dashboard', icon: LayoutDashboard },
    { title: 'Profile', slug: 'profile', route: 'profile.edit', icon: User },
    { title: 'Categories', slug: 'categories', route: 'admin.category-management.categories.index', icon: FolderTree },
];
