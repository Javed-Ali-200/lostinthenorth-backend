import {
    findAllHotels,
    findHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
    HotelFilters,
} from './hotel.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import { Hotel, Prisma } from '@prisma/client';

export const getAllHotels = async (query: HotelFilters): Promise<Hotel[]> => findAllHotels(query);

export const getHotelById = async (id: string): Promise<Hotel> => {
    const hotel = await findHotelById(id);
    if (!hotel) throw new AppError('Hotel not found.', 404);
    return hotel;
};

export const createNewHotel = async (data: any): Promise<Hotel> => {
    const hotelData: Prisma.HotelCreateInput = {
        ...data,
        pricePerNight: parseFloat(data.pricePerNight),
        rating: data.rating ? parseFloat(data.rating) : 0,
        available: data.available !== false && data.available !== 'false',
        images: Array.isArray(data.images) ? data.images : [],
        amenities: Array.isArray(data.amenities) ? data.amenities : [],
        roomTypes: Array.isArray(data.roomTypes) ? data.roomTypes : [],
    };
    return createHotel(hotelData);
};

export const updateExistingHotel = async (id: string, data: any): Promise<Hotel> => {
    await getHotelById(id);
    const updateData: Prisma.HotelUpdateInput = { ...data };
    if (data.pricePerNight !== undefined) updateData.pricePerNight = parseFloat(data.pricePerNight);
    if (data.rating !== undefined) updateData.rating = parseFloat(data.rating);
    return updateHotel(id, updateData);
};

export const deleteExistingHotel = async (id: string): Promise<Hotel> => {
    await getHotelById(id);
    return deleteHotel(id);
};
