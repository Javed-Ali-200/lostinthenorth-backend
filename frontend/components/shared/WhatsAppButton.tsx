'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = "+923555929223"; // User should replace with their actual number
    const message = encodeURIComponent("Hello! I'm interested in booking a trip with The Lost in the North.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} fill="currentColor" />

            {/* Tooltip */}
            <span className="absolute right-16 bg-white text-dark text-xs font-semibold px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 pointer-events-none">
                Chat with us!
            </span>

            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0 transition-opacity"></span>
        </a>
    );
}
