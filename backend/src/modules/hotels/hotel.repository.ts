import prisma from '../../config/prisma.js';
import { Hotel, Prisma } from '@prisma/client';

export interface HotelFilters {
    available?: string | boolean;
    location?: string;
}

export const findAllHotels = async (filters: HotelFilters = {}): Promise<Hotel[]> => {
    const where: Prisma.HotelWhereInput = {};
    if (filters.available !== undefined) {
        where.available = filters.available === 'true' || filters.available === true;
    }
    if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
    }

    return prisma.hotel.findMany({ where, orderBy: { createdAt: 'desc' } });
};

export const findHotelById = async (id: string): Promise<Hotel | null> => {
    return prisma.hotel.findUnique({ where: { id } });
};

export const createHotel = async (data: Prisma.HotelCreateInput): Promise<Hotel> => {
    return prisma.hotel.create({ data });
};

export const updateHotel = async (id: string, data: Prisma.HotelUpdateInput): Promise<Hotel> => {
    return prisma.hotel.update({ where: { id }, data });
};

export const deleteHotel = async (id: string): Promise<Hotel> => {
    return prisma.hotel.delete({ where: { id } });
};
