'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Star } from 'lucide-react';
import { hotelApi } from '@/services/api';
import { formatPrice } from '@/lib/utils';
import type { Hotel } from '@/types';
import toast from 'react-hot-toast';

export default function AdminHotelsPage() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Hotel | null>(null);

    const load = async () => {
        try { setHotels((await hotelApi.getAll()).data.data); }
        catch { toast.error('Failed to load hotels'); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this hotel?')) return;
        try { await hotelApi.delete(id); toast.success('Hotel deleted'); load(); }
        catch { toast.error('Delete failed'); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-dark">Hotels</h1>
                    <p className="text-gray-500 text-sm">{hotels.length} hotels total</p>
                </div>
                <button onClick={() => { setEditing(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal/90 transition">
                    <Plus size={16} /> Add Hotel
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-teal" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-gray-100">
                                <tr>
                                    {['Name', 'Location', 'Price/Night', 'Rating', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {hotels.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-gray-400">No hotels yet.</td></tr>
                                ) : hotels.map((h) => (
                                    <tr key={h.id} className="hover:bg-stone-50">
                                        <td className="px-5 py-4 font-medium text-dark">{h.name}</td>
                                        <td className="px-5 py-4 text-gray-500">{h.location}</td>
                                        <td className="px-5 py-4 text-teal font-medium">{formatPrice(h.pricePerNight)}</td>
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-1 text-gray-500"><Star size={13} className="text-gold fill-gold" />{h.rating.toFixed(1)}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${h.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                {h.available ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => { setEditing(h); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-teal/10 text-teal transition"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(h.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && <HotelFormModal hotel={editing} onClose={() => setShowForm(false)} onSave={load} />}
        </div>
    );
}

function HotelFormModal({ hotel, onClose, onSave }: { hotel: Hotel | null; onClose: () => void; onSave: () => void }) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: hotel?.name || '',
        location: hotel?.location || '',
        description: hotel?.description || '',
        pricePerNight: hotel?.pricePerNight || '',
        address: hotel?.address || '',
        phone: hotel?.phone || '',
        email: hotel?.email || '',
        available: hotel?.available ?? true,
    });
    const [images, setImages] = useState<File[]>([]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

            if (images.length > 0) {
                images.forEach(img => fd.append('images', img));
            }

            if (hotel) await hotelApi.update(hotel.id, fd);
            else await hotelApi.create(fd);
            toast.success(hotel ? 'Hotel updated' : 'Hotel created');
            onSave(); onClose();
        } catch { toast.error('Save failed'); }
        finally { setSaving(false); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold">{hotel ? 'Edit Hotel' : 'New Hotel'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-4">
                    {[{ l: 'Hotel Name', k: 'name' }, { l: 'Location', k: 'location' }, { l: 'Address', k: 'address' }, { l: 'Phone', k: 'phone' }, { l: 'Email', k: 'email' }].map(({ l, k }) => (
                        <div key={k}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
                            <input value={(form as any)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal" />
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night (PKR)</label>
                        <input type="number" value={form.pricePerNight} onChange={e => setForm(p => ({ ...p, pricePerNight: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                            rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Images (Gallery)</label>
                        <input type="file" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files || []))}
                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.checked }))} className="rounded" />
                        <span className="text-sm font-medium text-gray-700">Available</span>
                    </label>
                    <button onClick={handleSave} disabled={saving}
                        className="w-full py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition flex items-center justify-center gap-2 disabled:opacity-60">
                        {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : 'Save Hotel'}
                    </button>
                </div>
            </div>
        </div>
    );
}
