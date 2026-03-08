'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Play } from 'lucide-react';

const destinations = ['Hunza Valley', 'Skardu', 'Fairy Meadows', 'Naran Kaghan', 'Gilgit'];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Floating destination pills */}
            <div className="absolute top-32 right-8 hidden lg:flex flex-col gap-2">
                {destinations.slice(0, 3).map((d, i) => (
                    <div
                        key={d}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-sm"
                        style={{ animationDelay: `${i * 200}ms` }}
                    >
                        <MapPin size={12} className="text-gold" />
                        {d}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 container-max px-6 pt-24 pb-16">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-px w-12 bg-gold" />
                        <span className="text-gold text-sm font-medium tracking-widest uppercase">
                            Discover Pakistan
                        </span>
                    </div>

                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                        Get{' '}
                        <span className="text-gold italic">Lost</span>
                        <br />
                        in the North
                    </h1>

                    <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                        Experience the untouched beauty of Northern Pakistan — from the
                        towering peaks of Karakoram to the emerald lakes of Hunza. Your
                        journey begins here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/tours"
                            className="group flex items-center gap-2 px-8 py-4 bg-gold text-white rounded-2xl font-semibold text-base hover:bg-gold/90 transition-all hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5"
                        >
                            Explore Tours
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/custom-trip"
                            className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all"
                        >
                            <Play size={16} className="fill-white" />
                            Plan My Trip
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/20">
                        {[
                            { value: '200+', label: 'Tours Completed' },
                            { value: '50+', label: 'Destinations' },
                            { value: '5000+', label: 'Happy Travelers' },
                            { value: '10+', label: 'Years Experience' },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-3xl font-bold text-white font-display">{value}</p>
                                <p className="text-white/60 text-sm">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 inset-x-0">
                <svg viewBox="0 0 1440 80" className="w-full fill-stone-50">
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
                </svg>
            </div>
        </section>
    );
}
