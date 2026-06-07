import { Request, Response, NextFunction } from 'express';
import * as TrekkingService from './trekking.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { uploadToSupabase, uploadMultipleToSupabase } from '../../utils/storage.js';

export const listTrekkings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trekkings = await TrekkingService.getAllTrekkings(req.query);
        return successResponse(res, trekkings, 'Trekkings retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getTrekking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trekking = await TrekkingService.getTrekkingById(req.params.id);
        return successResponse(res, trekking, 'Trekking retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const createTrekking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                data.image = await uploadToSupabase(files.image[0], 'trekkings');
            }
            if (files.images) {
                data.images = await uploadMultipleToSupabase(files.images, 'trekkings');
            }
        }

        const trekking = await TrekkingService.createNewTrekking(data);
        return successResponse(res, trekking, 'Trekking created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const updateTrekking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                data.image = await uploadToSupabase(files.image[0], 'trekkings');
            }
            if (files.images) {
                data.images = await uploadMultipleToSupabase(files.images, 'trekkings');
            }
        }

        const trekking = await TrekkingService.updateTrekkingById(req.params.id, data);
        return successResponse(res, trekking, 'Trekking updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteTrekking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await TrekkingService.deleteTrekkingById(req.params.id);
        return successResponse(res, null, 'Trekking deleted successfully');
    } catch (error) {
        next(error);
    }
};
