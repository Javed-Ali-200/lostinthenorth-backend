'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ShieldCheck,
    CreditCard,
    Lock,
    ChevronRight,
    CheckCircle2,
    Calendar,
    Users,
    MapPin,
    PlaneTakeoff,
    ArrowLeft,
    Star
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Booking } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample');

const CheckoutForm = ({ booking, onComplete }: { booking: Booking, onComplete: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            // 1. Create Payment Intent
            const { data } = await api.post('/payments/create-intent', { bookingId: booking.id });
            const { clientSecret } = data;

            // 2. Confirm Payment with Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: booking.user?.name || 'Customer',
                        email: booking.user?.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message || 'Payment failed');
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Confirm with backend
                    await api.post('/payments/confirm', { paymentId: data.paymentId });
                    onComplete();
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <label className="text-sm font-black text-black-custom uppercase tracking-widest flex items-center space-x-2">
                    <CreditCard size={16} className="text-main" />
                    <span>Card Details</span>
                </label>
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-100 shadow-sm focus-within:border-main transition-all">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#1e293b',
                                '::placeholder': { color: '#94a3b8' },
                            },
                        },
                    }} />
                </div>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center space-x-2">
                    <XCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <div className="pt-4 space-y-4 text-center">
                <Button
                    type="submit"
                    className="w-full py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-main/30"
                    disabled={!stripe || loading}
                    isLoading={loading}
                >
                    Pay ${booking.totalPrice.toLocaleString()} Securely
                </Button>
                <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Lock size={12} />
                        <span>SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <ShieldCheck size={12} />
                        <span>PCI Compliant</span>
                    </div>
                </div>
            </div>
        </form>
    );
};

function XCircle({ size, className }: { size?: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
    );
}

export default function CheckoutPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await api.get(`/bookings`); // Normally would get by ID but controller has list
                // For simplicity search in list, or better to have getBookingById
                const found = response.data.bookings.find((b: any) => b.id === id);
                setBooking(found);
            } catch (error) {
                console.error('Failed to fetch booking', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    if (!booking) return <div className="h-screen flex items-center justify-center">Booking not found</div>;

    if (success) {
        return (
            <UserLayout>
                <div className="min-h-screen pt-40 pb-20 flex items-center justify-center px-6">
                    <div className="max-w-md w-full text-center space-y-10">
                        <div className="relative">
                            <div className="w-32 h-32 bg-main/10 rounded-[40px] flex items-center justify-center mx-auto animate-bounce-slow">
                                <CheckCircle2 className="text-main" size={64} />
                            </div>
                            <div className="absolute top-0 right-1/4 animate-pulse">✨</div>
                            <div className="absolute bottom-4 left-1/4 animate-pulse">✨</div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold font-poppins text-black-custom">Payment Successful!</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Pack your bags! Your adventure for <strong>{booking.tour?.title || 'your trip'}</strong> is officially confirmed. A confirmation email has been sent.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <Link href="/profile">
                                <Button variant="primary" className="w-full py-4 rounded-2xl font-bold">View My Bookings</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" className="w-full py-4 rounded-2xl font-bold text-slate-500">Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="min-h-screen pt-40 pb-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Checkout Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-2">
                            <button onClick={() => router.back()} className="text-slate-400 font-bold text-sm flex items-center space-x-2 hover:text-main transition-all mb-4">
                                <ArrowLeft size={16} />
                                <span>Modify Selection</span>
                            </button>
                            <h1 className="text-4xl font-bold font-poppins text-black-custom">Secure Checkout</h1>
                            <p className="text-slate-500 font-medium">Complete your payment to finalize the booking.</p>
                        </div>

                        <Card className="p-10 border-none shadow-xl shadow-slate-200/50">
                            <div className="flex items-center space-x-4 mb-10 pb-10 border-b border-slate-50">
                                <div className="w-14 h-14 bg-main/10 text-main rounded-2xl flex items-center justify-center font-bold text-xl">1</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-black-custom text-lg">Payment Method</h3>
                                    <p className="text-slate-400 text-sm font-medium">All transactions are secure and encrypted.</p>
                                </div>
                                <div className="flex items-center space-x-2 grayscale opacity-40">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                </div>
                            </div>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm booking={booking} onComplete={() => setSuccess(true)} />
                            </Elements>
                        </Card>

                        <div className="p-8 rounded-[32px] bg-slate-100/50 border-2 border-dashed border-slate-200 flex items-center space-x-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm text-main">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-black-custom">Travel Protection</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    This booking is covered by our basic travel protection plan. Learn more about <a href="#" className="underline text-main">TravelX Coverage</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-8 border-none shadow-2xl shadow-slate-200/50 space-y-8">
                                <h3 className="text-xl font-bold font-poppins text-black-custom border-b border-slate-50 pb-6">Order Summary</h3>

                                <div className="flex items-start space-x-4 pb-8 border-b border-slate-50">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                        <img src={booking.tour?.images[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{booking.tour?.title || 'Custom Adventure'}</h4>
                                        <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            <MapPin size={10} className="text-blue-500" />
                                            <span>{booking.tour?.location || 'Custom Destination'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between font-medium text-sm text-slate-500">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={14} />
                                            <span>Date</span>
                                        </div>
                                        <span className="text-black-custom font-bold">{new Date(booking.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between font-medium text-sm text-slate-500">
                                        <div className="flex items-center space-x-2">
                                            <Users size={14} />
                                            <span>Travelers</span>
                                        </div>
                                        <span className="text-black-custom font-bold">{booking.numberOfPeople} People</span>
                                    </div>
                                </div>

                                <hr className="border-slate-50" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between font-bold text-slate-500 text-sm">
                                        <span>Subtotal</span>
                                        <span className="text-black-custom">${booking.totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between font-bold text-slate-500 text-sm">
                                        <span>Taxes & Fees</span>
                                        <span className="text-main">INCLUDED</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <p className="text-lg font-bold font-poppins text-black-custom uppercase tracking-widest text-xs">Total Amount</p>
                                        <p className="text-3xl font-black font-poppins text-main">${booking.totalPrice.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center space-x-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <PlaneTakeoff size={20} className="text-orange-500" />
                                    </div>
                                    <p className="text-xs font-bold text-orange-700 leading-tight">
                                        Lucky you! You're saving $150 on this trip compared to last month.
                                    </p>
                                </div>
                            </Card>

                            <div className="flex items-center space-x-2 p-2 px-6">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400 fill-current" />)}
                                <span className="text-xs font-bold text-slate-500 tracking-tight">Trustscore 4.9 based on 2k+ orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

