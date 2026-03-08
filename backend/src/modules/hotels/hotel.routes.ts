import { Router } from 'express';
import { listHotels, getHotel, createHotel, updateHotel, deleteHotel } from './hotel.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { createHotelSchema, updateHotelSchema } from './hotel.validation.js';

const router = Router();

router.get('/', listHotels);
router.get('/:id', getHotel);
router.post('/', authenticate as any, requireAdmin as any, upload.fields([{ name: 'images', maxCount: 5 }]), validate(createHotelSchema), createHotel);
router.patch('/:id', authenticate as any, requireAdmin as any, upload.fields([{ name: 'images', maxCount: 5 }]), validate(updateHotelSchema), updateHotel);
router.delete('/:id', authenticate as any, requireAdmin as any, deleteHotel);

export default router;
