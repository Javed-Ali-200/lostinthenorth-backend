import Link from 'next/link';
import { Mountain, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
    Explore: [
        { label: 'Tours', href: '/tours' },
        { label: 'Hotels', href: '/hotels' },
        { label: 'Car Rentals', href: '/cars' },
        { label: 'Custom Trips', href: '/custom-trip' },
    ],
    Company: [
        { label: 'About Us', href: '#about' },
        { label: 'Why Choose Us', href: '#why-us' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-dark text-white">
            <div className="container-max px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="p-2 rounded-xl bg-gold/20">
                                <Mountain size={20} className="text-gold" />
                            </div>
                            <div>
                                <span className="block font-display font-bold text-sm">Lost in the North</span>
                                <span className="block text-xs text-white/50">Premium Pakistan Travel</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Discover the breathtaking beauty of Northern Pakistan. We curate
                            premium travel experiences that connect you with nature, culture,
                            and adventure.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {[
                                { Icon: Facebook, href: '#' },
                                { Icon: Instagram, href: '#' },
                                { Icon: Youtube, href: '#' },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-gold/20 hover:text-gold transition-all"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold mb-4 text-white/90 text-sm uppercase tracking-wider">
                                {title}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="text-gray-400 hover:text-gold transition-colors text-sm"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white/90 text-sm uppercase tracking-wider">
                            Contact Us
                        </h3>
                        <div className="space-y-3">
                            {[
                                { Icon: Phone, text: '+92 300 0000000' },
                                { Icon: Mail, text: 'info@lostinthenorth.pk' },
                                { Icon: MapPin, text: 'Gilgit, Pakistan' },
                            ].map(({ Icon, text }, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <Icon size={15} className="text-gold shrink-0" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} The Lost in the North. All rights reserved.</p>
                    <p>Designed with ❤️ for Pakistan Tourism</p>
                </div>
            </div>
        </footer>
    );
}
