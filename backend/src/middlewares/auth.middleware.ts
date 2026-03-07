import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/apiResponse.js';
import prisma from '../config/prisma.js';

// Extend Express Request type to include user
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
}

/**
 * Middleware: Verify JWT token and attach user to request.
 */
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(res, 'Authentication token is required', 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        // Fetch fresh user from DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            return errorResponse(res, 'User not found. Token may be invalid.', 401);
        }

        req.user = user;
        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, 'Invalid token', 401);
        }
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, 'Token has expired. Please login again.', 401);
        }
        next(error);
    }
};

/**
 * Middleware: Ensure authenticated user is an ADMIN.
 */
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return errorResponse(res, 'Access denied. Admin privileges required.', 403);
    }
    next();
};
