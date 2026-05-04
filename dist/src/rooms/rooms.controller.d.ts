/// <reference types="multer" />
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileService } from 'src/file-upload/file-upload.service';
export declare class RoomsController {
    private readonly roomsService;
    private readonly fileUploadService;
    constructor(roomsService: RoomsService, fileUploadService: FileService);
    create(createRoomDto: CreateRoomDto, files: Array<Express.Multer.File>): Promise<CreateRoomDto & import("./entities/room.entity").Room>;
    findAll(): Promise<import("./entities/room.entity").Room[]>;
    findByHotelId(id: string, date: Date): Promise<import("./entities/room.entity").Room[]>;
    findOne(id: string): Promise<import("./entities/room.entity").Room>;
    update(id: string, updateRoomDto: UpdateRoomDto, files: Array<Express.Multer.File>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    getHotelRooms(id: string): Promise<import("./entities/room.entity").Room[]>;
}
