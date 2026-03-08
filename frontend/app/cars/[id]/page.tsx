import { notFound } from 'next/navigation';
import { carApi } from '@/services/api';
import CarDetailClient from './CarDetailClient';

interface Props { params: Promise<{ id: string }> }

export default async function CarDetailPage({ params }: Props) {
    const { id } = await params;
    try {
        const res = await carApi.getById(id);
        return <CarDetailClient car={res.data.data} />;
    } catch {
        notFound();
    }
}
