import { Request, Response, NextFunction } from 'express';
import {
    getAllTours,
    getTourById,
    createNewTour,
    updateExistingTour,
    deleteExistingTour,
} from './tour.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { uploadToSupabase, uploadMultipleToSupabase } from '../../utils/storage.js';

/**
 * GET /api/tours
 */
export const listTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tours = await getAllTours(req.query as any);
        return successResponse(res, tours, 'Tours retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/tours/:id
 */
export const getTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tour = await getTourById(req.params.id as string);
        return successResponse(res, tour, 'Tour retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/tours (admin)
 */
export const createTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tourData = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                tourData.image = await uploadToSupabase(files.image[0], 'tours');
            }
            if (files.images) {
                tourData.images = await uploadMultipleToSupabase(files.images, 'tours');
            }
        }

        const tour = await createNewTour(tourData);
        return successResponse(res, tour, 'Tour created successfully', 201);
    } catch (error) { next(error); }
};

/**
 * PATCH /api/tours/:id (admin)
 */
export const updateTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tourData = { ...req.body };
        const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (files) {
            if (files.image && files.image[0]) {
                tourData.image = await uploadToSupabase(files.image[0], 'tours');
            }
            if (files.images) {
                tourData.images = await uploadMultipleToSupabase(files.images, 'tours');
            }
        }

        const tour = await updateExistingTour(req.params.id as string, tourData);
        return successResponse(res, tour, 'Tour updated successfully');
    } catch (error) { next(error); }
};

/**
 * DELETE /api/tours/:id (admin)
 */
export const deleteTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteExistingTour(req.params.id as string);
        return successResponse(res, null, 'Tour deleted successfully');
    } catch (error) {
        next(error);
    }
};
