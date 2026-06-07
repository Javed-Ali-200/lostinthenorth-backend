/**
 * Trekking validation schemas for use with validate middleware.
 */

export const createTrekkingSchema = {
    body: {
        title: { required: true, type: 'string' as const, minLength: 3 },
        description: { required: true, type: 'string' as const, minLength: 10 },
        price: { required: true, type: 'number' as const },
        duration: { required: true, type: 'number' as const },
        location: { required: true, type: 'string' as const },
        difficulty: { required: false, enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'] },
    },
};

export const updateTrekkingSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        title: { required: false, type: 'string' as const, minLength: 3 },
        price: { required: false, type: 'number' as const },
        duration: { required: false, type: 'number' as const },
    },
};
