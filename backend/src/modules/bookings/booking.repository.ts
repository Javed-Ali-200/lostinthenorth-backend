import prisma from '../../config/prisma.js';
import { Booking, Prisma } from '@prisma/client';

export interface BookingFilters {
    status?: string;
    serviceType?: string;
}

/**
 * Create a booking inside a transaction.
 */
export const createBooking = async (
    data: Prisma.BookingUncheckedCreateInput,
    tx: Prisma.TransactionClient = prisma
): Promise<Booking> => {
    return (tx as any).booking.create({ data });
};

/**
 * Count bookings with a bookingNumber starting with a given prefix.
 */
export const countBookingsByPrefix = async (
    prefix: string,
    tx: Prisma.TransactionClient = prisma
): Promise<number> => {
    return (tx as any).booking.count({ where: { bookingNumber: { startsWith: prefix } } });
};

/**
 * Find all bookings (admin).
 */
export const findAllBookings = async (filters: BookingFilters = {}): Promise<Booking[]> => {
    const where: Prisma.BookingWhereInput = {};
    if (filters.status) where.status = filters.status as any;
    if (filters.serviceType) where.serviceType = filters.serviceType as any;

    return prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { tour: true, hotel: true, car: true, offer: true },
    });
};

/**
 * Find a single booking by ID (admin).
 */
export const findBookingById = async (id: string): Promise<Booking | null> => {
    return prisma.booking.findUnique({
        where: { id },
        include: { tour: true, hotel: true, car: true, offer: true, payment: true },
    });
};

/**
 * Update booking status.
 */
export const updateBookingStatus = async (id: string, status: string): Promise<Booking> => {
    return prisma.booking.update({ where: { id }, data: { status: status as any } });
};
