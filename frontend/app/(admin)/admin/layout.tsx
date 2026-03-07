'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Map,
    Tag,
    Car,
    Hotel,
    CalendarCheck,
    Compass,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ChevronRight,
    PlaneTakeoff,
    User as UserIcon,
    Plus
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, loading, isAdmin, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push('/login');
        }
    }, [loading, isAdmin, router]);

    if (loading || !isAdmin) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <LoadingSpinner />
            </div>
        );
    }

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { name: 'Tours', icon: <Map size={20} />, href: '/admin/tours' },
        { name: 'Offers', icon: <Tag size={20} />, href: '/admin/offers' },
        { name: 'Cars', icon: <Car size={20} />, href: '/admin/cars' },
        { name: 'Hotels', icon: <Hotel size={20} />, href: '/admin/hotels' },
        { name: 'Bookings', icon: <CalendarCheck size={20} />, href: '/admin/bookings' },
        { name: 'Custom Trips', icon: <Compass size={20} />, href: '/admin/custom-trips' },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-700">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-all duration-300 transform lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="p-8 border-b border-slate-100 mb-4">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/30 group-hover:scale-110 transition-transform">
                                <PlaneTakeoff size={28} />
                            </div>
                            <span className="text-2xl font-bold font-outfit tracking-tight text-slate-900">TravelX</span>
                        </Link>
                    </div>

                    {/* Menu Area */}
                    <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-hide py-4">
                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${isActive(item.href)
                                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 translate-x-1'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`${isActive(item.href) ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </div>
                                {isActive(item.href) && <ChevronRight size={16} />}
                            </Link>
                        ))}

                        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-8 mb-4">System</p>
                        <Link
                            href="/admin/settings"
                            className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${isActive('/admin/settings')
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Settings size={20} className={isActive('/admin/settings') ? 'text-white' : 'text-slate-400'} />
                            <span>Settings</span>
                        </Link>
                    </nav>

                    {/* User Profile Area */}
                    <div className="p-6 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">{user?.name}</p>
                                <p className="text-slate-400 text-xs font-medium">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center space-x-3 p-3.5 rounded-2xl bg-white border border-slate-200 text-rose-500 font-bold text-sm hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2.5 bg-slate-50 text-slate-500 rounded-xl lg:hidden"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl w-96 group focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center mr-4">
                            <button className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                                <Plus size={18} />
                                <span>Quick Add</span>
                            </button>
                        </div>

                        <button className="p-2.5 bg-slate-50 text-slate-500 rounded-2xl relative hover:bg-slate-100 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
