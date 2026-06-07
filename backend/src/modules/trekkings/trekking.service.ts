import { Prisma, Trekking } from '@prisma/client';
import * as TrekkingRepository from './trekking.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';

export const getAllTrekkings = async (filters: any): Promise<Trekking[]> => {
    return TrekkingRepository.findAllTrekkings(filters);
};

export const getTrekkingById = async (id: string): Promise<Trekking> => {
    const trekking = await TrekkingRepository.findTrekkingById(id);
    if (!trekking) throw new AppError('Trekking expedition not found.', 404);
    return trekking;
};

export const createNewTrekking = async (data: any): Promise<Trekking> => {
    // Process tags and arrays if sent as strings (from multipart form)
    if (typeof data.locationTags === 'string') data.locationTags = data.locationTags.split(',').map((t: string) => t.trim());
    if (typeof data.included === 'string') data.included = data.included.split(',').map((t: string) => t.trim());
    if (typeof data.excluded === 'string') data.excluded = data.excluded.split(',').map((t: string) => t.trim());
    if (typeof data.highlights === 'string') data.highlights = data.highlights.split(',').map((t: string) => t.trim());
    
    // Convert numeric fields
    if (data.price) data.price = parseFloat(data.price);
    if (data.duration) data.duration = parseInt(data.duration, 10);
    if (data.maxGroupSize) data.maxGroupSize = parseInt(data.maxGroupSize, 10);
    if (data.rating) data.rating = parseFloat(data.rating);
    if (data.reviewsCount) data.reviewsCount = parseInt(data.reviewsCount, 10);

    // Convert boolean fields
    data.featured = data.featured === true || data.featured === 'true';
    data.available = data.available !== false && data.available !== 'false';

    return TrekkingRepository.createTrekking(data);
};

export const updateTrekkingById = async (id: string, data: any): Promise<Trekking> => {
    await getTrekkingById(id); // Check existence

    // Process tags and arrays
    if (typeof data.locationTags === 'string') data.locationTags = data.locationTags.split(',').map((t: string) => t.trim());
    if (typeof data.included === 'string') data.included = data.included.split(',').map((t: string) => t.trim());
    if (typeof data.excluded === 'string') data.excluded = data.excluded.split(',').map((t: string) => t.trim());
    if (typeof data.highlights === 'string') data.highlights = data.highlights.split(',').map((t: string) => t.trim());

    // Convert numeric fields
    if (data.price) data.price = parseFloat(data.price);
    if (data.duration) data.duration = parseInt(data.duration, 10);
    if (data.maxGroupSize) data.maxGroupSize = parseInt(data.maxGroupSize, 10);
    if (data.rating) data.rating = parseFloat(data.rating);
    if (data.reviewsCount) data.reviewsCount = parseInt(data.reviewsCount, 10);

    // Convert boolean fields
    if (data.featured !== undefined) data.featured = data.featured === true || data.featured === 'true';
    if (data.available !== undefined) data.available = data.available !== false && data.available !== 'false';

    return TrekkingRepository.updateTrekking(id, data);
};

export const deleteTrekkingById = async (id: string): Promise<Trekking> => {
    await getTrekkingById(id);
    return TrekkingRepository.deleteTrekking(id);
};
