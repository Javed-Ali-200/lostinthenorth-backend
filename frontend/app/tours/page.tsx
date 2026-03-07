'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    MapPin,
    Clock,
    DollarSign,
    Filter,
    ArrowRight,
    ChevronRight,
    TrendingUp,
    SlidersHorizontal,
    ChevronDown,
    Star
} from 'lucide-react';
import Link from 'next/link';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Tour } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ToursPage() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        location: '',
    });

    const fetchTours = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (searchTerm) queryParams.append('location', searchTerm);
            if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
            if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

            const response = await api.get(`/tours?${queryParams.toString()}`);
            setTours(response.data.tours);
        } catch (error) {
            console.error('Failed to fetch tours', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, [searchTerm, filters]);

    return (
        <UserLayout>
            {/* Search Header */}
            <section className="relative pt-40 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white transition-all animate-fade-in text-shadow-custom">Find Your Next Adventure</h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Browse through our handpicked collection of world-class tour packages designed for every type of traveler.
                    </p>

                    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl p-4 rounded-3xl border border-white/20 shadow-2xl mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2 relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-main transition-colors">
                                    <Search size={22} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-main/20 text-white focus:text-black-custom font-bold transition-all placeholder:text-slate-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <DollarSign size={20} />
                                </div>
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-main/20 text-white focus:text-black-custom font-bold transition-all placeholder:text-slate-400"
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <DollarSign size={20} />
                                </div>
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-transparent rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-main/20 text-white focus:text-black-custom font-bold transition-all placeholder:text-slate-400"
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <p className="text-main font-bold uppercase tracking-[0.2em] text-sm mb-2">Results</p>
                            <h2 className="text-4xl font-bold font-poppins text-black-custom">{tours.length} Tours Found</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-6 py-3 bg-slate-50 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
                                <SlidersHorizontal size={18} />
                                <span>Filters</span>
                                <ChevronDown size={18} />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {tours.map((tour) => (
                                <Link key={tour.id} href={`/tours/${tour.id}`}>
                                    <Card className="flex flex-col h-full border-none shadow-xl shadow-slate-100/50 group">
                                        <div className="relative h-72 overflow-hidden">
                                            <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-4 left-4 flex items-center space-x-2">
                                                {tour.featured && (
                                                    <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/30">Featured</span>
                                                )}
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-widest">
                                                    <MapPin size={14} className="text-main" />
                                                    <span>{tour.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-6 flex-grow flex flex-col">
                                            <div className="space-y-2">
                                                <h4 className="text-2xl font-bold font-poppins text-black-custom leading-tight group-hover:text-main transition-colors">{tour.title}</h4>
                                                <div className="flex items-center space-x-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                                    <div className="flex items-center space-x-1">
                                                        <Clock size={14} className="text-emerald-500" />
                                                        <span>{tour.duration} Days</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <TrendingUp size={14} className="text-purple-500" />
                                                        <span>{tour.maxGroupSize} People</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed italic">{tour.description}</p>

                                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <div>
                                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Start from</p>
                                                    <p className="text-3xl font-bold text-black-custom">${tour.price}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 text-main font-bold group-hover:translate-x-2 transition-transform">
                                                    <span>Details</span>
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}

                            {!loading && tours.length === 0 && (
                                <div className="col-span-full py-20 text-center space-y-6">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                        <Search size={40} className="text-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold text-slate-900">No matching tours</h4>
                                        <p className="text-slate-500 font-medium">Try adjusting your filters or search terms.</p>
                                    </div>
                                    <Button onClick={() => { setSearchTerm(''); setFilters({ minPrice: '', maxPrice: '', location: '' }) }} variant="outline">Clear All Filters</Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-main rounded-full blur-[150px] opacity-20" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-main font-bold uppercase tracking-[0.2em] text-sm">Luxury Travel</h2>
                        <h3 className="text-5xl md:text-7xl font-bold font-poppins leading-tight">Can't find what you're looking for?</h3>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">
                            Our travel specialists are ready to curate a bespoke experience just for you. Tell us your dreams, and we'll build the itinerary.
                        </p>
                        <div className="pt-4">
                            <Link href="/custom-trip">
                                <Button size="lg" className="px-10 py-5 text-xl rounded-2xl">Start Customizing <ArrowRight className="ml-2" /></Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e"
                            alt="Luxury"
                            className="rounded-[60px] shadow-2xl scale-100 hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-2xl flex items-center space-x-6">
                            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                                <Star size={32} />
                            </div>
                            <div>
                                <p className="text-slate-900 font-black text-2xl">4.9/5 RATING</p>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Customer Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
