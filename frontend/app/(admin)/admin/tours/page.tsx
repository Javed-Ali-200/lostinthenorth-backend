'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    MapPin,
    Clock,
    Users as UsersIcon,
    Edit2,
    Trash2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Map
} from 'lucide-react';
import api from '@/lib/api';
import { Tour } from '@/types';
import Button from '@/components/shared/Button';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ToursManagement() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/tours?location=${searchTerm}&page=${page}&limit=10`);
            setTours(response.data.tours);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error('Failed to fetch tours', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, [page, searchTerm]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            try {
                await api.delete(`/admin/tours/${id}`);
                fetchTours();
            } catch (error) {
                alert('Failed to delete tour');
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-outfit text-slate-900">Tours Management</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor all your travel packages in one place.</p>
                </div>
                <Link href="/admin/tours/new">
                    <Button className="px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-600/20">
                        <Plus size={20} className="mr-2" />
                        Create New Tour
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative flex items-center group">
                    <div className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tours by location..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all font-medium text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm text-slate-700 hover:bg-white hover:border-slate-200 transition-all">
                        <Filter size={18} className="text-slate-400" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Tours List */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest min-w-[300px]">Tour Details</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {tours.map((tour) => (
                                        <tr key={tour.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-5">
                                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                                        <img src={tour.images[0]} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{tour.title}</h4>
                                                        <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                            <MapPin size={12} className="text-blue-500" />
                                                            <span>{tour.location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-3 pt-1">
                                                            {tour.featured && (
                                                                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[9px] font-black uppercase">Featured</span>
                                                            )}
                                                            <span className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold">
                                                                <UsersIcon size={10} />
                                                                <span>Max {tour.maxGroupSize}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-2 text-slate-700 text-sm font-bold">
                                                    <Clock size={16} className="text-slate-400" />
                                                    <span>{tour.duration} Days</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-lg font-bold text-slate-900">${tour.price.toLocaleString()}</p>
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Per Person</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${tour.available ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${tour.available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                    <span>{tour.available ? 'Available' : 'Unavailable'}</span>
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link href={`/tours/${tour.id}`} target="_blank">
                                                        <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                                                            <ExternalLink size={18} />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/admin/tours/${tour.id}/edit`}>
                                                        <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                                                            <Edit2 size={18} />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tour.id)}
                                                        className="p-2.5 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-rose-500 transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && tours.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center space-y-4">
                                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                                        <Map size={32} className="text-slate-300" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-slate-900 font-bold">No tours found</p>
                                                        <p className="text-slate-400 text-sm font-medium">Try adjusting your search filters or create a new tour.</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-8 border-t border-slate-50 flex items-center justify-between">
                                <p className="text-sm font-bold text-slate-500">
                                    Showing Page <span className="text-slate-900">{page}</span> of <span className="text-slate-900">{totalPages}</span>
                                </p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
