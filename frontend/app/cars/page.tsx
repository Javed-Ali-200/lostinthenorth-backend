import { carApi } from '@/services/api';
import ServiceCard from '@/components/shared/ServiceCard';
import type { Car } from '@/types';

export const metadata = { title: 'Car Rentals – The Lost in the North' };

async function getCars() {
    try {
        const res = await carApi.getAll();
        return res.data.data;
    } catch {
        return [];
    }
}

export default async function CarsPage() {
    const cars = await getCars();

    return (
        <div className="pt-20">
            <div className="bg-dark text-white section-padding">
                <div className="container-max">
                    <span className="text-gold text-sm uppercase tracking-widest">Transportation</span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Car Rentals
                    </h1>
                    <p className="text-gray-400 max-w-lg">
                        Reliable vehicles for mountain terrain — from 4x4 SUVs to comfortable sedans.
                    </p>
                </div>
            </div>

            <section className="section-padding bg-stone-50">
                <div className="container-max">
                    {cars.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-4xl mb-4">🚙</p>
                            <p className="text-lg">No vehicles available right now. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.map((car: Car) => (
                                <ServiceCard
                                    key={car.id}
                                    id={car.id}
                                    type="car"
                                    image={car.images?.[0] || car.image || ''}
                                    title={car.name}
                                    pricePerDay={car.pricePerDay}
                                    description={`${car.type} · ${car.transmission} · ${car.fuelType}`}
                                    seats={car.seats}
                                    transmission={car.transmission}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
