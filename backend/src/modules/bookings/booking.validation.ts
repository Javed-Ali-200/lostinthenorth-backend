export const createBookingSchema = {
    body: {
        customerName: { required: true, type: 'string' as const, minLength: 2 },
        customerEmail: { required: true, type: 'email' as const },
        customerPhone: { required: true, type: 'string' as const, minLength: 7 },
        serviceType: { required: true, type: 'string' as const, enum: ['TOUR', 'CAR', 'HOTEL', 'OFFER'] },
        serviceId: { required: true, type: 'string' as const },
        startDate: { required: true, type: 'string' as const },
        endDate: { required: true, type: 'string' as const },
    },
};

export const updateBookingStatusSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
    body: {
        status: {
            required: true,
            type: 'string' as const,
            enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        },
    },
};
