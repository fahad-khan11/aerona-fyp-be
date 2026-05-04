import { CreateHotelInvoiceDto } from './dto/create-hotel-invoice.dto';
import { UpdateHotelInvoiceDto } from './dto/update-hotel-invoice.dto';
import { HotelInvoice } from './entities/hotel-invoice.entity';
import { Repository } from 'typeorm';
export declare class HotelInvoiceService {
    private hotelInvoiceRepository;
    constructor(hotelInvoiceRepository: Repository<HotelInvoice>);
    create(createHotelInvoiceDto: CreateHotelInvoiceDto): Promise<CreateHotelInvoiceDto & HotelInvoice>;
    findAll(): Promise<HotelInvoice[]>;
    findOne(id: number): Promise<HotelInvoice[]>;
    update(id: number, updateHotelInvoiceDto: UpdateHotelInvoiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findInvoiceByDate(fromDate: Date, toDate: Date, id: number): Promise<HotelInvoice>;
}
