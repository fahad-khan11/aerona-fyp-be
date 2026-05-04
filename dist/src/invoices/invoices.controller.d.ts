import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';
export declare class InvoicesController {
    private readonly invoicesService;
    private readonly bookingsService;
    private readonly umrahBookingsService;
    constructor(invoicesService: InvoicesService, bookingsService: BookingsService, umrahBookingsService: UmrahbookingsService);
    create(createInvoiceDto: CreateInvoiceDto): string;
    findAll(): string;
    findAdminHotelInvoice(): Promise<{
        totalPayments: any;
        monthWiseTotals: any[];
        vendorTotals: any[];
        monthWiseVendorTotals: any[];
    }>;
    findAdminUmrahInvoice(): Promise<{
        totalPayments: any;
        monthWiseTotals: any[];
        vendorTotals: any[];
        monthWiseVendorTotals: any[];
    }>;
    findOne(id: string): string;
    getVendorMonthPayments(vendorId: number, monthYear: string): Promise<any[]>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: string): string;
    getAgentComission(agentId: number): Promise<any[]>;
}
