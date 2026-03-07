import { findAllCars, findCarById, createCar, updateCar, deleteCar, CarFilters } from './car.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import { Car, Prisma } from '@prisma/client';

export const getAllCars = async (query: CarFilters): Promise<Car[]> => findAllCars(query);

export const getCarById = async (id: string): Promise<Car> => {
    const car = await findCarById(id);
    if (!car) throw new AppError('Car not found.', 404);
    return car;
};

export const createNewCar = async (data: any): Promise<Car> => {
    const carData: Prisma.CarCreateInput = {
        ...data,
        pricePerDay: parseFloat(data.pricePerDay),
        seats: parseInt(data.seats, 10),
        available: data.available !== false && data.available !== 'false',
        images: Array.isArray(data.images) ? data.images : [],
        features: Array.isArray(data.features) ? data.features : [],
    };
    return createCar(carData);
};

export const updateExistingCar = async (id: string, data: any): Promise<Car> => {
    await getCarById(id);
    const updateData: Prisma.CarUpdateInput = { ...data };
    if (data.pricePerDay !== undefined) updateData.pricePerDay = parseFloat(data.pricePerDay);
    if (data.seats !== undefined) updateData.seats = parseInt(data.seats, 10);
    return updateCar(id, updateData);
};

export const deleteExistingCar = async (id: string): Promise<Car> => {
    await getCarById(id);
    return deleteCar(id);
};
