import { Router } from 'express';

// Module routes
import adminRoutes from '../modules/admin/admin.routes.js';
import tourRoutes from '../modules/tours/tour.routes.js';
import hotelRoutes from '../modules/hotels/hotel.routes.js';
import carRoutes from '../modules/cars/car.routes.js';
import bookingRoutes from '../modules/bookings/booking.routes.js';
import customTripRoutes from '../modules/customTrips/customTrip.routes.js';

const router = Router();

// ─── Admin Auth ───────────────────────────────────────────────────────────────
// POST /api/admin/login
router.use('/admin', adminRoutes);

// ─── Public & Admin Resource Routes ──────────────────────────────────────────
// GET  /api/tours
// POST /api/tours          (admin)
// PATCH/DELETE /api/tours/:id (admin)
router.use('/tours', tourRoutes);

// GET  /api/hotels
// POST /api/hotels         (admin)
router.use('/hotels', hotelRoutes);

// GET  /api/cars
// POST /api/cars           (admin)
router.use('/cars', carRoutes);

// ─── Booking Routes ───────────────────────────────────────────────────────────
// POST  /api/bookings              (guest)
// GET   /api/bookings/admin        (admin)
// GET   /api/bookings/admin/:id    (admin)
// PATCH /api/bookings/admin/:id/status (admin)
router.use('/bookings', bookingRoutes);

// ─── Custom Trips ─────────────────────────────────────────────────────────────
// POST  /api/custom-trips          (guest)
// GET   /api/custom-trips/admin    (admin)
// PATCH /api/custom-trips/admin/:id (admin)
router.use('/custom-trips', customTripRoutes);

export default router;
