import { notFound } from 'next/navigation';
import { hotelApi } from '@/services/api';
import HotelDetailClient from './HotelDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function HotelDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const res = await hotelApi.getById(id);
        return <HotelDetailClient hotel={res.data.data} />;
    } catch {
        notFound();
    }
}
