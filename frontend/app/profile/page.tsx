'use client';

import React, { useEffect, useState } from 'react';
import {
    User as UserIcon,
    Settings,
    Briefcase,
    Map,
    Calendar,
    DollarSign,
    Clock,
    ArrowRight,
    ChevronRight,
    Plane,
    Heart,
    Bell,
    CheckCircle2,
    Clock3,
    Users
} from 'lucide-react';
import Link from 'next/link';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Booking, CustomTrip } from '@/types';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [customTrips, setCustomTrips] = useState<CustomTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'bookings' | 'custom' | 'wishlist'>('bookings');

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const [bookingsRes, customRes] = await Promise.all([
                    api.get('/bookings'),
                    api.get('/custom-trips'),
                ]);
                setBookings(bookingsRes.data.bookings);
                setCustomTrips(customRes.data.customTrips);
            } catch (error) {
                console.error('Failed to fetch profile data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (authLoading || loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!user) return null;

    return (
        <UserLayout>
            <div className="min-h-screen pt-40 pb-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar info */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="p-8 border-none shadow-xl shadow-slate-200/50 text-center space-y-6">
                                <div className="relative inline-block mx-auto">
                                    <div className="w-24 h-24 rounded-[32px] bg-main flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-main/30">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-xl border-4 border-white">
                                        <CheckCircle2 size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold font-poppins text-black-custom">{user.name}</h2>
                                    <p className="text-slate-400 font-medium text-sm">{user.email}</p>
                                </div>
                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                                        <p className="text-xl font-black text-black-custom">{bookings.length}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Bookings</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                                        <p className="text-xl font-black text-black-custom">{customTrips.length}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Custom</p>
                                    </div>
                                </div>
                                <hr className="border-slate-100" />
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 group">
                                        <div className="flex items-center space-x-3">
                                            <UserIcon size={18} className="text-slate-400 group-hover:text-main" />
                                            <span className="text-sm">Personal Info</span>
                                        </div>
                                        <ChevronRight size={16} />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 group">
                                        <div className="flex items-center space-x-3">
                                            <Bell size={18} className="text-slate-400 group-hover:text-main" />
                                            <span className="text-sm">Notifications</span>
                                        </div>
                                        <ChevronRight size={16} />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-600 group">
                                        <div className="flex items-center space-x-3">
                                            <Briefcase size={18} className="text-slate-400 group-hover:text-main" />
                                            <span className="text-sm">Travel Documents</span>
                                        </div>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-10">
                            {/* Tabs */}
                            <div className="flex items-center space-x-2 p-1.5 bg-white rounded-2xl border border-slate-200/50 w-full max-w-lg shadow-sm">
                                {[
                                    { id: 'bookings', name: 'My Bookings', icon: <Map size={18} /> },
                                    { id: 'custom', name: 'Custom Trips', icon: <Briefcase size={18} /> },
                                    { id: 'wishlist', name: 'Wishlist', icon: <Heart size={18} /> },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                            ? 'bg-main text-white shadow-xl shadow-main/20'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-black-custom'
                                            }`}
                                    >
                                        {tab.icon}
                                        <span className="hidden sm:inline">{tab.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-6">
                                {activeTab === 'bookings' && (
                                    <div className="grid gap-6">
                                        {bookings.map((booking) => (
                                            <div key={booking.id} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all flex flex-col md:flex-row items-center gap-8">
                                                <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                                    <img src={booking.tour?.images[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                        <p className="text-slate-400 text-xs font-bold leading-none">{new Date(booking.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <h4 className="text-xl font-bold font-poppins text-black-custom">{booking.tour?.title || 'Bespoke Adventure'}</h4>
                                                    <div className="flex flex-wrap gap-6 items-center">
                                                        <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest leading-none">
                                                            <Calendar size={14} className="text-main" />
                                                            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest leading-none">
                                                            <Users size={14} className="text-main" />
                                                            <span>{booking.numberOfPeople} Adults</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-slate-500 font-bold text-xs uppercase tracking-widest leading-none">
                                                            <DollarSign size={14} className="text-main" />
                                                            <span>${booking.totalPrice} Paid</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="outline" className="rounded-xl px-8 group-hover:bg-main group-hover:text-white group-hover:border-main">
                                                    Details <ArrowRight size={18} className="ml-2" />
                                                </Button>
                                            </div>
                                        ))}
                                        {bookings.length === 0 && (
                                            <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200 space-y-6">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                                    <Plane size={32} className="text-slate-200" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-bold text-black-custom">No bookings yet</h4>
                                                    <p className="text-slate-500 font-medium">Your upcoming adventures will appear here.</p>
                                                </div>
                                                <Link href="/tours">
                                                    <Button size="md" className="rounded-xl">Start Exploring</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'custom' && (
                                    <div className="grid gap-6">
                                        {customTrips.map((trip) => (
                                            <div key={trip.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden group">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center space-x-4">
                                                            <h4 className="text-2xl font-bold font-poppins text-black-custom">{trip.destination}</h4>
                                                            <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${trip.status === 'APPROVED' ? 'bg-main/10 text-main' : trip.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                                                                }`}>
                                                                {trip.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-8">
                                                            <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform">
                                                                <div className="p-2.5 bg-slate-50 rounded-2xl text-main">
                                                                    <Clock3 size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                                                                    <p className="font-bold text-black-custom text-sm">{trip.days} Days</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform">
                                                                <div className="p-2.5 bg-slate-50 rounded-2xl text-main">
                                                                    <Map size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activities</p>
                                                                    <p className="font-bold text-black-custom text-sm">{JSON.parse(trip.activities).length} Selected</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Estimated Price</p>
                                                        <p className="text-4xl font-black font-poppins text-black-custom">${trip.totalPrice || '1,200+'}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pending Approval</p>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-main/5 rounded-2xl border border-main/10 flex items-center justify-between">
                                                    <p className="text-sm font-bold text-main flex items-center space-x-2">
                                                        <Bell size={16} />
                                                        <span>We'll notify you once our team reviews this trip.</span>
                                                    </p>
                                                    <button className="text-main hover:underline font-black text-xs uppercase tracking-widest">Withdraw Request</button>
                                                </div>
                                            </div>
                                        ))}
                                        {customTrips.length === 0 && (
                                            <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200 space-y-6">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                                    <Briefcase size={32} className="text-slate-200" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-bold text-black-custom">No custom requests</h4>
                                                    <p className="text-slate-500 font-medium">You haven't built any custom itineraries yet.</p>
                                                </div>
                                                <Link href="/custom-trip">
                                                    <Button variant="outline" size="md" className="rounded-xl px-10">Build Your First Trip</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'wishlist' && (
                                    <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200 space-y-6">
                                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
                                            <Heart size={32} className="text-rose-200" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-black-custom">Your wishlist is empty</h4>
                                            <p className="text-slate-500 font-medium">Save tours to your wishlist to book them later.</p>
                                        </div>
                                        <Link href="/tours">
                                            <Button size="md" className="rounded-xl">Explore Experiences</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
