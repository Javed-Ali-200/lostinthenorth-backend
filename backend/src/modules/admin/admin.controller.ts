import { Request, Response, NextFunction } from 'express';
import { loginAdmin, getAdminProfile, changeAdminPassword, refreshAdminToken } from './admin.service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

/**
 * POST /api/admin/login
 * Admin login — returns JWT token.
 */
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await loginAdmin(email, password);
        return successResponse(res, result, 'Login successful');
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/admin/refresh
 * Refresh access token using refresh token.
 */
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken: rToken } = req.body;
        if (!rToken) return next(new Error('Refresh token is required'));
        
        const result = await refreshAdminToken(rToken);
        return successResponse(res, result, 'Token refreshed');
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/admin/me
 * Get current admin profile.
 */
export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const admin = await getAdminProfile(req.user!.id);
        return successResponse(res, admin, 'Profile retrieved');
    } catch (error) {
        next(error);
    }
};

/**
 * PATCH /api/admin/change-password
 * Change current admin password.
 */
export const updatePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body;
        await changeAdminPassword(req.user!.id, oldPassword, newPassword);
        return successResponse(res, null, 'Password updated successfully');
    } catch (error) {
        next(error);
    }
};
    