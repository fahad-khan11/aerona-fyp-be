import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
export declare class InvoiceService {
    private invoiceRepository;
    constructor(invoiceRepository: Repository<Invoice>);
    create(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto & Invoice>;
    findAll(): Promise<Invoice[]>;
    findOne(id: number): Promise<Invoice>;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getVendorInvoice(id: number): Promise<Invoice[]>;
    findInvoiceByDate(fromDate: Date, toDate: Date, id: number): Promise<Invoice>;
}
