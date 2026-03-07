export const createHotelSchema = {
    body: {
        name: { required: true, type: 'string' as const, minLength: 2 },
        location: { required: true, type: 'string' as const },
        description: { required: true, type: 'string' as const, minLength: 10 },
        pricePerNight: { required: true, type: 'number' as const },
    },
};

export const updateHotelSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};
