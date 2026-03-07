export const createCustomTripSchema = {
    body: {
        customerName: { required: true, type: 'string' as const, minLength: 2 },
        customerEmail: { required: true, type: 'email' as const },
        customerPhone: { required: true, type: 'string' as const, minLength: 7 },
        destination: { required: true, type: 'string' as const, minLength: 2 },
        days: { required: true, type: 'number' as const },
        activities: { required: true, type: 'string' as const, minLength: 3 },
    },
};

export const updateCustomTripSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        status: {
            required: false,
            type: 'string' as const,
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'MODIFIED'],
        },
    },
};
