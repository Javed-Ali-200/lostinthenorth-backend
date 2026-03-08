'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Check } from 'lucide-react';
import { tourApi } from '@/services/api';
import { formatPrice } from '@/lib/utils';
import type { Tour } from '@/types';
import toast from 'react-hot-toast';

export default function AdminToursPage() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Tour | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const load = async () => {
        try { setTours((await tourApi.getAll()).data.data); }
        catch { toast.error('Failed to load tours'); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this tour?')) return;
        setDeleting(id);
        try { await tourApi.delete(id); toast.success('Tour deleted'); load(); }
        catch { toast.error('Delete failed'); }
        finally { setDeleting(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold text-dark">Tours</h1>
                    <p className="text-gray-500 text-sm">{tours.length} tours total</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal/90 transition"
                >
                    <Plus size={16} /> Add Tour
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
                                    {['Title', 'Location', 'Duration', 'Price', 'Featured', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tours.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-12 text-gray-400">No tours yet. Add one above.</td></tr>
                                ) : tours.map((tour) => (
                                    <tr key={tour.id} className="hover:bg-stone-50 transition">
                                        <td className="px-5 py-4 font-medium text-dark">{tour.title}</td>
                                        <td className="px-5 py-4 text-gray-500">{tour.location}</td>
                                        <td className="px-5 py-4 text-gray-500">{tour.duration}d</td>
                                        <td className="px-5 py-4 text-teal font-medium">{formatPrice(tour.price)}</td>
                                        <td className="px-5 py-4">
                                            {tour.featured ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-gray-300" />}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tour.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                {tour.available ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => { setEditing(tour); setShowForm(true); }}
                                                    className="p-1.5 rounded-lg hover:bg-teal/10 text-teal transition"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tour.id)}
                                                    disabled={deleting === tour.id}
                                                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition disabled:opacity-40"
                                                >
                                                    {deleting === tour.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && <TourFormModal tour={editing} onClose={() => setShowForm(false)} onSave={load} />}
        </div>
    );
}

function TourFormModal({ tour, onClose, onSave }: { tour: Tour | null; onClose: () => void; onSave: () => void }) {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: tour?.title || '',
        description: tour?.description || '',
        price: tour?.price || '',
        duration: tour?.duration || '',
        location: tour?.location || '',
        maxGroupSize: tour?.maxGroupSize || 20,
        featured: tour?.featured || false,
        available: tour?.available ?? true,
        included: tour?.included?.join('\n') || '',
        excluded: tour?.excluded?.join('\n') || '',
        itinerary: tour?.itinerary || '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

            if (image) fd.append('image', image);
            if (images.length > 0) {
                images.forEach(img => fd.append('images', img));
            }

            if (tour) await tourApi.update(tour.id, fd);
            else await tourApi.create(fd);
            toast.success(tour ? 'Tour updated' : 'Tour created');
            onSave(); onClose();
        } catch { toast.error('Save failed'); }
        finally { setSaving(false); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="font-display text-xl font-bold">{tour ? 'Edit Tour' : 'New Tour'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { label: 'Title', key: 'title' },
                        { label: 'Location', key: 'location' },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal" />
                        </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR)</label>
                            <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                            <input type="number" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                            rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Included (one per line)</label>
                            <textarea value={form.included} onChange={e => setForm(p => ({ ...p, included: e.target.value }))}
                                rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Excluded (one per line)</label>
                            <textarea value={form.excluded} onChange={e => setForm(p => ({ ...p, excluded: e.target.value }))}
                                rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Poster Image</label>
                            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)}
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                            <input type="file" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files || []))}
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="rounded" />
                            <span className="text-sm font-medium text-gray-700">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.checked }))} className="rounded" />
                            <span className="text-sm font-medium text-gray-700">Available</span>
                        </label>
                    </div>
                    <button onClick={handleSave} disabled={saving}
                        className="w-full py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition flex items-center justify-center gap-2 disabled:opacity-60">
                        {saving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : 'Save Tour'}
                    </button>
                </div>
            </div>
        </div>
    );
}
