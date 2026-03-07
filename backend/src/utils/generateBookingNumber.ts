import prisma from '../config/prisma.js';

/**
 * Generate a unique booking number in the format: LIN-YYYY-NNNN
 */
export const generateBookingNumber = async (): Promise<string> => {
    const year = new Date().getFullYear();
    const prefix = `LIN-${year}-`;

    const count = await prisma.booking.count({
        where: {
            bookingNumber: {
                startsWith: prefix,
            },
        },
    });

    const sequence = String(count + 1).padStart(4, '0');
    return `${prefix}${sequence}`;
};
