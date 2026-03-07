'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    MapPin,
    Car as CarIcon,
    DollarSign,
    Users,
    Settings,
    Fuel,
    ChevronRight,
    Filter,
    CheckCircle2,
    Wind
} from 'lucide-react';
import Link from 'next/link';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Car } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/cars?type=${searchTerm}`);
                setCars(response.data.cars);
            } catch (error) {
                console.error('Failed to fetch cars', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [searchTerm]);

    return (
        <UserLayout>
            <section className="relative pt-40 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white transition-all animate-fade-in text-shadow-custom">Luxury Fleet</h1>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Choose from our premium selection of vehicles for a comfortable and stylish journey.
                    </p>

                    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-2xl p-4 rounded-3xl border border-white/20 shadow-2xl mt-12 group">
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 text-slate-400 group-focus-within:text-main transition-colors" size={22} />
                            <input
                                type="text"
                                placeholder="Search by vehicle type (e.g. SUV, Sedan)..."
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
                            {cars.map((car) => (
                                <Card key={car.id} className="group border-none shadow-xl shadow-slate-100 flex flex-col h-full overflow-visible pt-16 mt-16 bg-white relative">
                                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[90%] transition-transform duration-500 group-hover:-translate-y-4">
                                        <img src={car.image} alt={car.name} className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_30px_30px_rgba(142,68,173,0.2)]" />
                                    </div>

                                    <div className="p-8 pb-10 space-y-8 flex-grow flex flex-col text-center">
                                        <div className="space-y-2 pt-4">
                                            <p className="text-main font-black text-xs uppercase tracking-[0.2em] leading-none">{car.type}</p>
                                            <h4 className="text-3xl font-black font-poppins text-black-custom leading-tight group-hover:text-main transition-colors">{car.name}</h4>
                                        </div>

                                        <div className="flex items-center justify-center space-x-6 py-4 border-y border-slate-50">
                                            <div className="flex flex-col items-center space-y-1">
                                                <Users size={16} className="text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{car.seats} Seats</span>
                                            </div>
                                            <div className="w-px h-8 bg-slate-100" />
                                            <div className="flex flex-col items-center space-y-1">
                                                <Settings size={16} className="text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Auto</span>
                                            </div>
                                            <div className="w-px h-8 bg-slate-100" />
                                            <div className="flex flex-col items-center space-y-1">
                                                <Fuel size={16} className="text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Petrol</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-8">
                                            <div className="space-y-1">
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Rate Per Day</p>
                                                <div className="flex items-center justify-center space-x-1">
                                                    <span className="text-4xl font-black text-black-custom font-poppins leading-none">${car.pricePerDay}</span>
                                                    <span className="text-slate-400 font-bold text-sm">/ day</span>
                                                </div>
                                            </div>
                                            <Link href={`/cars/${car.id}`} className="block">
                                                <Button className="w-full py-4 rounded-2xl shadow-xl shadow-slate-100 group-hover:shadow-main/30 transition-all font-bold">
                                                    Rent Luxury Now <ChevronRight size={18} className="ml-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {!loading && cars.length === 0 && (
                        <div className="py-20 text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                <CarIcon size={40} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-2xl font-bold text-slate-900">No vehicles available</h4>
                                <p className="text-slate-500 font-medium">Try another category or contact our fleet management.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Fleet Stats */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { label: 'Verified Cars', value: '250+', icon: <CheckCircle2 className="text-emerald-500" /> },
                        { label: 'Happy Clients', value: '10k+', icon: <Users className="text-main" /> },
                        { label: 'Fast Support', value: '24/7', icon: <Wind className="text-purple-500" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center space-x-6 p-8 bg-white rounded-[40px] shadow-sm">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-3xl font-black font-poppins text-black-custom leading-none">{stat.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </UserLayout>
    );
}
