// ─── Tour Types ───────────────────────────────────────────────────────────────
export interface Tour {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number; // days
    location: string;
    images: string[];
    featured: boolean;
    itinerary?: string; // JSON string
    included: string[];
    excluded: string[];
    maxGroupSize: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

// ─── Hotel Types ───────────────────────────────────────────────────────────────
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
    updatedAt: string;
}

// ─── Car Types ──────────────────────────────────────────────────────────────
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
    updatedAt: string;
}

// ─── Booking Types ─────────────────────────────────────────────────────────────
export type ServiceType = 'TOUR' | 'HOTEL' | 'CAR' | 'OFFER';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';

export interface Booking {
    id: string;
    bookingNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceType: ServiceType;
    serviceId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    numberOfPeople: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    specialRequests?: string;
    tour?: Tour;
    hotel?: Hotel;
    car?: Car;
    createdAt: string;
    updatedAt: string;
}

export interface BookingFormData {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceType: ServiceType;
    serviceId: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    specialRequests?: string;
}

// ─── Custom Trip Types ────────────────────────────────────────────────────────
export type CustomTripStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'MODIFIED';

export interface CustomTrip {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    destination: string;
    days: number;
    activities: string;
    totalPrice: number;
    status: CustomTripStatus;
    adminNotes?: string;
    startDate?: string;
    numberOfPeople: number;
    posterImage?: string;
    hotel?: Hotel;
    car?: Car;
    createdAt: string;
    updatedAt: string;
}

// ─── Admin Types ────────────────────────────────────────────────────────────
export interface Admin {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    admin: Admin;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// ─── Itinerary ────────────────────────────────────────────────────────────────
export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    activities?: string[];
}
