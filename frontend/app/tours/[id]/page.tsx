'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Users,
    Star,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    Calendar,
    ChevronRight,
    Plane,
    Camera,
    Heart,
    Share2
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Tour } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';

export default function TourDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [bookingDate, setBookingDate] = useState('');
    const [people, setPeople] = useState(1);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const response = await api.get(`/tours/${id}`);
                setTour(response.data.tour);
            } catch (error) {
                console.error('Failed to fetch tour', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            router.push('/login?redirect=/tours/' + id);
            return;
        }

        if (!bookingDate) {
            alert('Please select a date');
            return;
        }

        setBookingLoading(true);
        try {
            const response = await api.post('/bookings', {
                serviceType: 'TOUR',
                serviceId: id,
                startDate: bookingDate,
                endDate: bookingDate, // For tours, usually same or within range
                numberOfPeople: people,
            });
            router.push(`/checkout/${response.data.booking.id}`);
        } catch (error) {
            console.error('Booking failed', error);
            alert('Failed to create booking');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!tour) return <div className="h-screen flex items-center justify-center">Tour not found</div>;

    return (
        <UserLayout>
            {/* Header Image Gallery */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-slate-100">
                <div className="absolute inset-0">
                    {tour.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${activeImage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />
                </div>

                <div className="absolute inset-x-0 bottom-0 py-12 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 text-white">
                        <div className="space-y-6">
                            <button onClick={() => router.back()} className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold hover:bg-white/20 transition-all mb-4">
                                <ArrowLeft size={18} className="mr-2" />
                                Back to Explorations
                            </button>

                            <div className="flex items-center space-x-3 text-main font-bold uppercase tracking-[0.2em] text-sm">
                                <MapPin size={18} />
                                <span>{tour.location}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-tight drop-shadow-2xl text-shadow-custom">{tour.title}</h1>

                            <div className="flex items-center space-x-8 pt-4">
                                <div className="flex items-center space-x-3 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Duration</p>
                                        <p className="font-bold text-lg">{tour.duration} Days</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Group Size</p>
                                        <p className="font-bold text-lg">Up to {tour.maxGroupSize} People</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-2">
                            <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-rose-500 hover:border-rose-500 transition-all text-white group">
                                <Heart size={24} className="group-hover:fill-current" />
                            </button>
                            <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-main hover:border-main transition-all text-white">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Controls */}
                <div className="absolute top-1/2 right-8 -translate-y-1/2 space-y-3 hidden lg:flex flex-col z-20">
                    {tour.images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`w-3 h-12 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-main scale-y-125' : 'bg-white/30 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Content Area */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-16">
                        <div className="space-y-8">
                            <div className="flex items-center space-x-2">
                                <div className="w-12 h-1.5 bg-main rounded-full" />
                                <h2 className="text-3xl font-bold font-poppins text-black-custom">Experience Highlights</h2>
                            </div>
                            <p className="text-xl text-slate-600 leading-relaxed font-normal">
                                {tour.description}
                            </p>
                        </div>

                        {/* What's included */}
                        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold font-poppins text-black-custom flex items-center space-x-3">
                                    <CheckCircle2 className="text-main" size={24} />
                                    <span>Inclusions</span>
                                </h4>
                                <ul className="space-y-4">
                                    {tour.included.map((item, idx) => (
                                        <li key={idx} className="flex items-center space-x-3 text-slate-600 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold font-poppins text-black-custom flex items-center space-x-3">
                                    <XCircle className="text-rose-500" size={24} />
                                    <span>Exclusions</span>
                                </h4>
                                <ul className="space-y-4">
                                    {tour.excluded.map((item, idx) => (
                                        <li key={idx} className="flex items-center space-x-3 text-slate-600 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-rose-300" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Gallery Slider Overlay */}
                        <div className="pt-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold font-poppins text-black-custom">Tour Gallery</h3>
                                <div className="p-3 bg-slate-50 rounded-2xl text-main font-bold flex items-center space-x-2 text-sm">
                                    <Camera size={18} />
                                    <span>{tour.images.length} Photos</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {tour.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative aspect-[4/3] rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all shadow-slate-200"
                                        onClick={() => setActiveImage(idx)}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-main/0 group-hover:bg-main/20 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-10 border-none shadow-2xl shadow-slate-200/60 flex flex-col space-y-8 bg-slate-50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 translate-x-4 -translate-y-4">
                                    <Plane size={150} />
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Ultimate Value</p>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-5xl font-black font-poppins text-black-custom">${tour.price}</span>
                                        <span className="text-slate-500 font-bold">/ person</span>
                                    </div>
                                </div>

                                <hr className="border-slate-200" />

                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-black-custom uppercase tracking-widest flex items-center space-x-2">
                                            <Calendar size={16} className="text-main" />
                                            <span>Choose Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-main focus:outline-none transition-all font-bold text-slate-700"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-black-custom uppercase tracking-widest flex items-center space-x-2">
                                            <Users size={16} className="text-main" />
                                            <span>Number of People</span>
                                        </label>
                                        <div className="flex items-center space-x-4 bg-white border-2 border-slate-100 rounded-2xl p-2">
                                            <button
                                                onClick={() => setPeople(Math.max(1, people - 1))}
                                                className="w-12 h-12 rounded-xl bg-slate-50 font-black text-xl hover:bg-slate-100 transition-all text-slate-400"
                                            >-</button>
                                            <span className="flex-1 text-center font-black text-xl text-black-custom">{people}</span>
                                            <button
                                                onClick={() => setPeople(Math.min(tour.maxGroupSize, people + 1))}
                                                className="w-12 h-12 rounded-xl bg-slate-100 font-black text-xl hover:bg-slate-200 transition-all text-black-custom"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 relative z-10">
                                    <div className="flex items-center justify-between font-bold text-slate-500">
                                        <span>Total Price</span>
                                        <span className="text-black-custom text-2xl">${tour.price * people}</span>
                                    </div>
                                    <Button
                                        onClick={handleBooking}
                                        className="w-full py-5 rounded-2xl text-xl shadow-2xl shadow-main/30 font-bold"
                                        isLoading={bookingLoading}
                                    >
                                        Book This Experience
                                    </Button>
                                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center space-x-2">
                                        <ShieldCheck size={14} className="text-emerald-500" />
                                        <span>Instant Confirmation</span>
                                    </p>
                                </div>
                            </Card>

                            {/* Why book with us small cards */}
                            <div className="grid gap-4">
                                <div className="p-6 bg-main/5 rounded-3xl border border-main/10 flex items-center space-x-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-main">
                                        <Star size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold text-black-custom text-sm">Best Price Guarantee</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Find a better price? We'll match it plus 10%.</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex items-center space-x-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold text-black-custom text-sm">Safe & Trusted</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Verified reviews and 24/7 support during travel.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Review Section (Mocked) */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-main font-bold uppercase tracking-[0.2em] text-sm">Our Community</h2>
                            <h3 className="text-4xl md:text-5xl font-bold font-poppins text-black-custom">What Travelers Say</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-black-custom">4.9/5 Average</p>
                                <p className="text-slate-500 font-bold text-sm">Based on 1.2k+ reviews</p>
                            </div>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <Card key={i} className="p-10 border-none shadow-xl shadow-slate-200/50">
                                <div className="flex items-center space-x-1 text-amber-500 mb-6">
                                    {[1, 2, 3, 4, 5].map(j => <Star key={j} size={18} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-slate-600 font-medium italic leading-relaxed mb-8">
                                    "Absolutely breathtaking experience! The attention to detail and choice of local spots was incredible. Definitely booking my next trip with TravelX."
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/150?u=review-${i}`} alt="" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black-custom">Michael S.</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Frequent Traveler</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
