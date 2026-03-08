import { tourApi } from '@/services/api';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Tour } from '@/types';

export const metadata = { title: 'Tours – The Lost in the North' };

async function getTours() {
    try {
        const res = await tourApi.getAll();
        return res.data.data;
    } catch {
        return [];
    }
}

export default async function ToursPage() {
    const tours = await getTours();

    return (
        <div className="pt-20">
            {/* Page header */}
            <div className="bg-dark text-white section-padding">
                <div className="container-max">
                    <span className="text-gold text-sm uppercase tracking-widest">Explore</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Our Tours
                    </h1>
                    <p className="text-gray-400 max-w-lg">
                        Discover handcrafted adventures through the most stunning landscapes of Northern Pakistan.
                    </p>
                </div>
            </div>

            {/* Tours grid */}
            <section className="section-padding bg-stone-50">
                <div className="container-max">
                    {tours.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-4xl mb-4">🏔️</p>
                            <p className="text-lg">No tours available right now. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.map((tour: Tour) => (
                                <ServiceCard
                                    key={tour.id}
                                    id={tour.id}
                                    type="tour"
                                    image={tour.images?.[0] || ''}
                                    title={tour.title}
                                    location={tour.location}
                                    duration={tour.duration}
                                    price={tour.price}
                                    description={tour.description}
                                    featured={tour.featured}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
