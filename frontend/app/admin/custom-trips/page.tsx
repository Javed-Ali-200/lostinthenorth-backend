'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { customTripApi } from '@/services/api';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { CustomTrip } from '@/types';
import toast from 'react-hot-toast';

const STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'MODIFIED'];

export default function AdminCustomTripsPage() {
    const [trips, setTrips] = useState<CustomTrip[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try { setTrips((await customTripApi.getAll()).data.data || []); }
        catch { toast.error('Failed to load custom trips'); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id: string, status: string) => {
        try { await customTripApi.update(id, { status: status as any }); toast.success('Status updated'); load(); }
        catch { toast.error('Update failed'); }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-dark">Custom Trip Requests</h1>
                <p className="text-gray-500 text-sm">{trips.length} total requests</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-gray-100">
                                <tr>
                                    {['Customer', 'Destination', 'Days', 'People', 'Start Date', 'Activities', 'Status', 'Update'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {trips.length === 0 ? (
                                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">No custom trip requests yet.</td></tr>
                                ) : trips.map((t) => (
                                    <tr key={t.id} className="hover:bg-stone-50">
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-dark">{t.customerName}</p>
                                            <p className="text-gray-400 text-xs">{t.customerEmail}</p>
                                            <p className="text-gray-400 text-xs">{t.customerPhone}</p>
                                        </td>
                                        <td className="px-5 py-4 font-medium text-teal">{t.destination}</td>
                                        <td className="px-5 py-4 text-gray-500">{t.days}d</td>
                                        <td className="px-5 py-4 text-gray-500">{t.numberOfPeople}</td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            {t.startDate ? formatDate(t.startDate) : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 max-w-xs">
                                            <p className="line-clamp-2 text-xs">{t.activities}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(t.status)}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select value={t.status} onChange={e => updateStatus(t.id, e.target.value)}
                                                className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal">
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
