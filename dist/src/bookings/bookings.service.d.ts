import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, PaymentType } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Favourites } from './entities/favourites.entity';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
export declare class BookingsService {
    private bookingRepository;
    private favouritesRepository;
    constructor(bookingRepository: Repository<Booking>, favouritesRepository: Repository<Favourites>);
    create(createBookingDto: CreateBookingDto): Promise<CreateBookingDto & Booking>;
    createFavourite(createFavouriteDto: CreateFavouriteDto): Promise<CreateFavouriteDto & Favourites>;
    removeFavourite(id: number): Promise<import("typeorm").DeleteResult>;
    findFavourite(userId: number, hotelId: number): Promise<Favourites[]>;
    findUserFavourites(id: number): Promise<Favourites[]>;
    findAll(paymnetType: PaymentType): Promise<Booking[]>;
    findUpComing(id: number): Promise<Booking[]>;
    findPast(id: number): Promise<Booking[]>;
    findCancelled(id: number): Promise<Booking[]>;
    findHotelBookings(hotelId: number): Promise<Booking[]>;
    findUserBookings(id: number): Promise<Booking[]>;
    findAllVendorDashBoardStats(id: number): Promise<{
        totalBookings: number;
        cancelledBookings: number;
    }>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBookingDto: UpdateBookingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getVendorPayments(hotelId: number, startDate: Date, endDate: Date): Promise<{
        startDate: Date;
        endDate: Date;
        totalAmount: number;
    }>;
    getVendorPaymentsDetails(hotelId: number, startDate: Date, endDate: Date): Promise<Booking[]>;
    findTotalBookings(): Promise<{
        totalAmount: any;
        totalBookings: number;
    }>;
    hotelInvoiceAdmin(): Promise<{
        totalPayments: any;
        monthWiseTotals: any[];
        vendorTotals: any[];
        monthWiseVendorTotals: any[];
    }>;
    findVendorInvoice(monthYear: string, vendorId: number): Promise<any[]>;
    findMonthWiseRevenue(): Promise<any[]>;
    findMonthBookingsForVendor(vendorId: number, monthYear: string): Promise<Booking[]>;
    findMonthAgentComission(userId: number): Promise<any[]>;
    getInvoiceSum(vendorId: number, startDate: Date, endDate: Date): Promise<{
        total: number;
        onlineTotal: number;
        payAtHotelTotal: number;
    }>;
}
