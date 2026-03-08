import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export interface BookingEmailParams {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceTitle: string;
    serviceType: string;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    totalPrice: number;
    specialRequests?: string;
    bookingNumber?: string;
}

export const sendBookingConfirmationEmail = async (
    params: BookingEmailParams
): Promise<void> => {
    const templateParams = {
        to_name: params.customerName,
        to_email: params.customerEmail,
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        service_title: params.serviceTitle,
        service_type: params.serviceType,
        start_date: params.startDate,
        end_date: params.endDate,
        number_of_people: params.numberOfPeople,
        total_price: `PKR ${params.totalPrice.toLocaleString()}`,
        special_requests: params.specialRequests || 'None',
        booking_number: params.bookingNumber || 'N/A',
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};

export const initEmailJS = () => {
    emailjs.init(PUBLIC_KEY);
};
