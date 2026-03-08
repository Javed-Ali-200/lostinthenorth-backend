'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Mountain, Loader2, Eye, EyeOff } from 'lucide-react';
import { adminApi } from '@/services/api';
import toast from 'react-hot-toast';

interface FormValues { email: string; password: string }

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPwd, setShowPwd] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

    const onSubmit = async ({ email, password }: FormValues) => {
        try {
            const res = await adminApi.login(email, password);
            const { token, admin } = res.data.data;
            localStorage.setItem('admin_token', token);
            localStorage.setItem('admin_user', JSON.stringify(admin));
            toast.success(`Welcome back, ${admin.name}!`);
            router.push('/admin');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark via-teal/20 to-dark flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl bg-teal">
                        <Mountain size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-display font-bold text-dark">Admin Panel</h1>
                        <p className="text-gray-400 text-xs">Lost in the North</p>
                    </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-dark mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6">Sign in to manage your travel platform.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                            placeholder="admin@lostinthenorth.pk"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPwd ? 'text' : 'password'}
                                {...register('password', { required: 'Password is required' })}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
