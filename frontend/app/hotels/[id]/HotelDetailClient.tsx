'use client';

import { useState } from 'react';
import { MapPin, Star, Phone, Mail, ArrowLeft, Wifi } from 'lucide-react';
import Link from 'next/link';
import ImageGallery from '@/components/shared/ImageGallery';
import BookingModal from '@/components/shared/BookingModal';
import { formatPrice } from '@/lib/utils';
import type { Hotel } from '@/types';

export default function HotelDetailClient({ hotel }: { hotel: Hotel }) {
    const [bookingOpen, setBookingOpen] = useState(false);

    return (
        <div className="pt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link href="/hotels" className="inline-flex items-center gap-2 text-teal text-sm hover:underline mb-6">
                    <ArrowLeft size={16} /> Back to Hotels
                </Link>
                <ImageGallery images={hotel.images} title={hotel.name} />
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-3">{hotel.name}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                <span className="flex items-center gap-1.5"><MapPin size={15} className="text-gold" />{hotel.location}</span>
                                {hotel.rating > 0 && (
                                    <span className="flex items-center gap-1.5"><Star size={15} className="text-gold fill-gold" />{hotel.rating.toFixed(1)} Rating</span>
                                )}
                            </div>
                            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                        </div>

                        {hotel.amenities?.length > 0 && (
                            <div>
                                <h2 className="font-display text-xl font-bold text-dark mb-4">Amenities</h2>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.map((a, i) => (
                                        <span key={i} className="flex items-center gap-1.5 bg-teal/5 text-teal border border-teal/20 px-3 py-1.5 rounded-full text-sm">
                                            <Wifi size={13} />{a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {hotel.roomTypes?.length > 0 && (
                            <div>
                                <h2 className="font-display text-xl font-bold text-dark mb-4">Room Types</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {hotel.roomTypes.map((r, i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl p-4 text-center text-sm font-medium text-dark">
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(hotel.address || hotel.phone || hotel.email) && (
                            <div className="bg-stone-50 rounded-2xl p-5 space-y-3">
                                <h3 className="font-semibold text-dark">Contact</h3>
                                {hotel.address && <p className="text-sm text-gray-500 flex items-center gap-2"><MapPin size={14} />{hotel.address}</p>}
                                {hotel.phone && <p className="text-sm text-gray-500 flex items-center gap-2"><Phone size={14} />{hotel.phone}</p>}
                                {hotel.email && <p className="text-sm text-gray-500 flex items-center gap-2"><Mail size={14} />{hotel.email}</p>}
                            </div>
                        )}
                    </div>

                    {/* Booking Card */}
                    <div>
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                            <p className="text-gray-500 text-sm mb-1">Starting from</p>
                            <p className="font-display text-4xl font-bold text-teal mb-1">{formatPrice(hotel.pricePerNight)}</p>
                            <p className="text-gray-400 text-xs mb-6">per night</p>
                            <button
                                onClick={() => setBookingOpen(true)}
                                disabled={!hotel.available}
                                className="w-full py-3.5 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition-all disabled:opacity-50"
                            >
                                Reserve Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                serviceId={hotel.id}
                serviceType="HOTEL"
                serviceTitle={hotel.name}
                pricePerUnit={hotel.pricePerNight}
            />
        </div>
    );
}
