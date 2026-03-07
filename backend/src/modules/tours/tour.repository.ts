import prisma from '../../config/prisma.js';
import { Prisma, Tour } from '@prisma/client';

export interface TourFilters {
    available?: string | boolean;
    featured?: string | boolean;
    location?: string;
    search?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    minDuration?: string | number;
    maxDuration?: string | number;
}

/**
 * Fetch all available tours with optional filters.
 */
export const findAllTours = async (filters: TourFilters = {}): Promise<Tour[]> => {
    const where: Prisma.TourWhereInput = {};

    if (filters.available !== undefined) {
        where.available = filters.available === 'true' || filters.available === true;
    }
    if (filters.featured === 'true' || filters.featured === true) {
        where.featured = true;
    }
    if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters.search) {
        where.OR = [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
        ];
    }

    // Range filters
    if (filters.minPrice || filters.maxPrice) {
        where.price = {};
        if (filters.minPrice) where.price.gte = parseFloat(filters.minPrice.toString());
        if (filters.maxPrice) where.price.lte = parseFloat(filters.maxPrice.toString());
    }

    if (filters.minDuration || filters.maxDuration) {
        where.duration = {};
        if (filters.minDuration) where.duration.gte = parseInt(filters.minDuration.toString(), 10);
        if (filters.maxDuration) where.duration.lte = parseInt(filters.maxDuration.toString(), 10);
    }

    return prisma.tour.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

/**
 * Find a single tour by ID.
 */
export const findTourById = async (id: string): Promise<Tour | null> => {
    return prisma.tour.findUnique({ where: { id } });
};

/**
 * Create a new tour.
 */
export const createTour = async (data: Prisma.TourCreateInput): Promise<Tour> => {
    return prisma.tour.create({ data });
};

/**
 * Update a tour by ID.
 */
export const updateTour = async (id: string, data: Prisma.TourUpdateInput): Promise<Tour> => {
    return prisma.tour.update({ where: { id }, data });
};

/**
 * Delete a tour by ID.
 */
export const deleteTour = async (id: string): Promise<Tour> => {
    return prisma.tour.delete({ where: { id } });
};
