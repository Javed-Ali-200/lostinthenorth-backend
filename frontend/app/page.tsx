'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Star,
  Shield,
  Clock,
  TrendingUp,
  Search,
  ChevronRight,
  ChevronLeft,
  User
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import api from '@/lib/api';
import { Tour, Offer } from '@/types';

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursRes, offersRes] = await Promise.all([
          api.get('/tours?featured=true&limit=3'),
          api.get('/offers?active=true&limit=3'),
        ]);
        setTours(toursRes.data.tours);
        setOffers(offersRes.data.offers);
      } catch (error) {
        console.error('Error fetching homepage data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <UserLayout>
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506929113675-b9299d39bb14"
            alt="Hero"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10 text-white">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-main/20 backdrop-blur-md border border-main/30 text-main text-sm font-bold tracking-wide uppercase">
              <Star size={16} />
              <span>Personalized Travel Experiences</span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold font-poppins leading-tight text-white text-shadow-custom">
              Journey to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-purple-400">
                Extraordinary
              </span>
            </h1>

            <p className="text-xl text-slate-300 font-medium max-w-xl leading-relaxed">
              Explore handpicked destinations, luxury accommodations, and local experiences tailored specifically for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/tours">
                <Button size="lg" className="px-10 py-5 text-lg rounded-2xl group shadow-2xl shadow-main/20">
                  Explore Tours <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/custom-trip">
                <Button variant="outline" size="lg" className="px-10 py-5 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md rounded-2xl">
                  Build Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-12 right-6 hidden xl:flex items-center space-x-8 text-white z-20">
          <div className="text-right">
            <p className="text-4xl font-bold font-poppins">15k+</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Happy Travelers</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="text-right">
            <p className="text-4xl font-bold font-poppins">200+</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Destinations</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="text-right">
            <p className="text-4xl font-bold font-poppins">4.9/5</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-main font-bold uppercase tracking-[0.2em] text-sm">Exclusive Deals</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-poppins text-black-custom">Limited-Time Offers</h3>
            </div>
            <Link href="/offers" className="text-main font-bold flex items-center hover:translate-x-1 transition-all">
              View All Offers <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <Card key={offer.id} className="group">
                <div className="relative h-72">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {offer.discount}% OFF
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-2xl font-bold font-poppins group-hover:text-main transition-colors">{offer.title}</h4>
                  <p className="text-slate-500 font-medium line-clamp-2">{offer.description}</p>
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <p className="text-slate-400 text-sm font-bold line-through">${(offer.price / (1 - offer.discount / 100)).toFixed(0)}</p>
                      <p className="text-3xl font-bold text-black-custom">${offer.price}</p>
                    </div>
                    <Link href={`/offers/${offer.id}`}>
                      <Button size="sm" className="rounded-xl">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
            {loading && [1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-slate-100 h-[500px] rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
            <h2 className="text-main font-bold uppercase tracking-[0.2em] text-sm">Popular Choice</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-poppins text-black-custom">Featured Tour Packages</h3>
            <p className="text-slate-500 font-medium">Curated collection of the most loved travel experiences from around the globe.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {tours.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.id}`}>
                <Card className="flex flex-col h-full border-none shadow-xl shadow-slate-200 group">
                  <div className="relative h-96">
                    <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <div className="flex items-center space-x-2 text-main font-bold text-sm uppercase tracking-wider">
                        <MapPin size={14} />
                        <span>{tour.location}</span>
                      </div>
                      <h4 className="text-2xl font-bold font-poppins leading-tight">{tour.title}</h4>
                    </div>
                  </div>
                  <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                    <p className="text-slate-500 font-medium line-clamp-3">{tour.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-amber-500 font-bold">
                          <Clock size={16} />
                          <span>{tour.duration} Days</span>
                        </div>
                        <div className="flex items-center space-x-1 text-main font-bold">
                          <TrendingUp size={16} />
                          <span>{tour.maxGroupSize} Max</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Start from</p>
                        <p className="text-2xl font-bold text-slate-950">${tour.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square bg-main rounded-[60px] translate-x-10 translate-y-10" />
            <img
              src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546"
              alt="Experience"
              className="absolute inset-0 w-full h-full object-cover rounded-[60px] shadow-custom"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-custom space-y-2 hidden md:block border border-slate-100">
              <p className="text-5xl font-bold text-main font-poppins">10+</p>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Years Experience</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-main font-bold uppercase tracking-[0.2em] text-sm">Our Strength</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-poppins text-black-custom leading-tight">Why Book Your Next Trip With Us?</h3>
            </div>

            <div className="grid gap-8">
              {[
                {
                  title: 'Secure Payment',
                  desc: 'All your transactions are protected by industry-leading security protocols.',
                  icon: <Shield className="text-emerald-500" size={28} />
                },
                {
                  title: 'Professional Guides',
                  desc: 'Our experienced local guides will take you deeper into the culture and history.',
                  icon: <User className="text-blue-500" size={28} />
                },
                {
                  title: 'Flexible Booking',
                  desc: 'Change your dates or cancel your trip with our easy-to-use booking system.',
                  icon: <Clock className="text-purple-500" size={28} />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-main/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold font-poppins text-black-custom">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto relative h-[500px] rounded-[60px] overflow-hidden bg-main flex items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Beach"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 space-y-10 px-6">
            <h2 className="text-5xl md:text-7xl font-bold font-poppins text-white leading-tight max-w-4xl text-shadow-custom">
              Ready To Start Your <br /> Dream Vacation?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-main hover:bg-slate-50 w-full px-12 py-5 rounded-2xl text-xl font-bold shadow-custom">
                  Join TravelX Now
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto text-white font-bold text-xl hover:text-slate-100 underline decoration-2 underline-offset-8">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
