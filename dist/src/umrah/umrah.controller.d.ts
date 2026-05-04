/// <reference types="multer" />
import { UmrahService } from './umrah.service';
import { CreateUmrahDto } from './dto/create-umrah.dto';
import { UpdateUmrahDto } from './dto/update-umrah.dto';
import { FileService } from 'src/file-upload/file-upload.service';
import { UmrahbookingsService } from 'src/umrahbookings/umrahbookings.service';
export declare class UmrahController {
    private readonly umrahService;
    private readonly fileUploadService;
    private readonly umrahBookingService;
    constructor(umrahService: UmrahService, fileUploadService: FileService, umrahBookingService: UmrahbookingsService);
    create(createUmrahDto: CreateUmrahDto, files: {
        coverImage?: Express.Multer.File[];
        hotelImages?: Express.Multer.File[];
    }, user: any): Promise<CreateUmrahDto & import("./entities/umrah.entity").Umrah>;
    findAll(packageType?: string, duration?: string, city?: string): Promise<import("./entities/umrah.entity").Umrah[]>;
    findByVendor(user: any): Promise<import("./entities/umrah.entity").Umrah[]>;
    findOne(id: string): Promise<import("./entities/umrah.entity").Umrah>;
    update(id: string, updateHotelDto: UpdateUmrahDto, files: {
        coverImage?: Express.Multer.File[];
        hotelImages?: Express.Multer.File[];
    }): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getStats(user: any): Promise<{
        totalPackages: number;
        stats: {
            totalBookings: number;
            totalRevenue: number;
            result: any[];
        };
    }>;
}
