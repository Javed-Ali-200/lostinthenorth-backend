import prisma from '../../config/prisma.js';
import { Prisma, Trekking } from '@prisma/client';

export interface TrekkingFilters {
    available?: string | boolean;
    featured?: string | boolean;
    location?: string;
    search?: string;
    difficulty?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    locationTag?: string;
}

/**
 * Fetch all available trekkings with optional filters.
 */
export const findAllTrekkings = async (filters: TrekkingFilters = {}): Promise<Trekking[]> => {
    const where: Prisma.TrekkingWhereInput = {};

    if (filters.available !== undefined) {
        where.available = filters.available === 'true' || filters.available === true;
    }
    if (filters.featured === 'true' || filters.featured === true) {
        where.featured = true;
    }
    if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters.difficulty) {
        where.difficulty = filters.difficulty;
    }
    if (filters.locationTag) {
        where.locationTags = { has: filters.locationTag };
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

    return prisma.trekking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

/**
 * Find a single trekking by ID.
 */
export const findTrekkingById = async (id: string): Promise<Trekking | null> => {
    return prisma.trekking.findUnique({ where: { id } });
};

/**
 * Create a new trekking.
 */
export const createTrekking = async (data: Prisma.TrekkingCreateInput): Promise<Trekking> => {
    return prisma.trekking.create({ data });
};

/**
 * Update a trekking by ID.
 */
export const updateTrekking = async (id: string, data: Prisma.TrekkingUpdateInput): Promise<Trekking> => {
    return prisma.trekking.update({ where: { id }, data });
};

/**
 * Delete a trekking by ID.
 */
export const deleteTrekking = async (id: string): Promise<Trekking> => {
    return prisma.trekking.delete({ where: { id } });
};
