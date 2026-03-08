import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CustomTripBanner() {
    return (
        <section className="section-padding bg-teal relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gold blur-3xl" />
            </div>

            <div className="container-max relative z-10 text-center">
                <span className="inline-flex items-center gap-2 text-gold text-sm font-medium uppercase tracking-widest mb-4">
                    <span className="h-px w-8 bg-gold" />
                    Something Unique
                    <span className="h-px w-8 bg-gold" />
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5">
                    Want a Custom Trip?
                    <br />
                    <span className="text-gold italic">We&apos;ll Build It For You.</span>
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                    Tell us your dream destination, dates, and preferences. Our travel experts
                    will craft a tailor-made itinerary just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/custom-trip"
                        className="group flex items-center justify-center gap-2 px-8 py-4 bg-gold text-white rounded-2xl font-semibold hover:bg-gold/90 transition-all hover:-translate-y-0.5"
                    >
                        Plan My Custom Trip
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/tours"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all"
                    >
                        Browse Existing Tours
                    </Link>
                </div>
            </div>
        </section>
    );
}
