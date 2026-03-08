'use client';

import { useEffect, useState } from 'react';
import { Map, Hotel, Car, CalendarCheck, FileText, TrendingUp } from 'lucide-react';
import { tourApi, hotelApi, carApi, bookingApi, customTripApi } from '@/services/api';

interface Stats {
    tours: number; hotels: number; cars: number;
    bookings: number; customTrips: number;
}

const statCards = [
    { key: 'tours', label: 'Tours', icon: Map, color: 'bg-blue-500' },
    { key: 'hotels', label: 'Hotels', icon: Hotel, color: 'bg-purple-500' },
    { key: 'cars', label: 'Cars', icon: Car, color: 'bg-orange-500' },
    { key: 'bookings', label: 'Bookings', icon: CalendarCheck, color: 'bg-green-500' },
    { key: 'customTrips', label: 'Custom Trips', icon: FileText, color: 'bg-pink-500' },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ tours: 0, hotels: 0, cars: 0, bookings: 0, customTrips: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [t, h, c, b, ct] = await Promise.allSettled([
                    tourApi.getAll(), hotelApi.getAll(), carApi.getAll(),
                    bookingApi.getAll(), customTripApi.getAll(),
                ]);
                setStats({
                    tours: t.status === 'fulfilled' ? t.value.data.data.length : 0,
                    hotels: h.status === 'fulfilled' ? h.value.data.data.length : 0,
                    cars: c.status === 'fulfilled' ? c.value.data.data.length : 0,
                    bookings: b.status === 'fulfilled' ? (b.value.data as any).data?.length : 0,
                    customTrips: ct.status === 'fulfilled' ? (ct.value.data as any).data?.length : 0,
                });
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold text-dark">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Overview of your travel platform</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                {statCards.map(({ key, label, icon: Icon, color }) => (
                    <div key={key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                            <Icon size={18} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                        <p className="text-2xl font-bold text-dark">
                            {loading ? '—' : stats[key as keyof Stats]}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-teal" />
                    <h2 className="font-semibold text-dark">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Add Tour', href: '/admin/tours' },
                        { label: 'Add Hotel', href: '/admin/hotels' },
                        { label: 'Add Car', href: '/admin/cars' },
                        { label: 'View Bookings', href: '/admin/bookings' },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="text-center py-3 px-4 bg-stone-50 hover:bg-teal/5 border border-gray-100 hover:border-teal/20 rounded-xl text-sm font-medium text-dark transition"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
