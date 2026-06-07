export const createBookingSchema = {
    body: {
        customerName: { required: true, type: 'string' as const, minLength: 2 },
        customerEmail: { required: true, type: 'email' as const },
        customerPhone: { required: true, type: 'string' as const, minLength: 7 },
        serviceType: { required: true, type: 'string' as const, enum: ['TOUR', 'CAR', 'HOTEL', 'OFFER'] },
        serviceId: { required: true, type: 'string' as const },
        startDate: { required: true, type: 'string' as const },
        endDate: { required: true, type: 'string' as const },
        numberOfPeople: { required: false, type: 'number' as const },
        specialRequests: { required: false, type: 'string' as const },
        addOns: { required: false, type: 'string' as const }, // Frontend sends array, but we can treat as string/json if needed or just optional
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
            enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'EXPEDITION_LIVE', 'COMPLETED', 'CANCELLED'],
        },
    },
};
