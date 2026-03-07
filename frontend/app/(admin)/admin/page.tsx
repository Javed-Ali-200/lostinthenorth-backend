'use client';

import React, { useEffect, useState } from 'react';
import {
    Users,
    ShoppingBag,
    DollarSign,
    Clock,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Calendar,
    PlaneTakeoff,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { DashboardStats, Booking } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/dashboard/stats');
                setStats(response.data.stats);
                setRecentBookings(response.data.recentBookings);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;

    const statCards = [
        {
            name: 'Total Revenue',
            value: `$${stats?.totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="text-emerald-500" />,
            tag: '+12.5%',
            up: true,
            color: 'bg-emerald-50'
        },
        {
            name: 'Total Bookings',
            value: stats?.totalBookings.toString(),
            icon: <ShoppingBag className="text-blue-500" />,
            tag: '+8.2%',
            up: true,
            color: 'bg-blue-50'
        },
        {
            name: 'Active Users',
            value: stats?.totalUsers.toString(),
            icon: <Users className="text-purple-500" />,
            tag: '+15.3%',
            up: true,
            color: 'bg-purple-50'
        },
        {
            name: 'Pending Requests',
            value: stats?.pendingBookings.toString(),
            icon: <Clock className="text-amber-500" />,
            tag: '-2.4%',
            up: false,
            color: 'bg-amber-50'
        },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-outfit text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 font-medium">Welcome back, here's what's happening with TravelX today.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>Jan 1, 2026 - Jan 24, 2026</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${card.color} group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${card.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{card.tag}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{card.name}</p>
                            <h4 className="text-3xl font-bold font-outfit text-slate-900">{card.value}</h4>
                        </div>
                        {/* Subtle background pattern */}
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={120} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold font-outfit text-slate-900 leading-none">Recent Bookings</h3>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                            <MoreVertical size={20} className="text-slate-400" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Service</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {booking.user?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{booking.user?.name}</p>
                                                    <p className="text-slate-400 text-xs font-medium">{booking.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="inline-flex px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                                {booking.serviceType}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 font-bold text-slate-900 text-sm">
                                            ${booking.totalPrice.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'CONFIRMED'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : booking.status === 'PENDING'
                                                    ? 'bg-amber-50 text-amber-600'
                                                    : 'bg-rose-50 text-rose-600'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-emerald-500' : booking.status === 'PENDING' ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`} />
                                                <span>{booking.status}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 mt-auto border-t border-slate-50 text-center">
                        <Link href="/admin/bookings" className="text-blue-600 font-bold text-sm hover:underline">
                            View All Bookings
                        </Link>
                    </div>
                </div>

                {/* Quick Actions / Marketing */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 space-y-4">
                            <h4 className="text-2xl font-bold font-outfit">Growing Fast?</h4>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                You've reached <span className="text-blue-400">85%</span> of your monthly booking goal. Keep up the great work!
                            </p>
                            <button className="w-full bg-blue-600 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                                Review Strategies
                            </button>
                        </div>
                        {/* Pattern */}
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <PlaneTakeoff size={100} />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                        <h4 className="text-xl font-bold font-outfit text-slate-900">Manage Content</h4>
                        <div className="grid gap-3">
                            {[
                                { name: 'Add New Tour', icon: <Plus className="text-blue-500" size={18} />, href: '/admin/tours/new' },
                                { name: 'Create Offer', icon: <Plus className="text-emerald-500" size={18} />, href: '/admin/offers/new' },
                                { name: 'Add Hotel', icon: <Plus className="text-purple-500" size={18} />, href: '/admin/hotels/new' },
                            ].map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.href}
                                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-200 transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                                            {action.icon}
                                        </div>
                                        <span className="font-bold text-slate-700 text-sm">{action.name}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Plus({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
}
