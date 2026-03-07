import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@travel.com' },
        update: {},
        create: {
            email: 'admin@travel.com',
            name: 'Admin User',
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    console.log('✅ Admin user created:', admin.email);

    // Create sample tours
    const tours = await Promise.all([
        prisma.tour.create({
            data: {
                title: 'Bali Paradise Adventure',
                description: 'Experience the magic of Bali with this 7-day adventure through temples, beaches, and rice terraces. Includes guided tours, cultural experiences, and relaxation time.',
                price: 1299,
                duration: 7,
                location: 'Bali, Indonesia',
                images: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                    'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e',
                ],
                featured: true,
                itinerary: JSON.stringify([
                    { day: 1, title: 'Arrival in Bali', description: 'Airport pickup and hotel check-in' },
                    { day: 2, title: 'Ubud Cultural Tour', description: 'Visit temples and rice terraces' },
                    { day: 3, title: 'Beach Day', description: 'Relax at Seminyak Beach' },
                ]),
                included: ['Accommodation', 'Breakfast', 'Guided Tours', 'Airport Transfer'],
                excluded: ['Flights', 'Lunch & Dinner', 'Personal Expenses'],
                maxGroupSize: 15,
            },
        }),
        prisma.tour.create({
            data: {
                title: 'Swiss Alps Expedition',
                description: 'Explore the breathtaking Swiss Alps with hiking, skiing, and mountain adventures. Perfect for nature lovers and adventure seekers.',
                price: 2499,
                duration: 10,
                location: 'Swiss Alps, Switzerland',
                images: [
                    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
                ],
                featured: true,
                itinerary: JSON.stringify([
                    { day: 1, title: 'Arrival in Zurich', description: 'Transfer to mountain resort' },
                    { day: 2, title: 'Hiking Adventure', description: 'Guided mountain hiking' },
                ]),
                included: ['Accommodation', 'All Meals', 'Ski Equipment', 'Guide'],
                excluded: ['Flights', 'Travel Insurance'],
                maxGroupSize: 12,
            },
        }),
        prisma.tour.create({
            data: {
                title: 'Tokyo City Explorer',
                description: 'Discover the vibrant culture of Tokyo with visits to historic temples, modern districts, and authentic Japanese cuisine experiences.',
                price: 1899,
                duration: 6,
                location: 'Tokyo, Japan',
                images: [
                    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                    'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
                ],
                featured: false,
                itinerary: JSON.stringify([
                    { day: 1, title: 'Arrival', description: 'Hotel check-in and welcome dinner' },
                    { day: 2, title: 'Historic Tokyo', description: 'Visit temples and shrines' },
                ]),
                included: ['Accommodation', 'Breakfast', 'City Tours', 'JR Pass'],
                excluded: ['Flights', 'Lunch & Dinner'],
                maxGroupSize: 20,
            },
        }),
    ]);

    console.log(`✅ Created ${tours.length} tours`);

    // Create sample cars
    const cars = await Promise.all([
        prisma.car.create({
            data: {
                name: 'Toyota Fortuner',
                type: 'SUV',
                pricePerDay: 75,
                image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
                images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b'],
                features: ['AC', 'GPS', 'Bluetooth', '4WD'],
                seats: 7,
                transmission: 'Automatic',
                fuelType: 'Diesel',
            },
        }),
        prisma.car.create({
            data: {
                name: 'Honda City',
                type: 'Sedan',
                pricePerDay: 45,
                image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
                images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'],
                features: ['AC', 'GPS', 'Bluetooth'],
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Petrol',
            },
        }),
        prisma.car.create({
            data: {
                name: 'Mercedes Sprinter Van',
                type: 'Van',
                pricePerDay: 120,
                image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c',
                images: ['https://images.unsplash.com/photo-1527786356703-4b100091cd2c'],
                features: ['AC', 'GPS', 'WiFi', 'Leather Seats'],
                seats: 12,
                transmission: 'Automatic',
                fuelType: 'Diesel',
            },
        }),
    ]);

    console.log(`✅ Created ${cars.length} cars`);

    // Create sample hotels
    const hotels = await Promise.all([
        prisma.hotel.create({
            data: {
                name: 'Grand Paradise Resort',
                location: 'Bali, Indonesia',
                description: 'Luxury beachfront resort with world-class amenities, spa, and multiple dining options.',
                pricePerNight: 150,
                images: [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
                ],
                amenities: ['Pool', 'Spa', 'WiFi', 'Restaurant', 'Beach Access', 'Gym'],
                rating: 4.8,
                roomTypes: ['Deluxe Room', 'Ocean View Suite', 'Presidential Suite'],
                address: 'Jl. Pantai Kuta, Bali 80361',
                phone: '+62-361-123456',
                email: 'info@grandparadise.com',
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Mountain View Lodge',
                location: 'Swiss Alps, Switzerland',
                description: 'Cozy mountain lodge with stunning alpine views, perfect for ski enthusiasts and nature lovers.',
                pricePerNight: 200,
                images: [
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
                ],
                amenities: ['WiFi', 'Restaurant', 'Ski Storage', 'Fireplace', 'Bar'],
                rating: 4.9,
                roomTypes: ['Standard Room', 'Mountain View Room', 'Chalet'],
                address: 'Alpine Road 45, 3920 Zermatt',
                phone: '+41-27-123456',
                email: 'info@mountainviewlodge.ch',
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Tokyo Central Hotel',
                location: 'Tokyo, Japan',
                description: 'Modern hotel in the heart of Tokyo, close to major attractions and shopping districts.',
                pricePerNight: 120,
                images: [
                    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
                ],
                amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center', 'Concierge'],
                rating: 4.6,
                roomTypes: ['Single Room', 'Double Room', 'Executive Suite'],
                address: '1-1-1 Shibuya, Tokyo 150-0002',
                phone: '+81-3-1234-5678',
                email: 'info@tokyocentral.jp',
            },
        }),
    ]);

    console.log(`✅ Created ${hotels.length} hotels`);

    // Create sample offers
    const offers = await Promise.all([
        prisma.offer.create({
            data: {
                title: 'Summer Special - Bali Tour',
                description: 'Book our Bali Paradise Adventure and get 20% off! Limited time offer for summer travelers.',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                price: 1039, // 20% off from 1299
                discount: 20,
                validUntil: new Date('2026-08-31'),
                active: true,
                serviceType: 'TOUR',
                serviceId: tours[0].id,
            },
        }),
        prisma.offer.create({
            data: {
                title: 'Weekend Car Rental Deal',
                description: 'Rent any SUV for the weekend and get 15% off! Perfect for family trips.',
                image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
                price: 127.5, // 15% off from 150 (2 days * 75)
                discount: 15,
                validUntil: new Date('2026-06-30'),
                active: true,
                serviceType: 'CAR',
                serviceId: cars[0].id,
            },
        }),
        prisma.offer.create({
            data: {
                title: 'Luxury Stay Package',
                description: 'Stay 3 nights at Grand Paradise Resort and get the 4th night free!',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                price: 450, // 3 nights price for 4 nights
                discount: 25,
                validUntil: new Date('2026-12-31'),
                active: true,
                serviceType: 'HOTEL',
                serviceId: hotels[0].id,
            },
        }),
    ]);

    console.log(`✅ Created ${offers.length} offers`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@travel.com');
    console.log('   Password: Admin@123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
