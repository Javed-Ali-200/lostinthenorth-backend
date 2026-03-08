import { notFound } from 'next/navigation';
import { tourApi } from '@/services/api';
import TourDetailClient from './TourDetailClient';

interface Props { params: Promise<{ id: string }> }

async function getTour(id: string) {
    try {
        const res = await tourApi.getById(id);
        return res.data.data;
    } catch {
        return null;
    }
}

export default async function TourDetailPage({ params }: Props) {
    const { id } = await params;
    const tour = await getTour(id);
    if (!tour) notFound();

    return <TourDetailClient tour={tour} />;
}
