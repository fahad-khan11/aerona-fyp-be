/// <reference types="multer" />
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { UserService } from 'src/user/user.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { CreateFavouriteDto } from 'src/bookings/dto/create-favourite.dto';
import { FileService } from 'src/file-upload/file-upload.service';
import { Status } from 'src/user/entities/user.entity';
export declare class HotelsController {
    private readonly hotelsService;
    private readonly usersService;
    private readonly bookingsService;
    private readonly fileUploadService;
    constructor(hotelsService: HotelsService, usersService: UserService, bookingsService: BookingsService, fileUploadService: FileService);
    create(createHotelDto: CreateHotelDto, user: any, files: Array<Express.Multer.File>): Promise<CreateHotelDto & import("./entities/hotel.entity").Hotel>;
    createByAgoda(createHotelDto: CreateHotelDto): Promise<CreateHotelDto & import("./entities/hotel.entity").Hotel>;
    findAll(user: any): Promise<import("./entities/hotel.entity").Hotel[]>;
    findAllHotels(location: string): Promise<import("./entities/hotel.entity").Hotel[]>;
    getAllHotelsAdmin(page: number, limit: number, status: Status): Promise<{
        data: import("./entities/hotel.entity").Hotel[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findHotelPending(user: any): Promise<import("./entities/hotel.entity").Hotel[]>;
    findHotelCompleted(user: any): Promise<import("./entities/hotel.entity").Hotel[]>;
    findOne(id: string): Promise<import("./entities/hotel.entity").Hotel>;
    update(id: string, updateHotelDto: UpdateHotelDto, files: Array<Express.Multer.File>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    createFavourite(createFavouriteDto: CreateFavouriteDto, user: any): Promise<CreateFavouriteDto & import("../bookings/entities/favourites.entity").Favourites>;
    findAllFavourite(user: any): Promise<import("../bookings/entities/favourites.entity").Favourites[]>;
    findVendorHotels(id: string): Promise<import("./entities/hotel.entity").Hotel[]>;
    getAgodaHotel(id: string): Promise<import("./entities/hotel.entity").Hotel[]>;
    removeFavourite(id: string): Promise<import("typeorm").DeleteResult>;
}
