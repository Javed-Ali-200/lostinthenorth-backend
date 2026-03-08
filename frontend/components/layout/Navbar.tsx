'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mountain, ChevronDown } from 'lucide-react';

const navLinks = [
    { label: 'Tours', href: '/tours' },
    { label: 'Hotels', href: '/hotels' },
    { label: 'Cars', href: '/cars' },
    { label: 'Custom Trip', href: '/custom-trip' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isHome = pathname === '/';
    const isAdmin = pathname.startsWith('/admin');
    if (isAdmin) return null;

    const isTransparent = isHome && !scrolled && !isOpen;

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isTransparent
                    ? 'bg-transparent py-5'
                    : 'bg-white/95 backdrop-blur-md shadow-md py-3'
                }`}
        >
            <div className="container-max px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div
                        className={`p-2 rounded-xl transition-all ${isTransparent ? 'bg-white/10' : 'bg-teal'
                            }`}
                    >
                        <Mountain
                            size={22}
                            className={isTransparent ? 'text-white' : 'text-white'}
                        />
                    </div>
                    <div>
                        <span
                            className={`block font-display font-bold text-base leading-none transition-colors ${isTransparent ? 'text-white' : 'text-teal'
                                }`}
                        >
                            Lost in the North
                        </span>
                        <span
                            className={`block text-xs transition-colors ${isTransparent ? 'text-white/70' : 'text-gray-500'
                                }`}
                        >
                            Premium Pakistan Travel
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === link.href
                                    ? isTransparent
                                        ? 'bg-white/20 text-white'
                                        : 'bg-teal/10 text-teal'
                                    : isTransparent
                                        ? 'text-white/90 hover:bg-white/15 hover:text-white'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-teal'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/custom-trip"
                        className="ml-3 px-5 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold hover:bg-gold/90 transition-all shadow-sm hover:shadow-md"
                    >
                        Plan a Trip
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden p-2 rounded-lg transition ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === link.href
                                    ? 'bg-teal/10 text-teal'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-teal'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/custom-trip"
                        onClick={() => setIsOpen(false)}
                        className="block mt-3 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-semibold text-center"
                    >
                        Plan a Trip
                    </Link>
                </div>
            )}
        </nav>
    );
}
