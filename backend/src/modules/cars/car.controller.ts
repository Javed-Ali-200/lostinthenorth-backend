import { Request, Response, NextFunction } from 'express';
import { getAllCars, getCarById, createNewCar, updateExistingCar, deleteExistingCar } from './car.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { uploadToSupabase, uploadMultipleToSupabase } from '../../utils/storage.js';

export const listCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await getAllCars(req.query as any);
        return successResponse(res, cars, 'Cars retrieved successfully');
    } catch (error) { next(error); }
};

export const getCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await getCarById(req.params.id as string);
        return successResponse(res, car, 'Car retrieved successfully');
    } catch (error) { next(error); }
};

export const createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carData = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                carData.image = await uploadToSupabase(files.image[0], 'cars');
            }
            if (files.images) {
                carData.images = await uploadMultipleToSupabase(files.images, 'cars');
            }
        }

        const car = await createNewCar(carData);
        return successResponse(res, car, 'Car created successfully', 201);
    } catch (error) { next(error); }
};

export const updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carData = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                carData.image = await uploadToSupabase(files.image[0], 'cars');
            }
            if (files.images) {
                carData.images = await uploadMultipleToSupabase(files.images, 'cars');
            }
        }

        const car = await updateExistingCar(req.params.id as string, carData);
        return successResponse(res, car, 'Car updated successfully');
    } catch (error) { next(error); }
};

export const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteExistingCar(req.params.id as string);
        return successResponse(res, null, 'Car deleted successfully');
    } catch (error) { next(error); }
};
