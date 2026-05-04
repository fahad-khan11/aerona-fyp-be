import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
export declare class RoomsService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<Room>);
    create(createRoomDto: CreateRoomDto): Promise<CreateRoomDto & Room>;
    findAll(): Promise<Room[]>;
    findByHotelId(hotelId: number, targetDate: Date): Promise<Room[]>;
    findByIds(ids: Room[]): Promise<Room[]>;
    findOne(id: number): Promise<Room>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<import("typeorm").UpdateResult>;
    getHotelRooms(id: number): Promise<Room[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    updateRoomAvailability(): Promise<void>;
}
