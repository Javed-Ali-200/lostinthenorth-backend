export type Role = 'USER' | 'ADMIN';

export type ServiceType = 'TOUR' | 'CAR' | 'HOTEL' | 'OFFER' | 'CUSTOM';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';

export type CustomTripStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED';

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: string;
}

export interface Tour {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    location: string;
    images: string[];
    featured: boolean;
    itinerary?: string;
    included: string[];
    excluded: string[];
    maxGroupSize: number;
    available: boolean;
    createdAt: string;
}

export interface Offer {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    validUntil?: string;
    active: boolean;
    serviceType: ServiceType;
    serviceId?: string;
    createdAt: string;
}

export interface Car {
    id: string;
    name: string;
    type: string;
    pricePerDay: number;
    image: string;
    images: string[];
    features: string[];
    seats: number;
    transmission: string;
    fuelType: string;
    available: boolean;
    createdAt: string;
}

export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    pricePerNight: number;
    images: string[];
    amenities: string[];
    rating: number;
    roomTypes: string[];
    available: boolean;
    address?: string;
    phone?: string;
    email?: string;
    createdAt: string;
}

export interface Booking {
    id: string;
    userId: string;
    serviceType: ServiceType;
    serviceId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    numberOfPeople: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    specialRequests?: string;
    createdAt: string;
    user?: User;
    tour?: Tour;
    car?: Car;
    hotel?: Hotel;
    offer?: Offer;
    payment?: Payment;
}

export interface CustomTrip {
    id: string;
    userId: string;
    destination: string;
    hotelId?: string;
    carId?: string;
    days: number;
    activities: string; // JSON string
    totalPrice: number;
    status: CustomTripStatus;
    adminNotes?: string;
    startDate?: string;
    numberOfPeople: number;
    createdAt: string;
    user?: User;
    hotel?: Hotel;
    car?: Car;
}

export interface Payment {
    id: string;
    bookingId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    stripePaymentId?: string;
    paymentMethod?: string;
    createdAt: string;
}

export interface DashboardStats {
    totalUsers: number;
    totalBookings: number;
    pendingBookings: number;
    totalRevenue: number;
}
