import { UmrahbookingsService } from './umrahbookings.service';
import { CreateUmrahbookingDto } from './dto/create-umrahbooking.dto';
import { UpdateUmrahbookingDto } from './dto/update-umrahbooking.dto';
export declare class UmrahbookingsController {
    private readonly umrahbookingsService;
    constructor(umrahbookingsService: UmrahbookingsService);
    create(createUmrahbookingDto: CreateUmrahbookingDto, user: any): Promise<CreateUmrahbookingDto & import("./entities/umrahbooking.entity").Umrahbooking>;
    findAll(): Promise<import("./entities/umrahbooking.entity").Umrahbooking[]>;
    findOne(id: string): Promise<import("./entities/umrahbooking.entity").Umrahbooking>;
    update(id: string, updateUmrahbookingDto: UpdateUmrahbookingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getAgentBookings(id: string): Promise<import("./entities/umrahbooking.entity").Umrahbooking[]>;
    getVenderBookings(user: any): Promise<import("./entities/umrahbooking.entity").Umrahbooking[]>;
}
