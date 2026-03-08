'use client';

import { useState } from 'react';
import { Users, Fuel, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGallery from '@/components/shared/ImageGallery';
import BookingModal from '@/components/shared/BookingModal';
import { formatPrice } from '@/lib/utils';
import type { Car } from '@/types';

export default function CarDetailClient({ car }: { car: Car }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const allImages = [car.image, ...(car.images || [])].filter(Boolean);

    return (
        <div className="pt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link href="/cars" className="inline-flex items-center gap-2 text-teal text-sm hover:underline mb-6">
                    <ArrowLeft size={16} /> Back to Cars
                </Link>
                <ImageGallery images={allImages} title={car.name} />
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <p className="text-gold text-sm font-medium uppercase tracking-wide mb-1">{car.type}</p>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">{car.name}</h1>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Users, label: 'Seats', value: car.seats },
                                    { icon: Settings, label: 'Transmission', value: car.transmission },
                                    { icon: Fuel, label: 'Fuel', value: car.fuelType },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="bg-stone-50 rounded-xl p-4 text-center">
                                        <Icon size={20} className="text-gold mx-auto mb-2" />
                                        <p className="text-xs text-gray-500">{label}</p>
                                        <p className="font-semibold text-dark mt-0.5">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {car.features?.length > 0 && (
                            <div>
                                <h2 className="font-display text-xl font-bold text-dark mb-4">Features</h2>
                                <div className="flex flex-wrap gap-2">
                                    {car.features.map((f, i) => (
                                        <span key={i} className="bg-teal/5 text-teal border border-teal/20 px-3 py-1.5 rounded-full text-sm">{f}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Booking Card */}
                    <div>
                        <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                            <p className="text-gray-500 text-sm mb-1">Rental price</p>
                            <p className="font-display text-4xl font-bold text-teal mb-1">{formatPrice(car.pricePerDay)}</p>
                            <p className="text-gray-400 text-xs mb-6">per day</p>
                            <button
                                onClick={() => setBookingOpen(true)}
                                disabled={!car.available}
                                className="w-full py-3.5 bg-teal text-white rounded-xl font-semibold hover:bg-teal/90 transition-all disabled:opacity-50"
                            >
                                Rent This Car
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                serviceId={car.id}
                serviceType="CAR"
                serviceTitle={car.name}
                pricePerUnit={car.pricePerDay}
            />
        </div>
    );
}
