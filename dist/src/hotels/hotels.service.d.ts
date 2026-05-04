import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { Status } from 'src/user/entities/user.entity';
export declare class HotelsService {
    private readonly hotelRepository;
    constructor(hotelRepository: Repository<Hotel>);
    create(createHotelDto: CreateHotelDto): Promise<CreateHotelDto & Hotel>;
    findAll(id: number): Promise<Hotel[]>;
    findAllHotels(location?: string): Promise<Hotel[]>;
    findAllHotelsAdmin(page?: number, limit?: number, status?: Status): Promise<{
        data: Hotel[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getAgodaHotel(id: string): Promise<Hotel[]>;
    findPendingHotel(id: number): Promise<Hotel[]>;
    findVendorHotelsCount(id: number): Promise<{
        totalHotels: number;
        completedHotels: number;
        pendingHotels: number;
    }>;
    findCompletedHotel(id: number): Promise<Hotel[]>;
    findOne(id: number): Promise<Hotel>;
    update(id: number, updateHotelDto: UpdateHotelDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
