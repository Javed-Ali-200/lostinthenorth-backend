import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800',
        MODIFIED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}
