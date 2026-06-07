import { Router } from 'express';
import { adminLogin, getMe, updatePassword, refreshToken } from './admin.controller.js';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';

const router = Router();

/**
 * @route   POST /api/admin/login
 * @desc    Admin login — returns JWT token
 * @access  Public
 */
router.post(
    '/login',
    validate({
        body: {
            email: { required: true, type: 'email' },
            password: { required: true, type: 'string', minLength: 6 },
        },
    }),
    adminLogin as any,
);

/**
 * @route   POST /api/admin/refresh
 * @desc    Refresh access token
 * @access  Public (requires valid refresh token in body)
 */
router.post(
    '/refresh',
    validate({
        body: {
            refreshToken: { required: true, type: 'string' },
        },
    }),
    refreshToken as any,
);

/**
 * @route   GET /api/admin/me
 * @desc    Get current admin profile
 * @access  Private (Admin)
 */
router.get('/me', authenticate as any, requireAdmin as any, getMe as any);

/**
 * @route   PATCH /api/admin/change-password
 * @desc    Change admin password
 * @access  Private (Admin)
 */
router.patch(
    '/change-password',
    authenticate as any,
    requireAdmin as any,
    validate({
        body: {
            oldPassword: { required: true, type: 'string' },
            newPassword: { required: true, type: 'string', minLength: 6 },
        },
    }),
    updatePassword as any,
);

export default router;
