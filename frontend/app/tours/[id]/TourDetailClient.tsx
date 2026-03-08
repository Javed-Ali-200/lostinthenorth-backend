'use client';

import { useState } from 'react';
import { MapPin, Clock, Users, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageGallery from '@/components/shared/ImageGallery';
import BookingModal from '@/components/shared/BookingModal';
import { formatPrice } from '@/lib/utils';
import type { Tour, ItineraryDay } from '@/types';

interface Props { tour: Tour }

export default function TourDetailClient({ tour }: Props) {
    const [bookingOpen, setBookingOpen] = useState(false);

    let itinerary: ItineraryDay[] = [];
    if (tour.itinerary) {
        try { itinerary = JSON.parse(tour.itinerary); } catch { /* ignore */ }
    }

    return (
        <div className="pt-20">
            {/* Gallery Hero */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link href="/tours" className="inline-flex items-center gap-2 text-teal text-sm hover:underline mb-6">
                    <ArrowLeft size={16} /> Back to Tours
                </Link>
                <ImageGallery images={tour.images} title={tour.title} />
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left – Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                {tour.featured && (
                                    <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                                )}
                                {!tour.available && (
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">Unavailable</span>
                                )}
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-3">
                                {tour.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1.5"><MapPin size={15} className="text-gold" />{tour.location}</span>
                                <span className="flex items-center gap-1.5"><Clock size={15} className="text-gold" />{tour.duration} Days</span>
                                <span className="flex items-center gap-1.5"><Users size={15} className="text-gold" />Max {tour.maxGroupSize} people</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-display text-xl font-bold text-dark mb-3">About This Tour</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.description}</p>
                        </div>

                        {/* Included / Excluded */}
                        {(tour.included?.length > 0 || tour.excluded?.length > 0) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {tour.included?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-dark mb-3">What&apos;s Included</h3>
                                        <ul className="space-y-2">
                                            {tour.included.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {tour.excluded?.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-dark mb-3">Not Included</h3>
                                        <ul className="space-y-2">
                                            {tour.excluded.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Itinerary */}
                        {itinerary.length > 0 && (
                            <div>
                                <h2 className="font-display text-xl font-bold text-dark mb-4">Itinerary</h2>
                                <div className="space-y-4">
                                    {itinerary.map((day) => (
                                        <div key={day.day} className="flex gap-4 p-4 bg-stone-50 rounded-xl border border-gray-100">
                                            <div className="shrink-0 w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
                                                {day.day}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-dark">{day.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{day.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right – Booking Card */}
                    <div>
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                            <p className="text-gray-500 text-sm mb-1">Price per person</p>
                            <p className="font-display text-4xl font-bold text-teal mb-1">
                                {formatPrice(tour.price)}
                            </p>
                            <p className="text-gray-400 text-xs mb-6">{tour.duration} days trip</p>

                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-medium">{tour.duration} Days</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Group Size</span>
                                    <span className="font-medium">Max {tour.maxGroupSize}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Location</span>
                                    <span className="font-medium">{tour.location}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">Availability</span>
                                    <span className={`font-medium ${tour.available ? 'text-green-600' : 'text-red-500'}`}>
                                        {tour.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setBookingOpen(true)}
                                disabled={!tour.available}
                                className="w-full py-3.5 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Book This Tour
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                Free cancellation · Instant confirmation
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                serviceId={tour.id}
                serviceType="TOUR"
                serviceTitle={tour.title}
                pricePerUnit={tour.price}
            />
        </div>
    );
}
