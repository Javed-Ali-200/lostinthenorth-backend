import { Router } from 'express';
import {
    createBooking,
    listBookings,
    getBooking,
    updateBookingStatus,
} from './booking.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createBookingSchema, updateBookingStatusSchema } from './booking.validation.js';

const router = Router();

// ─── Public Route ─────────────────────────────────────────────────────────────
/**
 * @route   POST /api/bookings
 * @desc    Guest creates a booking
 * @access  Public (no auth required)
 */
router.post('/', validate(createBookingSchema), createBooking);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
/**
 * @route   GET /api/admin/bookings
 * @route   GET /api/admin/bookings/:id
 * @route   PATCH /api/admin/bookings/:id/status
 */
router.get('/admin', authenticate as any, requireAdmin as any, listBookings as any);
router.get('/admin/:id', authenticate as any, requireAdmin as any, getBooking as any);
router.patch('/admin/:id/status', authenticate as any, requireAdmin as any, validate(updateBookingStatusSchema), updateBookingStatus as any);

export default router;
