'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    MapPin,
    Hotel,
    Car,
    Calendar,
    Users,
    Activity,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Briefcase,
    Sparkles,
    PlaneTakeoff,
    Clock,
    DollarSign
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import Input from '@/components/shared/Input';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function CustomTripBuilder() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState<any[]>([]);
    const [cars, setCars] = useState<any[]>([]);
    const { user } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        destination: '',
        hotelId: '',
        carId: '',
        days: 3,
        numberOfPeople: 1,
        startDate: '',
        activities: [] as string[],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hotelsRes, carsRes] = await Promise.all([
                    api.get('/hotels'),
                    api.get('/cars'),
                ]);
                setHotels(hotelsRes.data.hotels);
                setCars(carsRes.data.cars);
            } catch (error) {
                console.error('Failed to fetch builder data', error);
            }
        };
        fetchData();
    }, []);

    const totalSteps = 4;

    const handleSubmit = async () => {
        if (!user) {
            router.push('/login?redirect=/custom-trip');
            return;
        }

        setLoading(true);
        try {
            await api.post('/custom-trips', {
                ...formData,
                activities: JSON.stringify(formData.activities),
            });
            setStep(5); // Success step
        } catch (error) {
            console.error('Failed to submit custom trip', error);
            alert('Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    const toggleActivity = (activity: string) => {
        if (formData.activities.includes(activity)) {
            setFormData({ ...formData, activities: formData.activities.filter(a => a !== activity) });
        } else {
            setFormData({ ...formData, activities: [...formData.activities, activity] });
        }
    };

    const selectedHotel = hotels.find(h => h.id === formData.hotelId);
    const selectedCar = cars.find(c => c.id === formData.carId);

    return (
        <UserLayout>
            <div className="min-h-screen pt-40 pb-24 bg-slate-50">
                <div className="max-w-5xl mx-auto px-6">
                    {step <= totalSteps && (
                        <div className="space-y-12">
                            {/* Progress Bar */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-sm font-bold uppercase tracking-widest">
                                    <p className="text-main">Step {step} of {totalSteps}</p>
                                    <p className="text-slate-400">{Math.round((step / totalSteps) * 100)}% Completed</p>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-main rounded-full transition-all duration-500 ease-out shadow-lg shadow-main/30"
                                        style={{ width: `${(step / totalSteps) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Step 1: Destination & Basics */}
                            {step === 1 && (
                                <div className="space-y-10 animate-fadeIn">
                                    <div className="text-center space-y-4">
                                        <h1 className="text-5xl font-bold font-poppins text-black-custom">Where shall we go?</h1>
                                        <p className="text-lg text-slate-500 font-medium">Let's start with the basics of your dream vacation.</p>
                                    </div>

                                    <Card className="p-10 border-none shadow-2xl shadow-slate-200/50 space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <Input
                                                label="Destination City/Country"
                                                placeholder="e.g. Kyoto, Japan"
                                                icon={<MapPin size={22} />}
                                                value={formData.destination}
                                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            />
                                            <Input
                                                label="Departure Date"
                                                type="date"
                                                icon={<Calendar size={22} />}
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Number of Days</label>
                                                <div className="flex items-center space-x-6 bg-slate-50 p-3 rounded-2xl border-2 border-slate-100">
                                                    <button onClick={() => setFormData({ ...formData, days: Math.max(1, formData.days - 1) })} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-xl">-</button>
                                                    <span className="flex-1 text-center font-bold text-xl">{formData.days}</span>
                                                    <button onClick={() => setFormData({ ...formData, days: formData.days + 1 })} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-xl">+</button>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Travelers</label>
                                                <div className="flex items-center space-x-6 bg-slate-50 p-3 rounded-2xl border-2 border-slate-100">
                                                    <button onClick={() => setFormData({ ...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1) })} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-xl">-</button>
                                                    <span className="flex-1 text-center font-bold text-xl">{formData.numberOfPeople}</span>
                                                    <button onClick={() => setFormData({ ...formData, numberOfPeople: formData.numberOfPeople + 1 })} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-xl">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {/* Step 2: Accommodation */}
                            {step === 2 && (
                                <div className="space-y-10 animate-fadeIn">
                                    <div className="text-center space-y-4">
                                        <h1 className="text-5xl font-bold font-outfit text-slate-900">Choose Your Stay</h1>
                                        <p className="text-lg text-slate-500 font-medium">Select a premium hotel based on our recommendations.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {hotels.map((hotel) => (
                                            <div
                                                key={hotel.id}
                                                onClick={() => setFormData({ ...formData, hotelId: hotel.id })}
                                                className={`group relative p-2 rounded-[32px] cursor-pointer transition-all ${formData.hotelId === hotel.id ? 'ring-4 ring-blue-600 bg-blue-50' : 'bg-white hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg mb-6">
                                                    <img src={hotel.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                                </div>
                                                <div className="px-4 pb-6 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-bold text-black-custom">{hotel.name}</h4>
                                                        {formData.hotelId === hotel.id && <CheckCircle2 className="text-main" size={20} />}
                                                    </div>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center space-x-1">
                                                        <MapPin size={12} />
                                                        <span>{hotel.location}</span>
                                                    </p>
                                                    <p className="pt-2 font-bold text-main">${hotel.pricePerNight}<span className="text-slate-400 text-[10px] font-medium ml-1">/ night</span></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Transport */}
                            {step === 3 && (
                                <div className="space-y-10 animate-fadeIn">
                                    <div className="text-center space-y-4">
                                        <h1 className="text-5xl font-bold font-outfit text-slate-900">Premium Transport</h1>
                                        <p className="text-lg text-slate-500 font-medium">How would you like to get around during your stay?</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {cars.map((car) => (
                                            <div
                                                key={car.id}
                                                onClick={() => setFormData({ ...formData, carId: car.id })}
                                                className={`group relative flex items-center space-x-6 p-6 rounded-[32px] cursor-pointer transition-all border-2 ${formData.carId === car.id ? 'border-main bg-main/5 shadow-xl shadow-main/10' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                                                    }`}
                                            >
                                                <div className="w-40 h-28 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                                    <img src={car.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-bold text-black-custom text-lg">{car.name}</h4>
                                                        {formData.carId === car.id && <CheckCircle2 className="text-main" size={20} />}
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-wider font-poppins">{car.type}</span>
                                                        <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{car.seats} Seats</span>
                                                    </div>
                                                    <p className="font-bold text-main">${car.pricePerDay}<span className="text-slate-400 text-[10px] font-medium ml-1">/ day</span></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Activities & Summary */}
                            {step === 4 && (
                                <div className="space-y-12 animate-fadeIn">
                                    <div className="text-center space-y-4">
                                        <h1 className="text-5xl font-bold font-outfit text-slate-900">Extra Activities</h1>
                                        <p className="text-lg text-slate-500 font-medium">Select activities you're interested in for a complete itinerary.</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['Temple Tour', 'Food Tasting', 'Snorkeling', 'Hiking', 'Museums', 'Night Life', 'Spa & Wellness', 'Shopping'].map((act) => (
                                            <button
                                                key={act}
                                                onClick={() => toggleActivity(act)}
                                                className={`p-6 rounded-3xl font-bold text-sm transition-all border-2 flex flex-col items-center space-y-4 ${formData.activities.includes(act)
                                                    ? 'bg-main border-main text-white shadow-xl shadow-main/30 -translate-y-1'
                                                    : 'bg-white border-slate-100 text-slate-600 hover:border-main/20'
                                                    }`}
                                            >
                                                <Activity size={24} />
                                                <span>{act}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="pt-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-6">
                                            <h3 className="text-2xl font-bold font-poppins text-black-custom select-none">Trip Overview</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-6 bg-slate-100 rounded-3xl space-y-1 border border-transparent hover:border-slate-200 transition-all">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</p>
                                                    <p className="font-bold text-black-custom">{formData.destination || 'Not Specified'}</p>
                                                </div>
                                                <div className="p-6 bg-slate-100 rounded-3xl space-y-1 border border-transparent hover:border-slate-200 transition-all">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Hotel</p>
                                                    <p className="font-bold text-black-custom">{selectedHotel?.name || 'Not Selected'}</p>
                                                </div>
                                                <div className="p-6 bg-slate-100 rounded-3xl space-y-1 border border-transparent hover:border-slate-200 transition-all">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Car</p>
                                                    <p className="font-bold text-black-custom">{selectedCar?.name || 'Not Selected'}</p>
                                                </div>
                                                <div className="p-6 bg-slate-100 rounded-3xl space-y-1 border border-transparent hover:border-slate-200 transition-all">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates</p>
                                                    <p className="font-bold text-black-custom">{formData.days} Days from {formData.startDate || 'TBD'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-slate-900 rounded-[40px] text-white space-y-8 shadow-2xl">
                                            <div className="space-y-2">
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Estimated Pricing</p>
                                                <h4 className="text-5xl font-black font-poppins">${
                                                    ((selectedHotel?.pricePerNight || 0) * formData.days) +
                                                    ((selectedCar?.pricePerDay || 0) * formData.days) +
                                                    (formData.activities.length * 50)
                                                }<span className="text-slate-400 text-lg font-bold ml-2">approx.</span></h4>
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                                Price is an estimate. Final pricing will be confirmed by an administrator within 24 hours.
                                            </p>
                                            <Button onClick={handleSubmit} isLoading={loading} className="w-full py-5 rounded-2xl text-xl font-bold bg-white text-black-custom hover:bg-slate-100">
                                                Submit Request
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                <button
                                    disabled={step === 1}
                                    onClick={() => setStep(step - 1)}
                                    className="flex items-center space-x-3 text-slate-400 font-bold hover:text-slate-900 disabled:opacity-0 transition-all"
                                >
                                    <ChevronLeft size={24} />
                                    <span>Previous Step</span>
                                </button>
                                {step < 4 && (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="flex items-center space-x-3 bg-main text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-main/30 hover:bg-main/90 active:scale-95 transition-all"
                                    >
                                        <span>Continue Journey</span>
                                        <ChevronRight size={24} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Success Step */}
                    {step === 5 && (
                        <div className="py-20 flex items-center justify-center animate-scaleIn">
                            <div className="max-w-xl w-full text-center space-y-12">
                                <div className="relative">
                                    <div className="w-40 h-40 bg-blue-600 rounded-[50px] flex items-center justify-center mx-auto shadow-2xl shadow-blue-600/40 rotate-12 group hover:rotate-0 transition-transform duration-500">
                                        <Sparkles className="text-white" size={64} />
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                                        <CheckCircle2 size={24} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-5xl font-bold font-poppins text-black-custom">Request Received!</h2>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                        Your personalized trip request for <span className="text-main font-bold">{formData.destination}</span> has been sent to our travel specialists. We'll review and get back to you with a final itinerary and quote within 24 hours.
                                    </p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Link href="/profile">
                                        <Button className="w-full py-4 rounded-2xl font-bold text-lg">My Custom Trips</Button>
                                    </Link>
                                    <Link href="/">
                                        <Button variant="outline" className="w-full py-4 rounded-2xl font-bold text-lg">Explore Tours</Button>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center space-x-8 pt-4">
                                    <div className="flex flex-col items-center">
                                        <p className="text-2xl font-bold text-black-custom">24h</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Turnaround</p>
                                    </div>
                                    <div className="h-10 w-px bg-slate-200" />
                                    <div className="flex flex-col items-center">
                                        <p className="text-2xl font-bold text-black-custom">100%</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customizable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
