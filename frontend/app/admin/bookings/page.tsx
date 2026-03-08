'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { bookingApi } from '@/services/api';
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils';
import type { Booking } from '@/types';
import toast from 'react-hot-toast';

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try { setBookings((await bookingApi.getAll()).data.data || []); }
        catch { toast.error('Failed to load bookings'); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id: string, status: string) => {
        try { await bookingApi.updateStatus(id, status); toast.success('Status updated'); load(); }
        catch { toast.error('Update failed'); }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-dark">Bookings</h1>
                <p className="text-gray-500 text-sm">{bookings.length} total bookings</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-gray-100">
                                <tr>
                                    {['Booking #', 'Customer', 'Service', 'Dates', 'People', 'Total', 'Status', 'Update'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.length === 0 ? (
                                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">No bookings yet.</td></tr>
                                ) : bookings.map((b) => (
                                    <tr key={b.id} className="hover:bg-stone-50">
                                        <td className="px-5 py-4 font-mono text-xs text-gray-600">{b.bookingNumber}</td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-dark">{b.customerName}</p>
                                            <p className="text-gray-400 text-xs">{b.customerEmail}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="px-2 py-1 bg-teal/10 text-teal rounded-full text-xs font-medium">{b.serviceType}</span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            <p>{formatDate(b.startDate)}</p>
                                            <p>→ {formatDate(b.endDate)}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500">{b.numberOfPeople}</td>
                                        <td className="px-5 py-4 font-medium text-teal">{formatPrice(b.totalPrice)}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select
                                                value={b.status}
                                                onChange={e => updateStatus(b.id, e.target.value)}
                                                className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal"
                                            >
                                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
