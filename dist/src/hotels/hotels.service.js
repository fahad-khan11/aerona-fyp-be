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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hotel_entity_1 = require("./entities/hotel.entity");
const user_entity_1 = require("../user/entities/user.entity");
let HotelsService = class HotelsService {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    create(createHotelDto) {
        return this.hotelRepository.save(createHotelDto);
    }
    findAll(id) {
        return this.hotelRepository.find({
            where: {
                user: {
                    id
                }
            },
        });
    }
    async findAllHotels(location) {
        location = location === null || location === void 0 ? void 0 : location.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        console.log(location);
        return await this.hotelRepository.find({
            where: {
                city: location ? (0, typeorm_2.ILike)(`%${location}%`) : undefined,
                dataByApi: false,
                status: user_entity_1.Status.APPROVED
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findAllHotelsAdmin(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const [hotels, total] = await this.hotelRepository.findAndCount({
            where: { dataByApi: false,
                status: status
            },
            skip,
            take: limit,
            order: { id: 'DESC' },
        });
        return {
            data: hotels,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getAgodaHotel(id) {
        return await this.hotelRepository.find({
            where: {
                apiId: id,
                dataByApi: true
            }
        });
    }
    async findPendingHotel(id) {
        return await this.hotelRepository.find({
            where: {
                user: {
                    id
                },
                isCompleted: 0
            }
        });
    }
    async findVendorHotelsCount(id) {
        const totalHotels = await this.hotelRepository.count({
            where: {
                user: {
                    id
                }
            }
        });
        const completedHotels = await this.hotelRepository.count({
            where: {
                user: {
                    id
                },
                isCompleted: 1
            }
        });
        const pendingHotels = await this.hotelRepository.count({
            where: {
                user: {
                    id
                },
                isCompleted: 0
            }
        });
        return { totalHotels: totalHotels, completedHotels: completedHotels, pendingHotels: pendingHotels };
    }
    async findCompletedHotel(id) {
        return await this.hotelRepository.find({
            where: {
                user: {
                    id
                },
                isCompleted: 1
            }
        });
    }
    findOne(id) {
        return this.hotelRepository.findOne({
            where: { id },
        });
    }
    update(id, updateHotelDto) {
        return this.hotelRepository.update(id, updateHotelDto);
    }
    remove(id) {
        return this.hotelRepository.delete(id);
    }
};
HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelsService);
exports.HotelsService = HotelsService;
//# sourceMappingURL=hotels.service.js.map