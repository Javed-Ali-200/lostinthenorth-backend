import prisma from '../../config/prisma.js';
import { Car, Prisma } from '@prisma/client';

export interface CarFilters {
    available?: string | boolean;
    type?: string;
}

export const findAllCars = async (filters: CarFilters = {}): Promise<Car[]> => {
    const where: Prisma.CarWhereInput = {};
    if (filters.available !== undefined) {
        where.available = filters.available === 'true' || filters.available === true;
    }
    if (filters.type) {
        where.type = { contains: filters.type, mode: 'insensitive' };
    }

    return prisma.car.findMany({ where, orderBy: { createdAt: 'desc' } });
};

export const findCarById = async (id: string): Promise<Car | null> => {
    return prisma.car.findUnique({ where: { id } });
};

export const createCar = async (data: Prisma.CarCreateInput): Promise<Car> => {
    return prisma.car.create({ data });
};

export const updateCar = async (id: string, data: Prisma.CarUpdateInput): Promise<Car> => {
    return prisma.car.update({ where: { id }, data });
};

export const deleteCar = async (id: string): Promise<Car> => {
    return prisma.car.delete({ where: { id } });
};
