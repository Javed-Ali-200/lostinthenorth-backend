import Link from 'next/link';
import { tourApi, hotelApi, carApi } from '@/services/api';
import type { Tour, Hotel, Car } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CustomTripBanner from '@/components/home/CustomTripBanner';

async function getData() {
  try {
    const [toursRes, hotelsRes, carsRes] = await Promise.allSettled([
      tourApi.getAll({ featured: 'true' }),
      hotelApi.getAll({ available: 'true' }),
      carApi.getAll({ available: 'true' }),
    ]);
    const tours = toursRes.status === 'fulfilled' ? toursRes.value.data.data : [];
    const hotels = hotelsRes.status === 'fulfilled' ? hotelsRes.value.data.data : [];
    const cars = carsRes.status === 'fulfilled' ? carsRes.value.data.data : [];
    return { tours: tours.slice(0, 6), hotels: hotels.slice(0, 6), cars: cars.slice(0, 6) };
  } catch {
    return { tours: [], hotels: [], cars: [] };
  }
}

export default async function HomePage() {
  const { tours, hotels, cars } = await getData();

  return (
    <>
      <HeroSection />
      <ServicesSection tours={tours} hotels={hotels} cars={cars} />
      <WhyChooseUs />
      <CustomTripBanner />
      <Testimonials />
    </>
  );
}
