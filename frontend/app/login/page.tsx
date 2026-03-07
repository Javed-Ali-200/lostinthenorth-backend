'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight, PlaneTakeoff } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/login', data);
            login(response.data.token, response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <Link href="/" className="inline-flex items-center space-x-2 text-main font-bold text-2xl group">
                            <div className="p-2 bg-main/10 rounded-xl group-hover:scale-110 transition-transform">
                                <PlaneTakeoff size={28} />
                            </div>
                            <span className="font-poppins tracking-tight">TravelX</span>
                        </Link>
                        <h1 className="text-4xl font-bold font-poppins text-black-custom pt-4">Welcome back</h1>
                        <p className="text-slate-500 font-medium">Please enter your details to sign in to your account.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="Email Address"
                            placeholder="name@example.com"
                            type="email"
                            icon={<Mail size={20} />}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                icon={<Lock size={20} />}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm font-semibold text-main hover:text-main/80">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-lg"
                            isLoading={loading}
                        >
                            Sign In <ArrowRight className="ml-2" size={20} />
                        </Button>
                    </form>

                    <p className="text-center text-slate-500 font-medium pt-4">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-main font-bold hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Visuals */}
            <div className="hidden lg:block relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-main/40 to-slate-900 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
                    alt="Travel"
                    className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[10s]"
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white space-y-6">
                    <div className="inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-wider uppercase">
                        Start Your Journey
                    </div>
                    <h2 className="text-6xl font-bold font-poppins leading-tight">Explore the world with TravelX</h2>
                    <p className="text-xl text-main/20 font-medium max-w-lg leading-relaxed">
                        Discover hidden gems and experience luxury travel like never before. Join our community of explorers today.
                    </p>
                    <div className="flex items-center space-x-6 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-xl">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <p className="text-main/80 font-medium text-lg">Joined by 10k+ travelers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
