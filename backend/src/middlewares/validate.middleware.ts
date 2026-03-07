import { Request, Response, NextFunction } from 'express';

interface ValidationRule {
    required?: boolean;
    type?: 'string' | 'number' | 'email';
    enum?: any[];
    minLength?: number;
}

interface ValidationSchema {
    body?: Record<string, ValidationRule>;
    params?: Record<string, ValidationRule>;
    query?: Record<string, ValidationRule>;
}

export const validate = (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
    const errors: { field: string; message: string }[] = [];

    for (const [source, fields] of Object.entries(schema)) {
        const data = (req as any)[source] || {};

        for (const [field, rules] of Object.entries(fields as Record<string, ValidationRule>)) {
            const value = data[field];
            const isEmpty = value === undefined || value === null || value === '';

            if (rules.required && isEmpty) {
                errors.push({ field: `${source}.${field}`, message: `${field} is required` });
                continue;
            }

            if (isEmpty) continue;

            if (rules.type === 'string' && typeof value !== 'string') {
                errors.push({ field: `${source}.${field}`, message: `${field} must be a string` });
            }

            if (rules.type === 'number' && (isNaN(Number(value)))) {
                errors.push({ field: `${source}.${field}`, message: `${field} must be a number` });
            }

            if (rules.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push({ field: `${source}.${field}`, message: `${field} must be a valid email` });
                }
            }

            if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
                errors.push({
                    field: `${source}.${field}`,
                    message: `${field} must be at least ${rules.minLength} characters`,
                });
            }

            if (rules.enum && !rules.enum.includes(value)) {
                errors.push({
                    field: `${source}.${field}`,
                    message: `${field} must be one of: ${rules.enum.join(', ')}`,
                });
            }
        }
    }

    if (errors.length > 0) {
        return res.status(422).json({ success: false, message: 'Validation failed', errors });
    }

    next();
};
