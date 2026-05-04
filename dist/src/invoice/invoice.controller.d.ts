import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';
export declare class InvoiceController {
    private readonly invoiceService;
    private readonly bookingService;
    private readonly umrahBookingService;
    constructor(invoiceService: InvoiceService, bookingService: BookingsService, umrahBookingService: UmrahbookingsService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto & import("./entities/invoice.entity").Invoice>;
    findAll(): Promise<import("./entities/invoice.entity").Invoice[]>;
    findOne(id: string): Promise<import("./entities/invoice.entity").Invoice>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getVendorInvoice(id: string): Promise<import("./entities/invoice.entity").Invoice[]>;
}
