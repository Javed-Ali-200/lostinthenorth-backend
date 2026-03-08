'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, Mountain, Calendar, Users, MapPin } from 'lucide-react';
import { customTripApi } from '@/services/api';
import toast from 'react-hot-toast';

interface FormValues {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    destination: string;
    days: number;
    numberOfPeople: number;
    startDate?: string;
    activities: string;
    posterImage?: FileList;
}

export default function CustomTripPage() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { numberOfPeople: 1, days: 3 },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const fd = new FormData();
            Object.entries(values).forEach(([k, v]) => {
                if (k === 'posterImage') return; // Handled separately
                if (v) fd.append(k, String(v));
            });

            if (values.posterImage && values.posterImage[0]) {
                fd.append('image', values.posterImage[0]);
            }

            await customTripApi.create(fd);
            setSubmitted(true);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 pt-20 px-4">
                <div className="bg-white rounded-2xl p-10 text-center shadow-lg max-w-md w-full">
                    <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                    <h2 className="font-display text-2xl font-bold text-dark mb-2">Request Received!</h2>
                    <p className="text-gray-500 mb-6">
                        Our team will review your custom trip request and get back to you within 24 hours with a personalised itinerary and pricing.
                    </p>
                    <a href="/" className="px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition inline-block">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header */}
            <div className="bg-dark text-white section-padding">
                <div className="container-max">
                    <span className="text-gold text-sm uppercase tracking-widest">Tailored for You</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Plan Your Custom Trip</h1>
                    <p className="text-gray-400 max-w-lg">
                        Tell us about your dream journey and we&apos;ll build the perfect itinerary — hotels, transport, and activities included.
                    </p>
                </div>
            </div>

            <div className="section-padding bg-stone-50">
                <div className="container-max">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { icon: MapPin, title: 'Any Destination', desc: 'Hunza, Skardu, Fairy Meadows, Naran – we cover every corner of the North.' },
                                { icon: Calendar, title: 'Flexible Dates', desc: 'Pick any dates that work for you. We\'ll plan around your schedule.' },
                                { icon: Users, title: 'Any Group Size', desc: 'Solo travelers, couples, families, or corporate groups – all welcome.' },
                                { icon: Mountain, title: 'Custom Itinerary', desc: 'Fully personalized day-by-day plan curated by our local experts.' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                                        <Icon size={18} className="text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark text-sm">{title}</h3>
                                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                                <h2 className="font-display text-2xl font-bold text-dark">Trip Details</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input {...register('customerName', { required: 'Required' })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                            placeholder="Your full name" />
                                        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input type="email" {...register('customerEmail', { required: 'Required' })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                            placeholder="you@example.com" />
                                        {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                        <input {...register('customerPhone', { required: 'Required' })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                            placeholder="+92 300 0000000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                                        <input {...register('destination', { required: 'Required' })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                            placeholder="e.g. Hunza, Skardu" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days *</label>
                                        <input type="number" min={1} max={30} {...register('days', { required: 'Required', min: 1 })}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                                        <input type="number" min={1} {...register('numberOfPeople')}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Start Date</label>
                                        <input type="date" {...register('startDate')}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Inspirition Image / Poster (Optional)</label>
                                        <input type="file" accept="image/*" {...register('posterImage')}
                                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20" />
                                        <p className="text-gray-400 text-[10px] mt-1">Upload a photo of a place you saw online or a moodboard for your trip.</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Activities & Preferences *</label>
                                        <textarea {...register('activities', { required: 'Required' })} rows={4}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition resize-none"
                                            placeholder="Describe the type of activities, accommodation preferences, any special requirements..." />
                                        {errors.activities && <p className="text-red-500 text-xs mt-1">{errors.activities.message}</p>}
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting}
                                    className="w-full py-3.5 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition flex items-center justify-center gap-2 disabled:opacity-60">
                                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" />Submitting...</> : 'Submit Trip Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
