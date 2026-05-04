import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UserService } from 'src/user/user.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { StripeService } from 'src/stripe/stripe.service';
import { EmailService } from 'src/email/email.service';
import { HotelsService } from 'src/hotels/hotels.service';
import { PaymentType } from './entities/booking.entity';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class BookingsController {
    private readonly bookingsService;
    private readonly usersService;
    private readonly roomService;
    private readonly stripeService;
    private readonly emailService;
    private readonly hotelService;
    private readonly umrahBookingService;
    private readonly notificationService;
    constructor(bookingsService: BookingsService, usersService: UserService, roomService: RoomsService, stripeService: StripeService, emailService: EmailService, hotelService: HotelsService, umrahBookingService: UmrahbookingsService, notificationService: NotificationsService);
    create(createBookingDto: CreateBookingDto, user: any): Promise<CreateBookingDto & import("./entities/booking.entity").Booking>;
    createCheckout(body: any): Promise<{
        url: string;
    }>;
    findAll(paymnetType: PaymentType): Promise<import("./entities/booking.entity").Booking[]>;
    findUpComing(user: any): Promise<import("./entities/booking.entity").Booking[]>;
    findPast(user: any): Promise<import("./entities/booking.entity").Booking[]>;
    findCancelled(user: any): Promise<import("./entities/booking.entity").Booking[]>;
    findAllUserBookings(user: any): Promise<import("./entities/booking.entity").Booking[]>;
    findAllVendorDashBoardStats(user: any): Promise<{
        totalBookings: number;
        cancelledBookings: number;
        totalHotels: number;
        completedHotels: number;
        pendingHotels: number;
    }>;
    findAllHotelBookings(id: string): Promise<import("./entities/booking.entity").Booking[]>;
    findOne(id: string): Promise<import("./entities/booking.entity").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getVendorPayments(id: string, startDate: Date, endDate: Date): Promise<{
        startDate: Date;
        endDate: Date;
        totalAmount: number;
    }>;
    getVendorBookingsDetails(id: string, startDate: Date, endDate: Date): Promise<import("./entities/booking.entity").Booking[]>;
    getAdminStats(): Promise<{
        userCount: number;
        vendorCount: number;
        totalBookings: number;
        totalAmount: number;
        monthRevenue: any[];
        umrahbookings: number;
        hotelBookings: number;
    }>;
    getAgentBookings(id: string): Promise<import("./entities/booking.entity").Booking[]>;
    getMonthBookings(id: string, month: string): Promise<import("./entities/booking.entity").Booking[]>;
}
