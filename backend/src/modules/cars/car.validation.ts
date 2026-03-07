export const createCarSchema = {
    body: {
        name: { required: true, type: 'string' as const, minLength: 2 },
        type: { required: true, type: 'string' as const },
        pricePerDay: { required: true, type: 'number' as const },
        image: { required: true, type: 'string' as const },
        seats: { required: true, type: 'number' as const },
        transmission: { required: true, type: 'string' as const },
        fuelType: { required: true, type: 'string' as const },
    },
};

export const updateCarSchema = {
    params: {
        id: { required: true, type: 'string' as const },
    },
};
