'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    ArrowLeft,
    MapPin,
    DollarSign,
    Clock,
    Users,
    Image as ImageIcon,
    Plus,
    X,
    Save,
    Trash2
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';

const tourSchema = z.object({
    title: z.string().min(3, 'Title is too short'),
    description: z.string().min(10, 'Description is too short'),
    price: z.number().positive('Price must be positive'),
    duration: z.number().int().positive('Duration must be positive'),
    location: z.string().min(2, 'Location is required'),
    maxGroupSize: z.number().int().positive().optional(),
    featured: z.boolean().optional(),
    available: z.boolean().optional(),
});

type TourForm = z.infer<typeof tourSchema>;

export default function NewTour() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [imageInput, setImageInput] = useState('');
    const [included, setIncluded] = useState<string[]>([]);
    const [includedInput, setIncludedInput] = useState('');
    const [excluded, setExcluded] = useState<string[]>([]);
    const [excludedInput, setExcludedInput] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TourForm>({
        resolver: zodResolver(tourSchema),
        defaultValues: {
            featured: false,
            available: true,
            maxGroupSize: 10,
        }
    });

    const onSubmit = async (data: TourForm) => {
        if (images.length === 0) {
            alert('Please add at least one image URL');
            return;
        }

        setLoading(true);
        try {
            await api.post('/admin/tours', {
                ...data,
                images,
                included,
                excluded,
            });
            router.push('/admin/tours');
        } catch (error) {
            console.error('Failed to create tour', error);
            alert('Failed to create tour');
        } finally {
            setLoading(false);
        }
    };

    const addImage = () => {
        if (imageInput && !images.includes(imageInput)) {
            setImages([...images, imageInput]);
            setImageInput('');
        }
    };

    const removeImage = (url: string) => {
        setImages(images.filter(img => img !== url));
    };

    const addItem = (list: string[], setList: Function, input: string, setInput: Function) => {
        if (input && !list.includes(input)) {
            setList([...list, input]);
            setInput('');
        }
    };

    const removeItem = (list: string[], setList: Function, item: string) => {
        setList(list.filter(i => i !== item));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link href="/admin/tours" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-2">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Tours
                    </Link>
                    <h1 className="text-3xl font-bold font-outfit text-slate-900">Create New Tour</h1>
                    <p className="text-slate-500 font-medium">Define your new travel package details and pricing.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-8 border-none shadow-xl shadow-slate-200/50 space-y-6">
                            <h3 className="text-xl font-bold font-outfit text-slate-900 border-b border-slate-50 pb-4">Basic Information</h3>

                            <Input
                                label="Tour Title"
                                placeholder="e.g. Magnificent Bali Adventure"
                                error={errors.title?.message}
                                {...register('title')}
                            />

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 ml-1">Description</label>
                                <textarea
                                    rows={6}
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 p-4 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 text-slate-700 font-medium"
                                    placeholder="Describe the tour in detail..."
                                    {...register('description')}
                                />
                                {errors.description && <p className="text-xs font-medium text-rose-500 ml-1">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <Input
                                    label="Tour Location"
                                    placeholder="e.g. Bali, Indonesia"
                                    icon={<MapPin size={20} />}
                                    error={errors.location?.message}
                                    {...register('location')}
                                />
                                <Input
                                    label="Price ($)"
                                    placeholder="1299"
                                    type="number"
                                    icon={<DollarSign size={20} />}
                                    error={errors.price?.message}
                                    {...register('price', { valueAsNumber: true })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <Input
                                    label="Duration (Days)"
                                    placeholder="7"
                                    type="number"
                                    icon={<Clock size={20} />}
                                    error={errors.duration?.message}
                                    {...register('duration', { valueAsNumber: true })}
                                />
                                <Input
                                    label="Max Group Size"
                                    placeholder="15"
                                    type="number"
                                    icon={<Users size={20} />}
                                    error={errors.maxGroupSize?.message}
                                    {...register('maxGroupSize', { valueAsNumber: true })}
                                />
                            </div>
                        </Card>

                        {/* Included & Excluded */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 border-none shadow-xl shadow-slate-200/50 space-y-4">
                                <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">What's Included?</h3>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2 transition-all focus:border-emerald-500 focus:outline-none"
                                        placeholder="Add item..."
                                        value={includedInput}
                                        onChange={(e) => setIncludedInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(included, setIncluded, includedInput, setIncludedInput))}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem(included, setIncluded, includedInput, setIncludedInput)}
                                        className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2 pt-2">
                                    {included.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl text-emerald-700 text-sm font-bold group">
                                            <span>{item}</span>
                                            <button type="button" onClick={() => removeItem(included, setIncluded, item)} className="opacity-0 group-hover:opacity-100 transition-all text-rose-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-8 border-none shadow-xl shadow-slate-200/50 space-y-4">
                                <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">What's Excluded?</h3>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2 transition-all focus:border-rose-500 focus:outline-none"
                                        placeholder="Add item..."
                                        value={excludedInput}
                                        onChange={(e) => setExcludedInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(excluded, setExcluded, excludedInput, setExcludedInput))}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addItem(excluded, setExcluded, excludedInput, setExcludedInput)}
                                        className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all shadow-sm"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2 pt-2">
                                    {excluded.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-rose-50/50 rounded-xl text-rose-700 text-sm font-bold group">
                                            <span>{item}</span>
                                            <button type="button" onClick={() => removeItem(excluded, setExcluded, item)} className="opacity-0 group-hover:opacity-100 transition-all text-rose-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        {/* Image Manager */}
                        <Card className="p-8 border-none shadow-xl shadow-slate-200/50 space-y-6">
                            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center space-x-2">
                                <ImageIcon className="text-blue-500" size={24} />
                                <span>Tour Gallery</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2 text-sm transition-all focus:border-blue-500 focus:outline-none"
                                        placeholder="Enter image URL..."
                                        value={imageInput}
                                        onChange={(e) => setImageInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={addImage}
                                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    {images.map((url, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden shadow-md">
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(url)}
                                                className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length === 0 && (
                                        <div className="col-span-2 py-10 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center space-y-2">
                                            <ImageIcon size={32} className="text-slate-200" />
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No images added</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Status & Options */}
                        <Card className="p-8 border-none shadow-xl shadow-slate-200/50 space-y-6">
                            <h3 className="text-xl font-bold font-outfit text-slate-900 border-b border-slate-50 pb-4">Settings</h3>

                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-blue-200 transition-all cursor-pointer">
                                    <div className="space-y-0.5">
                                        <span className="block font-bold text-sm text-slate-900">Featured Tour</span>
                                        <span className="block text-xs text-slate-500 font-medium">Display on homepage</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-10 h-6 bg-slate-200 rounded-full appearance-none checked:bg-blue-600 transition-colors relative cursor-pointer before:content-[''] before:absolute before:left-1 before:top-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4"
                                        {...register('featured')}
                                    />
                                </label>

                                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-emerald-200 transition-all cursor-pointer">
                                    <div className="space-y-0.5">
                                        <span className="block font-bold text-sm text-slate-900">Available</span>
                                        <span className="block text-xs text-slate-500 font-medium">Accept new bookings</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="w-10 h-6 bg-slate-200 rounded-full appearance-none checked:bg-emerald-600 transition-colors relative cursor-pointer before:content-[''] before:absolute before:left-1 before:top-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4"
                                        {...register('available')}
                                    />
                                </label>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full py-4 rounded-2xl text-lg shadow-2xl shadow-blue-600/30"
                                    isLoading={loading}
                                >
                                    <Save className="mr-2" size={20} />
                                    Save Tour
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
