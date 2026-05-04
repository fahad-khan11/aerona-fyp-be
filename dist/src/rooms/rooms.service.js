"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./entities/room.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
let RoomsService = class RoomsService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    create(createRoomDto) {
        return this.roomRepository.save(createRoomDto);
    }
    findAll() {
        return this.roomRepository.find();
    }
    async findByHotelId(hotelId, targetDate) {
        const availableHotels = await this.roomRepository
            .createQueryBuilder('room')
            .leftJoinAndSelect('room.hotel', 'hotel')
            .where('hotel.id = :hotelId', { hotelId })
            .andWhere('(room.availableUntil IS NULL OR room.availableUntil < :targetDate)', { targetDate })
            .getMany();
        return availableHotels;
    }
    async findByIds(ids) {
        return this.roomRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            }
        });
    }
    findOne(id) {
        return this.roomRepository.findOne({
            where: {
                id,
            },
        });
    }
    update(id, updateRoomDto) {
        return this.roomRepository.update(id, updateRoomDto);
    }
    getHotelRooms(id) {
        return this.roomRepository.find({
            where: {
                hotel: {
                    id
                }
            },
            relations: {
                hotel: true
            }
        });
    }
    remove(id) {
        return this.roomRepository.delete(id);
    }
    async updateRoomAvailability() {
        const now = new Date();
        await this.roomRepository
            .createQueryBuilder()
            .update(room_entity_1.Room)
            .set({ isActive: true, availableUntil: null })
            .where('unavailableUntil < :now', { now })
            .execute();
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomsService.prototype, "updateRoomAvailability", null);
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map