'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { bookingApi } from '@/services/api';
import { sendBookingConfirmationEmail } from '@/utils/emailjs';
import toast from 'react-hot-toast';
import type { BookingFormData, ServiceType } from '@/types';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
    serviceType: ServiceType;
    serviceTitle: string;
    pricePerUnit: number;
}

interface FormValues {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    specialRequests?: string;
}

export default function BookingModal({
    isOpen, onClose, serviceId, serviceType, serviceTitle, pricePerUnit,
}: BookingModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [bookingNumber, setBookingNumber] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ defaultValues: { numberOfPeople: 1 } });

    if (!isOpen) return null;

    const startDate = watch('startDate');
    const endDate = watch('endDate');
    const people = watch('numberOfPeople') || 1;

    const calculateTotal = () => {
        if (!startDate || !endDate) return pricePerUnit;
        const days = Math.max(
            1,
            Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
        );
        return serviceType === 'TOUR'
            ? pricePerUnit * people
            : pricePerUnit * days * (serviceType === 'HOTEL' ? people : 1);
    };

    const onSubmit = async (values: FormValues) => {
        try {
            const payload: BookingFormData = {
                ...values,
                serviceId,
                serviceType,
                numberOfPeople: Number(values.numberOfPeople),
            };

            const res = await bookingApi.create(payload);
            const booking = res.data.data;
            setBookingNumber(booking.bookingNumber);

            // Send email
            try {
                await sendBookingConfirmationEmail({
                    customerName: values.customerName,
                    customerEmail: values.customerEmail,
                    customerPhone: values.customerPhone,
                    serviceTitle,
                    serviceType,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    numberOfPeople: Number(values.numberOfPeople),
                    totalPrice: calculateTotal(),
                    specialRequests: values.specialRequests,
                    bookingNumber: booking.bookingNumber,
                });
            } catch (emailErr) {
                console.warn('Email notification failed:', emailErr);
            }

            setStep('success');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => { setStep('form'); reset(); }, 300);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div>
                        <h2 className="font-display text-xl font-bold text-dark">Book Now</h2>
                        <p className="text-gray-500 text-sm line-clamp-1">{serviceTitle}</p>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {step === 'success' ? (
                        <div className="text-center py-8">
                            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                            <h3 className="font-display text-2xl font-bold text-dark mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-500 mb-1">Your booking number is:</p>
                            <span className="inline-block bg-teal/10 text-teal font-bold text-lg px-4 py-2 rounded-xl mb-4">
                                {bookingNumber}
                            </span>
                            <p className="text-gray-500 text-sm mb-6">
                                A confirmation email has been sent to you. Our team will contact you within 24 hours.
                            </p>
                            <button
                                onClick={handleClose}
                                className="px-6 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Total Preview */}
                            {startDate && endDate && (
                                <div className="bg-teal/5 rounded-xl px-4 py-3 text-center border border-teal/20">
                                    <p className="text-xs text-gray-500">Estimated Total</p>
                                    <p className="text-2xl font-bold text-teal">
                                        PKR {calculateTotal().toLocaleString()}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        {...register('customerName', { required: 'Name is required' })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                        placeholder="Muhammad Ali"
                                    />
                                    {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        {...register('customerEmail', { required: 'Email is required' })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                        placeholder="you@example.com"
                                    />
                                    {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <input
                                        {...register('customerPhone', { required: 'Phone is required' })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                        placeholder="+92 300 0000000"
                                    />
                                    {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                    <input
                                        type="date"
                                        min={today}
                                        {...register('startDate', { required: 'Start date is required' })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                    />
                                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                    <input
                                        type="date"
                                        min={startDate || today}
                                        {...register('endDate', { required: 'End date is required' })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                    />
                                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={50}
                                        {...register('numberOfPeople', { min: 1 })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                                    <textarea
                                        {...register('specialRequests')}
                                        rows={3}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition resize-none"
                                        placeholder="Any special requirements or notes..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <><Loader2 size={18} className="animate-spin" /> Processing...</>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
