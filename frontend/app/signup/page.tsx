'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, ArrowRight, PlaneTakeoff, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/signup', {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            login(response.data.token, response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Side - Featured Background */}
            <div className="hidden lg:block relative overflow-hidden bg-slate-900 order-2">
                <div className="absolute inset-0 bg-gradient-to-bl from-main/30 to-slate-900 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077"
                    alt="Santorini"
                    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[10s]"
                />
                <div className="absolute top-12 right-12 left-12 z-20 text-white space-y-6 text-right">
                    <div className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-wider uppercase ml-auto">
                        Experience Luxury
                    </div>
                    <h2 className="text-6xl font-bold font-poppins leading-tight">Your world-wide journey starts here</h2>
                    <p className="text-xl text-main/80 font-medium ml-auto max-w-lg leading-relaxed">
                        Create an account and unlock exclusive travel deals, personalized itineraries, and premium member benefits.
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-8 max-w-md ml-auto">
                        {[
                            { label: 'Secure', icon: <ShieldCheck className="mx-auto" /> },
                            { label: 'Fast', icon: <ArrowRight className="mx-auto" /> },
                            { label: 'Easy', icon: <User className="mx-auto" /> },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                                <div className="mb-2 text-main">{item.icon}</div>
                                <div className="font-bold text-sm tracking-wide uppercase">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-white max-lg:order-1">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <Link href="/" className="inline-flex items-center space-x-2 text-main font-bold text-2xl group">
                            <div className="p-2 bg-main/10 rounded-xl group-hover:scale-110 transition-transform">
                                <PlaneTakeoff size={28} />
                            </div>
                            <span className="font-poppins tracking-tight">TravelX</span>
                        </Link>
                        <h1 className="text-4xl font-bold font-poppins text-black-custom pt-4">Create account</h1>
                        <p className="text-slate-500 font-medium">Join us today to start planning your dream vacation.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            icon={<User size={20} />}
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                            icon={<Mail size={20} />}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                icon={<Lock size={20} />}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <Input
                                label="Confirm Password"
                                placeholder="••••••••"
                                type="password"
                                icon={<Lock size={20} />}
                                error={errors.confirmPassword?.message}
                                {...register('confirmPassword')}
                            />
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 rounded border-slate-300 text-main focus:ring-main"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-slate-500 font-medium leading-relaxed">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-main font-bold hover:underline">Terms of Service</a> and{' '}
                                <a href="#" className="text-main font-bold hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full py-4 text-lg mt-4"
                            isLoading={loading}
                        >
                            Sign Up <ArrowRight className="ml-2" size={20} />
                        </Button>
                    </form>

                    <p className="text-center text-slate-500 font-medium pt-2">
                        Already have an account?{' '}
                        <Link href="/login" className="text-main font-bold hover:underline">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
