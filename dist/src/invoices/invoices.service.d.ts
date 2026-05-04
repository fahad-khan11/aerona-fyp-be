import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesService {
    create(createInvoiceDto: CreateInvoiceDto): string;
    findAll(): string;
    findAdminHotelInvoices(): void;
    findOne(id: number): string;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: number): string;
}
