import { Router } from 'express';
import { createCustomTrip, listCustomTrips, updateCustomTrip } from './customTrip.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { createCustomTripSchema, updateCustomTripSchema } from './customTrip.validation.js';

const router = Router();

// ─── Public Route ─────────────────────────────────────────────────────────────
/**
 * @route   POST /api/custom-trips
 * @desc    Guest submits a custom trip request
 * @access  Public
 */
router.post('/', upload.single('image'), validate(createCustomTripSchema), createCustomTrip);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
/**
 * @route   GET  /api/admin/custom-trips
 * @route   PATCH /api/admin/custom-trips/:id
 */
router.get('/admin', authenticate as any, requireAdmin as any, listCustomTrips as any);
router.patch('/admin/:id', authenticate as any, requireAdmin as any, upload.single('image'), validate(updateCustomTripSchema), updateCustomTrip as any);

export default router;
