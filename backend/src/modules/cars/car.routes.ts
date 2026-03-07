import { Router } from 'express';
import { listCars, getCar, createCar, updateCar, deleteCar } from './car.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { createCarSchema, updateCarSchema } from './car.validation.js';

const router = Router();

router.get('/', listCars);
router.get('/:id', getCar);
router.post(
    '/',
    authenticate as any,
    requireAdmin as any,
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]),
    validate(createCarSchema),
    createCar
);
router.patch(
    '/:id',
    authenticate as any,
    requireAdmin as any,
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]),
    validate(updateCarSchema),
    updateCar
);
router.delete('/:id', authenticate as any, requireAdmin as any, deleteCar);

export default router;
