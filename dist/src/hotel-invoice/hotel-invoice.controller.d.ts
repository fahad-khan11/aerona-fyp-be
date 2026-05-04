import { HotelInvoiceService } from './hotel-invoice.service';
import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';
import { BookingsService } from 'src/bookings/bookings.service';
export declare class HotelInvoiceController {
    private readonly hotelInvoiceService;
    private readonly bookindService;
    constructor(hotelInvoiceService: HotelInvoiceService, bookindService: BookingsService);
    create(createHotelInvoiceDto: CreateHotelInvoiceDto): Promise<CreateHotelInvoiceDto & import("./entities/hotel-invoice.entity").HotelInvoice>;
    findAll(): Promise<import("./entities/hotel-invoice.entity").HotelInvoice[]>;
    findOne(id: string): Promise<import("./entities/hotel-invoice.entity").HotelInvoice[]>;
    update(id: string, updateHotelInvoiceDto: UpdateHotelInvoiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
