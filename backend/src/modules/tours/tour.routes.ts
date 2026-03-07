import { Router } from 'express';
import {
    listTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
} from './tour.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { createTourSchema, updateTourSchema } from './tour.validation.js';

const router = Router();

// ─── Public Routes ───────────────────────────────────────────────────────────

/** GET /api/tours */
router.get('/', listTours);

/** GET /api/tours/:id */
router.get('/:id', getTour);

// ─── Admin Routes ─────────────────────────────────────────────────────────────

/** POST /api/tours */
router.post('/', authenticate as any, requireAdmin as any, upload.array('images', 5), validate(createTourSchema), createTour);

/** PATCH /api/tours/:id */
router.patch('/:id', authenticate as any, requireAdmin as any, upload.array('images', 5), validate(updateTourSchema), updateTour);

/** DELETE /api/tours/:id */
router.delete('/:id', authenticate as any, requireAdmin as any, deleteTour);

export default router;
