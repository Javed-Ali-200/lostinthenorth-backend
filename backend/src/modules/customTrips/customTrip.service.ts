import {
    createCustomTrip,
    findAllCustomTrips,
    findCustomTripById,
    updateCustomTrip,
    CustomTripFilters,
} from './customTrip.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import { CustomTrip, Prisma } from '@prisma/client';

/**
 * Submit a new custom trip request (guest).
 */
export const submitCustomTrip = async (data: any): Promise<CustomTrip> => {
    const tripData: Prisma.CustomTripCreateInput = {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        destination: data.destination,
        days: parseInt(data.days, 10),
        activities: data.activities,
        numberOfPeople: data.numberOfPeople ? parseInt(data.numberOfPeople, 10) : 1,
        startDate: data.startDate ? new Date(data.startDate) : null,
        totalPrice: data.totalPrice ? parseFloat(data.totalPrice) : 0,
        posterImage: data.posterImage || null,
        // Connect relationships if IDs are provided
        hotel: data.hotelId ? { connect: { id: data.hotelId } } : undefined,
        car: data.carId ? { connect: { id: data.carId } } : undefined,
    };
    return createCustomTrip(tripData);
};

/**
 * Get all custom trip requests (admin).
 */
export const getAllCustomTrips = async (query: CustomTripFilters): Promise<CustomTrip[]> => findAllCustomTrips(query);

/**
 * Get a single custom trip by ID (admin).
 */
export const getCustomTripById = async (id: string): Promise<CustomTrip> => {
    const trip = await findCustomTripById(id);
    if (!trip) throw new AppError('Custom trip request not found.', 404);
    return trip;
};

/**
 * Update a custom trip's status and/or admin notes (admin).
 */
export const updateCustomTripById = async (id: string, data: any): Promise<CustomTrip> => {
    await getCustomTripById(id);

    const updateData: Prisma.CustomTripUpdateInput = {};
    if (data.status) updateData.status = data.status;
    if (data.adminNotes !== undefined) updateData.adminNotes = data.adminNotes;
    if (data.totalPrice !== undefined) updateData.totalPrice = parseFloat(data.totalPrice);
    if (data.posterImage !== undefined) updateData.posterImage = data.posterImage;

    if (data.hotelId !== undefined) {
        updateData.hotel = data.hotelId ? { connect: { id: data.hotelId } } : { disconnect: true };
    }
    if (data.carId !== undefined) {
        updateData.car = data.carId ? { connect: { id: data.carId } } : { disconnect: true };
    }

    return updateCustomTrip(id, updateData);
};
