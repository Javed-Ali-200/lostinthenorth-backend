import { hotelApi } from '@/services/api';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Hotel } from '@/types';

export const metadata = { title: 'Hotels – The Lost in the North' };

async function getHotels() {
    try {
        const res = await hotelApi.getAll();
        return res.data.data;
    } catch {
        return [];
    }
}

export default async function HotelsPage() {
    const hotels = await getHotels();

    return (
        <div className="pt-20">
            <div className="bg-dark text-white section-padding">
                <div className="container-max">
                    <span className="text-gold text-sm uppercase tracking-widest">Accommodation</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Our Hotels
                    </h1>
                    <p className="text-gray-400 max-w-lg">
                        Carefully selected hotels and guesthouses in the most beautiful locations of the North.
                    </p>
                </div>
            </div>

            <section className="section-padding bg-stone-50">
                <div className="container-max">
                    {hotels.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-4xl mb-4">🏨</p>
                            <p className="text-lg">No hotels listed yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map((hotel: Hotel) => (
                                <ServiceCard
                                    key={hotel.id}
                                    id={hotel.id}
                                    type="hotel"
                                    image={hotel.images?.[0] || ''}
                                    title={hotel.name}
                                    location={hotel.location}
                                    pricePerNight={hotel.pricePerNight}
                                    description={hotel.description}
                                    rating={hotel.rating}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
