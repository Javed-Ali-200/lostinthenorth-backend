import {
    findAllTours,
    findTourById,
    createTour,
    updateTour,
    deleteTour,
    TourFilters,
} from './tour.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import { Prisma, Tour } from '@prisma/client';

/**
 * Get all tours (with optional query filters).
 */
export const getAllTours = async (query: TourFilters): Promise<Tour[]> => {
    return findAllTours(query);
};

/**
 * Get a single tour by ID.
 */
export const getTourById = async (id: string): Promise<Tour> => {
    const tour = await findTourById(id);
    if (!tour) throw new AppError('Tour not found.', 404);
    return tour;
};

/**
 * Create a new tour (admin only).
 */
export const createNewTour = async (data: any): Promise<Tour> => {
    // Parse numeric fields
    const tourData: Prisma.TourCreateInput = {
        ...data,
        price: parseFloat(data.price),
        duration: parseInt(data.duration, 10),
        maxGroupSize: data.maxGroupSize ? parseInt(data.maxGroupSize, 10) : 20,
        featured: data.featured === true || data.featured === 'true',
        available: data.available !== false && data.available !== 'false',
        images: Array.isArray(data.images) ? data.images : [],
        included: Array.isArray(data.included) ? data.included : [],
        excluded: Array.isArray(data.excluded) ? data.excluded : [],
    };
    return createTour(tourData);
};

/**
 * Update an existing tour (admin only).
 */
export const updateExistingTour = async (id: string, data: any): Promise<Tour> => {
    // Ensure tour exists
    await getTourById(id);

    const updateData: Prisma.TourUpdateInput = { ...data };
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.duration !== undefined) updateData.duration = parseInt(data.duration, 10);
    if (data.maxGroupSize !== undefined) updateData.maxGroupSize = parseInt(data.maxGroupSize, 10);

    return updateTour(id, updateData);
};

/**
 * Delete a tour (admin only).
 */
export const deleteExistingTour = async (id: string): Promise<Tour> => {
    await getTourById(id);
    return deleteTour(id);
};
