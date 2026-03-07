import { Request, Response, NextFunction } from 'express';
import {
    getAllHotels,
    getHotelById,
    createNewHotel,
    updateExistingHotel,
    deleteExistingHotel,
} from './hotel.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { uploadMultipleToSupabase } from '../../utils/storage.js';

export const listHotels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotels = await getAllHotels(req.query as any);
        return successResponse(res, hotels, 'Hotels retrieved successfully');
    } catch (error) { next(error); }
};

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotel = await getHotelById(req.params.id as string);
        return successResponse(res, hotel, 'Hotel retrieved successfully');
    } catch (error) { next(error); }
};

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelData = { ...req.body };
        if (req.files) {
            const files = req.files as Express.Multer.File[];
            hotelData.images = await uploadMultipleToSupabase(files, 'hotels');
        }
        const hotel = await createNewHotel(hotelData);
        return successResponse(res, hotel, 'Hotel created successfully', 201);
    } catch (error) { next(error); }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hotelData = { ...req.body };
        if (req.files) {
            const files = req.files as Express.Multer.File[];
            hotelData.images = await uploadMultipleToSupabase(files, 'hotels');
        }
        const hotel = await updateExistingHotel(req.params.id as string, hotelData);
        return successResponse(res, hotel, 'Hotel updated successfully');
    } catch (error) { next(error); }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteExistingHotel(req.params.id as string);
        return successResponse(res, null, 'Hotel deleted successfully');
    } catch (error) { next(error); }
};
