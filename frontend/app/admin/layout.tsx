'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token && pathname !== '/admin/login') {
            router.replace('/admin/login');
        } else {
            setChecking(false);
        }
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 size={32} className="animate-spin text-teal" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-stone-100">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                <div className="p-6 md:p-8">{children}</div>
            </main>
        </div>
    );
}
