import prisma from '../../config/prisma.js';
import { CustomTrip, Prisma } from '@prisma/client';

export interface CustomTripFilters {
    status?: string;
}

/**
 * Create a custom trip request.
 */
export const createCustomTrip = async (data: Prisma.CustomTripCreateInput): Promise<CustomTrip> => {
    return prisma.customTrip.create({ data });
};

/**
 * Find all custom trips (admin).
 */
export const findAllCustomTrips = async (filters: CustomTripFilters = {}): Promise<CustomTrip[]> => {
    const where: Prisma.CustomTripWhereInput = {};
    if (filters.status) where.status = filters.status as any;

    return prisma.customTrip.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { hotel: true, car: true },
    });
};

/**
 * Find a custom trip by ID.
 */
export const findCustomTripById = async (id: string): Promise<CustomTrip | null> => {
    return prisma.customTrip.findUnique({
        where: { id },
        include: { hotel: true, car: true },
    });
};

/**
 * Update a custom trip (admin: status, adminNotes, totalPrice).
 */
export const updateCustomTrip = async (id: string, data: Prisma.CustomTripUpdateInput): Promise<CustomTrip> => {
    return prisma.customTrip.update({ where: { id }, data });
};
