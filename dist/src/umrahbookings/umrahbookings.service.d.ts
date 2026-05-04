import { CreateUmrahbookingDto } from './dto/create-umrahbooking.dto';
import { UpdateUmrahbookingDto } from './dto/update-umrahbooking.dto';
import { Repository } from 'typeorm';
import { Umrahbooking } from './entities/umrahbooking.entity';
export declare class UmrahbookingsService {
    private readonly umrahBookingRepository;
    constructor(umrahBookingRepository: Repository<Umrahbooking>);
    create(createUmrahbookingDto: CreateUmrahbookingDto): Promise<CreateUmrahbookingDto & Umrahbooking>;
    findAll(): Promise<Umrahbooking[]>;
    findOne(id: number): Promise<Umrahbooking>;
    update(id: number, updateUmrahbookingDto: UpdateUmrahbookingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findUserBookings(id: number): Promise<Umrahbooking[]>;
    findVendorBookings(id: number): Promise<Umrahbooking[]>;
    umrahBookingStats(userId: number): Promise<{
        totalBookings: number;
        totalRevenue: number;
        result: any[];
    }>;
    hotelInvoiceAdmin(): Promise<{
        totalPayments: any;
        monthWiseTotals: any[];
        vendorTotals: any[];
        monthWiseVendorTotals: any[];
    }>;
    findTotalBookings(): Promise<{
        totalAmount: any;
        totalBookings: number;
    }>;
    getInvoiceSum(vendorId: number, startDate: Date, endDate: Date): Promise<number>;
}
