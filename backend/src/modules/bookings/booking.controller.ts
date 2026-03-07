import { Request, Response, NextFunction } from 'express';
import {
    createGuestBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatusById,
} from './booking.service.js';
import { successResponse } from '../../utils/apiResponse.js';

/**
 * POST /api/bookings
 * Guest creates a booking — no authentication required.
 */
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await createGuestBooking(req.body);
        return successResponse(res, booking, 'Booking created successfully', 201);
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/admin/bookings
 * Admin: list all bookings.
 */
export const listBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await getAllBookings(req.query as any);
        return successResponse(res, bookings, 'Bookings retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/admin/bookings/:id
 * Admin: get a single booking by ID.
 */
export const getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await getBookingById(req.params.id as string);
        return successResponse(res, booking, 'Booking retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * PATCH /api/admin/bookings/:id/status
 * Admin: update booking status.
 */
export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await updateBookingStatusById(req.params.id as string, req.body.status);
        return successResponse(res, booking, 'Booking status updated successfully');
    } catch (error) {
        next(error);
    }
};
