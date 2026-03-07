export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${err.name}: ${err.message}`);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Custom AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Prisma known errors
    if (err.code) {
        switch (err.code) {
            case 'P2002':
                return res.status(409).json({
                    success: false,
                    message: `A record with this ${err.meta?.target?.join(', ')} already exists.`,
                });
            case 'P2025':
                return res.status(404).json({
                    success: false,
                    message: err.meta?.cause || 'Record not found.',
                });
            case 'P2003':
                return res.status(400).json({
                    success: false,
                    message: 'Invalid reference — related record does not exist.',
                });
            default:
                break;
        }
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired.' });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // Default 500
    return res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
    });
};
