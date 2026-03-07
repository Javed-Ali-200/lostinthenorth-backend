/**
 * Tour validation schemas for use with validate middleware.
 */

export const createTourSchema = {
    body: {
        title: { required: true, type: 'string' as const, minLength: 3 },
        description: { required: true, type: 'string' as const, minLength: 10 },
        price: { required: true, type: 'number' as const },
        duration: { required: true, type: 'number' as const },
        location: { required: true, type: 'string' as const },
    },
};

export const updateTourSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};
