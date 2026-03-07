'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    PlaneTakeoff,
    Menu,
    X,
    User as UserIcon,
    LogOut,
    LayoutDashboard,
    Settings,
    Briefcase,
    MapPin,
    Car,
    Hotel
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '../shared/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Tours', href: '/tours', icon: <MapPin size={18} /> },
        { name: 'Cars', href: '/cars', icon: <Car size={18} /> },
        { name: 'Hotels', href: '/hotels', icon: <Hotel size={18} /> },
        { name: 'Custom Trip', href: '/custom-trip', icon: <Briefcase size={18} /> },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm'
            : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${scrolled ? 'bg-main text-white' : 'bg-white/20 backdrop-blur-md text-white border border-white/30'
                            }`}>
                            <PlaneTakeoff size={24} />
                        </div>
                        <span className={`text-2xl font-bold font-poppins tracking-tight transition-colors duration-300 ${scrolled ? 'text-black-custom' : 'text-white'
                            }`}>
                            TravelX
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 bg-slate-100/10 p-1.5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${isActive(link.href)
                                    ? 'bg-main text-white shadow-lg shadow-main/30'
                                    : scrolled
                                        ? 'text-slate-600 hover:text-main hover:bg-slate-50'
                                        : 'text-blue-50 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative group">
                                <button className={`flex items-center space-x-3 p-1.5 pr-4 rounded-full border transition-all ${scrolled
                                    ? 'border-slate-200 bg-white hover:border-main'
                                    : 'border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white'
                                    }`}>
                                    <div className="w-9 h-9 rounded-full bg-main flex items-center justify-center text-white font-bold shadow-md">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-sm">{user.name.split(' ')[0]}</span>
                                </button>

                                <div className="absolute right-0 mt-3 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300">
                                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 p-2 overflow-hidden">
                                        {isAdmin && (
                                            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-main/10 hover:text-main rounded-xl transition-colors font-semibold">
                                                <LayoutDashboard size={18} />
                                                <span>Admin Dashboard</span>
                                            </Link>
                                        )}
                                        <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-main/10 hover:text-main rounded-xl transition-colors font-semibold">
                                            <UserIcon size={18} />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-main/10 hover:text-main rounded-xl transition-colors font-semibold">
                                            <Settings size={18} />
                                            <span>Settings</span>
                                        </Link>
                                        <hr className="my-2 border-slate-100" />
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-semibold"
                                        >
                                            <LogOut size={18} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link href="/login">
                                    <Button variant="ghost" className={scrolled ? 'text-slate-700' : 'text-white hover:bg-white/10'} size="md">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="primary" size="md">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10 backdrop-blur-md'
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden fixed inset-0 z-[60] bg-white transition-all duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                        <span className="text-2xl font-bold font-outfit text-slate-900">TravelX</span>
                        <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-xl">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-4 p-5 rounded-2xl font-bold text-xl transition-all ${isActive(link.href)
                                    ? 'bg-main text-white shadow-xl shadow-main/20'
                                    : 'text-slate-600 bg-slate-50'
                                    }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-4 p-4">
                                    <div className="w-14 h-14 rounded-2xl bg-main flex items-center justify-center text-white text-xl font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-slate-900">{user.name}</p>
                                        <p className="text-slate-500 font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <Button onClick={logout} variant="danger" className="w-full py-4 rounded-2xl text-lg">
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="outline" className="w-full py-4 rounded-2xl text-lg">Login</Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="primary" className="w-full py-4 rounded-2xl text-lg">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
