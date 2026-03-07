import prisma from '../../config/prisma.js';
import {
    createBooking,
    countBookingsByPrefix,
    findAllBookings,
    findBookingById,
    updateBookingStatus,
    BookingFilters,
} from './booking.repository.js';
import { AppError } from '../../middlewares/error.middleware.js';
import { Prisma, Booking, ServiceType } from '@prisma/client';

type RelatedField =
    | { tourId: string }
    | { hotelId: string }
    | { carId: string }
    | { offerId: string };

/**
 * Resolve service price based on serviceType and serviceId using transaction context.
 */
const resolveServicePrice = async (
    serviceType: ServiceType,
    serviceId: string,
    startDate: string,
    endDate: string,
    numberOfPeople: number,
    tx: Prisma.TransactionClient
): Promise<{ price: number; relatedField: RelatedField }> => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

    switch (serviceType) {
        case 'TOUR': {
            const tour = await tx.tour.findUnique({ where: { id: serviceId } });
            if (!tour) throw new AppError('Tour not found.', 404);
            if (!tour.available) throw new AppError('Tour is not available.', 400);
            return { price: Number(tour.price) * numberOfPeople, relatedField: { tourId: serviceId } };
        }
        case 'HOTEL': {
            const hotel = await tx.hotel.findUnique({ where: { id: serviceId } });
            if (!hotel) throw new AppError('Hotel not found.', 404);
            if (!hotel.available) throw new AppError('Hotel is not available.', 400);
            return { price: Number(hotel.pricePerNight) * days * numberOfPeople, relatedField: { hotelId: serviceId } };
        }
        case 'CAR': {
            const car = await tx.car.findUnique({ where: { id: serviceId } });
            if (!car) throw new AppError('Car not found.', 404);
            if (!car.available) throw new AppError('Car is not available.', 400);
            return { price: Number(car.pricePerDay) * days, relatedField: { carId: serviceId } };
        }
        case 'OFFER': {
            const offer = await tx.offer.findUnique({ where: { id: serviceId } });
            if (!offer) throw new AppError('Offer not found.', 404);
            if (!(offer as any).active) throw new AppError('Offer is no longer active.', 400);
            const discountedPrice = Number(offer.price) - (Number(offer.price) * Number(offer.discount)) / 100;
            return { price: discountedPrice * numberOfPeople, relatedField: { offerId: serviceId } };
        }
        default:
            throw new AppError('Invalid service type.', 400);
    }
};

/**
 * Create a guest booking using a Prisma transaction.
 */
export const createGuestBooking = async (data: any): Promise<Booking> => {
    const {
        customerName,
        customerEmail,
        customerPhone,
        serviceType,
        serviceId,
        startDate,
        endDate,
        numberOfPeople = 1,
        specialRequests,
    } = data;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start.getTime() < new Date().setHours(0, 0, 0, 0)) {
        throw new AppError('Start date cannot be in the past.', 400);
    }
    if (end <= start) {
        throw new AppError('End date must be after start date.', 400);
    }

    return prisma.$transaction(async (tx) => {
        const year = new Date().getFullYear();
        const prefix = `LIN-${year}-`;
        const count = await countBookingsByPrefix(prefix, tx);
        const bookingNumber = `${prefix}${String(count + 1).padStart(4, '0')}`;

        const { price, relatedField } = await resolveServicePrice(
            serviceType as ServiceType,
            serviceId,
            startDate,
            endDate,
            parseInt(numberOfPeople, 10),
            tx
        );

        const bookingData: any = {
            bookingNumber,
            customerName,
            customerEmail,
            customerPhone,
            serviceType: serviceType as ServiceType,
            serviceId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: price,
            numberOfPeople: parseInt(numberOfPeople, 10),
            specialRequests: specialRequests || null,
            ...relatedField,
        };

        return createBooking(bookingData, tx);
    });
};

export const getAllBookings = async (query: BookingFilters): Promise<Booking[]> => findAllBookings(query);

export const getBookingById = async (id: string): Promise<Booking> => {
    const booking = await findBookingById(id);
    if (!booking) throw new AppError('Booking not found.', 404);
    return booking;
};

export const updateBookingStatusById = async (id: string, status: string): Promise<Booking> => {
    await getBookingById(id);
    return updateBookingStatus(id, status);
};
