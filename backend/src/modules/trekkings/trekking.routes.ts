import { Router } from 'express';
import * as TrekkingController from './trekking.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createTrekkingSchema, updateTrekkingSchema } from './trekking.validation.js';

const router = Router();

// Public routes
router.get('/', TrekkingController.listTrekkings);
router.get('/:id', TrekkingController.getTrekking);

// Admin routes (Protected)
router.post(
    '/',
    authenticate as any,
    requireAdmin as any,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    validate(createTrekkingSchema),
    TrekkingController.createTrekking
);

router.patch(
    '/:id',
    authenticate as any,
    requireAdmin as any,
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    validate(updateTrekkingSchema),
    TrekkingController.updateTrekking
);

router.delete('/:id', authenticate as any, requireAdmin as any, TrekkingController.deleteTrekking);

export default router;
