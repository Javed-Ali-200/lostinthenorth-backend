'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    MapPin,
    Star,
    DollarSign,
    Coffee,
    Wifi,
    Waves,
    ChevronRight,
    Filter,
    Users,
    Hotel as HotelIcon
} from 'lucide-react';
import Link from 'next/link';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Hotel } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function HotelsPage() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/hotels?location=${searchTerm}`);
                setHotels(response.data.hotels);
            } catch (error) {
                console.error('Failed to fetch hotels', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, [searchTerm]);

    return (
        <UserLayout>
            <section className="relative pt-40 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white transition-all animate-fade-in text-shadow-custom">Exquisite Stays</h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Discover luxury accommodations handpicked for their unique charm and world-class service.
                    </p>

                    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-2xl p-4 rounded-3xl border border-white/20 shadow-2xl mt-12 group">
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 text-slate-400 group-focus-within:text-main transition-colors" size={22} />
                            <input
                                type="text"
                                placeholder="Search by city or hotel name..."
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-main/20 text-white focus:text-black-custom font-bold transition-all placeholder:text-slate-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center"><LoadingSpinner /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {hotels.map((hotel) => (
                                <Card key={hotel.id} className="group border-none shadow-xl shadow-slate-100 flex flex-col h-full">
                                    <div className="relative h-64 overflow-hidden">
                                        <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 px-3 rounded-xl flex items-center space-x-1 shadow-lg">
                                            <Star className="text-amber-500 fill-current" size={14} />
                                            <span className="font-black text-sm text-slate-900">{hotel.rating}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6 flex-grow flex flex-col">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2 text-main font-bold text-xs uppercase tracking-widest leading-none">
                                                <MapPin size={14} />
                                                <span>{hotel.location}</span>
                                            </div>
                                            <h4 className="text-2xl font-bold font-poppins text-black-custom leading-tight group-hover:text-main transition-colors">{hotel.name}</h4>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            {[
                                                { icon: <Wifi size={16} />, label: 'WiFi' },
                                                { icon: <Coffee size={16} />, label: 'Breakfast' },
                                                { icon: <Waves size={16} />, label: 'Pool' }
                                            ].map((amenity, i) => (
                                                <div key={i} className="flex items-center space-x-1.5 p-2 bg-slate-50 rounded-xl text-slate-400 font-bold text-[10px] uppercase tracking-widest border border-transparent hover:border-main/20 hover:text-main transition-all">
                                                    {amenity.icon}
                                                    <span className="hidden sm:inline">{amenity.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Starting from</p>
                                                <div className="flex items-baseline space-x-1">
                                                    <span className="text-3xl font-black text-black-custom font-poppins">${hotel.pricePerNight}</span>
                                                    <span className="text-slate-400 font-bold text-sm">/ night</span>
                                                </div>
                                            </div>
                                            <Link href={`/hotels/${hotel.id}`}>
                                                <button className="flex items-center space-x-2 p-3 px-6 rounded-xl border border-slate-200 hover:border-main font-bold text-slate-600 hover:text-main hover:bg-main/5 transition-all">
                                                    View Rooms <ChevronRight size={18} className="ml-1" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {!loading && hotels.length === 0 && (
                        <div className="py-20 text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                <HotelIcon size={40} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-slate-900">No hotels found in this location</h4>
                                <p className="text-slate-500 font-medium">Try broadening your search or contact us for assistance.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </UserLayout>
    );
}
