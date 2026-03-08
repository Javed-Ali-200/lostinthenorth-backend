'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ServiceCardProps {
    id: string;
    type: 'tour' | 'hotel' | 'car';
    image: string;
    title: string;
    location?: string;
    duration?: number; // days (tours)
    pricePerNight?: number; // hotels
    pricePerDay?: number; // cars
    price?: number; // tours
    description: string;
    rating?: number;
    featured?: boolean;
    seats?: number;
    transmission?: string;
}

export default function ServiceCard({
    id, type, image, title, location, duration, price, pricePerNight, pricePerDay,
    description, rating, featured, seats, transmission,
}: ServiceCardProps) {
    const detailHref = `/${type}s/${id}`;

    const displayPrice =
        type === 'tour' ? price :
            type === 'hotel' ? pricePerNight :
                pricePerDay;

    const priceLabel =
        type === 'tour' ? 'per person' :
            type === 'hotel' ? 'per night' :
                'per day';

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={image || '/placeholder-travel.jpg'}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={image?.startsWith('http')}
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Featured badge */}
                {featured && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                    </span>
                )}

                {/* Price badge on image */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 text-right">
                    <p className="text-teal font-bold text-base leading-none">
                        {formatPrice(displayPrice || 0)}
                    </p>
                    <p className="text-gray-500 text-xs">{priceLabel}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-display font-bold text-lg text-dark leading-tight mb-1 group-hover:text-teal transition-colors line-clamp-1">
                    {title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                    {location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-gold" />
                            {location}
                        </span>
                    )}
                    {duration && (
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gold" />
                            {duration} Days
                        </span>
                    )}
                    {seats && (
                        <span className="flex items-center gap-1">
                            <Users size={12} className="text-gold" />
                            {seats} Seats
                        </span>
                    )}
                    {rating !== undefined && rating > 0 && (
                        <span className="flex items-center gap-1">
                            <Star size={12} className="text-gold fill-gold" />
                            {rating.toFixed(1)}
                        </span>
                    )}
                    {transmission && (
                        <span className="capitalize">{transmission}</span>
                    )}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={detailHref}
                        className="flex-1 text-center py-2.5 px-3 rounded-xl border-2 border-teal text-teal text-sm font-semibold hover:bg-teal hover:text-white transition-all duration-200"
                    >
                        View Details
                    </Link>
                    <Link
                        href={`${detailHref}?book=true`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal/90 transition-all duration-200 group/btn"
                    >
                        Book Now
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
