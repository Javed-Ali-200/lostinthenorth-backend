import { Request, Response, NextFunction } from 'express';
import {
    submitCustomTrip,
    getAllCustomTrips,
    getCustomTripById,
    updateCustomTripById,
} from './customTrip.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { uploadToSupabase } from '../../utils/storage.js';

/**
 * POST /api/custom-trips
 * Guest submits a custom trip request.
 */
export const createCustomTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tripData = { ...req.body };
        if (req.file) {
            tripData.image = await uploadToSupabase(req.file, 'custom-trips');
        }
        const trip = await submitCustomTrip(tripData);
        return successResponse(res, trip, 'Custom trip request submitted successfully', 201);
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/admin/custom-trips
 * Admin: list all custom trip requests.
 */
export const listCustomTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trips = await getAllCustomTrips(req.query as any);
        return successResponse(res, trips, 'Custom trip requests retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * PATCH /api/admin/custom-trips/:id
 * Admin: update status, notes, or pricing of a custom trip.
 */
export const updateCustomTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tripData = { ...req.body };
        if (req.file) {
            tripData.image = await uploadToSupabase(req.file, 'custom-trips');
        }
        const trip = await updateCustomTripById(req.params.id as string, tripData);
        return successResponse(res, trip, 'Custom trip updated successfully');
    } catch (error) {
        next(error);
    }
};
