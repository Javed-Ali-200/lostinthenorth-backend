'use client';

import React from 'react';
import Navbar from '@/components/user/Navbar';
import { usePathname } from 'next/navigation';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide navbar on auth pages if needed, though they are usually in separate groups if using (auth)
    // But here we are just in app/login and app/signup
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navbar />}
            <main className={`flex-grow ${!isAuthPage ? '' : ''}`}>
                {children}
            </main>
            {!isAuthPage && (
                <footer className="footer bg-black-custom text-white pt-20 pb-10" style={{ backgroundImage: 'url(/image/footer-bg3.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-main rounded-xl">
                                    <span className="text-white">🚀</span>
                                </div>
                                <span className="text-2xl font-bold font-poppins">TravelX</span>
                            </div>
                            <p className="text-slate-300 font-medium leading-relaxed">
                                Experience the world like never before with our premium tour packages and luxury services.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 font-poppins text-white">Quick Links</h4>
                            <ul className="space-y-4 text-slate-300 font-medium">
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> About Us</a></li>
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> Our Tours</a></li>
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> Contact Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 font-poppins text-white">Services</h4>
                            <ul className="space-y-4 text-slate-300 font-medium">
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> Car Rental</a></li>
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> Hotel Booking</a></li>
                                <li><a href="#" className="hover:text-main transition-all hover:pl-2 flex items-center"><span className="text-main mr-2">i</span> Custom Trip Builder</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 font-poppins text-white">Newsletter</h4>
                            <p className="text-slate-300 font-medium mb-4">Subscribe to receive travel tips and exclusive deals!</p>
                            <div className="flex space-x-2 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-transparent border-none focus:ring-0 text-sm px-3 w-full text-white placeholder-slate-400"
                                />
                                <button className="bg-main p-2 rounded-xl hover:opacity-90 transition-all">
                                    <span className="sr-only">Subscribe</span>
                                    ➡️
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 text-center text-slate-400 font-medium">
                        <p> 2026 <span className="text-main">TravelX</span>. All rights reserved. Designed for premium travelers.</p>
                    </div>
                </footer>
            )}
        </div>
    );
}
