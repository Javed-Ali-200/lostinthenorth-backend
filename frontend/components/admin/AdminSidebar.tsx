'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Mountain, LayoutDashboard, Map, Hotel, Car, CalendarCheck,
    FileText, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Tours', href: '/admin/tours', icon: Map },
    { label: 'Hotels', href: '/admin/hotels', icon: Hotel },
    { label: 'Cars', href: '/admin/cars', icon: Car },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { label: 'Custom Trips', href: '/admin/custom-trips', icon: FileText },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                <div className="p-2 rounded-lg bg-gold/20">
                    <Mountain size={18} className="text-gold" />
                </div>
                <div>
                    <p className="text-white font-semibold text-sm">Admin Panel</p>
                    <p className="text-white/40 text-xs">Lost in the North</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                                    ? 'bg-gold text-white'
                                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-dark min-h-screen shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Toggle */}
            <div className="md:hidden">
                <button
                    onClick={() => setOpen(!open)}
                    className="fixed top-4 left-4 z-50 p-2 bg-dark text-white rounded-lg"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>

                {open && (
                    <>
                        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
                        <aside className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-dark">
                            <SidebarContent />
                        </aside>
                    </>
                )}
            </div>
        </>
    );
}
