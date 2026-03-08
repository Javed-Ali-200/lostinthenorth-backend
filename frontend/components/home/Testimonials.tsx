import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Ahmad Raza',
        location: 'Lahore',
        rating: 5,
        text: 'Absolutely breathtaking experience! The Hunza Valley tour was perfectly organized. Every detail was taken care of and our guide was exceptional.',
        avatar: 'AR',
    },
    {
        name: 'Sana Malik',
        location: 'Karachi',
        rating: 5,
        text: 'The custom trip package they designed for us was beyond expectations. We visited 5 destinations in 10 days seamlessly. Will definitely book again!',
        avatar: 'SM',
    },
    {
        name: 'Bilal Hassan',
        location: 'Islamabad',
        rating: 5,
        text: 'Best travel experience in Pakistan. The hotel recommendations were spot on and the car rental service was very reliable throughout the trip.',
        avatar: 'BH',
    },
    {
        name: 'Fatima Zahra',
        location: 'Peshawar',
        rating: 5,
        text: 'Professional team, amazing service. The Skardu to Deosai tour was life-changing. Highly recommend for families and adventure enthusiasts alike.',
        avatar: 'FZ',
    },
];

export default function Testimonials() {
    return (
        <section className="section-padding bg-stone-50" id="testimonials">
            <div className="container-max">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium uppercase tracking-widest mb-4">
                        <span className="h-px w-8 bg-gold" />
                        What Travelers Say
                        <span className="h-px w-8 bg-gold" />
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
                        Stories from Our Travelers
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Thousands of travelers have explored Northern Pakistan with us. Here&apos;s what they have to say.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map(({ name, location, rating, text, avatar }) => (
                        <div
                            key={name}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                        >
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: rating }).map((_, i) => (
                                    <Star key={i} size={16} className="text-gold fill-gold" />
                                ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                                    {avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-dark text-sm">{name}</p>
                                    <p className="text-gray-400 text-xs">{location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
