import { Response } from 'express';

/**
 * Send a standardized success response.
 */
export const successResponse = (
    res: Response,
    data: any = null,
    message: string = 'Success',
    statusCode: number = 200
): Response => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Send a standardized error response.
 */
export const errorResponse = (
    res: Response,
    message: string = 'Error',
    statusCode: number = 500,
    errors: any = null
): Response => {
    const body: any = { success: false, message };
    if (errors) body.errors = errors;
    return res.status(statusCode).json(body);
};
